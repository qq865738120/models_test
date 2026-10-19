import Phaser from 'phaser'

type Rect = {x:number;y:number;width:number;height:number}
type Level = {width:number;height:number;spawn:{x:number;y:number};exit:Rect;platforms:Rect[];movingPlatforms:(Rect & {id:string;toX:number;toY:number;durationMs:number})[];packages:{id:string;x:number;y:number}[];robots:{id:string;x:number;y:number;minX:number;maxX:number;speed:number}[];hazards:Rect[];physics:{gravity:number;moveSpeed:number;jumpSpeed:number;playerBodyWidth:number;playerBodyHeight:number;lives:number;invulnerabilityMs:number;durationSeconds:number}}
type Mode = 'ready'|'playing'|'paused'|'won'|'lost'
const C = {navy:0x173b50, blue:0x237d96, teal:0x21a6a1, orange:0xf1a63b, cream:0xfff8e9, red:0xdf6260}
const diagnostics=document.createElement('script');diagnostics.type='application/json';diagnostics.id='game-diagnostics';document.body.appendChild(diagnostics)
const FONT = '"PingFang SC", "Microsoft YaHei", sans-serif'
const portrait = () => window.innerHeight > window.innerWidth
function dimensions() { return portrait() ? {width:600,height:Math.max(1050,Math.round(600*innerHeight/innerWidth))} : {width:1280,height:720} }
const eventLog:Record<string,unknown>[]=[]
let runs = 0
function log(type:string,data:Record<string,unknown>={}) {eventLog.push({type,...data});if(eventLog.length>400)eventLog.shift()}

