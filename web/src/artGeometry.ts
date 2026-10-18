export const bike={hip:[151,150],crank:[180,220],crankRadius:19,legLength:48,wheelRadius:47.5,axleY:228,ground:275.5,trayTop:168.5} as const
export function bikeLeg(angle:number){
 const x=bike.crank[0]+bike.crankRadius*Math.cos(angle),y=bike.crank[1]+bike.crankRadius*Math.sin(angle)
 const [hx,hy]=bike.hip,dx=x-hx,dy=y-hy,d=Math.hypot(dx,dy)
 const along=d/2,height=Math.sqrt(bike.legLength**2-along**2)
 const knee:[number,number]=[hx+along*dx/d+height*dy/d,hy+along*dy/d-height*dx/d]
 return {x,y,knee,path:`M${hx} ${hy} L${knee[0].toFixed(3)} ${knee[1].toFixed(3)} L${x.toFixed(3)} ${y.toFixed(3)}`}
}
export const platforms={start:[72,244.5],control:[125,70],end:[180,188.5],parcel:[155,135,33,33]} as const
export function platformPose(phase:number){
 let t=0
 if(phase>=.12&&phase<.4)t=(phase-.12)/.28
 else if(phase>=.4&&phase<.56)t=1
 else if(phase>=.56&&phase<.84)t=1-(phase-.56)/.28
 const [a,b,c]=[platforms.start,platforms.control,platforms.end]
 return {x:(1-t)**2*a[0]+2*(1-t)*t*b[0]+t*t*c[0],y:(1-t)**2*a[1]+2*(1-t)*t*b[1]+t*t*c[1]}
}
export const jumpPath=`M${platforms.start.join(' ')}Q${platforms.control.join(' ')} ${platforms.end.join(' ')}`
