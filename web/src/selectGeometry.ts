export type AnchorRect={left:number;top:number;right:number;bottom:number;width:number;height:number}

/** Use viewport coordinates so a scaled slide cannot scale the popup a second time. */
export function placeSelect(anchor:AnchorRect,viewport:{width:number;height:number},desiredHeight:number){
 const margin=8,gap=6
 const width=Math.min(Math.max(anchor.width,200),Math.max(0,viewport.width-margin*2))
 const below=Math.max(0,viewport.height-margin-anchor.bottom-gap)
 const above=Math.max(0,anchor.top-margin-gap)
 const upward=desiredHeight>below&&above>below
 const maxHeight=Math.min(desiredHeight,upward?above:below)
 return {
  left:Math.max(margin,Math.min(anchor.left,viewport.width-margin-width)),
  top:upward?Math.max(margin,anchor.top-gap-maxHeight):Math.max(margin,anchor.bottom+gap),
  width,maxHeight,upward,
 }
}
