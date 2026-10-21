import Phaser from 'phaser'
import './style.css'

// The supplied level.json contains resource metadata only. This is the authored level.
const WORLD = { width: 3380, height: 720, gravity: 900, speed: 270, jump: -580, seconds: 120, spawn: { x: 110, y: 600 } }
const FIXED = [
  {x:0,y:600,w:760,h:32,ground:true},{x:240,y:475,w:170,h:25},{x:480,y:350,w:180,h:25},
  {x:1180,y:600,w:840,h:32,ground:true},{x:1230,y:475,w:170,h:25},{x:1460,y:350,w:180,h:25},
  {x:2360,y:600,w:1020,h:32,ground:true},{x:2420,y:475,w:170,h:25},{x:2650,y:350,w:180,h:25},{x:2910,y:455,w:170,h:25},
]
const FERRIES = [{x:790,y:525,w:160,h:26,min:780,max:1040,speed:80},{x:2050,y:490,w:155,h:26,min:2010,max:2220,speed:70}]
const PACKAGES = [{x:570,y:350,name:'风铃港的问候'},{x:1550,y:350,name:'货栈里的心意'},{x:2740,y:350,name:'寄给灯塔的信'}]
const ROBOTS = [{x:420,y:600,min:330,max:640,speed:65},{x:1510,y:600,min:1370,max:1660,speed:78},{x:2850,y:600,min:2660,max:2950,speed:75}]
const SPIKES = [{x:1780,y:576,w:80,h:24},{x:2500,y:576,w:80,h:24}]
type State = 'ready'|'playing'|'paused'|'won'|'lost'
type Platform = Phaser.Physics.Arcade.Image & {route?: typeof FERRIES[number]; dir?: number}
const $ = <T extends HTMLElement = HTMLElement>(id:string) => document.getElementById(id) as T
const touch = {left:false,right:false,jump:false}
let current: CourierScene
let audioOn = false
let audioContext: AudioContext | undefined
function tone(kind:'jump'|'collect'|'hurt'|'win'|'land') {
  if(!audioOn) return
  try {
    audioContext ??= new AudioContext()
    if(audioContext.state === 'suspended') void audioContext.resume()
    const tones = kind==='collect'?[660,880,1100]:kind==='win'?[523,659,784,1047]:kind==='hurt'?[180,110]:kind==='jump'?[330,480]:[125]
    tones.forEach((hz,i)=>{const o=audioContext!.createOscillator(),g=audioContext!.createGain(),t=audioContext!.currentTime+i*.07;o.type=kind==='hurt'?'triangle':'sine';o.frequency.setValueAtTime(hz,t);g.gain.setValueAtTime(.035,t);g.gain.exponentialRampToValueAtTime(.001,t+.12);o.connect(g);g.connect(audioContext!.destination);o.start(t);o.stop(t+.13)})
  } catch { /* Sound is optional; gameplay does not depend on audio permission. */ }
}
function clearTouch(){touch.left=touch.right=touch.jump=false;document.querySelectorAll('.touch-controls button').forEach(b=>b.classList.remove('pressed'))}

