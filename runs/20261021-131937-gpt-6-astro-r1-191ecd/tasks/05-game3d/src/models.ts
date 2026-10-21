import * as T from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
export const C = { navy:0x193b49, yellow:0xf4bb35, teal:0x138c88, red:0xe16b50, blue:0x537ed1, cream:0xf5eed8 }
export const CAR_WIDTH=2.0
export const mat=(color:number,roughness=.65,metalness=0)=>new T.MeshStandardMaterial({color,roughness,metalness})
export const M={ paint:mat(C.yellow,.3,.32), dark:mat(C.navy,.48,.55), steel:mat(0x71888d,.32,.8), rubber:mat(0x253139,.93), tireSide:mat(0x37444a,.76), seat:mat(0x344549,.97), feather:mat(0xf9f2dd,.86), featherShade:mat(0xdedbcd,.9), beak:mat(0xf2b53f,.48), pouch:mat(0xe9a24f,.74), white:mat(0xf7f1de,.6), black:mat(0x13272f,.4), teal:mat(C.teal,.42,.3), wood:mat(0x9b7955,.9), rim:mat(0xc2cbca,.38,.6), light:new T.MeshStandardMaterial({color:0xfff0b5,emissive:0xffe1a1,emissiveIntensity:1.3}), tail:new T.MeshStandardMaterial({color:0xec5b39,emissive:0xe34a22,emissiveIntensity:.5}) }
const geoCache=new Map<string,T.BufferGeometry>()
export function box(p:T.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material,r=0){
 const key=`b${w},${h},${d},${r}`;let g=geoCache.get(key);if(!g){g=r?new RoundedBoxGeometry(w,h,d,2,r):new T.BoxGeometry(w,h,d);geoCache.set(key,g)}
 const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o
}
export function ell(p:T.Object3D,x:number,y:number,z:number,sx:number,sy:number,sz:number,m:T.Material){
 let g=geoCache.get('sphere');if(!g){g=new T.SphereGeometry(1,24,16);geoCache.set('sphere',g)}const o=new T.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;o.receiveShadow=true;p.add(o);return o
}
export function cyl(p:T.Object3D,r:number,len:number,x:number,y:number,z:number,m:T.Material,axis='y',rt=r){
 const key=`c${r},${rt},${len}`;let g=geoCache.get(key);if(!g){g=new T.CylinderGeometry(rt,r,len,24);geoCache.set(key,g)}const o=new T.Mesh(g,m);o.position.set(x,y,z);if(axis==='x')o.rotation.z=Math.PI/2;if(axis==='z')o.rotation.x=Math.PI/2;o.castShadow=true;o.receiveShadow=true;p.add(o);return o
}
export function tube(p:T.Object3D,pts:number[][],radius:number,m:T.Material){const curve=new T.CatmullRomCurve3(pts.map(v=>new T.Vector3(...v as [number,number,number])));const o=new T.Mesh(new T.TubeGeometry(curve,32,radius,10,false),m);p.add(o);o.castShadow=true;return o}
export function beam(p:T.Object3D,a:number[],b:number[],radius:number,m:T.Material){const av=new T.Vector3(...a as [number,number,number]),bv=new T.Vector3(...b as [number,number,number]);const d=bv.clone().sub(av);const o=cyl(p,radius,d.length(),...av.add(bv).multiplyScalar(.5).toArray() as [number,number,number],m);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return o}
export function textureLabel(text:string,sub:string,bg='#193b49',fg='#fff4d5',width=512,height=256){const c=document.createElement('canvas');c.width=width;c.height=height;const x=c.getContext('2d')!;x.fillStyle=bg;x.fillRect(0,0,width,height);x.fillStyle=fg;x.textAlign='center';x.font=`bold ${height*.37}px sans-serif`;x.fillText(text,width/2,height*.49);x.font=`${height*.13}px monospace`;x.fillText(sub,width/2,height*.78);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=8;return new T.MeshStandardMaterial({map:t,roughness:.8})}
export function plaque(p:T.Object3D,w:number,h:number,x:number,y:number,z:number,m:T.Material,ry=0){const mesh=new T.Mesh(new T.PlaneGeometry(w,h),m);mesh.position.set(x,y,z);mesh.rotation.y=ry;p.add(mesh);return mesh}
export function mergeGroup(group:T.Group){group.updateMatrixWorld(true);const inv=group.matrixWorld.clone().invert(),sets=new Map<T.Material,T.BufferGeometry[]>();const meshes:T.Mesh[]=[];group.traverse(o=>{if(o instanceof T.Mesh&&!Array.isArray(o.material)){meshes.push(o);const g=o.geometry.clone().applyMatrix4(inv.clone().multiply(o.matrixWorld));if(!g.getAttribute('uv'))g.setAttribute('uv',new T.Float32BufferAttribute(new Float32Array(g.getAttribute('position').count*2),2));if(g.index) {const n=g.toNonIndexed();g.dispose();sets.set(o.material,[...(sets.get(o.material)||[]),n])}else sets.set(o.material,[...(sets.get(o.material)||[]),g])}});for(const o of meshes)o.removeFromParent();for(const [m,gs] of sets){const g=mergeGeometries(gs,false);gs.forEach(a=>a.dispose());if(g){const o=new T.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;group.add(o)}}}
function pelican(){const p=new T.Group();
 ell(p,0,1.65,-.3,.31,.43,.39,M.feather);ell(p,0,1.45,-.05,.27,.25,.28,M.featherShade);
 const neck=tube(p,[[0,1.84,-.15],[0,2.02,-.12],[0,2.2,-.22],[0,2.37,-.14],[0,2.43,.03]],.115,M.feather);neck.scale.x=.92;
 ell(p,0,2.43,.08,.19,.19,.26,M.feather);
 // Upper bill: oval cross sections taper into a curved tip.
 const pts:number[]=[];const indices:number[]=[];const rings=[[.22,2.4,.12,.06],[.42,2.39,.13,.06],[.73,2.35,.085,.035],[.98,2.32,.014,.025]];
 for(const [z,y,rx,ry]of rings)for(let i=0;i<16;i++){const a=i/16*Math.PI*2;pts.push(Math.cos(a)*rx,y+Math.sin(a)*ry,z)}
 for(let j=0;j<3;j++)for(let i=0;i<16;i++){const a=j*16+i,b=j*16+(i+1)%16;indices.push(a,b,a+16,b,b+16,a+16)}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pts,3));g.setIndex(indices);g.computeVertexNormals();const bill=new T.Mesh(g,M.beak);bill.castShadow=true;p.add(bill);
 const pouch=ell(p,0,2.29,.43,.115,.15,.32,M.pouch);pouch.rotation.x=-.15;beam(p,[-.102,2.36,.26],[-.035,2.3,.88],.011,M.dark);beam(p,[.102,2.36,.26],[.035,2.3,.88],.011,M.dark);
 for(const s of [-1,1]){ell(p,s*.159,2.47,.18,.041,.046,.046,M.pouch);ell(p,s*.187,2.475,.188,.018,.025,.026,M.black);ell(p,s*.198,2.483,.2,.006,.008,.007,M.white);
 const wing=ell(p,s*.273,1.77,-.3,.105,.32,.28,M.featherShade);wing.rotation.z=-s*.18;
 for(let i=0;i<5;i++){const f=ell(p,s*(.296+i*.008),1.7-i*.035,-.26-i*.055,.055,.21,.075,i%2?M.feather:M.featherShade);f.rotation.x=-.3;f.rotation.z=-s*.2}
 const arm=ell(p,s*.25,1.69,.04,.085,.12,.28,M.feather);arm.rotation.x=-.3;
 beam(p,[s*.15,1.35,-.05],[s*.2,1.04,.25],.047,M.pouch);const foot=ell(p,s*.2,1.02,.35,.13,.045,.19,M.beak);foot.rotation.y=s*.15;
 for(let i=0;i<3;i++)beam(p,[s*.2,1.045,.3],[s*.2+(i-1)*.08,1.03,.51],.012,M.pouch)
 }
 // Three swept tail feathers, tucked safely behind the seat.
 for(let i=-1;i<=1;i++){const f=ell(p,i*.08,1.48,-.62,.055,.08,.21,M.featherShade);f.rotation.y=i*.18}
 // A tiny navy dockworker cap.
 ell(p,0,2.585,.05,.175,.065,.175,M.teal);box(p,.28,.025,.19,0,2.573,.2,M.teal,.02);
 mergeGroup(p);return p
}
export function forklift(){const root=new T.Group(),body=new T.Group();root.add(body);
 box(body,1.53,.34,2.4,0,.48,-.08,M.dark,.14);
 // Continuous cast counterweight with a true rear wheel arch in its profile.
 const weightShape=new T.Shape();weightShape.moveTo(-1.36,.48);weightShape.lineTo(-1.36,1.03);weightShape.quadraticCurveTo(-1.36,1.25,-1.14,1.25);weightShape.lineTo(-.62,1.25);weightShape.quadraticCurveTo(-.4,1.25,-.4,1.04);weightShape.lineTo(-.4,.48);weightShape.lineTo(-.494,.48);weightShape.absarc(-.91,.37,.43,.259,Math.PI-.259,false);weightShape.lineTo(-1.36,.48);weightShape.closePath();const weightGeo=new T.ExtrudeGeometry(weightShape,{depth:1.38,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:18});const weight=new T.Mesh(weightGeo,M.paint);weight.rotation.y=-Math.PI/2;weight.position.x=.69;weight.castShadow=true;body.add(weight);
 box(body,1.37,.15,.73,0,1.27,-.87,M.paint,.06);box(body,1.57,.19,.2,0,.39,-1.31,M.rubber,.05);
 for(const s of [-1,1]){box(body,.16,.42,1.35,s*.68,.74,.15,M.paint,.06);box(body,.2,.1,.9,s*.8,.42,-.02,M.steel,.025);
 box(body,.15,.14,.7,s*.8,1.01,.86,M.paint,.04);box(body,.15,.14,.66,s*.8,.86,-.9,M.paint,.04);
 for(let k=0;k<5;k++)box(body,.012,.08,.36,s*.775,.82+k*.065,-.85,M.dark,.005);
 box(body,.035,.13,.38,s*.78,1.09,-.9,M.dark,.02);
 const side=plaque(body,.55,.18,s*.787,.97,-.25,textureLabel('P—03','ELECTRIC LIFT','#efb732','#193b49',512,128),s*Math.PI/2);side.rotation.y=s*Math.PI/2;
 for(let k=0;k<6;k++)box(body,.06,.015,.58,s*.78,.485,-.2+k*.09,M.rubber,.004);
 box(body,.1,.12,.25,s*.6,.93,1.15,M.dark,.03);box(body,.085,.09,.025,s*.6,.94,1.286,M.light,.018);
 box(body,.27,.11,.045,s*.48,.9,-1.442,M.tail,.025)
 }
 for(let k=0;k<4;k++)box(body,.5,.018,.025,0,.87+k*.042,-1.434,M.dark,.004);
 plaque(body,.59,.2,0,.7,-1.43,textureLabel('PELICAN','P O R T   E L E C T R I C','#193b49','#f5d478',512,128),Math.PI);
 box(body,.96,.09,.81,0,.955,.28,M.dark,.035);for(let i=0;i<7;i++)box(body,.9,.012,.025,0,1.005,.04+i*.1,M.rubber,.005);box(body,.75,.1,.72,0,1.1,-.25,M.seat,.08);const back=box(body,.73,.58,.16,0,1.4,-.59,M.seat,.08);back.rotation.x=-.12;
 for(let i=-2;i<=2;i++)box(body,.015,.4,.013,i*.115,1.4,-.49,M.tireSide,.005);
 box(body,.66,.22,.3,0,1.44,.71,M.dark,.055);
 const dash=box(body,.34,.012,.16,0,1.558,.7,M.teal,.02);dash.rotation.x=.1;
 for(let i=0;i<3;i++)cyl(body,.026,.014,-.2+i*.07,1.565,.73,i===0?M.tail:M.light);
 beam(body,[0,1.28,.68],[0,1.7,.45],.035,M.steel);
 const steering=new T.Group();steering.position.set(0,1.71,.45);steering.rotation.x=-.62;body.add(steering);
 const ring=new T.Mesh(new T.TorusGeometry(.19,.023,8,32),M.rubber);steering.add(ring);ring.castShadow=true;
 for(let i=0;i<3;i++){const a=i*Math.PI*2/3;beam(steering,[0,0,0],[Math.sin(a)*.18,Math.cos(a)*.18,0],.012,M.steel)}cyl(steering,.04,.04,0,0,0,M.dark,'z');
 beam(body,[.46,1.21,.38],[.44,1.56,.32],.016,M.steel);ell(body,.44,1.57,.32,.04,.04,.04,M.rubber);
 // Overhead protection with open slats and structural corner posts.
 for(const x of [-.65,.65])for(const z of [-.72,.9]){beam(body,[x,.83,z],[x,2.88,z-.12],.044,M.dark);box(body,.12,.09,.19,x,2.85,z-.12,M.dark,.02)}
 box(body,1.44,.1,1.98,0,2.89,-.03,M.dark,.07);
 // Roof panel with sunlit yellow center and ribs.
 box(body,1.24,.055,1.73,0,2.965,-.03,M.paint,.05);
 for(let i=0;i<7;i++)box(body,1.23,.035,.025,0,3.007,-.7+i*.22,M.dark,.006);
 cyl(body,.09,.09,.48,3.07,-.64,M.black);cyl(body,.073,.11,.48,3.16,-.64,M.beak);
 for(const s of [-1,1]){beam(body,[s*.66,2.22,.76],[s*.91,2.28,.76],.02,M.dark);box(body,.14,.21,.05,s*.93,2.25,.78,M.black,.025);box(body,.105,.17,.012,s*.93,2.25,.813,M.rim,.015)}
 // Fixed mast rails, foot bridge, hydraulic cylinder and chain loops.
 for(const s of [-1,1]){box(body,.14,2.65,.19,s*.53,1.46,1.25,M.dark,.025);box(body,.035,2.4,.065,s*.456,1.5,1.32,M.steel,.008);box(body,.055,2.4,.055,s*.32,1.5,1.32,M.rubber,.006);
 for(let i=0;i<22;i++)box(body,.07,.025,.03,s*.32,.35+i*.107,1.356,M.steel,.004)}
 box(body,1.19,.16,.2,0,2.78,1.25,M.dark,.025);box(body,1.19,.15,.2,0,.24,1.25,M.dark,.025);
 cyl(body,.08,1.35,0,.97,1.24,M.dark);cyl(body,.043,1.16,0,2.04,1.24,M.rim);
 tube(body,[[.2,.5,1.18],[.19,2.6,1.17],[.02,2.68,1.17],[-.1,2.5,1.17]],.025,M.rubber);
 mergeGroup(body);root.add(pelican());
 const wheels:{pivot:T.Group,roll:T.Group,rear:boolean}[]=[];
 for(const z of [-.91,.85])for(const s of [-1,1]){const rear=z<0,r=rear?.37:.46,pivot=new T.Group(),roll=new T.Group();pivot.position.set(s*(CAR_WIDTH/2-.185),r,z);pivot.add(roll);root.add(pivot);
 cyl(roll,r,.29,0,0,0,M.rubber,'x');cyl(roll,r*.88,.305,0,0,0,M.tireSide,'x');cyl(roll,r*.6,.32,0,0,0,M.dark,'x');cyl(roll,r*.46,.335,0,0,0,M.rim,'x');cyl(roll,r*.2,.37,0,0,0,M.dark,'x');
 for(let i=0;i<24;i++){const a=i/24*Math.PI*2;const t=box(roll,.27,.038,.075,0,Math.cos(a)*r,Math.sin(a)*r,M.rubber,.01);t.rotation.x=a;}
 for(let i=0;i<6;i++){const a=i/6*Math.PI*2;cyl(roll,.025,.35,0,Math.sin(a)*r*.33,Math.cos(a)*r*.33,M.steel,'x')}
 mergeGroup(roll);wheels.push({pivot,roll,rear})}
 const carriage=new T.Group();root.add(carriage);
 box(carriage,1.19,.42,.15,0,.33,1.43,M.steel,.025);box(carriage,1.22,.07,.08,0,.56,1.52,M.dark,.015);
 for(const s of [-1,1]){box(carriage,.18,.62,.09,s*.37,.33,1.57,M.dark,.025);box(carriage,.18,.085,1.12,s*.37,0,2.06,M.steel,.018);
 // Tapered fork tip.
 const shape=new T.Shape();shape.moveTo(-.09,0);shape.lineTo(.09,0);shape.lineTo(.065,.28);shape.lineTo(-.065,.28);shape.closePath();const g=new T.ExtrudeGeometry(shape,{depth:.04,bevelEnabled:false});g.rotateX(Math.PI/2);const tip=new T.Mesh(g,M.steel);tip.position.set(s*.37,.022,2.62);tip.castShadow=true;carriage.add(tip);
 cyl(carriage,.085,.1,s*.53,.32,1.3,M.rubber,'x');}
 for(let i=-3;i<=3;i++)box(carriage,.035,.65,.035,i*.15,.77,1.46,M.dark,.007);box(carriage,1.14,.05,.06,0,1.1,1.46,M.dark,.01);
 mergeGroup(carriage);return {root,wheels,carriage,steering}
}
export const CRATE={w:1.35,h:1.3,d:1.15}
export function cargo(index:number,color:number){const root=new T.Group(),m=mat(color,.65,.08),edge=mat(new T.Color(color).multiplyScalar(.73).getHex(),.7,.15);const {w,h,d}=CRATE;
 // Origin is the bottom of the pallet; the two pockets remain visibly open.
 for(const x of [-.54,0,.54])box(root,.16,.12,d,x,.08,0,M.wood,.013);
 for(let i=0;i<5;i++)box(root,w,.045,.18,0,.165,-.46+i*.23,M.wood,.009);
 box(root,w-.05,h-.22,d-.04,0,(h+.22)/2,0,m,.045);
 for(const x of [-w/2+.035,w/2-.035])for(const z of [-d/2+.035,d/2-.035])box(root,.055,h-.2,.055,x,(h+.2)/2,z,edge,.012);
 for(const y of [.24,h-.03]){box(root,w,.055,d,0,y,0,edge,.01)}
 for(const x of [-.4,.4]){box(root,.04,h-.2,d+.012,x,(h+.2)/2,0,M.white,.007)}
 const lab=textureLabel(['A / 珊瑚','B / 海蓝','C / 青绿'][index],'PORT CARGO · 180 KG','#f3ebd6','#233c43',512,256);
 for(const s of [-1,1]){plaque(root,.72,.36,0,.82,s*(d/2+.01),lab,s===1?0:Math.PI);const l=plaque(root,.4,.19,s*(w/2+.01),.85,0,textureLabel('↑ ↑','HANDLE WITH CARE','#f3ebd6','#233c43',256,128),s*Math.PI/2);l.rotation.y=s*Math.PI/2}
 box(root,w-.12,.02,.02,0,h+.006,0,edge);mergeGroup(root);return root
}
