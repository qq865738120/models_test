var sh=Object.defineProperty;var rh=(r,t,e)=>t in r?sh(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var Nt=(r,t,e)=>rh(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pr="171",oh=0,Ua=1,ah=2,sc=1,rc=2,An=3,Gn=0,Ge=1,Fe=2,Vn=0,Di=1,Na=2,Fa=3,Oa=4,lh=5,ni=100,ch=101,hh=102,uh=103,fh=104,dh=200,ph=201,mh=202,gh=203,yo=204,Mo=205,vh=206,xh=207,_h=208,yh=209,Mh=210,Sh=211,wh=212,Eh=213,Th=214,So=0,wo=1,Eo=2,Fi=3,To=4,bo=5,Ao=6,Co=7,oc=0,bh=1,Ah=2,Hn=0,Ch=1,Rh=2,Ph=3,ac=4,Lh=5,Ih=6,Dh=7,lc=300,Oi=301,Bi=302,Ro=303,Po=304,mr=306,lr=1e3,si=1001,Lo=1002,Ke=1003,Uh=1004,Ss=1005,vn=1006,br=1007,ri=1008,In=1009,cc=1010,hc=1011,ls=1012,ca=1013,ai=1014,xn=1015,ds=1016,ha=1017,ua=1018,zi=1020,uc=35902,fc=1021,dc=1022,pn=1023,pc=1024,mc=1025,Ui=1026,ki=1027,fa=1028,da=1029,gc=1030,pa=1031,ma=1033,tr=33776,er=33777,nr=33778,ir=33779,Io=35840,Do=35841,Uo=35842,No=35843,Fo=36196,Oo=37492,Bo=37496,zo=37808,ko=37809,Vo=37810,Ho=37811,Go=37812,Wo=37813,Xo=37814,Yo=37815,qo=37816,Zo=37817,$o=37818,Ko=37819,Jo=37820,jo=37821,sr=36492,Qo=36494,ta=36495,vc=36283,ea=36284,na=36285,ia=36286,Nh=3200,Fh=3201,xc=0,Oh=1,Cn="",Ie="srgb",Vi="srgb-linear",cr="linear",de="srgb",di=7680,Ba=519,Bh=512,zh=513,kh=514,_c=515,Vh=516,Hh=517,Gh=518,Wh=519,za=35044,ka="300 es",Rn=2e3,hr=2001;class Gi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const i=s.indexOf(e);i!==-1&&s.splice(i,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let i=0,a=s.length;i<a;i++)s[i].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Va=1234567;const is=Math.PI/180,cs=180/Math.PI;function ui(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[r&255]+Ue[r>>8&255]+Ue[r>>16&255]+Ue[r>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function $t(r,t,e){return Math.max(t,Math.min(e,r))}function ga(r,t){return(r%t+t)%t}function Xh(r,t,e,n,s){return n+(r-t)*(s-n)/(e-t)}function Yh(r,t,e){return r!==t?(e-r)/(t-r):0}function ss(r,t,e){return(1-e)*r+e*t}function qh(r,t,e,n){return ss(r,t,1-Math.exp(-e*n))}function Zh(r,t=1){return t-Math.abs(ga(r,t*2)-t)}function $h(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function Kh(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function Jh(r,t){return r+Math.floor(Math.random()*(t-r+1))}function jh(r,t){return r+Math.random()*(t-r)}function Qh(r){return r*(.5-Math.random())}function tu(r){r!==void 0&&(Va=r);let t=Va+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function eu(r){return r*is}function nu(r){return r*cs}function iu(r){return(r&r-1)===0&&r!==0}function su(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function ru(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function ou(r,t,e,n,s){const i=Math.cos,a=Math.sin,o=i(e/2),l=a(e/2),h=i((t+n)/2),u=a((t+n)/2),d=i((t-n)/2),f=a((t-n)/2),c=i((n-t)/2),p=a((n-t)/2);switch(s){case"XYX":r.set(o*u,l*d,l*f,o*h);break;case"YZY":r.set(l*f,o*u,l*d,o*h);break;case"ZXZ":r.set(l*d,l*f,o*u,o*h);break;case"XZX":r.set(o*u,l*p,l*c,o*h);break;case"YXY":r.set(l*c,o*u,l*p,o*h);break;case"ZYZ":r.set(l*p,l*c,o*u,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ri(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ke(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const en={DEG2RAD:is,RAD2DEG:cs,generateUUID:ui,clamp:$t,euclideanModulo:ga,mapLinear:Xh,inverseLerp:Yh,lerp:ss,damp:qh,pingpong:Zh,smoothstep:$h,smootherstep:Kh,randInt:Jh,randFloat:jh,randFloatSpread:Qh,seededRandom:tu,degToRad:eu,radToDeg:nu,isPowerOfTwo:iu,ceilPowerOfTwo:su,floorPowerOfTwo:ru,setQuaternionFromProperEuler:ou,normalize:ke,denormalize:Ri};class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),i=this.x-t.x,a=this.y-t.y;return this.x=i*n-a*s+t.x,this.y=i*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,n,s,i,a,o,l,h){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,i,a,o,l,h)}set(t,e,n,s,i,a,o,l,h){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=i,u[5]=l,u[6]=n,u[7]=a,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,i=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],u=n[4],d=n[7],f=n[2],c=n[5],p=n[8],v=s[0],m=s[3],g=s[6],T=s[1],M=s[4],x=s[7],S=s[2],_=s[5],y=s[8];return i[0]=a*v+o*T+l*S,i[3]=a*m+o*M+l*_,i[6]=a*g+o*x+l*y,i[1]=h*v+u*T+d*S,i[4]=h*m+u*M+d*_,i[7]=h*g+u*x+d*y,i[2]=f*v+c*T+p*S,i[5]=f*m+c*M+p*_,i[8]=f*g+c*x+p*y,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],i=t[3],a=t[4],o=t[5],l=t[6],h=t[7],u=t[8];return e*a*u-e*o*h-n*i*u+n*o*l+s*i*h-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],i=t[3],a=t[4],o=t[5],l=t[6],h=t[7],u=t[8],d=u*a-o*h,f=o*l-u*i,c=h*i-a*l,p=e*d+n*f+s*c;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=d*v,t[1]=(s*h-u*n)*v,t[2]=(o*n-s*a)*v,t[3]=f*v,t[4]=(u*e-s*l)*v,t[5]=(s*i-o*e)*v,t[6]=c*v,t[7]=(n*l-h*e)*v,t[8]=(a*e-n*i)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,i,a,o){const l=Math.cos(i),h=Math.sin(i);return this.set(n*l,n*h,-n*(l*a+h*o)+a+t,-s*h,s*l,-s*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ar.makeScale(t,e)),this}rotate(t){return this.premultiply(Ar.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ar.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ar=new Zt;function yc(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ur(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function au(){const r=ur("canvas");return r.style.display="block",r}const Ha={};function Pi(r){r in Ha||(Ha[r]=!0,console.warn(r))}function lu(r,t,e){return new Promise(function(n,s){function i(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:s();break;case r.TIMEOUT_EXPIRED:setTimeout(i,e);break;default:n()}}setTimeout(i,e)})}function cu(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function hu(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ga=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wa=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uu(){const r={enabled:!0,workingColorSpace:Vi,spaces:{},convert:function(s,i,a){return this.enabled===!1||i===a||!i||!a||(this.spaces[i].transfer===de&&(s.r=Pn(s.r),s.g=Pn(s.g),s.b=Pn(s.b)),this.spaces[i].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[i].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===de&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b))),s},fromWorkingColorSpace:function(s,i){return this.convert(s,this.workingColorSpace,i)},toWorkingColorSpace:function(s,i){return this.convert(s,i,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Cn?cr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,i=this.workingColorSpace){return s.fromArray(this.spaces[i].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,i,a){return s.copy(this.spaces[i].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Vi]:{primaries:t,whitePoint:n,transfer:cr,toXYZ:Ga,fromXYZ:Wa,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:de,toXYZ:Ga,fromXYZ:Wa,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),r}const ae=uu();function Pn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ni(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let pi;class fu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{pi===void 0&&(pi=ur("canvas")),pi.width=t.width,pi.height=t.height;const n=pi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=pi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ur("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),i=s.data;for(let a=0;a<i.length;a++)i[a]=Pn(i[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pn(e[n]/255)*255):e[n]=Pn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let du=0;class Mc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=ui(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let i;if(Array.isArray(s)){i=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?i.push(Cr(s[a].image)):i.push(Cr(s[a]))}else i=Cr(s);n.url=i}return e||(t.images[this.uuid]=n),n}}function Cr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?fu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let pu=0;class Oe extends Gi{constructor(t=Oe.DEFAULT_IMAGE,e=Oe.DEFAULT_MAPPING,n=si,s=si,i=vn,a=ri,o=pn,l=In,h=Oe.DEFAULT_ANISOTROPY,u=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=ui(),this.name="",this.source=new Mc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=i,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case lr:t.x=t.x-Math.floor(t.x);break;case si:t.x=t.x<0?0:1;break;case Lo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case lr:t.y=t.y-Math.floor(t.y);break;case si:t.y=t.y<0?0:1;break;case Lo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=lc;Oe.DEFAULT_ANISOTROPY=1;class pe{constructor(t=0,e=0,n=0,s=1){pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,i=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*i,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*i,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*i,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*i,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,i;const l=t.elements,h=l[0],u=l[4],d=l[8],f=l[1],c=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+v)<.1&&Math.abs(p+m)<.1&&Math.abs(h+c+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(h+1)/2,x=(c+1)/2,S=(g+1)/2,_=(u+f)/4,y=(d+v)/4,A=(p+m)/4;return M>x&&M>S?M<.01?(n=0,s=.707106781,i=.707106781):(n=Math.sqrt(M),s=_/n,i=y/n):x>S?x<.01?(n=.707106781,s=0,i=.707106781):(s=Math.sqrt(x),n=_/s,i=A/s):S<.01?(n=.707106781,s=.707106781,i=0):(i=Math.sqrt(S),n=y/i,s=A/i),this.set(n,s,i,e),this}let T=Math.sqrt((m-p)*(m-p)+(d-v)*(d-v)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(m-p)/T,this.y=(d-v)/T,this.z=(f-u)/T,this.w=Math.acos((h+c+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mu extends Gi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const i=new Oe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);i.flipY=!1,i.generateMipmaps=n.generateMipmaps,i.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=i.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,i=this.textures.length;s<i;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Mc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class li extends mu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Sc extends Oe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class gu extends Oe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ps{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,i,a,o){let l=n[s+0],h=n[s+1],u=n[s+2],d=n[s+3];const f=i[a+0],c=i[a+1],p=i[a+2],v=i[a+3];if(o===0){t[e+0]=l,t[e+1]=h,t[e+2]=u,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=c,t[e+2]=p,t[e+3]=v;return}if(d!==v||l!==f||h!==c||u!==p){let m=1-o;const g=l*f+h*c+u*p+d*v,T=g>=0?1:-1,M=1-g*g;if(M>Number.EPSILON){const S=Math.sqrt(M),_=Math.atan2(S,g*T);m=Math.sin(m*_)/S,o=Math.sin(o*_)/S}const x=o*T;if(l=l*m+f*x,h=h*m+c*x,u=u*m+p*x,d=d*m+v*x,m===1-o){const S=1/Math.sqrt(l*l+h*h+u*u+d*d);l*=S,h*=S,u*=S,d*=S}}t[e]=l,t[e+1]=h,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,i,a){const o=n[s],l=n[s+1],h=n[s+2],u=n[s+3],d=i[a],f=i[a+1],c=i[a+2],p=i[a+3];return t[e]=o*p+u*d+l*c-h*f,t[e+1]=l*p+u*f+h*d-o*c,t[e+2]=h*p+u*c+o*f-l*d,t[e+3]=u*p-o*d-l*f-h*c,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,i=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(n/2),u=o(s/2),d=o(i/2),f=l(n/2),c=l(s/2),p=l(i/2);switch(a){case"XYZ":this._x=f*u*d+h*c*p,this._y=h*c*d-f*u*p,this._z=h*u*p+f*c*d,this._w=h*u*d-f*c*p;break;case"YXZ":this._x=f*u*d+h*c*p,this._y=h*c*d-f*u*p,this._z=h*u*p-f*c*d,this._w=h*u*d+f*c*p;break;case"ZXY":this._x=f*u*d-h*c*p,this._y=h*c*d+f*u*p,this._z=h*u*p+f*c*d,this._w=h*u*d-f*c*p;break;case"ZYX":this._x=f*u*d-h*c*p,this._y=h*c*d+f*u*p,this._z=h*u*p-f*c*d,this._w=h*u*d+f*c*p;break;case"YZX":this._x=f*u*d+h*c*p,this._y=h*c*d+f*u*p,this._z=h*u*p-f*c*d,this._w=h*u*d-f*c*p;break;case"XZY":this._x=f*u*d-h*c*p,this._y=h*c*d-f*u*p,this._z=h*u*p+f*c*d,this._w=h*u*d+f*c*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],i=e[8],a=e[1],o=e[5],l=e[9],h=e[2],u=e[6],d=e[10],f=n+o+d;if(f>0){const c=.5/Math.sqrt(f+1);this._w=.25/c,this._x=(u-l)*c,this._y=(i-h)*c,this._z=(a-s)*c}else if(n>o&&n>d){const c=2*Math.sqrt(1+n-o-d);this._w=(u-l)/c,this._x=.25*c,this._y=(s+a)/c,this._z=(i+h)/c}else if(o>d){const c=2*Math.sqrt(1+o-n-d);this._w=(i-h)/c,this._x=(s+a)/c,this._y=.25*c,this._z=(l+u)/c}else{const c=2*Math.sqrt(1+d-n-o);this._w=(a-s)/c,this._x=(i+h)/c,this._y=(l+u)/c,this._z=.25*c}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,i=t._z,a=t._w,o=e._x,l=e._y,h=e._z,u=e._w;return this._x=n*u+a*o+s*h-i*l,this._y=s*u+a*l+i*o-n*h,this._z=i*u+a*h+n*l-s*o,this._w=a*u-n*o-s*l-i*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,i=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+i*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=i,this;const l=1-o*o;if(l<=Number.EPSILON){const c=1-e;return this._w=c*a+e*this._w,this._x=c*n+e*this._x,this._y=c*s+e*this._y,this._z=c*i+e*this._z,this.normalize(),this}const h=Math.sqrt(l),u=Math.atan2(h,o),d=Math.sin((1-e)*u)/h,f=Math.sin(e*u)/h;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=i*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),i*Math.sin(e),i*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6]*s,this.y=i[1]*e+i[4]*n+i[7]*s,this.z=i[2]*e+i[5]*n+i[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,i=t.elements,a=1/(i[3]*e+i[7]*n+i[11]*s+i[15]);return this.x=(i[0]*e+i[4]*n+i[8]*s+i[12])*a,this.y=(i[1]*e+i[5]*n+i[9]*s+i[13])*a,this.z=(i[2]*e+i[6]*n+i[10]*s+i[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,i=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*s-o*n),u=2*(o*e-i*s),d=2*(i*n-a*e);return this.x=e+l*h+a*d-o*u,this.y=n+l*u+o*h-i*d,this.z=s+l*d+i*u-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,i=t.elements;return this.x=i[0]*e+i[4]*n+i[8]*s,this.y=i[1]*e+i[5]*n+i[9]*s,this.z=i[2]*e+i[6]*n+i[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,i=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-i*o,this.y=i*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Rr.copy(this).projectOnVector(t),this.sub(Rr)}reflect(t){return this.sub(Rr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rr=new P,Xa=new ps;class Xn{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const i=n.getAttribute("position");if(e===!0&&i!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=i.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,cn):cn.fromBufferAttribute(i,a),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ws.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ws.copy(n.boundingBox)),ws.applyMatrix4(t.matrixWorld),this.union(ws)}const s=t.children;for(let i=0,a=s.length;i<a;i++)this.expandByObject(s[i],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qi),Es.subVectors(this.max,qi),mi.subVectors(t.a,qi),gi.subVectors(t.b,qi),vi.subVectors(t.c,qi),Dn.subVectors(gi,mi),Un.subVectors(vi,gi),Zn.subVectors(mi,vi);let e=[0,-Dn.z,Dn.y,0,-Un.z,Un.y,0,-Zn.z,Zn.y,Dn.z,0,-Dn.x,Un.z,0,-Un.x,Zn.z,0,-Zn.x,-Dn.y,Dn.x,0,-Un.y,Un.x,0,-Zn.y,Zn.x,0];return!Pr(e,mi,gi,vi,Es)||(e=[1,0,0,0,1,0,0,0,1],!Pr(e,mi,gi,vi,Es))?!1:(Ts.crossVectors(Dn,Un),e=[Ts.x,Ts.y,Ts.z],Pr(e,mi,gi,vi,Es))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Sn=[new P,new P,new P,new P,new P,new P,new P,new P],cn=new P,ws=new Xn,mi=new P,gi=new P,vi=new P,Dn=new P,Un=new P,Zn=new P,qi=new P,Es=new P,Ts=new P,$n=new P;function Pr(r,t,e,n,s){for(let i=0,a=r.length-3;i<=a;i+=3){$n.fromArray(r,i);const o=s.x*Math.abs($n.x)+s.y*Math.abs($n.y)+s.z*Math.abs($n.z),l=t.dot($n),h=e.dot($n),u=n.dot($n);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>o)return!1}return!0}const vu=new Xn,Zi=new P,Lr=new P;class ms{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):vu.setFromPoints(t).getCenter(n);let s=0;for(let i=0,a=t.length;i<a;i++)s=Math.max(s,n.distanceToSquared(t[i]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zi.subVectors(t,this.center);const e=Zi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Zi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Lr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zi.copy(t.center).add(Lr)),this.expandByPoint(Zi.copy(t.center).sub(Lr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const wn=new P,Ir=new P,bs=new P,Nn=new P,Dr=new P,As=new P,Ur=new P;class wc{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(wn.copy(this.origin).addScaledVector(this.direction,e),wn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ir.copy(t).add(e).multiplyScalar(.5),bs.copy(e).sub(t).normalize(),Nn.copy(this.origin).sub(Ir);const i=t.distanceTo(e)*.5,a=-this.direction.dot(bs),o=Nn.dot(this.direction),l=-Nn.dot(bs),h=Nn.lengthSq(),u=Math.abs(1-a*a);let d,f,c,p;if(u>0)if(d=a*l-o,f=a*o-l,p=i*u,d>=0)if(f>=-p)if(f<=p){const v=1/u;d*=v,f*=v,c=d*(d+a*f+2*o)+f*(a*d+f+2*l)+h}else f=i,d=Math.max(0,-(a*f+o)),c=-d*d+f*(f+2*l)+h;else f=-i,d=Math.max(0,-(a*f+o)),c=-d*d+f*(f+2*l)+h;else f<=-p?(d=Math.max(0,-(-a*i+o)),f=d>0?-i:Math.min(Math.max(-i,-l),i),c=-d*d+f*(f+2*l)+h):f<=p?(d=0,f=Math.min(Math.max(-i,-l),i),c=f*(f+2*l)+h):(d=Math.max(0,-(a*i+o)),f=d>0?i:Math.min(Math.max(-i,-l),i),c=-d*d+f*(f+2*l)+h);else f=a>0?-i:i,d=Math.max(0,-(a*f+o)),c=-d*d+f*(f+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ir).addScaledVector(bs,f),c}intersectSphere(t,e){wn.subVectors(t.center,this.origin);const n=wn.dot(this.direction),s=wn.dot(wn)-n*n,i=t.radius*t.radius;if(s>i)return null;const a=Math.sqrt(i-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,i,a,o,l;const h=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return h>=0?(n=(t.min.x-f.x)*h,s=(t.max.x-f.x)*h):(n=(t.max.x-f.x)*h,s=(t.min.x-f.x)*h),u>=0?(i=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(i=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||i>s||((i>n||isNaN(n))&&(n=i),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,wn)!==null}intersectTriangle(t,e,n,s,i){Dr.subVectors(e,t),As.subVectors(n,t),Ur.crossVectors(Dr,As);let a=this.direction.dot(Ur),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Nn.subVectors(this.origin,t);const l=o*this.direction.dot(As.crossVectors(Nn,As));if(l<0)return null;const h=o*this.direction.dot(Dr.cross(Nn));if(h<0||l+h>a)return null;const u=-o*Nn.dot(Ur);return u<0?null:this.at(u/a,i)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ee{constructor(t,e,n,s,i,a,o,l,h,u,d,f,c,p,v,m){ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,i,a,o,l,h,u,d,f,c,p,v,m)}set(t,e,n,s,i,a,o,l,h,u,d,f,c,p,v,m){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=i,g[5]=a,g[9]=o,g[13]=l,g[2]=h,g[6]=u,g[10]=d,g[14]=f,g[3]=c,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ee().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/xi.setFromMatrixColumn(t,0).length(),i=1/xi.setFromMatrixColumn(t,1).length(),a=1/xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*i,e[5]=n[5]*i,e[6]=n[6]*i,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,i=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),h=Math.sin(s),u=Math.cos(i),d=Math.sin(i);if(t.order==="XYZ"){const f=a*u,c=a*d,p=o*u,v=o*d;e[0]=l*u,e[4]=-l*d,e[8]=h,e[1]=c+p*h,e[5]=f-v*h,e[9]=-o*l,e[2]=v-f*h,e[6]=p+c*h,e[10]=a*l}else if(t.order==="YXZ"){const f=l*u,c=l*d,p=h*u,v=h*d;e[0]=f+v*o,e[4]=p*o-c,e[8]=a*h,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=c*o-p,e[6]=v+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*u,c=l*d,p=h*u,v=h*d;e[0]=f-v*o,e[4]=-a*d,e[8]=p+c*o,e[1]=c+p*o,e[5]=a*u,e[9]=v-f*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*u,c=a*d,p=o*u,v=o*d;e[0]=l*u,e[4]=p*h-c,e[8]=f*h+v,e[1]=l*d,e[5]=v*h+f,e[9]=c*h-p,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,c=a*h,p=o*l,v=o*h;e[0]=l*u,e[4]=v-f*d,e[8]=p*d+c,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-h*u,e[6]=c*d+p,e[10]=f-v*d}else if(t.order==="XZY"){const f=a*l,c=a*h,p=o*l,v=o*h;e[0]=l*u,e[4]=-d,e[8]=h*u,e[1]=f*d+v,e[5]=a*u,e[9]=c*d-p,e[2]=p*d-c,e[6]=o*u,e[10]=v*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(xu,t,_u)}lookAt(t,e,n){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),Fn.crossVectors(n,qe),Fn.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),Fn.crossVectors(n,qe)),Fn.normalize(),Cs.crossVectors(qe,Fn),s[0]=Fn.x,s[4]=Cs.x,s[8]=qe.x,s[1]=Fn.y,s[5]=Cs.y,s[9]=qe.y,s[2]=Fn.z,s[6]=Cs.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,i=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],u=n[1],d=n[5],f=n[9],c=n[13],p=n[2],v=n[6],m=n[10],g=n[14],T=n[3],M=n[7],x=n[11],S=n[15],_=s[0],y=s[4],A=s[8],E=s[12],w=s[1],b=s[5],U=s[9],I=s[13],F=s[2],k=s[6],O=s[10],Z=s[14],G=s[3],it=s[7],rt=s[11],et=s[15];return i[0]=a*_+o*w+l*F+h*G,i[4]=a*y+o*b+l*k+h*it,i[8]=a*A+o*U+l*O+h*rt,i[12]=a*E+o*I+l*Z+h*et,i[1]=u*_+d*w+f*F+c*G,i[5]=u*y+d*b+f*k+c*it,i[9]=u*A+d*U+f*O+c*rt,i[13]=u*E+d*I+f*Z+c*et,i[2]=p*_+v*w+m*F+g*G,i[6]=p*y+v*b+m*k+g*it,i[10]=p*A+v*U+m*O+g*rt,i[14]=p*E+v*I+m*Z+g*et,i[3]=T*_+M*w+x*F+S*G,i[7]=T*y+M*b+x*k+S*it,i[11]=T*A+M*U+x*O+S*rt,i[15]=T*E+M*I+x*Z+S*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],i=t[12],a=t[1],o=t[5],l=t[9],h=t[13],u=t[2],d=t[6],f=t[10],c=t[14],p=t[3],v=t[7],m=t[11],g=t[15];return p*(+i*l*d-s*h*d-i*o*f+n*h*f+s*o*c-n*l*c)+v*(+e*l*c-e*h*f+i*a*f-s*a*c+s*h*u-i*l*u)+m*(+e*h*d-e*o*c-i*a*d+n*a*c+i*o*u-n*h*u)+g*(-s*o*u-e*l*d+e*o*f+s*a*d-n*a*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],i=t[3],a=t[4],o=t[5],l=t[6],h=t[7],u=t[8],d=t[9],f=t[10],c=t[11],p=t[12],v=t[13],m=t[14],g=t[15],T=d*m*h-v*f*h+v*l*c-o*m*c-d*l*g+o*f*g,M=p*f*h-u*m*h-p*l*c+a*m*c+u*l*g-a*f*g,x=u*v*h-p*d*h+p*o*c-a*v*c-u*o*g+a*d*g,S=p*d*l-u*v*l-p*o*f+a*v*f+u*o*m-a*d*m,_=e*T+n*M+s*x+i*S;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const y=1/_;return t[0]=T*y,t[1]=(v*f*i-d*m*i-v*s*c+n*m*c+d*s*g-n*f*g)*y,t[2]=(o*m*i-v*l*i+v*s*h-n*m*h-o*s*g+n*l*g)*y,t[3]=(d*l*i-o*f*i-d*s*h+n*f*h+o*s*c-n*l*c)*y,t[4]=M*y,t[5]=(u*m*i-p*f*i+p*s*c-e*m*c-u*s*g+e*f*g)*y,t[6]=(p*l*i-a*m*i-p*s*h+e*m*h+a*s*g-e*l*g)*y,t[7]=(a*f*i-u*l*i+u*s*h-e*f*h-a*s*c+e*l*c)*y,t[8]=x*y,t[9]=(p*d*i-u*v*i-p*n*c+e*v*c+u*n*g-e*d*g)*y,t[10]=(a*v*i-p*o*i+p*n*h-e*v*h-a*n*g+e*o*g)*y,t[11]=(u*o*i-a*d*i-u*n*h+e*d*h+a*n*c-e*o*c)*y,t[12]=S*y,t[13]=(u*v*s-p*d*s+p*n*f-e*v*f-u*n*m+e*d*m)*y,t[14]=(p*o*s-a*v*s-p*n*l+e*v*l+a*n*m-e*o*m)*y,t[15]=(a*d*s-u*o*s+u*n*l-e*d*l-a*n*f+e*o*f)*y,this}scale(t){const e=this.elements,n=t.x,s=t.y,i=t.z;return e[0]*=n,e[4]*=s,e[8]*=i,e[1]*=n,e[5]*=s,e[9]*=i,e[2]*=n,e[6]*=s,e[10]*=i,e[3]*=n,e[7]*=s,e[11]*=i,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),i=1-n,a=t.x,o=t.y,l=t.z,h=i*a,u=i*o;return this.set(h*a+n,h*o-s*l,h*l+s*o,0,h*o+s*l,u*o+n,u*l-s*a,0,h*l-s*o,u*l+s*a,i*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,i,a){return this.set(1,n,i,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,i=e._x,a=e._y,o=e._z,l=e._w,h=i+i,u=a+a,d=o+o,f=i*h,c=i*u,p=i*d,v=a*u,m=a*d,g=o*d,T=l*h,M=l*u,x=l*d,S=n.x,_=n.y,y=n.z;return s[0]=(1-(v+g))*S,s[1]=(c+x)*S,s[2]=(p-M)*S,s[3]=0,s[4]=(c-x)*_,s[5]=(1-(f+g))*_,s[6]=(m+T)*_,s[7]=0,s[8]=(p+M)*y,s[9]=(m-T)*y,s[10]=(1-(f+v))*y,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let i=xi.set(s[0],s[1],s[2]).length();const a=xi.set(s[4],s[5],s[6]).length(),o=xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(i=-i),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);const h=1/i,u=1/a,d=1/o;return hn.elements[0]*=h,hn.elements[1]*=h,hn.elements[2]*=h,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=d,hn.elements[9]*=d,hn.elements[10]*=d,e.setFromRotationMatrix(hn),n.x=i,n.y=a,n.z=o,this}makePerspective(t,e,n,s,i,a,o=Rn){const l=this.elements,h=2*i/(e-t),u=2*i/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let c,p;if(o===Rn)c=-(a+i)/(a-i),p=-2*a*i/(a-i);else if(o===hr)c=-a/(a-i),p=-a*i/(a-i);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=c,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,i,a,o=Rn){const l=this.elements,h=1/(e-t),u=1/(n-s),d=1/(a-i),f=(e+t)*h,c=(n+s)*u;let p,v;if(o===Rn)p=(a+i)*d,v=-2*d;else if(o===hr)p=i*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-c,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const xi=new P,hn=new ee,xu=new P(0,0,0),_u=new P(1,1,1),Fn=new P,Cs=new P,qe=new P,Ya=new ee,qa=new ps;class _n{constructor(t=0,e=0,n=0,s=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,i=s[0],a=s[4],o=s[8],l=s[1],h=s[5],u=s[9],d=s[2],f=s[6],c=s[10];switch(e){case"XYZ":this._y=Math.asin($t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,c),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,c),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,i),this._z=0);break;case"ZXY":this._x=Math.asin($t(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,c),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,i));break;case"ZYX":this._y=Math.asin(-$t(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,c),this._z=Math.atan2(l,i)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,i)):(this._x=0,this._y=Math.atan2(o,c));break;case"XZY":this._z=Math.asin(-$t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-u,c),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ya.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ya,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return qa.setFromEuler(this),this.setFromQuaternion(qa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class va{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let yu=0;const Za=new P,_i=new ps,En=new ee,Rs=new P,$i=new P,Mu=new P,Su=new ps,$a=new P(1,0,0),Ka=new P(0,1,0),Ja=new P(0,0,1),ja={type:"added"},wu={type:"removed"},yi={type:"childadded",child:null},Nr={type:"childremoved",child:null};class Ce extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new P,e=new _n,n=new ps,s=new P(1,1,1);function i(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(i),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ee},normalMatrix:{value:new Zt}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new va,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.multiply(_i),this}rotateOnWorldAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.premultiply(_i),this}rotateX(t){return this.rotateOnAxis($a,t)}rotateY(t){return this.rotateOnAxis(Ka,t)}rotateZ(t){return this.rotateOnAxis(Ja,t)}translateOnAxis(t,e){return Za.copy(t).applyQuaternion(this.quaternion),this.position.add(Za.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($a,t)}translateY(t){return this.translateOnAxis(Ka,t)}translateZ(t){return this.translateOnAxis(Ja,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Rs.copy(t):Rs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),$i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt($i,Rs,this.up):En.lookAt(Rs,$i,this.up),this.quaternion.setFromRotationMatrix(En),s&&(En.extractRotation(s.matrixWorld),_i.setFromRotationMatrix(En),this.quaternion.premultiply(_i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ja),yi.child=t,this.dispatchEvent(yi),yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wu),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),En.multiply(t.parent.matrixWorld)),t.applyMatrix4(En),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ja),yi.child=t,this.dispatchEvent(yi),yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let i=0,a=s.length;i<a;i++)s[i].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,t,Mu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,Su,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let i=0,a=s.length;i<a;i++)s[i].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function i(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=i(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){const d=l[h];i(t.shapes,d)}else i(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(i(t.materials,this.material[l]));s.material=o}else s.material=i(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(i(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),u=a(t.images),d=a(t.shapes),f=a(t.skeletons),c=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),c.length>0&&(n.animations=c),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){const l=[];for(const h in o){const u=o[h];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ce.DEFAULT_UP=new P(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new P,Tn=new P,Fr=new P,bn=new P,Mi=new P,Si=new P,Qa=new P,Or=new P,Br=new P,zr=new P,kr=new pe,Vr=new pe,Hr=new pe;class rn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),un.subVectors(t,e),s.cross(un);const i=s.lengthSq();return i>0?s.multiplyScalar(1/Math.sqrt(i)):s.set(0,0,0)}static getBarycoord(t,e,n,s,i){un.subVectors(s,e),Tn.subVectors(n,e),Fr.subVectors(t,e);const a=un.dot(un),o=un.dot(Tn),l=un.dot(Fr),h=Tn.dot(Tn),u=Tn.dot(Fr),d=a*h-o*o;if(d===0)return i.set(0,0,0),null;const f=1/d,c=(h*l-o*u)*f,p=(a*u-o*l)*f;return i.set(1-c-p,p,c)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(t,e,n,s,i,a,o,l){return this.getBarycoord(t,e,n,s,bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(i,bn.x),l.addScaledVector(a,bn.y),l.addScaledVector(o,bn.z),l)}static getInterpolatedAttribute(t,e,n,s,i,a){return kr.setScalar(0),Vr.setScalar(0),Hr.setScalar(0),kr.fromBufferAttribute(t,e),Vr.fromBufferAttribute(t,n),Hr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(kr,i.x),a.addScaledVector(Vr,i.y),a.addScaledVector(Hr,i.z),a}static isFrontFacing(t,e,n,s){return un.subVectors(n,e),Tn.subVectors(t,e),un.cross(Tn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),un.cross(Tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,i){return rn.getInterpolation(t,this.a,this.b,this.c,e,n,s,i)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,i=this.c;let a,o;Mi.subVectors(s,n),Si.subVectors(i,n),Or.subVectors(t,n);const l=Mi.dot(Or),h=Si.dot(Or);if(l<=0&&h<=0)return e.copy(n);Br.subVectors(t,s);const u=Mi.dot(Br),d=Si.dot(Br);if(u>=0&&d<=u)return e.copy(s);const f=l*d-u*h;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(Mi,a);zr.subVectors(t,i);const c=Mi.dot(zr),p=Si.dot(zr);if(p>=0&&c<=p)return e.copy(i);const v=c*h-l*p;if(v<=0&&h>=0&&p<=0)return o=h/(h-p),e.copy(n).addScaledVector(Si,o);const m=u*p-c*d;if(m<=0&&d-u>=0&&c-p>=0)return Qa.subVectors(i,s),o=(d-u)/(d-u+(c-p)),e.copy(s).addScaledVector(Qa,o);const g=1/(m+v+f);return a=v*g,o=f*g,e.copy(n).addScaledVector(Mi,a).addScaledVector(Si,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ec={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},Ps={h:0,s:0,l:0};function Gr(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class jt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ae.workingColorSpace){if(t=ga(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const i=n<=.5?n*(1+e):n+e-n*e,a=2*n-i;this.r=Gr(a,i,t+1/3),this.g=Gr(a,i,t),this.b=Gr(a,i,t-1/3)}return ae.toWorkingColorSpace(this,s),this}setStyle(t,e=Ie){function n(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let i;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,e);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,e);break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const i=s[1],a=i.length;if(a===3)return this.setRGB(parseInt(i.charAt(0),16)/15,parseInt(i.charAt(1),16)/15,parseInt(i.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(i,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){const n=Ec[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pn(t.r),this.g=Pn(t.g),this.b=Pn(t.b),this}copyLinearToSRGB(t){return this.r=Ni(t.r),this.g=Ni(t.g),this.b=Ni(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return ae.fromWorkingColorSpace(Ne.copy(this),t),Math.round($t(Ne.r*255,0,255))*65536+Math.round($t(Ne.g*255,0,255))*256+Math.round($t(Ne.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(Ne.copy(this),e);const n=Ne.r,s=Ne.g,i=Ne.b,a=Math.max(n,s,i),o=Math.min(n,s,i);let l,h;const u=(o+a)/2;if(o===a)l=0,h=0;else{const d=a-o;switch(h=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-i)/d+(s<i?6:0);break;case s:l=(i-n)/d+2;break;case i:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=h,t.l=u,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=Ie){ae.fromWorkingColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,s=Ne.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(On),this.setHSL(On.h+t,On.s+e,On.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(On),t.getHSL(Ps);const n=ss(On.h,Ps.h,e),s=ss(On.s,Ps.s,e),i=ss(On.l,Ps.l,e);return this.setHSL(n,s,i),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,i=t.elements;return this.r=i[0]*e+i[3]*n+i[6]*s,this.g=i[1]*e+i[4]*n+i[7]*s,this.b=i[2]*e+i[5]*n+i[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new jt;jt.NAMES=Ec;let Eu=0;class gs extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=Di,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yo,this.blendDst=Mo,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Fi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ba,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yo&&(n.blendSrc=this.blendSrc),this.blendDst!==Mo&&(n.blendDst=this.blendDst),this.blendEquation!==ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ba&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(i){const a=[];for(const o in i){const l=i[o];delete l.metadata,a.push(l)}return a}if(e){const i=s(t.textures),a=s(t.images);i.length>0&&(n.textures=i),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let i=0;i!==s;++i)n[i]=e[i].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Xe extends gs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=oc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new P,Ls=new ot;class mn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=za,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,i=this.itemSize;s<i;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ls.fromBufferAttribute(this,e),Ls.applyMatrix3(t),this.setXY(e,Ls.x,Ls.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ri(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ke(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ri(e,this.array)),e}setX(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ri(e,this.array)),e}setY(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ri(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ri(e,this.array)),e}setW(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array),s=ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,i){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array),s=ke(s,this.array),i=ke(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=i,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==za&&(t.usage=this.usage),t}}class Tc extends mn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class bc extends mn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class le extends mn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Tu=0;const nn=new ee,Wr=new Ce,wi=new P,Ze=new Xn,Ki=new Xn,be=new P;class Be extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yc(t)?bc:Tc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const i=new Zt().getNormalMatrix(t);n.applyNormalMatrix(i),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,n){return nn.makeTranslation(t,e,n),this.applyMatrix4(nn),this}scale(t,e,n){return nn.makeScale(t,e,n),this.applyMatrix4(nn),this}lookAt(t){return Wr.lookAt(t),Wr.updateMatrix(),this.applyMatrix4(Wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,i=t.length;s<i;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new le(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const i=t[s];e.setXYZ(s,i.x,i.y,i.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const i=e[n];Ze.setFromBufferAttribute(i),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ms);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let i=0,a=e.length;i<a;i++){const o=e[i];Ki.setFromBufferAttribute(o),this.morphTargetsRelative?(be.addVectors(Ze.min,Ki.min),Ze.expandByPoint(be),be.addVectors(Ze.max,Ki.max),Ze.expandByPoint(be)):(Ze.expandByPoint(Ki.min),Ze.expandByPoint(Ki.max))}Ze.getCenter(n);let s=0;for(let i=0,a=t.count;i<a;i++)be.fromBufferAttribute(t,i),s=Math.max(s,n.distanceToSquared(be));if(e)for(let i=0,a=e.length;i<a;i++){const o=e[i],l=this.morphTargetsRelative;for(let h=0,u=o.count;h<u;h++)be.fromBufferAttribute(o,h),l&&(wi.fromBufferAttribute(t,h),be.add(wi)),s=Math.max(s,n.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,i=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<n.count;A++)o[A]=new P,l[A]=new P;const h=new P,u=new P,d=new P,f=new ot,c=new ot,p=new ot,v=new P,m=new P;function g(A,E,w){h.fromBufferAttribute(n,A),u.fromBufferAttribute(n,E),d.fromBufferAttribute(n,w),f.fromBufferAttribute(i,A),c.fromBufferAttribute(i,E),p.fromBufferAttribute(i,w),u.sub(h),d.sub(h),c.sub(f),p.sub(f);const b=1/(c.x*p.y-p.x*c.y);isFinite(b)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(d,-c.y).multiplyScalar(b),m.copy(d).multiplyScalar(c.x).addScaledVector(u,-p.x).multiplyScalar(b),o[A].add(v),o[E].add(v),o[w].add(v),l[A].add(m),l[E].add(m),l[w].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let A=0,E=T.length;A<E;++A){const w=T[A],b=w.start,U=w.count;for(let I=b,F=b+U;I<F;I+=3)g(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const M=new P,x=new P,S=new P,_=new P;function y(A){S.fromBufferAttribute(s,A),_.copy(S);const E=o[A];M.copy(E),M.sub(S.multiplyScalar(S.dot(E))).normalize(),x.crossVectors(_,E);const b=x.dot(l[A])<0?-1:1;a.setXYZW(A,M.x,M.y,M.z,b)}for(let A=0,E=T.length;A<E;++A){const w=T[A],b=w.start,U=w.count;for(let I=b,F=b+U;I<F;I+=3)y(t.getX(I+0)),y(t.getX(I+1)),y(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new mn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,c=n.count;f<c;f++)n.setXYZ(f,0,0,0);const s=new P,i=new P,a=new P,o=new P,l=new P,h=new P,u=new P,d=new P;if(t)for(let f=0,c=t.count;f<c;f+=3){const p=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,p),i.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),u.subVectors(a,i),d.subVectors(s,i),u.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,m),o.add(u),l.add(u),h.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,c=e.count;f<c;f+=3)s.fromBufferAttribute(e,f+0),i.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,i),d.subVectors(s,i),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,l){const h=o.array,u=o.itemSize,d=o.normalized,f=new h.constructor(l.length*u);let c=0,p=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?c=l[v]*o.data.stride+o.offset:c=l[v]*u;for(let g=0;g<u;g++)f[p++]=h[c++]}return new mn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Be,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],h=t(l,n);e.setAttribute(o,h)}const i=this.morphAttributes;for(const o in i){const l=[],h=i[o];for(let u=0,d=h.length;u<d;u++){const f=h[u],c=t(f,n);l.push(c)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const s={};let i=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],u=[];for(let d=0,f=h.length;d<f;d++){const c=h[d];u.push(c.toJSON(t.data))}u.length>0&&(s[l]=u,i=!0)}i&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const h in s){const u=s[h];this.setAttribute(h,u.clone(e))}const i=t.morphAttributes;for(const h in i){const u=[],d=i[h];for(let f=0,c=d.length;f<c;f++)u.push(d[f].clone(e));this.morphAttributes[h]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,u=a.length;h<u;h++){const d=a[h];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tl=new ee,Kn=new wc,Is=new ms,el=new P,Ds=new P,Us=new P,Ns=new P,Xr=new P,Fs=new P,nl=new P,Os=new P;class Ft extends Ce{constructor(t=new Be,e=new Xe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,a=s.length;i<a;i++){const o=s[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=i}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(i&&o){Fs.set(0,0,0);for(let l=0,h=i.length;l<h;l++){const u=o[l],d=i[l];u!==0&&(Xr.fromBufferAttribute(d,t),a?Fs.addScaledVector(Xr,u):Fs.addScaledVector(Xr.sub(e),u))}e.add(Fs)}return e}raycast(t,e){const n=this.geometry,s=this.material,i=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Is.copy(n.boundingSphere),Is.applyMatrix4(i),Kn.copy(t.ray).recast(t.near),!(Is.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(Is,el)===null||Kn.origin.distanceToSquared(el)>(t.far-t.near)**2))&&(tl.copy(i).invert(),Kn.copy(t.ray).applyMatrix4(tl),!(n.boundingBox!==null&&Kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Kn)))}_computeIntersections(t,e,n){let s;const i=this.geometry,a=this.material,o=i.index,l=i.attributes.position,h=i.attributes.uv,u=i.attributes.uv1,d=i.attributes.normal,f=i.groups,c=i.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=a[m.materialIndex],T=Math.max(m.start,c.start),M=Math.min(o.count,Math.min(m.start+m.count,c.start+c.count));for(let x=T,S=M;x<S;x+=3){const _=o.getX(x),y=o.getX(x+1),A=o.getX(x+2);s=Bs(this,g,t,n,h,u,d,_,y,A),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,c.start),v=Math.min(o.count,c.start+c.count);for(let m=p,g=v;m<g;m+=3){const T=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);s=Bs(this,a,t,n,h,u,d,T,M,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=a[m.materialIndex],T=Math.max(m.start,c.start),M=Math.min(l.count,Math.min(m.start+m.count,c.start+c.count));for(let x=T,S=M;x<S;x+=3){const _=x,y=x+1,A=x+2;s=Bs(this,g,t,n,h,u,d,_,y,A),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,c.start),v=Math.min(l.count,c.start+c.count);for(let m=p,g=v;m<g;m+=3){const T=m,M=m+1,x=m+2;s=Bs(this,a,t,n,h,u,d,T,M,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function bu(r,t,e,n,s,i,a,o){let l;if(t.side===Ge?l=n.intersectTriangle(a,i,s,!0,o):l=n.intersectTriangle(s,i,a,t.side===Gn,o),l===null)return null;Os.copy(o),Os.applyMatrix4(r.matrixWorld);const h=e.ray.origin.distanceTo(Os);return h<e.near||h>e.far?null:{distance:h,point:Os.clone(),object:r}}function Bs(r,t,e,n,s,i,a,o,l,h){r.getVertexPosition(o,Ds),r.getVertexPosition(l,Us),r.getVertexPosition(h,Ns);const u=bu(r,t,e,n,Ds,Us,Ns,nl);if(u){const d=new P;rn.getBarycoord(nl,Ds,Us,Ns,d),s&&(u.uv=rn.getInterpolatedAttribute(s,o,l,h,d,new ot)),i&&(u.uv1=rn.getInterpolatedAttribute(i,o,l,h,d,new ot)),a&&(u.normal=rn.getInterpolatedAttribute(a,o,l,h,d,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c:h,normal:new P,materialIndex:0};rn.getNormal(Ds,Us,Ns,f.normal),u.face=f,u.barycoord=d}return u}class on extends Be{constructor(t=1,e=1,n=1,s=1,i=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:i,depthSegments:a};const o=this;s=Math.floor(s),i=Math.floor(i),a=Math.floor(a);const l=[],h=[],u=[],d=[];let f=0,c=0;p("z","y","x",-1,-1,n,e,t,a,i,0),p("z","y","x",1,-1,n,e,-t,a,i,1),p("x","z","y",1,1,t,n,e,s,a,2),p("x","z","y",1,-1,t,n,-e,s,a,3),p("x","y","z",1,-1,t,e,n,s,i,4),p("x","y","z",-1,-1,t,e,-n,s,i,5),this.setIndex(l),this.setAttribute("position",new le(h,3)),this.setAttribute("normal",new le(u,3)),this.setAttribute("uv",new le(d,2));function p(v,m,g,T,M,x,S,_,y,A,E){const w=x/y,b=S/A,U=x/2,I=S/2,F=_/2,k=y+1,O=A+1;let Z=0,G=0;const it=new P;for(let rt=0;rt<O;rt++){const et=rt*b-I;for(let Mt=0;Mt<k;Mt++){const Dt=Mt*w-U;it[v]=Dt*T,it[m]=et*M,it[g]=F,h.push(it.x,it.y,it.z),it[v]=0,it[m]=0,it[g]=_>0?1:-1,u.push(it.x,it.y,it.z),d.push(Mt/y),d.push(1-rt/A),Z+=1}}for(let rt=0;rt<A;rt++)for(let et=0;et<y;et++){const Mt=f+et+k*rt,Dt=f+et+k*(rt+1),N=f+(et+1)+k*(rt+1),X=f+(et+1)+k*rt;l.push(Mt,Dt,X),l.push(Dt,N,X),G+=6}o.addGroup(c,G,E),c+=G,f+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new on(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Hi(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const s=r[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ve(r){const t={};for(let e=0;e<r.length;e++){const n=Hi(r[e]);for(const s in n)t[s]=n[s]}return t}function Au(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Ac(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const Cu={clone:Hi,merge:Ve};var Ru=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends gs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ru,this.fragmentShader=Pu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=Au(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Cc extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=Rn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new P,il=new ot,sl=new ot;class $e extends Cc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=cs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(is*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return cs*2*Math.atan(Math.tan(is*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-t/Bn.z)}getViewSize(t,e){return this.getViewBounds(t,il,sl),e.subVectors(sl,il)}setViewOffset(t,e,n,s,i,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(is*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,i=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;i+=a.offsetX*s/l,e-=a.offsetY*n/h,s*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(i+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ei=-90,Ti=1;class Lu extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new $e(Ei,Ti,t,e);s.layers=this.layers,this.add(s);const i=new $e(Ei,Ti,t,e);i.layers=this.layers,this.add(i);const a=new $e(Ei,Ti,t,e);a.layers=this.layers,this.add(a);const o=new $e(Ei,Ti,t,e);o.layers=this.layers,this.add(o);const l=new $e(Ei,Ti,t,e);l.layers=this.layers,this.add(l);const h=new $e(Ei,Ti,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,i,a,o,l]=e;for(const h of e)this.remove(h);if(t===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[i,a,o,l,h,u]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),c=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,i),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,h),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(d,f,c),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Rc extends Oe{constructor(t,e,n,s,i,a,o,l,h,u){t=t!==void 0?t:[],e=e!==void 0?e:Oi,super(t,e,n,s,i,a,o,l,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Iu extends li{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Rc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:vn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new on(5,5,5),i=new Wn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:Vn});i.uniforms.tEquirect.value=e;const a=new Ft(s,i),o=e.minFilter;return e.minFilter===ri&&(e.minFilter=vn),new Lu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const i=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(i)}}class xa{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new jt(t),this.density=e}clone(){return new xa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Pc extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Du extends Oe{constructor(t=null,e=1,n=1,s,i,a,o,l,h=Ke,u=Ke,d,f){super(null,a,o,l,h,u,s,i,d,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rl extends mn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const bi=new ee,ol=new ee,zs=[],al=new Xn,Uu=new ee,Ji=new Ft,ji=new ms;class Nu extends Ft{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new rl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Uu)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Xn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bi),al.copy(t.boundingBox).applyMatrix4(bi),this.boundingBox.union(al)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ms),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bi),ji.copy(t.boundingSphere).applyMatrix4(bi),this.boundingSphere.union(ji)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,i=n.length+1,a=t*i+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ji.geometry=this.geometry,Ji.material=this.material,Ji.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ji.copy(this.boundingSphere),ji.applyMatrix4(n),t.ray.intersectsSphere(ji)!==!1))for(let i=0;i<s;i++){this.getMatrixAt(i,bi),ol.multiplyMatrices(n,bi),Ji.matrixWorld=ol,Ji.raycast(t,zs);for(let a=0,o=zs.length;a<o;a++){const l=zs[a];l.instanceId=i,l.object=this,e.push(l)}zs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new rl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Du(new Float32Array(s*this.count),s,this.count,fa,xn));const i=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;i[l]=o,i.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Yr=new P,Fu=new P,Ou=new Zt;class dn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Yr.subVectors(n,e).cross(Fu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Yr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const i=-(t.start.dot(this.normal)+this.constant)/s;return i<0||i>1?null:e.copy(t.start).addScaledVector(n,i)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ou.getNormalMatrix(t),s=this.coplanarPoint(Yr).applyMatrix4(t),i=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(i),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new ms,ks=new P;class _a{constructor(t=new dn,e=new dn,n=new dn,s=new dn,i=new dn,a=new dn){this.planes=[t,e,n,s,i,a]}set(t,e,n,s,i,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(i),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Rn){const n=this.planes,s=t.elements,i=s[0],a=s[1],o=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],c=s[8],p=s[9],v=s[10],m=s[11],g=s[12],T=s[13],M=s[14],x=s[15];if(n[0].setComponents(l-i,f-h,m-c,x-g).normalize(),n[1].setComponents(l+i,f+h,m+c,x+g).normalize(),n[2].setComponents(l+a,f+u,m+p,x+T).normalize(),n[3].setComponents(l-a,f-u,m-p,x-T).normalize(),n[4].setComponents(l-o,f-d,m-v,x-M).normalize(),e===Rn)n[5].setComponents(l+o,f+d,m+v,x+M).normalize();else if(e===hr)n[5].setComponents(o,d,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(t){return Jn.center.set(0,0,0),Jn.radius=.7071067811865476,Jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let i=0;i<6;i++)if(e[i].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ks.x=s.normal.x>0?t.max.x:t.min.x,ks.y=s.normal.y>0?t.max.y:t.min.y,ks.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ks)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fe extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}class gr extends Oe{constructor(t,e,n,s,i,a,o,l,h){super(t,e,n,s,i,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Lc extends Oe{constructor(t,e,n,s,i,a,o,l,h,u=Ui){if(u!==Ui&&u!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ui&&(n=ai),n===void 0&&u===ki&&(n=zi),super(null,s,i,a,o,l,u,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ke,this.minFilter=l!==void 0?l:Ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class yn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),i=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),i+=n.distanceTo(s),e.push(i),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const i=n.length;let a;e?a=e:a=t*n[i-1];let o=0,l=i-1,h;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),h=n[s]-a,h<0)o=s+1;else if(h>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(i-1);const u=n[s],f=n[s+1]-u,c=(a-u)/f;return(s+c)/(i-1)}getTangent(t,e){let s=t-1e-4,i=t+1e-4;s<0&&(s=0),i>1&&(i=1);const a=this.getPoint(s),o=this.getPoint(i),l=e||(a.isVector2?new ot:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,s=[],i=[],a=[],o=new P,l=new ee;for(let c=0;c<=t;c++){const p=c/t;s[c]=this.getTangentAt(p,new P)}i[0]=new P,a[0]=new P;let h=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=h&&(h=u,n.set(1,0,0)),d<=h&&(h=d,n.set(0,1,0)),f<=h&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),i[0].crossVectors(s[0],o),a[0].crossVectors(s[0],i[0]);for(let c=1;c<=t;c++){if(i[c]=i[c-1].clone(),a[c]=a[c-1].clone(),o.crossVectors(s[c-1],s[c]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos($t(s[c-1].dot(s[c]),-1,1));i[c].applyMatrix4(l.makeRotationAxis(o,p))}a[c].crossVectors(s[c],i[c])}if(e===!0){let c=Math.acos($t(i[0].dot(i[t]),-1,1));c/=t,s[0].dot(o.crossVectors(i[0],i[t]))>0&&(c=-c);for(let p=1;p<=t;p++)i[p].applyMatrix4(l.makeRotationAxis(s[p],c*p)),a[p].crossVectors(s[p],i[p])}return{tangents:s,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ya extends yn{constructor(t=0,e=0,n=1,s=1,i=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ot){const n=e,s=Math.PI*2;let i=this.aEndAngle-this.aStartAngle;const a=Math.abs(i)<Number.EPSILON;for(;i<0;)i+=s;for(;i>s;)i-=s;i<Number.EPSILON&&(a?i=0:i=s),this.aClockwise===!0&&!a&&(i===s?i=-s:i=i-s);const o=this.aStartAngle+t*i;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,c=h-this.aY;l=f*u-c*d+this.aX,h=f*d+c*u+this.aY}return n.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Bu extends ya{constructor(t,e,n,s,i,a){super(t,e,n,n,s,i,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ma(){let r=0,t=0,e=0,n=0;function s(i,a,o,l){r=i,t=o,e=-3*i+3*a-2*o-l,n=2*i-2*a+o+l}return{initCatmullRom:function(i,a,o,l,h){s(a,o,h*(o-i),h*(l-a))},initNonuniformCatmullRom:function(i,a,o,l,h,u,d){let f=(a-i)/h-(o-i)/(h+u)+(o-a)/u,c=(o-a)/u-(l-a)/(u+d)+(l-o)/d;f*=u,c*=u,s(a,o,f,c)},calc:function(i){const a=i*i,o=a*i;return r+t*i+e*a+n*o}}}const Vs=new P,qr=new Ma,Zr=new Ma,$r=new Ma;class Sa extends yn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){const n=e,s=this.points,i=s.length,a=(i-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:l===0&&o===i-1&&(o=i-2,l=1);let h,u;this.closed||o>0?h=s[(o-1)%i]:(Vs.subVectors(s[0],s[1]).add(s[0]),h=Vs);const d=s[o%i],f=s[(o+1)%i];if(this.closed||o+2<i?u=s[(o+2)%i]:(Vs.subVectors(s[i-1],s[i-2]).add(s[i-1]),u=Vs),this.curveType==="centripetal"||this.curveType==="chordal"){const c=this.curveType==="chordal"?.5:.25;let p=Math.pow(h.distanceToSquared(d),c),v=Math.pow(d.distanceToSquared(f),c),m=Math.pow(f.distanceToSquared(u),c);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),qr.initNonuniformCatmullRom(h.x,d.x,f.x,u.x,p,v,m),Zr.initNonuniformCatmullRom(h.y,d.y,f.y,u.y,p,v,m),$r.initNonuniformCatmullRom(h.z,d.z,f.z,u.z,p,v,m)}else this.curveType==="catmullrom"&&(qr.initCatmullRom(h.x,d.x,f.x,u.x,this.tension),Zr.initCatmullRom(h.y,d.y,f.y,u.y,this.tension),$r.initCatmullRom(h.z,d.z,f.z,u.z,this.tension));return n.set(qr.calc(l),Zr.calc(l),$r.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ll(r,t,e,n,s){const i=(n-t)*.5,a=(s-e)*.5,o=r*r,l=r*o;return(2*e-2*n+i+a)*l+(-3*e+3*n-2*i-a)*o+i*r+e}function zu(r,t){const e=1-r;return e*e*t}function ku(r,t){return 2*(1-r)*r*t}function Vu(r,t){return r*r*t}function rs(r,t,e,n){return zu(r,t)+ku(r,e)+Vu(r,n)}function Hu(r,t){const e=1-r;return e*e*e*t}function Gu(r,t){const e=1-r;return 3*e*e*r*t}function Wu(r,t){return 3*(1-r)*r*r*t}function Xu(r,t){return r*r*r*t}function os(r,t,e,n,s){return Hu(r,t)+Gu(r,e)+Wu(r,n)+Xu(r,s)}class Ic extends yn{constructor(t=new ot,e=new ot,n=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ot){const n=e,s=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(os(t,s.x,i.x,a.x,o.x),os(t,s.y,i.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yu extends yn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){const n=e,s=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(os(t,s.x,i.x,a.x,o.x),os(t,s.y,i.y,a.y,o.y),os(t,s.z,i.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Dc extends yn{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qu extends yn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uc extends yn{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){const n=e,s=this.v0,i=this.v1,a=this.v2;return n.set(rs(t,s.x,i.x,a.x),rs(t,s.y,i.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nc extends yn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,s=this.v0,i=this.v1,a=this.v2;return n.set(rs(t,s.x,i.x,a.x),rs(t,s.y,i.y,a.y),rs(t,s.z,i.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fc extends yn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const n=e,s=this.points,i=(s.length-1)*t,a=Math.floor(i),o=i-a,l=s[a===0?a:a-1],h=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(ll(o,l.x,h.x,u.x,d.x),ll(o,l.y,h.y,u.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var fr=Object.freeze({__proto__:null,ArcCurve:Bu,CatmullRomCurve3:Sa,CubicBezierCurve:Ic,CubicBezierCurve3:Yu,EllipseCurve:ya,LineCurve:Dc,LineCurve3:qu,QuadraticBezierCurve:Uc,QuadraticBezierCurve3:Nc,SplineCurve:Fc});class Zu extends yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let i=0;for(;i<s.length;){if(s[i]>=n){const a=s[i]-n,o=this.curves[i],l=o.getLength(),h=l===0?0:1-a/l;return o.getPointAt(h,e)}i++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,i=this.curves;s<i.length;s++){const a=i[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let h=0;h<l.length;h++){const u=l[h];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new fr[s.type]().fromJSON(s))}return this}}class cl extends Zu{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Dc(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const i=new Uc(this.currentPoint.clone(),new ot(t,e),new ot(n,s));return this.curves.push(i),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,i,a){const o=new Ic(this.currentPoint.clone(),new ot(t,e),new ot(n,s),new ot(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Fc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,i,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,i,a),this}absarc(t,e,n,s,i,a){return this.absellipse(t,e,n,n,s,i,a),this}ellipse(t,e,n,s,i,a,o,l){const h=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+h,e+u,n,s,i,a,o,l),this}absellipse(t,e,n,s,i,a,o,l){const h=new ya(t,e,n,s,i,a,o,l);if(this.curves.length>0){const d=h.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(h);const u=h.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class wa extends Be{constructor(t=[new ot(0,-.5),new ot(.5,0),new ot(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=$t(s,0,Math.PI*2);const i=[],a=[],o=[],l=[],h=[],u=1/e,d=new P,f=new ot,c=new P,p=new P,v=new P;let m=0,g=0;for(let T=0;T<=t.length-1;T++)switch(T){case 0:m=t[T+1].x-t[T].x,g=t[T+1].y-t[T].y,c.x=g*1,c.y=-m,c.z=g*0,v.copy(c),c.normalize(),l.push(c.x,c.y,c.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[T+1].x-t[T].x,g=t[T+1].y-t[T].y,c.x=g*1,c.y=-m,c.z=g*0,p.copy(c),c.x+=v.x,c.y+=v.y,c.z+=v.z,c.normalize(),l.push(c.x,c.y,c.z),v.copy(p)}for(let T=0;T<=e;T++){const M=n+T*u*s,x=Math.sin(M),S=Math.cos(M);for(let _=0;_<=t.length-1;_++){d.x=t[_].x*x,d.y=t[_].y,d.z=t[_].x*S,a.push(d.x,d.y,d.z),f.x=T/e,f.y=_/(t.length-1),o.push(f.x,f.y);const y=l[3*_+0]*x,A=l[3*_+1],E=l[3*_+0]*S;h.push(y,A,E)}}for(let T=0;T<e;T++)for(let M=0;M<t.length-1;M++){const x=M+T*t.length,S=x,_=x+t.length,y=x+t.length+1,A=x+1;i.push(S,_,A),i.push(y,A,_)}this.setIndex(i),this.setAttribute("position",new le(a,3)),this.setAttribute("uv",new le(o,2)),this.setAttribute("normal",new le(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wa(t.points,t.segments,t.phiStart,t.phiLength)}}class kn extends Be{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const i=[],a=[],o=[],l=[],h=new P,u=new ot;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){const c=n+d/e*s;h.x=t*Math.cos(c),h.y=t*Math.sin(c),a.push(h.x,h.y,h.z),o.push(0,0,1),u.x=(a[f]/t+1)/2,u.y=(a[f+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)i.push(d,d+1,0);this.setIndex(i),this.setAttribute("position",new le(a,3)),this.setAttribute("normal",new le(o,3)),this.setAttribute("uv",new le(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kn(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ne extends Be{constructor(t=1,e=1,n=1,s=32,i=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:l};const h=this;s=Math.floor(s),i=Math.floor(i);const u=[],d=[],f=[],c=[];let p=0;const v=[],m=n/2;let g=0;T(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new le(d,3)),this.setAttribute("normal",new le(f,3)),this.setAttribute("uv",new le(c,2));function T(){const x=new P,S=new P;let _=0;const y=(e-t)/n;for(let A=0;A<=i;A++){const E=[],w=A/i,b=w*(e-t)+t;for(let U=0;U<=s;U++){const I=U/s,F=I*l+o,k=Math.sin(F),O=Math.cos(F);S.x=b*k,S.y=-w*n+m,S.z=b*O,d.push(S.x,S.y,S.z),x.set(k,y,O).normalize(),f.push(x.x,x.y,x.z),c.push(I,1-w),E.push(p++)}v.push(E)}for(let A=0;A<s;A++)for(let E=0;E<i;E++){const w=v[E][A],b=v[E+1][A],U=v[E+1][A+1],I=v[E][A+1];(t>0||E!==0)&&(u.push(w,b,I),_+=3),(e>0||E!==i-1)&&(u.push(b,U,I),_+=3)}h.addGroup(g,_,0),g+=_}function M(x){const S=p,_=new ot,y=new P;let A=0;const E=x===!0?t:e,w=x===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,m*w,0),f.push(0,w,0),c.push(.5,.5),p++;const b=p;for(let U=0;U<=s;U++){const F=U/s*l+o,k=Math.cos(F),O=Math.sin(F);y.x=E*O,y.y=m*w,y.z=E*k,d.push(y.x,y.y,y.z),f.push(0,w,0),_.x=k*.5+.5,_.y=O*.5*w+.5,c.push(_.x,_.y),p++}for(let U=0;U<s;U++){const I=S+U,F=b+U;x===!0?u.push(F,F+1,I):u.push(F+1,F,I),A+=3}h.addGroup(g,A,x===!0?1:2),g+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ne(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class vr extends ne{constructor(t=1,e=1,n=32,s=1,i=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,i,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new vr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class vs extends cl{constructor(t){super(t),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new cl().fromJSON(s))}return this}}const $u={triangulate:function(r,t,e=2){const n=t&&t.length,s=n?t[0]*e:r.length;let i=Oc(r,0,s,e,!0);const a=[];if(!i||i.next===i.prev)return a;let o,l,h,u,d,f,c;if(n&&(i=tf(r,t,i,e)),r.length>80*e){o=h=r[0],l=u=r[1];for(let p=e;p<s;p+=e)d=r[p],f=r[p+1],d<o&&(o=d),f<l&&(l=f),d>h&&(h=d),f>u&&(u=f);c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return hs(i,a,e,o,l,c,0),a}};function Oc(r,t,e,n,s){let i,a;if(s===ff(r,t,e,n)>0)for(i=t;i<e;i+=n)a=hl(i,r[i],r[i+1],a);else for(i=e-n;i>=t;i-=n)a=hl(i,r[i],r[i+1],a);return a&&xr(a,a.next)&&(fs(a),a=a.next),a}function ci(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(xr(e,e.next)||_e(e.prev,e,e.next)===0)){if(fs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function hs(r,t,e,n,s,i,a){if(!r)return;!a&&i&&of(r,n,s,i);let o=r,l,h;for(;r.prev!==r.next;){if(l=r.prev,h=r.next,i?Ju(r,n,s,i):Ku(r)){t.push(l.i/e|0),t.push(r.i/e|0),t.push(h.i/e|0),fs(r),r=h.next,o=h.next;continue}if(r=h,r===o){a?a===1?(r=ju(ci(r),t,e),hs(r,t,e,n,s,i,2)):a===2&&Qu(r,t,e,n,s,i):hs(ci(r),t,e,n,s,i,1);break}}}function Ku(r){const t=r.prev,e=r,n=r.next;if(_e(t,e,n)>=0)return!1;const s=t.x,i=e.x,a=n.x,o=t.y,l=e.y,h=n.y,u=s<i?s<a?s:a:i<a?i:a,d=o<l?o<h?o:h:l<h?l:h,f=s>i?s>a?s:a:i>a?i:a,c=o>l?o>h?o:h:l>h?l:h;let p=n.next;for(;p!==t;){if(p.x>=u&&p.x<=f&&p.y>=d&&p.y<=c&&Li(s,o,i,l,a,h,p.x,p.y)&&_e(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Ju(r,t,e,n){const s=r.prev,i=r,a=r.next;if(_e(s,i,a)>=0)return!1;const o=s.x,l=i.x,h=a.x,u=s.y,d=i.y,f=a.y,c=o<l?o<h?o:h:l<h?l:h,p=u<d?u<f?u:f:d<f?d:f,v=o>l?o>h?o:h:l>h?l:h,m=u>d?u>f?u:f:d>f?d:f,g=sa(c,p,t,e,n),T=sa(v,m,t,e,n);let M=r.prevZ,x=r.nextZ;for(;M&&M.z>=g&&x&&x.z<=T;){if(M.x>=c&&M.x<=v&&M.y>=p&&M.y<=m&&M!==s&&M!==a&&Li(o,u,l,d,h,f,M.x,M.y)&&_e(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=c&&x.x<=v&&x.y>=p&&x.y<=m&&x!==s&&x!==a&&Li(o,u,l,d,h,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=g;){if(M.x>=c&&M.x<=v&&M.y>=p&&M.y<=m&&M!==s&&M!==a&&Li(o,u,l,d,h,f,M.x,M.y)&&_e(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=T;){if(x.x>=c&&x.x<=v&&x.y>=p&&x.y<=m&&x!==s&&x!==a&&Li(o,u,l,d,h,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function ju(r,t,e){let n=r;do{const s=n.prev,i=n.next.next;!xr(s,i)&&Bc(s,n,n.next,i)&&us(s,i)&&us(i,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(i.i/e|0),fs(n),fs(n.next),n=r=i),n=n.next}while(n!==r);return ci(n)}function Qu(r,t,e,n,s,i){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&cf(a,o)){let l=zc(a,o);a=ci(a,a.next),l=ci(l,l.next),hs(a,t,e,n,s,i,0),hs(l,t,e,n,s,i,0);return}o=o.next}a=a.next}while(a!==r)}function tf(r,t,e,n){const s=[];let i,a,o,l,h;for(i=0,a=t.length;i<a;i++)o=t[i]*n,l=i<a-1?t[i+1]*n:r.length,h=Oc(r,o,l,n,!1),h===h.next&&(h.steiner=!0),s.push(lf(h));for(s.sort(ef),i=0;i<s.length;i++)e=nf(s[i],e);return e}function ef(r,t){return r.x-t.x}function nf(r,t){const e=sf(r,t);if(!e)return t;const n=zc(e,r);return ci(n,n.next),ci(e,e.next)}function sf(r,t){let e=t,n=-1/0,s;const i=r.x,a=r.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=i&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===i))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,l=s.x,h=s.y;let u=1/0,d;e=s;do i>=e.x&&e.x>=l&&i!==e.x&&Li(a<h?i:n,a,l,h,a<h?n:i,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(i-e.x),us(e,r)&&(d<u||d===u&&(e.x>s.x||e.x===s.x&&rf(s,e)))&&(s=e,u=d)),e=e.next;while(e!==o);return s}function rf(r,t){return _e(r.prev,r,t.prev)<0&&_e(t.next,r,r.next)<0}function of(r,t,e,n){let s=r;do s.z===0&&(s.z=sa(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==r);s.prevZ.nextZ=null,s.prevZ=null,af(s)}function af(r){let t,e,n,s,i,a,o,l,h=1;do{for(e=r,r=null,i=null,a=0;e;){for(a++,n=e,o=0,t=0;t<h&&(o++,n=n.nextZ,!!n);t++);for(l=h;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),i?i.nextZ=s:r=s,s.prevZ=i,i=s;e=n}i.nextZ=null,h*=2}while(a>1);return r}function sa(r,t,e,n,s){return r=(r-e)*s|0,t=(t-n)*s|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function lf(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Li(r,t,e,n,s,i,a,o){return(s-a)*(t-o)>=(r-a)*(i-o)&&(r-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(i-o)>=(s-a)*(n-o)}function cf(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!hf(r,t)&&(us(r,t)&&us(t,r)&&uf(r,t)&&(_e(r.prev,r,t.prev)||_e(r,t.prev,t))||xr(r,t)&&_e(r.prev,r,r.next)>0&&_e(t.prev,t,t.next)>0)}function _e(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function xr(r,t){return r.x===t.x&&r.y===t.y}function Bc(r,t,e,n){const s=Gs(_e(r,t,e)),i=Gs(_e(r,t,n)),a=Gs(_e(e,n,r)),o=Gs(_e(e,n,t));return!!(s!==i&&a!==o||s===0&&Hs(r,e,t)||i===0&&Hs(r,n,t)||a===0&&Hs(e,r,n)||o===0&&Hs(e,t,n))}function Hs(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function Gs(r){return r>0?1:r<0?-1:0}function hf(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Bc(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function us(r,t){return _e(r.prev,r,r.next)<0?_e(r,t,r.next)>=0&&_e(r,r.prev,t)>=0:_e(r,t,r.prev)<0||_e(r,r.next,t)<0}function uf(r,t){let e=r,n=!1;const s=(r.x+t.x)/2,i=(r.y+t.y)/2;do e.y>i!=e.next.y>i&&e.next.y!==e.y&&s<(e.next.x-e.x)*(i-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function zc(r,t){const e=new ra(r.i,r.x,r.y),n=new ra(t.i,t.x,t.y),s=r.next,i=t.prev;return r.next=t,t.prev=r,e.next=s,s.prev=e,n.next=e,e.prev=n,i.next=n,n.prev=i,n}function hl(r,t,e,n){const s=new ra(r,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function fs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function ra(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ff(r,t,e,n){let s=0;for(let i=t,a=e-n;i<e;i+=n)s+=(r[a]-r[i])*(r[i+1]+r[a+1]),a=i;return s}class as{static area(t){const e=t.length;let n=0;for(let s=e-1,i=0;i<e;s=i++)n+=t[s].x*t[i].y-t[i].x*t[s].y;return n*.5}static isClockWise(t){return as.area(t)<0}static triangulateShape(t,e){const n=[],s=[],i=[];ul(t),fl(n,t);let a=t.length;e.forEach(ul);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,fl(n,e[l]);const o=$u.triangulate(n,s);for(let l=0;l<o.length;l+=3)i.push(o.slice(l,l+3));return i}}function ul(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function fl(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class Wi extends Be{constructor(t=new vs([new ot(.5,.5),new ot(-.5,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],i=[];for(let o=0,l=t.length;o<l;o++){const h=t[o];a(h)}this.setAttribute("position",new le(s,3)),this.setAttribute("uv",new le(i,2)),this.computeVertexNormals();function a(o){const l=[],h=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,c=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:c-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const g=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:df;let M,x=!1,S,_,y,A;g&&(M=g.getSpacedPoints(u),x=!0,f=!1,S=g.computeFrenetFrames(u,!1),_=new P,y=new P,A=new P),f||(m=0,c=0,p=0,v=0);const E=o.extractPoints(h);let w=E.shape;const b=E.holes;if(!as.isClockWise(w)){w=w.reverse();for(let Q=0,at=b.length;Q<at;Q++){const D=b[Q];as.isClockWise(D)&&(b[Q]=D.reverse())}}const I=as.triangulateShape(w,b),F=w;for(let Q=0,at=b.length;Q<at;Q++){const D=b[Q];w=w.concat(D)}function k(Q,at,D){return at||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(at,D)}const O=w.length,Z=I.length;function G(Q,at,D){let Ut,lt,Et;const ft=Q.x-at.x,kt=Q.y-at.y,_t=D.x-Q.x,L=D.y-Q.y,C=ft*ft+kt*kt,W=ft*L-kt*_t;if(Math.abs(W)>Number.EPSILON){const J=Math.sqrt(C),st=Math.sqrt(_t*_t+L*L),j=at.x-kt/J,It=at.y+ft/J,mt=D.x-L/st,wt=D.y+_t/st,te=((mt-j)*L-(wt-It)*_t)/(ft*L-kt*_t);Ut=j+ft*te-Q.x,lt=It+kt*te-Q.y;const ut=Ut*Ut+lt*lt;if(ut<=2)return new ot(Ut,lt);Et=Math.sqrt(ut/2)}else{let J=!1;ft>Number.EPSILON?_t>Number.EPSILON&&(J=!0):ft<-Number.EPSILON?_t<-Number.EPSILON&&(J=!0):Math.sign(kt)===Math.sign(L)&&(J=!0),J?(Ut=-kt,lt=ft,Et=Math.sqrt(C)):(Ut=ft,lt=kt,Et=Math.sqrt(C/2))}return new ot(Ut/Et,lt/Et)}const it=[];for(let Q=0,at=F.length,D=at-1,Ut=Q+1;Q<at;Q++,D++,Ut++)D===at&&(D=0),Ut===at&&(Ut=0),it[Q]=G(F[Q],F[D],F[Ut]);const rt=[];let et,Mt=it.concat();for(let Q=0,at=b.length;Q<at;Q++){const D=b[Q];et=[];for(let Ut=0,lt=D.length,Et=lt-1,ft=Ut+1;Ut<lt;Ut++,Et++,ft++)Et===lt&&(Et=0),ft===lt&&(ft=0),et[Ut]=G(D[Ut],D[Et],D[ft]);rt.push(et),Mt=Mt.concat(et)}for(let Q=0;Q<m;Q++){const at=Q/m,D=c*Math.cos(at*Math.PI/2),Ut=p*Math.sin(at*Math.PI/2)+v;for(let lt=0,Et=F.length;lt<Et;lt++){const ft=k(F[lt],it[lt],Ut);K(ft.x,ft.y,-D)}for(let lt=0,Et=b.length;lt<Et;lt++){const ft=b[lt];et=rt[lt];for(let kt=0,_t=ft.length;kt<_t;kt++){const L=k(ft[kt],et[kt],Ut);K(L.x,L.y,-D)}}}const Dt=p+v;for(let Q=0;Q<O;Q++){const at=f?k(w[Q],Mt[Q],Dt):w[Q];x?(y.copy(S.normals[0]).multiplyScalar(at.x),_.copy(S.binormals[0]).multiplyScalar(at.y),A.copy(M[0]).add(y).add(_),K(A.x,A.y,A.z)):K(at.x,at.y,0)}for(let Q=1;Q<=u;Q++)for(let at=0;at<O;at++){const D=f?k(w[at],Mt[at],Dt):w[at];x?(y.copy(S.normals[Q]).multiplyScalar(D.x),_.copy(S.binormals[Q]).multiplyScalar(D.y),A.copy(M[Q]).add(y).add(_),K(A.x,A.y,A.z)):K(D.x,D.y,d/u*Q)}for(let Q=m-1;Q>=0;Q--){const at=Q/m,D=c*Math.cos(at*Math.PI/2),Ut=p*Math.sin(at*Math.PI/2)+v;for(let lt=0,Et=F.length;lt<Et;lt++){const ft=k(F[lt],it[lt],Ut);K(ft.x,ft.y,d+D)}for(let lt=0,Et=b.length;lt<Et;lt++){const ft=b[lt];et=rt[lt];for(let kt=0,_t=ft.length;kt<_t;kt++){const L=k(ft[kt],et[kt],Ut);x?K(L.x,L.y+M[u-1].y,M[u-1].x+D):K(L.x,L.y,d+D)}}}N(),X();function N(){const Q=s.length/3;if(f){let at=0,D=O*at;for(let Ut=0;Ut<Z;Ut++){const lt=I[Ut];dt(lt[2]+D,lt[1]+D,lt[0]+D)}at=u+m*2,D=O*at;for(let Ut=0;Ut<Z;Ut++){const lt=I[Ut];dt(lt[0]+D,lt[1]+D,lt[2]+D)}}else{for(let at=0;at<Z;at++){const D=I[at];dt(D[2],D[1],D[0])}for(let at=0;at<Z;at++){const D=I[at];dt(D[0]+O*u,D[1]+O*u,D[2]+O*u)}}n.addGroup(Q,s.length/3-Q,0)}function X(){const Q=s.length/3;let at=0;tt(F,at),at+=F.length;for(let D=0,Ut=b.length;D<Ut;D++){const lt=b[D];tt(lt,at),at+=lt.length}n.addGroup(Q,s.length/3-Q,1)}function tt(Q,at){let D=Q.length;for(;--D>=0;){const Ut=D;let lt=D-1;lt<0&&(lt=Q.length-1);for(let Et=0,ft=u+m*2;Et<ft;Et++){const kt=O*Et,_t=O*(Et+1),L=at+Ut+kt,C=at+lt+kt,W=at+lt+_t,J=at+Ut+_t;Lt(L,C,W,J)}}}function K(Q,at,D){l.push(Q),l.push(at),l.push(D)}function dt(Q,at,D){bt(Q),bt(at),bt(D);const Ut=s.length/3,lt=T.generateTopUV(n,s,Ut-3,Ut-2,Ut-1);Wt(lt[0]),Wt(lt[1]),Wt(lt[2])}function Lt(Q,at,D,Ut){bt(Q),bt(at),bt(Ut),bt(at),bt(D),bt(Ut);const lt=s.length/3,Et=T.generateSideWallUV(n,s,lt-6,lt-3,lt-2,lt-1);Wt(Et[0]),Wt(Et[1]),Wt(Et[3]),Wt(Et[1]),Wt(Et[2]),Wt(Et[3])}function bt(Q){s.push(l[Q*3+0]),s.push(l[Q*3+1]),s.push(l[Q*3+2])}function Wt(Q){i.push(Q.x),i.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return pf(e,n,t)}static fromJSON(t,e){const n=[];for(let i=0,a=t.shapes.length;i<a;i++){const o=e[t.shapes[i]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new fr[s.type]().fromJSON(s)),new Wi(n,t.options)}}const df={generateTopUV:function(r,t,e,n,s){const i=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],h=t[s*3],u=t[s*3+1];return[new ot(i,a),new ot(o,l),new ot(h,u)]},generateSideWallUV:function(r,t,e,n,s,i){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],h=t[n*3],u=t[n*3+1],d=t[n*3+2],f=t[s*3],c=t[s*3+1],p=t[s*3+2],v=t[i*3],m=t[i*3+1],g=t[i*3+2];return Math.abs(o-u)<Math.abs(a-h)?[new ot(a,1-l),new ot(h,1-d),new ot(f,1-p),new ot(v,1-g)]:[new ot(o,1-l),new ot(u,1-d),new ot(c,1-p),new ot(m,1-g)]}};function pf(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,s=r.length;n<s;n++){const i=r[n];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ve extends Be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const i=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),h=o+1,u=l+1,d=t/o,f=e/l,c=[],p=[],v=[],m=[];for(let g=0;g<u;g++){const T=g*f-a;for(let M=0;M<h;M++){const x=M*d-i;p.push(x,-T,0),v.push(0,0,1),m.push(M/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let T=0;T<o;T++){const M=T+h*g,x=T+h*(g+1),S=T+1+h*(g+1),_=T+1+h*g;c.push(M,x,_),c.push(x,S,_)}this.setIndex(c),this.setAttribute("position",new le(p,3)),this.setAttribute("normal",new le(v,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ve(t.width,t.height,t.widthSegments,t.heightSegments)}}class _r extends Be{constructor(t=.5,e=1,n=32,s=1,i=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:i,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],h=[],u=[];let d=t;const f=(e-t)/s,c=new P,p=new ot;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const g=i+m/n*a;c.x=d*Math.cos(g),c.y=d*Math.sin(g),l.push(c.x,c.y,c.z),h.push(0,0,1),p.x=(c.x/e+1)/2,p.y=(c.y/e+1)/2,u.push(p.x,p.y)}d+=f}for(let v=0;v<s;v++){const m=v*(n+1);for(let g=0;g<n;g++){const T=g+m,M=T,x=T+n+1,S=T+n+2,_=T+1;o.push(M,x,_),o.push(x,S,_)}}this.setIndex(o),this.setAttribute("position",new le(l,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _r(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class He extends Be{constructor(t=1,e=32,n=16,s=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:i,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let h=0;const u=[],d=new P,f=new P,c=[],p=[],v=[],m=[];for(let g=0;g<=n;g++){const T=[],M=g/n;let x=0;g===0&&a===0?x=.5/e:g===n&&l===Math.PI&&(x=-.5/e);for(let S=0;S<=e;S++){const _=S/e;d.x=-t*Math.cos(s+_*i)*Math.sin(a+M*o),d.y=t*Math.cos(a+M*o),d.z=t*Math.sin(s+_*i)*Math.sin(a+M*o),p.push(d.x,d.y,d.z),f.copy(d).normalize(),v.push(f.x,f.y,f.z),m.push(_+x,1-M),T.push(h++)}u.push(T)}for(let g=0;g<n;g++)for(let T=0;T<e;T++){const M=u[g][T+1],x=u[g][T],S=u[g+1][T],_=u[g+1][T+1];(g!==0||a>0)&&c.push(M,x,_),(g!==n-1||l<Math.PI)&&c.push(x,S,_)}this.setIndex(c),this.setAttribute("position",new le(p,3)),this.setAttribute("normal",new le(v,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new He(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class hi extends Be{constructor(t=1,e=.4,n=12,s=48,i=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:i},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],h=[],u=new P,d=new P,f=new P;for(let c=0;c<=n;c++)for(let p=0;p<=s;p++){const v=p/s*i,m=c/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(v),d.y=(t+e*Math.cos(m))*Math.sin(v),d.z=e*Math.sin(m),o.push(d.x,d.y,d.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),h.push(p/s),h.push(c/n)}for(let c=1;c<=n;c++)for(let p=1;p<=s;p++){const v=(s+1)*c+p-1,m=(s+1)*(c-1)+p-1,g=(s+1)*(c-1)+p,T=(s+1)*c+p;a.push(v,m,T),a.push(m,g,T)}this.setIndex(a),this.setAttribute("position",new le(o,3)),this.setAttribute("normal",new le(l,3)),this.setAttribute("uv",new le(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class yr extends Be{constructor(t=new Nc(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,s=8,i=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:i};const a=t.computeFrenetFrames(e,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,l=new P,h=new ot;let u=new P;const d=[],f=[],c=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new le(d,3)),this.setAttribute("normal",new le(f,3)),this.setAttribute("uv",new le(c,2));function v(){for(let M=0;M<e;M++)m(M);m(i===!1?e:0),T(),g()}function m(M){u=t.getPointAt(M/e,u);const x=a.normals[M],S=a.binormals[M];for(let _=0;_<=s;_++){const y=_/s*Math.PI*2,A=Math.sin(y),E=-Math.cos(y);l.x=E*x.x+A*S.x,l.y=E*x.y+A*S.y,l.z=E*x.z+A*S.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,d.push(o.x,o.y,o.z)}}function g(){for(let M=1;M<=e;M++)for(let x=1;x<=s;x++){const S=(s+1)*(M-1)+(x-1),_=(s+1)*M+(x-1),y=(s+1)*M+x,A=(s+1)*(M-1)+x;p.push(S,_,A),p.push(_,y,A)}}function T(){for(let M=0;M<=e;M++)for(let x=0;x<=s;x++)h.x=M/e,h.y=x/s,c.push(h.x,h.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new yr(new fr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class ge extends gs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xc,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class kc extends ge{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return $t(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new jt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new jt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new jt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class mf extends gs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gf extends gs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ea extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class vf extends Ea{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Kr=new ee,dl=new P,pl=new P;class Vc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _a,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;dl.setFromMatrixPosition(t.matrixWorld),e.position.copy(dl),pl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pl),e.updateMatrixWorld(),Kr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Kr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ml=new ee,Qi=new P,Jr=new P;class xf extends Vc{constructor(){super(new $e(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new pe(2,1,1,1),new pe(0,1,1,1),new pe(3,1,1,1),new pe(1,1,1,1),new pe(3,0,1,1),new pe(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,i=t.distance||n.far;i!==n.far&&(n.far=i,n.updateProjectionMatrix()),Qi.setFromMatrixPosition(t.matrixWorld),n.position.copy(Qi),Jr.copy(n.position),Jr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Jr),n.updateMatrixWorld(),s.makeTranslation(-Qi.x,-Qi.y,-Qi.z),ml.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ml)}}class dr extends Ea{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new xf}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Hc extends Cc{constructor(t=-1,e=1,n=1,s=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let i=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=h*this.view.offsetX,a=i+h*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class _f extends Vc{constructor(){super(new Hc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class jr extends Ea{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new _f}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class yf extends $e{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Mf{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=gl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=gl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function gl(){return performance.now()}const vl=new ee;let Sf=class{constructor(t,e,n=0,s=1/0){this.ray=new wc(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new va,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return vl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vl),this}intersectObject(t,e=!0,n=[]){return oa(t,this,n,e),n.sort(xl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,i=t.length;s<i;s++)oa(t[s],this,n,e);return n.sort(xl),n}};function xl(r,t){return r.distance-t.distance}function oa(r,t,e,n){let s=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const i=r.children;for(let a=0,o=i.length;a<o;a++)oa(i[a],t,e,!0)}}const _l=new P,Ws=new P;class Gc{constructor(t=new P,e=new P){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){_l.subVectors(t,this.start),Ws.subVectors(this.end,this.start);const n=Ws.dot(Ws);let i=Ws.dot(_l)/n;return e&&(i=$t(i,0,1)),i}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function yl(r,t,e,n){const s=wf(n);switch(e){case fc:return r*t;case pc:return r*t;case mc:return r*t*2;case fa:return r*t/s.components*s.byteLength;case da:return r*t/s.components*s.byteLength;case gc:return r*t*2/s.components*s.byteLength;case pa:return r*t*2/s.components*s.byteLength;case dc:return r*t*3/s.components*s.byteLength;case pn:return r*t*4/s.components*s.byteLength;case ma:return r*t*4/s.components*s.byteLength;case tr:case er:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case nr:case ir:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Do:case No:return Math.max(r,16)*Math.max(t,8)/4;case Io:case Uo:return Math.max(r,8)*Math.max(t,8)/2;case Fo:case Oo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Bo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case zo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ko:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Ho:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Go:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Wo:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Yo:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case qo:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Zo:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case $o:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Ko:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Jo:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case jo:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case sr:case Qo:case ta:return Math.ceil(r/4)*Math.ceil(t/4)*16;case vc:case ea:return Math.ceil(r/4)*Math.ceil(t/4)*8;case na:case ia:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wf(r){switch(r){case In:case cc:return{byteLength:1,components:1};case ls:case hc:case ds:return{byteLength:2,components:1};case ha:case ua:return{byteLength:2,components:4};case ai:case ca:case xn:return{byteLength:4,components:1};case uc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pr);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Wc(){let r=null,t=!1,e=null,n=null;function s(i,a){e(i,a),n=r.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(s),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(i){e=i},setContext:function(i){r=i}}}function Ef(r){const t=new WeakMap;function e(o,l){const h=o.array,u=o.usage,d=h.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,h,u),o.onUploadCallback();let c;if(h instanceof Float32Array)c=r.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?c=r.HALF_FLOAT:c=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)c=r.SHORT;else if(h instanceof Uint32Array)c=r.UNSIGNED_INT;else if(h instanceof Int32Array)c=r.INT;else if(h instanceof Int8Array)c=r.BYTE;else if(h instanceof Uint8Array)c=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)c=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:c,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,h){const u=l.array,d=l.updateRanges;if(r.bindBuffer(h,o),d.length===0)r.bufferSubData(h,0,u);else{d.sort((c,p)=>c.start-p.start);let f=0;for(let c=1;c<d.length;c++){const p=d[f],v=d[c];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,d[f]=v)}d.length=f+1;for(let c=0,p=d.length;c<p;c++){const v=d[c];r.bufferSubData(h,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function i(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:s,remove:i,update:a}}var Tf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bf=`#ifdef USE_ALPHAHASH
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
#endif`,Af=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lf=`#ifdef USE_AOMAP
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
#endif`,If=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Df=`#ifdef USE_BATCHING
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
#endif`,Uf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ff=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Of=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Bf=`#ifdef USE_IRIDESCENCE
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
#endif`,zf=`#ifdef USE_BUMPMAP
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
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Zf=`#define PI 3.141592653589793
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
} // validated`,$f=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Kf=`vec3 transformedNormal = objectNormal;
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
#endif`,Jf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,td=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ed="gl_FragColor = linearToOutputTexel( gl_FragColor );",nd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,id=`#ifdef USE_ENVMAP
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
#endif`,sd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rd=`#ifdef USE_ENVMAP
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
#endif`,od=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ad=`#ifdef USE_ENVMAP
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
#endif`,ld=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ud=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fd=`#ifdef USE_GRADIENTMAP
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
}`,dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,md=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gd=`uniform bool receiveShadow;
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
#endif`,vd=`#ifdef USE_ENVMAP
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
#endif`,xd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_d=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Md=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sd=`PhysicalMaterial material;
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
#endif`,wd=`struct PhysicalMaterial {
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
}`,Ed=`
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
#endif`,Td=`#if defined( RE_IndirectDiffuse )
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
#endif`,bd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ad=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Id=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Dd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ud=`#if defined( USE_POINTS_UV )
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
#endif`,Nd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Od=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kd=`#ifdef USE_MORPHTARGETS
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
#endif`,Vd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qd=`#ifdef USE_NORMALMAP
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
#endif`,Zd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$d=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Kd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ep=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,np=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ip=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,op=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ap=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cp=`float getShadowMask() {
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
}`,hp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,up=`#ifdef USE_SKINNING
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
#endif`,fp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dp=`#ifdef USE_SKINNING
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
#endif`,pp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,xp=`#ifdef USE_TRANSMISSION
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
#endif`,_p=`#ifdef USE_TRANSMISSION
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
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ep=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tp=`uniform sampler2D t2D;
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
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`#include <common>
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
}`,Lp=`#if DEPTH_PACKING == 3200
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
}`,Ip=`#define DISTANCE
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
}`,Dp=`#define DISTANCE
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
}`,Up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Np=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`uniform float scale;
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
}`,Op=`uniform vec3 diffuse;
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
}`,Bp=`#include <common>
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
}`,zp=`uniform vec3 diffuse;
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
}`,kp=`#define LAMBERT
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
}`,Vp=`#define LAMBERT
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
}`,Hp=`#define MATCAP
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
}`,Gp=`#define MATCAP
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
}`,Wp=`#define NORMAL
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
}`,Xp=`#define NORMAL
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
}`,Yp=`#define PHONG
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
}`,qp=`#define PHONG
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
}`,Zp=`#define STANDARD
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
}`,$p=`#define STANDARD
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
}`,Kp=`#define TOON
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
}`,Jp=`#define TOON
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
}`,jp=`uniform float size;
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
}`,Qp=`uniform vec3 diffuse;
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
}`,tm=`#include <common>
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
}`,em=`uniform vec3 color;
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
}`,nm=`uniform float rotation;
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
}`,im=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:Tf,alphahash_pars_fragment:bf,alphamap_fragment:Af,alphamap_pars_fragment:Cf,alphatest_fragment:Rf,alphatest_pars_fragment:Pf,aomap_fragment:Lf,aomap_pars_fragment:If,batching_pars_vertex:Df,batching_vertex:Uf,begin_vertex:Nf,beginnormal_vertex:Ff,bsdfs:Of,iridescence_fragment:Bf,bumpmap_pars_fragment:zf,clipping_planes_fragment:kf,clipping_planes_pars_fragment:Vf,clipping_planes_pars_vertex:Hf,clipping_planes_vertex:Gf,color_fragment:Wf,color_pars_fragment:Xf,color_pars_vertex:Yf,color_vertex:qf,common:Zf,cube_uv_reflection_fragment:$f,defaultnormal_vertex:Kf,displacementmap_pars_vertex:Jf,displacementmap_vertex:jf,emissivemap_fragment:Qf,emissivemap_pars_fragment:td,colorspace_fragment:ed,colorspace_pars_fragment:nd,envmap_fragment:id,envmap_common_pars_fragment:sd,envmap_pars_fragment:rd,envmap_pars_vertex:od,envmap_physical_pars_fragment:vd,envmap_vertex:ad,fog_vertex:ld,fog_pars_vertex:cd,fog_fragment:hd,fog_pars_fragment:ud,gradientmap_pars_fragment:fd,lightmap_pars_fragment:dd,lights_lambert_fragment:pd,lights_lambert_pars_fragment:md,lights_pars_begin:gd,lights_toon_fragment:xd,lights_toon_pars_fragment:_d,lights_phong_fragment:yd,lights_phong_pars_fragment:Md,lights_physical_fragment:Sd,lights_physical_pars_fragment:wd,lights_fragment_begin:Ed,lights_fragment_maps:Td,lights_fragment_end:bd,logdepthbuf_fragment:Ad,logdepthbuf_pars_fragment:Cd,logdepthbuf_pars_vertex:Rd,logdepthbuf_vertex:Pd,map_fragment:Ld,map_pars_fragment:Id,map_particle_fragment:Dd,map_particle_pars_fragment:Ud,metalnessmap_fragment:Nd,metalnessmap_pars_fragment:Fd,morphinstance_vertex:Od,morphcolor_vertex:Bd,morphnormal_vertex:zd,morphtarget_pars_vertex:kd,morphtarget_vertex:Vd,normal_fragment_begin:Hd,normal_fragment_maps:Gd,normal_pars_fragment:Wd,normal_pars_vertex:Xd,normal_vertex:Yd,normalmap_pars_fragment:qd,clearcoat_normal_fragment_begin:Zd,clearcoat_normal_fragment_maps:$d,clearcoat_pars_fragment:Kd,iridescence_pars_fragment:Jd,opaque_fragment:jd,packing:Qd,premultiplied_alpha_fragment:tp,project_vertex:ep,dithering_fragment:np,dithering_pars_fragment:ip,roughnessmap_fragment:sp,roughnessmap_pars_fragment:rp,shadowmap_pars_fragment:op,shadowmap_pars_vertex:ap,shadowmap_vertex:lp,shadowmask_pars_fragment:cp,skinbase_vertex:hp,skinning_pars_vertex:up,skinning_vertex:fp,skinnormal_vertex:dp,specularmap_fragment:pp,specularmap_pars_fragment:mp,tonemapping_fragment:gp,tonemapping_pars_fragment:vp,transmission_fragment:xp,transmission_pars_fragment:_p,uv_pars_fragment:yp,uv_pars_vertex:Mp,uv_vertex:Sp,worldpos_vertex:wp,background_vert:Ep,background_frag:Tp,backgroundCube_vert:bp,backgroundCube_frag:Ap,cube_vert:Cp,cube_frag:Rp,depth_vert:Pp,depth_frag:Lp,distanceRGBA_vert:Ip,distanceRGBA_frag:Dp,equirect_vert:Up,equirect_frag:Np,linedashed_vert:Fp,linedashed_frag:Op,meshbasic_vert:Bp,meshbasic_frag:zp,meshlambert_vert:kp,meshlambert_frag:Vp,meshmatcap_vert:Hp,meshmatcap_frag:Gp,meshnormal_vert:Wp,meshnormal_frag:Xp,meshphong_vert:Yp,meshphong_frag:qp,meshphysical_vert:Zp,meshphysical_frag:$p,meshtoon_vert:Kp,meshtoon_frag:Jp,points_vert:jp,points_frag:Qp,shadow_vert:tm,shadow_frag:em,sprite_vert:nm,sprite_frag:im},pt={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},gn={basic:{uniforms:Ve([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Ve([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Ve([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Ve([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Ve([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Ve([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Ve([pt.points,pt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Ve([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Ve([pt.common,pt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Ve([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Ve([pt.sprite,pt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Ve([pt.common,pt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Ve([pt.lights,pt.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};gn.physical={uniforms:Ve([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const Xs={r:0,b:0,g:0},jn=new _n,sm=new ee;function rm(r,t,e,n,s,i,a){const o=new jt(0);let l=i===!0?0:1,h,u,d=null,f=0,c=null;function p(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function v(M){let x=!1;const S=p(M);S===null?g(o,l):S&&S.isColor&&(g(S,1),x=!0);const _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(M,x){const S=p(x);S&&(S.isCubeTexture||S.mapping===mr)?(u===void 0&&(u=new Ft(new on(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Hi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(_,y,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),jn.copy(x.backgroundRotation),jn.x*=-1,jn.y*=-1,jn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(sm.makeRotationFromEuler(jn)),u.material.toneMapped=ae.getTransfer(S.colorSpace)!==de,(d!==S||f!==S.version||c!==r.toneMapping)&&(u.material.needsUpdate=!0,d=S,f=S.version,c=r.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(h===void 0&&(h=new Ft(new ve(2,2),new Wn({name:"BackgroundMaterial",uniforms:Hi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=S,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.toneMapped=ae.getTransfer(S.colorSpace)!==de,S.matrixAutoUpdate===!0&&S.updateMatrix(),h.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||c!==r.toneMapping)&&(h.material.needsUpdate=!0,d=S,f=S.version,c=r.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null))}function g(M,x){M.getRGB(Xs,Ac(r)),n.buffers.color.setClear(Xs.r,Xs.g,Xs.b,x,a)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),h!==void 0&&(h.geometry.dispose(),h.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,g(o,l)},render:v,addToRenderList:m,dispose:T}}function om(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},s=f(null);let i=s,a=!1;function o(w,b,U,I,F){let k=!1;const O=d(I,U,b);i!==O&&(i=O,h(i.object)),k=c(w,I,U,F),k&&p(w,I,U,F),F!==null&&t.update(F,r.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,x(w,b,U,I),F!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return r.createVertexArray()}function h(w){return r.bindVertexArray(w)}function u(w){return r.deleteVertexArray(w)}function d(w,b,U){const I=U.wireframe===!0;let F=n[w.id];F===void 0&&(F={},n[w.id]=F);let k=F[b.id];k===void 0&&(k={},F[b.id]=k);let O=k[I];return O===void 0&&(O=f(l()),k[I]=O),O}function f(w){const b=[],U=[],I=[];for(let F=0;F<e;F++)b[F]=0,U[F]=0,I[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:U,attributeDivisors:I,object:w,attributes:{},index:null}}function c(w,b,U,I){const F=i.attributes,k=b.attributes;let O=0;const Z=U.getAttributes();for(const G in Z)if(Z[G].location>=0){const rt=F[G];let et=k[G];if(et===void 0&&(G==="instanceMatrix"&&w.instanceMatrix&&(et=w.instanceMatrix),G==="instanceColor"&&w.instanceColor&&(et=w.instanceColor)),rt===void 0||rt.attribute!==et||et&&rt.data!==et.data)return!0;O++}return i.attributesNum!==O||i.index!==I}function p(w,b,U,I){const F={},k=b.attributes;let O=0;const Z=U.getAttributes();for(const G in Z)if(Z[G].location>=0){let rt=k[G];rt===void 0&&(G==="instanceMatrix"&&w.instanceMatrix&&(rt=w.instanceMatrix),G==="instanceColor"&&w.instanceColor&&(rt=w.instanceColor));const et={};et.attribute=rt,rt&&rt.data&&(et.data=rt.data),F[G]=et,O++}i.attributes=F,i.attributesNum=O,i.index=I}function v(){const w=i.newAttributes;for(let b=0,U=w.length;b<U;b++)w[b]=0}function m(w){g(w,0)}function g(w,b){const U=i.newAttributes,I=i.enabledAttributes,F=i.attributeDivisors;U[w]=1,I[w]===0&&(r.enableVertexAttribArray(w),I[w]=1),F[w]!==b&&(r.vertexAttribDivisor(w,b),F[w]=b)}function T(){const w=i.newAttributes,b=i.enabledAttributes;for(let U=0,I=b.length;U<I;U++)b[U]!==w[U]&&(r.disableVertexAttribArray(U),b[U]=0)}function M(w,b,U,I,F,k,O){O===!0?r.vertexAttribIPointer(w,b,U,F,k):r.vertexAttribPointer(w,b,U,I,F,k)}function x(w,b,U,I){v();const F=I.attributes,k=U.getAttributes(),O=b.defaultAttributeValues;for(const Z in k){const G=k[Z];if(G.location>=0){let it=F[Z];if(it===void 0&&(Z==="instanceMatrix"&&w.instanceMatrix&&(it=w.instanceMatrix),Z==="instanceColor"&&w.instanceColor&&(it=w.instanceColor)),it!==void 0){const rt=it.normalized,et=it.itemSize,Mt=t.get(it);if(Mt===void 0)continue;const Dt=Mt.buffer,N=Mt.type,X=Mt.bytesPerElement,tt=N===r.INT||N===r.UNSIGNED_INT||it.gpuType===ca;if(it.isInterleavedBufferAttribute){const K=it.data,dt=K.stride,Lt=it.offset;if(K.isInstancedInterleavedBuffer){for(let bt=0;bt<G.locationSize;bt++)g(G.location+bt,K.meshPerAttribute);w.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let bt=0;bt<G.locationSize;bt++)m(G.location+bt);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let bt=0;bt<G.locationSize;bt++)M(G.location+bt,et/G.locationSize,N,rt,dt*X,(Lt+et/G.locationSize*bt)*X,tt)}else{if(it.isInstancedBufferAttribute){for(let K=0;K<G.locationSize;K++)g(G.location+K,it.meshPerAttribute);w.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let K=0;K<G.locationSize;K++)m(G.location+K);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let K=0;K<G.locationSize;K++)M(G.location+K,et/G.locationSize,N,rt,et*X,et/G.locationSize*K*X,tt)}}else if(O!==void 0){const rt=O[Z];if(rt!==void 0)switch(rt.length){case 2:r.vertexAttrib2fv(G.location,rt);break;case 3:r.vertexAttrib3fv(G.location,rt);break;case 4:r.vertexAttrib4fv(G.location,rt);break;default:r.vertexAttrib1fv(G.location,rt)}}}}T()}function S(){A();for(const w in n){const b=n[w];for(const U in b){const I=b[U];for(const F in I)u(I[F].object),delete I[F];delete b[U]}delete n[w]}}function _(w){if(n[w.id]===void 0)return;const b=n[w.id];for(const U in b){const I=b[U];for(const F in I)u(I[F].object),delete I[F];delete b[U]}delete n[w.id]}function y(w){for(const b in n){const U=n[b];if(U[w.id]===void 0)continue;const I=U[w.id];for(const F in I)u(I[F].object),delete I[F];delete U[w.id]}}function A(){E(),a=!0,i!==s&&(i=s,h(i.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:E,dispose:S,releaseStatesOfGeometry:_,releaseStatesOfProgram:y,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function am(r,t,e){let n;function s(h){n=h}function i(h,u){r.drawArrays(n,h,u),e.update(u,n,1)}function a(h,u,d){d!==0&&(r.drawArraysInstanced(n,h,u,d),e.update(u,n,d))}function o(h,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,u,0,d);let c=0;for(let p=0;p<d;p++)c+=u[p];e.update(c,n,1)}function l(h,u,d,f){if(d===0)return;const c=t.get("WEBGL_multi_draw");if(c===null)for(let p=0;p<h.length;p++)a(h[p],u[p],f[p]);else{c.multiDrawArraysInstancedWEBGL(n,h,0,u,0,f,0,d);let p=0;for(let v=0;v<d;v++)p+=u[v]*f[v];e.update(p,n,1)}}this.setMode=s,this.render=i,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function lm(r,t,e,n){let s;function i(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const y=t.get("EXT_texture_filter_anisotropic");s=r.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(y){return!(y!==pn&&n.convert(y)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(y){const A=y===ds&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(y!==In&&n.convert(y)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&y!==xn&&!A)}function l(y){if(y==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const u=l(h);u!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);const d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),c=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),T=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),S=p>0,_=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:i,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:c,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:T,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:S,maxSamples:_}}function cm(r){const t=this;let e=null,n=0,s=!1,i=!1;const a=new dn,o=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const c=d.length!==0||f||n!==0||s;return s=f,n=d.length,c},this.beginShadows=function(){i=!0,u(null)},this.endShadows=function(){i=!1},this.setGlobalState=function(d,f){e=u(d,f,0)},this.setState=function(d,f,c){const p=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,g=r.get(d);if(!s||p===null||p.length===0||i&&!m)i?u(null):h();else{const T=i?0:n,M=T*4;let x=g.clippingState||null;l.value=x,x=u(p,f,M,c);for(let S=0;S!==M;++S)x[S]=e[S];g.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,f,c,p){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,p!==!0||m===null){const g=c+v*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<g)&&(m=new Float32Array(g));for(let M=0,x=c;M!==v;++M,x+=4)a.copy(d[M]).applyMatrix4(T,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function hm(r){let t=new WeakMap;function e(a,o){return o===Ro?a.mapping=Oi:o===Po&&(a.mapping=Bi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ro||o===Po)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new Iu(l.height);return h.fromEquirectangularTexture(r,a),t.set(a,h),a.addEventListener("dispose",s),e(h.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function i(){t=new WeakMap}return{get:n,dispose:i}}const Ii=4,Ml=[.125,.215,.35,.446,.526,.582],ii=20,Qr=new Hc,Sl=new jt;let to=null,eo=0,no=0,io=!1;const ei=(1+Math.sqrt(5))/2,Ai=1/ei,wl=[new P(-ei,Ai,0),new P(ei,Ai,0),new P(-Ai,0,ei),new P(Ai,0,ei),new P(0,ei,-Ai),new P(0,ei,Ai),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class aa{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){to=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(t,n,s,i),e>0&&this._blur(i,0,0,e),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(to,eo,no),this._renderer.xr.enabled=io,t.scissorTest=!1,Ys(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Oi||t.mapping===Bi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),to=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:ds,format:pn,colorSpace:Vi,depthBuffer:!1},s=El(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=El(t,e,n);const{_lodMax:i}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=um(i)),this._blurMaterial=fm(i,t,e)}return s}_compileMaterial(t){const e=new Ft(this._lodPlanes[0],t);this._renderer.compile(e,Qr)}_sceneToCubeUV(t,e,n,s){const o=new $e(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Sl),u.toneMapping=Hn,u.autoClear=!1;const c=new Xe({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),p=new Ft(new on,c);let v=!1;const m=t.background;m?m.isColor&&(c.color.copy(m),t.background=null,v=!0):(c.color.copy(Sl),v=!0);for(let g=0;g<6;g++){const T=g%3;T===0?(o.up.set(0,l[g],0),o.lookAt(h[g],0,0)):T===1?(o.up.set(0,0,l[g]),o.lookAt(0,h[g],0)):(o.up.set(0,l[g],0),o.lookAt(0,0,h[g]));const M=this._cubeSize;Ys(s,T*M,g>2?M:0,M,M),u.setRenderTarget(s),v&&u.render(p,o),u.render(t,o)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Oi||t.mapping===Bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=bl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tl());const i=s?this._cubemapMaterial:this._equirectMaterial,a=new Ft(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=t;const l=this._cubeSize;Ys(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Qr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let i=1;i<s;i++){const a=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=wl[(s-i-1)%wl.length];this._blur(t,i-1,i,a,o)}e.autoClear=n}_blur(t,e,n,s,i){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",i),this._halfBlur(a,t,n,n,s,"longitudinal",i)}_halfBlur(t,e,n,s,i,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ft(this._lodPlanes[s],h),f=h.uniforms,c=this._sizeLods[n]-1,p=isFinite(i)?Math.PI/(2*c):2*Math.PI/(2*ii-1),v=i/p,m=isFinite(i)?1+Math.floor(u*v):ii;m>ii&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ii}`);const g=[];let T=0;for(let y=0;y<ii;++y){const A=y/v,E=Math.exp(-A*A/2);g.push(E),y===0?T+=E:y<m&&(T+=2*E)}for(let y=0;y<g.length;y++)g[y]=g[y]/T;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=g,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=p,f.mipInt.value=M-n;const x=this._sizeLods[s],S=3*x*(s>M-Ii?s-M+Ii:0),_=4*(this._cubeSize-x);Ys(e,S,_,3*x,2*x),l.setRenderTarget(e),l.render(d,Qr)}}function um(r){const t=[],e=[],n=[];let s=r;const i=r-Ii+1+Ml.length;for(let a=0;a<i;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>r-Ii?l=Ml[a-r+Ii-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),u=-h,d=1+h,f=[u,u,d,u,d,d,u,u,d,d,u,d],c=6,p=6,v=3,m=2,g=1,T=new Float32Array(v*p*c),M=new Float32Array(m*p*c),x=new Float32Array(g*p*c);for(let _=0;_<c;_++){const y=_%3*2/3-1,A=_>2?0:-1,E=[y,A,0,y+2/3,A,0,y+2/3,A+1,0,y,A,0,y+2/3,A+1,0,y,A+1,0];T.set(E,v*p*_),M.set(f,m*p*_);const w=[_,_,_,_,_,_];x.set(w,g*p*_)}const S=new Be;S.setAttribute("position",new mn(T,v)),S.setAttribute("uv",new mn(M,m)),S.setAttribute("faceIndex",new mn(x,g)),t.push(S),s>Ii&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function El(r,t,e){const n=new li(r,t,e);return n.texture.mapping=mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ys(r,t,e,n,s){r.viewport.set(t,e,n,s),r.scissor.set(t,e,n,s)}function fm(r,t,e){const n=new Float32Array(ii),s=new P(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ta(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Tl(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ta(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function bl(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ta(){return`

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
	`}function dm(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===Ro||l===Po,u=l===Oi||l===Bi;if(h||u){let d=t.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new aa(r)),d=h?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const c=o.image;return h&&c&&c.height>0||u&&c&&s(c)?(e===null&&(e=new aa(r)),d=h?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",i),d.texture):null}}}return o}function s(o){let l=0;const h=6;for(let u=0;u<h;u++)o[u]!==void 0&&l++;return l===h}function i(o){const l=o.target;l.removeEventListener("dispose",i);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function pm(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=r.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Pi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function mm(r,t,e,n){const s={},i=new WeakMap;function a(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const p in f.attributes)t.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete s[f.id];const c=i.get(f);c&&(t.remove(c),i.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(d){const f=d.attributes;for(const c in f)t.update(f[c],r.ARRAY_BUFFER)}function h(d){const f=[],c=d.index,p=d.attributes.position;let v=0;if(c!==null){const T=c.array;v=c.version;for(let M=0,x=T.length;M<x;M+=3){const S=T[M+0],_=T[M+1],y=T[M+2];f.push(S,_,_,y,y,S)}}else if(p!==void 0){const T=p.array;v=p.version;for(let M=0,x=T.length/3-1;M<x;M+=3){const S=M+0,_=M+1,y=M+2;f.push(S,_,_,y,y,S)}}else return;const m=new(yc(f)?bc:Tc)(f,1);m.version=v;const g=i.get(d);g&&t.remove(g),i.set(d,m)}function u(d){const f=i.get(d);if(f){const c=d.index;c!==null&&f.version<c.version&&h(d)}else h(d);return i.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function gm(r,t,e){let n;function s(f){n=f}let i,a;function o(f){i=f.type,a=f.bytesPerElement}function l(f,c){r.drawElements(n,c,i,f*a),e.update(c,n,1)}function h(f,c,p){p!==0&&(r.drawElementsInstanced(n,c,i,f*a,p),e.update(c,n,p))}function u(f,c,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,f,0,p);let m=0;for(let g=0;g<p;g++)m+=c[g];e.update(m,n,1)}function d(f,c,p,v){if(p===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f.length;g++)h(f[g]/a,c[g],v[g]);else{m.multiDrawElementsInstancedWEBGL(n,c,0,i,f,0,v,0,p);let g=0;for(let T=0;T<p;T++)g+=c[T]*v[T];e.update(g,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function vm(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(i,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(i/3);break;case r.LINES:e.lines+=o*(i/2);break;case r.LINE_STRIP:e.lines+=o*(i-1);break;case r.LINE_LOOP:e.lines+=o*i;break;case r.POINTS:e.points+=o*i;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function xm(r,t,e){const n=new WeakMap,s=new pe;function i(a,o,l){const h=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let w=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",w)};var c=w;f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;p===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let S=o.attributes.position.count*x,_=1;S>t.maxTextureSize&&(_=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const y=new Float32Array(S*_*4*d),A=new Sc(y,S,_,d);A.type=xn,A.needsUpdate=!0;const E=x*4;for(let b=0;b<d;b++){const U=g[b],I=T[b],F=M[b],k=S*_*4*b;for(let O=0;O<U.count;O++){const Z=O*E;p===!0&&(s.fromBufferAttribute(U,O),y[k+Z+0]=s.x,y[k+Z+1]=s.y,y[k+Z+2]=s.z,y[k+Z+3]=0),v===!0&&(s.fromBufferAttribute(I,O),y[k+Z+4]=s.x,y[k+Z+5]=s.y,y[k+Z+6]=s.z,y[k+Z+7]=0),m===!0&&(s.fromBufferAttribute(F,O),y[k+Z+8]=s.x,y[k+Z+9]=s.y,y[k+Z+10]=s.z,y[k+Z+11]=F.itemSize===4?s.w:1)}}f={count:d,texture:A,size:new ot(S,_)},n.set(o,f),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let p=0;for(let m=0;m<h.length;m++)p+=h[m];const v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(r,"morphTargetBaseInfluence",v),l.getUniforms().setValue(r,"morphTargetInfluences",h)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:i}}function _m(r,t,e,n){let s=new WeakMap;function i(l){const h=n.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==h&&(t.update(d),s.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==h&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return d}function a(){s=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:i,dispose:a}}const Xc=new Oe,Al=new Lc(1,1),Yc=new Sc,qc=new gu,Zc=new Rc,Cl=[],Rl=[],Pl=new Float32Array(16),Ll=new Float32Array(9),Il=new Float32Array(4);function Xi(r,t,e){const n=r[0];if(n<=0||n>0)return r;const s=t*e;let i=Cl[s];if(i===void 0&&(i=new Float32Array(s),Cl[s]=i),t!==0){n.toArray(i,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(i,o)}return i}function Ee(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Te(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Mr(r,t){let e=Rl[t];e===void 0&&(e=new Int32Array(t),Rl[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function ym(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Mm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;r.uniform2fv(this.addr,t),Te(e,t)}}function Sm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;r.uniform3fv(this.addr,t),Te(e,t)}}function wm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;r.uniform4fv(this.addr,t),Te(e,t)}}function Em(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Il.set(n),r.uniformMatrix2fv(this.addr,!1,Il),Te(e,n)}}function Tm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Ll.set(n),r.uniformMatrix3fv(this.addr,!1,Ll),Te(e,n)}}function bm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Pl.set(n),r.uniformMatrix4fv(this.addr,!1,Pl),Te(e,n)}}function Am(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Cm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;r.uniform2iv(this.addr,t),Te(e,t)}}function Rm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;r.uniform3iv(this.addr,t),Te(e,t)}}function Pm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;r.uniform4iv(this.addr,t),Te(e,t)}}function Lm(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Im(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;r.uniform2uiv(this.addr,t),Te(e,t)}}function Dm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;r.uniform3uiv(this.addr,t),Te(e,t)}}function Um(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;r.uniform4uiv(this.addr,t),Te(e,t)}}function Nm(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s);let i;this.type===r.SAMPLER_2D_SHADOW?(Al.compareFunction=_c,i=Al):i=Xc,e.setTexture2D(t||i,s)}function Fm(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||qc,s)}function Om(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Zc,s)}function Bm(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Yc,s)}function zm(r){switch(r){case 5126:return ym;case 35664:return Mm;case 35665:return Sm;case 35666:return wm;case 35674:return Em;case 35675:return Tm;case 35676:return bm;case 5124:case 35670:return Am;case 35667:case 35671:return Cm;case 35668:case 35672:return Rm;case 35669:case 35673:return Pm;case 5125:return Lm;case 36294:return Im;case 36295:return Dm;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return Bm}}function km(r,t){r.uniform1fv(this.addr,t)}function Vm(r,t){const e=Xi(t,this.size,2);r.uniform2fv(this.addr,e)}function Hm(r,t){const e=Xi(t,this.size,3);r.uniform3fv(this.addr,e)}function Gm(r,t){const e=Xi(t,this.size,4);r.uniform4fv(this.addr,e)}function Wm(r,t){const e=Xi(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Xm(r,t){const e=Xi(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Ym(r,t){const e=Xi(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function qm(r,t){r.uniform1iv(this.addr,t)}function Zm(r,t){r.uniform2iv(this.addr,t)}function $m(r,t){r.uniform3iv(this.addr,t)}function Km(r,t){r.uniform4iv(this.addr,t)}function Jm(r,t){r.uniform1uiv(this.addr,t)}function jm(r,t){r.uniform2uiv(this.addr,t)}function Qm(r,t){r.uniform3uiv(this.addr,t)}function t0(r,t){r.uniform4uiv(this.addr,t)}function e0(r,t,e){const n=this.cache,s=t.length,i=Mr(e,s);Ee(n,i)||(r.uniform1iv(this.addr,i),Te(n,i));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Xc,i[a])}function n0(r,t,e){const n=this.cache,s=t.length,i=Mr(e,s);Ee(n,i)||(r.uniform1iv(this.addr,i),Te(n,i));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||qc,i[a])}function i0(r,t,e){const n=this.cache,s=t.length,i=Mr(e,s);Ee(n,i)||(r.uniform1iv(this.addr,i),Te(n,i));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Zc,i[a])}function s0(r,t,e){const n=this.cache,s=t.length,i=Mr(e,s);Ee(n,i)||(r.uniform1iv(this.addr,i),Te(n,i));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Yc,i[a])}function r0(r){switch(r){case 5126:return km;case 35664:return Vm;case 35665:return Hm;case 35666:return Gm;case 35674:return Wm;case 35675:return Xm;case 35676:return Ym;case 5124:case 35670:return qm;case 35667:case 35671:return Zm;case 35668:case 35672:return $m;case 35669:case 35673:return Km;case 5125:return Jm;case 36294:return jm;case 36295:return Qm;case 36296:return t0;case 35678:case 36198:case 36298:case 36306:case 35682:return e0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return s0}}class o0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=zm(e.type)}}class a0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=r0(e.type)}}class l0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let i=0,a=s.length;i!==a;++i){const o=s[i];o.setValue(t,e[o.id],n)}}}const so=/(\w+)(\])?(\[|\.)?/g;function Dl(r,t){r.seq.push(t),r.map[t.id]=t}function c0(r,t,e){const n=r.name,s=n.length;for(so.lastIndex=0;;){const i=so.exec(n),a=so.lastIndex;let o=i[1];const l=i[2]==="]",h=i[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===s){Dl(e,h===void 0?new o0(o,r,t):new a0(o,r,t));break}else{let d=e.map[o];d===void 0&&(d=new l0(o),Dl(e,d)),e=d}}}class rr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const i=t.getActiveUniform(e,s),a=t.getUniformLocation(e,i.name);c0(i,a,this)}}setValue(t,e,n,s){const i=this.map[e];i!==void 0&&i.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let i=0,a=e.length;i!==a;++i){const o=e[i],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,i=t.length;s!==i;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Ul(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const h0=37297;let u0=0;function f0(r,t){const e=r.split(`
`),n=[],s=Math.max(t-6,0),i=Math.min(t+6,e.length);for(let a=s;a<i;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Nl=new Zt;function d0(r){ae._getMatrix(Nl,ae.workingColorSpace,r);const t=`mat3( ${Nl.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(r)){case cr:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Fl(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=r.getShaderInfoLog(t).trim();if(n&&s==="")return"";const i=/ERROR: 0:(\d+)/.exec(s);if(i){const a=parseInt(i[1]);return e.toUpperCase()+`

`+s+`

`+f0(r.getShaderSource(t),a)}else return s}function p0(r,t){const e=d0(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function m0(r,t){let e;switch(t){case Ch:e="Linear";break;case Rh:e="Reinhard";break;case Ph:e="Cineon";break;case ac:e="ACESFilmic";break;case Ih:e="AgX";break;case Dh:e="Neutral";break;case Lh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const qs=new P;function g0(){ae.getLuminanceCoefficients(qs);const r=qs.x.toFixed(4),t=qs.y.toFixed(4),e=qs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(es).join(`
`)}function x0(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function _0(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const i=r.getActiveAttrib(t,s),a=i.name;let o=1;i.type===r.FLOAT_MAT2&&(o=2),i.type===r.FLOAT_MAT3&&(o=3),i.type===r.FLOAT_MAT4&&(o=4),e[a]={type:i.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function es(r){return r!==""}function Ol(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bl(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const y0=/^[ \t]*#include +<([\w\d./]+)>/gm;function la(r){return r.replace(y0,S0)}const M0=new Map;function S0(r,t){let e=Jt[t];if(e===void 0){const n=M0.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return la(e)}const w0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zl(r){return r.replace(w0,E0)}function E0(r,t,e,n){let s="";for(let i=parseInt(t);i<parseInt(e);i++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+i+" ]").replace(/UNROLLED_LOOP_INDEX/g,i);return s}function kl(r){let t=`precision ${r.precision} float;
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
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function T0(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===sc?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===rc?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===An&&(t="SHADOWMAP_TYPE_VSM"),t}function b0(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Oi:case Bi:t="ENVMAP_TYPE_CUBE";break;case mr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function A0(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Bi:t="ENVMAP_MODE_REFRACTION";break}return t}function C0(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case oc:t="ENVMAP_BLENDING_MULTIPLY";break;case bh:t="ENVMAP_BLENDING_MIX";break;case Ah:t="ENVMAP_BLENDING_ADD";break}return t}function R0(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function P0(r,t,e,n){const s=r.getContext(),i=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=T0(e),h=b0(e),u=A0(e),d=C0(e),f=R0(e),c=v0(e),p=x0(i),v=s.createProgram();let m,g,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(es).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(es).join(`
`),g.length>0&&(g+=`
`)):(m=[kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(es).join(`
`),g=[kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hn?"#define TONE_MAPPING":"",e.toneMapping!==Hn?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Hn?m0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,p0("linearToOutputTexel",e.outputColorSpace),g0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(es).join(`
`)),a=la(a),a=Ol(a,e),a=Bl(a,e),o=la(o),o=Ol(o,e),o=Bl(o,e),a=zl(a),o=zl(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[c,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const M=T+m+a,x=T+g+o,S=Ul(s,s.VERTEX_SHADER,M),_=Ul(s,s.FRAGMENT_SHADER,x);s.attachShader(v,S),s.attachShader(v,_),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function y(b){if(r.debug.checkShaderErrors){const U=s.getProgramInfoLog(v).trim(),I=s.getShaderInfoLog(S).trim(),F=s.getShaderInfoLog(_).trim();let k=!0,O=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(k=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(s,v,S,_);else{const Z=Fl(s,S,"vertex"),G=Fl(s,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+U+`
`+Z+`
`+G)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(I===""||F==="")&&(O=!1);O&&(b.diagnostics={runnable:k,programLog:U,vertexShader:{log:I,prefix:m},fragmentShader:{log:F,prefix:g}})}s.deleteShader(S),s.deleteShader(_),A=new rr(s,v),E=_0(s,v)}let A;this.getUniforms=function(){return A===void 0&&y(this),A};let E;this.getAttributes=function(){return E===void 0&&y(this),E};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(v,h0)),w},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=u0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=_,this}let L0=0;class I0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new D0(t),e.set(t,n)),n}}class D0{constructor(t){this.id=L0++,this.code=t,this.usedTimes=0}}function U0(r,t,e,n,s,i,a){const o=new va,l=new I0,h=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let c=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return h.add(E),E===0?"uv":`uv${E}`}function m(E,w,b,U,I){const F=U.fog,k=I.geometry,O=E.isMeshStandardMaterial?U.environment:null,Z=(E.isMeshStandardMaterial?e:t).get(E.envMap||O),G=Z&&Z.mapping===mr?Z.image.height:null,it=p[E.type];E.precision!==null&&(c=s.getMaxPrecision(E.precision),c!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",c,"instead."));const rt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,et=rt!==void 0?rt.length:0;let Mt=0;k.morphAttributes.position!==void 0&&(Mt=1),k.morphAttributes.normal!==void 0&&(Mt=2),k.morphAttributes.color!==void 0&&(Mt=3);let Dt,N,X,tt;if(it){const ue=gn[it];Dt=ue.vertexShader,N=ue.fragmentShader}else Dt=E.vertexShader,N=E.fragmentShader,l.update(E),X=l.getVertexShaderID(E),tt=l.getFragmentShaderID(E);const K=r.getRenderTarget(),dt=r.state.buffers.depth.getReversed(),Lt=I.isInstancedMesh===!0,bt=I.isBatchedMesh===!0,Wt=!!E.map,Q=!!E.matcap,at=!!Z,D=!!E.aoMap,Ut=!!E.lightMap,lt=!!E.bumpMap,Et=!!E.normalMap,ft=!!E.displacementMap,kt=!!E.emissiveMap,_t=!!E.metalnessMap,L=!!E.roughnessMap,C=E.anisotropy>0,W=E.clearcoat>0,J=E.dispersion>0,st=E.iridescence>0,j=E.sheen>0,It=E.transmission>0,mt=C&&!!E.anisotropyMap,wt=W&&!!E.clearcoatMap,te=W&&!!E.clearcoatNormalMap,ut=W&&!!E.clearcoatRoughnessMap,At=st&&!!E.iridescenceMap,zt=st&&!!E.iridescenceThicknessMap,Vt=j&&!!E.sheenColorMap,Ct=j&&!!E.sheenRoughnessMap,ie=!!E.specularMap,Kt=!!E.specularColorMap,me=!!E.specularIntensityMap,B=It&&!!E.transmissionMap,gt=It&&!!E.thicknessMap,$=!!E.gradientMap,nt=!!E.alphaMap,yt=E.alphaTest>0,xt=!!E.alphaHash,qt=!!E.extensions;let ye=Hn;E.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ye=r.toneMapping);const De={shaderID:it,shaderType:E.type,shaderName:E.name,vertexShader:Dt,fragmentShader:N,defines:E.defines,customVertexShaderID:X,customFragmentShaderID:tt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:c,batching:bt,batchingColor:bt&&I._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&I.instanceColor!==null,instancingMorph:Lt&&I.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?r.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Vi,alphaToCoverage:!!E.alphaToCoverage,map:Wt,matcap:Q,envMap:at,envMapMode:at&&Z.mapping,envMapCubeUVHeight:G,aoMap:D,lightMap:Ut,bumpMap:lt,normalMap:Et,displacementMap:f&&ft,emissiveMap:kt,normalMapObjectSpace:Et&&E.normalMapType===Oh,normalMapTangentSpace:Et&&E.normalMapType===xc,metalnessMap:_t,roughnessMap:L,anisotropy:C,anisotropyMap:mt,clearcoat:W,clearcoatMap:wt,clearcoatNormalMap:te,clearcoatRoughnessMap:ut,dispersion:J,iridescence:st,iridescenceMap:At,iridescenceThicknessMap:zt,sheen:j,sheenColorMap:Vt,sheenRoughnessMap:Ct,specularMap:ie,specularColorMap:Kt,specularIntensityMap:me,transmission:It,transmissionMap:B,thicknessMap:gt,gradientMap:$,opaque:E.transparent===!1&&E.blending===Di&&E.alphaToCoverage===!1,alphaMap:nt,alphaTest:yt,alphaHash:xt,combine:E.combine,mapUv:Wt&&v(E.map.channel),aoMapUv:D&&v(E.aoMap.channel),lightMapUv:Ut&&v(E.lightMap.channel),bumpMapUv:lt&&v(E.bumpMap.channel),normalMapUv:Et&&v(E.normalMap.channel),displacementMapUv:ft&&v(E.displacementMap.channel),emissiveMapUv:kt&&v(E.emissiveMap.channel),metalnessMapUv:_t&&v(E.metalnessMap.channel),roughnessMapUv:L&&v(E.roughnessMap.channel),anisotropyMapUv:mt&&v(E.anisotropyMap.channel),clearcoatMapUv:wt&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:te&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:zt&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&v(E.sheenRoughnessMap.channel),specularMapUv:ie&&v(E.specularMap.channel),specularColorMapUv:Kt&&v(E.specularColorMap.channel),specularIntensityMapUv:me&&v(E.specularIntensityMap.channel),transmissionMapUv:B&&v(E.transmissionMap.channel),thicknessMapUv:gt&&v(E.thicknessMap.channel),alphaMapUv:nt&&v(E.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Et||C),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!k.attributes.uv&&(Wt||nt),fog:!!F,useFog:E.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:dt,skinning:I.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:Mt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&b.length>0,shadowMapType:r.shadowMap.type,toneMapping:ye,decodeVideoTexture:Wt&&E.map.isVideoTexture===!0&&ae.getTransfer(E.map.colorSpace)===de,decodeVideoTextureEmissive:kt&&E.emissiveMap.isVideoTexture===!0&&ae.getTransfer(E.emissiveMap.colorSpace)===de,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Fe,flipSided:E.side===Ge,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:qt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qt&&E.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return De.vertexUv1s=h.has(1),De.vertexUv2s=h.has(2),De.vertexUv3s=h.has(3),h.clear(),De}function g(E){const w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(const b in E.defines)w.push(b),w.push(E.defines[b]);return E.isRawShaderMaterial===!1&&(T(w,E),M(w,E),w.push(r.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function T(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function M(E,w){o.disableAll(),w.supportsVertexTextures&&o.enable(0),w.instancing&&o.enable(1),w.instancingColor&&o.enable(2),w.instancingMorph&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),w.dispersion&&o.enable(20),w.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reverseDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),E.push(o.mask)}function x(E){const w=p[E.type];let b;if(w){const U=gn[w];b=Cu.clone(U.uniforms)}else b=E.uniforms;return b}function S(E,w){let b;for(let U=0,I=u.length;U<I;U++){const F=u[U];if(F.cacheKey===w){b=F,++b.usedTimes;break}}return b===void 0&&(b=new P0(r,w,E,i),u.push(b)),b}function _(E){if(--E.usedTimes===0){const w=u.indexOf(E);u[w]=u[u.length-1],u.pop(),E.destroy()}}function y(E){l.remove(E)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:x,acquireProgram:S,releaseProgram:_,releaseShaderCache:y,programs:u,dispose:A}}function N0(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function s(a,o,l){r.get(a)[o]=l}function i(){r=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:i}}function F0(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Vl(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Hl(){const r=[];let t=0;const e=[],n=[],s=[];function i(){t=0,e.length=0,n.length=0,s.length=0}function a(d,f,c,p,v,m){let g=r[t];return g===void 0?(g={id:d.id,object:d,geometry:f,material:c,groupOrder:p,renderOrder:d.renderOrder,z:v,group:m},r[t]=g):(g.id=d.id,g.object=d,g.geometry=f,g.material=c,g.groupOrder=p,g.renderOrder=d.renderOrder,g.z=v,g.group=m),t++,g}function o(d,f,c,p,v,m){const g=a(d,f,c,p,v,m);c.transmission>0?n.push(g):c.transparent===!0?s.push(g):e.push(g)}function l(d,f,c,p,v,m){const g=a(d,f,c,p,v,m);c.transmission>0?n.unshift(g):c.transparent===!0?s.unshift(g):e.unshift(g)}function h(d,f){e.length>1&&e.sort(d||F0),n.length>1&&n.sort(f||Vl),s.length>1&&s.sort(f||Vl)}function u(){for(let d=t,f=r.length;d<f;d++){const c=r[d];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}}return{opaque:e,transmissive:n,transparent:s,init:i,push:o,unshift:l,finish:u,sort:h}}function O0(){let r=new WeakMap;function t(n,s){const i=r.get(n);let a;return i===void 0?(a=new Hl,r.set(n,[a])):s>=i.length?(a=new Hl,i.push(a)):a=i[s],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function B0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new jt};break;case"SpotLight":e={position:new P,direction:new P,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new P,halfWidth:new P,halfHeight:new P};break}return r[t.id]=e,e}}}function z0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let k0=0;function V0(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function H0(r){const t=new B0,e=z0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new P);const s=new P,i=new ee,a=new ee;function o(h){let u=0,d=0,f=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let c=0,p=0,v=0,m=0,g=0,T=0,M=0,x=0,S=0,_=0,y=0;h.sort(V0);for(let E=0,w=h.length;E<w;E++){const b=h[E],U=b.color,I=b.intensity,F=b.distance,k=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)u+=U.r*I,d+=U.g*I,f+=U.b*I;else if(b.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(b.sh.coefficients[O],I);y++}else if(b.isDirectionalLight){const O=t.get(b);if(O.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const Z=b.shadow,G=e.get(b);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.directionalShadow[c]=G,n.directionalShadowMap[c]=k,n.directionalShadowMatrix[c]=b.shadow.matrix,T++}n.directional[c]=O,c++}else if(b.isSpotLight){const O=t.get(b);O.position.setFromMatrixPosition(b.matrixWorld),O.color.copy(U).multiplyScalar(I),O.distance=F,O.coneCos=Math.cos(b.angle),O.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),O.decay=b.decay,n.spot[v]=O;const Z=b.shadow;if(b.map&&(n.spotLightMap[S]=b.map,S++,Z.updateMatrices(b),b.castShadow&&_++),n.spotLightMatrix[v]=Z.matrix,b.castShadow){const G=e.get(b);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=k,x++}v++}else if(b.isRectAreaLight){const O=t.get(b);O.color.copy(U).multiplyScalar(I),O.halfWidth.set(b.width*.5,0,0),O.halfHeight.set(0,b.height*.5,0),n.rectArea[m]=O,m++}else if(b.isPointLight){const O=t.get(b);if(O.color.copy(b.color).multiplyScalar(b.intensity),O.distance=b.distance,O.decay=b.decay,b.castShadow){const Z=b.shadow,G=e.get(b);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,n.pointShadow[p]=G,n.pointShadowMap[p]=k,n.pointShadowMatrix[p]=b.shadow.matrix,M++}n.point[p]=O,p++}else if(b.isHemisphereLight){const O=t.get(b);O.skyColor.copy(b.color).multiplyScalar(I),O.groundColor.copy(b.groundColor).multiplyScalar(I),n.hemi[g]=O,g++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const A=n.hash;(A.directionalLength!==c||A.pointLength!==p||A.spotLength!==v||A.rectAreaLength!==m||A.hemiLength!==g||A.numDirectionalShadows!==T||A.numPointShadows!==M||A.numSpotShadows!==x||A.numSpotMaps!==S||A.numLightProbes!==y)&&(n.directional.length=c,n.spot.length=v,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+S-_,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=_,n.numLightProbes=y,A.directionalLength=c,A.pointLength=p,A.spotLength=v,A.rectAreaLength=m,A.hemiLength=g,A.numDirectionalShadows=T,A.numPointShadows=M,A.numSpotShadows=x,A.numSpotMaps=S,A.numLightProbes=y,n.version=k0++)}function l(h,u){let d=0,f=0,c=0,p=0,v=0;const m=u.matrixWorldInverse;for(let g=0,T=h.length;g<T;g++){const M=h[g];if(M.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(M.isSpotLight){const x=n.spot[c];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),c++}else if(M.isRectAreaLight){const x=n.rectArea[p];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),i.copy(M.matrixWorld),i.premultiply(m),a.extractRotation(i),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),p++}else if(M.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Gl(r){const t=new H0(r),e=[],n=[];function s(u){h.camera=u,e.length=0,n.length=0}function i(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:o,setupLightsView:l,pushLight:i,pushShadow:a}}function G0(r){let t=new WeakMap;function e(s,i=0){const a=t.get(s);let o;return a===void 0?(o=new Gl(r),t.set(s,[o])):i>=a.length?(o=new Gl(r),a.push(o)):o=a[i],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const W0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X0=`uniform sampler2D shadow_pass;
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
}`;function Y0(r,t,e){let n=new _a;const s=new ot,i=new ot,a=new pe,o=new mf({depthPacking:Fh}),l=new gf,h={},u=e.maxTextureSize,d={[Gn]:Ge,[Ge]:Gn,[Fe]:Fe},f=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:W0,fragmentShader:X0}),c=f.clone();c.defines.HORIZONTAL_PASS=1;const p=new Be;p.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ft(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sc;let g=this.type;this.render=function(_,y,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||_.length===0)return;const E=r.getRenderTarget(),w=r.getActiveCubeFace(),b=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Vn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const I=g!==An&&this.type===An,F=g===An&&this.type!==An;for(let k=0,O=_.length;k<O;k++){const Z=_[k],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const it=G.getFrameExtents();if(s.multiply(it),i.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(i.x=Math.floor(u/it.x),s.x=i.x*it.x,G.mapSize.x=i.x),s.y>u&&(i.y=Math.floor(u/it.y),s.y=i.y*it.y,G.mapSize.y=i.y)),G.map===null||I===!0||F===!0){const et=this.type!==An?{minFilter:Ke,magFilter:Ke}:{};G.map!==null&&G.map.dispose(),G.map=new li(s.x,s.y,et),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const rt=G.getViewportCount();for(let et=0;et<rt;et++){const Mt=G.getViewport(et);a.set(i.x*Mt.x,i.y*Mt.y,i.x*Mt.z,i.y*Mt.w),U.viewport(a),G.updateMatrices(Z,et),n=G.getFrustum(),x(y,A,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===An&&T(G,A),G.needsUpdate=!1}g=this.type,m.needsUpdate=!1,r.setRenderTarget(E,w,b)};function T(_,y){const A=t.update(v);f.defines.VSM_SAMPLES!==_.blurSamples&&(f.defines.VSM_SAMPLES=_.blurSamples,c.defines.VSM_SAMPLES=_.blurSamples,f.needsUpdate=!0,c.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new li(s.x,s.y)),f.uniforms.shadow_pass.value=_.map.texture,f.uniforms.resolution.value=_.mapSize,f.uniforms.radius.value=_.radius,r.setRenderTarget(_.mapPass),r.clear(),r.renderBufferDirect(y,null,A,f,v,null),c.uniforms.shadow_pass.value=_.mapPass.texture,c.uniforms.resolution.value=_.mapSize,c.uniforms.radius.value=_.radius,r.setRenderTarget(_.map),r.clear(),r.renderBufferDirect(y,null,A,c,v,null)}function M(_,y,A,E){let w=null;const b=A.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(b!==void 0)w=b;else if(w=A.isPointLight===!0?l:o,r.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0){const U=w.uuid,I=y.uuid;let F=h[U];F===void 0&&(F={},h[U]=F);let k=F[I];k===void 0&&(k=w.clone(),F[I]=k,y.addEventListener("dispose",S)),w=k}if(w.visible=y.visible,w.wireframe=y.wireframe,E===An?w.side=y.shadowSide!==null?y.shadowSide:y.side:w.side=y.shadowSide!==null?y.shadowSide:d[y.side],w.alphaMap=y.alphaMap,w.alphaTest=y.alphaTest,w.map=y.map,w.clipShadows=y.clipShadows,w.clippingPlanes=y.clippingPlanes,w.clipIntersection=y.clipIntersection,w.displacementMap=y.displacementMap,w.displacementScale=y.displacementScale,w.displacementBias=y.displacementBias,w.wireframeLinewidth=y.wireframeLinewidth,w.linewidth=y.linewidth,A.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const U=r.properties.get(w);U.light=A}return w}function x(_,y,A,E,w){if(_.visible===!1)return;if(_.layers.test(y.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&w===An)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,_.matrixWorld);const I=t.update(_),F=_.material;if(Array.isArray(F)){const k=I.groups;for(let O=0,Z=k.length;O<Z;O++){const G=k[O],it=F[G.materialIndex];if(it&&it.visible){const rt=M(_,it,E,w);_.onBeforeShadow(r,_,y,A,I,rt,G),r.renderBufferDirect(A,null,I,rt,_,G),_.onAfterShadow(r,_,y,A,I,rt,G)}}}else if(F.visible){const k=M(_,F,E,w);_.onBeforeShadow(r,_,y,A,I,k,null),r.renderBufferDirect(A,null,I,k,_,null),_.onAfterShadow(r,_,y,A,I,k,null)}}const U=_.children;for(let I=0,F=U.length;I<F;I++)x(U[I],y,A,E,w)}function S(_){_.target.removeEventListener("dispose",S);for(const A in h){const E=h[A],w=_.target.uuid;w in E&&(E[w].dispose(),delete E[w])}}}const q0={[So]:wo,[Eo]:Ao,[To]:Co,[Fi]:bo,[wo]:So,[Ao]:Eo,[Co]:To,[bo]:Fi};function Z0(r,t){function e(){let B=!1;const gt=new pe;let $=null;const nt=new pe(0,0,0,0);return{setMask:function(yt){$!==yt&&!B&&(r.colorMask(yt,yt,yt,yt),$=yt)},setLocked:function(yt){B=yt},setClear:function(yt,xt,qt,ye,De){De===!0&&(yt*=ye,xt*=ye,qt*=ye),gt.set(yt,xt,qt,ye),nt.equals(gt)===!1&&(r.clearColor(yt,xt,qt,ye),nt.copy(gt))},reset:function(){B=!1,$=null,nt.set(-1,0,0,0)}}}function n(){let B=!1,gt=!1,$=null,nt=null,yt=null;return{setReversed:function(xt){if(gt!==xt){const qt=t.get("EXT_clip_control");gt?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT);const ye=yt;yt=null,this.setClear(ye)}gt=xt},getReversed:function(){return gt},setTest:function(xt){xt?K(r.DEPTH_TEST):dt(r.DEPTH_TEST)},setMask:function(xt){$!==xt&&!B&&(r.depthMask(xt),$=xt)},setFunc:function(xt){if(gt&&(xt=q0[xt]),nt!==xt){switch(xt){case So:r.depthFunc(r.NEVER);break;case wo:r.depthFunc(r.ALWAYS);break;case Eo:r.depthFunc(r.LESS);break;case Fi:r.depthFunc(r.LEQUAL);break;case To:r.depthFunc(r.EQUAL);break;case bo:r.depthFunc(r.GEQUAL);break;case Ao:r.depthFunc(r.GREATER);break;case Co:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}nt=xt}},setLocked:function(xt){B=xt},setClear:function(xt){yt!==xt&&(gt&&(xt=1-xt),r.clearDepth(xt),yt=xt)},reset:function(){B=!1,$=null,nt=null,yt=null,gt=!1}}}function s(){let B=!1,gt=null,$=null,nt=null,yt=null,xt=null,qt=null,ye=null,De=null;return{setTest:function(ue){B||(ue?K(r.STENCIL_TEST):dt(r.STENCIL_TEST))},setMask:function(ue){gt!==ue&&!B&&(r.stencilMask(ue),gt=ue)},setFunc:function(ue,an,Mn){($!==ue||nt!==an||yt!==Mn)&&(r.stencilFunc(ue,an,Mn),$=ue,nt=an,yt=Mn)},setOp:function(ue,an,Mn){(xt!==ue||qt!==an||ye!==Mn)&&(r.stencilOp(ue,an,Mn),xt=ue,qt=an,ye=Mn)},setLocked:function(ue){B=ue},setClear:function(ue){De!==ue&&(r.clearStencil(ue),De=ue)},reset:function(){B=!1,gt=null,$=null,nt=null,yt=null,xt=null,qt=null,ye=null,De=null}}}const i=new e,a=new n,o=new s,l=new WeakMap,h=new WeakMap;let u={},d={},f=new WeakMap,c=[],p=null,v=!1,m=null,g=null,T=null,M=null,x=null,S=null,_=null,y=new jt(0,0,0),A=0,E=!1,w=null,b=null,U=null,I=null,F=null;const k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,Z=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),O=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),O=Z>=2);let it=null,rt={};const et=r.getParameter(r.SCISSOR_BOX),Mt=r.getParameter(r.VIEWPORT),Dt=new pe().fromArray(et),N=new pe().fromArray(Mt);function X(B,gt,$,nt){const yt=new Uint8Array(4),xt=r.createTexture();r.bindTexture(B,xt),r.texParameteri(B,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(B,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let qt=0;qt<$;qt++)B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY?r.texImage3D(gt,0,r.RGBA,1,1,nt,0,r.RGBA,r.UNSIGNED_BYTE,yt):r.texImage2D(gt+qt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,yt);return xt}const tt={};tt[r.TEXTURE_2D]=X(r.TEXTURE_2D,r.TEXTURE_2D,1),tt[r.TEXTURE_CUBE_MAP]=X(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[r.TEXTURE_2D_ARRAY]=X(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),tt[r.TEXTURE_3D]=X(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(r.DEPTH_TEST),a.setFunc(Fi),lt(!1),Et(Ua),K(r.CULL_FACE),D(Vn);function K(B){u[B]!==!0&&(r.enable(B),u[B]=!0)}function dt(B){u[B]!==!1&&(r.disable(B),u[B]=!1)}function Lt(B,gt){return d[B]!==gt?(r.bindFramebuffer(B,gt),d[B]=gt,B===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=gt),B===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=gt),!0):!1}function bt(B,gt){let $=c,nt=!1;if(B){$=f.get(gt),$===void 0&&($=[],f.set(gt,$));const yt=B.textures;if($.length!==yt.length||$[0]!==r.COLOR_ATTACHMENT0){for(let xt=0,qt=yt.length;xt<qt;xt++)$[xt]=r.COLOR_ATTACHMENT0+xt;$.length=yt.length,nt=!0}}else $[0]!==r.BACK&&($[0]=r.BACK,nt=!0);nt&&r.drawBuffers($)}function Wt(B){return p!==B?(r.useProgram(B),p=B,!0):!1}const Q={[ni]:r.FUNC_ADD,[ch]:r.FUNC_SUBTRACT,[hh]:r.FUNC_REVERSE_SUBTRACT};Q[uh]=r.MIN,Q[fh]=r.MAX;const at={[dh]:r.ZERO,[ph]:r.ONE,[mh]:r.SRC_COLOR,[yo]:r.SRC_ALPHA,[Mh]:r.SRC_ALPHA_SATURATE,[_h]:r.DST_COLOR,[vh]:r.DST_ALPHA,[gh]:r.ONE_MINUS_SRC_COLOR,[Mo]:r.ONE_MINUS_SRC_ALPHA,[yh]:r.ONE_MINUS_DST_COLOR,[xh]:r.ONE_MINUS_DST_ALPHA,[Sh]:r.CONSTANT_COLOR,[wh]:r.ONE_MINUS_CONSTANT_COLOR,[Eh]:r.CONSTANT_ALPHA,[Th]:r.ONE_MINUS_CONSTANT_ALPHA};function D(B,gt,$,nt,yt,xt,qt,ye,De,ue){if(B===Vn){v===!0&&(dt(r.BLEND),v=!1);return}if(v===!1&&(K(r.BLEND),v=!0),B!==lh){if(B!==m||ue!==E){if((g!==ni||x!==ni)&&(r.blendEquation(r.FUNC_ADD),g=ni,x=ni),ue)switch(B){case Di:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Na:r.blendFunc(r.ONE,r.ONE);break;case Fa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Oa:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Di:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Na:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Fa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Oa:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}T=null,M=null,S=null,_=null,y.set(0,0,0),A=0,m=B,E=ue}return}yt=yt||gt,xt=xt||$,qt=qt||nt,(gt!==g||yt!==x)&&(r.blendEquationSeparate(Q[gt],Q[yt]),g=gt,x=yt),($!==T||nt!==M||xt!==S||qt!==_)&&(r.blendFuncSeparate(at[$],at[nt],at[xt],at[qt]),T=$,M=nt,S=xt,_=qt),(ye.equals(y)===!1||De!==A)&&(r.blendColor(ye.r,ye.g,ye.b,De),y.copy(ye),A=De),m=B,E=!1}function Ut(B,gt){B.side===Fe?dt(r.CULL_FACE):K(r.CULL_FACE);let $=B.side===Ge;gt&&($=!$),lt($),B.blending===Di&&B.transparent===!1?D(Vn):D(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),i.setMask(B.colorWrite);const nt=B.stencilWrite;o.setTest(nt),nt&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),kt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?K(r.SAMPLE_ALPHA_TO_COVERAGE):dt(r.SAMPLE_ALPHA_TO_COVERAGE)}function lt(B){w!==B&&(B?r.frontFace(r.CW):r.frontFace(r.CCW),w=B)}function Et(B){B!==oh?(K(r.CULL_FACE),B!==b&&(B===Ua?r.cullFace(r.BACK):B===ah?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):dt(r.CULL_FACE),b=B}function ft(B){B!==U&&(O&&r.lineWidth(B),U=B)}function kt(B,gt,$){B?(K(r.POLYGON_OFFSET_FILL),(I!==gt||F!==$)&&(r.polygonOffset(gt,$),I=gt,F=$)):dt(r.POLYGON_OFFSET_FILL)}function _t(B){B?K(r.SCISSOR_TEST):dt(r.SCISSOR_TEST)}function L(B){B===void 0&&(B=r.TEXTURE0+k-1),it!==B&&(r.activeTexture(B),it=B)}function C(B,gt,$){$===void 0&&(it===null?$=r.TEXTURE0+k-1:$=it);let nt=rt[$];nt===void 0&&(nt={type:void 0,texture:void 0},rt[$]=nt),(nt.type!==B||nt.texture!==gt)&&(it!==$&&(r.activeTexture($),it=$),r.bindTexture(B,gt||tt[B]),nt.type=B,nt.texture=gt)}function W(){const B=rt[it];B!==void 0&&B.type!==void 0&&(r.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function J(){try{r.compressedTexImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function st(){try{r.compressedTexImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function It(){try{r.texSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function mt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function wt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function te(){try{r.texStorage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ut(){try{r.texStorage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function At(){try{r.texImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function zt(){try{r.texImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Vt(B){Dt.equals(B)===!1&&(r.scissor(B.x,B.y,B.z,B.w),Dt.copy(B))}function Ct(B){N.equals(B)===!1&&(r.viewport(B.x,B.y,B.z,B.w),N.copy(B))}function ie(B,gt){let $=h.get(gt);$===void 0&&($=new WeakMap,h.set(gt,$));let nt=$.get(B);nt===void 0&&(nt=r.getUniformBlockIndex(gt,B.name),$.set(B,nt))}function Kt(B,gt){const nt=h.get(gt).get(B);l.get(gt)!==nt&&(r.uniformBlockBinding(gt,nt,B.__bindingPointIndex),l.set(gt,nt))}function me(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},it=null,rt={},d={},f=new WeakMap,c=[],p=null,v=!1,m=null,g=null,T=null,M=null,x=null,S=null,_=null,y=new jt(0,0,0),A=0,E=!1,w=null,b=null,U=null,I=null,F=null,Dt.set(0,0,r.canvas.width,r.canvas.height),N.set(0,0,r.canvas.width,r.canvas.height),i.reset(),a.reset(),o.reset()}return{buffers:{color:i,depth:a,stencil:o},enable:K,disable:dt,bindFramebuffer:Lt,drawBuffers:bt,useProgram:Wt,setBlending:D,setMaterial:Ut,setFlipSided:lt,setCullFace:Et,setLineWidth:ft,setPolygonOffset:kt,setScissorTest:_t,activeTexture:L,bindTexture:C,unbindTexture:W,compressedTexImage2D:J,compressedTexImage3D:st,texImage2D:At,texImage3D:zt,updateUBOMapping:ie,uniformBlockBinding:Kt,texStorage2D:te,texStorage3D:ut,texSubImage2D:j,texSubImage3D:It,compressedTexSubImage2D:mt,compressedTexSubImage3D:wt,scissor:Vt,viewport:Ct,reset:me}}function $0(r,t,e,n,s,i,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new ot,u=new WeakMap;let d;const f=new WeakMap;let c=!1;try{c=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(L,C){return c?new OffscreenCanvas(L,C):ur("canvas")}function v(L,C,W){let J=1;const st=_t(L);if((st.width>W||st.height>W)&&(J=W/Math.max(st.width,st.height)),J<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const j=Math.floor(J*st.width),It=Math.floor(J*st.height);d===void 0&&(d=p(j,It));const mt=C?p(j,It):d;return mt.width=j,mt.height=It,mt.getContext("2d").drawImage(L,0,0,j,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+j+"x"+It+")."),mt}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),L;return L}function m(L){return L.generateMipmaps}function g(L){r.generateMipmap(L)}function T(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(L,C,W,J,st=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let j=C;if(C===r.RED&&(W===r.FLOAT&&(j=r.R32F),W===r.HALF_FLOAT&&(j=r.R16F),W===r.UNSIGNED_BYTE&&(j=r.R8)),C===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.R8UI),W===r.UNSIGNED_SHORT&&(j=r.R16UI),W===r.UNSIGNED_INT&&(j=r.R32UI),W===r.BYTE&&(j=r.R8I),W===r.SHORT&&(j=r.R16I),W===r.INT&&(j=r.R32I)),C===r.RG&&(W===r.FLOAT&&(j=r.RG32F),W===r.HALF_FLOAT&&(j=r.RG16F),W===r.UNSIGNED_BYTE&&(j=r.RG8)),C===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.RG8UI),W===r.UNSIGNED_SHORT&&(j=r.RG16UI),W===r.UNSIGNED_INT&&(j=r.RG32UI),W===r.BYTE&&(j=r.RG8I),W===r.SHORT&&(j=r.RG16I),W===r.INT&&(j=r.RG32I)),C===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.RGB8UI),W===r.UNSIGNED_SHORT&&(j=r.RGB16UI),W===r.UNSIGNED_INT&&(j=r.RGB32UI),W===r.BYTE&&(j=r.RGB8I),W===r.SHORT&&(j=r.RGB16I),W===r.INT&&(j=r.RGB32I)),C===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),W===r.UNSIGNED_INT&&(j=r.RGBA32UI),W===r.BYTE&&(j=r.RGBA8I),W===r.SHORT&&(j=r.RGBA16I),W===r.INT&&(j=r.RGBA32I)),C===r.RGB&&W===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),C===r.RGBA){const It=st?cr:ae.getTransfer(J);W===r.FLOAT&&(j=r.RGBA32F),W===r.HALF_FLOAT&&(j=r.RGBA16F),W===r.UNSIGNED_BYTE&&(j=It===de?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(L,C){let W;return L?C===null||C===ai||C===zi?W=r.DEPTH24_STENCIL8:C===xn?W=r.DEPTH32F_STENCIL8:C===ls&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===ai||C===zi?W=r.DEPTH_COMPONENT24:C===xn?W=r.DEPTH_COMPONENT32F:C===ls&&(W=r.DEPTH_COMPONENT16),W}function S(L,C){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Ke&&L.minFilter!==vn?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function _(L){const C=L.target;C.removeEventListener("dispose",_),A(C),C.isVideoTexture&&u.delete(C)}function y(L){const C=L.target;C.removeEventListener("dispose",y),w(C)}function A(L){const C=n.get(L);if(C.__webglInit===void 0)return;const W=L.source,J=f.get(W);if(J){const st=J[C.__cacheKey];st.usedTimes--,st.usedTimes===0&&E(L),Object.keys(J).length===0&&f.delete(W)}n.remove(L)}function E(L){const C=n.get(L);r.deleteTexture(C.__webglTexture);const W=L.source,J=f.get(W);delete J[C.__cacheKey],a.memory.textures--}function w(L){const C=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(C.__webglFramebuffer[J]))for(let st=0;st<C.__webglFramebuffer[J].length;st++)r.deleteFramebuffer(C.__webglFramebuffer[J][st]);else r.deleteFramebuffer(C.__webglFramebuffer[J]);C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer[J])}else{if(Array.isArray(C.__webglFramebuffer))for(let J=0;J<C.__webglFramebuffer.length;J++)r.deleteFramebuffer(C.__webglFramebuffer[J]);else r.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&r.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let J=0;J<C.__webglColorRenderbuffer.length;J++)C.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(C.__webglColorRenderbuffer[J]);C.__webglDepthRenderbuffer&&r.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const W=L.textures;for(let J=0,st=W.length;J<st;J++){const j=n.get(W[J]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(W[J])}n.remove(L)}let b=0;function U(){b=0}function I(){const L=b;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),b+=1,L}function F(L){const C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function k(L,C){const W=n.get(L);if(L.isVideoTexture&&ft(L),L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){const J=L.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(W,L,C);return}}e.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+C)}function O(L,C){const W=n.get(L);if(L.version>0&&W.__version!==L.version){N(W,L,C);return}e.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+C)}function Z(L,C){const W=n.get(L);if(L.version>0&&W.__version!==L.version){N(W,L,C);return}e.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+C)}function G(L,C){const W=n.get(L);if(L.version>0&&W.__version!==L.version){X(W,L,C);return}e.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+C)}const it={[lr]:r.REPEAT,[si]:r.CLAMP_TO_EDGE,[Lo]:r.MIRRORED_REPEAT},rt={[Ke]:r.NEAREST,[Uh]:r.NEAREST_MIPMAP_NEAREST,[Ss]:r.NEAREST_MIPMAP_LINEAR,[vn]:r.LINEAR,[br]:r.LINEAR_MIPMAP_NEAREST,[ri]:r.LINEAR_MIPMAP_LINEAR},et={[Bh]:r.NEVER,[Wh]:r.ALWAYS,[zh]:r.LESS,[_c]:r.LEQUAL,[kh]:r.EQUAL,[Gh]:r.GEQUAL,[Vh]:r.GREATER,[Hh]:r.NOTEQUAL};function Mt(L,C){if(C.type===xn&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===vn||C.magFilter===br||C.magFilter===Ss||C.magFilter===ri||C.minFilter===vn||C.minFilter===br||C.minFilter===Ss||C.minFilter===ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,it[C.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,it[C.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,it[C.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,rt[C.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,rt[C.minFilter]),C.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,et[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Ke||C.minFilter!==Ss&&C.minFilter!==ri||C.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");r.texParameterf(L,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function Dt(L,C){let W=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",_));const J=C.source;let st=f.get(J);st===void 0&&(st={},f.set(J,st));const j=F(C);if(j!==L.__cacheKey){st[j]===void 0&&(st[j]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,W=!0),st[j].usedTimes++;const It=st[L.__cacheKey];It!==void 0&&(st[L.__cacheKey].usedTimes--,It.usedTimes===0&&E(C)),L.__cacheKey=j,L.__webglTexture=st[j].texture}return W}function N(L,C,W){let J=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(J=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(J=r.TEXTURE_3D);const st=Dt(L,C),j=C.source;e.bindTexture(J,L.__webglTexture,r.TEXTURE0+W);const It=n.get(j);if(j.version!==It.__version||st===!0){e.activeTexture(r.TEXTURE0+W);const mt=ae.getPrimaries(ae.workingColorSpace),wt=C.colorSpace===Cn?null:ae.getPrimaries(C.colorSpace),te=C.colorSpace===Cn||mt===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ut=v(C.image,!1,s.maxTextureSize);ut=kt(C,ut);const At=i.convert(C.format,C.colorSpace),zt=i.convert(C.type);let Vt=M(C.internalFormat,At,zt,C.colorSpace,C.isVideoTexture);Mt(J,C);let Ct;const ie=C.mipmaps,Kt=C.isVideoTexture!==!0,me=It.__version===void 0||st===!0,B=j.dataReady,gt=S(C,ut);if(C.isDepthTexture)Vt=x(C.format===ki,C.type),me&&(Kt?e.texStorage2D(r.TEXTURE_2D,1,Vt,ut.width,ut.height):e.texImage2D(r.TEXTURE_2D,0,Vt,ut.width,ut.height,0,At,zt,null));else if(C.isDataTexture)if(ie.length>0){Kt&&me&&e.texStorage2D(r.TEXTURE_2D,gt,Vt,ie[0].width,ie[0].height);for(let $=0,nt=ie.length;$<nt;$++)Ct=ie[$],Kt?B&&e.texSubImage2D(r.TEXTURE_2D,$,0,0,Ct.width,Ct.height,At,zt,Ct.data):e.texImage2D(r.TEXTURE_2D,$,Vt,Ct.width,Ct.height,0,At,zt,Ct.data);C.generateMipmaps=!1}else Kt?(me&&e.texStorage2D(r.TEXTURE_2D,gt,Vt,ut.width,ut.height),B&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ut.width,ut.height,At,zt,ut.data)):e.texImage2D(r.TEXTURE_2D,0,Vt,ut.width,ut.height,0,At,zt,ut.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Kt&&me&&e.texStorage3D(r.TEXTURE_2D_ARRAY,gt,Vt,ie[0].width,ie[0].height,ut.depth);for(let $=0,nt=ie.length;$<nt;$++)if(Ct=ie[$],C.format!==pn)if(At!==null)if(Kt){if(B)if(C.layerUpdates.size>0){const yt=yl(Ct.width,Ct.height,C.format,C.type);for(const xt of C.layerUpdates){const qt=Ct.data.subarray(xt*yt/Ct.data.BYTES_PER_ELEMENT,(xt+1)*yt/Ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,xt,Ct.width,Ct.height,1,At,qt)}C.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,Ct.width,Ct.height,ut.depth,At,Ct.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,$,Vt,Ct.width,Ct.height,ut.depth,0,Ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?B&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,Ct.width,Ct.height,ut.depth,At,zt,Ct.data):e.texImage3D(r.TEXTURE_2D_ARRAY,$,Vt,Ct.width,Ct.height,ut.depth,0,At,zt,Ct.data)}else{Kt&&me&&e.texStorage2D(r.TEXTURE_2D,gt,Vt,ie[0].width,ie[0].height);for(let $=0,nt=ie.length;$<nt;$++)Ct=ie[$],C.format!==pn?At!==null?Kt?B&&e.compressedTexSubImage2D(r.TEXTURE_2D,$,0,0,Ct.width,Ct.height,At,Ct.data):e.compressedTexImage2D(r.TEXTURE_2D,$,Vt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?B&&e.texSubImage2D(r.TEXTURE_2D,$,0,0,Ct.width,Ct.height,At,zt,Ct.data):e.texImage2D(r.TEXTURE_2D,$,Vt,Ct.width,Ct.height,0,At,zt,Ct.data)}else if(C.isDataArrayTexture)if(Kt){if(me&&e.texStorage3D(r.TEXTURE_2D_ARRAY,gt,Vt,ut.width,ut.height,ut.depth),B)if(C.layerUpdates.size>0){const $=yl(ut.width,ut.height,C.format,C.type);for(const nt of C.layerUpdates){const yt=ut.data.subarray(nt*$/ut.data.BYTES_PER_ELEMENT,(nt+1)*$/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,nt,ut.width,ut.height,1,At,zt,yt)}C.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,At,zt,ut.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Vt,ut.width,ut.height,ut.depth,0,At,zt,ut.data);else if(C.isData3DTexture)Kt?(me&&e.texStorage3D(r.TEXTURE_3D,gt,Vt,ut.width,ut.height,ut.depth),B&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,At,zt,ut.data)):e.texImage3D(r.TEXTURE_3D,0,Vt,ut.width,ut.height,ut.depth,0,At,zt,ut.data);else if(C.isFramebufferTexture){if(me)if(Kt)e.texStorage2D(r.TEXTURE_2D,gt,Vt,ut.width,ut.height);else{let $=ut.width,nt=ut.height;for(let yt=0;yt<gt;yt++)e.texImage2D(r.TEXTURE_2D,yt,Vt,$,nt,0,At,zt,null),$>>=1,nt>>=1}}else if(ie.length>0){if(Kt&&me){const $=_t(ie[0]);e.texStorage2D(r.TEXTURE_2D,gt,Vt,$.width,$.height)}for(let $=0,nt=ie.length;$<nt;$++)Ct=ie[$],Kt?B&&e.texSubImage2D(r.TEXTURE_2D,$,0,0,At,zt,Ct):e.texImage2D(r.TEXTURE_2D,$,Vt,At,zt,Ct);C.generateMipmaps=!1}else if(Kt){if(me){const $=_t(ut);e.texStorage2D(r.TEXTURE_2D,gt,Vt,$.width,$.height)}B&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,At,zt,ut)}else e.texImage2D(r.TEXTURE_2D,0,Vt,At,zt,ut);m(C)&&g(J),It.__version=j.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function X(L,C,W){if(C.image.length!==6)return;const J=Dt(L,C),st=C.source;e.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+W);const j=n.get(st);if(st.version!==j.__version||J===!0){e.activeTexture(r.TEXTURE0+W);const It=ae.getPrimaries(ae.workingColorSpace),mt=C.colorSpace===Cn?null:ae.getPrimaries(C.colorSpace),wt=C.colorSpace===Cn||It===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const te=C.isCompressedTexture||C.image[0].isCompressedTexture,ut=C.image[0]&&C.image[0].isDataTexture,At=[];for(let nt=0;nt<6;nt++)!te&&!ut?At[nt]=v(C.image[nt],!0,s.maxCubemapSize):At[nt]=ut?C.image[nt].image:C.image[nt],At[nt]=kt(C,At[nt]);const zt=At[0],Vt=i.convert(C.format,C.colorSpace),Ct=i.convert(C.type),ie=M(C.internalFormat,Vt,Ct,C.colorSpace),Kt=C.isVideoTexture!==!0,me=j.__version===void 0||J===!0,B=st.dataReady;let gt=S(C,zt);Mt(r.TEXTURE_CUBE_MAP,C);let $;if(te){Kt&&me&&e.texStorage2D(r.TEXTURE_CUBE_MAP,gt,ie,zt.width,zt.height);for(let nt=0;nt<6;nt++){$=At[nt].mipmaps;for(let yt=0;yt<$.length;yt++){const xt=$[yt];C.format!==pn?Vt!==null?Kt?B&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,0,0,xt.width,xt.height,Vt,xt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,ie,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,0,0,xt.width,xt.height,Vt,Ct,xt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt,ie,xt.width,xt.height,0,Vt,Ct,xt.data)}}}else{if($=C.mipmaps,Kt&&me){$.length>0&&gt++;const nt=_t(At[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,gt,ie,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(ut){Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,At[nt].width,At[nt].height,Vt,Ct,At[nt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ie,At[nt].width,At[nt].height,0,Vt,Ct,At[nt].data);for(let yt=0;yt<$.length;yt++){const qt=$[yt].image[nt].image;Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,0,0,qt.width,qt.height,Vt,Ct,qt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,ie,qt.width,qt.height,0,Vt,Ct,qt.data)}}else{Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Vt,Ct,At[nt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ie,Vt,Ct,At[nt]);for(let yt=0;yt<$.length;yt++){const xt=$[yt];Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,0,0,Vt,Ct,xt.image[nt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt+1,ie,Vt,Ct,xt.image[nt])}}}m(C)&&g(r.TEXTURE_CUBE_MAP),j.__version=st.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function tt(L,C,W,J,st,j){const It=i.convert(W.format,W.colorSpace),mt=i.convert(W.type),wt=M(W.internalFormat,It,mt,W.colorSpace),te=n.get(C),ut=n.get(W);if(ut.__renderTarget=C,!te.__hasExternalTextures){const At=Math.max(1,C.width>>j),zt=Math.max(1,C.height>>j);st===r.TEXTURE_3D||st===r.TEXTURE_2D_ARRAY?e.texImage3D(st,j,wt,At,zt,C.depth,0,It,mt,null):e.texImage2D(st,j,wt,At,zt,0,It,mt,null)}e.bindFramebuffer(r.FRAMEBUFFER,L),Et(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,st,ut.__webglTexture,0,lt(C)):(st===r.TEXTURE_2D||st>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,J,st,ut.__webglTexture,j),e.bindFramebuffer(r.FRAMEBUFFER,null)}function K(L,C,W){if(r.bindRenderbuffer(r.RENDERBUFFER,L),C.depthBuffer){const J=C.depthTexture,st=J&&J.isDepthTexture?J.type:null,j=x(C.stencilBuffer,st),It=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,mt=lt(C);Et(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,mt,j,C.width,C.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,mt,j,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,j,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,It,r.RENDERBUFFER,L)}else{const J=C.textures;for(let st=0;st<J.length;st++){const j=J[st],It=i.convert(j.format,j.colorSpace),mt=i.convert(j.type),wt=M(j.internalFormat,It,mt,j.colorSpace),te=lt(C);W&&Et(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,te,wt,C.width,C.height):Et(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,te,wt,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,wt,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function dt(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(C.depthTexture);J.__renderTarget=C,(!J.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),k(C.depthTexture,0);const st=J.__webglTexture,j=lt(C);if(C.depthTexture.format===Ui)Et(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,st,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,st,0);else if(C.depthTexture.format===ki)Et(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,st,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function Lt(L){const C=n.get(L),W=L.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==L.depthTexture){const J=L.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),J){const st=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,J.removeEventListener("dispose",st)};J.addEventListener("dispose",st),C.__depthDisposeCallback=st}C.__boundDepthTexture=J}if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");dt(C.__webglFramebuffer,L)}else if(W){C.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[J]),C.__webglDepthbuffer[J]===void 0)C.__webglDepthbuffer[J]=r.createRenderbuffer(),K(C.__webglDepthbuffer[J],L,!1);else{const st=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=C.__webglDepthbuffer[J];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,st,r.RENDERBUFFER,j)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),K(C.__webglDepthbuffer,L,!1);else{const J=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,st=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,st),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,st)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function bt(L,C,W){const J=n.get(L);C!==void 0&&tt(J.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&Lt(L)}function Wt(L){const C=L.texture,W=n.get(L),J=n.get(C);L.addEventListener("dispose",y);const st=L.textures,j=L.isWebGLCubeRenderTarget===!0,It=st.length>1;if(It||(J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture()),J.__version=C.version,a.memory.textures++),j){W.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(C.mipmaps&&C.mipmaps.length>0){W.__webglFramebuffer[mt]=[];for(let wt=0;wt<C.mipmaps.length;wt++)W.__webglFramebuffer[mt][wt]=r.createFramebuffer()}else W.__webglFramebuffer[mt]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){W.__webglFramebuffer=[];for(let mt=0;mt<C.mipmaps.length;mt++)W.__webglFramebuffer[mt]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(It)for(let mt=0,wt=st.length;mt<wt;mt++){const te=n.get(st[mt]);te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture(),a.memory.textures++)}if(L.samples>0&&Et(L)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let mt=0;mt<st.length;mt++){const wt=st[mt];W.__webglColorRenderbuffer[mt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[mt]);const te=i.convert(wt.format,wt.colorSpace),ut=i.convert(wt.type),At=M(wt.internalFormat,te,ut,wt.colorSpace,L.isXRRenderTarget===!0),zt=lt(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,zt,At,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,W.__webglColorRenderbuffer[mt])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),K(W.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){e.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture),Mt(r.TEXTURE_CUBE_MAP,C);for(let mt=0;mt<6;mt++)if(C.mipmaps&&C.mipmaps.length>0)for(let wt=0;wt<C.mipmaps.length;wt++)tt(W.__webglFramebuffer[mt][wt],L,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,wt);else tt(W.__webglFramebuffer[mt],L,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(C)&&g(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let mt=0,wt=st.length;mt<wt;mt++){const te=st[mt],ut=n.get(te);e.bindTexture(r.TEXTURE_2D,ut.__webglTexture),Mt(r.TEXTURE_2D,te),tt(W.__webglFramebuffer,L,te,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,0),m(te)&&g(r.TEXTURE_2D)}e.unbindTexture()}else{let mt=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(mt=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(mt,J.__webglTexture),Mt(mt,C),C.mipmaps&&C.mipmaps.length>0)for(let wt=0;wt<C.mipmaps.length;wt++)tt(W.__webglFramebuffer[wt],L,C,r.COLOR_ATTACHMENT0,mt,wt);else tt(W.__webglFramebuffer,L,C,r.COLOR_ATTACHMENT0,mt,0);m(C)&&g(mt),e.unbindTexture()}L.depthBuffer&&Lt(L)}function Q(L){const C=L.textures;for(let W=0,J=C.length;W<J;W++){const st=C[W];if(m(st)){const j=T(L),It=n.get(st).__webglTexture;e.bindTexture(j,It),g(j),e.unbindTexture()}}}const at=[],D=[];function Ut(L){if(L.samples>0){if(Et(L)===!1){const C=L.textures,W=L.width,J=L.height;let st=r.COLOR_BUFFER_BIT;const j=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,It=n.get(L),mt=C.length>1;if(mt)for(let wt=0;wt<C.length;wt++)e.bindFramebuffer(r.FRAMEBUFFER,It.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,It.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let wt=0;wt<C.length;wt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(st|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(st|=r.STENCIL_BUFFER_BIT)),mt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,It.__webglColorRenderbuffer[wt]);const te=n.get(C[wt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,te,0)}r.blitFramebuffer(0,0,W,J,0,0,W,J,st,r.NEAREST),l===!0&&(at.length=0,D.length=0,at.push(r.COLOR_ATTACHMENT0+wt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(at.push(j),D.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,D)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,at))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),mt)for(let wt=0;wt<C.length;wt++){e.bindFramebuffer(r.FRAMEBUFFER,It.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,It.__webglColorRenderbuffer[wt]);const te=n.get(C[wt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,It.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,te,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const C=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}}function lt(L){return Math.min(s.maxSamples,L.samples)}function Et(L){const C=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function ft(L){const C=a.render.frame;u.get(L)!==C&&(u.set(L,C),L.update())}function kt(L,C){const W=L.colorSpace,J=L.format,st=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||W!==Vi&&W!==Cn&&(ae.getTransfer(W)===de?(J!==pn||st!==In)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),C}function _t(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(h.width=L.naturalWidth||L.width,h.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(h.width=L.displayWidth,h.height=L.displayHeight):(h.width=L.width,h.height=L.height),h}this.allocateTextureUnit=I,this.resetTextureUnits=U,this.setTexture2D=k,this.setTexture2DArray=O,this.setTexture3D=Z,this.setTextureCube=G,this.rebindTextures=bt,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=Lt,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=Et}function K0(r,t){function e(n,s=Cn){let i;const a=ae.getTransfer(s);if(n===In)return r.UNSIGNED_BYTE;if(n===ha)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ua)return r.UNSIGNED_SHORT_5_5_5_1;if(n===uc)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===cc)return r.BYTE;if(n===hc)return r.SHORT;if(n===ls)return r.UNSIGNED_SHORT;if(n===ca)return r.INT;if(n===ai)return r.UNSIGNED_INT;if(n===xn)return r.FLOAT;if(n===ds)return r.HALF_FLOAT;if(n===fc)return r.ALPHA;if(n===dc)return r.RGB;if(n===pn)return r.RGBA;if(n===pc)return r.LUMINANCE;if(n===mc)return r.LUMINANCE_ALPHA;if(n===Ui)return r.DEPTH_COMPONENT;if(n===ki)return r.DEPTH_STENCIL;if(n===fa)return r.RED;if(n===da)return r.RED_INTEGER;if(n===gc)return r.RG;if(n===pa)return r.RG_INTEGER;if(n===ma)return r.RGBA_INTEGER;if(n===tr||n===er||n===nr||n===ir)if(a===de)if(i=t.get("WEBGL_compressed_texture_s3tc_srgb"),i!==null){if(n===tr)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===er)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===nr)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ir)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get("WEBGL_compressed_texture_s3tc"),i!==null){if(n===tr)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===er)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===nr)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ir)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Io||n===Do||n===Uo||n===No)if(i=t.get("WEBGL_compressed_texture_pvrtc"),i!==null){if(n===Io)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Do)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uo)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===No)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fo||n===Oo||n===Bo)if(i=t.get("WEBGL_compressed_texture_etc"),i!==null){if(n===Fo||n===Oo)return a===de?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===Bo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===zo||n===ko||n===Vo||n===Ho||n===Go||n===Wo||n===Xo||n===Yo||n===qo||n===Zo||n===$o||n===Ko||n===Jo||n===jo)if(i=t.get("WEBGL_compressed_texture_astc"),i!==null){if(n===zo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ko)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ho)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Go)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Zo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$o)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ko)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Jo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===jo)return a===de?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===sr||n===Qo||n===ta)if(i=t.get("EXT_texture_compression_bptc"),i!==null){if(n===sr)return a===de?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qo)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ta)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vc||n===ea||n===na||n===ia)if(i=t.get("EXT_texture_compression_rgtc"),i!==null){if(n===sr)return i.COMPRESSED_RED_RGTC1_EXT;if(n===ea)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===na)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ia)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}const J0={type:"move"};class ro{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,i=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),g=this._getHandJoint(h,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],f=u.position.distanceTo(d.position),c=.02,p=.005;h.inputState.pinching&&f>c+p?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&f<=c-p&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(i=e.getPose(t.gripSpace,n),i!==null&&(l.matrix.fromArray(i.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,i.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(i.linearVelocity)):l.hasLinearVelocity=!1,i.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(i.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&i!==null&&(s=i),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(J0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=i!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new fe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const j0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Q0=`
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

}`;class tg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Oe,i=t.properties.get(s);i.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Wn({vertexShader:j0,fragmentShader:Q0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ft(new ve(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class eg extends Gi{constructor(t,e){super();const n=this;let s=null,i=1,a=null,o="local-floor",l=1,h=null,u=null,d=null,f=null,c=null,p=null;const v=new tg,m=e.getContextAttributes();let g=null,T=null;const M=[],x=[],S=new ot;let _=null;const y=new $e;y.viewport=new pe;const A=new $e;A.viewport=new pe;const E=[y,A],w=new yf;let b=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let X=M[N];return X===void 0&&(X=new ro,M[N]=X),X.getTargetRaySpace()},this.getControllerGrip=function(N){let X=M[N];return X===void 0&&(X=new ro,M[N]=X),X.getGripSpace()},this.getHand=function(N){let X=M[N];return X===void 0&&(X=new ro,M[N]=X),X.getHandSpace()};function I(N){const X=x.indexOf(N.inputSource);if(X===-1)return;const tt=M[X];tt!==void 0&&(tt.update(N.inputSource,N.frame,h||a),tt.dispatchEvent({type:N.type,data:N.inputSource}))}function F(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",k);for(let N=0;N<M.length;N++){const X=x[N];X!==null&&(x[N]=null,M[N].disconnect(X))}b=null,U=null,v.reset(),t.setRenderTarget(g),c=null,f=null,d=null,s=null,T=null,Dt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){i=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){o=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(N){h=N},this.getBaseLayer=function(){return f!==null?f:c},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(N){if(s=N,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",F),s.addEventListener("inputsourceschange",k),m.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(S),s.renderState.layers===void 0){const X={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:i};c=new XRWebGLLayer(s,e,X),s.updateRenderState({baseLayer:c}),t.setPixelRatio(1),t.setSize(c.framebufferWidth,c.framebufferHeight,!1),T=new li(c.framebufferWidth,c.framebufferHeight,{format:pn,type:In,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let X=null,tt=null,K=null;m.depth&&(K=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,X=m.stencil?ki:Ui,tt=m.stencil?zi:ai);const dt={colorFormat:e.RGBA8,depthFormat:K,scaleFactor:i};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(dt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new li(f.textureWidth,f.textureHeight,{format:pn,type:In,depthTexture:new Lc(f.textureWidth,f.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await s.requestReferenceSpace(o),Dt.setContext(s),Dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function k(N){for(let X=0;X<N.removed.length;X++){const tt=N.removed[X],K=x.indexOf(tt);K>=0&&(x[K]=null,M[K].disconnect(tt))}for(let X=0;X<N.added.length;X++){const tt=N.added[X];let K=x.indexOf(tt);if(K===-1){for(let Lt=0;Lt<M.length;Lt++)if(Lt>=x.length){x.push(tt),K=Lt;break}else if(x[Lt]===null){x[Lt]=tt,K=Lt;break}if(K===-1)break}const dt=M[K];dt&&dt.connect(tt)}}const O=new P,Z=new P;function G(N,X,tt){O.setFromMatrixPosition(X.matrixWorld),Z.setFromMatrixPosition(tt.matrixWorld);const K=O.distanceTo(Z),dt=X.projectionMatrix.elements,Lt=tt.projectionMatrix.elements,bt=dt[14]/(dt[10]-1),Wt=dt[14]/(dt[10]+1),Q=(dt[9]+1)/dt[5],at=(dt[9]-1)/dt[5],D=(dt[8]-1)/dt[0],Ut=(Lt[8]+1)/Lt[0],lt=bt*D,Et=bt*Ut,ft=K/(-D+Ut),kt=ft*-D;if(X.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(kt),N.translateZ(ft),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),dt[10]===-1)N.projectionMatrix.copy(X.projectionMatrix),N.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const _t=bt+ft,L=Wt+ft,C=lt-kt,W=Et+(K-kt),J=Q*Wt/L*_t,st=at*Wt/L*_t;N.projectionMatrix.makePerspective(C,W,J,st,_t,L),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function it(N,X){X===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(X.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(s===null)return;let X=N.near,tt=N.far;v.texture!==null&&(v.depthNear>0&&(X=v.depthNear),v.depthFar>0&&(tt=v.depthFar)),w.near=A.near=y.near=X,w.far=A.far=y.far=tt,(b!==w.near||U!==w.far)&&(s.updateRenderState({depthNear:w.near,depthFar:w.far}),b=w.near,U=w.far),y.layers.mask=N.layers.mask|2,A.layers.mask=N.layers.mask|4,w.layers.mask=y.layers.mask|A.layers.mask;const K=N.parent,dt=w.cameras;it(w,K);for(let Lt=0;Lt<dt.length;Lt++)it(dt[Lt],K);dt.length===2?G(w,y,A):w.projectionMatrix.copy(y.projectionMatrix),rt(N,w,K)};function rt(N,X,tt){tt===null?N.matrix.copy(X.matrixWorld):(N.matrix.copy(tt.matrixWorld),N.matrix.invert(),N.matrix.multiply(X.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(X.projectionMatrix),N.projectionMatrixInverse.copy(X.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=cs*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(f===null&&c===null))return l},this.setFoveation=function(N){l=N,f!==null&&(f.fixedFoveation=N),c!==null&&c.fixedFoveation!==void 0&&(c.fixedFoveation=N)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(w)};let et=null;function Mt(N,X){if(u=X.getViewerPose(h||a),p=X,u!==null){const tt=u.views;c!==null&&(t.setRenderTargetFramebuffer(T,c.framebuffer),t.setRenderTarget(T));let K=!1;tt.length!==w.cameras.length&&(w.cameras.length=0,K=!0);for(let Lt=0;Lt<tt.length;Lt++){const bt=tt[Lt];let Wt=null;if(c!==null)Wt=c.getViewport(bt);else{const at=d.getViewSubImage(f,bt);Wt=at.viewport,Lt===0&&(t.setRenderTargetTextures(T,at.colorTexture,f.ignoreDepthValues?void 0:at.depthStencilTexture),t.setRenderTarget(T))}let Q=E[Lt];Q===void 0&&(Q=new $e,Q.layers.enable(Lt),Q.viewport=new pe,E[Lt]=Q),Q.matrix.fromArray(bt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(bt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Wt.x,Wt.y,Wt.width,Wt.height),Lt===0&&(w.matrix.copy(Q.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),K===!0&&w.cameras.push(Q)}const dt=s.enabledFeatures;if(dt&&dt.includes("depth-sensing")){const Lt=d.getDepthInformation(tt[0]);Lt&&Lt.isValid&&Lt.texture&&v.init(t,Lt,s.renderState)}}for(let tt=0;tt<M.length;tt++){const K=x[tt],dt=M[tt];K!==null&&dt!==void 0&&dt.update(K,X,h||a)}et&&et(N,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),p=null}const Dt=new Wc;Dt.setAnimationLoop(Mt),this.setAnimationLoop=function(N){et=N},this.dispose=function(){}}}const Qn=new _n,ng=new ee;function ig(r,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Ac(r)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,T,M,x){g.isMeshBasicMaterial||g.isMeshLambertMaterial?i(m,g):g.isMeshToonMaterial?(i(m,g),d(m,g)):g.isMeshPhongMaterial?(i(m,g),u(m,g)):g.isMeshStandardMaterial?(i(m,g),f(m,g),g.isMeshPhysicalMaterial&&c(m,g,x)):g.isMeshMatcapMaterial?(i(m,g),p(m,g)):g.isMeshDepthMaterial?i(m,g):g.isMeshDistanceMaterial?(i(m,g),v(m,g)):g.isMeshNormalMaterial?i(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,T,M):g.isSpriteMaterial?h(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function i(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Ge&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Ge&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const T=t.get(g),M=T.envMap,x=T.envMapRotation;M&&(m.envMap.value=M,Qn.copy(x),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),m.envMapRotation.value.setFromMatrix4(ng.makeRotationFromEuler(Qn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,T,M){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*T,m.scale.value=M*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function d(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function c(m,g,T){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Ge&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){const T=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function sg(r,t,e,n){let s={},i={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,M){const x=M.program;n.uniformBlockBinding(T,x)}function h(T,M){let x=s[T.id];x===void 0&&(p(T),x=u(T),s[T.id]=x,T.addEventListener("dispose",m));const S=M.program;n.updateUBOMapping(T,S);const _=t.render.frame;i[T.id]!==_&&(f(T),i[T.id]=_)}function u(T){const M=d();T.__bindingPointIndex=M;const x=r.createBuffer(),S=T.__size,_=T.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,S,_),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,x),x}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const M=s[T.id],x=T.uniforms,S=T.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let _=0,y=x.length;_<y;_++){const A=Array.isArray(x[_])?x[_]:[x[_]];for(let E=0,w=A.length;E<w;E++){const b=A[E];if(c(b,_,E,S)===!0){const U=b.__offset,I=Array.isArray(b.value)?b.value:[b.value];let F=0;for(let k=0;k<I.length;k++){const O=I[k],Z=v(O);typeof O=="number"||typeof O=="boolean"?(b.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,U+F,b.__data)):O.isMatrix3?(b.__data[0]=O.elements[0],b.__data[1]=O.elements[1],b.__data[2]=O.elements[2],b.__data[3]=0,b.__data[4]=O.elements[3],b.__data[5]=O.elements[4],b.__data[6]=O.elements[5],b.__data[7]=0,b.__data[8]=O.elements[6],b.__data[9]=O.elements[7],b.__data[10]=O.elements[8],b.__data[11]=0):(O.toArray(b.__data,F),F+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,b.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function c(T,M,x,S){const _=T.value,y=M+"_"+x;if(S[y]===void 0)return typeof _=="number"||typeof _=="boolean"?S[y]=_:S[y]=_.clone(),!0;{const A=S[y];if(typeof _=="number"||typeof _=="boolean"){if(A!==_)return S[y]=_,!0}else if(A.equals(_)===!1)return A.copy(_),!0}return!1}function p(T){const M=T.uniforms;let x=0;const S=16;for(let y=0,A=M.length;y<A;y++){const E=Array.isArray(M[y])?M[y]:[M[y]];for(let w=0,b=E.length;w<b;w++){const U=E[w],I=Array.isArray(U.value)?U.value:[U.value];for(let F=0,k=I.length;F<k;F++){const O=I[F],Z=v(O),G=x%S,it=G%Z.boundary,rt=G+it;x+=it,rt!==0&&S-rt<Z.storage&&(x+=S-rt),U.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=Z.storage}}}const _=x%S;return _>0&&(x+=S-_),T.__size=x,T.__cache={},this}function v(T){const M={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(M.boundary=4,M.storage=4):T.isVector2?(M.boundary=8,M.storage=8):T.isVector3||T.isColor?(M.boundary=16,M.storage=12):T.isVector4?(M.boundary=16,M.storage=16):T.isMatrix3?(M.boundary=48,M.storage=48):T.isMatrix4?(M.boundary=64,M.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),M}function m(T){const M=T.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),r.deleteBuffer(s[M.id]),delete s[M.id],delete i[M.id]}function g(){for(const T in s)r.deleteBuffer(s[T]);a=[],s={},i={}}return{bind:l,update:h,dispose:g}}class rg{constructor(t={}){const{canvas:e=au(),context:n=null,depth:s=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let c;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");c=n.getContextAttributes().alpha}else c=a;const p=new Uint32Array(4),v=new Int32Array(4);let m=null,g=null;const T=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ie,this.toneMapping=Hn,this.toneMappingExposure=1;const x=this;let S=!1,_=0,y=0,A=null,E=-1,w=null;const b=new pe,U=new pe;let I=null;const F=new jt(0);let k=0,O=e.width,Z=e.height,G=1,it=null,rt=null;const et=new pe(0,0,O,Z),Mt=new pe(0,0,O,Z);let Dt=!1;const N=new _a;let X=!1,tt=!1;const K=new ee,dt=new ee,Lt=new P,bt=new pe,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function at(){return A===null?G:1}let D=n;function Ut(R,z){return e.getContext(R,z)}try{const R={alpha:!0,depth:s,stencil:i,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${pr}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",xt,!1),D===null){const z="webgl2";if(D=Ut(z,R),D===null)throw Ut(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let lt,Et,ft,kt,_t,L,C,W,J,st,j,It,mt,wt,te,ut,At,zt,Vt,Ct,ie,Kt,me,B;function gt(){lt=new pm(D),lt.init(),Kt=new K0(D,lt),Et=new lm(D,lt,t,Kt),ft=new Z0(D,lt),Et.reverseDepthBuffer&&f&&ft.buffers.depth.setReversed(!0),kt=new vm(D),_t=new N0,L=new $0(D,lt,ft,_t,Et,Kt,kt),C=new hm(x),W=new dm(x),J=new Ef(D),me=new om(D,J),st=new mm(D,J,kt,me),j=new _m(D,st,J,kt),Vt=new xm(D,Et,L),ut=new cm(_t),It=new U0(x,C,W,lt,Et,me,ut),mt=new ig(x,_t),wt=new O0,te=new G0(lt),zt=new rm(x,C,W,ft,j,c,l),At=new Y0(x,j,Et),B=new sg(D,kt,Et,ft),Ct=new am(D,lt,kt),ie=new gm(D,lt,kt),kt.programs=It.programs,x.capabilities=Et,x.extensions=lt,x.properties=_t,x.renderLists=wt,x.shadowMap=At,x.state=ft,x.info=kt}gt();const $=new eg(x,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const R=lt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=lt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(R){R!==void 0&&(G=R,this.setSize(O,Z,!1))},this.getSize=function(R){return R.set(O,Z)},this.setSize=function(R,z,Y=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=R,Z=z,e.width=Math.floor(R*G),e.height=Math.floor(z*G),Y===!0&&(e.style.width=R+"px",e.style.height=z+"px"),this.setViewport(0,0,R,z)},this.getDrawingBufferSize=function(R){return R.set(O*G,Z*G).floor()},this.setDrawingBufferSize=function(R,z,Y){O=R,Z=z,G=Y,e.width=Math.floor(R*Y),e.height=Math.floor(z*Y),this.setViewport(0,0,R,z)},this.getCurrentViewport=function(R){return R.copy(b)},this.getViewport=function(R){return R.copy(et)},this.setViewport=function(R,z,Y,q){R.isVector4?et.set(R.x,R.y,R.z,R.w):et.set(R,z,Y,q),ft.viewport(b.copy(et).multiplyScalar(G).round())},this.getScissor=function(R){return R.copy(Mt)},this.setScissor=function(R,z,Y,q){R.isVector4?Mt.set(R.x,R.y,R.z,R.w):Mt.set(R,z,Y,q),ft.scissor(U.copy(Mt).multiplyScalar(G).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(R){ft.setScissorTest(Dt=R)},this.setOpaqueSort=function(R){it=R},this.setTransparentSort=function(R){rt=R},this.getClearColor=function(R){return R.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(R=!0,z=!0,Y=!0){let q=0;if(R){let V=!1;if(A!==null){const ht=A.texture.format;V=ht===ma||ht===pa||ht===da}if(V){const ht=A.texture.type,vt=ht===In||ht===ai||ht===ls||ht===zi||ht===ha||ht===ua,Tt=zt.getClearColor(),Rt=zt.getClearAlpha(),Ht=Tt.r,Xt=Tt.g,Ot=Tt.b;vt?(p[0]=Ht,p[1]=Xt,p[2]=Ot,p[3]=Rt,D.clearBufferuiv(D.COLOR,0,p)):(v[0]=Ht,v[1]=Xt,v[2]=Ot,v[3]=Rt,D.clearBufferiv(D.COLOR,0,v))}else q|=D.COLOR_BUFFER_BIT}z&&(q|=D.DEPTH_BUFFER_BIT),Y&&(q|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),zt.dispose(),wt.dispose(),te.dispose(),_t.dispose(),C.dispose(),W.dispose(),j.dispose(),me.dispose(),B.dispose(),It.dispose(),$.dispose(),$.removeEventListener("sessionstart",Aa),$.removeEventListener("sessionend",Ca),Yn.stop()};function nt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const R=kt.autoReset,z=At.enabled,Y=At.autoUpdate,q=At.needsUpdate,V=At.type;gt(),kt.autoReset=R,At.enabled=z,At.autoUpdate=Y,At.needsUpdate=q,At.type=V}function xt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function qt(R){const z=R.target;z.removeEventListener("dispose",qt),ye(z)}function ye(R){De(R),_t.remove(R)}function De(R){const z=_t.get(R).programs;z!==void 0&&(z.forEach(function(Y){It.releaseProgram(Y)}),R.isShaderMaterial&&It.releaseShaderCache(R))}this.renderBufferDirect=function(R,z,Y,q,V,ht){z===null&&(z=Wt);const vt=V.isMesh&&V.matrixWorld.determinant()<0,Tt=Qc(R,z,Y,q,V);ft.setMaterial(q,vt);let Rt=Y.index,Ht=1;if(q.wireframe===!0){if(Rt=st.getWireframeAttribute(Y),Rt===void 0)return;Ht=2}const Xt=Y.drawRange,Ot=Y.attributes.position;let se=Xt.start*Ht,ce=(Xt.start+Xt.count)*Ht;ht!==null&&(se=Math.max(se,ht.start*Ht),ce=Math.min(ce,(ht.start+ht.count)*Ht)),Rt!==null?(se=Math.max(se,0),ce=Math.min(ce,Rt.count)):Ot!=null&&(se=Math.max(se,0),ce=Math.min(ce,Ot.count));const Se=ce-se;if(Se<0||Se===1/0)return;me.setup(V,q,Tt,Y,Rt);let Me,re=Ct;if(Rt!==null&&(Me=J.get(Rt),re=ie,re.setIndex(Me)),V.isMesh)q.wireframe===!0?(ft.setLineWidth(q.wireframeLinewidth*at()),re.setMode(D.LINES)):re.setMode(D.TRIANGLES);else if(V.isLine){let Bt=q.linewidth;Bt===void 0&&(Bt=1),ft.setLineWidth(Bt*at()),V.isLineSegments?re.setMode(D.LINES):V.isLineLoop?re.setMode(D.LINE_LOOP):re.setMode(D.LINE_STRIP)}else V.isPoints?re.setMode(D.POINTS):V.isSprite&&re.setMode(D.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)re.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(lt.get("WEBGL_multi_draw"))re.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Bt=V._multiDrawStarts,Re=V._multiDrawCounts,he=V._multiDrawCount,ln=Rt?J.get(Rt).bytesPerElement:1,fi=_t.get(q).currentProgram.getUniforms();for(let Ye=0;Ye<he;Ye++)fi.setValue(D,"_gl_DrawID",Ye),re.render(Bt[Ye]/ln,Re[Ye])}else if(V.isInstancedMesh)re.renderInstances(se,Se,V.count);else if(Y.isInstancedBufferGeometry){const Bt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Re=Math.min(Y.instanceCount,Bt);re.renderInstances(se,Se,Re)}else re.render(se,Se)};function ue(R,z,Y){R.transparent===!0&&R.side===Fe&&R.forceSinglePass===!1?(R.side=Ge,R.needsUpdate=!0,Ms(R,z,Y),R.side=Gn,R.needsUpdate=!0,Ms(R,z,Y),R.side=Fe):Ms(R,z,Y)}this.compile=function(R,z,Y=null){Y===null&&(Y=R),g=te.get(Y),g.init(z),M.push(g),Y.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(g.pushLight(V),V.castShadow&&g.pushShadow(V))}),R!==Y&&R.traverseVisible(function(V){V.isLight&&V.layers.test(z.layers)&&(g.pushLight(V),V.castShadow&&g.pushShadow(V))}),g.setupLights();const q=new Set;return R.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ht=V.material;if(ht)if(Array.isArray(ht))for(let vt=0;vt<ht.length;vt++){const Tt=ht[vt];ue(Tt,Y,V),q.add(Tt)}else ue(ht,Y,V),q.add(ht)}),M.pop(),g=null,q},this.compileAsync=function(R,z,Y=null){const q=this.compile(R,z,Y);return new Promise(V=>{function ht(){if(q.forEach(function(vt){_t.get(vt).currentProgram.isReady()&&q.delete(vt)}),q.size===0){V(R);return}setTimeout(ht,10)}lt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let an=null;function Mn(R){an&&an(R)}function Aa(){Yn.stop()}function Ca(){Yn.start()}const Yn=new Wc;Yn.setAnimationLoop(Mn),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(R){an=R,$.setAnimationLoop(R),R===null?Yn.stop():Yn.start()},$.addEventListener("sessionstart",Aa),$.addEventListener("sessionend",Ca),this.render=function(R,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(z),z=$.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,z,A),g=te.get(R,M.length),g.init(z),M.push(g),dt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),N.setFromProjectionMatrix(dt),tt=this.localClippingEnabled,X=ut.init(this.clippingPlanes,tt),m=wt.get(R,T.length),m.init(),T.push(m),$.enabled===!0&&$.isPresenting===!0){const ht=x.xr.getDepthSensingMesh();ht!==null&&Er(ht,z,-1/0,x.sortObjects)}Er(R,z,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(it,rt),Q=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Q&&zt.addToRenderList(m,R),this.info.render.frame++,X===!0&&ut.beginShadows();const Y=g.state.shadowsArray;At.render(Y,R,z),X===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,V=m.transmissive;if(g.setupLights(),z.isArrayCamera){const ht=z.cameras;if(V.length>0)for(let vt=0,Tt=ht.length;vt<Tt;vt++){const Rt=ht[vt];Pa(q,V,R,Rt)}Q&&zt.render(R);for(let vt=0,Tt=ht.length;vt<Tt;vt++){const Rt=ht[vt];Ra(m,R,Rt,Rt.viewport)}}else V.length>0&&Pa(q,V,R,z),Q&&zt.render(R),Ra(m,R,z);A!==null&&(L.updateMultisampleRenderTarget(A),L.updateRenderTargetMipmap(A)),R.isScene===!0&&R.onAfterRender(x,R,z),me.resetDefaultState(),E=-1,w=null,M.pop(),M.length>0?(g=M[M.length-1],X===!0&&ut.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Er(R,z,Y,q){if(R.visible===!1)return;if(R.layers.test(z.layers)){if(R.isGroup)Y=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(z);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||N.intersectsSprite(R)){q&&bt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(dt);const vt=j.update(R),Tt=R.material;Tt.visible&&m.push(R,vt,Tt,Y,bt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||N.intersectsObject(R))){const vt=j.update(R),Tt=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),bt.copy(R.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),bt.copy(vt.boundingSphere.center)),bt.applyMatrix4(R.matrixWorld).applyMatrix4(dt)),Array.isArray(Tt)){const Rt=vt.groups;for(let Ht=0,Xt=Rt.length;Ht<Xt;Ht++){const Ot=Rt[Ht],se=Tt[Ot.materialIndex];se&&se.visible&&m.push(R,vt,se,Y,bt.z,Ot)}}else Tt.visible&&m.push(R,vt,Tt,Y,bt.z,null)}}const ht=R.children;for(let vt=0,Tt=ht.length;vt<Tt;vt++)Er(ht[vt],z,Y,q)}function Ra(R,z,Y,q){const V=R.opaque,ht=R.transmissive,vt=R.transparent;g.setupLightsView(Y),X===!0&&ut.setGlobalState(x.clippingPlanes,Y),q&&ft.viewport(b.copy(q)),V.length>0&&ys(V,z,Y),ht.length>0&&ys(ht,z,Y),vt.length>0&&ys(vt,z,Y),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function Pa(R,z,Y,q){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[q.id]===void 0&&(g.state.transmissionRenderTarget[q.id]=new li(1,1,{generateMipmaps:!0,type:lt.has("EXT_color_buffer_half_float")||lt.has("EXT_color_buffer_float")?ds:In,minFilter:ri,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));const ht=g.state.transmissionRenderTarget[q.id],vt=q.viewport||b;ht.setSize(vt.z,vt.w);const Tt=x.getRenderTarget();x.setRenderTarget(ht),x.getClearColor(F),k=x.getClearAlpha(),k<1&&x.setClearColor(16777215,.5),x.clear(),Q&&zt.render(Y);const Rt=x.toneMapping;x.toneMapping=Hn;const Ht=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),g.setupLightsView(q),X===!0&&ut.setGlobalState(x.clippingPlanes,q),ys(R,Y,q),L.updateMultisampleRenderTarget(ht),L.updateRenderTargetMipmap(ht),lt.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let Ot=0,se=z.length;Ot<se;Ot++){const ce=z[Ot],Se=ce.object,Me=ce.geometry,re=ce.material,Bt=ce.group;if(re.side===Fe&&Se.layers.test(q.layers)){const Re=re.side;re.side=Ge,re.needsUpdate=!0,La(Se,Y,q,Me,re,Bt),re.side=Re,re.needsUpdate=!0,Xt=!0}}Xt===!0&&(L.updateMultisampleRenderTarget(ht),L.updateRenderTargetMipmap(ht))}x.setRenderTarget(Tt),x.setClearColor(F,k),Ht!==void 0&&(q.viewport=Ht),x.toneMapping=Rt}function ys(R,z,Y){const q=z.isScene===!0?z.overrideMaterial:null;for(let V=0,ht=R.length;V<ht;V++){const vt=R[V],Tt=vt.object,Rt=vt.geometry,Ht=q===null?vt.material:q,Xt=vt.group;Tt.layers.test(Y.layers)&&La(Tt,z,Y,Rt,Ht,Xt)}}function La(R,z,Y,q,V,ht){R.onBeforeRender(x,z,Y,q,V,ht),R.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),V.onBeforeRender(x,z,Y,q,R,ht),V.transparent===!0&&V.side===Fe&&V.forceSinglePass===!1?(V.side=Ge,V.needsUpdate=!0,x.renderBufferDirect(Y,z,q,V,R,ht),V.side=Gn,V.needsUpdate=!0,x.renderBufferDirect(Y,z,q,V,R,ht),V.side=Fe):x.renderBufferDirect(Y,z,q,V,R,ht),R.onAfterRender(x,z,Y,q,V,ht)}function Ms(R,z,Y){z.isScene!==!0&&(z=Wt);const q=_t.get(R),V=g.state.lights,ht=g.state.shadowsArray,vt=V.state.version,Tt=It.getParameters(R,V.state,ht,z,Y),Rt=It.getProgramCacheKey(Tt);let Ht=q.programs;q.environment=R.isMeshStandardMaterial?z.environment:null,q.fog=z.fog,q.envMap=(R.isMeshStandardMaterial?W:C).get(R.envMap||q.environment),q.envMapRotation=q.environment!==null&&R.envMap===null?z.environmentRotation:R.envMapRotation,Ht===void 0&&(R.addEventListener("dispose",qt),Ht=new Map,q.programs=Ht);let Xt=Ht.get(Rt);if(Xt!==void 0){if(q.currentProgram===Xt&&q.lightsStateVersion===vt)return Da(R,Tt),Xt}else Tt.uniforms=It.getUniforms(R),R.onBeforeCompile(Tt,x),Xt=It.acquireProgram(Tt,Rt),Ht.set(Rt,Xt),q.uniforms=Tt.uniforms;const Ot=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ot.clippingPlanes=ut.uniform),Da(R,Tt),q.needsLights=eh(R),q.lightsStateVersion=vt,q.needsLights&&(Ot.ambientLightColor.value=V.state.ambient,Ot.lightProbe.value=V.state.probe,Ot.directionalLights.value=V.state.directional,Ot.directionalLightShadows.value=V.state.directionalShadow,Ot.spotLights.value=V.state.spot,Ot.spotLightShadows.value=V.state.spotShadow,Ot.rectAreaLights.value=V.state.rectArea,Ot.ltc_1.value=V.state.rectAreaLTC1,Ot.ltc_2.value=V.state.rectAreaLTC2,Ot.pointLights.value=V.state.point,Ot.pointLightShadows.value=V.state.pointShadow,Ot.hemisphereLights.value=V.state.hemi,Ot.directionalShadowMap.value=V.state.directionalShadowMap,Ot.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ot.spotShadowMap.value=V.state.spotShadowMap,Ot.spotLightMatrix.value=V.state.spotLightMatrix,Ot.spotLightMap.value=V.state.spotLightMap,Ot.pointShadowMap.value=V.state.pointShadowMap,Ot.pointShadowMatrix.value=V.state.pointShadowMatrix),q.currentProgram=Xt,q.uniformsList=null,Xt}function Ia(R){if(R.uniformsList===null){const z=R.currentProgram.getUniforms();R.uniformsList=rr.seqWithValue(z.seq,R.uniforms)}return R.uniformsList}function Da(R,z){const Y=_t.get(R);Y.outputColorSpace=z.outputColorSpace,Y.batching=z.batching,Y.batchingColor=z.batchingColor,Y.instancing=z.instancing,Y.instancingColor=z.instancingColor,Y.instancingMorph=z.instancingMorph,Y.skinning=z.skinning,Y.morphTargets=z.morphTargets,Y.morphNormals=z.morphNormals,Y.morphColors=z.morphColors,Y.morphTargetsCount=z.morphTargetsCount,Y.numClippingPlanes=z.numClippingPlanes,Y.numIntersection=z.numClipIntersection,Y.vertexAlphas=z.vertexAlphas,Y.vertexTangents=z.vertexTangents,Y.toneMapping=z.toneMapping}function Qc(R,z,Y,q,V){z.isScene!==!0&&(z=Wt),L.resetTextureUnits();const ht=z.fog,vt=q.isMeshStandardMaterial?z.environment:null,Tt=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Vi,Rt=(q.isMeshStandardMaterial?W:C).get(q.envMap||vt),Ht=q.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Xt=!!Y.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ot=!!Y.morphAttributes.position,se=!!Y.morphAttributes.normal,ce=!!Y.morphAttributes.color;let Se=Hn;q.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Se=x.toneMapping);const Me=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,re=Me!==void 0?Me.length:0,Bt=_t.get(q),Re=g.state.lights;if(X===!0&&(tt===!0||R!==w)){const ze=R===w&&q.id===E;ut.setState(q,R,ze)}let he=!1;q.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==Re.state.version||Bt.outputColorSpace!==Tt||V.isBatchedMesh&&Bt.batching===!1||!V.isBatchedMesh&&Bt.batching===!0||V.isBatchedMesh&&Bt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Bt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Bt.instancing===!1||!V.isInstancedMesh&&Bt.instancing===!0||V.isSkinnedMesh&&Bt.skinning===!1||!V.isSkinnedMesh&&Bt.skinning===!0||V.isInstancedMesh&&Bt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Bt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Bt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Bt.instancingMorph===!1&&V.morphTexture!==null||Bt.envMap!==Rt||q.fog===!0&&Bt.fog!==ht||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==ut.numPlanes||Bt.numIntersection!==ut.numIntersection)||Bt.vertexAlphas!==Ht||Bt.vertexTangents!==Xt||Bt.morphTargets!==Ot||Bt.morphNormals!==se||Bt.morphColors!==ce||Bt.toneMapping!==Se||Bt.morphTargetsCount!==re)&&(he=!0):(he=!0,Bt.__version=q.version);let ln=Bt.currentProgram;he===!0&&(ln=Ms(q,z,V));let fi=!1,Ye=!1,Yi=!1;const xe=ln.getUniforms(),Qe=Bt.uniforms;if(ft.useProgram(ln.program)&&(fi=!0,Ye=!0,Yi=!0),q.id!==E&&(E=q.id,Ye=!0),fi||w!==R){ft.buffers.depth.getReversed()?(K.copy(R.projectionMatrix),cu(K),hu(K),xe.setValue(D,"projectionMatrix",K)):xe.setValue(D,"projectionMatrix",R.projectionMatrix),xe.setValue(D,"viewMatrix",R.matrixWorldInverse);const We=xe.map.cameraPosition;We!==void 0&&We.setValue(D,Lt.setFromMatrixPosition(R.matrixWorld)),Et.logarithmicDepthBuffer&&xe.setValue(D,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&xe.setValue(D,"isOrthographic",R.isOrthographicCamera===!0),w!==R&&(w=R,Ye=!0,Yi=!0)}if(V.isSkinnedMesh){xe.setOptional(D,V,"bindMatrix"),xe.setOptional(D,V,"bindMatrixInverse");const ze=V.skeleton;ze&&(ze.boneTexture===null&&ze.computeBoneTexture(),xe.setValue(D,"boneTexture",ze.boneTexture,L))}V.isBatchedMesh&&(xe.setOptional(D,V,"batchingTexture"),xe.setValue(D,"batchingTexture",V._matricesTexture,L),xe.setOptional(D,V,"batchingIdTexture"),xe.setValue(D,"batchingIdTexture",V._indirectTexture,L),xe.setOptional(D,V,"batchingColorTexture"),V._colorsTexture!==null&&xe.setValue(D,"batchingColorTexture",V._colorsTexture,L));const tn=Y.morphAttributes;if((tn.position!==void 0||tn.normal!==void 0||tn.color!==void 0)&&Vt.update(V,Y,ln),(Ye||Bt.receiveShadow!==V.receiveShadow)&&(Bt.receiveShadow=V.receiveShadow,xe.setValue(D,"receiveShadow",V.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Qe.envMap.value=Rt,Qe.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&z.environment!==null&&(Qe.envMapIntensity.value=z.environmentIntensity),Ye&&(xe.setValue(D,"toneMappingExposure",x.toneMappingExposure),Bt.needsLights&&th(Qe,Yi),ht&&q.fog===!0&&mt.refreshFogUniforms(Qe,ht),mt.refreshMaterialUniforms(Qe,q,G,Z,g.state.transmissionRenderTarget[R.id]),rr.upload(D,Ia(Bt),Qe,L)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(rr.upload(D,Ia(Bt),Qe,L),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&xe.setValue(D,"center",V.center),xe.setValue(D,"modelViewMatrix",V.modelViewMatrix),xe.setValue(D,"normalMatrix",V.normalMatrix),xe.setValue(D,"modelMatrix",V.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const ze=q.uniformsGroups;for(let We=0,Tr=ze.length;We<Tr;We++){const qn=ze[We];B.update(qn,ln),B.bind(qn,ln)}}return ln}function th(R,z){R.ambientLightColor.needsUpdate=z,R.lightProbe.needsUpdate=z,R.directionalLights.needsUpdate=z,R.directionalLightShadows.needsUpdate=z,R.pointLights.needsUpdate=z,R.pointLightShadows.needsUpdate=z,R.spotLights.needsUpdate=z,R.spotLightShadows.needsUpdate=z,R.rectAreaLights.needsUpdate=z,R.hemisphereLights.needsUpdate=z}function eh(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(R,z,Y){_t.get(R.texture).__webglTexture=z,_t.get(R.depthTexture).__webglTexture=Y;const q=_t.get(R);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=Y===void 0,q.__autoAllocateDepthBuffer||lt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,z){const Y=_t.get(R);Y.__webglFramebuffer=z,Y.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(R,z=0,Y=0){A=R,_=z,y=Y;let q=!0,V=null,ht=!1,vt=!1;if(R){const Rt=_t.get(R);if(Rt.__useDefaultFramebuffer!==void 0)ft.bindFramebuffer(D.FRAMEBUFFER,null),q=!1;else if(Rt.__webglFramebuffer===void 0)L.setupRenderTarget(R);else if(Rt.__hasExternalTextures)L.rebindTextures(R,_t.get(R.texture).__webglTexture,_t.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ot=R.depthTexture;if(Rt.__boundDepthTexture!==Ot){if(Ot!==null&&_t.has(Ot)&&(R.width!==Ot.image.width||R.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(R)}}const Ht=R.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(vt=!0);const Xt=_t.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Xt[z])?V=Xt[z][Y]:V=Xt[z],ht=!0):R.samples>0&&L.useMultisampledRTT(R)===!1?V=_t.get(R).__webglMultisampledFramebuffer:Array.isArray(Xt)?V=Xt[Y]:V=Xt,b.copy(R.viewport),U.copy(R.scissor),I=R.scissorTest}else b.copy(et).multiplyScalar(G).floor(),U.copy(Mt).multiplyScalar(G).floor(),I=Dt;if(ft.bindFramebuffer(D.FRAMEBUFFER,V)&&q&&ft.drawBuffers(R,V),ft.viewport(b),ft.scissor(U),ft.setScissorTest(I),ht){const Rt=_t.get(R.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+z,Rt.__webglTexture,Y)}else if(vt){const Rt=_t.get(R.texture),Ht=z||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Rt.__webglTexture,Y||0,Ht)}E=-1},this.readRenderTargetPixels=function(R,z,Y,q,V,ht,vt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=_t.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&vt!==void 0&&(Tt=Tt[vt]),Tt){ft.bindFramebuffer(D.FRAMEBUFFER,Tt);try{const Rt=R.texture,Ht=Rt.format,Xt=Rt.type;if(!Et.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Et.textureTypeReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=R.width-q&&Y>=0&&Y<=R.height-V&&D.readPixels(z,Y,q,V,Kt.convert(Ht),Kt.convert(Xt),ht)}finally{const Rt=A!==null?_t.get(A).__webglFramebuffer:null;ft.bindFramebuffer(D.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(R,z,Y,q,V,ht,vt){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=_t.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&vt!==void 0&&(Tt=Tt[vt]),Tt){const Rt=R.texture,Ht=Rt.format,Xt=Rt.type;if(!Et.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Et.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=R.width-q&&Y>=0&&Y<=R.height-V){ft.bindFramebuffer(D.FRAMEBUFFER,Tt);const Ot=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ot),D.bufferData(D.PIXEL_PACK_BUFFER,ht.byteLength,D.STREAM_READ),D.readPixels(z,Y,q,V,Kt.convert(Ht),Kt.convert(Xt),0);const se=A!==null?_t.get(A).__webglFramebuffer:null;ft.bindFramebuffer(D.FRAMEBUFFER,se);const ce=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await lu(D,ce,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ot),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ht),D.deleteBuffer(Ot),D.deleteSync(ce),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,z=null,Y=0){R.isTexture!==!0&&(Pi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,R=arguments[1]);const q=Math.pow(2,-Y),V=Math.floor(R.image.width*q),ht=Math.floor(R.image.height*q),vt=z!==null?z.x:0,Tt=z!==null?z.y:0;L.setTexture2D(R,0),D.copyTexSubImage2D(D.TEXTURE_2D,Y,0,0,vt,Tt,V,ht),ft.unbindTexture()};const nh=D.createFramebuffer(),ih=D.createFramebuffer();this.copyTextureToTexture=function(R,z,Y=null,q=null,V=0,ht=null){R.isTexture!==!0&&(Pi("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,R=arguments[1],z=arguments[2],ht=arguments[3]||0,Y=null),ht===null&&(V!==0?(Pi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ht=V,V=0):ht=0);let vt,Tt,Rt,Ht,Xt,Ot,se,ce,Se;const Me=R.isCompressedTexture?R.mipmaps[ht]:R.image;if(Y!==null)vt=Y.max.x-Y.min.x,Tt=Y.max.y-Y.min.y,Rt=Y.isBox3?Y.max.z-Y.min.z:1,Ht=Y.min.x,Xt=Y.min.y,Ot=Y.isBox3?Y.min.z:0;else{const tn=Math.pow(2,-V);vt=Math.floor(Me.width*tn),Tt=Math.floor(Me.height*tn),R.isDataArrayTexture?Rt=Me.depth:R.isData3DTexture?Rt=Math.floor(Me.depth*tn):Rt=1,Ht=0,Xt=0,Ot=0}q!==null?(se=q.x,ce=q.y,Se=q.z):(se=0,ce=0,Se=0);const re=Kt.convert(z.format),Bt=Kt.convert(z.type);let Re;z.isData3DTexture?(L.setTexture3D(z,0),Re=D.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(L.setTexture2DArray(z,0),Re=D.TEXTURE_2D_ARRAY):(L.setTexture2D(z,0),Re=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,z.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,z.unpackAlignment);const he=D.getParameter(D.UNPACK_ROW_LENGTH),ln=D.getParameter(D.UNPACK_IMAGE_HEIGHT),fi=D.getParameter(D.UNPACK_SKIP_PIXELS),Ye=D.getParameter(D.UNPACK_SKIP_ROWS),Yi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Me.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Me.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ht),D.pixelStorei(D.UNPACK_SKIP_ROWS,Xt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ot);const xe=R.isDataArrayTexture||R.isData3DTexture,Qe=z.isDataArrayTexture||z.isData3DTexture;if(R.isDepthTexture){const tn=_t.get(R),ze=_t.get(z),We=_t.get(tn.__renderTarget),Tr=_t.get(ze.__renderTarget);ft.bindFramebuffer(D.READ_FRAMEBUFFER,We.__webglFramebuffer),ft.bindFramebuffer(D.DRAW_FRAMEBUFFER,Tr.__webglFramebuffer);for(let qn=0;qn<Rt;qn++)xe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,_t.get(R).__webglTexture,V,Ot+qn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,_t.get(z).__webglTexture,ht,Se+qn)),D.blitFramebuffer(Ht,Xt,vt,Tt,se,ce,vt,Tt,D.DEPTH_BUFFER_BIT,D.NEAREST);ft.bindFramebuffer(D.READ_FRAMEBUFFER,null),ft.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(V!==0||R.isRenderTargetTexture||_t.has(R)){const tn=_t.get(R),ze=_t.get(z);ft.bindFramebuffer(D.READ_FRAMEBUFFER,nh),ft.bindFramebuffer(D.DRAW_FRAMEBUFFER,ih);for(let We=0;We<Rt;We++)xe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,tn.__webglTexture,V,Ot+We):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,tn.__webglTexture,V),Qe?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ze.__webglTexture,ht,Se+We):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ze.__webglTexture,ht),V!==0?D.blitFramebuffer(Ht,Xt,vt,Tt,se,ce,vt,Tt,D.COLOR_BUFFER_BIT,D.NEAREST):Qe?D.copyTexSubImage3D(Re,ht,se,ce,Se+We,Ht,Xt,vt,Tt):D.copyTexSubImage2D(Re,ht,se,ce,Ht,Xt,vt,Tt);ft.bindFramebuffer(D.READ_FRAMEBUFFER,null),ft.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Qe?R.isDataTexture||R.isData3DTexture?D.texSubImage3D(Re,ht,se,ce,Se,vt,Tt,Rt,re,Bt,Me.data):z.isCompressedArrayTexture?D.compressedTexSubImage3D(Re,ht,se,ce,Se,vt,Tt,Rt,re,Me.data):D.texSubImage3D(Re,ht,se,ce,Se,vt,Tt,Rt,re,Bt,Me):R.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ht,se,ce,vt,Tt,re,Bt,Me.data):R.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ht,se,ce,Me.width,Me.height,re,Me.data):D.texSubImage2D(D.TEXTURE_2D,ht,se,ce,vt,Tt,re,Bt,Me);D.pixelStorei(D.UNPACK_ROW_LENGTH,he),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ln),D.pixelStorei(D.UNPACK_SKIP_PIXELS,fi),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ye),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Yi),ht===0&&z.generateMipmaps&&D.generateMipmap(Re),ft.unbindTexture()},this.copyTextureToTexture3D=function(R,z,Y=null,q=null,V=0){return R.isTexture!==!0&&(Pi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,q=arguments[1]||null,R=arguments[2],z=arguments[3],V=arguments[4]||0),Pi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,z,Y,q,V)},this.initRenderTarget=function(R){_t.get(R).__webglFramebuffer===void 0&&L.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?L.setTextureCube(R,0):R.isData3DTexture?L.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?L.setTexture2DArray(R,0):L.setTexture2D(R,0),ft.unbindTexture()},this.resetState=function(){_=0,y=0,A=null,ft.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}const Zs=new Map,og=5,ns=(r,t=!1)=>{if(!Zs.has(r))Zs.set(r,1);else{const e=Zs.get(r);if(typeof e>"u"||e>=og)return;Zs.set(r,e+1)}t?console.error(`%c [enable3d] ${r} `,"background: #222; color: #bada55"):console.warn(`%c [enable3d] ${r} `,"background: #222; color: #bada55")};/**
 * @author       Kevin Lee (https://github.com/InfiniteLee)
 * @copyright    Copyright (c) 2020 Kevin Lee; Project Url: https://github.com/InfiniteLee/three-to-ammo
 * @license      {@link https://github.com/InfiniteLee/three-to-ammo/blob/master/LICENSE|MPL-2.0}
 */const xs={HULL:"hull",HACD:"hacd",VHACD:"vhacd",MESH:"mesh"},_s={ALL:"all",MANUAL:"manual"};(function(){const r=new P,t=new P,e=new ee;return function(n,s,i,a={}){if(a.type=xs.HULL,Sr(a),a.fit===_s.MANUAL)return console.warn("cannot use fit: manual with type: hull"),null;const o=ba(n,s),l=new Ammo.btVector3,h=new Ammo.btConvexHullShape;h.setMargin(a.margin),t.addVectors(o.max,o.min).multiplyScalar(.5);let u=0;for(let p=0;p<n.length;p++)u+=n[p].length/3;const d=a.hullMaxVertices||1e5;u>d&&console.warn(`too many vertices for hull shape; sampling ~${d} from ~${u} vertices`);const f=Math.min(1,d/u);for(let p=0;p<n.length;p++){const v=n[p];e.fromArray(s[p]);for(let m=0;m<v.length;m+=3){const g=p===n.length-1&&m===v.length-3;(Math.random()<=f||g)&&(r.set(v[m],v[m+1],v[m+2]).applyMatrix4(e).sub(t),l.setValue(r.x,r.y,r.z),h.addPoint(l,g))}}let c=h;if(h.getNumVertices()>=100){const p=new Ammo.btShapeHull(h);p.buildHull(a.margin),Ammo.destroy(h),c=new Ammo.btConvexHullShape(Ammo.getPointer(p.getVertexPointer()),p.numVertices()),Ammo.destroy(p)}return Ammo.destroy(l),ag(c,a,wr(i,a)),c}})();(function(){const r=new P,t=new P,e=new ee;return function(n,s,i,a,o={}){if(o.type=xs.HACD,Sr(o),o.fit===_s.MANUAL)return console.warn("cannot use fit: manual with type: hacd"),[];if(!Ammo.hasOwnProperty("HACD"))return console.warn("HACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."),[];const l=ba(n,s);wr(a,o);let h=0,u=0;t.addVectors(l.max,l.min).multiplyScalar(.5);for(let T=0;T<n.length;T++)h+=n[T].length/3,i&&i[T]?u+=i[T].length/3:u+=n[T].length/9;const d=new Ammo.HACD;o.hasOwnProperty("compacityWeight")&&d.SetCompacityWeight(o.compacityWeight),o.hasOwnProperty("volumeWeight")&&d.SetVolumeWeight(o.volumeWeight),o.hasOwnProperty("nClusters")&&d.SetNClusters(o.nClusters),o.hasOwnProperty("nVerticesPerCH")&&d.SetNVerticesPerCH(o.nVerticesPerCH),o.hasOwnProperty("concavity")&&d.SetConcavity(o.concavity);const f=Ammo._malloc(h*3*8),c=Ammo._malloc(u*3*4);d.SetPoints(f),d.SetTriangles(c),d.SetNPoints(h),d.SetNTriangles(u);let p=f/8,v=c/4;for(let T=0;T<n.length;T++){const M=n[T];e.fromArray(s[T]);for(let x=0;x<M.length;x+=3)r.set(M[x+0],M[x+1],M[x+2]).applyMatrix4(e).sub(t),Ammo.HEAPF64[p+0]=r.x,Ammo.HEAPF64[p+1]=r.y,Ammo.HEAPF64[p+2]=r.z,p+=3;if(i[T]){const x=i[T];for(let S=0;S<x.length;S++)Ammo.HEAP32[v]=x[S],v++}else for(let x=0;x<M.length/3;x++)Ammo.HEAP32[v]=x,v++}d.Compute(),Ammo._free(f),Ammo._free(c);const m=d.GetNClusters(),g=[];for(let T=0;T<m;T++){const M=new Ammo.btConvexHullShape;M.setMargin(o.margin);const x=d.GetNPointsCH(T),S=d.GetNTrianglesCH(T),_=Ammo._malloc(x*3*8),y=Ammo._malloc(S*3*4);d.GetCH(T,_,y);const A=_/8;for(let E=0;E<x;E++){const w=new Ammo.btVector3,b=Ammo.HEAPF64[A+E*3+0],U=Ammo.HEAPF64[A+E*3+1],I=Ammo.HEAPF64[A+E*3+2];w.setValue(b,U,I),M.addPoint(w,E===x-1),Ammo.destroy(w)}g.push(M)}return g}})();(function(){const r=new P,t=new P,e=new ee;return function(n,s,i,a,o={}){if(o.type=xs.VHACD,Sr(o),o.fit===_s.MANUAL)return console.warn("cannot use fit: manual with type: vhacd"),[];if(!Ammo.hasOwnProperty("VHACD"))return console.warn("VHACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."),[];const l=ba(n,s);wr(a,o);let h=0,u=0;t.addVectors(l.max,l.min).multiplyScalar(.5);for(let x=0;x<n.length;x++)h+=n[x].length/3,i&&i[x]?u+=i[x].length/3:u+=n[x].length/9;const d=new Ammo.VHACD,f=new Ammo.Parameters;o.hasOwnProperty("resolution")&&f.set_m_resolution(o.resolution),o.hasOwnProperty("depth")&&f.set_m_depth(o.depth),o.hasOwnProperty("concavity")&&f.set_m_concavity(o.concavity),o.hasOwnProperty("planeDownsampling")&&f.set_m_planeDownsampling(o.planeDownsampling),o.hasOwnProperty("convexhullDownsampling")&&f.set_m_convexhullDownsampling(o.convexhullDownsampling),o.hasOwnProperty("alpha")&&f.set_m_alpha(o.alpha),o.hasOwnProperty("beta")&&f.set_m_beta(o.beta),o.hasOwnProperty("gamma")&&f.set_m_gamma(o.gamma),o.hasOwnProperty("pca")&&f.set_m_pca(o.pca),o.hasOwnProperty("mode")&&f.set_m_mode(o.mode),o.hasOwnProperty("maxNumVerticesPerCH")&&f.set_m_maxNumVerticesPerCH(o.maxNumVerticesPerCH),o.hasOwnProperty("minVolumePerCH")&&f.set_m_minVolumePerCH(o.minVolumePerCH),o.hasOwnProperty("convexhullApproximation")&&f.set_m_convexhullApproximation(o.convexhullApproximation),o.hasOwnProperty("oclAcceleration")&&f.set_m_oclAcceleration(o.oclAcceleration);const c=Ammo._malloc(h*3*8+3),p=Ammo._malloc(u*3*4);let v=c/8,m=p/4;for(let x=0;x<n.length;x++){const S=n[x];e.fromArray(s[x]);for(let _=0;_<S.length;_+=3)r.set(S[_+0],S[_+1],S[_+2]).applyMatrix4(e).sub(t),Ammo.HEAPF64[v+0]=r.x,Ammo.HEAPF64[v+1]=r.y,Ammo.HEAPF64[v+2]=r.z,v+=3;if(i[x]){const _=i[x];for(let y=0;y<_.length;y++)Ammo.HEAP32[m]=_[y],m++}else for(let _=0;_<S.length/3;_++)Ammo.HEAP32[m]=_,m++}d.Compute(c,3,h,p,3,u,f),Ammo._free(c),Ammo._free(p);const g=d.GetNConvexHulls(),T=[],M=new Ammo.ConvexHull;for(let x=0;x<g;x++){d.GetConvexHull(x,M);const S=M.get_m_nPoints();M.get_m_points();const _=new Ammo.btConvexHullShape;_.setMargin(o.margin);for(let y=0;y<S;y++){const A=new Ammo.btVector3,E=M.get_m_points(y*3+0),w=M.get_m_points(y*3+1),b=M.get_m_points(y*3+2);A.setValue(E,w,b),_.addPoint(A,y===S-1),Ammo.destroy(A)}T.push(_)}return Ammo.destroy(M),Ammo.destroy(d),T}})();(function(){const r=new P,t=new P,e=new P,n=new ee;return function(s,i,a,o,l={}){if(l.type=xs.MESH,Sr(l),l.fit===_s.MANUAL)return console.warn("cannot use fit: manual with type: mesh"),null;const h=wr(o,l),u=new Ammo.btVector3,d=new Ammo.btVector3,f=new Ammo.btVector3,c=new Ammo.btTriangleMesh(!0,!1);for(let m=0;m<s.length;m++){const g=s[m],T=a[m]?a[m]:null;if(n.fromArray(i[m]),T)for(let M=0;M<T.length;M+=3){const x=T[M]*3,S=T[M+1]*3,_=T[M+2]*3;r.set(g[x],g[x+1],g[x+2]).applyMatrix4(n),t.set(g[S],g[S+1],g[S+2]).applyMatrix4(n),e.set(g[_],g[_+1],g[_+2]).applyMatrix4(n),u.setValue(r.x,r.y,r.z),d.setValue(t.x,t.y,t.z),f.setValue(e.x,e.y,e.z),c.addTriangle(u,d,f,!1)}else for(let M=0;M<g.length;M+=9)r.set(g[M+0],g[M+1],g[M+2]).applyMatrix4(n),t.set(g[M+3],g[M+4],g[M+5]).applyMatrix4(n),e.set(g[M+6],g[M+7],g[M+8]).applyMatrix4(n),u.setValue(r.x,r.y,r.z),d.setValue(t.x,t.y,t.z),f.setValue(e.x,e.y,e.z),c.addTriangle(u,d,f,!1)}const p=new Ammo.btVector3(h.x,h.y,h.z);c.setScaling(p),Ammo.destroy(p);let v;return l.concave?v=new Ammo.btBvhTriangleMeshShape(c,!0,!0):v=new Ammo.btConvexTriangleMeshShape(c,!0),v.resources=[c],Ammo.destroy(u),Ammo.destroy(d),Ammo.destroy(f),v}})();function Sr(r){r.type=r.type||xs.HULL,r.margin=r.hasOwnProperty("margin")?r.margin:.01}const ag=function(r,t,e){};(function(){const r=new ee;return function(t,e,n){parseInt(pr)>=123?r.copy(t.matrixWorld).invert():r.getInverse(t.matrixWorld),new P().setFromMatrixScale(t.matrixWorld),t.traverse(i=>{const a=new ee;if(i.isMesh&&(e.includeInvisible||i.el&&i.el.object3D.visible||i.visible)){i===t?a.identity():(i.updateWorldMatrix(!0),a.multiplyMatrices(r,i.matrixWorld));let o;if(i.geometry.isBufferGeometry){const l=i.geometry.attributes.position;if(l.isInterleavedBufferAttribute){o=new Float32Array(l.count*l.itemSize);let h=l.offset,u=0;for(;u<o.length;){for(let d=0;d<l.itemSize;d++)o[u++]=l.array[h+d];h+=l.data.stride}}else o=l.array}n(i.geometry.isBufferGeometry?o:i.geometry.vertices,a.elements,i.geometry.index?i.geometry.index.array:null)}})}})();const wr=(function(){const r=new ee;return function(t,e={}){const n=new P(1,1,1);return e.fit===_s.ALL&&(r.fromArray(t),n.setFromMatrixScale(r)),n}})();(function(){const r=new P;return function(t,e,n){let s=0,{x:i,y:a,z:o}=n.getCenter(r);return $c(t,e,l=>{const h=i-l.x,u=a-l.y,d=o-l.z;s=Math.max(s,h*h+u*u+d*d)}),Math.sqrt(s)}})();const ba=function(r,t){const e=new Xn;let n=1/0,s=1/0,i=1/0,a=-1/0,o=-1/0,l=-1/0;return e.min.set(0,0,0),e.max.set(0,0,0),$c(r,t,h=>{h.x<n&&(n=h.x),h.y<s&&(s=h.y),h.z<i&&(i=h.z),h.x>a&&(a=h.x),h.y>o&&(o=h.y),h.z>l&&(l=h.z)}),e.min.set(n,s,i),e.max.set(a,o,l),e},$c=(function(){const r=new P,t=new ee;return function(e,n,s){for(let i=0;i<e.length;i++){t.fromArray(n[i]);for(let a=0;a<e[i].length;a+=3)r.set(e[i][a],e[i][a+1],e[i][a+2]).applyMatrix4(t),s(r)}}})(),or=0,lg=1,cg=new P,Wl=new Gc,oo=new dn,Xl=new P,$s=new rn;class hg{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new Yl,this.unassigned=new Yl,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new ug(t[e]));this.compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(n){const s=n.geometry;if(s!==void 0){const i=s.attributes.position;if(i!==void 0)for(let a=0,o=i.count;a<o;a++){const l=new P;l.fromBufferAttribute(i,a).applyMatrix4(n.matrixWorld),e.push(l)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let n=0,s=e.length;n<s;n++)if(e[n].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const n=this.faces;let s=-1/0,i=1/0;for(let a=0,o=n.length;a<o;a++){const l=n[a],h=l.distanceToPoint(t.origin),u=l.normal.dot(t.direction);if(h>0&&u>=0)return null;const d=u!==0?-h/u:0;if(!(d<=0)&&(u>0?i=Math.min(d,i):s=Math.max(d,s),s>i))return null}return s!==-1/0?t.at(s,e):t.at(i,e),e}intersectsRay(t){return this.intersectRay(t,cg)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let n=t.outside;for(;n.next!==null&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}deleteFaceVertices(t,e){const n=this.removeAllVerticesFromFace(t);if(n!==void 0)if(e===void 0)this.unassigned.appendChain(n);else{let s=n;do{const i=s.next;e.distanceToPoint(s.point)>this.tolerance?this.addVertexToFace(s,e):this.unassigned.append(s),s=i}while(s!==null)}return this}resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const n=e.next;let s=this.tolerance,i=null;for(let a=0;a<t.length;a++){const o=t[a];if(o.mark===or){const l=o.distanceToPoint(e.point);if(l>s&&(s=l,i=o),s>1e3*this.tolerance)break}}i!==null&&this.addVertexToFace(e,i),e=n}while(e!==null)}return this}computeExtremes(){const t=new P,e=new P,n=[],s=[];for(let i=0;i<3;i++)n[i]=s[i]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let i=0,a=this.vertices.length;i<a;i++){const o=this.vertices[i],l=o.point;for(let h=0;h<3;h++)l.getComponent(h)<t.getComponent(h)&&(t.setComponent(h,l.getComponent(h)),n[h]=o);for(let h=0;h<3;h++)l.getComponent(h)>e.getComponent(h)&&(e.setComponent(h,l.getComponent(h)),s[h]=o)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:s}}computeInitialHull(){const t=this.vertices,e=this.computeExtremes(),n=e.min,s=e.max;let i=0,a=0;for(let f=0;f<3;f++){const c=s[f].point.getComponent(f)-n[f].point.getComponent(f);c>i&&(i=c,a=f)}const o=n[a],l=s[a];let h,u;i=0,Wl.set(o.point,l.point);for(let f=0,c=this.vertices.length;f<c;f++){const p=t[f];if(p!==o&&p!==l){Wl.closestPointToPoint(p.point,!0,Xl);const v=Xl.distanceToSquared(p.point);v>i&&(i=v,h=p)}}i=-1,oo.setFromCoplanarPoints(o.point,l.point,h.point);for(let f=0,c=this.vertices.length;f<c;f++){const p=t[f];if(p!==o&&p!==l&&p!==h){const v=Math.abs(oo.distanceToPoint(p.point));v>i&&(i=v,u=p)}}const d=[];if(oo.distanceToPoint(u.point)<0){d.push(fn.create(o,l,h),fn.create(u,l,o),fn.create(u,h,l),fn.create(u,o,h));for(let f=0;f<3;f++){const c=(f+1)%3;d[f+1].getEdge(2).setTwin(d[0].getEdge(c)),d[f+1].getEdge(1).setTwin(d[c+1].getEdge(0))}}else{d.push(fn.create(o,h,l),fn.create(u,o,l),fn.create(u,l,h),fn.create(u,h,o));for(let f=0;f<3;f++){const c=(f+1)%3;d[f+1].getEdge(2).setTwin(d[0].getEdge((3-f)%3)),d[f+1].getEdge(0).setTwin(d[c+1].getEdge(1))}}for(let f=0;f<4;f++)this.faces.push(d[f]);for(let f=0,c=t.length;f<c;f++){const p=t[f];if(p!==o&&p!==l&&p!==h&&p!==u){i=this.tolerance;let v=null;for(let m=0;m<4;m++){const g=this.faces[m].distanceToPoint(p.point);g>i&&(i=g,v=this.faces[m])}v!==null&&this.addVertexToFace(p,v)}}return this}reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const n=this.faces[e];n.mark===or&&t.push(n)}return this.faces=t,this}nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const n=this.assigned.first().face;let s=n.outside;do{const i=n.distanceToPoint(s.point);i>e&&(e=i,t=s),s=s.next}while(s!==null&&s.face===n);return t}}computeHorizon(t,e,n,s){this.deleteFaceVertices(n),n.mark=lg;let i;e===null?i=e=n.getEdge(0):i=e.next;do{const a=i.twin,o=a.face;o.mark===or&&(o.distanceToPoint(t)>this.tolerance?this.computeHorizon(t,a,o,s):s.push(i)),i=i.next}while(i!==e);return this}addAdjoiningFace(t,e){const n=fn.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}addNewFaces(t,e){this.newFaces=[];let n=null,s=null;for(let i=0;i<e.length;i++){const a=e[i],o=this.addAdjoiningFace(t,a);n===null?n=o:o.next.setTwin(s),this.newFaces.push(o.face),s=o}return n.next.setTwin(s),this}addVertexToHull(t){const e=[];return this.unassigned.clear(),this.removeVertexFromFace(t,t.face),this.computeHorizon(t.point,null,t.face,e),this.addNewFaces(t,e),this.resolveUnassignedPoints(this.newFaces),this}cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}compute(){let t;for(this.computeInitialHull();(t=this.nextVertexToAdd())!==void 0;)this.addVertexToHull(t);return this.reindexFaces(),this.cleanup(),this}}class fn{constructor(){this.normal=new P,this.midpoint=new P,this.area=0,this.constant=0,this.outside=null,this.mark=or,this.edge=null}static create(t,e,n){const s=new fn,i=new ao(t,s),a=new ao(e,s),o=new ao(n,s);return i.next=o.prev=a,a.next=i.prev=o,o.next=a.prev=i,s.edge=i,s.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return $s.set(t.point,e.point,n.point),$s.getNormal(this.normal),$s.getMidpoint(this.midpoint),this.area=$s.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class ao{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class ug{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class Yl{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}class fg extends Be{constructor(t=[]){super();const e=[],n=[],i=new hg().setFromPoints(t).faces;for(let a=0;a<i.length;a++){const o=i[a];let l=o.edge;do{const h=l.head().point;e.push(h.x,h.y,h.z),n.push(o.normal.x,o.normal.y,o.normal.z),l=l.next}while(l!==o.edge)}this.setAttribute("position",new le(e,3)),this.setAttribute("normal",new le(n,3))}}const ql=r=>{const t=window.THREE&&window.THREE.ConvexGeometry?window.THREE.ConvexGeometry:fg;return new t(r)},Ln=function(r,t){this.minSizeForBreak=r||1.4,this.smallDelta=t||1e-4,this.tempLine1=new Gc,this.tempPlane1=new dn,this.tempPlane2=new dn,this.tempPlane_Cut=new dn,this.tempCM1=new P,this.tempCM2=new P,this.tempVector3=new P,this.tempVector3_2=new P,this.tempVector3_3=new P,this.tempVector3_P0=new P,this.tempVector3_P1=new P,this.tempVector3_P2=new P,this.tempVector3_N0=new P,this.tempVector3_N1=new P,this.tempVector3_AB=new P,this.tempVector3_CB=new P,this.tempResultObjects={object1:null,object2:null},this.segments=[];for(var e=900,n=0;n<e;n++)this.segments[n]=!1};Ln.prototype={constructor:Ln,prepareBreakableObject:function(r,t,e,n,s){r.geometry.isBufferGeometry||console.error("THREE.ConvexObjectBreaker.prepareBreakableObject(): Parameter object must have a BufferGeometry."),r.userData.ammoPhysicsData={};var i=r.userData.ammoPhysicsData;i.mass=t,i.velocity=e.clone(),i.angularVelocity=n.clone(),i.breakable=s},subdivideByImpact:function(r,t,e,n,s){var i=[],a=this.tempPlane1,o=this.tempPlane2;this.tempVector3.addVectors(t,e),a.setFromCoplanarPoints(t,r.position,this.tempVector3);var l=s+n,h=this;function u(d,f,c,p){if(Math.random()<p*.05||p>l){i.push(d);return}var v=Math.PI;p===0?(o.normal.copy(a.normal),o.constant=a.constant):p<=n?(v=(c-f)*(.2+.6*Math.random())+f,h.tempVector3_2.copy(r.position).sub(t).applyAxisAngle(e,v).add(t),o.setFromCoplanarPoints(t,h.tempVector3,h.tempVector3_2)):(v=(.5*(p&1)+.2*(2-Math.random()))*Math.PI,h.tempVector3_2.copy(t).sub(d.position).applyAxisAngle(e,v).add(d.position),h.tempVector3_3.copy(e).add(d.position),o.setFromCoplanarPoints(d.position,h.tempVector3_3,h.tempVector3_2)),h.cutByPlane(d,o,h.tempResultObjects);var m=h.tempResultObjects.object1,g=h.tempResultObjects.object2;m&&u(m,f,v,p+1),g&&u(g,v,c,p+1)}return u(r,0,2*Math.PI,0),i},cutByPlane:function(r,t,e){var n=r.geometry,s=n.attributes.position.array,i=n.attributes.normal.array,a=s.length/3,o=a/3,l=n.getIndex();l&&(l=l.array,o=l.length/3);function h(Q,at){var D=Q*3+at;return l?l[D]:D}for(var u=[],d=[],f=this.smallDelta,c=a*a,p=0;p<c;p++)this.segments[p]=!1;for(var v=this.tempVector3_P0,m=this.tempVector3_P1,g=this.tempVector3_N0,T=this.tempVector3_N1,p=0;p<o-1;p++){var M=h(p,0),x=h(p,1),S=h(p,2);g.set(i[M],i[M]+1,i[M]+2);for(var _=p+1;_<o;_++){var y=h(_,0),A=h(_,1),E=h(_,2);T.set(i[y],i[y]+1,i[y]+2);var w=1-g.dot(T)<f;w&&(M===y||M===A||M===E?x===y||x===A||x===E?(this.segments[M*a+x]=!0,this.segments[x*a+M]=!0):(this.segments[S*a+M]=!0,this.segments[M*a+S]=!0):(x===y||x===A||x===E)&&(this.segments[S*a+x]=!0,this.segments[x*a+S]=!0))}}var b=this.tempPlane_Cut;r.updateMatrix(),Ln.transformPlaneToLocalSpace(t,r.matrix,b);for(var p=0;p<o;p++)for(var U=h(p,0),I=h(p,1),F=h(p,2),k=0;k<3;k++){var O=k===0?U:k===1?I:F,Z=k===0?I:k===1?F:U,G=this.segments[O*a+Z];if(!G){this.segments[O*a+Z]=!0,this.segments[Z*a+O]=!0,v.set(s[3*O],s[3*O+1],s[3*O+2]),m.set(s[3*Z],s[3*Z+1],s[3*Z+2]);var it=0,et=b.distanceToPoint(v);et>f?(it=2,d.push(v.clone())):et<-f?(it=1,u.push(v.clone())):(it=3,u.push(v.clone()),d.push(v.clone()));var rt=0,et=b.distanceToPoint(m);if(et>f?(rt=2,d.push(m.clone())):et<-f?(rt=1,u.push(m.clone())):(rt=3,u.push(m.clone()),d.push(m.clone())),it===1&&rt===2||it===2&&rt===1){this.tempLine1.start.copy(v),this.tempLine1.end.copy(m);var Mt=new P;if(Mt=b.intersectLine(this.tempLine1,Mt),Mt===void 0)return console.error("Internal error: segment does not intersect plane."),e.segmentedObject1=null,e.segmentedObject2=null,0;u.push(Mt),d.push(Mt.clone())}}}var Dt=r.userData.ammoPhysicsData.mass*.5;this.tempCM1.set(0,0,0);var N=0,X=u.length;if(X>0){for(var p=0;p<X;p++)this.tempCM1.add(u[p]);this.tempCM1.divideScalar(X);for(var p=0;p<X;p++){var tt=u[p];tt.sub(this.tempCM1),N=Math.max(N,tt.x,tt.y,tt.z)}this.tempCM1.add(r.position)}this.tempCM2.set(0,0,0);var K=0,dt=d.length;if(dt>0){for(var p=0;p<dt;p++)this.tempCM2.add(d[p]);this.tempCM2.divideScalar(dt);for(var p=0;p<dt;p++){var tt=d[p];tt.sub(this.tempCM2),K=Math.max(K,tt.x,tt.y,tt.z)}this.tempCM2.add(r.position)}var Lt=null,bt=null,Wt=0;if(X>4)try{Lt=new Ft(ql(u),r.material),Lt.position.copy(this.tempCM1),Lt.quaternion.copy(r.quaternion),Lt.userData=r.userData,this.prepareBreakableObject(Lt,Dt,r.userData.ammoPhysicsData.velocity,r.userData.ammoPhysicsData.angularVelocity,2*N>this.minSizeForBreak),Wt++}catch(Q){ns("Error in ConvexObjectBreaker.ts",!0),ns(Q,!0)}if(dt>4)try{bt=new Ft(ql(d),r.material),bt.position.copy(this.tempCM2),bt.quaternion.copy(r.quaternion),bt.userData=r.userData,this.prepareBreakableObject(bt,Dt,r.userData.ammoPhysicsData.velocity,r.userData.ammoPhysicsData.angularVelocity,2*K>this.minSizeForBreak),Wt++}catch(Q){ns("Error in ConvexObjectBreaker.ts",!0),ns(Q,!0)}return e.object1=Lt,e.object2=bt,Wt}};Ln.transformFreeVector=function(r,t){var e=r.x,n=r.y,s=r.z,i=t.elements;return r.x=i[0]*e+i[4]*n+i[8]*s,r.y=i[1]*e+i[5]*n+i[9]*s,r.z=i[2]*e+i[6]*n+i[10]*s,r};Ln.transformFreeVectorInverse=function(r,t){var e=r.x,n=r.y,s=r.z,i=t.elements;return r.x=i[0]*e+i[1]*n+i[2]*s,r.y=i[4]*e+i[5]*n+i[6]*s,r.z=i[8]*e+i[9]*n+i[10]*s,r};Ln.transformTiedVectorInverse=function(r,t){var e=r.x,n=r.y,s=r.z,i=t.elements;return r.x=i[0]*e+i[1]*n+i[2]*s-i[12],r.y=i[4]*e+i[5]*n+i[6]*s-i[13],r.z=i[8]*e+i[9]*n+i[10]*s-i[14],r};Ln.transformPlaneToLocalSpace=(function(){var r=new P;return function(e,n,s){s.normal.copy(e.normal),s.constant=e.constant;var i=Ln.transformTiedVectorInverse(e.coplanarPoint(r),n);Ln.transformFreeVectorInverse(s.normal,n),s.constant=-i.dot(s.normal)}})();const dg=(()=>{try{if(typeof WebAssembly=="object"&&typeof WebAssembly.instantiate=="function"){const r=new WebAssembly.Module(Uint8Array.of(0,97,115,109,1,0,0,0));if(r instanceof WebAssembly.Module)return new WebAssembly.Instance(r)instanceof WebAssembly.Instance}}catch(r){r instanceof Error&&console.error(r.message)}return!1})(),Zl=(r,t)=>{var e=document.createElement("script");e.onload=()=>{t()},e.onerror=()=>{throw new Error(`failed to load ${r}`)},e.async=!0,e.src=r,document.head.appendChild(e)},pg=(r,t)=>{dg?Zl(`${r}/ammo.wasm.js`,()=>t()):Zl(`${r}/ammo.js`,()=>t())},mg=(r,t)=>{typeof window<"u"&&(window.__loadPhysics=!0),pg(r,()=>{Ammo().then(()=>{t()})})};function Kc(r,t){t.forEach(e=>{Object.getOwnPropertyNames(e.prototype).forEach(n=>{Object.defineProperty(r.prototype,n,Object.getOwnPropertyDescriptor(e.prototype,n)||Object.create(null))})})}/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */class gg{constructor(t){Nt(this,"physics");Nt(this,"_btRayCallback");this.physics=t}getHitPointWorld(){const t=this._btRayCallback.get_m_hitPointWorld();return{x:t.x(),y:t.y(),z:t.z()}}getHitNormalWorld(){const t=this._btRayCallback.get_m_hitNormalWorld();return{x:t.x(),y:t.y(),z:t.z()}}getCollisionObject(){return Ammo.castObject(this._btRayCallback.get_m_collisionObject(),Ammo.btRigidBody).threeObject}}/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */class vg{constructor(t){Nt(this,"physics");Nt(this,"_btRayCallback");this.physics=t}getHitPointsWorld(){const t=this._btRayCallback.get_m_hitPointWorld(),e=[];for(let n=t.size()-1;n>=0;n--){const s=t.at(n);e.push({x:s.x(),y:s.y(),z:s.z()})}return e}getHitPointWorld(){return ns("Use getHitPointsWorld() instead of getHitPointWorld() for the AllHitsRayCaster!"),this.getHitPointsWorld()}getHitNormalsWorld(){const t=this._btRayCallback.get_m_hitNormalWorld(),e=[];for(let n=t.size()-1;n>=0;n--){const s=t.at(n);e.push({x:s.x(),y:s.y(),z:s.z()})}return e}getCollisionObjects(){const t=[],e=this._btRayCallback.get_m_collisionObjects();for(let n=e.size()-1;n>=0;n--){const s=Ammo.castObject(e.at(n),Ammo.btRigidBody);t.push(s.threeObject)}return t}}/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */class Jc{constructor(t){Nt(this,"physics");Nt(this,"type");Nt(this,"_btRayFrom");Nt(this,"_btRayTo");Nt(this,"_btRayCallback");this.physics=t}setRayFromWorld(t=0,e=0,n=0){this._btRayFrom.setValue(t,e,n)}setRayToWorld(t=0,e=0,n=0){this._btRayTo.setValue(t,e,n)}hasHit(){return this._btRayCallback.hasHit()}rayTest(){typeof this._btRayCallback<"u"&&Ammo.destroy(this._btRayCallback),this._btRayCallback=this.type==="closest"?new Ammo.ClosestRayResultCallback(this._btRayFrom,this._btRayTo):new Ammo.AllHitsRayResultCallback(this._btRayFrom,this._btRayTo),this.physics.physicsWorld.rayTest(this._btRayFrom,this._btRayTo,this._btRayCallback)}destroy(){typeof this._btRayFrom<"u"&&Ammo.destroy(this._btRayFrom),typeof this._btRayTo<"u"&&Ammo.destroy(this._btRayTo),typeof this._btRayCallback<"u"&&Ammo.destroy(this._btRayCallback)}}class xg{constructor(t){Nt(this,"physics");Nt(this,"type","closest");Nt(this,"_btRayFrom",new Ammo.btVector3(0,0,0));Nt(this,"_btRayTo",new Ammo.btVector3(0,0,0));Nt(this,"_btRayCallback");this.physics=t}}class _g{constructor(t){Nt(this,"physics");Nt(this,"type","allHits");Nt(this,"_btRayFrom",new Ammo.btVector3(0,0,0));Nt(this,"_btRayTo",new Ammo.btVector3(0,0,0));Nt(this,"_btRayCallback");this.physics=t}}Kc(xg,[Jc,gg]);Kc(_g,[Jc,vg]);const yg="0.26.1",Mg=`Powered by enable3d v${yg}`;console.log(`%c %c %c %c %c ${Mg} %c https://enable3d.io/`,"background: #ff0000","background: #ffff00","background: #00ff00","background: #00ffff","color: #fff; background: #000000;","background: none");var $l=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ti={},ts={},Kl;function Sg(){return Kl||(Kl=1,Object.defineProperty(ts,"__esModule",{value:!0}),ts.VERSION=void 0,ts.VERSION="0.0.5"),ts}var Jl;function wg(){if(Jl)return ti;Jl=1;/**
 * @package      npmjs.com/package/@yandeu/events (events.min.js)
 *
 * @author       Arnout Kazemier (https://github.com/3rd-Eden)
 * @copyright    Copyright (c) 2014 Arnout Kazemier
 * @license      {@link https://github.com/primus/eventemitter3/blob/master/LICENSE|MIT}
 *
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/yandeu/events
 * @license      {@link https://github.com/yandeu/events/blob/master/LICENSE|MIT}
 */var r=ti&&ti.__spreadArray||function(a,o){for(var l=0,h=o.length,u=a.length;l<h;l++,u++)a[u]=o[l];return a};Object.defineProperty(ti,"__esModule",{value:!0}),ti.Events=void 0;var t=Sg(),e=(function(){function a(o,l,h){h===void 0&&(h=!1),this.fn=o,this.context=l,this.once=h}return a})(),n=function(a,o,l,h,u){if(typeof l!="function")throw new TypeError("The listener must be a function");var d=new e(l,h||a,u);return a._events.has(o)?a._events.get(o).fn?a._events.set(o,[a._events.get(o),d]):a._events.get(o).push(d):(a._events.set(o,d),a._eventsCount++),a},s=function(a,o){--a._eventsCount===0?a._events=new Map:a._events.delete(o)},i=(function(){function a(){this._events=new Map,this._eventsCount=0}return Object.defineProperty(a,"VERSION",{get:function(){return t.VERSION},enumerable:!1,configurable:!0}),a.prototype.eventNames=function(){return Array.from(this._events.keys())},a.prototype.listeners=function(o){var l=this._events.get(o);if(!l)return[];if(l.fn)return[l.fn];for(var h=0,u=l.length,d=new Array(u);h<u;h++)d[h]=l[h].fn;return d},a.prototype.listenerCount=function(o){var l=this._events.get(o);return l?l.fn?1:l.length:0},a.prototype.emit=function(o){for(var l,h,u=[],d=1;d<arguments.length;d++)u[d-1]=arguments[d];if(!this._events.has(o))return!1;var f=this._events.get(o),c;if(f.fn)return f.once&&this.removeListener(o,f.fn,void 0,!0),(l=f.fn).call.apply(l,r([f.context],u)),!0;var p=f.length;for(c=0;c<p;c++)f[c].once&&this.removeListener(o,f[c].fn,void 0,!0),(h=f[c].fn).call.apply(h,r([f[c].context],u));return!0},a.prototype.on=function(o,l,h){return n(this,o,l,h,!1)},a.prototype.once=function(o,l,h){return n(this,o,l,h,!0)},a.prototype.removeListener=function(o,l,h,u){if(!this._events.has(o))return this;if(!l)return s(this,o),this;var d=this._events.get(o);if(d.fn)d.fn===l&&(!u||d.once)&&(!h||d.context===h)&&s(this,o);else{for(var f=0,c=[],p=d.length;f<p;f++)(d[f].fn!==l||u&&!d[f].once||h&&d[f].context!==h)&&c.push(d[f]);c.length?this._events.set(o,c.length===1?c[0]:c):s(this,o)}return this},a.prototype.removeAllListeners=function(o){return o?this._events.delete(o)&&s(this,o):(this._events=new Map,this._eventsCount=0),this},Object.defineProperty(a.prototype,"off",{get:function(){return this.removeListener},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"addListener",{get:function(){return this.on},enumerable:!1,configurable:!0}),a})();return ti.Events=i,ti}wg();/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */document.createElement("canvas");new Sf;new ot;new ot;new ot;var ar={exports:{}};/*!
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
 */var Eg=ar.exports,jl;function Tg(){return jl||(jl=1,(function(r,t){(function(n,s){r.exports=s()})(Eg,function(){return(function(e){var n={};function s(i){if(n[i])return n[i].exports;var a=n[i]={i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}return s.m=e,s.c=n,s.d=function(i,a,o){s.o(i,a)||Object.defineProperty(i,a,{enumerable:!0,get:o})},s.r=function(i){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})},s.t=function(i,a){if(a&1&&(i=s(i)),a&8||a&4&&typeof i=="object"&&i&&i.__esModule)return i;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:i}),a&2&&typeof i!="string")for(var l in i)s.d(o,l,(function(h){return i[h]}).bind(null,l));return o},s.n=function(i){var a=i&&i.__esModule?function(){return i.default}:function(){return i};return s.d(a,"a",a),a},s.o=function(i,a){return Object.prototype.hasOwnProperty.call(i,a)},s.p="",s(s.s=22)})([(function(e,n){var s={};e.exports=s,(function(){s._nextId=0,s._seed=0,s._nowStartTime=+new Date,s._warnedOnce={},s._decomp=null,s.extend=function(a,o){var l,h;typeof o=="boolean"?(l=2,h=o):(l=1,h=!0);for(var u=l;u<arguments.length;u++){var d=arguments[u];if(d)for(var f in d)h&&d[f]&&d[f].constructor===Object&&(!a[f]||a[f].constructor===Object)?(a[f]=a[f]||{},s.extend(a[f],h,d[f])):a[f]=d[f]}return a},s.clone=function(a,o){return s.extend({},o,a)},s.keys=function(a){if(Object.keys)return Object.keys(a);var o=[];for(var l in a)o.push(l);return o},s.values=function(a){var o=[];if(Object.keys){for(var l=Object.keys(a),h=0;h<l.length;h++)o.push(a[l[h]]);return o}for(var u in a)o.push(a[u]);return o},s.get=function(a,o,l,h){o=o.split(".").slice(l,h);for(var u=0;u<o.length;u+=1)a=a[o[u]];return a},s.set=function(a,o,l,h,u){var d=o.split(".").slice(h,u);return s.get(a,o,0,-1)[d[d.length-1]]=l,l},s.shuffle=function(a){for(var o=a.length-1;o>0;o--){var l=Math.floor(s.random()*(o+1)),h=a[o];a[o]=a[l],a[l]=h}return a},s.choose=function(a){return a[Math.floor(s.random()*a.length)]},s.isElement=function(a){return typeof HTMLElement<"u"?a instanceof HTMLElement:!!(a&&a.nodeType&&a.nodeName)},s.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"},s.isFunction=function(a){return typeof a=="function"},s.isPlainObject=function(a){return typeof a=="object"&&a.constructor===Object},s.isString=function(a){return toString.call(a)==="[object String]"},s.clamp=function(a,o,l){return a<o?o:a>l?l:a},s.sign=function(a){return a<0?-1:1},s.now=function(){if(typeof window<"u"&&window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return Date.now?Date.now():new Date-s._nowStartTime},s.random=function(a,o){return a=typeof a<"u"?a:0,o=typeof o<"u"?o:1,a+i()*(o-a)};var i=function(){return s._seed=(s._seed*9301+49297)%233280,s._seed/233280};s.colorToNumber=function(a){return a=a.replace("#",""),a.length==3&&(a=a.charAt(0)+a.charAt(0)+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)),parseInt(a,16)},s.logLevel=1,s.log=function(){console&&s.logLevel>0&&s.logLevel<=3&&console.log.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},s.info=function(){console&&s.logLevel>0&&s.logLevel<=2&&console.info.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},s.warn=function(){console&&s.logLevel>0&&s.logLevel<=3&&console.warn.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},s.warnOnce=function(){var a=Array.prototype.slice.call(arguments).join(" ");s._warnedOnce[a]||(s.warn(a),s._warnedOnce[a]=!0)},s.deprecated=function(a,o,l){a[o]=s.chain(function(){s.warnOnce("🔅 deprecated 🔅",l)},a[o])},s.nextId=function(){return s._nextId++},s.indexOf=function(a,o){if(a.indexOf)return a.indexOf(o);for(var l=0;l<a.length;l++)if(a[l]===o)return l;return-1},s.map=function(a,o){if(a.map)return a.map(o);for(var l=[],h=0;h<a.length;h+=1)l.push(o(a[h]));return l},s.topologicalSort=function(a){var o=[],l=[],h=[];for(var u in a)!l[u]&&!h[u]&&s._topologicalSort(u,l,h,a,o);return o},s._topologicalSort=function(a,o,l,h,u){var d=h[a]||[];l[a]=!0;for(var f=0;f<d.length;f+=1){var c=d[f];l[c]||o[c]||s._topologicalSort(c,o,l,h,u)}l[a]=!1,o[a]=!0,u.push(a)},s.chain=function(){for(var a=[],o=0;o<arguments.length;o+=1){var l=arguments[o];l._chained?a.push.apply(a,l._chained):a.push(l)}var h=function(){for(var u,d=new Array(arguments.length),f=0,c=arguments.length;f<c;f++)d[f]=arguments[f];for(f=0;f<a.length;f+=1){var p=a[f].apply(u,d);typeof p<"u"&&(u=p)}return u};return h._chained=a,h},s.chainPathBefore=function(a,o,l){return s.set(a,o,s.chain(l,s.get(a,o)))},s.chainPathAfter=function(a,o,l){return s.set(a,o,s.chain(s.get(a,o),l))},s.setDecomp=function(a){s._decomp=a},s.getDecomp=function(){var a=s._decomp;try{!a&&typeof window<"u"&&(a=window.decomp),!a&&typeof $l<"u"&&(a=$l.decomp)}catch{a=null}return a}})()}),(function(e,n){var s={};e.exports=s,(function(){s.create=function(i){var a={min:{x:0,y:0},max:{x:0,y:0}};return i&&s.update(a,i),a},s.update=function(i,a,o){i.min.x=1/0,i.max.x=-1/0,i.min.y=1/0,i.max.y=-1/0;for(var l=0;l<a.length;l++){var h=a[l];h.x>i.max.x&&(i.max.x=h.x),h.x<i.min.x&&(i.min.x=h.x),h.y>i.max.y&&(i.max.y=h.y),h.y<i.min.y&&(i.min.y=h.y)}o&&(o.x>0?i.max.x+=o.x:i.min.x+=o.x,o.y>0?i.max.y+=o.y:i.min.y+=o.y)},s.contains=function(i,a){return a.x>=i.min.x&&a.x<=i.max.x&&a.y>=i.min.y&&a.y<=i.max.y},s.overlaps=function(i,a){return i.min.x<=a.max.x&&i.max.x>=a.min.x&&i.max.y>=a.min.y&&i.min.y<=a.max.y},s.translate=function(i,a){i.min.x+=a.x,i.max.x+=a.x,i.min.y+=a.y,i.max.y+=a.y},s.shift=function(i,a){var o=i.max.x-i.min.x,l=i.max.y-i.min.y;i.min.x=a.x,i.max.x=a.x+o,i.min.y=a.y,i.max.y=a.y+l}})()}),(function(e,n){var s={};e.exports=s,(function(){s.create=function(i,a){return{x:i||0,y:a||0}},s.clone=function(i){return{x:i.x,y:i.y}},s.magnitude=function(i){return Math.sqrt(i.x*i.x+i.y*i.y)},s.magnitudeSquared=function(i){return i.x*i.x+i.y*i.y},s.rotate=function(i,a,o){var l=Math.cos(a),h=Math.sin(a);o||(o={});var u=i.x*l-i.y*h;return o.y=i.x*h+i.y*l,o.x=u,o},s.rotateAbout=function(i,a,o,l){var h=Math.cos(a),u=Math.sin(a);l||(l={});var d=o.x+((i.x-o.x)*h-(i.y-o.y)*u);return l.y=o.y+((i.x-o.x)*u+(i.y-o.y)*h),l.x=d,l},s.normalise=function(i){var a=s.magnitude(i);return a===0?{x:0,y:0}:{x:i.x/a,y:i.y/a}},s.dot=function(i,a){return i.x*a.x+i.y*a.y},s.cross=function(i,a){return i.x*a.y-i.y*a.x},s.cross3=function(i,a,o){return(a.x-i.x)*(o.y-i.y)-(a.y-i.y)*(o.x-i.x)},s.add=function(i,a,o){return o||(o={}),o.x=i.x+a.x,o.y=i.y+a.y,o},s.sub=function(i,a,o){return o||(o={}),o.x=i.x-a.x,o.y=i.y-a.y,o},s.mult=function(i,a){return{x:i.x*a,y:i.y*a}},s.div=function(i,a){return{x:i.x/a,y:i.y/a}},s.perp=function(i,a){return a=a===!0?-1:1,{x:a*-i.y,y:a*i.x}},s.neg=function(i){return{x:-i.x,y:-i.y}},s.angle=function(i,a){return Math.atan2(a.y-i.y,a.x-i.x)},s._temp=[s.create(),s.create(),s.create(),s.create(),s.create(),s.create()]})()}),(function(e,n,s){var i={};e.exports=i;var a=s(2),o=s(0);(function(){i.create=function(l,h){for(var u=[],d=0;d<l.length;d++){var f=l[d],c={x:f.x,y:f.y,index:d,body:h,isInternal:!1};u.push(c)}return u},i.fromPath=function(l,h){var u=/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,d=[];return l.replace(u,function(f,c,p){d.push({x:parseFloat(c),y:parseFloat(p)})}),i.create(d,h)},i.centre=function(l){for(var h=i.area(l,!0),u={x:0,y:0},d,f,c,p=0;p<l.length;p++)c=(p+1)%l.length,d=a.cross(l[p],l[c]),f=a.mult(a.add(l[p],l[c]),d),u=a.add(u,f);return a.div(u,6*h)},i.mean=function(l){for(var h={x:0,y:0},u=0;u<l.length;u++)h.x+=l[u].x,h.y+=l[u].y;return a.div(h,l.length)},i.area=function(l,h){for(var u=0,d=l.length-1,f=0;f<l.length;f++)u+=(l[d].x-l[f].x)*(l[d].y+l[f].y),d=f;return h?u/2:Math.abs(u)/2},i.inertia=function(l,h){for(var u=0,d=0,f=l,c,p,v=0;v<f.length;v++)p=(v+1)%f.length,c=Math.abs(a.cross(f[p],f[v])),u+=c*(a.dot(f[p],f[p])+a.dot(f[p],f[v])+a.dot(f[v],f[v])),d+=c;return h/6*(u/d)},i.translate=function(l,h,u){var d;if(u)for(d=0;d<l.length;d++)l[d].x+=h.x*u,l[d].y+=h.y*u;else for(d=0;d<l.length;d++)l[d].x+=h.x,l[d].y+=h.y;return l},i.rotate=function(l,h,u){if(h!==0){for(var d=Math.cos(h),f=Math.sin(h),c=0;c<l.length;c++){var p=l[c],v=p.x-u.x,m=p.y-u.y;p.x=u.x+(v*d-m*f),p.y=u.y+(v*f+m*d)}return l}},i.contains=function(l,h){for(var u=0;u<l.length;u++){var d=l[u],f=l[(u+1)%l.length];if((h.x-d.x)*(f.y-d.y)+(h.y-d.y)*(d.x-f.x)>0)return!1}return!0},i.scale=function(l,h,u,d){if(h===1&&u===1)return l;d=d||i.centre(l);for(var f,c,p=0;p<l.length;p++)f=l[p],c=a.sub(f,d),l[p].x=d.x+c.x*h,l[p].y=d.y+c.y*u;return l},i.chamfer=function(l,h,u,d,f){typeof h=="number"?h=[h]:h=h||[8],u=typeof u<"u"?u:-1,d=d||2,f=f||14;for(var c=[],p=0;p<l.length;p++){var v=l[p-1>=0?p-1:l.length-1],m=l[p],g=l[(p+1)%l.length],T=h[p<h.length?p:h.length-1];if(T===0){c.push(m);continue}var M=a.normalise({x:m.y-v.y,y:v.x-m.x}),x=a.normalise({x:g.y-m.y,y:m.x-g.x}),S=Math.sqrt(2*Math.pow(T,2)),_=a.mult(o.clone(M),T),y=a.normalise(a.mult(a.add(M,x),.5)),A=a.sub(m,a.mult(y,S)),E=u;u===-1&&(E=Math.pow(T,.32)*1.75),E=o.clamp(E,d,f),E%2===1&&(E+=1);for(var w=Math.acos(a.dot(M,x)),b=w/E,U=0;U<E;U++)c.push(a.add(a.rotate(_,b*U),A))}return c},i.clockwiseSort=function(l){var h=i.mean(l);return l.sort(function(u,d){return a.angle(h,u)-a.angle(h,d)}),l},i.isConvex=function(l){var h=0,u=l.length,d,f,c,p;if(u<3)return null;for(d=0;d<u;d++)if(f=(d+1)%u,c=(d+2)%u,p=(l[f].x-l[d].x)*(l[c].y-l[f].y),p-=(l[f].y-l[d].y)*(l[c].x-l[f].x),p<0?h|=1:p>0&&(h|=2),h===3)return!1;return h!==0?!0:null},i.hull=function(l){var h=[],u=[],d,f;for(l=l.slice(0),l.sort(function(c,p){var v=c.x-p.x;return v!==0?v:c.y-p.y}),f=0;f<l.length;f+=1){for(d=l[f];u.length>=2&&a.cross3(u[u.length-2],u[u.length-1],d)<=0;)u.pop();u.push(d)}for(f=l.length-1;f>=0;f-=1){for(d=l[f];h.length>=2&&a.cross3(h[h.length-2],h[h.length-1],d)<=0;)h.pop();h.push(d)}return h.pop(),u.pop(),h.concat(u)}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(0);(function(){i.on=function(o,l,h){for(var u=l.split(" "),d,f=0;f<u.length;f++)d=u[f],o.events=o.events||{},o.events[d]=o.events[d]||[],o.events[d].push(h);return h},i.off=function(o,l,h){if(!l){o.events={};return}typeof l=="function"&&(h=l,l=a.keys(o.events).join(" "));for(var u=l.split(" "),d=0;d<u.length;d++){var f=o.events[u[d]],c=[];if(h&&f)for(var p=0;p<f.length;p++)f[p]!==h&&c.push(f[p]);o.events[u[d]]=c}},i.trigger=function(o,l,h){var u,d,f,c,p=o.events;if(p&&a.keys(p).length>0){h||(h={}),u=l.split(" ");for(var v=0;v<u.length;v++)if(d=u[v],f=p[d],f){c=a.clone(h,!1),c.name=d,c.source=o;for(var m=0;m<f.length;m++)f[m].apply(o,[c])}}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(4),o=s(0),l=s(1),h=s(6);(function(){i.create=function(u){return o.extend({id:o.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite",plugin:{}},u)},i.setModified=function(u,d,f,c){if(u.isModified=d,f&&u.parent&&i.setModified(u.parent,d,f,c),c)for(var p=0;p<u.composites.length;p++){var v=u.composites[p];i.setModified(v,d,f,c)}},i.add=function(u,d){var f=[].concat(d);a.trigger(u,"beforeAdd",{object:d});for(var c=0;c<f.length;c++){var p=f[c];switch(p.type){case"body":if(p.parent!==p){o.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break}i.addBody(u,p);break;case"constraint":i.addConstraint(u,p);break;case"composite":i.addComposite(u,p);break;case"mouseConstraint":i.addConstraint(u,p.constraint);break}}return a.trigger(u,"afterAdd",{object:d}),u},i.remove=function(u,d,f){var c=[].concat(d);a.trigger(u,"beforeRemove",{object:d});for(var p=0;p<c.length;p++){var v=c[p];switch(v.type){case"body":i.removeBody(u,v,f);break;case"constraint":i.removeConstraint(u,v,f);break;case"composite":i.removeComposite(u,v,f);break;case"mouseConstraint":i.removeConstraint(u,v.constraint);break}}return a.trigger(u,"afterRemove",{object:d}),u},i.addComposite=function(u,d){return u.composites.push(d),d.parent=u,i.setModified(u,!0,!0,!1),u},i.removeComposite=function(u,d,f){var c=o.indexOf(u.composites,d);if(c!==-1&&(i.removeCompositeAt(u,c),i.setModified(u,!0,!0,!1)),f)for(var p=0;p<u.composites.length;p++)i.removeComposite(u.composites[p],d,!0);return u},i.removeCompositeAt=function(u,d){return u.composites.splice(d,1),i.setModified(u,!0,!0,!1),u},i.addBody=function(u,d){return u.bodies.push(d),i.setModified(u,!0,!0,!1),u},i.removeBody=function(u,d,f){var c=o.indexOf(u.bodies,d);if(c!==-1&&(i.removeBodyAt(u,c),i.setModified(u,!0,!0,!1)),f)for(var p=0;p<u.composites.length;p++)i.removeBody(u.composites[p],d,!0);return u},i.removeBodyAt=function(u,d){return u.bodies.splice(d,1),i.setModified(u,!0,!0,!1),u},i.addConstraint=function(u,d){return u.constraints.push(d),i.setModified(u,!0,!0,!1),u},i.removeConstraint=function(u,d,f){var c=o.indexOf(u.constraints,d);if(c!==-1&&i.removeConstraintAt(u,c),f)for(var p=0;p<u.composites.length;p++)i.removeConstraint(u.composites[p],d,!0);return u},i.removeConstraintAt=function(u,d){return u.constraints.splice(d,1),i.setModified(u,!0,!0,!1),u},i.clear=function(u,d,f){if(f)for(var c=0;c<u.composites.length;c++)i.clear(u.composites[c],d,!0);return d?u.bodies=u.bodies.filter(function(p){return p.isStatic}):u.bodies.length=0,u.constraints.length=0,u.composites.length=0,i.setModified(u,!0,!0,!1),u},i.allBodies=function(u){for(var d=[].concat(u.bodies),f=0;f<u.composites.length;f++)d=d.concat(i.allBodies(u.composites[f]));return d},i.allConstraints=function(u){for(var d=[].concat(u.constraints),f=0;f<u.composites.length;f++)d=d.concat(i.allConstraints(u.composites[f]));return d},i.allComposites=function(u){for(var d=[].concat(u.composites),f=0;f<u.composites.length;f++)d=d.concat(i.allComposites(u.composites[f]));return d},i.get=function(u,d,f){var c,p;switch(f){case"body":c=i.allBodies(u);break;case"constraint":c=i.allConstraints(u);break;case"composite":c=i.allComposites(u).concat(u);break}return c?(p=c.filter(function(v){return v.id.toString()===d.toString()}),p.length===0?null:p[0]):null},i.move=function(u,d,f){return i.remove(u,d),i.add(f,d),u},i.rebase=function(u){for(var d=i.allBodies(u).concat(i.allConstraints(u)).concat(i.allComposites(u)),f=0;f<d.length;f++)d[f].id=o.nextId();return i.setModified(u,!0,!0,!1),u},i.translate=function(u,d,f){for(var c=f?i.allBodies(u):u.bodies,p=0;p<c.length;p++)h.translate(c[p],d);return i.setModified(u,!0,!0,!1),u},i.rotate=function(u,d,f,c){for(var p=Math.cos(d),v=Math.sin(d),m=c?i.allBodies(u):u.bodies,g=0;g<m.length;g++){var T=m[g],M=T.position.x-f.x,x=T.position.y-f.y;h.setPosition(T,{x:f.x+(M*p-x*v),y:f.y+(M*v+x*p)}),h.rotate(T,d)}return i.setModified(u,!0,!0,!1),u},i.scale=function(u,d,f,c,p){for(var v=p?i.allBodies(u):u.bodies,m=0;m<v.length;m++){var g=v[m],T=g.position.x-c.x,M=g.position.y-c.y;h.setPosition(g,{x:c.x+T*d,y:c.y+M*f}),h.scale(g,d,f)}return i.setModified(u,!0,!0,!1),u},i.bounds=function(u){for(var d=i.allBodies(u),f=[],c=0;c<d.length;c+=1){var p=d[c];f.push(p.bounds.min,p.bounds.max)}return l.create(f)}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(2),l=s(7);s(16);var h=s(0),u=s(1),d=s(10);(function(){i._inertiaScale=4,i._nextCollidingGroupId=1,i._nextNonCollidingGroupId=-1,i._nextCategory=1,i.create=function(c){var p={id:h.nextId(),type:"body",label:"Body",parts:[],plugin:{},angle:0,vertices:a.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,strokeStyle:null,fillStyle:null,lineWidth:null,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0}},events:null,bounds:null,chamfer:null,circleRadius:0,positionPrev:null,anglePrev:0,parent:null,axes:null,area:0,mass:0,inertia:0,_original:null},v=h.extend(p,c);return f(v,c),v},i.nextGroup=function(c){return c?i._nextNonCollidingGroupId--:i._nextCollidingGroupId++},i.nextCategory=function(){return i._nextCategory=i._nextCategory<<1,i._nextCategory};var f=function(c,p){p=p||{},i.set(c,{bounds:c.bounds||u.create(c.vertices),positionPrev:c.positionPrev||o.clone(c.position),anglePrev:c.anglePrev||c.angle,vertices:c.vertices,parts:c.parts||[c],isStatic:c.isStatic,isSleeping:c.isSleeping,parent:c.parent||c}),a.rotate(c.vertices,c.angle,c.position),d.rotate(c.axes,c.angle),u.update(c.bounds,c.vertices,c.velocity),i.set(c,{axes:p.axes||c.axes,area:p.area||c.area,mass:p.mass||c.mass,inertia:p.inertia||c.inertia});var v=c.isStatic?"#14151f":h.choose(["#f19648","#f5d259","#f55a3c","#063e7b","#ececd1"]),m=c.isStatic?"#555":"#ccc",g=c.isStatic&&c.render.fillStyle===null?1:0;c.render.fillStyle=c.render.fillStyle||v,c.render.strokeStyle=c.render.strokeStyle||m,c.render.lineWidth=c.render.lineWidth||g,c.render.sprite.xOffset+=-(c.bounds.min.x-c.position.x)/(c.bounds.max.x-c.bounds.min.x),c.render.sprite.yOffset+=-(c.bounds.min.y-c.position.y)/(c.bounds.max.y-c.bounds.min.y)};i.set=function(c,p,v){var m;typeof p=="string"&&(m=p,p={},p[m]=v);for(m in p)if(Object.prototype.hasOwnProperty.call(p,m))switch(v=p[m],m){case"isStatic":i.setStatic(c,v);break;case"isSleeping":l.set(c,v);break;case"mass":i.setMass(c,v);break;case"density":i.setDensity(c,v);break;case"inertia":i.setInertia(c,v);break;case"vertices":i.setVertices(c,v);break;case"position":i.setPosition(c,v);break;case"angle":i.setAngle(c,v);break;case"velocity":i.setVelocity(c,v);break;case"angularVelocity":i.setAngularVelocity(c,v);break;case"parts":i.setParts(c,v);break;case"centre":i.setCentre(c,v);break;default:c[m]=v}},i.setStatic=function(c,p){for(var v=0;v<c.parts.length;v++){var m=c.parts[v];m.isStatic=p,p?(m._original={restitution:m.restitution,friction:m.friction,mass:m.mass,inertia:m.inertia,density:m.density,inverseMass:m.inverseMass,inverseInertia:m.inverseInertia},m.restitution=0,m.friction=1,m.mass=m.inertia=m.density=1/0,m.inverseMass=m.inverseInertia=0,m.positionPrev.x=m.position.x,m.positionPrev.y=m.position.y,m.anglePrev=m.angle,m.angularVelocity=0,m.speed=0,m.angularSpeed=0,m.motion=0):m._original&&(m.restitution=m._original.restitution,m.friction=m._original.friction,m.mass=m._original.mass,m.inertia=m._original.inertia,m.density=m._original.density,m.inverseMass=m._original.inverseMass,m.inverseInertia=m._original.inverseInertia,m._original=null)}},i.setMass=function(c,p){var v=c.inertia/(c.mass/6);c.inertia=v*(p/6),c.inverseInertia=1/c.inertia,c.mass=p,c.inverseMass=1/c.mass,c.density=c.mass/c.area},i.setDensity=function(c,p){i.setMass(c,p*c.area),c.density=p},i.setInertia=function(c,p){c.inertia=p,c.inverseInertia=1/c.inertia},i.setVertices=function(c,p){p[0].body===c?c.vertices=p:c.vertices=a.create(p,c),c.axes=d.fromVertices(c.vertices),c.area=a.area(c.vertices),i.setMass(c,c.density*c.area);var v=a.centre(c.vertices);a.translate(c.vertices,v,-1),i.setInertia(c,i._inertiaScale*a.inertia(c.vertices,c.mass)),a.translate(c.vertices,c.position),u.update(c.bounds,c.vertices,c.velocity)},i.setParts=function(c,p,v){var m;for(p=p.slice(0),c.parts.length=0,c.parts.push(c),c.parent=c,m=0;m<p.length;m++){var g=p[m];g!==c&&(g.parent=c,c.parts.push(g))}if(c.parts.length!==1){if(v=typeof v<"u"?v:!0,v){var T=[];for(m=0;m<p.length;m++)T=T.concat(p[m].vertices);a.clockwiseSort(T);var M=a.hull(T),x=a.centre(M);i.setVertices(c,M),a.translate(c.vertices,x)}var S=i._totalProperties(c);c.area=S.area,c.parent=c,c.position.x=S.centre.x,c.position.y=S.centre.y,c.positionPrev.x=S.centre.x,c.positionPrev.y=S.centre.y,i.setMass(c,S.mass),i.setInertia(c,S.inertia),i.setPosition(c,S.centre)}},i.setCentre=function(c,p,v){v?(c.positionPrev.x+=p.x,c.positionPrev.y+=p.y,c.position.x+=p.x,c.position.y+=p.y):(c.positionPrev.x=p.x-(c.position.x-c.positionPrev.x),c.positionPrev.y=p.y-(c.position.y-c.positionPrev.y),c.position.x=p.x,c.position.y=p.y)},i.setPosition=function(c,p){var v=o.sub(p,c.position);c.positionPrev.x+=v.x,c.positionPrev.y+=v.y;for(var m=0;m<c.parts.length;m++){var g=c.parts[m];g.position.x+=v.x,g.position.y+=v.y,a.translate(g.vertices,v),u.update(g.bounds,g.vertices,c.velocity)}},i.setAngle=function(c,p){var v=p-c.angle;c.anglePrev+=v;for(var m=0;m<c.parts.length;m++){var g=c.parts[m];g.angle+=v,a.rotate(g.vertices,v,c.position),d.rotate(g.axes,v),u.update(g.bounds,g.vertices,c.velocity),m>0&&o.rotateAbout(g.position,v,c.position,g.position)}},i.setVelocity=function(c,p){c.positionPrev.x=c.position.x-p.x,c.positionPrev.y=c.position.y-p.y,c.velocity.x=p.x,c.velocity.y=p.y,c.speed=o.magnitude(c.velocity)},i.setAngularVelocity=function(c,p){c.anglePrev=c.angle-p,c.angularVelocity=p,c.angularSpeed=Math.abs(c.angularVelocity)},i.translate=function(c,p){i.setPosition(c,o.add(c.position,p))},i.rotate=function(c,p,v){if(!v)i.setAngle(c,c.angle+p);else{var m=Math.cos(p),g=Math.sin(p),T=c.position.x-v.x,M=c.position.y-v.y;i.setPosition(c,{x:v.x+(T*m-M*g),y:v.y+(T*g+M*m)}),i.setAngle(c,c.angle+p)}},i.scale=function(c,p,v,m){var g=0,T=0;m=m||c.position;for(var M=0;M<c.parts.length;M++){var x=c.parts[M];a.scale(x.vertices,p,v,m),x.axes=d.fromVertices(x.vertices),x.area=a.area(x.vertices),i.setMass(x,c.density*x.area),a.translate(x.vertices,{x:-x.position.x,y:-x.position.y}),i.setInertia(x,i._inertiaScale*a.inertia(x.vertices,x.mass)),a.translate(x.vertices,{x:x.position.x,y:x.position.y}),M>0&&(g+=x.area,T+=x.inertia),x.position.x=m.x+(x.position.x-m.x)*p,x.position.y=m.y+(x.position.y-m.y)*v,u.update(x.bounds,x.vertices,c.velocity)}c.parts.length>1&&(c.area=g,c.isStatic||(i.setMass(c,c.density*g),i.setInertia(c,T))),c.circleRadius&&(p===v?c.circleRadius*=p:c.circleRadius=null)},i.update=function(c,p,v,m){var g=Math.pow(p*v*c.timeScale,2),T=1-c.frictionAir*v*c.timeScale,M=c.position.x-c.positionPrev.x,x=c.position.y-c.positionPrev.y;c.velocity.x=M*T*m+c.force.x/c.mass*g,c.velocity.y=x*T*m+c.force.y/c.mass*g,c.positionPrev.x=c.position.x,c.positionPrev.y=c.position.y,c.position.x+=c.velocity.x,c.position.y+=c.velocity.y,c.angularVelocity=(c.angle-c.anglePrev)*T*m+c.torque/c.inertia*g,c.anglePrev=c.angle,c.angle+=c.angularVelocity,c.speed=o.magnitude(c.velocity),c.angularSpeed=Math.abs(c.angularVelocity);for(var S=0;S<c.parts.length;S++){var _=c.parts[S];a.translate(_.vertices,c.velocity),S>0&&(_.position.x+=c.velocity.x,_.position.y+=c.velocity.y),c.angularVelocity!==0&&(a.rotate(_.vertices,c.angularVelocity,c.position),d.rotate(_.axes,c.angularVelocity),S>0&&o.rotateAbout(_.position,c.angularVelocity,c.position,_.position)),u.update(_.bounds,_.vertices,c.velocity)}},i.applyForce=function(c,p,v){c.force.x+=v.x,c.force.y+=v.y;var m={x:p.x-c.position.x,y:p.y-c.position.y};c.torque+=m.x*v.y-m.y*v.x},i._totalProperties=function(c){for(var p={mass:0,area:0,inertia:0,centre:{x:0,y:0}},v=c.parts.length===1?0:1;v<c.parts.length;v++){var m=c.parts[v],g=m.mass!==1/0?m.mass:1;p.mass+=g,p.area+=m.area,p.inertia+=m.inertia,p.centre=o.add(p.centre,o.mult(m.position,g))}return p.centre=o.div(p.centre,p.mass),p}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(4);(function(){i._motionWakeThreshold=.18,i._motionSleepThreshold=.08,i._minBias=.9,i.update=function(o,l){for(var h=l*l*l,u=0;u<o.length;u++){var d=o[u],f=d.speed*d.speed+d.angularSpeed*d.angularSpeed;if(d.force.x!==0||d.force.y!==0){i.set(d,!1);continue}var c=Math.min(d.motion,f),p=Math.max(d.motion,f);d.motion=i._minBias*c+(1-i._minBias)*p,d.sleepThreshold>0&&d.motion<i._motionSleepThreshold*h?(d.sleepCounter+=1,d.sleepCounter>=d.sleepThreshold&&i.set(d,!0)):d.sleepCounter>0&&(d.sleepCounter-=1)}},i.afterCollisions=function(o,l){for(var h=l*l*l,u=0;u<o.length;u++){var d=o[u];if(d.isActive){var f=d.collision,c=f.bodyA.parent,p=f.bodyB.parent;if(!(c.isSleeping&&p.isSleeping||c.isStatic||p.isStatic)&&(c.isSleeping||p.isSleeping)){var v=c.isSleeping&&!c.isStatic?c:p,m=v===c?p:c;!v.isStatic&&m.motion>i._motionWakeThreshold*h&&i.set(v,!1)}}}},i.set=function(o,l){var h=o.isSleeping;l?(o.isSleeping=!0,o.sleepCounter=o.sleepThreshold,o.positionImpulse.x=0,o.positionImpulse.y=0,o.positionPrev.x=o.position.x,o.positionPrev.y=o.position.y,o.anglePrev=o.angle,o.speed=0,o.angularSpeed=0,o.motion=0,h||a.trigger(o,"sleepStart")):(o.isSleeping=!1,o.sleepCounter=0,h&&a.trigger(o,"sleepEnd"))}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(2),l=s(7),h=s(1),u=s(10),d=s(0);(function(){i._warming=.4,i._torqueDampen=1,i._minLength=1e-6,i.create=function(f){var c=f;c.bodyA&&!c.pointA&&(c.pointA={x:0,y:0}),c.bodyB&&!c.pointB&&(c.pointB={x:0,y:0});var p=c.bodyA?o.add(c.bodyA.position,c.pointA):c.pointA,v=c.bodyB?o.add(c.bodyB.position,c.pointB):c.pointB,m=o.magnitude(o.sub(p,v));c.length=typeof c.length<"u"?c.length:m,c.id=c.id||d.nextId(),c.label=c.label||"Constraint",c.type="constraint",c.stiffness=c.stiffness||(c.length>0?1:.7),c.damping=c.damping||0,c.angularStiffness=c.angularStiffness||0,c.angleA=c.bodyA?c.bodyA.angle:c.angleA,c.angleB=c.bodyB?c.bodyB.angle:c.angleB,c.plugin={};var g={visible:!0,lineWidth:2,strokeStyle:"#ffffff",type:"line",anchors:!0};return c.length===0&&c.stiffness>.1?(g.type="pin",g.anchors=!1):c.stiffness<.9&&(g.type="spring"),c.render=d.extend(g,c.render),c},i.preSolveAll=function(f){for(var c=0;c<f.length;c+=1){var p=f[c],v=p.constraintImpulse;p.isStatic||v.x===0&&v.y===0&&v.angle===0||(p.position.x+=v.x,p.position.y+=v.y,p.angle+=v.angle)}},i.solveAll=function(f,c){for(var p=0;p<f.length;p+=1){var v=f[p],m=!v.bodyA||v.bodyA&&v.bodyA.isStatic,g=!v.bodyB||v.bodyB&&v.bodyB.isStatic;(m||g)&&i.solve(f[p],c)}for(p=0;p<f.length;p+=1)v=f[p],m=!v.bodyA||v.bodyA&&v.bodyA.isStatic,g=!v.bodyB||v.bodyB&&v.bodyB.isStatic,!m&&!g&&i.solve(f[p],c)},i.solve=function(f,c){var p=f.bodyA,v=f.bodyB,m=f.pointA,g=f.pointB;if(!(!p&&!v)){p&&!p.isStatic&&(o.rotate(m,p.angle-f.angleA,m),f.angleA=p.angle),v&&!v.isStatic&&(o.rotate(g,v.angle-f.angleB,g),f.angleB=v.angle);var T=m,M=g;if(p&&(T=o.add(p.position,m)),v&&(M=o.add(v.position,g)),!(!T||!M)){var x=o.sub(T,M),S=o.magnitude(x);S<i._minLength&&(S=i._minLength);var _=(S-f.length)/S,y=f.stiffness<1?f.stiffness*c:f.stiffness,A=o.mult(x,_*y),E=(p?p.inverseMass:0)+(v?v.inverseMass:0),w=(p?p.inverseInertia:0)+(v?v.inverseInertia:0),b=E+w,U,I,F,k,O;if(f.damping){var Z=o.create();F=o.div(x,S),O=o.sub(v&&o.sub(v.position,v.positionPrev)||Z,p&&o.sub(p.position,p.positionPrev)||Z),k=o.dot(F,O)}p&&!p.isStatic&&(I=p.inverseMass/E,p.constraintImpulse.x-=A.x*I,p.constraintImpulse.y-=A.y*I,p.position.x-=A.x*I,p.position.y-=A.y*I,f.damping&&(p.positionPrev.x-=f.damping*F.x*k*I,p.positionPrev.y-=f.damping*F.y*k*I),U=o.cross(m,A)/b*i._torqueDampen*p.inverseInertia*(1-f.angularStiffness),p.constraintImpulse.angle-=U,p.angle-=U),v&&!v.isStatic&&(I=v.inverseMass/E,v.constraintImpulse.x+=A.x*I,v.constraintImpulse.y+=A.y*I,v.position.x+=A.x*I,v.position.y+=A.y*I,f.damping&&(v.positionPrev.x+=f.damping*F.x*k*I,v.positionPrev.y+=f.damping*F.y*k*I),U=o.cross(g,A)/b*i._torqueDampen*v.inverseInertia*(1-f.angularStiffness),v.constraintImpulse.angle+=U,v.angle+=U)}}},i.postSolveAll=function(f){for(var c=0;c<f.length;c++){var p=f[c],v=p.constraintImpulse;if(!(p.isStatic||v.x===0&&v.y===0&&v.angle===0)){l.set(p,!1);for(var m=0;m<p.parts.length;m++){var g=p.parts[m];a.translate(g.vertices,v),m>0&&(g.position.x+=v.x,g.position.y+=v.y),v.angle!==0&&(a.rotate(g.vertices,v.angle,p.position),u.rotate(g.axes,v.angle),m>0&&o.rotateAbout(g.position,v.angle,p.position,g.position)),h.update(g.bounds,g.vertices,p.velocity)}v.angle*=i._warming,v.x*=i._warming,v.y*=i._warming}}},i.pointAWorld=function(f){return{x:(f.bodyA?f.bodyA.position.x:0)+f.pointA.x,y:(f.bodyA?f.bodyA.position.y:0)+f.pointA.y}},i.pointBWorld=function(f){return{x:(f.bodyB?f.bodyB.position.x:0)+f.pointB.x,y:(f.bodyB?f.bodyB.position.y:0)+f.pointB.y}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(17);(function(){i.create=function(o,l){var h=o.bodyA,u=o.bodyB,d=o.parentA,f=o.parentB,c={id:i.id(h,u),bodyA:h,bodyB:u,contacts:{},activeContacts:[],separation:0,isActive:!0,confirmedActive:!0,isSensor:h.isSensor||u.isSensor,timeCreated:l,timeUpdated:l,inverseMass:d.inverseMass+f.inverseMass,friction:Math.min(d.friction,f.friction),frictionStatic:Math.max(d.frictionStatic,f.frictionStatic),restitution:Math.max(d.restitution,f.restitution),slop:Math.max(d.slop,f.slop)};return i.update(c,o,l),c},i.update=function(o,l,h){var u=o.contacts,d=l.supports,f=o.activeContacts,c=l.parentA,p=l.parentB;if(o.collision=l,o.inverseMass=c.inverseMass+p.inverseMass,o.friction=Math.min(c.friction,p.friction),o.frictionStatic=Math.max(c.frictionStatic,p.frictionStatic),o.restitution=Math.max(c.restitution,p.restitution),o.slop=Math.max(c.slop,p.slop),f.length=0,l.collided){for(var v=0;v<d.length;v++){var m=d[v],g=a.id(m),T=u[g];T?f.push(T):f.push(u[g]=a.create(m))}o.separation=l.depth,i.setActive(o,!0,h)}else o.isActive===!0&&i.setActive(o,!1,h)},i.setActive=function(o,l,h){l?(o.isActive=!0,o.timeUpdated=h):(o.isActive=!1,o.activeContacts.length=0)},i.id=function(o,l){return o.id<l.id?"A"+o.id+"B"+l.id:"A"+l.id+"B"+o.id}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(2),o=s(0);(function(){i.fromVertices=function(l){for(var h={},u=0;u<l.length;u++){var d=(u+1)%l.length,f=a.normalise({x:l[d].y-l[u].y,y:l[u].x-l[d].x}),c=f.y===0?1/0:f.x/f.y;c=c.toFixed(3).toString(),h[c]=f}return o.values(h)},i.rotate=function(l,h){if(h!==0)for(var u=Math.cos(h),d=Math.sin(h),f=0;f<l.length;f++){var c=l[f],p;p=c.x*u-c.y*d,c.y=c.x*d+c.y*u,c.x=p}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(0),l=s(6),h=s(1),u=s(2);(function(){i.rectangle=function(d,f,c,p,v){v=v||{};var m={label:"Rectangle Body",position:{x:d,y:f},vertices:a.fromPath("L 0 0 L "+c+" 0 L "+c+" "+p+" L 0 "+p)};if(v.chamfer){var g=v.chamfer;m.vertices=a.chamfer(m.vertices,g.radius,g.quality,g.qualityMin,g.qualityMax),delete v.chamfer}return l.create(o.extend({},m,v))},i.trapezoid=function(d,f,c,p,v,m){m=m||{},v*=.5;var g=(1-v*2)*c,T=c*v,M=T+g,x=M+T,S;v<.5?S="L 0 0 L "+T+" "+-p+" L "+M+" "+-p+" L "+x+" 0":S="L 0 0 L "+M+" "+-p+" L "+x+" 0";var _={label:"Trapezoid Body",position:{x:d,y:f},vertices:a.fromPath(S)};if(m.chamfer){var y=m.chamfer;_.vertices=a.chamfer(_.vertices,y.radius,y.quality,y.qualityMin,y.qualityMax),delete m.chamfer}return l.create(o.extend({},_,m))},i.circle=function(d,f,c,p,v){p=p||{};var m={label:"Circle Body",circleRadius:c};v=v||25;var g=Math.ceil(Math.max(10,Math.min(v,c)));return g%2===1&&(g+=1),i.polygon(d,f,g,c,o.extend({},m,p))},i.polygon=function(d,f,c,p,v){if(v=v||{},c<3)return i.circle(d,f,p,v);for(var m=2*Math.PI/c,g="",T=m*.5,M=0;M<c;M+=1){var x=T+M*m,S=Math.cos(x)*p,_=Math.sin(x)*p;g+="L "+S.toFixed(3)+" "+_.toFixed(3)+" "}var y={label:"Polygon Body",position:{x:d,y:f},vertices:a.fromPath(g)};if(v.chamfer){var A=v.chamfer;y.vertices=a.chamfer(y.vertices,A.radius,A.quality,A.qualityMin,A.qualityMax),delete v.chamfer}return l.create(o.extend({},y,v))},i.fromVertices=function(d,f,c,p,v,m,g,T){var M=o.getDecomp(),x,S,_,y,A,E,w,b,U,I,F;for(x=!!(M&&M.quickDecomp),p=p||{},_=[],v=typeof v<"u"?v:!1,m=typeof m<"u"?m:.01,g=typeof g<"u"?g:10,T=typeof T<"u"?T:.01,o.isArray(c[0])||(c=[c]),I=0;I<c.length;I+=1)if(E=c[I],y=a.isConvex(E),A=!y,A&&!x&&o.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."),y||!x)y?E=a.clockwiseSort(E):E=a.hull(E),_.push({position:{x:d,y:f},vertices:E});else{var k=E.map(function(tt){return[tt.x,tt.y]});M.makeCCW(k),m!==!1&&M.removeCollinearPoints(k,m),T!==!1&&M.removeDuplicatePoints&&M.removeDuplicatePoints(k,T);var O=M.quickDecomp(k);for(w=0;w<O.length;w++){var Z=O[w],G=Z.map(function(tt){return{x:tt[0],y:tt[1]}});g>0&&a.area(G)<g||_.push({position:a.centre(G),vertices:G})}}for(w=0;w<_.length;w++)_[w]=l.create(o.extend(_[w],p));if(v){var it=5;for(w=0;w<_.length;w++){var rt=_[w];for(b=w+1;b<_.length;b++){var et=_[b];if(h.overlaps(rt.bounds,et.bounds)){var Mt=rt.vertices,Dt=et.vertices;for(U=0;U<rt.vertices.length;U++)for(F=0;F<et.vertices.length;F++){var N=u.magnitudeSquared(u.sub(Mt[(U+1)%Mt.length],Dt[F])),X=u.magnitudeSquared(u.sub(Mt[U],Dt[(F+1)%Dt.length]));N<it&&X<it&&(Mt[U].isInternal=!0,Dt[F].isInternal=!0)}}}}}return _.length>1?(S=l.create(o.extend({parts:_.slice(0)},p)),l.setPosition(S,{x:d,y:f}),S):_[0]}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(0);(function(){i.create=function(o){var l={};return o||a.log("Mouse.create: element was undefined, defaulting to document.body","warn"),l.element=o||document.body,l.absolute={x:0,y:0},l.position={x:0,y:0},l.mousedownPosition={x:0,y:0},l.mouseupPosition={x:0,y:0},l.offset={x:0,y:0},l.scale={x:1,y:1},l.wheelDelta=0,l.button=-1,l.pixelRatio=parseInt(l.element.getAttribute("data-pixel-ratio"),10)||1,l.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},l.mousemove=function(h){var u=i._getRelativeMousePosition(h,l.element,l.pixelRatio),d=h.changedTouches;d&&(l.button=0,h.preventDefault()),l.absolute.x=u.x,l.absolute.y=u.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y,l.sourceEvents.mousemove=h},l.mousedown=function(h){var u=i._getRelativeMousePosition(h,l.element,l.pixelRatio),d=h.changedTouches;d?(l.button=0,h.preventDefault()):l.button=h.button,l.absolute.x=u.x,l.absolute.y=u.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y,l.mousedownPosition.x=l.position.x,l.mousedownPosition.y=l.position.y,l.sourceEvents.mousedown=h},l.mouseup=function(h){var u=i._getRelativeMousePosition(h,l.element,l.pixelRatio),d=h.changedTouches;d&&h.preventDefault(),l.button=-1,l.absolute.x=u.x,l.absolute.y=u.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y,l.mouseupPosition.x=l.position.x,l.mouseupPosition.y=l.position.y,l.sourceEvents.mouseup=h},l.mousewheel=function(h){l.wheelDelta=Math.max(-1,Math.min(1,h.wheelDelta||-h.detail)),h.preventDefault()},i.setElement(l,l.element),l},i.setElement=function(o,l){o.element=l,l.addEventListener("mousemove",o.mousemove),l.addEventListener("mousedown",o.mousedown),l.addEventListener("mouseup",o.mouseup),l.addEventListener("mousewheel",o.mousewheel),l.addEventListener("DOMMouseScroll",o.mousewheel),l.addEventListener("touchmove",o.mousemove),l.addEventListener("touchstart",o.mousedown),l.addEventListener("touchend",o.mouseup)},i.clearSourceEvents=function(o){o.sourceEvents.mousemove=null,o.sourceEvents.mousedown=null,o.sourceEvents.mouseup=null,o.sourceEvents.mousewheel=null,o.wheelDelta=0},i.setOffset=function(o,l){o.offset.x=l.x,o.offset.y=l.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y},i.setScale=function(o,l){o.scale.x=l.x,o.scale.y=l.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y},i._getRelativeMousePosition=function(o,l,h){var u=l.getBoundingClientRect(),d=document.documentElement||document.body.parentNode||document.body,f=window.pageXOffset!==void 0?window.pageXOffset:d.scrollLeft,c=window.pageYOffset!==void 0?window.pageYOffset:d.scrollTop,p=o.changedTouches,v,m;return p?(v=p[0].pageX-u.left-f,m=p[0].pageY-u.top-c):(v=o.pageX-u.left-f,m=o.pageY-u.top-c),{x:v/(l.clientWidth/(l.width||l.clientWidth)*h),y:m/(l.clientHeight/(l.height||l.clientHeight)*h)}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(14),o=s(9),l=s(1);(function(){i.collisions=function(h,u){for(var d=[],f=u.pairs.table,c=0;c<h.length;c++){var p=h[c][0],v=h[c][1];if(!((p.isStatic||p.isSleeping)&&(v.isStatic||v.isSleeping))&&i.canCollide(p.collisionFilter,v.collisionFilter)&&l.overlaps(p.bounds,v.bounds))for(var m=p.parts.length>1?1:0;m<p.parts.length;m++)for(var g=p.parts[m],T=v.parts.length>1?1:0;T<v.parts.length;T++){var M=v.parts[T];if(g===p&&M===v||l.overlaps(g.bounds,M.bounds)){var x=o.id(g,M),S=f[x],_;S&&S.isActive?_=S.collision:_=null;var y=a.collides(g,M,_);y.collided&&d.push(y)}}}return d},i.canCollide=function(h,u){return h.group===u.group&&h.group!==0?h.group>0:(h.mask&u.category)!==0&&(u.mask&h.category)!==0}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(2);(function(){i.collides=function(l,h,u){var d,f,c,p,v=!1;if(u){var m=l.parent,g=h.parent,T=m.speed*m.speed+m.angularSpeed*m.angularSpeed+g.speed*g.speed+g.angularSpeed*g.angularSpeed;v=u&&u.collided&&T<.2,p=u}else p={collided:!1,bodyA:l,bodyB:h};if(u&&v){var M=p.axisBody,x=M===l?h:l,S=[M.axes[u.axisNumber]];if(c=i._overlapAxes(M.vertices,x.vertices,S),p.reused=!0,c.overlap<=0)return p.collided=!1,p}else{if(d=i._overlapAxes(l.vertices,h.vertices,l.axes),d.overlap<=0||(f=i._overlapAxes(h.vertices,l.vertices,h.axes),f.overlap<=0))return p.collided=!1,p;d.overlap<f.overlap?(c=d,p.axisBody=l):(c=f,p.axisBody=h),p.axisNumber=c.axisNumber}p.bodyA=l.id<h.id?l:h,p.bodyB=l.id<h.id?h:l,p.collided=!0,p.depth=c.overlap,p.parentA=p.bodyA.parent,p.parentB=p.bodyB.parent,l=p.bodyA,h=p.bodyB,o.dot(c.axis,o.sub(h.position,l.position))<0?p.normal={x:c.axis.x,y:c.axis.y}:p.normal={x:-c.axis.x,y:-c.axis.y},p.tangent=o.perp(p.normal),p.penetration=p.penetration||{},p.penetration.x=p.normal.x*p.depth,p.penetration.y=p.normal.y*p.depth;var _=i._findSupports(l,h,p.normal),y=[];if(a.contains(l.vertices,_[0])&&y.push(_[0]),a.contains(l.vertices,_[1])&&y.push(_[1]),y.length<2){var A=i._findSupports(h,l,o.neg(p.normal));a.contains(h.vertices,A[0])&&y.push(A[0]),y.length<2&&a.contains(h.vertices,A[1])&&y.push(A[1])}return y.length<1&&(y=[_[0]]),p.supports=y,p},i._overlapAxes=function(l,h,u){for(var d=o._temp[0],f=o._temp[1],c={overlap:Number.MAX_VALUE},p,v,m=0;m<u.length;m++){if(v=u[m],i._projectToAxis(d,l,v),i._projectToAxis(f,h,v),p=Math.min(d.max-f.min,f.max-d.min),p<=0)return c.overlap=p,c;p<c.overlap&&(c.overlap=p,c.axis=v,c.axisNumber=m)}return c},i._projectToAxis=function(l,h,u){for(var d=o.dot(h[0],u),f=d,c=1;c<h.length;c+=1){var p=o.dot(h[c],u);p>f?f=p:p<d&&(d=p)}l.min=d,l.max=f},i._findSupports=function(l,h,u){for(var d=Number.MAX_VALUE,f=o._temp[0],c=h.vertices,p=l.position,v,m,g,T,M=0;M<c.length;M++)m=c[M],f.x=m.x-p.x,f.y=m.y-p.y,v=-o.dot(u,f),v<d&&(d=v,g=m);var x=g.index-1>=0?g.index-1:c.length-1;m=c[x],f.x=m.x-p.x,f.y=m.y-p.y,d=-o.dot(u,f),T=m;var S=(g.index+1)%c.length;return m=c[S],f.x=m.x-p.x,f.y=m.y-p.y,v=-o.dot(u,f),v<d&&(T=m),[g,T]}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(0);(function(){i._registry={},i.register=function(o){if(i.isPlugin(o)||a.warn("Plugin.register:",i.toString(o),"does not implement all required fields."),o.name in i._registry){var l=i._registry[o.name],h=i.versionParse(o.version).number,u=i.versionParse(l.version).number;h>u?(a.warn("Plugin.register:",i.toString(l),"was upgraded to",i.toString(o)),i._registry[o.name]=o):h<u?a.warn("Plugin.register:",i.toString(l),"can not be downgraded to",i.toString(o)):o!==l&&a.warn("Plugin.register:",i.toString(o),"is already registered to different plugin object")}else i._registry[o.name]=o;return o},i.resolve=function(o){return i._registry[i.dependencyParse(o).name]},i.toString=function(o){return typeof o=="string"?o:(o.name||"anonymous")+"@"+(o.version||o.range||"0.0.0")},i.isPlugin=function(o){return o&&o.name&&o.version&&o.install},i.isUsed=function(o,l){return o.used.indexOf(l)>-1},i.isFor=function(o,l){var h=o.for&&i.dependencyParse(o.for);return!o.for||l.name===h.name&&i.versionSatisfies(l.version,h.range)},i.use=function(o,l){if(o.uses=(o.uses||[]).concat(l||[]),o.uses.length===0){a.warn("Plugin.use:",i.toString(o),"does not specify any dependencies to install.");return}for(var h=i.dependencies(o),u=a.topologicalSort(h),d=[],f=0;f<u.length;f+=1)if(u[f]!==o.name){var c=i.resolve(u[f]);if(!c){d.push("❌ "+u[f]);continue}i.isUsed(o,c.name)||(i.isFor(c,o)||(a.warn("Plugin.use:",i.toString(c),"is for",c.for,"but installed on",i.toString(o)+"."),c._warned=!0),c.install?c.install(o):(a.warn("Plugin.use:",i.toString(c),"does not specify an install function."),c._warned=!0),c._warned?(d.push("🔶 "+i.toString(c)),delete c._warned):d.push("✅ "+i.toString(c)),o.used.push(c.name))}d.length>0&&a.info(d.join("  "))},i.dependencies=function(o,l){var h=i.dependencyParse(o),u=h.name;if(l=l||{},!(u in l)){o=i.resolve(o)||o,l[u]=a.map(o.uses||[],function(f){i.isPlugin(f)&&i.register(f);var c=i.dependencyParse(f),p=i.resolve(f);return p&&!i.versionSatisfies(p.version,c.range)?(a.warn("Plugin.dependencies:",i.toString(p),"does not satisfy",i.toString(c),"used by",i.toString(h)+"."),p._warned=!0,o._warned=!0):p||(a.warn("Plugin.dependencies:",i.toString(f),"used by",i.toString(h),"could not be resolved."),o._warned=!0),c.name});for(var d=0;d<l[u].length;d+=1)i.dependencies(l[u][d],l);return l}},i.dependencyParse=function(o){if(a.isString(o)){var l=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;return l.test(o)||a.warn("Plugin.dependencyParse:",o,"is not a valid dependency string."),{name:o.split("@")[0],range:o.split("@")[1]||"*"}}return{name:o.name,range:o.range||o.version}},i.versionParse=function(o){var l=/^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-]+)?$/;l.test(o)||a.warn("Plugin.versionParse:",o,"is not a valid version or range.");var h=l.exec(o),u=Number(h[4]),d=Number(h[5]),f=Number(h[6]);return{isRange:!!(h[1]||h[2]),version:h[3],range:o,operator:h[1]||h[2]||"",major:u,minor:d,patch:f,parts:[u,d,f],prerelease:h[7],number:u*1e8+d*1e4+f}},i.versionSatisfies=function(o,l){l=l||"*";var h=i.versionParse(l),u=i.versionParse(o);if(h.isRange){if(h.operator==="*"||o==="*")return!0;if(h.operator===">")return u.number>h.number;if(h.operator===">=")return u.number>=h.number;if(h.operator==="~")return u.major===h.major&&u.minor===h.minor&&u.patch>=h.patch;if(h.operator==="^")return h.major>0?u.major===h.major&&u.number>=h.number:h.minor>0?u.minor===h.minor&&u.patch>=h.patch:u.patch===h.patch}return o===l||o==="*"}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(0),o=s(5),l=s(1),h=s(4),u=s(2),d=s(12);(function(){var f,c;typeof window<"u"&&(f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(x){window.setTimeout(function(){x(a.now())},1e3/60)},c=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),i._goodFps=30,i._goodDelta=1e3/60,i.create=function(x){var S={controller:i,engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,timing:{historySize:60,delta:0,deltaHistory:[],lastTime:0,lastTimestamp:0,lastElapsed:0,timestampElapsed:0,timestampElapsedHistory:[],engineDeltaHistory:[],engineElapsedHistory:[],elapsedHistory:[]},options:{width:800,height:600,pixelRatio:1,background:"#14151f",wireframeBackground:"#14151f",hasBounds:!!x.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showStats:!1,showPerformance:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},_=a.extend(S,x);return _.canvas&&(_.canvas.width=_.options.width||_.canvas.width,_.canvas.height=_.options.height||_.canvas.height),_.mouse=x.mouse,_.engine=x.engine,_.canvas=_.canvas||m(_.options.width,_.options.height),_.context=_.canvas.getContext("2d"),_.textures={},_.bounds=_.bounds||{min:{x:0,y:0},max:{x:_.canvas.width,y:_.canvas.height}},_.options.pixelRatio!==1&&i.setPixelRatio(_,_.options.pixelRatio),a.isElement(_.element)?_.element.appendChild(_.canvas):_.canvas.parentNode||a.log("Render.create: options.element was undefined, render.canvas was created but not appended","warn"),_},i.run=function(x){(function S(_){x.frameRequestId=f(S),p(x,_),i.world(x,_),(x.options.showStats||x.options.showDebug)&&i.stats(x,x.context,_),(x.options.showPerformance||x.options.showDebug)&&i.performance(x,x.context,_)})()},i.stop=function(x){c(x.frameRequestId)},i.setPixelRatio=function(x,S){var _=x.options,y=x.canvas;S==="auto"&&(S=g(y)),_.pixelRatio=S,y.setAttribute("data-pixel-ratio",S),y.width=_.width*S,y.height=_.height*S,y.style.width=_.width+"px",y.style.height=_.height+"px"},i.lookAt=function(x,S,_,y){y=typeof y<"u"?y:!0,S=a.isArray(S)?S:[S],_=_||{x:0,y:0};for(var A={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},E=0;E<S.length;E+=1){var w=S[E],b=w.bounds?w.bounds.min:w.min||w.position||w,U=w.bounds?w.bounds.max:w.max||w.position||w;b&&U&&(b.x<A.min.x&&(A.min.x=b.x),U.x>A.max.x&&(A.max.x=U.x),b.y<A.min.y&&(A.min.y=b.y),U.y>A.max.y&&(A.max.y=U.y))}var I=A.max.x-A.min.x+2*_.x,F=A.max.y-A.min.y+2*_.y,k=x.canvas.height,O=x.canvas.width,Z=O/k,G=I/F,it=1,rt=1;G>Z?rt=G/Z:it=Z/G,x.options.hasBounds=!0,x.bounds.min.x=A.min.x,x.bounds.max.x=A.min.x+I*it,x.bounds.min.y=A.min.y,x.bounds.max.y=A.min.y+F*rt,y&&(x.bounds.min.x+=I*.5-I*it*.5,x.bounds.max.x+=I*.5-I*it*.5,x.bounds.min.y+=F*.5-F*rt*.5,x.bounds.max.y+=F*.5-F*rt*.5),x.bounds.min.x-=_.x,x.bounds.max.x-=_.x,x.bounds.min.y-=_.y,x.bounds.max.y-=_.y,x.mouse&&(d.setScale(x.mouse,{x:(x.bounds.max.x-x.bounds.min.x)/x.canvas.width,y:(x.bounds.max.y-x.bounds.min.y)/x.canvas.height}),d.setOffset(x.mouse,x.bounds.min))},i.startViewTransform=function(x){var S=x.bounds.max.x-x.bounds.min.x,_=x.bounds.max.y-x.bounds.min.y,y=S/x.options.width,A=_/x.options.height;x.context.setTransform(x.options.pixelRatio/y,0,0,x.options.pixelRatio/A,0,0),x.context.translate(-x.bounds.min.x,-x.bounds.min.y)},i.endViewTransform=function(x){x.context.setTransform(x.options.pixelRatio,0,0,x.options.pixelRatio,0,0)},i.world=function(x,S){var _=a.now(),y=x.engine,A=y.world,E=x.canvas,w=x.context,b=x.options,U=x.timing,I=o.allBodies(A),F=o.allConstraints(A),k=b.wireframes?b.wireframeBackground:b.background,O=[],Z=[],G,it={timestamp:y.timing.timestamp};if(h.trigger(x,"beforeRender",it),x.currentBackground!==k&&M(x,k),w.globalCompositeOperation="source-in",w.fillStyle="transparent",w.fillRect(0,0,E.width,E.height),w.globalCompositeOperation="source-over",b.hasBounds){for(G=0;G<I.length;G++){var rt=I[G];l.overlaps(rt.bounds,x.bounds)&&O.push(rt)}for(G=0;G<F.length;G++){var et=F[G],Mt=et.bodyA,Dt=et.bodyB,N=et.pointA,X=et.pointB;Mt&&(N=u.add(Mt.position,et.pointA)),Dt&&(X=u.add(Dt.position,et.pointB)),!(!N||!X)&&(l.contains(x.bounds,N)||l.contains(x.bounds,X))&&Z.push(et)}i.startViewTransform(x),x.mouse&&(d.setScale(x.mouse,{x:(x.bounds.max.x-x.bounds.min.x)/x.options.width,y:(x.bounds.max.y-x.bounds.min.y)/x.options.height}),d.setOffset(x.mouse,x.bounds.min))}else Z=F,O=I,x.options.pixelRatio!==1&&x.context.setTransform(x.options.pixelRatio,0,0,x.options.pixelRatio,0,0);!b.wireframes||y.enableSleeping&&b.showSleeping?i.bodies(x,O,w):(b.showConvexHulls&&i.bodyConvexHulls(x,O,w),i.bodyWireframes(x,O,w)),b.showBounds&&i.bodyBounds(x,O,w),(b.showAxes||b.showAngleIndicator)&&i.bodyAxes(x,O,w),b.showPositions&&i.bodyPositions(x,O,w),b.showVelocity&&i.bodyVelocity(x,O,w),b.showIds&&i.bodyIds(x,O,w),b.showSeparations&&i.separations(x,y.pairs.list,w),b.showCollisions&&i.collisions(x,y.pairs.list,w),b.showVertexNumbers&&i.vertexNumbers(x,O,w),b.showMousePosition&&i.mousePosition(x,x.mouse,w),i.constraints(Z,w),b.showBroadphase&&i.grid(x,y.grid,w),b.hasBounds&&i.endViewTransform(x),h.trigger(x,"afterRender",it),U.lastElapsed=a.now()-_},i.stats=function(x,S,_){for(var y=x.engine,A=y.world,E=o.allBodies(A),w=0,b=55,U=44,I=0,F=0,k=0;k<E.length;k+=1)w+=E[k].parts.length;var O={Part:w,Body:E.length,Cons:o.allConstraints(A).length,Comp:o.allComposites(A).length,Pair:y.pairs.list.length};S.fillStyle="#0e0f19",S.fillRect(I,F,b*5.5,U),S.font="12px Arial",S.textBaseline="top",S.textAlign="right";for(var Z in O){var G=O[Z];S.fillStyle="#aaa",S.fillText(Z,I+b,F+8),S.fillStyle="#eee",S.fillText(G,I+b,F+26),I+=b}},i.performance=function(x,S){var _=x.engine,y=x.timing,A=y.deltaHistory,E=y.elapsedHistory,w=y.timestampElapsedHistory,b=y.engineDeltaHistory,U=y.engineElapsedHistory,I=_.timing.lastDelta,F=v(A),k=v(E),O=v(b),Z=v(U),G=v(w),it=G/F||0,rt=1e3/F||0,et=4,Mt=12,Dt=60,N=34,X=10,tt=69;S.fillStyle="#0e0f19",S.fillRect(0,50,Mt*4+Dt*5+22,N),i.status(S,X,tt,Dt,et,A.length,Math.round(rt)+" fps",rt/i._goodFps,function(K){return A[K]/F-1}),i.status(S,X+Mt+Dt,tt,Dt,et,b.length,I.toFixed(2)+" dt",i._goodDelta/I,function(K){return b[K]/O-1}),i.status(S,X+(Mt+Dt)*2,tt,Dt,et,U.length,Z.toFixed(2)+" ut",1-Z/i._goodFps,function(K){return U[K]/Z-1}),i.status(S,X+(Mt+Dt)*3,tt,Dt,et,E.length,k.toFixed(2)+" rt",1-k/i._goodFps,function(K){return E[K]/k-1}),i.status(S,X+(Mt+Dt)*4,tt,Dt,et,w.length,it.toFixed(2)+" x",it*it*it,function(K){return(w[K]/A[K]/it||0)-1})},i.status=function(x,S,_,y,A,E,w,b,U){x.strokeStyle="#888",x.fillStyle="#444",x.lineWidth=1,x.fillRect(S,_+7,y,1),x.beginPath(),x.moveTo(S,_+7-A*a.clamp(.4*U(0),-2,2));for(var I=0;I<y;I+=1)x.lineTo(S+I,_+7-(I<E?A*a.clamp(.4*U(I),-2,2):0));x.stroke(),x.fillStyle="hsl("+a.clamp(25+95*b,0,120)+",100%,60%)",x.fillRect(S,_-7,4,4),x.font="12px Arial",x.textBaseline="middle",x.textAlign="right",x.fillStyle="#eee",x.fillText(w,S+y,_-5)},i.constraints=function(x,S){for(var _=S,y=0;y<x.length;y++){var A=x[y];if(!(!A.render.visible||!A.pointA||!A.pointB)){var E=A.bodyA,w=A.bodyB,b,U;if(E?b=u.add(E.position,A.pointA):b=A.pointA,A.render.type==="pin")_.beginPath(),_.arc(b.x,b.y,3,0,2*Math.PI),_.closePath();else{if(w?U=u.add(w.position,A.pointB):U=A.pointB,_.beginPath(),_.moveTo(b.x,b.y),A.render.type==="spring")for(var I=u.sub(U,b),F=u.perp(u.normalise(I)),k=Math.ceil(a.clamp(A.length/5,12,20)),O,Z=1;Z<k;Z+=1)O=Z%2===0?1:-1,_.lineTo(b.x+I.x*(Z/k)+F.x*O*4,b.y+I.y*(Z/k)+F.y*O*4);_.lineTo(U.x,U.y)}A.render.lineWidth&&(_.lineWidth=A.render.lineWidth,_.strokeStyle=A.render.strokeStyle,_.stroke()),A.render.anchors&&(_.fillStyle=A.render.strokeStyle,_.beginPath(),_.arc(b.x,b.y,3,0,2*Math.PI),_.arc(U.x,U.y,3,0,2*Math.PI),_.closePath(),_.fill())}}},i.bodies=function(x,S,_){var y=_;x.engine;var A=x.options,E=A.showInternalEdges||!A.wireframes,w,b,U,I;for(U=0;U<S.length;U++)if(w=S[U],!!w.render.visible){for(I=w.parts.length>1?1:0;I<w.parts.length;I++)if(b=w.parts[I],!!b.render.visible){if(A.showSleeping&&w.isSleeping?y.globalAlpha=.5*b.render.opacity:b.render.opacity!==1&&(y.globalAlpha=b.render.opacity),b.render.sprite&&b.render.sprite.texture&&!A.wireframes){var F=b.render.sprite,k=T(x,F.texture);y.translate(b.position.x,b.position.y),y.rotate(b.angle),y.drawImage(k,k.width*-F.xOffset*F.xScale,k.height*-F.yOffset*F.yScale,k.width*F.xScale,k.height*F.yScale),y.rotate(-b.angle),y.translate(-b.position.x,-b.position.y)}else{if(b.circleRadius)y.beginPath(),y.arc(b.position.x,b.position.y,b.circleRadius,0,2*Math.PI);else{y.beginPath(),y.moveTo(b.vertices[0].x,b.vertices[0].y);for(var O=1;O<b.vertices.length;O++)!b.vertices[O-1].isInternal||E?y.lineTo(b.vertices[O].x,b.vertices[O].y):y.moveTo(b.vertices[O].x,b.vertices[O].y),b.vertices[O].isInternal&&!E&&y.moveTo(b.vertices[(O+1)%b.vertices.length].x,b.vertices[(O+1)%b.vertices.length].y);y.lineTo(b.vertices[0].x,b.vertices[0].y),y.closePath()}A.wireframes?(y.lineWidth=1,y.strokeStyle="#bbb",y.stroke()):(y.fillStyle=b.render.fillStyle,b.render.lineWidth&&(y.lineWidth=b.render.lineWidth,y.strokeStyle=b.render.strokeStyle,y.stroke()),y.fill())}y.globalAlpha=1}}},i.bodyWireframes=function(x,S,_){var y=_,A=x.options.showInternalEdges,E,w,b,U,I;for(y.beginPath(),b=0;b<S.length;b++)if(E=S[b],!!E.render.visible)for(I=E.parts.length>1?1:0;I<E.parts.length;I++){for(w=E.parts[I],y.moveTo(w.vertices[0].x,w.vertices[0].y),U=1;U<w.vertices.length;U++)!w.vertices[U-1].isInternal||A?y.lineTo(w.vertices[U].x,w.vertices[U].y):y.moveTo(w.vertices[U].x,w.vertices[U].y),w.vertices[U].isInternal&&!A&&y.moveTo(w.vertices[(U+1)%w.vertices.length].x,w.vertices[(U+1)%w.vertices.length].y);y.lineTo(w.vertices[0].x,w.vertices[0].y)}y.lineWidth=1,y.strokeStyle="#bbb",y.stroke()},i.bodyConvexHulls=function(x,S,_){var y=_,A,E,w;for(y.beginPath(),E=0;E<S.length;E++)if(A=S[E],!(!A.render.visible||A.parts.length===1)){for(y.moveTo(A.vertices[0].x,A.vertices[0].y),w=1;w<A.vertices.length;w++)y.lineTo(A.vertices[w].x,A.vertices[w].y);y.lineTo(A.vertices[0].x,A.vertices[0].y)}y.lineWidth=1,y.strokeStyle="rgba(255,255,255,0.2)",y.stroke()},i.vertexNumbers=function(x,S,_){var y=_,A,E,w;for(A=0;A<S.length;A++){var b=S[A].parts;for(w=b.length>1?1:0;w<b.length;w++){var U=b[w];for(E=0;E<U.vertices.length;E++)y.fillStyle="rgba(255,255,255,0.2)",y.fillText(A+"_"+E,U.position.x+(U.vertices[E].x-U.position.x)*.8,U.position.y+(U.vertices[E].y-U.position.y)*.8)}}},i.mousePosition=function(x,S,_){var y=_;y.fillStyle="rgba(255,255,255,0.8)",y.fillText(S.position.x+"  "+S.position.y,S.position.x+5,S.position.y-5)},i.bodyBounds=function(x,S,_){var y=_;x.engine;var A=x.options;y.beginPath();for(var E=0;E<S.length;E++){var w=S[E];if(w.render.visible)for(var b=S[E].parts,U=b.length>1?1:0;U<b.length;U++){var I=b[U];y.rect(I.bounds.min.x,I.bounds.min.y,I.bounds.max.x-I.bounds.min.x,I.bounds.max.y-I.bounds.min.y)}}A.wireframes?y.strokeStyle="rgba(255,255,255,0.08)":y.strokeStyle="rgba(0,0,0,0.1)",y.lineWidth=1,y.stroke()},i.bodyAxes=function(x,S,_){var y=_;x.engine;var A=x.options,E,w,b,U;for(y.beginPath(),w=0;w<S.length;w++){var I=S[w],F=I.parts;if(I.render.visible)if(A.showAxes)for(b=F.length>1?1:0;b<F.length;b++)for(E=F[b],U=0;U<E.axes.length;U++){var k=E.axes[U];y.moveTo(E.position.x,E.position.y),y.lineTo(E.position.x+k.x*20,E.position.y+k.y*20)}else for(b=F.length>1?1:0;b<F.length;b++)for(E=F[b],U=0;U<E.axes.length;U++)y.moveTo(E.position.x,E.position.y),y.lineTo((E.vertices[0].x+E.vertices[E.vertices.length-1].x)/2,(E.vertices[0].y+E.vertices[E.vertices.length-1].y)/2)}A.wireframes?(y.strokeStyle="indianred",y.lineWidth=1):(y.strokeStyle="rgba(255, 255, 255, 0.4)",y.globalCompositeOperation="overlay",y.lineWidth=2),y.stroke(),y.globalCompositeOperation="source-over"},i.bodyPositions=function(x,S,_){var y=_;x.engine;var A=x.options,E,w,b,U;for(y.beginPath(),b=0;b<S.length;b++)if(E=S[b],!!E.render.visible)for(U=0;U<E.parts.length;U++)w=E.parts[U],y.arc(w.position.x,w.position.y,3,0,2*Math.PI,!1),y.closePath();for(A.wireframes?y.fillStyle="indianred":y.fillStyle="rgba(0,0,0,0.5)",y.fill(),y.beginPath(),b=0;b<S.length;b++)E=S[b],E.render.visible&&(y.arc(E.positionPrev.x,E.positionPrev.y,2,0,2*Math.PI,!1),y.closePath());y.fillStyle="rgba(255,165,0,0.8)",y.fill()},i.bodyVelocity=function(x,S,_){var y=_;y.beginPath();for(var A=0;A<S.length;A++){var E=S[A];E.render.visible&&(y.moveTo(E.position.x,E.position.y),y.lineTo(E.position.x+(E.position.x-E.positionPrev.x)*2,E.position.y+(E.position.y-E.positionPrev.y)*2))}y.lineWidth=3,y.strokeStyle="cornflowerblue",y.stroke()},i.bodyIds=function(x,S,_){var y=_,A,E;for(A=0;A<S.length;A++)if(S[A].render.visible){var w=S[A].parts;for(E=w.length>1?1:0;E<w.length;E++){var b=w[E];y.font="12px Arial",y.fillStyle="rgba(255,255,255,0.5)",y.fillText(b.id,b.position.x+10,b.position.y-10)}}},i.collisions=function(x,S,_){var y=_,A=x.options,E,w,b,U;for(y.beginPath(),b=0;b<S.length;b++)if(E=S[b],!!E.isActive)for(w=E.collision,U=0;U<E.activeContacts.length;U++){var I=E.activeContacts[U],F=I.vertex;y.rect(F.x-1.5,F.y-1.5,3.5,3.5)}for(A.wireframes?y.fillStyle="rgba(255,255,255,0.7)":y.fillStyle="orange",y.fill(),y.beginPath(),b=0;b<S.length;b++)if(E=S[b],!!E.isActive&&(w=E.collision,E.activeContacts.length>0)){var k=E.activeContacts[0].vertex.x,O=E.activeContacts[0].vertex.y;E.activeContacts.length===2&&(k=(E.activeContacts[0].vertex.x+E.activeContacts[1].vertex.x)/2,O=(E.activeContacts[0].vertex.y+E.activeContacts[1].vertex.y)/2),w.bodyB===w.supports[0].body||w.bodyA.isStatic===!0?y.moveTo(k-w.normal.x*8,O-w.normal.y*8):y.moveTo(k+w.normal.x*8,O+w.normal.y*8),y.lineTo(k,O)}A.wireframes?y.strokeStyle="rgba(255,165,0,0.7)":y.strokeStyle="orange",y.lineWidth=1,y.stroke()},i.separations=function(x,S,_){var y=_,A=x.options,E,w,b,U,I;for(y.beginPath(),I=0;I<S.length;I++)if(E=S[I],!!E.isActive){w=E.collision,b=w.bodyA,U=w.bodyB;var F=1;!U.isStatic&&!b.isStatic&&(F=.5),U.isStatic&&(F=0),y.moveTo(U.position.x,U.position.y),y.lineTo(U.position.x-w.penetration.x*F,U.position.y-w.penetration.y*F),F=1,!U.isStatic&&!b.isStatic&&(F=.5),b.isStatic&&(F=0),y.moveTo(b.position.x,b.position.y),y.lineTo(b.position.x+w.penetration.x*F,b.position.y+w.penetration.y*F)}A.wireframes?y.strokeStyle="rgba(255,165,0,0.5)":y.strokeStyle="orange",y.stroke()},i.grid=function(x,S,_){var y=_,A=x.options;A.wireframes?y.strokeStyle="rgba(255,180,0,0.1)":y.strokeStyle="rgba(255,180,0,0.5)",y.beginPath();for(var E=a.keys(S.buckets),w=0;w<E.length;w++){var b=E[w];if(!(S.buckets[b].length<2)){var U=b.split(/C|R/);y.rect(.5+parseInt(U[1],10)*S.bucketWidth,.5+parseInt(U[2],10)*S.bucketHeight,S.bucketWidth,S.bucketHeight)}}y.lineWidth=1,y.stroke()},i.inspector=function(x,S){x.engine;var _=x.selected,y=x.render,A=y.options,E;if(A.hasBounds){var w=y.bounds.max.x-y.bounds.min.x,b=y.bounds.max.y-y.bounds.min.y,U=w/y.options.width,I=b/y.options.height;S.scale(1/U,1/I),S.translate(-y.bounds.min.x,-y.bounds.min.y)}for(var F=0;F<_.length;F++){var k=_[F].data;switch(S.translate(.5,.5),S.lineWidth=1,S.strokeStyle="rgba(255,165,0,0.9)",S.setLineDash([1,2]),k.type){case"body":E=k.bounds,S.beginPath(),S.rect(Math.floor(E.min.x-3),Math.floor(E.min.y-3),Math.floor(E.max.x-E.min.x+6),Math.floor(E.max.y-E.min.y+6)),S.closePath(),S.stroke();break;case"constraint":var O=k.pointA;k.bodyA&&(O=k.pointB),S.beginPath(),S.arc(O.x,O.y,10,0,2*Math.PI),S.closePath(),S.stroke();break}S.setLineDash([]),S.translate(-.5,-.5)}x.selectStart!==null&&(S.translate(.5,.5),S.lineWidth=1,S.strokeStyle="rgba(255,165,0,0.6)",S.fillStyle="rgba(255,165,0,0.1)",E=x.selectBounds,S.beginPath(),S.rect(Math.floor(E.min.x),Math.floor(E.min.y),Math.floor(E.max.x-E.min.x),Math.floor(E.max.y-E.min.y)),S.closePath(),S.stroke(),S.fill(),S.translate(-.5,-.5)),A.hasBounds&&S.setTransform(1,0,0,1,0,0)};var p=function(x,S){var _=x.engine,y=x.timing,A=y.historySize,E=_.timing.timestamp;y.delta=S-y.lastTime||i._goodDelta,y.lastTime=S,y.timestampElapsed=E-y.lastTimestamp||0,y.lastTimestamp=E,y.deltaHistory.unshift(y.delta),y.deltaHistory.length=Math.min(y.deltaHistory.length,A),y.engineDeltaHistory.unshift(_.timing.lastDelta),y.engineDeltaHistory.length=Math.min(y.engineDeltaHistory.length,A),y.timestampElapsedHistory.unshift(y.timestampElapsed),y.timestampElapsedHistory.length=Math.min(y.timestampElapsedHistory.length,A),y.engineElapsedHistory.unshift(_.timing.lastElapsed),y.engineElapsedHistory.length=Math.min(y.engineElapsedHistory.length,A),y.elapsedHistory.unshift(y.lastElapsed),y.elapsedHistory.length=Math.min(y.elapsedHistory.length,A)},v=function(x){for(var S=0,_=0;_<x.length;_+=1)S+=x[_];return S/x.length||0},m=function(x,S){var _=document.createElement("canvas");return _.width=x,_.height=S,_.oncontextmenu=function(){return!1},_.onselectstart=function(){return!1},_},g=function(x){var S=x.getContext("2d"),_=window.devicePixelRatio||1,y=S.webkitBackingStorePixelRatio||S.mozBackingStorePixelRatio||S.msBackingStorePixelRatio||S.oBackingStorePixelRatio||S.backingStorePixelRatio||1;return _/y},T=function(x,S){var _=x.textures[S];return _||(_=x.textures[S]=new Image,_.src=S,_)},M=function(x,S){var _=S;/(jpg|gif|png)$/.test(S)&&(_="url("+S+")"),x.canvas.style.background=_,x.canvas.style.backgroundSize="contain",x.currentBackground=S}})()}),(function(e,n){var s={};e.exports=s,(function(){s.create=function(i){return{id:s.id(i),vertex:i,normalImpulse:0,tangentImpulse:0}},s.id=function(i){return i.body.id+"_"+i.index}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(7),o=s(19),l=s(13),h=s(20),u=s(21),d=s(4),f=s(5),c=s(8),p=s(0),v=s(6);(function(){i.create=function(m){m=m||{};var g={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},grid:null,gravity:{x:0,y:1,scale:.001},timing:{timestamp:0,timeScale:1,lastDelta:0,lastElapsed:0}},T=p.extend(g,m);return T.world=m.world||f.create({label:"World"}),T.grid=u.create(m.grid||m.broadphase),T.pairs=h.create(),T.world.gravity=T.gravity,T.broadphase=T.grid,T.metrics={},T},i.update=function(m,g,T){var M=p.now();g=g||1e3/60,T=T||1;var x=m.world,S=m.timing,_=m.grid,y=[],A;S.timestamp+=g*S.timeScale,S.lastDelta=g*S.timeScale;var E={timestamp:S.timestamp};d.trigger(m,"beforeUpdate",E);var w=f.allBodies(x),b=f.allConstraints(x);for(m.enableSleeping&&a.update(w,S.timeScale),i._bodiesApplyGravity(w,m.gravity),i._bodiesUpdate(w,g,S.timeScale,T,x.bounds),c.preSolveAll(w),A=0;A<m.constraintIterations;A++)c.solveAll(b,S.timeScale);c.postSolveAll(w),x.isModified&&u.clear(_),u.update(_,w,m,x.isModified),y=_.pairsList,x.isModified&&f.setModified(x,!1,!1,!0);var U=l.collisions(y,m),I=m.pairs,F=S.timestamp;for(h.update(I,U,F),h.removeOld(I,F),m.enableSleeping&&a.afterCollisions(I.list,S.timeScale),I.collisionStart.length>0&&d.trigger(m,"collisionStart",{pairs:I.collisionStart}),o.preSolvePosition(I.list),A=0;A<m.positionIterations;A++)o.solvePosition(I.list,S.timeScale);for(o.postSolvePosition(w),c.preSolveAll(w),A=0;A<m.constraintIterations;A++)c.solveAll(b,S.timeScale);for(c.postSolveAll(w),o.preSolveVelocity(I.list),A=0;A<m.velocityIterations;A++)o.solveVelocity(I.list,S.timeScale);return I.collisionActive.length>0&&d.trigger(m,"collisionActive",{pairs:I.collisionActive}),I.collisionEnd.length>0&&d.trigger(m,"collisionEnd",{pairs:I.collisionEnd}),i._bodiesClearForces(w),d.trigger(m,"afterUpdate",E),m.timing.lastElapsed=p.now()-M,m},i.merge=function(m,g){if(p.extend(m,g),g.world){m.world=g.world,i.clear(m);for(var T=f.allBodies(m.world),M=0;M<T.length;M++){var x=T[M];a.set(x,!1),x.id=p.nextId()}}},i.clear=function(m){var g=m.world,T=f.allBodies(g);h.clear(m.pairs),u.clear(m.grid),u.update(m.grid,T,m,!0)},i._bodiesClearForces=function(m){for(var g=0;g<m.length;g++){var T=m[g];T.force.x=0,T.force.y=0,T.torque=0}},i._bodiesApplyGravity=function(m,g){var T=typeof g.scale<"u"?g.scale:.001;if(!(g.x===0&&g.y===0||T===0))for(var M=0;M<m.length;M++){var x=m[M];x.isStatic||x.isSleeping||(x.force.y+=x.mass*g.y*T,x.force.x+=x.mass*g.x*T)}},i._bodiesUpdate=function(m,g,T,M,x){for(var S=0;S<m.length;S++){var _=m[S];_.isStatic||_.isSleeping||v.update(_,g,T,M)}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(2),l=s(0),h=s(1);(function(){i._restingThresh=4,i._restingThreshTangent=6,i._positionDampen=.9,i._positionWarming=.8,i._frictionNormalMultiplier=5,i.preSolvePosition=function(u){var d,f,c;for(d=0;d<u.length;d++)f=u[d],f.isActive&&(c=f.activeContacts.length,f.collision.parentA.totalContacts+=c,f.collision.parentB.totalContacts+=c)},i.solvePosition=function(u,d){var f,c,p,v,m,g,T,M,x,S=o._temp[0],_=o._temp[1],y=o._temp[2],A=o._temp[3];for(f=0;f<u.length;f++)c=u[f],!(!c.isActive||c.isSensor)&&(p=c.collision,v=p.parentA,m=p.parentB,g=p.normal,T=o.sub(o.add(m.positionImpulse,m.position,S),o.add(v.positionImpulse,o.sub(m.position,p.penetration,_),y),A),c.separation=o.dot(g,T));for(f=0;f<u.length;f++)c=u[f],!(!c.isActive||c.isSensor)&&(p=c.collision,v=p.parentA,m=p.parentB,g=p.normal,x=(c.separation-c.slop)*d,(v.isStatic||m.isStatic)&&(x*=2),v.isStatic||v.isSleeping||(M=i._positionDampen/v.totalContacts,v.positionImpulse.x+=g.x*x*M,v.positionImpulse.y+=g.y*x*M),m.isStatic||m.isSleeping||(M=i._positionDampen/m.totalContacts,m.positionImpulse.x-=g.x*x*M,m.positionImpulse.y-=g.y*x*M))},i.postSolvePosition=function(u){for(var d=0;d<u.length;d++){var f=u[d];if(f.totalContacts=0,f.positionImpulse.x!==0||f.positionImpulse.y!==0){for(var c=0;c<f.parts.length;c++){var p=f.parts[c];a.translate(p.vertices,f.positionImpulse),h.update(p.bounds,p.vertices,f.velocity),p.position.x+=f.positionImpulse.x,p.position.y+=f.positionImpulse.y}f.positionPrev.x+=f.positionImpulse.x,f.positionPrev.y+=f.positionImpulse.y,o.dot(f.positionImpulse,f.velocity)<0?(f.positionImpulse.x=0,f.positionImpulse.y=0):(f.positionImpulse.x*=i._positionWarming,f.positionImpulse.y*=i._positionWarming)}}},i.preSolveVelocity=function(u){var d,f,c,p,v,m,g,T,M,x,S,_,y,A,E=o._temp[0],w=o._temp[1];for(d=0;d<u.length;d++)if(c=u[d],!(!c.isActive||c.isSensor))for(p=c.activeContacts,v=c.collision,m=v.parentA,g=v.parentB,T=v.normal,M=v.tangent,f=0;f<p.length;f++)x=p[f],S=x.vertex,_=x.normalImpulse,y=x.tangentImpulse,(_!==0||y!==0)&&(E.x=T.x*_+M.x*y,E.y=T.y*_+M.y*y,m.isStatic||m.isSleeping||(A=o.sub(S,m.position,w),m.positionPrev.x+=E.x*m.inverseMass,m.positionPrev.y+=E.y*m.inverseMass,m.anglePrev+=o.cross(A,E)*m.inverseInertia),g.isStatic||g.isSleeping||(A=o.sub(S,g.position,w),g.positionPrev.x-=E.x*g.inverseMass,g.positionPrev.y-=E.y*g.inverseMass,g.anglePrev-=o.cross(A,E)*g.inverseInertia))},i.solveVelocity=function(u,d){for(var f=d*d,c=o._temp[0],p=o._temp[1],v=o._temp[2],m=o._temp[3],g=o._temp[4],T=o._temp[5],M=0;M<u.length;M++){var x=u[M];if(!(!x.isActive||x.isSensor)){var S=x.collision,_=S.parentA,y=S.parentB,A=S.normal,E=S.tangent,w=x.activeContacts,b=1/w.length;_.velocity.x=_.position.x-_.positionPrev.x,_.velocity.y=_.position.y-_.positionPrev.y,y.velocity.x=y.position.x-y.positionPrev.x,y.velocity.y=y.position.y-y.positionPrev.y,_.angularVelocity=_.angle-_.anglePrev,y.angularVelocity=y.angle-y.anglePrev;for(var U=0;U<w.length;U++){var I=w[U],F=I.vertex,k=o.sub(F,_.position,p),O=o.sub(F,y.position,v),Z=o.add(_.velocity,o.mult(o.perp(k),_.angularVelocity),m),G=o.add(y.velocity,o.mult(o.perp(O),y.angularVelocity),g),it=o.sub(Z,G,T),rt=o.dot(A,it),et=o.dot(E,it),Mt=Math.abs(et),Dt=l.sign(et),N=(1+x.restitution)*rt,X=l.clamp(x.separation+rt,0,1)*i._frictionNormalMultiplier,tt=et,K=1/0;Mt>x.friction*x.frictionStatic*X*f&&(K=Mt,tt=l.clamp(x.friction*Dt*f,-K,K));var dt=o.cross(k,A),Lt=o.cross(O,A),bt=b/(_.inverseMass+y.inverseMass+_.inverseInertia*dt*dt+y.inverseInertia*Lt*Lt);if(N*=bt,tt*=bt,rt<0&&rt*rt>i._restingThresh*f)I.normalImpulse=0;else{var Wt=I.normalImpulse;I.normalImpulse=Math.min(I.normalImpulse+N,0),N=I.normalImpulse-Wt}if(et*et>i._restingThreshTangent*f)I.tangentImpulse=0;else{var Q=I.tangentImpulse;I.tangentImpulse=l.clamp(I.tangentImpulse+tt,-K,K),tt=I.tangentImpulse-Q}c.x=A.x*N+E.x*tt,c.y=A.y*N+E.y*tt,_.isStatic||_.isSleeping||(_.positionPrev.x+=c.x*_.inverseMass,_.positionPrev.y+=c.y*_.inverseMass,_.anglePrev+=o.cross(k,c)*_.inverseInertia),y.isStatic||y.isSleeping||(y.positionPrev.x-=c.x*y.inverseMass,y.positionPrev.y-=c.y*y.inverseMass,y.anglePrev-=o.cross(O,c)*y.inverseInertia)}}}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(9),o=s(0);(function(){i._pairMaxIdleLife=1e3,i.create=function(l){return o.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},l)},i.update=function(l,h,u){var d=l.list,f=l.table,c=l.collisionStart,p=l.collisionEnd,v=l.collisionActive,m,g,T,M;for(c.length=0,p.length=0,v.length=0,M=0;M<d.length;M++)d[M].confirmedActive=!1;for(M=0;M<h.length;M++)m=h[M],m.collided&&(g=a.id(m.bodyA,m.bodyB),T=f[g],T?(T.isActive?v.push(T):c.push(T),a.update(T,m,u),T.confirmedActive=!0):(T=a.create(m,u),f[g]=T,c.push(T),d.push(T)));for(M=0;M<d.length;M++)T=d[M],T.isActive&&!T.confirmedActive&&(a.setActive(T,!1,u),p.push(T))},i.removeOld=function(l,h){var u=l.list,d=l.table,f=[],c,p,v,m;for(m=0;m<u.length;m++){if(c=u[m],p=c.collision,p.bodyA.isSleeping||p.bodyB.isSleeping){c.timeUpdated=h;continue}h-c.timeUpdated>i._pairMaxIdleLife&&f.push(m)}for(m=0;m<f.length;m++)v=f[m]-m,c=u[v],delete d[c.id],u.splice(v,1)},i.clear=function(l){return l.table={},l.list.length=0,l.collisionStart.length=0,l.collisionActive.length=0,l.collisionEnd.length=0,l}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(9),o=s(0);(function(){i.create=function(l){var h={buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return o.extend(h,l)},i.update=function(l,h,u,d){var f,c,p,v=u.world,m=l.buckets,g,T,M=!1;for(f=0;f<h.length;f++){var x=h[f];if(!(x.isSleeping&&!d)&&!(v.bounds&&(x.bounds.max.x<v.bounds.min.x||x.bounds.min.x>v.bounds.max.x||x.bounds.max.y<v.bounds.min.y||x.bounds.min.y>v.bounds.max.y))){var S=i._getRegion(l,x);if(!x.region||S.id!==x.region.id||d){(!x.region||d)&&(x.region=S);var _=i._regionUnion(S,x.region);for(c=_.startCol;c<=_.endCol;c++)for(p=_.startRow;p<=_.endRow;p++){T=i._getBucketId(c,p),g=m[T];var y=c>=S.startCol&&c<=S.endCol&&p>=S.startRow&&p<=S.endRow,A=c>=x.region.startCol&&c<=x.region.endCol&&p>=x.region.startRow&&p<=x.region.endRow;!y&&A&&A&&g&&i._bucketRemoveBody(l,g,x),(x.region===S||y&&!A||d)&&(g||(g=i._createBucket(m,T)),i._bucketAddBody(l,g,x))}x.region=S,M=!0}}}M&&(l.pairsList=i._createActivePairsList(l))},i.clear=function(l){l.buckets={},l.pairs={},l.pairsList=[]},i._regionUnion=function(l,h){var u=Math.min(l.startCol,h.startCol),d=Math.max(l.endCol,h.endCol),f=Math.min(l.startRow,h.startRow),c=Math.max(l.endRow,h.endRow);return i._createRegion(u,d,f,c)},i._getRegion=function(l,h){var u=h.bounds,d=Math.floor(u.min.x/l.bucketWidth),f=Math.floor(u.max.x/l.bucketWidth),c=Math.floor(u.min.y/l.bucketHeight),p=Math.floor(u.max.y/l.bucketHeight);return i._createRegion(d,f,c,p)},i._createRegion=function(l,h,u,d){return{id:l+","+h+","+u+","+d,startCol:l,endCol:h,startRow:u,endRow:d}},i._getBucketId=function(l,h){return"C"+l+"R"+h},i._createBucket=function(l,h){var u=l[h]=[];return u},i._bucketAddBody=function(l,h,u){for(var d=0;d<h.length;d++){var f=h[d];if(!(u.id===f.id||u.isStatic&&f.isStatic)){var c=a.id(u,f),p=l.pairs[c];p?p[2]+=1:l.pairs[c]=[u,f,1]}}h.push(u)},i._bucketRemoveBody=function(l,h,u){h.splice(o.indexOf(h,u),1);for(var d=0;d<h.length;d++){var f=h[d],c=a.id(u,f),p=l.pairs[c];p&&(p[2]-=1)}},i._createActivePairsList=function(l){var h,u,d=[];h=o.keys(l.pairs);for(var f=0;f<h.length;f++)u=l.pairs[h[f]],u[2]>0?d.push(u):delete l.pairs[h[f]];return d}})()}),(function(e,n,s){var i=e.exports=s(23);i.Axes=s(10),i.Bodies=s(11),i.Body=s(6),i.Bounds=s(1),i.Common=s(0),i.Composite=s(5),i.Composites=s(24),i.Constraint=s(8),i.Contact=s(17),i.Detector=s(13),i.Engine=s(18),i.Events=s(4),i.Grid=s(21),i.Mouse=s(12),i.MouseConstraint=s(25),i.Pair=s(9),i.Pairs=s(20),i.Plugin=s(15),i.Query=s(26),i.Render=s(16),i.Resolver=s(19),i.Runner=s(27),i.SAT=s(14),i.Sleeping=s(7),i.Svg=s(28),i.Vector=s(2),i.Vertices=s(3),i.World=s(29),i.Engine.run=i.Runner.run,i.Common.deprecated(i.Engine,"run","Engine.run ➤ use Matter.Runner.run(engine) instead")}),(function(e,n,s){var i={};e.exports=i;var a=s(15),o=s(0);(function(){i.name="matter-js",i.version="0.17.1",i.uses=[],i.used=[],i.use=function(){a.use(i,Array.prototype.slice.call(arguments))},i.before=function(l,h){return l=l.replace(/^Matter./,""),o.chainPathBefore(i,l,h)},i.after=function(l,h){return l=l.replace(/^Matter./,""),o.chainPathAfter(i,l,h)}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(5),o=s(8),l=s(0),h=s(6),u=s(11),d=l.deprecated;(function(){i.stack=function(f,c,p,v,m,g,T){for(var M=a.create({label:"Stack"}),x=f,S=c,_,y=0,A=0;A<v;A++){for(var E=0,w=0;w<p;w++){var b=T(x,S,w,A,_,y);if(b){var U=b.bounds.max.y-b.bounds.min.y,I=b.bounds.max.x-b.bounds.min.x;U>E&&(E=U),h.translate(b,{x:I*.5,y:U*.5}),x=b.bounds.max.x+m,a.addBody(M,b),_=b,y+=1}else x+=m}S+=E+g,x=f}return M},i.chain=function(f,c,p,v,m,g){for(var T=f.bodies,M=1;M<T.length;M++){var x=T[M-1],S=T[M],_=x.bounds.max.y-x.bounds.min.y,y=x.bounds.max.x-x.bounds.min.x,A=S.bounds.max.y-S.bounds.min.y,E=S.bounds.max.x-S.bounds.min.x,w={bodyA:x,pointA:{x:y*c,y:_*p},bodyB:S,pointB:{x:E*v,y:A*m}},b=l.extend(w,g);a.addConstraint(f,o.create(b))}return f.label+=" Chain",f},i.mesh=function(f,c,p,v,m){var g=f.bodies,T,M,x,S,_;for(T=0;T<p;T++){for(M=1;M<c;M++)x=g[M-1+T*c],S=g[M+T*c],a.addConstraint(f,o.create(l.extend({bodyA:x,bodyB:S},m)));if(T>0)for(M=0;M<c;M++)x=g[M+(T-1)*c],S=g[M+T*c],a.addConstraint(f,o.create(l.extend({bodyA:x,bodyB:S},m))),v&&M>0&&(_=g[M-1+(T-1)*c],a.addConstraint(f,o.create(l.extend({bodyA:_,bodyB:S},m)))),v&&M<c-1&&(_=g[M+1+(T-1)*c],a.addConstraint(f,o.create(l.extend({bodyA:_,bodyB:S},m))))}return f.label+=" Mesh",f},i.pyramid=function(f,c,p,v,m,g,T){return i.stack(f,c,p,v,m,g,function(M,x,S,_,y,A){var E=Math.min(v,Math.ceil(p/2)),w=y?y.bounds.max.x-y.bounds.min.x:0;if(!(_>E)){_=E-_;var b=_,U=p-1-_;if(!(S<b||S>U)){A===1&&h.translate(y,{x:(S+(p%2===1?1:-1))*w,y:0});var I=y?S*w:0;return T(f+I+S*m,x,S,_,y,A)}}})},i.newtonsCradle=function(f,c,p,v,m){for(var g=a.create({label:"Newtons Cradle"}),T=0;T<p;T++){var M=1.9,x=u.circle(f+T*(v*M),c+m,v,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),S=o.create({pointA:{x:f+T*(v*M),y:c},bodyB:x});a.addBody(g,x),a.addConstraint(g,S)}return g},d(i,"newtonsCradle","Composites.newtonsCradle ➤ moved to newtonsCradle example"),i.car=function(f,c,p,v,m){var g=h.nextGroup(!0),T=20,M=-p*.5+T,x=p*.5-T,S=0,_=a.create({label:"Car"}),y=u.rectangle(f,c,p,v,{collisionFilter:{group:g},chamfer:{radius:v*.5},density:2e-4}),A=u.circle(f+M,c+S,m,{collisionFilter:{group:g},friction:.8}),E=u.circle(f+x,c+S,m,{collisionFilter:{group:g},friction:.8}),w=o.create({bodyB:y,pointB:{x:M,y:S},bodyA:A,stiffness:1,length:0}),b=o.create({bodyB:y,pointB:{x,y:S},bodyA:E,stiffness:1,length:0});return a.addBody(_,y),a.addBody(_,A),a.addBody(_,E),a.addConstraint(_,w),a.addConstraint(_,b),_},d(i,"car","Composites.car ➤ moved to car example"),i.softBody=function(f,c,p,v,m,g,T,M,x,S){x=l.extend({inertia:1/0},x),S=l.extend({stiffness:.2,render:{type:"line",anchors:!1}},S);var _=i.stack(f,c,p,v,m,g,function(y,A){return u.circle(y,A,M,x)});return i.mesh(_,p,v,T,S),_.label="Soft Body",_},d(i,"softBody","Composites.softBody ➤ moved to softBody and cloth examples")})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(7),l=s(12),h=s(4),u=s(13),d=s(8),f=s(5),c=s(0),p=s(1);(function(){i.create=function(v,m){var g=(v?v.mouse:null)||(m?m.mouse:null);g||(v&&v.render&&v.render.canvas?g=l.create(v.render.canvas):m&&m.element?g=l.create(m.element):(g=l.create(),c.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var T=d.create({label:"Mouse Constraint",pointA:g.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),M={type:"mouseConstraint",mouse:g,element:null,body:null,constraint:T,collisionFilter:{category:1,mask:4294967295,group:0}},x=c.extend(M,m);return h.on(v,"beforeUpdate",function(){var S=f.allBodies(v.world);i.update(x,S),i._triggerEvents(x)}),x},i.update=function(v,m){var g=v.mouse,T=v.constraint,M=v.body;if(g.button===0){if(T.bodyB)o.set(T.bodyB,!1),T.pointA=g.position;else for(var x=0;x<m.length;x++)if(M=m[x],p.contains(M.bounds,g.position)&&u.canCollide(M.collisionFilter,v.collisionFilter))for(var S=M.parts.length>1?1:0;S<M.parts.length;S++){var _=M.parts[S];if(a.contains(_.vertices,g.position)){T.pointA=g.position,T.bodyB=v.body=M,T.pointB={x:g.position.x-M.position.x,y:g.position.y-M.position.y},T.angleB=M.angle,o.set(M,!1),h.trigger(v,"startdrag",{mouse:g,body:M});break}}}else T.bodyB=v.body=null,T.pointB=null,M&&h.trigger(v,"enddrag",{mouse:g,body:M})},i._triggerEvents=function(v){var m=v.mouse,g=m.sourceEvents;g.mousemove&&h.trigger(v,"mousemove",{mouse:m}),g.mousedown&&h.trigger(v,"mousedown",{mouse:m}),g.mouseup&&h.trigger(v,"mouseup",{mouse:m}),l.clearSourceEvents(m)}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(2),o=s(14),l=s(1),h=s(11),u=s(3);(function(){i.collides=function(d,f){for(var c=[],p=0;p<f.length;p++){var v=f[p];if(l.overlaps(v.bounds,d.bounds))for(var m=v.parts.length===1?0:1;m<v.parts.length;m++){var g=v.parts[m];if(l.overlaps(g.bounds,d.bounds)){var T=o.collides(g,d);if(T.collided){c.push(T);break}}}}return c},i.ray=function(d,f,c,p){p=p||1e-100;for(var v=a.angle(f,c),m=a.magnitude(a.sub(f,c)),g=(c.x+f.x)*.5,T=(c.y+f.y)*.5,M=h.rectangle(g,T,m,p,{angle:v}),x=i.collides(M,d),S=0;S<x.length;S+=1){var _=x[S];_.body=_.bodyB=_.bodyA}return x},i.region=function(d,f,c){for(var p=[],v=0;v<d.length;v++){var m=d[v],g=l.overlaps(m.bounds,f);(g&&!c||!g&&c)&&p.push(m)}return p},i.point=function(d,f){for(var c=[],p=0;p<d.length;p++){var v=d[p];if(l.contains(v.bounds,f))for(var m=v.parts.length===1?0:1;m<v.parts.length;m++){var g=v.parts[m];if(l.contains(g.bounds,f)&&u.contains(g.vertices,f)){c.push(v);break}}}return c}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(4),o=s(18),l=s(0);(function(){var h,u;if(typeof window<"u"&&(h=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,u=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),!h){var d;h=function(f){d=setTimeout(function(){f(l.now())},1e3/60)},u=function(){clearTimeout(d)}}i.create=function(f){var c={fps:60,correction:1,deltaSampleSize:60,counterTimestamp:0,frameCounter:0,deltaHistory:[],timePrev:null,timeScalePrev:1,frameRequestId:null,isFixed:!1,enabled:!0},p=l.extend(c,f);return p.delta=p.delta||1e3/p.fps,p.deltaMin=p.deltaMin||1e3/p.fps,p.deltaMax=p.deltaMax||1e3/(p.fps*.5),p.fps=1e3/p.delta,p},i.run=function(f,c){return typeof f.positionIterations<"u"&&(c=f,f=i.create()),(function p(v){f.frameRequestId=h(p),v&&f.enabled&&i.tick(f,c,v)})(),f},i.tick=function(f,c,p){var v=c.timing,m=1,g,T={timestamp:v.timestamp};a.trigger(f,"beforeTick",T),f.isFixed?g=f.delta:(g=p-f.timePrev||f.delta,f.timePrev=p,f.deltaHistory.push(g),f.deltaHistory=f.deltaHistory.slice(-f.deltaSampleSize),g=Math.min.apply(null,f.deltaHistory),g=g<f.deltaMin?f.deltaMin:g,g=g>f.deltaMax?f.deltaMax:g,m=g/f.delta,f.delta=g),f.timeScalePrev!==0&&(m*=v.timeScale/f.timeScalePrev),v.timeScale===0&&(m=0),f.timeScalePrev=v.timeScale,f.correction=m,f.frameCounter+=1,p-f.counterTimestamp>=1e3&&(f.fps=f.frameCounter*((p-f.counterTimestamp)/1e3),f.counterTimestamp=p,f.frameCounter=0),a.trigger(f,"tick",T),a.trigger(f,"beforeUpdate",T),o.update(c,g,m),a.trigger(f,"afterUpdate",T),a.trigger(f,"afterTick",T)},i.stop=function(f){u(f.frameRequestId)},i.start=function(f,c){i.run(f,c)}})()}),(function(e,n,s){var i={};e.exports=i,s(1);var a=s(0);(function(){i.pathToVertices=function(o,l){typeof window<"u"&&!("SVGPathSeg"in window)&&a.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");var h,u,d,f,c,p,v,m,g,T,M=[],x,S,_=0,y=0,A=0;l=l||15;var E=function(b,U,I){var F=I%2===1&&I>1;if(!g||b!=g.x||U!=g.y){g&&F?(x=g.x,S=g.y):(x=0,S=0);var k={x:x+b,y:S+U};(F||!g)&&(g=k),M.push(k),y=x+b,A=S+U}},w=function(b){var U=b.pathSegTypeAsLetter.toUpperCase();if(U!=="Z"){switch(U){case"M":case"L":case"T":case"C":case"S":case"Q":y=b.x,A=b.y;break;case"H":y=b.x;break;case"V":A=b.y;break}E(y,A,b.pathSegType)}};for(i._svgPathToAbsolute(o),d=o.getTotalLength(),p=[],h=0;h<o.pathSegList.numberOfItems;h+=1)p.push(o.pathSegList.getItem(h));for(v=p.concat();_<d;){if(T=o.getPathSegAtLength(_),c=p[T],c!=m){for(;v.length&&v[0]!=c;)w(v.shift());m=c}switch(c.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":f=o.getPointAtLength(_),E(f.x,f.y,0);break}_+=l}for(h=0,u=v.length;h<u;++h)w(v[h]);return M},i._svgPathToAbsolute=function(o){for(var l,h,u,d,f,c,p=o.pathSegList,v=0,m=0,g=p.numberOfItems,T=0;T<g;++T){var M=p.getItem(T),x=M.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(x))"x"in M&&(v=M.x),"y"in M&&(m=M.y);else switch("x1"in M&&(u=v+M.x1),"x2"in M&&(f=v+M.x2),"y1"in M&&(d=m+M.y1),"y2"in M&&(c=m+M.y2),"x"in M&&(v+=M.x),"y"in M&&(m+=M.y),x){case"m":p.replaceItem(o.createSVGPathSegMovetoAbs(v,m),T);break;case"l":p.replaceItem(o.createSVGPathSegLinetoAbs(v,m),T);break;case"h":p.replaceItem(o.createSVGPathSegLinetoHorizontalAbs(v),T);break;case"v":p.replaceItem(o.createSVGPathSegLinetoVerticalAbs(m),T);break;case"c":p.replaceItem(o.createSVGPathSegCurvetoCubicAbs(v,m,u,d,f,c),T);break;case"s":p.replaceItem(o.createSVGPathSegCurvetoCubicSmoothAbs(v,m,f,c),T);break;case"q":p.replaceItem(o.createSVGPathSegCurvetoQuadraticAbs(v,m,u,d),T);break;case"t":p.replaceItem(o.createSVGPathSegCurvetoQuadraticSmoothAbs(v,m),T);break;case"a":p.replaceItem(o.createSVGPathSegArcAbs(v,m,M.r1,M.r2,M.angle,M.largeArcFlag,M.sweepFlag),T);break;case"z":case"Z":v=l,m=h;break}(x=="M"||x=="m")&&(l=v,h=m)}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(5);s(0),(function(){i.create=a.create,i.add=a.add,i.remove=a.remove,i.clear=a.clear,i.addComposite=a.addComposite,i.addBody=a.addBody,i.addConstraint=a.addConstraint})()})])})})(ar)),ar.exports}Tg();class bg extends Pc{constructor(){super();const t=new on;t.deleteAttribute("uv");const e=new ge({side:Ge}),n=new ge,s=new dr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const i=new Ft(t,e);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);const a=new Ft(t,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new Ft(t,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const l=new Ft(t,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const h=new Ft(t,n);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);const u=new Ft(t,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const d=new Ft(t,n);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);const f=new Ft(t,Ci(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const c=new Ft(t,Ci(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const p=new Ft(t,Ci(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);const v=new Ft(t,Ci(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const m=new Ft(t,Ci(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const g=new Ft(t,Ci(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Ci(r){const t=new Xe;return t.color.setScalar(r),t}const Pt={minX:-15,maxX:15,minZ:-12,maxZ:12,wallH:7.6},Qt={w:1.1,d:1,h:1,halfH:.5,bodyBottom:.12},Le={red:{label:"RED",zh:"红色",hex:"#c9463c",dark:"#7d231e"},yellow:{label:"YELLOW",zh:"黄色",hex:"#dea62b",dark:"#8f6412"},blue:{label:"BLUE",zh:"蓝色",hex:"#3b6ea8",dark:"#1f4066"}},Ae={x:-9.4,z:7.2,yaw:Math.PI},Ag=1.65,Ql=[{color:"red",x:-11.8,z:1},{color:"yellow",x:-9.4,z:1},{color:"blue",x:-7,z:1}],oi=[{color:"red",x:10.4,z:-4.6,w:2.9,d:2.9},{color:"yellow",x:10.4,z:.4,w:2.9,d:2.9},{color:"blue",x:10.4,z:5.4,w:2.9,d:2.9}],lo=120,co=1.75,Cg=.95,Ks=.1,Js={lateral:.25,height:.15,angleDeg:15,insertion:.3},Rg=.05,js={stableSeconds:.5,maxBottom:.06,maxSpeed:.1};let ho=20261021;function Yt(){return ho=(ho*1664525+1013904223)%4294967296,ho/4294967296}function Je(r,t){const e=document.createElement("canvas");return e.width=r,e.height=t,{c:e,g:e.getContext("2d")}}function je(r,t){const e=new gr(r);return e.colorSpace=Ie,e.anisotropy=8,t&&(e.wrapS=e.wrapT=lr,e.repeat.set(t[0],t[1])),e}function Pg(r,t,e){r.fillStyle="#78766d",r.fillRect(0,0,t,e);for(let n=0;n<26e3;n++){const s=92+Math.floor(Yt()*60);r.fillStyle=`rgba(${s},${s-2},${s-8},${.05+Yt()*.13})`;const i=1+Yt()*3.2;r.fillRect(Yt()*t,Yt()*e,i,i)}for(let n=0;n<26;n++){const s=Yt()*t,i=Yt()*e,a=25+Yt()*130,o=r.createRadialGradient(s,i,0,s,i,a),l=Yt()>.45;o.addColorStop(0,l?"rgba(44,43,39,0.17)":"rgba(196,192,180,0.10)"),o.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=o,r.beginPath(),r.arc(s,i,a,0,Math.PI*2),r.fill()}r.strokeStyle="rgba(38,37,34,0.42)",r.lineWidth=2;for(const n of[.25,.5,.75])r.beginPath(),r.moveTo(n*t+.5,0),r.lineTo(n*t+.5,e),r.stroke(),r.beginPath(),r.moveTo(0,n*e+.5),r.lineTo(t,n*e+.5),r.stroke();r.strokeStyle="rgba(30,29,27,0.30)";for(let n=0;n<15;n++){let s=Yt()*t,i=Yt()*e;r.lineWidth=.6+Yt(),r.beginPath(),r.moveTo(s,i);for(let a=0;a<9;a++)s+=(Yt()-.5)*70,i+=(Yt()-.5)*70,r.lineTo(s,i);r.stroke()}}function Lg(){const{c:r,g:t}=Je(1024,1024);return Pg(t,1024,1024),je(r,[7,5.5])}function Ig(){const{c:r,g:t}=Je(512,512);t.fillStyle="#808080",t.fillRect(0,0,512,512);for(let n=0;n<14e3;n++){const s=105+Math.floor(Yt()*60);t.fillStyle=`rgb(${s},${s},${s})`,t.fillRect(Yt()*512,Yt()*512,1+Yt()*2,1+Yt()*2)}const e=je(r,[7,5.5]);return e.colorSpace=Cn,e}function Dg(){const{c:r,g:t}=Je(512,512),e=t.createLinearGradient(0,0,0,512);e.addColorStop(0,"#8d9492"),e.addColorStop(.55,"#7e8584"),e.addColorStop(1,"#6b7271"),t.fillStyle=e,t.fillRect(0,0,512,512);for(let n=0;n<512;n+=32){const s=t.createLinearGradient(n,0,n+32,0);s.addColorStop(0,"rgba(255,255,255,0.16)"),s.addColorStop(.35,"rgba(255,255,255,0.03)"),s.addColorStop(.62,"rgba(0,0,0,0.16)"),s.addColorStop(1,"rgba(0,0,0,0.02)"),t.fillStyle=s,t.fillRect(n,0,32,512)}for(let n=0;n<260;n++)t.fillStyle=`rgba(${30+Yt()*40},${29+Yt()*40},${27+Yt()*40},${Yt()*.13})`,t.fillRect(Yt()*512,400+Yt()*112,3+Yt()*30,1+Yt()*5);return je(r,[10,1])}function jc(r,t,e){r.fillStyle="#b98c53",r.fillRect(0,0,t,e);for(let n=0;n<70;n++){const s=Yt()*e;r.strokeStyle=`rgba(${80+Yt()*50},${50+Yt()*35},${20+Yt()*25},${.05+Yt()*.16})`,r.lineWidth=.5+Yt()*2.4,r.beginPath();for(let i=0;i<=t;i+=16){const a=s+Math.sin(i/t*Math.PI*(2+Yt()*4)+n)*(2+Yt()*7);i===0?r.moveTo(i,a):r.lineTo(i,a)}r.stroke()}for(let n=0;n<40;n++){const s=Yt()*t,i=Yt()*e;r.strokeStyle="rgba(84,54,26,0.22)",r.lineWidth=1,r.beginPath(),r.ellipse(s,i,2+Yt()*7,1+Yt()*2.5,0,0,Math.PI*2),r.stroke()}r.strokeStyle="rgba(64,42,20,0.35)",r.lineWidth=2;for(let n=0;n<e;n+=e/5)r.beginPath(),r.moveTo(0,n),r.lineTo(t,n),r.stroke()}function Ug(r){const t=Le[r],{c:e,g:n}=Je(512,512);jc(n,512,512),n.fillStyle=t.hex,n.fillRect(34,76,444,330),n.strokeStyle="rgba(255,255,255,0.82)",n.lineWidth=7,n.strokeRect(48,90,416,302),n.setLineDash([16,10]),n.lineWidth=2,n.strokeStyle="rgba(255,255,255,0.45)",n.strokeRect(62,104,388,274),n.setLineDash([]),n.fillStyle="rgba(0,0,0,0.13)";for(let a=0;a<240;a++)n.fillRect(34+Yt()*444,76+Yt()*330,1+Yt()*6,1+Yt()*2);n.textAlign="center",n.fillStyle="#f7f3e6",n.font='800 66px "Helvetica Neue", Arial, sans-serif',n.fillText(t.label,256,225),n.font='700 43px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(t.zh+"货箱",256,285),n.font='600 25px "Helvetica Neue", Arial, sans-serif',n.fillText("PELICAN CARGO · ACADEMY",256,340),n.strokeStyle="rgba(255,255,255,0.7)",n.lineWidth=5;const s=26,i=54;for(const[a,o,l,h]of[[s,s,1,1],[512-s,s,-1,1],[s,512-s,1,-1],[512-s,512-s,-1,-1]])n.beginPath(),n.moveTo(a+l*i,o),n.lineTo(a,o),n.lineTo(a,o+h*i),n.stroke();return n.textAlign="left",n.fillStyle="rgba(30,20,10,0.55)",n.font='700 22px "Helvetica Neue", Arial, sans-serif',n.fillText("FL-ACADEMY / 03",40,470),n.textAlign="right",n.fillText("1.0 m³ · 240 kg",472,470),je(e)}function Ng(){const{c:r,g:t}=Je(512,512);jc(t,512,512),t.strokeStyle="rgba(50,34,16,0.5)",t.lineWidth=4,t.strokeRect(12,12,488,488),t.strokeStyle="rgba(50,34,16,0.28)",t.lineWidth=2;for(let e=0;e<512;e+=64)t.beginPath(),t.moveTo(e,0),t.lineTo(e,512),t.stroke();return t.fillStyle="rgba(38,28,16,0.5)",t.font='700 30px "Helvetica Neue", Arial, sans-serif',t.textAlign="center",t.fillText("PELICAN · FRAGILE",256,274),je(r)}function Fg(){const{c:r,g:t}=Je(256,64);t.fillStyle="#d7a92b",t.fillRect(0,0,256,64),t.fillStyle="#232629";for(let e=-64;e<256;e+=64)t.beginPath(),t.moveTo(e,64),t.lineTo(e+32,64),t.lineTo(e+96,0),t.lineTo(e+64,0),t.fill();return je(r,[1,1])}function tc(r,t=1024,e=512){const{c:n,g:s}=Je(t,e);return s.fillStyle=r.bg,s.fillRect(0,0,t,e),s.strokeStyle=r.accent??r.fg,s.lineWidth=14,s.strokeRect(22,22,t-44,e-44),s.strokeStyle="rgba(255,255,255,0.16)",s.lineWidth=3,s.strokeRect(44,44,t-88,e-88),s.textAlign="center",s.fillStyle=r.fg,s.font='800 104px "Helvetica Neue", Arial, sans-serif',s.fillText(r.title,t/2,196),r.zh&&(s.font='700 70px "PingFang SC", "Microsoft YaHei", sans-serif',s.fillText(r.zh,t/2,292)),r.sub&&(s.font='600 34px "Helvetica Neue", Arial, sans-serif',s.fillStyle="rgba(255,255,255,0.78)",s.fillText(r.sub,t/2,370)),s.fillStyle=r.accent??r.fg,s.beginPath(),s.moveTo(t/2-60,e-82),s.lineTo(t/2,e-118),s.lineTo(t/2+60,e-82),s.lineTo(t/2+32,e-82),s.lineTo(t/2+32,e-54),s.lineTo(t/2-32,e-54),s.lineTo(t/2-32,e-82),s.fill(),je(n)}function Og(){const{c:r,g:t}=Je(2048,512);t.fillStyle="#12211f",t.fillRect(0,0,2048,512);const e=t.createLinearGradient(0,0,2048,512);return e.addColorStop(0,"rgba(46,139,126,0.55)"),e.addColorStop(.6,"rgba(12,32,30,0)"),e.addColorStop(1,"rgba(199,148,55,0.32)"),t.fillStyle=e,t.fillRect(0,0,2048,512),t.strokeStyle="rgba(240,206,136,0.7)",t.lineWidth=6,t.strokeRect(34,34,1980,444),t.textAlign="left",t.fillStyle="#f0d9a4",t.font='800 142px "Helvetica Neue", Arial, sans-serif',t.fillText("PELICAN",110,210),t.fillStyle="#eef4ef",t.font='800 92px "Helvetica Neue", Arial, sans-serif',t.fillText("FORKLIFT ACADEMY",110,320),t.fillStyle="#8fd3c6",t.font='700 64px "PingFang SC", "Microsoft YaHei", sans-serif',t.fillText("鹈 鹕 叉 车 驾 校",112,418),t.strokeStyle="#f0d9a4",t.lineWidth=10,t.beginPath(),t.arc(1740,200,92,.4,Math.PI*1.72),t.stroke(),t.beginPath(),t.moveTo(1770,186),t.quadraticCurveTo(1890,196,1930,238),t.quadraticCurveTo(1840,252,1796,224),t.stroke(),t.fillStyle="#2e8b7e",t.beginPath(),t.arc(1712,196,15,0,7),t.fill(),t.fillStyle="rgba(240,217,164,0.9)",t.font='700 34px "Helvetica Neue", Arial, sans-serif',t.fillText("BAY 03 · TRAINING GROUND",1420,428),je(r)}function uo(r){const{c:t,g:e}=Je(512,720);return r===0?(e.fillStyle="#e9e2cf",e.fillRect(0,0,512,720),e.fillStyle="#d9a52c",e.fillRect(0,0,512,128),e.fillStyle="#1d2a2b",e.font='800 64px "Helvetica Neue", Arial, sans-serif',e.fillText("SAFETY",40,88),e.fillStyle="#263231",e.font='800 52px "PingFang SC", sans-serif',e.fillText("安全第一",40,230),e.strokeStyle="#263231",e.lineWidth=8,e.beginPath(),e.arc(256,470,150,0,Math.PI*2),e.stroke(),e.strokeStyle="#c9463c",e.lineWidth=22,e.beginPath(),e.arc(256,470,118,-.7,Math.PI*.9),e.stroke(),e.fillStyle="#263231",e.font='700 32px "Helvetica Neue", Arial, sans-serif',e.textAlign="center",e.fillText("WEAR · BELT · SLOW",256,670)):r===1?(e.fillStyle="#203230",e.fillRect(0,0,512,720),e.fillStyle="#e8d8ae",e.font='800 46px "PingFang SC", sans-serif',e.fillText("叉车通道",40,96),e.fillStyle="#8fd3c6",e.font='700 30px "Helvetica Neue", Arial, sans-serif',e.fillText("FORKLIFT LANE",40,142),e.strokeStyle="#d7a92b",e.lineWidth=10,e.setLineDash([28,18]),e.beginPath(),e.moveTo(256,650),e.lineTo(256,220),e.stroke(),e.setLineDash([]),e.fillStyle="#d7a92b",e.beginPath(),e.moveTo(256,176),e.lineTo(316,268),e.lineTo(196,268),e.fill(),e.strokeStyle="#e8d8ae",e.lineWidth=5,e.strokeRect(40,56,432,600)):(e.fillStyle="#efe7d6",e.fillRect(0,0,512,720),e.fillStyle="#c9463c",e.fillRect(0,0,512,150),e.fillStyle="#fff6e8",e.font='800 58px "Helvetica Neue", Arial, sans-serif',e.textAlign="center",e.fillText("CHECK",256,92),e.fillText("THE FORKS",256,140),e.fillStyle="#26302f",e.font='700 30px "PingFang SC", sans-serif',e.fillText("每 次 起 步 前 检 查 门 架",256,250),e.strokeStyle="#26302f",e.lineWidth=7,e.beginPath(),e.moveTo(130,430),e.lineTo(130,300),e.lineTo(382,300),e.stroke(),e.beginPath(),e.moveTo(150,590),e.lineTo(150,452),e.lineTo(362,452),e.stroke(),e.lineWidth=13,e.beginPath(),e.moveTo(150,590),e.lineTo(150,690),e.stroke(),e.beginPath(),e.moveTo(362,590),e.lineTo(362,690),e.stroke(),e.fillStyle="#d9a52c",e.font='800 34px "PingFang SC", sans-serif',e.fillText("门架 · 货叉 · 载荷",256,670)),je(t)}function Bg(){const{c:r,g:t}=Je(1024,512);t.fillStyle="#151b1c",t.fillRect(0,0,1024,512),t.strokeStyle="#303b3c",t.lineWidth=10,t.strokeRect(8,8,1008,496),t.textAlign="center";const e=(n,s)=>{t.strokeStyle="#5b6b69",t.lineWidth=5,t.beginPath(),t.arc(n,260,160,Math.PI*.75,Math.PI*2.25),t.stroke();for(let a=0;a<=20;a++){const o=Math.PI*.75+Math.PI*1.5*a/20,l=160,h=a%4===0?132:144;t.strokeStyle=a>15?"#c9463c":"#aab7b3",t.lineWidth=a%4===0?5:2,t.beginPath(),t.moveTo(n+Math.cos(o)*l,260+Math.sin(o)*l),t.lineTo(n+Math.cos(o)*h,260+Math.sin(o)*h),t.stroke()}const i=Math.PI*.75+Math.PI*1.5*(s==="HOURS"?.58:.3);t.strokeStyle="#e8b45b",t.lineWidth=6,t.beginPath(),t.moveTo(n,260),t.lineTo(n+Math.cos(i)*118,260+Math.sin(i)*118),t.stroke(),t.fillStyle="#0c1011",t.beginPath(),t.arc(n,260,18,0,7),t.fill(),t.strokeStyle="#e8b45b",t.lineWidth=3,t.beginPath(),t.arc(n,260,18,0,7),t.stroke(),t.fillStyle="#9fb0ac",t.font='600 30px "Helvetica Neue", Arial, sans-serif',t.fillText(s,n,450)};return e(280,"HOURS"),e(744,"FUEL"),t.fillStyle="#e8d8ae",t.font='700 28px "Helvetica Neue", Arial, sans-serif',t.fillText("PELICAN · FL-03",512,60),je(r)}function zg(r,t){const{c:e,g:n}=Je(512,256);return n.clearRect(0,0,512,256),n.fillStyle="#f0d9a4",n.font='800 76px "Helvetica Neue", Arial, sans-serif',n.textAlign="center",n.fillText(r,256,120),n.fillStyle="#d7e4df",n.font='700 28px "Helvetica Neue", Arial, sans-serif',n.fillText(t,256,174),je(e)}const oe=r=>new ge(r),fo=r=>new kc(r),po={},kg=Ng();function Vg(r){return po[r]||(po[r]=Ug(r)),oe({map:po[r],roughness:.72,metalness:.05})}function Hg(){return oe({map:kg,roughness:.78})}const H={paint:fo({color:2322278,metalness:.55,roughness:.28,clearcoat:.7,clearcoatRoughness:.22}),paintDark:fo({color:1527625,metalness:.5,roughness:.38,clearcoat:.4}),cream:oe({color:14273449,metalness:.25,roughness:.48}),graphite:oe({color:2369834,metalness:.55,roughness:.55}),castIron:oe({color:3883330,metalness:.7,roughness:.62}),steel:oe({color:10134436,metalness:.92,roughness:.34}),steelDark:oe({color:6121063,metalness:.85,roughness:.45}),chrome:oe({color:14541794,metalness:1,roughness:.1}),rubber:oe({color:1119510,metalness:.02,roughness:.93}),rubberTrim:oe({color:1777697,metalness:.05,roughness:.78}),seat:oe({color:1909283,metalness:.05,roughness:.66}),seatStitch:oe({color:7229236,metalness:.05,roughness:.7}),glass:fo({color:11065040,metalness:0,roughness:.06,transparent:!0,opacity:.16,side:Fe,depthWrite:!1}),feather:oe({color:16052453,metalness:0,roughness:.86}),featherShade:oe({color:14276040,metalness:0,roughness:.9}),featherTip:oe({color:12040626,metalness:0,roughness:.92}),beak:oe({color:15243058,metalness:.08,roughness:.48}),pouch:oe({color:14253869,metalness:.02,roughness:.62}),leg:oe({color:14849343,metalness:.02,roughness:.7}),eye:oe({color:16184296,metalness:0,roughness:.25}),pupil:oe({color:1053718,metalness:0,roughness:.2}),wood:oe({color:12160083,metalness:0,roughness:.78}),woodDark:oe({color:8149553,metalness:0,roughness:.82}),crateFrame:oe({color:10187071,metalness:.03,roughness:.75}),crateMetal:oe({color:7172979,metalness:.8,roughness:.48}),headlight:oe({color:16774358,emissive:16767114,emissiveIntensity:1.5,roughness:.2,metalness:.2}),taillight:oe({color:9314070,emissive:10363414,emissiveIntensity:.9,roughness:.35}),beacon:oe({color:16761415,emissive:16754720,emissiveIntensity:2.2,roughness:.25,transparent:!0,opacity:.9}),hazard:oe({map:Fg(),roughness:.6,metalness:.1}),rackBlue:oe({color:3364458,metalness:.55,roughness:.5}),rackOrange:oe({color:11102253,metalness:.45,roughness:.55}),deck:oe({color:9141086,metalness:.15,roughness:.8}),safetyYellow:oe({color:14725164,metalness:.15,roughness:.6})};function Gg(r){const t=Le[r],{c:e,g:n}=Je(768,512);n.fillStyle="#12191a",n.fillRect(0,0,768,512),n.fillStyle=t.hex,n.fillRect(0,0,768,118),n.strokeStyle="rgba(255,255,255,0.85)",n.lineWidth=10,n.strokeRect(14,14,740,484),n.textAlign="center",n.fillStyle="#ffffff",n.font='800 70px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(t.zh+"交付区",384,86),n.fillStyle="#f5efdf",n.font='800 92px "Helvetica Neue", Arial, sans-serif',n.fillText(t.label,384,250),n.fillStyle=t.hex,n.fillRect(130,292,508,76),n.fillStyle="#101718",n.font='800 52px "PingFang SC", sans-serif',n.fillText("仅限同色货箱",384,348),n.fillStyle="#b9c6c1",n.font='600 30px "Helvetica Neue", Arial, sans-serif',n.fillText("DROP ZONE · KEEP CLEAR",384,430);for(let s=0;s<8;s++)n.fillStyle=s%2===0?t.hex:"#202829",n.fillRect(60+s*82,462,82,30);return je(e)}function Wg(){const{c:r,g:t}=Je(256,256),e=t.createRadialGradient(128,128,4,128,128,124);return e.addColorStop(0,"rgba(0,0,0,0.45)"),e.addColorStop(.55,"rgba(0,0,0,0.18)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.beginPath(),t.arc(128,128,124,0,7),t.fill(),je(r)}function St(r,t,e,n=0,s=0,i=0,a=0,o=0,l=0,h=!0,u=!0){const d=new Ft(t,e);return d.position.set(n,s,i),d.rotation.set(a,o,l),d.castShadow=h,d.receiveShadow=u,r.add(d),d}function ct(r,t,e,n,s,i,a,o,l=0,h=0,u=0,d=!0){return St(r,new on(t,e,n),o,s,i,a,l,h,u,d,!0)}function Xg(r,t,e,n=.05,s=.02,i=3){const a=Math.min(s,r*.24,t*.24,e*.24),o=Math.max(.002,Math.min(n,r/2-a-.001,t/2-a-.001)),l=new vs,h=r/2-a,u=t/2-a;l.moveTo(-h+o,-u),l.lineTo(h-o,-u),l.quadraticCurveTo(h,-u,h,-u+o),l.lineTo(h,u-o),l.quadraticCurveTo(h,u,h-o,u),l.lineTo(-h+o,u),l.quadraticCurveTo(-h,u,-h,u-o),l.lineTo(-h,-u+o),l.quadraticCurveTo(-h,-u,-h+o,-u);const d=new Wi(l,{depth:Math.max(.001,e-2*a),bevelEnabled:!0,bevelThickness:a,bevelSize:a,bevelSegments:i,curveSegments:i+2,steps:1});return d.center(),d}function Pe(r,t,e,n,s,i,a,o,l=.05,h=.02,u=0,d=0,f=0){return St(r,Xg(t,e,n,l,h),o,s,i,a,u,d,f,!0,!0)}function sn(r,t,e,n,s,i=12){const a=new P().subVectors(e,t),o=a.length(),l=new Ft(new ne(n,n,o,i),s);return l.position.copy(t).addScaledVector(a,.5),l.quaternion.setFromUnitVectors(new P(0,1,0),a.clone().normalize()),l.castShadow=!0,l.receiveShadow=!0,r.add(l),l}function Yg(r,t,e,n,s=24,i=10){const a=new Sa(t),o=new Ft(new yr(a,s,e,i,!1),n);return o.castShadow=!0,o.receiveShadow=!0,r.add(o),o}function Qs(r,t,e,n,s,i,a,o,l){const h=zg(t,e),u=new ge({map:h,transparent:!0,roughness:.5,metalness:.1,depthWrite:!1});return St(r,new ve(n,s),u,i,a,o,0,l,0,!1,!1)}function qg(r,t){const e=[],n=t/2;e.push(new ot(.52*r,-n*.86)),e.push(new ot(.78*r,-n)),e.push(new ot(.92*r,-n*.92)),e.push(new ot(.99*r,-n*.58)),e.push(new ot(r,0)),e.push(new ot(.99*r,n*.58)),e.push(new ot(.92*r,n*.92)),e.push(new ot(.78*r,n)),e.push(new ot(.52*r,n*.86));const s=new wa(e,28);return s.rotateZ(Math.PI/2),s}function ec(r,t){const e=new fe,n=new fe;e.add(n);const s=new Ft(qg(r,t),H.rubber);s.castShadow=!0,s.receiveShadow=!0,n.add(s);const i=new on(t*1.005,r*.075,r*.19),a=new Nu(i,H.rubber,20),o=new Ce;for(let u=0;u<20;u++){const d=u/20*Math.PI*2;o.position.set(0,Math.cos(d)*r*.985,Math.sin(d)*r*.985),o.rotation.set(d,0,0),o.updateMatrix(),a.setMatrixAt(u,o.matrix)}a.castShadow=!0,n.add(a);const l=new Ft(new ne(r*.56,r*.56,t*.68,22),H.steelDark);l.rotation.z=Math.PI/2,l.castShadow=!0,n.add(l);for(const u of[-1,1]){const d=new Ft(new ne(r*.52,r*.52,.025,22),H.steel);d.rotation.z=Math.PI/2,d.position.x=u*t*.35,d.castShadow=!0,n.add(d);const f=new Ft(new ne(r*.17,r*.2,.05,14),H.chrome);f.rotation.z=Math.PI/2,f.position.x=u*t*.37,f.castShadow=!0,n.add(f);for(let c=0;c<5;c++){const p=c/5*Math.PI*2,v=new Ft(new ne(.014,.014,.03,6),H.steelDark);v.rotation.z=Math.PI/2,v.position.set(u*t*.38,Math.cos(p)*r*.33,Math.sin(p)*r*.33),n.add(v)}}const h=new Ft(new hi(r*.64,.008,6,32),H.paint);return h.rotation.y=Math.PI/2,h.position.x=t*.355,n.add(h),{steer:e,spin:n,radius:r}}function mo(r,t){const e=new vs;e.moveTo(0,0),e.bezierCurveTo(t*.5,r*.1,t*.62,r*.55,0,r),e.bezierCurveTo(-t*.62,r*.55,-t*.5,r*.1,0,0);const n=new Wi(e,{depth:.012,bevelEnabled:!0,bevelSize:.008,bevelThickness:.006,bevelSegments:2,curveSegments:8});return n.center(),n}function Zg(){const r=new fe,t=H.feather,e=H.featherShade,n=H.featherTip,s=new fe;r.add(s),St(s,new He(.5,28,22),t,0,1.3,-.28).scale.set(.78,.96,.68);for(let x=0;x<3;x++)St(s,new He(.5,22,16),x===1?e:t,0,1.16-x*.075,-.27+x*.015).scale.set(.68-x*.02,.36,.6);for(let x=0;x<3;x++)St(s,mo(.5,.2),e,-.13+x*.13,1.16,-.62,Math.PI*.72,0,(x-1)*.16).scale.setScalar(.9);const a=new Sa([new P(0,1.56,-.23),new P(.005,1.72,-.18),new P(.005,1.9,-.05),new P(.01,2.02,.15),new P(.005,2.02,.28)]),o=new Ft(new yr(a,32,.095,12,!1),t);o.castShadow=!0,o.receiveShadow=!0,o.scale.set(1,1,1),s.add(o),St(s,new He(.5,16,12),e,0,1.55,-.21).scale.set(.3,.22,.28);const h=new fe;h.position.set(0,2.03,.3),s.add(h),St(h,new He(.5,24,18),t,0,0,0).scale.set(.32,.3,.36);for(const x of[-1,1])St(h,new He(.055,14,12),H.eye,x*.135,.045,.105).scale.set(1,1.05,.7),St(h,new He(.03,12,10),H.pupil,x*.158,.045,.137),St(h,new He(.01,8,6),new Xe({color:16777215}),x*.168,.062,.158,0,0,0,!1,!1),St(h,new hi(.06,.009,6,18),new ge({color:12487242,roughness:.7}),x*.135,.045,.1,0,x*1.1,0,!1,!1).scale.set(1,1.05,.7);const d=new fe;d.position.set(0,.015,.19),h.add(d);const f=new ne(.018,.075,.6,14,1,!1);f.rotateX(Math.PI/2);const c=St(d,f,H.beak,0,0,.28);c.scale.y=.62,St(d,new vr(.022,.09,10),H.beak,0,-.03,.585,Math.PI*.62,0,0),ct(d,.02,.02,.45,0,.045,.25,H.pouch),St(h,new He(.5,24,18),H.pouch,0,-.15,.33).scale.set(.31,.4,.62),St(h,new He(.5,20,14),H.pouch,0,-.27,.3).scale.set(.24,.26,.5);const m=new ne(.012,.05,.52,10);m.rotateX(Math.PI/2),St(h,m,H.beak,0,-.055,.47).scale.y=.45;const g=new fe;g.position.set(0,.115,-.01),g.rotation.x=-.12,h.add(g),St(g,new He(.225,24,14,0,Math.PI*2,0,Math.PI*.55),H.safetyYellow,0,0,0).scale.set(1.02,.92,1.1),St(g,new ne(.235,.245,.022,24),H.safetyYellow,0,.005,.005),St(g,new hi(.2,.012,6,24),H.graphite,0,.01,0,Math.PI/2,0,0,!1,!1),St(g,new ne(.12,.15,.018,18),H.safetyYellow,0,0,.2,.1,0,0).scale.set(1.25,1,1),St(g,new kn(.035,16),H.paintDark,0,.13,.185,-.35,0,0,!1,!1);for(const x of[-1,1]){const S=new fe;s.add(S),St(S,new He(.5,16,12),t,x*.29,1.38,-.22).scale.set(.23,.4,.32),Yg(S,[new P(x*.3,1.4,-.22),new P(x*.34,1.3,-.02),new P(x*.26,1.31,.15),new P(x*.18,1.34,.24)],.075,t,18,10);for(let y=0;y<3;y++)St(S,mo(.38,.17),y===2?n:e,x*(.31-y*.025),1.26-y*.02,-.08+y*.03,Math.PI*.5,x*.25,x*(.35+y*.16)).scale.set(1,1,.7);for(let y=0;y<3;y++)St(S,mo(.24,.1),y===1?n:e,x*(.2+y*.012),1.335-y*.004,.27+y*.02,Math.PI*.46,x*.35,x*.5).scale.set(.8,.85,.7)}for(const x of[-1,1]){sn(s,new P(x*.13,1.02,-.25),new P(x*.15,.66,.16),.038,H.leg,10),sn(s,new P(x*.14,.7,-.1),new P(x*.15,.63,.16),.032,H.leg,8);const S=new fe;S.position.set(x*.15,.605,.24),s.add(S);const _=new vs;_.moveTo(0,0),_.quadraticCurveTo(.1,.06,.18,.03),_.quadraticCurveTo(.11,-.02,.15,-.1),_.quadraticCurveTo(.03,-.08,0,0);const y=new Ft(new Wi(_,{depth:.022,bevelEnabled:!1,curveSegments:8}),H.leg);y.rotation.x=-Math.PI/2,y.rotation.z=x>0?0:Math.PI,y.position.z=.03,y.castShadow=!0,y.receiveShadow=!0,S.add(y),St(S,new on(.14,.018,.16),H.leg,.02,.01,.01,0,0,0,!0,!0)}return{root:r,head:h,neck:o,torso:s}}function $g(){const r=new fe;r.name="forklift";const t=H.paint,e=H.paintDark,n=H.cream;Pe(r,1.3,.38,2.15,0,.55,-.02,t,.09,.035),Pe(r,1.14,.5,.55,0,.72,1,t,.07,.03),Pe(r,1.24,.6,.62,0,.82,-.62,t,.08,.03,.05),Pe(r,1.08,.34,.5,0,.98,.82,e,.06,.025,-.13),Pe(r,1.27,.95,.62,0,.8,-1.15,H.castIron,.09,.035);for(let _=-2;_<=2;_++)ct(r,.12,.68,.04,_*.22,.79,-1.47,H.graphite);ct(r,1.05,.12,.1,0,.3,-1.47,H.steelDark),St(r,new ne(.055,.055,.16,12),H.chrome,0,.43,-1.5,Math.PI/2,0,0),ct(r,.72,.32,.035,0,.98,-1.47,H.graphite);for(let _=0;_<6;_++)ct(r,.62,.022,.012,0,.87+_*.045,-1.492,H.steelDark);Qs(r,"PELICAN","FL-ACADEMY 03",.52,.26,0,.62,-1.49,Math.PI);for(const _ of[-1,1]){ct(r,.02,.26,1.2,_*.645,.62,.12,e),ct(r,.02,.02,1.18,_*.655,.73,.1,H.steelDark),ct(r,.3,.06,.5,_*.7,.32,-.24,H.steelDark);for(let y=0;y<4;y++)ct(r,.26,.012,.03,_*.7,.355,-.4+y*.1,H.steel);sn(r,new P(_*.68,.82,-.68),new P(_*.68,1.38,-.72),.022,H.chrome,8),Qs(r,"PELICAN","FORKLIFT ACADEMY",.44,.22,_*.657,.93,-.35,_>0?Math.PI/2:-Math.PI/2)}for(const _ of[-1,1]){const y=new ge({color:1527625,metalness:.5,roughness:.4,side:Fe}),A=new Ft(new ne(.47,.47,.34,20,1,!0,0,Math.PI),y);A.rotation.z=Math.PI/2,A.rotation.y=0,A.position.set(_*.74,.42,.7),A.castShadow=!0,A.receiveShadow=!0,r.add(A),ct(r,.32,.22,.03,_*.74,.28,.24,H.rubberTrim)}ct(r,1.2,.14,.16,0,.33,1.24,H.steelDark);for(const _ of[-1,1]){St(r,new ne(.115,.13,.12,16),H.graphite,_*.41,.82,1.24,Math.PI/2,0,0),St(r,new ne(.095,.095,.03,16),H.chrome,_*.41,.82,1.31,Math.PI/2,0,0),St(r,new kn(.082,16),H.headlight,_*.41,.82,1.328,0,0,0,!1,!1),ct(r,.1,.2,.12,_*.44,1.15,1.22,H.graphite),St(r,new kn(.04,12),H.beacon,_*.44,1.19,1.286,0,0,0,!1,!1);for(let y=0;y<3;y++)ct(r,.15,.035,.02,_*.16,.92+y*.06,1.283,H.graphite)}for(const _ of[-1,1])ct(r,.12,.16,.04,_*.5,1.02,-1.47,H.taillight);sn(r,new P(.48,.55,-1.32),new P(.48,1.5,-1.32),.035,H.graphite,10),St(r,new ne(.055,.045,.05,10),H.steelDark,.48,1.52,-1.32),sn(r,new P(-.5,1.4,-1.32),new P(-.5,2,-1.38),.006,H.chrome,5);const s=.59;Pe(r,1.08,.07,1.2,0,s,.16,H.steelDark,.02,.01);for(let _=0;_<4;_++)ct(r,.9,.012,.03,0,s+.045,-.05+_*.14,H.steel);const i=new fe;r.add(i),Pe(i,.64,.14,.56,0,.96,-.14,H.seat,.05,.02),Pe(i,.64,.08,.54,0,1.055,-.14,H.seat,.04,.015),Pe(i,.64,.7,.14,0,1.28,-.43,H.seat,.06,.025,-.1),Pe(i,.4,.18,.13,0,1.66,-.47,H.seat,.05,.02,-.1);for(const _ of[-1,1])Pe(i,.12,.36,.5,_*.38,1.06,-.13,H.seat,.04,.015),ct(i,.42,.01,.06,_*.1,1.065,.06,H.seatStitch),ct(i,.42,.01,.06,_*.1,1.065,-.32,H.seatStitch);for(let _=0;_<3;_++)ct(i,.36,.008,.018,0,1.16+_*.11,-.498,H.seatStitch);ct(r,.22,.1,.3,.48,1.04,-.1,H.graphite);for(const _ of[-1,1])ct(r,.16,.025,.24,_*.16,s+.085,.48,H.graphite,-.25,0,0),ct(r,.14,.012,.2,_*.16,s+.1,.46,H.steelDark,-.25,0,0);const a=new P(0,1.03,.5),o=new P(0,1.3,.27);sn(r,a,o,.055,H.graphite,14),sn(r,new P(-.12,1.05,.47),new P(-.12,1.22,.36),.025,H.chrome,8);const l=new fe;l.position.set(0,1.37,.22),l.rotation.x=-.9,r.add(l);const h=St(l,new hi(.185,.024,10,30),H.graphite,0,0,0);h.castShadow=!0;for(let _=0;_<3;_++){const y=_/3*Math.PI*2+Math.PI/2;ct(l,.03,.02,.34,Math.cos(y)*.085,Math.sin(y)*.085,0,H.steelDark,0,0,-y+Math.PI/2,!1)}St(l,new ne(.06,.06,.06,16),H.steelDark,0,0,0,Math.PI/2,0,0),St(l,new ne(.04,.04,.075,12),H.cream,0,0,.01,Math.PI/2,0,0),St(l,new He(.035,12,10),H.beak,.15,-.1,.015);const u=new fe;u.position.set(0,1.2,.72),u.rotation.x=-.34,r.add(u),Pe(u,.76,.34,.12,0,0,0,H.graphite,.04,.02);const d=new ge({map:Bg(),roughness:.45,metalness:.15});St(u,new ve(.5,.25),d,0,.03,-.062,0,Math.PI,0,!1,!1);for(const _ of[-1,1]){const y=_>0?H.taillight:H.headlight;St(u,new kn(.018,10),y,_*.28,.1,-.063,0,Math.PI,0,!1,!1)}for(let _=0;_<3;_++){const y=.26+_*.085;sn(r,new P(y,1,.42),new P(y+.02,1.32+_*.03,.34),.012,H.chrome,6),St(r,new He(.032,10,8),_===0?H.beak:H.graphite,y+.02,1.33+_*.03,.34)}for(const _ of[-1,1])for(const y of[-1,1])Pe(r,.1,1.3,.1,_*.63,1.78,y*.66,e,.03,.012);Pe(r,1.5,.13,1.7,0,2.43,-.06,t,.12,.03);for(let _=0;_<4;_++)ct(r,1.2,.016,.07,0,2.365,-.5+_*.28,H.steelDark);Pe(r,1.36,.04,1.5,0,2.345,-.06,n,.08,.015);const f=new Ft(new ne(.07,.085,.14,14),H.beacon);f.position.set(.48,2.56,-.35),f.castShadow=!0,r.add(f),St(r,new ne(.09,.1,.035,14),H.graphite,.48,2.49,-.35);const c=new dr(16755502,.5,3,2);c.position.set(.48,2.6,-.35),r.add(c);for(const _ of[-1,1])ct(r,.18,.12,.13,_*.4,2.33,.71,H.graphite),St(r,new kn(.06,12),H.headlight,_*.4,2.33,.78,0,0,0,!1,!1);const p=St(r,new ve(1.14,1.05),H.glass,0,1.8,.705,0,0,0,!1,!1);p.renderOrder=3;for(const _ of[-1,1])sn(r,new P(_*.63,2.02,.64),new P(_*.82,2.06,.55),.012,H.graphite,6),Pe(r,.02,.17,.12,_*.83,2.08,.53,H.steelDark,.01,.005),St(r,new ve(.1,.15),new ge({color:10466484,metalness:.9,roughness:.08}),_*.843,2.08,.53,0,_*Math.PI/2,0,!1,!1);Qs(r,"FASTEN","SEAT BELT",.26,.13,.63,1.5,-.55,Math.PI/2);const v=new fe;v.position.set(0,0,0),r.add(v);for(const _ of[-1,1]){ct(v,.11,2.82,.18,_*.53,1.53,1.06,H.steelDark),ct(v,.035,2.7,.21,_*.46,1.5,1.06,H.steel),ct(v,.09,2.6,.12,_*.36,1.48,1.12,H.steelDark),ct(v,.02,2.55,.03,_*.585,1.5,1.06,H.steel);for(let y=0;y<5;y++)ct(v,.14,.045,.2,_*.53,.35+y*.58,1.06,H.steel)}for(const _ of[.2,1.45,2.8])ct(v,1.16,.11,.15,0,_,1.06,H.steelDark);ct(v,.86,.1,.13,0,2.9,1.06,H.steelDark),St(v,new ne(.06,.06,.9,12),H.steelDark,0,2.95,1.1,0,0,Math.PI/2);for(const _ of[-1,1]){St(v,new ne(.065,.075,1.55,12),H.graphite,_*.23,.92,1.16),St(v,new ne(.032,.032,1.3,10),H.chrome,_*.23,2.3,1.16),St(v,new ne(.05,.05,.09,10),H.steelDark,_*.23,1.7,1.16);for(let y=0;y<14;y++)ct(v,.028,.045,.02,_*.3,2.78-y*.18,1.2,H.steelDark,0,0,0,!1);sn(v,new P(_*.06,.36,1.02),new P(_*.5,1.75,1.02),.02,H.rubber,7)}for(const _ of[-1,1])sn(r,new P(_*.42,.72,.92),new P(_*.42,1.1,1.16),.045,H.graphite,10),St(r,new ne(.025,.025,.9,8),H.chrome,_*.42,1.55,1.17,.25,0,0);const m=new fe;m.position.set(0,0,0),r.add(m),Pe(m,1.24,.5,.09,0,.37,1.27,H.steelDark,.03,.012),ct(m,1.3,.06,.12,0,.13,1.27,H.steel);for(let _=-2;_<=2;_++)ct(m,.055,.66,.05,_*.27,.92,1.3,H.steelDark);for(const _ of[.66,.92,1.18])ct(m,1.22,.05,.05,0,_,1.3,H.steel);for(const _ of[-1,1])for(const y of[.18,.56])St(m,new ne(.055,.055,.08,12),H.chrome,_*.58,y,1.2,0,0,Math.PI/2);const g=new vs;g.moveTo(0,0),g.lineTo(1.03,0),g.lineTo(1.06,.02),g.lineTo(1.06,.055),g.lineTo(1.03,.078),g.lineTo(.25,.078),g.lineTo(.22,.58),g.lineTo(.06,.58),g.lineTo(.05,.078),g.lineTo(0,.078),g.closePath();const T=new Wi(g,{depth:.16,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2,steps:1});T.rotateY(-Math.PI/2),T.translate(.08,.022,1.3);for(const _ of[-1,1]){const y=new Ft(T,H.steelDark);y.position.x=_*.32,y.castShadow=!0,y.receiveShadow=!0,m.add(y);for(let A=0;A<2;A++)St(m,new ne(.025,.025,.02,8),H.chrome,_*.32,.46+A*.09,1.385,Math.PI/2,0,0);ct(m,.165,.014,.3,_*.32,.105,1.5,H.chrome,0,0,0,!1)}ct(m,.86,.08,.1,0,.11,1.34,H.steelDark),Qs(v,"PELICAN","MAX 1800 kg",.34,.17,0,2.55,1.17,0);const M=[];for(const _ of[-1,1]){const y=ec(.34,.28);y.steer.position.set(_*.79,.34,.68),r.add(y.steer),M.push({...y,front:!0});const A=ec(.27,.22);A.steer.position.set(_*.55,.27,-.8),r.add(A.steer),M.push({...A,front:!1}),sn(r,new P(_*.46,.3,-.8),new P(_*.66,.3,-.8),.055,H.castIron,10)}St(r,new ne(.075,.075,1.5,12),H.castIron,0,.34,.68,0,0,Math.PI/2),St(r,new ne(.06,.06,1.1,12),H.castIron,0,.28,-.8,0,0,Math.PI/2);const x=Zg();r.add(x.root);const S=new Ft(new ve(2.3,3.2),new Xe({map:Wg(),transparent:!0,depthWrite:!1,opacity:.55}));return S.rotation.x=-Math.PI/2,S.position.set(0,.008,.2),S.renderOrder=1,r.add(S),{root:r,lift:m,wheels:M,pelican:x,beacon:f,shadow:S}}function Kg(r){const t=new fe;t.name=`crate-${r}`;const e=Vg(r),n=Hg(),s=[e,e,n,n,e,e],i=Qt.h-Qt.bodyBottom,a=new Ft(new on(Qt.w,i,Qt.d),s);a.position.y=Qt.halfH-i/2,a.castShadow=!0,a.receiveShadow=!0,t.add(a);const o=.055;for(const l of[-1,1])for(const h of[-1,1])ct(t,o,i+.02,o,l*(Qt.w/2-o/2),a.position.y,h*(Qt.d/2-o/2),H.crateFrame);for(const l of[-.36,.46]){for(const h of[-1,1])ct(t,o,.055,Qt.d,h*(Qt.w/2-o/2),l,0,H.crateFrame);for(const h of[-1,1])ct(t,Qt.w,.055,o,0,l,h*(Qt.d/2-o/2),H.crateFrame)}for(const l of[-1,1])for(const h of[-1,1])for(const u of[-1,1])ct(t,.085,.11,.02,l*(Qt.w/2-.03),h*.47,u*(Qt.d/2+.005),H.crateMetal),ct(t,.02,.11,.085,l*(Qt.w/2+.005),h*.47,u*(Qt.d/2-.03),H.crateMetal);for(const l of[-1,1])ct(t,.02,.16,.26,l*(Qt.w/2+.012),.02,.1,H.graphite,0,0,0,!1),ct(t,.018,.045,.2,l*(Qt.w/2+.027),.1,.1,H.steelDark,0,0,0,!1);for(const l of[0,-.45,.45])ct(t,.12,.12,Qt.d,l,-.44,0,H.woodDark);ct(t,Qt.w-.04,.05,Qt.d-.06,0,-.34,0,H.woodDark);for(const l of[-1,1])ct(t,Qt.w,.035,.06,0,.49,l*.44,H.crateFrame);for(const l of[-1,1])ct(t,.06,.035,Qt.d,l*.5,.49,0,H.crateFrame);return t}function zn(r,t,e,n,s,i,a=.012){const o=new Ft(new ve(t,e),i);return o.rotation.x=-Math.PI/2,o.position.set(n,a,s),o.receiveShadow=!0,o.renderOrder=1,r.add(o),o}function go(r,t=1){return new ge({color:r,roughness:.92,metalness:.02,transparent:t<1,opacity:t,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function Jg(r){const t=Le[r],e=document.createElement("canvas");e.width=512,e.height=512;const n=e.getContext("2d");n.clearRect(0,0,512,512),n.fillStyle=t.hex,n.globalAlpha=.38,n.fillRect(0,0,512,512),n.globalAlpha=1,n.strokeStyle="#f4eddc",n.lineWidth=12,n.strokeRect(18,18,476,476),n.lineWidth=4,n.strokeRect(44,44,424,424),n.setLineDash([22,14]),n.strokeStyle="rgba(255,255,255,0.55)",n.strokeRect(76,76,360,360),n.setLineDash([]),n.fillStyle="#fffdf6",n.textAlign="center",n.font='800 116px "Helvetica Neue", Arial, sans-serif',n.fillText(t.label,256,236),n.font='800 66px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(t.zh+"交付区",256,320),n.font='700 30px "Helvetica Neue", Arial, sans-serif',n.fillStyle="rgba(255,255,255,0.82)",n.fillText("DROP ZONE",256,372),n.strokeStyle="#fffdf6",n.lineWidth=14;for(const[i,a,o,l]of[[30,30,1,1],[482,30,-1,1],[30,482,1,-1],[482,482,-1,-1]])n.beginPath(),n.moveTo(i+o*62,a),n.lineTo(i,a),n.lineTo(i,a+l*62),n.stroke();const s=new gr(e);return s.colorSpace=Ie,s.anisotropy=8,s}function nc(r,t,e="#e6c05a"){const n=document.createElement("canvas");n.width=1024,n.height=512;const s=n.getContext("2d");s.clearRect(0,0,1024,512),s.fillStyle=e,s.textAlign="center",s.font='800 180px "PingFang SC", "Microsoft YaHei", sans-serif',s.globalAlpha=.85,s.fillText(r,512,260),s.font='700 58px "Helvetica Neue", Arial, sans-serif',s.fillText(t,512,356),s.globalAlpha=1;const i=new gr(n);return i.colorSpace=Ie,i.anisotropy=8,i}function ic(r,t,e,n,s,i,a,o=[1,2.35,3.7,4.9]){const l=new fe;l.position.set(e,0,n),l.rotation.y=a,r.add(l);const h=1.25,u=5.35,d=s*i;for(let f=0;f<=s;f++){const c=-d/2+f*i;for(const p of[-h/2,h/2])ct(l,.11,u,.11,c,u/2,p,H.rackBlue),ct(l,.05,.24,.3,c,.12,p,H.steelDark);for(let p=0;p<6;p++){const v=.45+p*.85,m=-h/2,T=h/2-m,M=Math.sqrt(T*T+.55*.55),x=ct(l,.055,.055,M,c,v,0,H.rackBlue,Math.atan2(.55,T),0,0);x.castShadow=!1,ct(l,.06,.05,h*.92,c,v+.28,0,H.rackBlue)}}for(const f of o){for(const c of[-h/2+.02,h/2-.02])ct(l,d,.15,.08,0,f,c,H.rackOrange),ct(l,d,.03,.1,0,f+.1,c,H.rackOrange);for(let c=0;c<s;c++){const p=-d/2+i/2+c*i;if(ct(l,i-.22,.055,h-.16,p,f-.09,0,H.deck),(c+Math.round(f*3))%3!==1){ct(l,.86,.1,.86,p,f+.12,0,H.woodDark);for(const m of[-.32,0,.32])ct(l,.82,.05,.1,p,f+.2,m,H.wood);const v=1+(c+Math.round(f))%3;for(let m=0;m<v;m++)ct(l,.72,.42,.72,p,f+.43+m*.44,0,m%2?H.deck:H.rackBlue),ct(l,.74,.02,.74,p,f+.64+m*.44,0,H.steelDark)}}}return t.push({cx:e+Math.sin(a)*0,cy:u/2,cz:n,hx:a===0?d/2+.1:h/2+.1,hy:u/2,hz:a===0?h/2+.1:d/2+.1,occlude:!0}),l}function vo(r,t,e,n=5,s=!1){const i=new fe;i.position.set(t,0,e),r.add(i);for(let a=0;a<n;a++){const o=.1+a*.18;ct(i,1.1,.05,1,0,o,0,H.wood);for(const l of[-.38,0,.38])ct(i,1.06,.09,.1,0,o-.06,l,H.woodDark);for(const l of[-.46,0,.46])ct(i,.1,.09,.95,l,o-.06,0,H.woodDark)}if(s){const a=new Ft(new on(1.15,1.15,1.05),new kc({color:13621716,transparent:!0,opacity:.42,roughness:.25,metalness:.05,clearcoat:.6,side:Fe}));a.position.y=.68,a.castShadow=!0,a.receiveShadow=!0,i.add(a),ct(i,.9,.9,.9,0,.68,0,H.deck)}return i}function jg(r,t,e,n){const s=new fe;s.position.set(t,0,e),r.add(s);const i=new Ft(new ne(.29,.29,.9,20),new ge({color:n,metalness:.55,roughness:.42}));i.position.y=.45,i.castShadow=!0,i.receiveShadow=!0,s.add(i);for(const a of[.18,.45,.72]){const o=new Ft(new hi(.295,.018,6,24),H.steelDark);o.rotation.x=Math.PI/2,o.position.y=a,s.add(o)}return St(s,new ne(.3,.3,.03,20),H.steelDark,0,.9,0),s}function xo(r,t,e){const n=new fe;n.position.set(t,0,e),r.add(n),ct(n,.42,.04,.42,0,.02,0,new ge({color:3093558,roughness:.8}));const s=new vr(.15,.55,14,1,!0),i=new Ft(s,new ge({color:14050095,roughness:.7,side:Fe}));i.position.y=.3,i.castShadow=!0,n.add(i);const a=new Ft(new ne(.105,.12,.1,14,1,!0),new ge({color:15854556,roughness:.6,side:Fe}));return a.position.y=.33,n.add(a),n}function Qg(r){const t=[],e={},n=[],s=new fe;r.add(s);const i=new ge({map:Lg(),bumpMap:Ig(),bumpScale:.025,color:10131082,roughness:.9,metalness:.03}),a=St(s,new ve(Pt.maxX-Pt.minX,Pt.maxZ-Pt.minZ),i,0,0,0,-Math.PI/2,0,0,!1,!0);a.name="warehouse-floor";const o=new ge({map:Dg(),color:11186348,roughness:.72,metalness:.18}),l=Pt.wallH,h=[[0,l/2,Pt.minZ-.25,30.5,l,.5],[0,l/2,Pt.maxZ+.25,30.5,l,.5],[Pt.minX-.25,l/2,0,.5,l,24.5],[Pt.maxX+.25,l/2,0,.5,l,24.5]];for(const[N,X,tt,K,dt,Lt]of h){const bt=St(s,new on(K,dt,Lt),o,N,X,tt,0,0,0,!1,!0);bt.material=o}for(const N of[-1,1])ct(s,30,1.15,.06,0,.58,N<0?Pt.minZ+.03:Pt.maxZ-.03,H.steelDark,0,0,0,!1),ct(s,30,.09,.07,0,1.2,N<0?Pt.minZ+.04:Pt.maxZ-.04,H.safetyYellow,0,0,0,!1),ct(s,.06,1.15,24,N<0?Pt.minX+.03:Pt.maxX-.03,.58,0,H.steelDark,0,0,0,!1),ct(s,.07,.09,24,N<0?Pt.minX+.04:Pt.maxX-.04,1.2,0,H.safetyYellow,0,0,0,!1);for(const N of[-10.5,-3.5,3.5,10.5])for(const X of[Pt.minZ+.28,Pt.maxZ-.28])ct(s,.42,l,.42,N,l/2,X,H.steelDark,0,0,0,!1),ct(s,.52,.16,.52,N,.08,X,H.steelDark,0,0,0,!1);for(const N of[-7.5,0,7.5])for(const X of[Pt.minX+.28,Pt.maxX-.28])ct(s,.42,l,.42,X,l/2,N,H.steelDark,0,0,0,!1);for(let N=0;N<4;N++){const X=-7.5+N*5;ct(s,.12,1.5,3,Pt.minX+.08,5.9,X,H.graphite,0,0,0,!1);const tt=St(s,new ve(2.7,1.25),new Xe({color:12575462}),Pt.minX+.15,5.9,X,0,Math.PI/2,0,!1,!1);tt.renderOrder=0;for(let K=-1;K<=1;K++)ct(s,.16,1.4,.06,Pt.minX+.18,5.9,X+K*.9,H.graphite,0,0,0,!1);ct(s,.18,.07,2.9,Pt.minX+.18,5.9,X,H.graphite,0,0,0,!1)}const u=new fe;u.position.set(-4.5,0,Pt.maxZ-.06),s.add(u),ct(u,5.4,.35,.35,0,5,-.05,H.steelDark,0,0,0,!1),ct(u,.35,5,.35,-2.7,2.5,-.05,H.steelDark,0,0,0,!1),ct(u,.35,5,.35,2.7,2.5,-.05,H.steelDark,0,0,0,!1);for(let N=0;N<12;N++)ct(u,5.2,.34,.08,0,.28+N*.37,-.08,N%3===0?H.steel:H.graphite,0,0,0,!1);ct(u,4.6,.35,.1,0,4.7,-.1,H.safetyYellow,0,0,0,!1);const d=new ge({map:tc({title:"EXIT",zh:"安全出口",sub:"KEEP CLEAR",bg:"#1c5d38",fg:"#f4f0dd",accent:"#9fe6b2"},512,256),roughness:.5});St(u,new ve(1.3,.65),d,0,5.1,.16,0,0,0,!1,!1);const f=new ge({map:Og(),roughness:.6,metalness:.1,emissive:1714726,emissiveIntensity:.2});ct(s,6.8,1.85,.12,5.3,5.55,Pt.maxZ-.15,H.graphite,0,0,0,!1),St(s,new ve(6.55,1.62),f,5.3,5.55,Pt.maxZ-.205,0,Math.PI,0,!1,!1);const c=[uo(0),uo(1),uo(2)];[[-14.93,3.4,8.4,Math.PI/2],[-14.93,3.4,-2.4,Math.PI/2],[14.93,4.3,-8.8,-Math.PI/2]].forEach(([N,X,tt,K],dt)=>{ct(s,.06,1.66,1.18,N-Math.sin(K)*.03,X,tt,H.graphite,0,0,0,!1);const Lt=new ge({map:c[dt],roughness:.65});St(s,new ve(1.08,1.52),Lt,N+Math.sin(K)*.02,X,tt,0,K,0,!1,!1)}),ct(s,.6,.9,.32,14.4,1.45,9.7,new ge({color:12269100,metalness:.3,roughness:.5}),0,-Math.PI/2,0,!1),St(s,new ve(.48,.3),new Xe({color:15327949}),14.22,1.62,9.7,0,-Math.PI/2,0,!1,!1);const v=new fe;v.position.set(5,4.35,Pt.minZ+.16),s.add(v),St(v,new ne(.42,.42,.08,28),H.graphite,0,0,0,Math.PI/2,0,0,!1),St(v,new kn(.37,28),new ge({color:15525074,roughness:.6}),0,0,.05,0,0,0,!1,!1);for(let N=0;N<12;N++){const X=N/12*Math.PI*2;ct(v,.02,N%3===0?.11:.06,.015,Math.sin(X)*.29,Math.cos(X)*.29,.06,H.graphite,0,0,-X,!1)}ct(v,.018,.19,.02,.05,.09,.07,H.graphite,0,0,-.6,!1),ct(v,.014,.26,.02,.03,.11,.07,H.graphite,0,0,.5,!1),ic(s,t,-6.1,-11.2,4,3.7,0),ic(s,t,-14.1,-5.6,2,3.4,Math.PI/2);const m=new ge({map:tc({title:"A-01",zh:"原料区",sub:"STORAGE · KEEP CLEAR",bg:"#24333a",fg:"#e7dcc3",accent:"#7fb1c0"},512,320),roughness:.6});St(s,new ve(1.5,.94),m,-2.2,5.15,-10.53,0,0,0,!1,!1),St(s,new ve(1.5,.94),m,-13.45,5.15,-9.4,0,Math.PI/2,0,!1,!1);const g={};for(const N of oi){const X=Le[N.color],tt=new fe;tt.position.set(N.x,0,N.z),s.add(tt),e[N.color]=tt;const K=new ge({map:Jg(N.color),transparent:!0,roughness:.86,metalness:.02,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});zn(tt,N.w,N.d,0,0,K,.018);const dt=new ge({color:X.hex,roughness:.65,metalness:.1});for(const Wt of[-1,1])ct(tt,N.w+.16,.025,.09,0,.012,Wt*(N.d/2+.06),dt,0,0,0,!1),ct(tt,.09,.025,N.d+.16,Wt*(N.w/2+.06),.012,0,dt,0,0,0,!1);for(const Wt of[-1,1])for(const Q of[-1,1]){const at=new Ft(new ve(.55,.55),H.hazard);at.rotation.x=-Math.PI/2,at.position.set(Wt*(N.w/2+.36),.01,Q*(N.d/2+.36)),tt.add(at)}const Lt=new ge({map:Gg(N.color),roughness:.45,metalness:.1,emissive:new jt(X.hex),emissiveIntensity:.12});ct(s,.1,1.5,2.2,Pt.maxX-.06,3.1,N.z,H.graphite,0,0,0,!1),St(s,new ve(2.1,1.4),Lt,Pt.maxX-.12,3.1,N.z,0,-Math.PI/2,0,!1,!1),ct(s,.1,.1,2,Pt.maxX-.15,3.86,N.z,new Xe({color:X.hex}),0,0,0,!1);const bt=new Ft(new _r(N.w/2-.16,N.w/2-.06,40),new Xe({color:X.hex,transparent:!0,opacity:.5,side:Fe,depthWrite:!1}));bt.rotation.x=-Math.PI/2,bt.position.y=.03,tt.add(bt),g[N.color]=dt}const T=go(14462514,.85),M=go(14472900,.7);for(const N of[7.05,7.55])zn(s,.09,18.5,N,-1.4,T,.014);for(let N=0;N<17;N++)zn(s,.32,.09,7.3,-10+N*1.08,M,.014);for(let N=0;N<3;N++){const X=-11.8+N*2.4;zn(s,2.1,.07,X,2.15,T,.014),zn(s,2.1,.07,X,-.1,T,.014),zn(s,.07,2.32,X-1.05,1.02,T,.014),zn(s,.07,2.32,X+1.05,1.02,T,.014)}for(const N of oi)for(let X=0;X<4;X++){const tt=go(13612368,.55),K=zn(s,.28,1.2,N.x-2.35+X*.38,N.z,tt,.013);K.rotation.z=.5}const x=nc("叉车通道","FORKLIFT LANE","#dcb84e"),S=new Xe({map:x,transparent:!0,depthWrite:!1,opacity:.8}),_=new Ft(new ve(3.6,1.8),S);_.rotation.x=-Math.PI/2,_.rotation.z=Math.PI/2,_.position.set(-4.2,.016,4.9),s.add(_);const y=nc("禁停","KEEP CLEAR","#d9c37a"),A=new Xe({map:y,transparent:!0,depthWrite:!1,opacity:.65}),E=new Ft(new ve(2.2,1.1),A);E.rotation.x=-Math.PI/2,E.position.set(13,.016,-2.2),s.add(E);const w=document.createElement("canvas");w.width=512,w.height=512;const b=w.getContext("2d");b.strokeStyle="rgba(225,190,85,0.9)",b.lineWidth=16,b.lineCap="round",b.strokeRect(150,270,150,110),b.beginPath(),b.arc(190,405,30,0,7),b.stroke(),b.beginPath(),b.arc(275,405,30,0,7),b.stroke(),b.beginPath(),b.moveTo(300,285),b.lineTo(300,130),b.lineTo(360,130),b.stroke(),b.beginPath(),b.moveTo(300,150),b.lineTo(390,150),b.stroke(),b.beginPath(),b.moveTo(340,155),b.lineTo(340,230),b.lineTo(300,230),b.stroke(),b.font='700 38px "Helvetica Neue", Arial, sans-serif',b.fillStyle="rgba(225,190,85,0.85)",b.textAlign="center",b.fillText("FL-03",256,480);const U=new gr(w);U.colorSpace=Ie;const I=new Ft(new ve(2.4,2.4),new Xe({map:U,transparent:!0,depthWrite:!1,opacity:.8}));I.rotation.x=-Math.PI/2,I.position.set(-9.4,.016,8.6),s.add(I),vo(s,13.4,9.9,5,!0),vo(s,12.3,10.9,3,!1),t.push({cx:13.2,cy:.8,cz:10.2,hx:1.15,hy:1.1,hz:1.15,occlude:!0});const F=[[-14.2,4.4,3107684],[-13.6,5.4,11556143],[-14.1,6.2,3889522]];for(const[N,X,tt]of F)jg(s,N,X,tt);t.push({cx:-13.95,cy:.5,cz:5.3,hx:.9,hy:.5,hz:1.3}),t.push({cx:14.4,cy:.9,cz:9.7,hx:.3,hy:.9,hz:.35}),xo(s,-3.3,-9.6),xo(s,-2.6,-9),xo(s,7.9,-8.4),vo(s,2,-9.7,2,!1),t.push({cx:2,cy:.4,cz:-9.7,hx:.6,hy:.4,hz:.55});const k=new ge({color:2765621,roughness:.9,metalness:.15});St(s,new ve(30.4,24.4),k,0,7.55,0,Math.PI/2,0,0,!1,!1);for(let N=-10;N<=10;N+=4){ct(s,30,.26,.2,0,7.2,N,H.steelDark,0,0,0,!1);for(let X=-12;X<=12;X+=6)ct(s,.12,.12,2.6,X,7.05,N,H.steelDark,.55,0,0,!1)}for(const N of[-9,-3,3,9])for(const X of[-6,3])O(s,N,6.8,X);function O(N,X,tt,K){const dt=new fe;dt.position.set(X,tt,K),N.add(dt),Z(dt,1,H.steelDark),ct(dt,.34,.12,2.6,0,-1.02,0,H.graphite,0,0,0,!1),St(dt,new ve(.26,2.4),new Xe({color:16773839}),0,-1.085,0,Math.PI/2,0,0,!1,!1)}function Z(N,X,tt){const K=new Ft(new ne(.018,.018,X,6),tt);K.position.y=X/2,N.add(K)}const G=new dr(16768942,45,18,2);G.position.set(-6.5,5.6,-2.5),r.add(G);const it=new dr(16766880,38,16,2);it.position.set(7.5,5.4,4),r.add(it);const rt=new vf(13624802,2761757,.55);r.add(rt);const et=new jr(16773330,3.1);et.position.set(-9,13.5,8.5),et.target.position.set(1,0,-1),et.castShadow=!0,et.shadow.mapSize.set(2048,2048),et.shadow.camera.left=-19,et.shadow.camera.right=19,et.shadow.camera.top=17,et.shadow.camera.bottom=-17,et.shadow.camera.near=1,et.shadow.camera.far=42,et.shadow.bias=-4e-4,et.shadow.normalBias=.035,et.shadow.radius=2,r.add(et),r.add(et.target);const Mt=new jr(10471122,.85);Mt.position.set(14,7,-12),r.add(Mt);const Dt=new jr(16766368,.5);return Dt.position.set(2,5,12),r.add(Dt),r.background=new jt(857109),r.fog=new xa(1055258,.0055),{colliders:t,zones:oi,zoneGroups:e,lightTargets:n}}const Gt=r=>document.getElementById(r),_o=r=>{const t=Math.max(0,r),e=Math.floor(t/60),n=t-e*60;return`${String(e).padStart(2,"0")}:${n.toFixed(1).padStart(4,"0")}`};class tv{constructor(){Nt(this,"renderer");Nt(this,"scene",new Pc);Nt(this,"camera",new $e(48,1,.08,90));Nt(this,"pmrem");Nt(this,"world");Nt(this,"truck");Nt(this,"crates",[]);Nt(this,"A");Nt(this,"physics");Nt(this,"truckBody");Nt(this,"mode","ready");Nt(this,"inspect",null);Nt(this,"camMode","follow");Nt(this,"timeLeft",lo);Nt(this,"elapsed",0);Nt(this,"score",0);Nt(this,"clock",new Mf);Nt(this,"pos",{x:Ae.x,z:Ae.z,yaw:Ae.yaw});Nt(this,"speed",0);Nt(this,"steer",0);Nt(this,"lift",0);Nt(this,"carrying",null);Nt(this,"carrySide",0);Nt(this,"carryForward",1.7);Nt(this,"carryYawOffset",0);Nt(this,"keys",new Set);Nt(this,"staticColliders",[]);Nt(this,"vehicleColliders",[]);Nt(this,"camPos",new P);Nt(this,"camTarget",new P);Nt(this,"camInit",!1);Nt(this,"zoom",7.6);Nt(this,"toastTimer",0);Nt(this,"readyT",0);Nt(this,"lastHud",0);this.setupRenderer(),this.setupScene(),this.setupUI()}setupRenderer(){const t=Gt("app");this.renderer=new rg({antialias:!0,powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=rc,this.renderer.toneMapping=ac,this.renderer.toneMappingExposure=1.06,this.renderer.outputColorSpace=Ie,this.renderer.domElement.id="scene-canvas",t.prepend(this.renderer.domElement),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),window.addEventListener("resize",()=>this.onResize())}setupScene(){this.pmrem=new aa(this.renderer);const t=this.pmrem.fromScene(new bg,.06).texture;this.scene.environment=t,this.scene.environmentIntensity=.4,this.world=Qg(this.scene),this.staticColliders=[...this.world.colliders,{cx:(Pt.minX+Pt.maxX)/2,cy:4,cz:Pt.minZ-.6,hx:16,hy:4,hz:.7,occlude:!0},{cx:(Pt.minX+Pt.maxX)/2,cy:4,cz:Pt.maxZ+.6,hx:16,hy:4,hz:.7,occlude:!0},{cx:Pt.minX-.6,cy:4,cz:(Pt.minZ+Pt.maxZ)/2,hx:.7,hy:4,hz:13,occlude:!0},{cx:Pt.maxX+.6,cy:4,cz:(Pt.minZ+Pt.maxZ)/2,hx:.7,hy:4,hz:13,occlude:!0}],this.vehicleColliders=this.staticColliders,this.truck=$g(),this.scene.add(this.truck.root),this.placeTruck(Ae.x,Ae.z,Ae.yaw);for(const e of Ql){const n=Kg(e.color);n.position.set(e.x,Qt.halfH,e.z),this.scene.add(n);const s=new Xe({color:new jt(Le[e.color].hex),transparent:!0,opacity:.75,side:Fe,depthWrite:!1}),i=new Ft(new _r(.78,.9,40),s);i.rotation.x=-Math.PI/2,i.position.set(e.x,.045,e.z),i.visible=!1,i.renderOrder=2,this.scene.add(i),this.crates.push({color:e.color,group:n,body:null,inWorld:!1,carried:!1,delivered:!1,stable:0,warnAt:0,ring:i,mat:s})}}initPhysics(){const t=window.Ammo;this.A=t;const e=new t.btDefaultCollisionConfiguration,n=new t.btCollisionDispatcher(e),s=new t.btDbvtBroadphase,i=new t.btSequentialImpulseConstraintSolver,a=new t.btDiscreteDynamicsWorld(n,s,i,e);a.setGravity(new t.btVector3(0,-9.82,0)),this.physics=a,this.addStatic(0,-.5,0,18,.5,15),this.addStatic(0,4,Pt.minZ-.55,17,4.5,.6),this.addStatic(0,4,Pt.maxZ+.55,17,4.5,.6),this.addStatic(Pt.minX-.55,4,0,.6,4.5,14),this.addStatic(Pt.maxX+.55,4,0,.6,4.5,14);for(const c of this.world.colliders)this.addStatic(c.cx,c.cy,c.cz,c.hx,c.hy,c.hz);for(const c of this.crates)this.createCrateBody(c);const o=new t.btBoxShape(new t.btVector3(.86,.82,1.3));o.setMargin(.02);const l=new t.btTransform;l.setIdentity(),l.setOrigin(new t.btVector3(Ae.x,.82,Ae.z));const h=new t.btDefaultMotionState(l),u=new t.btVector3(0,0,0),d=new t.btRigidBodyConstructionInfo(0,h,o,u),f=new t.btRigidBody(d);f.setCollisionFlags(2),f.setFriction(.8),f.setActivationState(4),this.physics.addRigidBody(f),this.truckBody=f,this.syncTruckBody()}addStatic(t,e,n,s,i,a){const o=this.A,l=new o.btBoxShape(new o.btVector3(s,i,a)),h=new o.btTransform;h.setIdentity(),h.setOrigin(new o.btVector3(t,e,n));const u=new o.btDefaultMotionState(h),d=new o.btVector3(0,0,0),f=new o.btRigidBodyConstructionInfo(0,u,l,d),c=new o.btRigidBody(f);return c.setFriction(.85),this.physics.addRigidBody(c),c}createCrateBody(t){const e=this.A,n=new e.btBoxShape(new e.btVector3(Qt.w/2,Qt.halfH,Qt.d/2));n.setMargin(.012);const s=new e.btTransform;s.setIdentity(),s.setOrigin(new e.btVector3(t.group.position.x,t.group.position.y,t.group.position.z));const i=new e.btDefaultMotionState(s),a=new e.btVector3(0,0,0);n.calculateLocalInertia(42,a);const o=new e.btRigidBodyConstructionInfo(42,i,n,a),l=new e.btRigidBody(o);l.setFriction(.72),l.setRestitution(.02),l.setDamping(.3,.85),l.setAngularFactor(new e.btVector3(0,1,0)),l.setSleepingThresholds(.12,.12),t.body=l,this.physics.addRigidBody(l),t.inWorld=!0}syncTruckBody(){if(!this.truckBody||!this.A)return;const t=this.A,e=new t.btTransform;e.setIdentity(),e.setOrigin(new t.btVector3(this.pos.x,.82,this.pos.z)),e.setRotation(new t.btQuaternion(0,Math.sin(this.pos.yaw/2),0,Math.cos(this.pos.yaw/2))),this.truckBody.setWorldTransform(e),this.truckBody.getMotionState().setWorldTransform(e)}setupUI(){Gt("app").insertAdjacentHTML("beforeend",`
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
        <div id="hint-strip" class="hint-strip">对准箱底 → 按 Q 升叉托起 → 运至同色区 → 按 E 降叉释放并停留 0.5 秒</div>
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
          <div class="freeze-note"><span class="freeze-dot"></span> 世界状态未改变</div>
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
    `);const t=Gt("chips");for(const e of oi){const n=document.createElement("span");n.className="chip",n.dataset.color=e.color,n.style.setProperty("--chip",Le[e.color].hex),n.innerHTML=`<i></i>${Le[e.color].zh}`,t.appendChild(n)}Gt("start-btn").addEventListener("click",()=>this.startGame()),Gt("pause-btn").addEventListener("click",()=>this.togglePause()),Gt("resume-btn").addEventListener("click",()=>this.togglePause()),Gt("restart-pause-btn").addEventListener("click",()=>this.restart()),Gt("restart-end-btn").addEventListener("click",()=>this.restart()),Gt("exit-inspect").addEventListener("click",()=>this.setInspect(null));for(const e of Array.from(document.querySelectorAll(".view-btn")))e.addEventListener("click",()=>this.setInspect(e.dataset.view));window.addEventListener("keydown",e=>this.onKeyDown(e)),window.addEventListener("keyup",e=>this.onKeyUp(e)),window.addEventListener("blur",()=>this.keys.clear()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.mode==="playing"&&this.togglePause()}),window.addEventListener("wheel",e=>{this.mode==="playing"&&(this.zoom=en.clamp(this.zoom+Math.sign(e.deltaY)*.5,5.2,11))},{passive:!0}),Gt("loading").classList.add("hidden")}onKeyDown(t){const e=t.key.toLowerCase();if([" ","arrowup","arrowdown","arrowleft","arrowright"].includes(e)&&t.preventDefault(),t.repeat){["w","s","a","d","q","e"].includes(e)&&this.keys.add(e);return}if(e==="enter"&&this.mode==="ready"){this.startGame();return}if(e==="p"){(this.mode==="playing"||this.mode==="paused")&&this.togglePause();return}if(e==="c"){this.cycleCamera();return}if(e==="r"&&(this.mode==="paused"||this.mode==="won"||this.mode==="lost")){this.restart();return}if(this.mode==="playing"){if(e===" "){t.preventDefault(),this.keys.add(" ");return}["w","s","a","d","q","e"].includes(e)&&this.keys.add(e)}}onKeyUp(t){const e=t.key.toLowerCase();this.keys.delete(e),e===" "&&this.keys.delete(" ")}startGame(){this.hideOverlays(),this.restartState(),this.mode="playing",Gt("hud").classList.remove("hidden"),this.showToast("训练开始 · 120 秒","good"),this.updateHud(!0)}restart(){this.physics&&(this.hideOverlays(),this.restartState(),this.mode="playing",Gt("hud").classList.remove("hidden"),this.showToast("已重置车辆、货箱、计时与分数","good"),this.updateHud(!0))}restartState(){this.pos={x:Ae.x,z:Ae.z,yaw:Ae.yaw},this.speed=0,this.steer=0,this.lift=0,this.carrying=null,this.timeLeft=lo,this.elapsed=0,this.score=0,this.inspect=null,this.camMode="follow",this.camInit=!1,this.zoom=7.6,this.truck.lift.position.y=0,this.placeTruck(Ae.x,Ae.z,Ae.yaw),this.syncTruckBody();for(let t=0;t<this.crates.length;t++){const e=this.crates[t],n=Ql[t];e.delivered=!1,e.carried=!1,e.stable=0,e.warnAt=0,e.ring.visible=!1,e.group.visible=!0,e.group.position.set(n.x,Qt.halfH,n.z),e.group.rotation.set(0,0,0),e.inWorld||(this.physics.addRigidBody(e.body),e.inWorld=!0),this.resetBody(e,n.x,Qt.halfH,n.z,0)}for(const t of Array.from(document.querySelectorAll(".view-btn")))t.classList.remove("active");Gt("inspect-caption").textContent="",this.keys.clear(),this.updateHud(!0)}resetBody(t,e,n,s,i){const a=this.A,o=new a.btTransform;o.setIdentity(),o.setOrigin(new a.btVector3(e,n,s)),o.setRotation(new a.btQuaternion(0,Math.sin(i/2),0,Math.cos(i/2))),t.body.setWorldTransform(o),t.body.getMotionState().setWorldTransform(o),t.body.setLinearVelocity(new a.btVector3(0,0,0)),t.body.setAngularVelocity(new a.btVector3(0,0,0)),t.body.activate()}hideOverlays(){Gt("start-overlay").classList.add("hidden"),Gt("pause-overlay").classList.add("hidden"),Gt("end-overlay").classList.add("hidden"),Gt("inspect-caption").textContent=""}togglePause(){this.mode==="playing"?(this.mode="paused",this.keys.clear(),this.inspect=null,Gt("pause-overlay").classList.remove("hidden"),this.setInspect(null)):this.mode==="paused"&&(this.mode="playing",this.inspect=null,Gt("pause-overlay").classList.add("hidden"),Gt("hud").classList.remove("hidden"))}setInspect(t){if(this.mode!=="paused")return;this.inspect=t;for(const n of Array.from(document.querySelectorAll(".view-btn")))n.classList.toggle("active",n.dataset.view===t);const e={front:"前视检查",side:"侧视检查",rear:"后视检查",iso:"斜上方检查"};Gt("inspect-caption").textContent=t?`模型检查 · ${e[t]} · 暂停中`:"模型检查已退出 · 保持暂停",Gt("exit-inspect").classList.toggle("active",!t)}cycleCamera(){this.camMode=this.camMode==="follow"?"cockpit":"follow";const t=this.camMode==="follow"?"跟随视角":"驾驶视角";Gt("cam-label").textContent=t,this.showToast(t,"info")}placeTruck(t,e,n){this.pos.x=t,this.pos.z=e,this.pos.yaw=n,this.truck.root.position.set(t,0,e),this.truck.root.rotation.y=n}start(){this.camera.position.set(Ae.x+2,5,Ae.z+8.5),this.camPos.copy(this.camera.position),this.camTarget.set(Ae.x,1.2,Ae.z),this.renderer.setAnimationLoop(()=>this.tick())}tick(){const t=Math.min(this.clock.getDelta(),.05);this.readyT+=t,this.mode==="playing"&&(this.timeLeft=Math.max(0,this.timeLeft-t),this.elapsed+=t,this.fixedStep(t),this.timeLeft<=0&&this.mode==="playing"&&this.endGame(!1)),this.animateVisuals(t),this.updateCamera(t),this.renderer.render(this.scene,this.camera),this.lastHud+=t,this.lastHud>.08&&this.mode!=="paused"&&(this.updateHud(!1),this.lastHud=0),this.toastTimer>0&&(this.toastTimer-=t,this.toastTimer<=0&&Gt("toast").classList.remove("show"))}fixedStep(t){const e=Math.min(3,Math.max(1,Math.ceil(t/.016666666666666666))),n=t/e;for(let s=0;s<e;s++)this.updateVehicle(n),this.physics.stepSimulation(n,2,1/120);this.syncCrates(),this.updateDelivery(t)}updateVehicle(t){const e=this.keys,n=e.has("w")?1:0,s=e.has("s")?1:0,i=e.has("a")?1:0,a=e.has("d")?1:0,o=e.has(" "),l=e.has("q"),h=e.has("e"),u=n-s;let d=0;u>0?d=4.3:u<0&&(d=-2.5),o&&(d=0);const f=u!==0&&!o?4.6:7.8,c=d-this.speed;this.speed+=Math.sign(c)*Math.min(Math.abs(c),f*t),o&&Math.abs(this.speed)<.05&&(this.speed=0),u===0&&!o&&(this.speed*=Math.pow(.12,t));const p=(i-a)*(.62-Math.min(Math.abs(this.speed),4)*.045);this.steer+=(p-this.steer)*Math.min(1,t*7.5),Math.abs(this.speed)>.02&&(this.pos.yaw+=this.speed/Ag*Math.tan(this.steer)*t),this.pos.x+=Math.sin(this.pos.yaw)*this.speed*t,this.pos.z+=Math.cos(this.pos.yaw)*this.speed*t,this.resolveVehicleCollisions(),this.truck.root.position.set(this.pos.x,0,this.pos.z),this.truck.root.rotation.y=this.pos.yaw,this.syncTruckBody();for(const m of this.truck.wheels)m.spin.rotation.x-=this.speed*t/m.radius,m.steer.rotation.y=m.front?0:this.steer;let v=0;if(l?v=1:h&&(v=-1),v!==0&&(this.lift=en.clamp(this.lift+v*Cg*t,0,co)),this.truck.lift.position.y=this.lift,this.carrying){const m=this.carrying,g=Math.max(this.lift+.48,.5),T=this.pos.x+Math.cos(this.pos.yaw)*this.carrySide+Math.sin(this.pos.yaw)*this.carryForward,M=this.pos.z-Math.sin(this.pos.yaw)*this.carrySide+Math.cos(this.pos.yaw)*this.carryForward;m.group.position.set(T,g,M),m.group.rotation.set(0,this.pos.yaw+this.carryYawOffset,0),this.lift<=Rg&&this.release()}else{const m=this.pickCandidate();m&&l&&this.attach(m)}}resolveVehicleCollisions(){const t=[{z:-1.05,r:.78},{z:-.1,r:.86},{z:.85,r:.8},{z:1.3,r:.5}];this.carrying&&t.push({z:2,r:.82});let e=!1;for(let n=0;n<2;n++)for(const s of t){const i=this.pos.x+Math.sin(this.pos.yaw)*s.z,a=this.pos.z+Math.cos(this.pos.yaw)*s.z;for(const o of this.vehicleColliders){const l=Math.max(o.cx-o.hx,Math.min(i,o.cx+o.hx)),h=Math.max(o.cz-o.hz,Math.min(a,o.cz+o.hz)),u=i-l,d=a-h,f=u*u+d*d;if(!(f>=s.r*s.r))if(e=!0,f<1e-7){const c=i-(o.cx-o.hx),p=o.cx+o.hx-i,v=a-(o.cz-o.hz),m=o.cz+o.hz-a,g=Math.min(c,p,v,m);g===c?this.pos.x-=g+s.r:g===p?this.pos.x+=g+s.r:g===v?this.pos.z-=g+s.r:this.pos.z+=g+s.r}else{const c=Math.sqrt(f),p=s.r-c;this.pos.x+=u/c*p,this.pos.z+=d/c*p}}}e&&(this.speed*=.72),this.pos.x=en.clamp(this.pos.x,Pt.minX+1,Pt.maxX-1),this.pos.z=en.clamp(this.pos.z,Pt.minZ+1,Pt.maxZ-1)}pickCandidate(){const t=this.lift+Ks;let e=null;for(const n of this.crates){if(n.carried||n.delivered)continue;const s=n.group.position.x-this.pos.x,i=n.group.position.z-this.pos.z,a=Math.cos(this.pos.yaw)*s-Math.sin(this.pos.yaw)*i,o=Math.sin(this.pos.yaw)*s+Math.cos(this.pos.yaw)*i;if(o<1||o>2.9||Math.abs(a)>Js.lateral)continue;let l=n.group.rotation.y-this.pos.yaw;const h=Math.PI/2;if(l=((l+h/2)%h+h)%h-h/2,Math.abs(l*180/Math.PI)>Js.angleDeg)continue;const d=n.group.position.y-Qt.halfH;if(Math.abs(t-d)>Js.height||2.36-(o-Qt.d/2)<Js.insertion)continue;const p=Math.abs(a)+Math.abs(l);(!e||p<e.score)&&(e={c:n,score:p})}return e?e.c:null}attach(t){if(this.carrying)return;const e=t.group.position.x-this.pos.x,n=t.group.position.z-this.pos.z,s=Math.cos(this.pos.yaw)*e-Math.sin(this.pos.yaw)*n,i=Math.sin(this.pos.yaw)*e+Math.cos(this.pos.yaw)*n;this.carrying=t,t.carried=!0,t.stable=0,this.carrySide=en.clamp(s,-.18,.18),this.carryForward=en.clamp(i,1.55,1.9);let a=t.group.rotation.y-this.pos.yaw;const o=Math.PI/2;a=((a+o/2)%o+o)%o-o/2,this.carryYawOffset=a,t.inWorld&&(this.physics.removeRigidBody(t.body),t.inWorld=!1),this.showToast(`${Le[t.color].zh}货箱已托起 · 运往同色交付区`,"good")}release(){const t=this.carrying;if(!t)return;this.carrying=null,t.carried=!1;const e=Math.max(t.group.position.y,Qt.halfH+.005);t.inWorld||(this.physics.addRigidBody(t.body),t.inWorld=!0),this.resetBody(t,t.group.position.x,e,t.group.position.z,t.group.rotation.y),this.showToast(`${Le[t.color].zh}货箱已释放`,"info")}syncCrates(){const t=this.A;for(const e of this.crates){if(e.carried||e.delivered||!e.inWorld)continue;const n=e.body.getWorldTransform(),s=n.getOrigin(),i=n.getRotation();let a=s.x(),o=s.y(),l=s.z();if(o<Qt.halfH){o=Qt.halfH;const u=new t.btTransform;u.setIdentity(),u.setOrigin(new t.btVector3(a,o,l)),u.setRotation(i),e.body.setWorldTransform(u),e.body.setLinearVelocity(new t.btVector3(0,0,0)),e.body.getMotionState().setWorldTransform(u)}a=en.clamp(a,Pt.minX+1,Pt.maxX-1),l=en.clamp(l,Pt.minZ+1,Pt.maxZ-1);const h=Math.atan2(2*(i.w()*i.y()+i.x()*i.z()),1-2*(i.y()*i.y()+i.z()*i.z()));e.group.position.set(a,o,l),e.group.rotation.set(0,h,0),e.ring.position.set(a,.045,l)}}crateSpeed(t){if(!t.inWorld)return 0;const e=t.body.getLinearVelocity();return Math.hypot(e.x(),e.z())}zoneOf(t){const e=Qt.w/2+.005,n=Qt.d/2+.005,s=t.group.rotation.y;for(const i of oi){let a=!0;for(const[o,l]of[[-e,-n],[e,-n],[-e,n],[e,n]]){const h=t.group.position.x+o*Math.cos(s)+l*Math.sin(s),u=t.group.position.z-o*Math.sin(s)+l*Math.cos(s);if(Math.abs(h-i.x)>i.w/2||Math.abs(u-i.z)>i.d/2){a=!1;break}}if(a)return i}return null}updateDelivery(t){for(const e of this.crates){if(e.carried||e.delivered)continue;const n=e.group.position.y-Qt.halfH,s=this.crateSpeed(e),i=this.zoneOf(e),a=n<=js.maxBottom,o=s<=js.maxSpeed,l=i&&i.color===e.color;l&&a&&o?(e.stable+=t,e.mat.opacity=.75+Math.min(.25,e.stable/js.stableSeconds*.25),e.stable>=js.stableSeconds&&this.deliver(e,i)):(e.stable=0,i&&!l&&a&&o&&this.elapsed-e.warnAt>2.5&&(e.warnAt=this.elapsed,this.showToast(`颜色不匹配：${Le[e.color].zh}货箱应放入${Le[e.color].zh}交付区`,"bad")))}}deliver(t,e){t.delivered=!0,t.stable=0,t.inWorld&&(this.physics.removeRigidBody(t.body),t.inWorld=!1),t.ring.visible=!0,t.mat.opacity=1,t.ring.position.set(t.group.position.x,.045,t.group.position.z),this.score++,this.showToast(`${Le[t.color].zh}货箱交付成功 · ${this.score} / 3`,"good");const n=document.querySelector(`.chip[data-color="${t.color}"]`);n&&n.classList.add("done"),this.updateHud(!0),this.score>=3&&this.endGame(!0)}endGame(t){if(this.mode==="won"||this.mode==="lost")return;this.mode=t?"won":"lost",this.keys.clear(),this.inspect=null,Gt("hud").classList.add("hidden"),Gt("pause-overlay").classList.add("hidden"),Gt("end-overlay").classList.remove("hidden"),Gt("end-kicker").textContent=t?"TRAINING COMPLETE · ALL CARGO DELIVERED":"TIME UP · TRAINING INCOMPLETE",Gt("end-title").textContent=t?"全部交付！":"训练超时",Gt("end-sub").textContent=t?"三只货箱全部进入同色交付区，鹈鹕学员顺利毕业。":`时间用尽，本次仅交付 ${this.score} / 3 只货箱。调整对位与路线再试一次。`,Gt("end-score").textContent=`${this.score} / 3`,Gt("end-time").textContent=_o(this.elapsed),Gt("end-left").textContent=_o(this.timeLeft);const e=Gt("end-stamps");e.innerHTML="";for(const n of oi){const s=this.crates.find(a=>a.color===n.color),i=document.createElement("div");i.className=`stamp ${s!=null&&s.delivered?"ok":"no"}`,i.innerHTML=`<i style="background:${Le[n.color].hex}"></i>${Le[n.color].zh}${s!=null&&s.delivered?"已交付":"未交付"}`,e.appendChild(i)}}animateVisuals(t){const e=this.readyT,n=this.truck.beacon.material;n.emissiveIntensity=1.7+Math.sin(e*5.5)*.9,this.truck.beacon.rotation.y+=t*3.2;const s=this.truck.pelican;s.head.rotation.x=Math.sin(e*1.7)*.025,s.head.rotation.z=Math.sin(e*.9)*.03-this.steer*.07,s.torso.rotation.z=Math.sin(e*1.4)*.012-this.steer*.035,s.torso.rotation.x=Math.sin(e*1.1)*.012+Math.min(.06,Math.abs(this.speed)*.008);for(const i of this.crates)i.ring.visible&&(i.ring.scale.setScalar(1+Math.sin(e*2.4)*.03),i.mat.opacity=.55+Math.sin(e*2.4)*.15)}updateCamera(t){const e=new P(this.pos.x,0,this.pos.z),n=new P,s=new P;if(this.mode==="ready"||this.mode==="won"||this.mode==="lost"){const i=this.readyT*.14+2.15,a=this.mode==="ready"?8.6:9.4;n.set(e.x+Math.cos(i)*a,3.5+Math.sin(this.readyT*.2)*.5,e.z+Math.sin(i)*a),s.set(e.x,1.35,e.z+.2)}else if(this.mode==="paused"&&this.inspect){const i=this.inspect==="iso"?7.2:7.8,a=this.pos.yaw,o=new P(Math.sin(a),0,Math.cos(a)),l=new P(Math.cos(a),0,-Math.sin(a));this.inspect==="front"?n.copy(e).addScaledVector(o,i).add(new P(0,2,0)):this.inspect==="rear"?n.copy(e).addScaledVector(o,-i).add(new P(0,2.2,0)):this.inspect==="side"?n.copy(e).addScaledVector(l,i).add(new P(0,2,0)):n.copy(e).addScaledVector(o,i*.72).addScaledVector(l,i*.66).add(new P(0,3.8,0)),s.set(e.x,1.15,e.z)}else if(this.camMode==="cockpit"){const i=new P(Math.sin(this.pos.yaw),0,Math.cos(this.pos.yaw));n.copy(e).addScaledVector(i,-.72).add(new P(0,2.12,0)),s.copy(e).addScaledVector(i,3.6).setY(1.1),this.camera.position.copy(n),this.camera.lookAt(s),this.camPos.copy(n),this.camTarget.copy(s);return}else{const i=new P(Math.sin(this.pos.yaw),0,Math.cos(this.pos.yaw));n.copy(e).addScaledVector(i,-this.zoom).add(new P(0,4,0)),s.copy(e).addScaledVector(i,1.1).add(new P(0,1.25,0))}if(n.x=en.clamp(n.x,Pt.minX+.8,Pt.maxX-.8),n.z=en.clamp(n.z,Pt.minZ+.8,Pt.maxZ-.8),n.y=en.clamp(n.y,1.35,Pt.wallH-.7),(this.mode==="playing"||this.mode==="ready")&&n.copy(this.avoidCamera(s,n)),!this.camInit)this.camPos.copy(n),this.camTarget.copy(s),this.camInit=!0;else{const i=1-Math.exp(-t*(this.mode==="playing"?5.2:3.4));this.camPos.lerp(n,i),this.camTarget.lerp(s,1-Math.exp(-t*6))}this.camera.position.copy(this.camPos),this.camera.lookAt(this.camTarget)}avoidCamera(t,e){const n=new P().subVectors(e,t),s=n.length();if(s<.001)return e;n.divideScalar(s);let i=1;for(const a of this.staticColliders){if(!a.occlude)continue;const o=this.segmentBox(t,n,s,a);o!==null&&o<i&&(i=o)}return i<1?t.clone().addScaledVector(n,Math.max(.9,i*s-.5)):e}segmentBox(t,e,n,s){const i=new P(s.cx-s.hx,s.cy-s.hy,s.cz-s.hz),a=new P(s.cx+s.hx,s.cy+s.hy,s.cz+s.hz);let o=0,l=n;for(const h of["x","y","z"]){const u=t[h],d=e[h],f=i[h],c=a[h];if(Math.abs(d)<1e-8){if(u<f||u>c)return null}else{let p=(f-u)/d,v=(c-u)/d;if(p>v&&([p,v]=[v,p]),o=Math.max(o,p),l=Math.min(l,v),o>l)return null}}return o>.05?o:null}updateHud(t){Gt("timer").textContent=_o(this.timeLeft);const e=this.timeLeft/lo,n=Gt("timebar-fill");n.style.transform=`scaleX(${Math.max(0,e)})`,n.style.background=e<.25?"linear-gradient(90deg,#c9463c,#e08a45)":e<.5?"linear-gradient(90deg,#d3a33a,#e3c46b)":"linear-gradient(90deg,#2f8f83,#7fcbb8)",Gt("score").textContent=`${this.score} / 3`,Gt("fork-height").textContent=`${(this.lift+Ks).toFixed(2)} m`,Gt("fork-fill").style.transform=`scaleY(${Math.max(.02,(this.lift+Ks)/(co+Ks))})`;const s=Gt("carry-text"),i=Gt("carry-dot");this.carrying?(s.textContent=`${Le[this.carrying.color].zh}货箱`,i.style.background=Le[this.carrying.color].hex,i.classList.add("loaded")):(s.textContent="空载",i.style.background="#4a5759",i.classList.remove("loaded"));const a=Gt("align-pill");if(this.carrying)a.textContent="按 E 降叉释放 · 需完全进入同色区",a.className="align-pill carry";else if(this.pickCandidate())a.textContent="已对准箱底 · 按 Q 升叉托起",a.className="align-pill ready";else{const l=this.crates.find(h=>!h.delivered&&Math.hypot(h.group.position.x-this.pos.x,h.group.position.z-this.pos.z)<4);a.textContent=l?`对准${Le[l.color].zh}货箱 · 低位插入箱底`:"对准货箱箱底",a.className="align-pill"}for(const o of oi){const l=this.crates.find(u=>u.color===o.color),h=document.querySelector(`.chip[data-color="${o.color}"]`);h&&h.classList.toggle("done",!!(l!=null&&l.delivered))}t&&(Gt("objective-text").textContent=this.score>=3?"全部交付完成":"将三个货箱送入同色交付区",Gt("cam-label").textContent=this.camMode==="follow"?"跟随视角":"驾驶视角")}showToast(t,e="info"){const n=Gt("toast");n.textContent=t,n.className=`toast show ${e}`,this.toastTimer=2.4}onResize(){const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2))}snapshot(){var t,e;return{mode:this.mode,timeLeft:+this.timeLeft.toFixed(3),elapsed:+this.elapsed.toFixed(3),score:this.score,lift:+this.lift.toFixed(3),speed:+this.speed.toFixed(3),yaw:+this.pos.yaw.toFixed(3),x:+this.pos.x.toFixed(3),z:+this.pos.z.toFixed(3),carrying:((t=this.carrying)==null?void 0:t.color)??null,camera:this.camMode,inspect:this.inspect,crates:this.crates.map(n=>{var s;return{color:n.color,x:+n.group.position.x.toFixed(3),y:+n.group.position.y.toFixed(3),z:+n.group.position.z.toFixed(3),delivered:n.delivered,carried:n.carried,stable:+n.stable.toFixed(2),zone:((s=this.zoneOf(n))==null?void 0:s.color)??null}}),render:{geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,calls:this.renderer.info.render.calls,tris:this.renderer.info.render.triangles,programs:((e=this.renderer.info.programs)==null?void 0:e.length)??null}}}debugTeleport(t,e,n){this.mode==="playing"&&(this.placeTruck(t,e,n),this.syncTruckBody(),this.speed=0)}debugSetLift(t){if(this.lift=en.clamp(t,0,co),this.truck.lift.position.y=this.lift,this.carrying){const e=this.carrying,n=Math.max(this.lift+.48,.5),s=this.pos.x+Math.cos(this.pos.yaw)*this.carrySide+Math.sin(this.pos.yaw)*this.carryForward,i=this.pos.z-Math.sin(this.pos.yaw)*this.carrySide+Math.cos(this.pos.yaw)*this.carryForward;e.group.position.set(s,n,i)}}debugPlaceCrate(t,e,n,s=Qt.halfH){const i=this.crates.find(a=>a.color===t);!i||i.carried||i.delivered||(i.inWorld||(this.physics.addRigidBody(i.body),i.inWorld=!0),this.resetBody(i,e,s,n,0),i.group.position.set(e,s,n),i.group.rotation.set(0,0,0))}}const ev=()=>{try{const r=new tv;r.initPhysics(),r.start(),window.__pelican=r}catch(r){console.error(r);const t=document.getElementById("app");t&&t.insertAdjacentHTML("beforeend",`<div class="loading" style="color:#e9b7a4;z-index:99">初始化失败：${String(r)}</div>`)}};mg("./vendor/ammo",ev);
