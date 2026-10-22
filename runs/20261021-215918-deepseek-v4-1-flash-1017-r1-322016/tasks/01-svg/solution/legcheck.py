import math
BB=(338.0,386.0); R=26.0; ANK=9.0; L=59.0
HIPS={'near':(306.0,304.0),'far':(294.0,302.0)}
SIDES={'near':1.0,'far':-1.0}
N=48
def ik(H,A):
    hx,hy=H; ax,ay=A
    dx,dy=ax-hx,ay-hy
    d=math.hypot(dx,dy)
    d=min(d,L*2-0.01)
    ux,uy=dx/d,dy/d
    d1=d/2.0
    h=math.sqrt(max(0.0,L*L-d1*d1))
    # knee forward: perpendicular with +x component
    px,py=uy,-ux
    if px<0: px,py=-px,-py
    kx=hx+ux*d1+h*px; ky=hy+uy*d1+h*py
    return (kx,ky),d,h
print('samples:')
vals={}
for side in ('near','far'):
    H=HIPS[side]; s=SIDES[side]
    arr=[]; maxd=0
    for i in range(N+1):
        a=math.radians(360*3*i/N)
        A=(BB[0]+s*R*math.cos(a), BB[1]+s*R*math.sin(a)-ANK)
        (kx,ky),d,h=ik(H,A)
        maxd=max(maxd,d)
        arr.append(f'M{H[0]:.1f},{H[1]:.1f} L{kx:.1f},{ky:.1f} L{A[0]:.1f},{A[1]:.1f}')
    vals[side]=arr
    print(side,'values',len(arr),'maxd',round(maxd,2),'maxreach',2*L)
    print(' t0:',arr[0]); print(' t0.5:',arr[8]); print(' t1.0:',arr[16]); print(' t1.5:',arr[24]); print(' t2.0:',arr[32]); print(' t3.0:',arr[48])
    print(' loop same:', arr[0]==arr[48])
# foot/pedal positions at four crank phases t=0,.5,1,1.5
for t in (0,0.5,1.0,1.5,2.0):
    a=360*3*t/6
    for side in ('near','far'):
        s=SIDES[side]
        print(f't={t} {side} pedal', (round(BB[0]+s*R*math.cos(math.radians(a)),2), round(BB[1]+s*R*math.sin(math.radians(a)),2)), 'ankle', (round(BB[0]+s*R*math.cos(math.radians(a)),2), round(BB[1]+s*R*math.sin(math.radians(a))-ANK,2)))
# head extreme positions under look-back transform
pivot=(350.0,204.0); base=(326.0,248.0)
for lean,tilt in ((0,0),(-6,-22)):
    la=math.radians(lean); c,s=math.cos(la),math.sin(la)
    # pivot in neck base local coords
    lx,ly=24.0,-44.0
    wx=base[0]+c*lx-s*ly; wy=base[1]+s*lx+c*ly
    ta=math.radians(tilt)
    pts={'head':(-14,-22),'tip':(-130,-34),'pouch':(-76,10)}
    for name,(x,y) in pts.items():
        # mirrored x first, then rotate by tilt
        x=-x
        rx=x*math.cos(ta)-y*math.sin(ta); ry=x*math.sin(ta)+y*math.cos(ta)
        print('head',lean,tilt,name,round(wx+rx,1),round(wy+ry,1))
