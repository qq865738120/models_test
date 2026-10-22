var ah=Object.defineProperty;var lh=(r,e,t)=>e in r?ah(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Fe=(r,e,t)=>lh(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gr="171",ch=0,Na=1,hh=2,oc=1,ac=2,Cn=3,Wn=0,Gt=1,Ut=2,Vn=0,Di=1,Fa=2,Oa=3,Ba=4,uh=5,ii=100,fh=101,dh=102,ph=103,mh=104,gh=200,vh=201,xh=202,_h=203,Mo=204,So=205,yh=206,Mh=207,Sh=208,wh=209,Eh=210,Th=211,bh=212,Ah=213,Ch=214,wo=0,Eo=1,To=2,Fi=3,bo=4,Ao=5,Co=6,Ro=7,lc=0,Rh=1,Ph=2,Hn=0,Lh=1,Ih=2,Dh=3,cc=4,Uh=5,Nh=6,Fh=7,hc=300,Oi=301,Bi=302,Po=303,Lo=304,vr=306,hr=1e3,ri=1001,Io=1002,Jt=1003,Oh=1004,Es=1005,vn=1006,Cr=1007,oi=1008,Dn=1009,uc=1010,fc=1011,hs=1012,ha=1013,li=1014,xn=1015,ms=1016,ua=1017,fa=1018,zi=1020,dc=35902,pc=1021,mc=1022,mn=1023,gc=1024,vc=1025,Ui=1026,ki=1027,da=1028,pa=1029,xc=1030,ma=1031,ga=1033,nr=33776,ir=33777,sr=33778,rr=33779,Do=35840,Uo=35841,No=35842,Fo=35843,Oo=36196,Bo=37492,zo=37496,ko=37808,Vo=37809,Ho=37810,Go=37811,Wo=37812,Xo=37813,Yo=37814,qo=37815,Zo=37816,$o=37817,Ko=37818,Jo=37819,jo=37820,Qo=37821,or=36492,ea=36494,ta=36495,_c=36283,na=36284,ia=36285,sa=36286,Bh=3200,zh=3201,yc=0,kh=1,Rn="",Dt="srgb",Vi="srgb-linear",ur="linear",pt="srgb",di=7680,za=519,Vh=512,Hh=513,Gh=514,Mc=515,Wh=516,Xh=517,Yh=518,qh=519,ka=35044,Va="300 es",Pn=2e3,fr=2001;class Wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const i=s.indexOf(t);i!==-1&&s.splice(i,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let i=0,a=s.length;i<a;i++)s[i].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ha=1234567;const rs=Math.PI/180,us=180/Math.PI;function ui(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[r&255]+Ot[r>>8&255]+Ot[r>>16&255]+Ot[r>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function $e(r,e,t){return Math.max(e,Math.min(t,r))}function va(r,e){return(r%e+e)%e}function Zh(r,e,t,n,s){return n+(r-e)*(s-n)/(t-e)}function $h(r,e,t){return r!==e?(t-r)/(e-r):0}function os(r,e,t){return(1-t)*r+t*e}function Kh(r,e,t,n){return os(r,e,1-Math.exp(-t*n))}function Jh(r,e=1){return e-Math.abs(va(r,e*2)-e)}function jh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Qh(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function eu(r,e){return r+Math.floor(Math.random()*(e-r+1))}function tu(r,e){return r+Math.random()*(e-r)}function nu(r){return r*(.5-Math.random())}function iu(r){r!==void 0&&(Ha=r);let e=Ha+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function su(r){return r*rs}function ru(r){return r*us}function ou(r){return(r&r-1)===0&&r!==0}function au(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function lu(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function cu(r,e,t,n,s){const i=Math.cos,a=Math.sin,o=i(t/2),l=a(t/2),h=i((e+n)/2),u=a((e+n)/2),d=i((e-n)/2),f=a((e-n)/2),c=i((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":r.set(o*u,l*d,l*f,o*h);break;case"YZY":r.set(l*f,o*u,l*d,o*h);break;case"ZXZ":r.set(l*d,l*f,o*u,o*h);break;case"XZX":r.set(o*u,l*p,l*c,o*h);break;case"YXY":r.set(l*c,o*u,l*p,o*h);break;case"ZYZ":r.set(l*p,l*c,o*u,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ri(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Vt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const nn={DEG2RAD:rs,RAD2DEG:us,generateUUID:ui,clamp:$e,euclideanModulo:va,mapLinear:Zh,inverseLerp:$h,lerp:os,damp:Kh,pingpong:Jh,smoothstep:jh,smootherstep:Qh,randInt:eu,randFloat:tu,randFloatSpread:nu,seededRandom:iu,degToRad:su,radToDeg:ru,isPowerOfTwo:ou,ceilPowerOfTwo:au,floorPowerOfTwo:lu,setQuaternionFromProperEuler:cu,normalize:Vt,denormalize:Ri};class ae{constructor(e=0,t=0){ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*s+e.x,this.y=i*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,t,n,s,i,a,o,l,h){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,i,a,o,l,h)}set(e,t,n,s,i,a,o,l,h){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=i,u[5]=l,u[6]=n,u[7]=a,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,i=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],u=n[4],d=n[7],f=n[2],c=n[5],p=n[8],v=s[0],m=s[3],g=s[6],T=s[1],M=s[4],x=s[7],w=s[2],y=s[5],_=s[8];return i[0]=a*v+o*T+l*w,i[3]=a*m+o*M+l*y,i[6]=a*g+o*x+l*_,i[1]=h*v+u*T+d*w,i[4]=h*m+u*M+d*y,i[7]=h*g+u*x+d*_,i[2]=f*v+c*T+p*w,i[5]=f*m+c*M+p*y,i[8]=f*g+c*x+p*_,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],i=e[3],a=e[4],o=e[5],l=e[6],h=e[7],u=e[8];return t*a*u-t*o*h-n*i*u+n*o*l+s*i*h-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],i=e[3],a=e[4],o=e[5],l=e[6],h=e[7],u=e[8],d=u*a-o*h,f=o*l-u*i,c=h*i-a*l,p=t*d+n*f+s*c;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=d*v,e[1]=(s*h-u*n)*v,e[2]=(o*n-s*a)*v,e[3]=f*v,e[4]=(u*t-s*l)*v,e[5]=(s*i-o*t)*v,e[6]=c*v,e[7]=(n*l-h*t)*v,e[8]=(a*t-n*i)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,i,a,o){const l=Math.cos(i),h=Math.sin(i);return this.set(n*l,n*h,-n*(l*a+h*o)+a+e,-s*h,s*l,-s*(-h*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Rr.makeScale(e,t)),this}rotate(e){return this.premultiply(Rr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Rr=new Ze;function Sc(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function dr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function hu(){const r=dr("canvas");return r.style.display="block",r}const Ga={};function Pi(r){r in Ga||(Ga[r]=!0,console.warn(r))}function uu(r,e,t){return new Promise(function(n,s){function i(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:s();break;case r.TIMEOUT_EXPIRED:setTimeout(i,t);break;default:n()}}setTimeout(i,t)})}function fu(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function du(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Wa=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xa=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pu(){const r={enabled:!0,workingColorSpace:Vi,spaces:{},convert:function(s,i,a){return this.enabled===!1||i===a||!i||!a||(this.spaces[i].transfer===pt&&(s.r=Ln(s.r),s.g=Ln(s.g),s.b=Ln(s.b)),this.spaces[i].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[i].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pt&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b))),s},fromWorkingColorSpace:function(s,i){return this.convert(s,this.workingColorSpace,i)},toWorkingColorSpace:function(s,i){return this.convert(s,i,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Rn?ur:this.spaces[s].transfer},getLuminanceCoefficients:function(s,i=this.workingColorSpace){return s.fromArray(this.spaces[i].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,i,a){return s.copy(this.spaces[i].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Vi]:{primaries:e,whitePoint:n,transfer:ur,toXYZ:Wa,fromXYZ:Xa,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:e,whitePoint:n,transfer:pt,toXYZ:Wa,fromXYZ:Xa,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}}),r}const lt=pu();function Ln(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ni(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let pi;class mu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{pi===void 0&&(pi=dr("canvas")),pi.width=e.width,pi.height=e.height;const n=pi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=pi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=dr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),i=s.data;for(let a=0;a<i.length;a++)i[a]=Ln(i[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ln(t[n]/255)*255):t[n]=Ln(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gu=0;class wc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let i;if(Array.isArray(s)){i=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?i.push(Pr(s[a].image)):i.push(Pr(s[a]))}else i=Pr(s);n.url=i}return t||(e.images[this.uuid]=n),n}}function Pr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?mu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vu=0;class zt extends Wi{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=ri,s=ri,i=vn,a=oi,o=mn,l=Dn,h=zt.DEFAULT_ANISOTROPY,u=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=ui(),this.name="",this.source=new wc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=i,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hr:e.x=e.x-Math.floor(e.x);break;case ri:e.x=e.x<0?0:1;break;case Io:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hr:e.y=e.y-Math.floor(e.y);break;case ri:e.y=e.y<0?0:1;break;case Io:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=hc;zt.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,n=0,s=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,i;const l=e.elements,h=l[0],u=l[4],d=l[8],f=l[1],c=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+v)<.1&&Math.abs(p+m)<.1&&Math.abs(h+c+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(h+1)/2,x=(c+1)/2,w=(g+1)/2,y=(u+f)/4,_=(d+v)/4,b=(p+m)/4;return M>x&&M>w?M<.01?(n=0,s=.707106781,i=.707106781):(n=Math.sqrt(M),s=y/n,i=_/n):x>w?x<.01?(n=.707106781,s=0,i=.707106781):(s=Math.sqrt(x),n=y/s,i=b/s):w<.01?(n=.707106781,s=.707106781,i=0):(i=Math.sqrt(w),n=_/i,s=b/i),this.set(n,s,i,t),this}let T=Math.sqrt((m-p)*(m-p)+(d-v)*(d-v)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(m-p)/T,this.y=(d-v)/T,this.z=(f-u)/T,this.w=Math.acos((h+c+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xu extends Wi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const i=new zt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);i.flipY=!1,i.generateMipmaps=n.generateMipmaps,i.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=i.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,i=this.textures.length;s<i;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new wc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends xu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ec extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _u extends zt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gs{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,i,a,o){let l=n[s+0],h=n[s+1],u=n[s+2],d=n[s+3];const f=i[a+0],c=i[a+1],p=i[a+2],v=i[a+3];if(o===0){e[t+0]=l,e[t+1]=h,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=c,e[t+2]=p,e[t+3]=v;return}if(d!==v||l!==f||h!==c||u!==p){let m=1-o;const g=l*f+h*c+u*p+d*v,T=g>=0?1:-1,M=1-g*g;if(M>Number.EPSILON){const w=Math.sqrt(M),y=Math.atan2(w,g*T);m=Math.sin(m*y)/w,o=Math.sin(o*y)/w}const x=o*T;if(l=l*m+f*x,h=h*m+c*x,u=u*m+p*x,d=d*m+v*x,m===1-o){const w=1/Math.sqrt(l*l+h*h+u*u+d*d);l*=w,h*=w,u*=w,d*=w}}e[t]=l,e[t+1]=h,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,i,a){const o=n[s],l=n[s+1],h=n[s+2],u=n[s+3],d=i[a],f=i[a+1],c=i[a+2],p=i[a+3];return e[t]=o*p+u*d+l*c-h*f,e[t+1]=l*p+u*f+h*d-o*c,e[t+2]=h*p+u*c+o*f-l*d,e[t+3]=u*p-o*d-l*f-h*c,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,i=e._z,a=e._order,o=Math.cos,l=Math.sin,h=o(n/2),u=o(s/2),d=o(i/2),f=l(n/2),c=l(s/2),p=l(i/2);switch(a){case"XYZ":this._x=f*u*d+h*c*p,this._y=h*c*d-f*u*p,this._z=h*u*p+f*c*d,this._w=h*u*d-f*c*p;break;case"YXZ":this._x=f*u*d+h*c*p,this._y=h*c*d-f*u*p,this._z=h*u*p-f*c*d,this._w=h*u*d+f*c*p;break;case"ZXY":this._x=f*u*d-h*c*p,this._y=h*c*d+f*u*p,this._z=h*u*p+f*c*d,this._w=h*u*d-f*c*p;break;case"ZYX":this._x=f*u*d-h*c*p,this._y=h*c*d+f*u*p,this._z=h*u*p-f*c*d,this._w=h*u*d+f*c*p;break;case"YZX":this._x=f*u*d+h*c*p,this._y=h*c*d+f*u*p,this._z=h*u*p-f*c*d,this._w=h*u*d-f*c*p;break;case"XZY":this._x=f*u*d-h*c*p,this._y=h*c*d-f*u*p,this._z=h*u*p+f*c*d,this._w=h*u*d+f*c*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],i=t[8],a=t[1],o=t[5],l=t[9],h=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){const c=.5/Math.sqrt(f+1);this._w=.25/c,this._x=(u-l)*c,this._y=(i-h)*c,this._z=(a-s)*c}else if(n>o&&n>d){const c=2*Math.sqrt(1+n-o-d);this._w=(u-l)/c,this._x=.25*c,this._y=(s+a)/c,this._z=(i+h)/c}else if(o>d){const c=2*Math.sqrt(1+o-n-d);this._w=(i-h)/c,this._x=(s+a)/c,this._y=.25*c,this._z=(l+u)/c}else{const c=2*Math.sqrt(1+d-n-o);this._w=(a-s)/c,this._x=(i+h)/c,this._y=(l+u)/c,this._z=.25*c}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,i=e._z,a=e._w,o=t._x,l=t._y,h=t._z,u=t._w;return this._x=n*u+a*o+s*h-i*l,this._y=s*u+a*l+i*o-n*h,this._z=i*u+a*h+n*l-s*o,this._w=a*u-n*o-s*l-i*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,i=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+i*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=i,this;const l=1-o*o;if(l<=Number.EPSILON){const c=1-t;return this._w=c*a+t*this._w,this._x=c*n+t*this._x,this._y=c*s+t*this._y,this._z=c*i+t*this._z,this.normalize(),this}const h=Math.sqrt(l),u=Math.atan2(h,o),d=Math.sin((1-t)*u)/h,f=Math.sin(t*u)/h;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=i*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ya.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ya.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*s,this.y=i[1]*t+i[4]*n+i[7]*s,this.z=i[2]*t+i[5]*n+i[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*s+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*s+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*s+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*s+i[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,i=e.x,a=e.y,o=e.z,l=e.w,h=2*(a*s-o*n),u=2*(o*t-i*s),d=2*(i*n-a*t);return this.x=t+l*h+a*d-o*u,this.y=n+l*u+o*h-i*d,this.z=s+l*d+i*u-a*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*s,this.y=i[1]*t+i[5]*n+i[9]*s,this.z=i[2]*t+i[6]*n+i[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,i=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-i*o,this.y=i*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lr.copy(this).projectOnVector(e),this.sub(Lr)}reflect(e){return this.sub(Lr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lr=new P,Ya=new gs;class Yn{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const i=n.getAttribute("position");if(t===!0&&i!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=i.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,hn):hn.fromBufferAttribute(i,a),hn.applyMatrix4(e.matrixWorld),this.expandByPoint(hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ts.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ts.copy(n.boundingBox)),Ts.applyMatrix4(e.matrixWorld),this.union(Ts)}const s=e.children;for(let i=0,a=s.length;i<a;i++)this.expandByObject(s[i],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hn),hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zi),bs.subVectors(this.max,Zi),mi.subVectors(e.a,Zi),gi.subVectors(e.b,Zi),vi.subVectors(e.c,Zi),Un.subVectors(gi,mi),Nn.subVectors(vi,gi),$n.subVectors(mi,vi);let t=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-$n.z,$n.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,$n.z,0,-$n.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-$n.y,$n.x,0];return!Ir(t,mi,gi,vi,bs)||(t=[1,0,0,0,1,0,0,0,1],!Ir(t,mi,gi,vi,bs))?!1:(As.crossVectors(Un,Nn),t=[As.x,As.y,As.z],Ir(t,mi,gi,vi,bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const wn=[new P,new P,new P,new P,new P,new P,new P,new P],hn=new P,Ts=new Yn,mi=new P,gi=new P,vi=new P,Un=new P,Nn=new P,$n=new P,Zi=new P,bs=new P,As=new P,Kn=new P;function Ir(r,e,t,n,s){for(let i=0,a=r.length-3;i<=a;i+=3){Kn.fromArray(r,i);const o=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),l=e.dot(Kn),h=t.dot(Kn),u=n.dot(Kn);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>o)return!1}return!0}const yu=new Yn,$i=new P,Dr=new P;class vs{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):yu.setFromPoints(e).getCenter(n);let s=0;for(let i=0,a=e.length;i<a;i++)s=Math.max(s,n.distanceToSquared(e[i]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$i.subVectors(e,this.center);const t=$i.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector($i,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($i.copy(e.center).add(Dr)),this.expandByPoint($i.copy(e.center).sub(Dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new P,Ur=new P,Cs=new P,Fn=new P,Nr=new P,Rs=new P,Fr=new P;class Tc{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,En)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=En.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(En.copy(this.origin).addScaledVector(this.direction,t),En.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ur.copy(e).add(t).multiplyScalar(.5),Cs.copy(t).sub(e).normalize(),Fn.copy(this.origin).sub(Ur);const i=e.distanceTo(t)*.5,a=-this.direction.dot(Cs),o=Fn.dot(this.direction),l=-Fn.dot(Cs),h=Fn.lengthSq(),u=Math.abs(1-a*a);let d,f,c,p;if(u>0)if(d=a*l-o,f=a*o-l,p=i*u,d>=0)if(f>=-p)if(f<=p){const v=1/u;d*=v,f*=v,c=d*(d+a*f+2*o)+f*(a*d+f+2*l)+h}else f=i,d=Math.max(0,-(a*f+o)),c=-d*d+f*(f+2*l)+h;else f=-i,d=Math.max(0,-(a*f+o)),c=-d*d+f*(f+2*l)+h;else f<=-p?(d=Math.max(0,-(-a*i+o)),f=d>0?-i:Math.min(Math.max(-i,-l),i),c=-d*d+f*(f+2*l)+h):f<=p?(d=0,f=Math.min(Math.max(-i,-l),i),c=f*(f+2*l)+h):(d=Math.max(0,-(a*i+o)),f=d>0?i:Math.min(Math.max(-i,-l),i),c=-d*d+f*(f+2*l)+h);else f=a>0?-i:i,d=Math.max(0,-(a*f+o)),c=-d*d+f*(f+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ur).addScaledVector(Cs,f),c}intersectSphere(e,t){En.subVectors(e.center,this.origin);const n=En.dot(this.direction),s=En.dot(En)-n*n,i=e.radius*e.radius;if(s>i)return null;const a=Math.sqrt(i-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,i,a,o,l;const h=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return h>=0?(n=(e.min.x-f.x)*h,s=(e.max.x-f.x)*h):(n=(e.max.x-f.x)*h,s=(e.min.x-f.x)*h),u>=0?(i=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(i=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||i>s||((i>n||isNaN(n))&&(n=i),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,En)!==null}intersectTriangle(e,t,n,s,i){Nr.subVectors(t,e),Rs.subVectors(n,e),Fr.crossVectors(Nr,Rs);let a=this.direction.dot(Fr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,e);const l=o*this.direction.dot(Rs.crossVectors(Fn,Rs));if(l<0)return null;const h=o*this.direction.dot(Nr.cross(Fn));if(h<0||l+h>a)return null;const u=-o*Fn.dot(Fr);return u<0?null:this.at(u/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(e,t,n,s,i,a,o,l,h,u,d,f,c,p,v,m){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,i,a,o,l,h,u,d,f,c,p,v,m)}set(e,t,n,s,i,a,o,l,h,u,d,f,c,p,v,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=i,g[5]=a,g[9]=o,g[13]=l,g[2]=h,g[6]=u,g[10]=d,g[14]=f,g[3]=c,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/xi.setFromMatrixColumn(e,0).length(),i=1/xi.setFromMatrixColumn(e,1).length(),a=1/xi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),h=Math.sin(s),u=Math.cos(i),d=Math.sin(i);if(e.order==="XYZ"){const f=a*u,c=a*d,p=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=h,t[1]=c+p*h,t[5]=f-v*h,t[9]=-o*l,t[2]=v-f*h,t[6]=p+c*h,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,c=l*d,p=h*u,v=h*d;t[0]=f+v*o,t[4]=p*o-c,t[8]=a*h,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=c*o-p,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,c=l*d,p=h*u,v=h*d;t[0]=f-v*o,t[4]=-a*d,t[8]=p+c*o,t[1]=c+p*o,t[5]=a*u,t[9]=v-f*o,t[2]=-a*h,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,c=a*d,p=o*u,v=o*d;t[0]=l*u,t[4]=p*h-c,t[8]=f*h+v,t[1]=l*d,t[5]=v*h+f,t[9]=c*h-p,t[2]=-h,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,c=a*h,p=o*l,v=o*h;t[0]=l*u,t[4]=v-f*d,t[8]=p*d+c,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-h*u,t[6]=c*d+p,t[10]=f-v*d}else if(e.order==="XZY"){const f=a*l,c=a*h,p=o*l,v=o*h;t[0]=l*u,t[4]=-d,t[8]=h*u,t[1]=f*d+v,t[5]=a*u,t[9]=c*d-p,t[2]=p*d-c,t[6]=o*u,t[10]=v*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mu,e,Su)}lookAt(e,t,n){const s=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),On.crossVectors(n,Zt),On.lengthSq()===0&&(Math.abs(n.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),On.crossVectors(n,Zt)),On.normalize(),Ps.crossVectors(Zt,On),s[0]=On.x,s[4]=Ps.x,s[8]=Zt.x,s[1]=On.y,s[5]=Ps.y,s[9]=Zt.y,s[2]=On.z,s[6]=Ps.z,s[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,i=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],u=n[1],d=n[5],f=n[9],c=n[13],p=n[2],v=n[6],m=n[10],g=n[14],T=n[3],M=n[7],x=n[11],w=n[15],y=s[0],_=s[4],b=s[8],S=s[12],E=s[1],A=s[5],U=s[9],I=s[13],F=s[2],k=s[6],O=s[10],Z=s[14],G=s[3],ie=s[7],re=s[11],te=s[15];return i[0]=a*y+o*E+l*F+h*G,i[4]=a*_+o*A+l*k+h*ie,i[8]=a*b+o*U+l*O+h*re,i[12]=a*S+o*I+l*Z+h*te,i[1]=u*y+d*E+f*F+c*G,i[5]=u*_+d*A+f*k+c*ie,i[9]=u*b+d*U+f*O+c*re,i[13]=u*S+d*I+f*Z+c*te,i[2]=p*y+v*E+m*F+g*G,i[6]=p*_+v*A+m*k+g*ie,i[10]=p*b+v*U+m*O+g*re,i[14]=p*S+v*I+m*Z+g*te,i[3]=T*y+M*E+x*F+w*G,i[7]=T*_+M*A+x*k+w*ie,i[11]=T*b+M*U+x*O+w*re,i[15]=T*S+M*I+x*Z+w*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],i=e[12],a=e[1],o=e[5],l=e[9],h=e[13],u=e[2],d=e[6],f=e[10],c=e[14],p=e[3],v=e[7],m=e[11],g=e[15];return p*(+i*l*d-s*h*d-i*o*f+n*h*f+s*o*c-n*l*c)+v*(+t*l*c-t*h*f+i*a*f-s*a*c+s*h*u-i*l*u)+m*(+t*h*d-t*o*c-i*a*d+n*a*c+i*o*u-n*h*u)+g*(-s*o*u-t*l*d+t*o*f+s*a*d-n*a*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],i=e[3],a=e[4],o=e[5],l=e[6],h=e[7],u=e[8],d=e[9],f=e[10],c=e[11],p=e[12],v=e[13],m=e[14],g=e[15],T=d*m*h-v*f*h+v*l*c-o*m*c-d*l*g+o*f*g,M=p*f*h-u*m*h-p*l*c+a*m*c+u*l*g-a*f*g,x=u*v*h-p*d*h+p*o*c-a*v*c-u*o*g+a*d*g,w=p*d*l-u*v*l-p*o*f+a*v*f+u*o*m-a*d*m,y=t*T+n*M+s*x+i*w;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const _=1/y;return e[0]=T*_,e[1]=(v*f*i-d*m*i-v*s*c+n*m*c+d*s*g-n*f*g)*_,e[2]=(o*m*i-v*l*i+v*s*h-n*m*h-o*s*g+n*l*g)*_,e[3]=(d*l*i-o*f*i-d*s*h+n*f*h+o*s*c-n*l*c)*_,e[4]=M*_,e[5]=(u*m*i-p*f*i+p*s*c-t*m*c-u*s*g+t*f*g)*_,e[6]=(p*l*i-a*m*i-p*s*h+t*m*h+a*s*g-t*l*g)*_,e[7]=(a*f*i-u*l*i+u*s*h-t*f*h-a*s*c+t*l*c)*_,e[8]=x*_,e[9]=(p*d*i-u*v*i-p*n*c+t*v*c+u*n*g-t*d*g)*_,e[10]=(a*v*i-p*o*i+p*n*h-t*v*h-a*n*g+t*o*g)*_,e[11]=(u*o*i-a*d*i-u*n*h+t*d*h+a*n*c-t*o*c)*_,e[12]=w*_,e[13]=(u*v*s-p*d*s+p*n*f-t*v*f-u*n*m+t*d*m)*_,e[14]=(p*o*s-a*v*s-p*n*l+t*v*l+a*n*m-t*o*m)*_,e[15]=(a*d*s-u*o*s+u*n*l-t*d*l-a*n*f+t*o*f)*_,this}scale(e){const t=this.elements,n=e.x,s=e.y,i=e.z;return t[0]*=n,t[4]*=s,t[8]*=i,t[1]*=n,t[5]*=s,t[9]*=i,t[2]*=n,t[6]*=s,t[10]*=i,t[3]*=n,t[7]*=s,t[11]*=i,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),i=1-n,a=e.x,o=e.y,l=e.z,h=i*a,u=i*o;return this.set(h*a+n,h*o-s*l,h*l+s*o,0,h*o+s*l,u*o+n,u*l-s*a,0,h*l-s*o,u*l+s*a,i*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,i,a){return this.set(1,n,i,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,i=t._x,a=t._y,o=t._z,l=t._w,h=i+i,u=a+a,d=o+o,f=i*h,c=i*u,p=i*d,v=a*u,m=a*d,g=o*d,T=l*h,M=l*u,x=l*d,w=n.x,y=n.y,_=n.z;return s[0]=(1-(v+g))*w,s[1]=(c+x)*w,s[2]=(p-M)*w,s[3]=0,s[4]=(c-x)*y,s[5]=(1-(f+g))*y,s[6]=(m+T)*y,s[7]=0,s[8]=(p+M)*_,s[9]=(m-T)*_,s[10]=(1-(f+v))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let i=xi.set(s[0],s[1],s[2]).length();const a=xi.set(s[4],s[5],s[6]).length(),o=xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(i=-i),e.x=s[12],e.y=s[13],e.z=s[14],un.copy(this);const h=1/i,u=1/a,d=1/o;return un.elements[0]*=h,un.elements[1]*=h,un.elements[2]*=h,un.elements[4]*=u,un.elements[5]*=u,un.elements[6]*=u,un.elements[8]*=d,un.elements[9]*=d,un.elements[10]*=d,t.setFromRotationMatrix(un),n.x=i,n.y=a,n.z=o,this}makePerspective(e,t,n,s,i,a,o=Pn){const l=this.elements,h=2*i/(t-e),u=2*i/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let c,p;if(o===Pn)c=-(a+i)/(a-i),p=-2*a*i/(a-i);else if(o===fr)c=-a/(a-i),p=-a*i/(a-i);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=c,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,i,a,o=Pn){const l=this.elements,h=1/(t-e),u=1/(n-s),d=1/(a-i),f=(t+e)*h,c=(n+s)*u;let p,v;if(o===Pn)p=(a+i)*d,v=-2*d;else if(o===fr)p=i*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-c,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const xi=new P,un=new Qe,Mu=new P(0,0,0),Su=new P(1,1,1),On=new P,Ps=new P,Zt=new P,qa=new Qe,Za=new gs;class yn{constructor(e=0,t=0,n=0,s=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,i=s[0],a=s[4],o=s[8],l=s[1],h=s[5],u=s[9],d=s[2],f=s[6],c=s[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,c),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,c),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,i),this._z=0);break;case"ZXY":this._x=Math.asin($e(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,c),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,i));break;case"ZYX":this._y=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,c),this._z=Math.atan2(l,i)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,i)):(this._x=0,this._y=Math.atan2(o,c));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-u,c),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Za.setFromEuler(this),this.setFromQuaternion(Za,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class xa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wu=0;const $a=new P,_i=new gs,Tn=new Qe,Ls=new P,Ki=new P,Eu=new P,Tu=new gs,Ka=new P(1,0,0),Ja=new P(0,1,0),ja=new P(0,0,1),Qa={type:"added"},bu={type:"removed"},yi={type:"childadded",child:null},Or={type:"childremoved",child:null};class Rt extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new P,t=new yn,n=new gs,s=new P(1,1,1);function i(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(i),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qe},normalMatrix:{value:new Ze}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.multiply(_i),this}rotateOnWorldAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.premultiply(_i),this}rotateX(e){return this.rotateOnAxis(Ka,e)}rotateY(e){return this.rotateOnAxis(Ja,e)}rotateZ(e){return this.rotateOnAxis(ja,e)}translateOnAxis(e,t){return $a.copy(e).applyQuaternion(this.quaternion),this.position.add($a.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ka,e)}translateY(e){return this.translateOnAxis(Ja,e)}translateZ(e){return this.translateOnAxis(ja,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ls.copy(e):Ls.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(Ki,Ls,this.up):Tn.lookAt(Ls,Ki,this.up),this.quaternion.setFromRotationMatrix(Tn),s&&(Tn.extractRotation(s.matrixWorld),_i.setFromRotationMatrix(Tn),this.quaternion.premultiply(_i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qa),yi.child=e,this.dispatchEvent(yi),yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bu),Or.child=e,this.dispatchEvent(Or),Or.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qa),yi.child=e,this.dispatchEvent(yi),yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let i=0,a=s.length;i<a;i++)s[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,e,Eu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,Tu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let i=0,a=s.length;i<a;i++)s[i].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function i(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=i(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){const d=l[h];i(e.shapes,d)}else i(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(i(e.materials,this.material[l]));s.material=o}else s.material=i(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(i(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),h=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),c=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),c.length>0&&(n.animations=c),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){const l=[];for(const h in o){const u=o[h];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Rt.DEFAULT_UP=new P(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new P,bn=new P,Br=new P,An=new P,Mi=new P,Si=new P,el=new P,zr=new P,kr=new P,Vr=new P,Hr=new mt,Gr=new mt,Wr=new mt;class on{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),fn.subVectors(e,t),s.cross(fn);const i=s.lengthSq();return i>0?s.multiplyScalar(1/Math.sqrt(i)):s.set(0,0,0)}static getBarycoord(e,t,n,s,i){fn.subVectors(s,t),bn.subVectors(n,t),Br.subVectors(e,t);const a=fn.dot(fn),o=fn.dot(bn),l=fn.dot(Br),h=bn.dot(bn),u=bn.dot(Br),d=a*h-o*o;if(d===0)return i.set(0,0,0),null;const f=1/d,c=(h*l-o*u)*f,p=(a*u-o*l)*f;return i.set(1-c-p,p,c)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(e,t,n,s,i,a,o,l){return this.getBarycoord(e,t,n,s,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(i,An.x),l.addScaledVector(a,An.y),l.addScaledVector(o,An.z),l)}static getInterpolatedAttribute(e,t,n,s,i,a){return Hr.setScalar(0),Gr.setScalar(0),Wr.setScalar(0),Hr.fromBufferAttribute(e,t),Gr.fromBufferAttribute(e,n),Wr.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Hr,i.x),a.addScaledVector(Gr,i.y),a.addScaledVector(Wr,i.z),a}static isFrontFacing(e,t,n,s){return fn.subVectors(n,t),bn.subVectors(e,t),fn.cross(bn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fn.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),fn.cross(bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,i){return on.getInterpolation(e,this.a,this.b,this.c,t,n,s,i)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,i=this.c;let a,o;Mi.subVectors(s,n),Si.subVectors(i,n),zr.subVectors(e,n);const l=Mi.dot(zr),h=Si.dot(zr);if(l<=0&&h<=0)return t.copy(n);kr.subVectors(e,s);const u=Mi.dot(kr),d=Si.dot(kr);if(u>=0&&d<=u)return t.copy(s);const f=l*d-u*h;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Mi,a);Vr.subVectors(e,i);const c=Mi.dot(Vr),p=Si.dot(Vr);if(p>=0&&c<=p)return t.copy(i);const v=c*h-l*p;if(v<=0&&h>=0&&p<=0)return o=h/(h-p),t.copy(n).addScaledVector(Si,o);const m=u*p-c*d;if(m<=0&&d-u>=0&&c-p>=0)return el.subVectors(i,s),o=(d-u)/(d-u+(c-p)),t.copy(s).addScaledVector(el,o);const g=1/(m+v+f);return a=v*g,o=f*g,t.copy(n).addScaledVector(Mi,a).addScaledVector(Si,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},Is={h:0,s:0,l:0};function Xr(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,lt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=lt.workingColorSpace){if(e=va(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{const i=n<=.5?n*(1+t):n+t-n*t,a=2*n-i;this.r=Xr(a,i,e+1/3),this.g=Xr(a,i,e),this.b=Xr(a,i,e-1/3)}return lt.toWorkingColorSpace(this,s),this}setStyle(e,t=Dt){function n(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let i;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const i=s[1],a=i.length;if(a===3)return this.setRGB(parseInt(i.charAt(0),16)/15,parseInt(i.charAt(1),16)/15,parseInt(i.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(i,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){const n=bc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ln(e.r),this.g=Ln(e.g),this.b=Ln(e.b),this}copyLinearToSRGB(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return lt.fromWorkingColorSpace(Bt.copy(this),e),Math.round($e(Bt.r*255,0,255))*65536+Math.round($e(Bt.g*255,0,255))*256+Math.round($e(Bt.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.fromWorkingColorSpace(Bt.copy(this),t);const n=Bt.r,s=Bt.g,i=Bt.b,a=Math.max(n,s,i),o=Math.min(n,s,i);let l,h;const u=(o+a)/2;if(o===a)l=0,h=0;else{const d=a-o;switch(h=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-i)/d+(s<i?6:0);break;case s:l=(i-n)/d+2;break;case i:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=h,e.l=u,e}getRGB(e,t=lt.workingColorSpace){return lt.fromWorkingColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=Dt){lt.fromWorkingColorSpace(Bt.copy(this),e);const t=Bt.r,n=Bt.g,s=Bt.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Bn),this.setHSL(Bn.h+e,Bn.s+t,Bn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bn),e.getHSL(Is);const n=os(Bn.h,Is.h,t),s=os(Bn.s,Is.s,t),i=os(Bn.l,Is.l,t);return this.setHSL(n,s,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*s,this.g=i[1]*t+i[4]*n+i[7]*s,this.b=i[2]*t+i[5]*n+i[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new je;je.NAMES=bc;let Au=0;class xs extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=Di,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mo,this.blendDst=So,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=Fi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Mo&&(n.blendSrc=this.blendSrc),this.blendDst!==So&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(i){const a=[];for(const o in i){const l=i[o];delete l.metadata,a.push(l)}return a}if(t){const i=s(e.textures),a=s(e.images);i.length>0&&(n.textures=i),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let i=0;i!==s;++i)n[i]=t[i].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Xt extends xs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new P,Ds=new ae;class Yt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ka,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,i=this.itemSize;s<i;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ds.fromBufferAttribute(this,t),Ds.applyMatrix3(e),this.setXY(t,Ds.x,Ds.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ri(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ri(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ri(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ri(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ri(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,i){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),s=Vt(s,this.array),i=Vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ka&&(e.usage=this.usage),e}}class Ac extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Cc extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ct extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Cu=0;const sn=new Qe,Yr=new Rt,wi=new P,$t=new Yn,Ji=new Yn,At=new P;class Nt extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sc(e)?Cc:Ac)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const i=new Ze().getNormalMatrix(e);n.applyNormalMatrix(i),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return sn.makeRotationFromQuaternion(e),this.applyMatrix4(sn),this}rotateX(e){return sn.makeRotationX(e),this.applyMatrix4(sn),this}rotateY(e){return sn.makeRotationY(e),this.applyMatrix4(sn),this}rotateZ(e){return sn.makeRotationZ(e),this.applyMatrix4(sn),this}translate(e,t,n){return sn.makeTranslation(e,t,n),this.applyMatrix4(sn),this}scale(e,t,n){return sn.makeScale(e,t,n),this.applyMatrix4(sn),this}lookAt(e){return Yr.lookAt(e),Yr.updateMatrix(),this.applyMatrix4(Yr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,i=e.length;s<i;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ct(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const i=e[s];t.setXYZ(s,i.x,i.y,i.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const i=t[n];$t.setFromBufferAttribute(i),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let i=0,a=t.length;i<a;i++){const o=t[i];Ji.setFromBufferAttribute(o),this.morphTargetsRelative?(At.addVectors($t.min,Ji.min),$t.expandByPoint(At),At.addVectors($t.max,Ji.max),$t.expandByPoint(At)):($t.expandByPoint(Ji.min),$t.expandByPoint(Ji.max))}$t.getCenter(n);let s=0;for(let i=0,a=e.count;i<a;i++)At.fromBufferAttribute(e,i),s=Math.max(s,n.distanceToSquared(At));if(t)for(let i=0,a=t.length;i<a;i++){const o=t[i],l=this.morphTargetsRelative;for(let h=0,u=o.count;h<u;h++)At.fromBufferAttribute(o,h),l&&(wi.fromBufferAttribute(e,h),At.add(wi)),s=Math.max(s,n.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,i=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let b=0;b<n.count;b++)o[b]=new P,l[b]=new P;const h=new P,u=new P,d=new P,f=new ae,c=new ae,p=new ae,v=new P,m=new P;function g(b,S,E){h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),d.fromBufferAttribute(n,E),f.fromBufferAttribute(i,b),c.fromBufferAttribute(i,S),p.fromBufferAttribute(i,E),u.sub(h),d.sub(h),c.sub(f),p.sub(f);const A=1/(c.x*p.y-p.x*c.y);isFinite(A)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(d,-c.y).multiplyScalar(A),m.copy(d).multiplyScalar(c.x).addScaledVector(u,-p.x).multiplyScalar(A),o[b].add(v),o[S].add(v),o[E].add(v),l[b].add(m),l[S].add(m),l[E].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let b=0,S=T.length;b<S;++b){const E=T[b],A=E.start,U=E.count;for(let I=A,F=A+U;I<F;I+=3)g(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const M=new P,x=new P,w=new P,y=new P;function _(b){w.fromBufferAttribute(s,b),y.copy(w);const S=o[b];M.copy(S),M.sub(w.multiplyScalar(w.dot(S))).normalize(),x.crossVectors(y,S);const A=x.dot(l[b])<0?-1:1;a.setXYZW(b,M.x,M.y,M.z,A)}for(let b=0,S=T.length;b<S;++b){const E=T[b],A=E.start,U=E.count;for(let I=A,F=A+U;I<F;I+=3)_(e.getX(I+0)),_(e.getX(I+1)),_(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,c=n.count;f<c;f++)n.setXYZ(f,0,0,0);const s=new P,i=new P,a=new P,o=new P,l=new P,h=new P,u=new P,d=new P;if(e)for(let f=0,c=e.count;f<c;f+=3){const p=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,p),i.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,i),d.subVectors(s,i),u.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,m),o.add(u),l.add(u),h.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,c=t.count;f<c;f+=3)s.fromBufferAttribute(t,f+0),i.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,i),d.subVectors(s,i),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(o,l){const h=o.array,u=o.itemSize,d=o.normalized,f=new h.constructor(l.length*u);let c=0,p=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?c=l[v]*o.data.stride+o.offset:c=l[v]*u;for(let g=0;g<u;g++)f[p++]=h[c++]}return new Yt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],h=e(l,n);t.setAttribute(o,h)}const i=this.morphAttributes;for(const o in i){const l=[],h=i[o];for(let u=0,d=h.length;u<d;u++){const f=h[u],c=e(f,n);l.push(c)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(e[h]=l[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const h=n[l];e.data.attributes[l]=h.toJSON(e.data)}const s={};let i=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],u=[];for(let d=0,f=h.length;d<f;d++){const c=h[d];u.push(c.toJSON(e.data))}u.length>0&&(s[l]=u,i=!0)}i&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const h in s){const u=s[h];this.setAttribute(h,u.clone(t))}const i=e.morphAttributes;for(const h in i){const u=[],d=i[h];for(let f=0,c=d.length;f<c;f++)u.push(d[f].clone(t));this.morphAttributes[h]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let h=0,u=a.length;h<u;h++){const d=a[h];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tl=new Qe,Jn=new Tc,Us=new vs,nl=new P,Ns=new P,Fs=new P,Os=new P,qr=new P,Bs=new P,il=new P,zs=new P;class Ne extends Rt{constructor(e=new Nt,t=new Xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,a=s.length;i<a;i++){const o=s[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=i}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(i&&o){Bs.set(0,0,0);for(let l=0,h=i.length;l<h;l++){const u=o[l],d=i[l];u!==0&&(qr.fromBufferAttribute(d,e),a?Bs.addScaledVector(qr,u):Bs.addScaledVector(qr.sub(t),u))}t.add(Bs)}return t}raycast(e,t){const n=this.geometry,s=this.material,i=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(i),Jn.copy(e.ray).recast(e.near),!(Us.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(Us,nl)===null||Jn.origin.distanceToSquared(nl)>(e.far-e.near)**2))&&(tl.copy(i).invert(),Jn.copy(e.ray).applyMatrix4(tl),!(n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Jn)))}_computeIntersections(e,t,n){let s;const i=this.geometry,a=this.material,o=i.index,l=i.attributes.position,h=i.attributes.uv,u=i.attributes.uv1,d=i.attributes.normal,f=i.groups,c=i.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=a[m.materialIndex],T=Math.max(m.start,c.start),M=Math.min(o.count,Math.min(m.start+m.count,c.start+c.count));for(let x=T,w=M;x<w;x+=3){const y=o.getX(x),_=o.getX(x+1),b=o.getX(x+2);s=ks(this,g,e,n,h,u,d,y,_,b),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const p=Math.max(0,c.start),v=Math.min(o.count,c.start+c.count);for(let m=p,g=v;m<g;m+=3){const T=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);s=ks(this,a,e,n,h,u,d,T,M,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=a[m.materialIndex],T=Math.max(m.start,c.start),M=Math.min(l.count,Math.min(m.start+m.count,c.start+c.count));for(let x=T,w=M;x<w;x+=3){const y=x,_=x+1,b=x+2;s=ks(this,g,e,n,h,u,d,y,_,b),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const p=Math.max(0,c.start),v=Math.min(l.count,c.start+c.count);for(let m=p,g=v;m<g;m+=3){const T=m,M=m+1,x=m+2;s=ks(this,a,e,n,h,u,d,T,M,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Ru(r,e,t,n,s,i,a,o){let l;if(e.side===Gt?l=n.intersectTriangle(a,i,s,!0,o):l=n.intersectTriangle(s,i,a,e.side===Wn,o),l===null)return null;zs.copy(o),zs.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(zs);return h<t.near||h>t.far?null:{distance:h,point:zs.clone(),object:r}}function ks(r,e,t,n,s,i,a,o,l,h){r.getVertexPosition(o,Ns),r.getVertexPosition(l,Fs),r.getVertexPosition(h,Os);const u=Ru(r,e,t,n,Ns,Fs,Os,il);if(u){const d=new P;on.getBarycoord(il,Ns,Fs,Os,d),s&&(u.uv=on.getInterpolatedAttribute(s,o,l,h,d,new ae)),i&&(u.uv1=on.getInterpolatedAttribute(i,o,l,h,d,new ae)),a&&(u.normal=on.getInterpolatedAttribute(a,o,l,h,d,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c:h,normal:new P,materialIndex:0};on.getNormal(Ns,Fs,Os,f.normal),u.face=f,u.barycoord=d}return u}class an extends Nt{constructor(e=1,t=1,n=1,s=1,i=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:i,depthSegments:a};const o=this;s=Math.floor(s),i=Math.floor(i),a=Math.floor(a);const l=[],h=[],u=[],d=[];let f=0,c=0;p("z","y","x",-1,-1,n,t,e,a,i,0),p("z","y","x",1,-1,n,t,-e,a,i,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,i,4),p("x","y","z",-1,-1,e,t,-n,s,i,5),this.setIndex(l),this.setAttribute("position",new ct(h,3)),this.setAttribute("normal",new ct(u,3)),this.setAttribute("uv",new ct(d,2));function p(v,m,g,T,M,x,w,y,_,b,S){const E=x/_,A=w/b,U=x/2,I=w/2,F=y/2,k=_+1,O=b+1;let Z=0,G=0;const ie=new P;for(let re=0;re<O;re++){const te=re*A-I;for(let Se=0;Se<k;Se++){const De=Se*E-U;ie[v]=De*T,ie[m]=te*M,ie[g]=F,h.push(ie.x,ie.y,ie.z),ie[v]=0,ie[m]=0,ie[g]=y>0?1:-1,u.push(ie.x,ie.y,ie.z),d.push(Se/_),d.push(1-re/b),Z+=1}}for(let re=0;re<b;re++)for(let te=0;te<_;te++){const Se=f+te+k*re,De=f+te+k*(re+1),N=f+(te+1)+k*(re+1),X=f+(te+1)+k*re;l.push(Se,De,X),l.push(De,N,X),G+=6}o.addGroup(c,G,S),c+=G,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new an(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const s=r[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Ht(r){const e={};for(let t=0;t<r.length;t++){const n=Hi(r[t]);for(const s in n)e[s]=n[s]}return e}function Pu(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Rc(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}const Lu={clone:Hi,merge:Ht};var Iu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Du=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends xs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Iu,this.fragmentShader=Du,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=Pu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Pc extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=Pn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new P,sl=new ae,rl=new ae;class Kt extends Pc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=us*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(rs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return us*2*Math.atan(Math.tan(rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zn.x,zn.y).multiplyScalar(-e/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-e/zn.z)}getViewSize(e,t){return this.getViewBounds(e,sl,rl),t.subVectors(rl,sl)}setViewOffset(e,t,n,s,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(rs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,i=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;i+=a.offsetX*s/l,t-=a.offsetY*n/h,s*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ei=-90,Ti=1;class Uu extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Kt(Ei,Ti,e,t);s.layers=this.layers,this.add(s);const i=new Kt(Ei,Ti,e,t);i.layers=this.layers,this.add(i);const a=new Kt(Ei,Ti,e,t);a.layers=this.layers,this.add(a);const o=new Kt(Ei,Ti,e,t);o.layers=this.layers,this.add(o);const l=new Kt(Ei,Ti,e,t);l.layers=this.layers,this.add(l);const h=new Kt(Ei,Ti,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,i,a,o,l]=t;for(const h of t)this.remove(h);if(e===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[i,a,o,l,h,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),c=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,i),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,h),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,f,c),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Lc extends zt{constructor(e,t,n,s,i,a,o,l,h,u){e=e!==void 0?e:[],t=t!==void 0?t:Oi,super(e,t,n,s,i,a,o,l,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Nu extends ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Lc(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:vn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new an(5,5,5),i=new Xn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Gt,blending:Vn});i.uniforms.tEquirect.value=t;const a=new Ne(s,i),o=t.minFilter;return t.minFilter===oi&&(t.minFilter=vn),new Uu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const i=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(i)}}class _a{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new je(e),this.density=t}clone(){return new _a(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ic extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Fu extends zt{constructor(e=null,t=1,n=1,s,i,a,o,l,h=Jt,u=Jt,d,f){super(null,a,o,l,h,u,s,i,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ol extends Yt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const bi=new Qe,al=new Qe,Vs=[],ll=new Yn,Ou=new Qe,ji=new Ne,Qi=new vs;class Bu extends Ne{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ol(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ou)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bi),ll.copy(e.boundingBox).applyMatrix4(bi),this.boundingBox.union(ll)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,bi),Qi.copy(e.boundingSphere).applyMatrix4(bi),this.boundingSphere.union(Qi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,i=n.length+1,a=e*i+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ji.geometry=this.geometry,ji.material=this.material,ji.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qi.copy(this.boundingSphere),Qi.applyMatrix4(n),e.ray.intersectsSphere(Qi)!==!1))for(let i=0;i<s;i++){this.getMatrixAt(i,bi),al.multiplyMatrices(n,bi),ji.matrixWorld=al,ji.raycast(e,Vs);for(let a=0,o=Vs.length;a<o;a++){const l=Vs[a];l.instanceId=i,l.object=this,t.push(l)}Vs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ol(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Fu(new Float32Array(s*this.count),s,this.count,da,xn));const i=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;i[l]=o,i.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Zr=new P,zu=new P,ku=new Ze;class pn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Zr.subVectors(n,t).cross(zu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Zr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const i=-(e.start.dot(this.normal)+this.constant)/s;return i<0||i>1?null:t.copy(e.start).addScaledVector(n,i)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ku.getNormalMatrix(e),s=this.coplanarPoint(Zr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new vs,Hs=new P;class ya{constructor(e=new pn,t=new pn,n=new pn,s=new pn,i=new pn,a=new pn){this.planes=[e,t,n,s,i,a]}set(e,t,n,s,i,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(i),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Pn){const n=this.planes,s=e.elements,i=s[0],a=s[1],o=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],c=s[8],p=s[9],v=s[10],m=s[11],g=s[12],T=s[13],M=s[14],x=s[15];if(n[0].setComponents(l-i,f-h,m-c,x-g).normalize(),n[1].setComponents(l+i,f+h,m+c,x+g).normalize(),n[2].setComponents(l+a,f+u,m+p,x+T).normalize(),n[3].setComponents(l-a,f-u,m-p,x-T).normalize(),n[4].setComponents(l-o,f-d,m-v,x-M).normalize(),t===Pn)n[5].setComponents(l+o,f+d,m+v,x+M).normalize();else if(t===fr)n[5].setComponents(o,d,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(e){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let i=0;i<6;i++)if(t[i].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Hs.x=s.normal.x>0?e.max.x:e.min.x,Hs.y=s.normal.y>0?e.max.y:e.min.y,Hs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Hs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class dt extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}class xr extends zt{constructor(e,t,n,s,i,a,o,l,h){super(e,t,n,s,i,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dc extends zt{constructor(e,t,n,s,i,a,o,l,h,u=Ui){if(u!==Ui&&u!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ui&&(n=li),n===void 0&&u===ki&&(n=zi),super(null,s,i,a,o,l,u,n,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Jt,this.minFilter=l!==void 0?l:Jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(s),t.push(i),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const i=n.length;let a;t?a=t:a=e*n[i-1];let o=0,l=i-1,h;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),h=n[s]-a,h<0)o=s+1;else if(h>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(i-1);const u=n[s],f=n[s+1]-u,c=(a-u)/f;return(s+c)/(i-1)}getTangent(e,t){let s=e-1e-4,i=e+1e-4;s<0&&(s=0),i>1&&(i=1);const a=this.getPoint(s),o=this.getPoint(i),l=t||(a.isVector2?new ae:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new P,s=[],i=[],a=[],o=new P,l=new Qe;for(let c=0;c<=e;c++){const p=c/e;s[c]=this.getTangentAt(p,new P)}i[0]=new P,a[0]=new P;let h=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=h&&(h=u,n.set(1,0,0)),d<=h&&(h=d,n.set(0,1,0)),f<=h&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),i[0].crossVectors(s[0],o),a[0].crossVectors(s[0],i[0]);for(let c=1;c<=e;c++){if(i[c]=i[c-1].clone(),a[c]=a[c-1].clone(),o.crossVectors(s[c-1],s[c]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos($e(s[c-1].dot(s[c]),-1,1));i[c].applyMatrix4(l.makeRotationAxis(o,p))}a[c].crossVectors(s[c],i[c])}if(t===!0){let c=Math.acos($e(i[0].dot(i[e]),-1,1));c/=e,s[0].dot(o.crossVectors(i[0],i[e]))>0&&(c=-c);for(let p=1;p<=e;p++)i[p].applyMatrix4(l.makeRotationAxis(s[p],c*p)),a[p].crossVectors(s[p],i[p])}return{tangents:s,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ma extends Mn{constructor(e=0,t=0,n=1,s=1,i=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ae){const n=t,s=Math.PI*2;let i=this.aEndAngle-this.aStartAngle;const a=Math.abs(i)<Number.EPSILON;for(;i<0;)i+=s;for(;i>s;)i-=s;i<Number.EPSILON&&(a?i=0:i=s),this.aClockwise===!0&&!a&&(i===s?i=-s:i=i-s);const o=this.aStartAngle+e*i;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,c=h-this.aY;l=f*u-c*d+this.aX,h=f*d+c*u+this.aY}return n.set(l,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Vu extends Ma{constructor(e,t,n,s,i,a){super(e,t,n,n,s,i,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Sa(){let r=0,e=0,t=0,n=0;function s(i,a,o,l){r=i,e=o,t=-3*i+3*a-2*o-l,n=2*i-2*a+o+l}return{initCatmullRom:function(i,a,o,l,h){s(a,o,h*(o-i),h*(l-a))},initNonuniformCatmullRom:function(i,a,o,l,h,u,d){let f=(a-i)/h-(o-i)/(h+u)+(o-a)/u,c=(o-a)/u-(l-a)/(u+d)+(l-o)/d;f*=u,c*=u,s(a,o,f,c)},calc:function(i){const a=i*i,o=a*i;return r+e*i+t*a+n*o}}}const Gs=new P,$r=new Sa,Kr=new Sa,Jr=new Sa;class wa extends Mn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new P){const n=t,s=this.points,i=s.length,a=(i-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:l===0&&o===i-1&&(o=i-2,l=1);let h,u;this.closed||o>0?h=s[(o-1)%i]:(Gs.subVectors(s[0],s[1]).add(s[0]),h=Gs);const d=s[o%i],f=s[(o+1)%i];if(this.closed||o+2<i?u=s[(o+2)%i]:(Gs.subVectors(s[i-1],s[i-2]).add(s[i-1]),u=Gs),this.curveType==="centripetal"||this.curveType==="chordal"){const c=this.curveType==="chordal"?.5:.25;let p=Math.pow(h.distanceToSquared(d),c),v=Math.pow(d.distanceToSquared(f),c),m=Math.pow(f.distanceToSquared(u),c);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),$r.initNonuniformCatmullRom(h.x,d.x,f.x,u.x,p,v,m),Kr.initNonuniformCatmullRom(h.y,d.y,f.y,u.y,p,v,m),Jr.initNonuniformCatmullRom(h.z,d.z,f.z,u.z,p,v,m)}else this.curveType==="catmullrom"&&($r.initCatmullRom(h.x,d.x,f.x,u.x,this.tension),Kr.initCatmullRom(h.y,d.y,f.y,u.y,this.tension),Jr.initCatmullRom(h.z,d.z,f.z,u.z,this.tension));return n.set($r.calc(l),Kr.calc(l),Jr.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function cl(r,e,t,n,s){const i=(n-e)*.5,a=(s-t)*.5,o=r*r,l=r*o;return(2*t-2*n+i+a)*l+(-3*t+3*n-2*i-a)*o+i*r+t}function Hu(r,e){const t=1-r;return t*t*e}function Gu(r,e){return 2*(1-r)*r*e}function Wu(r,e){return r*r*e}function as(r,e,t,n){return Hu(r,e)+Gu(r,t)+Wu(r,n)}function Xu(r,e){const t=1-r;return t*t*t*e}function Yu(r,e){const t=1-r;return 3*t*t*r*e}function qu(r,e){return 3*(1-r)*r*r*e}function Zu(r,e){return r*r*r*e}function ls(r,e,t,n,s){return Xu(r,e)+Yu(r,t)+qu(r,n)+Zu(r,s)}class Uc extends Mn{constructor(e=new ae,t=new ae,n=new ae,s=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ae){const n=t,s=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ls(e,s.x,i.x,a.x,o.x),ls(e,s.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class $u extends Mn{constructor(e=new P,t=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new P){const n=t,s=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ls(e,s.x,i.x,a.x,o.x),ls(e,s.y,i.y,a.y,o.y),ls(e,s.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Nc extends Mn{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ku extends Mn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fc extends Mn{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){const n=t,s=this.v0,i=this.v1,a=this.v2;return n.set(as(e,s.x,i.x,a.x),as(e,s.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Oc extends Mn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,s=this.v0,i=this.v1,a=this.v2;return n.set(as(e,s.x,i.x,a.x),as(e,s.y,i.y,a.y),as(e,s.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bc extends Mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){const n=t,s=this.points,i=(s.length-1)*e,a=Math.floor(i),o=i-a,l=s[a===0?a:a-1],h=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(cl(o,l.x,h.x,u.x,d.x),cl(o,l.y,h.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ae().fromArray(s))}return this}}var pr=Object.freeze({__proto__:null,ArcCurve:Vu,CatmullRomCurve3:wa,CubicBezierCurve:Uc,CubicBezierCurve3:$u,EllipseCurve:Ma,LineCurve:Nc,LineCurve3:Ku,QuadraticBezierCurve:Fc,QuadraticBezierCurve3:Oc,SplineCurve:Bc});class Ju extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new pr[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let i=0;for(;i<s.length;){if(s[i]>=n){const a=s[i]-n,o=this.curves[i],l=o.getLength(),h=l===0?0:1-a/l;return o.getPointAt(h,t)}i++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,i=this.curves;s<i.length;s++){const a=i[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let h=0;h<l.length;h++){const u=l[h];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new pr[s.type]().fromJSON(s))}return this}}class hl extends Ju{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Nc(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const i=new Fc(this.currentPoint.clone(),new ae(e,t),new ae(n,s));return this.curves.push(i),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,i,a){const o=new Uc(this.currentPoint.clone(),new ae(e,t),new ae(n,s),new ae(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Bc(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,i,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,i,a),this}absarc(e,t,n,s,i,a){return this.absellipse(e,t,n,n,s,i,a),this}ellipse(e,t,n,s,i,a,o,l){const h=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+h,t+u,n,s,i,a,o,l),this}absellipse(e,t,n,s,i,a,o,l){const h=new Ma(e,t,n,s,i,a,o,l);if(this.curves.length>0){const d=h.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(h);const u=h.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ea extends Nt{constructor(e=[new ae(0,-.5),new ae(.5,0),new ae(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=$e(s,0,Math.PI*2);const i=[],a=[],o=[],l=[],h=[],u=1/t,d=new P,f=new ae,c=new P,p=new P,v=new P;let m=0,g=0;for(let T=0;T<=e.length-1;T++)switch(T){case 0:m=e[T+1].x-e[T].x,g=e[T+1].y-e[T].y,c.x=g*1,c.y=-m,c.z=g*0,v.copy(c),c.normalize(),l.push(c.x,c.y,c.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:m=e[T+1].x-e[T].x,g=e[T+1].y-e[T].y,c.x=g*1,c.y=-m,c.z=g*0,p.copy(c),c.x+=v.x,c.y+=v.y,c.z+=v.z,c.normalize(),l.push(c.x,c.y,c.z),v.copy(p)}for(let T=0;T<=t;T++){const M=n+T*u*s,x=Math.sin(M),w=Math.cos(M);for(let y=0;y<=e.length-1;y++){d.x=e[y].x*x,d.y=e[y].y,d.z=e[y].x*w,a.push(d.x,d.y,d.z),f.x=T/t,f.y=y/(e.length-1),o.push(f.x,f.y);const _=l[3*y+0]*x,b=l[3*y+1],S=l[3*y+0]*w;h.push(_,b,S)}}for(let T=0;T<t;T++)for(let M=0;M<e.length-1;M++){const x=M+T*e.length,w=x,y=x+e.length,_=x+e.length+1,b=x+1;i.push(w,y,b),i.push(_,b,y)}this.setIndex(i),this.setAttribute("position",new ct(a,3)),this.setAttribute("uv",new ct(o,2)),this.setAttribute("normal",new ct(h,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ea(e.points,e.segments,e.phiStart,e.phiLength)}}class _n extends Nt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const i=[],a=[],o=[],l=[],h=new P,u=new ae;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const c=n+d/t*s;h.x=e*Math.cos(c),h.y=e*Math.sin(c),a.push(h.x,h.y,h.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)i.push(d,d+1,0);this.setIndex(i),this.setAttribute("position",new ct(a,3)),this.setAttribute("normal",new ct(o,3)),this.setAttribute("uv",new ct(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _n(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class nt extends Nt{constructor(e=1,t=1,n=1,s=32,i=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:l};const h=this;s=Math.floor(s),i=Math.floor(i);const u=[],d=[],f=[],c=[];let p=0;const v=[],m=n/2;let g=0;T(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new ct(d,3)),this.setAttribute("normal",new ct(f,3)),this.setAttribute("uv",new ct(c,2));function T(){const x=new P,w=new P;let y=0;const _=(t-e)/n;for(let b=0;b<=i;b++){const S=[],E=b/i,A=E*(t-e)+e;for(let U=0;U<=s;U++){const I=U/s,F=I*l+o,k=Math.sin(F),O=Math.cos(F);w.x=A*k,w.y=-E*n+m,w.z=A*O,d.push(w.x,w.y,w.z),x.set(k,_,O).normalize(),f.push(x.x,x.y,x.z),c.push(I,1-E),S.push(p++)}v.push(S)}for(let b=0;b<s;b++)for(let S=0;S<i;S++){const E=v[S][b],A=v[S+1][b],U=v[S+1][b+1],I=v[S][b+1];(e>0||S!==0)&&(u.push(E,A,I),y+=3),(t>0||S!==i-1)&&(u.push(A,U,I),y+=3)}h.addGroup(g,y,0),g+=y}function M(x){const w=p,y=new ae,_=new P;let b=0;const S=x===!0?e:t,E=x===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,m*E,0),f.push(0,E,0),c.push(.5,.5),p++;const A=p;for(let U=0;U<=s;U++){const F=U/s*l+o,k=Math.cos(F),O=Math.sin(F);_.x=S*O,_.y=m*E,_.z=S*k,d.push(_.x,_.y,_.z),f.push(0,E,0),y.x=k*.5+.5,y.y=O*.5*E+.5,c.push(y.x,y.y),p++}for(let U=0;U<s;U++){const I=w+U,F=A+U;x===!0?u.push(F,F+1,I):u.push(F+1,F,I),b+=3}h.addGroup(g,b,x===!0?1:2),g+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _r extends nt{constructor(e=1,t=1,n=32,s=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,i,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(e){return new _r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _s extends hl{constructor(e){super(e),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new hl().fromJSON(s))}return this}}const ju={triangulate:function(r,e,t=2){const n=e&&e.length,s=n?e[0]*t:r.length;let i=zc(r,0,s,t,!0);const a=[];if(!i||i.next===i.prev)return a;let o,l,h,u,d,f,c;if(n&&(i=sf(r,e,i,t)),r.length>80*t){o=h=r[0],l=u=r[1];for(let p=t;p<s;p+=t)d=r[p],f=r[p+1],d<o&&(o=d),f<l&&(l=f),d>h&&(h=d),f>u&&(u=f);c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return fs(i,a,t,o,l,c,0),a}};function zc(r,e,t,n,s){let i,a;if(s===mf(r,e,t,n)>0)for(i=e;i<t;i+=n)a=ul(i,r[i],r[i+1],a);else for(i=t-n;i>=e;i-=n)a=ul(i,r[i],r[i+1],a);return a&&yr(a,a.next)&&(ps(a),a=a.next),a}function hi(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(yr(t,t.next)||_t(t.prev,t,t.next)===0)){if(ps(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function fs(r,e,t,n,s,i,a){if(!r)return;!a&&i&&cf(r,n,s,i);let o=r,l,h;for(;r.prev!==r.next;){if(l=r.prev,h=r.next,i?ef(r,n,s,i):Qu(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(h.i/t|0),ps(r),r=h.next,o=h.next;continue}if(r=h,r===o){a?a===1?(r=tf(hi(r),e,t),fs(r,e,t,n,s,i,2)):a===2&&nf(r,e,t,n,s,i):fs(hi(r),e,t,n,s,i,1);break}}}function Qu(r){const e=r.prev,t=r,n=r.next;if(_t(e,t,n)>=0)return!1;const s=e.x,i=t.x,a=n.x,o=e.y,l=t.y,h=n.y,u=s<i?s<a?s:a:i<a?i:a,d=o<l?o<h?o:h:l<h?l:h,f=s>i?s>a?s:a:i>a?i:a,c=o>l?o>h?o:h:l>h?l:h;let p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=d&&p.y<=c&&Li(s,o,i,l,a,h,p.x,p.y)&&_t(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function ef(r,e,t,n){const s=r.prev,i=r,a=r.next;if(_t(s,i,a)>=0)return!1;const o=s.x,l=i.x,h=a.x,u=s.y,d=i.y,f=a.y,c=o<l?o<h?o:h:l<h?l:h,p=u<d?u<f?u:f:d<f?d:f,v=o>l?o>h?o:h:l>h?l:h,m=u>d?u>f?u:f:d>f?d:f,g=ra(c,p,e,t,n),T=ra(v,m,e,t,n);let M=r.prevZ,x=r.nextZ;for(;M&&M.z>=g&&x&&x.z<=T;){if(M.x>=c&&M.x<=v&&M.y>=p&&M.y<=m&&M!==s&&M!==a&&Li(o,u,l,d,h,f,M.x,M.y)&&_t(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=c&&x.x<=v&&x.y>=p&&x.y<=m&&x!==s&&x!==a&&Li(o,u,l,d,h,f,x.x,x.y)&&_t(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=g;){if(M.x>=c&&M.x<=v&&M.y>=p&&M.y<=m&&M!==s&&M!==a&&Li(o,u,l,d,h,f,M.x,M.y)&&_t(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=T;){if(x.x>=c&&x.x<=v&&x.y>=p&&x.y<=m&&x!==s&&x!==a&&Li(o,u,l,d,h,f,x.x,x.y)&&_t(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function tf(r,e,t){let n=r;do{const s=n.prev,i=n.next.next;!yr(s,i)&&kc(s,n,n.next,i)&&ds(s,i)&&ds(i,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(i.i/t|0),ps(n),ps(n.next),n=r=i),n=n.next}while(n!==r);return hi(n)}function nf(r,e,t,n,s,i){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ff(a,o)){let l=Vc(a,o);a=hi(a,a.next),l=hi(l,l.next),fs(a,e,t,n,s,i,0),fs(l,e,t,n,s,i,0);return}o=o.next}a=a.next}while(a!==r)}function sf(r,e,t,n){const s=[];let i,a,o,l,h;for(i=0,a=e.length;i<a;i++)o=e[i]*n,l=i<a-1?e[i+1]*n:r.length,h=zc(r,o,l,n,!1),h===h.next&&(h.steiner=!0),s.push(uf(h));for(s.sort(rf),i=0;i<s.length;i++)t=of(s[i],t);return t}function rf(r,e){return r.x-e.x}function of(r,e){const t=af(r,e);if(!t)return e;const n=Vc(t,r);return hi(n,n.next),hi(t,t.next)}function af(r,e){let t=e,n=-1/0,s;const i=r.x,a=r.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const f=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>n&&(n=f,s=t.x<t.next.x?t:t.next,f===i))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,l=s.x,h=s.y;let u=1/0,d;t=s;do i>=t.x&&t.x>=l&&i!==t.x&&Li(a<h?i:n,a,l,h,a<h?n:i,a,t.x,t.y)&&(d=Math.abs(a-t.y)/(i-t.x),ds(t,r)&&(d<u||d===u&&(t.x>s.x||t.x===s.x&&lf(s,t)))&&(s=t,u=d)),t=t.next;while(t!==o);return s}function lf(r,e){return _t(r.prev,r,e.prev)<0&&_t(e.next,r,r.next)<0}function cf(r,e,t,n){let s=r;do s.z===0&&(s.z=ra(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==r);s.prevZ.nextZ=null,s.prevZ=null,hf(s)}function hf(r){let e,t,n,s,i,a,o,l,h=1;do{for(t=r,r=null,i=null,a=0;t;){for(a++,n=t,o=0,e=0;e<h&&(o++,n=n.nextZ,!!n);e++);for(l=h;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,o--):(s=n,n=n.nextZ,l--),i?i.nextZ=s:r=s,s.prevZ=i,i=s;t=n}i.nextZ=null,h*=2}while(a>1);return r}function ra(r,e,t,n,s){return r=(r-t)*s|0,e=(e-n)*s|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function uf(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Li(r,e,t,n,s,i,a,o){return(s-a)*(e-o)>=(r-a)*(i-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(i-o)>=(s-a)*(n-o)}function ff(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!df(r,e)&&(ds(r,e)&&ds(e,r)&&pf(r,e)&&(_t(r.prev,r,e.prev)||_t(r,e.prev,e))||yr(r,e)&&_t(r.prev,r,r.next)>0&&_t(e.prev,e,e.next)>0)}function _t(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function yr(r,e){return r.x===e.x&&r.y===e.y}function kc(r,e,t,n){const s=Xs(_t(r,e,t)),i=Xs(_t(r,e,n)),a=Xs(_t(t,n,r)),o=Xs(_t(t,n,e));return!!(s!==i&&a!==o||s===0&&Ws(r,t,e)||i===0&&Ws(r,n,e)||a===0&&Ws(t,r,n)||o===0&&Ws(t,e,n))}function Ws(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Xs(r){return r>0?1:r<0?-1:0}function df(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&kc(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function ds(r,e){return _t(r.prev,r,r.next)<0?_t(r,e,r.next)>=0&&_t(r,r.prev,e)>=0:_t(r,e,r.prev)<0||_t(r,r.next,e)<0}function pf(r,e){let t=r,n=!1;const s=(r.x+e.x)/2,i=(r.y+e.y)/2;do t.y>i!=t.next.y>i&&t.next.y!==t.y&&s<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Vc(r,e){const t=new oa(r.i,r.x,r.y),n=new oa(e.i,e.x,e.y),s=r.next,i=e.prev;return r.next=e,e.prev=r,t.next=s,s.prev=t,n.next=t,t.prev=n,i.next=n,n.prev=i,n}function ul(r,e,t,n){const s=new oa(r,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ps(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function oa(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function mf(r,e,t,n){let s=0;for(let i=e,a=t-n;i<t;i+=n)s+=(r[a]-r[i])*(r[i+1]+r[a+1]),a=i;return s}class cs{static area(e){const t=e.length;let n=0;for(let s=t-1,i=0;i<t;s=i++)n+=e[s].x*e[i].y-e[i].x*e[s].y;return n*.5}static isClockWise(e){return cs.area(e)<0}static triangulateShape(e,t){const n=[],s=[],i=[];fl(e),dl(n,e);let a=e.length;t.forEach(fl);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,dl(n,t[l]);const o=ju.triangulate(n,s);for(let l=0;l<o.length;l+=3)i.push(o.slice(l,l+3));return i}}function fl(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function dl(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class Xi extends Nt{constructor(e=new _s([new ae(.5,.5),new ae(-.5,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],i=[];for(let o=0,l=e.length;o<l;o++){const h=e[o];a(h)}this.setAttribute("position",new ct(s,3)),this.setAttribute("uv",new ct(i,2)),this.computeVertexNormals();function a(o){const l=[],h=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,c=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:c-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:gf;let M,x=!1,w,y,_,b;g&&(M=g.getSpacedPoints(u),x=!0,f=!1,w=g.computeFrenetFrames(u,!1),y=new P,_=new P,b=new P),f||(m=0,c=0,p=0,v=0);const S=o.extractPoints(h);let E=S.shape;const A=S.holes;if(!cs.isClockWise(E)){E=E.reverse();for(let Q=0,le=A.length;Q<le;Q++){const D=A[Q];cs.isClockWise(D)&&(A[Q]=D.reverse())}}const I=cs.triangulateShape(E,A),F=E;for(let Q=0,le=A.length;Q<le;Q++){const D=A[Q];E=E.concat(D)}function k(Q,le,D){return le||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(le,D)}const O=E.length,Z=I.length;function G(Q,le,D){let Ue,ce,Ee;const fe=Q.x-le.x,ke=Q.y-le.y,ye=D.x-Q.x,L=D.y-Q.y,C=fe*fe+ke*ke,W=fe*L-ke*ye;if(Math.abs(W)>Number.EPSILON){const J=Math.sqrt(C),se=Math.sqrt(ye*ye+L*L),j=le.x-ke/J,Ie=le.y+fe/J,ge=D.x-L/se,we=D.y+ye/se,tt=((ge-j)*L-(we-Ie)*ye)/(fe*L-ke*ye);Ue=j+fe*tt-Q.x,ce=Ie+ke*tt-Q.y;const ue=Ue*Ue+ce*ce;if(ue<=2)return new ae(Ue,ce);Ee=Math.sqrt(ue/2)}else{let J=!1;fe>Number.EPSILON?ye>Number.EPSILON&&(J=!0):fe<-Number.EPSILON?ye<-Number.EPSILON&&(J=!0):Math.sign(ke)===Math.sign(L)&&(J=!0),J?(Ue=-ke,ce=fe,Ee=Math.sqrt(C)):(Ue=fe,ce=ke,Ee=Math.sqrt(C/2))}return new ae(Ue/Ee,ce/Ee)}const ie=[];for(let Q=0,le=F.length,D=le-1,Ue=Q+1;Q<le;Q++,D++,Ue++)D===le&&(D=0),Ue===le&&(Ue=0),ie[Q]=G(F[Q],F[D],F[Ue]);const re=[];let te,Se=ie.concat();for(let Q=0,le=A.length;Q<le;Q++){const D=A[Q];te=[];for(let Ue=0,ce=D.length,Ee=ce-1,fe=Ue+1;Ue<ce;Ue++,Ee++,fe++)Ee===ce&&(Ee=0),fe===ce&&(fe=0),te[Ue]=G(D[Ue],D[Ee],D[fe]);re.push(te),Se=Se.concat(te)}for(let Q=0;Q<m;Q++){const le=Q/m,D=c*Math.cos(le*Math.PI/2),Ue=p*Math.sin(le*Math.PI/2)+v;for(let ce=0,Ee=F.length;ce<Ee;ce++){const fe=k(F[ce],ie[ce],Ue);K(fe.x,fe.y,-D)}for(let ce=0,Ee=A.length;ce<Ee;ce++){const fe=A[ce];te=re[ce];for(let ke=0,ye=fe.length;ke<ye;ke++){const L=k(fe[ke],te[ke],Ue);K(L.x,L.y,-D)}}}const De=p+v;for(let Q=0;Q<O;Q++){const le=f?k(E[Q],Se[Q],De):E[Q];x?(_.copy(w.normals[0]).multiplyScalar(le.x),y.copy(w.binormals[0]).multiplyScalar(le.y),b.copy(M[0]).add(_).add(y),K(b.x,b.y,b.z)):K(le.x,le.y,0)}for(let Q=1;Q<=u;Q++)for(let le=0;le<O;le++){const D=f?k(E[le],Se[le],De):E[le];x?(_.copy(w.normals[Q]).multiplyScalar(D.x),y.copy(w.binormals[Q]).multiplyScalar(D.y),b.copy(M[Q]).add(_).add(y),K(b.x,b.y,b.z)):K(D.x,D.y,d/u*Q)}for(let Q=m-1;Q>=0;Q--){const le=Q/m,D=c*Math.cos(le*Math.PI/2),Ue=p*Math.sin(le*Math.PI/2)+v;for(let ce=0,Ee=F.length;ce<Ee;ce++){const fe=k(F[ce],ie[ce],Ue);K(fe.x,fe.y,d+D)}for(let ce=0,Ee=A.length;ce<Ee;ce++){const fe=A[ce];te=re[ce];for(let ke=0,ye=fe.length;ke<ye;ke++){const L=k(fe[ke],te[ke],Ue);x?K(L.x,L.y+M[u-1].y,M[u-1].x+D):K(L.x,L.y,d+D)}}}N(),X();function N(){const Q=s.length/3;if(f){let le=0,D=O*le;for(let Ue=0;Ue<Z;Ue++){const ce=I[Ue];de(ce[2]+D,ce[1]+D,ce[0]+D)}le=u+m*2,D=O*le;for(let Ue=0;Ue<Z;Ue++){const ce=I[Ue];de(ce[0]+D,ce[1]+D,ce[2]+D)}}else{for(let le=0;le<Z;le++){const D=I[le];de(D[2],D[1],D[0])}for(let le=0;le<Z;le++){const D=I[le];de(D[0]+O*u,D[1]+O*u,D[2]+O*u)}}n.addGroup(Q,s.length/3-Q,0)}function X(){const Q=s.length/3;let le=0;ee(F,le),le+=F.length;for(let D=0,Ue=A.length;D<Ue;D++){const ce=A[D];ee(ce,le),le+=ce.length}n.addGroup(Q,s.length/3-Q,1)}function ee(Q,le){let D=Q.length;for(;--D>=0;){const Ue=D;let ce=D-1;ce<0&&(ce=Q.length-1);for(let Ee=0,fe=u+m*2;Ee<fe;Ee++){const ke=O*Ee,ye=O*(Ee+1),L=le+Ue+ke,C=le+ce+ke,W=le+ce+ye,J=le+Ue+ye;Le(L,C,W,J)}}}function K(Q,le,D){l.push(Q),l.push(le),l.push(D)}function de(Q,le,D){be(Q),be(le),be(D);const Ue=s.length/3,ce=T.generateTopUV(n,s,Ue-3,Ue-2,Ue-1);We(ce[0]),We(ce[1]),We(ce[2])}function Le(Q,le,D,Ue){be(Q),be(le),be(Ue),be(le),be(D),be(Ue);const ce=s.length/3,Ee=T.generateSideWallUV(n,s,ce-6,ce-3,ce-2,ce-1);We(Ee[0]),We(Ee[1]),We(Ee[3]),We(Ee[1]),We(Ee[2]),We(Ee[3])}function be(Q){s.push(l[Q*3+0]),s.push(l[Q*3+1]),s.push(l[Q*3+2])}function We(Q){i.push(Q.x),i.push(Q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return vf(t,n,e)}static fromJSON(e,t){const n=[];for(let i=0,a=e.shapes.length;i<a;i++){const o=t[e.shapes[i]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new pr[s.type]().fromJSON(s)),new Xi(n,e.options)}}const gf={generateTopUV:function(r,e,t,n,s){const i=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],h=e[s*3],u=e[s*3+1];return[new ae(i,a),new ae(o,l),new ae(h,u)]},generateSideWallUV:function(r,e,t,n,s,i){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],h=e[n*3],u=e[n*3+1],d=e[n*3+2],f=e[s*3],c=e[s*3+1],p=e[s*3+2],v=e[i*3],m=e[i*3+1],g=e[i*3+2];return Math.abs(o-u)<Math.abs(a-h)?[new ae(a,1-l),new ae(h,1-d),new ae(f,1-p),new ae(v,1-g)]:[new ae(o,1-l),new ae(u,1-d),new ae(c,1-p),new ae(m,1-g)]}};function vf(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,s=r.length;n<s;n++){const i=r[n];t.shapes.push(i.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class vt extends Nt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const i=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),h=o+1,u=l+1,d=e/o,f=t/l,c=[],p=[],v=[],m=[];for(let g=0;g<u;g++){const T=g*f-a;for(let M=0;M<h;M++){const x=M*d-i;p.push(x,-T,0),v.push(0,0,1),m.push(M/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let T=0;T<o;T++){const M=T+h*g,x=T+h*(g+1),w=T+1+h*(g+1),y=T+1+h*g;c.push(M,x,y),c.push(x,w,y)}this.setIndex(c),this.setAttribute("position",new ct(p,3)),this.setAttribute("normal",new ct(v,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vt(e.width,e.height,e.widthSegments,e.heightSegments)}}class Mr extends Nt{constructor(e=.5,t=1,n=32,s=1,i=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:i,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],h=[],u=[];let d=e;const f=(t-e)/s,c=new P,p=new ae;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const g=i+m/n*a;c.x=d*Math.cos(g),c.y=d*Math.sin(g),l.push(c.x,c.y,c.z),h.push(0,0,1),p.x=(c.x/t+1)/2,p.y=(c.y/t+1)/2,u.push(p.x,p.y)}d+=f}for(let v=0;v<s;v++){const m=v*(n+1);for(let g=0;g<n;g++){const T=g+m,M=T,x=T+n+1,w=T+n+2,y=T+1;o.push(M,x,y),o.push(x,w,y)}}this.setIndex(o),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Et extends Nt{constructor(e=1,t=32,n=16,s=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let h=0;const u=[],d=new P,f=new P,c=[],p=[],v=[],m=[];for(let g=0;g<=n;g++){const T=[],M=g/n;let x=0;g===0&&a===0?x=.5/t:g===n&&l===Math.PI&&(x=-.5/t);for(let w=0;w<=t;w++){const y=w/t;d.x=-e*Math.cos(s+y*i)*Math.sin(a+M*o),d.y=e*Math.cos(a+M*o),d.z=e*Math.sin(s+y*i)*Math.sin(a+M*o),p.push(d.x,d.y,d.z),f.copy(d).normalize(),v.push(f.x,f.y,f.z),m.push(y+x,1-M),T.push(h++)}u.push(T)}for(let g=0;g<n;g++)for(let T=0;T<t;T++){const M=u[g][T+1],x=u[g][T],w=u[g+1][T],y=u[g+1][T+1];(g!==0||a>0)&&c.push(M,x,y),(g!==n-1||l<Math.PI)&&c.push(x,w,y)}this.setIndex(c),this.setAttribute("position",new ct(p,3)),this.setAttribute("normal",new ct(v,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Et(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Gn extends Nt{constructor(e=1,t=.4,n=12,s=48,i=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:i},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],h=[],u=new P,d=new P,f=new P;for(let c=0;c<=n;c++)for(let p=0;p<=s;p++){const v=p/s*i,m=c/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(v),d.y=(e+t*Math.cos(m))*Math.sin(v),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),h.push(p/s),h.push(c/n)}for(let c=1;c<=n;c++)for(let p=1;p<=s;p++){const v=(s+1)*c+p-1,m=(s+1)*(c-1)+p-1,g=(s+1)*(c-1)+p,T=(s+1)*c+p;a.push(v,m,T),a.push(m,g,T)}this.setIndex(a),this.setAttribute("position",new ct(o,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Sr extends Nt{constructor(e=new Oc(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,s=8,i=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:i};const a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,l=new P,h=new ae;let u=new P;const d=[],f=[],c=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new ct(d,3)),this.setAttribute("normal",new ct(f,3)),this.setAttribute("uv",new ct(c,2));function v(){for(let M=0;M<t;M++)m(M);m(i===!1?t:0),T(),g()}function m(M){u=e.getPointAt(M/t,u);const x=a.normals[M],w=a.binormals[M];for(let y=0;y<=s;y++){const _=y/s*Math.PI*2,b=Math.sin(_),S=-Math.cos(_);l.x=S*x.x+b*w.x,l.y=S*x.y+b*w.y,l.z=S*x.z+b*w.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,d.push(o.x,o.y,o.z)}}function g(){for(let M=1;M<=t;M++)for(let x=1;x<=s;x++){const w=(s+1)*(M-1)+(x-1),y=(s+1)*M+(x-1),_=(s+1)*M+x,b=(s+1)*(M-1)+x;p.push(w,y,b),p.push(y,_,b)}}function T(){for(let M=0;M<=t;M++)for(let x=0;x<=s;x++)h.x=M/t,h.y=x/s,c.push(h.x,h.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Sr(new pr[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class at extends xs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yc,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hc extends at{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return $e(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class xf extends xs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _f extends xs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ta extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class yf extends Ta{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const jr=new Qe,pl=new P,ml=new P;class Gc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ya,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;pl.setFromMatrixPosition(e.matrixWorld),t.position.copy(pl),ml.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ml),t.updateMatrixWorld(),jr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const gl=new Qe,es=new P,Qr=new P;class Mf extends Gc{constructor(){super(new Kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ae(4,2),this._viewportCount=6,this._viewports=[new mt(2,1,1,1),new mt(0,1,1,1),new mt(3,1,1,1),new mt(1,1,1,1),new mt(3,0,1,1),new mt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,i=e.distance||n.far;i!==n.far&&(n.far=i,n.updateProjectionMatrix()),es.setFromMatrixPosition(e.matrixWorld),n.position.copy(es),Qr.copy(n.position),Qr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Qr),n.updateMatrixWorld(),s.makeTranslation(-es.x,-es.y,-es.z),gl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gl)}}class mr extends Ta{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Mf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Wc extends Pc{constructor(e=-1,t=1,n=1,s=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let i=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=h*this.view.offsetX,a=i+h*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Sf extends Gc{constructor(){super(new Wc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class eo extends Ta{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Sf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class wf extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ef{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=vl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=vl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function vl(){return performance.now()}const xl=new Qe;let Tf=class{constructor(e,t,n=0,s=1/0){this.ray=new Tc(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new xa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return xl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xl),this}intersectObject(e,t=!0,n=[]){return aa(e,this,n,t),n.sort(_l),n}intersectObjects(e,t=!0,n=[]){for(let s=0,i=e.length;s<i;s++)aa(e[s],this,n,t);return n.sort(_l),n}};function _l(r,e){return r.distance-e.distance}function aa(r,e,t,n){let s=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const i=r.children;for(let a=0,o=i.length;a<o;a++)aa(i[a],e,t,!0)}}const yl=new P,Ys=new P;class Xc{constructor(e=new P,t=new P){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){yl.subVectors(e,this.start),Ys.subVectors(this.end,this.start);const n=Ys.dot(Ys);let i=Ys.dot(yl)/n;return t&&(i=$e(i,0,1)),i}closestPointToPoint(e,t,n){const s=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Ml(r,e,t,n){const s=bf(n);switch(t){case pc:return r*e;case gc:return r*e;case vc:return r*e*2;case da:return r*e/s.components*s.byteLength;case pa:return r*e/s.components*s.byteLength;case xc:return r*e*2/s.components*s.byteLength;case ma:return r*e*2/s.components*s.byteLength;case mc:return r*e*3/s.components*s.byteLength;case mn:return r*e*4/s.components*s.byteLength;case ga:return r*e*4/s.components*s.byteLength;case nr:case ir:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case sr:case rr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Uo:case Fo:return Math.max(r,16)*Math.max(e,8)/4;case Do:case No:return Math.max(r,8)*Math.max(e,8)/2;case Oo:case Bo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case zo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ko:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Vo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Ho:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Go:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Xo:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Yo:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case qo:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Zo:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case $o:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Ko:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Jo:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case jo:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Qo:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case or:case ea:case ta:return Math.ceil(r/4)*Math.ceil(e/4)*16;case _c:case na:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ia:case sa:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function bf(r){switch(r){case Dn:case uc:return{byteLength:1,components:1};case hs:case fc:case ms:return{byteLength:2,components:1};case ua:case fa:return{byteLength:2,components:4};case li:case ha:case xn:return{byteLength:4,components:1};case dc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gr);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yc(){let r=null,e=!1,t=null,n=null;function s(i,a){t(i,a),n=r.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(s),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(i){t=i},setContext:function(i){r=i}}}function Af(r){const e=new WeakMap;function t(o,l){const h=o.array,u=o.usage,d=h.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,h,u),o.onUploadCallback();let c;if(h instanceof Float32Array)c=r.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?c=r.HALF_FLOAT:c=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)c=r.SHORT;else if(h instanceof Uint32Array)c=r.UNSIGNED_INT;else if(h instanceof Int32Array)c=r.INT;else if(h instanceof Int8Array)c=r.BYTE;else if(h instanceof Uint8Array)c=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)c=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:c,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,h){const u=l.array,d=l.updateRanges;if(r.bindBuffer(h,o),d.length===0)r.bufferSubData(h,0,u);else{d.sort((c,p)=>c.start-p.start);let f=0;for(let c=1;c<d.length;c++){const p=d[f],v=d[c];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,d[f]=v)}d.length=f+1;for(let c=0,p=d.length;c<p;c++){const v=d[c];r.bufferSubData(h,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function i(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=e.get(o);if(h===void 0)e.set(o,t(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:s,remove:i,update:a}}var Cf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Pf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,If=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Df=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Uf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Nf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ff=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Of=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$f=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Jf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Qf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ed=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,td=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,id=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sd="gl_FragColor = linearToOutputTexel( gl_FragColor );",rd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,od=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ad=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ld=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ud=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,md=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_d=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,yd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Md=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ed=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Td=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ad=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Rd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ld=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Id=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ud=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Od=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Wd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$d=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ep=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,np=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ip=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,op=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ap=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,hp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,up=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,vp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_p=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ap=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ip=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Up=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Np=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Fp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Yp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$p=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,em=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,nm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,im=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Je={alphahash_fragment:Cf,alphahash_pars_fragment:Rf,alphamap_fragment:Pf,alphamap_pars_fragment:Lf,alphatest_fragment:If,alphatest_pars_fragment:Df,aomap_fragment:Uf,aomap_pars_fragment:Nf,batching_pars_vertex:Ff,batching_vertex:Of,begin_vertex:Bf,beginnormal_vertex:zf,bsdfs:kf,iridescence_fragment:Vf,bumpmap_pars_fragment:Hf,clipping_planes_fragment:Gf,clipping_planes_pars_fragment:Wf,clipping_planes_pars_vertex:Xf,clipping_planes_vertex:Yf,color_fragment:qf,color_pars_fragment:Zf,color_pars_vertex:$f,color_vertex:Kf,common:Jf,cube_uv_reflection_fragment:jf,defaultnormal_vertex:Qf,displacementmap_pars_vertex:ed,displacementmap_vertex:td,emissivemap_fragment:nd,emissivemap_pars_fragment:id,colorspace_fragment:sd,colorspace_pars_fragment:rd,envmap_fragment:od,envmap_common_pars_fragment:ad,envmap_pars_fragment:ld,envmap_pars_vertex:cd,envmap_physical_pars_fragment:yd,envmap_vertex:hd,fog_vertex:ud,fog_pars_vertex:fd,fog_fragment:dd,fog_pars_fragment:pd,gradientmap_pars_fragment:md,lightmap_pars_fragment:gd,lights_lambert_fragment:vd,lights_lambert_pars_fragment:xd,lights_pars_begin:_d,lights_toon_fragment:Md,lights_toon_pars_fragment:Sd,lights_phong_fragment:wd,lights_phong_pars_fragment:Ed,lights_physical_fragment:Td,lights_physical_pars_fragment:bd,lights_fragment_begin:Ad,lights_fragment_maps:Cd,lights_fragment_end:Rd,logdepthbuf_fragment:Pd,logdepthbuf_pars_fragment:Ld,logdepthbuf_pars_vertex:Id,logdepthbuf_vertex:Dd,map_fragment:Ud,map_pars_fragment:Nd,map_particle_fragment:Fd,map_particle_pars_fragment:Od,metalnessmap_fragment:Bd,metalnessmap_pars_fragment:zd,morphinstance_vertex:kd,morphcolor_vertex:Vd,morphnormal_vertex:Hd,morphtarget_pars_vertex:Gd,morphtarget_vertex:Wd,normal_fragment_begin:Xd,normal_fragment_maps:Yd,normal_pars_fragment:qd,normal_pars_vertex:Zd,normal_vertex:$d,normalmap_pars_fragment:Kd,clearcoat_normal_fragment_begin:Jd,clearcoat_normal_fragment_maps:jd,clearcoat_pars_fragment:Qd,iridescence_pars_fragment:ep,opaque_fragment:tp,packing:np,premultiplied_alpha_fragment:ip,project_vertex:sp,dithering_fragment:rp,dithering_pars_fragment:op,roughnessmap_fragment:ap,roughnessmap_pars_fragment:lp,shadowmap_pars_fragment:cp,shadowmap_pars_vertex:hp,shadowmap_vertex:up,shadowmask_pars_fragment:fp,skinbase_vertex:dp,skinning_pars_vertex:pp,skinning_vertex:mp,skinnormal_vertex:gp,specularmap_fragment:vp,specularmap_pars_fragment:xp,tonemapping_fragment:_p,tonemapping_pars_fragment:yp,transmission_fragment:Mp,transmission_pars_fragment:Sp,uv_pars_fragment:wp,uv_pars_vertex:Ep,uv_vertex:Tp,worldpos_vertex:bp,background_vert:Ap,background_frag:Cp,backgroundCube_vert:Rp,backgroundCube_frag:Pp,cube_vert:Lp,cube_frag:Ip,depth_vert:Dp,depth_frag:Up,distanceRGBA_vert:Np,distanceRGBA_frag:Fp,equirect_vert:Op,equirect_frag:Bp,linedashed_vert:zp,linedashed_frag:kp,meshbasic_vert:Vp,meshbasic_frag:Hp,meshlambert_vert:Gp,meshlambert_frag:Wp,meshmatcap_vert:Xp,meshmatcap_frag:Yp,meshnormal_vert:qp,meshnormal_frag:Zp,meshphong_vert:$p,meshphong_frag:Kp,meshphysical_vert:Jp,meshphysical_frag:jp,meshtoon_vert:Qp,meshtoon_frag:em,points_vert:tm,points_frag:nm,shadow_vert:im,shadow_frag:sm,sprite_vert:rm,sprite_frag:om},pe={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},gn={basic:{uniforms:Ht([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:Ht([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new je(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:Ht([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:Ht([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:Ht([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new je(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:Ht([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:Ht([pe.points,pe.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:Ht([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:Ht([pe.common,pe.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:Ht([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:Ht([pe.sprite,pe.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:Ht([pe.common,pe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:Ht([pe.lights,pe.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};gn.physical={uniforms:Ht([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};const qs={r:0,b:0,g:0},Qn=new yn,am=new Qe;function lm(r,e,t,n,s,i,a){const o=new je(0);let l=i===!0?0:1,h,u,d=null,f=0,c=null;function p(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?t:e).get(x)),x}function v(M){let x=!1;const w=p(M);w===null?g(o,l):w&&w.isColor&&(g(w,1),x=!0);const y=r.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(M,x){const w=p(x);w&&(w.isCubeTexture||w.mapping===vr)?(u===void 0&&(u=new Ne(new an(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:Hi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(y,_,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Qn.copy(x.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(am.makeRotationFromEuler(Qn)),u.material.toneMapped=lt.getTransfer(w.colorSpace)!==pt,(d!==w||f!==w.version||c!==r.toneMapping)&&(u.material.needsUpdate=!0,d=w,f=w.version,c=r.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(h===void 0&&(h=new Ne(new vt(2,2),new Xn({name:"BackgroundMaterial",uniforms:Hi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=w,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.toneMapped=lt.getTransfer(w.colorSpace)!==pt,w.matrixAutoUpdate===!0&&w.updateMatrix(),h.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||f!==w.version||c!==r.toneMapping)&&(h.material.needsUpdate=!0,d=w,f=w.version,c=r.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null))}function g(M,x){M.getRGB(qs,Rc(r)),n.buffers.color.setClear(qs.r,qs.g,qs.b,x,a)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),h!==void 0&&(h.geometry.dispose(),h.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,g(o,l)},render:v,addToRenderList:m,dispose:T}}function cm(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},s=f(null);let i=s,a=!1;function o(E,A,U,I,F){let k=!1;const O=d(I,U,A);i!==O&&(i=O,h(i.object)),k=c(E,I,U,F),k&&p(E,I,U,F),F!==null&&e.update(F,r.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,x(E,A,U,I),F!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return r.createVertexArray()}function h(E){return r.bindVertexArray(E)}function u(E){return r.deleteVertexArray(E)}function d(E,A,U){const I=U.wireframe===!0;let F=n[E.id];F===void 0&&(F={},n[E.id]=F);let k=F[A.id];k===void 0&&(k={},F[A.id]=k);let O=k[I];return O===void 0&&(O=f(l()),k[I]=O),O}function f(E){const A=[],U=[],I=[];for(let F=0;F<t;F++)A[F]=0,U[F]=0,I[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:U,attributeDivisors:I,object:E,attributes:{},index:null}}function c(E,A,U,I){const F=i.attributes,k=A.attributes;let O=0;const Z=U.getAttributes();for(const G in Z)if(Z[G].location>=0){const re=F[G];let te=k[G];if(te===void 0&&(G==="instanceMatrix"&&E.instanceMatrix&&(te=E.instanceMatrix),G==="instanceColor"&&E.instanceColor&&(te=E.instanceColor)),re===void 0||re.attribute!==te||te&&re.data!==te.data)return!0;O++}return i.attributesNum!==O||i.index!==I}function p(E,A,U,I){const F={},k=A.attributes;let O=0;const Z=U.getAttributes();for(const G in Z)if(Z[G].location>=0){let re=k[G];re===void 0&&(G==="instanceMatrix"&&E.instanceMatrix&&(re=E.instanceMatrix),G==="instanceColor"&&E.instanceColor&&(re=E.instanceColor));const te={};te.attribute=re,re&&re.data&&(te.data=re.data),F[G]=te,O++}i.attributes=F,i.attributesNum=O,i.index=I}function v(){const E=i.newAttributes;for(let A=0,U=E.length;A<U;A++)E[A]=0}function m(E){g(E,0)}function g(E,A){const U=i.newAttributes,I=i.enabledAttributes,F=i.attributeDivisors;U[E]=1,I[E]===0&&(r.enableVertexAttribArray(E),I[E]=1),F[E]!==A&&(r.vertexAttribDivisor(E,A),F[E]=A)}function T(){const E=i.newAttributes,A=i.enabledAttributes;for(let U=0,I=A.length;U<I;U++)A[U]!==E[U]&&(r.disableVertexAttribArray(U),A[U]=0)}function M(E,A,U,I,F,k,O){O===!0?r.vertexAttribIPointer(E,A,U,F,k):r.vertexAttribPointer(E,A,U,I,F,k)}function x(E,A,U,I){v();const F=I.attributes,k=U.getAttributes(),O=A.defaultAttributeValues;for(const Z in k){const G=k[Z];if(G.location>=0){let ie=F[Z];if(ie===void 0&&(Z==="instanceMatrix"&&E.instanceMatrix&&(ie=E.instanceMatrix),Z==="instanceColor"&&E.instanceColor&&(ie=E.instanceColor)),ie!==void 0){const re=ie.normalized,te=ie.itemSize,Se=e.get(ie);if(Se===void 0)continue;const De=Se.buffer,N=Se.type,X=Se.bytesPerElement,ee=N===r.INT||N===r.UNSIGNED_INT||ie.gpuType===ha;if(ie.isInterleavedBufferAttribute){const K=ie.data,de=K.stride,Le=ie.offset;if(K.isInstancedInterleavedBuffer){for(let be=0;be<G.locationSize;be++)g(G.location+be,K.meshPerAttribute);E.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let be=0;be<G.locationSize;be++)m(G.location+be);r.bindBuffer(r.ARRAY_BUFFER,De);for(let be=0;be<G.locationSize;be++)M(G.location+be,te/G.locationSize,N,re,de*X,(Le+te/G.locationSize*be)*X,ee)}else{if(ie.isInstancedBufferAttribute){for(let K=0;K<G.locationSize;K++)g(G.location+K,ie.meshPerAttribute);E.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let K=0;K<G.locationSize;K++)m(G.location+K);r.bindBuffer(r.ARRAY_BUFFER,De);for(let K=0;K<G.locationSize;K++)M(G.location+K,te/G.locationSize,N,re,te*X,te/G.locationSize*K*X,ee)}}else if(O!==void 0){const re=O[Z];if(re!==void 0)switch(re.length){case 2:r.vertexAttrib2fv(G.location,re);break;case 3:r.vertexAttrib3fv(G.location,re);break;case 4:r.vertexAttrib4fv(G.location,re);break;default:r.vertexAttrib1fv(G.location,re)}}}}T()}function w(){b();for(const E in n){const A=n[E];for(const U in A){const I=A[U];for(const F in I)u(I[F].object),delete I[F];delete A[U]}delete n[E]}}function y(E){if(n[E.id]===void 0)return;const A=n[E.id];for(const U in A){const I=A[U];for(const F in I)u(I[F].object),delete I[F];delete A[U]}delete n[E.id]}function _(E){for(const A in n){const U=n[A];if(U[E.id]===void 0)continue;const I=U[E.id];for(const F in I)u(I[F].object),delete I[F];delete U[E.id]}}function b(){S(),a=!0,i!==s&&(i=s,h(i.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:S,dispose:w,releaseStatesOfGeometry:y,releaseStatesOfProgram:_,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function hm(r,e,t){let n;function s(h){n=h}function i(h,u){r.drawArrays(n,h,u),t.update(u,n,1)}function a(h,u,d){d!==0&&(r.drawArraysInstanced(n,h,u,d),t.update(u,n,d))}function o(h,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,u,0,d);let c=0;for(let p=0;p<d;p++)c+=u[p];t.update(c,n,1)}function l(h,u,d,f){if(d===0)return;const c=e.get("WEBGL_multi_draw");if(c===null)for(let p=0;p<h.length;p++)a(h[p],u[p],f[p]);else{c.multiDrawArraysInstancedWEBGL(n,h,0,u,0,f,0,d);let p=0;for(let v=0;v<d;v++)p+=u[v]*f[v];t.update(p,n,1)}}this.setMode=s,this.render=i,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function um(r,e,t,n){let s;function i(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const _=e.get("EXT_texture_filter_anisotropic");s=r.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==mn&&n.convert(_)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){const b=_===ms&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==Dn&&n.convert(_)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&_!==xn&&!b)}function l(_){if(_==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp";const u=l(h);u!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),c=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),T=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=p>0,y=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:i,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:c,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:T,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:w,maxSamples:y}}function fm(r){const e=this;let t=null,n=0,s=!1,i=!1;const a=new pn,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const c=d.length!==0||f||n!==0||s;return s=f,n=d.length,c},this.beginShadows=function(){i=!0,u(null)},this.endShadows=function(){i=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,c){const p=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,g=r.get(d);if(!s||p===null||p.length===0||i&&!m)i?u(null):h();else{const T=i?0:n,M=T*4;let x=g.clippingState||null;l.value=x,x=u(p,f,M,c);for(let w=0;w!==M;++w)x[w]=t[w];g.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function h(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,c,p){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,p!==!0||m===null){const g=c+v*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<g)&&(m=new Float32Array(g));for(let M=0,x=c;M!==v;++M,x+=4)a.copy(d[M]).applyMatrix4(T,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function dm(r){let e=new WeakMap;function t(a,o){return o===Po?a.mapping=Oi:o===Lo&&(a.mapping=Bi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Po||o===Lo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new Nu(l.height);return h.fromEquirectangularTexture(r,a),e.set(a,h),a.addEventListener("dispose",s),t(h.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function i(){e=new WeakMap}return{get:n,dispose:i}}const Ii=4,Sl=[.125,.215,.35,.446,.526,.582],si=20,to=new Wc,wl=new je;let no=null,io=0,so=0,ro=!1;const ni=(1+Math.sqrt(5))/2,Ai=1/ni,El=[new P(-ni,Ai,0),new P(ni,Ai,0),new P(-Ai,0,ni),new P(Ai,0,ni),new P(0,ni,-Ai),new P(0,ni,Ai),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class la{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){no=this._renderer.getRenderTarget(),io=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(e,n,s,i),t>0&&this._blur(i,0,0,t),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Al(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(no,io,so),this._renderer.xr.enabled=ro,e.scissorTest=!1,Zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Oi||e.mapping===Bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),no=this._renderer.getRenderTarget(),io=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:ms,format:mn,colorSpace:Vi,depthBuffer:!1},s=Tl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tl(e,t,n);const{_lodMax:i}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=pm(i)),this._blurMaterial=mm(i,e,t)}return s}_compileMaterial(e){const t=new Ne(this._lodPlanes[0],e);this._renderer.compile(t,to)}_sceneToCubeUV(e,t,n,s){const o=new Kt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(wl),u.toneMapping=Hn,u.autoClear=!1;const c=new Xt({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),p=new Ne(new an,c);let v=!1;const m=e.background;m?m.isColor&&(c.color.copy(m),e.background=null,v=!0):(c.color.copy(wl),v=!0);for(let g=0;g<6;g++){const T=g%3;T===0?(o.up.set(0,l[g],0),o.lookAt(h[g],0,0)):T===1?(o.up.set(0,0,l[g]),o.lookAt(0,h[g],0)):(o.up.set(0,l[g],0),o.lookAt(0,0,h[g]));const M=this._cubeSize;Zs(s,T*M,g>2?M:0,M,M),u.setRenderTarget(s),v&&u.render(p,o),u.render(e,o)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Oi||e.mapping===Bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Al()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bl());const i=s?this._cubemapMaterial:this._equirectMaterial,a=new Ne(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=e;const l=this._cubeSize;Zs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,to)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let i=1;i<s;i++){const a=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=El[(s-i-1)%El.length];this._blur(e,i-1,i,a,o)}t.autoClear=n}_blur(e,t,n,s,i){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",i),this._halfBlur(a,e,n,n,s,"longitudinal",i)}_halfBlur(e,t,n,s,i,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ne(this._lodPlanes[s],h),f=h.uniforms,c=this._sizeLods[n]-1,p=isFinite(i)?Math.PI/(2*c):2*Math.PI/(2*si-1),v=i/p,m=isFinite(i)?1+Math.floor(u*v):si;m>si&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);const g=[];let T=0;for(let _=0;_<si;++_){const b=_/v,S=Math.exp(-b*b/2);g.push(S),_===0?T+=S:_<m&&(T+=2*S)}for(let _=0;_<g.length;_++)g[_]=g[_]/T;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=g,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=p,f.mipInt.value=M-n;const x=this._sizeLods[s],w=3*x*(s>M-Ii?s-M+Ii:0),y=4*(this._cubeSize-x);Zs(t,w,y,3*x,2*x),l.setRenderTarget(t),l.render(d,to)}}function pm(r){const e=[],t=[],n=[];let s=r;const i=r-Ii+1+Sl.length;for(let a=0;a<i;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>r-Ii?l=Sl[a-r+Ii-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),u=-h,d=1+h,f=[u,u,d,u,d,d,u,u,d,d,u,d],c=6,p=6,v=3,m=2,g=1,T=new Float32Array(v*p*c),M=new Float32Array(m*p*c),x=new Float32Array(g*p*c);for(let y=0;y<c;y++){const _=y%3*2/3-1,b=y>2?0:-1,S=[_,b,0,_+2/3,b,0,_+2/3,b+1,0,_,b,0,_+2/3,b+1,0,_,b+1,0];T.set(S,v*p*y),M.set(f,m*p*y);const E=[y,y,y,y,y,y];x.set(E,g*p*y)}const w=new Nt;w.setAttribute("position",new Yt(T,v)),w.setAttribute("uv",new Yt(M,m)),w.setAttribute("faceIndex",new Yt(x,g)),e.push(w),s>Ii&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Tl(r,e,t){const n=new ci(r,e,t);return n.texture.mapping=vr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(r,e,t,n,s){r.viewport.set(e,t,n,s),r.scissor.set(e,t,n,s)}function mm(r,e,t){const n=new Float32Array(si),s=new P(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function bl(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Al(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ba(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function gm(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===Po||l===Lo,u=l===Oi||l===Bi;if(h||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new la(r)),d=h?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const c=o.image;return h&&c&&c.height>0||u&&c&&s(c)?(t===null&&(t=new la(r)),d=h?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",i),d.texture):null}}}return o}function s(o){let l=0;const h=6;for(let u=0;u<h;u++)o[u]!==void 0&&l++;return l===h}function i(o){const l=o.target;l.removeEventListener("dispose",i);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function vm(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=r.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Pi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function xm(r,e,t,n){const s={},i=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete s[f.id];const c=i.get(f);c&&(e.remove(c),i.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const c in f)e.update(f[c],r.ARRAY_BUFFER)}function h(d){const f=[],c=d.index,p=d.attributes.position;let v=0;if(c!==null){const T=c.array;v=c.version;for(let M=0,x=T.length;M<x;M+=3){const w=T[M+0],y=T[M+1],_=T[M+2];f.push(w,y,y,_,_,w)}}else if(p!==void 0){const T=p.array;v=p.version;for(let M=0,x=T.length/3-1;M<x;M+=3){const w=M+0,y=M+1,_=M+2;f.push(w,y,y,_,_,w)}}else return;const m=new(Sc(f)?Cc:Ac)(f,1);m.version=v;const g=i.get(d);g&&e.remove(g),i.set(d,m)}function u(d){const f=i.get(d);if(f){const c=d.index;c!==null&&f.version<c.version&&h(d)}else h(d);return i.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function _m(r,e,t){let n;function s(f){n=f}let i,a;function o(f){i=f.type,a=f.bytesPerElement}function l(f,c){r.drawElements(n,c,i,f*a),t.update(c,n,1)}function h(f,c,p){p!==0&&(r.drawElementsInstanced(n,c,i,f*a,p),t.update(c,n,p))}function u(f,c,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,f,0,p);let m=0;for(let g=0;g<p;g++)m+=c[g];t.update(m,n,1)}function d(f,c,p,v){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f.length;g++)h(f[g]/a,c[g],v[g]);else{m.multiDrawElementsInstancedWEBGL(n,c,0,i,f,0,v,0,p);let g=0;for(let T=0;T<p;T++)g+=c[T]*v[T];t.update(g,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function ym(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(i,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(i/3);break;case r.LINES:t.lines+=o*(i/2);break;case r.LINE_STRIP:t.lines+=o*(i-1);break;case r.LINE_LOOP:t.lines+=o*i;break;case r.POINTS:t.points+=o*i;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Mm(r,e,t){const n=new WeakMap,s=new mt;function i(a,o,l){const h=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let E=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",E)};var c=E;f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;p===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let w=o.attributes.position.count*x,y=1;w>e.maxTextureSize&&(y=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const _=new Float32Array(w*y*4*d),b=new Ec(_,w,y,d);b.type=xn,b.needsUpdate=!0;const S=x*4;for(let A=0;A<d;A++){const U=g[A],I=T[A],F=M[A],k=w*y*4*A;for(let O=0;O<U.count;O++){const Z=O*S;p===!0&&(s.fromBufferAttribute(U,O),_[k+Z+0]=s.x,_[k+Z+1]=s.y,_[k+Z+2]=s.z,_[k+Z+3]=0),v===!0&&(s.fromBufferAttribute(I,O),_[k+Z+4]=s.x,_[k+Z+5]=s.y,_[k+Z+6]=s.z,_[k+Z+7]=0),m===!0&&(s.fromBufferAttribute(F,O),_[k+Z+8]=s.x,_[k+Z+9]=s.y,_[k+Z+10]=s.z,_[k+Z+11]=F.itemSize===4?s.w:1)}}f={count:d,texture:b,size:new ae(w,y)},n.set(o,f),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let p=0;for(let m=0;m<h.length;m++)p+=h[m];const v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(r,"morphTargetBaseInfluence",v),l.getUniforms().setValue(r,"morphTargetInfluences",h)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:i}}function Sm(r,e,t,n){let s=new WeakMap;function i(l){const h=n.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==h&&(e.update(d),s.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==h&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return d}function a(){s=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:i,dispose:a}}const qc=new zt,Cl=new Dc(1,1),Zc=new Ec,$c=new _u,Kc=new Lc,Rl=[],Pl=[],Ll=new Float32Array(16),Il=new Float32Array(9),Dl=new Float32Array(4);function Yi(r,e,t){const n=r[0];if(n<=0||n>0)return r;const s=e*t;let i=Rl[s];if(i===void 0&&(i=new Float32Array(s),Rl[s]=i),e!==0){n.toArray(i,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(i,o)}return i}function Tt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function bt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function wr(r,e){let t=Pl[e];t===void 0&&(t=new Int32Array(e),Pl[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function wm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Em(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;r.uniform2fv(this.addr,e),bt(t,e)}}function Tm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;r.uniform3fv(this.addr,e),bt(t,e)}}function bm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;r.uniform4fv(this.addr,e),bt(t,e)}}function Am(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(Tt(t,n))return;Dl.set(n),r.uniformMatrix2fv(this.addr,!1,Dl),bt(t,n)}}function Cm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(Tt(t,n))return;Il.set(n),r.uniformMatrix3fv(this.addr,!1,Il),bt(t,n)}}function Rm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(Tt(t,n))return;Ll.set(n),r.uniformMatrix4fv(this.addr,!1,Ll),bt(t,n)}}function Pm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Lm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;r.uniform2iv(this.addr,e),bt(t,e)}}function Im(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;r.uniform3iv(this.addr,e),bt(t,e)}}function Dm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;r.uniform4iv(this.addr,e),bt(t,e)}}function Um(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Nm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;r.uniform2uiv(this.addr,e),bt(t,e)}}function Fm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;r.uniform3uiv(this.addr,e),bt(t,e)}}function Om(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;r.uniform4uiv(this.addr,e),bt(t,e)}}function Bm(r,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s);let i;this.type===r.SAMPLER_2D_SHADOW?(Cl.compareFunction=Mc,i=Cl):i=qc,t.setTexture2D(e||i,s)}function zm(r,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||$c,s)}function km(r,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Kc,s)}function Vm(r,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Zc,s)}function Hm(r){switch(r){case 5126:return wm;case 35664:return Em;case 35665:return Tm;case 35666:return bm;case 35674:return Am;case 35675:return Cm;case 35676:return Rm;case 5124:case 35670:return Pm;case 35667:case 35671:return Lm;case 35668:case 35672:return Im;case 35669:case 35673:return Dm;case 5125:return Um;case 36294:return Nm;case 36295:return Fm;case 36296:return Om;case 35678:case 36198:case 36298:case 36306:case 35682:return Bm;case 35679:case 36299:case 36307:return zm;case 35680:case 36300:case 36308:case 36293:return km;case 36289:case 36303:case 36311:case 36292:return Vm}}function Gm(r,e){r.uniform1fv(this.addr,e)}function Wm(r,e){const t=Yi(e,this.size,2);r.uniform2fv(this.addr,t)}function Xm(r,e){const t=Yi(e,this.size,3);r.uniform3fv(this.addr,t)}function Ym(r,e){const t=Yi(e,this.size,4);r.uniform4fv(this.addr,t)}function qm(r,e){const t=Yi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Zm(r,e){const t=Yi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function $m(r,e){const t=Yi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Km(r,e){r.uniform1iv(this.addr,e)}function Jm(r,e){r.uniform2iv(this.addr,e)}function jm(r,e){r.uniform3iv(this.addr,e)}function Qm(r,e){r.uniform4iv(this.addr,e)}function e0(r,e){r.uniform1uiv(this.addr,e)}function t0(r,e){r.uniform2uiv(this.addr,e)}function n0(r,e){r.uniform3uiv(this.addr,e)}function i0(r,e){r.uniform4uiv(this.addr,e)}function s0(r,e,t){const n=this.cache,s=e.length,i=wr(t,s);Tt(n,i)||(r.uniform1iv(this.addr,i),bt(n,i));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||qc,i[a])}function r0(r,e,t){const n=this.cache,s=e.length,i=wr(t,s);Tt(n,i)||(r.uniform1iv(this.addr,i),bt(n,i));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||$c,i[a])}function o0(r,e,t){const n=this.cache,s=e.length,i=wr(t,s);Tt(n,i)||(r.uniform1iv(this.addr,i),bt(n,i));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Kc,i[a])}function a0(r,e,t){const n=this.cache,s=e.length,i=wr(t,s);Tt(n,i)||(r.uniform1iv(this.addr,i),bt(n,i));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Zc,i[a])}function l0(r){switch(r){case 5126:return Gm;case 35664:return Wm;case 35665:return Xm;case 35666:return Ym;case 35674:return qm;case 35675:return Zm;case 35676:return $m;case 5124:case 35670:return Km;case 35667:case 35671:return Jm;case 35668:case 35672:return jm;case 35669:case 35673:return Qm;case 5125:return e0;case 36294:return t0;case 36295:return n0;case 36296:return i0;case 35678:case 36198:case 36298:case 36306:case 35682:return s0;case 35679:case 36299:case 36307:return r0;case 35680:case 36300:case 36308:case 36293:return o0;case 36289:case 36303:case 36311:case 36292:return a0}}class c0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Hm(t.type)}}class h0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=l0(t.type)}}class u0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let i=0,a=s.length;i!==a;++i){const o=s[i];o.setValue(e,t[o.id],n)}}}const oo=/(\w+)(\])?(\[|\.)?/g;function Ul(r,e){r.seq.push(e),r.map[e.id]=e}function f0(r,e,t){const n=r.name,s=n.length;for(oo.lastIndex=0;;){const i=oo.exec(n),a=oo.lastIndex;let o=i[1];const l=i[2]==="]",h=i[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===s){Ul(t,h===void 0?new c0(o,r,e):new h0(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new u0(o),Ul(t,d)),t=d}}}class ar{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const i=e.getActiveUniform(t,s),a=e.getUniformLocation(t,i.name);f0(i,a,this)}}setValue(e,t,n,s){const i=this.map[t];i!==void 0&&i.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let i=0,a=t.length;i!==a;++i){const o=t[i],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,i=e.length;s!==i;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Nl(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const d0=37297;let p0=0;function m0(r,e){const t=r.split(`
`),n=[],s=Math.max(e-6,0),i=Math.min(e+6,t.length);for(let a=s;a<i;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Fl=new Ze;function g0(r){lt._getMatrix(Fl,lt.workingColorSpace,r);const e=`mat3( ${Fl.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(r)){case ur:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Ol(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=r.getShaderInfoLog(e).trim();if(n&&s==="")return"";const i=/ERROR: 0:(\d+)/.exec(s);if(i){const a=parseInt(i[1]);return t.toUpperCase()+`

`+s+`

`+m0(r.getShaderSource(e),a)}else return s}function v0(r,e){const t=g0(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function x0(r,e){let t;switch(e){case Lh:t="Linear";break;case Ih:t="Reinhard";break;case Dh:t="Cineon";break;case cc:t="ACESFilmic";break;case Nh:t="AgX";break;case Fh:t="Neutral";break;case Uh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const $s=new P;function _0(){lt.getLuminanceCoefficients($s);const r=$s.x.toFixed(4),e=$s.y.toFixed(4),t=$s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function y0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(is).join(`
`)}function M0(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function S0(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const i=r.getActiveAttrib(e,s),a=i.name;let o=1;i.type===r.FLOAT_MAT2&&(o=2),i.type===r.FLOAT_MAT3&&(o=3),i.type===r.FLOAT_MAT4&&(o=4),t[a]={type:i.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function is(r){return r!==""}function Bl(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function zl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const w0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ca(r){return r.replace(w0,T0)}const E0=new Map;function T0(r,e){let t=Je[e];if(t===void 0){const n=E0.get(e);if(n!==void 0)t=Je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ca(t)}const b0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kl(r){return r.replace(b0,A0)}function A0(r,e,t,n){let s="";for(let i=parseInt(e);i<parseInt(t);i++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+i+" ]").replace(/UNROLLED_LOOP_INDEX/g,i);return s}function Vl(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function C0(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===oc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===ac?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Cn&&(e="SHADOWMAP_TYPE_VSM"),e}function R0(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Oi:case Bi:e="ENVMAP_TYPE_CUBE";break;case vr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function P0(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Bi:e="ENVMAP_MODE_REFRACTION";break}return e}function L0(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case lc:e="ENVMAP_BLENDING_MULTIPLY";break;case Rh:e="ENVMAP_BLENDING_MIX";break;case Ph:e="ENVMAP_BLENDING_ADD";break}return e}function I0(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function D0(r,e,t,n){const s=r.getContext(),i=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=C0(t),h=R0(t),u=P0(t),d=L0(t),f=I0(t),c=y0(t),p=M0(i),v=s.createProgram();let m,g,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(is).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(is).join(`
`),g.length>0&&(g+=`
`)):(m=[Vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),g=[Vl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?Je.tonemapping_pars_fragment:"",t.toneMapping!==Hn?x0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,v0("linearToOutputTexel",t.outputColorSpace),_0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(is).join(`
`)),a=ca(a),a=Bl(a,t),a=zl(a,t),o=ca(o),o=Bl(o,t),o=zl(o,t),a=kl(a),o=kl(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[c,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Va?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Va?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const M=T+m+a,x=T+g+o,w=Nl(s,s.VERTEX_SHADER,M),y=Nl(s,s.FRAGMENT_SHADER,x);s.attachShader(v,w),s.attachShader(v,y),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function _(A){if(r.debug.checkShaderErrors){const U=s.getProgramInfoLog(v).trim(),I=s.getShaderInfoLog(w).trim(),F=s.getShaderInfoLog(y).trim();let k=!0,O=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(k=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(s,v,w,y);else{const Z=Ol(s,w,"vertex"),G=Ol(s,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+U+`
`+Z+`
`+G)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(I===""||F==="")&&(O=!1);O&&(A.diagnostics={runnable:k,programLog:U,vertexShader:{log:I,prefix:m},fragmentShader:{log:F,prefix:g}})}s.deleteShader(w),s.deleteShader(y),b=new ar(s,v),S=S0(s,v)}let b;this.getUniforms=function(){return b===void 0&&_(this),b};let S;this.getAttributes=function(){return S===void 0&&_(this),S};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(v,d0)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=p0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=y,this}let U0=0;class N0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new F0(e),t.set(e,n)),n}}class F0{constructor(e){this.id=U0++,this.code=e,this.usedTimes=0}}function O0(r,e,t,n,s,i,a){const o=new xa,l=new N0,h=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let c=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return h.add(S),S===0?"uv":`uv${S}`}function m(S,E,A,U,I){const F=U.fog,k=I.geometry,O=S.isMeshStandardMaterial?U.environment:null,Z=(S.isMeshStandardMaterial?t:e).get(S.envMap||O),G=Z&&Z.mapping===vr?Z.image.height:null,ie=p[S.type];S.precision!==null&&(c=s.getMaxPrecision(S.precision),c!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",c,"instead."));const re=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,te=re!==void 0?re.length:0;let Se=0;k.morphAttributes.position!==void 0&&(Se=1),k.morphAttributes.normal!==void 0&&(Se=2),k.morphAttributes.color!==void 0&&(Se=3);let De,N,X,ee;if(ie){const ft=gn[ie];De=ft.vertexShader,N=ft.fragmentShader}else De=S.vertexShader,N=S.fragmentShader,l.update(S),X=l.getVertexShaderID(S),ee=l.getFragmentShaderID(S);const K=r.getRenderTarget(),de=r.state.buffers.depth.getReversed(),Le=I.isInstancedMesh===!0,be=I.isBatchedMesh===!0,We=!!S.map,Q=!!S.matcap,le=!!Z,D=!!S.aoMap,Ue=!!S.lightMap,ce=!!S.bumpMap,Ee=!!S.normalMap,fe=!!S.displacementMap,ke=!!S.emissiveMap,ye=!!S.metalnessMap,L=!!S.roughnessMap,C=S.anisotropy>0,W=S.clearcoat>0,J=S.dispersion>0,se=S.iridescence>0,j=S.sheen>0,Ie=S.transmission>0,ge=C&&!!S.anisotropyMap,we=W&&!!S.clearcoatMap,tt=W&&!!S.clearcoatNormalMap,ue=W&&!!S.clearcoatRoughnessMap,Ae=se&&!!S.iridescenceMap,ze=se&&!!S.iridescenceThicknessMap,He=j&&!!S.sheenColorMap,Ce=j&&!!S.sheenRoughnessMap,it=!!S.specularMap,Ke=!!S.specularColorMap,gt=!!S.specularIntensityMap,B=Ie&&!!S.transmissionMap,ve=Ie&&!!S.thicknessMap,$=!!S.gradientMap,ne=!!S.alphaMap,Me=S.alphaTest>0,_e=!!S.alphaHash,qe=!!S.extensions;let yt=Hn;S.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(yt=r.toneMapping);const Ft={shaderID:ie,shaderType:S.type,shaderName:S.name,vertexShader:De,fragmentShader:N,defines:S.defines,customVertexShaderID:X,customFragmentShaderID:ee,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:c,batching:be,batchingColor:be&&I._colorsTexture!==null,instancing:Le,instancingColor:Le&&I.instanceColor!==null,instancingMorph:Le&&I.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?r.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Vi,alphaToCoverage:!!S.alphaToCoverage,map:We,matcap:Q,envMap:le,envMapMode:le&&Z.mapping,envMapCubeUVHeight:G,aoMap:D,lightMap:Ue,bumpMap:ce,normalMap:Ee,displacementMap:f&&fe,emissiveMap:ke,normalMapObjectSpace:Ee&&S.normalMapType===kh,normalMapTangentSpace:Ee&&S.normalMapType===yc,metalnessMap:ye,roughnessMap:L,anisotropy:C,anisotropyMap:ge,clearcoat:W,clearcoatMap:we,clearcoatNormalMap:tt,clearcoatRoughnessMap:ue,dispersion:J,iridescence:se,iridescenceMap:Ae,iridescenceThicknessMap:ze,sheen:j,sheenColorMap:He,sheenRoughnessMap:Ce,specularMap:it,specularColorMap:Ke,specularIntensityMap:gt,transmission:Ie,transmissionMap:B,thicknessMap:ve,gradientMap:$,opaque:S.transparent===!1&&S.blending===Di&&S.alphaToCoverage===!1,alphaMap:ne,alphaTest:Me,alphaHash:_e,combine:S.combine,mapUv:We&&v(S.map.channel),aoMapUv:D&&v(S.aoMap.channel),lightMapUv:Ue&&v(S.lightMap.channel),bumpMapUv:ce&&v(S.bumpMap.channel),normalMapUv:Ee&&v(S.normalMap.channel),displacementMapUv:fe&&v(S.displacementMap.channel),emissiveMapUv:ke&&v(S.emissiveMap.channel),metalnessMapUv:ye&&v(S.metalnessMap.channel),roughnessMapUv:L&&v(S.roughnessMap.channel),anisotropyMapUv:ge&&v(S.anisotropyMap.channel),clearcoatMapUv:we&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:tt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:He&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&v(S.sheenRoughnessMap.channel),specularMapUv:it&&v(S.specularMap.channel),specularColorMapUv:Ke&&v(S.specularColorMap.channel),specularIntensityMapUv:gt&&v(S.specularIntensityMap.channel),transmissionMapUv:B&&v(S.transmissionMap.channel),thicknessMapUv:ve&&v(S.thicknessMap.channel),alphaMapUv:ne&&v(S.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Ee||C),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!k.attributes.uv&&(We||ne),fog:!!F,useFog:S.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:de,skinning:I.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:Se,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&A.length>0,shadowMapType:r.shadowMap.type,toneMapping:yt,decodeVideoTexture:We&&S.map.isVideoTexture===!0&&lt.getTransfer(S.map.colorSpace)===pt,decodeVideoTextureEmissive:ke&&S.emissiveMap.isVideoTexture===!0&&lt.getTransfer(S.emissiveMap.colorSpace)===pt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ut,flipSided:S.side===Gt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:qe&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&S.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ft.vertexUv1s=h.has(1),Ft.vertexUv2s=h.has(2),Ft.vertexUv3s=h.has(3),h.clear(),Ft}function g(S){const E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(const A in S.defines)E.push(A),E.push(S.defines[A]);return S.isRawShaderMaterial===!1&&(T(E,S),M(E,S),E.push(r.outputColorSpace)),E.push(S.customProgramCacheKey),E.join()}function T(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function M(S,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reverseDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){const E=p[S.type];let A;if(E){const U=gn[E];A=Lu.clone(U.uniforms)}else A=S.uniforms;return A}function w(S,E){let A;for(let U=0,I=u.length;U<I;U++){const F=u[U];if(F.cacheKey===E){A=F,++A.usedTimes;break}}return A===void 0&&(A=new D0(r,E,S,i),u.push(A)),A}function y(S){if(--S.usedTimes===0){const E=u.indexOf(S);u[E]=u[u.length-1],u.pop(),S.destroy()}}function _(S){l.remove(S)}function b(){l.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:x,acquireProgram:w,releaseProgram:y,releaseShaderCache:_,programs:u,dispose:b}}function B0(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function s(a,o,l){r.get(a)[o]=l}function i(){r=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:i}}function z0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Hl(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Gl(){const r=[];let e=0;const t=[],n=[],s=[];function i(){e=0,t.length=0,n.length=0,s.length=0}function a(d,f,c,p,v,m){let g=r[e];return g===void 0?(g={id:d.id,object:d,geometry:f,material:c,groupOrder:p,renderOrder:d.renderOrder,z:v,group:m},r[e]=g):(g.id=d.id,g.object=d,g.geometry=f,g.material=c,g.groupOrder=p,g.renderOrder=d.renderOrder,g.z=v,g.group=m),e++,g}function o(d,f,c,p,v,m){const g=a(d,f,c,p,v,m);c.transmission>0?n.push(g):c.transparent===!0?s.push(g):t.push(g)}function l(d,f,c,p,v,m){const g=a(d,f,c,p,v,m);c.transmission>0?n.unshift(g):c.transparent===!0?s.unshift(g):t.unshift(g)}function h(d,f){t.length>1&&t.sort(d||z0),n.length>1&&n.sort(f||Hl),s.length>1&&s.sort(f||Hl)}function u(){for(let d=e,f=r.length;d<f;d++){const c=r[d];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}}return{opaque:t,transmissive:n,transparent:s,init:i,push:o,unshift:l,finish:u,sort:h}}function k0(){let r=new WeakMap;function e(n,s){const i=r.get(n);let a;return i===void 0?(a=new Gl,r.set(n,[a])):s>=i.length?(a=new Gl,i.push(a)):a=i[s],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function V0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new je};break;case"SpotLight":t={position:new P,direction:new P,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new P,halfWidth:new P,halfHeight:new P};break}return r[e.id]=t,t}}}function H0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let G0=0;function W0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function X0(r){const e=new V0,t=H0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new P);const s=new P,i=new Qe,a=new Qe;function o(h){let u=0,d=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let c=0,p=0,v=0,m=0,g=0,T=0,M=0,x=0,w=0,y=0,_=0;h.sort(W0);for(let S=0,E=h.length;S<E;S++){const A=h[S],U=A.color,I=A.intensity,F=A.distance,k=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=U.r*I,d+=U.g*I,f+=U.b*I;else if(A.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(A.sh.coefficients[O],I);_++}else if(A.isDirectionalLight){const O=e.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const Z=A.shadow,G=t.get(A);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.directionalShadow[c]=G,n.directionalShadowMap[c]=k,n.directionalShadowMatrix[c]=A.shadow.matrix,T++}n.directional[c]=O,c++}else if(A.isSpotLight){const O=e.get(A);O.position.setFromMatrixPosition(A.matrixWorld),O.color.copy(U).multiplyScalar(I),O.distance=F,O.coneCos=Math.cos(A.angle),O.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),O.decay=A.decay,n.spot[v]=O;const Z=A.shadow;if(A.map&&(n.spotLightMap[w]=A.map,w++,Z.updateMatrices(A),A.castShadow&&y++),n.spotLightMatrix[v]=Z.matrix,A.castShadow){const G=t.get(A);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=k,x++}v++}else if(A.isRectAreaLight){const O=e.get(A);O.color.copy(U).multiplyScalar(I),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=O,m++}else if(A.isPointLight){const O=e.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),O.distance=A.distance,O.decay=A.decay,A.castShadow){const Z=A.shadow,G=t.get(A);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,n.pointShadow[p]=G,n.pointShadowMap[p]=k,n.pointShadowMatrix[p]=A.shadow.matrix,M++}n.point[p]=O,p++}else if(A.isHemisphereLight){const O=e.get(A);O.skyColor.copy(A.color).multiplyScalar(I),O.groundColor.copy(A.groundColor).multiplyScalar(I),n.hemi[g]=O,g++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const b=n.hash;(b.directionalLength!==c||b.pointLength!==p||b.spotLength!==v||b.rectAreaLength!==m||b.hemiLength!==g||b.numDirectionalShadows!==T||b.numPointShadows!==M||b.numSpotShadows!==x||b.numSpotMaps!==w||b.numLightProbes!==_)&&(n.directional.length=c,n.spot.length=v,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+w-y,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=_,b.directionalLength=c,b.pointLength=p,b.spotLength=v,b.rectAreaLength=m,b.hemiLength=g,b.numDirectionalShadows=T,b.numPointShadows=M,b.numSpotShadows=x,b.numSpotMaps=w,b.numLightProbes=_,n.version=G0++)}function l(h,u){let d=0,f=0,c=0,p=0,v=0;const m=u.matrixWorldInverse;for(let g=0,T=h.length;g<T;g++){const M=h[g];if(M.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(M.isSpotLight){const x=n.spot[c];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),c++}else if(M.isRectAreaLight){const x=n.rectArea[p];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),i.copy(M.matrixWorld),i.premultiply(m),a.extractRotation(i),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),p++}else if(M.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Wl(r){const e=new X0(r),t=[],n=[];function s(u){h.camera=u,t.length=0,n.length=0}function i(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const h={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:o,setupLightsView:l,pushLight:i,pushShadow:a}}function Y0(r){let e=new WeakMap;function t(s,i=0){const a=e.get(s);let o;return a===void 0?(o=new Wl(r),e.set(s,[o])):i>=a.length?(o=new Wl(r),a.push(o)):o=a[i],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const q0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Z0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function $0(r,e,t){let n=new ya;const s=new ae,i=new ae,a=new mt,o=new xf({depthPacking:zh}),l=new _f,h={},u=t.maxTextureSize,d={[Wn]:Gt,[Gt]:Wn,[Ut]:Ut},f=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:q0,fragmentShader:Z0}),c=f.clone();c.defines.HORIZONTAL_PASS=1;const p=new Nt;p.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ne(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oc;let g=this.type;this.render=function(y,_,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const S=r.getRenderTarget(),E=r.getActiveCubeFace(),A=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Vn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const I=g!==Cn&&this.type===Cn,F=g===Cn&&this.type!==Cn;for(let k=0,O=y.length;k<O;k++){const Z=y[k],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ie=G.getFrameExtents();if(s.multiply(ie),i.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(i.x=Math.floor(u/ie.x),s.x=i.x*ie.x,G.mapSize.x=i.x),s.y>u&&(i.y=Math.floor(u/ie.y),s.y=i.y*ie.y,G.mapSize.y=i.y)),G.map===null||I===!0||F===!0){const te=this.type!==Cn?{minFilter:Jt,magFilter:Jt}:{};G.map!==null&&G.map.dispose(),G.map=new ci(s.x,s.y,te),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const re=G.getViewportCount();for(let te=0;te<re;te++){const Se=G.getViewport(te);a.set(i.x*Se.x,i.y*Se.y,i.x*Se.z,i.y*Se.w),U.viewport(a),G.updateMatrices(Z,te),n=G.getFrustum(),x(_,b,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===Cn&&T(G,b),G.needsUpdate=!1}g=this.type,m.needsUpdate=!1,r.setRenderTarget(S,E,A)};function T(y,_){const b=e.update(v);f.defines.VSM_SAMPLES!==y.blurSamples&&(f.defines.VSM_SAMPLES=y.blurSamples,c.defines.VSM_SAMPLES=y.blurSamples,f.needsUpdate=!0,c.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new ci(s.x,s.y)),f.uniforms.shadow_pass.value=y.map.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,r.setRenderTarget(y.mapPass),r.clear(),r.renderBufferDirect(_,null,b,f,v,null),c.uniforms.shadow_pass.value=y.mapPass.texture,c.uniforms.resolution.value=y.mapSize,c.uniforms.radius.value=y.radius,r.setRenderTarget(y.map),r.clear(),r.renderBufferDirect(_,null,b,c,v,null)}function M(y,_,b,S){let E=null;const A=b.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(A!==void 0)E=A;else if(E=b.isPointLight===!0?l:o,r.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0){const U=E.uuid,I=_.uuid;let F=h[U];F===void 0&&(F={},h[U]=F);let k=F[I];k===void 0&&(k=E.clone(),F[I]=k,_.addEventListener("dispose",w)),E=k}if(E.visible=_.visible,E.wireframe=_.wireframe,S===Cn?E.side=_.shadowSide!==null?_.shadowSide:_.side:E.side=_.shadowSide!==null?_.shadowSide:d[_.side],E.alphaMap=_.alphaMap,E.alphaTest=_.alphaTest,E.map=_.map,E.clipShadows=_.clipShadows,E.clippingPlanes=_.clippingPlanes,E.clipIntersection=_.clipIntersection,E.displacementMap=_.displacementMap,E.displacementScale=_.displacementScale,E.displacementBias=_.displacementBias,E.wireframeLinewidth=_.wireframeLinewidth,E.linewidth=_.linewidth,b.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const U=r.properties.get(E);U.light=b}return E}function x(y,_,b,S,E){if(y.visible===!1)return;if(y.layers.test(_.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&E===Cn)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,y.matrixWorld);const I=e.update(y),F=y.material;if(Array.isArray(F)){const k=I.groups;for(let O=0,Z=k.length;O<Z;O++){const G=k[O],ie=F[G.materialIndex];if(ie&&ie.visible){const re=M(y,ie,S,E);y.onBeforeShadow(r,y,_,b,I,re,G),r.renderBufferDirect(b,null,I,re,y,G),y.onAfterShadow(r,y,_,b,I,re,G)}}}else if(F.visible){const k=M(y,F,S,E);y.onBeforeShadow(r,y,_,b,I,k,null),r.renderBufferDirect(b,null,I,k,y,null),y.onAfterShadow(r,y,_,b,I,k,null)}}const U=y.children;for(let I=0,F=U.length;I<F;I++)x(U[I],_,b,S,E)}function w(y){y.target.removeEventListener("dispose",w);for(const b in h){const S=h[b],E=y.target.uuid;E in S&&(S[E].dispose(),delete S[E])}}}const K0={[wo]:Eo,[To]:Co,[bo]:Ro,[Fi]:Ao,[Eo]:wo,[Co]:To,[Ro]:bo,[Ao]:Fi};function J0(r,e){function t(){let B=!1;const ve=new mt;let $=null;const ne=new mt(0,0,0,0);return{setMask:function(Me){$!==Me&&!B&&(r.colorMask(Me,Me,Me,Me),$=Me)},setLocked:function(Me){B=Me},setClear:function(Me,_e,qe,yt,Ft){Ft===!0&&(Me*=yt,_e*=yt,qe*=yt),ve.set(Me,_e,qe,yt),ne.equals(ve)===!1&&(r.clearColor(Me,_e,qe,yt),ne.copy(ve))},reset:function(){B=!1,$=null,ne.set(-1,0,0,0)}}}function n(){let B=!1,ve=!1,$=null,ne=null,Me=null;return{setReversed:function(_e){if(ve!==_e){const qe=e.get("EXT_clip_control");ve?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT);const yt=Me;Me=null,this.setClear(yt)}ve=_e},getReversed:function(){return ve},setTest:function(_e){_e?K(r.DEPTH_TEST):de(r.DEPTH_TEST)},setMask:function(_e){$!==_e&&!B&&(r.depthMask(_e),$=_e)},setFunc:function(_e){if(ve&&(_e=K0[_e]),ne!==_e){switch(_e){case wo:r.depthFunc(r.NEVER);break;case Eo:r.depthFunc(r.ALWAYS);break;case To:r.depthFunc(r.LESS);break;case Fi:r.depthFunc(r.LEQUAL);break;case bo:r.depthFunc(r.EQUAL);break;case Ao:r.depthFunc(r.GEQUAL);break;case Co:r.depthFunc(r.GREATER);break;case Ro:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ne=_e}},setLocked:function(_e){B=_e},setClear:function(_e){Me!==_e&&(ve&&(_e=1-_e),r.clearDepth(_e),Me=_e)},reset:function(){B=!1,$=null,ne=null,Me=null,ve=!1}}}function s(){let B=!1,ve=null,$=null,ne=null,Me=null,_e=null,qe=null,yt=null,Ft=null;return{setTest:function(ft){B||(ft?K(r.STENCIL_TEST):de(r.STENCIL_TEST))},setMask:function(ft){ve!==ft&&!B&&(r.stencilMask(ft),ve=ft)},setFunc:function(ft,ln,Sn){($!==ft||ne!==ln||Me!==Sn)&&(r.stencilFunc(ft,ln,Sn),$=ft,ne=ln,Me=Sn)},setOp:function(ft,ln,Sn){(_e!==ft||qe!==ln||yt!==Sn)&&(r.stencilOp(ft,ln,Sn),_e=ft,qe=ln,yt=Sn)},setLocked:function(ft){B=ft},setClear:function(ft){Ft!==ft&&(r.clearStencil(ft),Ft=ft)},reset:function(){B=!1,ve=null,$=null,ne=null,Me=null,_e=null,qe=null,yt=null,Ft=null}}}const i=new t,a=new n,o=new s,l=new WeakMap,h=new WeakMap;let u={},d={},f=new WeakMap,c=[],p=null,v=!1,m=null,g=null,T=null,M=null,x=null,w=null,y=null,_=new je(0,0,0),b=0,S=!1,E=null,A=null,U=null,I=null,F=null;const k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,Z=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),O=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),O=Z>=2);let ie=null,re={};const te=r.getParameter(r.SCISSOR_BOX),Se=r.getParameter(r.VIEWPORT),De=new mt().fromArray(te),N=new mt().fromArray(Se);function X(B,ve,$,ne){const Me=new Uint8Array(4),_e=r.createTexture();r.bindTexture(B,_e),r.texParameteri(B,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(B,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let qe=0;qe<$;qe++)B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY?r.texImage3D(ve,0,r.RGBA,1,1,ne,0,r.RGBA,r.UNSIGNED_BYTE,Me):r.texImage2D(ve+qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Me);return _e}const ee={};ee[r.TEXTURE_2D]=X(r.TEXTURE_2D,r.TEXTURE_2D,1),ee[r.TEXTURE_CUBE_MAP]=X(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[r.TEXTURE_2D_ARRAY]=X(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ee[r.TEXTURE_3D]=X(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(r.DEPTH_TEST),a.setFunc(Fi),ce(!1),Ee(Na),K(r.CULL_FACE),D(Vn);function K(B){u[B]!==!0&&(r.enable(B),u[B]=!0)}function de(B){u[B]!==!1&&(r.disable(B),u[B]=!1)}function Le(B,ve){return d[B]!==ve?(r.bindFramebuffer(B,ve),d[B]=ve,B===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ve),B===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ve),!0):!1}function be(B,ve){let $=c,ne=!1;if(B){$=f.get(ve),$===void 0&&($=[],f.set(ve,$));const Me=B.textures;if($.length!==Me.length||$[0]!==r.COLOR_ATTACHMENT0){for(let _e=0,qe=Me.length;_e<qe;_e++)$[_e]=r.COLOR_ATTACHMENT0+_e;$.length=Me.length,ne=!0}}else $[0]!==r.BACK&&($[0]=r.BACK,ne=!0);ne&&r.drawBuffers($)}function We(B){return p!==B?(r.useProgram(B),p=B,!0):!1}const Q={[ii]:r.FUNC_ADD,[fh]:r.FUNC_SUBTRACT,[dh]:r.FUNC_REVERSE_SUBTRACT};Q[ph]=r.MIN,Q[mh]=r.MAX;const le={[gh]:r.ZERO,[vh]:r.ONE,[xh]:r.SRC_COLOR,[Mo]:r.SRC_ALPHA,[Eh]:r.SRC_ALPHA_SATURATE,[Sh]:r.DST_COLOR,[yh]:r.DST_ALPHA,[_h]:r.ONE_MINUS_SRC_COLOR,[So]:r.ONE_MINUS_SRC_ALPHA,[wh]:r.ONE_MINUS_DST_COLOR,[Mh]:r.ONE_MINUS_DST_ALPHA,[Th]:r.CONSTANT_COLOR,[bh]:r.ONE_MINUS_CONSTANT_COLOR,[Ah]:r.CONSTANT_ALPHA,[Ch]:r.ONE_MINUS_CONSTANT_ALPHA};function D(B,ve,$,ne,Me,_e,qe,yt,Ft,ft){if(B===Vn){v===!0&&(de(r.BLEND),v=!1);return}if(v===!1&&(K(r.BLEND),v=!0),B!==uh){if(B!==m||ft!==S){if((g!==ii||x!==ii)&&(r.blendEquation(r.FUNC_ADD),g=ii,x=ii),ft)switch(B){case Di:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fa:r.blendFunc(r.ONE,r.ONE);break;case Oa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ba:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Di:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fa:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Oa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ba:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}T=null,M=null,w=null,y=null,_.set(0,0,0),b=0,m=B,S=ft}return}Me=Me||ve,_e=_e||$,qe=qe||ne,(ve!==g||Me!==x)&&(r.blendEquationSeparate(Q[ve],Q[Me]),g=ve,x=Me),($!==T||ne!==M||_e!==w||qe!==y)&&(r.blendFuncSeparate(le[$],le[ne],le[_e],le[qe]),T=$,M=ne,w=_e,y=qe),(yt.equals(_)===!1||Ft!==b)&&(r.blendColor(yt.r,yt.g,yt.b,Ft),_.copy(yt),b=Ft),m=B,S=!1}function Ue(B,ve){B.side===Ut?de(r.CULL_FACE):K(r.CULL_FACE);let $=B.side===Gt;ve&&($=!$),ce($),B.blending===Di&&B.transparent===!1?D(Vn):D(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),i.setMask(B.colorWrite);const ne=B.stencilWrite;o.setTest(ne),ne&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),ke(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?K(r.SAMPLE_ALPHA_TO_COVERAGE):de(r.SAMPLE_ALPHA_TO_COVERAGE)}function ce(B){E!==B&&(B?r.frontFace(r.CW):r.frontFace(r.CCW),E=B)}function Ee(B){B!==ch?(K(r.CULL_FACE),B!==A&&(B===Na?r.cullFace(r.BACK):B===hh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):de(r.CULL_FACE),A=B}function fe(B){B!==U&&(O&&r.lineWidth(B),U=B)}function ke(B,ve,$){B?(K(r.POLYGON_OFFSET_FILL),(I!==ve||F!==$)&&(r.polygonOffset(ve,$),I=ve,F=$)):de(r.POLYGON_OFFSET_FILL)}function ye(B){B?K(r.SCISSOR_TEST):de(r.SCISSOR_TEST)}function L(B){B===void 0&&(B=r.TEXTURE0+k-1),ie!==B&&(r.activeTexture(B),ie=B)}function C(B,ve,$){$===void 0&&(ie===null?$=r.TEXTURE0+k-1:$=ie);let ne=re[$];ne===void 0&&(ne={type:void 0,texture:void 0},re[$]=ne),(ne.type!==B||ne.texture!==ve)&&(ie!==$&&(r.activeTexture($),ie=$),r.bindTexture(B,ve||ee[B]),ne.type=B,ne.texture=ve)}function W(){const B=re[ie];B!==void 0&&B.type!==void 0&&(r.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function J(){try{r.compressedTexImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function se(){try{r.compressedTexImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ie(){try{r.texSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ge(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function we(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function tt(){try{r.texStorage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ue(){try{r.texStorage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ae(){try{r.texImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ze(){try{r.texImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function He(B){De.equals(B)===!1&&(r.scissor(B.x,B.y,B.z,B.w),De.copy(B))}function Ce(B){N.equals(B)===!1&&(r.viewport(B.x,B.y,B.z,B.w),N.copy(B))}function it(B,ve){let $=h.get(ve);$===void 0&&($=new WeakMap,h.set(ve,$));let ne=$.get(B);ne===void 0&&(ne=r.getUniformBlockIndex(ve,B.name),$.set(B,ne))}function Ke(B,ve){const ne=h.get(ve).get(B);l.get(ve)!==ne&&(r.uniformBlockBinding(ve,ne,B.__bindingPointIndex),l.set(ve,ne))}function gt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},ie=null,re={},d={},f=new WeakMap,c=[],p=null,v=!1,m=null,g=null,T=null,M=null,x=null,w=null,y=null,_=new je(0,0,0),b=0,S=!1,E=null,A=null,U=null,I=null,F=null,De.set(0,0,r.canvas.width,r.canvas.height),N.set(0,0,r.canvas.width,r.canvas.height),i.reset(),a.reset(),o.reset()}return{buffers:{color:i,depth:a,stencil:o},enable:K,disable:de,bindFramebuffer:Le,drawBuffers:be,useProgram:We,setBlending:D,setMaterial:Ue,setFlipSided:ce,setCullFace:Ee,setLineWidth:fe,setPolygonOffset:ke,setScissorTest:ye,activeTexture:L,bindTexture:C,unbindTexture:W,compressedTexImage2D:J,compressedTexImage3D:se,texImage2D:Ae,texImage3D:ze,updateUBOMapping:it,uniformBlockBinding:Ke,texStorage2D:tt,texStorage3D:ue,texSubImage2D:j,texSubImage3D:Ie,compressedTexSubImage2D:ge,compressedTexSubImage3D:we,scissor:He,viewport:Ce,reset:gt}}function j0(r,e,t,n,s,i,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new ae,u=new WeakMap;let d;const f=new WeakMap;let c=!1;try{c=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(L,C){return c?new OffscreenCanvas(L,C):dr("canvas")}function v(L,C,W){let J=1;const se=ye(L);if((se.width>W||se.height>W)&&(J=W/Math.max(se.width,se.height)),J<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const j=Math.floor(J*se.width),Ie=Math.floor(J*se.height);d===void 0&&(d=p(j,Ie));const ge=C?p(j,Ie):d;return ge.width=j,ge.height=Ie,ge.getContext("2d").drawImage(L,0,0,j,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+j+"x"+Ie+")."),ge}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),L;return L}function m(L){return L.generateMipmaps}function g(L){r.generateMipmap(L)}function T(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(L,C,W,J,se=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let j=C;if(C===r.RED&&(W===r.FLOAT&&(j=r.R32F),W===r.HALF_FLOAT&&(j=r.R16F),W===r.UNSIGNED_BYTE&&(j=r.R8)),C===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.R8UI),W===r.UNSIGNED_SHORT&&(j=r.R16UI),W===r.UNSIGNED_INT&&(j=r.R32UI),W===r.BYTE&&(j=r.R8I),W===r.SHORT&&(j=r.R16I),W===r.INT&&(j=r.R32I)),C===r.RG&&(W===r.FLOAT&&(j=r.RG32F),W===r.HALF_FLOAT&&(j=r.RG16F),W===r.UNSIGNED_BYTE&&(j=r.RG8)),C===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.RG8UI),W===r.UNSIGNED_SHORT&&(j=r.RG16UI),W===r.UNSIGNED_INT&&(j=r.RG32UI),W===r.BYTE&&(j=r.RG8I),W===r.SHORT&&(j=r.RG16I),W===r.INT&&(j=r.RG32I)),C===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.RGB8UI),W===r.UNSIGNED_SHORT&&(j=r.RGB16UI),W===r.UNSIGNED_INT&&(j=r.RGB32UI),W===r.BYTE&&(j=r.RGB8I),W===r.SHORT&&(j=r.RGB16I),W===r.INT&&(j=r.RGB32I)),C===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),W===r.UNSIGNED_INT&&(j=r.RGBA32UI),W===r.BYTE&&(j=r.RGBA8I),W===r.SHORT&&(j=r.RGBA16I),W===r.INT&&(j=r.RGBA32I)),C===r.RGB&&W===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),C===r.RGBA){const Ie=se?ur:lt.getTransfer(J);W===r.FLOAT&&(j=r.RGBA32F),W===r.HALF_FLOAT&&(j=r.RGBA16F),W===r.UNSIGNED_BYTE&&(j=Ie===pt?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function x(L,C){let W;return L?C===null||C===li||C===zi?W=r.DEPTH24_STENCIL8:C===xn?W=r.DEPTH32F_STENCIL8:C===hs&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===li||C===zi?W=r.DEPTH_COMPONENT24:C===xn?W=r.DEPTH_COMPONENT32F:C===hs&&(W=r.DEPTH_COMPONENT16),W}function w(L,C){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Jt&&L.minFilter!==vn?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function y(L){const C=L.target;C.removeEventListener("dispose",y),b(C),C.isVideoTexture&&u.delete(C)}function _(L){const C=L.target;C.removeEventListener("dispose",_),E(C)}function b(L){const C=n.get(L);if(C.__webglInit===void 0)return;const W=L.source,J=f.get(W);if(J){const se=J[C.__cacheKey];se.usedTimes--,se.usedTimes===0&&S(L),Object.keys(J).length===0&&f.delete(W)}n.remove(L)}function S(L){const C=n.get(L);r.deleteTexture(C.__webglTexture);const W=L.source,J=f.get(W);delete J[C.__cacheKey],a.memory.textures--}function E(L){const C=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(C.__webglFramebuffer[J]))for(let se=0;se<C.__webglFramebuffer[J].length;se++)r.deleteFramebuffer(C.__webglFramebuffer[J][se]);else r.deleteFramebuffer(C.__webglFramebuffer[J]);C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer[J])}else{if(Array.isArray(C.__webglFramebuffer))for(let J=0;J<C.__webglFramebuffer.length;J++)r.deleteFramebuffer(C.__webglFramebuffer[J]);else r.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&r.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let J=0;J<C.__webglColorRenderbuffer.length;J++)C.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(C.__webglColorRenderbuffer[J]);C.__webglDepthRenderbuffer&&r.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const W=L.textures;for(let J=0,se=W.length;J<se;J++){const j=n.get(W[J]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(W[J])}n.remove(L)}let A=0;function U(){A=0}function I(){const L=A;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),A+=1,L}function F(L){const C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function k(L,C){const W=n.get(L);if(L.isVideoTexture&&fe(L),L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){const J=L.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(W,L,C);return}}t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+C)}function O(L,C){const W=n.get(L);if(L.version>0&&W.__version!==L.version){N(W,L,C);return}t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+C)}function Z(L,C){const W=n.get(L);if(L.version>0&&W.__version!==L.version){N(W,L,C);return}t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+C)}function G(L,C){const W=n.get(L);if(L.version>0&&W.__version!==L.version){X(W,L,C);return}t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+C)}const ie={[hr]:r.REPEAT,[ri]:r.CLAMP_TO_EDGE,[Io]:r.MIRRORED_REPEAT},re={[Jt]:r.NEAREST,[Oh]:r.NEAREST_MIPMAP_NEAREST,[Es]:r.NEAREST_MIPMAP_LINEAR,[vn]:r.LINEAR,[Cr]:r.LINEAR_MIPMAP_NEAREST,[oi]:r.LINEAR_MIPMAP_LINEAR},te={[Vh]:r.NEVER,[qh]:r.ALWAYS,[Hh]:r.LESS,[Mc]:r.LEQUAL,[Gh]:r.EQUAL,[Yh]:r.GEQUAL,[Wh]:r.GREATER,[Xh]:r.NOTEQUAL};function Se(L,C){if(C.type===xn&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===vn||C.magFilter===Cr||C.magFilter===Es||C.magFilter===oi||C.minFilter===vn||C.minFilter===Cr||C.minFilter===Es||C.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,ie[C.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,ie[C.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,ie[C.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,re[C.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,re[C.minFilter]),C.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,te[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Jt||C.minFilter!==Es&&C.minFilter!==oi||C.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(L,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function De(L,C){let W=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",y));const J=C.source;let se=f.get(J);se===void 0&&(se={},f.set(J,se));const j=F(C);if(j!==L.__cacheKey){se[j]===void 0&&(se[j]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,W=!0),se[j].usedTimes++;const Ie=se[L.__cacheKey];Ie!==void 0&&(se[L.__cacheKey].usedTimes--,Ie.usedTimes===0&&S(C)),L.__cacheKey=j,L.__webglTexture=se[j].texture}return W}function N(L,C,W){let J=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(J=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(J=r.TEXTURE_3D);const se=De(L,C),j=C.source;t.bindTexture(J,L.__webglTexture,r.TEXTURE0+W);const Ie=n.get(j);if(j.version!==Ie.__version||se===!0){t.activeTexture(r.TEXTURE0+W);const ge=lt.getPrimaries(lt.workingColorSpace),we=C.colorSpace===Rn?null:lt.getPrimaries(C.colorSpace),tt=C.colorSpace===Rn||ge===we?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let ue=v(C.image,!1,s.maxTextureSize);ue=ke(C,ue);const Ae=i.convert(C.format,C.colorSpace),ze=i.convert(C.type);let He=M(C.internalFormat,Ae,ze,C.colorSpace,C.isVideoTexture);Se(J,C);let Ce;const it=C.mipmaps,Ke=C.isVideoTexture!==!0,gt=Ie.__version===void 0||se===!0,B=j.dataReady,ve=w(C,ue);if(C.isDepthTexture)He=x(C.format===ki,C.type),gt&&(Ke?t.texStorage2D(r.TEXTURE_2D,1,He,ue.width,ue.height):t.texImage2D(r.TEXTURE_2D,0,He,ue.width,ue.height,0,Ae,ze,null));else if(C.isDataTexture)if(it.length>0){Ke&&gt&&t.texStorage2D(r.TEXTURE_2D,ve,He,it[0].width,it[0].height);for(let $=0,ne=it.length;$<ne;$++)Ce=it[$],Ke?B&&t.texSubImage2D(r.TEXTURE_2D,$,0,0,Ce.width,Ce.height,Ae,ze,Ce.data):t.texImage2D(r.TEXTURE_2D,$,He,Ce.width,Ce.height,0,Ae,ze,Ce.data);C.generateMipmaps=!1}else Ke?(gt&&t.texStorage2D(r.TEXTURE_2D,ve,He,ue.width,ue.height),B&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ue.width,ue.height,Ae,ze,ue.data)):t.texImage2D(r.TEXTURE_2D,0,He,ue.width,ue.height,0,Ae,ze,ue.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Ke&&gt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ve,He,it[0].width,it[0].height,ue.depth);for(let $=0,ne=it.length;$<ne;$++)if(Ce=it[$],C.format!==mn)if(Ae!==null)if(Ke){if(B)if(C.layerUpdates.size>0){const Me=Ml(Ce.width,Ce.height,C.format,C.type);for(const _e of C.layerUpdates){const qe=Ce.data.subarray(_e*Me/Ce.data.BYTES_PER_ELEMENT,(_e+1)*Me/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,_e,Ce.width,Ce.height,1,Ae,qe)}C.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,Ce.width,Ce.height,ue.depth,Ae,Ce.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,$,He,Ce.width,Ce.height,ue.depth,0,Ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ke?B&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,Ce.width,Ce.height,ue.depth,Ae,ze,Ce.data):t.texImage3D(r.TEXTURE_2D_ARRAY,$,He,Ce.width,Ce.height,ue.depth,0,Ae,ze,Ce.data)}else{Ke&&gt&&t.texStorage2D(r.TEXTURE_2D,ve,He,it[0].width,it[0].height);for(let $=0,ne=it.length;$<ne;$++)Ce=it[$],C.format!==mn?Ae!==null?Ke?B&&t.compressedTexSubImage2D(r.TEXTURE_2D,$,0,0,Ce.width,Ce.height,Ae,Ce.data):t.compressedTexImage2D(r.TEXTURE_2D,$,He,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?B&&t.texSubImage2D(r.TEXTURE_2D,$,0,0,Ce.width,Ce.height,Ae,ze,Ce.data):t.texImage2D(r.TEXTURE_2D,$,He,Ce.width,Ce.height,0,Ae,ze,Ce.data)}else if(C.isDataArrayTexture)if(Ke){if(gt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ve,He,ue.width,ue.height,ue.depth),B)if(C.layerUpdates.size>0){const $=Ml(ue.width,ue.height,C.format,C.type);for(const ne of C.layerUpdates){const Me=ue.data.subarray(ne*$/ue.data.BYTES_PER_ELEMENT,(ne+1)*$/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ne,ue.width,ue.height,1,Ae,ze,Me)}C.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Ae,ze,ue.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,He,ue.width,ue.height,ue.depth,0,Ae,ze,ue.data);else if(C.isData3DTexture)Ke?(gt&&t.texStorage3D(r.TEXTURE_3D,ve,He,ue.width,ue.height,ue.depth),B&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Ae,ze,ue.data)):t.texImage3D(r.TEXTURE_3D,0,He,ue.width,ue.height,ue.depth,0,Ae,ze,ue.data);else if(C.isFramebufferTexture){if(gt)if(Ke)t.texStorage2D(r.TEXTURE_2D,ve,He,ue.width,ue.height);else{let $=ue.width,ne=ue.height;for(let Me=0;Me<ve;Me++)t.texImage2D(r.TEXTURE_2D,Me,He,$,ne,0,Ae,ze,null),$>>=1,ne>>=1}}else if(it.length>0){if(Ke&&gt){const $=ye(it[0]);t.texStorage2D(r.TEXTURE_2D,ve,He,$.width,$.height)}for(let $=0,ne=it.length;$<ne;$++)Ce=it[$],Ke?B&&t.texSubImage2D(r.TEXTURE_2D,$,0,0,Ae,ze,Ce):t.texImage2D(r.TEXTURE_2D,$,He,Ae,ze,Ce);C.generateMipmaps=!1}else if(Ke){if(gt){const $=ye(ue);t.texStorage2D(r.TEXTURE_2D,ve,He,$.width,$.height)}B&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ae,ze,ue)}else t.texImage2D(r.TEXTURE_2D,0,He,Ae,ze,ue);m(C)&&g(J),Ie.__version=j.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function X(L,C,W){if(C.image.length!==6)return;const J=De(L,C),se=C.source;t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+W);const j=n.get(se);if(se.version!==j.__version||J===!0){t.activeTexture(r.TEXTURE0+W);const Ie=lt.getPrimaries(lt.workingColorSpace),ge=C.colorSpace===Rn?null:lt.getPrimaries(C.colorSpace),we=C.colorSpace===Rn||Ie===ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const tt=C.isCompressedTexture||C.image[0].isCompressedTexture,ue=C.image[0]&&C.image[0].isDataTexture,Ae=[];for(let ne=0;ne<6;ne++)!tt&&!ue?Ae[ne]=v(C.image[ne],!0,s.maxCubemapSize):Ae[ne]=ue?C.image[ne].image:C.image[ne],Ae[ne]=ke(C,Ae[ne]);const ze=Ae[0],He=i.convert(C.format,C.colorSpace),Ce=i.convert(C.type),it=M(C.internalFormat,He,Ce,C.colorSpace),Ke=C.isVideoTexture!==!0,gt=j.__version===void 0||J===!0,B=se.dataReady;let ve=w(C,ze);Se(r.TEXTURE_CUBE_MAP,C);let $;if(tt){Ke&&gt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ve,it,ze.width,ze.height);for(let ne=0;ne<6;ne++){$=Ae[ne].mipmaps;for(let Me=0;Me<$.length;Me++){const _e=$[Me];C.format!==mn?He!==null?Ke?B&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Me,0,0,_e.width,_e.height,He,_e.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Me,it,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ke?B&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Me,0,0,_e.width,_e.height,He,Ce,_e.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Me,it,_e.width,_e.height,0,He,Ce,_e.data)}}}else{if($=C.mipmaps,Ke&&gt){$.length>0&&ve++;const ne=ye(Ae[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ve,it,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(ue){Ke?B&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ae[ne].width,Ae[ne].height,He,Ce,Ae[ne].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,it,Ae[ne].width,Ae[ne].height,0,He,Ce,Ae[ne].data);for(let Me=0;Me<$.length;Me++){const qe=$[Me].image[ne].image;Ke?B&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Me+1,0,0,qe.width,qe.height,He,Ce,qe.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Me+1,it,qe.width,qe.height,0,He,Ce,qe.data)}}else{Ke?B&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,He,Ce,Ae[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,it,He,Ce,Ae[ne]);for(let Me=0;Me<$.length;Me++){const _e=$[Me];Ke?B&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Me+1,0,0,He,Ce,_e.image[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Me+1,it,He,Ce,_e.image[ne])}}}m(C)&&g(r.TEXTURE_CUBE_MAP),j.__version=se.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function ee(L,C,W,J,se,j){const Ie=i.convert(W.format,W.colorSpace),ge=i.convert(W.type),we=M(W.internalFormat,Ie,ge,W.colorSpace),tt=n.get(C),ue=n.get(W);if(ue.__renderTarget=C,!tt.__hasExternalTextures){const Ae=Math.max(1,C.width>>j),ze=Math.max(1,C.height>>j);se===r.TEXTURE_3D||se===r.TEXTURE_2D_ARRAY?t.texImage3D(se,j,we,Ae,ze,C.depth,0,Ie,ge,null):t.texImage2D(se,j,we,Ae,ze,0,Ie,ge,null)}t.bindFramebuffer(r.FRAMEBUFFER,L),Ee(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,se,ue.__webglTexture,0,ce(C)):(se===r.TEXTURE_2D||se>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,J,se,ue.__webglTexture,j),t.bindFramebuffer(r.FRAMEBUFFER,null)}function K(L,C,W){if(r.bindRenderbuffer(r.RENDERBUFFER,L),C.depthBuffer){const J=C.depthTexture,se=J&&J.isDepthTexture?J.type:null,j=x(C.stencilBuffer,se),Ie=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ge=ce(C);Ee(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ge,j,C.width,C.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,ge,j,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,j,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ie,r.RENDERBUFFER,L)}else{const J=C.textures;for(let se=0;se<J.length;se++){const j=J[se],Ie=i.convert(j.format,j.colorSpace),ge=i.convert(j.type),we=M(j.internalFormat,Ie,ge,j.colorSpace),tt=ce(C);W&&Ee(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,tt,we,C.width,C.height):Ee(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,tt,we,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,we,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function de(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(C.depthTexture);J.__renderTarget=C,(!J.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),k(C.depthTexture,0);const se=J.__webglTexture,j=ce(C);if(C.depthTexture.format===Ui)Ee(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,se,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,se,0);else if(C.depthTexture.format===ki)Ee(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,se,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Le(L){const C=n.get(L),W=L.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==L.depthTexture){const J=L.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),J){const se=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,J.removeEventListener("dispose",se)};J.addEventListener("dispose",se),C.__depthDisposeCallback=se}C.__boundDepthTexture=J}if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");de(C.__webglFramebuffer,L)}else if(W){C.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[J]),C.__webglDepthbuffer[J]===void 0)C.__webglDepthbuffer[J]=r.createRenderbuffer(),K(C.__webglDepthbuffer[J],L,!1);else{const se=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=C.__webglDepthbuffer[J];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,se,r.RENDERBUFFER,j)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),K(C.__webglDepthbuffer,L,!1);else{const J=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,se=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,se),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,se)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function be(L,C,W){const J=n.get(L);C!==void 0&&ee(J.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&Le(L)}function We(L){const C=L.texture,W=n.get(L),J=n.get(C);L.addEventListener("dispose",_);const se=L.textures,j=L.isWebGLCubeRenderTarget===!0,Ie=se.length>1;if(Ie||(J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture()),J.__version=C.version,a.memory.textures++),j){W.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(C.mipmaps&&C.mipmaps.length>0){W.__webglFramebuffer[ge]=[];for(let we=0;we<C.mipmaps.length;we++)W.__webglFramebuffer[ge][we]=r.createFramebuffer()}else W.__webglFramebuffer[ge]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){W.__webglFramebuffer=[];for(let ge=0;ge<C.mipmaps.length;ge++)W.__webglFramebuffer[ge]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(Ie)for(let ge=0,we=se.length;ge<we;ge++){const tt=n.get(se[ge]);tt.__webglTexture===void 0&&(tt.__webglTexture=r.createTexture(),a.memory.textures++)}if(L.samples>0&&Ee(L)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ge=0;ge<se.length;ge++){const we=se[ge];W.__webglColorRenderbuffer[ge]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[ge]);const tt=i.convert(we.format,we.colorSpace),ue=i.convert(we.type),Ae=M(we.internalFormat,tt,ue,we.colorSpace,L.isXRRenderTarget===!0),ze=ce(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,ze,Ae,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.RENDERBUFFER,W.__webglColorRenderbuffer[ge])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),K(W.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){t.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture),Se(r.TEXTURE_CUBE_MAP,C);for(let ge=0;ge<6;ge++)if(C.mipmaps&&C.mipmaps.length>0)for(let we=0;we<C.mipmaps.length;we++)ee(W.__webglFramebuffer[ge][we],L,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,we);else ee(W.__webglFramebuffer[ge],L,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(C)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let ge=0,we=se.length;ge<we;ge++){const tt=se[ge],ue=n.get(tt);t.bindTexture(r.TEXTURE_2D,ue.__webglTexture),Se(r.TEXTURE_2D,tt),ee(W.__webglFramebuffer,L,tt,r.COLOR_ATTACHMENT0+ge,r.TEXTURE_2D,0),m(tt)&&g(r.TEXTURE_2D)}t.unbindTexture()}else{let ge=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ge=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ge,J.__webglTexture),Se(ge,C),C.mipmaps&&C.mipmaps.length>0)for(let we=0;we<C.mipmaps.length;we++)ee(W.__webglFramebuffer[we],L,C,r.COLOR_ATTACHMENT0,ge,we);else ee(W.__webglFramebuffer,L,C,r.COLOR_ATTACHMENT0,ge,0);m(C)&&g(ge),t.unbindTexture()}L.depthBuffer&&Le(L)}function Q(L){const C=L.textures;for(let W=0,J=C.length;W<J;W++){const se=C[W];if(m(se)){const j=T(L),Ie=n.get(se).__webglTexture;t.bindTexture(j,Ie),g(j),t.unbindTexture()}}}const le=[],D=[];function Ue(L){if(L.samples>0){if(Ee(L)===!1){const C=L.textures,W=L.width,J=L.height;let se=r.COLOR_BUFFER_BIT;const j=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ie=n.get(L),ge=C.length>1;if(ge)for(let we=0;we<C.length;we++)t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+we,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+we,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let we=0;we<C.length;we++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(se|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(se|=r.STENCIL_BUFFER_BIT)),ge){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ie.__webglColorRenderbuffer[we]);const tt=n.get(C[we]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,tt,0)}r.blitFramebuffer(0,0,W,J,0,0,W,J,se,r.NEAREST),l===!0&&(le.length=0,D.length=0,le.push(r.COLOR_ATTACHMENT0+we),L.depthBuffer&&L.resolveDepthBuffer===!1&&(le.push(j),D.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,D)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,le))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ge)for(let we=0;we<C.length;we++){t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+we,r.RENDERBUFFER,Ie.__webglColorRenderbuffer[we]);const tt=n.get(C[we]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+we,r.TEXTURE_2D,tt,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const C=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}}function ce(L){return Math.min(s.maxSamples,L.samples)}function Ee(L){const C=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function fe(L){const C=a.render.frame;u.get(L)!==C&&(u.set(L,C),L.update())}function ke(L,C){const W=L.colorSpace,J=L.format,se=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||W!==Vi&&W!==Rn&&(lt.getTransfer(W)===pt?(J!==mn||se!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),C}function ye(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(h.width=L.naturalWidth||L.width,h.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(h.width=L.displayWidth,h.height=L.displayHeight):(h.width=L.width,h.height=L.height),h}this.allocateTextureUnit=I,this.resetTextureUnits=U,this.setTexture2D=k,this.setTexture2DArray=O,this.setTexture3D=Z,this.setTextureCube=G,this.rebindTextures=be,this.setupRenderTarget=We,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=Ee}function Q0(r,e){function t(n,s=Rn){let i;const a=lt.getTransfer(s);if(n===Dn)return r.UNSIGNED_BYTE;if(n===ua)return r.UNSIGNED_SHORT_4_4_4_4;if(n===fa)return r.UNSIGNED_SHORT_5_5_5_1;if(n===dc)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===uc)return r.BYTE;if(n===fc)return r.SHORT;if(n===hs)return r.UNSIGNED_SHORT;if(n===ha)return r.INT;if(n===li)return r.UNSIGNED_INT;if(n===xn)return r.FLOAT;if(n===ms)return r.HALF_FLOAT;if(n===pc)return r.ALPHA;if(n===mc)return r.RGB;if(n===mn)return r.RGBA;if(n===gc)return r.LUMINANCE;if(n===vc)return r.LUMINANCE_ALPHA;if(n===Ui)return r.DEPTH_COMPONENT;if(n===ki)return r.DEPTH_STENCIL;if(n===da)return r.RED;if(n===pa)return r.RED_INTEGER;if(n===xc)return r.RG;if(n===ma)return r.RG_INTEGER;if(n===ga)return r.RGBA_INTEGER;if(n===nr||n===ir||n===sr||n===rr)if(a===pt)if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i!==null){if(n===nr)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ir)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sr)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===rr)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=e.get("WEBGL_compressed_texture_s3tc"),i!==null){if(n===nr)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ir)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sr)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===rr)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Do||n===Uo||n===No||n===Fo)if(i=e.get("WEBGL_compressed_texture_pvrtc"),i!==null){if(n===Do)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Uo)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===No)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fo)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oo||n===Bo||n===zo)if(i=e.get("WEBGL_compressed_texture_etc"),i!==null){if(n===Oo||n===Bo)return a===pt?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===zo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ko||n===Vo||n===Ho||n===Go||n===Wo||n===Xo||n===Yo||n===qo||n===Zo||n===$o||n===Ko||n===Jo||n===jo||n===Qo)if(i=e.get("WEBGL_compressed_texture_astc"),i!==null){if(n===ko)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ho)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Go)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Yo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$o)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ko)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Jo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qo)return a===pt?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===or||n===ea||n===ta)if(i=e.get("EXT_texture_compression_bptc"),i!==null){if(n===or)return a===pt?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ea)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ta)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_c||n===na||n===ia||n===sa)if(i=e.get("EXT_texture_compression_rgtc"),i!==null){if(n===or)return i.COMPRESSED_RED_RGTC1_EXT;if(n===na)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ia)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sa)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const eg={type:"move"};class ao{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,i=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),g=this._getHandJoint(h,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],f=u.position.distanceTo(d.position),c=.02,p=.005;h.inputState.pinching&&f>c+p?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&f<=c-p&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(l.matrix.fromArray(i.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,i.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(i.linearVelocity)):l.hasLinearVelocity=!1,i.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(i.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&i!==null&&(s=i),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(eg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=i!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new dt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const tg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ng=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ig{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new zt,i=e.properties.get(s);i.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Xn({vertexShader:tg,fragmentShader:ng,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ne(new vt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sg extends Wi{constructor(e,t){super();const n=this;let s=null,i=1,a=null,o="local-floor",l=1,h=null,u=null,d=null,f=null,c=null,p=null;const v=new ig,m=t.getContextAttributes();let g=null,T=null;const M=[],x=[],w=new ae;let y=null;const _=new Kt;_.viewport=new mt;const b=new Kt;b.viewport=new mt;const S=[_,b],E=new wf;let A=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let X=M[N];return X===void 0&&(X=new ao,M[N]=X),X.getTargetRaySpace()},this.getControllerGrip=function(N){let X=M[N];return X===void 0&&(X=new ao,M[N]=X),X.getGripSpace()},this.getHand=function(N){let X=M[N];return X===void 0&&(X=new ao,M[N]=X),X.getHandSpace()};function I(N){const X=x.indexOf(N.inputSource);if(X===-1)return;const ee=M[X];ee!==void 0&&(ee.update(N.inputSource,N.frame,h||a),ee.dispatchEvent({type:N.type,data:N.inputSource}))}function F(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",k);for(let N=0;N<M.length;N++){const X=x[N];X!==null&&(x[N]=null,M[N].disconnect(X))}A=null,U=null,v.reset(),e.setRenderTarget(g),c=null,f=null,d=null,s=null,T=null,De.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){i=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){o=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(N){h=N},this.getBaseLayer=function(){return f!==null?f:c},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(N){if(s=N,s!==null){if(g=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",F),s.addEventListener("inputsourceschange",k),m.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(w),s.renderState.layers===void 0){const X={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:i};c=new XRWebGLLayer(s,t,X),s.updateRenderState({baseLayer:c}),e.setPixelRatio(1),e.setSize(c.framebufferWidth,c.framebufferHeight,!1),T=new ci(c.framebufferWidth,c.framebufferHeight,{format:mn,type:Dn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let X=null,ee=null,K=null;m.depth&&(K=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=m.stencil?ki:Ui,ee=m.stencil?zi:li);const de={colorFormat:t.RGBA8,depthFormat:K,scaleFactor:i};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(de),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),T=new ci(f.textureWidth,f.textureHeight,{format:mn,type:Dn,depthTexture:new Dc(f.textureWidth,f.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await s.requestReferenceSpace(o),De.setContext(s),De.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function k(N){for(let X=0;X<N.removed.length;X++){const ee=N.removed[X],K=x.indexOf(ee);K>=0&&(x[K]=null,M[K].disconnect(ee))}for(let X=0;X<N.added.length;X++){const ee=N.added[X];let K=x.indexOf(ee);if(K===-1){for(let Le=0;Le<M.length;Le++)if(Le>=x.length){x.push(ee),K=Le;break}else if(x[Le]===null){x[Le]=ee,K=Le;break}if(K===-1)break}const de=M[K];de&&de.connect(ee)}}const O=new P,Z=new P;function G(N,X,ee){O.setFromMatrixPosition(X.matrixWorld),Z.setFromMatrixPosition(ee.matrixWorld);const K=O.distanceTo(Z),de=X.projectionMatrix.elements,Le=ee.projectionMatrix.elements,be=de[14]/(de[10]-1),We=de[14]/(de[10]+1),Q=(de[9]+1)/de[5],le=(de[9]-1)/de[5],D=(de[8]-1)/de[0],Ue=(Le[8]+1)/Le[0],ce=be*D,Ee=be*Ue,fe=K/(-D+Ue),ke=fe*-D;if(X.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(ke),N.translateZ(fe),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),de[10]===-1)N.projectionMatrix.copy(X.projectionMatrix),N.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const ye=be+fe,L=We+fe,C=ce-ke,W=Ee+(K-ke),J=Q*We/L*ye,se=le*We/L*ye;N.projectionMatrix.makePerspective(C,W,J,se,ye,L),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function ie(N,X){X===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(X.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(s===null)return;let X=N.near,ee=N.far;v.texture!==null&&(v.depthNear>0&&(X=v.depthNear),v.depthFar>0&&(ee=v.depthFar)),E.near=b.near=_.near=X,E.far=b.far=_.far=ee,(A!==E.near||U!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),A=E.near,U=E.far),_.layers.mask=N.layers.mask|2,b.layers.mask=N.layers.mask|4,E.layers.mask=_.layers.mask|b.layers.mask;const K=N.parent,de=E.cameras;ie(E,K);for(let Le=0;Le<de.length;Le++)ie(de[Le],K);de.length===2?G(E,_,b):E.projectionMatrix.copy(_.projectionMatrix),re(N,E,K)};function re(N,X,ee){ee===null?N.matrix.copy(X.matrixWorld):(N.matrix.copy(ee.matrixWorld),N.matrix.invert(),N.matrix.multiply(X.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(X.projectionMatrix),N.projectionMatrixInverse.copy(X.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=us*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(f===null&&c===null))return l},this.setFoveation=function(N){l=N,f!==null&&(f.fixedFoveation=N),c!==null&&c.fixedFoveation!==void 0&&(c.fixedFoveation=N)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(E)};let te=null;function Se(N,X){if(u=X.getViewerPose(h||a),p=X,u!==null){const ee=u.views;c!==null&&(e.setRenderTargetFramebuffer(T,c.framebuffer),e.setRenderTarget(T));let K=!1;ee.length!==E.cameras.length&&(E.cameras.length=0,K=!0);for(let Le=0;Le<ee.length;Le++){const be=ee[Le];let We=null;if(c!==null)We=c.getViewport(be);else{const le=d.getViewSubImage(f,be);We=le.viewport,Le===0&&(e.setRenderTargetTextures(T,le.colorTexture,f.ignoreDepthValues?void 0:le.depthStencilTexture),e.setRenderTarget(T))}let Q=S[Le];Q===void 0&&(Q=new Kt,Q.layers.enable(Le),Q.viewport=new mt,S[Le]=Q),Q.matrix.fromArray(be.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(be.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(We.x,We.y,We.width,We.height),Le===0&&(E.matrix.copy(Q.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),K===!0&&E.cameras.push(Q)}const de=s.enabledFeatures;if(de&&de.includes("depth-sensing")){const Le=d.getDepthInformation(ee[0]);Le&&Le.isValid&&Le.texture&&v.init(e,Le,s.renderState)}}for(let ee=0;ee<M.length;ee++){const K=x[ee],de=M[ee];K!==null&&de!==void 0&&de.update(K,X,h||a)}te&&te(N,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),p=null}const De=new Yc;De.setAnimationLoop(Se),this.setAnimationLoop=function(N){te=N},this.dispose=function(){}}}const ei=new yn,rg=new Qe;function og(r,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Rc(r)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,T,M,x){g.isMeshBasicMaterial||g.isMeshLambertMaterial?i(m,g):g.isMeshToonMaterial?(i(m,g),d(m,g)):g.isMeshPhongMaterial?(i(m,g),u(m,g)):g.isMeshStandardMaterial?(i(m,g),f(m,g),g.isMeshPhysicalMaterial&&c(m,g,x)):g.isMeshMatcapMaterial?(i(m,g),p(m,g)):g.isMeshDepthMaterial?i(m,g):g.isMeshDistanceMaterial?(i(m,g),v(m,g)):g.isMeshNormalMaterial?i(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,T,M):g.isSpriteMaterial?h(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function i(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Gt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Gt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const T=e.get(g),M=T.envMap,x=T.envMapRotation;M&&(m.envMap.value=M,ei.copy(x),ei.x*=-1,ei.y*=-1,ei.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),m.envMapRotation.value.setFromMatrix4(rg.makeRotationFromEuler(ei)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,T,M){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*T,m.scale.value=M*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function d(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function c(m,g,T){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Gt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){const T=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ag(r,e,t,n){let s={},i={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,M){const x=M.program;n.uniformBlockBinding(T,x)}function h(T,M){let x=s[T.id];x===void 0&&(p(T),x=u(T),s[T.id]=x,T.addEventListener("dispose",m));const w=M.program;n.updateUBOMapping(T,w);const y=e.render.frame;i[T.id]!==y&&(f(T),i[T.id]=y)}function u(T){const M=d();T.__bindingPointIndex=M;const x=r.createBuffer(),w=T.__size,y=T.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,w,y),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,x),x}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const M=s[T.id],x=T.uniforms,w=T.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let y=0,_=x.length;y<_;y++){const b=Array.isArray(x[y])?x[y]:[x[y]];for(let S=0,E=b.length;S<E;S++){const A=b[S];if(c(A,y,S,w)===!0){const U=A.__offset,I=Array.isArray(A.value)?A.value:[A.value];let F=0;for(let k=0;k<I.length;k++){const O=I[k],Z=v(O);typeof O=="number"||typeof O=="boolean"?(A.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,U+F,A.__data)):O.isMatrix3?(A.__data[0]=O.elements[0],A.__data[1]=O.elements[1],A.__data[2]=O.elements[2],A.__data[3]=0,A.__data[4]=O.elements[3],A.__data[5]=O.elements[4],A.__data[6]=O.elements[5],A.__data[7]=0,A.__data[8]=O.elements[6],A.__data[9]=O.elements[7],A.__data[10]=O.elements[8],A.__data[11]=0):(O.toArray(A.__data,F),F+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,A.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function c(T,M,x,w){const y=T.value,_=M+"_"+x;if(w[_]===void 0)return typeof y=="number"||typeof y=="boolean"?w[_]=y:w[_]=y.clone(),!0;{const b=w[_];if(typeof y=="number"||typeof y=="boolean"){if(b!==y)return w[_]=y,!0}else if(b.equals(y)===!1)return b.copy(y),!0}return!1}function p(T){const M=T.uniforms;let x=0;const w=16;for(let _=0,b=M.length;_<b;_++){const S=Array.isArray(M[_])?M[_]:[M[_]];for(let E=0,A=S.length;E<A;E++){const U=S[E],I=Array.isArray(U.value)?U.value:[U.value];for(let F=0,k=I.length;F<k;F++){const O=I[F],Z=v(O),G=x%w,ie=G%Z.boundary,re=G+ie;x+=ie,re!==0&&w-re<Z.storage&&(x+=w-re),U.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=Z.storage}}}const y=x%w;return y>0&&(x+=w-y),T.__size=x,T.__cache={},this}function v(T){const M={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(M.boundary=4,M.storage=4):T.isVector2?(M.boundary=8,M.storage=8):T.isVector3||T.isColor?(M.boundary=16,M.storage=12):T.isVector4?(M.boundary=16,M.storage=16):T.isMatrix3?(M.boundary=48,M.storage=48):T.isMatrix4?(M.boundary=64,M.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),M}function m(T){const M=T.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),r.deleteBuffer(s[M.id]),delete s[M.id],delete i[M.id]}function g(){for(const T in s)r.deleteBuffer(s[T]);a=[],s={},i={}}return{bind:l,update:h,dispose:g}}class lg{constructor(e={}){const{canvas:t=hu(),context:n=null,depth:s=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let c;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");c=n.getContextAttributes().alpha}else c=a;const p=new Uint32Array(4),v=new Int32Array(4);let m=null,g=null;const T=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Dt,this.toneMapping=Hn,this.toneMappingExposure=1;const x=this;let w=!1,y=0,_=0,b=null,S=-1,E=null;const A=new mt,U=new mt;let I=null;const F=new je(0);let k=0,O=t.width,Z=t.height,G=1,ie=null,re=null;const te=new mt(0,0,O,Z),Se=new mt(0,0,O,Z);let De=!1;const N=new ya;let X=!1,ee=!1;const K=new Qe,de=new Qe,Le=new P,be=new mt,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function le(){return b===null?G:1}let D=n;function Ue(R,z){return t.getContext(R,z)}try{const R={alpha:!0,depth:s,stencil:i,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${gr}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",_e,!1),D===null){const z="webgl2";if(D=Ue(z,R),D===null)throw Ue(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ce,Ee,fe,ke,ye,L,C,W,J,se,j,Ie,ge,we,tt,ue,Ae,ze,He,Ce,it,Ke,gt,B;function ve(){ce=new vm(D),ce.init(),Ke=new Q0(D,ce),Ee=new um(D,ce,e,Ke),fe=new J0(D,ce),Ee.reverseDepthBuffer&&f&&fe.buffers.depth.setReversed(!0),ke=new ym(D),ye=new B0,L=new j0(D,ce,fe,ye,Ee,Ke,ke),C=new dm(x),W=new gm(x),J=new Af(D),gt=new cm(D,J),se=new xm(D,J,ke,gt),j=new Sm(D,se,J,ke),He=new Mm(D,Ee,L),ue=new fm(ye),Ie=new O0(x,C,W,ce,Ee,gt,ue),ge=new og(x,ye),we=new k0,tt=new Y0(ce),ze=new lm(x,C,W,fe,j,c,l),Ae=new $0(x,j,Ee),B=new ag(D,ke,Ee,fe),Ce=new hm(D,ce,ke),it=new _m(D,ce,ke),ke.programs=Ie.programs,x.capabilities=Ee,x.extensions=ce,x.properties=ye,x.renderLists=we,x.shadowMap=Ae,x.state=fe,x.info=ke}ve();const $=new sg(x,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const R=ce.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ce.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(R){R!==void 0&&(G=R,this.setSize(O,Z,!1))},this.getSize=function(R){return R.set(O,Z)},this.setSize=function(R,z,Y=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=R,Z=z,t.width=Math.floor(R*G),t.height=Math.floor(z*G),Y===!0&&(t.style.width=R+"px",t.style.height=z+"px"),this.setViewport(0,0,R,z)},this.getDrawingBufferSize=function(R){return R.set(O*G,Z*G).floor()},this.setDrawingBufferSize=function(R,z,Y){O=R,Z=z,G=Y,t.width=Math.floor(R*Y),t.height=Math.floor(z*Y),this.setViewport(0,0,R,z)},this.getCurrentViewport=function(R){return R.copy(A)},this.getViewport=function(R){return R.copy(te)},this.setViewport=function(R,z,Y,q){R.isVector4?te.set(R.x,R.y,R.z,R.w):te.set(R,z,Y,q),fe.viewport(A.copy(te).multiplyScalar(G).round())},this.getScissor=function(R){return R.copy(Se)},this.setScissor=function(R,z,Y,q){R.isVector4?Se.set(R.x,R.y,R.z,R.w):Se.set(R,z,Y,q),fe.scissor(U.copy(Se).multiplyScalar(G).round())},this.getScissorTest=function(){return De},this.setScissorTest=function(R){fe.setScissorTest(De=R)},this.setOpaqueSort=function(R){ie=R},this.setTransparentSort=function(R){re=R},this.getClearColor=function(R){return R.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(R=!0,z=!0,Y=!0){let q=0;if(R){let H=!1;if(b!==null){const he=b.texture.format;H=he===ga||he===ma||he===pa}if(H){const he=b.texture.type,xe=he===Dn||he===li||he===hs||he===zi||he===ua||he===fa,Te=ze.getClearColor(),Re=ze.getClearAlpha(),Ge=Te.r,Xe=Te.g,Oe=Te.b;xe?(p[0]=Ge,p[1]=Xe,p[2]=Oe,p[3]=Re,D.clearBufferuiv(D.COLOR,0,p)):(v[0]=Ge,v[1]=Xe,v[2]=Oe,v[3]=Re,D.clearBufferiv(D.COLOR,0,v))}else q|=D.COLOR_BUFFER_BIT}z&&(q|=D.DEPTH_BUFFER_BIT),Y&&(q|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),ze.dispose(),we.dispose(),tt.dispose(),ye.dispose(),C.dispose(),W.dispose(),j.dispose(),gt.dispose(),B.dispose(),Ie.dispose(),$.dispose(),$.removeEventListener("sessionstart",Ca),$.removeEventListener("sessionend",Ra),qn.stop()};function ne(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const R=ke.autoReset,z=Ae.enabled,Y=Ae.autoUpdate,q=Ae.needsUpdate,H=Ae.type;ve(),ke.autoReset=R,Ae.enabled=z,Ae.autoUpdate=Y,Ae.needsUpdate=q,Ae.type=H}function _e(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function qe(R){const z=R.target;z.removeEventListener("dispose",qe),yt(z)}function yt(R){Ft(R),ye.remove(R)}function Ft(R){const z=ye.get(R).programs;z!==void 0&&(z.forEach(function(Y){Ie.releaseProgram(Y)}),R.isShaderMaterial&&Ie.releaseShaderCache(R))}this.renderBufferDirect=function(R,z,Y,q,H,he){z===null&&(z=We);const xe=H.isMesh&&H.matrixWorld.determinant()<0,Te=nh(R,z,Y,q,H);fe.setMaterial(q,xe);let Re=Y.index,Ge=1;if(q.wireframe===!0){if(Re=se.getWireframeAttribute(Y),Re===void 0)return;Ge=2}const Xe=Y.drawRange,Oe=Y.attributes.position;let st=Xe.start*Ge,ht=(Xe.start+Xe.count)*Ge;he!==null&&(st=Math.max(st,he.start*Ge),ht=Math.min(ht,(he.start+he.count)*Ge)),Re!==null?(st=Math.max(st,0),ht=Math.min(ht,Re.count)):Oe!=null&&(st=Math.max(st,0),ht=Math.min(ht,Oe.count));const St=ht-st;if(St<0||St===1/0)return;gt.setup(H,q,Te,Y,Re);let Mt,rt=Ce;if(Re!==null&&(Mt=J.get(Re),rt=it,rt.setIndex(Mt)),H.isMesh)q.wireframe===!0?(fe.setLineWidth(q.wireframeLinewidth*le()),rt.setMode(D.LINES)):rt.setMode(D.TRIANGLES);else if(H.isLine){let Be=q.linewidth;Be===void 0&&(Be=1),fe.setLineWidth(Be*le()),H.isLineSegments?rt.setMode(D.LINES):H.isLineLoop?rt.setMode(D.LINE_LOOP):rt.setMode(D.LINE_STRIP)}else H.isPoints?rt.setMode(D.POINTS):H.isSprite&&rt.setMode(D.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)rt.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(ce.get("WEBGL_multi_draw"))rt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Be=H._multiDrawStarts,Pt=H._multiDrawCounts,ut=H._multiDrawCount,cn=Re?J.get(Re).bytesPerElement:1,fi=ye.get(q).currentProgram.getUniforms();for(let qt=0;qt<ut;qt++)fi.setValue(D,"_gl_DrawID",qt),rt.render(Be[qt]/cn,Pt[qt])}else if(H.isInstancedMesh)rt.renderInstances(st,St,H.count);else if(Y.isInstancedBufferGeometry){const Be=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Pt=Math.min(Y.instanceCount,Be);rt.renderInstances(st,St,Pt)}else rt.render(st,St)};function ft(R,z,Y){R.transparent===!0&&R.side===Ut&&R.forceSinglePass===!1?(R.side=Gt,R.needsUpdate=!0,ws(R,z,Y),R.side=Wn,R.needsUpdate=!0,ws(R,z,Y),R.side=Ut):ws(R,z,Y)}this.compile=function(R,z,Y=null){Y===null&&(Y=R),g=tt.get(Y),g.init(z),M.push(g),Y.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(g.pushLight(H),H.castShadow&&g.pushShadow(H))}),R!==Y&&R.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(g.pushLight(H),H.castShadow&&g.pushShadow(H))}),g.setupLights();const q=new Set;return R.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const he=H.material;if(he)if(Array.isArray(he))for(let xe=0;xe<he.length;xe++){const Te=he[xe];ft(Te,Y,H),q.add(Te)}else ft(he,Y,H),q.add(he)}),M.pop(),g=null,q},this.compileAsync=function(R,z,Y=null){const q=this.compile(R,z,Y);return new Promise(H=>{function he(){if(q.forEach(function(xe){ye.get(xe).currentProgram.isReady()&&q.delete(xe)}),q.size===0){H(R);return}setTimeout(he,10)}ce.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let ln=null;function Sn(R){ln&&ln(R)}function Ca(){qn.stop()}function Ra(){qn.start()}const qn=new Yc;qn.setAnimationLoop(Sn),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(R){ln=R,$.setAnimationLoop(R),R===null?qn.stop():qn.start()},$.addEventListener("sessionstart",Ca),$.addEventListener("sessionend",Ra),this.render=function(R,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(z),z=$.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,z,b),g=tt.get(R,M.length),g.init(z),M.push(g),de.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),N.setFromProjectionMatrix(de),ee=this.localClippingEnabled,X=ue.init(this.clippingPlanes,ee),m=we.get(R,T.length),m.init(),T.push(m),$.enabled===!0&&$.isPresenting===!0){const he=x.xr.getDepthSensingMesh();he!==null&&br(he,z,-1/0,x.sortObjects)}br(R,z,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ie,re),Q=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Q&&ze.addToRenderList(m,R),this.info.render.frame++,X===!0&&ue.beginShadows();const Y=g.state.shadowsArray;Ae.render(Y,R,z),X===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,H=m.transmissive;if(g.setupLights(),z.isArrayCamera){const he=z.cameras;if(H.length>0)for(let xe=0,Te=he.length;xe<Te;xe++){const Re=he[xe];La(q,H,R,Re)}Q&&ze.render(R);for(let xe=0,Te=he.length;xe<Te;xe++){const Re=he[xe];Pa(m,R,Re,Re.viewport)}}else H.length>0&&La(q,H,R,z),Q&&ze.render(R),Pa(m,R,z);b!==null&&(L.updateMultisampleRenderTarget(b),L.updateRenderTargetMipmap(b)),R.isScene===!0&&R.onAfterRender(x,R,z),gt.resetDefaultState(),S=-1,E=null,M.pop(),M.length>0?(g=M[M.length-1],X===!0&&ue.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function br(R,z,Y,q){if(R.visible===!1)return;if(R.layers.test(z.layers)){if(R.isGroup)Y=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(z);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||N.intersectsSprite(R)){q&&be.setFromMatrixPosition(R.matrixWorld).applyMatrix4(de);const xe=j.update(R),Te=R.material;Te.visible&&m.push(R,xe,Te,Y,be.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||N.intersectsObject(R))){const xe=j.update(R),Te=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),be.copy(R.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),be.copy(xe.boundingSphere.center)),be.applyMatrix4(R.matrixWorld).applyMatrix4(de)),Array.isArray(Te)){const Re=xe.groups;for(let Ge=0,Xe=Re.length;Ge<Xe;Ge++){const Oe=Re[Ge],st=Te[Oe.materialIndex];st&&st.visible&&m.push(R,xe,st,Y,be.z,Oe)}}else Te.visible&&m.push(R,xe,Te,Y,be.z,null)}}const he=R.children;for(let xe=0,Te=he.length;xe<Te;xe++)br(he[xe],z,Y,q)}function Pa(R,z,Y,q){const H=R.opaque,he=R.transmissive,xe=R.transparent;g.setupLightsView(Y),X===!0&&ue.setGlobalState(x.clippingPlanes,Y),q&&fe.viewport(A.copy(q)),H.length>0&&Ss(H,z,Y),he.length>0&&Ss(he,z,Y),xe.length>0&&Ss(xe,z,Y),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function La(R,z,Y,q){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[q.id]===void 0&&(g.state.transmissionRenderTarget[q.id]=new ci(1,1,{generateMipmaps:!0,type:ce.has("EXT_color_buffer_half_float")||ce.has("EXT_color_buffer_float")?ms:Dn,minFilter:oi,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:lt.workingColorSpace}));const he=g.state.transmissionRenderTarget[q.id],xe=q.viewport||A;he.setSize(xe.z,xe.w);const Te=x.getRenderTarget();x.setRenderTarget(he),x.getClearColor(F),k=x.getClearAlpha(),k<1&&x.setClearColor(16777215,.5),x.clear(),Q&&ze.render(Y);const Re=x.toneMapping;x.toneMapping=Hn;const Ge=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),g.setupLightsView(q),X===!0&&ue.setGlobalState(x.clippingPlanes,q),Ss(R,Y,q),L.updateMultisampleRenderTarget(he),L.updateRenderTargetMipmap(he),ce.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Oe=0,st=z.length;Oe<st;Oe++){const ht=z[Oe],St=ht.object,Mt=ht.geometry,rt=ht.material,Be=ht.group;if(rt.side===Ut&&St.layers.test(q.layers)){const Pt=rt.side;rt.side=Gt,rt.needsUpdate=!0,Ia(St,Y,q,Mt,rt,Be),rt.side=Pt,rt.needsUpdate=!0,Xe=!0}}Xe===!0&&(L.updateMultisampleRenderTarget(he),L.updateRenderTargetMipmap(he))}x.setRenderTarget(Te),x.setClearColor(F,k),Ge!==void 0&&(q.viewport=Ge),x.toneMapping=Re}function Ss(R,z,Y){const q=z.isScene===!0?z.overrideMaterial:null;for(let H=0,he=R.length;H<he;H++){const xe=R[H],Te=xe.object,Re=xe.geometry,Ge=q===null?xe.material:q,Xe=xe.group;Te.layers.test(Y.layers)&&Ia(Te,z,Y,Re,Ge,Xe)}}function Ia(R,z,Y,q,H,he){R.onBeforeRender(x,z,Y,q,H,he),R.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),H.onBeforeRender(x,z,Y,q,R,he),H.transparent===!0&&H.side===Ut&&H.forceSinglePass===!1?(H.side=Gt,H.needsUpdate=!0,x.renderBufferDirect(Y,z,q,H,R,he),H.side=Wn,H.needsUpdate=!0,x.renderBufferDirect(Y,z,q,H,R,he),H.side=Ut):x.renderBufferDirect(Y,z,q,H,R,he),R.onAfterRender(x,z,Y,q,H,he)}function ws(R,z,Y){z.isScene!==!0&&(z=We);const q=ye.get(R),H=g.state.lights,he=g.state.shadowsArray,xe=H.state.version,Te=Ie.getParameters(R,H.state,he,z,Y),Re=Ie.getProgramCacheKey(Te);let Ge=q.programs;q.environment=R.isMeshStandardMaterial?z.environment:null,q.fog=z.fog,q.envMap=(R.isMeshStandardMaterial?W:C).get(R.envMap||q.environment),q.envMapRotation=q.environment!==null&&R.envMap===null?z.environmentRotation:R.envMapRotation,Ge===void 0&&(R.addEventListener("dispose",qe),Ge=new Map,q.programs=Ge);let Xe=Ge.get(Re);if(Xe!==void 0){if(q.currentProgram===Xe&&q.lightsStateVersion===xe)return Ua(R,Te),Xe}else Te.uniforms=Ie.getUniforms(R),R.onBeforeCompile(Te,x),Xe=Ie.acquireProgram(Te,Re),Ge.set(Re,Xe),q.uniforms=Te.uniforms;const Oe=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Oe.clippingPlanes=ue.uniform),Ua(R,Te),q.needsLights=sh(R),q.lightsStateVersion=xe,q.needsLights&&(Oe.ambientLightColor.value=H.state.ambient,Oe.lightProbe.value=H.state.probe,Oe.directionalLights.value=H.state.directional,Oe.directionalLightShadows.value=H.state.directionalShadow,Oe.spotLights.value=H.state.spot,Oe.spotLightShadows.value=H.state.spotShadow,Oe.rectAreaLights.value=H.state.rectArea,Oe.ltc_1.value=H.state.rectAreaLTC1,Oe.ltc_2.value=H.state.rectAreaLTC2,Oe.pointLights.value=H.state.point,Oe.pointLightShadows.value=H.state.pointShadow,Oe.hemisphereLights.value=H.state.hemi,Oe.directionalShadowMap.value=H.state.directionalShadowMap,Oe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Oe.spotShadowMap.value=H.state.spotShadowMap,Oe.spotLightMatrix.value=H.state.spotLightMatrix,Oe.spotLightMap.value=H.state.spotLightMap,Oe.pointShadowMap.value=H.state.pointShadowMap,Oe.pointShadowMatrix.value=H.state.pointShadowMatrix),q.currentProgram=Xe,q.uniformsList=null,Xe}function Da(R){if(R.uniformsList===null){const z=R.currentProgram.getUniforms();R.uniformsList=ar.seqWithValue(z.seq,R.uniforms)}return R.uniformsList}function Ua(R,z){const Y=ye.get(R);Y.outputColorSpace=z.outputColorSpace,Y.batching=z.batching,Y.batchingColor=z.batchingColor,Y.instancing=z.instancing,Y.instancingColor=z.instancingColor,Y.instancingMorph=z.instancingMorph,Y.skinning=z.skinning,Y.morphTargets=z.morphTargets,Y.morphNormals=z.morphNormals,Y.morphColors=z.morphColors,Y.morphTargetsCount=z.morphTargetsCount,Y.numClippingPlanes=z.numClippingPlanes,Y.numIntersection=z.numClipIntersection,Y.vertexAlphas=z.vertexAlphas,Y.vertexTangents=z.vertexTangents,Y.toneMapping=z.toneMapping}function nh(R,z,Y,q,H){z.isScene!==!0&&(z=We),L.resetTextureUnits();const he=z.fog,xe=q.isMeshStandardMaterial?z.environment:null,Te=b===null?x.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Vi,Re=(q.isMeshStandardMaterial?W:C).get(q.envMap||xe),Ge=q.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Xe=!!Y.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Oe=!!Y.morphAttributes.position,st=!!Y.morphAttributes.normal,ht=!!Y.morphAttributes.color;let St=Hn;q.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(St=x.toneMapping);const Mt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,rt=Mt!==void 0?Mt.length:0,Be=ye.get(q),Pt=g.state.lights;if(X===!0&&(ee===!0||R!==E)){const kt=R===E&&q.id===S;ue.setState(q,R,kt)}let ut=!1;q.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==Pt.state.version||Be.outputColorSpace!==Te||H.isBatchedMesh&&Be.batching===!1||!H.isBatchedMesh&&Be.batching===!0||H.isBatchedMesh&&Be.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Be.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Be.instancing===!1||!H.isInstancedMesh&&Be.instancing===!0||H.isSkinnedMesh&&Be.skinning===!1||!H.isSkinnedMesh&&Be.skinning===!0||H.isInstancedMesh&&Be.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Be.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Be.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Be.instancingMorph===!1&&H.morphTexture!==null||Be.envMap!==Re||q.fog===!0&&Be.fog!==he||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==ue.numPlanes||Be.numIntersection!==ue.numIntersection)||Be.vertexAlphas!==Ge||Be.vertexTangents!==Xe||Be.morphTargets!==Oe||Be.morphNormals!==st||Be.morphColors!==ht||Be.toneMapping!==St||Be.morphTargetsCount!==rt)&&(ut=!0):(ut=!0,Be.__version=q.version);let cn=Be.currentProgram;ut===!0&&(cn=ws(q,z,H));let fi=!1,qt=!1,qi=!1;const xt=cn.getUniforms(),en=Be.uniforms;if(fe.useProgram(cn.program)&&(fi=!0,qt=!0,qi=!0),q.id!==S&&(S=q.id,qt=!0),fi||E!==R){fe.buffers.depth.getReversed()?(K.copy(R.projectionMatrix),fu(K),du(K),xt.setValue(D,"projectionMatrix",K)):xt.setValue(D,"projectionMatrix",R.projectionMatrix),xt.setValue(D,"viewMatrix",R.matrixWorldInverse);const Wt=xt.map.cameraPosition;Wt!==void 0&&Wt.setValue(D,Le.setFromMatrixPosition(R.matrixWorld)),Ee.logarithmicDepthBuffer&&xt.setValue(D,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&xt.setValue(D,"isOrthographic",R.isOrthographicCamera===!0),E!==R&&(E=R,qt=!0,qi=!0)}if(H.isSkinnedMesh){xt.setOptional(D,H,"bindMatrix"),xt.setOptional(D,H,"bindMatrixInverse");const kt=H.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),xt.setValue(D,"boneTexture",kt.boneTexture,L))}H.isBatchedMesh&&(xt.setOptional(D,H,"batchingTexture"),xt.setValue(D,"batchingTexture",H._matricesTexture,L),xt.setOptional(D,H,"batchingIdTexture"),xt.setValue(D,"batchingIdTexture",H._indirectTexture,L),xt.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&xt.setValue(D,"batchingColorTexture",H._colorsTexture,L));const tn=Y.morphAttributes;if((tn.position!==void 0||tn.normal!==void 0||tn.color!==void 0)&&He.update(H,Y,cn),(qt||Be.receiveShadow!==H.receiveShadow)&&(Be.receiveShadow=H.receiveShadow,xt.setValue(D,"receiveShadow",H.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(en.envMap.value=Re,en.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&z.environment!==null&&(en.envMapIntensity.value=z.environmentIntensity),qt&&(xt.setValue(D,"toneMappingExposure",x.toneMappingExposure),Be.needsLights&&ih(en,qi),he&&q.fog===!0&&ge.refreshFogUniforms(en,he),ge.refreshMaterialUniforms(en,q,G,Z,g.state.transmissionRenderTarget[R.id]),ar.upload(D,Da(Be),en,L)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(ar.upload(D,Da(Be),en,L),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&xt.setValue(D,"center",H.center),xt.setValue(D,"modelViewMatrix",H.modelViewMatrix),xt.setValue(D,"normalMatrix",H.normalMatrix),xt.setValue(D,"modelMatrix",H.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const kt=q.uniformsGroups;for(let Wt=0,Ar=kt.length;Wt<Ar;Wt++){const Zn=kt[Wt];B.update(Zn,cn),B.bind(Zn,cn)}}return cn}function ih(R,z){R.ambientLightColor.needsUpdate=z,R.lightProbe.needsUpdate=z,R.directionalLights.needsUpdate=z,R.directionalLightShadows.needsUpdate=z,R.pointLights.needsUpdate=z,R.pointLightShadows.needsUpdate=z,R.spotLights.needsUpdate=z,R.spotLightShadows.needsUpdate=z,R.rectAreaLights.needsUpdate=z,R.hemisphereLights.needsUpdate=z}function sh(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return _},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(R,z,Y){ye.get(R.texture).__webglTexture=z,ye.get(R.depthTexture).__webglTexture=Y;const q=ye.get(R);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=Y===void 0,q.__autoAllocateDepthBuffer||ce.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,z){const Y=ye.get(R);Y.__webglFramebuffer=z,Y.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(R,z=0,Y=0){b=R,y=z,_=Y;let q=!0,H=null,he=!1,xe=!1;if(R){const Re=ye.get(R);if(Re.__useDefaultFramebuffer!==void 0)fe.bindFramebuffer(D.FRAMEBUFFER,null),q=!1;else if(Re.__webglFramebuffer===void 0)L.setupRenderTarget(R);else if(Re.__hasExternalTextures)L.rebindTextures(R,ye.get(R.texture).__webglTexture,ye.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Oe=R.depthTexture;if(Re.__boundDepthTexture!==Oe){if(Oe!==null&&ye.has(Oe)&&(R.width!==Oe.image.width||R.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(R)}}const Ge=R.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(xe=!0);const Xe=ye.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Xe[z])?H=Xe[z][Y]:H=Xe[z],he=!0):R.samples>0&&L.useMultisampledRTT(R)===!1?H=ye.get(R).__webglMultisampledFramebuffer:Array.isArray(Xe)?H=Xe[Y]:H=Xe,A.copy(R.viewport),U.copy(R.scissor),I=R.scissorTest}else A.copy(te).multiplyScalar(G).floor(),U.copy(Se).multiplyScalar(G).floor(),I=De;if(fe.bindFramebuffer(D.FRAMEBUFFER,H)&&q&&fe.drawBuffers(R,H),fe.viewport(A),fe.scissor(U),fe.setScissorTest(I),he){const Re=ye.get(R.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+z,Re.__webglTexture,Y)}else if(xe){const Re=ye.get(R.texture),Ge=z||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Re.__webglTexture,Y||0,Ge)}S=-1},this.readRenderTargetPixels=function(R,z,Y,q,H,he,xe){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=ye.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&xe!==void 0&&(Te=Te[xe]),Te){fe.bindFramebuffer(D.FRAMEBUFFER,Te);try{const Re=R.texture,Ge=Re.format,Xe=Re.type;if(!Ee.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ee.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=R.width-q&&Y>=0&&Y<=R.height-H&&D.readPixels(z,Y,q,H,Ke.convert(Ge),Ke.convert(Xe),he)}finally{const Re=b!==null?ye.get(b).__webglFramebuffer:null;fe.bindFramebuffer(D.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(R,z,Y,q,H,he,xe){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=ye.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&xe!==void 0&&(Te=Te[xe]),Te){const Re=R.texture,Ge=Re.format,Xe=Re.type;if(!Ee.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ee.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=R.width-q&&Y>=0&&Y<=R.height-H){fe.bindFramebuffer(D.FRAMEBUFFER,Te);const Oe=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Oe),D.bufferData(D.PIXEL_PACK_BUFFER,he.byteLength,D.STREAM_READ),D.readPixels(z,Y,q,H,Ke.convert(Ge),Ke.convert(Xe),0);const st=b!==null?ye.get(b).__webglFramebuffer:null;fe.bindFramebuffer(D.FRAMEBUFFER,st);const ht=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await uu(D,ht,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Oe),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,he),D.deleteBuffer(Oe),D.deleteSync(ht),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,z=null,Y=0){R.isTexture!==!0&&(Pi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,R=arguments[1]);const q=Math.pow(2,-Y),H=Math.floor(R.image.width*q),he=Math.floor(R.image.height*q),xe=z!==null?z.x:0,Te=z!==null?z.y:0;L.setTexture2D(R,0),D.copyTexSubImage2D(D.TEXTURE_2D,Y,0,0,xe,Te,H,he),fe.unbindTexture()};const rh=D.createFramebuffer(),oh=D.createFramebuffer();this.copyTextureToTexture=function(R,z,Y=null,q=null,H=0,he=null){R.isTexture!==!0&&(Pi("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,R=arguments[1],z=arguments[2],he=arguments[3]||0,Y=null),he===null&&(H!==0?(Pi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),he=H,H=0):he=0);let xe,Te,Re,Ge,Xe,Oe,st,ht,St;const Mt=R.isCompressedTexture?R.mipmaps[he]:R.image;if(Y!==null)xe=Y.max.x-Y.min.x,Te=Y.max.y-Y.min.y,Re=Y.isBox3?Y.max.z-Y.min.z:1,Ge=Y.min.x,Xe=Y.min.y,Oe=Y.isBox3?Y.min.z:0;else{const tn=Math.pow(2,-H);xe=Math.floor(Mt.width*tn),Te=Math.floor(Mt.height*tn),R.isDataArrayTexture?Re=Mt.depth:R.isData3DTexture?Re=Math.floor(Mt.depth*tn):Re=1,Ge=0,Xe=0,Oe=0}q!==null?(st=q.x,ht=q.y,St=q.z):(st=0,ht=0,St=0);const rt=Ke.convert(z.format),Be=Ke.convert(z.type);let Pt;z.isData3DTexture?(L.setTexture3D(z,0),Pt=D.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(L.setTexture2DArray(z,0),Pt=D.TEXTURE_2D_ARRAY):(L.setTexture2D(z,0),Pt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,z.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,z.unpackAlignment);const ut=D.getParameter(D.UNPACK_ROW_LENGTH),cn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),fi=D.getParameter(D.UNPACK_SKIP_PIXELS),qt=D.getParameter(D.UNPACK_SKIP_ROWS),qi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Mt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Mt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ge),D.pixelStorei(D.UNPACK_SKIP_ROWS,Xe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Oe);const xt=R.isDataArrayTexture||R.isData3DTexture,en=z.isDataArrayTexture||z.isData3DTexture;if(R.isDepthTexture){const tn=ye.get(R),kt=ye.get(z),Wt=ye.get(tn.__renderTarget),Ar=ye.get(kt.__renderTarget);fe.bindFramebuffer(D.READ_FRAMEBUFFER,Wt.__webglFramebuffer),fe.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ar.__webglFramebuffer);for(let Zn=0;Zn<Re;Zn++)xt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ye.get(R).__webglTexture,H,Oe+Zn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ye.get(z).__webglTexture,he,St+Zn)),D.blitFramebuffer(Ge,Xe,xe,Te,st,ht,xe,Te,D.DEPTH_BUFFER_BIT,D.NEAREST);fe.bindFramebuffer(D.READ_FRAMEBUFFER,null),fe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(H!==0||R.isRenderTargetTexture||ye.has(R)){const tn=ye.get(R),kt=ye.get(z);fe.bindFramebuffer(D.READ_FRAMEBUFFER,rh),fe.bindFramebuffer(D.DRAW_FRAMEBUFFER,oh);for(let Wt=0;Wt<Re;Wt++)xt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,tn.__webglTexture,H,Oe+Wt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,tn.__webglTexture,H),en?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,kt.__webglTexture,he,St+Wt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,kt.__webglTexture,he),H!==0?D.blitFramebuffer(Ge,Xe,xe,Te,st,ht,xe,Te,D.COLOR_BUFFER_BIT,D.NEAREST):en?D.copyTexSubImage3D(Pt,he,st,ht,St+Wt,Ge,Xe,xe,Te):D.copyTexSubImage2D(Pt,he,st,ht,Ge,Xe,xe,Te);fe.bindFramebuffer(D.READ_FRAMEBUFFER,null),fe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else en?R.isDataTexture||R.isData3DTexture?D.texSubImage3D(Pt,he,st,ht,St,xe,Te,Re,rt,Be,Mt.data):z.isCompressedArrayTexture?D.compressedTexSubImage3D(Pt,he,st,ht,St,xe,Te,Re,rt,Mt.data):D.texSubImage3D(Pt,he,st,ht,St,xe,Te,Re,rt,Be,Mt):R.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,he,st,ht,xe,Te,rt,Be,Mt.data):R.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,he,st,ht,Mt.width,Mt.height,rt,Mt.data):D.texSubImage2D(D.TEXTURE_2D,he,st,ht,xe,Te,rt,Be,Mt);D.pixelStorei(D.UNPACK_ROW_LENGTH,ut),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,cn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,fi),D.pixelStorei(D.UNPACK_SKIP_ROWS,qt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,qi),he===0&&z.generateMipmaps&&D.generateMipmap(Pt),fe.unbindTexture()},this.copyTextureToTexture3D=function(R,z,Y=null,q=null,H=0){return R.isTexture!==!0&&(Pi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,q=arguments[1]||null,R=arguments[2],z=arguments[3],H=arguments[4]||0),Pi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,z,Y,q,H)},this.initRenderTarget=function(R){ye.get(R).__webglFramebuffer===void 0&&L.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?L.setTextureCube(R,0):R.isData3DTexture?L.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?L.setTexture2DArray(R,0):L.setTexture2D(R,0),fe.unbindTexture()},this.resetState=function(){y=0,_=0,b=null,fe.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}}function Jc(r,e=!1){const t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),s=new Set(Object.keys(r[0].morphAttributes)),i={},a={},o=r[0].morphTargetsRelative,l=new Nt;let h=0;for(let u=0;u<r.length;++u){const d=r[u];let f=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const c in d.attributes){if(!n.has(c))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+c+'" attribute exists among all geometries, or in none of them.'),null;i[c]===void 0&&(i[c]=[]),i[c].push(d.attributes[c]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const c in d.morphAttributes){if(!s.has(c))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[c]===void 0&&(a[c]=[]),a[c].push(d.morphAttributes[c])}if(e){let c;if(t)c=d.index.count;else if(d.attributes.position!==void 0)c=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,c,u),h+=c}}if(t){let u=0;const d=[];for(let f=0;f<r.length;++f){const c=r[f].index;for(let p=0;p<c.count;++p)d.push(c.getX(p)+u);u+=r[f].attributes.position.count}l.setIndex(d)}for(const u in i){const d=Xl(i[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(const u in a){const d=a[u][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<d;++f){const c=[];for(let v=0;v<a[u].length;++v)c.push(a[u][v][f]);const p=Xl(c);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(p)}}return l}function Xl(r){let e,t,n,s=-1,i=0;for(let h=0;h<r.length;++h){const u=r[h];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;i+=u.count*t}const a=new e(i),o=new Yt(a,t,n);let l=0;for(let h=0;h<r.length;++h){const u=r[h];if(u.isInterleavedBufferAttribute){const d=l/t;for(let f=0,c=u.count;f<c;f++)for(let p=0;p<t;p++){const v=u.getComponent(f,p);o.setComponent(f+d,p,v)}}else a.set(u.array,l);l+=u.count*t}return s!==void 0&&(o.gpuType=s),o}const Ks=new Map,cg=5,ss=(r,e=!1)=>{if(!Ks.has(r))Ks.set(r,1);else{const t=Ks.get(r);if(typeof t>"u"||t>=cg)return;Ks.set(r,t+1)}e?console.error(`%c [enable3d] ${r} `,"background: #222; color: #bada55"):console.warn(`%c [enable3d] ${r} `,"background: #222; color: #bada55")};/**
 * @author       Kevin Lee (https://github.com/InfiniteLee)
 * @copyright    Copyright (c) 2020 Kevin Lee; Project Url: https://github.com/InfiniteLee/three-to-ammo
 * @license      {@link https://github.com/InfiniteLee/three-to-ammo/blob/master/LICENSE|MPL-2.0}
 */const ys={HULL:"hull",HACD:"hacd",VHACD:"vhacd",MESH:"mesh"},Ms={ALL:"all",MANUAL:"manual"};(function(){const r=new P,e=new P,t=new Qe;return function(n,s,i,a={}){if(a.type=ys.HULL,Er(a),a.fit===Ms.MANUAL)return console.warn("cannot use fit: manual with type: hull"),null;const o=Aa(n,s),l=new Ammo.btVector3,h=new Ammo.btConvexHullShape;h.setMargin(a.margin),e.addVectors(o.max,o.min).multiplyScalar(.5);let u=0;for(let p=0;p<n.length;p++)u+=n[p].length/3;const d=a.hullMaxVertices||1e5;u>d&&console.warn(`too many vertices for hull shape; sampling ~${d} from ~${u} vertices`);const f=Math.min(1,d/u);for(let p=0;p<n.length;p++){const v=n[p];t.fromArray(s[p]);for(let m=0;m<v.length;m+=3){const g=p===n.length-1&&m===v.length-3;(Math.random()<=f||g)&&(r.set(v[m],v[m+1],v[m+2]).applyMatrix4(t).sub(e),l.setValue(r.x,r.y,r.z),h.addPoint(l,g))}}let c=h;if(h.getNumVertices()>=100){const p=new Ammo.btShapeHull(h);p.buildHull(a.margin),Ammo.destroy(h),c=new Ammo.btConvexHullShape(Ammo.getPointer(p.getVertexPointer()),p.numVertices()),Ammo.destroy(p)}return Ammo.destroy(l),hg(c,a,Tr(i,a)),c}})();(function(){const r=new P,e=new P,t=new Qe;return function(n,s,i,a,o={}){if(o.type=ys.HACD,Er(o),o.fit===Ms.MANUAL)return console.warn("cannot use fit: manual with type: hacd"),[];if(!Ammo.hasOwnProperty("HACD"))return console.warn("HACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."),[];const l=Aa(n,s);Tr(a,o);let h=0,u=0;e.addVectors(l.max,l.min).multiplyScalar(.5);for(let T=0;T<n.length;T++)h+=n[T].length/3,i&&i[T]?u+=i[T].length/3:u+=n[T].length/9;const d=new Ammo.HACD;o.hasOwnProperty("compacityWeight")&&d.SetCompacityWeight(o.compacityWeight),o.hasOwnProperty("volumeWeight")&&d.SetVolumeWeight(o.volumeWeight),o.hasOwnProperty("nClusters")&&d.SetNClusters(o.nClusters),o.hasOwnProperty("nVerticesPerCH")&&d.SetNVerticesPerCH(o.nVerticesPerCH),o.hasOwnProperty("concavity")&&d.SetConcavity(o.concavity);const f=Ammo._malloc(h*3*8),c=Ammo._malloc(u*3*4);d.SetPoints(f),d.SetTriangles(c),d.SetNPoints(h),d.SetNTriangles(u);let p=f/8,v=c/4;for(let T=0;T<n.length;T++){const M=n[T];t.fromArray(s[T]);for(let x=0;x<M.length;x+=3)r.set(M[x+0],M[x+1],M[x+2]).applyMatrix4(t).sub(e),Ammo.HEAPF64[p+0]=r.x,Ammo.HEAPF64[p+1]=r.y,Ammo.HEAPF64[p+2]=r.z,p+=3;if(i[T]){const x=i[T];for(let w=0;w<x.length;w++)Ammo.HEAP32[v]=x[w],v++}else for(let x=0;x<M.length/3;x++)Ammo.HEAP32[v]=x,v++}d.Compute(),Ammo._free(f),Ammo._free(c);const m=d.GetNClusters(),g=[];for(let T=0;T<m;T++){const M=new Ammo.btConvexHullShape;M.setMargin(o.margin);const x=d.GetNPointsCH(T),w=d.GetNTrianglesCH(T),y=Ammo._malloc(x*3*8),_=Ammo._malloc(w*3*4);d.GetCH(T,y,_);const b=y/8;for(let S=0;S<x;S++){const E=new Ammo.btVector3,A=Ammo.HEAPF64[b+S*3+0],U=Ammo.HEAPF64[b+S*3+1],I=Ammo.HEAPF64[b+S*3+2];E.setValue(A,U,I),M.addPoint(E,S===x-1),Ammo.destroy(E)}g.push(M)}return g}})();(function(){const r=new P,e=new P,t=new Qe;return function(n,s,i,a,o={}){if(o.type=ys.VHACD,Er(o),o.fit===Ms.MANUAL)return console.warn("cannot use fit: manual with type: vhacd"),[];if(!Ammo.hasOwnProperty("VHACD"))return console.warn("VHACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."),[];const l=Aa(n,s);Tr(a,o);let h=0,u=0;e.addVectors(l.max,l.min).multiplyScalar(.5);for(let x=0;x<n.length;x++)h+=n[x].length/3,i&&i[x]?u+=i[x].length/3:u+=n[x].length/9;const d=new Ammo.VHACD,f=new Ammo.Parameters;o.hasOwnProperty("resolution")&&f.set_m_resolution(o.resolution),o.hasOwnProperty("depth")&&f.set_m_depth(o.depth),o.hasOwnProperty("concavity")&&f.set_m_concavity(o.concavity),o.hasOwnProperty("planeDownsampling")&&f.set_m_planeDownsampling(o.planeDownsampling),o.hasOwnProperty("convexhullDownsampling")&&f.set_m_convexhullDownsampling(o.convexhullDownsampling),o.hasOwnProperty("alpha")&&f.set_m_alpha(o.alpha),o.hasOwnProperty("beta")&&f.set_m_beta(o.beta),o.hasOwnProperty("gamma")&&f.set_m_gamma(o.gamma),o.hasOwnProperty("pca")&&f.set_m_pca(o.pca),o.hasOwnProperty("mode")&&f.set_m_mode(o.mode),o.hasOwnProperty("maxNumVerticesPerCH")&&f.set_m_maxNumVerticesPerCH(o.maxNumVerticesPerCH),o.hasOwnProperty("minVolumePerCH")&&f.set_m_minVolumePerCH(o.minVolumePerCH),o.hasOwnProperty("convexhullApproximation")&&f.set_m_convexhullApproximation(o.convexhullApproximation),o.hasOwnProperty("oclAcceleration")&&f.set_m_oclAcceleration(o.oclAcceleration);const c=Ammo._malloc(h*3*8+3),p=Ammo._malloc(u*3*4);let v=c/8,m=p/4;for(let x=0;x<n.length;x++){const w=n[x];t.fromArray(s[x]);for(let y=0;y<w.length;y+=3)r.set(w[y+0],w[y+1],w[y+2]).applyMatrix4(t).sub(e),Ammo.HEAPF64[v+0]=r.x,Ammo.HEAPF64[v+1]=r.y,Ammo.HEAPF64[v+2]=r.z,v+=3;if(i[x]){const y=i[x];for(let _=0;_<y.length;_++)Ammo.HEAP32[m]=y[_],m++}else for(let y=0;y<w.length/3;y++)Ammo.HEAP32[m]=y,m++}d.Compute(c,3,h,p,3,u,f),Ammo._free(c),Ammo._free(p);const g=d.GetNConvexHulls(),T=[],M=new Ammo.ConvexHull;for(let x=0;x<g;x++){d.GetConvexHull(x,M);const w=M.get_m_nPoints();M.get_m_points();const y=new Ammo.btConvexHullShape;y.setMargin(o.margin);for(let _=0;_<w;_++){const b=new Ammo.btVector3,S=M.get_m_points(_*3+0),E=M.get_m_points(_*3+1),A=M.get_m_points(_*3+2);b.setValue(S,E,A),y.addPoint(b,_===w-1),Ammo.destroy(b)}T.push(y)}return Ammo.destroy(M),Ammo.destroy(d),T}})();(function(){const r=new P,e=new P,t=new P,n=new Qe;return function(s,i,a,o,l={}){if(l.type=ys.MESH,Er(l),l.fit===Ms.MANUAL)return console.warn("cannot use fit: manual with type: mesh"),null;const h=Tr(o,l),u=new Ammo.btVector3,d=new Ammo.btVector3,f=new Ammo.btVector3,c=new Ammo.btTriangleMesh(!0,!1);for(let m=0;m<s.length;m++){const g=s[m],T=a[m]?a[m]:null;if(n.fromArray(i[m]),T)for(let M=0;M<T.length;M+=3){const x=T[M]*3,w=T[M+1]*3,y=T[M+2]*3;r.set(g[x],g[x+1],g[x+2]).applyMatrix4(n),e.set(g[w],g[w+1],g[w+2]).applyMatrix4(n),t.set(g[y],g[y+1],g[y+2]).applyMatrix4(n),u.setValue(r.x,r.y,r.z),d.setValue(e.x,e.y,e.z),f.setValue(t.x,t.y,t.z),c.addTriangle(u,d,f,!1)}else for(let M=0;M<g.length;M+=9)r.set(g[M+0],g[M+1],g[M+2]).applyMatrix4(n),e.set(g[M+3],g[M+4],g[M+5]).applyMatrix4(n),t.set(g[M+6],g[M+7],g[M+8]).applyMatrix4(n),u.setValue(r.x,r.y,r.z),d.setValue(e.x,e.y,e.z),f.setValue(t.x,t.y,t.z),c.addTriangle(u,d,f,!1)}const p=new Ammo.btVector3(h.x,h.y,h.z);c.setScaling(p),Ammo.destroy(p);let v;return l.concave?v=new Ammo.btBvhTriangleMeshShape(c,!0,!0):v=new Ammo.btConvexTriangleMeshShape(c,!0),v.resources=[c],Ammo.destroy(u),Ammo.destroy(d),Ammo.destroy(f),v}})();function Er(r){r.type=r.type||ys.HULL,r.margin=r.hasOwnProperty("margin")?r.margin:.01}const hg=function(r,e,t){};(function(){const r=new Qe;return function(e,t,n){parseInt(gr)>=123?r.copy(e.matrixWorld).invert():r.getInverse(e.matrixWorld),new P().setFromMatrixScale(e.matrixWorld),e.traverse(i=>{const a=new Qe;if(i.isMesh&&(t.includeInvisible||i.el&&i.el.object3D.visible||i.visible)){i===e?a.identity():(i.updateWorldMatrix(!0),a.multiplyMatrices(r,i.matrixWorld));let o;if(i.geometry.isBufferGeometry){const l=i.geometry.attributes.position;if(l.isInterleavedBufferAttribute){o=new Float32Array(l.count*l.itemSize);let h=l.offset,u=0;for(;u<o.length;){for(let d=0;d<l.itemSize;d++)o[u++]=l.array[h+d];h+=l.data.stride}}else o=l.array}n(i.geometry.isBufferGeometry?o:i.geometry.vertices,a.elements,i.geometry.index?i.geometry.index.array:null)}})}})();const Tr=(function(){const r=new Qe;return function(e,t={}){const n=new P(1,1,1);return t.fit===Ms.ALL&&(r.fromArray(e),n.setFromMatrixScale(r)),n}})();(function(){const r=new P;return function(e,t,n){let s=0,{x:i,y:a,z:o}=n.getCenter(r);return jc(e,t,l=>{const h=i-l.x,u=a-l.y,d=o-l.z;s=Math.max(s,h*h+u*u+d*d)}),Math.sqrt(s)}})();const Aa=function(r,e){const t=new Yn;let n=1/0,s=1/0,i=1/0,a=-1/0,o=-1/0,l=-1/0;return t.min.set(0,0,0),t.max.set(0,0,0),jc(r,e,h=>{h.x<n&&(n=h.x),h.y<s&&(s=h.y),h.z<i&&(i=h.z),h.x>a&&(a=h.x),h.y>o&&(o=h.y),h.z>l&&(l=h.z)}),t.min.set(n,s,i),t.max.set(a,o,l),t},jc=(function(){const r=new P,e=new Qe;return function(t,n,s){for(let i=0;i<t.length;i++){e.fromArray(n[i]);for(let a=0;a<t[i].length;a+=3)r.set(t[i][a],t[i][a+1],t[i][a+2]).applyMatrix4(e),s(r)}}})(),lr=0,ug=1,fg=new P,Yl=new Xc,lo=new pn,ql=new P,Js=new on;class dg{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new Zl,this.unassigned=new Zl,this.vertices=[]}setFromPoints(e){if(e.length>=4){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.vertices.push(new pg(e[t]));this.compute()}return this}setFromObject(e){const t=[];return e.updateMatrixWorld(!0),e.traverse(function(n){const s=n.geometry;if(s!==void 0){const i=s.attributes.position;if(i!==void 0)for(let a=0,o=i.count;a<o;a++){const l=new P;l.fromBufferAttribute(i,a).applyMatrix4(n.matrixWorld),t.push(l)}}}),this.setFromPoints(t)}containsPoint(e){const t=this.faces;for(let n=0,s=t.length;n<s;n++)if(t[n].distanceToPoint(e)>this.tolerance)return!1;return!0}intersectRay(e,t){const n=this.faces;let s=-1/0,i=1/0;for(let a=0,o=n.length;a<o;a++){const l=n[a],h=l.distanceToPoint(e.origin),u=l.normal.dot(e.direction);if(h>0&&u>=0)return null;const d=u!==0?-h/u:0;if(!(d<=0)&&(u>0?i=Math.min(d,i):s=Math.max(d,s),s>i))return null}return s!==-1/0?e.at(s,t):e.at(i,t),t}intersectsRay(e){return this.intersectRay(e,fg)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}addVertexToFace(e,t){return e.face=t,t.outside===null?this.assigned.append(e):this.assigned.insertBefore(t.outside,e),t.outside=e,this}removeVertexFromFace(e,t){return e===t.outside&&(e.next!==null&&e.next.face===t?t.outside=e.next:t.outside=null),this.assigned.remove(e),this}removeAllVerticesFromFace(e){if(e.outside!==null){const t=e.outside;let n=e.outside;for(;n.next!==null&&n.next.face===e;)n=n.next;return this.assigned.removeSubList(t,n),t.prev=n.next=null,e.outside=null,t}}deleteFaceVertices(e,t){const n=this.removeAllVerticesFromFace(e);if(n!==void 0)if(t===void 0)this.unassigned.appendChain(n);else{let s=n;do{const i=s.next;t.distanceToPoint(s.point)>this.tolerance?this.addVertexToFace(s,t):this.unassigned.append(s),s=i}while(s!==null)}return this}resolveUnassignedPoints(e){if(this.unassigned.isEmpty()===!1){let t=this.unassigned.first();do{const n=t.next;let s=this.tolerance,i=null;for(let a=0;a<e.length;a++){const o=e[a];if(o.mark===lr){const l=o.distanceToPoint(t.point);if(l>s&&(s=l,i=o),s>1e3*this.tolerance)break}}i!==null&&this.addVertexToFace(t,i),t=n}while(t!==null)}return this}computeExtremes(){const e=new P,t=new P,n=[],s=[];for(let i=0;i<3;i++)n[i]=s[i]=this.vertices[0];e.copy(this.vertices[0].point),t.copy(this.vertices[0].point);for(let i=0,a=this.vertices.length;i<a;i++){const o=this.vertices[i],l=o.point;for(let h=0;h<3;h++)l.getComponent(h)<e.getComponent(h)&&(e.setComponent(h,l.getComponent(h)),n[h]=o);for(let h=0;h<3;h++)l.getComponent(h)>t.getComponent(h)&&(t.setComponent(h,l.getComponent(h)),s[h]=o)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(e.x),Math.abs(t.x))+Math.max(Math.abs(e.y),Math.abs(t.y))+Math.max(Math.abs(e.z),Math.abs(t.z))),{min:n,max:s}}computeInitialHull(){const e=this.vertices,t=this.computeExtremes(),n=t.min,s=t.max;let i=0,a=0;for(let f=0;f<3;f++){const c=s[f].point.getComponent(f)-n[f].point.getComponent(f);c>i&&(i=c,a=f)}const o=n[a],l=s[a];let h,u;i=0,Yl.set(o.point,l.point);for(let f=0,c=this.vertices.length;f<c;f++){const p=e[f];if(p!==o&&p!==l){Yl.closestPointToPoint(p.point,!0,ql);const v=ql.distanceToSquared(p.point);v>i&&(i=v,h=p)}}i=-1,lo.setFromCoplanarPoints(o.point,l.point,h.point);for(let f=0,c=this.vertices.length;f<c;f++){const p=e[f];if(p!==o&&p!==l&&p!==h){const v=Math.abs(lo.distanceToPoint(p.point));v>i&&(i=v,u=p)}}const d=[];if(lo.distanceToPoint(u.point)<0){d.push(dn.create(o,l,h),dn.create(u,l,o),dn.create(u,h,l),dn.create(u,o,h));for(let f=0;f<3;f++){const c=(f+1)%3;d[f+1].getEdge(2).setTwin(d[0].getEdge(c)),d[f+1].getEdge(1).setTwin(d[c+1].getEdge(0))}}else{d.push(dn.create(o,h,l),dn.create(u,o,l),dn.create(u,l,h),dn.create(u,h,o));for(let f=0;f<3;f++){const c=(f+1)%3;d[f+1].getEdge(2).setTwin(d[0].getEdge((3-f)%3)),d[f+1].getEdge(0).setTwin(d[c+1].getEdge(1))}}for(let f=0;f<4;f++)this.faces.push(d[f]);for(let f=0,c=e.length;f<c;f++){const p=e[f];if(p!==o&&p!==l&&p!==h&&p!==u){i=this.tolerance;let v=null;for(let m=0;m<4;m++){const g=this.faces[m].distanceToPoint(p.point);g>i&&(i=g,v=this.faces[m])}v!==null&&this.addVertexToFace(p,v)}}return this}reindexFaces(){const e=[];for(let t=0;t<this.faces.length;t++){const n=this.faces[t];n.mark===lr&&e.push(n)}return this.faces=e,this}nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let e,t=0;const n=this.assigned.first().face;let s=n.outside;do{const i=n.distanceToPoint(s.point);i>t&&(t=i,e=s),s=s.next}while(s!==null&&s.face===n);return e}}computeHorizon(e,t,n,s){this.deleteFaceVertices(n),n.mark=ug;let i;t===null?i=t=n.getEdge(0):i=t.next;do{const a=i.twin,o=a.face;o.mark===lr&&(o.distanceToPoint(e)>this.tolerance?this.computeHorizon(e,a,o,s):s.push(i)),i=i.next}while(i!==t);return this}addAdjoiningFace(e,t){const n=dn.create(e,t.tail(),t.head());return this.faces.push(n),n.getEdge(-1).setTwin(t.twin),n.getEdge(0)}addNewFaces(e,t){this.newFaces=[];let n=null,s=null;for(let i=0;i<t.length;i++){const a=t[i],o=this.addAdjoiningFace(e,a);n===null?n=o:o.next.setTwin(s),this.newFaces.push(o.face),s=o}return n.next.setTwin(s),this}addVertexToHull(e){const t=[];return this.unassigned.clear(),this.removeVertexFromFace(e,e.face),this.computeHorizon(e.point,null,e.face,t),this.addNewFaces(e,t),this.resolveUnassignedPoints(this.newFaces),this}cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}compute(){let e;for(this.computeInitialHull();(e=this.nextVertexToAdd())!==void 0;)this.addVertexToHull(e);return this.reindexFaces(),this.cleanup(),this}}class dn{constructor(){this.normal=new P,this.midpoint=new P,this.area=0,this.constant=0,this.outside=null,this.mark=lr,this.edge=null}static create(e,t,n){const s=new dn,i=new co(e,s),a=new co(t,s),o=new co(n,s);return i.next=o.prev=a,a.next=i.prev=o,o.next=a.prev=i,s.edge=i,s.compute()}getEdge(e){let t=this.edge;for(;e>0;)t=t.next,e--;for(;e<0;)t=t.prev,e++;return t}compute(){const e=this.edge.tail(),t=this.edge.head(),n=this.edge.next.head();return Js.set(e.point,t.point,n.point),Js.getNormal(this.normal),Js.getMidpoint(this.midpoint),this.area=Js.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(e){return this.normal.dot(e)-this.constant}}class co{constructor(e,t){this.vertex=e,this.prev=null,this.next=null,this.twin=null,this.face=t}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const e=this.head(),t=this.tail();return t!==null?t.point.distanceTo(e.point):-1}lengthSquared(){const e=this.head(),t=this.tail();return t!==null?t.point.distanceToSquared(e.point):-1}setTwin(e){return this.twin=e,e.twin=this,this}}class pg{constructor(e){this.point=e,this.prev=null,this.next=null,this.face=null}}class Zl{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(e,t){return t.prev=e.prev,t.next=e,t.prev===null?this.head=t:t.prev.next=t,e.prev=t,this}insertAfter(e,t){return t.prev=e,t.next=e.next,t.next===null?this.tail=t:t.next.prev=t,e.next=t,this}append(e){return this.head===null?this.head=e:this.tail.next=e,e.prev=this.tail,e.next=null,this.tail=e,this}appendChain(e){for(this.head===null?this.head=e:this.tail.next=e,e.prev=this.tail;e.next!==null;)e=e.next;return this.tail=e,this}remove(e){return e.prev===null?this.head=e.next:e.prev.next=e.next,e.next===null?this.tail=e.prev:e.next.prev=e.prev,this}removeSubList(e,t){return e.prev===null?this.head=t.next:e.prev.next=t.next,t.next===null?this.tail=e.prev:t.next.prev=e.prev,this}isEmpty(){return this.head===null}}class mg extends Nt{constructor(e=[]){super();const t=[],n=[],i=new dg().setFromPoints(e).faces;for(let a=0;a<i.length;a++){const o=i[a];let l=o.edge;do{const h=l.head().point;t.push(h.x,h.y,h.z),n.push(o.normal.x,o.normal.y,o.normal.z),l=l.next}while(l!==o.edge)}this.setAttribute("position",new ct(t,3)),this.setAttribute("normal",new ct(n,3))}}const $l=r=>{const e=window.THREE&&window.THREE.ConvexGeometry?window.THREE.ConvexGeometry:mg;return new e(r)},In=function(r,e){this.minSizeForBreak=r||1.4,this.smallDelta=e||1e-4,this.tempLine1=new Xc,this.tempPlane1=new pn,this.tempPlane2=new pn,this.tempPlane_Cut=new pn,this.tempCM1=new P,this.tempCM2=new P,this.tempVector3=new P,this.tempVector3_2=new P,this.tempVector3_3=new P,this.tempVector3_P0=new P,this.tempVector3_P1=new P,this.tempVector3_P2=new P,this.tempVector3_N0=new P,this.tempVector3_N1=new P,this.tempVector3_AB=new P,this.tempVector3_CB=new P,this.tempResultObjects={object1:null,object2:null},this.segments=[];for(var t=900,n=0;n<t;n++)this.segments[n]=!1};In.prototype={constructor:In,prepareBreakableObject:function(r,e,t,n,s){r.geometry.isBufferGeometry||console.error("THREE.ConvexObjectBreaker.prepareBreakableObject(): Parameter object must have a BufferGeometry."),r.userData.ammoPhysicsData={};var i=r.userData.ammoPhysicsData;i.mass=e,i.velocity=t.clone(),i.angularVelocity=n.clone(),i.breakable=s},subdivideByImpact:function(r,e,t,n,s){var i=[],a=this.tempPlane1,o=this.tempPlane2;this.tempVector3.addVectors(e,t),a.setFromCoplanarPoints(e,r.position,this.tempVector3);var l=s+n,h=this;function u(d,f,c,p){if(Math.random()<p*.05||p>l){i.push(d);return}var v=Math.PI;p===0?(o.normal.copy(a.normal),o.constant=a.constant):p<=n?(v=(c-f)*(.2+.6*Math.random())+f,h.tempVector3_2.copy(r.position).sub(e).applyAxisAngle(t,v).add(e),o.setFromCoplanarPoints(e,h.tempVector3,h.tempVector3_2)):(v=(.5*(p&1)+.2*(2-Math.random()))*Math.PI,h.tempVector3_2.copy(e).sub(d.position).applyAxisAngle(t,v).add(d.position),h.tempVector3_3.copy(t).add(d.position),o.setFromCoplanarPoints(d.position,h.tempVector3_3,h.tempVector3_2)),h.cutByPlane(d,o,h.tempResultObjects);var m=h.tempResultObjects.object1,g=h.tempResultObjects.object2;m&&u(m,f,v,p+1),g&&u(g,v,c,p+1)}return u(r,0,2*Math.PI,0),i},cutByPlane:function(r,e,t){var n=r.geometry,s=n.attributes.position.array,i=n.attributes.normal.array,a=s.length/3,o=a/3,l=n.getIndex();l&&(l=l.array,o=l.length/3);function h(Q,le){var D=Q*3+le;return l?l[D]:D}for(var u=[],d=[],f=this.smallDelta,c=a*a,p=0;p<c;p++)this.segments[p]=!1;for(var v=this.tempVector3_P0,m=this.tempVector3_P1,g=this.tempVector3_N0,T=this.tempVector3_N1,p=0;p<o-1;p++){var M=h(p,0),x=h(p,1),w=h(p,2);g.set(i[M],i[M]+1,i[M]+2);for(var y=p+1;y<o;y++){var _=h(y,0),b=h(y,1),S=h(y,2);T.set(i[_],i[_]+1,i[_]+2);var E=1-g.dot(T)<f;E&&(M===_||M===b||M===S?x===_||x===b||x===S?(this.segments[M*a+x]=!0,this.segments[x*a+M]=!0):(this.segments[w*a+M]=!0,this.segments[M*a+w]=!0):(x===_||x===b||x===S)&&(this.segments[w*a+x]=!0,this.segments[x*a+w]=!0))}}var A=this.tempPlane_Cut;r.updateMatrix(),In.transformPlaneToLocalSpace(e,r.matrix,A);for(var p=0;p<o;p++)for(var U=h(p,0),I=h(p,1),F=h(p,2),k=0;k<3;k++){var O=k===0?U:k===1?I:F,Z=k===0?I:k===1?F:U,G=this.segments[O*a+Z];if(!G){this.segments[O*a+Z]=!0,this.segments[Z*a+O]=!0,v.set(s[3*O],s[3*O+1],s[3*O+2]),m.set(s[3*Z],s[3*Z+1],s[3*Z+2]);var ie=0,te=A.distanceToPoint(v);te>f?(ie=2,d.push(v.clone())):te<-f?(ie=1,u.push(v.clone())):(ie=3,u.push(v.clone()),d.push(v.clone()));var re=0,te=A.distanceToPoint(m);if(te>f?(re=2,d.push(m.clone())):te<-f?(re=1,u.push(m.clone())):(re=3,u.push(m.clone()),d.push(m.clone())),ie===1&&re===2||ie===2&&re===1){this.tempLine1.start.copy(v),this.tempLine1.end.copy(m);var Se=new P;if(Se=A.intersectLine(this.tempLine1,Se),Se===void 0)return console.error("Internal error: segment does not intersect plane."),t.segmentedObject1=null,t.segmentedObject2=null,0;u.push(Se),d.push(Se.clone())}}}var De=r.userData.ammoPhysicsData.mass*.5;this.tempCM1.set(0,0,0);var N=0,X=u.length;if(X>0){for(var p=0;p<X;p++)this.tempCM1.add(u[p]);this.tempCM1.divideScalar(X);for(var p=0;p<X;p++){var ee=u[p];ee.sub(this.tempCM1),N=Math.max(N,ee.x,ee.y,ee.z)}this.tempCM1.add(r.position)}this.tempCM2.set(0,0,0);var K=0,de=d.length;if(de>0){for(var p=0;p<de;p++)this.tempCM2.add(d[p]);this.tempCM2.divideScalar(de);for(var p=0;p<de;p++){var ee=d[p];ee.sub(this.tempCM2),K=Math.max(K,ee.x,ee.y,ee.z)}this.tempCM2.add(r.position)}var Le=null,be=null,We=0;if(X>4)try{Le=new Ne($l(u),r.material),Le.position.copy(this.tempCM1),Le.quaternion.copy(r.quaternion),Le.userData=r.userData,this.prepareBreakableObject(Le,De,r.userData.ammoPhysicsData.velocity,r.userData.ammoPhysicsData.angularVelocity,2*N>this.minSizeForBreak),We++}catch(Q){ss("Error in ConvexObjectBreaker.ts",!0),ss(Q,!0)}if(de>4)try{be=new Ne($l(d),r.material),be.position.copy(this.tempCM2),be.quaternion.copy(r.quaternion),be.userData=r.userData,this.prepareBreakableObject(be,De,r.userData.ammoPhysicsData.velocity,r.userData.ammoPhysicsData.angularVelocity,2*K>this.minSizeForBreak),We++}catch(Q){ss("Error in ConvexObjectBreaker.ts",!0),ss(Q,!0)}return t.object1=Le,t.object2=be,We}};In.transformFreeVector=function(r,e){var t=r.x,n=r.y,s=r.z,i=e.elements;return r.x=i[0]*t+i[4]*n+i[8]*s,r.y=i[1]*t+i[5]*n+i[9]*s,r.z=i[2]*t+i[6]*n+i[10]*s,r};In.transformFreeVectorInverse=function(r,e){var t=r.x,n=r.y,s=r.z,i=e.elements;return r.x=i[0]*t+i[1]*n+i[2]*s,r.y=i[4]*t+i[5]*n+i[6]*s,r.z=i[8]*t+i[9]*n+i[10]*s,r};In.transformTiedVectorInverse=function(r,e){var t=r.x,n=r.y,s=r.z,i=e.elements;return r.x=i[0]*t+i[1]*n+i[2]*s-i[12],r.y=i[4]*t+i[5]*n+i[6]*s-i[13],r.z=i[8]*t+i[9]*n+i[10]*s-i[14],r};In.transformPlaneToLocalSpace=(function(){var r=new P;return function(t,n,s){s.normal.copy(t.normal),s.constant=t.constant;var i=In.transformTiedVectorInverse(t.coplanarPoint(r),n);In.transformFreeVectorInverse(s.normal,n),s.constant=-i.dot(s.normal)}})();const gg=(()=>{try{if(typeof WebAssembly=="object"&&typeof WebAssembly.instantiate=="function"){const r=new WebAssembly.Module(Uint8Array.of(0,97,115,109,1,0,0,0));if(r instanceof WebAssembly.Module)return new WebAssembly.Instance(r)instanceof WebAssembly.Instance}}catch(r){r instanceof Error&&console.error(r.message)}return!1})(),Kl=(r,e)=>{var t=document.createElement("script");t.onload=()=>{e()},t.onerror=()=>{throw new Error(`failed to load ${r}`)},t.async=!0,t.src=r,document.head.appendChild(t)},vg=(r,e)=>{gg?Kl(`${r}/ammo.wasm.js`,()=>e()):Kl(`${r}/ammo.js`,()=>e())},xg=(r,e)=>{typeof window<"u"&&(window.__loadPhysics=!0),vg(r,()=>{Ammo().then(()=>{e()})})};function Qc(r,e){e.forEach(t=>{Object.getOwnPropertyNames(t.prototype).forEach(n=>{Object.defineProperty(r.prototype,n,Object.getOwnPropertyDescriptor(t.prototype,n)||Object.create(null))})})}/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */class _g{constructor(e){Fe(this,"physics");Fe(this,"_btRayCallback");this.physics=e}getHitPointWorld(){const e=this._btRayCallback.get_m_hitPointWorld();return{x:e.x(),y:e.y(),z:e.z()}}getHitNormalWorld(){const e=this._btRayCallback.get_m_hitNormalWorld();return{x:e.x(),y:e.y(),z:e.z()}}getCollisionObject(){return Ammo.castObject(this._btRayCallback.get_m_collisionObject(),Ammo.btRigidBody).threeObject}}/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */class yg{constructor(e){Fe(this,"physics");Fe(this,"_btRayCallback");this.physics=e}getHitPointsWorld(){const e=this._btRayCallback.get_m_hitPointWorld(),t=[];for(let n=e.size()-1;n>=0;n--){const s=e.at(n);t.push({x:s.x(),y:s.y(),z:s.z()})}return t}getHitPointWorld(){return ss("Use getHitPointsWorld() instead of getHitPointWorld() for the AllHitsRayCaster!"),this.getHitPointsWorld()}getHitNormalsWorld(){const e=this._btRayCallback.get_m_hitNormalWorld(),t=[];for(let n=e.size()-1;n>=0;n--){const s=e.at(n);t.push({x:s.x(),y:s.y(),z:s.z()})}return t}getCollisionObjects(){const e=[],t=this._btRayCallback.get_m_collisionObjects();for(let n=t.size()-1;n>=0;n--){const s=Ammo.castObject(t.at(n),Ammo.btRigidBody);e.push(s.threeObject)}return e}}/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */class eh{constructor(e){Fe(this,"physics");Fe(this,"type");Fe(this,"_btRayFrom");Fe(this,"_btRayTo");Fe(this,"_btRayCallback");this.physics=e}setRayFromWorld(e=0,t=0,n=0){this._btRayFrom.setValue(e,t,n)}setRayToWorld(e=0,t=0,n=0){this._btRayTo.setValue(e,t,n)}hasHit(){return this._btRayCallback.hasHit()}rayTest(){typeof this._btRayCallback<"u"&&Ammo.destroy(this._btRayCallback),this._btRayCallback=this.type==="closest"?new Ammo.ClosestRayResultCallback(this._btRayFrom,this._btRayTo):new Ammo.AllHitsRayResultCallback(this._btRayFrom,this._btRayTo),this.physics.physicsWorld.rayTest(this._btRayFrom,this._btRayTo,this._btRayCallback)}destroy(){typeof this._btRayFrom<"u"&&Ammo.destroy(this._btRayFrom),typeof this._btRayTo<"u"&&Ammo.destroy(this._btRayTo),typeof this._btRayCallback<"u"&&Ammo.destroy(this._btRayCallback)}}class Mg{constructor(e){Fe(this,"physics");Fe(this,"type","closest");Fe(this,"_btRayFrom",new Ammo.btVector3(0,0,0));Fe(this,"_btRayTo",new Ammo.btVector3(0,0,0));Fe(this,"_btRayCallback");this.physics=e}}class Sg{constructor(e){Fe(this,"physics");Fe(this,"type","allHits");Fe(this,"_btRayFrom",new Ammo.btVector3(0,0,0));Fe(this,"_btRayTo",new Ammo.btVector3(0,0,0));Fe(this,"_btRayCallback");this.physics=e}}Qc(Mg,[eh,_g]);Qc(Sg,[eh,yg]);const wg="0.26.1",Eg=`Powered by enable3d v${wg}`;console.log(`%c %c %c %c %c ${Eg} %c https://enable3d.io/`,"background: #ff0000","background: #ffff00","background: #00ff00","background: #00ffff","color: #fff; background: #000000;","background: none");var Jl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ti={},ts={},jl;function Tg(){return jl||(jl=1,Object.defineProperty(ts,"__esModule",{value:!0}),ts.VERSION=void 0,ts.VERSION="0.0.5"),ts}var Ql;function bg(){if(Ql)return ti;Ql=1;/**
 * @package      npmjs.com/package/@yandeu/events (events.min.js)
 *
 * @author       Arnout Kazemier (https://github.com/3rd-Eden)
 * @copyright    Copyright (c) 2014 Arnout Kazemier
 * @license      {@link https://github.com/primus/eventemitter3/blob/master/LICENSE|MIT}
 *
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/yandeu/events
 * @license      {@link https://github.com/yandeu/events/blob/master/LICENSE|MIT}
 */var r=ti&&ti.__spreadArray||function(a,o){for(var l=0,h=o.length,u=a.length;l<h;l++,u++)a[u]=o[l];return a};Object.defineProperty(ti,"__esModule",{value:!0}),ti.Events=void 0;var e=Tg(),t=(function(){function a(o,l,h){h===void 0&&(h=!1),this.fn=o,this.context=l,this.once=h}return a})(),n=function(a,o,l,h,u){if(typeof l!="function")throw new TypeError("The listener must be a function");var d=new t(l,h||a,u);return a._events.has(o)?a._events.get(o).fn?a._events.set(o,[a._events.get(o),d]):a._events.get(o).push(d):(a._events.set(o,d),a._eventsCount++),a},s=function(a,o){--a._eventsCount===0?a._events=new Map:a._events.delete(o)},i=(function(){function a(){this._events=new Map,this._eventsCount=0}return Object.defineProperty(a,"VERSION",{get:function(){return e.VERSION},enumerable:!1,configurable:!0}),a.prototype.eventNames=function(){return Array.from(this._events.keys())},a.prototype.listeners=function(o){var l=this._events.get(o);if(!l)return[];if(l.fn)return[l.fn];for(var h=0,u=l.length,d=new Array(u);h<u;h++)d[h]=l[h].fn;return d},a.prototype.listenerCount=function(o){var l=this._events.get(o);return l?l.fn?1:l.length:0},a.prototype.emit=function(o){for(var l,h,u=[],d=1;d<arguments.length;d++)u[d-1]=arguments[d];if(!this._events.has(o))return!1;var f=this._events.get(o),c;if(f.fn)return f.once&&this.removeListener(o,f.fn,void 0,!0),(l=f.fn).call.apply(l,r([f.context],u)),!0;var p=f.length;for(c=0;c<p;c++)f[c].once&&this.removeListener(o,f[c].fn,void 0,!0),(h=f[c].fn).call.apply(h,r([f[c].context],u));return!0},a.prototype.on=function(o,l,h){return n(this,o,l,h,!1)},a.prototype.once=function(o,l,h){return n(this,o,l,h,!0)},a.prototype.removeListener=function(o,l,h,u){if(!this._events.has(o))return this;if(!l)return s(this,o),this;var d=this._events.get(o);if(d.fn)d.fn===l&&(!u||d.once)&&(!h||d.context===h)&&s(this,o);else{for(var f=0,c=[],p=d.length;f<p;f++)(d[f].fn!==l||u&&!d[f].once||h&&d[f].context!==h)&&c.push(d[f]);c.length?this._events.set(o,c.length===1?c[0]:c):s(this,o)}return this},a.prototype.removeAllListeners=function(o){return o?this._events.delete(o)&&s(this,o):(this._events=new Map,this._eventsCount=0),this},Object.defineProperty(a.prototype,"off",{get:function(){return this.removeListener},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"addListener",{get:function(){return this.on},enumerable:!1,configurable:!0}),a})();return ti.Events=i,ti}bg();/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */document.createElement("canvas");new Tf;new ae;new ae;new ae;var cr={exports:{}};/*!
 * matter-js 0.17.1 by @liabru
 * http://brm.io/matter-js/
 * License MIT
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) Liam Brummitt and contributors.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var Ag=cr.exports,ec;function Cg(){return ec||(ec=1,(function(r,e){(function(n,s){r.exports=s()})(Ag,function(){return(function(t){var n={};function s(i){if(n[i])return n[i].exports;var a=n[i]={i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}return s.m=t,s.c=n,s.d=function(i,a,o){s.o(i,a)||Object.defineProperty(i,a,{enumerable:!0,get:o})},s.r=function(i){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})},s.t=function(i,a){if(a&1&&(i=s(i)),a&8||a&4&&typeof i=="object"&&i&&i.__esModule)return i;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:i}),a&2&&typeof i!="string")for(var l in i)s.d(o,l,(function(h){return i[h]}).bind(null,l));return o},s.n=function(i){var a=i&&i.__esModule?function(){return i.default}:function(){return i};return s.d(a,"a",a),a},s.o=function(i,a){return Object.prototype.hasOwnProperty.call(i,a)},s.p="",s(s.s=22)})([(function(t,n){var s={};t.exports=s,(function(){s._nextId=0,s._seed=0,s._nowStartTime=+new Date,s._warnedOnce={},s._decomp=null,s.extend=function(a,o){var l,h;typeof o=="boolean"?(l=2,h=o):(l=1,h=!0);for(var u=l;u<arguments.length;u++){var d=arguments[u];if(d)for(var f in d)h&&d[f]&&d[f].constructor===Object&&(!a[f]||a[f].constructor===Object)?(a[f]=a[f]||{},s.extend(a[f],h,d[f])):a[f]=d[f]}return a},s.clone=function(a,o){return s.extend({},o,a)},s.keys=function(a){if(Object.keys)return Object.keys(a);var o=[];for(var l in a)o.push(l);return o},s.values=function(a){var o=[];if(Object.keys){for(var l=Object.keys(a),h=0;h<l.length;h++)o.push(a[l[h]]);return o}for(var u in a)o.push(a[u]);return o},s.get=function(a,o,l,h){o=o.split(".").slice(l,h);for(var u=0;u<o.length;u+=1)a=a[o[u]];return a},s.set=function(a,o,l,h,u){var d=o.split(".").slice(h,u);return s.get(a,o,0,-1)[d[d.length-1]]=l,l},s.shuffle=function(a){for(var o=a.length-1;o>0;o--){var l=Math.floor(s.random()*(o+1)),h=a[o];a[o]=a[l],a[l]=h}return a},s.choose=function(a){return a[Math.floor(s.random()*a.length)]},s.isElement=function(a){return typeof HTMLElement<"u"?a instanceof HTMLElement:!!(a&&a.nodeType&&a.nodeName)},s.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"},s.isFunction=function(a){return typeof a=="function"},s.isPlainObject=function(a){return typeof a=="object"&&a.constructor===Object},s.isString=function(a){return toString.call(a)==="[object String]"},s.clamp=function(a,o,l){return a<o?o:a>l?l:a},s.sign=function(a){return a<0?-1:1},s.now=function(){if(typeof window<"u"&&window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return Date.now?Date.now():new Date-s._nowStartTime},s.random=function(a,o){return a=typeof a<"u"?a:0,o=typeof o<"u"?o:1,a+i()*(o-a)};var i=function(){return s._seed=(s._seed*9301+49297)%233280,s._seed/233280};s.colorToNumber=function(a){return a=a.replace("#",""),a.length==3&&(a=a.charAt(0)+a.charAt(0)+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)),parseInt(a,16)},s.logLevel=1,s.log=function(){console&&s.logLevel>0&&s.logLevel<=3&&console.log.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},s.info=function(){console&&s.logLevel>0&&s.logLevel<=2&&console.info.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},s.warn=function(){console&&s.logLevel>0&&s.logLevel<=3&&console.warn.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},s.warnOnce=function(){var a=Array.prototype.slice.call(arguments).join(" ");s._warnedOnce[a]||(s.warn(a),s._warnedOnce[a]=!0)},s.deprecated=function(a,o,l){a[o]=s.chain(function(){s.warnOnce("🔅 deprecated 🔅",l)},a[o])},s.nextId=function(){return s._nextId++},s.indexOf=function(a,o){if(a.indexOf)return a.indexOf(o);for(var l=0;l<a.length;l++)if(a[l]===o)return l;return-1},s.map=function(a,o){if(a.map)return a.map(o);for(var l=[],h=0;h<a.length;h+=1)l.push(o(a[h]));return l},s.topologicalSort=function(a){var o=[],l=[],h=[];for(var u in a)!l[u]&&!h[u]&&s._topologicalSort(u,l,h,a,o);return o},s._topologicalSort=function(a,o,l,h,u){var d=h[a]||[];l[a]=!0;for(var f=0;f<d.length;f+=1){var c=d[f];l[c]||o[c]||s._topologicalSort(c,o,l,h,u)}l[a]=!1,o[a]=!0,u.push(a)},s.chain=function(){for(var a=[],o=0;o<arguments.length;o+=1){var l=arguments[o];l._chained?a.push.apply(a,l._chained):a.push(l)}var h=function(){for(var u,d=new Array(arguments.length),f=0,c=arguments.length;f<c;f++)d[f]=arguments[f];for(f=0;f<a.length;f+=1){var p=a[f].apply(u,d);typeof p<"u"&&(u=p)}return u};return h._chained=a,h},s.chainPathBefore=function(a,o,l){return s.set(a,o,s.chain(l,s.get(a,o)))},s.chainPathAfter=function(a,o,l){return s.set(a,o,s.chain(s.get(a,o),l))},s.setDecomp=function(a){s._decomp=a},s.getDecomp=function(){var a=s._decomp;try{!a&&typeof window<"u"&&(a=window.decomp),!a&&typeof Jl<"u"&&(a=Jl.decomp)}catch{a=null}return a}})()}),(function(t,n){var s={};t.exports=s,(function(){s.create=function(i){var a={min:{x:0,y:0},max:{x:0,y:0}};return i&&s.update(a,i),a},s.update=function(i,a,o){i.min.x=1/0,i.max.x=-1/0,i.min.y=1/0,i.max.y=-1/0;for(var l=0;l<a.length;l++){var h=a[l];h.x>i.max.x&&(i.max.x=h.x),h.x<i.min.x&&(i.min.x=h.x),h.y>i.max.y&&(i.max.y=h.y),h.y<i.min.y&&(i.min.y=h.y)}o&&(o.x>0?i.max.x+=o.x:i.min.x+=o.x,o.y>0?i.max.y+=o.y:i.min.y+=o.y)},s.contains=function(i,a){return a.x>=i.min.x&&a.x<=i.max.x&&a.y>=i.min.y&&a.y<=i.max.y},s.overlaps=function(i,a){return i.min.x<=a.max.x&&i.max.x>=a.min.x&&i.max.y>=a.min.y&&i.min.y<=a.max.y},s.translate=function(i,a){i.min.x+=a.x,i.max.x+=a.x,i.min.y+=a.y,i.max.y+=a.y},s.shift=function(i,a){var o=i.max.x-i.min.x,l=i.max.y-i.min.y;i.min.x=a.x,i.max.x=a.x+o,i.min.y=a.y,i.max.y=a.y+l}})()}),(function(t,n){var s={};t.exports=s,(function(){s.create=function(i,a){return{x:i||0,y:a||0}},s.clone=function(i){return{x:i.x,y:i.y}},s.magnitude=function(i){return Math.sqrt(i.x*i.x+i.y*i.y)},s.magnitudeSquared=function(i){return i.x*i.x+i.y*i.y},s.rotate=function(i,a,o){var l=Math.cos(a),h=Math.sin(a);o||(o={});var u=i.x*l-i.y*h;return o.y=i.x*h+i.y*l,o.x=u,o},s.rotateAbout=function(i,a,o,l){var h=Math.cos(a),u=Math.sin(a);l||(l={});var d=o.x+((i.x-o.x)*h-(i.y-o.y)*u);return l.y=o.y+((i.x-o.x)*u+(i.y-o.y)*h),l.x=d,l},s.normalise=function(i){var a=s.magnitude(i);return a===0?{x:0,y:0}:{x:i.x/a,y:i.y/a}},s.dot=function(i,a){return i.x*a.x+i.y*a.y},s.cross=function(i,a){return i.x*a.y-i.y*a.x},s.cross3=function(i,a,o){return(a.x-i.x)*(o.y-i.y)-(a.y-i.y)*(o.x-i.x)},s.add=function(i,a,o){return o||(o={}),o.x=i.x+a.x,o.y=i.y+a.y,o},s.sub=function(i,a,o){return o||(o={}),o.x=i.x-a.x,o.y=i.y-a.y,o},s.mult=function(i,a){return{x:i.x*a,y:i.y*a}},s.div=function(i,a){return{x:i.x/a,y:i.y/a}},s.perp=function(i,a){return a=a===!0?-1:1,{x:a*-i.y,y:a*i.x}},s.neg=function(i){return{x:-i.x,y:-i.y}},s.angle=function(i,a){return Math.atan2(a.y-i.y,a.x-i.x)},s._temp=[s.create(),s.create(),s.create(),s.create(),s.create(),s.create()]})()}),(function(t,n,s){var i={};t.exports=i;var a=s(2),o=s(0);(function(){i.create=function(l,h){for(var u=[],d=0;d<l.length;d++){var f=l[d],c={x:f.x,y:f.y,index:d,body:h,isInternal:!1};u.push(c)}return u},i.fromPath=function(l,h){var u=/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,d=[];return l.replace(u,function(f,c,p){d.push({x:parseFloat(c),y:parseFloat(p)})}),i.create(d,h)},i.centre=function(l){for(var h=i.area(l,!0),u={x:0,y:0},d,f,c,p=0;p<l.length;p++)c=(p+1)%l.length,d=a.cross(l[p],l[c]),f=a.mult(a.add(l[p],l[c]),d),u=a.add(u,f);return a.div(u,6*h)},i.mean=function(l){for(var h={x:0,y:0},u=0;u<l.length;u++)h.x+=l[u].x,h.y+=l[u].y;return a.div(h,l.length)},i.area=function(l,h){for(var u=0,d=l.length-1,f=0;f<l.length;f++)u+=(l[d].x-l[f].x)*(l[d].y+l[f].y),d=f;return h?u/2:Math.abs(u)/2},i.inertia=function(l,h){for(var u=0,d=0,f=l,c,p,v=0;v<f.length;v++)p=(v+1)%f.length,c=Math.abs(a.cross(f[p],f[v])),u+=c*(a.dot(f[p],f[p])+a.dot(f[p],f[v])+a.dot(f[v],f[v])),d+=c;return h/6*(u/d)},i.translate=function(l,h,u){var d;if(u)for(d=0;d<l.length;d++)l[d].x+=h.x*u,l[d].y+=h.y*u;else for(d=0;d<l.length;d++)l[d].x+=h.x,l[d].y+=h.y;return l},i.rotate=function(l,h,u){if(h!==0){for(var d=Math.cos(h),f=Math.sin(h),c=0;c<l.length;c++){var p=l[c],v=p.x-u.x,m=p.y-u.y;p.x=u.x+(v*d-m*f),p.y=u.y+(v*f+m*d)}return l}},i.contains=function(l,h){for(var u=0;u<l.length;u++){var d=l[u],f=l[(u+1)%l.length];if((h.x-d.x)*(f.y-d.y)+(h.y-d.y)*(d.x-f.x)>0)return!1}return!0},i.scale=function(l,h,u,d){if(h===1&&u===1)return l;d=d||i.centre(l);for(var f,c,p=0;p<l.length;p++)f=l[p],c=a.sub(f,d),l[p].x=d.x+c.x*h,l[p].y=d.y+c.y*u;return l},i.chamfer=function(l,h,u,d,f){typeof h=="number"?h=[h]:h=h||[8],u=typeof u<"u"?u:-1,d=d||2,f=f||14;for(var c=[],p=0;p<l.length;p++){var v=l[p-1>=0?p-1:l.length-1],m=l[p],g=l[(p+1)%l.length],T=h[p<h.length?p:h.length-1];if(T===0){c.push(m);continue}var M=a.normalise({x:m.y-v.y,y:v.x-m.x}),x=a.normalise({x:g.y-m.y,y:m.x-g.x}),w=Math.sqrt(2*Math.pow(T,2)),y=a.mult(o.clone(M),T),_=a.normalise(a.mult(a.add(M,x),.5)),b=a.sub(m,a.mult(_,w)),S=u;u===-1&&(S=Math.pow(T,.32)*1.75),S=o.clamp(S,d,f),S%2===1&&(S+=1);for(var E=Math.acos(a.dot(M,x)),A=E/S,U=0;U<S;U++)c.push(a.add(a.rotate(y,A*U),b))}return c},i.clockwiseSort=function(l){var h=i.mean(l);return l.sort(function(u,d){return a.angle(h,u)-a.angle(h,d)}),l},i.isConvex=function(l){var h=0,u=l.length,d,f,c,p;if(u<3)return null;for(d=0;d<u;d++)if(f=(d+1)%u,c=(d+2)%u,p=(l[f].x-l[d].x)*(l[c].y-l[f].y),p-=(l[f].y-l[d].y)*(l[c].x-l[f].x),p<0?h|=1:p>0&&(h|=2),h===3)return!1;return h!==0?!0:null},i.hull=function(l){var h=[],u=[],d,f;for(l=l.slice(0),l.sort(function(c,p){var v=c.x-p.x;return v!==0?v:c.y-p.y}),f=0;f<l.length;f+=1){for(d=l[f];u.length>=2&&a.cross3(u[u.length-2],u[u.length-1],d)<=0;)u.pop();u.push(d)}for(f=l.length-1;f>=0;f-=1){for(d=l[f];h.length>=2&&a.cross3(h[h.length-2],h[h.length-1],d)<=0;)h.pop();h.push(d)}return h.pop(),u.pop(),h.concat(u)}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(0);(function(){i.on=function(o,l,h){for(var u=l.split(" "),d,f=0;f<u.length;f++)d=u[f],o.events=o.events||{},o.events[d]=o.events[d]||[],o.events[d].push(h);return h},i.off=function(o,l,h){if(!l){o.events={};return}typeof l=="function"&&(h=l,l=a.keys(o.events).join(" "));for(var u=l.split(" "),d=0;d<u.length;d++){var f=o.events[u[d]],c=[];if(h&&f)for(var p=0;p<f.length;p++)f[p]!==h&&c.push(f[p]);o.events[u[d]]=c}},i.trigger=function(o,l,h){var u,d,f,c,p=o.events;if(p&&a.keys(p).length>0){h||(h={}),u=l.split(" ");for(var v=0;v<u.length;v++)if(d=u[v],f=p[d],f){c=a.clone(h,!1),c.name=d,c.source=o;for(var m=0;m<f.length;m++)f[m].apply(o,[c])}}}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(4),o=s(0),l=s(1),h=s(6);(function(){i.create=function(u){return o.extend({id:o.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite",plugin:{}},u)},i.setModified=function(u,d,f,c){if(u.isModified=d,f&&u.parent&&i.setModified(u.parent,d,f,c),c)for(var p=0;p<u.composites.length;p++){var v=u.composites[p];i.setModified(v,d,f,c)}},i.add=function(u,d){var f=[].concat(d);a.trigger(u,"beforeAdd",{object:d});for(var c=0;c<f.length;c++){var p=f[c];switch(p.type){case"body":if(p.parent!==p){o.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break}i.addBody(u,p);break;case"constraint":i.addConstraint(u,p);break;case"composite":i.addComposite(u,p);break;case"mouseConstraint":i.addConstraint(u,p.constraint);break}}return a.trigger(u,"afterAdd",{object:d}),u},i.remove=function(u,d,f){var c=[].concat(d);a.trigger(u,"beforeRemove",{object:d});for(var p=0;p<c.length;p++){var v=c[p];switch(v.type){case"body":i.removeBody(u,v,f);break;case"constraint":i.removeConstraint(u,v,f);break;case"composite":i.removeComposite(u,v,f);break;case"mouseConstraint":i.removeConstraint(u,v.constraint);break}}return a.trigger(u,"afterRemove",{object:d}),u},i.addComposite=function(u,d){return u.composites.push(d),d.parent=u,i.setModified(u,!0,!0,!1),u},i.removeComposite=function(u,d,f){var c=o.indexOf(u.composites,d);if(c!==-1&&(i.removeCompositeAt(u,c),i.setModified(u,!0,!0,!1)),f)for(var p=0;p<u.composites.length;p++)i.removeComposite(u.composites[p],d,!0);return u},i.removeCompositeAt=function(u,d){return u.composites.splice(d,1),i.setModified(u,!0,!0,!1),u},i.addBody=function(u,d){return u.bodies.push(d),i.setModified(u,!0,!0,!1),u},i.removeBody=function(u,d,f){var c=o.indexOf(u.bodies,d);if(c!==-1&&(i.removeBodyAt(u,c),i.setModified(u,!0,!0,!1)),f)for(var p=0;p<u.composites.length;p++)i.removeBody(u.composites[p],d,!0);return u},i.removeBodyAt=function(u,d){return u.bodies.splice(d,1),i.setModified(u,!0,!0,!1),u},i.addConstraint=function(u,d){return u.constraints.push(d),i.setModified(u,!0,!0,!1),u},i.removeConstraint=function(u,d,f){var c=o.indexOf(u.constraints,d);if(c!==-1&&i.removeConstraintAt(u,c),f)for(var p=0;p<u.composites.length;p++)i.removeConstraint(u.composites[p],d,!0);return u},i.removeConstraintAt=function(u,d){return u.constraints.splice(d,1),i.setModified(u,!0,!0,!1),u},i.clear=function(u,d,f){if(f)for(var c=0;c<u.composites.length;c++)i.clear(u.composites[c],d,!0);return d?u.bodies=u.bodies.filter(function(p){return p.isStatic}):u.bodies.length=0,u.constraints.length=0,u.composites.length=0,i.setModified(u,!0,!0,!1),u},i.allBodies=function(u){for(var d=[].concat(u.bodies),f=0;f<u.composites.length;f++)d=d.concat(i.allBodies(u.composites[f]));return d},i.allConstraints=function(u){for(var d=[].concat(u.constraints),f=0;f<u.composites.length;f++)d=d.concat(i.allConstraints(u.composites[f]));return d},i.allComposites=function(u){for(var d=[].concat(u.composites),f=0;f<u.composites.length;f++)d=d.concat(i.allComposites(u.composites[f]));return d},i.get=function(u,d,f){var c,p;switch(f){case"body":c=i.allBodies(u);break;case"constraint":c=i.allConstraints(u);break;case"composite":c=i.allComposites(u).concat(u);break}return c?(p=c.filter(function(v){return v.id.toString()===d.toString()}),p.length===0?null:p[0]):null},i.move=function(u,d,f){return i.remove(u,d),i.add(f,d),u},i.rebase=function(u){for(var d=i.allBodies(u).concat(i.allConstraints(u)).concat(i.allComposites(u)),f=0;f<d.length;f++)d[f].id=o.nextId();return i.setModified(u,!0,!0,!1),u},i.translate=function(u,d,f){for(var c=f?i.allBodies(u):u.bodies,p=0;p<c.length;p++)h.translate(c[p],d);return i.setModified(u,!0,!0,!1),u},i.rotate=function(u,d,f,c){for(var p=Math.cos(d),v=Math.sin(d),m=c?i.allBodies(u):u.bodies,g=0;g<m.length;g++){var T=m[g],M=T.position.x-f.x,x=T.position.y-f.y;h.setPosition(T,{x:f.x+(M*p-x*v),y:f.y+(M*v+x*p)}),h.rotate(T,d)}return i.setModified(u,!0,!0,!1),u},i.scale=function(u,d,f,c,p){for(var v=p?i.allBodies(u):u.bodies,m=0;m<v.length;m++){var g=v[m],T=g.position.x-c.x,M=g.position.y-c.y;h.setPosition(g,{x:c.x+T*d,y:c.y+M*f}),h.scale(g,d,f)}return i.setModified(u,!0,!0,!1),u},i.bounds=function(u){for(var d=i.allBodies(u),f=[],c=0;c<d.length;c+=1){var p=d[c];f.push(p.bounds.min,p.bounds.max)}return l.create(f)}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(3),o=s(2),l=s(7);s(16);var h=s(0),u=s(1),d=s(10);(function(){i._inertiaScale=4,i._nextCollidingGroupId=1,i._nextNonCollidingGroupId=-1,i._nextCategory=1,i.create=function(c){var p={id:h.nextId(),type:"body",label:"Body",parts:[],plugin:{},angle:0,vertices:a.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,strokeStyle:null,fillStyle:null,lineWidth:null,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0}},events:null,bounds:null,chamfer:null,circleRadius:0,positionPrev:null,anglePrev:0,parent:null,axes:null,area:0,mass:0,inertia:0,_original:null},v=h.extend(p,c);return f(v,c),v},i.nextGroup=function(c){return c?i._nextNonCollidingGroupId--:i._nextCollidingGroupId++},i.nextCategory=function(){return i._nextCategory=i._nextCategory<<1,i._nextCategory};var f=function(c,p){p=p||{},i.set(c,{bounds:c.bounds||u.create(c.vertices),positionPrev:c.positionPrev||o.clone(c.position),anglePrev:c.anglePrev||c.angle,vertices:c.vertices,parts:c.parts||[c],isStatic:c.isStatic,isSleeping:c.isSleeping,parent:c.parent||c}),a.rotate(c.vertices,c.angle,c.position),d.rotate(c.axes,c.angle),u.update(c.bounds,c.vertices,c.velocity),i.set(c,{axes:p.axes||c.axes,area:p.area||c.area,mass:p.mass||c.mass,inertia:p.inertia||c.inertia});var v=c.isStatic?"#14151f":h.choose(["#f19648","#f5d259","#f55a3c","#063e7b","#ececd1"]),m=c.isStatic?"#555":"#ccc",g=c.isStatic&&c.render.fillStyle===null?1:0;c.render.fillStyle=c.render.fillStyle||v,c.render.strokeStyle=c.render.strokeStyle||m,c.render.lineWidth=c.render.lineWidth||g,c.render.sprite.xOffset+=-(c.bounds.min.x-c.position.x)/(c.bounds.max.x-c.bounds.min.x),c.render.sprite.yOffset+=-(c.bounds.min.y-c.position.y)/(c.bounds.max.y-c.bounds.min.y)};i.set=function(c,p,v){var m;typeof p=="string"&&(m=p,p={},p[m]=v);for(m in p)if(Object.prototype.hasOwnProperty.call(p,m))switch(v=p[m],m){case"isStatic":i.setStatic(c,v);break;case"isSleeping":l.set(c,v);break;case"mass":i.setMass(c,v);break;case"density":i.setDensity(c,v);break;case"inertia":i.setInertia(c,v);break;case"vertices":i.setVertices(c,v);break;case"position":i.setPosition(c,v);break;case"angle":i.setAngle(c,v);break;case"velocity":i.setVelocity(c,v);break;case"angularVelocity":i.setAngularVelocity(c,v);break;case"parts":i.setParts(c,v);break;case"centre":i.setCentre(c,v);break;default:c[m]=v}},i.setStatic=function(c,p){for(var v=0;v<c.parts.length;v++){var m=c.parts[v];m.isStatic=p,p?(m._original={restitution:m.restitution,friction:m.friction,mass:m.mass,inertia:m.inertia,density:m.density,inverseMass:m.inverseMass,inverseInertia:m.inverseInertia},m.restitution=0,m.friction=1,m.mass=m.inertia=m.density=1/0,m.inverseMass=m.inverseInertia=0,m.positionPrev.x=m.position.x,m.positionPrev.y=m.position.y,m.anglePrev=m.angle,m.angularVelocity=0,m.speed=0,m.angularSpeed=0,m.motion=0):m._original&&(m.restitution=m._original.restitution,m.friction=m._original.friction,m.mass=m._original.mass,m.inertia=m._original.inertia,m.density=m._original.density,m.inverseMass=m._original.inverseMass,m.inverseInertia=m._original.inverseInertia,m._original=null)}},i.setMass=function(c,p){var v=c.inertia/(c.mass/6);c.inertia=v*(p/6),c.inverseInertia=1/c.inertia,c.mass=p,c.inverseMass=1/c.mass,c.density=c.mass/c.area},i.setDensity=function(c,p){i.setMass(c,p*c.area),c.density=p},i.setInertia=function(c,p){c.inertia=p,c.inverseInertia=1/c.inertia},i.setVertices=function(c,p){p[0].body===c?c.vertices=p:c.vertices=a.create(p,c),c.axes=d.fromVertices(c.vertices),c.area=a.area(c.vertices),i.setMass(c,c.density*c.area);var v=a.centre(c.vertices);a.translate(c.vertices,v,-1),i.setInertia(c,i._inertiaScale*a.inertia(c.vertices,c.mass)),a.translate(c.vertices,c.position),u.update(c.bounds,c.vertices,c.velocity)},i.setParts=function(c,p,v){var m;for(p=p.slice(0),c.parts.length=0,c.parts.push(c),c.parent=c,m=0;m<p.length;m++){var g=p[m];g!==c&&(g.parent=c,c.parts.push(g))}if(c.parts.length!==1){if(v=typeof v<"u"?v:!0,v){var T=[];for(m=0;m<p.length;m++)T=T.concat(p[m].vertices);a.clockwiseSort(T);var M=a.hull(T),x=a.centre(M);i.setVertices(c,M),a.translate(c.vertices,x)}var w=i._totalProperties(c);c.area=w.area,c.parent=c,c.position.x=w.centre.x,c.position.y=w.centre.y,c.positionPrev.x=w.centre.x,c.positionPrev.y=w.centre.y,i.setMass(c,w.mass),i.setInertia(c,w.inertia),i.setPosition(c,w.centre)}},i.setCentre=function(c,p,v){v?(c.positionPrev.x+=p.x,c.positionPrev.y+=p.y,c.position.x+=p.x,c.position.y+=p.y):(c.positionPrev.x=p.x-(c.position.x-c.positionPrev.x),c.positionPrev.y=p.y-(c.position.y-c.positionPrev.y),c.position.x=p.x,c.position.y=p.y)},i.setPosition=function(c,p){var v=o.sub(p,c.position);c.positionPrev.x+=v.x,c.positionPrev.y+=v.y;for(var m=0;m<c.parts.length;m++){var g=c.parts[m];g.position.x+=v.x,g.position.y+=v.y,a.translate(g.vertices,v),u.update(g.bounds,g.vertices,c.velocity)}},i.setAngle=function(c,p){var v=p-c.angle;c.anglePrev+=v;for(var m=0;m<c.parts.length;m++){var g=c.parts[m];g.angle+=v,a.rotate(g.vertices,v,c.position),d.rotate(g.axes,v),u.update(g.bounds,g.vertices,c.velocity),m>0&&o.rotateAbout(g.position,v,c.position,g.position)}},i.setVelocity=function(c,p){c.positionPrev.x=c.position.x-p.x,c.positionPrev.y=c.position.y-p.y,c.velocity.x=p.x,c.velocity.y=p.y,c.speed=o.magnitude(c.velocity)},i.setAngularVelocity=function(c,p){c.anglePrev=c.angle-p,c.angularVelocity=p,c.angularSpeed=Math.abs(c.angularVelocity)},i.translate=function(c,p){i.setPosition(c,o.add(c.position,p))},i.rotate=function(c,p,v){if(!v)i.setAngle(c,c.angle+p);else{var m=Math.cos(p),g=Math.sin(p),T=c.position.x-v.x,M=c.position.y-v.y;i.setPosition(c,{x:v.x+(T*m-M*g),y:v.y+(T*g+M*m)}),i.setAngle(c,c.angle+p)}},i.scale=function(c,p,v,m){var g=0,T=0;m=m||c.position;for(var M=0;M<c.parts.length;M++){var x=c.parts[M];a.scale(x.vertices,p,v,m),x.axes=d.fromVertices(x.vertices),x.area=a.area(x.vertices),i.setMass(x,c.density*x.area),a.translate(x.vertices,{x:-x.position.x,y:-x.position.y}),i.setInertia(x,i._inertiaScale*a.inertia(x.vertices,x.mass)),a.translate(x.vertices,{x:x.position.x,y:x.position.y}),M>0&&(g+=x.area,T+=x.inertia),x.position.x=m.x+(x.position.x-m.x)*p,x.position.y=m.y+(x.position.y-m.y)*v,u.update(x.bounds,x.vertices,c.velocity)}c.parts.length>1&&(c.area=g,c.isStatic||(i.setMass(c,c.density*g),i.setInertia(c,T))),c.circleRadius&&(p===v?c.circleRadius*=p:c.circleRadius=null)},i.update=function(c,p,v,m){var g=Math.pow(p*v*c.timeScale,2),T=1-c.frictionAir*v*c.timeScale,M=c.position.x-c.positionPrev.x,x=c.position.y-c.positionPrev.y;c.velocity.x=M*T*m+c.force.x/c.mass*g,c.velocity.y=x*T*m+c.force.y/c.mass*g,c.positionPrev.x=c.position.x,c.positionPrev.y=c.position.y,c.position.x+=c.velocity.x,c.position.y+=c.velocity.y,c.angularVelocity=(c.angle-c.anglePrev)*T*m+c.torque/c.inertia*g,c.anglePrev=c.angle,c.angle+=c.angularVelocity,c.speed=o.magnitude(c.velocity),c.angularSpeed=Math.abs(c.angularVelocity);for(var w=0;w<c.parts.length;w++){var y=c.parts[w];a.translate(y.vertices,c.velocity),w>0&&(y.position.x+=c.velocity.x,y.position.y+=c.velocity.y),c.angularVelocity!==0&&(a.rotate(y.vertices,c.angularVelocity,c.position),d.rotate(y.axes,c.angularVelocity),w>0&&o.rotateAbout(y.position,c.angularVelocity,c.position,y.position)),u.update(y.bounds,y.vertices,c.velocity)}},i.applyForce=function(c,p,v){c.force.x+=v.x,c.force.y+=v.y;var m={x:p.x-c.position.x,y:p.y-c.position.y};c.torque+=m.x*v.y-m.y*v.x},i._totalProperties=function(c){for(var p={mass:0,area:0,inertia:0,centre:{x:0,y:0}},v=c.parts.length===1?0:1;v<c.parts.length;v++){var m=c.parts[v],g=m.mass!==1/0?m.mass:1;p.mass+=g,p.area+=m.area,p.inertia+=m.inertia,p.centre=o.add(p.centre,o.mult(m.position,g))}return p.centre=o.div(p.centre,p.mass),p}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(4);(function(){i._motionWakeThreshold=.18,i._motionSleepThreshold=.08,i._minBias=.9,i.update=function(o,l){for(var h=l*l*l,u=0;u<o.length;u++){var d=o[u],f=d.speed*d.speed+d.angularSpeed*d.angularSpeed;if(d.force.x!==0||d.force.y!==0){i.set(d,!1);continue}var c=Math.min(d.motion,f),p=Math.max(d.motion,f);d.motion=i._minBias*c+(1-i._minBias)*p,d.sleepThreshold>0&&d.motion<i._motionSleepThreshold*h?(d.sleepCounter+=1,d.sleepCounter>=d.sleepThreshold&&i.set(d,!0)):d.sleepCounter>0&&(d.sleepCounter-=1)}},i.afterCollisions=function(o,l){for(var h=l*l*l,u=0;u<o.length;u++){var d=o[u];if(d.isActive){var f=d.collision,c=f.bodyA.parent,p=f.bodyB.parent;if(!(c.isSleeping&&p.isSleeping||c.isStatic||p.isStatic)&&(c.isSleeping||p.isSleeping)){var v=c.isSleeping&&!c.isStatic?c:p,m=v===c?p:c;!v.isStatic&&m.motion>i._motionWakeThreshold*h&&i.set(v,!1)}}}},i.set=function(o,l){var h=o.isSleeping;l?(o.isSleeping=!0,o.sleepCounter=o.sleepThreshold,o.positionImpulse.x=0,o.positionImpulse.y=0,o.positionPrev.x=o.position.x,o.positionPrev.y=o.position.y,o.anglePrev=o.angle,o.speed=0,o.angularSpeed=0,o.motion=0,h||a.trigger(o,"sleepStart")):(o.isSleeping=!1,o.sleepCounter=0,h&&a.trigger(o,"sleepEnd"))}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(3),o=s(2),l=s(7),h=s(1),u=s(10),d=s(0);(function(){i._warming=.4,i._torqueDampen=1,i._minLength=1e-6,i.create=function(f){var c=f;c.bodyA&&!c.pointA&&(c.pointA={x:0,y:0}),c.bodyB&&!c.pointB&&(c.pointB={x:0,y:0});var p=c.bodyA?o.add(c.bodyA.position,c.pointA):c.pointA,v=c.bodyB?o.add(c.bodyB.position,c.pointB):c.pointB,m=o.magnitude(o.sub(p,v));c.length=typeof c.length<"u"?c.length:m,c.id=c.id||d.nextId(),c.label=c.label||"Constraint",c.type="constraint",c.stiffness=c.stiffness||(c.length>0?1:.7),c.damping=c.damping||0,c.angularStiffness=c.angularStiffness||0,c.angleA=c.bodyA?c.bodyA.angle:c.angleA,c.angleB=c.bodyB?c.bodyB.angle:c.angleB,c.plugin={};var g={visible:!0,lineWidth:2,strokeStyle:"#ffffff",type:"line",anchors:!0};return c.length===0&&c.stiffness>.1?(g.type="pin",g.anchors=!1):c.stiffness<.9&&(g.type="spring"),c.render=d.extend(g,c.render),c},i.preSolveAll=function(f){for(var c=0;c<f.length;c+=1){var p=f[c],v=p.constraintImpulse;p.isStatic||v.x===0&&v.y===0&&v.angle===0||(p.position.x+=v.x,p.position.y+=v.y,p.angle+=v.angle)}},i.solveAll=function(f,c){for(var p=0;p<f.length;p+=1){var v=f[p],m=!v.bodyA||v.bodyA&&v.bodyA.isStatic,g=!v.bodyB||v.bodyB&&v.bodyB.isStatic;(m||g)&&i.solve(f[p],c)}for(p=0;p<f.length;p+=1)v=f[p],m=!v.bodyA||v.bodyA&&v.bodyA.isStatic,g=!v.bodyB||v.bodyB&&v.bodyB.isStatic,!m&&!g&&i.solve(f[p],c)},i.solve=function(f,c){var p=f.bodyA,v=f.bodyB,m=f.pointA,g=f.pointB;if(!(!p&&!v)){p&&!p.isStatic&&(o.rotate(m,p.angle-f.angleA,m),f.angleA=p.angle),v&&!v.isStatic&&(o.rotate(g,v.angle-f.angleB,g),f.angleB=v.angle);var T=m,M=g;if(p&&(T=o.add(p.position,m)),v&&(M=o.add(v.position,g)),!(!T||!M)){var x=o.sub(T,M),w=o.magnitude(x);w<i._minLength&&(w=i._minLength);var y=(w-f.length)/w,_=f.stiffness<1?f.stiffness*c:f.stiffness,b=o.mult(x,y*_),S=(p?p.inverseMass:0)+(v?v.inverseMass:0),E=(p?p.inverseInertia:0)+(v?v.inverseInertia:0),A=S+E,U,I,F,k,O;if(f.damping){var Z=o.create();F=o.div(x,w),O=o.sub(v&&o.sub(v.position,v.positionPrev)||Z,p&&o.sub(p.position,p.positionPrev)||Z),k=o.dot(F,O)}p&&!p.isStatic&&(I=p.inverseMass/S,p.constraintImpulse.x-=b.x*I,p.constraintImpulse.y-=b.y*I,p.position.x-=b.x*I,p.position.y-=b.y*I,f.damping&&(p.positionPrev.x-=f.damping*F.x*k*I,p.positionPrev.y-=f.damping*F.y*k*I),U=o.cross(m,b)/A*i._torqueDampen*p.inverseInertia*(1-f.angularStiffness),p.constraintImpulse.angle-=U,p.angle-=U),v&&!v.isStatic&&(I=v.inverseMass/S,v.constraintImpulse.x+=b.x*I,v.constraintImpulse.y+=b.y*I,v.position.x+=b.x*I,v.position.y+=b.y*I,f.damping&&(v.positionPrev.x+=f.damping*F.x*k*I,v.positionPrev.y+=f.damping*F.y*k*I),U=o.cross(g,b)/A*i._torqueDampen*v.inverseInertia*(1-f.angularStiffness),v.constraintImpulse.angle+=U,v.angle+=U)}}},i.postSolveAll=function(f){for(var c=0;c<f.length;c++){var p=f[c],v=p.constraintImpulse;if(!(p.isStatic||v.x===0&&v.y===0&&v.angle===0)){l.set(p,!1);for(var m=0;m<p.parts.length;m++){var g=p.parts[m];a.translate(g.vertices,v),m>0&&(g.position.x+=v.x,g.position.y+=v.y),v.angle!==0&&(a.rotate(g.vertices,v.angle,p.position),u.rotate(g.axes,v.angle),m>0&&o.rotateAbout(g.position,v.angle,p.position,g.position)),h.update(g.bounds,g.vertices,p.velocity)}v.angle*=i._warming,v.x*=i._warming,v.y*=i._warming}}},i.pointAWorld=function(f){return{x:(f.bodyA?f.bodyA.position.x:0)+f.pointA.x,y:(f.bodyA?f.bodyA.position.y:0)+f.pointA.y}},i.pointBWorld=function(f){return{x:(f.bodyB?f.bodyB.position.x:0)+f.pointB.x,y:(f.bodyB?f.bodyB.position.y:0)+f.pointB.y}}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(17);(function(){i.create=function(o,l){var h=o.bodyA,u=o.bodyB,d=o.parentA,f=o.parentB,c={id:i.id(h,u),bodyA:h,bodyB:u,contacts:{},activeContacts:[],separation:0,isActive:!0,confirmedActive:!0,isSensor:h.isSensor||u.isSensor,timeCreated:l,timeUpdated:l,inverseMass:d.inverseMass+f.inverseMass,friction:Math.min(d.friction,f.friction),frictionStatic:Math.max(d.frictionStatic,f.frictionStatic),restitution:Math.max(d.restitution,f.restitution),slop:Math.max(d.slop,f.slop)};return i.update(c,o,l),c},i.update=function(o,l,h){var u=o.contacts,d=l.supports,f=o.activeContacts,c=l.parentA,p=l.parentB;if(o.collision=l,o.inverseMass=c.inverseMass+p.inverseMass,o.friction=Math.min(c.friction,p.friction),o.frictionStatic=Math.max(c.frictionStatic,p.frictionStatic),o.restitution=Math.max(c.restitution,p.restitution),o.slop=Math.max(c.slop,p.slop),f.length=0,l.collided){for(var v=0;v<d.length;v++){var m=d[v],g=a.id(m),T=u[g];T?f.push(T):f.push(u[g]=a.create(m))}o.separation=l.depth,i.setActive(o,!0,h)}else o.isActive===!0&&i.setActive(o,!1,h)},i.setActive=function(o,l,h){l?(o.isActive=!0,o.timeUpdated=h):(o.isActive=!1,o.activeContacts.length=0)},i.id=function(o,l){return o.id<l.id?"A"+o.id+"B"+l.id:"A"+l.id+"B"+o.id}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(2),o=s(0);(function(){i.fromVertices=function(l){for(var h={},u=0;u<l.length;u++){var d=(u+1)%l.length,f=a.normalise({x:l[d].y-l[u].y,y:l[u].x-l[d].x}),c=f.y===0?1/0:f.x/f.y;c=c.toFixed(3).toString(),h[c]=f}return o.values(h)},i.rotate=function(l,h){if(h!==0)for(var u=Math.cos(h),d=Math.sin(h),f=0;f<l.length;f++){var c=l[f],p;p=c.x*u-c.y*d,c.y=c.x*d+c.y*u,c.x=p}}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(3),o=s(0),l=s(6),h=s(1),u=s(2);(function(){i.rectangle=function(d,f,c,p,v){v=v||{};var m={label:"Rectangle Body",position:{x:d,y:f},vertices:a.fromPath("L 0 0 L "+c+" 0 L "+c+" "+p+" L 0 "+p)};if(v.chamfer){var g=v.chamfer;m.vertices=a.chamfer(m.vertices,g.radius,g.quality,g.qualityMin,g.qualityMax),delete v.chamfer}return l.create(o.extend({},m,v))},i.trapezoid=function(d,f,c,p,v,m){m=m||{},v*=.5;var g=(1-v*2)*c,T=c*v,M=T+g,x=M+T,w;v<.5?w="L 0 0 L "+T+" "+-p+" L "+M+" "+-p+" L "+x+" 0":w="L 0 0 L "+M+" "+-p+" L "+x+" 0";var y={label:"Trapezoid Body",position:{x:d,y:f},vertices:a.fromPath(w)};if(m.chamfer){var _=m.chamfer;y.vertices=a.chamfer(y.vertices,_.radius,_.quality,_.qualityMin,_.qualityMax),delete m.chamfer}return l.create(o.extend({},y,m))},i.circle=function(d,f,c,p,v){p=p||{};var m={label:"Circle Body",circleRadius:c};v=v||25;var g=Math.ceil(Math.max(10,Math.min(v,c)));return g%2===1&&(g+=1),i.polygon(d,f,g,c,o.extend({},m,p))},i.polygon=function(d,f,c,p,v){if(v=v||{},c<3)return i.circle(d,f,p,v);for(var m=2*Math.PI/c,g="",T=m*.5,M=0;M<c;M+=1){var x=T+M*m,w=Math.cos(x)*p,y=Math.sin(x)*p;g+="L "+w.toFixed(3)+" "+y.toFixed(3)+" "}var _={label:"Polygon Body",position:{x:d,y:f},vertices:a.fromPath(g)};if(v.chamfer){var b=v.chamfer;_.vertices=a.chamfer(_.vertices,b.radius,b.quality,b.qualityMin,b.qualityMax),delete v.chamfer}return l.create(o.extend({},_,v))},i.fromVertices=function(d,f,c,p,v,m,g,T){var M=o.getDecomp(),x,w,y,_,b,S,E,A,U,I,F;for(x=!!(M&&M.quickDecomp),p=p||{},y=[],v=typeof v<"u"?v:!1,m=typeof m<"u"?m:.01,g=typeof g<"u"?g:10,T=typeof T<"u"?T:.01,o.isArray(c[0])||(c=[c]),I=0;I<c.length;I+=1)if(S=c[I],_=a.isConvex(S),b=!_,b&&!x&&o.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."),_||!x)_?S=a.clockwiseSort(S):S=a.hull(S),y.push({position:{x:d,y:f},vertices:S});else{var k=S.map(function(ee){return[ee.x,ee.y]});M.makeCCW(k),m!==!1&&M.removeCollinearPoints(k,m),T!==!1&&M.removeDuplicatePoints&&M.removeDuplicatePoints(k,T);var O=M.quickDecomp(k);for(E=0;E<O.length;E++){var Z=O[E],G=Z.map(function(ee){return{x:ee[0],y:ee[1]}});g>0&&a.area(G)<g||y.push({position:a.centre(G),vertices:G})}}for(E=0;E<y.length;E++)y[E]=l.create(o.extend(y[E],p));if(v){var ie=5;for(E=0;E<y.length;E++){var re=y[E];for(A=E+1;A<y.length;A++){var te=y[A];if(h.overlaps(re.bounds,te.bounds)){var Se=re.vertices,De=te.vertices;for(U=0;U<re.vertices.length;U++)for(F=0;F<te.vertices.length;F++){var N=u.magnitudeSquared(u.sub(Se[(U+1)%Se.length],De[F])),X=u.magnitudeSquared(u.sub(Se[U],De[(F+1)%De.length]));N<ie&&X<ie&&(Se[U].isInternal=!0,De[F].isInternal=!0)}}}}}return y.length>1?(w=l.create(o.extend({parts:y.slice(0)},p)),l.setPosition(w,{x:d,y:f}),w):y[0]}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(0);(function(){i.create=function(o){var l={};return o||a.log("Mouse.create: element was undefined, defaulting to document.body","warn"),l.element=o||document.body,l.absolute={x:0,y:0},l.position={x:0,y:0},l.mousedownPosition={x:0,y:0},l.mouseupPosition={x:0,y:0},l.offset={x:0,y:0},l.scale={x:1,y:1},l.wheelDelta=0,l.button=-1,l.pixelRatio=parseInt(l.element.getAttribute("data-pixel-ratio"),10)||1,l.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},l.mousemove=function(h){var u=i._getRelativeMousePosition(h,l.element,l.pixelRatio),d=h.changedTouches;d&&(l.button=0,h.preventDefault()),l.absolute.x=u.x,l.absolute.y=u.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y,l.sourceEvents.mousemove=h},l.mousedown=function(h){var u=i._getRelativeMousePosition(h,l.element,l.pixelRatio),d=h.changedTouches;d?(l.button=0,h.preventDefault()):l.button=h.button,l.absolute.x=u.x,l.absolute.y=u.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y,l.mousedownPosition.x=l.position.x,l.mousedownPosition.y=l.position.y,l.sourceEvents.mousedown=h},l.mouseup=function(h){var u=i._getRelativeMousePosition(h,l.element,l.pixelRatio),d=h.changedTouches;d&&h.preventDefault(),l.button=-1,l.absolute.x=u.x,l.absolute.y=u.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y,l.mouseupPosition.x=l.position.x,l.mouseupPosition.y=l.position.y,l.sourceEvents.mouseup=h},l.mousewheel=function(h){l.wheelDelta=Math.max(-1,Math.min(1,h.wheelDelta||-h.detail)),h.preventDefault()},i.setElement(l,l.element),l},i.setElement=function(o,l){o.element=l,l.addEventListener("mousemove",o.mousemove),l.addEventListener("mousedown",o.mousedown),l.addEventListener("mouseup",o.mouseup),l.addEventListener("mousewheel",o.mousewheel),l.addEventListener("DOMMouseScroll",o.mousewheel),l.addEventListener("touchmove",o.mousemove),l.addEventListener("touchstart",o.mousedown),l.addEventListener("touchend",o.mouseup)},i.clearSourceEvents=function(o){o.sourceEvents.mousemove=null,o.sourceEvents.mousedown=null,o.sourceEvents.mouseup=null,o.sourceEvents.mousewheel=null,o.wheelDelta=0},i.setOffset=function(o,l){o.offset.x=l.x,o.offset.y=l.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y},i.setScale=function(o,l){o.scale.x=l.x,o.scale.y=l.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y},i._getRelativeMousePosition=function(o,l,h){var u=l.getBoundingClientRect(),d=document.documentElement||document.body.parentNode||document.body,f=window.pageXOffset!==void 0?window.pageXOffset:d.scrollLeft,c=window.pageYOffset!==void 0?window.pageYOffset:d.scrollTop,p=o.changedTouches,v,m;return p?(v=p[0].pageX-u.left-f,m=p[0].pageY-u.top-c):(v=o.pageX-u.left-f,m=o.pageY-u.top-c),{x:v/(l.clientWidth/(l.width||l.clientWidth)*h),y:m/(l.clientHeight/(l.height||l.clientHeight)*h)}}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(14),o=s(9),l=s(1);(function(){i.collisions=function(h,u){for(var d=[],f=u.pairs.table,c=0;c<h.length;c++){var p=h[c][0],v=h[c][1];if(!((p.isStatic||p.isSleeping)&&(v.isStatic||v.isSleeping))&&i.canCollide(p.collisionFilter,v.collisionFilter)&&l.overlaps(p.bounds,v.bounds))for(var m=p.parts.length>1?1:0;m<p.parts.length;m++)for(var g=p.parts[m],T=v.parts.length>1?1:0;T<v.parts.length;T++){var M=v.parts[T];if(g===p&&M===v||l.overlaps(g.bounds,M.bounds)){var x=o.id(g,M),w=f[x],y;w&&w.isActive?y=w.collision:y=null;var _=a.collides(g,M,y);_.collided&&d.push(_)}}}return d},i.canCollide=function(h,u){return h.group===u.group&&h.group!==0?h.group>0:(h.mask&u.category)!==0&&(u.mask&h.category)!==0}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(3),o=s(2);(function(){i.collides=function(l,h,u){var d,f,c,p,v=!1;if(u){var m=l.parent,g=h.parent,T=m.speed*m.speed+m.angularSpeed*m.angularSpeed+g.speed*g.speed+g.angularSpeed*g.angularSpeed;v=u&&u.collided&&T<.2,p=u}else p={collided:!1,bodyA:l,bodyB:h};if(u&&v){var M=p.axisBody,x=M===l?h:l,w=[M.axes[u.axisNumber]];if(c=i._overlapAxes(M.vertices,x.vertices,w),p.reused=!0,c.overlap<=0)return p.collided=!1,p}else{if(d=i._overlapAxes(l.vertices,h.vertices,l.axes),d.overlap<=0||(f=i._overlapAxes(h.vertices,l.vertices,h.axes),f.overlap<=0))return p.collided=!1,p;d.overlap<f.overlap?(c=d,p.axisBody=l):(c=f,p.axisBody=h),p.axisNumber=c.axisNumber}p.bodyA=l.id<h.id?l:h,p.bodyB=l.id<h.id?h:l,p.collided=!0,p.depth=c.overlap,p.parentA=p.bodyA.parent,p.parentB=p.bodyB.parent,l=p.bodyA,h=p.bodyB,o.dot(c.axis,o.sub(h.position,l.position))<0?p.normal={x:c.axis.x,y:c.axis.y}:p.normal={x:-c.axis.x,y:-c.axis.y},p.tangent=o.perp(p.normal),p.penetration=p.penetration||{},p.penetration.x=p.normal.x*p.depth,p.penetration.y=p.normal.y*p.depth;var y=i._findSupports(l,h,p.normal),_=[];if(a.contains(l.vertices,y[0])&&_.push(y[0]),a.contains(l.vertices,y[1])&&_.push(y[1]),_.length<2){var b=i._findSupports(h,l,o.neg(p.normal));a.contains(h.vertices,b[0])&&_.push(b[0]),_.length<2&&a.contains(h.vertices,b[1])&&_.push(b[1])}return _.length<1&&(_=[y[0]]),p.supports=_,p},i._overlapAxes=function(l,h,u){for(var d=o._temp[0],f=o._temp[1],c={overlap:Number.MAX_VALUE},p,v,m=0;m<u.length;m++){if(v=u[m],i._projectToAxis(d,l,v),i._projectToAxis(f,h,v),p=Math.min(d.max-f.min,f.max-d.min),p<=0)return c.overlap=p,c;p<c.overlap&&(c.overlap=p,c.axis=v,c.axisNumber=m)}return c},i._projectToAxis=function(l,h,u){for(var d=o.dot(h[0],u),f=d,c=1;c<h.length;c+=1){var p=o.dot(h[c],u);p>f?f=p:p<d&&(d=p)}l.min=d,l.max=f},i._findSupports=function(l,h,u){for(var d=Number.MAX_VALUE,f=o._temp[0],c=h.vertices,p=l.position,v,m,g,T,M=0;M<c.length;M++)m=c[M],f.x=m.x-p.x,f.y=m.y-p.y,v=-o.dot(u,f),v<d&&(d=v,g=m);var x=g.index-1>=0?g.index-1:c.length-1;m=c[x],f.x=m.x-p.x,f.y=m.y-p.y,d=-o.dot(u,f),T=m;var w=(g.index+1)%c.length;return m=c[w],f.x=m.x-p.x,f.y=m.y-p.y,v=-o.dot(u,f),v<d&&(T=m),[g,T]}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(0);(function(){i._registry={},i.register=function(o){if(i.isPlugin(o)||a.warn("Plugin.register:",i.toString(o),"does not implement all required fields."),o.name in i._registry){var l=i._registry[o.name],h=i.versionParse(o.version).number,u=i.versionParse(l.version).number;h>u?(a.warn("Plugin.register:",i.toString(l),"was upgraded to",i.toString(o)),i._registry[o.name]=o):h<u?a.warn("Plugin.register:",i.toString(l),"can not be downgraded to",i.toString(o)):o!==l&&a.warn("Plugin.register:",i.toString(o),"is already registered to different plugin object")}else i._registry[o.name]=o;return o},i.resolve=function(o){return i._registry[i.dependencyParse(o).name]},i.toString=function(o){return typeof o=="string"?o:(o.name||"anonymous")+"@"+(o.version||o.range||"0.0.0")},i.isPlugin=function(o){return o&&o.name&&o.version&&o.install},i.isUsed=function(o,l){return o.used.indexOf(l)>-1},i.isFor=function(o,l){var h=o.for&&i.dependencyParse(o.for);return!o.for||l.name===h.name&&i.versionSatisfies(l.version,h.range)},i.use=function(o,l){if(o.uses=(o.uses||[]).concat(l||[]),o.uses.length===0){a.warn("Plugin.use:",i.toString(o),"does not specify any dependencies to install.");return}for(var h=i.dependencies(o),u=a.topologicalSort(h),d=[],f=0;f<u.length;f+=1)if(u[f]!==o.name){var c=i.resolve(u[f]);if(!c){d.push("❌ "+u[f]);continue}i.isUsed(o,c.name)||(i.isFor(c,o)||(a.warn("Plugin.use:",i.toString(c),"is for",c.for,"but installed on",i.toString(o)+"."),c._warned=!0),c.install?c.install(o):(a.warn("Plugin.use:",i.toString(c),"does not specify an install function."),c._warned=!0),c._warned?(d.push("🔶 "+i.toString(c)),delete c._warned):d.push("✅ "+i.toString(c)),o.used.push(c.name))}d.length>0&&a.info(d.join("  "))},i.dependencies=function(o,l){var h=i.dependencyParse(o),u=h.name;if(l=l||{},!(u in l)){o=i.resolve(o)||o,l[u]=a.map(o.uses||[],function(f){i.isPlugin(f)&&i.register(f);var c=i.dependencyParse(f),p=i.resolve(f);return p&&!i.versionSatisfies(p.version,c.range)?(a.warn("Plugin.dependencies:",i.toString(p),"does not satisfy",i.toString(c),"used by",i.toString(h)+"."),p._warned=!0,o._warned=!0):p||(a.warn("Plugin.dependencies:",i.toString(f),"used by",i.toString(h),"could not be resolved."),o._warned=!0),c.name});for(var d=0;d<l[u].length;d+=1)i.dependencies(l[u][d],l);return l}},i.dependencyParse=function(o){if(a.isString(o)){var l=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;return l.test(o)||a.warn("Plugin.dependencyParse:",o,"is not a valid dependency string."),{name:o.split("@")[0],range:o.split("@")[1]||"*"}}return{name:o.name,range:o.range||o.version}},i.versionParse=function(o){var l=/^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-]+)?$/;l.test(o)||a.warn("Plugin.versionParse:",o,"is not a valid version or range.");var h=l.exec(o),u=Number(h[4]),d=Number(h[5]),f=Number(h[6]);return{isRange:!!(h[1]||h[2]),version:h[3],range:o,operator:h[1]||h[2]||"",major:u,minor:d,patch:f,parts:[u,d,f],prerelease:h[7],number:u*1e8+d*1e4+f}},i.versionSatisfies=function(o,l){l=l||"*";var h=i.versionParse(l),u=i.versionParse(o);if(h.isRange){if(h.operator==="*"||o==="*")return!0;if(h.operator===">")return u.number>h.number;if(h.operator===">=")return u.number>=h.number;if(h.operator==="~")return u.major===h.major&&u.minor===h.minor&&u.patch>=h.patch;if(h.operator==="^")return h.major>0?u.major===h.major&&u.number>=h.number:h.minor>0?u.minor===h.minor&&u.patch>=h.patch:u.patch===h.patch}return o===l||o==="*"}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(0),o=s(5),l=s(1),h=s(4),u=s(2),d=s(12);(function(){var f,c;typeof window<"u"&&(f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(x){window.setTimeout(function(){x(a.now())},1e3/60)},c=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),i._goodFps=30,i._goodDelta=1e3/60,i.create=function(x){var w={controller:i,engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,timing:{historySize:60,delta:0,deltaHistory:[],lastTime:0,lastTimestamp:0,lastElapsed:0,timestampElapsed:0,timestampElapsedHistory:[],engineDeltaHistory:[],engineElapsedHistory:[],elapsedHistory:[]},options:{width:800,height:600,pixelRatio:1,background:"#14151f",wireframeBackground:"#14151f",hasBounds:!!x.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showStats:!1,showPerformance:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},y=a.extend(w,x);return y.canvas&&(y.canvas.width=y.options.width||y.canvas.width,y.canvas.height=y.options.height||y.canvas.height),y.mouse=x.mouse,y.engine=x.engine,y.canvas=y.canvas||m(y.options.width,y.options.height),y.context=y.canvas.getContext("2d"),y.textures={},y.bounds=y.bounds||{min:{x:0,y:0},max:{x:y.canvas.width,y:y.canvas.height}},y.options.pixelRatio!==1&&i.setPixelRatio(y,y.options.pixelRatio),a.isElement(y.element)?y.element.appendChild(y.canvas):y.canvas.parentNode||a.log("Render.create: options.element was undefined, render.canvas was created but not appended","warn"),y},i.run=function(x){(function w(y){x.frameRequestId=f(w),p(x,y),i.world(x,y),(x.options.showStats||x.options.showDebug)&&i.stats(x,x.context,y),(x.options.showPerformance||x.options.showDebug)&&i.performance(x,x.context,y)})()},i.stop=function(x){c(x.frameRequestId)},i.setPixelRatio=function(x,w){var y=x.options,_=x.canvas;w==="auto"&&(w=g(_)),y.pixelRatio=w,_.setAttribute("data-pixel-ratio",w),_.width=y.width*w,_.height=y.height*w,_.style.width=y.width+"px",_.style.height=y.height+"px"},i.lookAt=function(x,w,y,_){_=typeof _<"u"?_:!0,w=a.isArray(w)?w:[w],y=y||{x:0,y:0};for(var b={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},S=0;S<w.length;S+=1){var E=w[S],A=E.bounds?E.bounds.min:E.min||E.position||E,U=E.bounds?E.bounds.max:E.max||E.position||E;A&&U&&(A.x<b.min.x&&(b.min.x=A.x),U.x>b.max.x&&(b.max.x=U.x),A.y<b.min.y&&(b.min.y=A.y),U.y>b.max.y&&(b.max.y=U.y))}var I=b.max.x-b.min.x+2*y.x,F=b.max.y-b.min.y+2*y.y,k=x.canvas.height,O=x.canvas.width,Z=O/k,G=I/F,ie=1,re=1;G>Z?re=G/Z:ie=Z/G,x.options.hasBounds=!0,x.bounds.min.x=b.min.x,x.bounds.max.x=b.min.x+I*ie,x.bounds.min.y=b.min.y,x.bounds.max.y=b.min.y+F*re,_&&(x.bounds.min.x+=I*.5-I*ie*.5,x.bounds.max.x+=I*.5-I*ie*.5,x.bounds.min.y+=F*.5-F*re*.5,x.bounds.max.y+=F*.5-F*re*.5),x.bounds.min.x-=y.x,x.bounds.max.x-=y.x,x.bounds.min.y-=y.y,x.bounds.max.y-=y.y,x.mouse&&(d.setScale(x.mouse,{x:(x.bounds.max.x-x.bounds.min.x)/x.canvas.width,y:(x.bounds.max.y-x.bounds.min.y)/x.canvas.height}),d.setOffset(x.mouse,x.bounds.min))},i.startViewTransform=function(x){var w=x.bounds.max.x-x.bounds.min.x,y=x.bounds.max.y-x.bounds.min.y,_=w/x.options.width,b=y/x.options.height;x.context.setTransform(x.options.pixelRatio/_,0,0,x.options.pixelRatio/b,0,0),x.context.translate(-x.bounds.min.x,-x.bounds.min.y)},i.endViewTransform=function(x){x.context.setTransform(x.options.pixelRatio,0,0,x.options.pixelRatio,0,0)},i.world=function(x,w){var y=a.now(),_=x.engine,b=_.world,S=x.canvas,E=x.context,A=x.options,U=x.timing,I=o.allBodies(b),F=o.allConstraints(b),k=A.wireframes?A.wireframeBackground:A.background,O=[],Z=[],G,ie={timestamp:_.timing.timestamp};if(h.trigger(x,"beforeRender",ie),x.currentBackground!==k&&M(x,k),E.globalCompositeOperation="source-in",E.fillStyle="transparent",E.fillRect(0,0,S.width,S.height),E.globalCompositeOperation="source-over",A.hasBounds){for(G=0;G<I.length;G++){var re=I[G];l.overlaps(re.bounds,x.bounds)&&O.push(re)}for(G=0;G<F.length;G++){var te=F[G],Se=te.bodyA,De=te.bodyB,N=te.pointA,X=te.pointB;Se&&(N=u.add(Se.position,te.pointA)),De&&(X=u.add(De.position,te.pointB)),!(!N||!X)&&(l.contains(x.bounds,N)||l.contains(x.bounds,X))&&Z.push(te)}i.startViewTransform(x),x.mouse&&(d.setScale(x.mouse,{x:(x.bounds.max.x-x.bounds.min.x)/x.options.width,y:(x.bounds.max.y-x.bounds.min.y)/x.options.height}),d.setOffset(x.mouse,x.bounds.min))}else Z=F,O=I,x.options.pixelRatio!==1&&x.context.setTransform(x.options.pixelRatio,0,0,x.options.pixelRatio,0,0);!A.wireframes||_.enableSleeping&&A.showSleeping?i.bodies(x,O,E):(A.showConvexHulls&&i.bodyConvexHulls(x,O,E),i.bodyWireframes(x,O,E)),A.showBounds&&i.bodyBounds(x,O,E),(A.showAxes||A.showAngleIndicator)&&i.bodyAxes(x,O,E),A.showPositions&&i.bodyPositions(x,O,E),A.showVelocity&&i.bodyVelocity(x,O,E),A.showIds&&i.bodyIds(x,O,E),A.showSeparations&&i.separations(x,_.pairs.list,E),A.showCollisions&&i.collisions(x,_.pairs.list,E),A.showVertexNumbers&&i.vertexNumbers(x,O,E),A.showMousePosition&&i.mousePosition(x,x.mouse,E),i.constraints(Z,E),A.showBroadphase&&i.grid(x,_.grid,E),A.hasBounds&&i.endViewTransform(x),h.trigger(x,"afterRender",ie),U.lastElapsed=a.now()-y},i.stats=function(x,w,y){for(var _=x.engine,b=_.world,S=o.allBodies(b),E=0,A=55,U=44,I=0,F=0,k=0;k<S.length;k+=1)E+=S[k].parts.length;var O={Part:E,Body:S.length,Cons:o.allConstraints(b).length,Comp:o.allComposites(b).length,Pair:_.pairs.list.length};w.fillStyle="#0e0f19",w.fillRect(I,F,A*5.5,U),w.font="12px Arial",w.textBaseline="top",w.textAlign="right";for(var Z in O){var G=O[Z];w.fillStyle="#aaa",w.fillText(Z,I+A,F+8),w.fillStyle="#eee",w.fillText(G,I+A,F+26),I+=A}},i.performance=function(x,w){var y=x.engine,_=x.timing,b=_.deltaHistory,S=_.elapsedHistory,E=_.timestampElapsedHistory,A=_.engineDeltaHistory,U=_.engineElapsedHistory,I=y.timing.lastDelta,F=v(b),k=v(S),O=v(A),Z=v(U),G=v(E),ie=G/F||0,re=1e3/F||0,te=4,Se=12,De=60,N=34,X=10,ee=69;w.fillStyle="#0e0f19",w.fillRect(0,50,Se*4+De*5+22,N),i.status(w,X,ee,De,te,b.length,Math.round(re)+" fps",re/i._goodFps,function(K){return b[K]/F-1}),i.status(w,X+Se+De,ee,De,te,A.length,I.toFixed(2)+" dt",i._goodDelta/I,function(K){return A[K]/O-1}),i.status(w,X+(Se+De)*2,ee,De,te,U.length,Z.toFixed(2)+" ut",1-Z/i._goodFps,function(K){return U[K]/Z-1}),i.status(w,X+(Se+De)*3,ee,De,te,S.length,k.toFixed(2)+" rt",1-k/i._goodFps,function(K){return S[K]/k-1}),i.status(w,X+(Se+De)*4,ee,De,te,E.length,ie.toFixed(2)+" x",ie*ie*ie,function(K){return(E[K]/b[K]/ie||0)-1})},i.status=function(x,w,y,_,b,S,E,A,U){x.strokeStyle="#888",x.fillStyle="#444",x.lineWidth=1,x.fillRect(w,y+7,_,1),x.beginPath(),x.moveTo(w,y+7-b*a.clamp(.4*U(0),-2,2));for(var I=0;I<_;I+=1)x.lineTo(w+I,y+7-(I<S?b*a.clamp(.4*U(I),-2,2):0));x.stroke(),x.fillStyle="hsl("+a.clamp(25+95*A,0,120)+",100%,60%)",x.fillRect(w,y-7,4,4),x.font="12px Arial",x.textBaseline="middle",x.textAlign="right",x.fillStyle="#eee",x.fillText(E,w+_,y-5)},i.constraints=function(x,w){for(var y=w,_=0;_<x.length;_++){var b=x[_];if(!(!b.render.visible||!b.pointA||!b.pointB)){var S=b.bodyA,E=b.bodyB,A,U;if(S?A=u.add(S.position,b.pointA):A=b.pointA,b.render.type==="pin")y.beginPath(),y.arc(A.x,A.y,3,0,2*Math.PI),y.closePath();else{if(E?U=u.add(E.position,b.pointB):U=b.pointB,y.beginPath(),y.moveTo(A.x,A.y),b.render.type==="spring")for(var I=u.sub(U,A),F=u.perp(u.normalise(I)),k=Math.ceil(a.clamp(b.length/5,12,20)),O,Z=1;Z<k;Z+=1)O=Z%2===0?1:-1,y.lineTo(A.x+I.x*(Z/k)+F.x*O*4,A.y+I.y*(Z/k)+F.y*O*4);y.lineTo(U.x,U.y)}b.render.lineWidth&&(y.lineWidth=b.render.lineWidth,y.strokeStyle=b.render.strokeStyle,y.stroke()),b.render.anchors&&(y.fillStyle=b.render.strokeStyle,y.beginPath(),y.arc(A.x,A.y,3,0,2*Math.PI),y.arc(U.x,U.y,3,0,2*Math.PI),y.closePath(),y.fill())}}},i.bodies=function(x,w,y){var _=y;x.engine;var b=x.options,S=b.showInternalEdges||!b.wireframes,E,A,U,I;for(U=0;U<w.length;U++)if(E=w[U],!!E.render.visible){for(I=E.parts.length>1?1:0;I<E.parts.length;I++)if(A=E.parts[I],!!A.render.visible){if(b.showSleeping&&E.isSleeping?_.globalAlpha=.5*A.render.opacity:A.render.opacity!==1&&(_.globalAlpha=A.render.opacity),A.render.sprite&&A.render.sprite.texture&&!b.wireframes){var F=A.render.sprite,k=T(x,F.texture);_.translate(A.position.x,A.position.y),_.rotate(A.angle),_.drawImage(k,k.width*-F.xOffset*F.xScale,k.height*-F.yOffset*F.yScale,k.width*F.xScale,k.height*F.yScale),_.rotate(-A.angle),_.translate(-A.position.x,-A.position.y)}else{if(A.circleRadius)_.beginPath(),_.arc(A.position.x,A.position.y,A.circleRadius,0,2*Math.PI);else{_.beginPath(),_.moveTo(A.vertices[0].x,A.vertices[0].y);for(var O=1;O<A.vertices.length;O++)!A.vertices[O-1].isInternal||S?_.lineTo(A.vertices[O].x,A.vertices[O].y):_.moveTo(A.vertices[O].x,A.vertices[O].y),A.vertices[O].isInternal&&!S&&_.moveTo(A.vertices[(O+1)%A.vertices.length].x,A.vertices[(O+1)%A.vertices.length].y);_.lineTo(A.vertices[0].x,A.vertices[0].y),_.closePath()}b.wireframes?(_.lineWidth=1,_.strokeStyle="#bbb",_.stroke()):(_.fillStyle=A.render.fillStyle,A.render.lineWidth&&(_.lineWidth=A.render.lineWidth,_.strokeStyle=A.render.strokeStyle,_.stroke()),_.fill())}_.globalAlpha=1}}},i.bodyWireframes=function(x,w,y){var _=y,b=x.options.showInternalEdges,S,E,A,U,I;for(_.beginPath(),A=0;A<w.length;A++)if(S=w[A],!!S.render.visible)for(I=S.parts.length>1?1:0;I<S.parts.length;I++){for(E=S.parts[I],_.moveTo(E.vertices[0].x,E.vertices[0].y),U=1;U<E.vertices.length;U++)!E.vertices[U-1].isInternal||b?_.lineTo(E.vertices[U].x,E.vertices[U].y):_.moveTo(E.vertices[U].x,E.vertices[U].y),E.vertices[U].isInternal&&!b&&_.moveTo(E.vertices[(U+1)%E.vertices.length].x,E.vertices[(U+1)%E.vertices.length].y);_.lineTo(E.vertices[0].x,E.vertices[0].y)}_.lineWidth=1,_.strokeStyle="#bbb",_.stroke()},i.bodyConvexHulls=function(x,w,y){var _=y,b,S,E;for(_.beginPath(),S=0;S<w.length;S++)if(b=w[S],!(!b.render.visible||b.parts.length===1)){for(_.moveTo(b.vertices[0].x,b.vertices[0].y),E=1;E<b.vertices.length;E++)_.lineTo(b.vertices[E].x,b.vertices[E].y);_.lineTo(b.vertices[0].x,b.vertices[0].y)}_.lineWidth=1,_.strokeStyle="rgba(255,255,255,0.2)",_.stroke()},i.vertexNumbers=function(x,w,y){var _=y,b,S,E;for(b=0;b<w.length;b++){var A=w[b].parts;for(E=A.length>1?1:0;E<A.length;E++){var U=A[E];for(S=0;S<U.vertices.length;S++)_.fillStyle="rgba(255,255,255,0.2)",_.fillText(b+"_"+S,U.position.x+(U.vertices[S].x-U.position.x)*.8,U.position.y+(U.vertices[S].y-U.position.y)*.8)}}},i.mousePosition=function(x,w,y){var _=y;_.fillStyle="rgba(255,255,255,0.8)",_.fillText(w.position.x+"  "+w.position.y,w.position.x+5,w.position.y-5)},i.bodyBounds=function(x,w,y){var _=y;x.engine;var b=x.options;_.beginPath();for(var S=0;S<w.length;S++){var E=w[S];if(E.render.visible)for(var A=w[S].parts,U=A.length>1?1:0;U<A.length;U++){var I=A[U];_.rect(I.bounds.min.x,I.bounds.min.y,I.bounds.max.x-I.bounds.min.x,I.bounds.max.y-I.bounds.min.y)}}b.wireframes?_.strokeStyle="rgba(255,255,255,0.08)":_.strokeStyle="rgba(0,0,0,0.1)",_.lineWidth=1,_.stroke()},i.bodyAxes=function(x,w,y){var _=y;x.engine;var b=x.options,S,E,A,U;for(_.beginPath(),E=0;E<w.length;E++){var I=w[E],F=I.parts;if(I.render.visible)if(b.showAxes)for(A=F.length>1?1:0;A<F.length;A++)for(S=F[A],U=0;U<S.axes.length;U++){var k=S.axes[U];_.moveTo(S.position.x,S.position.y),_.lineTo(S.position.x+k.x*20,S.position.y+k.y*20)}else for(A=F.length>1?1:0;A<F.length;A++)for(S=F[A],U=0;U<S.axes.length;U++)_.moveTo(S.position.x,S.position.y),_.lineTo((S.vertices[0].x+S.vertices[S.vertices.length-1].x)/2,(S.vertices[0].y+S.vertices[S.vertices.length-1].y)/2)}b.wireframes?(_.strokeStyle="indianred",_.lineWidth=1):(_.strokeStyle="rgba(255, 255, 255, 0.4)",_.globalCompositeOperation="overlay",_.lineWidth=2),_.stroke(),_.globalCompositeOperation="source-over"},i.bodyPositions=function(x,w,y){var _=y;x.engine;var b=x.options,S,E,A,U;for(_.beginPath(),A=0;A<w.length;A++)if(S=w[A],!!S.render.visible)for(U=0;U<S.parts.length;U++)E=S.parts[U],_.arc(E.position.x,E.position.y,3,0,2*Math.PI,!1),_.closePath();for(b.wireframes?_.fillStyle="indianred":_.fillStyle="rgba(0,0,0,0.5)",_.fill(),_.beginPath(),A=0;A<w.length;A++)S=w[A],S.render.visible&&(_.arc(S.positionPrev.x,S.positionPrev.y,2,0,2*Math.PI,!1),_.closePath());_.fillStyle="rgba(255,165,0,0.8)",_.fill()},i.bodyVelocity=function(x,w,y){var _=y;_.beginPath();for(var b=0;b<w.length;b++){var S=w[b];S.render.visible&&(_.moveTo(S.position.x,S.position.y),_.lineTo(S.position.x+(S.position.x-S.positionPrev.x)*2,S.position.y+(S.position.y-S.positionPrev.y)*2))}_.lineWidth=3,_.strokeStyle="cornflowerblue",_.stroke()},i.bodyIds=function(x,w,y){var _=y,b,S;for(b=0;b<w.length;b++)if(w[b].render.visible){var E=w[b].parts;for(S=E.length>1?1:0;S<E.length;S++){var A=E[S];_.font="12px Arial",_.fillStyle="rgba(255,255,255,0.5)",_.fillText(A.id,A.position.x+10,A.position.y-10)}}},i.collisions=function(x,w,y){var _=y,b=x.options,S,E,A,U;for(_.beginPath(),A=0;A<w.length;A++)if(S=w[A],!!S.isActive)for(E=S.collision,U=0;U<S.activeContacts.length;U++){var I=S.activeContacts[U],F=I.vertex;_.rect(F.x-1.5,F.y-1.5,3.5,3.5)}for(b.wireframes?_.fillStyle="rgba(255,255,255,0.7)":_.fillStyle="orange",_.fill(),_.beginPath(),A=0;A<w.length;A++)if(S=w[A],!!S.isActive&&(E=S.collision,S.activeContacts.length>0)){var k=S.activeContacts[0].vertex.x,O=S.activeContacts[0].vertex.y;S.activeContacts.length===2&&(k=(S.activeContacts[0].vertex.x+S.activeContacts[1].vertex.x)/2,O=(S.activeContacts[0].vertex.y+S.activeContacts[1].vertex.y)/2),E.bodyB===E.supports[0].body||E.bodyA.isStatic===!0?_.moveTo(k-E.normal.x*8,O-E.normal.y*8):_.moveTo(k+E.normal.x*8,O+E.normal.y*8),_.lineTo(k,O)}b.wireframes?_.strokeStyle="rgba(255,165,0,0.7)":_.strokeStyle="orange",_.lineWidth=1,_.stroke()},i.separations=function(x,w,y){var _=y,b=x.options,S,E,A,U,I;for(_.beginPath(),I=0;I<w.length;I++)if(S=w[I],!!S.isActive){E=S.collision,A=E.bodyA,U=E.bodyB;var F=1;!U.isStatic&&!A.isStatic&&(F=.5),U.isStatic&&(F=0),_.moveTo(U.position.x,U.position.y),_.lineTo(U.position.x-E.penetration.x*F,U.position.y-E.penetration.y*F),F=1,!U.isStatic&&!A.isStatic&&(F=.5),A.isStatic&&(F=0),_.moveTo(A.position.x,A.position.y),_.lineTo(A.position.x+E.penetration.x*F,A.position.y+E.penetration.y*F)}b.wireframes?_.strokeStyle="rgba(255,165,0,0.5)":_.strokeStyle="orange",_.stroke()},i.grid=function(x,w,y){var _=y,b=x.options;b.wireframes?_.strokeStyle="rgba(255,180,0,0.1)":_.strokeStyle="rgba(255,180,0,0.5)",_.beginPath();for(var S=a.keys(w.buckets),E=0;E<S.length;E++){var A=S[E];if(!(w.buckets[A].length<2)){var U=A.split(/C|R/);_.rect(.5+parseInt(U[1],10)*w.bucketWidth,.5+parseInt(U[2],10)*w.bucketHeight,w.bucketWidth,w.bucketHeight)}}_.lineWidth=1,_.stroke()},i.inspector=function(x,w){x.engine;var y=x.selected,_=x.render,b=_.options,S;if(b.hasBounds){var E=_.bounds.max.x-_.bounds.min.x,A=_.bounds.max.y-_.bounds.min.y,U=E/_.options.width,I=A/_.options.height;w.scale(1/U,1/I),w.translate(-_.bounds.min.x,-_.bounds.min.y)}for(var F=0;F<y.length;F++){var k=y[F].data;switch(w.translate(.5,.5),w.lineWidth=1,w.strokeStyle="rgba(255,165,0,0.9)",w.setLineDash([1,2]),k.type){case"body":S=k.bounds,w.beginPath(),w.rect(Math.floor(S.min.x-3),Math.floor(S.min.y-3),Math.floor(S.max.x-S.min.x+6),Math.floor(S.max.y-S.min.y+6)),w.closePath(),w.stroke();break;case"constraint":var O=k.pointA;k.bodyA&&(O=k.pointB),w.beginPath(),w.arc(O.x,O.y,10,0,2*Math.PI),w.closePath(),w.stroke();break}w.setLineDash([]),w.translate(-.5,-.5)}x.selectStart!==null&&(w.translate(.5,.5),w.lineWidth=1,w.strokeStyle="rgba(255,165,0,0.6)",w.fillStyle="rgba(255,165,0,0.1)",S=x.selectBounds,w.beginPath(),w.rect(Math.floor(S.min.x),Math.floor(S.min.y),Math.floor(S.max.x-S.min.x),Math.floor(S.max.y-S.min.y)),w.closePath(),w.stroke(),w.fill(),w.translate(-.5,-.5)),b.hasBounds&&w.setTransform(1,0,0,1,0,0)};var p=function(x,w){var y=x.engine,_=x.timing,b=_.historySize,S=y.timing.timestamp;_.delta=w-_.lastTime||i._goodDelta,_.lastTime=w,_.timestampElapsed=S-_.lastTimestamp||0,_.lastTimestamp=S,_.deltaHistory.unshift(_.delta),_.deltaHistory.length=Math.min(_.deltaHistory.length,b),_.engineDeltaHistory.unshift(y.timing.lastDelta),_.engineDeltaHistory.length=Math.min(_.engineDeltaHistory.length,b),_.timestampElapsedHistory.unshift(_.timestampElapsed),_.timestampElapsedHistory.length=Math.min(_.timestampElapsedHistory.length,b),_.engineElapsedHistory.unshift(y.timing.lastElapsed),_.engineElapsedHistory.length=Math.min(_.engineElapsedHistory.length,b),_.elapsedHistory.unshift(_.lastElapsed),_.elapsedHistory.length=Math.min(_.elapsedHistory.length,b)},v=function(x){for(var w=0,y=0;y<x.length;y+=1)w+=x[y];return w/x.length||0},m=function(x,w){var y=document.createElement("canvas");return y.width=x,y.height=w,y.oncontextmenu=function(){return!1},y.onselectstart=function(){return!1},y},g=function(x){var w=x.getContext("2d"),y=window.devicePixelRatio||1,_=w.webkitBackingStorePixelRatio||w.mozBackingStorePixelRatio||w.msBackingStorePixelRatio||w.oBackingStorePixelRatio||w.backingStorePixelRatio||1;return y/_},T=function(x,w){var y=x.textures[w];return y||(y=x.textures[w]=new Image,y.src=w,y)},M=function(x,w){var y=w;/(jpg|gif|png)$/.test(w)&&(y="url("+w+")"),x.canvas.style.background=y,x.canvas.style.backgroundSize="contain",x.currentBackground=w}})()}),(function(t,n){var s={};t.exports=s,(function(){s.create=function(i){return{id:s.id(i),vertex:i,normalImpulse:0,tangentImpulse:0}},s.id=function(i){return i.body.id+"_"+i.index}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(7),o=s(19),l=s(13),h=s(20),u=s(21),d=s(4),f=s(5),c=s(8),p=s(0),v=s(6);(function(){i.create=function(m){m=m||{};var g={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},grid:null,gravity:{x:0,y:1,scale:.001},timing:{timestamp:0,timeScale:1,lastDelta:0,lastElapsed:0}},T=p.extend(g,m);return T.world=m.world||f.create({label:"World"}),T.grid=u.create(m.grid||m.broadphase),T.pairs=h.create(),T.world.gravity=T.gravity,T.broadphase=T.grid,T.metrics={},T},i.update=function(m,g,T){var M=p.now();g=g||1e3/60,T=T||1;var x=m.world,w=m.timing,y=m.grid,_=[],b;w.timestamp+=g*w.timeScale,w.lastDelta=g*w.timeScale;var S={timestamp:w.timestamp};d.trigger(m,"beforeUpdate",S);var E=f.allBodies(x),A=f.allConstraints(x);for(m.enableSleeping&&a.update(E,w.timeScale),i._bodiesApplyGravity(E,m.gravity),i._bodiesUpdate(E,g,w.timeScale,T,x.bounds),c.preSolveAll(E),b=0;b<m.constraintIterations;b++)c.solveAll(A,w.timeScale);c.postSolveAll(E),x.isModified&&u.clear(y),u.update(y,E,m,x.isModified),_=y.pairsList,x.isModified&&f.setModified(x,!1,!1,!0);var U=l.collisions(_,m),I=m.pairs,F=w.timestamp;for(h.update(I,U,F),h.removeOld(I,F),m.enableSleeping&&a.afterCollisions(I.list,w.timeScale),I.collisionStart.length>0&&d.trigger(m,"collisionStart",{pairs:I.collisionStart}),o.preSolvePosition(I.list),b=0;b<m.positionIterations;b++)o.solvePosition(I.list,w.timeScale);for(o.postSolvePosition(E),c.preSolveAll(E),b=0;b<m.constraintIterations;b++)c.solveAll(A,w.timeScale);for(c.postSolveAll(E),o.preSolveVelocity(I.list),b=0;b<m.velocityIterations;b++)o.solveVelocity(I.list,w.timeScale);return I.collisionActive.length>0&&d.trigger(m,"collisionActive",{pairs:I.collisionActive}),I.collisionEnd.length>0&&d.trigger(m,"collisionEnd",{pairs:I.collisionEnd}),i._bodiesClearForces(E),d.trigger(m,"afterUpdate",S),m.timing.lastElapsed=p.now()-M,m},i.merge=function(m,g){if(p.extend(m,g),g.world){m.world=g.world,i.clear(m);for(var T=f.allBodies(m.world),M=0;M<T.length;M++){var x=T[M];a.set(x,!1),x.id=p.nextId()}}},i.clear=function(m){var g=m.world,T=f.allBodies(g);h.clear(m.pairs),u.clear(m.grid),u.update(m.grid,T,m,!0)},i._bodiesClearForces=function(m){for(var g=0;g<m.length;g++){var T=m[g];T.force.x=0,T.force.y=0,T.torque=0}},i._bodiesApplyGravity=function(m,g){var T=typeof g.scale<"u"?g.scale:.001;if(!(g.x===0&&g.y===0||T===0))for(var M=0;M<m.length;M++){var x=m[M];x.isStatic||x.isSleeping||(x.force.y+=x.mass*g.y*T,x.force.x+=x.mass*g.x*T)}},i._bodiesUpdate=function(m,g,T,M,x){for(var w=0;w<m.length;w++){var y=m[w];y.isStatic||y.isSleeping||v.update(y,g,T,M)}}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(3),o=s(2),l=s(0),h=s(1);(function(){i._restingThresh=4,i._restingThreshTangent=6,i._positionDampen=.9,i._positionWarming=.8,i._frictionNormalMultiplier=5,i.preSolvePosition=function(u){var d,f,c;for(d=0;d<u.length;d++)f=u[d],f.isActive&&(c=f.activeContacts.length,f.collision.parentA.totalContacts+=c,f.collision.parentB.totalContacts+=c)},i.solvePosition=function(u,d){var f,c,p,v,m,g,T,M,x,w=o._temp[0],y=o._temp[1],_=o._temp[2],b=o._temp[3];for(f=0;f<u.length;f++)c=u[f],!(!c.isActive||c.isSensor)&&(p=c.collision,v=p.parentA,m=p.parentB,g=p.normal,T=o.sub(o.add(m.positionImpulse,m.position,w),o.add(v.positionImpulse,o.sub(m.position,p.penetration,y),_),b),c.separation=o.dot(g,T));for(f=0;f<u.length;f++)c=u[f],!(!c.isActive||c.isSensor)&&(p=c.collision,v=p.parentA,m=p.parentB,g=p.normal,x=(c.separation-c.slop)*d,(v.isStatic||m.isStatic)&&(x*=2),v.isStatic||v.isSleeping||(M=i._positionDampen/v.totalContacts,v.positionImpulse.x+=g.x*x*M,v.positionImpulse.y+=g.y*x*M),m.isStatic||m.isSleeping||(M=i._positionDampen/m.totalContacts,m.positionImpulse.x-=g.x*x*M,m.positionImpulse.y-=g.y*x*M))},i.postSolvePosition=function(u){for(var d=0;d<u.length;d++){var f=u[d];if(f.totalContacts=0,f.positionImpulse.x!==0||f.positionImpulse.y!==0){for(var c=0;c<f.parts.length;c++){var p=f.parts[c];a.translate(p.vertices,f.positionImpulse),h.update(p.bounds,p.vertices,f.velocity),p.position.x+=f.positionImpulse.x,p.position.y+=f.positionImpulse.y}f.positionPrev.x+=f.positionImpulse.x,f.positionPrev.y+=f.positionImpulse.y,o.dot(f.positionImpulse,f.velocity)<0?(f.positionImpulse.x=0,f.positionImpulse.y=0):(f.positionImpulse.x*=i._positionWarming,f.positionImpulse.y*=i._positionWarming)}}},i.preSolveVelocity=function(u){var d,f,c,p,v,m,g,T,M,x,w,y,_,b,S=o._temp[0],E=o._temp[1];for(d=0;d<u.length;d++)if(c=u[d],!(!c.isActive||c.isSensor))for(p=c.activeContacts,v=c.collision,m=v.parentA,g=v.parentB,T=v.normal,M=v.tangent,f=0;f<p.length;f++)x=p[f],w=x.vertex,y=x.normalImpulse,_=x.tangentImpulse,(y!==0||_!==0)&&(S.x=T.x*y+M.x*_,S.y=T.y*y+M.y*_,m.isStatic||m.isSleeping||(b=o.sub(w,m.position,E),m.positionPrev.x+=S.x*m.inverseMass,m.positionPrev.y+=S.y*m.inverseMass,m.anglePrev+=o.cross(b,S)*m.inverseInertia),g.isStatic||g.isSleeping||(b=o.sub(w,g.position,E),g.positionPrev.x-=S.x*g.inverseMass,g.positionPrev.y-=S.y*g.inverseMass,g.anglePrev-=o.cross(b,S)*g.inverseInertia))},i.solveVelocity=function(u,d){for(var f=d*d,c=o._temp[0],p=o._temp[1],v=o._temp[2],m=o._temp[3],g=o._temp[4],T=o._temp[5],M=0;M<u.length;M++){var x=u[M];if(!(!x.isActive||x.isSensor)){var w=x.collision,y=w.parentA,_=w.parentB,b=w.normal,S=w.tangent,E=x.activeContacts,A=1/E.length;y.velocity.x=y.position.x-y.positionPrev.x,y.velocity.y=y.position.y-y.positionPrev.y,_.velocity.x=_.position.x-_.positionPrev.x,_.velocity.y=_.position.y-_.positionPrev.y,y.angularVelocity=y.angle-y.anglePrev,_.angularVelocity=_.angle-_.anglePrev;for(var U=0;U<E.length;U++){var I=E[U],F=I.vertex,k=o.sub(F,y.position,p),O=o.sub(F,_.position,v),Z=o.add(y.velocity,o.mult(o.perp(k),y.angularVelocity),m),G=o.add(_.velocity,o.mult(o.perp(O),_.angularVelocity),g),ie=o.sub(Z,G,T),re=o.dot(b,ie),te=o.dot(S,ie),Se=Math.abs(te),De=l.sign(te),N=(1+x.restitution)*re,X=l.clamp(x.separation+re,0,1)*i._frictionNormalMultiplier,ee=te,K=1/0;Se>x.friction*x.frictionStatic*X*f&&(K=Se,ee=l.clamp(x.friction*De*f,-K,K));var de=o.cross(k,b),Le=o.cross(O,b),be=A/(y.inverseMass+_.inverseMass+y.inverseInertia*de*de+_.inverseInertia*Le*Le);if(N*=be,ee*=be,re<0&&re*re>i._restingThresh*f)I.normalImpulse=0;else{var We=I.normalImpulse;I.normalImpulse=Math.min(I.normalImpulse+N,0),N=I.normalImpulse-We}if(te*te>i._restingThreshTangent*f)I.tangentImpulse=0;else{var Q=I.tangentImpulse;I.tangentImpulse=l.clamp(I.tangentImpulse+ee,-K,K),ee=I.tangentImpulse-Q}c.x=b.x*N+S.x*ee,c.y=b.y*N+S.y*ee,y.isStatic||y.isSleeping||(y.positionPrev.x+=c.x*y.inverseMass,y.positionPrev.y+=c.y*y.inverseMass,y.anglePrev+=o.cross(k,c)*y.inverseInertia),_.isStatic||_.isSleeping||(_.positionPrev.x-=c.x*_.inverseMass,_.positionPrev.y-=c.y*_.inverseMass,_.anglePrev-=o.cross(O,c)*_.inverseInertia)}}}}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(9),o=s(0);(function(){i._pairMaxIdleLife=1e3,i.create=function(l){return o.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},l)},i.update=function(l,h,u){var d=l.list,f=l.table,c=l.collisionStart,p=l.collisionEnd,v=l.collisionActive,m,g,T,M;for(c.length=0,p.length=0,v.length=0,M=0;M<d.length;M++)d[M].confirmedActive=!1;for(M=0;M<h.length;M++)m=h[M],m.collided&&(g=a.id(m.bodyA,m.bodyB),T=f[g],T?(T.isActive?v.push(T):c.push(T),a.update(T,m,u),T.confirmedActive=!0):(T=a.create(m,u),f[g]=T,c.push(T),d.push(T)));for(M=0;M<d.length;M++)T=d[M],T.isActive&&!T.confirmedActive&&(a.setActive(T,!1,u),p.push(T))},i.removeOld=function(l,h){var u=l.list,d=l.table,f=[],c,p,v,m;for(m=0;m<u.length;m++){if(c=u[m],p=c.collision,p.bodyA.isSleeping||p.bodyB.isSleeping){c.timeUpdated=h;continue}h-c.timeUpdated>i._pairMaxIdleLife&&f.push(m)}for(m=0;m<f.length;m++)v=f[m]-m,c=u[v],delete d[c.id],u.splice(v,1)},i.clear=function(l){return l.table={},l.list.length=0,l.collisionStart.length=0,l.collisionActive.length=0,l.collisionEnd.length=0,l}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(9),o=s(0);(function(){i.create=function(l){var h={buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return o.extend(h,l)},i.update=function(l,h,u,d){var f,c,p,v=u.world,m=l.buckets,g,T,M=!1;for(f=0;f<h.length;f++){var x=h[f];if(!(x.isSleeping&&!d)&&!(v.bounds&&(x.bounds.max.x<v.bounds.min.x||x.bounds.min.x>v.bounds.max.x||x.bounds.max.y<v.bounds.min.y||x.bounds.min.y>v.bounds.max.y))){var w=i._getRegion(l,x);if(!x.region||w.id!==x.region.id||d){(!x.region||d)&&(x.region=w);var y=i._regionUnion(w,x.region);for(c=y.startCol;c<=y.endCol;c++)for(p=y.startRow;p<=y.endRow;p++){T=i._getBucketId(c,p),g=m[T];var _=c>=w.startCol&&c<=w.endCol&&p>=w.startRow&&p<=w.endRow,b=c>=x.region.startCol&&c<=x.region.endCol&&p>=x.region.startRow&&p<=x.region.endRow;!_&&b&&b&&g&&i._bucketRemoveBody(l,g,x),(x.region===w||_&&!b||d)&&(g||(g=i._createBucket(m,T)),i._bucketAddBody(l,g,x))}x.region=w,M=!0}}}M&&(l.pairsList=i._createActivePairsList(l))},i.clear=function(l){l.buckets={},l.pairs={},l.pairsList=[]},i._regionUnion=function(l,h){var u=Math.min(l.startCol,h.startCol),d=Math.max(l.endCol,h.endCol),f=Math.min(l.startRow,h.startRow),c=Math.max(l.endRow,h.endRow);return i._createRegion(u,d,f,c)},i._getRegion=function(l,h){var u=h.bounds,d=Math.floor(u.min.x/l.bucketWidth),f=Math.floor(u.max.x/l.bucketWidth),c=Math.floor(u.min.y/l.bucketHeight),p=Math.floor(u.max.y/l.bucketHeight);return i._createRegion(d,f,c,p)},i._createRegion=function(l,h,u,d){return{id:l+","+h+","+u+","+d,startCol:l,endCol:h,startRow:u,endRow:d}},i._getBucketId=function(l,h){return"C"+l+"R"+h},i._createBucket=function(l,h){var u=l[h]=[];return u},i._bucketAddBody=function(l,h,u){for(var d=0;d<h.length;d++){var f=h[d];if(!(u.id===f.id||u.isStatic&&f.isStatic)){var c=a.id(u,f),p=l.pairs[c];p?p[2]+=1:l.pairs[c]=[u,f,1]}}h.push(u)},i._bucketRemoveBody=function(l,h,u){h.splice(o.indexOf(h,u),1);for(var d=0;d<h.length;d++){var f=h[d],c=a.id(u,f),p=l.pairs[c];p&&(p[2]-=1)}},i._createActivePairsList=function(l){var h,u,d=[];h=o.keys(l.pairs);for(var f=0;f<h.length;f++)u=l.pairs[h[f]],u[2]>0?d.push(u):delete l.pairs[h[f]];return d}})()}),(function(t,n,s){var i=t.exports=s(23);i.Axes=s(10),i.Bodies=s(11),i.Body=s(6),i.Bounds=s(1),i.Common=s(0),i.Composite=s(5),i.Composites=s(24),i.Constraint=s(8),i.Contact=s(17),i.Detector=s(13),i.Engine=s(18),i.Events=s(4),i.Grid=s(21),i.Mouse=s(12),i.MouseConstraint=s(25),i.Pair=s(9),i.Pairs=s(20),i.Plugin=s(15),i.Query=s(26),i.Render=s(16),i.Resolver=s(19),i.Runner=s(27),i.SAT=s(14),i.Sleeping=s(7),i.Svg=s(28),i.Vector=s(2),i.Vertices=s(3),i.World=s(29),i.Engine.run=i.Runner.run,i.Common.deprecated(i.Engine,"run","Engine.run ➤ use Matter.Runner.run(engine) instead")}),(function(t,n,s){var i={};t.exports=i;var a=s(15),o=s(0);(function(){i.name="matter-js",i.version="0.17.1",i.uses=[],i.used=[],i.use=function(){a.use(i,Array.prototype.slice.call(arguments))},i.before=function(l,h){return l=l.replace(/^Matter./,""),o.chainPathBefore(i,l,h)},i.after=function(l,h){return l=l.replace(/^Matter./,""),o.chainPathAfter(i,l,h)}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(5),o=s(8),l=s(0),h=s(6),u=s(11),d=l.deprecated;(function(){i.stack=function(f,c,p,v,m,g,T){for(var M=a.create({label:"Stack"}),x=f,w=c,y,_=0,b=0;b<v;b++){for(var S=0,E=0;E<p;E++){var A=T(x,w,E,b,y,_);if(A){var U=A.bounds.max.y-A.bounds.min.y,I=A.bounds.max.x-A.bounds.min.x;U>S&&(S=U),h.translate(A,{x:I*.5,y:U*.5}),x=A.bounds.max.x+m,a.addBody(M,A),y=A,_+=1}else x+=m}w+=S+g,x=f}return M},i.chain=function(f,c,p,v,m,g){for(var T=f.bodies,M=1;M<T.length;M++){var x=T[M-1],w=T[M],y=x.bounds.max.y-x.bounds.min.y,_=x.bounds.max.x-x.bounds.min.x,b=w.bounds.max.y-w.bounds.min.y,S=w.bounds.max.x-w.bounds.min.x,E={bodyA:x,pointA:{x:_*c,y:y*p},bodyB:w,pointB:{x:S*v,y:b*m}},A=l.extend(E,g);a.addConstraint(f,o.create(A))}return f.label+=" Chain",f},i.mesh=function(f,c,p,v,m){var g=f.bodies,T,M,x,w,y;for(T=0;T<p;T++){for(M=1;M<c;M++)x=g[M-1+T*c],w=g[M+T*c],a.addConstraint(f,o.create(l.extend({bodyA:x,bodyB:w},m)));if(T>0)for(M=0;M<c;M++)x=g[M+(T-1)*c],w=g[M+T*c],a.addConstraint(f,o.create(l.extend({bodyA:x,bodyB:w},m))),v&&M>0&&(y=g[M-1+(T-1)*c],a.addConstraint(f,o.create(l.extend({bodyA:y,bodyB:w},m)))),v&&M<c-1&&(y=g[M+1+(T-1)*c],a.addConstraint(f,o.create(l.extend({bodyA:y,bodyB:w},m))))}return f.label+=" Mesh",f},i.pyramid=function(f,c,p,v,m,g,T){return i.stack(f,c,p,v,m,g,function(M,x,w,y,_,b){var S=Math.min(v,Math.ceil(p/2)),E=_?_.bounds.max.x-_.bounds.min.x:0;if(!(y>S)){y=S-y;var A=y,U=p-1-y;if(!(w<A||w>U)){b===1&&h.translate(_,{x:(w+(p%2===1?1:-1))*E,y:0});var I=_?w*E:0;return T(f+I+w*m,x,w,y,_,b)}}})},i.newtonsCradle=function(f,c,p,v,m){for(var g=a.create({label:"Newtons Cradle"}),T=0;T<p;T++){var M=1.9,x=u.circle(f+T*(v*M),c+m,v,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),w=o.create({pointA:{x:f+T*(v*M),y:c},bodyB:x});a.addBody(g,x),a.addConstraint(g,w)}return g},d(i,"newtonsCradle","Composites.newtonsCradle ➤ moved to newtonsCradle example"),i.car=function(f,c,p,v,m){var g=h.nextGroup(!0),T=20,M=-p*.5+T,x=p*.5-T,w=0,y=a.create({label:"Car"}),_=u.rectangle(f,c,p,v,{collisionFilter:{group:g},chamfer:{radius:v*.5},density:2e-4}),b=u.circle(f+M,c+w,m,{collisionFilter:{group:g},friction:.8}),S=u.circle(f+x,c+w,m,{collisionFilter:{group:g},friction:.8}),E=o.create({bodyB:_,pointB:{x:M,y:w},bodyA:b,stiffness:1,length:0}),A=o.create({bodyB:_,pointB:{x,y:w},bodyA:S,stiffness:1,length:0});return a.addBody(y,_),a.addBody(y,b),a.addBody(y,S),a.addConstraint(y,E),a.addConstraint(y,A),y},d(i,"car","Composites.car ➤ moved to car example"),i.softBody=function(f,c,p,v,m,g,T,M,x,w){x=l.extend({inertia:1/0},x),w=l.extend({stiffness:.2,render:{type:"line",anchors:!1}},w);var y=i.stack(f,c,p,v,m,g,function(_,b){return u.circle(_,b,M,x)});return i.mesh(y,p,v,T,w),y.label="Soft Body",y},d(i,"softBody","Composites.softBody ➤ moved to softBody and cloth examples")})()}),(function(t,n,s){var i={};t.exports=i;var a=s(3),o=s(7),l=s(12),h=s(4),u=s(13),d=s(8),f=s(5),c=s(0),p=s(1);(function(){i.create=function(v,m){var g=(v?v.mouse:null)||(m?m.mouse:null);g||(v&&v.render&&v.render.canvas?g=l.create(v.render.canvas):m&&m.element?g=l.create(m.element):(g=l.create(),c.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var T=d.create({label:"Mouse Constraint",pointA:g.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),M={type:"mouseConstraint",mouse:g,element:null,body:null,constraint:T,collisionFilter:{category:1,mask:4294967295,group:0}},x=c.extend(M,m);return h.on(v,"beforeUpdate",function(){var w=f.allBodies(v.world);i.update(x,w),i._triggerEvents(x)}),x},i.update=function(v,m){var g=v.mouse,T=v.constraint,M=v.body;if(g.button===0){if(T.bodyB)o.set(T.bodyB,!1),T.pointA=g.position;else for(var x=0;x<m.length;x++)if(M=m[x],p.contains(M.bounds,g.position)&&u.canCollide(M.collisionFilter,v.collisionFilter))for(var w=M.parts.length>1?1:0;w<M.parts.length;w++){var y=M.parts[w];if(a.contains(y.vertices,g.position)){T.pointA=g.position,T.bodyB=v.body=M,T.pointB={x:g.position.x-M.position.x,y:g.position.y-M.position.y},T.angleB=M.angle,o.set(M,!1),h.trigger(v,"startdrag",{mouse:g,body:M});break}}}else T.bodyB=v.body=null,T.pointB=null,M&&h.trigger(v,"enddrag",{mouse:g,body:M})},i._triggerEvents=function(v){var m=v.mouse,g=m.sourceEvents;g.mousemove&&h.trigger(v,"mousemove",{mouse:m}),g.mousedown&&h.trigger(v,"mousedown",{mouse:m}),g.mouseup&&h.trigger(v,"mouseup",{mouse:m}),l.clearSourceEvents(m)}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(2),o=s(14),l=s(1),h=s(11),u=s(3);(function(){i.collides=function(d,f){for(var c=[],p=0;p<f.length;p++){var v=f[p];if(l.overlaps(v.bounds,d.bounds))for(var m=v.parts.length===1?0:1;m<v.parts.length;m++){var g=v.parts[m];if(l.overlaps(g.bounds,d.bounds)){var T=o.collides(g,d);if(T.collided){c.push(T);break}}}}return c},i.ray=function(d,f,c,p){p=p||1e-100;for(var v=a.angle(f,c),m=a.magnitude(a.sub(f,c)),g=(c.x+f.x)*.5,T=(c.y+f.y)*.5,M=h.rectangle(g,T,m,p,{angle:v}),x=i.collides(M,d),w=0;w<x.length;w+=1){var y=x[w];y.body=y.bodyB=y.bodyA}return x},i.region=function(d,f,c){for(var p=[],v=0;v<d.length;v++){var m=d[v],g=l.overlaps(m.bounds,f);(g&&!c||!g&&c)&&p.push(m)}return p},i.point=function(d,f){for(var c=[],p=0;p<d.length;p++){var v=d[p];if(l.contains(v.bounds,f))for(var m=v.parts.length===1?0:1;m<v.parts.length;m++){var g=v.parts[m];if(l.contains(g.bounds,f)&&u.contains(g.vertices,f)){c.push(v);break}}}return c}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(4),o=s(18),l=s(0);(function(){var h,u;if(typeof window<"u"&&(h=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,u=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),!h){var d;h=function(f){d=setTimeout(function(){f(l.now())},1e3/60)},u=function(){clearTimeout(d)}}i.create=function(f){var c={fps:60,correction:1,deltaSampleSize:60,counterTimestamp:0,frameCounter:0,deltaHistory:[],timePrev:null,timeScalePrev:1,frameRequestId:null,isFixed:!1,enabled:!0},p=l.extend(c,f);return p.delta=p.delta||1e3/p.fps,p.deltaMin=p.deltaMin||1e3/p.fps,p.deltaMax=p.deltaMax||1e3/(p.fps*.5),p.fps=1e3/p.delta,p},i.run=function(f,c){return typeof f.positionIterations<"u"&&(c=f,f=i.create()),(function p(v){f.frameRequestId=h(p),v&&f.enabled&&i.tick(f,c,v)})(),f},i.tick=function(f,c,p){var v=c.timing,m=1,g,T={timestamp:v.timestamp};a.trigger(f,"beforeTick",T),f.isFixed?g=f.delta:(g=p-f.timePrev||f.delta,f.timePrev=p,f.deltaHistory.push(g),f.deltaHistory=f.deltaHistory.slice(-f.deltaSampleSize),g=Math.min.apply(null,f.deltaHistory),g=g<f.deltaMin?f.deltaMin:g,g=g>f.deltaMax?f.deltaMax:g,m=g/f.delta,f.delta=g),f.timeScalePrev!==0&&(m*=v.timeScale/f.timeScalePrev),v.timeScale===0&&(m=0),f.timeScalePrev=v.timeScale,f.correction=m,f.frameCounter+=1,p-f.counterTimestamp>=1e3&&(f.fps=f.frameCounter*((p-f.counterTimestamp)/1e3),f.counterTimestamp=p,f.frameCounter=0),a.trigger(f,"tick",T),a.trigger(f,"beforeUpdate",T),o.update(c,g,m),a.trigger(f,"afterUpdate",T),a.trigger(f,"afterTick",T)},i.stop=function(f){u(f.frameRequestId)},i.start=function(f,c){i.run(f,c)}})()}),(function(t,n,s){var i={};t.exports=i,s(1);var a=s(0);(function(){i.pathToVertices=function(o,l){typeof window<"u"&&!("SVGPathSeg"in window)&&a.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");var h,u,d,f,c,p,v,m,g,T,M=[],x,w,y=0,_=0,b=0;l=l||15;var S=function(A,U,I){var F=I%2===1&&I>1;if(!g||A!=g.x||U!=g.y){g&&F?(x=g.x,w=g.y):(x=0,w=0);var k={x:x+A,y:w+U};(F||!g)&&(g=k),M.push(k),_=x+A,b=w+U}},E=function(A){var U=A.pathSegTypeAsLetter.toUpperCase();if(U!=="Z"){switch(U){case"M":case"L":case"T":case"C":case"S":case"Q":_=A.x,b=A.y;break;case"H":_=A.x;break;case"V":b=A.y;break}S(_,b,A.pathSegType)}};for(i._svgPathToAbsolute(o),d=o.getTotalLength(),p=[],h=0;h<o.pathSegList.numberOfItems;h+=1)p.push(o.pathSegList.getItem(h));for(v=p.concat();y<d;){if(T=o.getPathSegAtLength(y),c=p[T],c!=m){for(;v.length&&v[0]!=c;)E(v.shift());m=c}switch(c.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":f=o.getPointAtLength(y),S(f.x,f.y,0);break}y+=l}for(h=0,u=v.length;h<u;++h)E(v[h]);return M},i._svgPathToAbsolute=function(o){for(var l,h,u,d,f,c,p=o.pathSegList,v=0,m=0,g=p.numberOfItems,T=0;T<g;++T){var M=p.getItem(T),x=M.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(x))"x"in M&&(v=M.x),"y"in M&&(m=M.y);else switch("x1"in M&&(u=v+M.x1),"x2"in M&&(f=v+M.x2),"y1"in M&&(d=m+M.y1),"y2"in M&&(c=m+M.y2),"x"in M&&(v+=M.x),"y"in M&&(m+=M.y),x){case"m":p.replaceItem(o.createSVGPathSegMovetoAbs(v,m),T);break;case"l":p.replaceItem(o.createSVGPathSegLinetoAbs(v,m),T);break;case"h":p.replaceItem(o.createSVGPathSegLinetoHorizontalAbs(v),T);break;case"v":p.replaceItem(o.createSVGPathSegLinetoVerticalAbs(m),T);break;case"c":p.replaceItem(o.createSVGPathSegCurvetoCubicAbs(v,m,u,d,f,c),T);break;case"s":p.replaceItem(o.createSVGPathSegCurvetoCubicSmoothAbs(v,m,f,c),T);break;case"q":p.replaceItem(o.createSVGPathSegCurvetoQuadraticAbs(v,m,u,d),T);break;case"t":p.replaceItem(o.createSVGPathSegCurvetoQuadraticSmoothAbs(v,m),T);break;case"a":p.replaceItem(o.createSVGPathSegArcAbs(v,m,M.r1,M.r2,M.angle,M.largeArcFlag,M.sweepFlag),T);break;case"z":case"Z":v=l,m=h;break}(x=="M"||x=="m")&&(l=v,h=m)}}})()}),(function(t,n,s){var i={};t.exports=i;var a=s(5);s(0),(function(){i.create=a.create,i.add=a.add,i.remove=a.remove,i.clear=a.clear,i.addComposite=a.addComposite,i.addBody=a.addBody,i.addConstraint=a.addConstraint})()})])})})(cr)),cr.exports}Cg();class Rg extends Ic{constructor(){super();const e=new an;e.deleteAttribute("uv");const t=new at({side:Gt}),n=new at,s=new mr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const i=new Ne(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);const a=new Ne(e,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new Ne(e,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const l=new Ne(e,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const h=new Ne(e,n);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);const u=new Ne(e,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const d=new Ne(e,n);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);const f=new Ne(e,Ci(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const c=new Ne(e,Ci(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const p=new Ne(e,Ci(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);const v=new Ne(e,Ci(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const m=new Ne(e,Ci(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const g=new Ne(e,Ci(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Ci(r){const e=new Xt;return e.color.setScalar(r),e}const Pe={minX:-15,maxX:15,minZ:-12,maxZ:12,wallH:7.6},et={w:1.1,d:1,h:1,halfH:.5,bodyBottom:.12},It={red:{label:"RED",zh:"红色",hex:"#c9463c",dark:"#7d231e"},yellow:{label:"YELLOW",zh:"黄色",hex:"#dea62b",dark:"#8f6412"},blue:{label:"BLUE",zh:"蓝色",hex:"#3b6ea8",dark:"#1f4066"}},Ct={x:-9.4,z:4.6,yaw:Math.PI},Pg=1.65,tc=[{color:"red",x:-11.8,z:-1.2},{color:"yellow",x:-9.4,z:-1.2},{color:"blue",x:-7,z:-1.2}],ai=[{color:"red",x:10.4,z:-4.6,w:2.9,d:2.9},{color:"yellow",x:10.4,z:.4,w:2.9,d:2.9},{color:"blue",x:10.4,z:5.4,w:2.9,d:2.9}],ho=120,uo=1.75,Lg=.95,js=.1,Qs={lateral:.25,height:.15,angleDeg:15,insertion:.3},Ig=.05,er={stableSeconds:.5,maxBottom:.06,maxSpeed:.1};let fo=20261021;function Ye(){return fo=(fo*1664525+1013904223)%4294967296,fo/4294967296}function jt(r,e){const t=document.createElement("canvas");return t.width=r,t.height=e,{c:t,g:t.getContext("2d")}}function Qt(r,e){const t=new xr(r);return t.colorSpace=Dt,t.anisotropy=8,e&&(t.wrapS=t.wrapT=hr,t.repeat.set(e[0],e[1])),t}function Dg(r,e,t){r.fillStyle="#78766d",r.fillRect(0,0,e,t);for(let n=0;n<26e3;n++){const s=92+Math.floor(Ye()*60);r.fillStyle=`rgba(${s},${s-2},${s-8},${.05+Ye()*.13})`;const i=1+Ye()*3.2;r.fillRect(Ye()*e,Ye()*t,i,i)}for(let n=0;n<26;n++){const s=Ye()*e,i=Ye()*t,a=25+Ye()*130,o=r.createRadialGradient(s,i,0,s,i,a),l=Ye()>.45;o.addColorStop(0,l?"rgba(44,43,39,0.17)":"rgba(196,192,180,0.10)"),o.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=o,r.beginPath(),r.arc(s,i,a,0,Math.PI*2),r.fill()}r.strokeStyle="rgba(38,37,34,0.42)",r.lineWidth=2;for(const n of[.25,.5,.75])r.beginPath(),r.moveTo(n*e+.5,0),r.lineTo(n*e+.5,t),r.stroke(),r.beginPath(),r.moveTo(0,n*t+.5),r.lineTo(e,n*t+.5),r.stroke();r.strokeStyle="rgba(30,29,27,0.30)";for(let n=0;n<15;n++){let s=Ye()*e,i=Ye()*t;r.lineWidth=.6+Ye(),r.beginPath(),r.moveTo(s,i);for(let a=0;a<9;a++)s+=(Ye()-.5)*70,i+=(Ye()-.5)*70,r.lineTo(s,i);r.stroke()}}function Ug(){const{c:r,g:e}=jt(1024,1024);return Dg(e,1024,1024),Qt(r,[7,5.5])}function Ng(){const{c:r,g:e}=jt(512,512);e.fillStyle="#808080",e.fillRect(0,0,512,512);for(let n=0;n<14e3;n++){const s=105+Math.floor(Ye()*60);e.fillStyle=`rgb(${s},${s},${s})`,e.fillRect(Ye()*512,Ye()*512,1+Ye()*2,1+Ye()*2)}const t=Qt(r,[7,5.5]);return t.colorSpace=Rn,t}function Fg(){const{c:r,g:e}=jt(512,512),t=e.createLinearGradient(0,0,0,512);t.addColorStop(0,"#8d9492"),t.addColorStop(.55,"#7e8584"),t.addColorStop(1,"#6b7271"),e.fillStyle=t,e.fillRect(0,0,512,512);for(let n=0;n<512;n+=32){const s=e.createLinearGradient(n,0,n+32,0);s.addColorStop(0,"rgba(255,255,255,0.16)"),s.addColorStop(.35,"rgba(255,255,255,0.03)"),s.addColorStop(.62,"rgba(0,0,0,0.16)"),s.addColorStop(1,"rgba(0,0,0,0.02)"),e.fillStyle=s,e.fillRect(n,0,32,512)}for(let n=0;n<260;n++)e.fillStyle=`rgba(${30+Ye()*40},${29+Ye()*40},${27+Ye()*40},${Ye()*.13})`,e.fillRect(Ye()*512,400+Ye()*112,3+Ye()*30,1+Ye()*5);return Qt(r,[10,1])}function th(r,e,t){r.fillStyle="#b98c53",r.fillRect(0,0,e,t);for(let n=0;n<70;n++){const s=Ye()*t;r.strokeStyle=`rgba(${80+Ye()*50},${50+Ye()*35},${20+Ye()*25},${.05+Ye()*.16})`,r.lineWidth=.5+Ye()*2.4,r.beginPath();for(let i=0;i<=e;i+=16){const a=s+Math.sin(i/e*Math.PI*(2+Ye()*4)+n)*(2+Ye()*7);i===0?r.moveTo(i,a):r.lineTo(i,a)}r.stroke()}for(let n=0;n<40;n++){const s=Ye()*e,i=Ye()*t;r.strokeStyle="rgba(84,54,26,0.22)",r.lineWidth=1,r.beginPath(),r.ellipse(s,i,2+Ye()*7,1+Ye()*2.5,0,0,Math.PI*2),r.stroke()}r.strokeStyle="rgba(64,42,20,0.35)",r.lineWidth=2;for(let n=0;n<t;n+=t/5)r.beginPath(),r.moveTo(0,n),r.lineTo(e,n),r.stroke()}function Og(r){const e=It[r],{c:t,g:n}=jt(512,512);th(n,512,512),n.fillStyle=e.hex,n.fillRect(34,76,444,330),n.strokeStyle="rgba(255,255,255,0.82)",n.lineWidth=7,n.strokeRect(48,90,416,302),n.setLineDash([16,10]),n.lineWidth=2,n.strokeStyle="rgba(255,255,255,0.45)",n.strokeRect(62,104,388,274),n.setLineDash([]),n.fillStyle="rgba(0,0,0,0.13)";for(let a=0;a<240;a++)n.fillRect(34+Ye()*444,76+Ye()*330,1+Ye()*6,1+Ye()*2);n.textAlign="center",n.fillStyle="#f7f3e6",n.font='800 66px "Helvetica Neue", Arial, sans-serif',n.fillText(e.label,256,225),n.font='700 43px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(e.zh+"货箱",256,285),n.font='600 25px "Helvetica Neue", Arial, sans-serif',n.fillText("PELICAN CARGO · ACADEMY",256,340),n.strokeStyle="rgba(255,255,255,0.7)",n.lineWidth=5;const s=26,i=54;for(const[a,o,l,h]of[[s,s,1,1],[512-s,s,-1,1],[s,512-s,1,-1],[512-s,512-s,-1,-1]])n.beginPath(),n.moveTo(a+l*i,o),n.lineTo(a,o),n.lineTo(a,o+h*i),n.stroke();return n.textAlign="left",n.fillStyle="rgba(30,20,10,0.55)",n.font='700 22px "Helvetica Neue", Arial, sans-serif',n.fillText("FL-ACADEMY / 03",40,470),n.textAlign="right",n.fillText("1.0 m³ · 240 kg",472,470),Qt(t)}function Bg(){const{c:r,g:e}=jt(512,512);th(e,512,512),e.strokeStyle="rgba(50,34,16,0.5)",e.lineWidth=4,e.strokeRect(12,12,488,488),e.strokeStyle="rgba(50,34,16,0.28)",e.lineWidth=2;for(let t=0;t<512;t+=64)e.beginPath(),e.moveTo(t,0),e.lineTo(t,512),e.stroke();return e.fillStyle="rgba(38,28,16,0.5)",e.font='700 30px "Helvetica Neue", Arial, sans-serif',e.textAlign="center",e.fillText("PELICAN · FRAGILE",256,274),Qt(r)}function zg(){const{c:r,g:e}=jt(256,64);e.fillStyle="#d7a92b",e.fillRect(0,0,256,64),e.fillStyle="#232629";for(let t=-64;t<256;t+=64)e.beginPath(),e.moveTo(t,64),e.lineTo(t+32,64),e.lineTo(t+96,0),e.lineTo(t+64,0),e.fill();return Qt(r,[1,1])}function nc(r,e=1024,t=512){const{c:n,g:s}=jt(e,t);return s.fillStyle=r.bg,s.fillRect(0,0,e,t),s.strokeStyle=r.accent??r.fg,s.lineWidth=14,s.strokeRect(22,22,e-44,t-44),s.strokeStyle="rgba(255,255,255,0.16)",s.lineWidth=3,s.strokeRect(44,44,e-88,t-88),s.textAlign="center",s.fillStyle=r.fg,s.font='800 104px "Helvetica Neue", Arial, sans-serif',s.fillText(r.title,e/2,196),r.zh&&(s.font='700 70px "PingFang SC", "Microsoft YaHei", sans-serif',s.fillText(r.zh,e/2,292)),r.sub&&(s.font='600 34px "Helvetica Neue", Arial, sans-serif',s.fillStyle="rgba(255,255,255,0.78)",s.fillText(r.sub,e/2,370)),s.fillStyle=r.accent??r.fg,s.beginPath(),s.moveTo(e/2-60,t-82),s.lineTo(e/2,t-118),s.lineTo(e/2+60,t-82),s.lineTo(e/2+32,t-82),s.lineTo(e/2+32,t-54),s.lineTo(e/2-32,t-54),s.lineTo(e/2-32,t-82),s.fill(),Qt(n)}function kg(){const{c:r,g:e}=jt(2048,512);e.fillStyle="#12211f",e.fillRect(0,0,2048,512);const t=e.createLinearGradient(0,0,2048,512);return t.addColorStop(0,"rgba(46,139,126,0.55)"),t.addColorStop(.6,"rgba(12,32,30,0)"),t.addColorStop(1,"rgba(199,148,55,0.32)"),e.fillStyle=t,e.fillRect(0,0,2048,512),e.strokeStyle="rgba(240,206,136,0.7)",e.lineWidth=6,e.strokeRect(34,34,1980,444),e.textAlign="left",e.fillStyle="#f0d9a4",e.font='800 142px "Helvetica Neue", Arial, sans-serif',e.fillText("PELICAN",110,210),e.fillStyle="#eef4ef",e.font='800 92px "Helvetica Neue", Arial, sans-serif',e.fillText("FORKLIFT ACADEMY",110,320),e.fillStyle="#8fd3c6",e.font='700 64px "PingFang SC", "Microsoft YaHei", sans-serif',e.fillText("鹈 鹕 叉 车 驾 校",112,418),e.strokeStyle="#f0d9a4",e.lineWidth=10,e.beginPath(),e.arc(1740,200,92,.4,Math.PI*1.72),e.stroke(),e.beginPath(),e.moveTo(1770,186),e.quadraticCurveTo(1890,196,1930,238),e.quadraticCurveTo(1840,252,1796,224),e.stroke(),e.fillStyle="#2e8b7e",e.beginPath(),e.arc(1712,196,15,0,7),e.fill(),e.fillStyle="rgba(240,217,164,0.9)",e.font='700 34px "Helvetica Neue", Arial, sans-serif',e.fillText("BAY 03 · TRAINING GROUND",1420,428),Qt(r)}function po(r){const{c:e,g:t}=jt(512,720);return r===0?(t.fillStyle="#e9e2cf",t.fillRect(0,0,512,720),t.fillStyle="#d9a52c",t.fillRect(0,0,512,128),t.fillStyle="#1d2a2b",t.font='800 64px "Helvetica Neue", Arial, sans-serif',t.fillText("SAFETY",40,88),t.fillStyle="#263231",t.font='800 52px "PingFang SC", sans-serif',t.fillText("安全第一",40,230),t.strokeStyle="#263231",t.lineWidth=8,t.beginPath(),t.arc(256,470,150,0,Math.PI*2),t.stroke(),t.strokeStyle="#c9463c",t.lineWidth=22,t.beginPath(),t.arc(256,470,118,-.7,Math.PI*.9),t.stroke(),t.fillStyle="#263231",t.font='700 32px "Helvetica Neue", Arial, sans-serif',t.textAlign="center",t.fillText("WEAR · BELT · SLOW",256,670)):r===1?(t.fillStyle="#203230",t.fillRect(0,0,512,720),t.fillStyle="#e8d8ae",t.font='800 46px "PingFang SC", sans-serif',t.fillText("叉车通道",40,96),t.fillStyle="#8fd3c6",t.font='700 30px "Helvetica Neue", Arial, sans-serif',t.fillText("FORKLIFT LANE",40,142),t.strokeStyle="#d7a92b",t.lineWidth=10,t.setLineDash([28,18]),t.beginPath(),t.moveTo(256,650),t.lineTo(256,220),t.stroke(),t.setLineDash([]),t.fillStyle="#d7a92b",t.beginPath(),t.moveTo(256,176),t.lineTo(316,268),t.lineTo(196,268),t.fill(),t.strokeStyle="#e8d8ae",t.lineWidth=5,t.strokeRect(40,56,432,600)):(t.fillStyle="#efe7d6",t.fillRect(0,0,512,720),t.fillStyle="#c9463c",t.fillRect(0,0,512,150),t.fillStyle="#fff6e8",t.font='800 58px "Helvetica Neue", Arial, sans-serif',t.textAlign="center",t.fillText("CHECK",256,92),t.fillText("THE FORKS",256,140),t.fillStyle="#26302f",t.font='700 30px "PingFang SC", sans-serif',t.fillText("每 次 起 步 前 检 查 门 架",256,250),t.strokeStyle="#26302f",t.lineWidth=7,t.beginPath(),t.moveTo(130,430),t.lineTo(130,300),t.lineTo(382,300),t.stroke(),t.beginPath(),t.moveTo(150,590),t.lineTo(150,452),t.lineTo(362,452),t.stroke(),t.lineWidth=13,t.beginPath(),t.moveTo(150,590),t.lineTo(150,690),t.stroke(),t.beginPath(),t.moveTo(362,590),t.lineTo(362,690),t.stroke(),t.fillStyle="#d9a52c",t.font='800 34px "PingFang SC", sans-serif',t.fillText("门架 · 货叉 · 载荷",256,670)),Qt(e)}function Vg(){const{c:r,g:e}=jt(1024,512);e.fillStyle="#151b1c",e.fillRect(0,0,1024,512),e.strokeStyle="#303b3c",e.lineWidth=10,e.strokeRect(8,8,1008,496),e.textAlign="center";const t=(n,s)=>{e.strokeStyle="#5b6b69",e.lineWidth=5,e.beginPath(),e.arc(n,260,160,Math.PI*.75,Math.PI*2.25),e.stroke();for(let a=0;a<=20;a++){const o=Math.PI*.75+Math.PI*1.5*a/20,l=160,h=a%4===0?132:144;e.strokeStyle=a>15?"#c9463c":"#aab7b3",e.lineWidth=a%4===0?5:2,e.beginPath(),e.moveTo(n+Math.cos(o)*l,260+Math.sin(o)*l),e.lineTo(n+Math.cos(o)*h,260+Math.sin(o)*h),e.stroke()}const i=Math.PI*.75+Math.PI*1.5*(s==="HOURS"?.58:.3);e.strokeStyle="#e8b45b",e.lineWidth=6,e.beginPath(),e.moveTo(n,260),e.lineTo(n+Math.cos(i)*118,260+Math.sin(i)*118),e.stroke(),e.fillStyle="#0c1011",e.beginPath(),e.arc(n,260,18,0,7),e.fill(),e.strokeStyle="#e8b45b",e.lineWidth=3,e.beginPath(),e.arc(n,260,18,0,7),e.stroke(),e.fillStyle="#9fb0ac",e.font='600 30px "Helvetica Neue", Arial, sans-serif',e.fillText(s,n,450)};return t(280,"HOURS"),t(744,"FUEL"),e.fillStyle="#e8d8ae",e.font='700 28px "Helvetica Neue", Arial, sans-serif',e.fillText("PELICAN · FL-03",512,60),Qt(r)}function Hg(r,e){const{c:t,g:n}=jt(512,256);return n.clearRect(0,0,512,256),n.fillStyle="#f0d9a4",n.font='800 76px "Helvetica Neue", Arial, sans-serif',n.textAlign="center",n.fillText(r,256,120),n.fillStyle="#d7e4df",n.font='700 28px "Helvetica Neue", Arial, sans-serif',n.fillText(e,256,174),Qt(t)}const ot=r=>new at(r),mo=r=>new Hc(r),go={},Gg=Bg();function Wg(r){return go[r]||(go[r]=Og(r)),ot({map:go[r],roughness:.72,metalness:.05})}function Xg(){return ot({map:Gg,roughness:.78})}const V={paint:mo({color:2322278,metalness:.55,roughness:.28,clearcoat:.7,clearcoatRoughness:.22}),paintDark:mo({color:1527625,metalness:.5,roughness:.38,clearcoat:.4}),cream:ot({color:14273449,metalness:.25,roughness:.48}),graphite:ot({color:2369834,metalness:.55,roughness:.55}),castIron:ot({color:3883330,metalness:.7,roughness:.62}),steel:ot({color:10134436,metalness:.92,roughness:.34}),steelDark:ot({color:6121063,metalness:.85,roughness:.45}),chrome:ot({color:14541794,metalness:1,roughness:.1}),rubber:ot({color:1119510,metalness:.02,roughness:.93}),rubberTrim:ot({color:1777697,metalness:.05,roughness:.78}),seat:ot({color:1909283,metalness:.05,roughness:.66}),seatStitch:ot({color:7229236,metalness:.05,roughness:.7}),glass:mo({color:11065040,metalness:0,roughness:.06,transparent:!0,opacity:.16,side:Ut,depthWrite:!1}),feather:ot({color:16052453,metalness:0,roughness:.86}),featherShade:ot({color:14276040,metalness:0,roughness:.9}),featherTip:ot({color:12040626,metalness:0,roughness:.92}),beak:ot({color:15243058,metalness:.08,roughness:.48}),pouch:ot({color:14253869,metalness:.02,roughness:.62}),leg:ot({color:14849343,metalness:.02,roughness:.7}),eye:ot({color:16184296,metalness:0,roughness:.25}),pupil:ot({color:1053718,metalness:0,roughness:.2}),wood:ot({color:12160083,metalness:0,roughness:.78}),woodDark:ot({color:8149553,metalness:0,roughness:.82}),crateFrame:ot({color:10187071,metalness:.03,roughness:.75}),crateMetal:ot({color:7172979,metalness:.8,roughness:.48}),headlight:ot({color:16774358,emissive:16767114,emissiveIntensity:1.5,roughness:.2,metalness:.2}),taillight:ot({color:9314070,emissive:10363414,emissiveIntensity:.9,roughness:.35}),beacon:ot({color:16761415,emissive:16754720,emissiveIntensity:2.2,roughness:.25,transparent:!0,opacity:.9}),hazard:ot({map:zg(),roughness:.6,metalness:.1}),rackBlue:ot({color:3364458,metalness:.55,roughness:.5}),rackOrange:ot({color:11102253,metalness:.45,roughness:.55}),deck:ot({color:9141086,metalness:.15,roughness:.8}),safetyYellow:ot({color:14725164,metalness:.15,roughness:.6})};function Yg(r){const e=It[r],{c:t,g:n}=jt(768,512);n.fillStyle="#12191a",n.fillRect(0,0,768,512),n.fillStyle=e.hex,n.fillRect(0,0,768,118),n.strokeStyle="rgba(255,255,255,0.85)",n.lineWidth=10,n.strokeRect(14,14,740,484),n.textAlign="center",n.fillStyle="#ffffff",n.font='800 70px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(e.zh+"交付区",384,86),n.fillStyle="#f5efdf",n.font='800 92px "Helvetica Neue", Arial, sans-serif',n.fillText(e.label,384,250),n.fillStyle=e.hex,n.fillRect(130,292,508,76),n.fillStyle="#101718",n.font='800 52px "PingFang SC", sans-serif',n.fillText("仅限同色货箱",384,348),n.fillStyle="#b9c6c1",n.font='600 30px "Helvetica Neue", Arial, sans-serif',n.fillText("DROP ZONE · KEEP CLEAR",384,430);for(let s=0;s<8;s++)n.fillStyle=s%2===0?e.hex:"#202829",n.fillRect(60+s*82,462,82,30);return Qt(t)}function qg(){const{c:r,g:e}=jt(256,256),t=e.createRadialGradient(128,128,4,128,128,124);return t.addColorStop(0,"rgba(0,0,0,0.45)"),t.addColorStop(.55,"rgba(0,0,0,0.18)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.beginPath(),e.arc(128,128,124,0,7),e.fill(),Qt(r)}function me(r,e,t,n=0,s=0,i=0,a=0,o=0,l=0,h=!0,u=!0){const d=new Ne(e,t);return d.position.set(n,s,i),d.rotation.set(a,o,l),d.castShadow=h,d.receiveShadow=u,r.add(d),d}function oe(r,e,t,n,s,i,a,o,l=0,h=0,u=0,d=!0){return me(r,new an(e,t,n),o,s,i,a,l,h,u,d,!0)}function Zg(r,e,t,n=.05,s=.02,i=3){const a=Math.min(s,r*.24,e*.24,t*.24),o=Math.max(.002,Math.min(n,r/2-a-.001,e/2-a-.001)),l=new _s,h=r/2-a,u=e/2-a;l.moveTo(-h+o,-u),l.lineTo(h-o,-u),l.quadraticCurveTo(h,-u,h,-u+o),l.lineTo(h,u-o),l.quadraticCurveTo(h,u,h-o,u),l.lineTo(-h+o,u),l.quadraticCurveTo(-h,u,-h,u-o),l.lineTo(-h,-u+o),l.quadraticCurveTo(-h,-u,-h+o,-u);const d=new Xi(l,{depth:Math.max(.001,t-2*a),bevelEnabled:!0,bevelThickness:a,bevelSize:a,bevelSegments:i,curveSegments:i+2,steps:1});return d.center(),d}function Lt(r,e,t,n,s,i,a,o,l=.05,h=.02,u=0,d=0,f=0){return me(r,Zg(e,t,n,l,h),o,s,i,a,u,d,f,!0,!0)}function rn(r,e,t,n,s,i=12){const a=new P().subVectors(t,e),o=a.length(),l=new Ne(new nt(n,n,o,i),s);return l.position.copy(e).addScaledVector(a,.5),l.quaternion.setFromUnitVectors(new P(0,1,0),a.clone().normalize()),l.castShadow=!0,l.receiveShadow=!0,r.add(l),l}function $g(r,e,t,n,s=24,i=10){const a=new wa(e),o=new Ne(new Sr(a,s,t,i,!1),n);return o.castShadow=!0,o.receiveShadow=!0,r.add(o),o}function ns(r,e,t,n,s,i,a,o,l){const h=Hg(e,t),u=new at({map:h,transparent:!0,roughness:.5,metalness:.1,depthWrite:!1});return me(r,new vt(n,s),u,i,a,o,0,l,0,!1,!1)}function Gi(r,e=new Set){r.updateMatrixWorld(!0);const t=new Qe().copy(r.matrixWorld).invert(),n=new Qe,s=new Map,i=[],a=new Set;r.traverse(l=>{e.has(l)&&a.add(l)});const o=l=>{let h=l;for(;h;){if(e.has(h))return!0;if(h===r)return!1;h=h.parent}return!1};r.traverse(l=>{const h=l;if(!h.isMesh||Array.isArray(h.material)||h.isInstancedMesh||o(h))return;const u=h.material;if(!u)return;const d=`${u.uuid}|${h.castShadow}|${h.receiveShadow}|${h.renderOrder}`;let f=s.get(d);f||(f={mat:u,cast:h.castShadow,receive:h.receiveShadow,order:h.renderOrder,geos:[]},s.set(d,f));const c=h.geometry.clone();for(const v of Object.keys(c.attributes))["position","normal","uv"].includes(v)||c.deleteAttribute(v);c.attributes.uv||c.setAttribute("uv",new Yt(new Float32Array(c.attributes.position.count*2),2)),c.attributes.normal||c.computeVertexNormals();const p=c.index?c.toNonIndexed():c;n.multiplyMatrices(t,h.matrixWorld),p.applyMatrix4(n),f.geos.push(p),i.push(h)});for(const l of i)l.removeFromParent(),l.geometry.dispose();for(const l of s.values()){if(!l.geos.length)continue;const h=Jc(l.geos,!1);if(!h)continue;const u=new Ne(h,l.mat);u.castShadow=l.cast,u.receiveShadow=l.receive,u.renderOrder=l.order,r.add(u);for(const d of l.geos)d.dispose()}}function Kg(r,e){const t=[],n=e/2;t.push(new ae(.52*r,-n*.86)),t.push(new ae(.78*r,-n)),t.push(new ae(.92*r,-n*.92)),t.push(new ae(.99*r,-n*.58)),t.push(new ae(r,0)),t.push(new ae(.99*r,n*.58)),t.push(new ae(.92*r,n*.92)),t.push(new ae(.78*r,n)),t.push(new ae(.52*r,n*.86));const s=new Ea(t,28);return s.rotateZ(Math.PI/2),s}function ic(r,e){const t=new dt,n=new dt;t.add(n);const s=new Ne(Kg(r,e),V.rubber);s.castShadow=!0,s.receiveShadow=!0,n.add(s);const i=new an(e*1.005,r*.075,r*.19),a=new Bu(i,V.rubber,20),o=new Rt;for(let u=0;u<20;u++){const d=u/20*Math.PI*2;o.position.set(0,Math.cos(d)*r*.985,Math.sin(d)*r*.985),o.rotation.set(d,0,0),o.updateMatrix(),a.setMatrixAt(u,o.matrix)}a.castShadow=!0,n.add(a);const l=new Ne(new nt(r*.56,r*.56,e*.68,22),V.steelDark);l.rotation.z=Math.PI/2,l.castShadow=!0,n.add(l);for(const u of[-1,1]){const d=new Ne(new nt(r*.52,r*.52,.025,22),V.steel);d.rotation.z=Math.PI/2,d.position.x=u*e*.35,d.castShadow=!0,n.add(d);const f=new Ne(new nt(r*.17,r*.2,.05,14),V.chrome);f.rotation.z=Math.PI/2,f.position.x=u*e*.37,f.castShadow=!0,n.add(f);for(let c=0;c<5;c++){const p=c/5*Math.PI*2,v=new Ne(new nt(.014,.014,.03,6),V.steelDark);v.rotation.z=Math.PI/2,v.position.set(u*e*.38,Math.cos(p)*r*.33,Math.sin(p)*r*.33),n.add(v)}}const h=new Ne(new Gn(r*.64,.008,6,32),V.paint);return h.rotation.y=Math.PI/2,h.position.x=e*.355,n.add(h),Gi(n),{steer:t,spin:n,radius:r}}function vo(r,e){const t=new _s;t.moveTo(0,0),t.bezierCurveTo(e*.5,r*.1,e*.62,r*.55,0,r),t.bezierCurveTo(-e*.62,r*.55,-e*.5,r*.1,0,0);const n=new Xi(t,{depth:.012,bevelEnabled:!0,bevelSize:.008,bevelThickness:.006,bevelSegments:2,curveSegments:8});return n.center(),n}function Jg(){const r=new dt,e=V.feather,t=V.featherShade,n=V.featherTip,s=new dt;r.add(s),me(s,new Et(.5,28,22),e,0,1.3,-.28).scale.set(.78,.96,.68);for(let y=0;y<3;y++)me(s,new Et(.5,22,16),y===1?t:e,0,1.16-y*.075,-.27+y*.015).scale.set(.68-y*.02,.36,.6);me(s,new nt(.405,.43,.3,26,1,!0),new at({color:14254636,roughness:.66,metalness:.03,side:Ut}),0,1.27,-.27).scale.set(1,1,.82);for(const y of[1.36,1.2])me(s,new Gn(.42,.017,6,30),new at({color:14147030,roughness:.35,metalness:.25}),0,y,-.27,Math.PI/2,0,0,!1,!1).scale.set(1,.82,1);me(s,new _n(.055,16),new at({color:2109491,roughness:.5}),0,1.25,.085,0,0,0,!1,!1).scale.set(1,1.25,1);for(let y=0;y<3;y++)me(s,vo(.5,.2),t,-.13+y*.13,1.16,-.62,Math.PI*.72,0,(y-1)*.16).scale.setScalar(.9);const o=new wa([new P(0,1.56,-.23),new P(.005,1.72,-.18),new P(.005,1.9,-.05),new P(.01,2.02,.15),new P(.005,2.02,.28)]),l=new Ne(new Sr(o,32,.095,12,!1),e);l.castShadow=!0,l.receiveShadow=!0,l.scale.set(1,1,1),s.add(l),me(s,new Et(.5,16,12),t,0,1.55,-.21).scale.set(.3,.22,.28);const u=new dt;u.position.set(0,2.03,.3),s.add(u),me(u,new Et(.5,24,18),e,0,0,0).scale.set(.32,.3,.36);const f=new at({color:14197323,roughness:.42,metalness:.05});for(const y of[-1,1])me(u,new Et(.078,14,12),V.featherShade,y*.145,.055,.055).scale.set(.72,1.05,1.1),me(u,new Et(.058,16,12),V.eye,y*.155,.06,.075).scale.set(1,1.08,.72),me(u,new Et(.035,14,10),f,y*.181,.06,.099).scale.set(1,1,.7),me(u,new Et(.021,12,10),V.pupil,y*.192,.061,.112),me(u,new Et(.007,8,6),new Xt({color:16777215}),y*.2,.074,.122,0,0,0,!1,!1);const c=new dt;c.position.set(0,.015,.15),u.add(c);const p=new nt(.012,.062,.7,14,1,!1);p.rotateX(Math.PI/2),me(c,p,V.beak,0,.012,.36).scale.set(1,.6,1),me(c,new _r(.02,.075,10),V.beak,0,-.028,.705,Math.PI*.7,0,0),oe(c,.012,.016,.55,0,.045,.3,new at({color:12942890,roughness:.5})),me(u,new Et(.012,8,6),V.graphite,.052,0,.245,0,0,0,!1,!1),me(u,new Et(.012,8,6),V.graphite,-.052,0,.245,0,0,0,!1,!1);const m=new nt(.008,.042,.58,10);m.rotateX(Math.PI/2),me(u,m,V.beak,0,-.045,.44).scale.y=.5;const g=me(u,new Et(.5,24,18),V.pouch,0,-.16,.3);g.scale.set(.22,.25,.5),g.rotation.x=.1,me(u,new Et(.5,20,14),V.pouch,0,-.22,.25).scale.set(.16,.15,.35),me(u,new Gn(.15,.007,5,20,Math.PI),new at({color:11822116,roughness:.7}),0,-.11,.43,Math.PI/2,0,0,!1,!1);const M=new dt;M.position.set(0,.13,-.025),M.rotation.x=-.1,u.add(M),me(M,new Et(.25,26,16,0,Math.PI*2,0,Math.PI*.56),V.safetyYellow,0,0,0).scale.set(1.02,.9,1.12),me(M,new nt(.255,.265,.024,26),V.safetyYellow,0,0,0),me(M,new Gn(.215,.011,6,26),V.graphite,0,.006,0,Math.PI/2,0,0,!1,!1),oe(M,.035,.02,.34,0,.205,-.02,new at({color:15781746,roughness:.5}),0,0,0,!1),me(M,new nt(.13,.17,.02,20),V.safetyYellow,0,.002,.215,.08,0,0).scale.set(1.28,1,1),me(M,new _n(.042,18),V.paintDark,0,.19,.17,-.45,0,0,!1,!1),me(M,new _n(.028,16),V.safetyYellow,0,.193,.175,-.45,0,0,!1,!1);for(const y of[-1,1]){const _=new dt;s.add(_),me(_,new Et(.5,16,12),e,y*.29,1.38,-.22).scale.set(.23,.4,.32),$g(_,[new P(y*.3,1.4,-.22),new P(y*.34,1.3,-.02),new P(y*.26,1.31,.15),new P(y*.18,1.34,.24)],.075,e,18,10);for(let S=0;S<3;S++)me(_,vo(.38,.17),S===2?n:t,y*(.31-S*.025),1.26-S*.02,-.08+S*.03,Math.PI*.5,y*.25,y*(.35+S*.16)).scale.set(1,1,.7);for(let S=0;S<3;S++)me(_,vo(.24,.1),S===1?n:t,y*(.2+S*.012),1.335-S*.004,.27+S*.02,Math.PI*.46,y*.35,y*.5).scale.set(.8,.85,.7)}for(const y of[-1,1]){rn(s,new P(y*.13,1.02,-.25),new P(y*.15,.66,.16),.038,V.leg,10),rn(s,new P(y*.14,.7,-.1),new P(y*.15,.63,.16),.032,V.leg,8);const _=new dt;_.position.set(y*.15,.605,.24),s.add(_);const b=new _s;b.moveTo(0,0),b.quadraticCurveTo(.1,.06,.18,.03),b.quadraticCurveTo(.11,-.02,.15,-.1),b.quadraticCurveTo(.03,-.08,0,0);const S=new Ne(new Xi(b,{depth:.022,bevelEnabled:!1,curveSegments:8}),V.leg);S.rotation.x=-Math.PI/2,S.rotation.z=y>0?0:Math.PI,S.position.z=.03,S.castShadow=!0,S.receiveShadow=!0,_.add(S),me(_,new an(.14,.018,.16),V.leg,.02,.01,.01,0,0,0,!0,!0)}return Gi(u),Gi(s,new Set([u,l])),r.scale.setScalar(.8),r.position.set(0,.145,.02),{root:r,head:u,neck:l,torso:s}}function jg(){const r=new dt;r.name="forklift";const e=V.paint,t=V.paintDark,n=V.cream;Lt(r,1.3,.38,2.15,0,.55,-.02,e,.09,.035),Lt(r,1.14,.5,.55,0,.72,1,e,.07,.03),Lt(r,1.24,.6,.62,0,.82,-.62,e,.08,.03,.05),Lt(r,1.08,.34,.5,0,.98,.82,t,.06,.025,-.13),Lt(r,1.27,.95,.62,0,.8,-1.15,V.castIron,.09,.035);for(let _=-2;_<=2;_++)oe(r,.12,.68,.04,_*.22,.79,-1.47,V.graphite);oe(r,1.05,.12,.1,0,.3,-1.47,V.steelDark),me(r,new nt(.055,.055,.16,12),V.chrome,0,.43,-1.5,Math.PI/2,0,0),oe(r,.72,.32,.035,0,.98,-1.47,V.graphite);for(let _=0;_<6;_++)oe(r,.62,.022,.012,0,.87+_*.045,-1.492,V.steelDark);ns(r,"PELICAN","FL-ACADEMY 03",.52,.26,0,.62,-1.49,Math.PI);for(const _ of[-1,1]){oe(r,.02,.26,1.2,_*.645,.62,.12,t),oe(r,.02,.02,1.18,_*.655,.73,.1,V.steelDark),oe(r,.3,.06,.5,_*.7,.32,-.24,V.steelDark);for(let b=0;b<4;b++)oe(r,.26,.012,.03,_*.7,.355,-.4+b*.1,V.steel);rn(r,new P(_*.68,.82,-.68),new P(_*.68,1.38,-.72),.022,V.chrome,8),ns(r,"PELICAN","FORKLIFT ACADEMY",.44,.22,_*.657,.93,-.35,_>0?Math.PI/2:-Math.PI/2)}for(const _ of[-1,1]){const b=new at({color:1527625,metalness:.5,roughness:.4,side:Ut}),S=new Ne(new nt(.47,.47,.34,20,1,!0,0,Math.PI),b);S.rotation.z=Math.PI/2,S.rotation.y=0,S.position.set(_*.74,.42,.7),S.castShadow=!0,S.receiveShadow=!0,r.add(S),oe(r,.32,.22,.03,_*.74,.28,.24,V.rubberTrim)}oe(r,1.2,.14,.16,0,.33,1.24,V.steelDark);for(const _ of[-1,1]){me(r,new nt(.115,.13,.12,16),V.graphite,_*.41,.82,1.24,Math.PI/2,0,0),me(r,new nt(.095,.095,.03,16),V.chrome,_*.41,.82,1.31,Math.PI/2,0,0),me(r,new _n(.082,16),V.headlight,_*.41,.82,1.328,0,0,0,!1,!1),oe(r,.1,.2,.12,_*.44,1.15,1.22,V.graphite),me(r,new _n(.04,12),V.beacon,_*.44,1.19,1.286,0,0,0,!1,!1);for(let b=0;b<3;b++)oe(r,.15,.035,.02,_*.16,.92+b*.06,1.283,V.graphite)}for(const _ of[-1,1])oe(r,.12,.16,.04,_*.5,1.02,-1.47,V.taillight);rn(r,new P(.48,.55,-1.32),new P(.48,1.5,-1.32),.035,V.graphite,10),me(r,new nt(.055,.045,.05,10),V.steelDark,.48,1.52,-1.32),rn(r,new P(-.5,1.4,-1.32),new P(-.5,2,-1.38),.006,V.chrome,5);const s=.59;Lt(r,1.08,.07,1.2,0,s,.16,V.steelDark,.02,.01);for(let _=0;_<4;_++)oe(r,.9,.012,.03,0,s+.045,-.05+_*.14,V.steel);const i=new dt;r.add(i),Lt(i,.64,.14,.56,0,.96,-.14,V.seat,.05,.02),Lt(i,.64,.08,.54,0,1.055,-.14,V.seat,.04,.015),Lt(i,.64,.7,.14,0,1.28,-.43,V.seat,.06,.025,-.1),Lt(i,.4,.18,.13,0,1.66,-.47,V.seat,.05,.02,-.1);for(const _ of[-1,1])Lt(i,.12,.36,.5,_*.38,1.06,-.13,V.seat,.04,.015),oe(i,.42,.01,.06,_*.1,1.065,.06,V.seatStitch),oe(i,.42,.01,.06,_*.1,1.065,-.32,V.seatStitch);for(let _=0;_<3;_++)oe(i,.36,.008,.018,0,1.16+_*.11,-.498,V.seatStitch);oe(r,.22,.1,.3,.48,1.04,-.1,V.graphite);for(const _ of[-1,1])oe(r,.16,.025,.24,_*.16,s+.085,.48,V.graphite,-.25,0,0),oe(r,.14,.012,.2,_*.16,s+.1,.46,V.steelDark,-.25,0,0);const a=new P(0,1.03,.5),o=new P(0,1.26,.27);rn(r,a,o,.055,V.graphite,14),rn(r,new P(-.12,1.05,.47),new P(-.12,1.22,.36),.025,V.chrome,8);const l=new dt;l.position.set(0,1.33,.22),l.rotation.x=-.9,r.add(l);const h=me(l,new Gn(.185,.024,10,30),V.graphite,0,0,0);h.castShadow=!0;for(let _=0;_<3;_++){const b=_/3*Math.PI*2+Math.PI/2;oe(l,.03,.02,.34,Math.cos(b)*.085,Math.sin(b)*.085,0,V.steelDark,0,0,-b+Math.PI/2,!1)}me(l,new nt(.06,.06,.06,16),V.steelDark,0,0,0,Math.PI/2,0,0),me(l,new nt(.04,.04,.075,12),V.cream,0,0,.01,Math.PI/2,0,0),me(l,new Et(.035,12,10),V.beak,.15,-.1,.015);const u=new dt;u.position.set(0,1.2,.72),u.rotation.x=-.34,r.add(u),Lt(u,.76,.34,.12,0,0,0,V.graphite,.04,.02);const d=new at({map:Vg(),roughness:.45,metalness:.15});me(u,new vt(.5,.25),d,0,.03,-.062,0,Math.PI,0,!1,!1);for(const _ of[-1,1]){const b=_>0?V.taillight:V.headlight;me(u,new _n(.018,10),b,_*.28,.1,-.063,0,Math.PI,0,!1,!1)}for(let _=0;_<3;_++){const b=.26+_*.085;rn(r,new P(b,1,.42),new P(b+.02,1.32+_*.03,.34),.012,V.chrome,6),me(r,new Et(.032,10,8),_===0?V.beak:V.graphite,b+.02,1.33+_*.03,.34)}for(const _ of[-1,1])for(const b of[-1,1])Lt(r,.1,1.3,.1,_*.63,1.78,b*.66,t,.03,.012);Lt(r,1.5,.13,1.7,0,2.43,-.06,e,.12,.03);for(let _=0;_<4;_++)oe(r,1.2,.016,.07,0,2.365,-.5+_*.28,V.steelDark);for(let _=0;_<5;_++)oe(r,1.28,.018,.05,0,2.5,-.72+_*.33,t);oe(r,1.3,.03,.07,0,2.505,.74,V.chrome,0,0,0,!1),ns(r,"PELICAN","FL-03 · ACADEMY",.32,.16,0,2.547,-.5,Math.PI),Lt(r,1.36,.04,1.5,0,2.345,-.06,n,.08,.015);const f=new Ne(new nt(.07,.085,.14,14),V.beacon);f.position.set(.48,2.56,-.35),f.castShadow=!0,r.add(f),me(r,new nt(.09,.1,.035,14),V.graphite,.48,2.49,-.35);const c=new mr(16755502,.5,3,2);c.position.set(.48,2.6,-.35),r.add(c);for(const _ of[-1,1])oe(r,.18,.12,.13,_*.4,2.33,.71,V.graphite),me(r,new _n(.06,12),V.headlight,_*.4,2.33,.78,0,0,0,!1,!1);const p=me(r,new vt(1.14,1.05),V.glass,0,1.8,.705,0,0,0,!1,!1);p.renderOrder=3;for(const _ of[-1,1])rn(r,new P(_*.63,2.02,.64),new P(_*.82,2.06,.55),.012,V.graphite,6),Lt(r,.02,.17,.12,_*.83,2.08,.53,V.steelDark,.01,.005),me(r,new vt(.1,.15),new at({color:10466484,metalness:.9,roughness:.08}),_*.843,2.08,.53,0,_*Math.PI/2,0,!1,!1);ns(r,"FASTEN","SEAT BELT",.26,.13,.63,1.5,-.55,Math.PI/2);const v=new dt;v.position.set(0,0,0),r.add(v);for(const _ of[-1,1]){oe(v,.11,2.82,.18,_*.53,1.53,1.06,V.steelDark),oe(v,.035,2.7,.21,_*.46,1.5,1.06,V.steel),oe(v,.09,2.6,.12,_*.36,1.48,1.12,V.steelDark),oe(v,.02,2.55,.03,_*.585,1.5,1.06,V.steel);for(let b=0;b<5;b++)oe(v,.14,.045,.2,_*.53,.35+b*.58,1.06,V.steel)}for(const _ of[.2,1.45,2.8])oe(v,1.16,.11,.15,0,_,1.06,V.steelDark);oe(v,.86,.1,.13,0,2.9,1.06,V.steelDark),me(v,new nt(.06,.06,.9,12),V.steelDark,0,2.95,1.1,0,0,Math.PI/2);for(const _ of[-1,1]){me(v,new nt(.065,.075,1.55,12),V.graphite,_*.23,.92,1.16),me(v,new nt(.032,.032,1.3,10),V.chrome,_*.23,2.3,1.16),me(v,new nt(.05,.05,.09,10),V.steelDark,_*.23,1.7,1.16);for(let b=0;b<14;b++)oe(v,.028,.045,.02,_*.3,2.78-b*.18,1.2,V.steelDark,0,0,0,!1);rn(v,new P(_*.06,.36,1.02),new P(_*.5,1.75,1.02),.02,V.rubber,7)}for(const _ of[-1,1])rn(r,new P(_*.42,.72,.92),new P(_*.42,1.1,1.16),.045,V.graphite,10),me(r,new nt(.025,.025,.9,8),V.chrome,_*.42,1.55,1.17,.25,0,0);const m=new dt;m.position.set(0,0,0),r.add(m),Lt(m,1.24,.5,.09,0,.37,1.27,V.steelDark,.03,.012),oe(m,1.3,.06,.12,0,.13,1.27,V.steel);for(let _=-2;_<=2;_++)oe(m,.055,.66,.05,_*.27,.92,1.3,V.steelDark);for(const _ of[.66,.92,1.18])oe(m,1.22,.05,.05,0,_,1.3,V.steel);for(const _ of[-1,1])for(const b of[.18,.56])me(m,new nt(.055,.055,.08,12),V.chrome,_*.58,b,1.2,0,0,Math.PI/2);const g=new _s;g.moveTo(0,0),g.lineTo(1.03,0),g.lineTo(1.06,.02),g.lineTo(1.06,.055),g.lineTo(1.03,.078),g.lineTo(.25,.078),g.lineTo(.22,.58),g.lineTo(.06,.58),g.lineTo(.05,.078),g.lineTo(0,.078),g.closePath();const T=new Xi(g,{depth:.16,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2,steps:1});T.rotateY(-Math.PI/2),T.translate(.08,.022,1.3);for(const _ of[-1,1]){const b=new Ne(T,V.steelDark);b.position.x=_*.32,b.castShadow=!0,b.receiveShadow=!0,m.add(b);for(let S=0;S<2;S++)me(m,new nt(.025,.025,.02,8),V.chrome,_*.32,.46+S*.09,1.385,Math.PI/2,0,0);oe(m,.165,.014,.3,_*.32,.105,1.5,V.chrome,0,0,0,!1)}oe(m,.86,.08,.1,0,.11,1.34,V.steelDark),ns(v,"PELICAN","MAX 1800 kg",.34,.17,0,2.55,1.17,0);const M=[];for(const _ of[-1,1]){const b=ic(.34,.28);b.steer.position.set(_*.79,.34,.68),r.add(b.steer),M.push({...b,front:!0});const S=ic(.27,.22);S.steer.position.set(_*.55,.27,-.8),r.add(S.steer),M.push({...S,front:!1}),rn(r,new P(_*.46,.3,-.8),new P(_*.66,.3,-.8),.055,V.castIron,10)}me(r,new nt(.075,.075,1.5,12),V.castIron,0,.34,.68,0,0,Math.PI/2),me(r,new nt(.06,.06,1.1,12),V.castIron,0,.28,-.8,0,0,Math.PI/2);const x=Jg();r.add(x.root);const w=new Ne(new vt(2.3,3.2),new Xt({map:qg(),transparent:!0,depthWrite:!1,opacity:.55}));w.rotation.x=-Math.PI/2,w.position.set(0,.008,.2),w.renderOrder=1,r.add(w),Gi(m);const y=new Set([m,x.root,f,w,...M.map(_=>_.steer)]);return Gi(r,y),{root:r,lift:m,wheels:M,pelican:x,beacon:f,shadow:w}}function Qg(r){const e=new dt;e.name=`crate-${r}`;const t=Wg(r),n=Xg(),s=[t,t,n,n,t,t],i=et.h-et.bodyBottom,a=new Ne(new an(et.w,i,et.d),s);a.position.y=et.halfH-i/2,a.castShadow=!0,a.receiveShadow=!0,e.add(a);const o=.055;for(const l of[-1,1])for(const h of[-1,1])oe(e,o,i+.02,o,l*(et.w/2-o/2),a.position.y,h*(et.d/2-o/2),V.crateFrame);for(const l of[-.36,.46]){for(const h of[-1,1])oe(e,o,.055,et.d,h*(et.w/2-o/2),l,0,V.crateFrame);for(const h of[-1,1])oe(e,et.w,.055,o,0,l,h*(et.d/2-o/2),V.crateFrame)}for(const l of[-1,1])for(const h of[-1,1])for(const u of[-1,1])oe(e,.085,.11,.02,l*(et.w/2-.03),h*.47,u*(et.d/2+.005),V.crateMetal),oe(e,.02,.11,.085,l*(et.w/2+.005),h*.47,u*(et.d/2-.03),V.crateMetal);for(const l of[-1,1])oe(e,.02,.16,.26,l*(et.w/2+.012),.02,.1,V.graphite,0,0,0,!1),oe(e,.018,.045,.2,l*(et.w/2+.027),.1,.1,V.steelDark,0,0,0,!1);for(const l of[0,-.45,.45])oe(e,.12,.12,et.d,l,-.44,0,V.woodDark);oe(e,et.w-.04,.05,et.d-.06,0,-.34,0,V.woodDark);for(const l of[-1,1])oe(e,et.w,.035,.06,0,.49,l*.44,V.crateFrame);for(const l of[-1,1])oe(e,.06,.035,et.d,l*.5,.49,0,V.crateFrame);return Gi(e),e}function kn(r,e,t,n,s,i,a=.012){const o=new Ne(new vt(e,t),i);return o.rotation.x=-Math.PI/2,o.position.set(n,a,s),o.receiveShadow=!0,o.renderOrder=1,r.add(o),o}function xo(r,e=1){return new at({color:r,roughness:.92,metalness:.02,transparent:e<1,opacity:e,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function ev(r){const e=It[r],t=document.createElement("canvas");t.width=512,t.height=512;const n=t.getContext("2d");n.clearRect(0,0,512,512),n.fillStyle=e.hex,n.globalAlpha=.38,n.fillRect(0,0,512,512),n.globalAlpha=1,n.strokeStyle="#f4eddc",n.lineWidth=12,n.strokeRect(18,18,476,476),n.lineWidth=4,n.strokeRect(44,44,424,424),n.setLineDash([22,14]),n.strokeStyle="rgba(255,255,255,0.55)",n.strokeRect(76,76,360,360),n.setLineDash([]),n.fillStyle="#fffdf6",n.textAlign="center",n.font='800 116px "Helvetica Neue", Arial, sans-serif',n.fillText(e.label,256,236),n.font='800 66px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(e.zh+"交付区",256,320),n.font='700 30px "Helvetica Neue", Arial, sans-serif',n.fillStyle="rgba(255,255,255,0.82)",n.fillText("DROP ZONE",256,372),n.strokeStyle="#fffdf6",n.lineWidth=14;for(const[i,a,o,l]of[[30,30,1,1],[482,30,-1,1],[30,482,1,-1],[482,482,-1,-1]])n.beginPath(),n.moveTo(i+o*62,a),n.lineTo(i,a),n.lineTo(i,a+l*62),n.stroke();const s=new xr(t);return s.colorSpace=Dt,s.anisotropy=8,s}function sc(r,e,t="#e6c05a"){const n=document.createElement("canvas");n.width=1024,n.height=512;const s=n.getContext("2d");s.clearRect(0,0,1024,512),s.fillStyle=t,s.textAlign="center",s.font='800 180px "PingFang SC", "Microsoft YaHei", sans-serif',s.globalAlpha=.85,s.fillText(r,512,260),s.font='700 58px "Helvetica Neue", Arial, sans-serif',s.fillText(e,512,356),s.globalAlpha=1;const i=new xr(n);return i.colorSpace=Dt,i.anisotropy=8,i}function rc(r,e,t,n,s,i,a,o=[1,2.35,3.7,4.9]){const l=new dt;l.position.set(t,0,n),l.rotation.y=a,r.add(l);const h=1.25,u=5.35,d=s*i;for(let f=0;f<=s;f++){const c=-d/2+f*i;for(const p of[-h/2,h/2])oe(l,.11,u,.11,c,u/2,p,V.rackBlue),oe(l,.05,.24,.3,c,.12,p,V.steelDark);for(let p=0;p<6;p++){const v=.45+p*.85,m=-h/2,T=h/2-m,M=Math.sqrt(T*T+.55*.55),x=oe(l,.055,.055,M,c,v,0,V.rackBlue,Math.atan2(.55,T),0,0);x.castShadow=!1,oe(l,.06,.05,h*.92,c,v+.28,0,V.rackBlue)}}for(const f of o){for(const c of[-h/2+.02,h/2-.02])oe(l,d,.15,.08,0,f,c,V.rackOrange),oe(l,d,.03,.1,0,f+.1,c,V.rackOrange);for(let c=0;c<s;c++){const p=-d/2+i/2+c*i;if(oe(l,i-.22,.055,h-.16,p,f-.09,0,V.deck),(c+Math.round(f*3))%3!==1){oe(l,.86,.1,.86,p,f+.12,0,V.woodDark);for(const m of[-.32,0,.32])oe(l,.82,.05,.1,p,f+.2,m,V.wood);const v=1+(c+Math.round(f))%3;for(let m=0;m<v;m++)oe(l,.72,.42,.72,p,f+.43+m*.44,0,m%2?V.deck:V.rackBlue),oe(l,.74,.02,.74,p,f+.64+m*.44,0,V.steelDark)}}}return e.push({cx:t+Math.sin(a)*0,cy:u/2,cz:n,hx:a===0?d/2+.1:h/2+.1,hy:u/2,hz:a===0?h/2+.1:d/2+.1,occlude:!0}),l}function _o(r,e,t,n=5,s=!1){const i=new dt;i.position.set(e,0,t),r.add(i);for(let a=0;a<n;a++){const o=.1+a*.18;oe(i,1.1,.05,1,0,o,0,V.wood);for(const l of[-.38,0,.38])oe(i,1.06,.09,.1,0,o-.06,l,V.woodDark);for(const l of[-.46,0,.46])oe(i,.1,.09,.95,l,o-.06,0,V.woodDark)}if(s){const a=new Ne(new an(1.15,1.15,1.05),new Hc({color:13621716,transparent:!0,opacity:.42,roughness:.25,metalness:.05,clearcoat:.6,side:Ut}));a.position.y=.68,a.castShadow=!0,a.receiveShadow=!0,i.add(a),oe(i,.9,.9,.9,0,.68,0,V.deck)}return i}function tv(r,e,t,n){const s=new dt;s.position.set(e,0,t),r.add(s);const i=new Ne(new nt(.29,.29,.9,20),new at({color:n,metalness:.55,roughness:.42}));i.position.y=.45,i.castShadow=!0,i.receiveShadow=!0,s.add(i);for(const a of[.18,.45,.72]){const o=new Ne(new Gn(.295,.018,6,24),V.steelDark);o.rotation.x=Math.PI/2,o.position.y=a,s.add(o)}return me(s,new nt(.3,.3,.03,20),V.steelDark,0,.9,0),s}function yo(r,e,t){const n=new dt;n.position.set(e,0,t),r.add(n),oe(n,.42,.04,.42,0,.02,0,new at({color:3093558,roughness:.8}));const s=new _r(.15,.55,14,1,!0),i=new Ne(s,new at({color:14050095,roughness:.7,side:Ut}));i.position.y=.3,i.castShadow=!0,n.add(i);const a=new Ne(new nt(.105,.12,.1,14,1,!0),new at({color:15854556,roughness:.6,side:Ut}));return a.position.y=.33,n.add(a),n}function nv(r){const e=[],t={},n=[],s=new dt;r.add(s);const i=new at({map:Ug(),bumpMap:Ng(),bumpScale:.025,color:15921126,roughness:.86,metalness:.03}),a=me(s,new vt(Pe.maxX-Pe.minX,Pe.maxZ-Pe.minZ),i,0,0,0,-Math.PI/2,0,0,!1,!0);a.name="warehouse-floor";const o=new at({map:Fg(),color:14673118,roughness:.72,metalness:.18}),l=Pe.wallH,h=[[0,l/2,Pe.minZ-.25,30.5,l,.5],[0,l/2,Pe.maxZ+.25,30.5,l,.5],[Pe.minX-.25,l/2,0,.5,l,24.5],[Pe.maxX+.25,l/2,0,.5,l,24.5]];for(const[N,X,ee,K,de,Le]of h){const be=me(s,new an(K,de,Le),o,N,X,ee,0,0,0,!1,!0);be.material=o}for(const N of[-1,1])oe(s,30,1.15,.06,0,.58,N<0?Pe.minZ+.03:Pe.maxZ-.03,V.steelDark,0,0,0,!1),oe(s,30,.09,.07,0,1.2,N<0?Pe.minZ+.04:Pe.maxZ-.04,V.safetyYellow,0,0,0,!1),oe(s,.06,1.15,24,N<0?Pe.minX+.03:Pe.maxX-.03,.58,0,V.steelDark,0,0,0,!1),oe(s,.07,.09,24,N<0?Pe.minX+.04:Pe.maxX-.04,1.2,0,V.safetyYellow,0,0,0,!1);for(const N of[-10.5,-3.5,3.5,10.5])for(const X of[Pe.minZ+.28,Pe.maxZ-.28])oe(s,.42,l,.42,N,l/2,X,V.steelDark,0,0,0,!1),oe(s,.52,.16,.52,N,.08,X,V.steelDark,0,0,0,!1);for(const N of[-7.5,0,7.5])for(const X of[Pe.minX+.28,Pe.maxX-.28])oe(s,.42,l,.42,X,l/2,N,V.steelDark,0,0,0,!1);for(let N=0;N<4;N++){const X=-7.5+N*5;oe(s,.12,1.5,3,Pe.minX+.08,5.9,X,V.graphite,0,0,0,!1);const ee=me(s,new vt(2.7,1.25),new Xt({color:12575462}),Pe.minX+.15,5.9,X,0,Math.PI/2,0,!1,!1);ee.renderOrder=0;for(let K=-1;K<=1;K++)oe(s,.16,1.4,.06,Pe.minX+.18,5.9,X+K*.9,V.graphite,0,0,0,!1);oe(s,.18,.07,2.9,Pe.minX+.18,5.9,X,V.graphite,0,0,0,!1)}const u=new dt;u.position.set(-4.5,0,Pe.maxZ-.06),s.add(u),oe(u,5.4,.35,.35,0,5,-.05,V.steelDark,0,0,0,!1),oe(u,.35,5,.35,-2.7,2.5,-.05,V.steelDark,0,0,0,!1),oe(u,.35,5,.35,2.7,2.5,-.05,V.steelDark,0,0,0,!1);for(let N=0;N<12;N++)oe(u,5.2,.34,.08,0,.28+N*.37,-.08,N%3===0?V.steel:V.graphite,0,0,0,!1);oe(u,4.6,.35,.1,0,4.7,-.1,V.safetyYellow,0,0,0,!1);const d=new at({map:nc({title:"EXIT",zh:"安全出口",sub:"KEEP CLEAR",bg:"#1c5d38",fg:"#f4f0dd",accent:"#9fe6b2"},512,256),roughness:.5});me(u,new vt(1.3,.65),d,0,5.1,.16,0,0,0,!1,!1);const f=new at({map:kg(),roughness:.6,metalness:.1,emissive:1714726,emissiveIntensity:.2});oe(s,6.8,1.85,.12,5.3,5.55,Pe.maxZ-.15,V.graphite,0,0,0,!1),me(s,new vt(6.55,1.62),f,5.3,5.55,Pe.maxZ-.205,0,Math.PI,0,!1,!1);const c=[po(0),po(1),po(2)];[[-14.93,3.4,8.4,Math.PI/2],[-14.93,3.4,-2.4,Math.PI/2],[14.93,4.3,-8.8,-Math.PI/2]].forEach(([N,X,ee,K],de)=>{oe(s,.06,1.66,1.18,N-Math.sin(K)*.03,X,ee,V.graphite,0,0,0,!1);const Le=new at({map:c[de],roughness:.65});me(s,new vt(1.08,1.52),Le,N+Math.sin(K)*.02,X,ee,0,K,0,!1,!1)}),oe(s,.6,.9,.32,14.4,1.45,9.7,new at({color:12269100,metalness:.3,roughness:.5}),0,-Math.PI/2,0,!1),me(s,new vt(.48,.3),new Xt({color:15327949}),14.22,1.62,9.7,0,-Math.PI/2,0,!1,!1);const v=new dt;v.position.set(5,4.35,Pe.minZ+.16),s.add(v),me(v,new nt(.42,.42,.08,28),V.graphite,0,0,0,Math.PI/2,0,0,!1),me(v,new _n(.37,28),new at({color:15525074,roughness:.6}),0,0,.05,0,0,0,!1,!1);for(let N=0;N<12;N++){const X=N/12*Math.PI*2;oe(v,.02,N%3===0?.11:.06,.015,Math.sin(X)*.29,Math.cos(X)*.29,.06,V.graphite,0,0,-X,!1)}oe(v,.018,.19,.02,.05,.09,.07,V.graphite,0,0,-.6,!1),oe(v,.014,.26,.02,.03,.11,.07,V.graphite,0,0,.5,!1),rc(s,e,-6.1,-11.2,4,3.7,0),rc(s,e,-14.1,-5.6,2,3.4,Math.PI/2);const m=new at({map:nc({title:"A-01",zh:"原料区",sub:"STORAGE · KEEP CLEAR",bg:"#24333a",fg:"#e7dcc3",accent:"#7fb1c0"},512,320),roughness:.6});me(s,new vt(1.5,.94),m,-2.2,5.15,-10.53,0,0,0,!1,!1),me(s,new vt(1.5,.94),m,-13.45,5.15,-9.4,0,Math.PI/2,0,!1,!1);const g={};for(const N of ai){const X=It[N.color],ee=new dt;ee.position.set(N.x,0,N.z),s.add(ee),t[N.color]=ee;const K=new at({map:ev(N.color),transparent:!0,roughness:.86,metalness:.02,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});kn(ee,N.w,N.d,0,0,K,.018);const de=new at({color:X.hex,roughness:.65,metalness:.1});for(const We of[-1,1])oe(ee,N.w+.16,.025,.09,0,.012,We*(N.d/2+.06),de,0,0,0,!1),oe(ee,.09,.025,N.d+.16,We*(N.w/2+.06),.012,0,de,0,0,0,!1);for(const We of[-1,1])for(const Q of[-1,1]){const le=new Ne(new vt(.55,.55),V.hazard);le.rotation.x=-Math.PI/2,le.position.set(We*(N.w/2+.36),.01,Q*(N.d/2+.36)),ee.add(le)}const Le=new at({map:Yg(N.color),roughness:.45,metalness:.1,emissive:new je(X.hex),emissiveIntensity:.12});oe(s,.1,1.5,2.2,Pe.maxX-.06,3.1,N.z,V.graphite,0,0,0,!1),me(s,new vt(2.1,1.4),Le,Pe.maxX-.12,3.1,N.z,0,-Math.PI/2,0,!1,!1),oe(s,.1,.1,2,Pe.maxX-.15,3.86,N.z,new Xt({color:X.hex}),0,0,0,!1);const be=new Ne(new Mr(N.w/2-.16,N.w/2-.06,40),new Xt({color:X.hex,transparent:!0,opacity:.5,side:Ut,depthWrite:!1}));be.rotation.x=-Math.PI/2,be.position.y=.03,ee.add(be),g[N.color]=de}const T=xo(14462514,.85),M=xo(14472900,.7);for(const N of[7.05,7.55])kn(s,.09,18.5,N,-1.4,T,.014);for(let N=0;N<17;N++)kn(s,.32,.09,7.3,-10+N*1.08,M,.014);for(let N=0;N<3;N++){const X=-11.8+N*2.4;kn(s,2.1,.07,X,.16,T,.014),kn(s,2.1,.07,X,-2.55,T,.014),kn(s,.07,2.78,X-1.05,-1.2,T,.014),kn(s,.07,2.78,X+1.05,-1.2,T,.014)}for(const N of ai)for(let X=0;X<4;X++){const ee=xo(13612368,.55),K=kn(s,.28,1.2,N.x-2.35+X*.38,N.z,ee,.013);K.rotation.z=.5}const x=sc("叉车通道","FORKLIFT LANE","#dcb84e"),w=new Xt({map:x,transparent:!0,depthWrite:!1,opacity:.8}),y=new Ne(new vt(3.6,1.8),w);y.rotation.x=-Math.PI/2,y.rotation.z=Math.PI/2,y.position.set(-4.2,.016,4.9),s.add(y);const _=sc("禁停","KEEP CLEAR","#d9c37a"),b=new Xt({map:_,transparent:!0,depthWrite:!1,opacity:.65}),S=new Ne(new vt(2.2,1.1),b);S.rotation.x=-Math.PI/2,S.position.set(13,.016,-2.2),s.add(S);const E=document.createElement("canvas");E.width=512,E.height=512;const A=E.getContext("2d");A.strokeStyle="rgba(225,190,85,0.9)",A.lineWidth=16,A.lineCap="round",A.strokeRect(150,270,150,110),A.beginPath(),A.arc(190,405,30,0,7),A.stroke(),A.beginPath(),A.arc(275,405,30,0,7),A.stroke(),A.beginPath(),A.moveTo(300,285),A.lineTo(300,130),A.lineTo(360,130),A.stroke(),A.beginPath(),A.moveTo(300,150),A.lineTo(390,150),A.stroke(),A.beginPath(),A.moveTo(340,155),A.lineTo(340,230),A.lineTo(300,230),A.stroke(),A.font='700 38px "Helvetica Neue", Arial, sans-serif',A.fillStyle="rgba(225,190,85,0.85)",A.textAlign="center",A.fillText("FL-03",256,480);const U=new xr(E);U.colorSpace=Dt;const I=new Ne(new vt(2.4,2.4),new Xt({map:U,transparent:!0,depthWrite:!1,opacity:.8}));I.rotation.x=-Math.PI/2,I.position.set(-9.4,.016,6.3),s.add(I),_o(s,13.4,9.9,5,!0),_o(s,12.3,10.9,3,!1),e.push({cx:13.2,cy:.8,cz:10.2,hx:1.15,hy:1.1,hz:1.15,occlude:!0});const F=[[-14.2,4.4,3107684],[-13.6,5.4,11556143],[-14.1,6.2,3889522]];for(const[N,X,ee]of F)tv(s,N,X,ee);e.push({cx:-13.95,cy:.5,cz:5.3,hx:.9,hy:.5,hz:1.3}),e.push({cx:14.4,cy:.9,cz:9.7,hx:.3,hy:.9,hz:.35}),yo(s,-3.3,-9.6),yo(s,-2.6,-9),yo(s,7.9,-8.4),_o(s,2,-9.7,2,!1),e.push({cx:2,cy:.4,cz:-9.7,hx:.6,hy:.4,hz:.55});const k=new at({color:2765621,roughness:.9,metalness:.15});me(s,new vt(30.4,24.4),k,0,7.55,0,Math.PI/2,0,0,!1,!1);for(let N=-10;N<=10;N+=4){oe(s,30,.26,.2,0,7.2,N,V.steelDark,0,0,0,!1);for(let X=-12;X<=12;X+=6)oe(s,.12,.12,2.6,X,7.05,N,V.steelDark,.55,0,0,!1)}for(const N of[-9,-3,3,9])for(const X of[-6,3])O(s,N,6.8,X);function O(N,X,ee,K){const de=new dt;de.position.set(X,ee,K),N.add(de),Z(de,1,V.steelDark),oe(de,.34,.12,2.6,0,-1.02,0,V.graphite,0,0,0,!1),me(de,new vt(.26,2.4),new Xt({color:16773839}),0,-1.085,0,Math.PI/2,0,0,!1,!1)}function Z(N,X,ee){const K=new Ne(new nt(.018,.018,X,6),ee);K.position.y=X/2,N.add(K)}const G=new mr(16768942,58,18,2);G.position.set(-6.5,5.6,-2.5),r.add(G);const ie=new mr(16766880,48,16,2);ie.position.set(7.5,5.4,4),r.add(ie);const re=new yf(14216167,3485738,.78);r.add(re);const te=new eo(16773853,3.35);te.position.set(-9,13.5,8.5),te.target.position.set(1,0,-1),te.castShadow=!0,te.shadow.mapSize.set(2048,2048),te.shadow.camera.left=-19,te.shadow.camera.right=19,te.shadow.camera.top=17,te.shadow.camera.bottom=-17,te.shadow.camera.near=1,te.shadow.camera.far=42,te.shadow.bias=-4e-4,te.shadow.normalBias=.035,te.shadow.radius=2,r.add(te),r.add(te.target);const Se=new eo(11129050,1.05);Se.position.set(14,7,-12),r.add(Se);const De=new eo(16766368,.62);return De.position.set(2,5,12),r.add(De),r.background=new je(857109),r.fog=new _a(1055258,.0055),iv(s),{colliders:e,zones:ai,zoneGroups:t,lightTargets:n}}function iv(r){r.updateMatrixWorld(!0);const e=new Map,t=[];r.traverse(n=>{const s=n;if(!s.isMesh||Array.isArray(s.material)||s.isInstancedMesh)return;const i=s.material;if(!i)return;const a=`${i.uuid}|${s.castShadow}|${s.receiveShadow}|${s.renderOrder}`;let o=e.get(a);o||(o={mat:i,cast:s.castShadow,receive:s.receiveShadow,order:s.renderOrder,geos:[]},e.set(a,o));const l=s.geometry.clone();for(const u of Object.keys(l.attributes))["position","normal","uv"].includes(u)||l.deleteAttribute(u);if(!l.attributes.uv){const u=l.attributes.position.count;l.setAttribute("uv",new Yt(new Float32Array(u*2),2))}l.attributes.normal||l.computeVertexNormals();const h=l.index?l.toNonIndexed():l;h.applyMatrix4(s.matrixWorld),o.geos.push(h),t.push(s)});for(const n of t)n.removeFromParent(),n.geometry.dispose();for(const n of e.values()){if(!n.geos.length)continue;const s=Jc(n.geos,!1);if(!s)continue;const i=new Ne(s,n.mat);i.castShadow=n.cast,i.receiveShadow=n.receive,i.renderOrder=n.order,r.add(i);for(const a of n.geos)a.dispose()}}const Ve=r=>document.getElementById(r),tr=r=>{const e=Math.max(0,r),t=Math.floor(e/60),n=e-t*60;return`${String(t).padStart(2,"0")}:${n.toFixed(1).padStart(4,"0")}`};class sv{constructor(){Fe(this,"renderer");Fe(this,"scene",new Ic);Fe(this,"camera",new Kt(48,1,.08,90));Fe(this,"pmrem");Fe(this,"world");Fe(this,"truck");Fe(this,"crates",[]);Fe(this,"A");Fe(this,"physics");Fe(this,"truckBody");Fe(this,"mode","ready");Fe(this,"inspect",null);Fe(this,"camMode","follow");Fe(this,"timeLeft",ho);Fe(this,"elapsed",0);Fe(this,"score",0);Fe(this,"clock",new Ef);Fe(this,"pos",{x:Ct.x,z:Ct.z,yaw:Ct.yaw});Fe(this,"speed",0);Fe(this,"steer",0);Fe(this,"lift",0);Fe(this,"carrying",null);Fe(this,"carrySide",0);Fe(this,"carryForward",1.7);Fe(this,"carryYawOffset",0);Fe(this,"keys",new Set);Fe(this,"staticColliders",[]);Fe(this,"vehicleColliders",[]);Fe(this,"camPos",new P);Fe(this,"camTarget",new P);Fe(this,"camInit",!1);Fe(this,"zoom",7.6);Fe(this,"toastTimer",0);Fe(this,"readyT",0);Fe(this,"lastHud",0);this.setupRenderer(),this.setupScene(),this.setupUI()}setupRenderer(){const e=Ve("app");this.renderer=new lg({antialias:!0,powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ac,this.renderer.toneMapping=cc,this.renderer.toneMappingExposure=1.13,this.renderer.outputColorSpace=Dt,this.renderer.domElement.id="scene-canvas",e.prepend(this.renderer.domElement),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),window.addEventListener("resize",()=>this.onResize())}setupScene(){this.pmrem=new la(this.renderer);const e=this.pmrem.fromScene(new Rg,.06).texture;this.scene.environment=e,this.scene.environmentIntensity=.5,this.world=nv(this.scene),this.staticColliders=[...this.world.colliders,{cx:(Pe.minX+Pe.maxX)/2,cy:4,cz:Pe.minZ-.6,hx:16,hy:4,hz:.7,occlude:!0},{cx:(Pe.minX+Pe.maxX)/2,cy:4,cz:Pe.maxZ+.6,hx:16,hy:4,hz:.7,occlude:!0},{cx:Pe.minX-.6,cy:4,cz:(Pe.minZ+Pe.maxZ)/2,hx:.7,hy:4,hz:13,occlude:!0},{cx:Pe.maxX+.6,cy:4,cz:(Pe.minZ+Pe.maxZ)/2,hx:.7,hy:4,hz:13,occlude:!0}],this.vehicleColliders=this.staticColliders,this.truck=jg(),this.scene.add(this.truck.root),this.placeTruck(Ct.x,Ct.z,Ct.yaw);for(const t of tc){const n=Qg(t.color);n.position.set(t.x,et.halfH,t.z),this.scene.add(n);const s=new Xt({color:new je(It[t.color].hex),transparent:!0,opacity:.75,side:Ut,depthWrite:!1}),i=new Ne(new Mr(.78,.9,40),s);i.rotation.x=-Math.PI/2,i.position.set(t.x,.045,t.z),i.visible=!1,i.renderOrder=2,this.scene.add(i),this.crates.push({color:t.color,group:n,body:null,inWorld:!1,carried:!1,delivered:!1,stable:0,warnAt:0,ring:i,mat:s})}}initPhysics(){const e=window.Ammo;this.A=e;const t=new e.btDefaultCollisionConfiguration,n=new e.btCollisionDispatcher(t),s=new e.btDbvtBroadphase,i=new e.btSequentialImpulseConstraintSolver,a=new e.btDiscreteDynamicsWorld(n,s,i,t);a.setGravity(new e.btVector3(0,-9.82,0)),this.physics=a,this.addStatic(0,-.5,0,18,.5,15),this.addStatic(0,4,Pe.minZ-.55,17,4.5,.6),this.addStatic(0,4,Pe.maxZ+.55,17,4.5,.6),this.addStatic(Pe.minX-.55,4,0,.6,4.5,14),this.addStatic(Pe.maxX+.55,4,0,.6,4.5,14);for(const c of this.world.colliders)this.addStatic(c.cx,c.cy,c.cz,c.hx,c.hy,c.hz);for(const c of this.crates)this.createCrateBody(c);const o=new e.btBoxShape(new e.btVector3(.86,.82,1.3));o.setMargin(.02);const l=new e.btTransform;l.setIdentity(),l.setOrigin(new e.btVector3(Ct.x,.82,Ct.z));const h=new e.btDefaultMotionState(l),u=new e.btVector3(0,0,0),d=new e.btRigidBodyConstructionInfo(0,h,o,u),f=new e.btRigidBody(d);f.setCollisionFlags(2),f.setFriction(.8),f.setActivationState(4),this.physics.addRigidBody(f),this.truckBody=f,this.syncTruckBody()}addStatic(e,t,n,s,i,a){const o=this.A,l=new o.btBoxShape(new o.btVector3(s,i,a)),h=new o.btTransform;h.setIdentity(),h.setOrigin(new o.btVector3(e,t,n));const u=new o.btDefaultMotionState(h),d=new o.btVector3(0,0,0),f=new o.btRigidBodyConstructionInfo(0,u,l,d),c=new o.btRigidBody(f);return c.setFriction(.85),this.physics.addRigidBody(c),c}createCrateBody(e){const t=this.A,n=new t.btBoxShape(new t.btVector3(et.w/2,et.halfH,et.d/2));n.setMargin(.012);const s=new t.btTransform;s.setIdentity(),s.setOrigin(new t.btVector3(e.group.position.x,e.group.position.y,e.group.position.z));const i=new t.btDefaultMotionState(s),a=new t.btVector3(0,0,0);n.calculateLocalInertia(42,a);const o=new t.btRigidBodyConstructionInfo(42,i,n,a),l=new t.btRigidBody(o);l.setFriction(.72),l.setRestitution(.02),l.setDamping(.3,.85),l.setAngularFactor(new t.btVector3(0,1,0)),l.setSleepingThresholds(.12,.12),e.body=l,this.physics.addRigidBody(l),e.inWorld=!0}syncTruckBody(){if(!this.truckBody||!this.A)return;const e=this.A,t=new e.btTransform;t.setIdentity(),t.setOrigin(new e.btVector3(this.pos.x,.82,this.pos.z)),t.setRotation(new e.btQuaternion(0,Math.sin(this.pos.yaw/2),0,Math.cos(this.pos.yaw/2))),this.truckBody.setWorldTransform(t),this.truckBody.getMotionState().setWorldTransform(t)}setupUI(){Ve("app").insertAdjacentHTML("beforeend",`
      <div id="vignette"></div>
      <div id="hud" class="hidden">
        <div class="panel hud-left">
          <div class="brand"><span class="brand-mark"></span><span>PELICAN <em>FORKLIFT ACADEMY</em></span></div>
          <div class="timer-row"><span class="timer-label">剩余时间</span><span id="timer" class="timer">02:00.0</span></div>
          <div class="timebar"><i id="timebar-fill"></i></div>
          <div class="delivery-row">
            <span class="delivery-label">已交付</span>
            <span id="score" class="score">0 / 3</span>
            <div class="chips" id="chips"></div>
          </div>
        </div>
        <div class="objective panel">
          <span class="obj-kicker">当前任务</span>
          <span id="objective-text">将三个货箱送入同色交付区</span>
        </div>
        <div class="hud-right">
          <button id="pause-btn" class="icon-btn" title="暂停 (P)"><span class="pause-icon"></span><span>暂停</span></button>
          <div class="cam-badge panel"><span id="cam-label">跟随视角</span><span class="keycap">C</span></div>
        </div>
        <div class="hud-bottom-left panel">
          <div class="controls-grid">
            <span><b>W</b><b>S</b> 前进 / 后退</span>
            <span><b>A</b><b>D</b> 转向</span>
            <span><b>Q</b><b>E</b> 升叉 / 降叉释放</span>
            <span><b>空格</b> 制动</span>
            <span><b>P</b> 暂停</span>
            <span><b>C</b> 视角</span>
          </div>
        </div>
        <div class="hud-bottom-right panel">
          <div class="load-row"><span class="load-key">货叉</span><span id="fork-height">0.10 m</span></div>
          <div class="fork-gauge"><i id="fork-fill"></i><span class="gauge-max">1.8</span><span class="gauge-min">0</span></div>
          <div class="carry-row"><span class="dot" id="carry-dot"></span><span class="load-key">载荷</span><span id="carry-text">空载</span></div>
          <div id="align-pill" class="align-pill">对准货箱箱底</div>
        </div>
        <div id="toast" class="toast"></div>
      </div>

      <div id="start-overlay" class="overlay">
        <div class="hero">
          <div class="overline">PELICAN · FORKLIFT ACADEMY · BAY 03</div>
          <h1>鹈鹕<span>叉车</span>驾校</h1>
          <p class="lede">三位菜鸟鹈鹕的毕业考核。驾驶 FL-03 叉车，在 120 秒内把三只同色货箱准确送进对应交付区。</p>
          <div class="feature-row">
            <div><i class="sw" style="background:#c9463c"></i>红色货箱</div>
            <div><i class="sw" style="background:#dea62b"></i>黄色货箱</div>
            <div><i class="sw" style="background:#3b6ea8"></i>蓝色货箱</div>
          </div>
          <div class="start-controls">
            <span><b>W</b><b>S</b> 行驶</span>
            <span><b>A</b><b>D</b> 转向</span>
            <span><b>Q</b><b>E</b> 升降货叉</span>
            <span><b>空格</b> 制动</span>
            <span><b>P</b> 暂停 / 检查模型</span>
          </div>
          <div class="start-actions">
            <button id="start-btn" class="primary-btn"><span>开始训练</span><kbd>ENTER</kbd></button>
            <span class="local-note">本地运行 · Three.js + Ammo · 无需联网</span>
          </div>
        </div>
        <div class="start-side">
          <div class="stat-card"><span class="stat-num">03</span><span class="stat-lab">CARGO<br>CRATES</span></div>
          <div class="stat-card"><span class="stat-num">120</span><span class="stat-lab">SECONDS<br>LIMIT</span></div>
          <div class="stat-card"><span class="stat-num">FL-03</span><span class="stat-lab">TRAINING<br>FORKLIFT</span></div>
        </div>
      </div>

      <div id="pause-overlay" class="overlay side-overlay hidden">
        <div class="pause-card panel">
          <div class="overline">SYSTEM PAUSED</div>
          <h2>已暂停</h2>
          <p class="muted">物理、计时与交付稳定计时均已冻结。可选择视角检查 FL-03 与鹈鹕学员。</p>
          <div class="inspect-label">模型检查 <span>· 保持暂停</span></div>
          <div class="inspect-grid">
            <button class="view-btn" data-view="front">前视</button>
            <button class="view-btn" data-view="side">侧视</button>
            <button class="view-btn" data-view="rear">后视</button>
            <button class="view-btn" data-view="iso">斜上方</button>
          </div>
          <button id="exit-inspect" class="ghost-btn wide">退出检查 / 跟随视角</button>
          <div class="pause-actions">
            <button id="resume-btn" class="primary-btn"><span>恢复训练</span><kbd>P</kbd></button>
            <button id="restart-pause-btn" class="ghost-btn">重新开始</button>
          </div>
          <div class="freeze-note"><span class="freeze-dot"></span> 世界状态未改变<span class="pause-clock">剩余 <b id="pause-timer">02:00.0</b></span></div>
        </div>
        <div class="inspect-caption" id="inspect-caption"></div>
      </div>

      <div id="end-overlay" class="overlay hidden">
        <div class="end-card panel">
          <div id="end-kicker" class="overline">TRAINING COMPLETE</div>
          <h2 id="end-title">全部交付！</h2>
          <p id="end-sub" class="muted">三只货箱均已归位。</p>
          <div class="end-stats">
            <div><span>交付</span><b id="end-score">3 / 3</b></div>
            <div><span>用时</span><b id="end-time">01:12.4</b></div>
            <div><span>剩余</span><b id="end-left">00:47.6</b></div>
          </div>
          <div id="end-stamps" class="end-stamps"></div>
          <button id="restart-end-btn" class="primary-btn"><span>重新挑战</span><kbd>R</kbd></button>
          <p class="tiny">R 重开 · 失败与胜利都会重置车辆、三箱、计时与分数</p>
        </div>
      </div>
      <div id="loading" class="loading">正在装配叉车与鹈鹕…</div>
    `);const e=Ve("chips");for(const t of ai){const n=document.createElement("span");n.className="chip",n.dataset.color=t.color,n.style.setProperty("--chip",It[t.color].hex),n.innerHTML=`<i></i>${It[t.color].zh}`,e.appendChild(n)}Ve("start-btn").addEventListener("click",()=>this.startGame()),Ve("pause-btn").addEventListener("click",()=>this.togglePause()),Ve("resume-btn").addEventListener("click",()=>this.togglePause()),Ve("restart-pause-btn").addEventListener("click",()=>this.restart()),Ve("restart-end-btn").addEventListener("click",()=>this.restart()),Ve("exit-inspect").addEventListener("click",()=>this.setInspect(null));for(const t of Array.from(document.querySelectorAll(".view-btn")))t.addEventListener("click",()=>this.setInspect(t.dataset.view));window.addEventListener("keydown",t=>this.onKeyDown(t)),window.addEventListener("keyup",t=>this.onKeyUp(t)),window.addEventListener("blur",()=>this.keys.clear()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.mode==="playing"&&this.togglePause()}),window.addEventListener("wheel",t=>{this.mode==="playing"&&(this.zoom=nn.clamp(this.zoom+Math.sign(t.deltaY)*.5,5.2,11))},{passive:!0}),Ve("loading").classList.add("hidden")}onKeyDown(e){const t=e.key.toLowerCase();if([" ","arrowup","arrowdown","arrowleft","arrowright"].includes(t)&&e.preventDefault(),e.repeat){["w","s","a","d","q","e"].includes(t)&&this.keys.add(t);return}if(t==="enter"&&this.mode==="ready"){this.startGame();return}if(t==="p"){(this.mode==="playing"||this.mode==="paused")&&this.togglePause();return}if(t==="c"){this.cycleCamera();return}if(t==="r"&&(this.mode==="paused"||this.mode==="won"||this.mode==="lost")){this.restart();return}if(this.mode==="playing"){if(t===" "){e.preventDefault(),this.keys.add(" ");return}["w","s","a","d","q","e"].includes(t)&&this.keys.add(t)}}onKeyUp(e){const t=e.key.toLowerCase();this.keys.delete(t),t===" "&&this.keys.delete(" ")}startGame(){this.hideOverlays(),this.restartState(),this.mode="playing",Ve("hud").classList.remove("hidden"),this.showToast("训练开始 · 120 秒","good"),this.updateHud(!0)}restart(){this.physics&&(this.hideOverlays(),this.restartState(),this.mode="playing",Ve("hud").classList.remove("hidden"),this.showToast("已重置车辆、货箱、计时与分数","good"),this.updateHud(!0))}restartState(){this.pos={x:Ct.x,z:Ct.z,yaw:Ct.yaw},this.speed=0,this.steer=0,this.lift=0,this.carrying=null,this.timeLeft=ho,this.elapsed=0,this.score=0,this.inspect=null,this.camMode="follow",this.camInit=!1,this.zoom=7.6,this.truck.lift.position.y=0,this.placeTruck(Ct.x,Ct.z,Ct.yaw),this.syncTruckBody();for(let e=0;e<this.crates.length;e++){const t=this.crates[e],n=tc[e];t.delivered=!1,t.carried=!1,t.stable=0,t.warnAt=0,t.ring.visible=!1,t.group.visible=!0,t.group.position.set(n.x,et.halfH,n.z),t.group.rotation.set(0,0,0),t.inWorld||(this.physics.addRigidBody(t.body),t.inWorld=!0),this.resetBody(t,n.x,et.halfH,n.z,0)}for(const e of Array.from(document.querySelectorAll(".view-btn")))e.classList.remove("active");Ve("inspect-caption").textContent="",this.keys.clear(),this.updateHud(!0)}resetBody(e,t,n,s,i){const a=this.A,o=new a.btTransform;o.setIdentity(),o.setOrigin(new a.btVector3(t,n,s)),o.setRotation(new a.btQuaternion(0,Math.sin(i/2),0,Math.cos(i/2))),e.body.setWorldTransform(o),e.body.getMotionState().setWorldTransform(o),e.body.setLinearVelocity(new a.btVector3(0,0,0)),e.body.setAngularVelocity(new a.btVector3(0,0,0)),e.body.activate()}hideOverlays(){Ve("start-overlay").classList.add("hidden"),Ve("pause-overlay").classList.add("hidden"),Ve("end-overlay").classList.add("hidden"),Ve("inspect-caption").textContent=""}togglePause(){this.mode==="playing"?(this.mode="paused",this.keys.clear(),this.inspect=null,Ve("hud").classList.add("hidden"),Ve("pause-overlay").classList.remove("hidden"),Ve("pause-timer").textContent=tr(this.timeLeft),Ve("inspect-caption").textContent="物理与计时已冻结 · 选择前 / 侧 / 后 / 斜上方检查模型",this.setInspect(null)):this.mode==="paused"&&(this.mode="playing",this.inspect=null,Ve("pause-overlay").classList.add("hidden"),Ve("hud").classList.remove("hidden"))}setInspect(e){if(this.mode!=="paused")return;this.inspect=e;for(const n of Array.from(document.querySelectorAll(".view-btn")))n.classList.toggle("active",n.dataset.view===e);const t={front:"前视检查",side:"侧视检查",rear:"后视检查",iso:"斜上方检查"};Ve("inspect-caption").textContent=e?`模型检查 · ${t[e]} · 暂停中`:"模型检查已退出 · 保持暂停",Ve("exit-inspect").classList.toggle("active",!e)}cycleCamera(){this.camMode=this.camMode==="follow"?"cockpit":"follow";const e=this.camMode==="follow"?"跟随视角":"驾驶视角";Ve("cam-label").textContent=e,this.showToast(e,"info")}placeTruck(e,t,n){this.pos.x=e,this.pos.z=t,this.pos.yaw=n,this.truck.root.position.set(e,0,t),this.truck.root.rotation.y=n}start(){this.camera.position.set(Ct.x+2,5,Ct.z+8.5),this.camPos.copy(this.camera.position),this.camTarget.set(Ct.x,1.2,Ct.z),this.renderer.setAnimationLoop(()=>this.tick())}tick(){const e=Math.min(this.clock.getDelta(),.05);this.readyT+=e,this.mode==="playing"&&(this.timeLeft=Math.max(0,this.timeLeft-e),this.elapsed+=e,this.fixedStep(e),this.timeLeft<=0&&this.mode==="playing"&&this.endGame(!1)),this.animateVisuals(e),this.updateCamera(e),this.renderer.render(this.scene,this.camera),this.lastHud+=e,this.lastHud>.08&&this.mode!=="paused"&&(this.updateHud(!1),this.lastHud=0),this.toastTimer>0&&(this.toastTimer-=e,this.toastTimer<=0&&Ve("toast").classList.remove("show"))}fixedStep(e){const t=Math.min(3,Math.max(1,Math.ceil(e/.016666666666666666))),n=e/t;for(let s=0;s<t;s++)this.updateVehicle(n),this.physics.stepSimulation(n,2,1/120);this.syncCrates(),this.updateDelivery(e)}updateVehicle(e){const t=this.keys,n=t.has("w")?1:0,s=t.has("s")?1:0,i=t.has("a")?1:0,a=t.has("d")?1:0,o=t.has(" "),l=t.has("q"),h=t.has("e"),u=n-s;let d=0;u>0?d=4.3:u<0&&(d=-2.5),o&&(d=0);const f=u!==0&&!o?4.6:7.8,c=d-this.speed;this.speed+=Math.sign(c)*Math.min(Math.abs(c),f*e),o&&Math.abs(this.speed)<.05&&(this.speed=0),u===0&&!o&&(this.speed*=Math.pow(.12,e));const p=(i-a)*(.62-Math.min(Math.abs(this.speed),4)*.045);this.steer+=(p-this.steer)*Math.min(1,e*7.5),Math.abs(this.speed)>.02&&(this.pos.yaw+=this.speed/Pg*Math.tan(this.steer)*e),this.pos.x+=Math.sin(this.pos.yaw)*this.speed*e,this.pos.z+=Math.cos(this.pos.yaw)*this.speed*e,this.resolveVehicleCollisions(),this.truck.root.position.set(this.pos.x,0,this.pos.z),this.truck.root.rotation.y=this.pos.yaw,this.syncTruckBody();for(const m of this.truck.wheels)m.spin.rotation.x-=this.speed*e/m.radius,m.steer.rotation.y=m.front?0:this.steer;let v=0;if(l?v=1:h&&(v=-1),v!==0&&(this.lift=nn.clamp(this.lift+v*Lg*e,0,uo)),this.truck.lift.position.y=this.lift,this.carrying){const m=this.carrying,g=Math.max(this.lift+.48,.5),T=this.pos.x+Math.cos(this.pos.yaw)*this.carrySide+Math.sin(this.pos.yaw)*this.carryForward,M=this.pos.z-Math.sin(this.pos.yaw)*this.carrySide+Math.cos(this.pos.yaw)*this.carryForward;m.group.position.set(T,g,M),m.group.rotation.set(0,this.pos.yaw+this.carryYawOffset,0),this.lift<=Ig&&this.release()}else{const m=this.pickCandidate();m&&l&&this.attach(m)}}resolveVehicleCollisions(){const e=[{z:-1.05,r:.78},{z:-.1,r:.86},{z:.85,r:.8},{z:1.3,r:.5}];this.carrying&&e.push({z:2,r:.82});let t=!1;for(let n=0;n<2;n++)for(const s of e){const i=this.pos.x+Math.sin(this.pos.yaw)*s.z,a=this.pos.z+Math.cos(this.pos.yaw)*s.z;for(const o of this.vehicleColliders){const l=Math.max(o.cx-o.hx,Math.min(i,o.cx+o.hx)),h=Math.max(o.cz-o.hz,Math.min(a,o.cz+o.hz)),u=i-l,d=a-h,f=u*u+d*d;if(!(f>=s.r*s.r))if(t=!0,f<1e-7){const c=i-(o.cx-o.hx),p=o.cx+o.hx-i,v=a-(o.cz-o.hz),m=o.cz+o.hz-a,g=Math.min(c,p,v,m);g===c?this.pos.x-=g+s.r:g===p?this.pos.x+=g+s.r:g===v?this.pos.z-=g+s.r:this.pos.z+=g+s.r}else{const c=Math.sqrt(f),p=s.r-c;this.pos.x+=u/c*p,this.pos.z+=d/c*p}}}t&&(this.speed*=.72),this.pos.x=nn.clamp(this.pos.x,Pe.minX+1,Pe.maxX-1),this.pos.z=nn.clamp(this.pos.z,Pe.minZ+1,Pe.maxZ-1)}pickCandidate(){const e=this.lift+js;let t=null;for(const n of this.crates){if(n.carried||n.delivered)continue;const s=n.group.position.x-this.pos.x,i=n.group.position.z-this.pos.z,a=Math.cos(this.pos.yaw)*s-Math.sin(this.pos.yaw)*i,o=Math.sin(this.pos.yaw)*s+Math.cos(this.pos.yaw)*i;if(o<1||o>2.9||Math.abs(a)>Qs.lateral)continue;let l=n.group.rotation.y-this.pos.yaw;const h=Math.PI/2;if(l=((l+h/2)%h+h)%h-h/2,Math.abs(l*180/Math.PI)>Qs.angleDeg)continue;const d=n.group.position.y-et.halfH;if(Math.abs(e-d)>Qs.height||2.36-(o-et.d/2)<Qs.insertion)continue;const p=Math.abs(a)+Math.abs(l);(!t||p<t.score)&&(t={c:n,score:p})}return t?t.c:null}attach(e){if(this.carrying)return;const t=e.group.position.x-this.pos.x,n=e.group.position.z-this.pos.z,s=Math.cos(this.pos.yaw)*t-Math.sin(this.pos.yaw)*n,i=Math.sin(this.pos.yaw)*t+Math.cos(this.pos.yaw)*n;this.carrying=e,e.carried=!0,e.stable=0,this.carrySide=nn.clamp(s,-.18,.18),this.carryForward=nn.clamp(i,1.55,1.9);let a=e.group.rotation.y-this.pos.yaw;const o=Math.PI/2;a=((a+o/2)%o+o)%o-o/2,this.carryYawOffset=a,e.inWorld&&(this.physics.removeRigidBody(e.body),e.inWorld=!1),this.showToast(`${It[e.color].zh}货箱已托起 · 运往同色交付区`,"good")}release(){const e=this.carrying;if(!e)return;this.carrying=null,e.carried=!1;const t=Math.max(e.group.position.y,et.halfH+.005);e.inWorld||(this.physics.addRigidBody(e.body),e.inWorld=!0),this.resetBody(e,e.group.position.x,t,e.group.position.z,e.group.rotation.y),this.showToast(`${It[e.color].zh}货箱已释放`,"info")}syncCrates(){const e=this.A;for(const t of this.crates){if(t.carried||t.delivered||!t.inWorld)continue;const n=t.body.getWorldTransform(),s=n.getOrigin(),i=n.getRotation();let a=s.x(),o=s.y(),l=s.z();if(o<et.halfH){o=et.halfH;const u=new e.btTransform;u.setIdentity(),u.setOrigin(new e.btVector3(a,o,l)),u.setRotation(i),t.body.setWorldTransform(u),t.body.setLinearVelocity(new e.btVector3(0,0,0)),t.body.getMotionState().setWorldTransform(u)}a=nn.clamp(a,Pe.minX+1,Pe.maxX-1),l=nn.clamp(l,Pe.minZ+1,Pe.maxZ-1);const h=Math.atan2(2*(i.w()*i.y()+i.x()*i.z()),1-2*(i.y()*i.y()+i.z()*i.z()));t.group.position.set(a,o,l),t.group.rotation.set(0,h,0),t.ring.position.set(a,.045,l)}}crateSpeed(e){if(!e.inWorld)return 0;const t=e.body.getLinearVelocity();return Math.hypot(t.x(),t.z())}zoneOf(e){const t=et.w/2+.005,n=et.d/2+.005,s=e.group.rotation.y;for(const i of ai){let a=!0;for(const[o,l]of[[-t,-n],[t,-n],[-t,n],[t,n]]){const h=e.group.position.x+o*Math.cos(s)+l*Math.sin(s),u=e.group.position.z-o*Math.sin(s)+l*Math.cos(s);if(Math.abs(h-i.x)>i.w/2||Math.abs(u-i.z)>i.d/2){a=!1;break}}if(a)return i}return null}updateDelivery(e){for(const t of this.crates){if(t.carried||t.delivered)continue;const n=t.group.position.y-et.halfH,s=this.crateSpeed(t),i=this.zoneOf(t),a=n<=er.maxBottom,o=s<=er.maxSpeed,l=i&&i.color===t.color;l&&a&&o?(t.stable+=e,t.mat.opacity=.75+Math.min(.25,t.stable/er.stableSeconds*.25),t.stable>=er.stableSeconds&&this.deliver(t,i)):(t.stable=0,i&&!l&&a&&o&&this.elapsed-t.warnAt>2.5&&(t.warnAt=this.elapsed,this.showToast(`颜色不匹配：${It[t.color].zh}货箱应放入${It[t.color].zh}交付区`,"bad")))}}deliver(e,t){e.delivered=!0,e.stable=0,e.inWorld&&(this.physics.removeRigidBody(e.body),e.inWorld=!1),e.ring.visible=!0,e.mat.opacity=1,e.ring.position.set(e.group.position.x,.045,e.group.position.z),this.score++,this.showToast(`${It[e.color].zh}货箱交付成功 · ${this.score} / 3`,"good");const n=document.querySelector(`.chip[data-color="${e.color}"]`);n&&n.classList.add("done"),this.updateHud(!0),this.score>=3&&this.endGame(!0)}endGame(e){if(this.mode==="won"||this.mode==="lost")return;this.mode=e?"won":"lost",this.keys.clear(),this.inspect=null,Ve("hud").classList.add("hidden"),Ve("pause-overlay").classList.add("hidden"),Ve("end-overlay").classList.remove("hidden"),Ve("end-kicker").textContent=e?"TRAINING COMPLETE · ALL CARGO DELIVERED":"TIME UP · TRAINING INCOMPLETE",Ve("end-title").textContent=e?"全部交付！":"训练超时",Ve("end-sub").textContent=e?"三只货箱全部进入同色交付区，鹈鹕学员顺利毕业。":`时间用尽，本次仅交付 ${this.score} / 3 只货箱。调整对位与路线再试一次。`,Ve("end-score").textContent=`${this.score} / 3`,Ve("end-time").textContent=tr(this.elapsed),Ve("end-left").textContent=tr(this.timeLeft);const t=Ve("end-stamps");t.innerHTML="";for(const n of ai){const s=this.crates.find(a=>a.color===n.color),i=document.createElement("div");i.className=`stamp ${s!=null&&s.delivered?"ok":"no"}`,i.innerHTML=`<i style="background:${It[n.color].hex}"></i>${It[n.color].zh}${s!=null&&s.delivered?"已交付":"未交付"}`,t.appendChild(i)}}animateVisuals(e){const t=this.readyT,n=this.truck.beacon.material;n.emissiveIntensity=1.7+Math.sin(t*5.5)*.9,this.truck.beacon.rotation.y+=e*3.2;const s=this.truck.pelican;s.head.rotation.x=Math.sin(t*1.7)*.025,s.head.rotation.z=Math.sin(t*.9)*.03-this.steer*.07,s.torso.rotation.z=Math.sin(t*1.4)*.012-this.steer*.035,s.torso.rotation.x=Math.sin(t*1.1)*.012+Math.min(.06,Math.abs(this.speed)*.008);for(const i of this.crates)i.ring.visible&&(i.ring.scale.setScalar(1+Math.sin(t*2.4)*.03),i.mat.opacity=.55+Math.sin(t*2.4)*.15)}updateCamera(e){const t=new P(this.pos.x,0,this.pos.z),n=new P,s=new P;if(this.mode==="ready"||this.mode==="won"||this.mode==="lost"){const i=this.readyT*.14+2.15,a=this.mode==="ready"?8.6:9.4;n.set(t.x+Math.cos(i)*a,3.5+Math.sin(this.readyT*.2)*.5,t.z+Math.sin(i)*a),s.set(t.x,1.35,t.z+.2)}else if(this.mode==="paused"&&this.inspect){const i=this.inspect==="iso"?8.2:9.2,a=this.pos.yaw,o=new P(Math.sin(a),0,Math.cos(a)),l=new P(Math.cos(a),0,-Math.sin(a));this.inspect==="front"?n.copy(t).addScaledVector(o,i).add(new P(0,2.35,0)):this.inspect==="rear"?n.copy(t).addScaledVector(o,-i).add(new P(0,2.5,0)):this.inspect==="side"?n.copy(t).addScaledVector(l,i).add(new P(0,2.3,0)):n.copy(t).addScaledVector(o,i*.72).addScaledVector(l,i*.66).add(new P(0,3.8,0)),s.set(t.x,1.2,t.z);const h=new P().subVectors(s,n).setY(0).normalize(),u=new P(-h.z,0,h.x).multiplyScalar(-1.25);n.add(u),s.add(u)}else if(this.camMode==="cockpit"){const i=new P(Math.sin(this.pos.yaw),0,Math.cos(this.pos.yaw)),a=new P(Math.cos(this.pos.yaw),0,-Math.sin(this.pos.yaw));n.copy(t).addScaledVector(i,-.5).addScaledVector(a,.06).add(new P(0,2.16,0)),s.copy(t).addScaledVector(i,4.4).setY(.92),this.camera.position.copy(n),this.camera.lookAt(s),this.camPos.copy(n),this.camTarget.copy(s);return}else{const i=new P(Math.sin(this.pos.yaw),0,Math.cos(this.pos.yaw)),a=new P(Math.cos(this.pos.yaw),0,-Math.sin(this.pos.yaw));n.copy(t).addScaledVector(i,-this.zoom).addScaledVector(a,2.55).add(new P(0,5,0)),s.copy(t).addScaledVector(i,1.9).add(new P(0,.7,0))}if(n.x=nn.clamp(n.x,Pe.minX+.8,Pe.maxX-.8),n.z=nn.clamp(n.z,Pe.minZ+.8,Pe.maxZ-.8),n.y=nn.clamp(n.y,1.35,Pe.wallH-.7),(this.mode==="playing"||this.mode==="ready")&&n.copy(this.avoidCamera(s,n)),!this.camInit)this.camPos.copy(n),this.camTarget.copy(s),this.camInit=!0;else{const i=1-Math.exp(-e*(this.mode==="playing"?5.2:3.4));this.camPos.lerp(n,i),this.camTarget.lerp(s,1-Math.exp(-e*6))}this.camera.position.copy(this.camPos),this.camera.lookAt(this.camTarget)}avoidCamera(e,t){const n=new P().subVectors(t,e),s=n.length();if(s<.001)return t;n.divideScalar(s);let i=1;for(const a of this.staticColliders){if(!a.occlude)continue;const o=this.segmentBox(e,n,s,a);o!==null&&o<i&&(i=o)}return i<1?e.clone().addScaledVector(n,Math.max(.9,i*s-.5)):t}segmentBox(e,t,n,s){const i=new P(s.cx-s.hx,s.cy-s.hy,s.cz-s.hz),a=new P(s.cx+s.hx,s.cy+s.hy,s.cz+s.hz);let o=0,l=n;for(const h of["x","y","z"]){const u=e[h],d=t[h],f=i[h],c=a[h];if(Math.abs(d)<1e-8){if(u<f||u>c)return null}else{let p=(f-u)/d,v=(c-u)/d;if(p>v&&([p,v]=[v,p]),o=Math.max(o,p),l=Math.min(l,v),o>l)return null}}return o>.05?o:null}updateHud(e){Ve("timer").textContent=tr(this.timeLeft);const t=this.timeLeft/ho,n=Ve("timebar-fill");n.style.transform=`scaleX(${Math.max(0,t)})`,n.style.background=t<.25?"linear-gradient(90deg,#c9463c,#e08a45)":t<.5?"linear-gradient(90deg,#d3a33a,#e3c46b)":"linear-gradient(90deg,#2f8f83,#7fcbb8)",Ve("score").textContent=`${this.score} / 3`,Ve("fork-height").textContent=`${(this.lift+js).toFixed(2)} m`,Ve("fork-fill").style.transform=`scaleY(${Math.max(.02,(this.lift+js)/(uo+js))})`;const s=Ve("carry-text"),i=Ve("carry-dot");this.carrying?(s.textContent=`${It[this.carrying.color].zh}货箱`,i.style.background=It[this.carrying.color].hex,i.classList.add("loaded")):(s.textContent="空载",i.style.background="#4a5759",i.classList.remove("loaded"));const a=Ve("align-pill");if(this.carrying)a.textContent="按 E 降叉释放 · 需完全进入同色区",a.className="align-pill carry";else if(this.pickCandidate())a.textContent="已对准箱底 · 按 Q 升叉托起",a.className="align-pill ready";else{const l=this.crates.find(h=>!h.delivered&&Math.hypot(h.group.position.x-this.pos.x,h.group.position.z-this.pos.z)<4);a.textContent=l?`对准${It[l.color].zh}货箱 · 低位插入箱底`:"对准货箱箱底",a.className="align-pill"}for(const o of ai){const l=this.crates.find(u=>u.color===o.color),h=document.querySelector(`.chip[data-color="${o.color}"]`);h&&h.classList.toggle("done",!!(l!=null&&l.delivered))}e&&(Ve("objective-text").textContent=this.score>=3?"全部交付完成":"将三个货箱送入同色交付区",Ve("cam-label").textContent=this.camMode==="follow"?"跟随视角":"驾驶视角")}showToast(e,t="info"){const n=Ve("toast");n.textContent=e,n.className=`toast show ${t}`,this.toastTimer=2.4}onResize(){const e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75))}snapshot(){var e,t,n;return{mode:this.mode,timeLeft:+this.timeLeft.toFixed(3),elapsed:+this.elapsed.toFixed(3),score:this.score,lift:+this.lift.toFixed(3),speed:+this.speed.toFixed(3),yaw:+this.pos.yaw.toFixed(3),x:+this.pos.x.toFixed(3),z:+this.pos.z.toFixed(3),carrying:((e=this.carrying)==null?void 0:e.color)??null,canPick:((t=this.pickCandidate())==null?void 0:t.color)??null,camera:this.camMode,inspect:this.inspect,crates:this.crates.map(s=>{var i;return{color:s.color,x:+s.group.position.x.toFixed(3),y:+s.group.position.y.toFixed(3),z:+s.group.position.z.toFixed(3),delivered:s.delivered,carried:s.carried,stable:+s.stable.toFixed(2),zone:((i=this.zoneOf(s))==null?void 0:i.color)??null}}),render:{geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,calls:this.renderer.info.render.calls,tris:this.renderer.info.render.triangles,programs:((n=this.renderer.info.programs)==null?void 0:n.length)??null}}}debugTeleport(e,t,n){this.mode==="playing"&&(this.placeTruck(e,t,n),this.syncTruckBody(),this.speed=0)}debugSetLift(e){if(this.lift=nn.clamp(e,0,uo),this.truck.lift.position.y=this.lift,this.carrying){const t=this.carrying,n=Math.max(this.lift+.48,.5),s=this.pos.x+Math.cos(this.pos.yaw)*this.carrySide+Math.sin(this.pos.yaw)*this.carryForward,i=this.pos.z-Math.sin(this.pos.yaw)*this.carrySide+Math.cos(this.pos.yaw)*this.carryForward;t.group.position.set(s,n,i)}}debugPlaceCrate(e,t,n,s=et.halfH){const i=this.crates.find(a=>a.color===e);!i||i.carried||i.delivered||(i.inWorld||(this.physics.addRigidBody(i.body),i.inWorld=!0),this.resetBody(i,t,s,n,0),i.group.position.set(t,s,n),i.group.rotation.set(0,0,0))}}const rv=()=>{try{const r=new sv;r.initPhysics(),r.start(),window.__pelican=r}catch(r){console.error(r);const e=document.getElementById("app");e&&e.insertAdjacentHTML("beforeend",`<div class="loading" style="color:#e9b7a4;z-index:99">初始化失败：${String(r)}</div>`)}};xg("./vendor/ammo",rv);