class Harbor extends Phaser.Scene {
  level!:Level; player!:Phaser.Physics.Arcade.Sprite; fixed!:Phaser.Physics.Arcade.StaticGroup
  movers:Phaser.Physics.Arcade.Image[]=[]; robots:Phaser.Physics.Arcade.Image[]=[]; parcels:Phaser.Physics.Arcade.Image[]=[]
  mode:Mode='ready'; lives=3; collected=new Set<string>(); elapsed=0; invulnerable=0; hurtFor=0; failReason=''; lastGround=false; jumps=0
  touch={left:false,right:false,jump:false}; jumpQueued=false; keys!:Record<string,Phaser.Input.Keyboard.Key>
  exitLight!:Phaser.GameObjects.Graphics; exitLabel!:Phaser.GameObjects.Text; toastText!:Phaser.GameObjects.Text; toastUntil=0
  constructor(){super('harbor')}
  preload(){
    this.load.json('level','./materials/level.json')
    for(const key of ['pelican-idle','pelican-walk-0','pelican-walk-1','pelican-walk-2','pelican-walk-3','pelican-jump','pelican-hurt','robot','platform','parcel','hazard','heart','pause']) this.load.svg(key,`./materials/sprites/${key}.svg`)
  }
  create(data:{start?:boolean}={}){
    this.level=this.cache.json.get('level');this.mode=data.start?'playing':'ready';this.lives=this.level.physics.lives;this.collected=new Set();this.elapsed=0;this.invulnerable=0;this.hurtFor=0;this.failReason='';this.jumps=0;this.lastGround=false
    this.movers=[];this.robots=[];this.parcels=[];this.clearTouch();runs++; log('reset',{run:runs})
    this.physics.world.gravity.y=this.level.physics.gravity
    this.physics.world.setBounds(0,-400,this.level.width,this.level.height+400,true,true,false,false)
    this.drawBackdrop()
    this.fixed=this.physics.add.staticGroup()
    for(const p of this.level.platforms){
      const platform=this.physics.add.staticImage(p.x,p.y,'platform').setOrigin(0).setDisplaySize(p.width,p.height).refreshBody()
      this.fixed.add(platform)
      this.add.rectangle(p.x+4,p.y+8,p.width-8,3,0xc4e4df,.45).setOrigin(0).setDepth(2)
      if(p.height>30){const g=this.add.graphics();g.fillStyle(0x3d6479,1);for(let x=p.x+22;x<p.x+p.width;x+=72)g.fillRoundedRect(x,p.y+26,35,6,3)}
    }
    for(const p of this.level.movingPlatforms){
      const line=this.add.graphics();line.lineStyle(2,0x82adb6,.6);line.lineBetween(p.x+p.width/2,p.y+40,p.toX+p.width/2,p.toY+40)
      for(const x of [p.x+p.width/2,p.toX+p.width/2]){line.fillStyle(C.teal);line.fillCircle(x,p.y+40,4)}
      const obj=this.physics.add.image(p.x,p.y,'platform').setOrigin(0).setDisplaySize(p.width,p.height).setImmovable(true)
      const b=obj.body as Phaser.Physics.Arcade.Body;b.setAllowGravity(false);b.setSize(128,24,false);b.setOffset(0,0);b.setFriction(1,0)
      obj.setData('route',p).setData('direction',1).setVelocityX((p.toX-p.x)/(p.durationMs/1000));this.movers.push(obj)
      this.add.text(p.x+10,p.y-31,'↔ 往返搭乘',{fontFamily:FONT,fontSize:'16px',color:'#367787'})
    }
    this.player=this.physics.add.sprite(this.level.spawn.x,this.level.spawn.y,'pelican-idle').setOrigin(.5,1).setDepth(10)
    this.player.setSize(this.level.physics.playerBodyWidth,this.level.physics.playerBodyHeight).setOffset(16,12).setCollideWorldBounds(true)
    this.physics.add.collider(this.player,this.fixed)
    for(const obj of this.movers)this.physics.add.collider(this.player,obj)
    if(!this.anims.exists('walk'))this.anims.create({key:'walk',frames:[0,1,2,3].map(i=>({key:`pelican-walk-${i}`})),frameRate:8,repeat:-1})
    for(const p of this.level.packages){
      const obj=this.physics.add.image(p.x,p.y,'parcel').setOrigin(.5,1).setDepth(7);(obj.body as Phaser.Physics.Arcade.Body).setAllowGravity(false)
      obj.setData('id',p.id);this.parcels.push(obj)
      this.add.circle(p.x,p.y-17,28,0xffeac1,.55).setDepth(3)
      this.add.text(p.x,p.y-65,p.id==='c1'?'01 · 码头件':p.id==='c2'?'02 · 高台件':'03 · 终点件',{fontFamily:FONT,fontSize:'16px',color:'#376578',backgroundColor:'#fff9e9',padding:{x:8,y:4}}).setOrigin(.5).setDepth(4)
      this.physics.add.overlap(this.player,obj,()=>this.collect(obj))
    }
    for(const r of this.level.robots){
      const obj=this.physics.add.image(r.x,r.y,'robot').setOrigin(.5,1).setDepth(8).setData('route',r).setData('direction',1)
      const b=obj.body as Phaser.Physics.Arcade.Body;b.setAllowGravity(false);b.setSize(40,42).setOffset(4,6)
      obj.setVelocityX(r.speed);this.robots.push(obj);this.physics.add.overlap(this.player,obj,()=>this.damage('机器人'))
    }
    for(const h of this.level.hazards){
      const obj=this.physics.add.staticImage(h.x,h.y,'hazard').setOrigin(0).setDisplaySize(h.width,h.height).refreshBody().setDepth(5)
      this.physics.add.overlap(this.player,obj,()=>this.damage('尖刺'))
      this.add.text(h.x+h.width/2,h.y+34,'! 危险',{fontFamily:FONT,fontSize:'15px',color:'#fff4e2'}).setOrigin(.5)
    }
    const e=this.level.exit
    this.exitLight=this.add.graphics().setDepth(3)
    this.exitLabel=this.add.text(e.x+e.width/2,e.y-25,'收齐后送达',{fontFamily:FONT,fontSize:'16px',color:'#2b6578',backgroundColor:'#fff8e9',padding:{x:8,y:4}}).setOrigin(.5)
    this.drawExit(false)
    const exit=this.add.zone(e.x,e.y,e.width,e.height).setOrigin(0);this.physics.add.existing(exit,true)
    this.physics.add.overlap(this.player,exit,()=>{if(this.mode!=='playing')return;if(this.collected.size===3)this.finish(true);else if(this.elapsed>this.toastUntil)this.say(`还差 ${3-this.collected.size} 份快递，回去找找吧`);})
    this.add.text(80,680,'起点  /  港口邮局',{fontFamily:FONT,fontSize:'18px',color:'#d2e4e6'})
    this.add.text(1030,698,'断桥 · 跳跃通过',{fontFamily:FONT,fontSize:'15px',color:'#d7eeee'}).setOrigin(.5,1)
    this.keys=this.input.keyboard!.addKeys('LEFT,RIGHT,A,D,SPACE') as Record<string,Phaser.Input.Keyboard.Key>
    this.input.keyboard!.addCapture(['SPACE','LEFT','RIGHT'])
    this.cameras.main.setBounds(0,0,this.level.width,this.level.height)
    this.cameras.main.startFollow(this.player,true,.13,.13,0,0)
    this.resizeWorld()
    this.toastText=this.add.text(0,0,'',{fontFamily:FONT,fontSize:'22px',color:'#ffffff',backgroundColor:'#173b50',padding:{x:18,y:10}}).setOrigin(.5).setScrollFactor(0).setDepth(40).setVisible(false)
    this.scale.on('resize',this.resizeWorld,this)
    this.events.once('shutdown',()=>{this.scale.off('resize',this.resizeWorld,this);this.clearTouch()})
    if(this.mode==='ready')this.physics.pause();else log('start')
  }
  drawBackdrop(){
    const g=this.add.graphics();g.fillGradientStyle(0xc0e7ed,0xc0e7ed,0xf9f3d9,0xf9f3d9,1);g.fillRect(0,0,2400,720)
    g.fillStyle(0xfff5c9,.9);g.fillCircle(1130,130,58);g.fillStyle(0xffffff,.65)
    for(const [x,y] of [[130,135],[520,230],[850,120],[1420,180],[1910,110],[2240,220]]){g.fillRoundedRect(x,y,150,24,12);g.fillEllipse(x+50,y-10,70,55);g.fillEllipse(x+95,y-3,65,40)}
    // Distant harbor silhouettes have no horizontal ledges or collisions.
    g.fillStyle(0xa4c8c9,.45)
    for(let x=40;x<2400;x+=210){g.fillRect(x,470,120,190);g.fillTriangle(x-10,470,x+60,430,x+130,470)}
    g.fillStyle(0x73bec9);g.fillRect(0,630,2400,90);g.fillStyle(0xb9e4e4,.6)
    for(let x=15;x<2400;x+=95)g.fillRoundedRect(x,685,45,3,2)
    this.add.text(65,340,'HARBOR\nPOSTAL ROUTE 01',{fontFamily:FONT,fontSize:'22px',fontStyle:'bold',color:'#7fa9b1',lineSpacing:8}).setAlpha(.6)
  }
  drawExit(open:boolean){const e=this.level.exit,g=this.exitLight;g.clear();g.fillStyle(open?0xffe5a2:0xc0d7d5,.7);g.fillRoundedRect(e.x-9,e.y-12,e.width+18,e.height+12,16);g.fillStyle(open?C.teal:0x709694);g.fillRoundedRect(e.x,e.y,e.width,e.height,8);g.lineStyle(4,0xfff8e9);g.strokeRoundedRect(e.x+8,e.y+8,e.width-16,e.height-8,4);g.fillStyle(0xfff8e9);g.fillTriangle(e.x+20,e.y+22,e.x+40,e.y+34,e.x+20,e.y+46);this.exitLabel.setText(open?'出口已开启！':'收齐后送达')}
  resizeWorld(){const w=this.scale.width;this.cameras.main.setViewport(0,portrait()?145:0,w,720);this.cameras.main.setBounds(0,0,2400,720)}
  clearTouch(){this.touch={left:false,right:false,jump:false};this.jumpQueued=false}
  restart(){this.clearTouch();this.scene.restart({start:true})}
  pauseGame(){if(this.mode!=='playing')return;this.mode='paused';this.physics.pause();this.tweens.pauseAll();this.player.anims.pause();this.clearTouch();log('pause',{elapsed:this.elapsed,x:this.player.x,y:this.player.y})}
  resumeGame(){if(this.mode!=='paused')return;this.mode='playing';this.physics.resume();this.tweens.resumeAll();this.player.anims.resume();this.input.keyboard!.resetKeys();this.clearTouch();log('resume',{elapsed:this.elapsed,x:this.player.x,y:this.player.y})}
  collect(obj:Phaser.Physics.Arcade.Image){if(this.mode!=='playing'||!obj.active)return;const id=obj.getData('id');if(this.collected.has(id))return;this.collected.add(id);obj.disableBody(true,true);this.say(`快递 +1  ·  ${this.collected.size} / 3`);this.burst(obj.x,obj.y-15,C.orange);log('collect',{id,elapsed:this.elapsed,x:this.player.x,y:this.player.y});if(this.collected.size===3){this.drawExit(true);this.say('三份齐了！前往右侧绿色出口')}}
  say(message:string){this.toastText.setText(message).setVisible(true);this.toastUntil=this.elapsed+2.3}
  burst(x:number,y:number,color:number){for(let i=0;i<8;i++){const p=this.add.circle(x,y,4,color).setDepth(20);this.tweens.add({targets:p,x:x+Math.cos(i*Math.PI/4)*40,y:y+Math.sin(i*Math.PI/4)*40,alpha:0,duration:450,onComplete:()=>p.destroy()})}}
  damage(cause:string,fall=false){
    if(this.mode!=='playing'||(!fall&&this.invulnerable>0))return
    this.lives--;this.invulnerable=this.level.physics.invulnerabilityMs;this.hurtFor=360;this.cameras.main.shake(160,.004);this.burst(this.player.x,this.player.y-30,C.red)
    this.say(`${cause==='掉落'?'掉落，返回邮局':cause+'接触'}  ·  生命 −1`);log('damage',{cause,lives:this.lives,elapsed:this.elapsed})
    if(this.lives<=0){this.finish(false,'生命耗尽');return}
    if(fall){this.player.setPosition(this.level.spawn.x,this.level.spawn.y);(this.player.body as Phaser.Physics.Arcade.Body).reset(this.level.spawn.x,this.level.spawn.y);this.player.setVelocity(0);this.cameras.main.centerOn(this.player.x,this.player.y)}
  }
  finish(win:boolean,reason=''){if(this.mode!=='playing')return;this.mode=win?'won':'lost';this.failReason=reason;this.physics.pause();this.player.anims.stop();this.player.setAlpha(1);this.clearTouch();log(win?'win':'lose',{reason,elapsed:this.elapsed,collected:this.collected.size});if(win)this.burst(this.player.x,this.player.y-60,C.orange)}
  update(_time:number,delta:number){
    if(this.mode!=='playing')return
    this.elapsed+=delta/1000;this.invulnerable=Math.max(0,this.invulnerable-delta);this.hurtFor=Math.max(0,this.hurtFor-delta)
    if(this.elapsed>=this.level.physics.durationSeconds){this.elapsed=this.level.physics.durationSeconds;this.finish(false,'时间耗尽');return}
    for(const obj of this.movers){const p=obj.getData('route'),dir=obj.getData('direction');if(dir===1&&obj.x>=p.toX){obj.setX(p.toX);obj.setData('direction',-1)}else if(dir===-1&&obj.x<=p.x){obj.setX(p.x);obj.setData('direction',1)}obj.setVelocityX(obj.getData('direction')*(p.toX-p.x)/(p.durationMs/1000))}
    for(const obj of this.robots){const r=obj.getData('route'),dir=obj.getData('direction');if(dir===1&&obj.x>=r.maxX){obj.setX(r.maxX);obj.setData('direction',-1)}else if(dir===-1&&obj.x<=r.minX){obj.setX(r.minX);obj.setData('direction',1)}obj.setVelocityX(obj.getData('direction')*r.speed);obj.setFlipX(obj.getData('direction')<0)}
    const b=this.player.body as Phaser.Physics.Arcade.Body;const grounded=b.blocked.down||b.touching.down
    const left=this.keys.LEFT.isDown||this.keys.A.isDown||this.touch.left,right=this.keys.RIGHT.isDown||this.keys.D.isDown||this.touch.right
    const direction=Number(right)-Number(left);this.player.setVelocityX(direction*this.level.physics.moveSpeed)
    if(direction)this.player.setFlipX(direction<0)
    const jump=Phaser.Input.Keyboard.JustDown(this.keys.SPACE)||this.jumpQueued;this.jumpQueued=false
    if(jump&&grounded){this.player.setVelocityY(-this.level.physics.jumpSpeed);this.jumps++;this.burst(this.player.x,this.player.y,0xffffff);log('jump',{x:this.player.x,y:this.player.y,elapsed:this.elapsed})}
    if(this.hurtFor>0){this.player.anims.stop();this.player.setTexture('pelican-hurt')}
    else if(!grounded||jump&&grounded){this.player.anims.stop();this.player.setTexture('pelican-jump')}
    else if(direction)this.player.play('walk',true)
    else{this.player.anims.stop();this.player.setTexture('pelican-idle')}
    this.player.setAlpha(this.invulnerable>0?(Math.floor(this.invulnerable/85)%2?.35:1):1)
    if(this.player.y-this.player.displayHeight>this.level.height)this.damage('掉落',true)
    this.lastGround=grounded
    this.toastText.setPosition(this.scale.width/2,portrait()?105:140).setVisible(this.elapsed<this.toastUntil)
  }
}