class CourierScene extends Phaser.Scene {
  state:State='ready'; player!:Phaser.Physics.Arcade.Sprite; platforms!:Phaser.Physics.Arcade.StaticGroup
  movers:Platform[]=[]; bots: (Phaser.Physics.Arcade.Image & {route:typeof ROBOTS[number];dir:number})[]=[]
  parcels:Phaser.Physics.Arcade.Image[]=[]; parcelHalos:Phaser.GameObjects.Image[]=[]
  keys!:Record<string,Phaser.Input.Keyboard.Key>; elapsed=0; lives=3; collected=0; invulnerable=0; hurtTime=0; jumpBuffer=0; grounded=false
  toastRemaining=0; exitNotice=0; lastHUD=''; lastZone=-1; water!:Phaser.GameObjects.TileSprite; exitGlow!:Phaser.GameObjects.Arc; activeClock=0
  flags:Phaser.GameObjects.Container[]=[]; bobbers:{image:Phaser.GameObjects.Image,base:number}[]=[]
  constructor(){super('courier')}
  preload(){
    const all=['pelican-idle','pelican-jump','pelican-hurt','pelican-walk-0','pelican-walk-1','pelican-walk-2','pelican-walk-3','robot','hazard','parcel','platform','heart']
    all.forEach(name=>this.load.svg(name,`./materials/sprites/${name}.svg`))
  }
  create(){
    current=this;this.state='ready';this.elapsed=0;this.lives=3;this.collected=0;this.invulnerable=0;this.hurtTime=0;this.jumpBuffer=0;this.grounded=false;this.toastRemaining=0;this.exitNotice=0;this.activeClock=0;this.lastHUD='';this.lastZone=-1
    this.movers=[];this.bots=[];this.parcels=[];this.parcelHalos=[];this.flags=[];this.bobbers=[];clearTouch()
    this.physics.world.setBounds(0,-200,WORLD.width,WORLD.height+400,true,true,true,false)
    this.cameras.main.setBounds(0,0,WORLD.width,WORLD.height)
    this.drawLandscape()
    this.platforms=this.physics.add.staticGroup()
    FIXED.forEach((p,i)=>{
      if(p.ground) this.drawIsland(p.x,p.y,p.w)
      else this.drawLedge(p.x,p.y,p.w)
      const platform=this.platforms.create(p.x,p.y,'platform') as Phaser.Physics.Arcade.Image
      platform.setOrigin(0,0).setDisplaySize(p.w,p.h).refreshBody().setDepth(5)
      this.add.rectangle(p.x+p.w/2,p.y+2,p.w-6,4,0xd5e5b0).setDepth(6)
      if(!p.ground){this.add.text(p.x+9,p.y+8,'●   ●',{fontFamily:'monospace',fontSize:'8px',color:'#b5d3cd'}).setDepth(6)}
    })
    FERRIES.forEach(p=>{
      const rail=this.add.graphics().setDepth(1)
      rail.lineStyle(2,0x5f9c8c,.45);rail.lineBetween(p.min,p.y+14,p.max+p.w,p.y+14)
      for(let x=p.min;x<=p.max+p.w;x+=24){rail.fillStyle(0xf7f2d1,.5);rail.fillCircle(x,p.y+14,2)}
      ;[p.min,p.max+p.w].forEach(x=>{this.add.circle(x,p.y+14,7,0x69998b).setStrokeStyle(2,0xe6e8bb).setDepth(2)})
      const m=this.physics.add.image(p.x,p.y,'platform').setOrigin(0,0).setDisplaySize(p.w,p.h).setDepth(7) as Platform
      m.setImmovable(true);(m.body as Phaser.Physics.Arcade.Body).setAllowGravity(false).setFriction(1,0);m.route=p;m.dir=1;this.movers.push(m)
      const cargo=this.add.container(0,0).setDepth(8);cargo.add(this.add.rectangle(p.w/2,3,p.w-8,5,0xf5d382));cargo.add(this.add.text(p.w/2,10,'◀  海 风 渡 台  ▶',{fontSize:'9px',color:'#fff5cf',fontFamily:'sans-serif'}).setOrigin(.5,0));cargo.setData('ferry',m);cargo.setPosition(p.x,p.y);this.flags.push(cargo)
    })
    PACKAGES.forEach((p,i)=>{
      this.add.text(p.x,p.y-104,`0${i+1}`,{fontSize:'12px',fontFamily:'monospace',color:'#56766a',backgroundColor:'#fcf8db',padding:{left:7,right:7,top:4,bottom:4}}).setOrigin(.5).setDepth(4)
      const halo=this.add.image(p.x,p.y-24,'parcel-glow').setDepth(3);this.parcelHalos.push(halo)
      const parcel=this.physics.add.image(p.x,p.y,'parcel').setOrigin(.5,1).setDisplaySize(38,38).setDepth(10);(parcel.body as Phaser.Physics.Arcade.Body).setAllowGravity(false).setImmovable(true)
      this.parcels.push(parcel)
      this.add.text(p.x,p.y+34,['风铃港 · 01','云上货栈 · 02','灯塔来信 · 03'][i],{fontSize:'10px',color:'#e8efcf',fontFamily:'sans-serif'}).setOrigin(.5).setDepth(4)
    })
    const hazards=this.physics.add.staticGroup()
    SPIKES.forEach(p=>{const s=hazards.create(p.x,p.y,'hazard') as Phaser.Physics.Arcade.Image;s.setOrigin(0,0).setDisplaySize(p.w,p.h).refreshBody().setDepth(9);this.add.rectangle(p.x+p.w/2,p.y+p.h+5,p.w,5,0xe69b69).setDepth(8)})
    ROBOTS.forEach(p=>{
      const bot=this.physics.add.image(p.x,p.y,'robot').setOrigin(.5,1).setDepth(11) as typeof this.bots[number]
      bot.setImmovable(true);(bot.body as Phaser.Physics.Arcade.Body).setAllowGravity(false).setSize(36,38).setOffset(6,8)
      bot.route=p;bot.dir=1;this.bots.push(bot)
    })
    this.drawExit()
    this.player=this.physics.add.sprite(WORLD.spawn.x,WORLD.spawn.y,'pelican-idle').setOrigin(.5,1).setDepth(15)
    this.player.setCollideWorldBounds(true);this.player.setMaxVelocity(400,1000)
    const body=this.player.body as Phaser.Physics.Arcade.Body;body.setSize(37,58).setOffset(11,5)
    if(!this.anims.exists('walk'))this.anims.create({key:'walk',frames:[0,1,2,3].map(i=>({key:`pelican-walk-${i}`})),frameRate:8,repeat:-1})
    this.physics.add.collider(this.player,this.platforms)
    this.physics.add.collider(this.player,this.movers)
    this.physics.add.overlap(this.player,this.bots,()=>this.hurt('robot'))
    this.physics.add.overlap(this.player,hazards,()=>this.hurt('hazard'))
    this.physics.add.overlap(this.player,this.parcels,(_player,obj)=>this.collect(obj as Phaser.Physics.Arcade.Image))
    const exit=this.add.zone(3195,540,100,120);this.physics.add.existing(exit,true)
    this.physics.add.overlap(this.player,exit,()=>{
      if(this.state!=='playing')return
      if(this.collected===3)this.finish(true)
      else if(this.exitNotice<=0){this.toast(`还差 ${3-this.collected} 份快递，原路返回收集吧`);this.exitNotice=3}
    })
    this.keys=this.input.keyboard!.addKeys({left:'LEFT',right:'RIGHT',a:'A',d:'D',space:'SPACE',p:'P',esc:'ESC'}) as typeof this.keys
    this.input.keyboard!.addCapture(['SPACE','LEFT','RIGHT','UP','DOWN'])
    // Event edges also capture very brief taps between two rendered frames.
    this.input.keyboard!.on('keydown-SPACE',(e:KeyboardEvent)=>{if(!e.repeat&&this.state==='playing')this.jumpBuffer=.12})
    this.input.keyboard!.on('keydown-P',(e:KeyboardEvent)=>{if(!e.repeat)this.togglePause()})
    this.input.keyboard!.on('keydown-ESC',(e:KeyboardEvent)=>{if(!e.repeat)this.togglePause()})
    this.cameras.main.startFollow(this.player,true,.09,.09).setDeadzone(90,160)
    this.cameras.main.setFollowOffset(-85,0)
    this.physics.pause();this.updateHUD();this.showOverlay();this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>clearTouch())
  }
  drawLandscape(){
    const sky=this.add.graphics();sky.fillGradientStyle(0xb4ddd4,0xb4ddd4,0xf0eacd,0xf0eacd,1);sky.fillRect(0,0,1280,720);sky.setScrollFactor(0).setDepth(-20)
    this.add.circle(1000,159,79,0xfff2be,.65).setScrollFactor(.08).setDepth(-18);this.add.circle(1000,159,108,0xfff3c3,.16).setScrollFactor(.08).setDepth(-19)
    const clouds=this.add.graphics().setScrollFactor(.17).setDepth(-17)
    ;[[120,158,1],[520,105,.8],[1120,200,.7],[1580,120,1.1],[2050,185,.8],[2500,130,.9],[3030,180,1]].forEach(([x,y,s])=>{clouds.fillStyle(0xfffdf0,.65);clouds.fillRoundedRect(x,y,120*s,20*s,10*s);clouds.fillEllipse(x+40*s,y,50*s,37*s);clouds.fillEllipse(x+72*s,y-6*s,55*s,48*s)})
    const distant=this.add.graphics().setScrollFactor(.26).setDepth(-16)
    distant.fillStyle(0x95bbb0,.45);distant.fillPoints([{x:-40,y:470},{x:90,y:358},{x:290,y:428},{x:390,y:310},{x:580,y:451},{x:780,y:366},{x:970,y:436},{x:1100,y:335},{x:1320,y:460},{x:1510,y:350},{x:1770,y:450},{x:1920,y:315},{x:2200,y:440},{x:2440,y:365},{x:2800,y:490}],true);distant.fillRect(0,465,3380,255)
    const sea=this.add.graphics().setDepth(-14).setScrollFactor(.5,1);sea.fillGradientStyle(0x8dc7bd,0x8dc7bd,0x347f80,0x347f80,1);sea.fillRect(0,500,5000,220)
    const islands=this.add.graphics().setScrollFactor(.43).setDepth(-13)
    for(let i=0;i<9;i++){const x=i*430+40,y=475+(i%3)*11;islands.fillStyle(0x6eaa9b,.58);islands.fillEllipse(x,y,220,34);islands.fillStyle(0x83b3a2,.9);islands.fillTriangle(x-40,y-8,x+8,y-59,x+70,y-5);this.smallHouse(islands,x-20,y-7,23,29,0xc2d1b0,0x91af98)}
    if(!this.textures.exists('sea-lines')){const g=this.make.graphics({x:0,y:0});g.lineStyle(1,0xe3edc5,.34);for(let y=10;y<120;y+=22){for(let x=(y*7)%60;x<250;x+=70){g.lineBetween(x,y,x+20+(y%15),y)}}g.generateTexture('sea-lines',256,128);g.destroy()}
    this.water=this.add.tileSprite(0,510,4600,210,'sea-lines').setOrigin(0,0).setScrollFactor(.65,1).setDepth(-11)
    const mid=this.add.graphics().setDepth(-5)
    // Harbour architecture and cranes sit behind the collision silhouettes.
    this.smallHouse(mid,14,600,168,158,0xe4c795,0xb46e51);this.smallHouse(mid,1280,600,150,185,0xd4d8b2,0x648e80);this.smallHouse(mid,1840,600,125,128,0xdbc695,0xc17e57)
    mid.fillStyle(0x557f75);mid.fillRect(184,415,11,185);mid.fillRect(184,416,270,9);mid.lineStyle(4,0x6c9180);mid.lineBetween(189,419,268,365);mid.lineBetween(268,365,400,419);mid.lineStyle(2,0x6c9180);mid.lineBetween(400,423,400,473)
    this.add.text(41,515,'海 风 邮 局',{fontSize:'15px',fontFamily:'sans-serif',color:'#648073',fontStyle:'bold'}).setDepth(-4)
    this.add.text(1310,523,'BAY CARGO',{fontSize:'12px',fontFamily:'monospace',color:'#688875'}).setDepth(-4)
    mid.lineStyle(2,0x73998a,.7);mid.beginPath();mid.moveTo(180,422);mid.lineTo(310,441);mid.lineTo(470,428);mid.strokePath()
    for(let i=0;i<7;i++){const x=205+i*36,y=429+Math.sin(i/6*Math.PI)*13;mid.fillStyle(i%2?0xeab969:0xe5edcb);mid.fillTriangle(x,y,x+13,y+1,x+7,y+20)}
    for(const x of [70,690,1210,1960,2400,3050,3320]){this.drawPlant(mid,x,600)}
    this.add.text(668,649,'渡台往返 · 看准再跳',{fontSize:'12px',color:'#e7f1d2'}).setDepth(2)
    this.add.text(2025,649,'随风渡海  →',{fontSize:'12px',color:'#e7f1d2'}).setDepth(2)
    this.drawSign(120,600,'快递在高处 ↗');this.drawSign(1900,600,'灯塔邮局 →');this.drawSign(2990,600,'终点就在前方 →')
    const birds=this.add.graphics().setScrollFactor(.3).setDepth(-12);birds.lineStyle(2,0x527f76,.55);for(let i=0;i<13;i++){const x=260+i*213,y=195+(i%4)*28;birds.beginPath();birds.moveTo(x-9,y+3);birds.lineTo(x-3,y);birds.lineTo(x,y+3);birds.lineTo(x+4,y-1);birds.lineTo(x+10,y+1);birds.strokePath()}
    if(!this.textures.exists('parcel-glow')){const g=this.make.graphics({x:0,y:0});for(let i=45;i>0;i--){g.fillStyle(0xffd77d,.008);g.fillCircle(48,48,i)}g.generateTexture('parcel-glow',96,96);g.destroy()}
    if(!this.textures.exists('spark')){const g=this.make.graphics({x:0,y:0});g.fillStyle(0xffffff);g.fillCircle(4,4,4);g.generateTexture('spark',8,8);g.destroy()}
  }
  smallHouse(g:Phaser.GameObjects.Graphics,x:number,bottom:number,w:number,h:number,color:number,roof:number){g.fillStyle(color);g.fillRoundedRect(x,bottom-h,w,h,3);g.fillStyle(roof);g.fillTriangle(x-8,bottom-h+3,x+w*.5,bottom-h-32,x+w+8,bottom-h+3);g.fillStyle(0x456c65,.55);for(let i=0;i<Math.floor(w/35);i++){g.fillRoundedRect(x+15+i*30,bottom-h+25,13,22,6)}g.fillStyle(0x719588,.65);g.fillRect(x+w/2-13,bottom-42,26,42)}
  drawPlant(g:Phaser.GameObjects.Graphics,x:number,y:number){g.lineStyle(3,0x638b68);g.lineBetween(x,y,x+2,y-27);g.fillStyle(0x7ea272);g.fillEllipse(x-5,y-19,16,9);g.fillEllipse(x+9,y-30,17,10);g.fillStyle(0xe4ca82);g.fillCircle(x+2,y-36,4)}
  drawIsland(x:number,y:number,w:number){
    const g=this.add.graphics().setDepth(0);g.fillStyle(0xb3ae85);g.fillPoints([{x,y:y+20},{x:x+w,y:y+20},{x:x+w-23,y:720},{x:x+13,y:720}],true)
    g.fillStyle(0x7f9479,.44);g.fillPoints([{x:x+w-55,y:y+25},{x:x+w,y:y+25},{x:x+w-23,y:720},{x:x+w-80,y:720}],true)
    g.fillStyle(0xcfc093,.9);g.fillRect(x+7,y+28,w-14,12)
    for(let xx=x+27;xx<x+w-25;xx+=69){g.fillStyle(0xd6c89c,.6);g.fillRoundedRect(xx,y+54+(xx%29),22+(xx%13),6,3);g.fillStyle(0x7b9476,.55);g.fillTriangle(xx+23,y+33,xx+45,y+33,xx+34,y+48)}
    g.lineStyle(3,0x477c73,.45);g.lineBetween(x+13,708,x+w-23,708)
  }
  drawLedge(x:number,y:number,w:number){const g=this.add.graphics().setDepth(0);g.fillStyle(0x617f70,.65);g.fillTriangle(x+16,y+23,x+36,y+23,x+27,y+65);g.fillTriangle(x+w-42,y+23,x+w-18,y+23,x+w-29,y+65);g.lineStyle(2,0x83a58b,.5);g.lineBetween(x+26,y+50,x+w-29,y+26)}
  drawSign(x:number,bottom:number,label:string){const g=this.add.graphics().setDepth(4);g.fillStyle(0x768c70);g.fillRect(x-3,bottom-55,6,55);g.fillStyle(0xf0dfae);g.fillRoundedRect(x-48,bottom-69,110,29,4);this.add.text(x+7,bottom-54,label,{fontSize:'10px',color:'#59725c'}).setOrigin(.5).setDepth(5)}
  drawExit(){
    const g=this.add.graphics().setDepth(1),x=3195
    this.exitGlow=this.add.circle(x,475,96,0xffefac,.11).setDepth(-3)
    g.fillStyle(0xf3e6bc);g.fillPoints([{x:x-42,y:600},{x:x+42,y:600},{x:x+27,y:315},{x:x-27,y:315}],true)
    g.fillStyle(0x719d91);g.fillRect(x-33,390,66,40);g.fillRect(x-38,498,76,40);g.fillStyle(0x315f59);g.fillRoundedRect(x-46,307,92,12,3);g.fillRect(x-27,264,54,43);g.fillStyle(0xf5cc71);g.fillRect(x-18,271,36,29);g.fillStyle(0x315f59);g.fillTriangle(x-47,265,x,232,x+47,265);g.fillRect(x-3,219,6,23)
    g.fillStyle(0x44786e);g.fillRoundedRect(x-24,548,48,52,15);g.lineStyle(3,0xf8e6ab);g.strokeRoundedRect(x-24,548,48,52,15);g.fillStyle(0xf4d17e);g.fillRect(x-12,568,24,4)
    this.add.text(x,448,'灯 塔 邮 局',{fontSize:'14px',fontStyle:'bold',color:'#426e62'}).setOrigin(.5).setDepth(4)
    this.add.text(x,473,'集齐 3 份 · 在此投递',{fontSize:'9px',color:'#5c8574'}).setOrigin(.5).setDepth(4)
    this.add.text(x,630,'终 点  /  POST OFFICE',{fontSize:'11px',color:'#f4f1d1',letterSpacing:2}).setOrigin(.5).setDepth(4)
  }
  start(){if(this.state!=='ready')return;this.state='playing';this.physics.resume();this.resetInput();this.showOverlay();this.toast('第一份快递在高处，向右出发！',3)}
  resetInput(){clearTouch();this.jumpBuffer=0;this.input.keyboard?.resetKeys()}
  togglePause(){if(this.state==='playing'){this.state='paused';this.physics.pause();this.player.anims.pause();this.tweens.pauseAll();this.resetInput();this.showOverlay()}else if(this.state==='paused'){this.state='playing';this.resetInput();this.physics.resume();this.player.anims.resume();this.tweens.resumeAll();this.showOverlay()}this.updateHUD()}
  restart(){this.tweens.resumeAll();this.scene.restart({});this.events.once(Phaser.Scenes.Events.CREATE,()=>this.start())}
  update(_time:number,delta:number){
    if(!this.player)return
    if(this.state!=='playing')return
    const dt=delta/1000;this.elapsed+=dt;this.activeClock+=dt;this.invulnerable=Math.max(0,this.invulnerable-dt);this.hurtTime=Math.max(0,this.hurtTime-dt);this.exitNotice-=dt
    if(this.elapsed>=WORLD.seconds){this.elapsed=WORLD.seconds;this.finish(false,'time');return}
    this.movers.forEach(m=>{const p=m.route!;if(m.x>=p.max)m.dir=-1;else if(m.x<=p.min)m.dir=1;m.setVelocityX(p.speed*m.dir!)});
    this.flags.forEach(c=>{const m=c.getData('ferry') as Platform;c.setPosition(m.x,m.y)})
    this.bots.forEach(b=>{if(b.x>=b.route.max)b.dir=-1;else if(b.x<=b.route.min)b.dir=1;b.setVelocityX(b.dir*b.route.speed);b.setFlipX(b.dir<0)})
    const body=this.player.body as Phaser.Physics.Arcade.Body
    const onGround=body.blocked.down||body.touching.down
    if(onGround&&!this.grounded){tone('land');this.dust(this.player.x,this.player.y,8,0xf7e8bc);this.player.setAngle(0)}
    this.grounded=onGround
    if(touch.jump){this.jumpBuffer=.12;touch.jump=false}
    else this.jumpBuffer=Math.max(0,this.jumpBuffer-dt)
    const left=this.keys.left.isDown||this.keys.a.isDown||touch.left,right=this.keys.right.isDown||this.keys.d.isDown||touch.right
    this.player.setVelocityX((Number(right)-Number(left))*WORLD.speed)
    if(left!==right)this.player.setFlipX(left)
    if(this.jumpBuffer>0&&onGround){this.player.setVelocityY(WORLD.jump);this.jumpBuffer=0;this.grounded=false;tone('jump');this.dust(this.player.x,this.player.y,7,0xe2ead0)}
    if(this.hurtTime>0){this.player.anims.stop();this.player.setTexture('pelican-hurt')}
    else if(!onGround){this.player.anims.stop();this.player.setTexture('pelican-jump')}
    else if(left!==right){this.player.play('walk',true);if(Math.floor(this.activeClock*12)!==Math.floor((this.activeClock-dt)*12))this.dust(this.player.x,this.player.y,1,0xf2e5bd)}
    else{this.player.anims.stop();this.player.setTexture('pelican-idle')}
    this.player.setAlpha(this.invulnerable>0?(Math.sin(this.activeClock*38)>0?.42:1):1)
    if(this.player.getBounds().top>WORLD.height){this.lives--;tone('hurt');if(this.lives<=0){this.finish(false,'life');return}this.player.setPosition(WORLD.spawn.x,WORLD.spawn.y);body.reset(WORLD.spawn.x,WORLD.spawn.y);this.player.setVelocity(0,0);this.invulnerable=.8;this.hurtTime=.28;this.jumpBuffer=0;this.toast('落水了！回到港口，快递与时间保留');this.cameras.main.setScroll(0,0)}
    this.parcelHalos.forEach((g,i)=>{g.setAlpha(.72+Math.sin(this.activeClock*3+i)*.25);g.setScale(1+Math.sin(this.activeClock*2+i)*.05)})
    this.water.tilePositionX=this.activeClock*9
    this.exitGlow.setAlpha(this.collected===3?.30+Math.sin(this.activeClock*3)*.1:.10)
    if(this.toastRemaining>0){this.toastRemaining-=dt;if(this.toastRemaining<=0)$('toast').classList.remove('visible')}
    this.updateHUD()
  }
  hurt(source:'robot'|'hazard'){
    if(this.state!=='playing'||this.invulnerable>0)return
    this.lives--;this.invulnerable=.8;this.hurtTime=.35;tone('hurt');this.cameras.main.shake(140,.003);this.dust(this.player.x,this.player.y-28,13,0xec926e)
    if(this.lives<=0)this.finish(false,'life')
    else this.toast(source==='robot'?'小心巡逻机器人！短暂无敌 0.8 秒':'小心尖刺！短暂无敌 0.8 秒',1.6)
    this.updateHUD()
  }
  collect(parcel:Phaser.Physics.Arcade.Image){
    if(this.state!=='playing'||!parcel.active)return
    const i=this.parcels.indexOf(parcel);parcel.disableBody(true,true);this.parcelHalos[i].setVisible(false);this.collected++;tone('collect');this.dust(parcel.x,parcel.y-20,20,0xffd774)
    const label=this.add.text(parcel.x,parcel.y-52,'快递 +1',{fontSize:'16px',fontStyle:'bold',color:'#fff9da',stroke:'#457d6c',strokeThickness:4}).setOrigin(.5).setDepth(20)
    this.tweens.add({targets:label,y:label.y-55,alpha:0,duration:850,onComplete:()=>label.destroy()})
    document.querySelectorAll('.stop')[i]?.classList.add('done');this.toast(this.collected===3?'三份快递已集齐！前往最右侧灯塔投递':`收到「${PACKAGES[i].name}」 · ${this.collected} / 3`);this.updateHUD()
  }
  dust(x:number,y:number,count:number,color:number){
    for(let i=0;i<count;i++){const p=this.add.image(x,y,'spark').setDepth(20).setTint(color).setScale(Phaser.Math.FloatBetween(.35,.9));const angle=Phaser.Math.FloatBetween(-Math.PI,0),dist=Phaser.Math.Between(15,55);this.tweens.add({targets:p,x:x+Math.cos(angle)*dist,y:y+Math.sin(angle)*dist,alpha:0,scale:0,duration:Phaser.Math.Between(250,550),onComplete:()=>p.destroy()})}
  }
  toast(text:string,duration=2.5){$('toast').textContent=text;$('toast').classList.add('visible');this.toastRemaining=duration}
  finish(win:boolean,reason?:'life'|'time'){
    if(this.state!=='playing')return
    this.state=win?'won':'lost';this.physics.pause();this.player.anims.stop();this.player.setAlpha(1);this.resetInput();$('toast').classList.remove('visible');this.updateHUD()
    if(win){tone('win');this.player.setTexture('pelican-idle');this.dust(this.player.x,this.player.y-40,38,0xffda73)}else tone('hurt')
    this.showOverlay(reason)
  }
  updateHUD(){
    const remaining=Math.max(0,Math.ceil(WORLD.seconds-this.elapsed)),signature=`${this.lives}:${this.collected}:${remaining}:${this.state}`
    if(signature!==this.lastHUD){this.lastHUD=signature;$('hearts').innerHTML=[0,1,2].map(i=>`<img src="./materials/sprites/heart.svg" alt="${i<this.lives?'一颗生命':'已失去生命'}" class="${i<this.lives?'':'empty'}">`).join('');$('count').innerHTML=`${this.collected}<span> / 3</span>`;$('time').textContent=String(remaining).padStart(3,'0');$('time').parentElement!.classList.toggle('urgent',remaining<=20);$('mission').textContent=this.collected===3?'快递齐了，前往灯塔 →':'集齐快递，送达灯塔';$('pause').setAttribute('aria-label',this.state==='paused'?'继续游戏':'暂停游戏');$('frame').dataset.state=this.state}
    const z=this.player.x<1180?0:this.player.x<2360?1:2
    if(z!==this.lastZone){this.lastZone=z;$('zone').innerHTML=`<span>0${z+1}</span> ${['风铃港','云上货栈','灯塔海岸'][z]}`}
    $('progress').style.width=`${Phaser.Math.Clamp(this.player.x/3195,0,1)*100}%`
  }
  showOverlay(reason?:string){
    const overlay=$('overlay');overlay.classList.toggle('hidden',this.state==='playing');$('frame').dataset.state=this.state
    if(this.state==='ready'){
      document.querySelectorAll('.stop').forEach(s=>s.classList.remove('done'))
      overlay.innerHTML=`<section class="intro"><div class="intro-copy"><div class="eyebrow">BAY DELIVERY · 01</div><h1>鹈鹕快递<br><em>大作战</em></h1><p>海湾的三份快递，等你送达。<br>跃过岛屿，搭上渡台，让心意抵达灯塔。</p><button class="primary" data-action="start">开始派送 <b>↗</b></button><div class="micro">方向键 / A D 移动 · 空格跳跃 · P 暂停</div></div><div class="intro-art"><div class="sun-disc"></div><img class="hero-bird" src="./materials/sprites/pelican-idle.svg" alt="鹈鹕邮递员"><img class="hero-parcel" src="./materials/sprites/parcel.svg" alt="包裹"><div class="post-stamp">海风邮局<br>POST<br>01</div><span class="art-caption">SMALL WINGS. BIG DELIVERIES.</span></div><div class="intro-bottom"><span><strong>120</strong> 秒限时派送</span><span><strong>3</strong> 点体力</span><span><strong>3</strong> 份快递 → 灯塔</span></div></section>`
    }else if(this.state==='paused')overlay.innerHTML=`<section class="dialog"><div class="eyebrow">TAKE A LITTLE BREAK</div><div class="dialog-mark">Ⅱ</div><h2>海风，等你一会儿</h2><p>派送已暂停，时间和整个海湾都在等你。<br>已收集 ${this.collected} / 3 份 · 剩余 ${Math.ceil(120-this.elapsed)} 秒</p><div class="dialog-buttons"><button class="primary" data-action="resume">继续派送 <b>→</b></button><button class="secondary" data-action="restart">重新出发</button></div></section>`
    else if(this.state==='won')overlay.innerHTML=`<section class="dialog"><div class="eyebrow">DELIVERY COMPLETE</div><div class="dialog-mark">✦</div><h2>心意，全部送达！</h2><p>三份快递已送到灯塔邮局。<br>辛苦啦，海湾最快活的邮递员。</p><div class="receipt"><div><b>3 / 3</b><span>快递送达</span></div><div><b>${Math.ceil(120-this.elapsed)}s</b><span>剩余时间</span></div><div><b>${this.lives} ♥</b><span>剩余体力</span></div></div><div class="dialog-buttons"><button class="primary" data-action="restart">再跑一趟 <b>↗</b></button></div></section>`
    else if(this.state==='lost')overlay.innerHTML=`<section class="dialog"><div class="eyebrow">A NEW START AWAITS</div><div class="dialog-mark">${reason==='time'?'◷':'♡'}</div><h2>${reason==='time'?'派送时间到了':'先歇歇翅膀吧'}</h2><p>${reason==='time'?'120 秒已用完，这一趟没能按时送达。':'体力耗尽，这一趟派送结束了。'}<br>${reason==='time'?'规划跳跃路线，搭上渡台可以更快过海。':'跳过机器人和尖刺，落水会回到起点。'}</p><div class="receipt"><div><b>${this.collected} / 3</b><span>已找到快递</span></div><div><b>${Math.ceil(120-this.elapsed)}s</b><span>剩余时间</span></div></div><div class="dialog-buttons"><button class="primary" data-action="restart">再试一次 <b>↗</b></button></div></section>`
  }
}

