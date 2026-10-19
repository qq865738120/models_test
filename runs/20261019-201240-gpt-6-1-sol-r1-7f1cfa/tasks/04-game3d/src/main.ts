import * as THREE from 'three'
import { AmmoPhysics, PhysicsLoader, ExtendedMesh } from '@enable3d/ammo-physics'
import layout from '../materials/warehouse.json'
import './style.css'

type State = 'start'|'playing'|'paused'|'inspect'|'won'|'lost'
type Crate = {id:string;color:string;name:string;mesh:ExtendedMesh;delivered:boolean;stable:number;released:boolean}
type Obstacle = {x:number;z:number;w:number;d:number;h:number;name:string}
const V=layout.vehicle, W=V.width, ui=document.querySelector<HTMLDivElement>('#ui')!
const colors:Record<string,string>={red:'#ec615c',blue:'#4e8fe4',yellow:'#e6b744'}
const names:Record<string,string>={red:'红箱 · A',blue:'蓝箱 · B',yellow:'黄箱 · C'}
const keys=new Set<string>(), log:object[]=[]
let state:State='start',remaining=120,speed=0,yaw=V.start.yaw,forkHeight=V.forkMin,steer=0,carried:Crate|null=null
let clock=0,toastUntil=0,last=performance.now(),accumulator=0,view='oblique',wireframe=false
let carryDistance=1.94
let collisionText='',pickupBlockedUntil=0,inspectPrior='paused',lastUi=0,physics:AmmoPhysics
const scene=new THREE.Scene();scene.background=new THREE.Color('#c6d3d3');scene.fog=new THREE.Fog('#c6d3d3',30,70)
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'})
renderer.setPixelRatio(1);renderer.setSize(innerWidth,innerHeight)
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18
renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','叉车驾驶场景，W S驾驶，A D转向，Q降叉，E升叉')
document.querySelector('#app')!.append(renderer.domElement)
const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,90)
const hemi=new THREE.HemisphereLight('#eaf6ff','#687c69',2.1);scene.add(hemi)
const sun=new THREE.DirectionalLight('#fff3d7',3.2);sun.position.set(-8,16,7);sun.castShadow=true
sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-17,right:17,top:15,bottom:-15,near:1,far:45});sun.shadow.normalBias=.025;sun.shadow.bias=-.0002;scene.add(sun)
const mats=new Map<string,THREE.MeshStandardMaterial>()
function mat(color:string,metal=0,rough=.7){const key=color+metal+rough;if(!mats.has(key))mats.set(key,new THREE.MeshStandardMaterial({color,metalness:metal,roughness:rough}));return mats.get(key)!}
const cubeGeo=new THREE.BoxGeometry(1,1,1),sphereGeo=new THREE.SphereGeometry(1,20,14),cylinderGeo=new THREE.CylinderGeometry(1,1,1,20)
function box(parent:THREE.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,color:string,metal=0){const m=new THREE.Mesh(cubeGeo,mat(color,metal));m.scale.set(w,h,d);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function ellipsoid(parent:THREE.Object3D,x:number,y:number,z:number,sx:number,sy:number,sz:number,color:string){const m=new THREE.Mesh(sphereGeo,mat(color));m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;parent.add(m);return m}
function cylinder(parent:THREE.Object3D,r:number,h:number,x:number,y:number,z:number,color:string){const m=new THREE.Mesh(cylinderGeo,mat(color,.15));m.scale.set(r,h,r);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m}
function label(text:string,color:string,bg:string|undefined,w=512,h=128){const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d')!;if(bg){ctx.fillStyle=bg;ctx.fillRect(0,0,w,h)}ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${h*.55}px sans-serif`;ctx.fillText(text,w/2,h/2);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const m=new THREE.MeshBasicMaterial({map:texture,transparent:!bg,depthWrite:false,side:THREE.DoubleSide});return m}
const vehicle=new THREE.Group();vehicle.name='forkliftRoot';scene.add(vehicle)
const wheelPivots:THREE.Group[]=[],wheelRolls:THREE.Group[]=[]
const forkGroup=new THREE.Group();forkGroup.name='liftCarriage';vehicle.add(forkGroup)
const driver=new THREE.Group();driver.name='pelicanDriver';vehicle.add(driver)
let vehicleBody:ExtendedMesh
const crates:Crate[]=[],obstacles:Obstacle[]=[],occluders:THREE.Object3D[]=[]
const zoneMeshes:Record<string,THREE.Mesh>={}
const qa=new URLSearchParams(location.search).has('qa')
let diagnosticNode:HTMLElement|null=null
function record(type:string,data:object={}){log.push({t:+(120-remaining).toFixed(3),type,...data});if(log.length>400)log.shift()}
function toast(message:string){const el=document.querySelector('#toast');if(el)el.textContent=message;toastUntil=performance.now()+2600}
function staticBody(w:number,h:number,d:number,x:number,y:number,z:number,name:string){const body=physics.add.box({width:w,height:h,depth:d,x,y,z,mass:0,name},{custom:mat('#33444a')});body.visible=false;return body}
function buildWarehouse(){
 const floor=box(scene,24,.3,20,0,-.15,0,'#a2b0ab');floor.name='warehouseFloor';staticBody(24,.3,20,0,-.15,0,'floor')
 const grid=new THREE.GridHelper(24,24,'#8e9f9b','#96a7a2');grid.position.y=.006;grid.scale.z=20/24;(grid.material as THREE.Material).transparent=true;(grid.material as THREE.Material).opacity=.4;scene.add(grid)
 const walls=[{x:-12.15,z:0,w:.3,d:20.6},{x:12.15,z:0,w:.3,d:20.6},{x:0,z:-10.15,w:24,d:.3},{x:0,z:10.15,w:24,d:.3}]
 walls.forEach((o,i)=>{obstacles.push({...o,h:1.05,name:'边界墙'});staticBody(o.w,1.05,o.d,o.x,.525,o.z,`wall-${i}`);const m=box(scene,o.w,1.05,o.d,o.x,.525,o.z,'#607b80');occluders.push(m);box(scene,o.w+.02,.08,o.d+.02,o.x,1.09,o.z,'#d5dfd4')})
 // Low warehouse perimeter, corner posts and open roof beams preserve the playable sight lines.
 for(const x of [-11.8,11.8])for(const z of [-9.7,9.7]){box(scene,.2,4.3,.2,x,2.15,z,'#6b8689');box(scene,.4,.12,.4,x,4.32,z,'#e1e6da')}
 layout.racks.forEach((r,ri)=>{
  obstacles.push({x:r.x,z:r.z,w:r.width,d:r.depth,h:r.height,name:'货架'});staticBody(r.width,r.height,r.depth,r.x,r.height/2,r.z,`rack-${ri}`)
  const group=new THREE.Group();group.name=`rack-${ri}`;scene.add(group)
  for(const x of [r.x-.9,r.x+.9])for(const z of [-4.9,0,4.9])box(group,.13,3,.13,x,1.5,z,'#355565',.3)
  for(const y of [.18,1.52,2.9]){box(group,2,.12,10,r.x,y,0,'#637c78',.15);for(const x of [r.x-.97,r.x+.97])box(group,.08,.18,10,x,y+.03,0,'#d6a94c',.15)}
  for(const z of [-3.6,-1.2,1.2,3.6])for(const y of [.74,2.1]){box(group,1.28,.94,1.62,r.x,y,z,ri===0?'#8f9d90':'#839d9e');box(group,.06,.95,1.64,r.x-.34,y,z,'#b8c2b0');box(group,.06,.95,1.64,r.x+.34,y,z,'#b8c2b0')}
  group.traverse(o=>{if((o as THREE.Mesh).isMesh)occluders.push(o)})
  const sign=new THREE.Mesh(new THREE.PlaneGeometry(1.2,.36),label(`R0${ri+1}`,'#e3e7db','#29464f'));sign.position.set(r.x,3.17,4.96);group.add(sign)
 })
 layout.barriers.forEach((b,i)=>{obstacles.push({x:b.x,z:b.z,w:b.width,d:b.depth,h:b.height,name:'路障'});staticBody(b.width,b.height,b.depth,b.x,b.height/2,b.z,`barrier-${i}`);box(scene,b.width,b.height,b.depth,b.x,b.height/2,b.z,'#d5ad50');for(const z of [-1,0,1]){const stripe=box(scene,1.015,.17,.32,b.x,.32,b.z+z,'#344b4b');stripe.rotation.x=-.28}box(scene,.72,.045,2.7,b.x,.625,b.z,'#e7c777')})
 layout.deliveryZones.forEach((z,i)=>{
  const color=colors[z.boxId];const zone=box(scene,z.width,.018,z.depth,z.x,.013,z.z,color);zone.material=new THREE.MeshStandardMaterial({color,roughness:.9,transparent:true,opacity:.25});zone.receiveShadow=true;zone.castShadow=false;zoneMeshes[z.boxId]=zone
  const border=.055;for(const dz of [-1.5,1.5])box(scene,3.04,.025,border,z.x,.03,z.z+dz,color);for(const dx of [-1.5,1.5])box(scene,border,.025,3.04,z.x+dx,.03,z.z,color)
  const txt=new THREE.Mesh(new THREE.PlaneGeometry(2.5,.52),label(`${String.fromCharCode(65+i)} · ${z.boxId.toUpperCase()}`,color,undefined));txt.rotation.x=-Math.PI/2;txt.position.set(z.x,.045,z.z-1.06);scene.add(txt)
  const pole=box(scene,.055,1.28,.055,z.x, .64,-8.25,'#5b7475');pole.castShadow=false
  const sign=new THREE.Mesh(new THREE.PlaneGeometry(1.7,.45),label(`${String.fromCharCode(65+i)}  ${z.boxId.toUpperCase()}`,'#fff9e8',color));sign.position.set(z.x,1.2,-8.22);scene.add(sign)
 })
 // Painted approach guides, with an uncluttered central driving aisle.
 for(const x of [-5,0,5])for(let z=-3.4;z<1.5;z+=.85)box(scene,.035,.008,.38,x,.012,z,'#e1dfc7').castShadow=false
 for(const x of [-5,0,5]){const marker=new THREE.Mesh(new THREE.PlaneGeometry(1.65,.32),label('FORK IN','#526e70',undefined));marker.rotation.x=-Math.PI/2;marker.position.set(x,.016,4.3);scene.add(marker)}
 const banner=new THREE.Mesh(new THREE.PlaneGeometry(7,.7),label('PELICAN  /  LOGISTICS','#36575f','#e6e6d7',1024,128));banner.position.set(0,2.6,-10);scene.add(banner)
}
function buildVehicle(){
 vehicle.position.set(V.start.x,0,V.start.z);vehicle.rotation.y=yaw
 box(vehicle,W*.9,.66,2.24,0,.65,-.05,'#efb947',.18).name='counterweightBody'
 box(vehicle,W,.38,.72,0,.78,-.96,'#e6a931',.2)
 box(vehicle,W*.97,.16,2.52,0,.35,0,'#34464b',.4)
 box(vehicle,W*.72,.12,1.2,0,1,-.22,'#34484b')
 box(vehicle,.56,.14,.64,0,1.02,-.23,'#263d44').name='seat'
 const seatBack=box(vehicle,.58,.65,.12,0,1.31,-.52,'#263d44');seatBack.rotation.x=.12
 for(const x of [-W*.44,W*.44])for(const z of [-.91,.7])box(vehicle,.075,1.43,.075,x,1.5,z,'#314a50',.6)
 box(vehicle,W*1.02,.12,1.95,0,2.23,-.13,'#e7b74b',.25).name='overheadGuard'
 for(const z of [-.75,-.35,.05,.45])box(vehicle,W*.9,.045,.035,0,2.315,z,'#354e53',.3)
 box(vehicle,.2,.26,.38,.56,1.9,-.6,'#e3ad38');const beacon=ellipsoid(vehicle,.56,2.15,-.6,.09,.1,.09,'#ffd376');beacon.material=mat('#ffd376',.1)
 // Four wheel assemblies; rolling and steering have separate pivots.
 for(const z of [-.8,.83])for(const x of [-(W/2-.125),W/2-.125]){const pivot=new THREE.Group();pivot.position.set(x,.35,z);vehicle.add(pivot);wheelPivots.push(pivot);const roll=new THREE.Group();pivot.add(roll);wheelRolls.push(roll);const tire=cylinder(roll,.34,.25,0,0,0,'#27393c');tire.rotation.z=Math.PI/2;const hub=cylinder(roll,.17,.265,0,0,0,'#9caca5');hub.rotation.z=Math.PI/2;for(let i=0;i<8;i++){const tread=box(roll,.264,.035,.09,0,Math.cos(i*Math.PI/4)*.325,Math.sin(i*Math.PI/4)*.325,'#3a4a49');tread.rotation.x=i*Math.PI/4}}
 for(const x of [-W*.36,W*.36]){box(vehicle,.13,2.18,.15,x,1.15,1.16,'#2e444b',.6);box(vehicle,.055,1.95,.08,x,1.12,1.25,'#92a3a1',.7)}
 box(vehicle,W*.8,.14,.18,0,2.2,1.16,'#334950',.5)
 box(forkGroup,W*.88,.42,.11,0,.19,1.3,'#4e6466',.6)
 for(const x of [-W*.26,W*.26]){box(forkGroup,.145,.08,1.4,x,-.08,1.9,'#b5c0b5',.7).name='forkTine';box(forkGroup,.145,.52,.1,x,.15,1.27,'#8c9f9a',.6)}
 box(vehicle,.08,.55,.08,.3,1.2,.35,'#3a5055').rotation.x=-.35
 const steering=new THREE.Mesh(new THREE.TorusGeometry(.18,.025,8,24),mat('#263e43'));steering.rotation.x=.7;steering.position.set(.3,1.46,.43);vehicle.add(steering)
 for(const x of [-W*.37,W*.37]){box(vehicle,.18,.12,.045,x,.9,1.1,'#fff2bb');box(vehicle,.14,.09,.03,x,.85,-1.34,'#d65f45')}
 const idSign=new THREE.Mesh(new THREE.PlaneGeometry(.7,.24),label('PL–03','#263e43','#f4d57c'));idSign.rotation.y=Math.PI;idSign.position.set(0,.78,-1.331);vehicle.add(idSign)
 // Pelican: body, folded wings, curved neck, long tapered bill, and suspended throat pouch.
 driver.position.set(0,1.14,-.17)
 ellipsoid(driver,0,.22,0,.29,.38,.26,'#f3f1dd').name='pelicanBody'
 for(const x of [-.24,.24]){const wing=ellipsoid(driver,x,.2,-.03,.1,.29,.23,'#d9e2d9');wing.rotation.z=x>0?-.16:.16}
 ellipsoid(driver,0,.62,.1,.12,.32,.12,'#fff8e4')
 ellipsoid(driver,0,.86,.19,.18,.19,.22,'#fffae8')
 const bill=new THREE.Mesh(new THREE.ConeGeometry(.12,.65,4),mat('#eab34e'));bill.rotation.x=Math.PI/2;bill.position.set(0,.84,.64);bill.castShadow=true;driver.add(bill)
 const pouch=ellipsoid(driver,0,.69,.48,.13,.15,.29,'#d88f40');pouch.rotation.x=-.16;pouch.name='throatPouch'
 for(const x of [-.153,.153]){ellipsoid(driver,x,.91,.255,.04,.042,.043,'#263b40');ellipsoid(driver,x*1.03,.925,.27,.012,.014,.012,'#fffbe4')}
 for(const x of [-.12,.12]){box(driver,.14,.055,.22,x,-.12,.24,'#d5973d');box(driver,.06,.19,.06,x,-.035,.16,'#d5973d')}
 vehicleBody=physics.add.box({width:W,height:1.1,depth:V.length,x:V.start.x,y:.7,z:V.start.z,mass:layout.physics.vehicleMass,collisionFlags:2,name:'forklift-chassis'} as any,{custom:mat('#cc6644')});vehicleBody.visible=false;vehicleBody.rotation.y=yaw;vehicleBody.body.needUpdate=true
 forkGroup.position.y=forkHeight
}
function buildCrates(){layout.boxes.forEach(b=>{
 const m=physics.add.box({width:b.width,height:b.height,depth:b.depth,x:b.x,y:b.y,z:b.z,mass:layout.physics.boxMass,name:b.id},{custom:mat(b.color,.05)});m.name=`crate-${b.id}`
 m.body.setFriction(.92);m.body.setDamping(.8,.95);m.body.setAngularFactor(0,0,0);m.body.setCcdMotionThreshold(.1);m.body.setCcdSweptSphereRadius(.4)
 // Solid full-size physics cube, visual channels and strapping preserve its exact 1.2m silhouette.
 for(const x of [-.42,.42])box(m,.065,1.205,1.205,x,0,0,'#e6dfc1',.1)
 for(const z of [-.601,.601]){box(m,1.2,.17,.012,0,-.47,z,'#745f43');const sign=new THREE.Mesh(new THREE.PlaneGeometry(.54,.42),label(b.id[0].toUpperCase()==='R'?'A':b.id==='blue'?'B':'C','#fffae8',b.color,128,128));sign.position.set(0,.04,z*1.007);if(z<0)sign.rotation.y=Math.PI;m.add(sign)}
 for(const x of [-.365,.365]){box(m,.21,.12,.012,x,-.53,.613,'#354b4d');box(m,.21,.12,.012,x,-.53,-.613,'#354b4d')}
 crates.push({id:b.id,color:b.color,name:names[b.id],mesh:m,delivered:false,stable:0,released:true})
})}
function obbOverlap(ax:number,az:number,aw:number,ad:number,aa:number,bx:number,bz:number,bw:number,bd:number,ba=0){
 const ca=Math.cos(aa),sa=Math.sin(aa),cb=Math.cos(ba),sb=Math.sin(ba),dx=bx-ax,dz=bz-az
 for(const [ux,uz] of [[ca,-sa],[sa,ca],[cb,-sb],[sb,cb]]){const dist=Math.abs(dx*ux+dz*uz);const ra=aw/2*Math.abs(ca*ux-sa*uz)+ad/2*Math.abs(sa*ux+ca*uz);const rb=bw/2*Math.abs(cb*ux-sb*uz)+bd/2*Math.abs(sb*ux+cb*uz);if(dist>=ra+rb-.002)return false}return true
}
function forward(angle=yaw){return {x:Math.sin(angle),z:Math.cos(angle)}}
function blocking(x:number,z:number,angle:number){
 const f=forward(angle),cx=x+f.x*carryDistance,cz=z+f.z*carryDistance
 for(const o of obstacles){if(obbOverlap(x,z,W,V.length,angle,o.x,o.z,o.w,o.d))return o.name;if(forkHeight-.12<o.h&&obbOverlap(x+f.x*1.9,z+f.z*1.9,W*.64,1.4,angle,o.x,o.z,o.w,o.d))return o.name;if(carried&&forkHeight-.04<o.h&&obbOverlap(cx,cz,1.2,1.2,angle,o.x,o.z,o.w,o.d))return o.name}
 for(const c of crates)if(c!==carried&&c.mesh.position.y<1.7){if(obbOverlap(x,z,W,V.length,angle,c.mesh.position.x,c.mesh.position.z,1.2,1.2,crateYaw(c)))return '货箱';if(forkHeight-.04>c.mesh.position.y-.6+.15&&forkHeight-.12<c.mesh.position.y+.6&&obbOverlap(x+f.x*1.9,z+f.z*1.9,W*.64,1.4,angle,c.mesh.position.x,c.mesh.position.z,1.2,1.2,crateYaw(c)))return '货箱';if(carried&&Math.abs(c.mesh.position.y-(forkHeight+.56))<1.18&&obbOverlap(cx,cz,1.2,1.2,angle,c.mesh.position.x,c.mesh.position.z,1.2,1.2,crateYaw(c)))return '货箱'}
 return ''
}
function crateYaw(c:Crate){const v=new THREE.Vector3(0,0,1).applyQuaternion(c.mesh.quaternion);return Math.atan2(v.x,v.z)}
function pickupMetrics(c:Crate){const dx=c.mesh.position.x-vehicle.position.x,dz=c.mesh.position.z-vehicle.position.z,f=forward();const longitudinal=dx*f.x+dz*f.z,lateral=dx*f.z-dz*f.x;const angle=Math.abs(Math.atan2(Math.sin(yaw-crateYaw(c)),Math.cos(yaw-crateYaw(c))));const aligned=Math.min(angle,Math.abs(Math.PI-angle));const near=longitudinal-.6,far=longitudinal+.6,penetration=Math.max(0,Math.min(2.6,far)-Math.max(1.2,near));const vertical=Math.abs(forkHeight-.04-(c.mesh.position.y-.6));return {longitudinal,lateral,angle:aligned,penetration,vertical,eligible:aligned<=Math.PI/12&&Math.abs(lateral)<=.25&&vertical<=.15&&penetration>=.3&&longitudinal>1.3&&longitudinal<3.2}}
function tryPickup(){if(carried||clock<pickupBlockedUntil)return;for(const c of crates){if(c.delivered)continue;const m=pickupMetrics(c);if(!m.eligible)continue;carried=c;carryDistance=Math.max(1.94,m.longitudinal);c.released=false;c.stable=0;c.mesh.body.setCollisionFlags(2);c.mesh.body.setVelocity(0,0,0);record('pickup',{id:c.id,metrics:m});toast(`${c.name} 已托起 · 运往同字母交付区`);syncCargo();return}}
function syncCargo(){if(!carried)return;const f=forward();carried.mesh.position.set(vehicle.position.x+f.x*carryDistance,forkHeight+.56,vehicle.position.z+f.z*carryDistance);carried.mesh.rotation.set(0,yaw,0);carried.mesh.body.needUpdate=true}
function teleport(m:ExtendedMesh){const t=m.body.ammo.getWorldTransform();const p=t.getOrigin();p.setValue(m.position.x,m.position.y,m.position.z);t.setOrigin(p);const q=t.getRotation();q.setValue(m.quaternion.x,m.quaternion.y,m.quaternion.z,m.quaternion.w);t.setRotation(q);m.body.ammo.setWorldTransform(t);m.body.ammo.getMotionState().setWorldTransform(t);physics.physicsWorld.updateSingleAabb(m.body.ammo)}
function release(){if(!carried)return;const c=carried;syncCargo();c.mesh.body.needUpdate=true;teleport(c.mesh);c.mesh.body.setCollisionFlags(0);c.mesh.body.setVelocity(0,0,0);c.mesh.body.setAngularVelocity(0,0,0);c.mesh.body.ammo.activate(true);c.released=true;c.stable=0;carried=null;pickupBlockedUntil=clock+.35;record('release',{id:c.id,x:c.mesh.position.x,y:c.mesh.position.y,z:c.mesh.position.z});toast(`${c.name} 已放下 · 落地停稳后验收`)}
function insideZone(c:Crate){const zone=layout.deliveryZones.find(z=>z.boxId===c.id)!;const q=c.mesh.quaternion;const corners=[[-.6,-.6],[.6,-.6],[.6,.6],[-.6,.6]];return corners.every(([x,z])=>{const p=new THREE.Vector3(x,-.6,z).applyQuaternion(q).add(c.mesh.position);return Math.abs(p.x-zone.x)<=zone.width/2+1e-4&&Math.abs(p.z-zone.z)<=zone.depth/2+1e-4})}
function checkDeliveries(dt:number){for(const c of crates){if(c.delivered||c===carried||!c.released){c.stable=0;continue}const vel=c.mesh.body.velocity;const bottom=c.mesh.position.y-.6;const valid=insideZone(c)&&Math.abs(bottom)<=.05&&Math.hypot(vel.x,vel.z)<=.1;c.stable=valid?c.stable+dt:0;if(c.stable>=.5){c.delivered=true;record('delivery',{id:c.id,bottom,speed:Math.hypot(vel.x,vel.z),stable:c.stable});toast(`${c.name} 交付完成 ✓`);(zoneMeshes[c.id].material as THREE.MeshStandardMaterial).opacity=.48}}
 if(crates.every(c=>c.delivered)){state='won';speed=0;keys.clear();record('won');renderUI()}}
function step(dt:number){
 if(state!=='playing')return
 clock+=dt;remaining=Math.max(0,remaining-dt)
 const throttle=(keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0),brake=keys.has('Space');let target=throttle*V.maxSpeed
 const decel=brake?V.brakeDeceleration:throttle?V.acceleration:1.7;if(brake)target=0;// Linear acceleration and braking use the map parameters.
 const difference=target-speed;speed+=Math.sign(difference)*Math.min(Math.abs(difference),decel*dt)
 const turn=(keys.has('KeyA')?1:0)-(keys.has('KeyD')?1:0);steer=THREE.MathUtils.damp(steer,turn*.48,10,dt)
 const newYaw=yaw+turn*V.turnSpeed*Math.min(Math.abs(speed)/1.3,1)*Math.sign(speed)*dt
 let hit=blocking(vehicle.position.x,vehicle.position.z,newYaw);if(!hit)yaw=newYaw
 const f=forward();const nx=vehicle.position.x+f.x*speed*dt,nz=vehicle.position.z+f.z*speed*dt
 hit=blocking(nx,nz,yaw);if(hit){if(Math.abs(speed)>.12&&collisionText!==hit)record('collision',{with:hit,x:vehicle.position.x,z:vehicle.position.z});collisionText=hit;speed=0}else{vehicle.position.set(nx,0,nz);collisionText=''}
 vehicle.rotation.y=yaw;vehicleBody.position.set(vehicle.position.x,.7,vehicle.position.z);vehicleBody.rotation.y=yaw;vehicleBody.body.needUpdate=true
 wheelRolls.forEach(w=>w.rotation.x+=speed*dt/.34);wheelPivots.forEach((w,i)=>w.rotation.y=i<2?-steer:0)
 const lift=(keys.has('KeyE')?1:0)-(keys.has('KeyQ')?1:0)
 if(lift>0){tryPickup();forkHeight=Math.min(V.forkMax,forkHeight+V.forkLiftSpeed*dt)}
 if(lift<0){forkHeight=Math.max(V.forkMin,forkHeight-V.forkLiftSpeed*dt)}
 forkGroup.position.y=forkHeight;syncCargo()
 if(carried&&lift<0&&forkHeight-.04<=.1)release()
 physics.update(dt*1000)
 // Held cargo stays at its fork transform, including on the first kinematic step.
 if(carried)syncCargo()
 checkDeliveries(dt)
 if(remaining<=0&&state==='playing'){state='lost';speed=0;keys.clear();record('timeout');renderUI()}
}
function keycap(k:string){return `<span class="key">${k}</span>`}
function controls(){return `${keycap('W')}${keycap('S')} 前进 / 倒车　${keycap('A')}${keycap('D')} 转向<br>${keycap('Q')} 降叉　${keycap('E')} 升叉　${keycap('空格')} 制动　${keycap('P')} 暂停`}
function renderUI(){const delivered=crates.filter(c=>c.delivered).length
 ui.classList.toggle('is-start',state==='start');ui.innerHTML=`<div class="topbar"><div class="brand"><strong>鹈鹕叉车驾校</strong><small>PELICAN FORKLIFT ACADEMY</small></div><div class="hud-stats"><div class="stat timer" id="timer"><div class="label">剩余时间 / TIME</div><div class="value" id="time">02:00</div></div><div class="stat"><div class="label">交付 / DELIVERIES</div><div class="value" id="score">${delivered} <em>/ 3</em></div><div class="progress-dots">${crates.map(c=>`<i class="${c.delivered?'done':''}" style="--c:${c.color}"></i>`).join('')}</div></div><button class="pause-button" id="pause" title="暂停 P" aria-label="暂停游戏">Ⅱ</button></div></div><div class="cargo" id="cargo"><div class="cargo-dot" id="cargoDot"></div><div><small>当前搬运 / CARGO</small><b id="cargoName">空载</b></div></div><div class="minimap" id="minimap"><div class="map-label">WAREHOUSE · N ↑</div><svg viewBox="-13 -11 26 22" id="map"></svg></div><div class="bottom" id="bottom"><div class="hint"><strong id="hintTitle">对齐箱底，缓慢驶入</strong><span id="hintSub">Q 降叉到最低 → 伸入箱底 → E 升叉托起</span></div><div class="controls">${controls()}</div></div><div class="toast" id="toast" aria-live="polite"></div>`
 if(state==='start')ui.insertAdjacentHTML('beforeend',`<div class="overlay start"><div class="panel"><div class="eyebrow">FIELD TEST 03 / 仓库实操</div><h1>大喙小心，<br>稳稳交付。</h1><p>坐上叉车，将三个货箱送入同色、同字母的交付区。对齐、托起、运输，再轻轻放下。</p><div class="mission"><div><strong>120<span style="font-size:12px"> 秒</span></strong><small>单局限时</small></div><div><strong>3<span style="font-size:12px"> 个箱子</span></strong><small>全部正确交付</small></div></div><button class="primary" id="start">开始驾驶　→</button><div class="start-keys">${controls()}</div><div class="footer-note">对齐后升叉拾取 · 降至地面自动释放</div></div></div>`)
 if(state==='paused')ui.insertAdjacentHTML('beforeend',`<div class="overlay"><div class="panel"><div class="eyebrow">TAKE A BREATHER</div><h2>歇一歇，鹈鹕。</h2><p>车辆、货箱与考试时间均已暂停。准备好了就继续，或近距离看看你的搭档。</p><div class="status-pill">剩余 ${Math.ceil(remaining)} 秒 · 已交付 ${delivered} / 3</div><button class="primary" id="resume">继续驾驶　P</button><button class="secondary" id="inspect">模型检查</button><button class="secondary" id="restart">重新开始</button></div></div>`)
 if(state==='inspect')ui.insertAdjacentHTML('beforeend',`<div class="inspection"><div class="eyebrow">MODEL INSPECTION</div><h2>看看这位新司机</h2><p>游戏保持暂停。切换视角查看车身、货叉与鹈鹕驾驶员。</p><div class="view-grid">${[['front','前视'],['side','侧视'],['rear','后视'],['oblique','斜上方']].map(([v,t])=>`<button data-view="${v}" class="${view===v?'active':''}">${t}</button>`).join('')}</div><button class="secondary" id="wire">${wireframe?'关闭':'显示'}线框</button><button class="primary" id="back" style="margin-top:15px">返回暂停面板</button></div><div class="inspect-tag">暂停检查中 · 时间与物理冻结 · 车宽 ${W.toFixed(1)} m</div>`)
 if(state==='won'||state==='lost')ui.insertAdjacentHTML('beforeend',`<div class="overlay"><div class="panel"><div class="eyebrow">${state==='won'?'CERTIFIED PELICAN':'TIME IS UP'}</div><h2>${state==='won'?'合格！稳稳当当。':'时间到，继续练习。'}</h2><p>${state==='won'?'三只货箱已在对应区域落地停稳。你的鹈鹕搭档拿到了今天的驾驶资格。':'本次实操已结束。下次先对齐货叉，搬运时注意避开中央路障。'}</p><div class="score-number">${delivered}<small> / 3 正确交付</small></div><div class="status-pill">${state==='won'?`用时 ${(120-remaining).toFixed(1)} 秒`:'考试限时 120 秒'} · ${state==='won'?'成功':'超时'}</div><button class="primary" id="restart">再试一次　↻</button></div></div>`)
 document.querySelector('#pause')?.addEventListener('click',pause)
 document.querySelector('#start')?.addEventListener('click',()=>{state='playing';record('start');renderUI();renderer.domElement.focus()})
 document.querySelector('#resume')?.addEventListener('click',resume)
 document.querySelector('#restart')?.addEventListener('click',()=>{reset();state='playing';record('restart');renderUI();renderer.domElement.focus()})
 document.querySelector('#inspect')?.addEventListener('click',()=>{state='inspect';inspectPrior='paused';view='oblique';record('inspect');renderUI();updateCamera(1,true)})
 document.querySelector('#back')?.addEventListener('click',()=>{state=inspectPrior as State;setWire(false);record('inspect-exit');renderUI();updateCamera(1,true)})
 document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view!;renderUI();updateCamera(1,true)})
 document.querySelector('#wire')?.addEventListener('click',()=>{setWire(!wireframe);renderUI()})
 if(state==='start'){document.querySelector('#bottom')?.classList.add('hidden');document.querySelector('#cargo')?.classList.add('hidden');document.querySelector('#minimap')?.classList.add('hidden')}
 if(state==='inspect'){document.querySelector('#bottom')?.classList.add('hidden');document.querySelector('#cargo')?.classList.add('hidden');document.querySelector('#minimap')?.classList.add('hidden')}
 if(qa)setupQA();updateHUD()
}
function pause(){if(state!=='playing')return;state='paused';keys.clear();record('pause');renderUI()}
function resume(){if(state!=='paused')return;state='playing';keys.clear();record('resume');renderUI();renderer.domElement.focus()}
function reset(){
 keys.clear();state='playing';remaining=120;clock=0;speed=0;yaw=V.start.yaw;steer=0;forkHeight=V.forkMin;carried=null;pickupBlockedUntil=0;collisionText='';accumulator=0
 vehicle.position.set(V.start.x,0,V.start.z);vehicle.rotation.set(0,yaw,0);forkGroup.position.y=forkHeight;wheelRolls.forEach(w=>w.rotation.set(0,0,0));wheelPivots.forEach(w=>w.rotation.y=0)
 vehicleBody.position.set(V.start.x,.7,V.start.z);vehicleBody.rotation.set(0,yaw,0);vehicleBody.body.needUpdate=true
 crates.forEach((c,i)=>{c.mesh.body.setCollisionFlags(2);const b=layout.boxes[i];c.mesh.position.set(b.x,b.y,b.z);c.mesh.rotation.set(0,0,0);c.mesh.body.needUpdate=true;c.mesh.body.setVelocity(0,0,0);c.mesh.body.setAngularVelocity(0,0,0);c.delivered=false;c.stable=0;c.released=true;(zoneMeshes[c.id].material as THREE.MeshStandardMaterial).opacity=.25})
 teleport(vehicleBody);crates.forEach(c=>teleport(c.mesh));physics.update(0);crates.forEach(c=>{c.mesh.body.setCollisionFlags(0);c.mesh.body.ammo.activate(true)})
 setWire(false);updateCamera(1,true)
}
function setWire(value:boolean){wireframe=value;vehicle.traverse(o=>{if((o as THREE.Mesh).isMesh){const material=(o as THREE.Mesh).material;if(Array.isArray(material))return;if('wireframe'in material)(material as THREE.MeshStandardMaterial).wireframe=value}})}
const followTarget=new THREE.Vector3(),desired=new THREE.Vector3(),ray=new THREE.Raycaster()
function updateCamera(dt:number,snap=false){
 const f=forward(),right={x:f.z,z:-f.x};followTarget.set(vehicle.position.x+f.x*.65,.9,vehicle.position.z+f.z*.65)
 if(state==='start'){desired.set(11,11,15);followTarget.set(0,0,1.7)}
 else if(state==='inspect'){
  followTarget.set(vehicle.position.x,1.05,vehicle.position.z+.15)
  const offsets:Record<string,[number,number,number]>={front:[0,2,5.8],side:[5,1.6,.1],rear:[0,2,-5.8],oblique:[4,4.3,5.5]};const [rx,ry,rz]=offsets[view];desired.set(vehicle.position.x+right.x*rx+f.x*rz,ry,vehicle.position.z+right.z*rx+f.z*rz)
 }else{
  desired.set(vehicle.position.x-f.x*6.8+right.x*.65,5.4,vehicle.position.z-f.z*6.8+right.z*.65)
  scene.updateMatrixWorld();const dir=desired.clone().sub(followTarget),distance=dir.length();ray.set(followTarget,dir.normalize());ray.far=distance;const hit=ray.intersectObjects(occluders,false)[0];if(hit&&hit.distance<distance){const safe=Math.max(2.4,hit.distance-.35);desired.copy(followTarget).addScaledVector(dir,safe);desired.y=Math.max(desired.y,5.7)}
 }
 camera.position.lerp(desired,snap?1:1-Math.exp(-5*dt));camera.lookAt(followTarget)
}
function updateHUD(){
 const time=document.querySelector('#time');if(time){const s=Math.ceil(remaining);time.textContent=`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`}
 document.querySelector('#timer')?.classList.toggle('urgent',remaining<=20)
 const score=document.querySelector('#score');if(score)score.innerHTML=`${crates.filter(c=>c.delivered).length} <em>/ 3</em>`
 document.querySelectorAll('.progress-dots i').forEach((i,n)=>i.classList.toggle('done',crates[n]?.delivered))
 const cargoName=document.querySelector('#cargoName');if(cargoName)cargoName.textContent=carried?carried.name:'空载 · 寻找下一个箱子'
 const dot=document.querySelector<HTMLElement>('#cargoDot');if(dot)dot.style.setProperty('--cargo-color',carried?carried.color:'transparent')
 let title='对齐箱底，缓慢驶入',sub='Q 降叉到最低 → 伸入箱底 → E 升叉托起'
 if(carried){title=`正在搬运 ${carried.name} · 叉高 ${(forkHeight-.04).toFixed(2)} m`;sub='停在对应交付区内，按住 Q 降叉至最低，自动释放'}
 else{const eligible=crates.find(c=>!c.delivered&&pickupMetrics(c).eligible);if(eligible){title=`已对齐 ${eligible.name} · 按 E 托起`;sub='货叉已伸入箱底；升叉后驶向同色、同字母的区域'}else{const near=crates.filter(c=>!c.delivered).map(c=>({c,m:pickupMetrics(c)})).find(o=>o.m.longitudinal>1&&o.m.longitudinal<3.3&&Math.abs(o.m.lateral)<1.1);if(near){title=`接近 ${near.c.name} · 微调对齐`;sub=`横向偏差 ${Math.abs(near.m.lateral).toFixed(2)} m / 0.25 m　夹角 ${(near.m.angle*180/Math.PI).toFixed(0)}° / 15°　伸入 ${near.m.penetration.toFixed(2)} m`}}}
 if(collisionText){title=`前方是${collisionText} · 请倒车调整`;sub='S 倒车，A / D 转向；留意货箱与车身的转弯空间'}
 const h=document.querySelector('#hintTitle'),s=document.querySelector('#hintSub');if(h)h.textContent=title;if(s)s.textContent=sub
 if(performance.now()>toastUntil){const t=document.querySelector('#toast');if(t)t.textContent=''}
 const map=document.querySelector('#map');if(map)map.innerHTML=`<rect x="-12" y="-10" width="24" height="20" rx=".3" fill="#d1d9ce" stroke="#7c9594" stroke-width=".2"/>${layout.racks.map(r=>`<rect x="${r.x-r.width/2}" y="${r.z-r.depth/2}" width="${r.width}" height="${r.depth}" fill="#526e76"/>`).join('')}<rect x="-3.5" y="-1.5" width="1" height="3" fill="#b0904e"/>${layout.deliveryZones.map(z=>`<rect x="${z.x-1.5}" y="${z.z-1.5}" width="3" height="3" fill="${colors[z.boxId]}" opacity=".5"/>`).join('')}${crates.map(c=>`<rect x="${c.mesh.position.x-.5}" y="${c.mesh.position.z-.5}" width="1" height="1" fill="${c.color}" stroke="#fffbe8" stroke-width=".15"/>`).join('')}<g transform="translate(${vehicle.position.x} ${vehicle.position.z}) rotate(${-yaw*180/Math.PI})"><path d="M0 1.5 L-.65 -.8 L.65 -.8 Z" fill="#173e48" stroke="#fffbe8" stroke-width=".18"/></g>`
 if(diagnosticNode)diagnosticNode.textContent=JSON.stringify(snapshot(),null,2)
}
function snapshot(){return {environment:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio,renderDpr:renderer.getPixelRatio(),canvasWidth:renderer.domElement.width,canvasHeight:renderer.domElement.height,userAgent:navigator.userAgent},state,remaining:+remaining.toFixed(3),speed:+speed.toFixed(3),vehicle:{x:+vehicle.position.x.toFixed(3),z:+vehicle.position.z.toFixed(3),yaw:+yaw.toFixed(3),width:W},forkHeight:+forkHeight.toFixed(3),carried:carried?.id??null,crates:crates.map(c=>({id:c.id,x:+c.mesh.position.x.toFixed(3),y:+c.mesh.position.y.toFixed(3),z:+c.mesh.position.z.toFixed(3),yaw:+crateYaw(c).toFixed(3),delivered:c.delivered,stable:+c.stable.toFixed(3),velocity:c.mesh.body.velocity,metrics:pickupMetrics(c)})),log}}
function download(data:unknown,name:string){const a=document.createElement('a');const u=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
function setupQA(){ui.insertAdjacentHTML('beforeend',`<details class="qa"><summary>本地验证记录（?qa）</summary><button id="capture">导出操作记录</button><button id="perf">性能：10秒预热 + 60秒</button><button id="resources">连续重开10次采样</button><p id="qa-status">只读状态 / 不提供瞬移或自动驾驶</p><pre id="diagnostics"></pre><textarea id="qa-result" aria-label="验证结果" readonly></textarea></details>`);diagnosticNode=document.querySelector('#diagnostics')
 document.querySelector('#capture')?.addEventListener('click',()=>download(snapshot(),'driving-record.json'))
 document.querySelector('#perf')?.addEventListener('click',async()=>{const status=document.querySelector('#qa-status')!;status.textContent='采样中：预热10秒 + 采样60秒';const bench=(window as any).bench;if(!bench){status.textContent='采样工具未加载';return}const data=await bench.frames();(window as any).__performanceResult=data;const output=document.querySelector<HTMLTextAreaElement>('#qa-result');if(output)output.value=JSON.stringify(data);status.textContent=`P95 ${data.p95.toFixed(2)} ms · ${data.raw.length} 帧`;download(data,'frames.json')})
 document.querySelector('#resources')?.addEventListener('click',async()=>{const raw=[];for(let i=0;i<10;i++){reset();state='paused';renderer.render(scene,camera);raw.push({restart:i+1,...(window as any).bench.resources(renderer)});await new Promise<void>(r=>requestAnimationFrame(()=>r()))}(window as any).__resourcesResult=raw;renderUI();const out=document.querySelector<HTMLTextAreaElement>('#qa-result');if(out)out.value=JSON.stringify(raw);download(raw,'resources.json')})
}
window.addEventListener('keydown',e=>{if(['KeyW','KeyS','KeyA','KeyD','KeyQ','KeyE','Space','KeyP','Escape'].includes(e.code)){e.preventDefault();if((e.code==='KeyP'||e.code==='Escape')&&!e.repeat){if(state==='playing')pause();else if(state==='paused')resume();return}if(state==='playing')keys.add(e.code)}})
window.addEventListener('keyup',e=>keys.delete(e.code))
window.addEventListener('blur',()=>{keys.clear();if(state==='playing')pause()})
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='playing')pause()})
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)})
function frame(now:number){const dt=Math.min((now-last)/1000,.1);last=now;if(state==='playing'){accumulator+=dt;while(accumulator>=1/60){step(1/60);accumulator-=1/60}}else accumulator=0;updateCamera(dt);if(now-lastUi>90){updateHUD();lastUi=now}renderer.render(scene,camera);requestAnimationFrame(frame)}
ui.innerHTML='<div class="loading">PELICAN / 正在准备仓库与物理引擎…</div>'
PhysicsLoader('./vendor/ammo',()=>{try{physics=new AmmoPhysics(scene,{gravity:{x:0,y:layout.physics.gravity,z:0},maxSubSteps:4,fixedTimeStep:1/120});buildWarehouse();buildVehicle();buildCrates();physics.update(0);renderUI();updateCamera(1,true);(window as any).pelican={renderer,snapshot};const script=document.createElement('script');script.src='./performance.js';document.head.append(script);requestAnimationFrame(frame)}catch(e){ui.innerHTML=`<div class="loading">初始化失败：${e instanceof Error?e.message:String(e)}</div>`;console.error(e)}})
