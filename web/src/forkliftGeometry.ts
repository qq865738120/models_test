// Orthographic scene geometry. Every visible surface uses one camera and BSP
// depth ordering, including curved parts and surfaces that overlap on screen.
export type V3=[number,number,number]
export type Face={points:V3[];color:string;part:string;wheel?:{x:number;y:number;radius:number}}
export const camera:V3=[-2/3,1,.73]
export const add=(a:V3,b:V3):V3=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]]
export const sub=(a:V3,b:V3):V3=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]]
export const mul=(a:V3,n:number):V3=>[a[0]*n,a[1]*n,a[2]*n]
export const dot=(a:V3,b:V3)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
export const cross=(a:V3,b:V3):V3=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
const unit=(a:V3)=>mul(a,1/Math.hypot(...a))
const center=(p:V3[])=>mul(p.reduce(add,[0,0,0]),1/p.length)
const normal=(f:Face)=>unit(cross(sub(f.points[1],f.points[0]),sub(f.points[2],f.points[0])))
export const project=(p:V3)=>[164+.9*p[0]+.6*p[1],245-.42*p[0]+.45*p[1]-p[2]]
const light=unit([-1,-.3,2])
const shade=(hex:string,n:V3)=>{
 const gain=.82+.18*Math.max(0,dot(n,light))
 return '#'+[1,3,5].map(i=>Math.round(parseInt(hex.slice(i,i+2),16)*gain).toString(16).padStart(2,'0')).join('')
}
function surface(out:Face[],points:V3[],inside:V3,color:string,part:string){
 const clean=points.filter((p,i)=>Math.hypot(...sub(p,points[(i+1)%points.length]))>1e-6)
 if(clean.length<3)return
 let n=cross(sub(clean[1],clean[0]),sub(clean[2],clean[0]))
 if(Math.hypot(...n)<1e-7)return
 if(dot(n,sub(center(clean),inside))<0){clean.reverse();n=mul(n,-1)}
 n=unit(n)
 if(dot(n,camera)>1e-6)out.push({points:clean,color:shade(color,n),part})
}
function box(out:Face[],lo:V3,hi:V3,color:string,part:string){
 const p=(x:number,y:number,z:number):V3=>[x?hi[0]:lo[0],y?hi[1]:lo[1],z?hi[2]:lo[2]]
 const c=mul(add(lo,hi),.5)
 for(const a of [0,1]){
  surface(out,[p(a,0,0),p(a,1,0),p(a,1,1),p(a,0,1)],c,color,part)
  surface(out,[p(0,a,0),p(1,a,0),p(1,a,1),p(0,a,1)],c,color,part)
  surface(out,[p(0,0,a),p(1,0,a),p(1,1,a),p(0,1,a)],c,color,part)
 }
}
function ellipsoid(out:Face[],c:V3,r:V3,color:string,part:string){
 const p=(i:number,j:number):V3=>{const a=i/8*Math.PI,b=j/16*2*Math.PI;return add(c,[r[0]*Math.sin(a)*Math.cos(b),r[1]*Math.sin(a)*Math.sin(b),r[2]*Math.cos(a)])}
 for(let i=0;i<8;i++)for(let j=0;j<16;j++){
  // Triangles are planar even at the poles; all adjacent vertices are shared.
  const a=p(i,j),b=p(i+1,j),d=p(i,j+1),e=p(i+1,j+1)
  surface(out,[a,b,e],c,color,part);surface(out,[a,e,d],c,color,part)
 }
}
function cylinder(out:Face[],a:V3,b:V3,r:number,color:string,part:string,segments=16){
 const axis=unit(sub(b,a)),u=unit(cross(axis,Math.abs(axis[2])<.9?[0,0,1]:[0,1,0])),v=cross(axis,u),c=mul(add(a,b),.5)
 const ring=(p:V3)=>Array.from({length:segments},(_,i)=>add(p,add(mul(u,r*Math.cos(i/segments*2*Math.PI)),mul(v,r*Math.sin(i/segments*2*Math.PI)))))
 const ar=ring(a),br=ring(b)
 surface(out,ar,c,color,part);surface(out,br,c,color,part)
 for(let i=0;i<segments;i++)surface(out,[ar[i],ar[(i+1)%segments],br[(i+1)%segments],br[i]],c,color,part)
}
function ring(out:Face[],c:V3,n:V3,r:number,color:string,part:string){
 const axis=unit(n),u:V3=[0,1,0],v=cross(axis,u)
 const p=(i:number,size:number)=>add(c,add(mul(u,size*Math.cos(i/24*2*Math.PI)),mul(v,size*Math.sin(i/24*2*Math.PI))))
 for(let i=0;i<24;i++)surface(out,[p(i,r-1.6),p(i,r+1.6),p(i+1,r+1.6),p(i+1,r-1.6)],sub(c,axis),color,part)
}
export const dimensions={bodyFront:55,bodyHalfWidth:32,bodyBottom:18,bodyTop:48,wheelRadius:20,wheelHeight:20,mastRear:55,mastFront:62,mastHalfWidth:29,forkHeel:68,forkBottom:18,forkTop:23,palletBottom:23,palletTop:29,loadBottom:29,roofBottom:137,headTop:120}
export function buildForklift():Face[]{
 const f:Face[]=[],d=dimensions
 box(f,[-75,-32,d.bodyBottom],[d.bodyFront,32,d.bodyTop],'#dfac65','chassis')
 // Four complete tires lie outside the chassis sides and touch the same ground.
 for(const x of [-53,34])for(const sign of [-1,1]){
  const firstFace=f.length
  cylinder(f,[x,sign*32,20],[x,sign*43,20],20,'#485565','tire',24)
  cylinder(f,[x,sign*43,20],[x,sign*44,20],12,'#8695a4','wheel-rim',24)
  cylinder(f,[x,sign*44,20],[x,sign*45,20],6,'#dce0e2','wheel-hub',24)
  // Animate markings only on wheel end caps. BSP fragments keep this metadata,
  // so rotating details are clipped by the same occlusion as the static wheel.
  for(const face of f.slice(firstFace))if(['tire','wheel-rim'].includes(face.part)&&face.points.every(p=>Math.abs(p[1]-face.points[0][1])<1e-6)){
   face.wheel={x,y:face.points[0][1],radius:face.part==='tire'?16:9}
  }
 }
 for(const x of [-60,28])for(const y of [-27,27])box(f,[x-2.5,y-2.5,48],[x+2.5,y+2.5,137],'#7e91a1','cab-post')
 box(f,[-66,-34,137],[35,34,143],'#a6b9c8','canopy')
 box(f,[-39,-16,51],[-10,16,57],'#647382','seat')
 box(f,[-40,-16,55],[-34,16,83],'#647382','seat-back')
 ellipsoid(f,[-19,0,76],[17,13,22],'#fffdf6','pelican-body')
 ellipsoid(f,[-7,5,92],[9,9,17],'#fffdf6','pelican-neck')
 ellipsoid(f,[0,8,106],[12,11,14],'#fffdf6','pelican-head')
 ellipsoid(f,[17,8,100],[15,9,6],'#db8a43','pelican-pouch')
 const beak:V3[]=[[8,-2,108],[8,18,108],[8,18,103],[8,-2,103],[43,8,102]],bc=center(beak)
 surface(f,beak.slice(0,4),bc,'#e9a058','pelican-beak')
 for(let i=0;i<4;i++)surface(f,[beak[i],beak[(i+1)%4],beak[4]],bc,'#e9a058','pelican-beak')
 ellipsoid(f,[2,18.8,111],[2.3,1.8,2.3],'#374350','pelican-eye')
 for(const y of [-9,9]){
  cylinder(f,[-15,y,56],[5,y,50],2.5,'#d9a266','pelican-leg',10)
  cylinder(f,[5,y,50],[20,y,50],3,'#d9a266','pelican-foot',10)
 }
 cylinder(f,[32,0,48],[20,0,81],2.2,'#596d7e','steering-column')
 ring(f,[20,0,81],[-12,0,33],12,'#596d7e','steering-wheel')
 cylinder(f,[20,-11,81],[20,11,81],1.2,'#596d7e','steering-spoke',8)
 for(const sign of [-1,1]){
  cylinder(f,[-15,sign*11,82],[2,sign*14,73],3.5,'#c8d1d7','pelican-wing',12)
  cylinder(f,[2,sign*14,73],[20,sign*10.5,81],3,'#c8d1d7','pelican-wing',12)
 }
 // Mount overlaps the chassis; uprights align with its front plane, not offsets
 // guessed in screen coordinates. Fork heels and load supports share surfaces.
 box(f,[48,-32,20],[62,32,40],'#72899c','mast-mount')
 for(const y of [-26,26])box(f,[d.mastRear,y-3,20],[d.mastFront,y+3,129],'#849cad','mast-upright')
 box(f,[55,-29,119],[62,29,125],'#849cad','mast-crossbar')
 box(f,[62,-29,23],[d.forkHeel,29,42],'#7d95a8','carriage')
 for(const y of [-22,22]){
  box(f,[62,y-4,18],[68,y+4,42],'#7d95a8','fork-heel')
  box(f,[d.forkHeel,y-4,d.forkBottom],[155,y+4,d.forkTop],'#8ca3b4','fork-tine')
 }
 box(f,[79,-31,d.palletBottom],[149,31,d.palletTop],'#d0b18a','pallet')
 box(f,[82,-28,d.loadBottom],[144,28,84],'#c4a4be','load')
 // Tape is placed just above the actual top/side surfaces, not a floating stroke.
 box(f,[110,-28.08,29],[114,28.08,84.08],'#eadce7','load-tape')
 return f
}
const EPS=1e-6
function split(face:Face,n:V3,w:number):{front?:Face;back?:Face;coplanar?:Face}{
 const ds=face.points.map(p=>dot(n,p)-w)
 if(ds.every(d=>Math.abs(d)<EPS))return {coplanar:face}
 if(ds.every(d=>d>=-EPS))return {front:face}
 if(ds.every(d=>d<=EPS))return {back:face}
 const front:V3[]=[],back:V3[]=[]
 face.points.forEach((p,i)=>{
  const j=(i+1)%ds.length,q=face.points[j],a=ds[i],b=ds[j]
  if(a>=-EPS)front.push(p);if(a<=EPS)back.push(p)
  if(a*b<0&&Math.abs(a)>EPS&&Math.abs(b)>EPS){const hit=add(p,mul(sub(q,p),a/(a-b)));front.push(hit);back.push(hit)}
 })
 return {front:front.length>=3?{...face,points:front}:undefined,back:back.length>=3?{...face,points:back}:undefined}
}
export function depthOrder(faces:Face[]):Face[]{
 if(!faces.length)return []
 const pivot=faces[0],n=normal(pivot),w=dot(n,pivot.points[0]),front:Face[]=[],back:Face[]=[],same:Face[]=[]
 for(const face of faces){const pieces=split(face,n,w);if(pieces.front)front.push(pieces.front);if(pieces.back)back.push(pieces.back);if(pieces.coplanar)same.push(pieces.coplanar)}
 // Parallel projection: camera direction decides which half-space is nearer.
 return dot(n,camera)>0?[...depthOrder(back),...same,...depthOrder(front)]:[...depthOrder(front),...same,...depthOrder(back)]
}
export const forkliftFaces=buildForklift()
export const forkliftSurfaces=depthOrder(forkliftFaces).map(f=>({...f,screen:f.points.map(project)}))
