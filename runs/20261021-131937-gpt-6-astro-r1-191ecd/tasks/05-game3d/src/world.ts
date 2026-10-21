import * as T from 'three'
import {box,beam,plaque,textureLabel,mergeGroup,mat,C,M} from './models'
export const ZONES=[{x:-5,z:-8,color:C.red,name:'珊瑚',letter:'A'},{x:0,z:-8,color:C.blue,name:'海蓝',letter:'B'},{x:5,z:-8,color:C.teal,name:'青绿',letter:'C'}]
export const ZONE_SIZE=3.6
export const OBSTACLES=[{x:-12.2,z:0,w:.4,d:26,h:5},{x:12.2,z:0,w:.4,d:26,h:5},{x:0,z:-13.2,w:24,d:.4,h:5},{x:0,z:13.2,w:24,d:.4,h:5},{x:-9.75,z:.1,w:2.25,d:13.5,h:4.6},{x:9.75,z:.1,w:2.25,d:13.5,h:4.6}]
export function warehouse(scene:T.Scene){const env=new T.Group();scene.add(env);
 const floorCanvas=document.createElement('canvas');floorCanvas.width=floorCanvas.height=512;const ctx=floorCanvas.getContext('2d')!;ctx.fillStyle='#a8b9b7';ctx.fillRect(0,0,512,512);let seed=2345;for(let i=0;i<30000;i++){seed=(seed*1664525+1013904223)>>>0;const x=seed%512;seed=(seed*1664525+1013904223)>>>0;const y=seed%512;ctx.fillStyle=`rgba(20,45,50,${(i%4)*.012})`;ctx.fillRect(x,y,1.5,1.5)}
 const floorTex=new T.CanvasTexture(floorCanvas);floorTex.wrapS=floorTex.wrapT=T.RepeatWrapping;floorTex.repeat.set(10,11);floorTex.colorSpace=T.SRGBColorSpace;floorTex.anisotropy=8;
 const floor=new T.MeshStandardMaterial({map:floorTex,roughness:.82,metalness:.08});box(env,24,.2,26,0,-.11,0,floor);
 const joints=mat(0x91a5a3,.9),line=mat(0xf5e6b5,.8),wall=mat(0xd4ddd5,.95),wallLow=mat(0x718e94,.88),rack=mat(0x284f5c,.5,.5),beamMat=mat(0xdc9c38,.5,.3),shelf=mat(0x8c9c98,.7,.6),carton=mat(0xb69b78,.94);
 for(let x=-12;x<=12;x+=3)box(env,.014,.005,26,x,.002,0,joints);for(let z=-12;z<=12;z+=3)box(env,24,.005,.014,0,.003,z,joints);
 for(const s of [-1,1]){box(env,.22,4.8,26,s*12.1,2.4,0,wall);box(env,.24,1.05,26,s*12.09,.525,0,wallLow);box(env,.3,.12,26,s*12.04,1.1,0,line);
 for(let z=-12;z<=12;z+=4){box(env,.22,5.8,.22,s*11.85,2.9,z,rack);beam(env,[s*11.85,4.7,z],[s*10.8,5.7,z],.05,rack)}
 box(env,.13,.035,21,s*8.24,.02,.2,line);for(let z=-6;z<6;z+=.65){const mark=box(env,.45,.018,.18,s*8.48,.014,z,line);mark.rotation.y=s*.6}
 }
 // North facade, loading doors and clerestory glazing.
 box(env,24,5.5,.25,0,2.75,-13.1,wall);box(env,24,1,.27,0,.5,-13.08,wallLow);
 const glass=new T.MeshStandardMaterial({color:0xb0d0cc,roughness:.22,metalness:.2,emissive:0x7bacae,emissiveIntensity:.3});
 for(let x=-10;x<=10;x+=2){box(env,1.8,1.2,.06,x,4.35,-12.93,glass);box(env,.065,1.25,.12,x,4.35,-12.86,rack)}
 for(const zone of ZONES){box(env,3.75,3.25,.2,zone.x,1.63,-12.91,rack,.04);box(env,3.42,2.95,.12,zone.x,1.5,-12.76,mat(0x9eafa9,.6,.35));for(let y=.2;y<3;y+=.21)box(env,3.42,.02,.02,zone.x,y,-12.684,joints);
 plaque(env,2.3,.43,zone.x,3.49,-12.65,textureLabel(`${zone.letter}  ${zone.name}港`,'DISPATCH BAY','#193b49','#f5eed8',512,128));
 box(env,3.9,.13,.2,zone.x,3.9,-12.78,beamMat,.03);
 // Painted pads are flush with floor and never physical obstacles.
 const pad=mat(zone.color,.89);pad.transparent=true;pad.opacity=.17;box(env,ZONE_SIZE,.012,ZONE_SIZE,zone.x,.015,zone.z,pad);
 const stripe=mat(zone.color,.72);for(const a of [-1,1]){box(env,.07,.015,ZONE_SIZE,zone.x+a*ZONE_SIZE/2,.025,zone.z,stripe);box(env,ZONE_SIZE,.015,.07,zone.x,.025,zone.z+a*ZONE_SIZE/2,stripe)}
 const lab=plaque(env,2.6,.75,zone.x,.04,zone.z-.6,textureLabel(`${zone.letter}  ${zone.name}`,'DELIVERY / 交付区',`#${zone.color.toString(16).padStart(6,'0')}`,'#fff4df',768,256));lab.rotation.x=-Math.PI/2;
 for(const a of [-1,1])for(const b of [-1,1]){box(env,.35,.02,.09,zone.x+a*1.55,.04,zone.z+b*1.58,line);box(env,.09,.02,.35,zone.x+a*1.58,.04,zone.z+b*1.55,line)}
 const arrow=new T.Shape();arrow.moveTo(-.12,-.4);arrow.lineTo(.12,-.4);arrow.lineTo(.12,.1);arrow.lineTo(.34,.1);arrow.lineTo(0,.45);arrow.lineTo(-.34,.1);arrow.lineTo(-.12,.1);arrow.closePath();const am=new T.Mesh(new T.ShapeGeometry(arrow),line);am.rotation.x=-Math.PI/2;am.position.set(zone.x,.015,-4.2);env.add(am);
 const supply=plaque(env,2,.48,zone.x,.018,1.1,textureLabel(`0${ZONES.indexOf(zone)+1} / PICK UP`,'插入箱底 · LIFT', '#9dafa9','#f7eed9',768,192));supply.rotation.x=-Math.PI/2;
 }
 // Twin steel racks, three levels, cross braces and packaged stock.
 for(const s of [-1,1]){const x=s*9.75;for(const dx of [-1.08,1.08])for(const z of [-6.65,-2.15,2.35,6.85]){box(env,.14,4.7,.14,x+dx,2.35,z,rack,.012);box(env,.3,.09,.3,x+dx,.045,z,beamMat,.02);for(let y=.5;y<4.4;y+=.35)box(env,.015,.04,.04,x+dx-s*.08,y,z,M.dark)}
 for(const y of [.36,1.95,3.55]){box(env,2.22,.07,13.5,x,y,.1,shelf);for(const dx of [-1.1,1.1])box(env,.12,.19,13.55,x+dx,y-.04,.1,beamMat);for(let i=0;i<3;i++){const z=-4.5+i*4.5;for(let k=0;k<2;k++){const bw=.72+(i%2)*.12,bh=.75+(k%2)*.2;box(env,bw,bh,1.35,x+(k-.5)*1.04,y+bh/2+.04,z+(y>2?.7:0),carton,.025);box(env,.065,bh+.014,1.36,x+(k-.5)*1.04,y+bh/2+.04,z+(y>2?.7:0),M.wood);box(env,bw,.055,1.36,x+(k-.5)*1.04,y+.28,z+(y>2?.7:0),M.wood)}}}
 for(let i=0;i<3;i++){const z=-6.65+i*4.5;beam(env,[x+s*1.09,.45,z],[x+s*1.09,3.6,z+4.5],.025,shelf);beam(env,[x+s*1.09,3.6,z],[x+s*1.09,.45,z+4.5],.025,shelf)}
 for(const z of [-6.75,6.95]){box(env,2.4,.23,.18,x,.14,z,beamMat,.04)}
 plaque(env,1.5,.5,x,4.15,6.94,textureLabel(s<0?'R—01':'R—02','PORT STORAGE','#193b49','#f1ce7c',512,160));}
 // Airy trusses suggest a roof without hiding the playable scene.
 for(const z of [-11,1,11]){box(env,24,.18,.15,0,5.75,z,rack);for(let x=-10;x<10;x+=4){beam(env,[x,5.75,z],[x+2,6.65,z],.045,rack);beam(env,[x+2,6.65,z],[x+4,5.75,z],.045,rack)}box(env,24,.12,.12,0,6.65,z,rack);for(const x of [-6,6]){beam(env,[x,5.75,z],[x,5.3,z],.015,M.dark);box(env,2.2,.08,.25,x,5.25,z,M.dark,.04);box(env,2,.018,.2,x,5.2,z,M.light,.02)}}
 // South entry wall matches the physical boundary; no invisible perimeter.
 box(env,24,4.8,.24,0,2.4,13.12,wall);box(env,24,.95,.26,0,.475,13.1,wallLow);box(env,5.2,3.25,.1,0,1.65,12.96,rack,.045);box(env,4.8,2.9,.06,0,1.6,12.88,shelf);
 for(let y=.2;y<3.05;y+=.18)box(env,4.78,.018,.018,0,y,12.839,joints);
 plaque(env,5.4,.85,0,3.88,12.81,textureLabel('PELICAN PORT','TRAINING WAREHOUSE  /  EST. 1984','#193b49','#f5d47b',1024,192),Math.PI);
 for(const x of [-10,-6,6,10]){box(env,.16,4.8,.25,x,2.4,12.94,rack);plaque(env,1.2,.48,x+1.4,1.9,12.86,textureLabel('SAFETY FIRST','安全第一','#d4ddd5','#34545e',512,192),Math.PI)}
 // South apron markings and signage.
 for(let i=0;i<8;i++)box(env,1,.014,.08,-7+i*2,.015,9,line);
 const sign=plaque(env,5.2,1.1,0,.025,10.6,textureLabel('PELICAN PORT','TRAINING GROUND  /  03','#a8b9b7','#d9e1d6',1024,256));sign.rotation.x=-Math.PI/2;
 mergeGroup(env);return env
}