const mobile = ()=>window.matchMedia('(max-width:700px)').matches
const game=new Phaser.Game({type:Phaser.AUTO,parent:'app',width:mobile()?640:1280,height:720,backgroundColor:'#b7dbcc',antialias:true,roundPixels:false,physics:{default:'arcade',arcade:{gravity:{y:WORLD.gravity,x:0},debug:false,fixedStep:true}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[CourierScene],input:{activePointers:4},audio:{noAudio:true},render:{transparent:false}})
let wasMobile=mobile()
window.addEventListener('resize',()=>{const m=mobile();if(m!==wasMobile){wasMobile=m;game.scale.setGameSize(m?640:1280,720)}})
$('overlay').addEventListener('click',event=>{const action=(event.target as HTMLElement).closest<HTMLElement>('[data-action]')?.dataset.action;if(action==='start')current.start();if(action==='resume')current.togglePause();if(action==='restart')current.restart()})
$('pause').addEventListener('click',()=>current?.togglePause())
$('sound').addEventListener('click',()=>{audioOn=!audioOn;$('sound').classList.toggle('enabled',audioOn);$('sound').setAttribute('aria-label',audioOn?'关闭音效':'开启音效');if(audioOn)tone('collect')})
for(const name of ['left','right','jump'] as const){
  const button=$(name),pointers=new Set<number>()
  const release=(id:number)=>{pointers.delete(id);if(pointers.size===0){if(name!=='jump')touch[name]=false;button.classList.remove('pressed')}}
  button.addEventListener('pointerdown',e=>{e.preventDefault();if(current?.state!=='playing')return;pointers.add(e.pointerId);button.setPointerCapture(e.pointerId);touch[name]=true;button.classList.add('pressed')})
  button.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const r=button.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)release(e.pointerId)})
  ;['pointerup','pointercancel','lostpointercapture'].forEach(type=>button.addEventListener(type,e=>release((e as PointerEvent).pointerId)))
  button.addEventListener('contextmenu',e=>e.preventDefault())
}
window.addEventListener('blur',()=>{clearTouch();if(current?.state==='playing')current.togglePause()})
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTouch();if(current?.state==='playing')current.togglePause()}})