class Interface extends Phaser.Scene {
  world!:Harbor; root!:Phaser.GameObjects.Container; panel?:Phaser.GameObjects.Container; hud!:Phaser.GameObjects.Container; controls!:Phaser.GameObjects.Container
  hearts!:Phaser.GameObjects.Text; count!:Phaser.GameObjects.Text; timer!:Phaser.GameObjects.Text; route!:Phaser.GameObjects.Graphics; status!:Phaser.GameObjects.Text
  lastPauseEvent=-1; lastPauseWall=-1000; lastMode=''; lastSize=''; activePointers=new Map<number,string>(); buttons:Phaser.GameObjects.Container[]=[]
  constructor(){super({key:'interface',active:true})}
  create(){
    this.world=this.scene.get('harbor') as Harbor
    this.input.keyboard!.addKey('P')
    this.input.keyboard!.on('keydown-P',(event:KeyboardEvent)=>{if(event.repeat||event.timeStamp===this.lastPauseEvent||performance.now()-this.lastPauseWall<200)return;this.lastPauseEvent=event.timeStamp;this.lastPauseWall=performance.now();if(this.world.mode==='playing')this.world.pauseGame();else if(this.world.mode==='paused')this.world.resumeGame()})
    this.input.keyboard!.on('keydown-ENTER',()=>{if(this.world.mode==='ready')this.world.restart()})
    this.input.on('pointerup',(p:Phaser.Input.Pointer)=>this.release(p.id));this.input.on('pointerupoutside',(p:Phaser.Input.Pointer)=>this.release(p.id))
    this.input.on('gameout',()=>this.releaseAll())
    window.addEventListener('blur',()=>{this.releaseAll();if(this.world.mode==='playing')this.world.pauseGame()})
    document.addEventListener('visibilitychange',()=>{if(document.hidden){this.releaseAll();if(this.world.mode==='playing')this.world.pauseGame()}})
    this.scale.on('resize',()=>{this.lastSize='';this.releaseAll()})
    this.input.addPointer(3)
    this.build()
  }
  txt(x:number,y:number,text:string,size=20,color='#173b50',bold=false){return this.add.text(x,y,text,{fontFamily:FONT,fontSize:`${size}px`,color,fontStyle:bold?'bold':'normal'}).setOrigin(0,.5)}
  box(x:number,y:number,w:number,h:number,color:number,r=16){const g=this.add.graphics();g.fillStyle(color);g.fillRoundedRect(x,y,w,h,r);return g}
  button(x:number,y:number,w:number,h:number,label:string,fn:()=>void,secondary=false){
    const c=this.add.container(x,y);const bg=this.box(-w/2,-h/2,w,h,secondary?0xe9f0e8:C.orange,14);const text=this.txt(0,0,label,22,secondary?'#376578':'#173b50',true).setOrigin(.5);c.add([bg,text]);c.setSize(w,h).setInteractive({useHandCursor:true});c.on('pointerover',()=>c.setScale(1.025));c.on('pointerout',()=>c.setScale(1));c.on('pointerdown',()=>c.setScale(.97));c.on('pointerup',()=>{c.setScale(1);fn()});return c
  }
  build(){
    if(this.root)this.root.destroy(true);this.root=this.add.container(0,0);this.buttons=[]
    const w=this.scale.width,h=this.scale.height,mobile=portrait();this.lastSize=`${w}:${h}`
    if(mobile){this.root.add(this.box(0,0,w,h,0xe5f0e9,0));this.root.add(this.box(0,145,w,720,0xc0e7ed,0))}
    // The UI scene's transparent world window keeps the Phaser world visible.
    if(mobile)this.root.removeAll(true)
    if(mobile){this.root.add(this.box(0,0,w,145,C.cream,0));this.root.add(this.box(0,865,w,h-865,C.cream,0))}
    this.hud=this.add.container(0,0);this.root.add(this.hud)
    const cards=mobile?[{x:16,w:174},{x:205,w:174},{x:394,w:190}]:[{x:28,w:194},{x:238,w:196},{x:450,w:200}]
    cards.forEach(c=>{this.hud.add(this.box(c.x,mobile?22:24,c.w,74,C.cream,15))})
    this.hearts=this.txt(cards[0].x+16,mobile?62:65,'♥ ♥ ♥',29,'#da605a',true);this.hud.add(this.hearts)
    this.count=this.txt(cards[1].x+16,mobile?62:65,'快递  0 / 3',24,'#173b50',true);this.hud.add(this.count)
    this.timer=this.txt(cards[2].x+16,mobile?62:65,'02:00',29,'#173b50',true);this.hud.add(this.timer)
    if(mobile){this.hud.add(this.txt(20,122,'港湾邮路 01  /  收齐三件后到达出口',18,'#547886'));const pause=this.button(w-46,122,60,32,'Ⅱ',()=>this.world.pauseGame(),true);this.hud.add(pause)}
    else{this.hud.add(this.txt(685,49,'港湾邮路 01',20,'#376578',true));this.hud.add(this.txt(685,80,'收齐三件快递 → 送往最右侧出口',17,'#537f89'));this.hud.add(this.button(w-94,62,132,58,'Ⅱ 暂停',()=>this.world.pauseGame(),true))}
    const footerY=mobile?905:682
    if(!mobile)this.hud.add(this.box(26,652,690,48,0xfff8e9,12))
    this.status=this.txt(mobile?28:44,footerY,mobile?'搭乘移动平台，抵达高台；小心巡逻机器人。':'← → / A D  移动     SPACE  跳跃     P  暂停',mobile?19:18,'#315d6c');this.hud.add(this.status)
    if(mobile){
      this.hud.add(this.txt(28,950,'路线进度',17,'#70919a'));this.hud.add(this.txt(28,995,'只有站稳后才能起跳 · 受伤后短暂无敌',18,'#537b86'))
      this.hud.add(this.txt(28,h-35,'PEL I CAN  /  港口特别配送',16,'#91aaa9'))
    }
    this.route=this.add.graphics();this.hud.add(this.route)
    this.controls=this.add.container(0,0);this.root.add(this.controls)
    const cy=mobile?h-145:590
    for(const [name,label,x] of [['left','←',mobile?84:74],['right','→',mobile?210:186],['jump','↑',mobile?w-92:w-92]] as const){
      const c=this.add.container(x,cy);const bg=this.add.graphics();bg.fillStyle(C.navy,mobile?.95:.65);bg.fillRoundedRect(-47,-47,94,94,24);bg.lineStyle(2,0xffffff,.65);bg.strokeRoundedRect(-47,-47,94,94,24);c.add([bg,this.txt(0,-4,label,40,'#fff8e9',true).setOrigin(.5),this.txt(0,30,name==='jump'?'跳跃':'',14,'#d2e8e6').setOrigin(.5)]);c.setSize(94,94).setInteractive();c.on('pointerdown',(p:Phaser.Input.Pointer)=>{if(this.world.mode!=='playing')return;this.activePointers.set(p.id,name);this.world.touch[name]=true;if(name==='jump')this.world.jumpQueued=true;c.setAlpha(.65)});c.on('pointerout',(p:Phaser.Input.Pointer)=>this.release(p.id));c.on('pointerup',(p:Phaser.Input.Pointer)=>this.release(p.id));this.controls.add(c);this.buttons.push(c)
    }
    this.lastMode=''
  }
  release(id:number){const name=this.activePointers.get(id) as 'left'|'right'|'jump'|undefined;if(name){this.activePointers.delete(id);this.world.touch[name]=[...this.activePointers.values()].includes(name)}this.buttons.forEach(b=>b.setAlpha(1))}
  releaseAll(){this.activePointers.clear();this.world.clearTouch();this.buttons.forEach(b=>b.setAlpha(1))}
  showPanel(){
    if(this.panel)this.panel.destroy(true);this.panel=undefined;const mode=this.world.mode
    if(mode==='playing')return
    this.releaseAll();const w=this.scale.width,h=this.scale.height,mobile=portrait();const pw=mobile?540:850,ph=mode==='ready'?(mobile?650:490):(mobile?510:420),cx=w/2,cy=mobile?Math.min(h/2,650):360
    const c=this.add.container(0,0);this.panel=c
    c.add(this.add.rectangle(0,0,w,h,0x103c50,.64).setOrigin(0).setInteractive())
    c.add(this.box(cx-pw/2+6,cy-ph/2+9,pw,ph,0x12394b,26));c.add(this.box(cx-pw/2,cy-ph/2,pw,ph,C.cream,26))
    const x=cx-pw/2+40,y=cy-ph/2
    c.add(this.txt(x,y+38,mode==='ready'?'HARBOR POST  /  01':mode==='paused'?'DELIVERY ON HOLD':mode==='won'?'DELIVERY COMPLETE':'DELIVERY INTERRUPTED',16,'#27888f',true))
    if(mode==='ready'){
      c.add(this.txt(x,y+99,'鹈鹕快递',mobile?48:54,'#173b50',true));c.add(this.txt(x,y+158,'大作战',mobile?48:54,'#173b50',true))
      c.add(this.add.image(cx+pw/2-(mobile?80:115),y+124,'pelican-idle').setScale(mobile?1.5:2.2))
      c.add(this.txt(x,y+221,'穿过港湾，把三份快递安全送达。',mobile?23:25,'#376578',true))
      const instructions=mobile?['01  重叠拾取全部三份快递','02  搭乘往返平台，跳过断桥与尖刺','03  收齐后进入最右侧绿色出口']:['01  收集三件快递     02  搭乘平台     03  前往出口']
      instructions.forEach((s,i)=>c.add(this.txt(x,y+274+i*39,s,mobile?19:21,'#547886')))
      const iy=mobile?y+412:y+326
      c.add(this.txt(x,iy,'键盘  ← → / A D 移动 · 空格跳跃 · P 暂停',mobile?18:19,'#547886'))
      c.add(this.txt(x,iy+34,'触屏  使用屏幕下方的左右与跳跃按钮',mobile?18:19,'#547886'))
      c.add(this.button(cx,mobile?y+540:y+421,mobile?460:340,66,'开始配送  →',()=>this.world.restart()))
      c.add(this.txt(cx,mobile?y+602:y+470,'3 点生命  ·  120 秒  ·  只有站稳才能再次跳跃',mobile?17:16,'#7c9696').setOrigin(.5))
    }else{
      const title=mode==='paused'?'歇一会儿，邮路还在':mode==='won'?'三件快递，全部送达！':'这趟配送未完成'
      c.add(this.txt(x,y+108,title,mobile?30:38,'#173b50',true))
      const remaining=Math.ceil(Math.max(0,120-this.world.elapsed))
      const line=mode==='paused'?'角色、巡逻与计时已冻结。':mode==='won'?`送达 3 / 3  ·  剩余 ${remaining} 秒`:`${this.world.failReason}  ·  已收集 ${this.world.collected.size} / 3`
      c.add(this.txt(x,y+171,line,mobile?22:25,mode==='lost'?'#bf5350':'#376578',true))
      c.add(this.txt(x,y+217,mode==='paused'?'继续后从当前地点出发。':mode==='won'?'港口邮局感谢你的准时配送。':'重试会恢复生命、时间与全部快递。',mobile?20:21,'#547886'))
      if(mode==='paused'){
        c.add(this.button(cx,y+298,pw-80,62,'继续配送  →',()=>this.world.resumeGame()))
        c.add(this.button(cx,y+376,pw-80,54,'重新开始',()=>this.world.restart(),true))
      }else c.add(this.button(cx,y+(mobile?350:320),pw-80,66,mode==='won'?'再送一次  →':'重新配送  →',()=>this.world.restart()))
    }
  }
  update(time:number){
    if(!this.world.player)return
    if(Math.floor(time/100)!==Math.floor((time-this.game.loop.delta)/100))diagnostics.textContent=JSON.stringify((window as unknown as {__pelican:unknown}).__pelican)
    if(this.lastSize!==`${this.scale.width}:${this.scale.height}`)this.build()
    if(this.lastMode!==this.world.mode){this.lastMode=this.world.mode;this.showPanel()}
    this.hearts.setText('♥ '.repeat(Math.max(0,this.world.lives))+'♡ '.repeat(3-Math.max(0,this.world.lives)))
    this.count.setText(`快递  ${this.world.collected.size} / 3`)
    const t=Math.ceil(Math.max(0,120-this.world.elapsed));this.timer.setText(`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`).setColor(t<=20?'#c9544f':'#173b50')
    this.controls.setVisible(this.world.mode==='playing'&&portrait());this.hud.setVisible(this.world.mode!=='ready')
    this.route.clear();const mobile=portrait(),x=mobile?150:780,y=mobile?950:681,len=mobile?420:460
    this.route.lineStyle(4,0x94b5b5,.75);this.route.lineBetween(x,y,x+len,y)
    for(const p of this.world.level.packages){this.route.fillStyle(this.world.collected.has(p.id)?C.teal:C.orange);this.route.fillCircle(x+p.x/2400*len,y,6)}
    this.route.fillStyle(C.navy);this.route.fillCircle(x+this.world.player.x/2400*len,y,5)
  }
}
const dims=dimensions()
const game = new Phaser.Game({type:Phaser.AUTO,parent:'app',...dims,backgroundColor:'#e5f0e9',physics:{default:'arcade',arcade:{gravity:{x:0,y:900},debug:false}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},render:{antialias:true,pixelArt:false},input:{activePointers:4},scene:[Harbor,Interface]})
window.addEventListener('resize',()=>{if(game){const d=dimensions();game.scale.setGameSize(d.width,d.height)}})
Object.defineProperty(window,'__pelican',{get:()=>{const s=game.scene.getScene('harbor') as Harbor|undefined;if(!s?.player)return null;const b=s.player.body as Phaser.Physics.Arcade.Body;return {mode:s.mode,lives:s.lives,elapsed:s.elapsed,invulnerable:s.invulnerable,collected:[...s.collected],player:{x:s.player.x,y:s.player.y,vx:b.velocity.x,vy:b.velocity.y,grounded:b.blocked.down||b.touching.down,body:{x:b.x,y:b.y,width:b.width,height:b.height}},movers:s.movers.map(o=>({x:o.x,y:o.y,width:o.body?.width,height:o.body?.height})),robots:s.robots.map(o=>({x:o.x,y:o.y})),counts:{children:s.children.length,bodies:s.physics.world.bodies.size,staticBodies:s.physics.world.staticBodies.size,colliders:s.physics.world.colliders.getActive().length},jumps:s.jumps,runs,events:eventLog.slice()}}})
