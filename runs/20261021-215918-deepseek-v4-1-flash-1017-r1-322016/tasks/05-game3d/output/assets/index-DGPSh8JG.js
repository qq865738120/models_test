var ah=Object.defineProperty;var lh=(r,t,e)=>t in r?ah(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var Ft=(r,t,e)=>lh(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vr="171",ch=0,Na=1,hh=2,oc=1,ac=2,Cn=3,Wn=0,Ge=1,Ue=2,Vn=0,Ui=1,Fa=2,Oa=3,Ba=4,uh=5,ii=100,fh=101,dh=102,ph=103,mh=104,gh=200,vh=201,xh=202,_h=203,Mo=204,So=205,yh=206,Mh=207,Sh=208,wh=209,Eh=210,Th=211,bh=212,Ah=213,Ch=214,wo=0,Eo=1,To=2,Oi=3,bo=4,Ao=5,Co=6,Ro=7,lc=0,Rh=1,Ph=2,Hn=0,Ih=1,Lh=2,Dh=3,cc=4,Uh=5,Nh=6,Fh=7,hc=300,Bi=301,zi=302,Po=303,Io=304,xr=306,ur=1e3,ri=1001,Lo=1002,Je=1003,Oh=1004,Es=1005,vn=1006,Rr=1007,oi=1008,Dn=1009,uc=1010,fc=1011,hs=1012,ha=1013,li=1014,xn=1015,ms=1016,ua=1017,fa=1018,ki=1020,dc=35902,pc=1021,mc=1022,mn=1023,gc=1024,vc=1025,Ni=1026,Vi=1027,da=1028,pa=1029,xc=1030,ma=1031,ga=1033,ir=33776,sr=33777,rr=33778,or=33779,Do=35840,Uo=35841,No=35842,Fo=35843,Oo=36196,Bo=37492,zo=37496,ko=37808,Vo=37809,Ho=37810,Go=37811,Wo=37812,Xo=37813,Yo=37814,qo=37815,Zo=37816,$o=37817,Ko=37818,Jo=37819,jo=37820,Qo=37821,ar=36492,ta=36494,ea=36495,_c=36283,na=36284,ia=36285,sa=36286,Bh=3200,zh=3201,yc=0,kh=1,Rn="",De="srgb",Hi="srgb-linear",fr="linear",pe="srgb",di=7680,za=519,Vh=512,Hh=513,Gh=514,Mc=515,Wh=516,Xh=517,Yh=518,qh=519,ka=35044,Va="300 es",Pn=2e3,dr=2001;class Xi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const i=s.indexOf(e);i!==-1&&s.splice(i,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let i=0,a=s.length;i<a;i++)s[i].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ha=1234567;const rs=Math.PI/180,us=180/Math.PI;function ui(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[r&255]+Oe[r>>8&255]+Oe[r>>16&255]+Oe[r>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function $t(r,t,e){return Math.max(t,Math.min(e,r))}function va(r,t){return(r%t+t)%t}function Zh(r,t,e,n,s){return n+(r-t)*(s-n)/(e-t)}function $h(r,t,e){return r!==t?(e-r)/(t-r):0}function os(r,t,e){return(1-e)*r+e*t}function Kh(r,t,e,n){return os(r,t,1-Math.exp(-e*n))}function Jh(r,t=1){return t-Math.abs(va(r,t*2)-t)}function jh(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function Qh(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function tu(r,t){return r+Math.floor(Math.random()*(t-r+1))}function eu(r,t){return r+Math.random()*(t-r)}function nu(r){return r*(.5-Math.random())}function iu(r){r!==void 0&&(Ha=r);let t=Ha+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function su(r){return r*rs}function ru(r){return r*us}function ou(r){return(r&r-1)===0&&r!==0}function au(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function lu(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function cu(r,t,e,n,s){const i=Math.cos,a=Math.sin,o=i(e/2),l=a(e/2),h=i((t+n)/2),u=a((t+n)/2),d=i((t-n)/2),f=a((t-n)/2),c=i((n-t)/2),p=a((n-t)/2);switch(s){case"XYX":r.set(o*u,l*d,l*f,o*h);break;case"YZY":r.set(l*f,o*u,l*d,o*h);break;case"ZXZ":r.set(l*d,l*f,o*u,o*h);break;case"XZX":r.set(o*u,l*p,l*c,o*h);break;case"YXY":r.set(l*c,o*u,l*p,o*h);break;case"ZYZ":r.set(l*p,l*c,o*u,o*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Pi(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ve(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const nn={DEG2RAD:rs,RAD2DEG:us,generateUUID:ui,clamp:$t,euclideanModulo:va,mapLinear:Zh,inverseLerp:$h,lerp:os,damp:Kh,pingpong:Jh,smoothstep:jh,smootherstep:Qh,randInt:tu,randFloat:eu,randFloatSpread:nu,seededRandom:iu,degToRad:su,radToDeg:ru,isPowerOfTwo:ou,ceilPowerOfTwo:au,floorPowerOfTwo:lu,setQuaternionFromProperEuler:cu,normalize:Ve,denormalize:Pi};class at{constructor(t=0,e=0){at.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),i=this.x-t.x,a=this.y-t.y;return this.x=i*n-a*s+t.x,this.y=i*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,n,s,i,a,o,l,h){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,i,a,o,l,h)}set(t,e,n,s,i,a,o,l,h){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=i,u[5]=l,u[6]=n,u[7]=a,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,i=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],u=n[4],d=n[7],f=n[2],c=n[5],p=n[8],v=s[0],m=s[3],g=s[6],b=s[1],S=s[4],x=s[7],T=s[2],_=s[5],M=s[8];return i[0]=a*v+o*b+l*T,i[3]=a*m+o*S+l*_,i[6]=a*g+o*x+l*M,i[1]=h*v+u*b+d*T,i[4]=h*m+u*S+d*_,i[7]=h*g+u*x+d*M,i[2]=f*v+c*b+p*T,i[5]=f*m+c*S+p*_,i[8]=f*g+c*x+p*M,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],i=t[3],a=t[4],o=t[5],l=t[6],h=t[7],u=t[8];return e*a*u-e*o*h-n*i*u+n*o*l+s*i*h-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],i=t[3],a=t[4],o=t[5],l=t[6],h=t[7],u=t[8],d=u*a-o*h,f=o*l-u*i,c=h*i-a*l,p=e*d+n*f+s*c;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=d*v,t[1]=(s*h-u*n)*v,t[2]=(o*n-s*a)*v,t[3]=f*v,t[4]=(u*e-s*l)*v,t[5]=(s*i-o*e)*v,t[6]=c*v,t[7]=(n*l-h*e)*v,t[8]=(a*e-n*i)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,i,a,o){const l=Math.cos(i),h=Math.sin(i);return this.set(n*l,n*h,-n*(l*a+h*o)+a+t,-s*h,s*l,-s*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Pr.makeScale(t,e)),this}rotate(t){return this.premultiply(Pr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Pr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Pr=new Zt;function Sc(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function pr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function hu(){const r=pr("canvas");return r.style.display="block",r}const Ga={};function Ii(r){r in Ga||(Ga[r]=!0,console.warn(r))}function uu(r,t,e){return new Promise(function(n,s){function i(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:s();break;case r.TIMEOUT_EXPIRED:setTimeout(i,e);break;default:n()}}setTimeout(i,e)})}function fu(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function du(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Wa=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xa=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pu(){const r={enabled:!0,workingColorSpace:Hi,spaces:{},convert:function(s,i,a){return this.enabled===!1||i===a||!i||!a||(this.spaces[i].transfer===pe&&(s.r=In(s.r),s.g=In(s.g),s.b=In(s.b)),this.spaces[i].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[i].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pe&&(s.r=Fi(s.r),s.g=Fi(s.g),s.b=Fi(s.b))),s},fromWorkingColorSpace:function(s,i){return this.convert(s,this.workingColorSpace,i)},toWorkingColorSpace:function(s,i){return this.convert(s,i,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Rn?fr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,i=this.workingColorSpace){return s.fromArray(this.spaces[i].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,i,a){return s.copy(this.spaces[i].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Hi]:{primaries:t,whitePoint:n,transfer:fr,toXYZ:Wa,fromXYZ:Xa,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:t,whitePoint:n,transfer:pe,toXYZ:Wa,fromXYZ:Xa,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:De}}}),r}const le=pu();function In(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Fi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let pi;class mu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{pi===void 0&&(pi=pr("canvas")),pi.width=t.width,pi.height=t.height;const n=pi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=pi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=pr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),i=s.data;for(let a=0;a<i.length;a++)i[a]=In(i[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(In(e[n]/255)*255):e[n]=In(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gu=0;class wc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=ui(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let i;if(Array.isArray(s)){i=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?i.push(Ir(s[a].image)):i.push(Ir(s[a]))}else i=Ir(s);n.url=i}return e||(t.images[this.uuid]=n),n}}function Ir(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?mu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vu=0;class ze extends Xi{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=ri,s=ri,i=vn,a=oi,o=mn,l=Dn,h=ze.DEFAULT_ANISOTROPY,u=Rn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=ui(),this.name="",this.source=new wc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=i,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ur:t.x=t.x-Math.floor(t.x);break;case ri:t.x=t.x<0?0:1;break;case Lo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ur:t.y=t.y-Math.floor(t.y);break;case ri:t.y=t.y<0?0:1;break;case Lo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=hc;ze.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,n=0,s=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,i=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*i,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*i,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*i,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*i,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,i;const l=t.elements,h=l[0],u=l[4],d=l[8],f=l[1],c=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+v)<.1&&Math.abs(p+m)<.1&&Math.abs(h+c+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(h+1)/2,x=(c+1)/2,T=(g+1)/2,_=(u+f)/4,M=(d+v)/4,w=(p+m)/4;return S>x&&S>T?S<.01?(n=0,s=.707106781,i=.707106781):(n=Math.sqrt(S),s=_/n,i=M/n):x>T?x<.01?(n=.707106781,s=0,i=.707106781):(s=Math.sqrt(x),n=_/s,i=w/s):T<.01?(n=.707106781,s=.707106781,i=0):(i=Math.sqrt(T),n=M/i,s=w/i),this.set(n,s,i,e),this}let b=Math.sqrt((m-p)*(m-p)+(d-v)*(d-v)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-p)/b,this.y=(d-v)/b,this.z=(f-u)/b,this.w=Math.acos((h+c+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xu extends Xi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const i=new ze(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);i.flipY=!1,i.generateMipmaps=n.generateMipmaps,i.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=i.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,i=this.textures.length;s<i;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new wc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends xu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ec extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class _u extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,i,a,o){let l=n[s+0],h=n[s+1],u=n[s+2],d=n[s+3];const f=i[a+0],c=i[a+1],p=i[a+2],v=i[a+3];if(o===0){t[e+0]=l,t[e+1]=h,t[e+2]=u,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=c,t[e+2]=p,t[e+3]=v;return}if(d!==v||l!==f||h!==c||u!==p){let m=1-o;const g=l*f+h*c+u*p+d*v,b=g>=0?1:-1,S=1-g*g;if(S>Number.EPSILON){const T=Math.sqrt(S),_=Math.atan2(T,g*b);m=Math.sin(m*_)/T,o=Math.sin(o*_)/T}const x=o*b;if(l=l*m+f*x,h=h*m+c*x,u=u*m+p*x,d=d*m+v*x,m===1-o){const T=1/Math.sqrt(l*l+h*h+u*u+d*d);l*=T,h*=T,u*=T,d*=T}}t[e]=l,t[e+1]=h,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,i,a){const o=n[s],l=n[s+1],h=n[s+2],u=n[s+3],d=i[a],f=i[a+1],c=i[a+2],p=i[a+3];return t[e]=o*p+u*d+l*c-h*f,t[e+1]=l*p+u*f+h*d-o*c,t[e+2]=h*p+u*c+o*f-l*d,t[e+3]=u*p-o*d-l*f-h*c,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,i=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(n/2),u=o(s/2),d=o(i/2),f=l(n/2),c=l(s/2),p=l(i/2);switch(a){case"XYZ":this._x=f*u*d+h*c*p,this._y=h*c*d-f*u*p,this._z=h*u*p+f*c*d,this._w=h*u*d-f*c*p;break;case"YXZ":this._x=f*u*d+h*c*p,this._y=h*c*d-f*u*p,this._z=h*u*p-f*c*d,this._w=h*u*d+f*c*p;break;case"ZXY":this._x=f*u*d-h*c*p,this._y=h*c*d+f*u*p,this._z=h*u*p+f*c*d,this._w=h*u*d-f*c*p;break;case"ZYX":this._x=f*u*d-h*c*p,this._y=h*c*d+f*u*p,this._z=h*u*p-f*c*d,this._w=h*u*d+f*c*p;break;case"YZX":this._x=f*u*d+h*c*p,this._y=h*c*d+f*u*p,this._z=h*u*p-f*c*d,this._w=h*u*d-f*c*p;break;case"XZY":this._x=f*u*d-h*c*p,this._y=h*c*d-f*u*p,this._z=h*u*p+f*c*d,this._w=h*u*d+f*c*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],i=e[8],a=e[1],o=e[5],l=e[9],h=e[2],u=e[6],d=e[10],f=n+o+d;if(f>0){const c=.5/Math.sqrt(f+1);this._w=.25/c,this._x=(u-l)*c,this._y=(i-h)*c,this._z=(a-s)*c}else if(n>o&&n>d){const c=2*Math.sqrt(1+n-o-d);this._w=(u-l)/c,this._x=.25*c,this._y=(s+a)/c,this._z=(i+h)/c}else if(o>d){const c=2*Math.sqrt(1+o-n-d);this._w=(i-h)/c,this._x=(s+a)/c,this._y=.25*c,this._z=(l+u)/c}else{const c=2*Math.sqrt(1+d-n-o);this._w=(a-s)/c,this._x=(i+h)/c,this._y=(l+u)/c,this._z=.25*c}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,i=t._z,a=t._w,o=e._x,l=e._y,h=e._z,u=e._w;return this._x=n*u+a*o+s*h-i*l,this._y=s*u+a*l+i*o-n*h,this._z=i*u+a*h+n*l-s*o,this._w=a*u-n*o-s*l-i*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,i=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+i*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=i,this;const l=1-o*o;if(l<=Number.EPSILON){const c=1-e;return this._w=c*a+e*this._w,this._x=c*n+e*this._x,this._y=c*s+e*this._y,this._z=c*i+e*this._z,this.normalize(),this}const h=Math.sqrt(l),u=Math.atan2(h,o),d=Math.sin((1-e)*u)/h,f=Math.sin(e*u)/h;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=i*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),i*Math.sin(e),i*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ya.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ya.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6]*s,this.y=i[1]*e+i[4]*n+i[7]*s,this.z=i[2]*e+i[5]*n+i[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,i=t.elements,a=1/(i[3]*e+i[7]*n+i[11]*s+i[15]);return this.x=(i[0]*e+i[4]*n+i[8]*s+i[12])*a,this.y=(i[1]*e+i[5]*n+i[9]*s+i[13])*a,this.z=(i[2]*e+i[6]*n+i[10]*s+i[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,i=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*s-o*n),u=2*(o*e-i*s),d=2*(i*n-a*e);return this.x=e+l*h+a*d-o*u,this.y=n+l*u+o*h-i*d,this.z=s+l*d+i*u-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,i=t.elements;return this.x=i[0]*e+i[4]*n+i[8]*s,this.y=i[1]*e+i[5]*n+i[9]*s,this.z=i[2]*e+i[6]*n+i[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,i=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-i*o,this.y=i*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Lr.copy(this).projectOnVector(t),this.sub(Lr)}reflect(t){return this.sub(Lr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lr=new P,Ya=new gs;class Yn{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const i=n.getAttribute("position");if(e===!0&&i!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=i.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(i,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ts.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ts.copy(n.boundingBox)),Ts.applyMatrix4(t.matrixWorld),this.union(Ts)}const s=t.children;for(let i=0,a=s.length;i<a;i++)this.expandByObject(s[i],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($i),bs.subVectors(this.max,$i),mi.subVectors(t.a,$i),gi.subVectors(t.b,$i),vi.subVectors(t.c,$i),Un.subVectors(gi,mi),Nn.subVectors(vi,gi),$n.subVectors(mi,vi);let e=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-$n.z,$n.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,$n.z,0,-$n.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-$n.y,$n.x,0];return!Dr(e,mi,gi,vi,bs)||(e=[1,0,0,0,1,0,0,0,1],!Dr(e,mi,gi,vi,bs))?!1:(As.crossVectors(Un,Nn),e=[As.x,As.y,As.z],Dr(e,mi,gi,vi,bs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const wn=[new P,new P,new P,new P,new P,new P,new P,new P],hn=new P,Ts=new Yn,mi=new P,gi=new P,vi=new P,Un=new P,Nn=new P,$n=new P,$i=new P,bs=new P,As=new P,Kn=new P;function Dr(r,t,e,n,s){for(let i=0,a=r.length-3;i<=a;i+=3){Kn.fromArray(r,i);const o=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),l=t.dot(Kn),h=e.dot(Kn),u=n.dot(Kn);if(Math.max(-Math.max(l,h,u),Math.min(l,h,u))>o)return!1}return!0}const yu=new Yn,Ki=new P,Ur=new P;class vs{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):yu.setFromPoints(t).getCenter(n);let s=0;for(let i=0,a=t.length;i<a;i++)s=Math.max(s,n.distanceToSquared(t[i]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ki.subVectors(t,this.center);const e=Ki.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ki,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ur.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ki.copy(t.center).add(Ur)),this.expandByPoint(Ki.copy(t.center).sub(Ur))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new P,Nr=new P,Cs=new P,Fn=new P,Fr=new P,Rs=new P,Or=new P;class Tc{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Nr.copy(t).add(e).multiplyScalar(.5),Cs.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(Nr);const i=t.distanceTo(e)*.5,a=-this.direction.dot(Cs),o=Fn.dot(this.direction),l=-Fn.dot(Cs),h=Fn.lengthSq(),u=Math.abs(1-a*a);let d,f,c,p;if(u>0)if(d=a*l-o,f=a*o-l,p=i*u,d>=0)if(f>=-p)if(f<=p){const v=1/u;d*=v,f*=v,c=d*(d+a*f+2*o)+f*(a*d+f+2*l)+h}else f=i,d=Math.max(0,-(a*f+o)),c=-d*d+f*(f+2*l)+h;else f=-i,d=Math.max(0,-(a*f+o)),c=-d*d+f*(f+2*l)+h;else f<=-p?(d=Math.max(0,-(-a*i+o)),f=d>0?-i:Math.min(Math.max(-i,-l),i),c=-d*d+f*(f+2*l)+h):f<=p?(d=0,f=Math.min(Math.max(-i,-l),i),c=f*(f+2*l)+h):(d=Math.max(0,-(a*i+o)),f=d>0?i:Math.min(Math.max(-i,-l),i),c=-d*d+f*(f+2*l)+h);else f=a>0?-i:i,d=Math.max(0,-(a*f+o)),c=-d*d+f*(f+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Nr).addScaledVector(Cs,f),c}intersectSphere(t,e){En.subVectors(t.center,this.origin);const n=En.dot(this.direction),s=En.dot(En)-n*n,i=t.radius*t.radius;if(s>i)return null;const a=Math.sqrt(i-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,i,a,o,l;const h=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return h>=0?(n=(t.min.x-f.x)*h,s=(t.max.x-f.x)*h):(n=(t.max.x-f.x)*h,s=(t.min.x-f.x)*h),u>=0?(i=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(i=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||i>s||((i>n||isNaN(n))&&(n=i),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,n,s,i){Fr.subVectors(e,t),Rs.subVectors(n,t),Or.crossVectors(Fr,Rs);let a=this.direction.dot(Or),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,t);const l=o*this.direction.dot(Rs.crossVectors(Fn,Rs));if(l<0)return null;const h=o*this.direction.dot(Fr.cross(Fn));if(h<0||l+h>a)return null;const u=-o*Fn.dot(Or);return u<0?null:this.at(u/a,i)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(t,e,n,s,i,a,o,l,h,u,d,f,c,p,v,m){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,i,a,o,l,h,u,d,f,c,p,v,m)}set(t,e,n,s,i,a,o,l,h,u,d,f,c,p,v,m){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=i,g[5]=a,g[9]=o,g[13]=l,g[2]=h,g[6]=u,g[10]=d,g[14]=f,g[3]=c,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/xi.setFromMatrixColumn(t,0).length(),i=1/xi.setFromMatrixColumn(t,1).length(),a=1/xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*i,e[5]=n[5]*i,e[6]=n[6]*i,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,i=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),h=Math.sin(s),u=Math.cos(i),d=Math.sin(i);if(t.order==="XYZ"){const f=a*u,c=a*d,p=o*u,v=o*d;e[0]=l*u,e[4]=-l*d,e[8]=h,e[1]=c+p*h,e[5]=f-v*h,e[9]=-o*l,e[2]=v-f*h,e[6]=p+c*h,e[10]=a*l}else if(t.order==="YXZ"){const f=l*u,c=l*d,p=h*u,v=h*d;e[0]=f+v*o,e[4]=p*o-c,e[8]=a*h,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=c*o-p,e[6]=v+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*u,c=l*d,p=h*u,v=h*d;e[0]=f-v*o,e[4]=-a*d,e[8]=p+c*o,e[1]=c+p*o,e[5]=a*u,e[9]=v-f*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*u,c=a*d,p=o*u,v=o*d;e[0]=l*u,e[4]=p*h-c,e[8]=f*h+v,e[1]=l*d,e[5]=v*h+f,e[9]=c*h-p,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,c=a*h,p=o*l,v=o*h;e[0]=l*u,e[4]=v-f*d,e[8]=p*d+c,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-h*u,e[6]=c*d+p,e[10]=f-v*d}else if(t.order==="XZY"){const f=a*l,c=a*h,p=o*l,v=o*h;e[0]=l*u,e[4]=-d,e[8]=h*u,e[1]=f*d+v,e[5]=a*u,e[9]=c*d-p,e[2]=p*d-c,e[6]=o*u,e[10]=v*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Mu,t,Su)}lookAt(t,e,n){const s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),On.crossVectors(n,Ze),On.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),On.crossVectors(n,Ze)),On.normalize(),Ps.crossVectors(Ze,On),s[0]=On.x,s[4]=Ps.x,s[8]=Ze.x,s[1]=On.y,s[5]=Ps.y,s[9]=Ze.y,s[2]=On.z,s[6]=Ps.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,i=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],u=n[1],d=n[5],f=n[9],c=n[13],p=n[2],v=n[6],m=n[10],g=n[14],b=n[3],S=n[7],x=n[11],T=n[15],_=s[0],M=s[4],w=s[8],y=s[12],E=s[1],A=s[5],U=s[9],L=s[13],F=s[2],V=s[6],O=s[10],Z=s[14],G=s[3],it=s[7],ot=s[11],et=s[15];return i[0]=a*_+o*E+l*F+h*G,i[4]=a*M+o*A+l*V+h*it,i[8]=a*w+o*U+l*O+h*ot,i[12]=a*y+o*L+l*Z+h*et,i[1]=u*_+d*E+f*F+c*G,i[5]=u*M+d*A+f*V+c*it,i[9]=u*w+d*U+f*O+c*ot,i[13]=u*y+d*L+f*Z+c*et,i[2]=p*_+v*E+m*F+g*G,i[6]=p*M+v*A+m*V+g*it,i[10]=p*w+v*U+m*O+g*ot,i[14]=p*y+v*L+m*Z+g*et,i[3]=b*_+S*E+x*F+T*G,i[7]=b*M+S*A+x*V+T*it,i[11]=b*w+S*U+x*O+T*ot,i[15]=b*y+S*L+x*Z+T*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],i=t[12],a=t[1],o=t[5],l=t[9],h=t[13],u=t[2],d=t[6],f=t[10],c=t[14],p=t[3],v=t[7],m=t[11],g=t[15];return p*(+i*l*d-s*h*d-i*o*f+n*h*f+s*o*c-n*l*c)+v*(+e*l*c-e*h*f+i*a*f-s*a*c+s*h*u-i*l*u)+m*(+e*h*d-e*o*c-i*a*d+n*a*c+i*o*u-n*h*u)+g*(-s*o*u-e*l*d+e*o*f+s*a*d-n*a*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],i=t[3],a=t[4],o=t[5],l=t[6],h=t[7],u=t[8],d=t[9],f=t[10],c=t[11],p=t[12],v=t[13],m=t[14],g=t[15],b=d*m*h-v*f*h+v*l*c-o*m*c-d*l*g+o*f*g,S=p*f*h-u*m*h-p*l*c+a*m*c+u*l*g-a*f*g,x=u*v*h-p*d*h+p*o*c-a*v*c-u*o*g+a*d*g,T=p*d*l-u*v*l-p*o*f+a*v*f+u*o*m-a*d*m,_=e*b+n*S+s*x+i*T;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/_;return t[0]=b*M,t[1]=(v*f*i-d*m*i-v*s*c+n*m*c+d*s*g-n*f*g)*M,t[2]=(o*m*i-v*l*i+v*s*h-n*m*h-o*s*g+n*l*g)*M,t[3]=(d*l*i-o*f*i-d*s*h+n*f*h+o*s*c-n*l*c)*M,t[4]=S*M,t[5]=(u*m*i-p*f*i+p*s*c-e*m*c-u*s*g+e*f*g)*M,t[6]=(p*l*i-a*m*i-p*s*h+e*m*h+a*s*g-e*l*g)*M,t[7]=(a*f*i-u*l*i+u*s*h-e*f*h-a*s*c+e*l*c)*M,t[8]=x*M,t[9]=(p*d*i-u*v*i-p*n*c+e*v*c+u*n*g-e*d*g)*M,t[10]=(a*v*i-p*o*i+p*n*h-e*v*h-a*n*g+e*o*g)*M,t[11]=(u*o*i-a*d*i-u*n*h+e*d*h+a*n*c-e*o*c)*M,t[12]=T*M,t[13]=(u*v*s-p*d*s+p*n*f-e*v*f-u*n*m+e*d*m)*M,t[14]=(p*o*s-a*v*s-p*n*l+e*v*l+a*n*m-e*o*m)*M,t[15]=(a*d*s-u*o*s+u*n*l-e*d*l-a*n*f+e*o*f)*M,this}scale(t){const e=this.elements,n=t.x,s=t.y,i=t.z;return e[0]*=n,e[4]*=s,e[8]*=i,e[1]*=n,e[5]*=s,e[9]*=i,e[2]*=n,e[6]*=s,e[10]*=i,e[3]*=n,e[7]*=s,e[11]*=i,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),i=1-n,a=t.x,o=t.y,l=t.z,h=i*a,u=i*o;return this.set(h*a+n,h*o-s*l,h*l+s*o,0,h*o+s*l,u*o+n,u*l-s*a,0,h*l-s*o,u*l+s*a,i*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,i,a){return this.set(1,n,i,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,i=e._x,a=e._y,o=e._z,l=e._w,h=i+i,u=a+a,d=o+o,f=i*h,c=i*u,p=i*d,v=a*u,m=a*d,g=o*d,b=l*h,S=l*u,x=l*d,T=n.x,_=n.y,M=n.z;return s[0]=(1-(v+g))*T,s[1]=(c+x)*T,s[2]=(p-S)*T,s[3]=0,s[4]=(c-x)*_,s[5]=(1-(f+g))*_,s[6]=(m+b)*_,s[7]=0,s[8]=(p+S)*M,s[9]=(m-b)*M,s[10]=(1-(f+v))*M,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let i=xi.set(s[0],s[1],s[2]).length();const a=xi.set(s[4],s[5],s[6]).length(),o=xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(i=-i),t.x=s[12],t.y=s[13],t.z=s[14],un.copy(this);const h=1/i,u=1/a,d=1/o;return un.elements[0]*=h,un.elements[1]*=h,un.elements[2]*=h,un.elements[4]*=u,un.elements[5]*=u,un.elements[6]*=u,un.elements[8]*=d,un.elements[9]*=d,un.elements[10]*=d,e.setFromRotationMatrix(un),n.x=i,n.y=a,n.z=o,this}makePerspective(t,e,n,s,i,a,o=Pn){const l=this.elements,h=2*i/(e-t),u=2*i/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let c,p;if(o===Pn)c=-(a+i)/(a-i),p=-2*a*i/(a-i);else if(o===dr)c=-a/(a-i),p=-a*i/(a-i);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=c,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,i,a,o=Pn){const l=this.elements,h=1/(e-t),u=1/(n-s),d=1/(a-i),f=(e+t)*h,c=(n+s)*u;let p,v;if(o===Pn)p=(a+i)*d,v=-2*d;else if(o===dr)p=i*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-c,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const xi=new P,un=new Qt,Mu=new P(0,0,0),Su=new P(1,1,1),On=new P,Ps=new P,Ze=new P,qa=new Qt,Za=new gs;class yn{constructor(t=0,e=0,n=0,s=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,i=s[0],a=s[4],o=s[8],l=s[1],h=s[5],u=s[9],d=s[2],f=s[6],c=s[10];switch(e){case"XYZ":this._y=Math.asin($t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,c),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,c),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,i),this._z=0);break;case"ZXY":this._x=Math.asin($t(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,c),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,i));break;case"ZYX":this._y=Math.asin(-$t(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,c),this._z=Math.atan2(l,i)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin($t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,i)):(this._x=0,this._y=Math.atan2(o,c));break;case"XZY":this._z=Math.asin(-$t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-u,c),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Za.setFromEuler(this),this.setFromQuaternion(Za,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class xa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let wu=0;const $a=new P,_i=new gs,Tn=new Qt,Is=new P,Ji=new P,Eu=new P,Tu=new gs,Ka=new P(1,0,0),Ja=new P(0,1,0),ja=new P(0,0,1),Qa={type:"added"},bu={type:"removed"},yi={type:"childadded",child:null},Br={type:"childremoved",child:null};class Re extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Re.DEFAULT_UP.clone();const t=new P,e=new yn,n=new gs,s=new P(1,1,1);function i(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(i),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Zt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=Re.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.multiply(_i),this}rotateOnWorldAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.premultiply(_i),this}rotateX(t){return this.rotateOnAxis(Ka,t)}rotateY(t){return this.rotateOnAxis(Ja,t)}rotateZ(t){return this.rotateOnAxis(ja,t)}translateOnAxis(t,e){return $a.copy(t).applyQuaternion(this.quaternion),this.position.add($a.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ka,t)}translateY(t){return this.translateOnAxis(Ja,t)}translateZ(t){return this.translateOnAxis(ja,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Is.copy(t):Is.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(Ji,Is,this.up):Tn.lookAt(Is,Ji,this.up),this.quaternion.setFromRotationMatrix(Tn),s&&(Tn.extractRotation(s.matrixWorld),_i.setFromRotationMatrix(Tn),this.quaternion.premultiply(_i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qa),yi.child=t,this.dispatchEvent(yi),yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(bu),Br.child=t,this.dispatchEvent(Br),Br.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Tn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Tn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qa),yi.child=t,this.dispatchEvent(yi),yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let i=0,a=s.length;i<a;i++)s[i].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ji,t,Eu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ji,Tu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let i=0,a=s.length;i<a;i++)s[i].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function i(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=i(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,u=l.length;h<u;h++){const d=l[h];i(t.shapes,d)}else i(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(i(t.materials,this.material[l]));s.material=o}else s.material=i(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(i(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),u=a(t.images),d=a(t.shapes),f=a(t.skeletons),c=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),c.length>0&&(n.animations=c),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){const l=[];for(const h in o){const u=o[h];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Re.DEFAULT_UP=new P(0,1,0);Re.DEFAULT_MATRIX_AUTO_UPDATE=!0;Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new P,bn=new P,zr=new P,An=new P,Mi=new P,Si=new P,tl=new P,kr=new P,Vr=new P,Hr=new P,Gr=new me,Wr=new me,Xr=new me;class on{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),fn.subVectors(t,e),s.cross(fn);const i=s.lengthSq();return i>0?s.multiplyScalar(1/Math.sqrt(i)):s.set(0,0,0)}static getBarycoord(t,e,n,s,i){fn.subVectors(s,e),bn.subVectors(n,e),zr.subVectors(t,e);const a=fn.dot(fn),o=fn.dot(bn),l=fn.dot(zr),h=bn.dot(bn),u=bn.dot(zr),d=a*h-o*o;if(d===0)return i.set(0,0,0),null;const f=1/d,c=(h*l-o*u)*f,p=(a*u-o*l)*f;return i.set(1-c-p,p,c)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,n,s,i,a,o,l){return this.getBarycoord(t,e,n,s,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(i,An.x),l.addScaledVector(a,An.y),l.addScaledVector(o,An.z),l)}static getInterpolatedAttribute(t,e,n,s,i,a){return Gr.setScalar(0),Wr.setScalar(0),Xr.setScalar(0),Gr.fromBufferAttribute(t,e),Wr.fromBufferAttribute(t,n),Xr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Gr,i.x),a.addScaledVector(Wr,i.y),a.addScaledVector(Xr,i.z),a}static isFrontFacing(t,e,n,s){return fn.subVectors(n,e),bn.subVectors(t,e),fn.cross(bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fn.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),fn.cross(bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return on.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return on.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,i){return on.getInterpolation(t,this.a,this.b,this.c,e,n,s,i)}containsPoint(t){return on.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return on.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,i=this.c;let a,o;Mi.subVectors(s,n),Si.subVectors(i,n),kr.subVectors(t,n);const l=Mi.dot(kr),h=Si.dot(kr);if(l<=0&&h<=0)return e.copy(n);Vr.subVectors(t,s);const u=Mi.dot(Vr),d=Si.dot(Vr);if(u>=0&&d<=u)return e.copy(s);const f=l*d-u*h;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(Mi,a);Hr.subVectors(t,i);const c=Mi.dot(Hr),p=Si.dot(Hr);if(p>=0&&c<=p)return e.copy(i);const v=c*h-l*p;if(v<=0&&h>=0&&p<=0)return o=h/(h-p),e.copy(n).addScaledVector(Si,o);const m=u*p-c*d;if(m<=0&&d-u>=0&&c-p>=0)return tl.subVectors(i,s),o=(d-u)/(d-u+(c-p)),e.copy(s).addScaledVector(tl,o);const g=1/(m+v+f);return a=v*g,o=f*g,e.copy(n).addScaledVector(Mi,a).addScaledVector(Si,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bn={h:0,s:0,l:0},Ls={h:0,s:0,l:0};function Yr(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class jt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=le.workingColorSpace){if(t=va(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const i=n<=.5?n*(1+e):n+e-n*e,a=2*n-i;this.r=Yr(a,i,t+1/3),this.g=Yr(a,i,t),this.b=Yr(a,i,t-1/3)}return le.toWorkingColorSpace(this,s),this}setStyle(t,e=De){function n(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let i;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,e);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,e);break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const i=s[1],a=i.length;if(a===3)return this.setRGB(parseInt(i.charAt(0),16)/15,parseInt(i.charAt(1),16)/15,parseInt(i.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(i,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){const n=bc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=Fi(t.r),this.g=Fi(t.g),this.b=Fi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return le.fromWorkingColorSpace(Be.copy(this),t),Math.round($t(Be.r*255,0,255))*65536+Math.round($t(Be.g*255,0,255))*256+Math.round($t(Be.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(Be.copy(this),e);const n=Be.r,s=Be.g,i=Be.b,a=Math.max(n,s,i),o=Math.min(n,s,i);let l,h;const u=(o+a)/2;if(o===a)l=0,h=0;else{const d=a-o;switch(h=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-i)/d+(s<i?6:0);break;case s:l=(i-n)/d+2;break;case i:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=h,t.l=u,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=De){le.fromWorkingColorSpace(Be.copy(this),t);const e=Be.r,n=Be.g,s=Be.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Bn),this.setHSL(Bn.h+t,Bn.s+e,Bn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Bn),t.getHSL(Ls);const n=os(Bn.h,Ls.h,e),s=os(Bn.s,Ls.s,e),i=os(Bn.l,Ls.l,e);return this.setHSL(n,s,i),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,i=t.elements;return this.r=i[0]*e+i[3]*n+i[6]*s,this.g=i[1]*e+i[4]*n+i[7]*s,this.b=i[2]*e+i[5]*n+i[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new jt;jt.NAMES=bc;let Au=0;class xs extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=Ui,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mo,this.blendDst=So,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Mo&&(n.blendSrc=this.blendSrc),this.blendDst!==So&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(i){const a=[];for(const o in i){const l=i[o];delete l.metadata,a.push(l)}return a}if(e){const i=s(t.textures),a=s(t.images);i.length>0&&(n.textures=i),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let i=0;i!==s;++i)n[i]=e[i].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Xe extends xs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new P,Ds=new at;class Ye{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ka,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,i=this.itemSize;s<i;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ds.fromBufferAttribute(this,e),Ds.applyMatrix3(t),this.setXY(e,Ds.x,Ds.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ve(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),s=Ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,i){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),s=Ve(s,this.array),i=Ve(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=i,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ka&&(t.usage=this.usage),t}}class Ac extends Ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Cc extends Ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ce extends Ye{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Cu=0;const sn=new Qt,qr=new Re,wi=new P,$e=new Yn,ji=new Yn,Ae=new P;class Ne extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sc(t)?Cc:Ac)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const i=new Zt().getNormalMatrix(t);n.applyNormalMatrix(i),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return qr.lookAt(t),qr.updateMatrix(),this.applyMatrix4(qr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,i=t.length;s<i;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ce(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const i=t[s];e.setXYZ(s,i.x,i.y,i.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const i=e[n];$e.setFromBufferAttribute(i),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let i=0,a=e.length;i<a;i++){const o=e[i];ji.setFromBufferAttribute(o),this.morphTargetsRelative?(Ae.addVectors($e.min,ji.min),$e.expandByPoint(Ae),Ae.addVectors($e.max,ji.max),$e.expandByPoint(Ae)):($e.expandByPoint(ji.min),$e.expandByPoint(ji.max))}$e.getCenter(n);let s=0;for(let i=0,a=t.count;i<a;i++)Ae.fromBufferAttribute(t,i),s=Math.max(s,n.distanceToSquared(Ae));if(e)for(let i=0,a=e.length;i<a;i++){const o=e[i],l=this.morphTargetsRelative;for(let h=0,u=o.count;h<u;h++)Ae.fromBufferAttribute(o,h),l&&(wi.fromBufferAttribute(t,h),Ae.add(wi)),s=Math.max(s,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,i=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let w=0;w<n.count;w++)o[w]=new P,l[w]=new P;const h=new P,u=new P,d=new P,f=new at,c=new at,p=new at,v=new P,m=new P;function g(w,y,E){h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,E),f.fromBufferAttribute(i,w),c.fromBufferAttribute(i,y),p.fromBufferAttribute(i,E),u.sub(h),d.sub(h),c.sub(f),p.sub(f);const A=1/(c.x*p.y-p.x*c.y);isFinite(A)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(d,-c.y).multiplyScalar(A),m.copy(d).multiplyScalar(c.x).addScaledVector(u,-p.x).multiplyScalar(A),o[w].add(v),o[y].add(v),o[E].add(v),l[w].add(m),l[y].add(m),l[E].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let w=0,y=b.length;w<y;++w){const E=b[w],A=E.start,U=E.count;for(let L=A,F=A+U;L<F;L+=3)g(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const S=new P,x=new P,T=new P,_=new P;function M(w){T.fromBufferAttribute(s,w),_.copy(T);const y=o[w];S.copy(y),S.sub(T.multiplyScalar(T.dot(y))).normalize(),x.crossVectors(_,y);const A=x.dot(l[w])<0?-1:1;a.setXYZW(w,S.x,S.y,S.z,A)}for(let w=0,y=b.length;w<y;++w){const E=b[w],A=E.start,U=E.count;for(let L=A,F=A+U;L<F;L+=3)M(t.getX(L+0)),M(t.getX(L+1)),M(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,c=n.count;f<c;f++)n.setXYZ(f,0,0,0);const s=new P,i=new P,a=new P,o=new P,l=new P,h=new P,u=new P,d=new P;if(t)for(let f=0,c=t.count;f<c;f+=3){const p=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,p),i.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),u.subVectors(a,i),d.subVectors(s,i),u.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,m),o.add(u),l.add(u),h.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,c=e.count;f<c;f+=3)s.fromBufferAttribute(e,f+0),i.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,i),d.subVectors(s,i),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(o,l){const h=o.array,u=o.itemSize,d=o.normalized,f=new h.constructor(l.length*u);let c=0,p=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?c=l[v]*o.data.stride+o.offset:c=l[v]*u;for(let g=0;g<u;g++)f[p++]=h[c++]}return new Ye(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ne,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],h=t(l,n);e.setAttribute(o,h)}const i=this.morphAttributes;for(const o in i){const l=[],h=i[o];for(let u=0,d=h.length;u<d;u++){const f=h[u],c=t(f,n);l.push(c)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const s={};let i=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],u=[];for(let d=0,f=h.length;d<f;d++){const c=h[d];u.push(c.toJSON(t.data))}u.length>0&&(s[l]=u,i=!0)}i&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const h in s){const u=s[h];this.setAttribute(h,u.clone(e))}const i=t.morphAttributes;for(const h in i){const u=[],d=i[h];for(let f=0,c=d.length;f<c;f++)u.push(d[f].clone(e));this.morphAttributes[h]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,u=a.length;h<u;h++){const d=a[h];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const el=new Qt,Jn=new Tc,Us=new vs,nl=new P,Ns=new P,Fs=new P,Os=new P,Zr=new P,Bs=new P,il=new P,zs=new P;class Nt extends Re{constructor(t=new Ne,e=new Xe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,a=s.length;i<a;i++){const o=s[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=i}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(i&&o){Bs.set(0,0,0);for(let l=0,h=i.length;l<h;l++){const u=o[l],d=i[l];u!==0&&(Zr.fromBufferAttribute(d,t),a?Bs.addScaledVector(Zr,u):Bs.addScaledVector(Zr.sub(e),u))}e.add(Bs)}return e}raycast(t,e){const n=this.geometry,s=this.material,i=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(i),Jn.copy(t.ray).recast(t.near),!(Us.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere(Us,nl)===null||Jn.origin.distanceToSquared(nl)>(t.far-t.near)**2))&&(el.copy(i).invert(),Jn.copy(t.ray).applyMatrix4(el),!(n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Jn)))}_computeIntersections(t,e,n){let s;const i=this.geometry,a=this.material,o=i.index,l=i.attributes.position,h=i.attributes.uv,u=i.attributes.uv1,d=i.attributes.normal,f=i.groups,c=i.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=a[m.materialIndex],b=Math.max(m.start,c.start),S=Math.min(o.count,Math.min(m.start+m.count,c.start+c.count));for(let x=b,T=S;x<T;x+=3){const _=o.getX(x),M=o.getX(x+1),w=o.getX(x+2);s=ks(this,g,t,n,h,u,d,_,M,w),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,c.start),v=Math.min(o.count,c.start+c.count);for(let m=p,g=v;m<g;m+=3){const b=o.getX(m),S=o.getX(m+1),x=o.getX(m+2);s=ks(this,a,t,n,h,u,d,b,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=a[m.materialIndex],b=Math.max(m.start,c.start),S=Math.min(l.count,Math.min(m.start+m.count,c.start+c.count));for(let x=b,T=S;x<T;x+=3){const _=x,M=x+1,w=x+2;s=ks(this,g,t,n,h,u,d,_,M,w),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,c.start),v=Math.min(l.count,c.start+c.count);for(let m=p,g=v;m<g;m+=3){const b=m,S=m+1,x=m+2;s=ks(this,a,t,n,h,u,d,b,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Ru(r,t,e,n,s,i,a,o){let l;if(t.side===Ge?l=n.intersectTriangle(a,i,s,!0,o):l=n.intersectTriangle(s,i,a,t.side===Wn,o),l===null)return null;zs.copy(o),zs.applyMatrix4(r.matrixWorld);const h=e.ray.origin.distanceTo(zs);return h<e.near||h>e.far?null:{distance:h,point:zs.clone(),object:r}}function ks(r,t,e,n,s,i,a,o,l,h){r.getVertexPosition(o,Ns),r.getVertexPosition(l,Fs),r.getVertexPosition(h,Os);const u=Ru(r,t,e,n,Ns,Fs,Os,il);if(u){const d=new P;on.getBarycoord(il,Ns,Fs,Os,d),s&&(u.uv=on.getInterpolatedAttribute(s,o,l,h,d,new at)),i&&(u.uv1=on.getInterpolatedAttribute(i,o,l,h,d,new at)),a&&(u.normal=on.getInterpolatedAttribute(a,o,l,h,d,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c:h,normal:new P,materialIndex:0};on.getNormal(Ns,Fs,Os,f.normal),u.face=f,u.barycoord=d}return u}class an extends Ne{constructor(t=1,e=1,n=1,s=1,i=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:i,depthSegments:a};const o=this;s=Math.floor(s),i=Math.floor(i),a=Math.floor(a);const l=[],h=[],u=[],d=[];let f=0,c=0;p("z","y","x",-1,-1,n,e,t,a,i,0),p("z","y","x",1,-1,n,e,-t,a,i,1),p("x","z","y",1,1,t,n,e,s,a,2),p("x","z","y",1,-1,t,n,-e,s,a,3),p("x","y","z",1,-1,t,e,n,s,i,4),p("x","y","z",-1,-1,t,e,-n,s,i,5),this.setIndex(l),this.setAttribute("position",new ce(h,3)),this.setAttribute("normal",new ce(u,3)),this.setAttribute("uv",new ce(d,2));function p(v,m,g,b,S,x,T,_,M,w,y){const E=x/M,A=T/w,U=x/2,L=T/2,F=_/2,V=M+1,O=w+1;let Z=0,G=0;const it=new P;for(let ot=0;ot<O;ot++){const et=ot*A-L;for(let St=0;St<V;St++){const Dt=St*E-U;it[v]=Dt*b,it[m]=et*S,it[g]=F,h.push(it.x,it.y,it.z),it[v]=0,it[m]=0,it[g]=_>0?1:-1,u.push(it.x,it.y,it.z),d.push(St/M),d.push(1-ot/w),Z+=1}}for(let ot=0;ot<w;ot++)for(let et=0;et<M;et++){const St=f+et+V*ot,Dt=f+et+V*(ot+1),N=f+(et+1)+V*(ot+1),X=f+(et+1)+V*ot;l.push(St,Dt,X),l.push(Dt,N,X),G+=6}o.addGroup(c,G,y),c+=G,f+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new an(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Gi(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const s=r[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function He(r){const t={};for(let e=0;e<r.length;e++){const n=Gi(r[e]);for(const s in n)t[s]=n[s]}return t}function Pu(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Rc(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}const Iu={clone:Gi,merge:He};var Lu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Du=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends xs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lu,this.fragmentShader=Du,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gi(t.uniforms),this.uniformsGroups=Pu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Pc extends Re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=Pn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new P,sl=new at,rl=new at;class Ke extends Pc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=us*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(rs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return us*2*Math.atan(Math.tan(rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zn.x,zn.y).multiplyScalar(-t/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-t/zn.z)}getViewSize(t,e){return this.getViewBounds(t,sl,rl),e.subVectors(rl,sl)}setViewOffset(t,e,n,s,i,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(rs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,i=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;i+=a.offsetX*s/l,e-=a.offsetY*n/h,s*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(i+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ei=-90,Ti=1;class Uu extends Re{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ke(Ei,Ti,t,e);s.layers=this.layers,this.add(s);const i=new Ke(Ei,Ti,t,e);i.layers=this.layers,this.add(i);const a=new Ke(Ei,Ti,t,e);a.layers=this.layers,this.add(a);const o=new Ke(Ei,Ti,t,e);o.layers=this.layers,this.add(o);const l=new Ke(Ei,Ti,t,e);l.layers=this.layers,this.add(l);const h=new Ke(Ei,Ti,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,i,a,o,l]=e;for(const h of e)this.remove(h);if(t===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===dr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[i,a,o,l,h,u]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),c=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,i),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,h),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(d,f,c),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Ic extends ze{constructor(t,e,n,s,i,a,o,l,h,u){t=t!==void 0?t:[],e=e!==void 0?e:Bi,super(t,e,n,s,i,a,o,l,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nu extends ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ic(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:vn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new an(5,5,5),i=new Xn({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:Vn});i.uniforms.tEquirect.value=e;const a=new Nt(s,i),o=e.minFilter;return e.minFilter===oi&&(e.minFilter=vn),new Uu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const i=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(i)}}class _a{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new jt(t),this.density=e}clone(){return new _a(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Lc extends Re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Fu extends ze{constructor(t=null,e=1,n=1,s,i,a,o,l,h=Je,u=Je,d,f){super(null,a,o,l,h,u,s,i,d,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ol extends Ye{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const bi=new Qt,al=new Qt,Vs=[],ll=new Yn,Ou=new Qt,Qi=new Nt,ts=new vs;class Bu extends Nt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ol(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ou)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Yn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bi),ll.copy(t.boundingBox).applyMatrix4(bi),this.boundingBox.union(ll)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new vs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bi),ts.copy(t.boundingSphere).applyMatrix4(bi),this.boundingSphere.union(ts)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,i=n.length+1,a=t*i+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Qi.geometry=this.geometry,Qi.material=this.material,Qi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ts.copy(this.boundingSphere),ts.applyMatrix4(n),t.ray.intersectsSphere(ts)!==!1))for(let i=0;i<s;i++){this.getMatrixAt(i,bi),al.multiplyMatrices(n,bi),Qi.matrixWorld=al,Qi.raycast(t,Vs);for(let a=0,o=Vs.length;a<o;a++){const l=Vs[a];l.instanceId=i,l.object=this,e.push(l)}Vs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ol(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Fu(new Float32Array(s*this.count),s,this.count,da,xn));const i=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;i[l]=o,i.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const $r=new P,zu=new P,ku=new Zt;class pn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=$r.subVectors(n,e).cross(zu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta($r),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const i=-(t.start.dot(this.normal)+this.constant)/s;return i<0||i>1?null:e.copy(t.start).addScaledVector(n,i)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ku.getNormalMatrix(t),s=this.coplanarPoint($r).applyMatrix4(t),i=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(i),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new vs,Hs=new P;class ya{constructor(t=new pn,e=new pn,n=new pn,s=new pn,i=new pn,a=new pn){this.planes=[t,e,n,s,i,a]}set(t,e,n,s,i,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(i),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Pn){const n=this.planes,s=t.elements,i=s[0],a=s[1],o=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],c=s[8],p=s[9],v=s[10],m=s[11],g=s[12],b=s[13],S=s[14],x=s[15];if(n[0].setComponents(l-i,f-h,m-c,x-g).normalize(),n[1].setComponents(l+i,f+h,m+c,x+g).normalize(),n[2].setComponents(l+a,f+u,m+p,x+b).normalize(),n[3].setComponents(l-a,f-u,m-p,x-b).normalize(),n[4].setComponents(l-o,f-d,m-v,x-S).normalize(),e===Pn)n[5].setComponents(l+o,f+d,m+v,x+S).normalize();else if(e===dr)n[5].setComponents(o,d,v,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(t){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let i=0;i<6;i++)if(e[i].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Hs.x=s.normal.x>0?t.max.x:t.min.x,Hs.y=s.normal.y>0?t.max.y:t.min.y,Hs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Hs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class de extends Re{constructor(){super(),this.isGroup=!0,this.type="Group"}}class _r extends ze{constructor(t,e,n,s,i,a,o,l,h){super(t,e,n,s,i,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dc extends ze{constructor(t,e,n,s,i,a,o,l,h,u=Ni){if(u!==Ni&&u!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ni&&(n=li),n===void 0&&u===Vi&&(n=ki),super(null,s,i,a,o,l,u,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Je,this.minFilter=l!==void 0?l:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),i=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),i+=n.distanceTo(s),e.push(i),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const i=n.length;let a;e?a=e:a=t*n[i-1];let o=0,l=i-1,h;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),h=n[s]-a,h<0)o=s+1;else if(h>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(i-1);const u=n[s],f=n[s+1]-u,c=(a-u)/f;return(s+c)/(i-1)}getTangent(t,e){let s=t-1e-4,i=t+1e-4;s<0&&(s=0),i>1&&(i=1);const a=this.getPoint(s),o=this.getPoint(i),l=e||(a.isVector2?new at:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,s=[],i=[],a=[],o=new P,l=new Qt;for(let c=0;c<=t;c++){const p=c/t;s[c]=this.getTangentAt(p,new P)}i[0]=new P,a[0]=new P;let h=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=h&&(h=u,n.set(1,0,0)),d<=h&&(h=d,n.set(0,1,0)),f<=h&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),i[0].crossVectors(s[0],o),a[0].crossVectors(s[0],i[0]);for(let c=1;c<=t;c++){if(i[c]=i[c-1].clone(),a[c]=a[c-1].clone(),o.crossVectors(s[c-1],s[c]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos($t(s[c-1].dot(s[c]),-1,1));i[c].applyMatrix4(l.makeRotationAxis(o,p))}a[c].crossVectors(s[c],i[c])}if(e===!0){let c=Math.acos($t(i[0].dot(i[t]),-1,1));c/=t,s[0].dot(o.crossVectors(i[0],i[t]))>0&&(c=-c);for(let p=1;p<=t;p++)i[p].applyMatrix4(l.makeRotationAxis(s[p],c*p)),a[p].crossVectors(s[p],i[p])}return{tangents:s,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ma extends Mn{constructor(t=0,e=0,n=1,s=1,i=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new at){const n=e,s=Math.PI*2;let i=this.aEndAngle-this.aStartAngle;const a=Math.abs(i)<Number.EPSILON;for(;i<0;)i+=s;for(;i>s;)i-=s;i<Number.EPSILON&&(a?i=0:i=s),this.aClockwise===!0&&!a&&(i===s?i=-s:i=i-s);const o=this.aStartAngle+t*i;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,c=h-this.aY;l=f*u-c*d+this.aX,h=f*d+c*u+this.aY}return n.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Vu extends Ma{constructor(t,e,n,s,i,a){super(t,e,n,n,s,i,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Sa(){let r=0,t=0,e=0,n=0;function s(i,a,o,l){r=i,t=o,e=-3*i+3*a-2*o-l,n=2*i-2*a+o+l}return{initCatmullRom:function(i,a,o,l,h){s(a,o,h*(o-i),h*(l-a))},initNonuniformCatmullRom:function(i,a,o,l,h,u,d){let f=(a-i)/h-(o-i)/(h+u)+(o-a)/u,c=(o-a)/u-(l-a)/(u+d)+(l-o)/d;f*=u,c*=u,s(a,o,f,c)},calc:function(i){const a=i*i,o=a*i;return r+t*i+e*a+n*o}}}const Gs=new P,Kr=new Sa,Jr=new Sa,jr=new Sa;class wa extends Mn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){const n=e,s=this.points,i=s.length,a=(i-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:l===0&&o===i-1&&(o=i-2,l=1);let h,u;this.closed||o>0?h=s[(o-1)%i]:(Gs.subVectors(s[0],s[1]).add(s[0]),h=Gs);const d=s[o%i],f=s[(o+1)%i];if(this.closed||o+2<i?u=s[(o+2)%i]:(Gs.subVectors(s[i-1],s[i-2]).add(s[i-1]),u=Gs),this.curveType==="centripetal"||this.curveType==="chordal"){const c=this.curveType==="chordal"?.5:.25;let p=Math.pow(h.distanceToSquared(d),c),v=Math.pow(d.distanceToSquared(f),c),m=Math.pow(f.distanceToSquared(u),c);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),Kr.initNonuniformCatmullRom(h.x,d.x,f.x,u.x,p,v,m),Jr.initNonuniformCatmullRom(h.y,d.y,f.y,u.y,p,v,m),jr.initNonuniformCatmullRom(h.z,d.z,f.z,u.z,p,v,m)}else this.curveType==="catmullrom"&&(Kr.initCatmullRom(h.x,d.x,f.x,u.x,this.tension),Jr.initCatmullRom(h.y,d.y,f.y,u.y,this.tension),jr.initCatmullRom(h.z,d.z,f.z,u.z,this.tension));return n.set(Kr.calc(l),Jr.calc(l),jr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function cl(r,t,e,n,s){const i=(n-t)*.5,a=(s-e)*.5,o=r*r,l=r*o;return(2*e-2*n+i+a)*l+(-3*e+3*n-2*i-a)*o+i*r+e}function Hu(r,t){const e=1-r;return e*e*t}function Gu(r,t){return 2*(1-r)*r*t}function Wu(r,t){return r*r*t}function as(r,t,e,n){return Hu(r,t)+Gu(r,e)+Wu(r,n)}function Xu(r,t){const e=1-r;return e*e*e*t}function Yu(r,t){const e=1-r;return 3*e*e*r*t}function qu(r,t){return 3*(1-r)*r*r*t}function Zu(r,t){return r*r*r*t}function ls(r,t,e,n,s){return Xu(r,t)+Yu(r,e)+qu(r,n)+Zu(r,s)}class Uc extends Mn{constructor(t=new at,e=new at,n=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new at){const n=e,s=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ls(t,s.x,i.x,a.x,o.x),ls(t,s.y,i.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $u extends Mn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){const n=e,s=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(ls(t,s.x,i.x,a.x,o.x),ls(t,s.y,i.y,a.y,o.y),ls(t,s.z,i.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Nc extends Mn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ku extends Mn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fc extends Mn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){const n=e,s=this.v0,i=this.v1,a=this.v2;return n.set(as(t,s.x,i.x,a.x),as(t,s.y,i.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Oc extends Mn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,s=this.v0,i=this.v1,a=this.v2;return n.set(as(t,s.x,i.x,a.x),as(t,s.y,i.y,a.y),as(t,s.z,i.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bc extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){const n=e,s=this.points,i=(s.length-1)*t,a=Math.floor(i),o=i-a,l=s[a===0?a:a-1],h=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(cl(o,l.x,h.x,u.x,d.x),cl(o,l.y,h.y,u.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new at().fromArray(s))}return this}}var mr=Object.freeze({__proto__:null,ArcCurve:Vu,CatmullRomCurve3:wa,CubicBezierCurve:Uc,CubicBezierCurve3:$u,EllipseCurve:Ma,LineCurve:Nc,LineCurve3:Ku,QuadraticBezierCurve:Fc,QuadraticBezierCurve3:Oc,SplineCurve:Bc});class Ju extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new mr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let i=0;for(;i<s.length;){if(s[i]>=n){const a=s[i]-n,o=this.curves[i],l=o.getLength(),h=l===0?0:1-a/l;return o.getPointAt(h,e)}i++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,i=this.curves;s<i.length;s++){const a=i[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let h=0;h<l.length;h++){const u=l[h];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new mr[s.type]().fromJSON(s))}return this}}class hl extends Ju{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Nc(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const i=new Fc(this.currentPoint.clone(),new at(t,e),new at(n,s));return this.curves.push(i),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,i,a){const o=new Uc(this.currentPoint.clone(),new at(t,e),new at(n,s),new at(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Bc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,i,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,i,a),this}absarc(t,e,n,s,i,a){return this.absellipse(t,e,n,n,s,i,a),this}ellipse(t,e,n,s,i,a,o,l){const h=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+h,e+u,n,s,i,a,o,l),this}absellipse(t,e,n,s,i,a,o,l){const h=new Ma(t,e,n,s,i,a,o,l);if(this.curves.length>0){const d=h.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(h);const u=h.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ea extends Ne{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=$t(s,0,Math.PI*2);const i=[],a=[],o=[],l=[],h=[],u=1/e,d=new P,f=new at,c=new P,p=new P,v=new P;let m=0,g=0;for(let b=0;b<=t.length-1;b++)switch(b){case 0:m=t[b+1].x-t[b].x,g=t[b+1].y-t[b].y,c.x=g*1,c.y=-m,c.z=g*0,v.copy(c),c.normalize(),l.push(c.x,c.y,c.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[b+1].x-t[b].x,g=t[b+1].y-t[b].y,c.x=g*1,c.y=-m,c.z=g*0,p.copy(c),c.x+=v.x,c.y+=v.y,c.z+=v.z,c.normalize(),l.push(c.x,c.y,c.z),v.copy(p)}for(let b=0;b<=e;b++){const S=n+b*u*s,x=Math.sin(S),T=Math.cos(S);for(let _=0;_<=t.length-1;_++){d.x=t[_].x*x,d.y=t[_].y,d.z=t[_].x*T,a.push(d.x,d.y,d.z),f.x=b/e,f.y=_/(t.length-1),o.push(f.x,f.y);const M=l[3*_+0]*x,w=l[3*_+1],y=l[3*_+0]*T;h.push(M,w,y)}}for(let b=0;b<e;b++)for(let S=0;S<t.length-1;S++){const x=S+b*t.length,T=x,_=x+t.length,M=x+t.length+1,w=x+1;i.push(T,_,w),i.push(M,w,_)}this.setIndex(i),this.setAttribute("position",new ce(a,3)),this.setAttribute("uv",new ce(o,2)),this.setAttribute("normal",new ce(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ea(t.points,t.segments,t.phiStart,t.phiLength)}}class _n extends Ne{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const i=[],a=[],o=[],l=[],h=new P,u=new at;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){const c=n+d/e*s;h.x=t*Math.cos(c),h.y=t*Math.sin(c),a.push(h.x,h.y,h.z),o.push(0,0,1),u.x=(a[f]/t+1)/2,u.y=(a[f+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)i.push(d,d+1,0);this.setIndex(i),this.setAttribute("position",new ce(a,3)),this.setAttribute("normal",new ce(o,3)),this.setAttribute("uv",new ce(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _n(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ee extends Ne{constructor(t=1,e=1,n=1,s=32,i=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:l};const h=this;s=Math.floor(s),i=Math.floor(i);const u=[],d=[],f=[],c=[];let p=0;const v=[],m=n/2;let g=0;b(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new ce(d,3)),this.setAttribute("normal",new ce(f,3)),this.setAttribute("uv",new ce(c,2));function b(){const x=new P,T=new P;let _=0;const M=(e-t)/n;for(let w=0;w<=i;w++){const y=[],E=w/i,A=E*(e-t)+t;for(let U=0;U<=s;U++){const L=U/s,F=L*l+o,V=Math.sin(F),O=Math.cos(F);T.x=A*V,T.y=-E*n+m,T.z=A*O,d.push(T.x,T.y,T.z),x.set(V,M,O).normalize(),f.push(x.x,x.y,x.z),c.push(L,1-E),y.push(p++)}v.push(y)}for(let w=0;w<s;w++)for(let y=0;y<i;y++){const E=v[y][w],A=v[y+1][w],U=v[y+1][w+1],L=v[y][w+1];(t>0||y!==0)&&(u.push(E,A,L),_+=3),(e>0||y!==i-1)&&(u.push(A,U,L),_+=3)}h.addGroup(g,_,0),g+=_}function S(x){const T=p,_=new at,M=new P;let w=0;const y=x===!0?t:e,E=x===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,m*E,0),f.push(0,E,0),c.push(.5,.5),p++;const A=p;for(let U=0;U<=s;U++){const F=U/s*l+o,V=Math.cos(F),O=Math.sin(F);M.x=y*O,M.y=m*E,M.z=y*V,d.push(M.x,M.y,M.z),f.push(0,E,0),_.x=V*.5+.5,_.y=O*.5*E+.5,c.push(_.x,_.y),p++}for(let U=0;U<s;U++){const L=T+U,F=A+U;x===!0?u.push(F,F+1,L):u.push(F+1,F,L),w+=3}h.addGroup(g,w,x===!0?1:2),g+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ee(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yr extends ee{constructor(t=1,e=1,n=32,s=1,i=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,i,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new yr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _s extends hl{constructor(t){super(t),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new hl().fromJSON(s))}return this}}const ju={triangulate:function(r,t,e=2){const n=t&&t.length,s=n?t[0]*e:r.length;let i=zc(r,0,s,e,!0);const a=[];if(!i||i.next===i.prev)return a;let o,l,h,u,d,f,c;if(n&&(i=sf(r,t,i,e)),r.length>80*e){o=h=r[0],l=u=r[1];for(let p=e;p<s;p+=e)d=r[p],f=r[p+1],d<o&&(o=d),f<l&&(l=f),d>h&&(h=d),f>u&&(u=f);c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return fs(i,a,e,o,l,c,0),a}};function zc(r,t,e,n,s){let i,a;if(s===mf(r,t,e,n)>0)for(i=t;i<e;i+=n)a=ul(i,r[i],r[i+1],a);else for(i=e-n;i>=t;i-=n)a=ul(i,r[i],r[i+1],a);return a&&Mr(a,a.next)&&(ps(a),a=a.next),a}function hi(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Mr(e,e.next)||_e(e.prev,e,e.next)===0)){if(ps(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function fs(r,t,e,n,s,i,a){if(!r)return;!a&&i&&cf(r,n,s,i);let o=r,l,h;for(;r.prev!==r.next;){if(l=r.prev,h=r.next,i?tf(r,n,s,i):Qu(r)){t.push(l.i/e|0),t.push(r.i/e|0),t.push(h.i/e|0),ps(r),r=h.next,o=h.next;continue}if(r=h,r===o){a?a===1?(r=ef(hi(r),t,e),fs(r,t,e,n,s,i,2)):a===2&&nf(r,t,e,n,s,i):fs(hi(r),t,e,n,s,i,1);break}}}function Qu(r){const t=r.prev,e=r,n=r.next;if(_e(t,e,n)>=0)return!1;const s=t.x,i=e.x,a=n.x,o=t.y,l=e.y,h=n.y,u=s<i?s<a?s:a:i<a?i:a,d=o<l?o<h?o:h:l<h?l:h,f=s>i?s>a?s:a:i>a?i:a,c=o>l?o>h?o:h:l>h?l:h;let p=n.next;for(;p!==t;){if(p.x>=u&&p.x<=f&&p.y>=d&&p.y<=c&&Li(s,o,i,l,a,h,p.x,p.y)&&_e(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function tf(r,t,e,n){const s=r.prev,i=r,a=r.next;if(_e(s,i,a)>=0)return!1;const o=s.x,l=i.x,h=a.x,u=s.y,d=i.y,f=a.y,c=o<l?o<h?o:h:l<h?l:h,p=u<d?u<f?u:f:d<f?d:f,v=o>l?o>h?o:h:l>h?l:h,m=u>d?u>f?u:f:d>f?d:f,g=ra(c,p,t,e,n),b=ra(v,m,t,e,n);let S=r.prevZ,x=r.nextZ;for(;S&&S.z>=g&&x&&x.z<=b;){if(S.x>=c&&S.x<=v&&S.y>=p&&S.y<=m&&S!==s&&S!==a&&Li(o,u,l,d,h,f,S.x,S.y)&&_e(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=c&&x.x<=v&&x.y>=p&&x.y<=m&&x!==s&&x!==a&&Li(o,u,l,d,h,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=g;){if(S.x>=c&&S.x<=v&&S.y>=p&&S.y<=m&&S!==s&&S!==a&&Li(o,u,l,d,h,f,S.x,S.y)&&_e(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=b;){if(x.x>=c&&x.x<=v&&x.y>=p&&x.y<=m&&x!==s&&x!==a&&Li(o,u,l,d,h,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function ef(r,t,e){let n=r;do{const s=n.prev,i=n.next.next;!Mr(s,i)&&kc(s,n,n.next,i)&&ds(s,i)&&ds(i,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(i.i/e|0),ps(n),ps(n.next),n=r=i),n=n.next}while(n!==r);return hi(n)}function nf(r,t,e,n,s,i){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ff(a,o)){let l=Vc(a,o);a=hi(a,a.next),l=hi(l,l.next),fs(a,t,e,n,s,i,0),fs(l,t,e,n,s,i,0);return}o=o.next}a=a.next}while(a!==r)}function sf(r,t,e,n){const s=[];let i,a,o,l,h;for(i=0,a=t.length;i<a;i++)o=t[i]*n,l=i<a-1?t[i+1]*n:r.length,h=zc(r,o,l,n,!1),h===h.next&&(h.steiner=!0),s.push(uf(h));for(s.sort(rf),i=0;i<s.length;i++)e=of(s[i],e);return e}function rf(r,t){return r.x-t.x}function of(r,t){const e=af(r,t);if(!e)return t;const n=Vc(e,r);return hi(n,n.next),hi(e,e.next)}function af(r,t){let e=t,n=-1/0,s;const i=r.x,a=r.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=i&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===i))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,l=s.x,h=s.y;let u=1/0,d;e=s;do i>=e.x&&e.x>=l&&i!==e.x&&Li(a<h?i:n,a,l,h,a<h?n:i,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(i-e.x),ds(e,r)&&(d<u||d===u&&(e.x>s.x||e.x===s.x&&lf(s,e)))&&(s=e,u=d)),e=e.next;while(e!==o);return s}function lf(r,t){return _e(r.prev,r,t.prev)<0&&_e(t.next,r,r.next)<0}function cf(r,t,e,n){let s=r;do s.z===0&&(s.z=ra(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==r);s.prevZ.nextZ=null,s.prevZ=null,hf(s)}function hf(r){let t,e,n,s,i,a,o,l,h=1;do{for(e=r,r=null,i=null,a=0;e;){for(a++,n=e,o=0,t=0;t<h&&(o++,n=n.nextZ,!!n);t++);for(l=h;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),i?i.nextZ=s:r=s,s.prevZ=i,i=s;e=n}i.nextZ=null,h*=2}while(a>1);return r}function ra(r,t,e,n,s){return r=(r-e)*s|0,t=(t-n)*s|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function uf(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Li(r,t,e,n,s,i,a,o){return(s-a)*(t-o)>=(r-a)*(i-o)&&(r-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(i-o)>=(s-a)*(n-o)}function ff(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!df(r,t)&&(ds(r,t)&&ds(t,r)&&pf(r,t)&&(_e(r.prev,r,t.prev)||_e(r,t.prev,t))||Mr(r,t)&&_e(r.prev,r,r.next)>0&&_e(t.prev,t,t.next)>0)}function _e(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Mr(r,t){return r.x===t.x&&r.y===t.y}function kc(r,t,e,n){const s=Xs(_e(r,t,e)),i=Xs(_e(r,t,n)),a=Xs(_e(e,n,r)),o=Xs(_e(e,n,t));return!!(s!==i&&a!==o||s===0&&Ws(r,e,t)||i===0&&Ws(r,n,t)||a===0&&Ws(e,r,n)||o===0&&Ws(e,t,n))}function Ws(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function Xs(r){return r>0?1:r<0?-1:0}function df(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&kc(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function ds(r,t){return _e(r.prev,r,r.next)<0?_e(r,t,r.next)>=0&&_e(r,r.prev,t)>=0:_e(r,t,r.prev)<0||_e(r,r.next,t)<0}function pf(r,t){let e=r,n=!1;const s=(r.x+t.x)/2,i=(r.y+t.y)/2;do e.y>i!=e.next.y>i&&e.next.y!==e.y&&s<(e.next.x-e.x)*(i-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Vc(r,t){const e=new oa(r.i,r.x,r.y),n=new oa(t.i,t.x,t.y),s=r.next,i=t.prev;return r.next=t,t.prev=r,e.next=s,s.prev=e,n.next=e,e.prev=n,i.next=n,n.prev=i,n}function ul(r,t,e,n){const s=new oa(r,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ps(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function oa(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function mf(r,t,e,n){let s=0;for(let i=t,a=e-n;i<e;i+=n)s+=(r[a]-r[i])*(r[i+1]+r[a+1]),a=i;return s}class cs{static area(t){const e=t.length;let n=0;for(let s=e-1,i=0;i<e;s=i++)n+=t[s].x*t[i].y-t[i].x*t[s].y;return n*.5}static isClockWise(t){return cs.area(t)<0}static triangulateShape(t,e){const n=[],s=[],i=[];fl(t),dl(n,t);let a=t.length;e.forEach(fl);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,dl(n,e[l]);const o=ju.triangulate(n,s);for(let l=0;l<o.length;l+=3)i.push(o.slice(l,l+3));return i}}function fl(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function dl(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class Yi extends Ne{constructor(t=new _s([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],i=[];for(let o=0,l=t.length;o<l;o++){const h=t[o];a(h)}this.setAttribute("position",new ce(s,3)),this.setAttribute("uv",new ce(i,2)),this.computeVertexNormals();function a(o){const l=[],h=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,c=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:c-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const g=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:gf;let S,x=!1,T,_,M,w;g&&(S=g.getSpacedPoints(u),x=!0,f=!1,T=g.computeFrenetFrames(u,!1),_=new P,M=new P,w=new P),f||(m=0,c=0,p=0,v=0);const y=o.extractPoints(h);let E=y.shape;const A=y.holes;if(!cs.isClockWise(E)){E=E.reverse();for(let Q=0,lt=A.length;Q<lt;Q++){const D=A[Q];cs.isClockWise(D)&&(A[Q]=D.reverse())}}const L=cs.triangulateShape(E,A),F=E;for(let Q=0,lt=A.length;Q<lt;Q++){const D=A[Q];E=E.concat(D)}function V(Q,lt,D){return lt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(lt,D)}const O=E.length,Z=L.length;function G(Q,lt,D){let Ut,ct,Et;const ft=Q.x-lt.x,kt=Q.y-lt.y,yt=D.x-Q.x,I=D.y-Q.y,C=ft*ft+kt*kt,W=ft*I-kt*yt;if(Math.abs(W)>Number.EPSILON){const J=Math.sqrt(C),st=Math.sqrt(yt*yt+I*I),j=lt.x-kt/J,Lt=lt.y+ft/J,gt=D.x-I/st,wt=D.y+yt/st,ne=((gt-j)*I-(wt-Lt)*yt)/(ft*I-kt*yt);Ut=j+ft*ne-Q.x,ct=Lt+kt*ne-Q.y;const ut=Ut*Ut+ct*ct;if(ut<=2)return new at(Ut,ct);Et=Math.sqrt(ut/2)}else{let J=!1;ft>Number.EPSILON?yt>Number.EPSILON&&(J=!0):ft<-Number.EPSILON?yt<-Number.EPSILON&&(J=!0):Math.sign(kt)===Math.sign(I)&&(J=!0),J?(Ut=-kt,ct=ft,Et=Math.sqrt(C)):(Ut=ft,ct=kt,Et=Math.sqrt(C/2))}return new at(Ut/Et,ct/Et)}const it=[];for(let Q=0,lt=F.length,D=lt-1,Ut=Q+1;Q<lt;Q++,D++,Ut++)D===lt&&(D=0),Ut===lt&&(Ut=0),it[Q]=G(F[Q],F[D],F[Ut]);const ot=[];let et,St=it.concat();for(let Q=0,lt=A.length;Q<lt;Q++){const D=A[Q];et=[];for(let Ut=0,ct=D.length,Et=ct-1,ft=Ut+1;Ut<ct;Ut++,Et++,ft++)Et===ct&&(Et=0),ft===ct&&(ft=0),et[Ut]=G(D[Ut],D[Et],D[ft]);ot.push(et),St=St.concat(et)}for(let Q=0;Q<m;Q++){const lt=Q/m,D=c*Math.cos(lt*Math.PI/2),Ut=p*Math.sin(lt*Math.PI/2)+v;for(let ct=0,Et=F.length;ct<Et;ct++){const ft=V(F[ct],it[ct],Ut);K(ft.x,ft.y,-D)}for(let ct=0,Et=A.length;ct<Et;ct++){const ft=A[ct];et=ot[ct];for(let kt=0,yt=ft.length;kt<yt;kt++){const I=V(ft[kt],et[kt],Ut);K(I.x,I.y,-D)}}}const Dt=p+v;for(let Q=0;Q<O;Q++){const lt=f?V(E[Q],St[Q],Dt):E[Q];x?(M.copy(T.normals[0]).multiplyScalar(lt.x),_.copy(T.binormals[0]).multiplyScalar(lt.y),w.copy(S[0]).add(M).add(_),K(w.x,w.y,w.z)):K(lt.x,lt.y,0)}for(let Q=1;Q<=u;Q++)for(let lt=0;lt<O;lt++){const D=f?V(E[lt],St[lt],Dt):E[lt];x?(M.copy(T.normals[Q]).multiplyScalar(D.x),_.copy(T.binormals[Q]).multiplyScalar(D.y),w.copy(S[Q]).add(M).add(_),K(w.x,w.y,w.z)):K(D.x,D.y,d/u*Q)}for(let Q=m-1;Q>=0;Q--){const lt=Q/m,D=c*Math.cos(lt*Math.PI/2),Ut=p*Math.sin(lt*Math.PI/2)+v;for(let ct=0,Et=F.length;ct<Et;ct++){const ft=V(F[ct],it[ct],Ut);K(ft.x,ft.y,d+D)}for(let ct=0,Et=A.length;ct<Et;ct++){const ft=A[ct];et=ot[ct];for(let kt=0,yt=ft.length;kt<yt;kt++){const I=V(ft[kt],et[kt],Ut);x?K(I.x,I.y+S[u-1].y,S[u-1].x+D):K(I.x,I.y,d+D)}}}N(),X();function N(){const Q=s.length/3;if(f){let lt=0,D=O*lt;for(let Ut=0;Ut<Z;Ut++){const ct=L[Ut];pt(ct[2]+D,ct[1]+D,ct[0]+D)}lt=u+m*2,D=O*lt;for(let Ut=0;Ut<Z;Ut++){const ct=L[Ut];pt(ct[0]+D,ct[1]+D,ct[2]+D)}}else{for(let lt=0;lt<Z;lt++){const D=L[lt];pt(D[2],D[1],D[0])}for(let lt=0;lt<Z;lt++){const D=L[lt];pt(D[0]+O*u,D[1]+O*u,D[2]+O*u)}}n.addGroup(Q,s.length/3-Q,0)}function X(){const Q=s.length/3;let lt=0;tt(F,lt),lt+=F.length;for(let D=0,Ut=A.length;D<Ut;D++){const ct=A[D];tt(ct,lt),lt+=ct.length}n.addGroup(Q,s.length/3-Q,1)}function tt(Q,lt){let D=Q.length;for(;--D>=0;){const Ut=D;let ct=D-1;ct<0&&(ct=Q.length-1);for(let Et=0,ft=u+m*2;Et<ft;Et++){const kt=O*Et,yt=O*(Et+1),I=lt+Ut+kt,C=lt+ct+kt,W=lt+ct+yt,J=lt+Ut+yt;It(I,C,W,J)}}}function K(Q,lt,D){l.push(Q),l.push(lt),l.push(D)}function pt(Q,lt,D){bt(Q),bt(lt),bt(D);const Ut=s.length/3,ct=b.generateTopUV(n,s,Ut-3,Ut-2,Ut-1);Wt(ct[0]),Wt(ct[1]),Wt(ct[2])}function It(Q,lt,D,Ut){bt(Q),bt(lt),bt(Ut),bt(lt),bt(D),bt(Ut);const ct=s.length/3,Et=b.generateSideWallUV(n,s,ct-6,ct-3,ct-2,ct-1);Wt(Et[0]),Wt(Et[1]),Wt(Et[3]),Wt(Et[1]),Wt(Et[2]),Wt(Et[3])}function bt(Q){s.push(l[Q*3+0]),s.push(l[Q*3+1]),s.push(l[Q*3+2])}function Wt(Q){i.push(Q.x),i.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return vf(e,n,t)}static fromJSON(t,e){const n=[];for(let i=0,a=t.shapes.length;i<a;i++){const o=e[t.shapes[i]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new mr[s.type]().fromJSON(s)),new Yi(n,t.options)}}const gf={generateTopUV:function(r,t,e,n,s){const i=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],h=t[s*3],u=t[s*3+1];return[new at(i,a),new at(o,l),new at(h,u)]},generateSideWallUV:function(r,t,e,n,s,i){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],h=t[n*3],u=t[n*3+1],d=t[n*3+2],f=t[s*3],c=t[s*3+1],p=t[s*3+2],v=t[i*3],m=t[i*3+1],g=t[i*3+2];return Math.abs(o-u)<Math.abs(a-h)?[new at(a,1-l),new at(h,1-d),new at(f,1-p),new at(v,1-g)]:[new at(o,1-l),new at(u,1-d),new at(c,1-p),new at(m,1-g)]}};function vf(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,s=r.length;n<s;n++){const i=r[n];e.shapes.push(i.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ve extends Ne{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const i=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),h=o+1,u=l+1,d=t/o,f=e/l,c=[],p=[],v=[],m=[];for(let g=0;g<u;g++){const b=g*f-a;for(let S=0;S<h;S++){const x=S*d-i;p.push(x,-b,0),v.push(0,0,1),m.push(S/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let b=0;b<o;b++){const S=b+h*g,x=b+h*(g+1),T=b+1+h*(g+1),_=b+1+h*g;c.push(S,x,_),c.push(x,T,_)}this.setIndex(c),this.setAttribute("position",new ce(p,3)),this.setAttribute("normal",new ce(v,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ve(t.width,t.height,t.widthSegments,t.heightSegments)}}class Sr extends Ne{constructor(t=.5,e=1,n=32,s=1,i=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:i,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],h=[],u=[];let d=t;const f=(e-t)/s,c=new P,p=new at;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const g=i+m/n*a;c.x=d*Math.cos(g),c.y=d*Math.sin(g),l.push(c.x,c.y,c.z),h.push(0,0,1),p.x=(c.x/e+1)/2,p.y=(c.y/e+1)/2,u.push(p.x,p.y)}d+=f}for(let v=0;v<s;v++){const m=v*(n+1);for(let g=0;g<n;g++){const b=g+m,S=b,x=b+n+1,T=b+n+2,_=b+1;o.push(S,x,_),o.push(x,T,_)}}this.setIndex(o),this.setAttribute("position",new ce(l,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ee extends Ne{constructor(t=1,e=32,n=16,s=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:i,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let h=0;const u=[],d=new P,f=new P,c=[],p=[],v=[],m=[];for(let g=0;g<=n;g++){const b=[],S=g/n;let x=0;g===0&&a===0?x=.5/e:g===n&&l===Math.PI&&(x=-.5/e);for(let T=0;T<=e;T++){const _=T/e;d.x=-t*Math.cos(s+_*i)*Math.sin(a+S*o),d.y=t*Math.cos(a+S*o),d.z=t*Math.sin(s+_*i)*Math.sin(a+S*o),p.push(d.x,d.y,d.z),f.copy(d).normalize(),v.push(f.x,f.y,f.z),m.push(_+x,1-S),b.push(h++)}u.push(b)}for(let g=0;g<n;g++)for(let b=0;b<e;b++){const S=u[g][b+1],x=u[g][b],T=u[g+1][b],_=u[g+1][b+1];(g!==0||a>0)&&c.push(S,x,_),(g!==n-1||l<Math.PI)&&c.push(x,T,_)}this.setIndex(c),this.setAttribute("position",new ce(p,3)),this.setAttribute("normal",new ce(v,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ee(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Gn extends Ne{constructor(t=1,e=.4,n=12,s=48,i=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:i},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],h=[],u=new P,d=new P,f=new P;for(let c=0;c<=n;c++)for(let p=0;p<=s;p++){const v=p/s*i,m=c/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(v),d.y=(t+e*Math.cos(m))*Math.sin(v),d.z=e*Math.sin(m),o.push(d.x,d.y,d.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),h.push(p/s),h.push(c/n)}for(let c=1;c<=n;c++)for(let p=1;p<=s;p++){const v=(s+1)*c+p-1,m=(s+1)*(c-1)+p-1,g=(s+1)*(c-1)+p,b=(s+1)*c+p;a.push(v,m,b),a.push(m,g,b)}this.setIndex(a),this.setAttribute("position",new ce(o,3)),this.setAttribute("normal",new ce(l,3)),this.setAttribute("uv",new ce(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class wr extends Ne{constructor(t=new Oc(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,s=8,i=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:i};const a=t.computeFrenetFrames(e,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,l=new P,h=new at;let u=new P;const d=[],f=[],c=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new ce(d,3)),this.setAttribute("normal",new ce(f,3)),this.setAttribute("uv",new ce(c,2));function v(){for(let S=0;S<e;S++)m(S);m(i===!1?e:0),b(),g()}function m(S){u=t.getPointAt(S/e,u);const x=a.normals[S],T=a.binormals[S];for(let _=0;_<=s;_++){const M=_/s*Math.PI*2,w=Math.sin(M),y=-Math.cos(M);l.x=y*x.x+w*T.x,l.y=y*x.y+w*T.y,l.z=y*x.z+w*T.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,d.push(o.x,o.y,o.z)}}function g(){for(let S=1;S<=e;S++)for(let x=1;x<=s;x++){const T=(s+1)*(S-1)+(x-1),_=(s+1)*S+(x-1),M=(s+1)*S+x,w=(s+1)*(S-1)+x;p.push(T,_,w),p.push(_,M,w)}}function b(){for(let S=0;S<=e;S++)for(let x=0;x<=s;x++)h.x=S/e,h.y=x/s,c.push(h.x,h.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new wr(new mr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class re extends xs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yc,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Hc extends re{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new at(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return $t(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new jt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new jt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new jt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class xf extends xs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class _f extends xs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ta extends Re{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class yf extends Ta{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.groundColor=new jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Qr=new Qt,pl=new P,ml=new P;class Gc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ya,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;pl.setFromMatrixPosition(t.matrixWorld),e.position.copy(pl),ml.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ml),e.updateMatrixWorld(),Qr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Qr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const gl=new Qt,es=new P,to=new P;class Mf extends Gc{constructor(){super(new Ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new at(4,2),this._viewportCount=6,this._viewports=[new me(2,1,1,1),new me(0,1,1,1),new me(3,1,1,1),new me(1,1,1,1),new me(3,0,1,1),new me(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,i=t.distance||n.far;i!==n.far&&(n.far=i,n.updateProjectionMatrix()),es.setFromMatrixPosition(t.matrixWorld),n.position.copy(es),to.copy(n.position),to.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(to),n.updateMatrixWorld(),s.makeTranslation(-es.x,-es.y,-es.z),gl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gl)}}class gr extends Ta{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Mf}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Wc extends Pc{constructor(t=-1,e=1,n=1,s=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let i=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=h*this.view.offsetX,a=i+h*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Sf extends Gc{constructor(){super(new Wc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class eo extends Ta{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.target=new Re,this.shadow=new Sf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class wf extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ef{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=vl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=vl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function vl(){return performance.now()}const xl=new Qt;let Tf=class{constructor(t,e,n=0,s=1/0){this.ray=new Tc(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new xa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return xl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xl),this}intersectObject(t,e=!0,n=[]){return aa(t,this,n,e),n.sort(_l),n}intersectObjects(t,e=!0,n=[]){for(let s=0,i=t.length;s<i;s++)aa(t[s],this,n,e);return n.sort(_l),n}};function _l(r,t){return r.distance-t.distance}function aa(r,t,e,n){let s=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const i=r.children;for(let a=0,o=i.length;a<o;a++)aa(i[a],t,e,!0)}}const yl=new P,Ys=new P;class Xc{constructor(t=new P,e=new P){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){yl.subVectors(t,this.start),Ys.subVectors(this.end,this.start);const n=Ys.dot(Ys);let i=Ys.dot(yl)/n;return e&&(i=$t(i,0,1)),i}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Ml(r,t,e,n){const s=bf(n);switch(e){case pc:return r*t;case gc:return r*t;case vc:return r*t*2;case da:return r*t/s.components*s.byteLength;case pa:return r*t/s.components*s.byteLength;case xc:return r*t*2/s.components*s.byteLength;case ma:return r*t*2/s.components*s.byteLength;case mc:return r*t*3/s.components*s.byteLength;case mn:return r*t*4/s.components*s.byteLength;case ga:return r*t*4/s.components*s.byteLength;case ir:case sr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case rr:case or:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Uo:case Fo:return Math.max(r,16)*Math.max(t,8)/4;case Do:case No:return Math.max(r,8)*Math.max(t,8)/2;case Oo:case Bo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case zo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ko:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Go:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Xo:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case qo:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Zo:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case $o:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Ko:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Jo:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case jo:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Qo:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case ar:case ta:case ea:return Math.ceil(r/4)*Math.ceil(t/4)*16;case _c:case na:return Math.ceil(r/4)*Math.ceil(t/4)*8;case ia:case sa:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function bf(r){switch(r){case Dn:case uc:return{byteLength:1,components:1};case hs:case fc:case ms:return{byteLength:2,components:1};case ua:case fa:return{byteLength:2,components:4};case li:case ha:case xn:return{byteLength:4,components:1};case dc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vr);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yc(){let r=null,t=!1,e=null,n=null;function s(i,a){e(i,a),n=r.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(s),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(i){e=i},setContext:function(i){r=i}}}function Af(r){const t=new WeakMap;function e(o,l){const h=o.array,u=o.usage,d=h.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,h,u),o.onUploadCallback();let c;if(h instanceof Float32Array)c=r.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?c=r.HALF_FLOAT:c=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)c=r.SHORT;else if(h instanceof Uint32Array)c=r.UNSIGNED_INT;else if(h instanceof Int32Array)c=r.INT;else if(h instanceof Int8Array)c=r.BYTE;else if(h instanceof Uint8Array)c=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)c=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:c,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,h){const u=l.array,d=l.updateRanges;if(r.bindBuffer(h,o),d.length===0)r.bufferSubData(h,0,u);else{d.sort((c,p)=>c.start-p.start);let f=0;for(let c=1;c<d.length;c++){const p=d[f],v=d[c];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,d[f]=v)}d.length=f+1;for(let c=0,p=d.length;c<p;c++){const v=d[c];r.bufferSubData(h,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function i(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:s,remove:i,update:a}}var Cf=`#ifdef USE_ALPHAHASH
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
#endif`,If=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lf=`#ifdef USE_ALPHATEST
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
#endif`,td=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ed=`#ifdef USE_DISPLACEMENTMAP
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
#endif`,Id=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ld=`#ifdef USE_LOGDEPTHBUF
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
#endif`,tp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ep=`#ifdef OPAQUE
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
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lp=`uniform samplerCube tCube;
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
}`,tm=`#define TOON
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
}`,em=`uniform float size;
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
}`,Jt={alphahash_fragment:Cf,alphahash_pars_fragment:Rf,alphamap_fragment:Pf,alphamap_pars_fragment:If,alphatest_fragment:Lf,alphatest_pars_fragment:Df,aomap_fragment:Uf,aomap_pars_fragment:Nf,batching_pars_vertex:Ff,batching_vertex:Of,begin_vertex:Bf,beginnormal_vertex:zf,bsdfs:kf,iridescence_fragment:Vf,bumpmap_pars_fragment:Hf,clipping_planes_fragment:Gf,clipping_planes_pars_fragment:Wf,clipping_planes_pars_vertex:Xf,clipping_planes_vertex:Yf,color_fragment:qf,color_pars_fragment:Zf,color_pars_vertex:$f,color_vertex:Kf,common:Jf,cube_uv_reflection_fragment:jf,defaultnormal_vertex:Qf,displacementmap_pars_vertex:td,displacementmap_vertex:ed,emissivemap_fragment:nd,emissivemap_pars_fragment:id,colorspace_fragment:sd,colorspace_pars_fragment:rd,envmap_fragment:od,envmap_common_pars_fragment:ad,envmap_pars_fragment:ld,envmap_pars_vertex:cd,envmap_physical_pars_fragment:yd,envmap_vertex:hd,fog_vertex:ud,fog_pars_vertex:fd,fog_fragment:dd,fog_pars_fragment:pd,gradientmap_pars_fragment:md,lightmap_pars_fragment:gd,lights_lambert_fragment:vd,lights_lambert_pars_fragment:xd,lights_pars_begin:_d,lights_toon_fragment:Md,lights_toon_pars_fragment:Sd,lights_phong_fragment:wd,lights_phong_pars_fragment:Ed,lights_physical_fragment:Td,lights_physical_pars_fragment:bd,lights_fragment_begin:Ad,lights_fragment_maps:Cd,lights_fragment_end:Rd,logdepthbuf_fragment:Pd,logdepthbuf_pars_fragment:Id,logdepthbuf_pars_vertex:Ld,logdepthbuf_vertex:Dd,map_fragment:Ud,map_pars_fragment:Nd,map_particle_fragment:Fd,map_particle_pars_fragment:Od,metalnessmap_fragment:Bd,metalnessmap_pars_fragment:zd,morphinstance_vertex:kd,morphcolor_vertex:Vd,morphnormal_vertex:Hd,morphtarget_pars_vertex:Gd,morphtarget_vertex:Wd,normal_fragment_begin:Xd,normal_fragment_maps:Yd,normal_pars_fragment:qd,normal_pars_vertex:Zd,normal_vertex:$d,normalmap_pars_fragment:Kd,clearcoat_normal_fragment_begin:Jd,clearcoat_normal_fragment_maps:jd,clearcoat_pars_fragment:Qd,iridescence_pars_fragment:tp,opaque_fragment:ep,packing:np,premultiplied_alpha_fragment:ip,project_vertex:sp,dithering_fragment:rp,dithering_pars_fragment:op,roughnessmap_fragment:ap,roughnessmap_pars_fragment:lp,shadowmap_pars_fragment:cp,shadowmap_pars_vertex:hp,shadowmap_vertex:up,shadowmask_pars_fragment:fp,skinbase_vertex:dp,skinning_pars_vertex:pp,skinning_vertex:mp,skinnormal_vertex:gp,specularmap_fragment:vp,specularmap_pars_fragment:xp,tonemapping_fragment:_p,tonemapping_pars_fragment:yp,transmission_fragment:Mp,transmission_pars_fragment:Sp,uv_pars_fragment:wp,uv_pars_vertex:Ep,uv_vertex:Tp,worldpos_vertex:bp,background_vert:Ap,background_frag:Cp,backgroundCube_vert:Rp,backgroundCube_frag:Pp,cube_vert:Ip,cube_frag:Lp,depth_vert:Dp,depth_frag:Up,distanceRGBA_vert:Np,distanceRGBA_frag:Fp,equirect_vert:Op,equirect_frag:Bp,linedashed_vert:zp,linedashed_frag:kp,meshbasic_vert:Vp,meshbasic_frag:Hp,meshlambert_vert:Gp,meshlambert_frag:Wp,meshmatcap_vert:Xp,meshmatcap_frag:Yp,meshnormal_vert:qp,meshnormal_frag:Zp,meshphong_vert:$p,meshphong_frag:Kp,meshphysical_vert:Jp,meshphysical_frag:jp,meshtoon_vert:Qp,meshtoon_frag:tm,points_vert:em,points_frag:nm,shadow_vert:im,shadow_frag:sm,sprite_vert:rm,sprite_frag:om},mt={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},gn={basic:{uniforms:He([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:He([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:He([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:He([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:He([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new jt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:He([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:He([mt.points,mt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:He([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:He([mt.common,mt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:He([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:He([mt.sprite,mt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:He([mt.common,mt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:He([mt.lights,mt.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};gn.physical={uniforms:He([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const qs={r:0,b:0,g:0},Qn=new yn,am=new Qt;function lm(r,t,e,n,s,i,a){const o=new jt(0);let l=i===!0?0:1,h,u,d=null,f=0,c=null;function p(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function v(S){let x=!1;const T=p(S);T===null?g(o,l):T&&T.isColor&&(g(T,1),x=!0);const _=r.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,a):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(S,x){const T=p(x);T&&(T.isCubeTexture||T.mapping===xr)?(u===void 0&&(u=new Nt(new an(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:Gi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(_,M,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Qn.copy(x.backgroundRotation),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(am.makeRotationFromEuler(Qn)),u.material.toneMapped=le.getTransfer(T.colorSpace)!==pe,(d!==T||f!==T.version||c!==r.toneMapping)&&(u.material.needsUpdate=!0,d=T,f=T.version,c=r.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(h===void 0&&(h=new Nt(new ve(2,2),new Xn({name:"BackgroundMaterial",uniforms:Gi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=T,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.toneMapped=le.getTransfer(T.colorSpace)!==pe,T.matrixAutoUpdate===!0&&T.updateMatrix(),h.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||f!==T.version||c!==r.toneMapping)&&(h.material.needsUpdate=!0,d=T,f=T.version,c=r.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null))}function g(S,x){S.getRGB(qs,Rc(r)),n.buffers.color.setClear(qs.r,qs.g,qs.b,x,a)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),h!==void 0&&(h.geometry.dispose(),h.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(S,x=1){o.set(S),l=x,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,g(o,l)},render:v,addToRenderList:m,dispose:b}}function cm(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},s=f(null);let i=s,a=!1;function o(E,A,U,L,F){let V=!1;const O=d(L,U,A);i!==O&&(i=O,h(i.object)),V=c(E,L,U,F),V&&p(E,L,U,F),F!==null&&t.update(F,r.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,x(E,A,U,L),F!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return r.createVertexArray()}function h(E){return r.bindVertexArray(E)}function u(E){return r.deleteVertexArray(E)}function d(E,A,U){const L=U.wireframe===!0;let F=n[E.id];F===void 0&&(F={},n[E.id]=F);let V=F[A.id];V===void 0&&(V={},F[A.id]=V);let O=V[L];return O===void 0&&(O=f(l()),V[L]=O),O}function f(E){const A=[],U=[],L=[];for(let F=0;F<e;F++)A[F]=0,U[F]=0,L[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:U,attributeDivisors:L,object:E,attributes:{},index:null}}function c(E,A,U,L){const F=i.attributes,V=A.attributes;let O=0;const Z=U.getAttributes();for(const G in Z)if(Z[G].location>=0){const ot=F[G];let et=V[G];if(et===void 0&&(G==="instanceMatrix"&&E.instanceMatrix&&(et=E.instanceMatrix),G==="instanceColor"&&E.instanceColor&&(et=E.instanceColor)),ot===void 0||ot.attribute!==et||et&&ot.data!==et.data)return!0;O++}return i.attributesNum!==O||i.index!==L}function p(E,A,U,L){const F={},V=A.attributes;let O=0;const Z=U.getAttributes();for(const G in Z)if(Z[G].location>=0){let ot=V[G];ot===void 0&&(G==="instanceMatrix"&&E.instanceMatrix&&(ot=E.instanceMatrix),G==="instanceColor"&&E.instanceColor&&(ot=E.instanceColor));const et={};et.attribute=ot,ot&&ot.data&&(et.data=ot.data),F[G]=et,O++}i.attributes=F,i.attributesNum=O,i.index=L}function v(){const E=i.newAttributes;for(let A=0,U=E.length;A<U;A++)E[A]=0}function m(E){g(E,0)}function g(E,A){const U=i.newAttributes,L=i.enabledAttributes,F=i.attributeDivisors;U[E]=1,L[E]===0&&(r.enableVertexAttribArray(E),L[E]=1),F[E]!==A&&(r.vertexAttribDivisor(E,A),F[E]=A)}function b(){const E=i.newAttributes,A=i.enabledAttributes;for(let U=0,L=A.length;U<L;U++)A[U]!==E[U]&&(r.disableVertexAttribArray(U),A[U]=0)}function S(E,A,U,L,F,V,O){O===!0?r.vertexAttribIPointer(E,A,U,F,V):r.vertexAttribPointer(E,A,U,L,F,V)}function x(E,A,U,L){v();const F=L.attributes,V=U.getAttributes(),O=A.defaultAttributeValues;for(const Z in V){const G=V[Z];if(G.location>=0){let it=F[Z];if(it===void 0&&(Z==="instanceMatrix"&&E.instanceMatrix&&(it=E.instanceMatrix),Z==="instanceColor"&&E.instanceColor&&(it=E.instanceColor)),it!==void 0){const ot=it.normalized,et=it.itemSize,St=t.get(it);if(St===void 0)continue;const Dt=St.buffer,N=St.type,X=St.bytesPerElement,tt=N===r.INT||N===r.UNSIGNED_INT||it.gpuType===ha;if(it.isInterleavedBufferAttribute){const K=it.data,pt=K.stride,It=it.offset;if(K.isInstancedInterleavedBuffer){for(let bt=0;bt<G.locationSize;bt++)g(G.location+bt,K.meshPerAttribute);E.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let bt=0;bt<G.locationSize;bt++)m(G.location+bt);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let bt=0;bt<G.locationSize;bt++)S(G.location+bt,et/G.locationSize,N,ot,pt*X,(It+et/G.locationSize*bt)*X,tt)}else{if(it.isInstancedBufferAttribute){for(let K=0;K<G.locationSize;K++)g(G.location+K,it.meshPerAttribute);E.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let K=0;K<G.locationSize;K++)m(G.location+K);r.bindBuffer(r.ARRAY_BUFFER,Dt);for(let K=0;K<G.locationSize;K++)S(G.location+K,et/G.locationSize,N,ot,et*X,et/G.locationSize*K*X,tt)}}else if(O!==void 0){const ot=O[Z];if(ot!==void 0)switch(ot.length){case 2:r.vertexAttrib2fv(G.location,ot);break;case 3:r.vertexAttrib3fv(G.location,ot);break;case 4:r.vertexAttrib4fv(G.location,ot);break;default:r.vertexAttrib1fv(G.location,ot)}}}}b()}function T(){w();for(const E in n){const A=n[E];for(const U in A){const L=A[U];for(const F in L)u(L[F].object),delete L[F];delete A[U]}delete n[E]}}function _(E){if(n[E.id]===void 0)return;const A=n[E.id];for(const U in A){const L=A[U];for(const F in L)u(L[F].object),delete L[F];delete A[U]}delete n[E.id]}function M(E){for(const A in n){const U=n[A];if(U[E.id]===void 0)continue;const L=U[E.id];for(const F in L)u(L[F].object),delete L[F];delete U[E.id]}}function w(){y(),a=!0,i!==s&&(i=s,h(i.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:y,dispose:T,releaseStatesOfGeometry:_,releaseStatesOfProgram:M,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function hm(r,t,e){let n;function s(h){n=h}function i(h,u){r.drawArrays(n,h,u),e.update(u,n,1)}function a(h,u,d){d!==0&&(r.drawArraysInstanced(n,h,u,d),e.update(u,n,d))}function o(h,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,u,0,d);let c=0;for(let p=0;p<d;p++)c+=u[p];e.update(c,n,1)}function l(h,u,d,f){if(d===0)return;const c=t.get("WEBGL_multi_draw");if(c===null)for(let p=0;p<h.length;p++)a(h[p],u[p],f[p]);else{c.multiDrawArraysInstancedWEBGL(n,h,0,u,0,f,0,d);let p=0;for(let v=0;v<d;v++)p+=u[v]*f[v];e.update(p,n,1)}}this.setMode=s,this.render=i,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function um(r,t,e,n){let s;function i(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const M=t.get("EXT_texture_filter_anisotropic");s=r.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(M){return!(M!==mn&&n.convert(M)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(M){const w=M===ms&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(M!==Dn&&n.convert(M)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&M!==xn&&!w)}function l(M){if(M==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const u=l(h);u!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);const d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),c=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),T=p>0,_=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:i,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:c,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:T,maxSamples:_}}function fm(r){const t=this;let e=null,n=0,s=!1,i=!1;const a=new pn,o=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const c=d.length!==0||f||n!==0||s;return s=f,n=d.length,c},this.beginShadows=function(){i=!0,u(null)},this.endShadows=function(){i=!1},this.setGlobalState=function(d,f){e=u(d,f,0)},this.setState=function(d,f,c){const p=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,g=r.get(d);if(!s||p===null||p.length===0||i&&!m)i?u(null):h();else{const b=i?0:n,S=b*4;let x=g.clippingState||null;l.value=x,x=u(p,f,S,c);for(let T=0;T!==S;++T)x[T]=e[T];g.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,f,c,p){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,p!==!0||m===null){const g=c+v*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<g)&&(m=new Float32Array(g));for(let S=0,x=c;S!==v;++S,x+=4)a.copy(d[S]).applyMatrix4(b,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function dm(r){let t=new WeakMap;function e(a,o){return o===Po?a.mapping=Bi:o===Io&&(a.mapping=zi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Po||o===Io)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new Nu(l.height);return h.fromEquirectangularTexture(r,a),t.set(a,h),a.addEventListener("dispose",s),e(h.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function i(){t=new WeakMap}return{get:n,dispose:i}}const Di=4,Sl=[.125,.215,.35,.446,.526,.582],si=20,no=new Wc,wl=new jt;let io=null,so=0,ro=0,oo=!1;const ni=(1+Math.sqrt(5))/2,Ai=1/ni,El=[new P(-ni,Ai,0),new P(ni,Ai,0),new P(-Ai,0,ni),new P(Ai,0,ni),new P(0,ni,-Ai),new P(0,ni,Ai),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class la{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){io=this._renderer.getRenderTarget(),so=this._renderer.getActiveCubeFace(),ro=this._renderer.getActiveMipmapLevel(),oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(t,n,s,i),e>0&&this._blur(i,0,0,e),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Al(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(io,so,ro),this._renderer.xr.enabled=oo,t.scissorTest=!1,Zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Bi||t.mapping===zi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),io=this._renderer.getRenderTarget(),so=this._renderer.getActiveCubeFace(),ro=this._renderer.getActiveMipmapLevel(),oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:ms,format:mn,colorSpace:Hi,depthBuffer:!1},s=Tl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tl(t,e,n);const{_lodMax:i}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=pm(i)),this._blurMaterial=mm(i,t,e)}return s}_compileMaterial(t){const e=new Nt(this._lodPlanes[0],t);this._renderer.compile(e,no)}_sceneToCubeUV(t,e,n,s){const o=new Ke(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(wl),u.toneMapping=Hn,u.autoClear=!1;const c=new Xe({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),p=new Nt(new an,c);let v=!1;const m=t.background;m?m.isColor&&(c.color.copy(m),t.background=null,v=!0):(c.color.copy(wl),v=!0);for(let g=0;g<6;g++){const b=g%3;b===0?(o.up.set(0,l[g],0),o.lookAt(h[g],0,0)):b===1?(o.up.set(0,0,l[g]),o.lookAt(0,h[g],0)):(o.up.set(0,l[g],0),o.lookAt(0,0,h[g]));const S=this._cubeSize;Zs(s,b*S,g>2?S:0,S,S),u.setRenderTarget(s),v&&u.render(p,o),u.render(t,o)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Bi||t.mapping===zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Al()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bl());const i=s?this._cubemapMaterial:this._equirectMaterial,a=new Nt(this._lodPlanes[0],i),o=i.uniforms;o.envMap.value=t;const l=this._cubeSize;Zs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,no)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let i=1;i<s;i++){const a=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=El[(s-i-1)%El.length];this._blur(t,i-1,i,a,o)}e.autoClear=n}_blur(t,e,n,s,i){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",i),this._halfBlur(a,t,n,n,s,"longitudinal",i)}_halfBlur(t,e,n,s,i,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Nt(this._lodPlanes[s],h),f=h.uniforms,c=this._sizeLods[n]-1,p=isFinite(i)?Math.PI/(2*c):2*Math.PI/(2*si-1),v=i/p,m=isFinite(i)?1+Math.floor(u*v):si;m>si&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);const g=[];let b=0;for(let M=0;M<si;++M){const w=M/v,y=Math.exp(-w*w/2);g.push(y),M===0?b+=y:M<m&&(b+=2*y)}for(let M=0;M<g.length;M++)g[M]=g[M]/b;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=g,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=p,f.mipInt.value=S-n;const x=this._sizeLods[s],T=3*x*(s>S-Di?s-S+Di:0),_=4*(this._cubeSize-x);Zs(e,T,_,3*x,2*x),l.setRenderTarget(e),l.render(d,no)}}function pm(r){const t=[],e=[],n=[];let s=r;const i=r-Di+1+Sl.length;for(let a=0;a<i;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>r-Di?l=Sl[a-r+Di-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),u=-h,d=1+h,f=[u,u,d,u,d,d,u,u,d,d,u,d],c=6,p=6,v=3,m=2,g=1,b=new Float32Array(v*p*c),S=new Float32Array(m*p*c),x=new Float32Array(g*p*c);for(let _=0;_<c;_++){const M=_%3*2/3-1,w=_>2?0:-1,y=[M,w,0,M+2/3,w,0,M+2/3,w+1,0,M,w,0,M+2/3,w+1,0,M,w+1,0];b.set(y,v*p*_),S.set(f,m*p*_);const E=[_,_,_,_,_,_];x.set(E,g*p*_)}const T=new Ne;T.setAttribute("position",new Ye(b,v)),T.setAttribute("uv",new Ye(S,m)),T.setAttribute("faceIndex",new Ye(x,g)),t.push(T),s>Di&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Tl(r,t,e){const n=new ci(r,t,e);return n.texture.mapping=xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(r,t,e,n,s){r.viewport.set(t,e,n,s),r.scissor.set(t,e,n,s)}function mm(r,t,e){const n=new Float32Array(si),s=new P(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ba(),fragmentShader:`

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
	`}function gm(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===Po||l===Io,u=l===Bi||l===zi;if(h||u){let d=t.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new la(r)),d=h?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const c=o.image;return h&&c&&c.height>0||u&&c&&s(c)?(e===null&&(e=new la(r)),d=h?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",i),d.texture):null}}}return o}function s(o){let l=0;const h=6;for(let u=0;u<h;u++)o[u]!==void 0&&l++;return l===h}function i(o){const l=o.target;l.removeEventListener("dispose",i);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function vm(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=r.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ii("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function xm(r,t,e,n){const s={},i=new WeakMap;function a(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const p in f.attributes)t.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete s[f.id];const c=i.get(f);c&&(t.remove(c),i.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(d){const f=d.attributes;for(const c in f)t.update(f[c],r.ARRAY_BUFFER)}function h(d){const f=[],c=d.index,p=d.attributes.position;let v=0;if(c!==null){const b=c.array;v=c.version;for(let S=0,x=b.length;S<x;S+=3){const T=b[S+0],_=b[S+1],M=b[S+2];f.push(T,_,_,M,M,T)}}else if(p!==void 0){const b=p.array;v=p.version;for(let S=0,x=b.length/3-1;S<x;S+=3){const T=S+0,_=S+1,M=S+2;f.push(T,_,_,M,M,T)}}else return;const m=new(Sc(f)?Cc:Ac)(f,1);m.version=v;const g=i.get(d);g&&t.remove(g),i.set(d,m)}function u(d){const f=i.get(d);if(f){const c=d.index;c!==null&&f.version<c.version&&h(d)}else h(d);return i.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function _m(r,t,e){let n;function s(f){n=f}let i,a;function o(f){i=f.type,a=f.bytesPerElement}function l(f,c){r.drawElements(n,c,i,f*a),e.update(c,n,1)}function h(f,c,p){p!==0&&(r.drawElementsInstanced(n,c,i,f*a,p),e.update(c,n,p))}function u(f,c,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,c,0,i,f,0,p);let m=0;for(let g=0;g<p;g++)m+=c[g];e.update(m,n,1)}function d(f,c,p,v){if(p===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f.length;g++)h(f[g]/a,c[g],v[g]);else{m.multiDrawElementsInstancedWEBGL(n,c,0,i,f,0,v,0,p);let g=0;for(let b=0;b<p;b++)g+=c[b]*v[b];e.update(g,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function ym(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(i,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(i/3);break;case r.LINES:e.lines+=o*(i/2);break;case r.LINE_STRIP:e.lines+=o*(i-1);break;case r.LINE_LOOP:e.lines+=o*i;break;case r.POINTS:e.points+=o*i;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Mm(r,t,e){const n=new WeakMap,s=new me;function i(a,o,l){const h=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let E=function(){w.dispose(),n.delete(o),o.removeEventListener("dispose",E)};var c=E;f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;p===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let T=o.attributes.position.count*x,_=1;T>t.maxTextureSize&&(_=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const M=new Float32Array(T*_*4*d),w=new Ec(M,T,_,d);w.type=xn,w.needsUpdate=!0;const y=x*4;for(let A=0;A<d;A++){const U=g[A],L=b[A],F=S[A],V=T*_*4*A;for(let O=0;O<U.count;O++){const Z=O*y;p===!0&&(s.fromBufferAttribute(U,O),M[V+Z+0]=s.x,M[V+Z+1]=s.y,M[V+Z+2]=s.z,M[V+Z+3]=0),v===!0&&(s.fromBufferAttribute(L,O),M[V+Z+4]=s.x,M[V+Z+5]=s.y,M[V+Z+6]=s.z,M[V+Z+7]=0),m===!0&&(s.fromBufferAttribute(F,O),M[V+Z+8]=s.x,M[V+Z+9]=s.y,M[V+Z+10]=s.z,M[V+Z+11]=F.itemSize===4?s.w:1)}}f={count:d,texture:w,size:new at(T,_)},n.set(o,f),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let p=0;for(let m=0;m<h.length;m++)p+=h[m];const v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(r,"morphTargetBaseInfluence",v),l.getUniforms().setValue(r,"morphTargetInfluences",h)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:i}}function Sm(r,t,e,n){let s=new WeakMap;function i(l){const h=n.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==h&&(t.update(d),s.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==h&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return d}function a(){s=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:i,dispose:a}}const qc=new ze,Cl=new Dc(1,1),Zc=new Ec,$c=new _u,Kc=new Ic,Rl=[],Pl=[],Il=new Float32Array(16),Ll=new Float32Array(9),Dl=new Float32Array(4);function qi(r,t,e){const n=r[0];if(n<=0||n>0)return r;const s=t*e;let i=Rl[s];if(i===void 0&&(i=new Float32Array(s),Rl[s]=i),t!==0){n.toArray(i,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(i,o)}return i}function Te(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function be(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Er(r,t){let e=Pl[t];e===void 0&&(e=new Int32Array(t),Pl[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function wm(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Em(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;r.uniform2fv(this.addr,t),be(e,t)}}function Tm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;r.uniform3fv(this.addr,t),be(e,t)}}function bm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;r.uniform4fv(this.addr,t),be(e,t)}}function Am(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Te(e,n))return;Dl.set(n),r.uniformMatrix2fv(this.addr,!1,Dl),be(e,n)}}function Cm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Te(e,n))return;Ll.set(n),r.uniformMatrix3fv(this.addr,!1,Ll),be(e,n)}}function Rm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Te(e,n))return;Il.set(n),r.uniformMatrix4fv(this.addr,!1,Il),be(e,n)}}function Pm(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Im(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;r.uniform2iv(this.addr,t),be(e,t)}}function Lm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;r.uniform3iv(this.addr,t),be(e,t)}}function Dm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;r.uniform4iv(this.addr,t),be(e,t)}}function Um(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Nm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;r.uniform2uiv(this.addr,t),be(e,t)}}function Fm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;r.uniform3uiv(this.addr,t),be(e,t)}}function Om(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;r.uniform4uiv(this.addr,t),be(e,t)}}function Bm(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s);let i;this.type===r.SAMPLER_2D_SHADOW?(Cl.compareFunction=Mc,i=Cl):i=qc,e.setTexture2D(t||i,s)}function zm(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||$c,s)}function km(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Kc,s)}function Vm(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Zc,s)}function Hm(r){switch(r){case 5126:return wm;case 35664:return Em;case 35665:return Tm;case 35666:return bm;case 35674:return Am;case 35675:return Cm;case 35676:return Rm;case 5124:case 35670:return Pm;case 35667:case 35671:return Im;case 35668:case 35672:return Lm;case 35669:case 35673:return Dm;case 5125:return Um;case 36294:return Nm;case 36295:return Fm;case 36296:return Om;case 35678:case 36198:case 36298:case 36306:case 35682:return Bm;case 35679:case 36299:case 36307:return zm;case 35680:case 36300:case 36308:case 36293:return km;case 36289:case 36303:case 36311:case 36292:return Vm}}function Gm(r,t){r.uniform1fv(this.addr,t)}function Wm(r,t){const e=qi(t,this.size,2);r.uniform2fv(this.addr,e)}function Xm(r,t){const e=qi(t,this.size,3);r.uniform3fv(this.addr,e)}function Ym(r,t){const e=qi(t,this.size,4);r.uniform4fv(this.addr,e)}function qm(r,t){const e=qi(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Zm(r,t){const e=qi(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function $m(r,t){const e=qi(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Km(r,t){r.uniform1iv(this.addr,t)}function Jm(r,t){r.uniform2iv(this.addr,t)}function jm(r,t){r.uniform3iv(this.addr,t)}function Qm(r,t){r.uniform4iv(this.addr,t)}function t0(r,t){r.uniform1uiv(this.addr,t)}function e0(r,t){r.uniform2uiv(this.addr,t)}function n0(r,t){r.uniform3uiv(this.addr,t)}function i0(r,t){r.uniform4uiv(this.addr,t)}function s0(r,t,e){const n=this.cache,s=t.length,i=Er(e,s);Te(n,i)||(r.uniform1iv(this.addr,i),be(n,i));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||qc,i[a])}function r0(r,t,e){const n=this.cache,s=t.length,i=Er(e,s);Te(n,i)||(r.uniform1iv(this.addr,i),be(n,i));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||$c,i[a])}function o0(r,t,e){const n=this.cache,s=t.length,i=Er(e,s);Te(n,i)||(r.uniform1iv(this.addr,i),be(n,i));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Kc,i[a])}function a0(r,t,e){const n=this.cache,s=t.length,i=Er(e,s);Te(n,i)||(r.uniform1iv(this.addr,i),be(n,i));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Zc,i[a])}function l0(r){switch(r){case 5126:return Gm;case 35664:return Wm;case 35665:return Xm;case 35666:return Ym;case 35674:return qm;case 35675:return Zm;case 35676:return $m;case 5124:case 35670:return Km;case 35667:case 35671:return Jm;case 35668:case 35672:return jm;case 35669:case 35673:return Qm;case 5125:return t0;case 36294:return e0;case 36295:return n0;case 36296:return i0;case 35678:case 36198:case 36298:case 36306:case 35682:return s0;case 35679:case 36299:case 36307:return r0;case 35680:case 36300:case 36308:case 36293:return o0;case 36289:case 36303:case 36311:case 36292:return a0}}class c0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Hm(e.type)}}class h0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=l0(e.type)}}class u0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let i=0,a=s.length;i!==a;++i){const o=s[i];o.setValue(t,e[o.id],n)}}}const ao=/(\w+)(\])?(\[|\.)?/g;function Ul(r,t){r.seq.push(t),r.map[t.id]=t}function f0(r,t,e){const n=r.name,s=n.length;for(ao.lastIndex=0;;){const i=ao.exec(n),a=ao.lastIndex;let o=i[1];const l=i[2]==="]",h=i[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===s){Ul(e,h===void 0?new c0(o,r,t):new h0(o,r,t));break}else{let d=e.map[o];d===void 0&&(d=new u0(o),Ul(e,d)),e=d}}}class lr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const i=t.getActiveUniform(e,s),a=t.getUniformLocation(e,i.name);f0(i,a,this)}}setValue(t,e,n,s){const i=this.map[e];i!==void 0&&i.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let i=0,a=e.length;i!==a;++i){const o=e[i],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,i=t.length;s!==i;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Nl(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const d0=37297;let p0=0;function m0(r,t){const e=r.split(`
`),n=[],s=Math.max(t-6,0),i=Math.min(t+6,e.length);for(let a=s;a<i;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Fl=new Zt;function g0(r){le._getMatrix(Fl,le.workingColorSpace,r);const t=`mat3( ${Fl.elements.map(e=>e.toFixed(4))} )`;switch(le.getTransfer(r)){case fr:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Ol(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=r.getShaderInfoLog(t).trim();if(n&&s==="")return"";const i=/ERROR: 0:(\d+)/.exec(s);if(i){const a=parseInt(i[1]);return e.toUpperCase()+`

`+s+`

`+m0(r.getShaderSource(t),a)}else return s}function v0(r,t){const e=g0(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function x0(r,t){let e;switch(t){case Ih:e="Linear";break;case Lh:e="Reinhard";break;case Dh:e="Cineon";break;case cc:e="ACESFilmic";break;case Nh:e="AgX";break;case Fh:e="Neutral";break;case Uh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const $s=new P;function _0(){le.getLuminanceCoefficients($s);const r=$s.x.toFixed(4),t=$s.y.toFixed(4),e=$s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function y0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(is).join(`
`)}function M0(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function S0(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const i=r.getActiveAttrib(t,s),a=i.name;let o=1;i.type===r.FLOAT_MAT2&&(o=2),i.type===r.FLOAT_MAT3&&(o=3),i.type===r.FLOAT_MAT4&&(o=4),e[a]={type:i.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function is(r){return r!==""}function Bl(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zl(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const w0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ca(r){return r.replace(w0,T0)}const E0=new Map;function T0(r,t){let e=Jt[t];if(e===void 0){const n=E0.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ca(e)}const b0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kl(r){return r.replace(b0,A0)}function A0(r,t,e,n){let s="";for(let i=parseInt(t);i<parseInt(e);i++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+i+" ]").replace(/UNROLLED_LOOP_INDEX/g,i);return s}function Vl(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function C0(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===oc?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===ac?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Cn&&(t="SHADOWMAP_TYPE_VSM"),t}function R0(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Bi:case zi:t="ENVMAP_TYPE_CUBE";break;case xr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function P0(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case zi:t="ENVMAP_MODE_REFRACTION";break}return t}function I0(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case lc:t="ENVMAP_BLENDING_MULTIPLY";break;case Rh:t="ENVMAP_BLENDING_MIX";break;case Ph:t="ENVMAP_BLENDING_ADD";break}return t}function L0(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function D0(r,t,e,n){const s=r.getContext(),i=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=C0(e),h=R0(e),u=P0(e),d=I0(e),f=L0(e),c=y0(e),p=M0(i),v=s.createProgram();let m,g,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(is).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(is).join(`
`),g.length>0&&(g+=`
`)):(m=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),g=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hn?"#define TONE_MAPPING":"",e.toneMapping!==Hn?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Hn?x0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,v0("linearToOutputTexel",e.outputColorSpace),_0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(is).join(`
`)),a=ca(a),a=Bl(a,e),a=zl(a,e),o=ca(o),o=Bl(o,e),o=zl(o,e),a=kl(a),o=kl(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[c,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===Va?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Va?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const S=b+m+a,x=b+g+o,T=Nl(s,s.VERTEX_SHADER,S),_=Nl(s,s.FRAGMENT_SHADER,x);s.attachShader(v,T),s.attachShader(v,_),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function M(A){if(r.debug.checkShaderErrors){const U=s.getProgramInfoLog(v).trim(),L=s.getShaderInfoLog(T).trim(),F=s.getShaderInfoLog(_).trim();let V=!0,O=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(V=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(s,v,T,_);else{const Z=Ol(s,T,"vertex"),G=Ol(s,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+U+`
`+Z+`
`+G)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(L===""||F==="")&&(O=!1);O&&(A.diagnostics={runnable:V,programLog:U,vertexShader:{log:L,prefix:m},fragmentShader:{log:F,prefix:g}})}s.deleteShader(T),s.deleteShader(_),w=new lr(s,v),y=S0(s,v)}let w;this.getUniforms=function(){return w===void 0&&M(this),w};let y;this.getAttributes=function(){return y===void 0&&M(this),y};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(v,d0)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=p0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=_,this}let U0=0;class N0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new F0(t),e.set(t,n)),n}}class F0{constructor(t){this.id=U0++,this.code=t,this.usedTimes=0}}function O0(r,t,e,n,s,i,a){const o=new xa,l=new N0,h=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let c=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return h.add(y),y===0?"uv":`uv${y}`}function m(y,E,A,U,L){const F=U.fog,V=L.geometry,O=y.isMeshStandardMaterial?U.environment:null,Z=(y.isMeshStandardMaterial?e:t).get(y.envMap||O),G=Z&&Z.mapping===xr?Z.image.height:null,it=p[y.type];y.precision!==null&&(c=s.getMaxPrecision(y.precision),c!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",c,"instead."));const ot=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,et=ot!==void 0?ot.length:0;let St=0;V.morphAttributes.position!==void 0&&(St=1),V.morphAttributes.normal!==void 0&&(St=2),V.morphAttributes.color!==void 0&&(St=3);let Dt,N,X,tt;if(it){const fe=gn[it];Dt=fe.vertexShader,N=fe.fragmentShader}else Dt=y.vertexShader,N=y.fragmentShader,l.update(y),X=l.getVertexShaderID(y),tt=l.getFragmentShaderID(y);const K=r.getRenderTarget(),pt=r.state.buffers.depth.getReversed(),It=L.isInstancedMesh===!0,bt=L.isBatchedMesh===!0,Wt=!!y.map,Q=!!y.matcap,lt=!!Z,D=!!y.aoMap,Ut=!!y.lightMap,ct=!!y.bumpMap,Et=!!y.normalMap,ft=!!y.displacementMap,kt=!!y.emissiveMap,yt=!!y.metalnessMap,I=!!y.roughnessMap,C=y.anisotropy>0,W=y.clearcoat>0,J=y.dispersion>0,st=y.iridescence>0,j=y.sheen>0,Lt=y.transmission>0,gt=C&&!!y.anisotropyMap,wt=W&&!!y.clearcoatMap,ne=W&&!!y.clearcoatNormalMap,ut=W&&!!y.clearcoatRoughnessMap,At=st&&!!y.iridescenceMap,zt=st&&!!y.iridescenceThicknessMap,Ht=j&&!!y.sheenColorMap,Ct=j&&!!y.sheenRoughnessMap,ie=!!y.specularMap,Kt=!!y.specularColorMap,ge=!!y.specularIntensityMap,B=Lt&&!!y.transmissionMap,vt=Lt&&!!y.thicknessMap,$=!!y.gradientMap,nt=!!y.alphaMap,Mt=y.alphaTest>0,_t=!!y.alphaHash,qt=!!y.extensions;let ye=Hn;y.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ye=r.toneMapping);const Fe={shaderID:it,shaderType:y.type,shaderName:y.name,vertexShader:Dt,fragmentShader:N,defines:y.defines,customVertexShaderID:X,customFragmentShaderID:tt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:c,batching:bt,batchingColor:bt&&L._colorsTexture!==null,instancing:It,instancingColor:It&&L.instanceColor!==null,instancingMorph:It&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?r.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Hi,alphaToCoverage:!!y.alphaToCoverage,map:Wt,matcap:Q,envMap:lt,envMapMode:lt&&Z.mapping,envMapCubeUVHeight:G,aoMap:D,lightMap:Ut,bumpMap:ct,normalMap:Et,displacementMap:f&&ft,emissiveMap:kt,normalMapObjectSpace:Et&&y.normalMapType===kh,normalMapTangentSpace:Et&&y.normalMapType===yc,metalnessMap:yt,roughnessMap:I,anisotropy:C,anisotropyMap:gt,clearcoat:W,clearcoatMap:wt,clearcoatNormalMap:ne,clearcoatRoughnessMap:ut,dispersion:J,iridescence:st,iridescenceMap:At,iridescenceThicknessMap:zt,sheen:j,sheenColorMap:Ht,sheenRoughnessMap:Ct,specularMap:ie,specularColorMap:Kt,specularIntensityMap:ge,transmission:Lt,transmissionMap:B,thicknessMap:vt,gradientMap:$,opaque:y.transparent===!1&&y.blending===Ui&&y.alphaToCoverage===!1,alphaMap:nt,alphaTest:Mt,alphaHash:_t,combine:y.combine,mapUv:Wt&&v(y.map.channel),aoMapUv:D&&v(y.aoMap.channel),lightMapUv:Ut&&v(y.lightMap.channel),bumpMapUv:ct&&v(y.bumpMap.channel),normalMapUv:Et&&v(y.normalMap.channel),displacementMapUv:ft&&v(y.displacementMap.channel),emissiveMapUv:kt&&v(y.emissiveMap.channel),metalnessMapUv:yt&&v(y.metalnessMap.channel),roughnessMapUv:I&&v(y.roughnessMap.channel),anisotropyMapUv:gt&&v(y.anisotropyMap.channel),clearcoatMapUv:wt&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:ne&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:zt&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&v(y.sheenRoughnessMap.channel),specularMapUv:ie&&v(y.specularMap.channel),specularColorMapUv:Kt&&v(y.specularColorMap.channel),specularIntensityMapUv:ge&&v(y.specularIntensityMap.channel),transmissionMapUv:B&&v(y.transmissionMap.channel),thicknessMapUv:vt&&v(y.thicknessMap.channel),alphaMapUv:nt&&v(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Et||C),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!V.attributes.uv&&(Wt||nt),fog:!!F,useFog:y.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:pt,skinning:L.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:St,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&A.length>0,shadowMapType:r.shadowMap.type,toneMapping:ye,decodeVideoTexture:Wt&&y.map.isVideoTexture===!0&&le.getTransfer(y.map.colorSpace)===pe,decodeVideoTextureEmissive:kt&&y.emissiveMap.isVideoTexture===!0&&le.getTransfer(y.emissiveMap.colorSpace)===pe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ue,flipSided:y.side===Ge,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:qt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qt&&y.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Fe.vertexUv1s=h.has(1),Fe.vertexUv2s=h.has(2),Fe.vertexUv3s=h.has(3),h.clear(),Fe}function g(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const A in y.defines)E.push(A),E.push(y.defines[A]);return y.isRawShaderMaterial===!1&&(b(E,y),S(E,y),E.push(r.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function b(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function S(y,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reverseDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),y.push(o.mask)}function x(y){const E=p[y.type];let A;if(E){const U=gn[E];A=Iu.clone(U.uniforms)}else A=y.uniforms;return A}function T(y,E){let A;for(let U=0,L=u.length;U<L;U++){const F=u[U];if(F.cacheKey===E){A=F,++A.usedTimes;break}}return A===void 0&&(A=new D0(r,E,y,i),u.push(A)),A}function _(y){if(--y.usedTimes===0){const E=u.indexOf(y);u[E]=u[u.length-1],u.pop(),y.destroy()}}function M(y){l.remove(y)}function w(){l.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:x,acquireProgram:T,releaseProgram:_,releaseShaderCache:M,programs:u,dispose:w}}function B0(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function s(a,o,l){r.get(a)[o]=l}function i(){r=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:i}}function z0(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Hl(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Gl(){const r=[];let t=0;const e=[],n=[],s=[];function i(){t=0,e.length=0,n.length=0,s.length=0}function a(d,f,c,p,v,m){let g=r[t];return g===void 0?(g={id:d.id,object:d,geometry:f,material:c,groupOrder:p,renderOrder:d.renderOrder,z:v,group:m},r[t]=g):(g.id=d.id,g.object=d,g.geometry=f,g.material=c,g.groupOrder=p,g.renderOrder=d.renderOrder,g.z=v,g.group=m),t++,g}function o(d,f,c,p,v,m){const g=a(d,f,c,p,v,m);c.transmission>0?n.push(g):c.transparent===!0?s.push(g):e.push(g)}function l(d,f,c,p,v,m){const g=a(d,f,c,p,v,m);c.transmission>0?n.unshift(g):c.transparent===!0?s.unshift(g):e.unshift(g)}function h(d,f){e.length>1&&e.sort(d||z0),n.length>1&&n.sort(f||Hl),s.length>1&&s.sort(f||Hl)}function u(){for(let d=t,f=r.length;d<f;d++){const c=r[d];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}}return{opaque:e,transmissive:n,transparent:s,init:i,push:o,unshift:l,finish:u,sort:h}}function k0(){let r=new WeakMap;function t(n,s){const i=r.get(n);let a;return i===void 0?(a=new Gl,r.set(n,[a])):s>=i.length?(a=new Gl,i.push(a)):a=i[s],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function V0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new jt};break;case"SpotLight":e={position:new P,direction:new P,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new P,halfWidth:new P,halfHeight:new P};break}return r[t.id]=e,e}}}function H0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let G0=0;function W0(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function X0(r){const t=new V0,e=H0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new P);const s=new P,i=new Qt,a=new Qt;function o(h){let u=0,d=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let c=0,p=0,v=0,m=0,g=0,b=0,S=0,x=0,T=0,_=0,M=0;h.sort(W0);for(let y=0,E=h.length;y<E;y++){const A=h[y],U=A.color,L=A.intensity,F=A.distance,V=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=U.r*L,d+=U.g*L,f+=U.b*L;else if(A.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(A.sh.coefficients[O],L);M++}else if(A.isDirectionalLight){const O=t.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const Z=A.shadow,G=e.get(A);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.directionalShadow[c]=G,n.directionalShadowMap[c]=V,n.directionalShadowMatrix[c]=A.shadow.matrix,b++}n.directional[c]=O,c++}else if(A.isSpotLight){const O=t.get(A);O.position.setFromMatrixPosition(A.matrixWorld),O.color.copy(U).multiplyScalar(L),O.distance=F,O.coneCos=Math.cos(A.angle),O.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),O.decay=A.decay,n.spot[v]=O;const Z=A.shadow;if(A.map&&(n.spotLightMap[T]=A.map,T++,Z.updateMatrices(A),A.castShadow&&_++),n.spotLightMatrix[v]=Z.matrix,A.castShadow){const G=e.get(A);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=V,x++}v++}else if(A.isRectAreaLight){const O=t.get(A);O.color.copy(U).multiplyScalar(L),O.halfWidth.set(A.width*.5,0,0),O.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=O,m++}else if(A.isPointLight){const O=t.get(A);if(O.color.copy(A.color).multiplyScalar(A.intensity),O.distance=A.distance,O.decay=A.decay,A.castShadow){const Z=A.shadow,G=e.get(A);G.shadowIntensity=Z.intensity,G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,n.pointShadow[p]=G,n.pointShadowMap[p]=V,n.pointShadowMatrix[p]=A.shadow.matrix,S++}n.point[p]=O,p++}else if(A.isHemisphereLight){const O=t.get(A);O.skyColor.copy(A.color).multiplyScalar(L),O.groundColor.copy(A.groundColor).multiplyScalar(L),n.hemi[g]=O,g++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const w=n.hash;(w.directionalLength!==c||w.pointLength!==p||w.spotLength!==v||w.rectAreaLength!==m||w.hemiLength!==g||w.numDirectionalShadows!==b||w.numPointShadows!==S||w.numSpotShadows!==x||w.numSpotMaps!==T||w.numLightProbes!==M)&&(n.directional.length=c,n.spot.length=v,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+T-_,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=_,n.numLightProbes=M,w.directionalLength=c,w.pointLength=p,w.spotLength=v,w.rectAreaLength=m,w.hemiLength=g,w.numDirectionalShadows=b,w.numPointShadows=S,w.numSpotShadows=x,w.numSpotMaps=T,w.numLightProbes=M,n.version=G0++)}function l(h,u){let d=0,f=0,c=0,p=0,v=0;const m=u.matrixWorldInverse;for(let g=0,b=h.length;g<b;g++){const S=h[g];if(S.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(S.isSpotLight){const x=n.spot[c];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),c++}else if(S.isRectAreaLight){const x=n.rectArea[p];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),a.identity(),i.copy(S.matrixWorld),i.premultiply(m),a.extractRotation(i),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),p++}else if(S.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Wl(r){const t=new X0(r),e=[],n=[];function s(u){h.camera=u,e.length=0,n.length=0}function i(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:o,setupLightsView:l,pushLight:i,pushShadow:a}}function Y0(r){let t=new WeakMap;function e(s,i=0){const a=t.get(s);let o;return a===void 0?(o=new Wl(r),t.set(s,[o])):i>=a.length?(o=new Wl(r),a.push(o)):o=a[i],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const q0=`void main() {
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
}`;function $0(r,t,e){let n=new ya;const s=new at,i=new at,a=new me,o=new xf({depthPacking:zh}),l=new _f,h={},u=e.maxTextureSize,d={[Wn]:Ge,[Ge]:Wn,[Ue]:Ue},f=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:q0,fragmentShader:Z0}),c=f.clone();c.defines.HORIZONTAL_PASS=1;const p=new Ne;p.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Nt(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oc;let g=this.type;this.render=function(_,M,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||_.length===0)return;const y=r.getRenderTarget(),E=r.getActiveCubeFace(),A=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Vn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const L=g!==Cn&&this.type===Cn,F=g===Cn&&this.type!==Cn;for(let V=0,O=_.length;V<O;V++){const Z=_[V],G=Z.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const it=G.getFrameExtents();if(s.multiply(it),i.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(i.x=Math.floor(u/it.x),s.x=i.x*it.x,G.mapSize.x=i.x),s.y>u&&(i.y=Math.floor(u/it.y),s.y=i.y*it.y,G.mapSize.y=i.y)),G.map===null||L===!0||F===!0){const et=this.type!==Cn?{minFilter:Je,magFilter:Je}:{};G.map!==null&&G.map.dispose(),G.map=new ci(s.x,s.y,et),G.map.texture.name=Z.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const ot=G.getViewportCount();for(let et=0;et<ot;et++){const St=G.getViewport(et);a.set(i.x*St.x,i.y*St.y,i.x*St.z,i.y*St.w),U.viewport(a),G.updateMatrices(Z,et),n=G.getFrustum(),x(M,w,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===Cn&&b(G,w),G.needsUpdate=!1}g=this.type,m.needsUpdate=!1,r.setRenderTarget(y,E,A)};function b(_,M){const w=t.update(v);f.defines.VSM_SAMPLES!==_.blurSamples&&(f.defines.VSM_SAMPLES=_.blurSamples,c.defines.VSM_SAMPLES=_.blurSamples,f.needsUpdate=!0,c.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new ci(s.x,s.y)),f.uniforms.shadow_pass.value=_.map.texture,f.uniforms.resolution.value=_.mapSize,f.uniforms.radius.value=_.radius,r.setRenderTarget(_.mapPass),r.clear(),r.renderBufferDirect(M,null,w,f,v,null),c.uniforms.shadow_pass.value=_.mapPass.texture,c.uniforms.resolution.value=_.mapSize,c.uniforms.radius.value=_.radius,r.setRenderTarget(_.map),r.clear(),r.renderBufferDirect(M,null,w,c,v,null)}function S(_,M,w,y){let E=null;const A=w.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(A!==void 0)E=A;else if(E=w.isPointLight===!0?l:o,r.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const U=E.uuid,L=M.uuid;let F=h[U];F===void 0&&(F={},h[U]=F);let V=F[L];V===void 0&&(V=E.clone(),F[L]=V,M.addEventListener("dispose",T)),E=V}if(E.visible=M.visible,E.wireframe=M.wireframe,y===Cn?E.side=M.shadowSide!==null?M.shadowSide:M.side:E.side=M.shadowSide!==null?M.shadowSide:d[M.side],E.alphaMap=M.alphaMap,E.alphaTest=M.alphaTest,E.map=M.map,E.clipShadows=M.clipShadows,E.clippingPlanes=M.clippingPlanes,E.clipIntersection=M.clipIntersection,E.displacementMap=M.displacementMap,E.displacementScale=M.displacementScale,E.displacementBias=M.displacementBias,E.wireframeLinewidth=M.wireframeLinewidth,E.linewidth=M.linewidth,w.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const U=r.properties.get(E);U.light=w}return E}function x(_,M,w,y,E){if(_.visible===!1)return;if(_.layers.test(M.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&E===Cn)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,_.matrixWorld);const L=t.update(_),F=_.material;if(Array.isArray(F)){const V=L.groups;for(let O=0,Z=V.length;O<Z;O++){const G=V[O],it=F[G.materialIndex];if(it&&it.visible){const ot=S(_,it,y,E);_.onBeforeShadow(r,_,M,w,L,ot,G),r.renderBufferDirect(w,null,L,ot,_,G),_.onAfterShadow(r,_,M,w,L,ot,G)}}}else if(F.visible){const V=S(_,F,y,E);_.onBeforeShadow(r,_,M,w,L,V,null),r.renderBufferDirect(w,null,L,V,_,null),_.onAfterShadow(r,_,M,w,L,V,null)}}const U=_.children;for(let L=0,F=U.length;L<F;L++)x(U[L],M,w,y,E)}function T(_){_.target.removeEventListener("dispose",T);for(const w in h){const y=h[w],E=_.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}const K0={[wo]:Eo,[To]:Co,[bo]:Ro,[Oi]:Ao,[Eo]:wo,[Co]:To,[Ro]:bo,[Ao]:Oi};function J0(r,t){function e(){let B=!1;const vt=new me;let $=null;const nt=new me(0,0,0,0);return{setMask:function(Mt){$!==Mt&&!B&&(r.colorMask(Mt,Mt,Mt,Mt),$=Mt)},setLocked:function(Mt){B=Mt},setClear:function(Mt,_t,qt,ye,Fe){Fe===!0&&(Mt*=ye,_t*=ye,qt*=ye),vt.set(Mt,_t,qt,ye),nt.equals(vt)===!1&&(r.clearColor(Mt,_t,qt,ye),nt.copy(vt))},reset:function(){B=!1,$=null,nt.set(-1,0,0,0)}}}function n(){let B=!1,vt=!1,$=null,nt=null,Mt=null;return{setReversed:function(_t){if(vt!==_t){const qt=t.get("EXT_clip_control");vt?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT);const ye=Mt;Mt=null,this.setClear(ye)}vt=_t},getReversed:function(){return vt},setTest:function(_t){_t?K(r.DEPTH_TEST):pt(r.DEPTH_TEST)},setMask:function(_t){$!==_t&&!B&&(r.depthMask(_t),$=_t)},setFunc:function(_t){if(vt&&(_t=K0[_t]),nt!==_t){switch(_t){case wo:r.depthFunc(r.NEVER);break;case Eo:r.depthFunc(r.ALWAYS);break;case To:r.depthFunc(r.LESS);break;case Oi:r.depthFunc(r.LEQUAL);break;case bo:r.depthFunc(r.EQUAL);break;case Ao:r.depthFunc(r.GEQUAL);break;case Co:r.depthFunc(r.GREATER);break;case Ro:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}nt=_t}},setLocked:function(_t){B=_t},setClear:function(_t){Mt!==_t&&(vt&&(_t=1-_t),r.clearDepth(_t),Mt=_t)},reset:function(){B=!1,$=null,nt=null,Mt=null,vt=!1}}}function s(){let B=!1,vt=null,$=null,nt=null,Mt=null,_t=null,qt=null,ye=null,Fe=null;return{setTest:function(fe){B||(fe?K(r.STENCIL_TEST):pt(r.STENCIL_TEST))},setMask:function(fe){vt!==fe&&!B&&(r.stencilMask(fe),vt=fe)},setFunc:function(fe,ln,Sn){($!==fe||nt!==ln||Mt!==Sn)&&(r.stencilFunc(fe,ln,Sn),$=fe,nt=ln,Mt=Sn)},setOp:function(fe,ln,Sn){(_t!==fe||qt!==ln||ye!==Sn)&&(r.stencilOp(fe,ln,Sn),_t=fe,qt=ln,ye=Sn)},setLocked:function(fe){B=fe},setClear:function(fe){Fe!==fe&&(r.clearStencil(fe),Fe=fe)},reset:function(){B=!1,vt=null,$=null,nt=null,Mt=null,_t=null,qt=null,ye=null,Fe=null}}}const i=new e,a=new n,o=new s,l=new WeakMap,h=new WeakMap;let u={},d={},f=new WeakMap,c=[],p=null,v=!1,m=null,g=null,b=null,S=null,x=null,T=null,_=null,M=new jt(0,0,0),w=0,y=!1,E=null,A=null,U=null,L=null,F=null;const V=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,Z=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),O=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),O=Z>=2);let it=null,ot={};const et=r.getParameter(r.SCISSOR_BOX),St=r.getParameter(r.VIEWPORT),Dt=new me().fromArray(et),N=new me().fromArray(St);function X(B,vt,$,nt){const Mt=new Uint8Array(4),_t=r.createTexture();r.bindTexture(B,_t),r.texParameteri(B,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(B,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let qt=0;qt<$;qt++)B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY?r.texImage3D(vt,0,r.RGBA,1,1,nt,0,r.RGBA,r.UNSIGNED_BYTE,Mt):r.texImage2D(vt+qt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Mt);return _t}const tt={};tt[r.TEXTURE_2D]=X(r.TEXTURE_2D,r.TEXTURE_2D,1),tt[r.TEXTURE_CUBE_MAP]=X(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[r.TEXTURE_2D_ARRAY]=X(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),tt[r.TEXTURE_3D]=X(r.TEXTURE_3D,r.TEXTURE_3D,1,1),i.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(r.DEPTH_TEST),a.setFunc(Oi),ct(!1),Et(Na),K(r.CULL_FACE),D(Vn);function K(B){u[B]!==!0&&(r.enable(B),u[B]=!0)}function pt(B){u[B]!==!1&&(r.disable(B),u[B]=!1)}function It(B,vt){return d[B]!==vt?(r.bindFramebuffer(B,vt),d[B]=vt,B===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=vt),B===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=vt),!0):!1}function bt(B,vt){let $=c,nt=!1;if(B){$=f.get(vt),$===void 0&&($=[],f.set(vt,$));const Mt=B.textures;if($.length!==Mt.length||$[0]!==r.COLOR_ATTACHMENT0){for(let _t=0,qt=Mt.length;_t<qt;_t++)$[_t]=r.COLOR_ATTACHMENT0+_t;$.length=Mt.length,nt=!0}}else $[0]!==r.BACK&&($[0]=r.BACK,nt=!0);nt&&r.drawBuffers($)}function Wt(B){return p!==B?(r.useProgram(B),p=B,!0):!1}const Q={[ii]:r.FUNC_ADD,[fh]:r.FUNC_SUBTRACT,[dh]:r.FUNC_REVERSE_SUBTRACT};Q[ph]=r.MIN,Q[mh]=r.MAX;const lt={[gh]:r.ZERO,[vh]:r.ONE,[xh]:r.SRC_COLOR,[Mo]:r.SRC_ALPHA,[Eh]:r.SRC_ALPHA_SATURATE,[Sh]:r.DST_COLOR,[yh]:r.DST_ALPHA,[_h]:r.ONE_MINUS_SRC_COLOR,[So]:r.ONE_MINUS_SRC_ALPHA,[wh]:r.ONE_MINUS_DST_COLOR,[Mh]:r.ONE_MINUS_DST_ALPHA,[Th]:r.CONSTANT_COLOR,[bh]:r.ONE_MINUS_CONSTANT_COLOR,[Ah]:r.CONSTANT_ALPHA,[Ch]:r.ONE_MINUS_CONSTANT_ALPHA};function D(B,vt,$,nt,Mt,_t,qt,ye,Fe,fe){if(B===Vn){v===!0&&(pt(r.BLEND),v=!1);return}if(v===!1&&(K(r.BLEND),v=!0),B!==uh){if(B!==m||fe!==y){if((g!==ii||x!==ii)&&(r.blendEquation(r.FUNC_ADD),g=ii,x=ii),fe)switch(B){case Ui:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fa:r.blendFunc(r.ONE,r.ONE);break;case Oa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ba:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Ui:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Fa:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Oa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ba:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}b=null,S=null,T=null,_=null,M.set(0,0,0),w=0,m=B,y=fe}return}Mt=Mt||vt,_t=_t||$,qt=qt||nt,(vt!==g||Mt!==x)&&(r.blendEquationSeparate(Q[vt],Q[Mt]),g=vt,x=Mt),($!==b||nt!==S||_t!==T||qt!==_)&&(r.blendFuncSeparate(lt[$],lt[nt],lt[_t],lt[qt]),b=$,S=nt,T=_t,_=qt),(ye.equals(M)===!1||Fe!==w)&&(r.blendColor(ye.r,ye.g,ye.b,Fe),M.copy(ye),w=Fe),m=B,y=!1}function Ut(B,vt){B.side===Ue?pt(r.CULL_FACE):K(r.CULL_FACE);let $=B.side===Ge;vt&&($=!$),ct($),B.blending===Ui&&B.transparent===!1?D(Vn):D(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),i.setMask(B.colorWrite);const nt=B.stencilWrite;o.setTest(nt),nt&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),kt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?K(r.SAMPLE_ALPHA_TO_COVERAGE):pt(r.SAMPLE_ALPHA_TO_COVERAGE)}function ct(B){E!==B&&(B?r.frontFace(r.CW):r.frontFace(r.CCW),E=B)}function Et(B){B!==ch?(K(r.CULL_FACE),B!==A&&(B===Na?r.cullFace(r.BACK):B===hh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):pt(r.CULL_FACE),A=B}function ft(B){B!==U&&(O&&r.lineWidth(B),U=B)}function kt(B,vt,$){B?(K(r.POLYGON_OFFSET_FILL),(L!==vt||F!==$)&&(r.polygonOffset(vt,$),L=vt,F=$)):pt(r.POLYGON_OFFSET_FILL)}function yt(B){B?K(r.SCISSOR_TEST):pt(r.SCISSOR_TEST)}function I(B){B===void 0&&(B=r.TEXTURE0+V-1),it!==B&&(r.activeTexture(B),it=B)}function C(B,vt,$){$===void 0&&(it===null?$=r.TEXTURE0+V-1:$=it);let nt=ot[$];nt===void 0&&(nt={type:void 0,texture:void 0},ot[$]=nt),(nt.type!==B||nt.texture!==vt)&&(it!==$&&(r.activeTexture($),it=$),r.bindTexture(B,vt||tt[B]),nt.type=B,nt.texture=vt)}function W(){const B=ot[it];B!==void 0&&B.type!==void 0&&(r.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function J(){try{r.compressedTexImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function st(){try{r.compressedTexImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Lt(){try{r.texSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function gt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function wt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ne(){try{r.texStorage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ut(){try{r.texStorage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function At(){try{r.texImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function zt(){try{r.texImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ht(B){Dt.equals(B)===!1&&(r.scissor(B.x,B.y,B.z,B.w),Dt.copy(B))}function Ct(B){N.equals(B)===!1&&(r.viewport(B.x,B.y,B.z,B.w),N.copy(B))}function ie(B,vt){let $=h.get(vt);$===void 0&&($=new WeakMap,h.set(vt,$));let nt=$.get(B);nt===void 0&&(nt=r.getUniformBlockIndex(vt,B.name),$.set(B,nt))}function Kt(B,vt){const nt=h.get(vt).get(B);l.get(vt)!==nt&&(r.uniformBlockBinding(vt,nt,B.__bindingPointIndex),l.set(vt,nt))}function ge(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},it=null,ot={},d={},f=new WeakMap,c=[],p=null,v=!1,m=null,g=null,b=null,S=null,x=null,T=null,_=null,M=new jt(0,0,0),w=0,y=!1,E=null,A=null,U=null,L=null,F=null,Dt.set(0,0,r.canvas.width,r.canvas.height),N.set(0,0,r.canvas.width,r.canvas.height),i.reset(),a.reset(),o.reset()}return{buffers:{color:i,depth:a,stencil:o},enable:K,disable:pt,bindFramebuffer:It,drawBuffers:bt,useProgram:Wt,setBlending:D,setMaterial:Ut,setFlipSided:ct,setCullFace:Et,setLineWidth:ft,setPolygonOffset:kt,setScissorTest:yt,activeTexture:I,bindTexture:C,unbindTexture:W,compressedTexImage2D:J,compressedTexImage3D:st,texImage2D:At,texImage3D:zt,updateUBOMapping:ie,uniformBlockBinding:Kt,texStorage2D:ne,texStorage3D:ut,texSubImage2D:j,texSubImage3D:Lt,compressedTexSubImage2D:gt,compressedTexSubImage3D:wt,scissor:Ht,viewport:Ct,reset:ge}}function j0(r,t,e,n,s,i,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new at,u=new WeakMap;let d;const f=new WeakMap;let c=!1;try{c=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(I,C){return c?new OffscreenCanvas(I,C):pr("canvas")}function v(I,C,W){let J=1;const st=yt(I);if((st.width>W||st.height>W)&&(J=W/Math.max(st.width,st.height)),J<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const j=Math.floor(J*st.width),Lt=Math.floor(J*st.height);d===void 0&&(d=p(j,Lt));const gt=C?p(j,Lt):d;return gt.width=j,gt.height=Lt,gt.getContext("2d").drawImage(I,0,0,j,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+j+"x"+Lt+")."),gt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),I;return I}function m(I){return I.generateMipmaps}function g(I){r.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(I,C,W,J,st=!1){if(I!==null){if(r[I]!==void 0)return r[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let j=C;if(C===r.RED&&(W===r.FLOAT&&(j=r.R32F),W===r.HALF_FLOAT&&(j=r.R16F),W===r.UNSIGNED_BYTE&&(j=r.R8)),C===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.R8UI),W===r.UNSIGNED_SHORT&&(j=r.R16UI),W===r.UNSIGNED_INT&&(j=r.R32UI),W===r.BYTE&&(j=r.R8I),W===r.SHORT&&(j=r.R16I),W===r.INT&&(j=r.R32I)),C===r.RG&&(W===r.FLOAT&&(j=r.RG32F),W===r.HALF_FLOAT&&(j=r.RG16F),W===r.UNSIGNED_BYTE&&(j=r.RG8)),C===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.RG8UI),W===r.UNSIGNED_SHORT&&(j=r.RG16UI),W===r.UNSIGNED_INT&&(j=r.RG32UI),W===r.BYTE&&(j=r.RG8I),W===r.SHORT&&(j=r.RG16I),W===r.INT&&(j=r.RG32I)),C===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.RGB8UI),W===r.UNSIGNED_SHORT&&(j=r.RGB16UI),W===r.UNSIGNED_INT&&(j=r.RGB32UI),W===r.BYTE&&(j=r.RGB8I),W===r.SHORT&&(j=r.RGB16I),W===r.INT&&(j=r.RGB32I)),C===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),W===r.UNSIGNED_INT&&(j=r.RGBA32UI),W===r.BYTE&&(j=r.RGBA8I),W===r.SHORT&&(j=r.RGBA16I),W===r.INT&&(j=r.RGBA32I)),C===r.RGB&&W===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),C===r.RGBA){const Lt=st?fr:le.getTransfer(J);W===r.FLOAT&&(j=r.RGBA32F),W===r.HALF_FLOAT&&(j=r.RGBA16F),W===r.UNSIGNED_BYTE&&(j=Lt===pe?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(I,C){let W;return I?C===null||C===li||C===ki?W=r.DEPTH24_STENCIL8:C===xn?W=r.DEPTH32F_STENCIL8:C===hs&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===li||C===ki?W=r.DEPTH_COMPONENT24:C===xn?W=r.DEPTH_COMPONENT32F:C===hs&&(W=r.DEPTH_COMPONENT16),W}function T(I,C){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Je&&I.minFilter!==vn?Math.log2(Math.max(C.width,C.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?C.mipmaps.length:1}function _(I){const C=I.target;C.removeEventListener("dispose",_),w(C),C.isVideoTexture&&u.delete(C)}function M(I){const C=I.target;C.removeEventListener("dispose",M),E(C)}function w(I){const C=n.get(I);if(C.__webglInit===void 0)return;const W=I.source,J=f.get(W);if(J){const st=J[C.__cacheKey];st.usedTimes--,st.usedTimes===0&&y(I),Object.keys(J).length===0&&f.delete(W)}n.remove(I)}function y(I){const C=n.get(I);r.deleteTexture(C.__webglTexture);const W=I.source,J=f.get(W);delete J[C.__cacheKey],a.memory.textures--}function E(I){const C=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(C.__webglFramebuffer[J]))for(let st=0;st<C.__webglFramebuffer[J].length;st++)r.deleteFramebuffer(C.__webglFramebuffer[J][st]);else r.deleteFramebuffer(C.__webglFramebuffer[J]);C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer[J])}else{if(Array.isArray(C.__webglFramebuffer))for(let J=0;J<C.__webglFramebuffer.length;J++)r.deleteFramebuffer(C.__webglFramebuffer[J]);else r.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&r.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let J=0;J<C.__webglColorRenderbuffer.length;J++)C.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(C.__webglColorRenderbuffer[J]);C.__webglDepthRenderbuffer&&r.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const W=I.textures;for(let J=0,st=W.length;J<st;J++){const j=n.get(W[J]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(W[J])}n.remove(I)}let A=0;function U(){A=0}function L(){const I=A;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),A+=1,I}function F(I){const C=[];return C.push(I.wrapS),C.push(I.wrapT),C.push(I.wrapR||0),C.push(I.magFilter),C.push(I.minFilter),C.push(I.anisotropy),C.push(I.internalFormat),C.push(I.format),C.push(I.type),C.push(I.generateMipmaps),C.push(I.premultiplyAlpha),C.push(I.flipY),C.push(I.unpackAlignment),C.push(I.colorSpace),C.join()}function V(I,C){const W=n.get(I);if(I.isVideoTexture&&ft(I),I.isRenderTargetTexture===!1&&I.version>0&&W.__version!==I.version){const J=I.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(W,I,C);return}}e.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+C)}function O(I,C){const W=n.get(I);if(I.version>0&&W.__version!==I.version){N(W,I,C);return}e.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+C)}function Z(I,C){const W=n.get(I);if(I.version>0&&W.__version!==I.version){N(W,I,C);return}e.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+C)}function G(I,C){const W=n.get(I);if(I.version>0&&W.__version!==I.version){X(W,I,C);return}e.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+C)}const it={[ur]:r.REPEAT,[ri]:r.CLAMP_TO_EDGE,[Lo]:r.MIRRORED_REPEAT},ot={[Je]:r.NEAREST,[Oh]:r.NEAREST_MIPMAP_NEAREST,[Es]:r.NEAREST_MIPMAP_LINEAR,[vn]:r.LINEAR,[Rr]:r.LINEAR_MIPMAP_NEAREST,[oi]:r.LINEAR_MIPMAP_LINEAR},et={[Vh]:r.NEVER,[qh]:r.ALWAYS,[Hh]:r.LESS,[Mc]:r.LEQUAL,[Gh]:r.EQUAL,[Yh]:r.GEQUAL,[Wh]:r.GREATER,[Xh]:r.NOTEQUAL};function St(I,C){if(C.type===xn&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===vn||C.magFilter===Rr||C.magFilter===Es||C.magFilter===oi||C.minFilter===vn||C.minFilter===Rr||C.minFilter===Es||C.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,it[C.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,it[C.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,it[C.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,ot[C.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,ot[C.minFilter]),C.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,et[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Je||C.minFilter!==Es&&C.minFilter!==oi||C.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");r.texParameterf(I,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function Dt(I,C){let W=!1;I.__webglInit===void 0&&(I.__webglInit=!0,C.addEventListener("dispose",_));const J=C.source;let st=f.get(J);st===void 0&&(st={},f.set(J,st));const j=F(C);if(j!==I.__cacheKey){st[j]===void 0&&(st[j]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,W=!0),st[j].usedTimes++;const Lt=st[I.__cacheKey];Lt!==void 0&&(st[I.__cacheKey].usedTimes--,Lt.usedTimes===0&&y(C)),I.__cacheKey=j,I.__webglTexture=st[j].texture}return W}function N(I,C,W){let J=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(J=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(J=r.TEXTURE_3D);const st=Dt(I,C),j=C.source;e.bindTexture(J,I.__webglTexture,r.TEXTURE0+W);const Lt=n.get(j);if(j.version!==Lt.__version||st===!0){e.activeTexture(r.TEXTURE0+W);const gt=le.getPrimaries(le.workingColorSpace),wt=C.colorSpace===Rn?null:le.getPrimaries(C.colorSpace),ne=C.colorSpace===Rn||gt===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let ut=v(C.image,!1,s.maxTextureSize);ut=kt(C,ut);const At=i.convert(C.format,C.colorSpace),zt=i.convert(C.type);let Ht=S(C.internalFormat,At,zt,C.colorSpace,C.isVideoTexture);St(J,C);let Ct;const ie=C.mipmaps,Kt=C.isVideoTexture!==!0,ge=Lt.__version===void 0||st===!0,B=j.dataReady,vt=T(C,ut);if(C.isDepthTexture)Ht=x(C.format===Vi,C.type),ge&&(Kt?e.texStorage2D(r.TEXTURE_2D,1,Ht,ut.width,ut.height):e.texImage2D(r.TEXTURE_2D,0,Ht,ut.width,ut.height,0,At,zt,null));else if(C.isDataTexture)if(ie.length>0){Kt&&ge&&e.texStorage2D(r.TEXTURE_2D,vt,Ht,ie[0].width,ie[0].height);for(let $=0,nt=ie.length;$<nt;$++)Ct=ie[$],Kt?B&&e.texSubImage2D(r.TEXTURE_2D,$,0,0,Ct.width,Ct.height,At,zt,Ct.data):e.texImage2D(r.TEXTURE_2D,$,Ht,Ct.width,Ct.height,0,At,zt,Ct.data);C.generateMipmaps=!1}else Kt?(ge&&e.texStorage2D(r.TEXTURE_2D,vt,Ht,ut.width,ut.height),B&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ut.width,ut.height,At,zt,ut.data)):e.texImage2D(r.TEXTURE_2D,0,Ht,ut.width,ut.height,0,At,zt,ut.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Kt&&ge&&e.texStorage3D(r.TEXTURE_2D_ARRAY,vt,Ht,ie[0].width,ie[0].height,ut.depth);for(let $=0,nt=ie.length;$<nt;$++)if(Ct=ie[$],C.format!==mn)if(At!==null)if(Kt){if(B)if(C.layerUpdates.size>0){const Mt=Ml(Ct.width,Ct.height,C.format,C.type);for(const _t of C.layerUpdates){const qt=Ct.data.subarray(_t*Mt/Ct.data.BYTES_PER_ELEMENT,(_t+1)*Mt/Ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,_t,Ct.width,Ct.height,1,At,qt)}C.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,Ct.width,Ct.height,ut.depth,At,Ct.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,$,Ht,Ct.width,Ct.height,ut.depth,0,Ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?B&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,$,0,0,0,Ct.width,Ct.height,ut.depth,At,zt,Ct.data):e.texImage3D(r.TEXTURE_2D_ARRAY,$,Ht,Ct.width,Ct.height,ut.depth,0,At,zt,Ct.data)}else{Kt&&ge&&e.texStorage2D(r.TEXTURE_2D,vt,Ht,ie[0].width,ie[0].height);for(let $=0,nt=ie.length;$<nt;$++)Ct=ie[$],C.format!==mn?At!==null?Kt?B&&e.compressedTexSubImage2D(r.TEXTURE_2D,$,0,0,Ct.width,Ct.height,At,Ct.data):e.compressedTexImage2D(r.TEXTURE_2D,$,Ht,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?B&&e.texSubImage2D(r.TEXTURE_2D,$,0,0,Ct.width,Ct.height,At,zt,Ct.data):e.texImage2D(r.TEXTURE_2D,$,Ht,Ct.width,Ct.height,0,At,zt,Ct.data)}else if(C.isDataArrayTexture)if(Kt){if(ge&&e.texStorage3D(r.TEXTURE_2D_ARRAY,vt,Ht,ut.width,ut.height,ut.depth),B)if(C.layerUpdates.size>0){const $=Ml(ut.width,ut.height,C.format,C.type);for(const nt of C.layerUpdates){const Mt=ut.data.subarray(nt*$/ut.data.BYTES_PER_ELEMENT,(nt+1)*$/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,nt,ut.width,ut.height,1,At,zt,Mt)}C.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,At,zt,ut.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Ht,ut.width,ut.height,ut.depth,0,At,zt,ut.data);else if(C.isData3DTexture)Kt?(ge&&e.texStorage3D(r.TEXTURE_3D,vt,Ht,ut.width,ut.height,ut.depth),B&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,At,zt,ut.data)):e.texImage3D(r.TEXTURE_3D,0,Ht,ut.width,ut.height,ut.depth,0,At,zt,ut.data);else if(C.isFramebufferTexture){if(ge)if(Kt)e.texStorage2D(r.TEXTURE_2D,vt,Ht,ut.width,ut.height);else{let $=ut.width,nt=ut.height;for(let Mt=0;Mt<vt;Mt++)e.texImage2D(r.TEXTURE_2D,Mt,Ht,$,nt,0,At,zt,null),$>>=1,nt>>=1}}else if(ie.length>0){if(Kt&&ge){const $=yt(ie[0]);e.texStorage2D(r.TEXTURE_2D,vt,Ht,$.width,$.height)}for(let $=0,nt=ie.length;$<nt;$++)Ct=ie[$],Kt?B&&e.texSubImage2D(r.TEXTURE_2D,$,0,0,At,zt,Ct):e.texImage2D(r.TEXTURE_2D,$,Ht,At,zt,Ct);C.generateMipmaps=!1}else if(Kt){if(ge){const $=yt(ut);e.texStorage2D(r.TEXTURE_2D,vt,Ht,$.width,$.height)}B&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,At,zt,ut)}else e.texImage2D(r.TEXTURE_2D,0,Ht,At,zt,ut);m(C)&&g(J),Lt.__version=j.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function X(I,C,W){if(C.image.length!==6)return;const J=Dt(I,C),st=C.source;e.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+W);const j=n.get(st);if(st.version!==j.__version||J===!0){e.activeTexture(r.TEXTURE0+W);const Lt=le.getPrimaries(le.workingColorSpace),gt=C.colorSpace===Rn?null:le.getPrimaries(C.colorSpace),wt=C.colorSpace===Rn||Lt===gt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const ne=C.isCompressedTexture||C.image[0].isCompressedTexture,ut=C.image[0]&&C.image[0].isDataTexture,At=[];for(let nt=0;nt<6;nt++)!ne&&!ut?At[nt]=v(C.image[nt],!0,s.maxCubemapSize):At[nt]=ut?C.image[nt].image:C.image[nt],At[nt]=kt(C,At[nt]);const zt=At[0],Ht=i.convert(C.format,C.colorSpace),Ct=i.convert(C.type),ie=S(C.internalFormat,Ht,Ct,C.colorSpace),Kt=C.isVideoTexture!==!0,ge=j.__version===void 0||J===!0,B=st.dataReady;let vt=T(C,zt);St(r.TEXTURE_CUBE_MAP,C);let $;if(ne){Kt&&ge&&e.texStorage2D(r.TEXTURE_CUBE_MAP,vt,ie,zt.width,zt.height);for(let nt=0;nt<6;nt++){$=At[nt].mipmaps;for(let Mt=0;Mt<$.length;Mt++){const _t=$[Mt];C.format!==mn?Ht!==null?Kt?B&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,0,0,_t.width,_t.height,Ht,_t.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,ie,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,0,0,_t.width,_t.height,Ht,Ct,_t.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,ie,_t.width,_t.height,0,Ht,Ct,_t.data)}}}else{if($=C.mipmaps,Kt&&ge){$.length>0&&vt++;const nt=yt(At[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,vt,ie,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(ut){Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,At[nt].width,At[nt].height,Ht,Ct,At[nt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ie,At[nt].width,At[nt].height,0,Ht,Ct,At[nt].data);for(let Mt=0;Mt<$.length;Mt++){const qt=$[Mt].image[nt].image;Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,0,0,qt.width,qt.height,Ht,Ct,qt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,ie,qt.width,qt.height,0,Ht,Ct,qt.data)}}else{Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Ht,Ct,At[nt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ie,Ht,Ct,At[nt]);for(let Mt=0;Mt<$.length;Mt++){const _t=$[Mt];Kt?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,0,0,Ht,Ct,_t.image[nt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,ie,Ht,Ct,_t.image[nt])}}}m(C)&&g(r.TEXTURE_CUBE_MAP),j.__version=st.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function tt(I,C,W,J,st,j){const Lt=i.convert(W.format,W.colorSpace),gt=i.convert(W.type),wt=S(W.internalFormat,Lt,gt,W.colorSpace),ne=n.get(C),ut=n.get(W);if(ut.__renderTarget=C,!ne.__hasExternalTextures){const At=Math.max(1,C.width>>j),zt=Math.max(1,C.height>>j);st===r.TEXTURE_3D||st===r.TEXTURE_2D_ARRAY?e.texImage3D(st,j,wt,At,zt,C.depth,0,Lt,gt,null):e.texImage2D(st,j,wt,At,zt,0,Lt,gt,null)}e.bindFramebuffer(r.FRAMEBUFFER,I),Et(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,st,ut.__webglTexture,0,ct(C)):(st===r.TEXTURE_2D||st>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,J,st,ut.__webglTexture,j),e.bindFramebuffer(r.FRAMEBUFFER,null)}function K(I,C,W){if(r.bindRenderbuffer(r.RENDERBUFFER,I),C.depthBuffer){const J=C.depthTexture,st=J&&J.isDepthTexture?J.type:null,j=x(C.stencilBuffer,st),Lt=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=ct(C);Et(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,gt,j,C.width,C.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,gt,j,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,j,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Lt,r.RENDERBUFFER,I)}else{const J=C.textures;for(let st=0;st<J.length;st++){const j=J[st],Lt=i.convert(j.format,j.colorSpace),gt=i.convert(j.type),wt=S(j.internalFormat,Lt,gt,j.colorSpace),ne=ct(C);W&&Et(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ne,wt,C.width,C.height):Et(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ne,wt,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,wt,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function pt(I,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,I),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(C.depthTexture);J.__renderTarget=C,(!J.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),V(C.depthTexture,0);const st=J.__webglTexture,j=ct(C);if(C.depthTexture.format===Ni)Et(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,st,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,st,0);else if(C.depthTexture.format===Vi)Et(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,st,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function It(I){const C=n.get(I),W=I.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==I.depthTexture){const J=I.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),J){const st=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,J.removeEventListener("dispose",st)};J.addEventListener("dispose",st),C.__depthDisposeCallback=st}C.__boundDepthTexture=J}if(I.depthTexture&&!C.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");pt(C.__webglFramebuffer,I)}else if(W){C.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[J]),C.__webglDepthbuffer[J]===void 0)C.__webglDepthbuffer[J]=r.createRenderbuffer(),K(C.__webglDepthbuffer[J],I,!1);else{const st=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=C.__webglDepthbuffer[J];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,st,r.RENDERBUFFER,j)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),K(C.__webglDepthbuffer,I,!1);else{const J=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,st=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,st),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,st)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function bt(I,C,W){const J=n.get(I);C!==void 0&&tt(J.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&It(I)}function Wt(I){const C=I.texture,W=n.get(I),J=n.get(C);I.addEventListener("dispose",M);const st=I.textures,j=I.isWebGLCubeRenderTarget===!0,Lt=st.length>1;if(Lt||(J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture()),J.__version=C.version,a.memory.textures++),j){W.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(C.mipmaps&&C.mipmaps.length>0){W.__webglFramebuffer[gt]=[];for(let wt=0;wt<C.mipmaps.length;wt++)W.__webglFramebuffer[gt][wt]=r.createFramebuffer()}else W.__webglFramebuffer[gt]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){W.__webglFramebuffer=[];for(let gt=0;gt<C.mipmaps.length;gt++)W.__webglFramebuffer[gt]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(Lt)for(let gt=0,wt=st.length;gt<wt;gt++){const ne=n.get(st[gt]);ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture(),a.memory.textures++)}if(I.samples>0&&Et(I)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let gt=0;gt<st.length;gt++){const wt=st[gt];W.__webglColorRenderbuffer[gt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[gt]);const ne=i.convert(wt.format,wt.colorSpace),ut=i.convert(wt.type),At=S(wt.internalFormat,ne,ut,wt.colorSpace,I.isXRRenderTarget===!0),zt=ct(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,zt,At,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+gt,r.RENDERBUFFER,W.__webglColorRenderbuffer[gt])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),K(W.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){e.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture),St(r.TEXTURE_CUBE_MAP,C);for(let gt=0;gt<6;gt++)if(C.mipmaps&&C.mipmaps.length>0)for(let wt=0;wt<C.mipmaps.length;wt++)tt(W.__webglFramebuffer[gt][wt],I,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt);else tt(W.__webglFramebuffer[gt],I,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);m(C)&&g(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let gt=0,wt=st.length;gt<wt;gt++){const ne=st[gt],ut=n.get(ne);e.bindTexture(r.TEXTURE_2D,ut.__webglTexture),St(r.TEXTURE_2D,ne),tt(W.__webglFramebuffer,I,ne,r.COLOR_ATTACHMENT0+gt,r.TEXTURE_2D,0),m(ne)&&g(r.TEXTURE_2D)}e.unbindTexture()}else{let gt=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(gt=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(gt,J.__webglTexture),St(gt,C),C.mipmaps&&C.mipmaps.length>0)for(let wt=0;wt<C.mipmaps.length;wt++)tt(W.__webglFramebuffer[wt],I,C,r.COLOR_ATTACHMENT0,gt,wt);else tt(W.__webglFramebuffer,I,C,r.COLOR_ATTACHMENT0,gt,0);m(C)&&g(gt),e.unbindTexture()}I.depthBuffer&&It(I)}function Q(I){const C=I.textures;for(let W=0,J=C.length;W<J;W++){const st=C[W];if(m(st)){const j=b(I),Lt=n.get(st).__webglTexture;e.bindTexture(j,Lt),g(j),e.unbindTexture()}}}const lt=[],D=[];function Ut(I){if(I.samples>0){if(Et(I)===!1){const C=I.textures,W=I.width,J=I.height;let st=r.COLOR_BUFFER_BIT;const j=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=n.get(I),gt=C.length>1;if(gt)for(let wt=0;wt<C.length;wt++)e.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let wt=0;wt<C.length;wt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(st|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(st|=r.STENCIL_BUFFER_BIT)),gt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Lt.__webglColorRenderbuffer[wt]);const ne=n.get(C[wt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ne,0)}r.blitFramebuffer(0,0,W,J,0,0,W,J,st,r.NEAREST),l===!0&&(lt.length=0,D.length=0,lt.push(r.COLOR_ATTACHMENT0+wt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(lt.push(j),D.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,D)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,lt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),gt)for(let wt=0;wt<C.length;wt++){e.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.RENDERBUFFER,Lt.__webglColorRenderbuffer[wt]);const ne=n.get(C[wt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,Lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+wt,r.TEXTURE_2D,ne,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const C=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}}function ct(I){return Math.min(s.maxSamples,I.samples)}function Et(I){const C=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function ft(I){const C=a.render.frame;u.get(I)!==C&&(u.set(I,C),I.update())}function kt(I,C){const W=I.colorSpace,J=I.format,st=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||W!==Hi&&W!==Rn&&(le.getTransfer(W)===pe?(J!==mn||st!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),C}function yt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(h.width=I.naturalWidth||I.width,h.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(h.width=I.displayWidth,h.height=I.displayHeight):(h.width=I.width,h.height=I.height),h}this.allocateTextureUnit=L,this.resetTextureUnits=U,this.setTexture2D=V,this.setTexture2DArray=O,this.setTexture3D=Z,this.setTextureCube=G,this.rebindTextures=bt,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=Et}function Q0(r,t){function e(n,s=Rn){let i;const a=le.getTransfer(s);if(n===Dn)return r.UNSIGNED_BYTE;if(n===ua)return r.UNSIGNED_SHORT_4_4_4_4;if(n===fa)return r.UNSIGNED_SHORT_5_5_5_1;if(n===dc)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===uc)return r.BYTE;if(n===fc)return r.SHORT;if(n===hs)return r.UNSIGNED_SHORT;if(n===ha)return r.INT;if(n===li)return r.UNSIGNED_INT;if(n===xn)return r.FLOAT;if(n===ms)return r.HALF_FLOAT;if(n===pc)return r.ALPHA;if(n===mc)return r.RGB;if(n===mn)return r.RGBA;if(n===gc)return r.LUMINANCE;if(n===vc)return r.LUMINANCE_ALPHA;if(n===Ni)return r.DEPTH_COMPONENT;if(n===Vi)return r.DEPTH_STENCIL;if(n===da)return r.RED;if(n===pa)return r.RED_INTEGER;if(n===xc)return r.RG;if(n===ma)return r.RG_INTEGER;if(n===ga)return r.RGBA_INTEGER;if(n===ir||n===sr||n===rr||n===or)if(a===pe)if(i=t.get("WEBGL_compressed_texture_s3tc_srgb"),i!==null){if(n===ir)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===sr)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===rr)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===or)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get("WEBGL_compressed_texture_s3tc"),i!==null){if(n===ir)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===sr)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===rr)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===or)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Do||n===Uo||n===No||n===Fo)if(i=t.get("WEBGL_compressed_texture_pvrtc"),i!==null){if(n===Do)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Uo)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===No)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fo)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oo||n===Bo||n===zo)if(i=t.get("WEBGL_compressed_texture_etc"),i!==null){if(n===Oo||n===Bo)return a===pe?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===zo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ko||n===Vo||n===Ho||n===Go||n===Wo||n===Xo||n===Yo||n===qo||n===Zo||n===$o||n===Ko||n===Jo||n===jo||n===Qo)if(i=t.get("WEBGL_compressed_texture_astc"),i!==null){if(n===ko)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ho)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Go)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Yo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$o)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ko)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Jo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qo)return a===pe?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ar||n===ta||n===ea)if(i=t.get("EXT_texture_compression_bptc"),i!==null){if(n===ar)return a===pe?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ta)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ea)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_c||n===na||n===ia||n===sa)if(i=t.get("EXT_texture_compression_rgtc"),i!==null){if(n===ar)return i.COMPRESSED_RED_RGTC1_EXT;if(n===na)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ia)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sa)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ki?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}const tg={type:"move"};class lo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new de,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new de,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new de,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,i=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),g=this._getHandJoint(h,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const u=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],f=u.position.distanceTo(d.position),c=.02,p=.005;h.inputState.pinching&&f>c+p?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&f<=c-p&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(i=e.getPose(t.gripSpace,n),i!==null&&(l.matrix.fromArray(i.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,i.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(i.linearVelocity)):l.hasLinearVelocity=!1,i.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(i.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&i!==null&&(s=i),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=i!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new de;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const eg=`
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

}`;class ig{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new ze,i=t.properties.get(s);i.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Xn({vertexShader:eg,fragmentShader:ng,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Nt(new ve(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sg extends Xi{constructor(t,e){super();const n=this;let s=null,i=1,a=null,o="local-floor",l=1,h=null,u=null,d=null,f=null,c=null,p=null;const v=new ig,m=e.getContextAttributes();let g=null,b=null;const S=[],x=[],T=new at;let _=null;const M=new Ke;M.viewport=new me;const w=new Ke;w.viewport=new me;const y=[M,w],E=new wf;let A=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let X=S[N];return X===void 0&&(X=new lo,S[N]=X),X.getTargetRaySpace()},this.getControllerGrip=function(N){let X=S[N];return X===void 0&&(X=new lo,S[N]=X),X.getGripSpace()},this.getHand=function(N){let X=S[N];return X===void 0&&(X=new lo,S[N]=X),X.getHandSpace()};function L(N){const X=x.indexOf(N.inputSource);if(X===-1)return;const tt=S[X];tt!==void 0&&(tt.update(N.inputSource,N.frame,h||a),tt.dispatchEvent({type:N.type,data:N.inputSource}))}function F(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",V);for(let N=0;N<S.length;N++){const X=x[N];X!==null&&(x[N]=null,S[N].disconnect(X))}A=null,U=null,v.reset(),t.setRenderTarget(g),c=null,f=null,d=null,s=null,b=null,Dt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){i=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){o=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(N){h=N},this.getBaseLayer=function(){return f!==null?f:c},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(N){if(s=N,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",F),s.addEventListener("inputsourceschange",V),m.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){const X={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:i};c=new XRWebGLLayer(s,e,X),s.updateRenderState({baseLayer:c}),t.setPixelRatio(1),t.setSize(c.framebufferWidth,c.framebufferHeight,!1),b=new ci(c.framebufferWidth,c.framebufferHeight,{format:mn,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let X=null,tt=null,K=null;m.depth&&(K=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,X=m.stencil?Vi:Ni,tt=m.stencil?ki:li);const pt={colorFormat:e.RGBA8,depthFormat:K,scaleFactor:i};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(pt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new ci(f.textureWidth,f.textureHeight,{format:mn,type:Dn,depthTexture:new Dc(f.textureWidth,f.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await s.requestReferenceSpace(o),Dt.setContext(s),Dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function V(N){for(let X=0;X<N.removed.length;X++){const tt=N.removed[X],K=x.indexOf(tt);K>=0&&(x[K]=null,S[K].disconnect(tt))}for(let X=0;X<N.added.length;X++){const tt=N.added[X];let K=x.indexOf(tt);if(K===-1){for(let It=0;It<S.length;It++)if(It>=x.length){x.push(tt),K=It;break}else if(x[It]===null){x[It]=tt,K=It;break}if(K===-1)break}const pt=S[K];pt&&pt.connect(tt)}}const O=new P,Z=new P;function G(N,X,tt){O.setFromMatrixPosition(X.matrixWorld),Z.setFromMatrixPosition(tt.matrixWorld);const K=O.distanceTo(Z),pt=X.projectionMatrix.elements,It=tt.projectionMatrix.elements,bt=pt[14]/(pt[10]-1),Wt=pt[14]/(pt[10]+1),Q=(pt[9]+1)/pt[5],lt=(pt[9]-1)/pt[5],D=(pt[8]-1)/pt[0],Ut=(It[8]+1)/It[0],ct=bt*D,Et=bt*Ut,ft=K/(-D+Ut),kt=ft*-D;if(X.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(kt),N.translateZ(ft),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),pt[10]===-1)N.projectionMatrix.copy(X.projectionMatrix),N.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const yt=bt+ft,I=Wt+ft,C=ct-kt,W=Et+(K-kt),J=Q*Wt/I*yt,st=lt*Wt/I*yt;N.projectionMatrix.makePerspective(C,W,J,st,yt,I),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function it(N,X){X===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(X.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(s===null)return;let X=N.near,tt=N.far;v.texture!==null&&(v.depthNear>0&&(X=v.depthNear),v.depthFar>0&&(tt=v.depthFar)),E.near=w.near=M.near=X,E.far=w.far=M.far=tt,(A!==E.near||U!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),A=E.near,U=E.far),M.layers.mask=N.layers.mask|2,w.layers.mask=N.layers.mask|4,E.layers.mask=M.layers.mask|w.layers.mask;const K=N.parent,pt=E.cameras;it(E,K);for(let It=0;It<pt.length;It++)it(pt[It],K);pt.length===2?G(E,M,w):E.projectionMatrix.copy(M.projectionMatrix),ot(N,E,K)};function ot(N,X,tt){tt===null?N.matrix.copy(X.matrixWorld):(N.matrix.copy(tt.matrixWorld),N.matrix.invert(),N.matrix.multiply(X.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(X.projectionMatrix),N.projectionMatrixInverse.copy(X.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=us*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(f===null&&c===null))return l},this.setFoveation=function(N){l=N,f!==null&&(f.fixedFoveation=N),c!==null&&c.fixedFoveation!==void 0&&(c.fixedFoveation=N)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(E)};let et=null;function St(N,X){if(u=X.getViewerPose(h||a),p=X,u!==null){const tt=u.views;c!==null&&(t.setRenderTargetFramebuffer(b,c.framebuffer),t.setRenderTarget(b));let K=!1;tt.length!==E.cameras.length&&(E.cameras.length=0,K=!0);for(let It=0;It<tt.length;It++){const bt=tt[It];let Wt=null;if(c!==null)Wt=c.getViewport(bt);else{const lt=d.getViewSubImage(f,bt);Wt=lt.viewport,It===0&&(t.setRenderTargetTextures(b,lt.colorTexture,f.ignoreDepthValues?void 0:lt.depthStencilTexture),t.setRenderTarget(b))}let Q=y[It];Q===void 0&&(Q=new Ke,Q.layers.enable(It),Q.viewport=new me,y[It]=Q),Q.matrix.fromArray(bt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(bt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Wt.x,Wt.y,Wt.width,Wt.height),It===0&&(E.matrix.copy(Q.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),K===!0&&E.cameras.push(Q)}const pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")){const It=d.getDepthInformation(tt[0]);It&&It.isValid&&It.texture&&v.init(t,It,s.renderState)}}for(let tt=0;tt<S.length;tt++){const K=x[tt],pt=S[tt];K!==null&&pt!==void 0&&pt.update(K,X,h||a)}et&&et(N,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),p=null}const Dt=new Yc;Dt.setAnimationLoop(St),this.setAnimationLoop=function(N){et=N},this.dispose=function(){}}}const ti=new yn,rg=new Qt;function og(r,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Rc(r)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,b,S,x){g.isMeshBasicMaterial||g.isMeshLambertMaterial?i(m,g):g.isMeshToonMaterial?(i(m,g),d(m,g)):g.isMeshPhongMaterial?(i(m,g),u(m,g)):g.isMeshStandardMaterial?(i(m,g),f(m,g),g.isMeshPhysicalMaterial&&c(m,g,x)):g.isMeshMatcapMaterial?(i(m,g),p(m,g)):g.isMeshDepthMaterial?i(m,g):g.isMeshDistanceMaterial?(i(m,g),v(m,g)):g.isMeshNormalMaterial?i(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,b,S):g.isSpriteMaterial?h(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function i(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Ge&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Ge&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const b=t.get(g),S=b.envMap,x=b.envMapRotation;S&&(m.envMap.value=S,ti.copy(x),ti.x*=-1,ti.y*=-1,ti.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),m.envMapRotation.value.setFromMatrix4(rg.makeRotationFromEuler(ti)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,b,S){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*b,m.scale.value=S*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function u(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function d(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function c(m,g,b){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Ge&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){const b=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ag(r,t,e,n){let s={},i={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const x=S.program;n.uniformBlockBinding(b,x)}function h(b,S){let x=s[b.id];x===void 0&&(p(b),x=u(b),s[b.id]=x,b.addEventListener("dispose",m));const T=S.program;n.updateUBOMapping(b,T);const _=t.render.frame;i[b.id]!==_&&(f(b),i[b.id]=_)}function u(b){const S=d();b.__bindingPointIndex=S;const x=r.createBuffer(),T=b.__size,_=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,T,_),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,x),x}function d(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=s[b.id],x=b.uniforms,T=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let _=0,M=x.length;_<M;_++){const w=Array.isArray(x[_])?x[_]:[x[_]];for(let y=0,E=w.length;y<E;y++){const A=w[y];if(c(A,_,y,T)===!0){const U=A.__offset,L=Array.isArray(A.value)?A.value:[A.value];let F=0;for(let V=0;V<L.length;V++){const O=L[V],Z=v(O);typeof O=="number"||typeof O=="boolean"?(A.__data[0]=O,r.bufferSubData(r.UNIFORM_BUFFER,U+F,A.__data)):O.isMatrix3?(A.__data[0]=O.elements[0],A.__data[1]=O.elements[1],A.__data[2]=O.elements[2],A.__data[3]=0,A.__data[4]=O.elements[3],A.__data[5]=O.elements[4],A.__data[6]=O.elements[5],A.__data[7]=0,A.__data[8]=O.elements[6],A.__data[9]=O.elements[7],A.__data[10]=O.elements[8],A.__data[11]=0):(O.toArray(A.__data,F),F+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,A.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function c(b,S,x,T){const _=b.value,M=S+"_"+x;if(T[M]===void 0)return typeof _=="number"||typeof _=="boolean"?T[M]=_:T[M]=_.clone(),!0;{const w=T[M];if(typeof _=="number"||typeof _=="boolean"){if(w!==_)return T[M]=_,!0}else if(w.equals(_)===!1)return w.copy(_),!0}return!1}function p(b){const S=b.uniforms;let x=0;const T=16;for(let M=0,w=S.length;M<w;M++){const y=Array.isArray(S[M])?S[M]:[S[M]];for(let E=0,A=y.length;E<A;E++){const U=y[E],L=Array.isArray(U.value)?U.value:[U.value];for(let F=0,V=L.length;F<V;F++){const O=L[F],Z=v(O),G=x%T,it=G%Z.boundary,ot=G+it;x+=it,ot!==0&&T-ot<Z.storage&&(x+=T-ot),U.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=Z.storage}}}const _=x%T;return _>0&&(x+=T-_),b.__size=x,b.__cache={},this}function v(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const x=a.indexOf(S.__bindingPointIndex);a.splice(x,1),r.deleteBuffer(s[S.id]),delete s[S.id],delete i[S.id]}function g(){for(const b in s)r.deleteBuffer(s[b]);a=[],s={},i={}}return{bind:l,update:h,dispose:g}}class lg{constructor(t={}){const{canvas:e=hu(),context:n=null,depth:s=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let c;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");c=n.getContextAttributes().alpha}else c=a;const p=new Uint32Array(4),v=new Int32Array(4);let m=null,g=null;const b=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=De,this.toneMapping=Hn,this.toneMappingExposure=1;const x=this;let T=!1,_=0,M=0,w=null,y=-1,E=null;const A=new me,U=new me;let L=null;const F=new jt(0);let V=0,O=e.width,Z=e.height,G=1,it=null,ot=null;const et=new me(0,0,O,Z),St=new me(0,0,O,Z);let Dt=!1;const N=new ya;let X=!1,tt=!1;const K=new Qt,pt=new Qt,It=new P,bt=new me,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function lt(){return w===null?G:1}let D=n;function Ut(R,k){return e.getContext(R,k)}try{const R={alpha:!0,depth:s,stencil:i,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${vr}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",_t,!1),D===null){const k="webgl2";if(D=Ut(k,R),D===null)throw Ut(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ct,Et,ft,kt,yt,I,C,W,J,st,j,Lt,gt,wt,ne,ut,At,zt,Ht,Ct,ie,Kt,ge,B;function vt(){ct=new vm(D),ct.init(),Kt=new Q0(D,ct),Et=new um(D,ct,t,Kt),ft=new J0(D,ct),Et.reverseDepthBuffer&&f&&ft.buffers.depth.setReversed(!0),kt=new ym(D),yt=new B0,I=new j0(D,ct,ft,yt,Et,Kt,kt),C=new dm(x),W=new gm(x),J=new Af(D),ge=new cm(D,J),st=new xm(D,J,kt,ge),j=new Sm(D,st,J,kt),Ht=new Mm(D,Et,I),ut=new fm(yt),Lt=new O0(x,C,W,ct,Et,ge,ut),gt=new og(x,yt),wt=new k0,ne=new Y0(ct),zt=new lm(x,C,W,ft,j,c,l),At=new $0(x,j,Et),B=new ag(D,kt,Et,ft),Ct=new hm(D,ct,kt),ie=new _m(D,ct,kt),kt.programs=Lt.programs,x.capabilities=Et,x.extensions=ct,x.properties=yt,x.renderLists=wt,x.shadowMap=At,x.state=ft,x.info=kt}vt();const $=new sg(x,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const R=ct.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ct.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(R){R!==void 0&&(G=R,this.setSize(O,Z,!1))},this.getSize=function(R){return R.set(O,Z)},this.setSize=function(R,k,Y=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=R,Z=k,e.width=Math.floor(R*G),e.height=Math.floor(k*G),Y===!0&&(e.style.width=R+"px",e.style.height=k+"px"),this.setViewport(0,0,R,k)},this.getDrawingBufferSize=function(R){return R.set(O*G,Z*G).floor()},this.setDrawingBufferSize=function(R,k,Y){O=R,Z=k,G=Y,e.width=Math.floor(R*Y),e.height=Math.floor(k*Y),this.setViewport(0,0,R,k)},this.getCurrentViewport=function(R){return R.copy(A)},this.getViewport=function(R){return R.copy(et)},this.setViewport=function(R,k,Y,q){R.isVector4?et.set(R.x,R.y,R.z,R.w):et.set(R,k,Y,q),ft.viewport(A.copy(et).multiplyScalar(G).round())},this.getScissor=function(R){return R.copy(St)},this.setScissor=function(R,k,Y,q){R.isVector4?St.set(R.x,R.y,R.z,R.w):St.set(R,k,Y,q),ft.scissor(U.copy(St).multiplyScalar(G).round())},this.getScissorTest=function(){return Dt},this.setScissorTest=function(R){ft.setScissorTest(Dt=R)},this.setOpaqueSort=function(R){it=R},this.setTransparentSort=function(R){ot=R},this.getClearColor=function(R){return R.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(R=!0,k=!0,Y=!0){let q=0;if(R){let H=!1;if(w!==null){const ht=w.texture.format;H=ht===ga||ht===ma||ht===pa}if(H){const ht=w.texture.type,xt=ht===Dn||ht===li||ht===hs||ht===ki||ht===ua||ht===fa,Tt=zt.getClearColor(),Rt=zt.getClearAlpha(),Gt=Tt.r,Xt=Tt.g,Ot=Tt.b;xt?(p[0]=Gt,p[1]=Xt,p[2]=Ot,p[3]=Rt,D.clearBufferuiv(D.COLOR,0,p)):(v[0]=Gt,v[1]=Xt,v[2]=Ot,v[3]=Rt,D.clearBufferiv(D.COLOR,0,v))}else q|=D.COLOR_BUFFER_BIT}k&&(q|=D.DEPTH_BUFFER_BIT),Y&&(q|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),zt.dispose(),wt.dispose(),ne.dispose(),yt.dispose(),C.dispose(),W.dispose(),j.dispose(),ge.dispose(),B.dispose(),Lt.dispose(),$.dispose(),$.removeEventListener("sessionstart",Ca),$.removeEventListener("sessionend",Ra),qn.stop()};function nt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const R=kt.autoReset,k=At.enabled,Y=At.autoUpdate,q=At.needsUpdate,H=At.type;vt(),kt.autoReset=R,At.enabled=k,At.autoUpdate=Y,At.needsUpdate=q,At.type=H}function _t(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function qt(R){const k=R.target;k.removeEventListener("dispose",qt),ye(k)}function ye(R){Fe(R),yt.remove(R)}function Fe(R){const k=yt.get(R).programs;k!==void 0&&(k.forEach(function(Y){Lt.releaseProgram(Y)}),R.isShaderMaterial&&Lt.releaseShaderCache(R))}this.renderBufferDirect=function(R,k,Y,q,H,ht){k===null&&(k=Wt);const xt=H.isMesh&&H.matrixWorld.determinant()<0,Tt=nh(R,k,Y,q,H);ft.setMaterial(q,xt);let Rt=Y.index,Gt=1;if(q.wireframe===!0){if(Rt=st.getWireframeAttribute(Y),Rt===void 0)return;Gt=2}const Xt=Y.drawRange,Ot=Y.attributes.position;let se=Xt.start*Gt,he=(Xt.start+Xt.count)*Gt;ht!==null&&(se=Math.max(se,ht.start*Gt),he=Math.min(he,(ht.start+ht.count)*Gt)),Rt!==null?(se=Math.max(se,0),he=Math.min(he,Rt.count)):Ot!=null&&(se=Math.max(se,0),he=Math.min(he,Ot.count));const Se=he-se;if(Se<0||Se===1/0)return;ge.setup(H,q,Tt,Y,Rt);let Me,oe=Ct;if(Rt!==null&&(Me=J.get(Rt),oe=ie,oe.setIndex(Me)),H.isMesh)q.wireframe===!0?(ft.setLineWidth(q.wireframeLinewidth*lt()),oe.setMode(D.LINES)):oe.setMode(D.TRIANGLES);else if(H.isLine){let Bt=q.linewidth;Bt===void 0&&(Bt=1),ft.setLineWidth(Bt*lt()),H.isLineSegments?oe.setMode(D.LINES):H.isLineLoop?oe.setMode(D.LINE_LOOP):oe.setMode(D.LINE_STRIP)}else H.isPoints?oe.setMode(D.POINTS):H.isSprite&&oe.setMode(D.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)oe.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(ct.get("WEBGL_multi_draw"))oe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Bt=H._multiDrawStarts,Pe=H._multiDrawCounts,ue=H._multiDrawCount,cn=Rt?J.get(Rt).bytesPerElement:1,fi=yt.get(q).currentProgram.getUniforms();for(let qe=0;qe<ue;qe++)fi.setValue(D,"_gl_DrawID",qe),oe.render(Bt[qe]/cn,Pe[qe])}else if(H.isInstancedMesh)oe.renderInstances(se,Se,H.count);else if(Y.isInstancedBufferGeometry){const Bt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Pe=Math.min(Y.instanceCount,Bt);oe.renderInstances(se,Se,Pe)}else oe.render(se,Se)};function fe(R,k,Y){R.transparent===!0&&R.side===Ue&&R.forceSinglePass===!1?(R.side=Ge,R.needsUpdate=!0,ws(R,k,Y),R.side=Wn,R.needsUpdate=!0,ws(R,k,Y),R.side=Ue):ws(R,k,Y)}this.compile=function(R,k,Y=null){Y===null&&(Y=R),g=ne.get(Y),g.init(k),S.push(g),Y.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(g.pushLight(H),H.castShadow&&g.pushShadow(H))}),R!==Y&&R.traverseVisible(function(H){H.isLight&&H.layers.test(k.layers)&&(g.pushLight(H),H.castShadow&&g.pushShadow(H))}),g.setupLights();const q=new Set;return R.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ht=H.material;if(ht)if(Array.isArray(ht))for(let xt=0;xt<ht.length;xt++){const Tt=ht[xt];fe(Tt,Y,H),q.add(Tt)}else fe(ht,Y,H),q.add(ht)}),S.pop(),g=null,q},this.compileAsync=function(R,k,Y=null){const q=this.compile(R,k,Y);return new Promise(H=>{function ht(){if(q.forEach(function(xt){yt.get(xt).currentProgram.isReady()&&q.delete(xt)}),q.size===0){H(R);return}setTimeout(ht,10)}ct.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let ln=null;function Sn(R){ln&&ln(R)}function Ca(){qn.stop()}function Ra(){qn.start()}const qn=new Yc;qn.setAnimationLoop(Sn),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(R){ln=R,$.setAnimationLoop(R),R===null?qn.stop():qn.start()},$.addEventListener("sessionstart",Ca),$.addEventListener("sessionend",Ra),this.render=function(R,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(k),k=$.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,k,w),g=ne.get(R,S.length),g.init(k),S.push(g),pt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),N.setFromProjectionMatrix(pt),tt=this.localClippingEnabled,X=ut.init(this.clippingPlanes,tt),m=wt.get(R,b.length),m.init(),b.push(m),$.enabled===!0&&$.isPresenting===!0){const ht=x.xr.getDepthSensingMesh();ht!==null&&Ar(ht,k,-1/0,x.sortObjects)}Ar(R,k,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(it,ot),Q=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Q&&zt.addToRenderList(m,R),this.info.render.frame++,X===!0&&ut.beginShadows();const Y=g.state.shadowsArray;At.render(Y,R,k),X===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,H=m.transmissive;if(g.setupLights(),k.isArrayCamera){const ht=k.cameras;if(H.length>0)for(let xt=0,Tt=ht.length;xt<Tt;xt++){const Rt=ht[xt];Ia(q,H,R,Rt)}Q&&zt.render(R);for(let xt=0,Tt=ht.length;xt<Tt;xt++){const Rt=ht[xt];Pa(m,R,Rt,Rt.viewport)}}else H.length>0&&Ia(q,H,R,k),Q&&zt.render(R),Pa(m,R,k);w!==null&&(I.updateMultisampleRenderTarget(w),I.updateRenderTargetMipmap(w)),R.isScene===!0&&R.onAfterRender(x,R,k),ge.resetDefaultState(),y=-1,E=null,S.pop(),S.length>0?(g=S[S.length-1],X===!0&&ut.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Ar(R,k,Y,q){if(R.visible===!1)return;if(R.layers.test(k.layers)){if(R.isGroup)Y=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(k);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||N.intersectsSprite(R)){q&&bt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(pt);const xt=j.update(R),Tt=R.material;Tt.visible&&m.push(R,xt,Tt,Y,bt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||N.intersectsObject(R))){const xt=j.update(R),Tt=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),bt.copy(R.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),bt.copy(xt.boundingSphere.center)),bt.applyMatrix4(R.matrixWorld).applyMatrix4(pt)),Array.isArray(Tt)){const Rt=xt.groups;for(let Gt=0,Xt=Rt.length;Gt<Xt;Gt++){const Ot=Rt[Gt],se=Tt[Ot.materialIndex];se&&se.visible&&m.push(R,xt,se,Y,bt.z,Ot)}}else Tt.visible&&m.push(R,xt,Tt,Y,bt.z,null)}}const ht=R.children;for(let xt=0,Tt=ht.length;xt<Tt;xt++)Ar(ht[xt],k,Y,q)}function Pa(R,k,Y,q){const H=R.opaque,ht=R.transmissive,xt=R.transparent;g.setupLightsView(Y),X===!0&&ut.setGlobalState(x.clippingPlanes,Y),q&&ft.viewport(A.copy(q)),H.length>0&&Ss(H,k,Y),ht.length>0&&Ss(ht,k,Y),xt.length>0&&Ss(xt,k,Y),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function Ia(R,k,Y,q){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[q.id]===void 0&&(g.state.transmissionRenderTarget[q.id]=new ci(1,1,{generateMipmaps:!0,type:ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float")?ms:Dn,minFilter:oi,samples:4,stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:le.workingColorSpace}));const ht=g.state.transmissionRenderTarget[q.id],xt=q.viewport||A;ht.setSize(xt.z,xt.w);const Tt=x.getRenderTarget();x.setRenderTarget(ht),x.getClearColor(F),V=x.getClearAlpha(),V<1&&x.setClearColor(16777215,.5),x.clear(),Q&&zt.render(Y);const Rt=x.toneMapping;x.toneMapping=Hn;const Gt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),g.setupLightsView(q),X===!0&&ut.setGlobalState(x.clippingPlanes,q),Ss(R,Y,q),I.updateMultisampleRenderTarget(ht),I.updateRenderTargetMipmap(ht),ct.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let Ot=0,se=k.length;Ot<se;Ot++){const he=k[Ot],Se=he.object,Me=he.geometry,oe=he.material,Bt=he.group;if(oe.side===Ue&&Se.layers.test(q.layers)){const Pe=oe.side;oe.side=Ge,oe.needsUpdate=!0,La(Se,Y,q,Me,oe,Bt),oe.side=Pe,oe.needsUpdate=!0,Xt=!0}}Xt===!0&&(I.updateMultisampleRenderTarget(ht),I.updateRenderTargetMipmap(ht))}x.setRenderTarget(Tt),x.setClearColor(F,V),Gt!==void 0&&(q.viewport=Gt),x.toneMapping=Rt}function Ss(R,k,Y){const q=k.isScene===!0?k.overrideMaterial:null;for(let H=0,ht=R.length;H<ht;H++){const xt=R[H],Tt=xt.object,Rt=xt.geometry,Gt=q===null?xt.material:q,Xt=xt.group;Tt.layers.test(Y.layers)&&La(Tt,k,Y,Rt,Gt,Xt)}}function La(R,k,Y,q,H,ht){R.onBeforeRender(x,k,Y,q,H,ht),R.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),H.onBeforeRender(x,k,Y,q,R,ht),H.transparent===!0&&H.side===Ue&&H.forceSinglePass===!1?(H.side=Ge,H.needsUpdate=!0,x.renderBufferDirect(Y,k,q,H,R,ht),H.side=Wn,H.needsUpdate=!0,x.renderBufferDirect(Y,k,q,H,R,ht),H.side=Ue):x.renderBufferDirect(Y,k,q,H,R,ht),R.onAfterRender(x,k,Y,q,H,ht)}function ws(R,k,Y){k.isScene!==!0&&(k=Wt);const q=yt.get(R),H=g.state.lights,ht=g.state.shadowsArray,xt=H.state.version,Tt=Lt.getParameters(R,H.state,ht,k,Y),Rt=Lt.getProgramCacheKey(Tt);let Gt=q.programs;q.environment=R.isMeshStandardMaterial?k.environment:null,q.fog=k.fog,q.envMap=(R.isMeshStandardMaterial?W:C).get(R.envMap||q.environment),q.envMapRotation=q.environment!==null&&R.envMap===null?k.environmentRotation:R.envMapRotation,Gt===void 0&&(R.addEventListener("dispose",qt),Gt=new Map,q.programs=Gt);let Xt=Gt.get(Rt);if(Xt!==void 0){if(q.currentProgram===Xt&&q.lightsStateVersion===xt)return Ua(R,Tt),Xt}else Tt.uniforms=Lt.getUniforms(R),R.onBeforeCompile(Tt,x),Xt=Lt.acquireProgram(Tt,Rt),Gt.set(Rt,Xt),q.uniforms=Tt.uniforms;const Ot=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ot.clippingPlanes=ut.uniform),Ua(R,Tt),q.needsLights=sh(R),q.lightsStateVersion=xt,q.needsLights&&(Ot.ambientLightColor.value=H.state.ambient,Ot.lightProbe.value=H.state.probe,Ot.directionalLights.value=H.state.directional,Ot.directionalLightShadows.value=H.state.directionalShadow,Ot.spotLights.value=H.state.spot,Ot.spotLightShadows.value=H.state.spotShadow,Ot.rectAreaLights.value=H.state.rectArea,Ot.ltc_1.value=H.state.rectAreaLTC1,Ot.ltc_2.value=H.state.rectAreaLTC2,Ot.pointLights.value=H.state.point,Ot.pointLightShadows.value=H.state.pointShadow,Ot.hemisphereLights.value=H.state.hemi,Ot.directionalShadowMap.value=H.state.directionalShadowMap,Ot.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ot.spotShadowMap.value=H.state.spotShadowMap,Ot.spotLightMatrix.value=H.state.spotLightMatrix,Ot.spotLightMap.value=H.state.spotLightMap,Ot.pointShadowMap.value=H.state.pointShadowMap,Ot.pointShadowMatrix.value=H.state.pointShadowMatrix),q.currentProgram=Xt,q.uniformsList=null,Xt}function Da(R){if(R.uniformsList===null){const k=R.currentProgram.getUniforms();R.uniformsList=lr.seqWithValue(k.seq,R.uniforms)}return R.uniformsList}function Ua(R,k){const Y=yt.get(R);Y.outputColorSpace=k.outputColorSpace,Y.batching=k.batching,Y.batchingColor=k.batchingColor,Y.instancing=k.instancing,Y.instancingColor=k.instancingColor,Y.instancingMorph=k.instancingMorph,Y.skinning=k.skinning,Y.morphTargets=k.morphTargets,Y.morphNormals=k.morphNormals,Y.morphColors=k.morphColors,Y.morphTargetsCount=k.morphTargetsCount,Y.numClippingPlanes=k.numClippingPlanes,Y.numIntersection=k.numClipIntersection,Y.vertexAlphas=k.vertexAlphas,Y.vertexTangents=k.vertexTangents,Y.toneMapping=k.toneMapping}function nh(R,k,Y,q,H){k.isScene!==!0&&(k=Wt),I.resetTextureUnits();const ht=k.fog,xt=q.isMeshStandardMaterial?k.environment:null,Tt=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Hi,Rt=(q.isMeshStandardMaterial?W:C).get(q.envMap||xt),Gt=q.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Xt=!!Y.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ot=!!Y.morphAttributes.position,se=!!Y.morphAttributes.normal,he=!!Y.morphAttributes.color;let Se=Hn;q.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Se=x.toneMapping);const Me=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,oe=Me!==void 0?Me.length:0,Bt=yt.get(q),Pe=g.state.lights;if(X===!0&&(tt===!0||R!==E)){const ke=R===E&&q.id===y;ut.setState(q,R,ke)}let ue=!1;q.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==Pe.state.version||Bt.outputColorSpace!==Tt||H.isBatchedMesh&&Bt.batching===!1||!H.isBatchedMesh&&Bt.batching===!0||H.isBatchedMesh&&Bt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Bt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Bt.instancing===!1||!H.isInstancedMesh&&Bt.instancing===!0||H.isSkinnedMesh&&Bt.skinning===!1||!H.isSkinnedMesh&&Bt.skinning===!0||H.isInstancedMesh&&Bt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Bt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Bt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Bt.instancingMorph===!1&&H.morphTexture!==null||Bt.envMap!==Rt||q.fog===!0&&Bt.fog!==ht||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==ut.numPlanes||Bt.numIntersection!==ut.numIntersection)||Bt.vertexAlphas!==Gt||Bt.vertexTangents!==Xt||Bt.morphTargets!==Ot||Bt.morphNormals!==se||Bt.morphColors!==he||Bt.toneMapping!==Se||Bt.morphTargetsCount!==oe)&&(ue=!0):(ue=!0,Bt.__version=q.version);let cn=Bt.currentProgram;ue===!0&&(cn=ws(q,k,H));let fi=!1,qe=!1,Zi=!1;const xe=cn.getUniforms(),tn=Bt.uniforms;if(ft.useProgram(cn.program)&&(fi=!0,qe=!0,Zi=!0),q.id!==y&&(y=q.id,qe=!0),fi||E!==R){ft.buffers.depth.getReversed()?(K.copy(R.projectionMatrix),fu(K),du(K),xe.setValue(D,"projectionMatrix",K)):xe.setValue(D,"projectionMatrix",R.projectionMatrix),xe.setValue(D,"viewMatrix",R.matrixWorldInverse);const We=xe.map.cameraPosition;We!==void 0&&We.setValue(D,It.setFromMatrixPosition(R.matrixWorld)),Et.logarithmicDepthBuffer&&xe.setValue(D,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&xe.setValue(D,"isOrthographic",R.isOrthographicCamera===!0),E!==R&&(E=R,qe=!0,Zi=!0)}if(H.isSkinnedMesh){xe.setOptional(D,H,"bindMatrix"),xe.setOptional(D,H,"bindMatrixInverse");const ke=H.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),xe.setValue(D,"boneTexture",ke.boneTexture,I))}H.isBatchedMesh&&(xe.setOptional(D,H,"batchingTexture"),xe.setValue(D,"batchingTexture",H._matricesTexture,I),xe.setOptional(D,H,"batchingIdTexture"),xe.setValue(D,"batchingIdTexture",H._indirectTexture,I),xe.setOptional(D,H,"batchingColorTexture"),H._colorsTexture!==null&&xe.setValue(D,"batchingColorTexture",H._colorsTexture,I));const en=Y.morphAttributes;if((en.position!==void 0||en.normal!==void 0||en.color!==void 0)&&Ht.update(H,Y,cn),(qe||Bt.receiveShadow!==H.receiveShadow)&&(Bt.receiveShadow=H.receiveShadow,xe.setValue(D,"receiveShadow",H.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(tn.envMap.value=Rt,tn.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&k.environment!==null&&(tn.envMapIntensity.value=k.environmentIntensity),qe&&(xe.setValue(D,"toneMappingExposure",x.toneMappingExposure),Bt.needsLights&&ih(tn,Zi),ht&&q.fog===!0&&gt.refreshFogUniforms(tn,ht),gt.refreshMaterialUniforms(tn,q,G,Z,g.state.transmissionRenderTarget[R.id]),lr.upload(D,Da(Bt),tn,I)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(lr.upload(D,Da(Bt),tn,I),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&xe.setValue(D,"center",H.center),xe.setValue(D,"modelViewMatrix",H.modelViewMatrix),xe.setValue(D,"normalMatrix",H.normalMatrix),xe.setValue(D,"modelMatrix",H.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const ke=q.uniformsGroups;for(let We=0,Cr=ke.length;We<Cr;We++){const Zn=ke[We];B.update(Zn,cn),B.bind(Zn,cn)}}return cn}function ih(R,k){R.ambientLightColor.needsUpdate=k,R.lightProbe.needsUpdate=k,R.directionalLights.needsUpdate=k,R.directionalLightShadows.needsUpdate=k,R.pointLights.needsUpdate=k,R.pointLightShadows.needsUpdate=k,R.spotLights.needsUpdate=k,R.spotLightShadows.needsUpdate=k,R.rectAreaLights.needsUpdate=k,R.hemisphereLights.needsUpdate=k}function sh(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(R,k,Y){yt.get(R.texture).__webglTexture=k,yt.get(R.depthTexture).__webglTexture=Y;const q=yt.get(R);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=Y===void 0,q.__autoAllocateDepthBuffer||ct.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,k){const Y=yt.get(R);Y.__webglFramebuffer=k,Y.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(R,k=0,Y=0){w=R,_=k,M=Y;let q=!0,H=null,ht=!1,xt=!1;if(R){const Rt=yt.get(R);if(Rt.__useDefaultFramebuffer!==void 0)ft.bindFramebuffer(D.FRAMEBUFFER,null),q=!1;else if(Rt.__webglFramebuffer===void 0)I.setupRenderTarget(R);else if(Rt.__hasExternalTextures)I.rebindTextures(R,yt.get(R.texture).__webglTexture,yt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ot=R.depthTexture;if(Rt.__boundDepthTexture!==Ot){if(Ot!==null&&yt.has(Ot)&&(R.width!==Ot.image.width||R.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(R)}}const Gt=R.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(xt=!0);const Xt=yt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Xt[k])?H=Xt[k][Y]:H=Xt[k],ht=!0):R.samples>0&&I.useMultisampledRTT(R)===!1?H=yt.get(R).__webglMultisampledFramebuffer:Array.isArray(Xt)?H=Xt[Y]:H=Xt,A.copy(R.viewport),U.copy(R.scissor),L=R.scissorTest}else A.copy(et).multiplyScalar(G).floor(),U.copy(St).multiplyScalar(G).floor(),L=Dt;if(ft.bindFramebuffer(D.FRAMEBUFFER,H)&&q&&ft.drawBuffers(R,H),ft.viewport(A),ft.scissor(U),ft.setScissorTest(L),ht){const Rt=yt.get(R.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+k,Rt.__webglTexture,Y)}else if(xt){const Rt=yt.get(R.texture),Gt=k||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Rt.__webglTexture,Y||0,Gt)}y=-1},this.readRenderTargetPixels=function(R,k,Y,q,H,ht,xt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&xt!==void 0&&(Tt=Tt[xt]),Tt){ft.bindFramebuffer(D.FRAMEBUFFER,Tt);try{const Rt=R.texture,Gt=Rt.format,Xt=Rt.type;if(!Et.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Et.textureTypeReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=R.width-q&&Y>=0&&Y<=R.height-H&&D.readPixels(k,Y,q,H,Kt.convert(Gt),Kt.convert(Xt),ht)}finally{const Rt=w!==null?yt.get(w).__webglFramebuffer:null;ft.bindFramebuffer(D.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(R,k,Y,q,H,ht,xt){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=yt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&xt!==void 0&&(Tt=Tt[xt]),Tt){const Rt=R.texture,Gt=Rt.format,Xt=Rt.type;if(!Et.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Et.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=R.width-q&&Y>=0&&Y<=R.height-H){ft.bindFramebuffer(D.FRAMEBUFFER,Tt);const Ot=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ot),D.bufferData(D.PIXEL_PACK_BUFFER,ht.byteLength,D.STREAM_READ),D.readPixels(k,Y,q,H,Kt.convert(Gt),Kt.convert(Xt),0);const se=w!==null?yt.get(w).__webglFramebuffer:null;ft.bindFramebuffer(D.FRAMEBUFFER,se);const he=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await uu(D,he,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ot),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ht),D.deleteBuffer(Ot),D.deleteSync(he),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,k=null,Y=0){R.isTexture!==!0&&(Ii("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,R=arguments[1]);const q=Math.pow(2,-Y),H=Math.floor(R.image.width*q),ht=Math.floor(R.image.height*q),xt=k!==null?k.x:0,Tt=k!==null?k.y:0;I.setTexture2D(R,0),D.copyTexSubImage2D(D.TEXTURE_2D,Y,0,0,xt,Tt,H,ht),ft.unbindTexture()};const rh=D.createFramebuffer(),oh=D.createFramebuffer();this.copyTextureToTexture=function(R,k,Y=null,q=null,H=0,ht=null){R.isTexture!==!0&&(Ii("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,R=arguments[1],k=arguments[2],ht=arguments[3]||0,Y=null),ht===null&&(H!==0?(Ii("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ht=H,H=0):ht=0);let xt,Tt,Rt,Gt,Xt,Ot,se,he,Se;const Me=R.isCompressedTexture?R.mipmaps[ht]:R.image;if(Y!==null)xt=Y.max.x-Y.min.x,Tt=Y.max.y-Y.min.y,Rt=Y.isBox3?Y.max.z-Y.min.z:1,Gt=Y.min.x,Xt=Y.min.y,Ot=Y.isBox3?Y.min.z:0;else{const en=Math.pow(2,-H);xt=Math.floor(Me.width*en),Tt=Math.floor(Me.height*en),R.isDataArrayTexture?Rt=Me.depth:R.isData3DTexture?Rt=Math.floor(Me.depth*en):Rt=1,Gt=0,Xt=0,Ot=0}q!==null?(se=q.x,he=q.y,Se=q.z):(se=0,he=0,Se=0);const oe=Kt.convert(k.format),Bt=Kt.convert(k.type);let Pe;k.isData3DTexture?(I.setTexture3D(k,0),Pe=D.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(I.setTexture2DArray(k,0),Pe=D.TEXTURE_2D_ARRAY):(I.setTexture2D(k,0),Pe=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,k.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,k.unpackAlignment);const ue=D.getParameter(D.UNPACK_ROW_LENGTH),cn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),fi=D.getParameter(D.UNPACK_SKIP_PIXELS),qe=D.getParameter(D.UNPACK_SKIP_ROWS),Zi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Me.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Me.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Gt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Xt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ot);const xe=R.isDataArrayTexture||R.isData3DTexture,tn=k.isDataArrayTexture||k.isData3DTexture;if(R.isDepthTexture){const en=yt.get(R),ke=yt.get(k),We=yt.get(en.__renderTarget),Cr=yt.get(ke.__renderTarget);ft.bindFramebuffer(D.READ_FRAMEBUFFER,We.__webglFramebuffer),ft.bindFramebuffer(D.DRAW_FRAMEBUFFER,Cr.__webglFramebuffer);for(let Zn=0;Zn<Rt;Zn++)xe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,yt.get(R).__webglTexture,H,Ot+Zn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,yt.get(k).__webglTexture,ht,Se+Zn)),D.blitFramebuffer(Gt,Xt,xt,Tt,se,he,xt,Tt,D.DEPTH_BUFFER_BIT,D.NEAREST);ft.bindFramebuffer(D.READ_FRAMEBUFFER,null),ft.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(H!==0||R.isRenderTargetTexture||yt.has(R)){const en=yt.get(R),ke=yt.get(k);ft.bindFramebuffer(D.READ_FRAMEBUFFER,rh),ft.bindFramebuffer(D.DRAW_FRAMEBUFFER,oh);for(let We=0;We<Rt;We++)xe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,en.__webglTexture,H,Ot+We):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,en.__webglTexture,H),tn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ke.__webglTexture,ht,Se+We):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ke.__webglTexture,ht),H!==0?D.blitFramebuffer(Gt,Xt,xt,Tt,se,he,xt,Tt,D.COLOR_BUFFER_BIT,D.NEAREST):tn?D.copyTexSubImage3D(Pe,ht,se,he,Se+We,Gt,Xt,xt,Tt):D.copyTexSubImage2D(Pe,ht,se,he,Gt,Xt,xt,Tt);ft.bindFramebuffer(D.READ_FRAMEBUFFER,null),ft.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else tn?R.isDataTexture||R.isData3DTexture?D.texSubImage3D(Pe,ht,se,he,Se,xt,Tt,Rt,oe,Bt,Me.data):k.isCompressedArrayTexture?D.compressedTexSubImage3D(Pe,ht,se,he,Se,xt,Tt,Rt,oe,Me.data):D.texSubImage3D(Pe,ht,se,he,Se,xt,Tt,Rt,oe,Bt,Me):R.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ht,se,he,xt,Tt,oe,Bt,Me.data):R.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ht,se,he,Me.width,Me.height,oe,Me.data):D.texSubImage2D(D.TEXTURE_2D,ht,se,he,xt,Tt,oe,Bt,Me);D.pixelStorei(D.UNPACK_ROW_LENGTH,ue),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,cn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,fi),D.pixelStorei(D.UNPACK_SKIP_ROWS,qe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Zi),ht===0&&k.generateMipmaps&&D.generateMipmap(Pe),ft.unbindTexture()},this.copyTextureToTexture3D=function(R,k,Y=null,q=null,H=0){return R.isTexture!==!0&&(Ii("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,q=arguments[1]||null,R=arguments[2],k=arguments[3],H=arguments[4]||0),Ii('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,k,Y,q,H)},this.initRenderTarget=function(R){yt.get(R).__webglFramebuffer===void 0&&I.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?I.setTextureCube(R,0):R.isData3DTexture?I.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?I.setTexture2DArray(R,0):I.setTexture2D(R,0),ft.unbindTexture()},this.resetState=function(){_=0,M=0,w=null,ft.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=le._getDrawingBufferColorSpace(t),e.unpackColorSpace=le._getUnpackColorSpace()}}function Jc(r,t=!1){const e=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),s=new Set(Object.keys(r[0].morphAttributes)),i={},a={},o=r[0].morphTargetsRelative,l=new Ne;let h=0;for(let u=0;u<r.length;++u){const d=r[u];let f=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const c in d.attributes){if(!n.has(c))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+c+'" attribute exists among all geometries, or in none of them.'),null;i[c]===void 0&&(i[c]=[]),i[c].push(d.attributes[c]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const c in d.morphAttributes){if(!s.has(c))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[c]===void 0&&(a[c]=[]),a[c].push(d.morphAttributes[c])}if(t){let c;if(e)c=d.index.count;else if(d.attributes.position!==void 0)c=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,c,u),h+=c}}if(e){let u=0;const d=[];for(let f=0;f<r.length;++f){const c=r[f].index;for(let p=0;p<c.count;++p)d.push(c.getX(p)+u);u+=r[f].attributes.position.count}l.setIndex(d)}for(const u in i){const d=Xl(i[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(const u in a){const d=a[u][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<d;++f){const c=[];for(let v=0;v<a[u].length;++v)c.push(a[u][v][f]);const p=Xl(c);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(p)}}return l}function Xl(r){let t,e,n,s=-1,i=0;for(let h=0;h<r.length;++h){const u=r[h];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;i+=u.count*e}const a=new t(i),o=new Ye(a,e,n);let l=0;for(let h=0;h<r.length;++h){const u=r[h];if(u.isInterleavedBufferAttribute){const d=l/e;for(let f=0,c=u.count;f<c;f++)for(let p=0;p<e;p++){const v=u.getComponent(f,p);o.setComponent(f+d,p,v)}}else a.set(u.array,l);l+=u.count*e}return s!==void 0&&(o.gpuType=s),o}const Ks=new Map,cg=5,ss=(r,t=!1)=>{if(!Ks.has(r))Ks.set(r,1);else{const e=Ks.get(r);if(typeof e>"u"||e>=cg)return;Ks.set(r,e+1)}t?console.error(`%c [enable3d] ${r} `,"background: #222; color: #bada55"):console.warn(`%c [enable3d] ${r} `,"background: #222; color: #bada55")};/**
 * @author       Kevin Lee (https://github.com/InfiniteLee)
 * @copyright    Copyright (c) 2020 Kevin Lee; Project Url: https://github.com/InfiniteLee/three-to-ammo
 * @license      {@link https://github.com/InfiniteLee/three-to-ammo/blob/master/LICENSE|MPL-2.0}
 */const ys={HULL:"hull",HACD:"hacd",VHACD:"vhacd",MESH:"mesh"},Ms={ALL:"all",MANUAL:"manual"};(function(){const r=new P,t=new P,e=new Qt;return function(n,s,i,a={}){if(a.type=ys.HULL,Tr(a),a.fit===Ms.MANUAL)return console.warn("cannot use fit: manual with type: hull"),null;const o=Aa(n,s),l=new Ammo.btVector3,h=new Ammo.btConvexHullShape;h.setMargin(a.margin),t.addVectors(o.max,o.min).multiplyScalar(.5);let u=0;for(let p=0;p<n.length;p++)u+=n[p].length/3;const d=a.hullMaxVertices||1e5;u>d&&console.warn(`too many vertices for hull shape; sampling ~${d} from ~${u} vertices`);const f=Math.min(1,d/u);for(let p=0;p<n.length;p++){const v=n[p];e.fromArray(s[p]);for(let m=0;m<v.length;m+=3){const g=p===n.length-1&&m===v.length-3;(Math.random()<=f||g)&&(r.set(v[m],v[m+1],v[m+2]).applyMatrix4(e).sub(t),l.setValue(r.x,r.y,r.z),h.addPoint(l,g))}}let c=h;if(h.getNumVertices()>=100){const p=new Ammo.btShapeHull(h);p.buildHull(a.margin),Ammo.destroy(h),c=new Ammo.btConvexHullShape(Ammo.getPointer(p.getVertexPointer()),p.numVertices()),Ammo.destroy(p)}return Ammo.destroy(l),hg(c,a,br(i,a)),c}})();(function(){const r=new P,t=new P,e=new Qt;return function(n,s,i,a,o={}){if(o.type=ys.HACD,Tr(o),o.fit===Ms.MANUAL)return console.warn("cannot use fit: manual with type: hacd"),[];if(!Ammo.hasOwnProperty("HACD"))return console.warn("HACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."),[];const l=Aa(n,s);br(a,o);let h=0,u=0;t.addVectors(l.max,l.min).multiplyScalar(.5);for(let b=0;b<n.length;b++)h+=n[b].length/3,i&&i[b]?u+=i[b].length/3:u+=n[b].length/9;const d=new Ammo.HACD;o.hasOwnProperty("compacityWeight")&&d.SetCompacityWeight(o.compacityWeight),o.hasOwnProperty("volumeWeight")&&d.SetVolumeWeight(o.volumeWeight),o.hasOwnProperty("nClusters")&&d.SetNClusters(o.nClusters),o.hasOwnProperty("nVerticesPerCH")&&d.SetNVerticesPerCH(o.nVerticesPerCH),o.hasOwnProperty("concavity")&&d.SetConcavity(o.concavity);const f=Ammo._malloc(h*3*8),c=Ammo._malloc(u*3*4);d.SetPoints(f),d.SetTriangles(c),d.SetNPoints(h),d.SetNTriangles(u);let p=f/8,v=c/4;for(let b=0;b<n.length;b++){const S=n[b];e.fromArray(s[b]);for(let x=0;x<S.length;x+=3)r.set(S[x+0],S[x+1],S[x+2]).applyMatrix4(e).sub(t),Ammo.HEAPF64[p+0]=r.x,Ammo.HEAPF64[p+1]=r.y,Ammo.HEAPF64[p+2]=r.z,p+=3;if(i[b]){const x=i[b];for(let T=0;T<x.length;T++)Ammo.HEAP32[v]=x[T],v++}else for(let x=0;x<S.length/3;x++)Ammo.HEAP32[v]=x,v++}d.Compute(),Ammo._free(f),Ammo._free(c);const m=d.GetNClusters(),g=[];for(let b=0;b<m;b++){const S=new Ammo.btConvexHullShape;S.setMargin(o.margin);const x=d.GetNPointsCH(b),T=d.GetNTrianglesCH(b),_=Ammo._malloc(x*3*8),M=Ammo._malloc(T*3*4);d.GetCH(b,_,M);const w=_/8;for(let y=0;y<x;y++){const E=new Ammo.btVector3,A=Ammo.HEAPF64[w+y*3+0],U=Ammo.HEAPF64[w+y*3+1],L=Ammo.HEAPF64[w+y*3+2];E.setValue(A,U,L),S.addPoint(E,y===x-1),Ammo.destroy(E)}g.push(S)}return g}})();(function(){const r=new P,t=new P,e=new Qt;return function(n,s,i,a,o={}){if(o.type=ys.VHACD,Tr(o),o.fit===Ms.MANUAL)return console.warn("cannot use fit: manual with type: vhacd"),[];if(!Ammo.hasOwnProperty("VHACD"))return console.warn("VHACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."),[];const l=Aa(n,s);br(a,o);let h=0,u=0;t.addVectors(l.max,l.min).multiplyScalar(.5);for(let x=0;x<n.length;x++)h+=n[x].length/3,i&&i[x]?u+=i[x].length/3:u+=n[x].length/9;const d=new Ammo.VHACD,f=new Ammo.Parameters;o.hasOwnProperty("resolution")&&f.set_m_resolution(o.resolution),o.hasOwnProperty("depth")&&f.set_m_depth(o.depth),o.hasOwnProperty("concavity")&&f.set_m_concavity(o.concavity),o.hasOwnProperty("planeDownsampling")&&f.set_m_planeDownsampling(o.planeDownsampling),o.hasOwnProperty("convexhullDownsampling")&&f.set_m_convexhullDownsampling(o.convexhullDownsampling),o.hasOwnProperty("alpha")&&f.set_m_alpha(o.alpha),o.hasOwnProperty("beta")&&f.set_m_beta(o.beta),o.hasOwnProperty("gamma")&&f.set_m_gamma(o.gamma),o.hasOwnProperty("pca")&&f.set_m_pca(o.pca),o.hasOwnProperty("mode")&&f.set_m_mode(o.mode),o.hasOwnProperty("maxNumVerticesPerCH")&&f.set_m_maxNumVerticesPerCH(o.maxNumVerticesPerCH),o.hasOwnProperty("minVolumePerCH")&&f.set_m_minVolumePerCH(o.minVolumePerCH),o.hasOwnProperty("convexhullApproximation")&&f.set_m_convexhullApproximation(o.convexhullApproximation),o.hasOwnProperty("oclAcceleration")&&f.set_m_oclAcceleration(o.oclAcceleration);const c=Ammo._malloc(h*3*8+3),p=Ammo._malloc(u*3*4);let v=c/8,m=p/4;for(let x=0;x<n.length;x++){const T=n[x];e.fromArray(s[x]);for(let _=0;_<T.length;_+=3)r.set(T[_+0],T[_+1],T[_+2]).applyMatrix4(e).sub(t),Ammo.HEAPF64[v+0]=r.x,Ammo.HEAPF64[v+1]=r.y,Ammo.HEAPF64[v+2]=r.z,v+=3;if(i[x]){const _=i[x];for(let M=0;M<_.length;M++)Ammo.HEAP32[m]=_[M],m++}else for(let _=0;_<T.length/3;_++)Ammo.HEAP32[m]=_,m++}d.Compute(c,3,h,p,3,u,f),Ammo._free(c),Ammo._free(p);const g=d.GetNConvexHulls(),b=[],S=new Ammo.ConvexHull;for(let x=0;x<g;x++){d.GetConvexHull(x,S);const T=S.get_m_nPoints();S.get_m_points();const _=new Ammo.btConvexHullShape;_.setMargin(o.margin);for(let M=0;M<T;M++){const w=new Ammo.btVector3,y=S.get_m_points(M*3+0),E=S.get_m_points(M*3+1),A=S.get_m_points(M*3+2);w.setValue(y,E,A),_.addPoint(w,M===T-1),Ammo.destroy(w)}b.push(_)}return Ammo.destroy(S),Ammo.destroy(d),b}})();(function(){const r=new P,t=new P,e=new P,n=new Qt;return function(s,i,a,o,l={}){if(l.type=ys.MESH,Tr(l),l.fit===Ms.MANUAL)return console.warn("cannot use fit: manual with type: mesh"),null;const h=br(o,l),u=new Ammo.btVector3,d=new Ammo.btVector3,f=new Ammo.btVector3,c=new Ammo.btTriangleMesh(!0,!1);for(let m=0;m<s.length;m++){const g=s[m],b=a[m]?a[m]:null;if(n.fromArray(i[m]),b)for(let S=0;S<b.length;S+=3){const x=b[S]*3,T=b[S+1]*3,_=b[S+2]*3;r.set(g[x],g[x+1],g[x+2]).applyMatrix4(n),t.set(g[T],g[T+1],g[T+2]).applyMatrix4(n),e.set(g[_],g[_+1],g[_+2]).applyMatrix4(n),u.setValue(r.x,r.y,r.z),d.setValue(t.x,t.y,t.z),f.setValue(e.x,e.y,e.z),c.addTriangle(u,d,f,!1)}else for(let S=0;S<g.length;S+=9)r.set(g[S+0],g[S+1],g[S+2]).applyMatrix4(n),t.set(g[S+3],g[S+4],g[S+5]).applyMatrix4(n),e.set(g[S+6],g[S+7],g[S+8]).applyMatrix4(n),u.setValue(r.x,r.y,r.z),d.setValue(t.x,t.y,t.z),f.setValue(e.x,e.y,e.z),c.addTriangle(u,d,f,!1)}const p=new Ammo.btVector3(h.x,h.y,h.z);c.setScaling(p),Ammo.destroy(p);let v;return l.concave?v=new Ammo.btBvhTriangleMeshShape(c,!0,!0):v=new Ammo.btConvexTriangleMeshShape(c,!0),v.resources=[c],Ammo.destroy(u),Ammo.destroy(d),Ammo.destroy(f),v}})();function Tr(r){r.type=r.type||ys.HULL,r.margin=r.hasOwnProperty("margin")?r.margin:.01}const hg=function(r,t,e){};(function(){const r=new Qt;return function(t,e,n){parseInt(vr)>=123?r.copy(t.matrixWorld).invert():r.getInverse(t.matrixWorld),new P().setFromMatrixScale(t.matrixWorld),t.traverse(i=>{const a=new Qt;if(i.isMesh&&(e.includeInvisible||i.el&&i.el.object3D.visible||i.visible)){i===t?a.identity():(i.updateWorldMatrix(!0),a.multiplyMatrices(r,i.matrixWorld));let o;if(i.geometry.isBufferGeometry){const l=i.geometry.attributes.position;if(l.isInterleavedBufferAttribute){o=new Float32Array(l.count*l.itemSize);let h=l.offset,u=0;for(;u<o.length;){for(let d=0;d<l.itemSize;d++)o[u++]=l.array[h+d];h+=l.data.stride}}else o=l.array}n(i.geometry.isBufferGeometry?o:i.geometry.vertices,a.elements,i.geometry.index?i.geometry.index.array:null)}})}})();const br=(function(){const r=new Qt;return function(t,e={}){const n=new P(1,1,1);return e.fit===Ms.ALL&&(r.fromArray(t),n.setFromMatrixScale(r)),n}})();(function(){const r=new P;return function(t,e,n){let s=0,{x:i,y:a,z:o}=n.getCenter(r);return jc(t,e,l=>{const h=i-l.x,u=a-l.y,d=o-l.z;s=Math.max(s,h*h+u*u+d*d)}),Math.sqrt(s)}})();const Aa=function(r,t){const e=new Yn;let n=1/0,s=1/0,i=1/0,a=-1/0,o=-1/0,l=-1/0;return e.min.set(0,0,0),e.max.set(0,0,0),jc(r,t,h=>{h.x<n&&(n=h.x),h.y<s&&(s=h.y),h.z<i&&(i=h.z),h.x>a&&(a=h.x),h.y>o&&(o=h.y),h.z>l&&(l=h.z)}),e.min.set(n,s,i),e.max.set(a,o,l),e},jc=(function(){const r=new P,t=new Qt;return function(e,n,s){for(let i=0;i<e.length;i++){t.fromArray(n[i]);for(let a=0;a<e[i].length;a+=3)r.set(e[i][a],e[i][a+1],e[i][a+2]).applyMatrix4(t),s(r)}}})(),cr=0,ug=1,fg=new P,Yl=new Xc,co=new pn,ql=new P,Js=new on;class dg{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new Zl,this.unassigned=new Zl,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new pg(t[e]));this.compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(n){const s=n.geometry;if(s!==void 0){const i=s.attributes.position;if(i!==void 0)for(let a=0,o=i.count;a<o;a++){const l=new P;l.fromBufferAttribute(i,a).applyMatrix4(n.matrixWorld),e.push(l)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let n=0,s=e.length;n<s;n++)if(e[n].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const n=this.faces;let s=-1/0,i=1/0;for(let a=0,o=n.length;a<o;a++){const l=n[a],h=l.distanceToPoint(t.origin),u=l.normal.dot(t.direction);if(h>0&&u>=0)return null;const d=u!==0?-h/u:0;if(!(d<=0)&&(u>0?i=Math.min(d,i):s=Math.max(d,s),s>i))return null}return s!==-1/0?t.at(s,e):t.at(i,e),e}intersectsRay(t){return this.intersectRay(t,fg)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let n=t.outside;for(;n.next!==null&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}deleteFaceVertices(t,e){const n=this.removeAllVerticesFromFace(t);if(n!==void 0)if(e===void 0)this.unassigned.appendChain(n);else{let s=n;do{const i=s.next;e.distanceToPoint(s.point)>this.tolerance?this.addVertexToFace(s,e):this.unassigned.append(s),s=i}while(s!==null)}return this}resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const n=e.next;let s=this.tolerance,i=null;for(let a=0;a<t.length;a++){const o=t[a];if(o.mark===cr){const l=o.distanceToPoint(e.point);if(l>s&&(s=l,i=o),s>1e3*this.tolerance)break}}i!==null&&this.addVertexToFace(e,i),e=n}while(e!==null)}return this}computeExtremes(){const t=new P,e=new P,n=[],s=[];for(let i=0;i<3;i++)n[i]=s[i]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let i=0,a=this.vertices.length;i<a;i++){const o=this.vertices[i],l=o.point;for(let h=0;h<3;h++)l.getComponent(h)<t.getComponent(h)&&(t.setComponent(h,l.getComponent(h)),n[h]=o);for(let h=0;h<3;h++)l.getComponent(h)>e.getComponent(h)&&(e.setComponent(h,l.getComponent(h)),s[h]=o)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:s}}computeInitialHull(){const t=this.vertices,e=this.computeExtremes(),n=e.min,s=e.max;let i=0,a=0;for(let f=0;f<3;f++){const c=s[f].point.getComponent(f)-n[f].point.getComponent(f);c>i&&(i=c,a=f)}const o=n[a],l=s[a];let h,u;i=0,Yl.set(o.point,l.point);for(let f=0,c=this.vertices.length;f<c;f++){const p=t[f];if(p!==o&&p!==l){Yl.closestPointToPoint(p.point,!0,ql);const v=ql.distanceToSquared(p.point);v>i&&(i=v,h=p)}}i=-1,co.setFromCoplanarPoints(o.point,l.point,h.point);for(let f=0,c=this.vertices.length;f<c;f++){const p=t[f];if(p!==o&&p!==l&&p!==h){const v=Math.abs(co.distanceToPoint(p.point));v>i&&(i=v,u=p)}}const d=[];if(co.distanceToPoint(u.point)<0){d.push(dn.create(o,l,h),dn.create(u,l,o),dn.create(u,h,l),dn.create(u,o,h));for(let f=0;f<3;f++){const c=(f+1)%3;d[f+1].getEdge(2).setTwin(d[0].getEdge(c)),d[f+1].getEdge(1).setTwin(d[c+1].getEdge(0))}}else{d.push(dn.create(o,h,l),dn.create(u,o,l),dn.create(u,l,h),dn.create(u,h,o));for(let f=0;f<3;f++){const c=(f+1)%3;d[f+1].getEdge(2).setTwin(d[0].getEdge((3-f)%3)),d[f+1].getEdge(0).setTwin(d[c+1].getEdge(1))}}for(let f=0;f<4;f++)this.faces.push(d[f]);for(let f=0,c=t.length;f<c;f++){const p=t[f];if(p!==o&&p!==l&&p!==h&&p!==u){i=this.tolerance;let v=null;for(let m=0;m<4;m++){const g=this.faces[m].distanceToPoint(p.point);g>i&&(i=g,v=this.faces[m])}v!==null&&this.addVertexToFace(p,v)}}return this}reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const n=this.faces[e];n.mark===cr&&t.push(n)}return this.faces=t,this}nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const n=this.assigned.first().face;let s=n.outside;do{const i=n.distanceToPoint(s.point);i>e&&(e=i,t=s),s=s.next}while(s!==null&&s.face===n);return t}}computeHorizon(t,e,n,s){this.deleteFaceVertices(n),n.mark=ug;let i;e===null?i=e=n.getEdge(0):i=e.next;do{const a=i.twin,o=a.face;o.mark===cr&&(o.distanceToPoint(t)>this.tolerance?this.computeHorizon(t,a,o,s):s.push(i)),i=i.next}while(i!==e);return this}addAdjoiningFace(t,e){const n=dn.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}addNewFaces(t,e){this.newFaces=[];let n=null,s=null;for(let i=0;i<e.length;i++){const a=e[i],o=this.addAdjoiningFace(t,a);n===null?n=o:o.next.setTwin(s),this.newFaces.push(o.face),s=o}return n.next.setTwin(s),this}addVertexToHull(t){const e=[];return this.unassigned.clear(),this.removeVertexFromFace(t,t.face),this.computeHorizon(t.point,null,t.face,e),this.addNewFaces(t,e),this.resolveUnassignedPoints(this.newFaces),this}cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}compute(){let t;for(this.computeInitialHull();(t=this.nextVertexToAdd())!==void 0;)this.addVertexToHull(t);return this.reindexFaces(),this.cleanup(),this}}class dn{constructor(){this.normal=new P,this.midpoint=new P,this.area=0,this.constant=0,this.outside=null,this.mark=cr,this.edge=null}static create(t,e,n){const s=new dn,i=new ho(t,s),a=new ho(e,s),o=new ho(n,s);return i.next=o.prev=a,a.next=i.prev=o,o.next=a.prev=i,s.edge=i,s.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return Js.set(t.point,e.point,n.point),Js.getNormal(this.normal),Js.getMidpoint(this.midpoint),this.area=Js.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class ho{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class pg{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class Zl{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}class mg extends Ne{constructor(t=[]){super();const e=[],n=[],i=new dg().setFromPoints(t).faces;for(let a=0;a<i.length;a++){const o=i[a];let l=o.edge;do{const h=l.head().point;e.push(h.x,h.y,h.z),n.push(o.normal.x,o.normal.y,o.normal.z),l=l.next}while(l!==o.edge)}this.setAttribute("position",new ce(e,3)),this.setAttribute("normal",new ce(n,3))}}const $l=r=>{const t=window.THREE&&window.THREE.ConvexGeometry?window.THREE.ConvexGeometry:mg;return new t(r)},Ln=function(r,t){this.minSizeForBreak=r||1.4,this.smallDelta=t||1e-4,this.tempLine1=new Xc,this.tempPlane1=new pn,this.tempPlane2=new pn,this.tempPlane_Cut=new pn,this.tempCM1=new P,this.tempCM2=new P,this.tempVector3=new P,this.tempVector3_2=new P,this.tempVector3_3=new P,this.tempVector3_P0=new P,this.tempVector3_P1=new P,this.tempVector3_P2=new P,this.tempVector3_N0=new P,this.tempVector3_N1=new P,this.tempVector3_AB=new P,this.tempVector3_CB=new P,this.tempResultObjects={object1:null,object2:null},this.segments=[];for(var e=900,n=0;n<e;n++)this.segments[n]=!1};Ln.prototype={constructor:Ln,prepareBreakableObject:function(r,t,e,n,s){r.geometry.isBufferGeometry||console.error("THREE.ConvexObjectBreaker.prepareBreakableObject(): Parameter object must have a BufferGeometry."),r.userData.ammoPhysicsData={};var i=r.userData.ammoPhysicsData;i.mass=t,i.velocity=e.clone(),i.angularVelocity=n.clone(),i.breakable=s},subdivideByImpact:function(r,t,e,n,s){var i=[],a=this.tempPlane1,o=this.tempPlane2;this.tempVector3.addVectors(t,e),a.setFromCoplanarPoints(t,r.position,this.tempVector3);var l=s+n,h=this;function u(d,f,c,p){if(Math.random()<p*.05||p>l){i.push(d);return}var v=Math.PI;p===0?(o.normal.copy(a.normal),o.constant=a.constant):p<=n?(v=(c-f)*(.2+.6*Math.random())+f,h.tempVector3_2.copy(r.position).sub(t).applyAxisAngle(e,v).add(t),o.setFromCoplanarPoints(t,h.tempVector3,h.tempVector3_2)):(v=(.5*(p&1)+.2*(2-Math.random()))*Math.PI,h.tempVector3_2.copy(t).sub(d.position).applyAxisAngle(e,v).add(d.position),h.tempVector3_3.copy(e).add(d.position),o.setFromCoplanarPoints(d.position,h.tempVector3_3,h.tempVector3_2)),h.cutByPlane(d,o,h.tempResultObjects);var m=h.tempResultObjects.object1,g=h.tempResultObjects.object2;m&&u(m,f,v,p+1),g&&u(g,v,c,p+1)}return u(r,0,2*Math.PI,0),i},cutByPlane:function(r,t,e){var n=r.geometry,s=n.attributes.position.array,i=n.attributes.normal.array,a=s.length/3,o=a/3,l=n.getIndex();l&&(l=l.array,o=l.length/3);function h(Q,lt){var D=Q*3+lt;return l?l[D]:D}for(var u=[],d=[],f=this.smallDelta,c=a*a,p=0;p<c;p++)this.segments[p]=!1;for(var v=this.tempVector3_P0,m=this.tempVector3_P1,g=this.tempVector3_N0,b=this.tempVector3_N1,p=0;p<o-1;p++){var S=h(p,0),x=h(p,1),T=h(p,2);g.set(i[S],i[S]+1,i[S]+2);for(var _=p+1;_<o;_++){var M=h(_,0),w=h(_,1),y=h(_,2);b.set(i[M],i[M]+1,i[M]+2);var E=1-g.dot(b)<f;E&&(S===M||S===w||S===y?x===M||x===w||x===y?(this.segments[S*a+x]=!0,this.segments[x*a+S]=!0):(this.segments[T*a+S]=!0,this.segments[S*a+T]=!0):(x===M||x===w||x===y)&&(this.segments[T*a+x]=!0,this.segments[x*a+T]=!0))}}var A=this.tempPlane_Cut;r.updateMatrix(),Ln.transformPlaneToLocalSpace(t,r.matrix,A);for(var p=0;p<o;p++)for(var U=h(p,0),L=h(p,1),F=h(p,2),V=0;V<3;V++){var O=V===0?U:V===1?L:F,Z=V===0?L:V===1?F:U,G=this.segments[O*a+Z];if(!G){this.segments[O*a+Z]=!0,this.segments[Z*a+O]=!0,v.set(s[3*O],s[3*O+1],s[3*O+2]),m.set(s[3*Z],s[3*Z+1],s[3*Z+2]);var it=0,et=A.distanceToPoint(v);et>f?(it=2,d.push(v.clone())):et<-f?(it=1,u.push(v.clone())):(it=3,u.push(v.clone()),d.push(v.clone()));var ot=0,et=A.distanceToPoint(m);if(et>f?(ot=2,d.push(m.clone())):et<-f?(ot=1,u.push(m.clone())):(ot=3,u.push(m.clone()),d.push(m.clone())),it===1&&ot===2||it===2&&ot===1){this.tempLine1.start.copy(v),this.tempLine1.end.copy(m);var St=new P;if(St=A.intersectLine(this.tempLine1,St),St===void 0)return console.error("Internal error: segment does not intersect plane."),e.segmentedObject1=null,e.segmentedObject2=null,0;u.push(St),d.push(St.clone())}}}var Dt=r.userData.ammoPhysicsData.mass*.5;this.tempCM1.set(0,0,0);var N=0,X=u.length;if(X>0){for(var p=0;p<X;p++)this.tempCM1.add(u[p]);this.tempCM1.divideScalar(X);for(var p=0;p<X;p++){var tt=u[p];tt.sub(this.tempCM1),N=Math.max(N,tt.x,tt.y,tt.z)}this.tempCM1.add(r.position)}this.tempCM2.set(0,0,0);var K=0,pt=d.length;if(pt>0){for(var p=0;p<pt;p++)this.tempCM2.add(d[p]);this.tempCM2.divideScalar(pt);for(var p=0;p<pt;p++){var tt=d[p];tt.sub(this.tempCM2),K=Math.max(K,tt.x,tt.y,tt.z)}this.tempCM2.add(r.position)}var It=null,bt=null,Wt=0;if(X>4)try{It=new Nt($l(u),r.material),It.position.copy(this.tempCM1),It.quaternion.copy(r.quaternion),It.userData=r.userData,this.prepareBreakableObject(It,Dt,r.userData.ammoPhysicsData.velocity,r.userData.ammoPhysicsData.angularVelocity,2*N>this.minSizeForBreak),Wt++}catch(Q){ss("Error in ConvexObjectBreaker.ts",!0),ss(Q,!0)}if(pt>4)try{bt=new Nt($l(d),r.material),bt.position.copy(this.tempCM2),bt.quaternion.copy(r.quaternion),bt.userData=r.userData,this.prepareBreakableObject(bt,Dt,r.userData.ammoPhysicsData.velocity,r.userData.ammoPhysicsData.angularVelocity,2*K>this.minSizeForBreak),Wt++}catch(Q){ss("Error in ConvexObjectBreaker.ts",!0),ss(Q,!0)}return e.object1=It,e.object2=bt,Wt}};Ln.transformFreeVector=function(r,t){var e=r.x,n=r.y,s=r.z,i=t.elements;return r.x=i[0]*e+i[4]*n+i[8]*s,r.y=i[1]*e+i[5]*n+i[9]*s,r.z=i[2]*e+i[6]*n+i[10]*s,r};Ln.transformFreeVectorInverse=function(r,t){var e=r.x,n=r.y,s=r.z,i=t.elements;return r.x=i[0]*e+i[1]*n+i[2]*s,r.y=i[4]*e+i[5]*n+i[6]*s,r.z=i[8]*e+i[9]*n+i[10]*s,r};Ln.transformTiedVectorInverse=function(r,t){var e=r.x,n=r.y,s=r.z,i=t.elements;return r.x=i[0]*e+i[1]*n+i[2]*s-i[12],r.y=i[4]*e+i[5]*n+i[6]*s-i[13],r.z=i[8]*e+i[9]*n+i[10]*s-i[14],r};Ln.transformPlaneToLocalSpace=(function(){var r=new P;return function(e,n,s){s.normal.copy(e.normal),s.constant=e.constant;var i=Ln.transformTiedVectorInverse(e.coplanarPoint(r),n);Ln.transformFreeVectorInverse(s.normal,n),s.constant=-i.dot(s.normal)}})();const gg=(()=>{try{if(typeof WebAssembly=="object"&&typeof WebAssembly.instantiate=="function"){const r=new WebAssembly.Module(Uint8Array.of(0,97,115,109,1,0,0,0));if(r instanceof WebAssembly.Module)return new WebAssembly.Instance(r)instanceof WebAssembly.Instance}}catch(r){r instanceof Error&&console.error(r.message)}return!1})(),Kl=(r,t)=>{var e=document.createElement("script");e.onload=()=>{t()},e.onerror=()=>{throw new Error(`failed to load ${r}`)},e.async=!0,e.src=r,document.head.appendChild(e)},vg=(r,t)=>{gg?Kl(`${r}/ammo.wasm.js`,()=>t()):Kl(`${r}/ammo.js`,()=>t())},xg=(r,t)=>{typeof window<"u"&&(window.__loadPhysics=!0),vg(r,()=>{Ammo().then(()=>{t()})})};function Qc(r,t){t.forEach(e=>{Object.getOwnPropertyNames(e.prototype).forEach(n=>{Object.defineProperty(r.prototype,n,Object.getOwnPropertyDescriptor(e.prototype,n)||Object.create(null))})})}/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */class _g{constructor(t){Ft(this,"physics");Ft(this,"_btRayCallback");this.physics=t}getHitPointWorld(){const t=this._btRayCallback.get_m_hitPointWorld();return{x:t.x(),y:t.y(),z:t.z()}}getHitNormalWorld(){const t=this._btRayCallback.get_m_hitNormalWorld();return{x:t.x(),y:t.y(),z:t.z()}}getCollisionObject(){return Ammo.castObject(this._btRayCallback.get_m_collisionObject(),Ammo.btRigidBody).threeObject}}/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */class yg{constructor(t){Ft(this,"physics");Ft(this,"_btRayCallback");this.physics=t}getHitPointsWorld(){const t=this._btRayCallback.get_m_hitPointWorld(),e=[];for(let n=t.size()-1;n>=0;n--){const s=t.at(n);e.push({x:s.x(),y:s.y(),z:s.z()})}return e}getHitPointWorld(){return ss("Use getHitPointsWorld() instead of getHitPointWorld() for the AllHitsRayCaster!"),this.getHitPointsWorld()}getHitNormalsWorld(){const t=this._btRayCallback.get_m_hitNormalWorld(),e=[];for(let n=t.size()-1;n>=0;n--){const s=t.at(n);e.push({x:s.x(),y:s.y(),z:s.z()})}return e}getCollisionObjects(){const t=[],e=this._btRayCallback.get_m_collisionObjects();for(let n=e.size()-1;n>=0;n--){const s=Ammo.castObject(e.at(n),Ammo.btRigidBody);t.push(s.threeObject)}return t}}/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */class th{constructor(t){Ft(this,"physics");Ft(this,"type");Ft(this,"_btRayFrom");Ft(this,"_btRayTo");Ft(this,"_btRayCallback");this.physics=t}setRayFromWorld(t=0,e=0,n=0){this._btRayFrom.setValue(t,e,n)}setRayToWorld(t=0,e=0,n=0){this._btRayTo.setValue(t,e,n)}hasHit(){return this._btRayCallback.hasHit()}rayTest(){typeof this._btRayCallback<"u"&&Ammo.destroy(this._btRayCallback),this._btRayCallback=this.type==="closest"?new Ammo.ClosestRayResultCallback(this._btRayFrom,this._btRayTo):new Ammo.AllHitsRayResultCallback(this._btRayFrom,this._btRayTo),this.physics.physicsWorld.rayTest(this._btRayFrom,this._btRayTo,this._btRayCallback)}destroy(){typeof this._btRayFrom<"u"&&Ammo.destroy(this._btRayFrom),typeof this._btRayTo<"u"&&Ammo.destroy(this._btRayTo),typeof this._btRayCallback<"u"&&Ammo.destroy(this._btRayCallback)}}class Mg{constructor(t){Ft(this,"physics");Ft(this,"type","closest");Ft(this,"_btRayFrom",new Ammo.btVector3(0,0,0));Ft(this,"_btRayTo",new Ammo.btVector3(0,0,0));Ft(this,"_btRayCallback");this.physics=t}}class Sg{constructor(t){Ft(this,"physics");Ft(this,"type","allHits");Ft(this,"_btRayFrom",new Ammo.btVector3(0,0,0));Ft(this,"_btRayTo",new Ammo.btVector3(0,0,0));Ft(this,"_btRayCallback");this.physics=t}}Qc(Mg,[th,_g]);Qc(Sg,[th,yg]);const wg="0.26.1",Eg=`Powered by enable3d v${wg}`;console.log(`%c %c %c %c %c ${Eg} %c https://enable3d.io/`,"background: #ff0000","background: #ffff00","background: #00ff00","background: #00ffff","color: #fff; background: #000000;","background: none");var Jl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ei={},ns={},jl;function Tg(){return jl||(jl=1,Object.defineProperty(ns,"__esModule",{value:!0}),ns.VERSION=void 0,ns.VERSION="0.0.5"),ns}var Ql;function bg(){if(Ql)return ei;Ql=1;/**
 * @package      npmjs.com/package/@yandeu/events (events.min.js)
 *
 * @author       Arnout Kazemier (https://github.com/3rd-Eden)
 * @copyright    Copyright (c) 2014 Arnout Kazemier
 * @license      {@link https://github.com/primus/eventemitter3/blob/master/LICENSE|MIT}
 *
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/yandeu/events
 * @license      {@link https://github.com/yandeu/events/blob/master/LICENSE|MIT}
 */var r=ei&&ei.__spreadArray||function(a,o){for(var l=0,h=o.length,u=a.length;l<h;l++,u++)a[u]=o[l];return a};Object.defineProperty(ei,"__esModule",{value:!0}),ei.Events=void 0;var t=Tg(),e=(function(){function a(o,l,h){h===void 0&&(h=!1),this.fn=o,this.context=l,this.once=h}return a})(),n=function(a,o,l,h,u){if(typeof l!="function")throw new TypeError("The listener must be a function");var d=new e(l,h||a,u);return a._events.has(o)?a._events.get(o).fn?a._events.set(o,[a._events.get(o),d]):a._events.get(o).push(d):(a._events.set(o,d),a._eventsCount++),a},s=function(a,o){--a._eventsCount===0?a._events=new Map:a._events.delete(o)},i=(function(){function a(){this._events=new Map,this._eventsCount=0}return Object.defineProperty(a,"VERSION",{get:function(){return t.VERSION},enumerable:!1,configurable:!0}),a.prototype.eventNames=function(){return Array.from(this._events.keys())},a.prototype.listeners=function(o){var l=this._events.get(o);if(!l)return[];if(l.fn)return[l.fn];for(var h=0,u=l.length,d=new Array(u);h<u;h++)d[h]=l[h].fn;return d},a.prototype.listenerCount=function(o){var l=this._events.get(o);return l?l.fn?1:l.length:0},a.prototype.emit=function(o){for(var l,h,u=[],d=1;d<arguments.length;d++)u[d-1]=arguments[d];if(!this._events.has(o))return!1;var f=this._events.get(o),c;if(f.fn)return f.once&&this.removeListener(o,f.fn,void 0,!0),(l=f.fn).call.apply(l,r([f.context],u)),!0;var p=f.length;for(c=0;c<p;c++)f[c].once&&this.removeListener(o,f[c].fn,void 0,!0),(h=f[c].fn).call.apply(h,r([f[c].context],u));return!0},a.prototype.on=function(o,l,h){return n(this,o,l,h,!1)},a.prototype.once=function(o,l,h){return n(this,o,l,h,!0)},a.prototype.removeListener=function(o,l,h,u){if(!this._events.has(o))return this;if(!l)return s(this,o),this;var d=this._events.get(o);if(d.fn)d.fn===l&&(!u||d.once)&&(!h||d.context===h)&&s(this,o);else{for(var f=0,c=[],p=d.length;f<p;f++)(d[f].fn!==l||u&&!d[f].once||h&&d[f].context!==h)&&c.push(d[f]);c.length?this._events.set(o,c.length===1?c[0]:c):s(this,o)}return this},a.prototype.removeAllListeners=function(o){return o?this._events.delete(o)&&s(this,o):(this._events=new Map,this._eventsCount=0),this},Object.defineProperty(a.prototype,"off",{get:function(){return this.removeListener},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"addListener",{get:function(){return this.on},enumerable:!1,configurable:!0}),a})();return ei.Events=i,ei}bg();/**
 * @author       Yannick Deubel (https://github.com/yandeu)
 * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
 * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
 */document.createElement("canvas");new Tf;new at;new at;new at;var hr={exports:{}};/*!
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
 */var Ag=hr.exports,tc;function Cg(){return tc||(tc=1,(function(r,t){(function(n,s){r.exports=s()})(Ag,function(){return(function(e){var n={};function s(i){if(n[i])return n[i].exports;var a=n[i]={i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}return s.m=e,s.c=n,s.d=function(i,a,o){s.o(i,a)||Object.defineProperty(i,a,{enumerable:!0,get:o})},s.r=function(i){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})},s.t=function(i,a){if(a&1&&(i=s(i)),a&8||a&4&&typeof i=="object"&&i&&i.__esModule)return i;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:i}),a&2&&typeof i!="string")for(var l in i)s.d(o,l,(function(h){return i[h]}).bind(null,l));return o},s.n=function(i){var a=i&&i.__esModule?function(){return i.default}:function(){return i};return s.d(a,"a",a),a},s.o=function(i,a){return Object.prototype.hasOwnProperty.call(i,a)},s.p="",s(s.s=22)})([(function(e,n){var s={};e.exports=s,(function(){s._nextId=0,s._seed=0,s._nowStartTime=+new Date,s._warnedOnce={},s._decomp=null,s.extend=function(a,o){var l,h;typeof o=="boolean"?(l=2,h=o):(l=1,h=!0);for(var u=l;u<arguments.length;u++){var d=arguments[u];if(d)for(var f in d)h&&d[f]&&d[f].constructor===Object&&(!a[f]||a[f].constructor===Object)?(a[f]=a[f]||{},s.extend(a[f],h,d[f])):a[f]=d[f]}return a},s.clone=function(a,o){return s.extend({},o,a)},s.keys=function(a){if(Object.keys)return Object.keys(a);var o=[];for(var l in a)o.push(l);return o},s.values=function(a){var o=[];if(Object.keys){for(var l=Object.keys(a),h=0;h<l.length;h++)o.push(a[l[h]]);return o}for(var u in a)o.push(a[u]);return o},s.get=function(a,o,l,h){o=o.split(".").slice(l,h);for(var u=0;u<o.length;u+=1)a=a[o[u]];return a},s.set=function(a,o,l,h,u){var d=o.split(".").slice(h,u);return s.get(a,o,0,-1)[d[d.length-1]]=l,l},s.shuffle=function(a){for(var o=a.length-1;o>0;o--){var l=Math.floor(s.random()*(o+1)),h=a[o];a[o]=a[l],a[l]=h}return a},s.choose=function(a){return a[Math.floor(s.random()*a.length)]},s.isElement=function(a){return typeof HTMLElement<"u"?a instanceof HTMLElement:!!(a&&a.nodeType&&a.nodeName)},s.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"},s.isFunction=function(a){return typeof a=="function"},s.isPlainObject=function(a){return typeof a=="object"&&a.constructor===Object},s.isString=function(a){return toString.call(a)==="[object String]"},s.clamp=function(a,o,l){return a<o?o:a>l?l:a},s.sign=function(a){return a<0?-1:1},s.now=function(){if(typeof window<"u"&&window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return Date.now?Date.now():new Date-s._nowStartTime},s.random=function(a,o){return a=typeof a<"u"?a:0,o=typeof o<"u"?o:1,a+i()*(o-a)};var i=function(){return s._seed=(s._seed*9301+49297)%233280,s._seed/233280};s.colorToNumber=function(a){return a=a.replace("#",""),a.length==3&&(a=a.charAt(0)+a.charAt(0)+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)),parseInt(a,16)},s.logLevel=1,s.log=function(){console&&s.logLevel>0&&s.logLevel<=3&&console.log.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},s.info=function(){console&&s.logLevel>0&&s.logLevel<=2&&console.info.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},s.warn=function(){console&&s.logLevel>0&&s.logLevel<=3&&console.warn.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},s.warnOnce=function(){var a=Array.prototype.slice.call(arguments).join(" ");s._warnedOnce[a]||(s.warn(a),s._warnedOnce[a]=!0)},s.deprecated=function(a,o,l){a[o]=s.chain(function(){s.warnOnce("🔅 deprecated 🔅",l)},a[o])},s.nextId=function(){return s._nextId++},s.indexOf=function(a,o){if(a.indexOf)return a.indexOf(o);for(var l=0;l<a.length;l++)if(a[l]===o)return l;return-1},s.map=function(a,o){if(a.map)return a.map(o);for(var l=[],h=0;h<a.length;h+=1)l.push(o(a[h]));return l},s.topologicalSort=function(a){var o=[],l=[],h=[];for(var u in a)!l[u]&&!h[u]&&s._topologicalSort(u,l,h,a,o);return o},s._topologicalSort=function(a,o,l,h,u){var d=h[a]||[];l[a]=!0;for(var f=0;f<d.length;f+=1){var c=d[f];l[c]||o[c]||s._topologicalSort(c,o,l,h,u)}l[a]=!1,o[a]=!0,u.push(a)},s.chain=function(){for(var a=[],o=0;o<arguments.length;o+=1){var l=arguments[o];l._chained?a.push.apply(a,l._chained):a.push(l)}var h=function(){for(var u,d=new Array(arguments.length),f=0,c=arguments.length;f<c;f++)d[f]=arguments[f];for(f=0;f<a.length;f+=1){var p=a[f].apply(u,d);typeof p<"u"&&(u=p)}return u};return h._chained=a,h},s.chainPathBefore=function(a,o,l){return s.set(a,o,s.chain(l,s.get(a,o)))},s.chainPathAfter=function(a,o,l){return s.set(a,o,s.chain(s.get(a,o),l))},s.setDecomp=function(a){s._decomp=a},s.getDecomp=function(){var a=s._decomp;try{!a&&typeof window<"u"&&(a=window.decomp),!a&&typeof Jl<"u"&&(a=Jl.decomp)}catch{a=null}return a}})()}),(function(e,n){var s={};e.exports=s,(function(){s.create=function(i){var a={min:{x:0,y:0},max:{x:0,y:0}};return i&&s.update(a,i),a},s.update=function(i,a,o){i.min.x=1/0,i.max.x=-1/0,i.min.y=1/0,i.max.y=-1/0;for(var l=0;l<a.length;l++){var h=a[l];h.x>i.max.x&&(i.max.x=h.x),h.x<i.min.x&&(i.min.x=h.x),h.y>i.max.y&&(i.max.y=h.y),h.y<i.min.y&&(i.min.y=h.y)}o&&(o.x>0?i.max.x+=o.x:i.min.x+=o.x,o.y>0?i.max.y+=o.y:i.min.y+=o.y)},s.contains=function(i,a){return a.x>=i.min.x&&a.x<=i.max.x&&a.y>=i.min.y&&a.y<=i.max.y},s.overlaps=function(i,a){return i.min.x<=a.max.x&&i.max.x>=a.min.x&&i.max.y>=a.min.y&&i.min.y<=a.max.y},s.translate=function(i,a){i.min.x+=a.x,i.max.x+=a.x,i.min.y+=a.y,i.max.y+=a.y},s.shift=function(i,a){var o=i.max.x-i.min.x,l=i.max.y-i.min.y;i.min.x=a.x,i.max.x=a.x+o,i.min.y=a.y,i.max.y=a.y+l}})()}),(function(e,n){var s={};e.exports=s,(function(){s.create=function(i,a){return{x:i||0,y:a||0}},s.clone=function(i){return{x:i.x,y:i.y}},s.magnitude=function(i){return Math.sqrt(i.x*i.x+i.y*i.y)},s.magnitudeSquared=function(i){return i.x*i.x+i.y*i.y},s.rotate=function(i,a,o){var l=Math.cos(a),h=Math.sin(a);o||(o={});var u=i.x*l-i.y*h;return o.y=i.x*h+i.y*l,o.x=u,o},s.rotateAbout=function(i,a,o,l){var h=Math.cos(a),u=Math.sin(a);l||(l={});var d=o.x+((i.x-o.x)*h-(i.y-o.y)*u);return l.y=o.y+((i.x-o.x)*u+(i.y-o.y)*h),l.x=d,l},s.normalise=function(i){var a=s.magnitude(i);return a===0?{x:0,y:0}:{x:i.x/a,y:i.y/a}},s.dot=function(i,a){return i.x*a.x+i.y*a.y},s.cross=function(i,a){return i.x*a.y-i.y*a.x},s.cross3=function(i,a,o){return(a.x-i.x)*(o.y-i.y)-(a.y-i.y)*(o.x-i.x)},s.add=function(i,a,o){return o||(o={}),o.x=i.x+a.x,o.y=i.y+a.y,o},s.sub=function(i,a,o){return o||(o={}),o.x=i.x-a.x,o.y=i.y-a.y,o},s.mult=function(i,a){return{x:i.x*a,y:i.y*a}},s.div=function(i,a){return{x:i.x/a,y:i.y/a}},s.perp=function(i,a){return a=a===!0?-1:1,{x:a*-i.y,y:a*i.x}},s.neg=function(i){return{x:-i.x,y:-i.y}},s.angle=function(i,a){return Math.atan2(a.y-i.y,a.x-i.x)},s._temp=[s.create(),s.create(),s.create(),s.create(),s.create(),s.create()]})()}),(function(e,n,s){var i={};e.exports=i;var a=s(2),o=s(0);(function(){i.create=function(l,h){for(var u=[],d=0;d<l.length;d++){var f=l[d],c={x:f.x,y:f.y,index:d,body:h,isInternal:!1};u.push(c)}return u},i.fromPath=function(l,h){var u=/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,d=[];return l.replace(u,function(f,c,p){d.push({x:parseFloat(c),y:parseFloat(p)})}),i.create(d,h)},i.centre=function(l){for(var h=i.area(l,!0),u={x:0,y:0},d,f,c,p=0;p<l.length;p++)c=(p+1)%l.length,d=a.cross(l[p],l[c]),f=a.mult(a.add(l[p],l[c]),d),u=a.add(u,f);return a.div(u,6*h)},i.mean=function(l){for(var h={x:0,y:0},u=0;u<l.length;u++)h.x+=l[u].x,h.y+=l[u].y;return a.div(h,l.length)},i.area=function(l,h){for(var u=0,d=l.length-1,f=0;f<l.length;f++)u+=(l[d].x-l[f].x)*(l[d].y+l[f].y),d=f;return h?u/2:Math.abs(u)/2},i.inertia=function(l,h){for(var u=0,d=0,f=l,c,p,v=0;v<f.length;v++)p=(v+1)%f.length,c=Math.abs(a.cross(f[p],f[v])),u+=c*(a.dot(f[p],f[p])+a.dot(f[p],f[v])+a.dot(f[v],f[v])),d+=c;return h/6*(u/d)},i.translate=function(l,h,u){var d;if(u)for(d=0;d<l.length;d++)l[d].x+=h.x*u,l[d].y+=h.y*u;else for(d=0;d<l.length;d++)l[d].x+=h.x,l[d].y+=h.y;return l},i.rotate=function(l,h,u){if(h!==0){for(var d=Math.cos(h),f=Math.sin(h),c=0;c<l.length;c++){var p=l[c],v=p.x-u.x,m=p.y-u.y;p.x=u.x+(v*d-m*f),p.y=u.y+(v*f+m*d)}return l}},i.contains=function(l,h){for(var u=0;u<l.length;u++){var d=l[u],f=l[(u+1)%l.length];if((h.x-d.x)*(f.y-d.y)+(h.y-d.y)*(d.x-f.x)>0)return!1}return!0},i.scale=function(l,h,u,d){if(h===1&&u===1)return l;d=d||i.centre(l);for(var f,c,p=0;p<l.length;p++)f=l[p],c=a.sub(f,d),l[p].x=d.x+c.x*h,l[p].y=d.y+c.y*u;return l},i.chamfer=function(l,h,u,d,f){typeof h=="number"?h=[h]:h=h||[8],u=typeof u<"u"?u:-1,d=d||2,f=f||14;for(var c=[],p=0;p<l.length;p++){var v=l[p-1>=0?p-1:l.length-1],m=l[p],g=l[(p+1)%l.length],b=h[p<h.length?p:h.length-1];if(b===0){c.push(m);continue}var S=a.normalise({x:m.y-v.y,y:v.x-m.x}),x=a.normalise({x:g.y-m.y,y:m.x-g.x}),T=Math.sqrt(2*Math.pow(b,2)),_=a.mult(o.clone(S),b),M=a.normalise(a.mult(a.add(S,x),.5)),w=a.sub(m,a.mult(M,T)),y=u;u===-1&&(y=Math.pow(b,.32)*1.75),y=o.clamp(y,d,f),y%2===1&&(y+=1);for(var E=Math.acos(a.dot(S,x)),A=E/y,U=0;U<y;U++)c.push(a.add(a.rotate(_,A*U),w))}return c},i.clockwiseSort=function(l){var h=i.mean(l);return l.sort(function(u,d){return a.angle(h,u)-a.angle(h,d)}),l},i.isConvex=function(l){var h=0,u=l.length,d,f,c,p;if(u<3)return null;for(d=0;d<u;d++)if(f=(d+1)%u,c=(d+2)%u,p=(l[f].x-l[d].x)*(l[c].y-l[f].y),p-=(l[f].y-l[d].y)*(l[c].x-l[f].x),p<0?h|=1:p>0&&(h|=2),h===3)return!1;return h!==0?!0:null},i.hull=function(l){var h=[],u=[],d,f;for(l=l.slice(0),l.sort(function(c,p){var v=c.x-p.x;return v!==0?v:c.y-p.y}),f=0;f<l.length;f+=1){for(d=l[f];u.length>=2&&a.cross3(u[u.length-2],u[u.length-1],d)<=0;)u.pop();u.push(d)}for(f=l.length-1;f>=0;f-=1){for(d=l[f];h.length>=2&&a.cross3(h[h.length-2],h[h.length-1],d)<=0;)h.pop();h.push(d)}return h.pop(),u.pop(),h.concat(u)}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(0);(function(){i.on=function(o,l,h){for(var u=l.split(" "),d,f=0;f<u.length;f++)d=u[f],o.events=o.events||{},o.events[d]=o.events[d]||[],o.events[d].push(h);return h},i.off=function(o,l,h){if(!l){o.events={};return}typeof l=="function"&&(h=l,l=a.keys(o.events).join(" "));for(var u=l.split(" "),d=0;d<u.length;d++){var f=o.events[u[d]],c=[];if(h&&f)for(var p=0;p<f.length;p++)f[p]!==h&&c.push(f[p]);o.events[u[d]]=c}},i.trigger=function(o,l,h){var u,d,f,c,p=o.events;if(p&&a.keys(p).length>0){h||(h={}),u=l.split(" ");for(var v=0;v<u.length;v++)if(d=u[v],f=p[d],f){c=a.clone(h,!1),c.name=d,c.source=o;for(var m=0;m<f.length;m++)f[m].apply(o,[c])}}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(4),o=s(0),l=s(1),h=s(6);(function(){i.create=function(u){return o.extend({id:o.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite",plugin:{}},u)},i.setModified=function(u,d,f,c){if(u.isModified=d,f&&u.parent&&i.setModified(u.parent,d,f,c),c)for(var p=0;p<u.composites.length;p++){var v=u.composites[p];i.setModified(v,d,f,c)}},i.add=function(u,d){var f=[].concat(d);a.trigger(u,"beforeAdd",{object:d});for(var c=0;c<f.length;c++){var p=f[c];switch(p.type){case"body":if(p.parent!==p){o.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break}i.addBody(u,p);break;case"constraint":i.addConstraint(u,p);break;case"composite":i.addComposite(u,p);break;case"mouseConstraint":i.addConstraint(u,p.constraint);break}}return a.trigger(u,"afterAdd",{object:d}),u},i.remove=function(u,d,f){var c=[].concat(d);a.trigger(u,"beforeRemove",{object:d});for(var p=0;p<c.length;p++){var v=c[p];switch(v.type){case"body":i.removeBody(u,v,f);break;case"constraint":i.removeConstraint(u,v,f);break;case"composite":i.removeComposite(u,v,f);break;case"mouseConstraint":i.removeConstraint(u,v.constraint);break}}return a.trigger(u,"afterRemove",{object:d}),u},i.addComposite=function(u,d){return u.composites.push(d),d.parent=u,i.setModified(u,!0,!0,!1),u},i.removeComposite=function(u,d,f){var c=o.indexOf(u.composites,d);if(c!==-1&&(i.removeCompositeAt(u,c),i.setModified(u,!0,!0,!1)),f)for(var p=0;p<u.composites.length;p++)i.removeComposite(u.composites[p],d,!0);return u},i.removeCompositeAt=function(u,d){return u.composites.splice(d,1),i.setModified(u,!0,!0,!1),u},i.addBody=function(u,d){return u.bodies.push(d),i.setModified(u,!0,!0,!1),u},i.removeBody=function(u,d,f){var c=o.indexOf(u.bodies,d);if(c!==-1&&(i.removeBodyAt(u,c),i.setModified(u,!0,!0,!1)),f)for(var p=0;p<u.composites.length;p++)i.removeBody(u.composites[p],d,!0);return u},i.removeBodyAt=function(u,d){return u.bodies.splice(d,1),i.setModified(u,!0,!0,!1),u},i.addConstraint=function(u,d){return u.constraints.push(d),i.setModified(u,!0,!0,!1),u},i.removeConstraint=function(u,d,f){var c=o.indexOf(u.constraints,d);if(c!==-1&&i.removeConstraintAt(u,c),f)for(var p=0;p<u.composites.length;p++)i.removeConstraint(u.composites[p],d,!0);return u},i.removeConstraintAt=function(u,d){return u.constraints.splice(d,1),i.setModified(u,!0,!0,!1),u},i.clear=function(u,d,f){if(f)for(var c=0;c<u.composites.length;c++)i.clear(u.composites[c],d,!0);return d?u.bodies=u.bodies.filter(function(p){return p.isStatic}):u.bodies.length=0,u.constraints.length=0,u.composites.length=0,i.setModified(u,!0,!0,!1),u},i.allBodies=function(u){for(var d=[].concat(u.bodies),f=0;f<u.composites.length;f++)d=d.concat(i.allBodies(u.composites[f]));return d},i.allConstraints=function(u){for(var d=[].concat(u.constraints),f=0;f<u.composites.length;f++)d=d.concat(i.allConstraints(u.composites[f]));return d},i.allComposites=function(u){for(var d=[].concat(u.composites),f=0;f<u.composites.length;f++)d=d.concat(i.allComposites(u.composites[f]));return d},i.get=function(u,d,f){var c,p;switch(f){case"body":c=i.allBodies(u);break;case"constraint":c=i.allConstraints(u);break;case"composite":c=i.allComposites(u).concat(u);break}return c?(p=c.filter(function(v){return v.id.toString()===d.toString()}),p.length===0?null:p[0]):null},i.move=function(u,d,f){return i.remove(u,d),i.add(f,d),u},i.rebase=function(u){for(var d=i.allBodies(u).concat(i.allConstraints(u)).concat(i.allComposites(u)),f=0;f<d.length;f++)d[f].id=o.nextId();return i.setModified(u,!0,!0,!1),u},i.translate=function(u,d,f){for(var c=f?i.allBodies(u):u.bodies,p=0;p<c.length;p++)h.translate(c[p],d);return i.setModified(u,!0,!0,!1),u},i.rotate=function(u,d,f,c){for(var p=Math.cos(d),v=Math.sin(d),m=c?i.allBodies(u):u.bodies,g=0;g<m.length;g++){var b=m[g],S=b.position.x-f.x,x=b.position.y-f.y;h.setPosition(b,{x:f.x+(S*p-x*v),y:f.y+(S*v+x*p)}),h.rotate(b,d)}return i.setModified(u,!0,!0,!1),u},i.scale=function(u,d,f,c,p){for(var v=p?i.allBodies(u):u.bodies,m=0;m<v.length;m++){var g=v[m],b=g.position.x-c.x,S=g.position.y-c.y;h.setPosition(g,{x:c.x+b*d,y:c.y+S*f}),h.scale(g,d,f)}return i.setModified(u,!0,!0,!1),u},i.bounds=function(u){for(var d=i.allBodies(u),f=[],c=0;c<d.length;c+=1){var p=d[c];f.push(p.bounds.min,p.bounds.max)}return l.create(f)}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(2),l=s(7);s(16);var h=s(0),u=s(1),d=s(10);(function(){i._inertiaScale=4,i._nextCollidingGroupId=1,i._nextNonCollidingGroupId=-1,i._nextCategory=1,i.create=function(c){var p={id:h.nextId(),type:"body",label:"Body",parts:[],plugin:{},angle:0,vertices:a.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,strokeStyle:null,fillStyle:null,lineWidth:null,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0}},events:null,bounds:null,chamfer:null,circleRadius:0,positionPrev:null,anglePrev:0,parent:null,axes:null,area:0,mass:0,inertia:0,_original:null},v=h.extend(p,c);return f(v,c),v},i.nextGroup=function(c){return c?i._nextNonCollidingGroupId--:i._nextCollidingGroupId++},i.nextCategory=function(){return i._nextCategory=i._nextCategory<<1,i._nextCategory};var f=function(c,p){p=p||{},i.set(c,{bounds:c.bounds||u.create(c.vertices),positionPrev:c.positionPrev||o.clone(c.position),anglePrev:c.anglePrev||c.angle,vertices:c.vertices,parts:c.parts||[c],isStatic:c.isStatic,isSleeping:c.isSleeping,parent:c.parent||c}),a.rotate(c.vertices,c.angle,c.position),d.rotate(c.axes,c.angle),u.update(c.bounds,c.vertices,c.velocity),i.set(c,{axes:p.axes||c.axes,area:p.area||c.area,mass:p.mass||c.mass,inertia:p.inertia||c.inertia});var v=c.isStatic?"#14151f":h.choose(["#f19648","#f5d259","#f55a3c","#063e7b","#ececd1"]),m=c.isStatic?"#555":"#ccc",g=c.isStatic&&c.render.fillStyle===null?1:0;c.render.fillStyle=c.render.fillStyle||v,c.render.strokeStyle=c.render.strokeStyle||m,c.render.lineWidth=c.render.lineWidth||g,c.render.sprite.xOffset+=-(c.bounds.min.x-c.position.x)/(c.bounds.max.x-c.bounds.min.x),c.render.sprite.yOffset+=-(c.bounds.min.y-c.position.y)/(c.bounds.max.y-c.bounds.min.y)};i.set=function(c,p,v){var m;typeof p=="string"&&(m=p,p={},p[m]=v);for(m in p)if(Object.prototype.hasOwnProperty.call(p,m))switch(v=p[m],m){case"isStatic":i.setStatic(c,v);break;case"isSleeping":l.set(c,v);break;case"mass":i.setMass(c,v);break;case"density":i.setDensity(c,v);break;case"inertia":i.setInertia(c,v);break;case"vertices":i.setVertices(c,v);break;case"position":i.setPosition(c,v);break;case"angle":i.setAngle(c,v);break;case"velocity":i.setVelocity(c,v);break;case"angularVelocity":i.setAngularVelocity(c,v);break;case"parts":i.setParts(c,v);break;case"centre":i.setCentre(c,v);break;default:c[m]=v}},i.setStatic=function(c,p){for(var v=0;v<c.parts.length;v++){var m=c.parts[v];m.isStatic=p,p?(m._original={restitution:m.restitution,friction:m.friction,mass:m.mass,inertia:m.inertia,density:m.density,inverseMass:m.inverseMass,inverseInertia:m.inverseInertia},m.restitution=0,m.friction=1,m.mass=m.inertia=m.density=1/0,m.inverseMass=m.inverseInertia=0,m.positionPrev.x=m.position.x,m.positionPrev.y=m.position.y,m.anglePrev=m.angle,m.angularVelocity=0,m.speed=0,m.angularSpeed=0,m.motion=0):m._original&&(m.restitution=m._original.restitution,m.friction=m._original.friction,m.mass=m._original.mass,m.inertia=m._original.inertia,m.density=m._original.density,m.inverseMass=m._original.inverseMass,m.inverseInertia=m._original.inverseInertia,m._original=null)}},i.setMass=function(c,p){var v=c.inertia/(c.mass/6);c.inertia=v*(p/6),c.inverseInertia=1/c.inertia,c.mass=p,c.inverseMass=1/c.mass,c.density=c.mass/c.area},i.setDensity=function(c,p){i.setMass(c,p*c.area),c.density=p},i.setInertia=function(c,p){c.inertia=p,c.inverseInertia=1/c.inertia},i.setVertices=function(c,p){p[0].body===c?c.vertices=p:c.vertices=a.create(p,c),c.axes=d.fromVertices(c.vertices),c.area=a.area(c.vertices),i.setMass(c,c.density*c.area);var v=a.centre(c.vertices);a.translate(c.vertices,v,-1),i.setInertia(c,i._inertiaScale*a.inertia(c.vertices,c.mass)),a.translate(c.vertices,c.position),u.update(c.bounds,c.vertices,c.velocity)},i.setParts=function(c,p,v){var m;for(p=p.slice(0),c.parts.length=0,c.parts.push(c),c.parent=c,m=0;m<p.length;m++){var g=p[m];g!==c&&(g.parent=c,c.parts.push(g))}if(c.parts.length!==1){if(v=typeof v<"u"?v:!0,v){var b=[];for(m=0;m<p.length;m++)b=b.concat(p[m].vertices);a.clockwiseSort(b);var S=a.hull(b),x=a.centre(S);i.setVertices(c,S),a.translate(c.vertices,x)}var T=i._totalProperties(c);c.area=T.area,c.parent=c,c.position.x=T.centre.x,c.position.y=T.centre.y,c.positionPrev.x=T.centre.x,c.positionPrev.y=T.centre.y,i.setMass(c,T.mass),i.setInertia(c,T.inertia),i.setPosition(c,T.centre)}},i.setCentre=function(c,p,v){v?(c.positionPrev.x+=p.x,c.positionPrev.y+=p.y,c.position.x+=p.x,c.position.y+=p.y):(c.positionPrev.x=p.x-(c.position.x-c.positionPrev.x),c.positionPrev.y=p.y-(c.position.y-c.positionPrev.y),c.position.x=p.x,c.position.y=p.y)},i.setPosition=function(c,p){var v=o.sub(p,c.position);c.positionPrev.x+=v.x,c.positionPrev.y+=v.y;for(var m=0;m<c.parts.length;m++){var g=c.parts[m];g.position.x+=v.x,g.position.y+=v.y,a.translate(g.vertices,v),u.update(g.bounds,g.vertices,c.velocity)}},i.setAngle=function(c,p){var v=p-c.angle;c.anglePrev+=v;for(var m=0;m<c.parts.length;m++){var g=c.parts[m];g.angle+=v,a.rotate(g.vertices,v,c.position),d.rotate(g.axes,v),u.update(g.bounds,g.vertices,c.velocity),m>0&&o.rotateAbout(g.position,v,c.position,g.position)}},i.setVelocity=function(c,p){c.positionPrev.x=c.position.x-p.x,c.positionPrev.y=c.position.y-p.y,c.velocity.x=p.x,c.velocity.y=p.y,c.speed=o.magnitude(c.velocity)},i.setAngularVelocity=function(c,p){c.anglePrev=c.angle-p,c.angularVelocity=p,c.angularSpeed=Math.abs(c.angularVelocity)},i.translate=function(c,p){i.setPosition(c,o.add(c.position,p))},i.rotate=function(c,p,v){if(!v)i.setAngle(c,c.angle+p);else{var m=Math.cos(p),g=Math.sin(p),b=c.position.x-v.x,S=c.position.y-v.y;i.setPosition(c,{x:v.x+(b*m-S*g),y:v.y+(b*g+S*m)}),i.setAngle(c,c.angle+p)}},i.scale=function(c,p,v,m){var g=0,b=0;m=m||c.position;for(var S=0;S<c.parts.length;S++){var x=c.parts[S];a.scale(x.vertices,p,v,m),x.axes=d.fromVertices(x.vertices),x.area=a.area(x.vertices),i.setMass(x,c.density*x.area),a.translate(x.vertices,{x:-x.position.x,y:-x.position.y}),i.setInertia(x,i._inertiaScale*a.inertia(x.vertices,x.mass)),a.translate(x.vertices,{x:x.position.x,y:x.position.y}),S>0&&(g+=x.area,b+=x.inertia),x.position.x=m.x+(x.position.x-m.x)*p,x.position.y=m.y+(x.position.y-m.y)*v,u.update(x.bounds,x.vertices,c.velocity)}c.parts.length>1&&(c.area=g,c.isStatic||(i.setMass(c,c.density*g),i.setInertia(c,b))),c.circleRadius&&(p===v?c.circleRadius*=p:c.circleRadius=null)},i.update=function(c,p,v,m){var g=Math.pow(p*v*c.timeScale,2),b=1-c.frictionAir*v*c.timeScale,S=c.position.x-c.positionPrev.x,x=c.position.y-c.positionPrev.y;c.velocity.x=S*b*m+c.force.x/c.mass*g,c.velocity.y=x*b*m+c.force.y/c.mass*g,c.positionPrev.x=c.position.x,c.positionPrev.y=c.position.y,c.position.x+=c.velocity.x,c.position.y+=c.velocity.y,c.angularVelocity=(c.angle-c.anglePrev)*b*m+c.torque/c.inertia*g,c.anglePrev=c.angle,c.angle+=c.angularVelocity,c.speed=o.magnitude(c.velocity),c.angularSpeed=Math.abs(c.angularVelocity);for(var T=0;T<c.parts.length;T++){var _=c.parts[T];a.translate(_.vertices,c.velocity),T>0&&(_.position.x+=c.velocity.x,_.position.y+=c.velocity.y),c.angularVelocity!==0&&(a.rotate(_.vertices,c.angularVelocity,c.position),d.rotate(_.axes,c.angularVelocity),T>0&&o.rotateAbout(_.position,c.angularVelocity,c.position,_.position)),u.update(_.bounds,_.vertices,c.velocity)}},i.applyForce=function(c,p,v){c.force.x+=v.x,c.force.y+=v.y;var m={x:p.x-c.position.x,y:p.y-c.position.y};c.torque+=m.x*v.y-m.y*v.x},i._totalProperties=function(c){for(var p={mass:0,area:0,inertia:0,centre:{x:0,y:0}},v=c.parts.length===1?0:1;v<c.parts.length;v++){var m=c.parts[v],g=m.mass!==1/0?m.mass:1;p.mass+=g,p.area+=m.area,p.inertia+=m.inertia,p.centre=o.add(p.centre,o.mult(m.position,g))}return p.centre=o.div(p.centre,p.mass),p}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(4);(function(){i._motionWakeThreshold=.18,i._motionSleepThreshold=.08,i._minBias=.9,i.update=function(o,l){for(var h=l*l*l,u=0;u<o.length;u++){var d=o[u],f=d.speed*d.speed+d.angularSpeed*d.angularSpeed;if(d.force.x!==0||d.force.y!==0){i.set(d,!1);continue}var c=Math.min(d.motion,f),p=Math.max(d.motion,f);d.motion=i._minBias*c+(1-i._minBias)*p,d.sleepThreshold>0&&d.motion<i._motionSleepThreshold*h?(d.sleepCounter+=1,d.sleepCounter>=d.sleepThreshold&&i.set(d,!0)):d.sleepCounter>0&&(d.sleepCounter-=1)}},i.afterCollisions=function(o,l){for(var h=l*l*l,u=0;u<o.length;u++){var d=o[u];if(d.isActive){var f=d.collision,c=f.bodyA.parent,p=f.bodyB.parent;if(!(c.isSleeping&&p.isSleeping||c.isStatic||p.isStatic)&&(c.isSleeping||p.isSleeping)){var v=c.isSleeping&&!c.isStatic?c:p,m=v===c?p:c;!v.isStatic&&m.motion>i._motionWakeThreshold*h&&i.set(v,!1)}}}},i.set=function(o,l){var h=o.isSleeping;l?(o.isSleeping=!0,o.sleepCounter=o.sleepThreshold,o.positionImpulse.x=0,o.positionImpulse.y=0,o.positionPrev.x=o.position.x,o.positionPrev.y=o.position.y,o.anglePrev=o.angle,o.speed=0,o.angularSpeed=0,o.motion=0,h||a.trigger(o,"sleepStart")):(o.isSleeping=!1,o.sleepCounter=0,h&&a.trigger(o,"sleepEnd"))}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(2),l=s(7),h=s(1),u=s(10),d=s(0);(function(){i._warming=.4,i._torqueDampen=1,i._minLength=1e-6,i.create=function(f){var c=f;c.bodyA&&!c.pointA&&(c.pointA={x:0,y:0}),c.bodyB&&!c.pointB&&(c.pointB={x:0,y:0});var p=c.bodyA?o.add(c.bodyA.position,c.pointA):c.pointA,v=c.bodyB?o.add(c.bodyB.position,c.pointB):c.pointB,m=o.magnitude(o.sub(p,v));c.length=typeof c.length<"u"?c.length:m,c.id=c.id||d.nextId(),c.label=c.label||"Constraint",c.type="constraint",c.stiffness=c.stiffness||(c.length>0?1:.7),c.damping=c.damping||0,c.angularStiffness=c.angularStiffness||0,c.angleA=c.bodyA?c.bodyA.angle:c.angleA,c.angleB=c.bodyB?c.bodyB.angle:c.angleB,c.plugin={};var g={visible:!0,lineWidth:2,strokeStyle:"#ffffff",type:"line",anchors:!0};return c.length===0&&c.stiffness>.1?(g.type="pin",g.anchors=!1):c.stiffness<.9&&(g.type="spring"),c.render=d.extend(g,c.render),c},i.preSolveAll=function(f){for(var c=0;c<f.length;c+=1){var p=f[c],v=p.constraintImpulse;p.isStatic||v.x===0&&v.y===0&&v.angle===0||(p.position.x+=v.x,p.position.y+=v.y,p.angle+=v.angle)}},i.solveAll=function(f,c){for(var p=0;p<f.length;p+=1){var v=f[p],m=!v.bodyA||v.bodyA&&v.bodyA.isStatic,g=!v.bodyB||v.bodyB&&v.bodyB.isStatic;(m||g)&&i.solve(f[p],c)}for(p=0;p<f.length;p+=1)v=f[p],m=!v.bodyA||v.bodyA&&v.bodyA.isStatic,g=!v.bodyB||v.bodyB&&v.bodyB.isStatic,!m&&!g&&i.solve(f[p],c)},i.solve=function(f,c){var p=f.bodyA,v=f.bodyB,m=f.pointA,g=f.pointB;if(!(!p&&!v)){p&&!p.isStatic&&(o.rotate(m,p.angle-f.angleA,m),f.angleA=p.angle),v&&!v.isStatic&&(o.rotate(g,v.angle-f.angleB,g),f.angleB=v.angle);var b=m,S=g;if(p&&(b=o.add(p.position,m)),v&&(S=o.add(v.position,g)),!(!b||!S)){var x=o.sub(b,S),T=o.magnitude(x);T<i._minLength&&(T=i._minLength);var _=(T-f.length)/T,M=f.stiffness<1?f.stiffness*c:f.stiffness,w=o.mult(x,_*M),y=(p?p.inverseMass:0)+(v?v.inverseMass:0),E=(p?p.inverseInertia:0)+(v?v.inverseInertia:0),A=y+E,U,L,F,V,O;if(f.damping){var Z=o.create();F=o.div(x,T),O=o.sub(v&&o.sub(v.position,v.positionPrev)||Z,p&&o.sub(p.position,p.positionPrev)||Z),V=o.dot(F,O)}p&&!p.isStatic&&(L=p.inverseMass/y,p.constraintImpulse.x-=w.x*L,p.constraintImpulse.y-=w.y*L,p.position.x-=w.x*L,p.position.y-=w.y*L,f.damping&&(p.positionPrev.x-=f.damping*F.x*V*L,p.positionPrev.y-=f.damping*F.y*V*L),U=o.cross(m,w)/A*i._torqueDampen*p.inverseInertia*(1-f.angularStiffness),p.constraintImpulse.angle-=U,p.angle-=U),v&&!v.isStatic&&(L=v.inverseMass/y,v.constraintImpulse.x+=w.x*L,v.constraintImpulse.y+=w.y*L,v.position.x+=w.x*L,v.position.y+=w.y*L,f.damping&&(v.positionPrev.x+=f.damping*F.x*V*L,v.positionPrev.y+=f.damping*F.y*V*L),U=o.cross(g,w)/A*i._torqueDampen*v.inverseInertia*(1-f.angularStiffness),v.constraintImpulse.angle+=U,v.angle+=U)}}},i.postSolveAll=function(f){for(var c=0;c<f.length;c++){var p=f[c],v=p.constraintImpulse;if(!(p.isStatic||v.x===0&&v.y===0&&v.angle===0)){l.set(p,!1);for(var m=0;m<p.parts.length;m++){var g=p.parts[m];a.translate(g.vertices,v),m>0&&(g.position.x+=v.x,g.position.y+=v.y),v.angle!==0&&(a.rotate(g.vertices,v.angle,p.position),u.rotate(g.axes,v.angle),m>0&&o.rotateAbout(g.position,v.angle,p.position,g.position)),h.update(g.bounds,g.vertices,p.velocity)}v.angle*=i._warming,v.x*=i._warming,v.y*=i._warming}}},i.pointAWorld=function(f){return{x:(f.bodyA?f.bodyA.position.x:0)+f.pointA.x,y:(f.bodyA?f.bodyA.position.y:0)+f.pointA.y}},i.pointBWorld=function(f){return{x:(f.bodyB?f.bodyB.position.x:0)+f.pointB.x,y:(f.bodyB?f.bodyB.position.y:0)+f.pointB.y}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(17);(function(){i.create=function(o,l){var h=o.bodyA,u=o.bodyB,d=o.parentA,f=o.parentB,c={id:i.id(h,u),bodyA:h,bodyB:u,contacts:{},activeContacts:[],separation:0,isActive:!0,confirmedActive:!0,isSensor:h.isSensor||u.isSensor,timeCreated:l,timeUpdated:l,inverseMass:d.inverseMass+f.inverseMass,friction:Math.min(d.friction,f.friction),frictionStatic:Math.max(d.frictionStatic,f.frictionStatic),restitution:Math.max(d.restitution,f.restitution),slop:Math.max(d.slop,f.slop)};return i.update(c,o,l),c},i.update=function(o,l,h){var u=o.contacts,d=l.supports,f=o.activeContacts,c=l.parentA,p=l.parentB;if(o.collision=l,o.inverseMass=c.inverseMass+p.inverseMass,o.friction=Math.min(c.friction,p.friction),o.frictionStatic=Math.max(c.frictionStatic,p.frictionStatic),o.restitution=Math.max(c.restitution,p.restitution),o.slop=Math.max(c.slop,p.slop),f.length=0,l.collided){for(var v=0;v<d.length;v++){var m=d[v],g=a.id(m),b=u[g];b?f.push(b):f.push(u[g]=a.create(m))}o.separation=l.depth,i.setActive(o,!0,h)}else o.isActive===!0&&i.setActive(o,!1,h)},i.setActive=function(o,l,h){l?(o.isActive=!0,o.timeUpdated=h):(o.isActive=!1,o.activeContacts.length=0)},i.id=function(o,l){return o.id<l.id?"A"+o.id+"B"+l.id:"A"+l.id+"B"+o.id}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(2),o=s(0);(function(){i.fromVertices=function(l){for(var h={},u=0;u<l.length;u++){var d=(u+1)%l.length,f=a.normalise({x:l[d].y-l[u].y,y:l[u].x-l[d].x}),c=f.y===0?1/0:f.x/f.y;c=c.toFixed(3).toString(),h[c]=f}return o.values(h)},i.rotate=function(l,h){if(h!==0)for(var u=Math.cos(h),d=Math.sin(h),f=0;f<l.length;f++){var c=l[f],p;p=c.x*u-c.y*d,c.y=c.x*d+c.y*u,c.x=p}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(0),l=s(6),h=s(1),u=s(2);(function(){i.rectangle=function(d,f,c,p,v){v=v||{};var m={label:"Rectangle Body",position:{x:d,y:f},vertices:a.fromPath("L 0 0 L "+c+" 0 L "+c+" "+p+" L 0 "+p)};if(v.chamfer){var g=v.chamfer;m.vertices=a.chamfer(m.vertices,g.radius,g.quality,g.qualityMin,g.qualityMax),delete v.chamfer}return l.create(o.extend({},m,v))},i.trapezoid=function(d,f,c,p,v,m){m=m||{},v*=.5;var g=(1-v*2)*c,b=c*v,S=b+g,x=S+b,T;v<.5?T="L 0 0 L "+b+" "+-p+" L "+S+" "+-p+" L "+x+" 0":T="L 0 0 L "+S+" "+-p+" L "+x+" 0";var _={label:"Trapezoid Body",position:{x:d,y:f},vertices:a.fromPath(T)};if(m.chamfer){var M=m.chamfer;_.vertices=a.chamfer(_.vertices,M.radius,M.quality,M.qualityMin,M.qualityMax),delete m.chamfer}return l.create(o.extend({},_,m))},i.circle=function(d,f,c,p,v){p=p||{};var m={label:"Circle Body",circleRadius:c};v=v||25;var g=Math.ceil(Math.max(10,Math.min(v,c)));return g%2===1&&(g+=1),i.polygon(d,f,g,c,o.extend({},m,p))},i.polygon=function(d,f,c,p,v){if(v=v||{},c<3)return i.circle(d,f,p,v);for(var m=2*Math.PI/c,g="",b=m*.5,S=0;S<c;S+=1){var x=b+S*m,T=Math.cos(x)*p,_=Math.sin(x)*p;g+="L "+T.toFixed(3)+" "+_.toFixed(3)+" "}var M={label:"Polygon Body",position:{x:d,y:f},vertices:a.fromPath(g)};if(v.chamfer){var w=v.chamfer;M.vertices=a.chamfer(M.vertices,w.radius,w.quality,w.qualityMin,w.qualityMax),delete v.chamfer}return l.create(o.extend({},M,v))},i.fromVertices=function(d,f,c,p,v,m,g,b){var S=o.getDecomp(),x,T,_,M,w,y,E,A,U,L,F;for(x=!!(S&&S.quickDecomp),p=p||{},_=[],v=typeof v<"u"?v:!1,m=typeof m<"u"?m:.01,g=typeof g<"u"?g:10,b=typeof b<"u"?b:.01,o.isArray(c[0])||(c=[c]),L=0;L<c.length;L+=1)if(y=c[L],M=a.isConvex(y),w=!M,w&&!x&&o.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."),M||!x)M?y=a.clockwiseSort(y):y=a.hull(y),_.push({position:{x:d,y:f},vertices:y});else{var V=y.map(function(tt){return[tt.x,tt.y]});S.makeCCW(V),m!==!1&&S.removeCollinearPoints(V,m),b!==!1&&S.removeDuplicatePoints&&S.removeDuplicatePoints(V,b);var O=S.quickDecomp(V);for(E=0;E<O.length;E++){var Z=O[E],G=Z.map(function(tt){return{x:tt[0],y:tt[1]}});g>0&&a.area(G)<g||_.push({position:a.centre(G),vertices:G})}}for(E=0;E<_.length;E++)_[E]=l.create(o.extend(_[E],p));if(v){var it=5;for(E=0;E<_.length;E++){var ot=_[E];for(A=E+1;A<_.length;A++){var et=_[A];if(h.overlaps(ot.bounds,et.bounds)){var St=ot.vertices,Dt=et.vertices;for(U=0;U<ot.vertices.length;U++)for(F=0;F<et.vertices.length;F++){var N=u.magnitudeSquared(u.sub(St[(U+1)%St.length],Dt[F])),X=u.magnitudeSquared(u.sub(St[U],Dt[(F+1)%Dt.length]));N<it&&X<it&&(St[U].isInternal=!0,Dt[F].isInternal=!0)}}}}}return _.length>1?(T=l.create(o.extend({parts:_.slice(0)},p)),l.setPosition(T,{x:d,y:f}),T):_[0]}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(0);(function(){i.create=function(o){var l={};return o||a.log("Mouse.create: element was undefined, defaulting to document.body","warn"),l.element=o||document.body,l.absolute={x:0,y:0},l.position={x:0,y:0},l.mousedownPosition={x:0,y:0},l.mouseupPosition={x:0,y:0},l.offset={x:0,y:0},l.scale={x:1,y:1},l.wheelDelta=0,l.button=-1,l.pixelRatio=parseInt(l.element.getAttribute("data-pixel-ratio"),10)||1,l.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},l.mousemove=function(h){var u=i._getRelativeMousePosition(h,l.element,l.pixelRatio),d=h.changedTouches;d&&(l.button=0,h.preventDefault()),l.absolute.x=u.x,l.absolute.y=u.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y,l.sourceEvents.mousemove=h},l.mousedown=function(h){var u=i._getRelativeMousePosition(h,l.element,l.pixelRatio),d=h.changedTouches;d?(l.button=0,h.preventDefault()):l.button=h.button,l.absolute.x=u.x,l.absolute.y=u.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y,l.mousedownPosition.x=l.position.x,l.mousedownPosition.y=l.position.y,l.sourceEvents.mousedown=h},l.mouseup=function(h){var u=i._getRelativeMousePosition(h,l.element,l.pixelRatio),d=h.changedTouches;d&&h.preventDefault(),l.button=-1,l.absolute.x=u.x,l.absolute.y=u.y,l.position.x=l.absolute.x*l.scale.x+l.offset.x,l.position.y=l.absolute.y*l.scale.y+l.offset.y,l.mouseupPosition.x=l.position.x,l.mouseupPosition.y=l.position.y,l.sourceEvents.mouseup=h},l.mousewheel=function(h){l.wheelDelta=Math.max(-1,Math.min(1,h.wheelDelta||-h.detail)),h.preventDefault()},i.setElement(l,l.element),l},i.setElement=function(o,l){o.element=l,l.addEventListener("mousemove",o.mousemove),l.addEventListener("mousedown",o.mousedown),l.addEventListener("mouseup",o.mouseup),l.addEventListener("mousewheel",o.mousewheel),l.addEventListener("DOMMouseScroll",o.mousewheel),l.addEventListener("touchmove",o.mousemove),l.addEventListener("touchstart",o.mousedown),l.addEventListener("touchend",o.mouseup)},i.clearSourceEvents=function(o){o.sourceEvents.mousemove=null,o.sourceEvents.mousedown=null,o.sourceEvents.mouseup=null,o.sourceEvents.mousewheel=null,o.wheelDelta=0},i.setOffset=function(o,l){o.offset.x=l.x,o.offset.y=l.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y},i.setScale=function(o,l){o.scale.x=l.x,o.scale.y=l.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y},i._getRelativeMousePosition=function(o,l,h){var u=l.getBoundingClientRect(),d=document.documentElement||document.body.parentNode||document.body,f=window.pageXOffset!==void 0?window.pageXOffset:d.scrollLeft,c=window.pageYOffset!==void 0?window.pageYOffset:d.scrollTop,p=o.changedTouches,v,m;return p?(v=p[0].pageX-u.left-f,m=p[0].pageY-u.top-c):(v=o.pageX-u.left-f,m=o.pageY-u.top-c),{x:v/(l.clientWidth/(l.width||l.clientWidth)*h),y:m/(l.clientHeight/(l.height||l.clientHeight)*h)}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(14),o=s(9),l=s(1);(function(){i.collisions=function(h,u){for(var d=[],f=u.pairs.table,c=0;c<h.length;c++){var p=h[c][0],v=h[c][1];if(!((p.isStatic||p.isSleeping)&&(v.isStatic||v.isSleeping))&&i.canCollide(p.collisionFilter,v.collisionFilter)&&l.overlaps(p.bounds,v.bounds))for(var m=p.parts.length>1?1:0;m<p.parts.length;m++)for(var g=p.parts[m],b=v.parts.length>1?1:0;b<v.parts.length;b++){var S=v.parts[b];if(g===p&&S===v||l.overlaps(g.bounds,S.bounds)){var x=o.id(g,S),T=f[x],_;T&&T.isActive?_=T.collision:_=null;var M=a.collides(g,S,_);M.collided&&d.push(M)}}}return d},i.canCollide=function(h,u){return h.group===u.group&&h.group!==0?h.group>0:(h.mask&u.category)!==0&&(u.mask&h.category)!==0}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(2);(function(){i.collides=function(l,h,u){var d,f,c,p,v=!1;if(u){var m=l.parent,g=h.parent,b=m.speed*m.speed+m.angularSpeed*m.angularSpeed+g.speed*g.speed+g.angularSpeed*g.angularSpeed;v=u&&u.collided&&b<.2,p=u}else p={collided:!1,bodyA:l,bodyB:h};if(u&&v){var S=p.axisBody,x=S===l?h:l,T=[S.axes[u.axisNumber]];if(c=i._overlapAxes(S.vertices,x.vertices,T),p.reused=!0,c.overlap<=0)return p.collided=!1,p}else{if(d=i._overlapAxes(l.vertices,h.vertices,l.axes),d.overlap<=0||(f=i._overlapAxes(h.vertices,l.vertices,h.axes),f.overlap<=0))return p.collided=!1,p;d.overlap<f.overlap?(c=d,p.axisBody=l):(c=f,p.axisBody=h),p.axisNumber=c.axisNumber}p.bodyA=l.id<h.id?l:h,p.bodyB=l.id<h.id?h:l,p.collided=!0,p.depth=c.overlap,p.parentA=p.bodyA.parent,p.parentB=p.bodyB.parent,l=p.bodyA,h=p.bodyB,o.dot(c.axis,o.sub(h.position,l.position))<0?p.normal={x:c.axis.x,y:c.axis.y}:p.normal={x:-c.axis.x,y:-c.axis.y},p.tangent=o.perp(p.normal),p.penetration=p.penetration||{},p.penetration.x=p.normal.x*p.depth,p.penetration.y=p.normal.y*p.depth;var _=i._findSupports(l,h,p.normal),M=[];if(a.contains(l.vertices,_[0])&&M.push(_[0]),a.contains(l.vertices,_[1])&&M.push(_[1]),M.length<2){var w=i._findSupports(h,l,o.neg(p.normal));a.contains(h.vertices,w[0])&&M.push(w[0]),M.length<2&&a.contains(h.vertices,w[1])&&M.push(w[1])}return M.length<1&&(M=[_[0]]),p.supports=M,p},i._overlapAxes=function(l,h,u){for(var d=o._temp[0],f=o._temp[1],c={overlap:Number.MAX_VALUE},p,v,m=0;m<u.length;m++){if(v=u[m],i._projectToAxis(d,l,v),i._projectToAxis(f,h,v),p=Math.min(d.max-f.min,f.max-d.min),p<=0)return c.overlap=p,c;p<c.overlap&&(c.overlap=p,c.axis=v,c.axisNumber=m)}return c},i._projectToAxis=function(l,h,u){for(var d=o.dot(h[0],u),f=d,c=1;c<h.length;c+=1){var p=o.dot(h[c],u);p>f?f=p:p<d&&(d=p)}l.min=d,l.max=f},i._findSupports=function(l,h,u){for(var d=Number.MAX_VALUE,f=o._temp[0],c=h.vertices,p=l.position,v,m,g,b,S=0;S<c.length;S++)m=c[S],f.x=m.x-p.x,f.y=m.y-p.y,v=-o.dot(u,f),v<d&&(d=v,g=m);var x=g.index-1>=0?g.index-1:c.length-1;m=c[x],f.x=m.x-p.x,f.y=m.y-p.y,d=-o.dot(u,f),b=m;var T=(g.index+1)%c.length;return m=c[T],f.x=m.x-p.x,f.y=m.y-p.y,v=-o.dot(u,f),v<d&&(b=m),[g,b]}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(0);(function(){i._registry={},i.register=function(o){if(i.isPlugin(o)||a.warn("Plugin.register:",i.toString(o),"does not implement all required fields."),o.name in i._registry){var l=i._registry[o.name],h=i.versionParse(o.version).number,u=i.versionParse(l.version).number;h>u?(a.warn("Plugin.register:",i.toString(l),"was upgraded to",i.toString(o)),i._registry[o.name]=o):h<u?a.warn("Plugin.register:",i.toString(l),"can not be downgraded to",i.toString(o)):o!==l&&a.warn("Plugin.register:",i.toString(o),"is already registered to different plugin object")}else i._registry[o.name]=o;return o},i.resolve=function(o){return i._registry[i.dependencyParse(o).name]},i.toString=function(o){return typeof o=="string"?o:(o.name||"anonymous")+"@"+(o.version||o.range||"0.0.0")},i.isPlugin=function(o){return o&&o.name&&o.version&&o.install},i.isUsed=function(o,l){return o.used.indexOf(l)>-1},i.isFor=function(o,l){var h=o.for&&i.dependencyParse(o.for);return!o.for||l.name===h.name&&i.versionSatisfies(l.version,h.range)},i.use=function(o,l){if(o.uses=(o.uses||[]).concat(l||[]),o.uses.length===0){a.warn("Plugin.use:",i.toString(o),"does not specify any dependencies to install.");return}for(var h=i.dependencies(o),u=a.topologicalSort(h),d=[],f=0;f<u.length;f+=1)if(u[f]!==o.name){var c=i.resolve(u[f]);if(!c){d.push("❌ "+u[f]);continue}i.isUsed(o,c.name)||(i.isFor(c,o)||(a.warn("Plugin.use:",i.toString(c),"is for",c.for,"but installed on",i.toString(o)+"."),c._warned=!0),c.install?c.install(o):(a.warn("Plugin.use:",i.toString(c),"does not specify an install function."),c._warned=!0),c._warned?(d.push("🔶 "+i.toString(c)),delete c._warned):d.push("✅ "+i.toString(c)),o.used.push(c.name))}d.length>0&&a.info(d.join("  "))},i.dependencies=function(o,l){var h=i.dependencyParse(o),u=h.name;if(l=l||{},!(u in l)){o=i.resolve(o)||o,l[u]=a.map(o.uses||[],function(f){i.isPlugin(f)&&i.register(f);var c=i.dependencyParse(f),p=i.resolve(f);return p&&!i.versionSatisfies(p.version,c.range)?(a.warn("Plugin.dependencies:",i.toString(p),"does not satisfy",i.toString(c),"used by",i.toString(h)+"."),p._warned=!0,o._warned=!0):p||(a.warn("Plugin.dependencies:",i.toString(f),"used by",i.toString(h),"could not be resolved."),o._warned=!0),c.name});for(var d=0;d<l[u].length;d+=1)i.dependencies(l[u][d],l);return l}},i.dependencyParse=function(o){if(a.isString(o)){var l=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;return l.test(o)||a.warn("Plugin.dependencyParse:",o,"is not a valid dependency string."),{name:o.split("@")[0],range:o.split("@")[1]||"*"}}return{name:o.name,range:o.range||o.version}},i.versionParse=function(o){var l=/^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-]+)?$/;l.test(o)||a.warn("Plugin.versionParse:",o,"is not a valid version or range.");var h=l.exec(o),u=Number(h[4]),d=Number(h[5]),f=Number(h[6]);return{isRange:!!(h[1]||h[2]),version:h[3],range:o,operator:h[1]||h[2]||"",major:u,minor:d,patch:f,parts:[u,d,f],prerelease:h[7],number:u*1e8+d*1e4+f}},i.versionSatisfies=function(o,l){l=l||"*";var h=i.versionParse(l),u=i.versionParse(o);if(h.isRange){if(h.operator==="*"||o==="*")return!0;if(h.operator===">")return u.number>h.number;if(h.operator===">=")return u.number>=h.number;if(h.operator==="~")return u.major===h.major&&u.minor===h.minor&&u.patch>=h.patch;if(h.operator==="^")return h.major>0?u.major===h.major&&u.number>=h.number:h.minor>0?u.minor===h.minor&&u.patch>=h.patch:u.patch===h.patch}return o===l||o==="*"}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(0),o=s(5),l=s(1),h=s(4),u=s(2),d=s(12);(function(){var f,c;typeof window<"u"&&(f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(x){window.setTimeout(function(){x(a.now())},1e3/60)},c=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),i._goodFps=30,i._goodDelta=1e3/60,i.create=function(x){var T={controller:i,engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,timing:{historySize:60,delta:0,deltaHistory:[],lastTime:0,lastTimestamp:0,lastElapsed:0,timestampElapsed:0,timestampElapsedHistory:[],engineDeltaHistory:[],engineElapsedHistory:[],elapsedHistory:[]},options:{width:800,height:600,pixelRatio:1,background:"#14151f",wireframeBackground:"#14151f",hasBounds:!!x.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showStats:!1,showPerformance:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},_=a.extend(T,x);return _.canvas&&(_.canvas.width=_.options.width||_.canvas.width,_.canvas.height=_.options.height||_.canvas.height),_.mouse=x.mouse,_.engine=x.engine,_.canvas=_.canvas||m(_.options.width,_.options.height),_.context=_.canvas.getContext("2d"),_.textures={},_.bounds=_.bounds||{min:{x:0,y:0},max:{x:_.canvas.width,y:_.canvas.height}},_.options.pixelRatio!==1&&i.setPixelRatio(_,_.options.pixelRatio),a.isElement(_.element)?_.element.appendChild(_.canvas):_.canvas.parentNode||a.log("Render.create: options.element was undefined, render.canvas was created but not appended","warn"),_},i.run=function(x){(function T(_){x.frameRequestId=f(T),p(x,_),i.world(x,_),(x.options.showStats||x.options.showDebug)&&i.stats(x,x.context,_),(x.options.showPerformance||x.options.showDebug)&&i.performance(x,x.context,_)})()},i.stop=function(x){c(x.frameRequestId)},i.setPixelRatio=function(x,T){var _=x.options,M=x.canvas;T==="auto"&&(T=g(M)),_.pixelRatio=T,M.setAttribute("data-pixel-ratio",T),M.width=_.width*T,M.height=_.height*T,M.style.width=_.width+"px",M.style.height=_.height+"px"},i.lookAt=function(x,T,_,M){M=typeof M<"u"?M:!0,T=a.isArray(T)?T:[T],_=_||{x:0,y:0};for(var w={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},y=0;y<T.length;y+=1){var E=T[y],A=E.bounds?E.bounds.min:E.min||E.position||E,U=E.bounds?E.bounds.max:E.max||E.position||E;A&&U&&(A.x<w.min.x&&(w.min.x=A.x),U.x>w.max.x&&(w.max.x=U.x),A.y<w.min.y&&(w.min.y=A.y),U.y>w.max.y&&(w.max.y=U.y))}var L=w.max.x-w.min.x+2*_.x,F=w.max.y-w.min.y+2*_.y,V=x.canvas.height,O=x.canvas.width,Z=O/V,G=L/F,it=1,ot=1;G>Z?ot=G/Z:it=Z/G,x.options.hasBounds=!0,x.bounds.min.x=w.min.x,x.bounds.max.x=w.min.x+L*it,x.bounds.min.y=w.min.y,x.bounds.max.y=w.min.y+F*ot,M&&(x.bounds.min.x+=L*.5-L*it*.5,x.bounds.max.x+=L*.5-L*it*.5,x.bounds.min.y+=F*.5-F*ot*.5,x.bounds.max.y+=F*.5-F*ot*.5),x.bounds.min.x-=_.x,x.bounds.max.x-=_.x,x.bounds.min.y-=_.y,x.bounds.max.y-=_.y,x.mouse&&(d.setScale(x.mouse,{x:(x.bounds.max.x-x.bounds.min.x)/x.canvas.width,y:(x.bounds.max.y-x.bounds.min.y)/x.canvas.height}),d.setOffset(x.mouse,x.bounds.min))},i.startViewTransform=function(x){var T=x.bounds.max.x-x.bounds.min.x,_=x.bounds.max.y-x.bounds.min.y,M=T/x.options.width,w=_/x.options.height;x.context.setTransform(x.options.pixelRatio/M,0,0,x.options.pixelRatio/w,0,0),x.context.translate(-x.bounds.min.x,-x.bounds.min.y)},i.endViewTransform=function(x){x.context.setTransform(x.options.pixelRatio,0,0,x.options.pixelRatio,0,0)},i.world=function(x,T){var _=a.now(),M=x.engine,w=M.world,y=x.canvas,E=x.context,A=x.options,U=x.timing,L=o.allBodies(w),F=o.allConstraints(w),V=A.wireframes?A.wireframeBackground:A.background,O=[],Z=[],G,it={timestamp:M.timing.timestamp};if(h.trigger(x,"beforeRender",it),x.currentBackground!==V&&S(x,V),E.globalCompositeOperation="source-in",E.fillStyle="transparent",E.fillRect(0,0,y.width,y.height),E.globalCompositeOperation="source-over",A.hasBounds){for(G=0;G<L.length;G++){var ot=L[G];l.overlaps(ot.bounds,x.bounds)&&O.push(ot)}for(G=0;G<F.length;G++){var et=F[G],St=et.bodyA,Dt=et.bodyB,N=et.pointA,X=et.pointB;St&&(N=u.add(St.position,et.pointA)),Dt&&(X=u.add(Dt.position,et.pointB)),!(!N||!X)&&(l.contains(x.bounds,N)||l.contains(x.bounds,X))&&Z.push(et)}i.startViewTransform(x),x.mouse&&(d.setScale(x.mouse,{x:(x.bounds.max.x-x.bounds.min.x)/x.options.width,y:(x.bounds.max.y-x.bounds.min.y)/x.options.height}),d.setOffset(x.mouse,x.bounds.min))}else Z=F,O=L,x.options.pixelRatio!==1&&x.context.setTransform(x.options.pixelRatio,0,0,x.options.pixelRatio,0,0);!A.wireframes||M.enableSleeping&&A.showSleeping?i.bodies(x,O,E):(A.showConvexHulls&&i.bodyConvexHulls(x,O,E),i.bodyWireframes(x,O,E)),A.showBounds&&i.bodyBounds(x,O,E),(A.showAxes||A.showAngleIndicator)&&i.bodyAxes(x,O,E),A.showPositions&&i.bodyPositions(x,O,E),A.showVelocity&&i.bodyVelocity(x,O,E),A.showIds&&i.bodyIds(x,O,E),A.showSeparations&&i.separations(x,M.pairs.list,E),A.showCollisions&&i.collisions(x,M.pairs.list,E),A.showVertexNumbers&&i.vertexNumbers(x,O,E),A.showMousePosition&&i.mousePosition(x,x.mouse,E),i.constraints(Z,E),A.showBroadphase&&i.grid(x,M.grid,E),A.hasBounds&&i.endViewTransform(x),h.trigger(x,"afterRender",it),U.lastElapsed=a.now()-_},i.stats=function(x,T,_){for(var M=x.engine,w=M.world,y=o.allBodies(w),E=0,A=55,U=44,L=0,F=0,V=0;V<y.length;V+=1)E+=y[V].parts.length;var O={Part:E,Body:y.length,Cons:o.allConstraints(w).length,Comp:o.allComposites(w).length,Pair:M.pairs.list.length};T.fillStyle="#0e0f19",T.fillRect(L,F,A*5.5,U),T.font="12px Arial",T.textBaseline="top",T.textAlign="right";for(var Z in O){var G=O[Z];T.fillStyle="#aaa",T.fillText(Z,L+A,F+8),T.fillStyle="#eee",T.fillText(G,L+A,F+26),L+=A}},i.performance=function(x,T){var _=x.engine,M=x.timing,w=M.deltaHistory,y=M.elapsedHistory,E=M.timestampElapsedHistory,A=M.engineDeltaHistory,U=M.engineElapsedHistory,L=_.timing.lastDelta,F=v(w),V=v(y),O=v(A),Z=v(U),G=v(E),it=G/F||0,ot=1e3/F||0,et=4,St=12,Dt=60,N=34,X=10,tt=69;T.fillStyle="#0e0f19",T.fillRect(0,50,St*4+Dt*5+22,N),i.status(T,X,tt,Dt,et,w.length,Math.round(ot)+" fps",ot/i._goodFps,function(K){return w[K]/F-1}),i.status(T,X+St+Dt,tt,Dt,et,A.length,L.toFixed(2)+" dt",i._goodDelta/L,function(K){return A[K]/O-1}),i.status(T,X+(St+Dt)*2,tt,Dt,et,U.length,Z.toFixed(2)+" ut",1-Z/i._goodFps,function(K){return U[K]/Z-1}),i.status(T,X+(St+Dt)*3,tt,Dt,et,y.length,V.toFixed(2)+" rt",1-V/i._goodFps,function(K){return y[K]/V-1}),i.status(T,X+(St+Dt)*4,tt,Dt,et,E.length,it.toFixed(2)+" x",it*it*it,function(K){return(E[K]/w[K]/it||0)-1})},i.status=function(x,T,_,M,w,y,E,A,U){x.strokeStyle="#888",x.fillStyle="#444",x.lineWidth=1,x.fillRect(T,_+7,M,1),x.beginPath(),x.moveTo(T,_+7-w*a.clamp(.4*U(0),-2,2));for(var L=0;L<M;L+=1)x.lineTo(T+L,_+7-(L<y?w*a.clamp(.4*U(L),-2,2):0));x.stroke(),x.fillStyle="hsl("+a.clamp(25+95*A,0,120)+",100%,60%)",x.fillRect(T,_-7,4,4),x.font="12px Arial",x.textBaseline="middle",x.textAlign="right",x.fillStyle="#eee",x.fillText(E,T+M,_-5)},i.constraints=function(x,T){for(var _=T,M=0;M<x.length;M++){var w=x[M];if(!(!w.render.visible||!w.pointA||!w.pointB)){var y=w.bodyA,E=w.bodyB,A,U;if(y?A=u.add(y.position,w.pointA):A=w.pointA,w.render.type==="pin")_.beginPath(),_.arc(A.x,A.y,3,0,2*Math.PI),_.closePath();else{if(E?U=u.add(E.position,w.pointB):U=w.pointB,_.beginPath(),_.moveTo(A.x,A.y),w.render.type==="spring")for(var L=u.sub(U,A),F=u.perp(u.normalise(L)),V=Math.ceil(a.clamp(w.length/5,12,20)),O,Z=1;Z<V;Z+=1)O=Z%2===0?1:-1,_.lineTo(A.x+L.x*(Z/V)+F.x*O*4,A.y+L.y*(Z/V)+F.y*O*4);_.lineTo(U.x,U.y)}w.render.lineWidth&&(_.lineWidth=w.render.lineWidth,_.strokeStyle=w.render.strokeStyle,_.stroke()),w.render.anchors&&(_.fillStyle=w.render.strokeStyle,_.beginPath(),_.arc(A.x,A.y,3,0,2*Math.PI),_.arc(U.x,U.y,3,0,2*Math.PI),_.closePath(),_.fill())}}},i.bodies=function(x,T,_){var M=_;x.engine;var w=x.options,y=w.showInternalEdges||!w.wireframes,E,A,U,L;for(U=0;U<T.length;U++)if(E=T[U],!!E.render.visible){for(L=E.parts.length>1?1:0;L<E.parts.length;L++)if(A=E.parts[L],!!A.render.visible){if(w.showSleeping&&E.isSleeping?M.globalAlpha=.5*A.render.opacity:A.render.opacity!==1&&(M.globalAlpha=A.render.opacity),A.render.sprite&&A.render.sprite.texture&&!w.wireframes){var F=A.render.sprite,V=b(x,F.texture);M.translate(A.position.x,A.position.y),M.rotate(A.angle),M.drawImage(V,V.width*-F.xOffset*F.xScale,V.height*-F.yOffset*F.yScale,V.width*F.xScale,V.height*F.yScale),M.rotate(-A.angle),M.translate(-A.position.x,-A.position.y)}else{if(A.circleRadius)M.beginPath(),M.arc(A.position.x,A.position.y,A.circleRadius,0,2*Math.PI);else{M.beginPath(),M.moveTo(A.vertices[0].x,A.vertices[0].y);for(var O=1;O<A.vertices.length;O++)!A.vertices[O-1].isInternal||y?M.lineTo(A.vertices[O].x,A.vertices[O].y):M.moveTo(A.vertices[O].x,A.vertices[O].y),A.vertices[O].isInternal&&!y&&M.moveTo(A.vertices[(O+1)%A.vertices.length].x,A.vertices[(O+1)%A.vertices.length].y);M.lineTo(A.vertices[0].x,A.vertices[0].y),M.closePath()}w.wireframes?(M.lineWidth=1,M.strokeStyle="#bbb",M.stroke()):(M.fillStyle=A.render.fillStyle,A.render.lineWidth&&(M.lineWidth=A.render.lineWidth,M.strokeStyle=A.render.strokeStyle,M.stroke()),M.fill())}M.globalAlpha=1}}},i.bodyWireframes=function(x,T,_){var M=_,w=x.options.showInternalEdges,y,E,A,U,L;for(M.beginPath(),A=0;A<T.length;A++)if(y=T[A],!!y.render.visible)for(L=y.parts.length>1?1:0;L<y.parts.length;L++){for(E=y.parts[L],M.moveTo(E.vertices[0].x,E.vertices[0].y),U=1;U<E.vertices.length;U++)!E.vertices[U-1].isInternal||w?M.lineTo(E.vertices[U].x,E.vertices[U].y):M.moveTo(E.vertices[U].x,E.vertices[U].y),E.vertices[U].isInternal&&!w&&M.moveTo(E.vertices[(U+1)%E.vertices.length].x,E.vertices[(U+1)%E.vertices.length].y);M.lineTo(E.vertices[0].x,E.vertices[0].y)}M.lineWidth=1,M.strokeStyle="#bbb",M.stroke()},i.bodyConvexHulls=function(x,T,_){var M=_,w,y,E;for(M.beginPath(),y=0;y<T.length;y++)if(w=T[y],!(!w.render.visible||w.parts.length===1)){for(M.moveTo(w.vertices[0].x,w.vertices[0].y),E=1;E<w.vertices.length;E++)M.lineTo(w.vertices[E].x,w.vertices[E].y);M.lineTo(w.vertices[0].x,w.vertices[0].y)}M.lineWidth=1,M.strokeStyle="rgba(255,255,255,0.2)",M.stroke()},i.vertexNumbers=function(x,T,_){var M=_,w,y,E;for(w=0;w<T.length;w++){var A=T[w].parts;for(E=A.length>1?1:0;E<A.length;E++){var U=A[E];for(y=0;y<U.vertices.length;y++)M.fillStyle="rgba(255,255,255,0.2)",M.fillText(w+"_"+y,U.position.x+(U.vertices[y].x-U.position.x)*.8,U.position.y+(U.vertices[y].y-U.position.y)*.8)}}},i.mousePosition=function(x,T,_){var M=_;M.fillStyle="rgba(255,255,255,0.8)",M.fillText(T.position.x+"  "+T.position.y,T.position.x+5,T.position.y-5)},i.bodyBounds=function(x,T,_){var M=_;x.engine;var w=x.options;M.beginPath();for(var y=0;y<T.length;y++){var E=T[y];if(E.render.visible)for(var A=T[y].parts,U=A.length>1?1:0;U<A.length;U++){var L=A[U];M.rect(L.bounds.min.x,L.bounds.min.y,L.bounds.max.x-L.bounds.min.x,L.bounds.max.y-L.bounds.min.y)}}w.wireframes?M.strokeStyle="rgba(255,255,255,0.08)":M.strokeStyle="rgba(0,0,0,0.1)",M.lineWidth=1,M.stroke()},i.bodyAxes=function(x,T,_){var M=_;x.engine;var w=x.options,y,E,A,U;for(M.beginPath(),E=0;E<T.length;E++){var L=T[E],F=L.parts;if(L.render.visible)if(w.showAxes)for(A=F.length>1?1:0;A<F.length;A++)for(y=F[A],U=0;U<y.axes.length;U++){var V=y.axes[U];M.moveTo(y.position.x,y.position.y),M.lineTo(y.position.x+V.x*20,y.position.y+V.y*20)}else for(A=F.length>1?1:0;A<F.length;A++)for(y=F[A],U=0;U<y.axes.length;U++)M.moveTo(y.position.x,y.position.y),M.lineTo((y.vertices[0].x+y.vertices[y.vertices.length-1].x)/2,(y.vertices[0].y+y.vertices[y.vertices.length-1].y)/2)}w.wireframes?(M.strokeStyle="indianred",M.lineWidth=1):(M.strokeStyle="rgba(255, 255, 255, 0.4)",M.globalCompositeOperation="overlay",M.lineWidth=2),M.stroke(),M.globalCompositeOperation="source-over"},i.bodyPositions=function(x,T,_){var M=_;x.engine;var w=x.options,y,E,A,U;for(M.beginPath(),A=0;A<T.length;A++)if(y=T[A],!!y.render.visible)for(U=0;U<y.parts.length;U++)E=y.parts[U],M.arc(E.position.x,E.position.y,3,0,2*Math.PI,!1),M.closePath();for(w.wireframes?M.fillStyle="indianred":M.fillStyle="rgba(0,0,0,0.5)",M.fill(),M.beginPath(),A=0;A<T.length;A++)y=T[A],y.render.visible&&(M.arc(y.positionPrev.x,y.positionPrev.y,2,0,2*Math.PI,!1),M.closePath());M.fillStyle="rgba(255,165,0,0.8)",M.fill()},i.bodyVelocity=function(x,T,_){var M=_;M.beginPath();for(var w=0;w<T.length;w++){var y=T[w];y.render.visible&&(M.moveTo(y.position.x,y.position.y),M.lineTo(y.position.x+(y.position.x-y.positionPrev.x)*2,y.position.y+(y.position.y-y.positionPrev.y)*2))}M.lineWidth=3,M.strokeStyle="cornflowerblue",M.stroke()},i.bodyIds=function(x,T,_){var M=_,w,y;for(w=0;w<T.length;w++)if(T[w].render.visible){var E=T[w].parts;for(y=E.length>1?1:0;y<E.length;y++){var A=E[y];M.font="12px Arial",M.fillStyle="rgba(255,255,255,0.5)",M.fillText(A.id,A.position.x+10,A.position.y-10)}}},i.collisions=function(x,T,_){var M=_,w=x.options,y,E,A,U;for(M.beginPath(),A=0;A<T.length;A++)if(y=T[A],!!y.isActive)for(E=y.collision,U=0;U<y.activeContacts.length;U++){var L=y.activeContacts[U],F=L.vertex;M.rect(F.x-1.5,F.y-1.5,3.5,3.5)}for(w.wireframes?M.fillStyle="rgba(255,255,255,0.7)":M.fillStyle="orange",M.fill(),M.beginPath(),A=0;A<T.length;A++)if(y=T[A],!!y.isActive&&(E=y.collision,y.activeContacts.length>0)){var V=y.activeContacts[0].vertex.x,O=y.activeContacts[0].vertex.y;y.activeContacts.length===2&&(V=(y.activeContacts[0].vertex.x+y.activeContacts[1].vertex.x)/2,O=(y.activeContacts[0].vertex.y+y.activeContacts[1].vertex.y)/2),E.bodyB===E.supports[0].body||E.bodyA.isStatic===!0?M.moveTo(V-E.normal.x*8,O-E.normal.y*8):M.moveTo(V+E.normal.x*8,O+E.normal.y*8),M.lineTo(V,O)}w.wireframes?M.strokeStyle="rgba(255,165,0,0.7)":M.strokeStyle="orange",M.lineWidth=1,M.stroke()},i.separations=function(x,T,_){var M=_,w=x.options,y,E,A,U,L;for(M.beginPath(),L=0;L<T.length;L++)if(y=T[L],!!y.isActive){E=y.collision,A=E.bodyA,U=E.bodyB;var F=1;!U.isStatic&&!A.isStatic&&(F=.5),U.isStatic&&(F=0),M.moveTo(U.position.x,U.position.y),M.lineTo(U.position.x-E.penetration.x*F,U.position.y-E.penetration.y*F),F=1,!U.isStatic&&!A.isStatic&&(F=.5),A.isStatic&&(F=0),M.moveTo(A.position.x,A.position.y),M.lineTo(A.position.x+E.penetration.x*F,A.position.y+E.penetration.y*F)}w.wireframes?M.strokeStyle="rgba(255,165,0,0.5)":M.strokeStyle="orange",M.stroke()},i.grid=function(x,T,_){var M=_,w=x.options;w.wireframes?M.strokeStyle="rgba(255,180,0,0.1)":M.strokeStyle="rgba(255,180,0,0.5)",M.beginPath();for(var y=a.keys(T.buckets),E=0;E<y.length;E++){var A=y[E];if(!(T.buckets[A].length<2)){var U=A.split(/C|R/);M.rect(.5+parseInt(U[1],10)*T.bucketWidth,.5+parseInt(U[2],10)*T.bucketHeight,T.bucketWidth,T.bucketHeight)}}M.lineWidth=1,M.stroke()},i.inspector=function(x,T){x.engine;var _=x.selected,M=x.render,w=M.options,y;if(w.hasBounds){var E=M.bounds.max.x-M.bounds.min.x,A=M.bounds.max.y-M.bounds.min.y,U=E/M.options.width,L=A/M.options.height;T.scale(1/U,1/L),T.translate(-M.bounds.min.x,-M.bounds.min.y)}for(var F=0;F<_.length;F++){var V=_[F].data;switch(T.translate(.5,.5),T.lineWidth=1,T.strokeStyle="rgba(255,165,0,0.9)",T.setLineDash([1,2]),V.type){case"body":y=V.bounds,T.beginPath(),T.rect(Math.floor(y.min.x-3),Math.floor(y.min.y-3),Math.floor(y.max.x-y.min.x+6),Math.floor(y.max.y-y.min.y+6)),T.closePath(),T.stroke();break;case"constraint":var O=V.pointA;V.bodyA&&(O=V.pointB),T.beginPath(),T.arc(O.x,O.y,10,0,2*Math.PI),T.closePath(),T.stroke();break}T.setLineDash([]),T.translate(-.5,-.5)}x.selectStart!==null&&(T.translate(.5,.5),T.lineWidth=1,T.strokeStyle="rgba(255,165,0,0.6)",T.fillStyle="rgba(255,165,0,0.1)",y=x.selectBounds,T.beginPath(),T.rect(Math.floor(y.min.x),Math.floor(y.min.y),Math.floor(y.max.x-y.min.x),Math.floor(y.max.y-y.min.y)),T.closePath(),T.stroke(),T.fill(),T.translate(-.5,-.5)),w.hasBounds&&T.setTransform(1,0,0,1,0,0)};var p=function(x,T){var _=x.engine,M=x.timing,w=M.historySize,y=_.timing.timestamp;M.delta=T-M.lastTime||i._goodDelta,M.lastTime=T,M.timestampElapsed=y-M.lastTimestamp||0,M.lastTimestamp=y,M.deltaHistory.unshift(M.delta),M.deltaHistory.length=Math.min(M.deltaHistory.length,w),M.engineDeltaHistory.unshift(_.timing.lastDelta),M.engineDeltaHistory.length=Math.min(M.engineDeltaHistory.length,w),M.timestampElapsedHistory.unshift(M.timestampElapsed),M.timestampElapsedHistory.length=Math.min(M.timestampElapsedHistory.length,w),M.engineElapsedHistory.unshift(_.timing.lastElapsed),M.engineElapsedHistory.length=Math.min(M.engineElapsedHistory.length,w),M.elapsedHistory.unshift(M.lastElapsed),M.elapsedHistory.length=Math.min(M.elapsedHistory.length,w)},v=function(x){for(var T=0,_=0;_<x.length;_+=1)T+=x[_];return T/x.length||0},m=function(x,T){var _=document.createElement("canvas");return _.width=x,_.height=T,_.oncontextmenu=function(){return!1},_.onselectstart=function(){return!1},_},g=function(x){var T=x.getContext("2d"),_=window.devicePixelRatio||1,M=T.webkitBackingStorePixelRatio||T.mozBackingStorePixelRatio||T.msBackingStorePixelRatio||T.oBackingStorePixelRatio||T.backingStorePixelRatio||1;return _/M},b=function(x,T){var _=x.textures[T];return _||(_=x.textures[T]=new Image,_.src=T,_)},S=function(x,T){var _=T;/(jpg|gif|png)$/.test(T)&&(_="url("+T+")"),x.canvas.style.background=_,x.canvas.style.backgroundSize="contain",x.currentBackground=T}})()}),(function(e,n){var s={};e.exports=s,(function(){s.create=function(i){return{id:s.id(i),vertex:i,normalImpulse:0,tangentImpulse:0}},s.id=function(i){return i.body.id+"_"+i.index}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(7),o=s(19),l=s(13),h=s(20),u=s(21),d=s(4),f=s(5),c=s(8),p=s(0),v=s(6);(function(){i.create=function(m){m=m||{};var g={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},grid:null,gravity:{x:0,y:1,scale:.001},timing:{timestamp:0,timeScale:1,lastDelta:0,lastElapsed:0}},b=p.extend(g,m);return b.world=m.world||f.create({label:"World"}),b.grid=u.create(m.grid||m.broadphase),b.pairs=h.create(),b.world.gravity=b.gravity,b.broadphase=b.grid,b.metrics={},b},i.update=function(m,g,b){var S=p.now();g=g||1e3/60,b=b||1;var x=m.world,T=m.timing,_=m.grid,M=[],w;T.timestamp+=g*T.timeScale,T.lastDelta=g*T.timeScale;var y={timestamp:T.timestamp};d.trigger(m,"beforeUpdate",y);var E=f.allBodies(x),A=f.allConstraints(x);for(m.enableSleeping&&a.update(E,T.timeScale),i._bodiesApplyGravity(E,m.gravity),i._bodiesUpdate(E,g,T.timeScale,b,x.bounds),c.preSolveAll(E),w=0;w<m.constraintIterations;w++)c.solveAll(A,T.timeScale);c.postSolveAll(E),x.isModified&&u.clear(_),u.update(_,E,m,x.isModified),M=_.pairsList,x.isModified&&f.setModified(x,!1,!1,!0);var U=l.collisions(M,m),L=m.pairs,F=T.timestamp;for(h.update(L,U,F),h.removeOld(L,F),m.enableSleeping&&a.afterCollisions(L.list,T.timeScale),L.collisionStart.length>0&&d.trigger(m,"collisionStart",{pairs:L.collisionStart}),o.preSolvePosition(L.list),w=0;w<m.positionIterations;w++)o.solvePosition(L.list,T.timeScale);for(o.postSolvePosition(E),c.preSolveAll(E),w=0;w<m.constraintIterations;w++)c.solveAll(A,T.timeScale);for(c.postSolveAll(E),o.preSolveVelocity(L.list),w=0;w<m.velocityIterations;w++)o.solveVelocity(L.list,T.timeScale);return L.collisionActive.length>0&&d.trigger(m,"collisionActive",{pairs:L.collisionActive}),L.collisionEnd.length>0&&d.trigger(m,"collisionEnd",{pairs:L.collisionEnd}),i._bodiesClearForces(E),d.trigger(m,"afterUpdate",y),m.timing.lastElapsed=p.now()-S,m},i.merge=function(m,g){if(p.extend(m,g),g.world){m.world=g.world,i.clear(m);for(var b=f.allBodies(m.world),S=0;S<b.length;S++){var x=b[S];a.set(x,!1),x.id=p.nextId()}}},i.clear=function(m){var g=m.world,b=f.allBodies(g);h.clear(m.pairs),u.clear(m.grid),u.update(m.grid,b,m,!0)},i._bodiesClearForces=function(m){for(var g=0;g<m.length;g++){var b=m[g];b.force.x=0,b.force.y=0,b.torque=0}},i._bodiesApplyGravity=function(m,g){var b=typeof g.scale<"u"?g.scale:.001;if(!(g.x===0&&g.y===0||b===0))for(var S=0;S<m.length;S++){var x=m[S];x.isStatic||x.isSleeping||(x.force.y+=x.mass*g.y*b,x.force.x+=x.mass*g.x*b)}},i._bodiesUpdate=function(m,g,b,S,x){for(var T=0;T<m.length;T++){var _=m[T];_.isStatic||_.isSleeping||v.update(_,g,b,S)}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(2),l=s(0),h=s(1);(function(){i._restingThresh=4,i._restingThreshTangent=6,i._positionDampen=.9,i._positionWarming=.8,i._frictionNormalMultiplier=5,i.preSolvePosition=function(u){var d,f,c;for(d=0;d<u.length;d++)f=u[d],f.isActive&&(c=f.activeContacts.length,f.collision.parentA.totalContacts+=c,f.collision.parentB.totalContacts+=c)},i.solvePosition=function(u,d){var f,c,p,v,m,g,b,S,x,T=o._temp[0],_=o._temp[1],M=o._temp[2],w=o._temp[3];for(f=0;f<u.length;f++)c=u[f],!(!c.isActive||c.isSensor)&&(p=c.collision,v=p.parentA,m=p.parentB,g=p.normal,b=o.sub(o.add(m.positionImpulse,m.position,T),o.add(v.positionImpulse,o.sub(m.position,p.penetration,_),M),w),c.separation=o.dot(g,b));for(f=0;f<u.length;f++)c=u[f],!(!c.isActive||c.isSensor)&&(p=c.collision,v=p.parentA,m=p.parentB,g=p.normal,x=(c.separation-c.slop)*d,(v.isStatic||m.isStatic)&&(x*=2),v.isStatic||v.isSleeping||(S=i._positionDampen/v.totalContacts,v.positionImpulse.x+=g.x*x*S,v.positionImpulse.y+=g.y*x*S),m.isStatic||m.isSleeping||(S=i._positionDampen/m.totalContacts,m.positionImpulse.x-=g.x*x*S,m.positionImpulse.y-=g.y*x*S))},i.postSolvePosition=function(u){for(var d=0;d<u.length;d++){var f=u[d];if(f.totalContacts=0,f.positionImpulse.x!==0||f.positionImpulse.y!==0){for(var c=0;c<f.parts.length;c++){var p=f.parts[c];a.translate(p.vertices,f.positionImpulse),h.update(p.bounds,p.vertices,f.velocity),p.position.x+=f.positionImpulse.x,p.position.y+=f.positionImpulse.y}f.positionPrev.x+=f.positionImpulse.x,f.positionPrev.y+=f.positionImpulse.y,o.dot(f.positionImpulse,f.velocity)<0?(f.positionImpulse.x=0,f.positionImpulse.y=0):(f.positionImpulse.x*=i._positionWarming,f.positionImpulse.y*=i._positionWarming)}}},i.preSolveVelocity=function(u){var d,f,c,p,v,m,g,b,S,x,T,_,M,w,y=o._temp[0],E=o._temp[1];for(d=0;d<u.length;d++)if(c=u[d],!(!c.isActive||c.isSensor))for(p=c.activeContacts,v=c.collision,m=v.parentA,g=v.parentB,b=v.normal,S=v.tangent,f=0;f<p.length;f++)x=p[f],T=x.vertex,_=x.normalImpulse,M=x.tangentImpulse,(_!==0||M!==0)&&(y.x=b.x*_+S.x*M,y.y=b.y*_+S.y*M,m.isStatic||m.isSleeping||(w=o.sub(T,m.position,E),m.positionPrev.x+=y.x*m.inverseMass,m.positionPrev.y+=y.y*m.inverseMass,m.anglePrev+=o.cross(w,y)*m.inverseInertia),g.isStatic||g.isSleeping||(w=o.sub(T,g.position,E),g.positionPrev.x-=y.x*g.inverseMass,g.positionPrev.y-=y.y*g.inverseMass,g.anglePrev-=o.cross(w,y)*g.inverseInertia))},i.solveVelocity=function(u,d){for(var f=d*d,c=o._temp[0],p=o._temp[1],v=o._temp[2],m=o._temp[3],g=o._temp[4],b=o._temp[5],S=0;S<u.length;S++){var x=u[S];if(!(!x.isActive||x.isSensor)){var T=x.collision,_=T.parentA,M=T.parentB,w=T.normal,y=T.tangent,E=x.activeContacts,A=1/E.length;_.velocity.x=_.position.x-_.positionPrev.x,_.velocity.y=_.position.y-_.positionPrev.y,M.velocity.x=M.position.x-M.positionPrev.x,M.velocity.y=M.position.y-M.positionPrev.y,_.angularVelocity=_.angle-_.anglePrev,M.angularVelocity=M.angle-M.anglePrev;for(var U=0;U<E.length;U++){var L=E[U],F=L.vertex,V=o.sub(F,_.position,p),O=o.sub(F,M.position,v),Z=o.add(_.velocity,o.mult(o.perp(V),_.angularVelocity),m),G=o.add(M.velocity,o.mult(o.perp(O),M.angularVelocity),g),it=o.sub(Z,G,b),ot=o.dot(w,it),et=o.dot(y,it),St=Math.abs(et),Dt=l.sign(et),N=(1+x.restitution)*ot,X=l.clamp(x.separation+ot,0,1)*i._frictionNormalMultiplier,tt=et,K=1/0;St>x.friction*x.frictionStatic*X*f&&(K=St,tt=l.clamp(x.friction*Dt*f,-K,K));var pt=o.cross(V,w),It=o.cross(O,w),bt=A/(_.inverseMass+M.inverseMass+_.inverseInertia*pt*pt+M.inverseInertia*It*It);if(N*=bt,tt*=bt,ot<0&&ot*ot>i._restingThresh*f)L.normalImpulse=0;else{var Wt=L.normalImpulse;L.normalImpulse=Math.min(L.normalImpulse+N,0),N=L.normalImpulse-Wt}if(et*et>i._restingThreshTangent*f)L.tangentImpulse=0;else{var Q=L.tangentImpulse;L.tangentImpulse=l.clamp(L.tangentImpulse+tt,-K,K),tt=L.tangentImpulse-Q}c.x=w.x*N+y.x*tt,c.y=w.y*N+y.y*tt,_.isStatic||_.isSleeping||(_.positionPrev.x+=c.x*_.inverseMass,_.positionPrev.y+=c.y*_.inverseMass,_.anglePrev+=o.cross(V,c)*_.inverseInertia),M.isStatic||M.isSleeping||(M.positionPrev.x-=c.x*M.inverseMass,M.positionPrev.y-=c.y*M.inverseMass,M.anglePrev-=o.cross(O,c)*M.inverseInertia)}}}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(9),o=s(0);(function(){i._pairMaxIdleLife=1e3,i.create=function(l){return o.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},l)},i.update=function(l,h,u){var d=l.list,f=l.table,c=l.collisionStart,p=l.collisionEnd,v=l.collisionActive,m,g,b,S;for(c.length=0,p.length=0,v.length=0,S=0;S<d.length;S++)d[S].confirmedActive=!1;for(S=0;S<h.length;S++)m=h[S],m.collided&&(g=a.id(m.bodyA,m.bodyB),b=f[g],b?(b.isActive?v.push(b):c.push(b),a.update(b,m,u),b.confirmedActive=!0):(b=a.create(m,u),f[g]=b,c.push(b),d.push(b)));for(S=0;S<d.length;S++)b=d[S],b.isActive&&!b.confirmedActive&&(a.setActive(b,!1,u),p.push(b))},i.removeOld=function(l,h){var u=l.list,d=l.table,f=[],c,p,v,m;for(m=0;m<u.length;m++){if(c=u[m],p=c.collision,p.bodyA.isSleeping||p.bodyB.isSleeping){c.timeUpdated=h;continue}h-c.timeUpdated>i._pairMaxIdleLife&&f.push(m)}for(m=0;m<f.length;m++)v=f[m]-m,c=u[v],delete d[c.id],u.splice(v,1)},i.clear=function(l){return l.table={},l.list.length=0,l.collisionStart.length=0,l.collisionActive.length=0,l.collisionEnd.length=0,l}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(9),o=s(0);(function(){i.create=function(l){var h={buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return o.extend(h,l)},i.update=function(l,h,u,d){var f,c,p,v=u.world,m=l.buckets,g,b,S=!1;for(f=0;f<h.length;f++){var x=h[f];if(!(x.isSleeping&&!d)&&!(v.bounds&&(x.bounds.max.x<v.bounds.min.x||x.bounds.min.x>v.bounds.max.x||x.bounds.max.y<v.bounds.min.y||x.bounds.min.y>v.bounds.max.y))){var T=i._getRegion(l,x);if(!x.region||T.id!==x.region.id||d){(!x.region||d)&&(x.region=T);var _=i._regionUnion(T,x.region);for(c=_.startCol;c<=_.endCol;c++)for(p=_.startRow;p<=_.endRow;p++){b=i._getBucketId(c,p),g=m[b];var M=c>=T.startCol&&c<=T.endCol&&p>=T.startRow&&p<=T.endRow,w=c>=x.region.startCol&&c<=x.region.endCol&&p>=x.region.startRow&&p<=x.region.endRow;!M&&w&&w&&g&&i._bucketRemoveBody(l,g,x),(x.region===T||M&&!w||d)&&(g||(g=i._createBucket(m,b)),i._bucketAddBody(l,g,x))}x.region=T,S=!0}}}S&&(l.pairsList=i._createActivePairsList(l))},i.clear=function(l){l.buckets={},l.pairs={},l.pairsList=[]},i._regionUnion=function(l,h){var u=Math.min(l.startCol,h.startCol),d=Math.max(l.endCol,h.endCol),f=Math.min(l.startRow,h.startRow),c=Math.max(l.endRow,h.endRow);return i._createRegion(u,d,f,c)},i._getRegion=function(l,h){var u=h.bounds,d=Math.floor(u.min.x/l.bucketWidth),f=Math.floor(u.max.x/l.bucketWidth),c=Math.floor(u.min.y/l.bucketHeight),p=Math.floor(u.max.y/l.bucketHeight);return i._createRegion(d,f,c,p)},i._createRegion=function(l,h,u,d){return{id:l+","+h+","+u+","+d,startCol:l,endCol:h,startRow:u,endRow:d}},i._getBucketId=function(l,h){return"C"+l+"R"+h},i._createBucket=function(l,h){var u=l[h]=[];return u},i._bucketAddBody=function(l,h,u){for(var d=0;d<h.length;d++){var f=h[d];if(!(u.id===f.id||u.isStatic&&f.isStatic)){var c=a.id(u,f),p=l.pairs[c];p?p[2]+=1:l.pairs[c]=[u,f,1]}}h.push(u)},i._bucketRemoveBody=function(l,h,u){h.splice(o.indexOf(h,u),1);for(var d=0;d<h.length;d++){var f=h[d],c=a.id(u,f),p=l.pairs[c];p&&(p[2]-=1)}},i._createActivePairsList=function(l){var h,u,d=[];h=o.keys(l.pairs);for(var f=0;f<h.length;f++)u=l.pairs[h[f]],u[2]>0?d.push(u):delete l.pairs[h[f]];return d}})()}),(function(e,n,s){var i=e.exports=s(23);i.Axes=s(10),i.Bodies=s(11),i.Body=s(6),i.Bounds=s(1),i.Common=s(0),i.Composite=s(5),i.Composites=s(24),i.Constraint=s(8),i.Contact=s(17),i.Detector=s(13),i.Engine=s(18),i.Events=s(4),i.Grid=s(21),i.Mouse=s(12),i.MouseConstraint=s(25),i.Pair=s(9),i.Pairs=s(20),i.Plugin=s(15),i.Query=s(26),i.Render=s(16),i.Resolver=s(19),i.Runner=s(27),i.SAT=s(14),i.Sleeping=s(7),i.Svg=s(28),i.Vector=s(2),i.Vertices=s(3),i.World=s(29),i.Engine.run=i.Runner.run,i.Common.deprecated(i.Engine,"run","Engine.run ➤ use Matter.Runner.run(engine) instead")}),(function(e,n,s){var i={};e.exports=i;var a=s(15),o=s(0);(function(){i.name="matter-js",i.version="0.17.1",i.uses=[],i.used=[],i.use=function(){a.use(i,Array.prototype.slice.call(arguments))},i.before=function(l,h){return l=l.replace(/^Matter./,""),o.chainPathBefore(i,l,h)},i.after=function(l,h){return l=l.replace(/^Matter./,""),o.chainPathAfter(i,l,h)}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(5),o=s(8),l=s(0),h=s(6),u=s(11),d=l.deprecated;(function(){i.stack=function(f,c,p,v,m,g,b){for(var S=a.create({label:"Stack"}),x=f,T=c,_,M=0,w=0;w<v;w++){for(var y=0,E=0;E<p;E++){var A=b(x,T,E,w,_,M);if(A){var U=A.bounds.max.y-A.bounds.min.y,L=A.bounds.max.x-A.bounds.min.x;U>y&&(y=U),h.translate(A,{x:L*.5,y:U*.5}),x=A.bounds.max.x+m,a.addBody(S,A),_=A,M+=1}else x+=m}T+=y+g,x=f}return S},i.chain=function(f,c,p,v,m,g){for(var b=f.bodies,S=1;S<b.length;S++){var x=b[S-1],T=b[S],_=x.bounds.max.y-x.bounds.min.y,M=x.bounds.max.x-x.bounds.min.x,w=T.bounds.max.y-T.bounds.min.y,y=T.bounds.max.x-T.bounds.min.x,E={bodyA:x,pointA:{x:M*c,y:_*p},bodyB:T,pointB:{x:y*v,y:w*m}},A=l.extend(E,g);a.addConstraint(f,o.create(A))}return f.label+=" Chain",f},i.mesh=function(f,c,p,v,m){var g=f.bodies,b,S,x,T,_;for(b=0;b<p;b++){for(S=1;S<c;S++)x=g[S-1+b*c],T=g[S+b*c],a.addConstraint(f,o.create(l.extend({bodyA:x,bodyB:T},m)));if(b>0)for(S=0;S<c;S++)x=g[S+(b-1)*c],T=g[S+b*c],a.addConstraint(f,o.create(l.extend({bodyA:x,bodyB:T},m))),v&&S>0&&(_=g[S-1+(b-1)*c],a.addConstraint(f,o.create(l.extend({bodyA:_,bodyB:T},m)))),v&&S<c-1&&(_=g[S+1+(b-1)*c],a.addConstraint(f,o.create(l.extend({bodyA:_,bodyB:T},m))))}return f.label+=" Mesh",f},i.pyramid=function(f,c,p,v,m,g,b){return i.stack(f,c,p,v,m,g,function(S,x,T,_,M,w){var y=Math.min(v,Math.ceil(p/2)),E=M?M.bounds.max.x-M.bounds.min.x:0;if(!(_>y)){_=y-_;var A=_,U=p-1-_;if(!(T<A||T>U)){w===1&&h.translate(M,{x:(T+(p%2===1?1:-1))*E,y:0});var L=M?T*E:0;return b(f+L+T*m,x,T,_,M,w)}}})},i.newtonsCradle=function(f,c,p,v,m){for(var g=a.create({label:"Newtons Cradle"}),b=0;b<p;b++){var S=1.9,x=u.circle(f+b*(v*S),c+m,v,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),T=o.create({pointA:{x:f+b*(v*S),y:c},bodyB:x});a.addBody(g,x),a.addConstraint(g,T)}return g},d(i,"newtonsCradle","Composites.newtonsCradle ➤ moved to newtonsCradle example"),i.car=function(f,c,p,v,m){var g=h.nextGroup(!0),b=20,S=-p*.5+b,x=p*.5-b,T=0,_=a.create({label:"Car"}),M=u.rectangle(f,c,p,v,{collisionFilter:{group:g},chamfer:{radius:v*.5},density:2e-4}),w=u.circle(f+S,c+T,m,{collisionFilter:{group:g},friction:.8}),y=u.circle(f+x,c+T,m,{collisionFilter:{group:g},friction:.8}),E=o.create({bodyB:M,pointB:{x:S,y:T},bodyA:w,stiffness:1,length:0}),A=o.create({bodyB:M,pointB:{x,y:T},bodyA:y,stiffness:1,length:0});return a.addBody(_,M),a.addBody(_,w),a.addBody(_,y),a.addConstraint(_,E),a.addConstraint(_,A),_},d(i,"car","Composites.car ➤ moved to car example"),i.softBody=function(f,c,p,v,m,g,b,S,x,T){x=l.extend({inertia:1/0},x),T=l.extend({stiffness:.2,render:{type:"line",anchors:!1}},T);var _=i.stack(f,c,p,v,m,g,function(M,w){return u.circle(M,w,S,x)});return i.mesh(_,p,v,b,T),_.label="Soft Body",_},d(i,"softBody","Composites.softBody ➤ moved to softBody and cloth examples")})()}),(function(e,n,s){var i={};e.exports=i;var a=s(3),o=s(7),l=s(12),h=s(4),u=s(13),d=s(8),f=s(5),c=s(0),p=s(1);(function(){i.create=function(v,m){var g=(v?v.mouse:null)||(m?m.mouse:null);g||(v&&v.render&&v.render.canvas?g=l.create(v.render.canvas):m&&m.element?g=l.create(m.element):(g=l.create(),c.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var b=d.create({label:"Mouse Constraint",pointA:g.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),S={type:"mouseConstraint",mouse:g,element:null,body:null,constraint:b,collisionFilter:{category:1,mask:4294967295,group:0}},x=c.extend(S,m);return h.on(v,"beforeUpdate",function(){var T=f.allBodies(v.world);i.update(x,T),i._triggerEvents(x)}),x},i.update=function(v,m){var g=v.mouse,b=v.constraint,S=v.body;if(g.button===0){if(b.bodyB)o.set(b.bodyB,!1),b.pointA=g.position;else for(var x=0;x<m.length;x++)if(S=m[x],p.contains(S.bounds,g.position)&&u.canCollide(S.collisionFilter,v.collisionFilter))for(var T=S.parts.length>1?1:0;T<S.parts.length;T++){var _=S.parts[T];if(a.contains(_.vertices,g.position)){b.pointA=g.position,b.bodyB=v.body=S,b.pointB={x:g.position.x-S.position.x,y:g.position.y-S.position.y},b.angleB=S.angle,o.set(S,!1),h.trigger(v,"startdrag",{mouse:g,body:S});break}}}else b.bodyB=v.body=null,b.pointB=null,S&&h.trigger(v,"enddrag",{mouse:g,body:S})},i._triggerEvents=function(v){var m=v.mouse,g=m.sourceEvents;g.mousemove&&h.trigger(v,"mousemove",{mouse:m}),g.mousedown&&h.trigger(v,"mousedown",{mouse:m}),g.mouseup&&h.trigger(v,"mouseup",{mouse:m}),l.clearSourceEvents(m)}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(2),o=s(14),l=s(1),h=s(11),u=s(3);(function(){i.collides=function(d,f){for(var c=[],p=0;p<f.length;p++){var v=f[p];if(l.overlaps(v.bounds,d.bounds))for(var m=v.parts.length===1?0:1;m<v.parts.length;m++){var g=v.parts[m];if(l.overlaps(g.bounds,d.bounds)){var b=o.collides(g,d);if(b.collided){c.push(b);break}}}}return c},i.ray=function(d,f,c,p){p=p||1e-100;for(var v=a.angle(f,c),m=a.magnitude(a.sub(f,c)),g=(c.x+f.x)*.5,b=(c.y+f.y)*.5,S=h.rectangle(g,b,m,p,{angle:v}),x=i.collides(S,d),T=0;T<x.length;T+=1){var _=x[T];_.body=_.bodyB=_.bodyA}return x},i.region=function(d,f,c){for(var p=[],v=0;v<d.length;v++){var m=d[v],g=l.overlaps(m.bounds,f);(g&&!c||!g&&c)&&p.push(m)}return p},i.point=function(d,f){for(var c=[],p=0;p<d.length;p++){var v=d[p];if(l.contains(v.bounds,f))for(var m=v.parts.length===1?0:1;m<v.parts.length;m++){var g=v.parts[m];if(l.contains(g.bounds,f)&&u.contains(g.vertices,f)){c.push(v);break}}}return c}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(4),o=s(18),l=s(0);(function(){var h,u;if(typeof window<"u"&&(h=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,u=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),!h){var d;h=function(f){d=setTimeout(function(){f(l.now())},1e3/60)},u=function(){clearTimeout(d)}}i.create=function(f){var c={fps:60,correction:1,deltaSampleSize:60,counterTimestamp:0,frameCounter:0,deltaHistory:[],timePrev:null,timeScalePrev:1,frameRequestId:null,isFixed:!1,enabled:!0},p=l.extend(c,f);return p.delta=p.delta||1e3/p.fps,p.deltaMin=p.deltaMin||1e3/p.fps,p.deltaMax=p.deltaMax||1e3/(p.fps*.5),p.fps=1e3/p.delta,p},i.run=function(f,c){return typeof f.positionIterations<"u"&&(c=f,f=i.create()),(function p(v){f.frameRequestId=h(p),v&&f.enabled&&i.tick(f,c,v)})(),f},i.tick=function(f,c,p){var v=c.timing,m=1,g,b={timestamp:v.timestamp};a.trigger(f,"beforeTick",b),f.isFixed?g=f.delta:(g=p-f.timePrev||f.delta,f.timePrev=p,f.deltaHistory.push(g),f.deltaHistory=f.deltaHistory.slice(-f.deltaSampleSize),g=Math.min.apply(null,f.deltaHistory),g=g<f.deltaMin?f.deltaMin:g,g=g>f.deltaMax?f.deltaMax:g,m=g/f.delta,f.delta=g),f.timeScalePrev!==0&&(m*=v.timeScale/f.timeScalePrev),v.timeScale===0&&(m=0),f.timeScalePrev=v.timeScale,f.correction=m,f.frameCounter+=1,p-f.counterTimestamp>=1e3&&(f.fps=f.frameCounter*((p-f.counterTimestamp)/1e3),f.counterTimestamp=p,f.frameCounter=0),a.trigger(f,"tick",b),a.trigger(f,"beforeUpdate",b),o.update(c,g,m),a.trigger(f,"afterUpdate",b),a.trigger(f,"afterTick",b)},i.stop=function(f){u(f.frameRequestId)},i.start=function(f,c){i.run(f,c)}})()}),(function(e,n,s){var i={};e.exports=i,s(1);var a=s(0);(function(){i.pathToVertices=function(o,l){typeof window<"u"&&!("SVGPathSeg"in window)&&a.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");var h,u,d,f,c,p,v,m,g,b,S=[],x,T,_=0,M=0,w=0;l=l||15;var y=function(A,U,L){var F=L%2===1&&L>1;if(!g||A!=g.x||U!=g.y){g&&F?(x=g.x,T=g.y):(x=0,T=0);var V={x:x+A,y:T+U};(F||!g)&&(g=V),S.push(V),M=x+A,w=T+U}},E=function(A){var U=A.pathSegTypeAsLetter.toUpperCase();if(U!=="Z"){switch(U){case"M":case"L":case"T":case"C":case"S":case"Q":M=A.x,w=A.y;break;case"H":M=A.x;break;case"V":w=A.y;break}y(M,w,A.pathSegType)}};for(i._svgPathToAbsolute(o),d=o.getTotalLength(),p=[],h=0;h<o.pathSegList.numberOfItems;h+=1)p.push(o.pathSegList.getItem(h));for(v=p.concat();_<d;){if(b=o.getPathSegAtLength(_),c=p[b],c!=m){for(;v.length&&v[0]!=c;)E(v.shift());m=c}switch(c.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":f=o.getPointAtLength(_),y(f.x,f.y,0);break}_+=l}for(h=0,u=v.length;h<u;++h)E(v[h]);return S},i._svgPathToAbsolute=function(o){for(var l,h,u,d,f,c,p=o.pathSegList,v=0,m=0,g=p.numberOfItems,b=0;b<g;++b){var S=p.getItem(b),x=S.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(x))"x"in S&&(v=S.x),"y"in S&&(m=S.y);else switch("x1"in S&&(u=v+S.x1),"x2"in S&&(f=v+S.x2),"y1"in S&&(d=m+S.y1),"y2"in S&&(c=m+S.y2),"x"in S&&(v+=S.x),"y"in S&&(m+=S.y),x){case"m":p.replaceItem(o.createSVGPathSegMovetoAbs(v,m),b);break;case"l":p.replaceItem(o.createSVGPathSegLinetoAbs(v,m),b);break;case"h":p.replaceItem(o.createSVGPathSegLinetoHorizontalAbs(v),b);break;case"v":p.replaceItem(o.createSVGPathSegLinetoVerticalAbs(m),b);break;case"c":p.replaceItem(o.createSVGPathSegCurvetoCubicAbs(v,m,u,d,f,c),b);break;case"s":p.replaceItem(o.createSVGPathSegCurvetoCubicSmoothAbs(v,m,f,c),b);break;case"q":p.replaceItem(o.createSVGPathSegCurvetoQuadraticAbs(v,m,u,d),b);break;case"t":p.replaceItem(o.createSVGPathSegCurvetoQuadraticSmoothAbs(v,m),b);break;case"a":p.replaceItem(o.createSVGPathSegArcAbs(v,m,S.r1,S.r2,S.angle,S.largeArcFlag,S.sweepFlag),b);break;case"z":case"Z":v=l,m=h;break}(x=="M"||x=="m")&&(l=v,h=m)}}})()}),(function(e,n,s){var i={};e.exports=i;var a=s(5);s(0),(function(){i.create=a.create,i.add=a.add,i.remove=a.remove,i.clear=a.clear,i.addComposite=a.addComposite,i.addBody=a.addBody,i.addConstraint=a.addConstraint})()})])})})(hr)),hr.exports}Cg();class Rg extends Lc{constructor(){super();const t=new an;t.deleteAttribute("uv");const e=new re({side:Ge}),n=new re,s=new gr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const i=new Nt(t,e);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);const a=new Nt(t,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new Nt(t,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const l=new Nt(t,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const h=new Nt(t,n);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);const u=new Nt(t,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const d=new Nt(t,n);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);const f=new Nt(t,Ci(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const c=new Nt(t,Ci(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const p=new Nt(t,Ci(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);const v=new Nt(t,Ci(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const m=new Nt(t,Ci(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const g=new Nt(t,Ci(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Ci(r){const t=new Xe;return t.color.setScalar(r),t}const Pt={minX:-15,maxX:15,minZ:-12,maxZ:12,wallH:7.6},te={w:1.1,d:1,h:1,halfH:.5,bodyBottom:.12},Le={red:{label:"RED",zh:"红色",hex:"#c9463c",dark:"#7d231e"},yellow:{label:"YELLOW",zh:"黄色",hex:"#dea62b",dark:"#8f6412"},blue:{label:"BLUE",zh:"蓝色",hex:"#3b6ea8",dark:"#1f4066"}},Ce={x:-9.4,z:4.6,yaw:Math.PI},Pg=1.65,ec=[{color:"red",x:-11.8,z:-1.2},{color:"yellow",x:-9.4,z:-1.2},{color:"blue",x:-7,z:-1.2}],ai=[{color:"red",x:10.4,z:-4.6,w:2.9,d:2.9},{color:"yellow",x:10.4,z:.4,w:2.9,d:2.9},{color:"blue",x:10.4,z:5.4,w:2.9,d:2.9}],uo=120,fo=1.75,Ig=.95,js=.1,Qs={lateral:.25,height:.15,angleDeg:15,insertion:.3},Lg=.05,tr={stableSeconds:.5,maxBottom:.06,maxSpeed:.1};let po=20261021;function Yt(){return po=(po*1664525+1013904223)%4294967296,po/4294967296}function je(r,t){const e=document.createElement("canvas");return e.width=r,e.height=t,{c:e,g:e.getContext("2d")}}function Qe(r,t){const e=new _r(r);return e.colorSpace=De,e.anisotropy=8,t&&(e.wrapS=e.wrapT=ur,e.repeat.set(t[0],t[1])),e}function Dg(r,t,e){r.fillStyle="#78766d",r.fillRect(0,0,t,e);for(let n=0;n<26e3;n++){const s=92+Math.floor(Yt()*60);r.fillStyle=`rgba(${s},${s-2},${s-8},${.05+Yt()*.13})`;const i=1+Yt()*3.2;r.fillRect(Yt()*t,Yt()*e,i,i)}for(let n=0;n<26;n++){const s=Yt()*t,i=Yt()*e,a=25+Yt()*130,o=r.createRadialGradient(s,i,0,s,i,a),l=Yt()>.45;o.addColorStop(0,l?"rgba(44,43,39,0.17)":"rgba(196,192,180,0.10)"),o.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=o,r.beginPath(),r.arc(s,i,a,0,Math.PI*2),r.fill()}r.strokeStyle="rgba(38,37,34,0.42)",r.lineWidth=2;for(const n of[.25,.5,.75])r.beginPath(),r.moveTo(n*t+.5,0),r.lineTo(n*t+.5,e),r.stroke(),r.beginPath(),r.moveTo(0,n*e+.5),r.lineTo(t,n*e+.5),r.stroke();r.strokeStyle="rgba(30,29,27,0.30)";for(let n=0;n<15;n++){let s=Yt()*t,i=Yt()*e;r.lineWidth=.6+Yt(),r.beginPath(),r.moveTo(s,i);for(let a=0;a<9;a++)s+=(Yt()-.5)*70,i+=(Yt()-.5)*70,r.lineTo(s,i);r.stroke()}}function Ug(){const{c:r,g:t}=je(1024,1024);return Dg(t,1024,1024),Qe(r,[7,5.5])}function Ng(){const{c:r,g:t}=je(512,512);t.fillStyle="#808080",t.fillRect(0,0,512,512);for(let n=0;n<14e3;n++){const s=105+Math.floor(Yt()*60);t.fillStyle=`rgb(${s},${s},${s})`,t.fillRect(Yt()*512,Yt()*512,1+Yt()*2,1+Yt()*2)}const e=Qe(r,[7,5.5]);return e.colorSpace=Rn,e}function Fg(){const{c:r,g:t}=je(512,512),e=t.createLinearGradient(0,0,0,512);e.addColorStop(0,"#8d9492"),e.addColorStop(.55,"#7e8584"),e.addColorStop(1,"#6b7271"),t.fillStyle=e,t.fillRect(0,0,512,512);for(let n=0;n<512;n+=32){const s=t.createLinearGradient(n,0,n+32,0);s.addColorStop(0,"rgba(255,255,255,0.16)"),s.addColorStop(.35,"rgba(255,255,255,0.03)"),s.addColorStop(.62,"rgba(0,0,0,0.16)"),s.addColorStop(1,"rgba(0,0,0,0.02)"),t.fillStyle=s,t.fillRect(n,0,32,512)}for(let n=0;n<260;n++)t.fillStyle=`rgba(${30+Yt()*40},${29+Yt()*40},${27+Yt()*40},${Yt()*.13})`,t.fillRect(Yt()*512,400+Yt()*112,3+Yt()*30,1+Yt()*5);return Qe(r,[10,1])}function eh(r,t,e){r.fillStyle="#b98c53",r.fillRect(0,0,t,e);for(let n=0;n<70;n++){const s=Yt()*e;r.strokeStyle=`rgba(${80+Yt()*50},${50+Yt()*35},${20+Yt()*25},${.05+Yt()*.16})`,r.lineWidth=.5+Yt()*2.4,r.beginPath();for(let i=0;i<=t;i+=16){const a=s+Math.sin(i/t*Math.PI*(2+Yt()*4)+n)*(2+Yt()*7);i===0?r.moveTo(i,a):r.lineTo(i,a)}r.stroke()}for(let n=0;n<40;n++){const s=Yt()*t,i=Yt()*e;r.strokeStyle="rgba(84,54,26,0.22)",r.lineWidth=1,r.beginPath(),r.ellipse(s,i,2+Yt()*7,1+Yt()*2.5,0,0,Math.PI*2),r.stroke()}r.strokeStyle="rgba(64,42,20,0.35)",r.lineWidth=2;for(let n=0;n<e;n+=e/5)r.beginPath(),r.moveTo(0,n),r.lineTo(t,n),r.stroke()}function Og(r){const t=Le[r],{c:e,g:n}=je(512,512);eh(n,512,512),n.fillStyle=t.hex,n.fillRect(34,76,444,330),n.strokeStyle="rgba(255,255,255,0.82)",n.lineWidth=7,n.strokeRect(48,90,416,302),n.setLineDash([16,10]),n.lineWidth=2,n.strokeStyle="rgba(255,255,255,0.45)",n.strokeRect(62,104,388,274),n.setLineDash([]),n.fillStyle="rgba(0,0,0,0.13)";for(let a=0;a<240;a++)n.fillRect(34+Yt()*444,76+Yt()*330,1+Yt()*6,1+Yt()*2);n.textAlign="center",n.fillStyle="#f7f3e6",n.font='800 66px "Helvetica Neue", Arial, sans-serif',n.fillText(t.label,256,225),n.font='700 43px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(t.zh+"货箱",256,285),n.font='600 25px "Helvetica Neue", Arial, sans-serif',n.fillText("PELICAN CARGO · ACADEMY",256,340),n.strokeStyle="rgba(255,255,255,0.7)",n.lineWidth=5;const s=26,i=54;for(const[a,o,l,h]of[[s,s,1,1],[512-s,s,-1,1],[s,512-s,1,-1],[512-s,512-s,-1,-1]])n.beginPath(),n.moveTo(a+l*i,o),n.lineTo(a,o),n.lineTo(a,o+h*i),n.stroke();return n.textAlign="left",n.fillStyle="rgba(30,20,10,0.55)",n.font='700 22px "Helvetica Neue", Arial, sans-serif',n.fillText("FL-ACADEMY / 03",40,470),n.textAlign="right",n.fillText("1.0 m³ · 240 kg",472,470),Qe(e)}function Bg(){const{c:r,g:t}=je(512,512);eh(t,512,512),t.strokeStyle="rgba(50,34,16,0.5)",t.lineWidth=4,t.strokeRect(12,12,488,488),t.strokeStyle="rgba(50,34,16,0.28)",t.lineWidth=2;for(let e=0;e<512;e+=64)t.beginPath(),t.moveTo(e,0),t.lineTo(e,512),t.stroke();return t.fillStyle="rgba(38,28,16,0.5)",t.font='700 30px "Helvetica Neue", Arial, sans-serif',t.textAlign="center",t.fillText("PELICAN · FRAGILE",256,274),Qe(r)}function zg(){const{c:r,g:t}=je(256,64);t.fillStyle="#d7a92b",t.fillRect(0,0,256,64),t.fillStyle="#232629";for(let e=-64;e<256;e+=64)t.beginPath(),t.moveTo(e,64),t.lineTo(e+32,64),t.lineTo(e+96,0),t.lineTo(e+64,0),t.fill();return Qe(r,[1,1])}function nc(r,t=1024,e=512){const{c:n,g:s}=je(t,e);return s.fillStyle=r.bg,s.fillRect(0,0,t,e),s.strokeStyle=r.accent??r.fg,s.lineWidth=14,s.strokeRect(22,22,t-44,e-44),s.strokeStyle="rgba(255,255,255,0.16)",s.lineWidth=3,s.strokeRect(44,44,t-88,e-88),s.textAlign="center",s.fillStyle=r.fg,s.font='800 104px "Helvetica Neue", Arial, sans-serif',s.fillText(r.title,t/2,196),r.zh&&(s.font='700 70px "PingFang SC", "Microsoft YaHei", sans-serif',s.fillText(r.zh,t/2,292)),r.sub&&(s.font='600 34px "Helvetica Neue", Arial, sans-serif',s.fillStyle="rgba(255,255,255,0.78)",s.fillText(r.sub,t/2,370)),s.fillStyle=r.accent??r.fg,s.beginPath(),s.moveTo(t/2-60,e-82),s.lineTo(t/2,e-118),s.lineTo(t/2+60,e-82),s.lineTo(t/2+32,e-82),s.lineTo(t/2+32,e-54),s.lineTo(t/2-32,e-54),s.lineTo(t/2-32,e-82),s.fill(),Qe(n)}function kg(){const{c:r,g:t}=je(2048,512);t.fillStyle="#12211f",t.fillRect(0,0,2048,512);const e=t.createLinearGradient(0,0,2048,512);return e.addColorStop(0,"rgba(46,139,126,0.55)"),e.addColorStop(.6,"rgba(12,32,30,0)"),e.addColorStop(1,"rgba(199,148,55,0.32)"),t.fillStyle=e,t.fillRect(0,0,2048,512),t.strokeStyle="rgba(240,206,136,0.7)",t.lineWidth=6,t.strokeRect(34,34,1980,444),t.textAlign="left",t.fillStyle="#f0d9a4",t.font='800 142px "Helvetica Neue", Arial, sans-serif',t.fillText("PELICAN",110,210),t.fillStyle="#eef4ef",t.font='800 92px "Helvetica Neue", Arial, sans-serif',t.fillText("FORKLIFT ACADEMY",110,320),t.fillStyle="#8fd3c6",t.font='700 64px "PingFang SC", "Microsoft YaHei", sans-serif',t.fillText("鹈 鹕 叉 车 驾 校",112,418),t.strokeStyle="#f0d9a4",t.lineWidth=10,t.beginPath(),t.arc(1740,200,92,.4,Math.PI*1.72),t.stroke(),t.beginPath(),t.moveTo(1770,186),t.quadraticCurveTo(1890,196,1930,238),t.quadraticCurveTo(1840,252,1796,224),t.stroke(),t.fillStyle="#2e8b7e",t.beginPath(),t.arc(1712,196,15,0,7),t.fill(),t.fillStyle="rgba(240,217,164,0.9)",t.font='700 34px "Helvetica Neue", Arial, sans-serif',t.fillText("BAY 03 · TRAINING GROUND",1420,428),Qe(r)}function mo(r){const{c:t,g:e}=je(512,720);return r===0?(e.fillStyle="#e9e2cf",e.fillRect(0,0,512,720),e.fillStyle="#d9a52c",e.fillRect(0,0,512,128),e.fillStyle="#1d2a2b",e.font='800 64px "Helvetica Neue", Arial, sans-serif',e.fillText("SAFETY",40,88),e.fillStyle="#263231",e.font='800 52px "PingFang SC", sans-serif',e.fillText("安全第一",40,230),e.strokeStyle="#263231",e.lineWidth=8,e.beginPath(),e.arc(256,470,150,0,Math.PI*2),e.stroke(),e.strokeStyle="#c9463c",e.lineWidth=22,e.beginPath(),e.arc(256,470,118,-.7,Math.PI*.9),e.stroke(),e.fillStyle="#263231",e.font='700 32px "Helvetica Neue", Arial, sans-serif',e.textAlign="center",e.fillText("WEAR · BELT · SLOW",256,670)):r===1?(e.fillStyle="#203230",e.fillRect(0,0,512,720),e.fillStyle="#e8d8ae",e.font='800 46px "PingFang SC", sans-serif',e.fillText("叉车通道",40,96),e.fillStyle="#8fd3c6",e.font='700 30px "Helvetica Neue", Arial, sans-serif',e.fillText("FORKLIFT LANE",40,142),e.strokeStyle="#d7a92b",e.lineWidth=10,e.setLineDash([28,18]),e.beginPath(),e.moveTo(256,650),e.lineTo(256,220),e.stroke(),e.setLineDash([]),e.fillStyle="#d7a92b",e.beginPath(),e.moveTo(256,176),e.lineTo(316,268),e.lineTo(196,268),e.fill(),e.strokeStyle="#e8d8ae",e.lineWidth=5,e.strokeRect(40,56,432,600)):(e.fillStyle="#efe7d6",e.fillRect(0,0,512,720),e.fillStyle="#c9463c",e.fillRect(0,0,512,150),e.fillStyle="#fff6e8",e.font='800 58px "Helvetica Neue", Arial, sans-serif',e.textAlign="center",e.fillText("CHECK",256,92),e.fillText("THE FORKS",256,140),e.fillStyle="#26302f",e.font='700 30px "PingFang SC", sans-serif',e.fillText("每 次 起 步 前 检 查 门 架",256,250),e.strokeStyle="#26302f",e.lineWidth=7,e.beginPath(),e.moveTo(130,430),e.lineTo(130,300),e.lineTo(382,300),e.stroke(),e.beginPath(),e.moveTo(150,590),e.lineTo(150,452),e.lineTo(362,452),e.stroke(),e.lineWidth=13,e.beginPath(),e.moveTo(150,590),e.lineTo(150,690),e.stroke(),e.beginPath(),e.moveTo(362,590),e.lineTo(362,690),e.stroke(),e.fillStyle="#d9a52c",e.font='800 34px "PingFang SC", sans-serif',e.fillText("门架 · 货叉 · 载荷",256,670)),Qe(t)}function Vg(){const{c:r,g:t}=je(1024,512);t.fillStyle="#151b1c",t.fillRect(0,0,1024,512),t.strokeStyle="#303b3c",t.lineWidth=10,t.strokeRect(8,8,1008,496),t.textAlign="center";const e=(n,s)=>{t.strokeStyle="#5b6b69",t.lineWidth=5,t.beginPath(),t.arc(n,260,160,Math.PI*.75,Math.PI*2.25),t.stroke();for(let a=0;a<=20;a++){const o=Math.PI*.75+Math.PI*1.5*a/20,l=160,h=a%4===0?132:144;t.strokeStyle=a>15?"#c9463c":"#aab7b3",t.lineWidth=a%4===0?5:2,t.beginPath(),t.moveTo(n+Math.cos(o)*l,260+Math.sin(o)*l),t.lineTo(n+Math.cos(o)*h,260+Math.sin(o)*h),t.stroke()}const i=Math.PI*.75+Math.PI*1.5*(s==="HOURS"?.58:.3);t.strokeStyle="#e8b45b",t.lineWidth=6,t.beginPath(),t.moveTo(n,260),t.lineTo(n+Math.cos(i)*118,260+Math.sin(i)*118),t.stroke(),t.fillStyle="#0c1011",t.beginPath(),t.arc(n,260,18,0,7),t.fill(),t.strokeStyle="#e8b45b",t.lineWidth=3,t.beginPath(),t.arc(n,260,18,0,7),t.stroke(),t.fillStyle="#9fb0ac",t.font='600 30px "Helvetica Neue", Arial, sans-serif',t.fillText(s,n,450)};return e(280,"HOURS"),e(744,"FUEL"),t.fillStyle="#e8d8ae",t.font='700 28px "Helvetica Neue", Arial, sans-serif',t.fillText("PELICAN · FL-03",512,60),Qe(r)}function Hg(r,t){const{c:e,g:n}=je(512,256);return n.clearRect(0,0,512,256),n.fillStyle="#f0d9a4",n.font='800 76px "Helvetica Neue", Arial, sans-serif',n.textAlign="center",n.fillText(r,256,120),n.fillStyle="#d7e4df",n.font='700 28px "Helvetica Neue", Arial, sans-serif',n.fillText(t,256,174),Qe(e)}const ae=r=>new re(r),go=r=>new Hc(r),vo={},Gg=Bg();function Wg(r){return vo[r]||(vo[r]=Og(r)),ae({map:vo[r],roughness:.72,metalness:.05})}function Xg(){return ae({map:Gg,roughness:.78})}const z={paint:go({color:2322278,metalness:.55,roughness:.28,clearcoat:.7,clearcoatRoughness:.22}),paintDark:go({color:1527625,metalness:.5,roughness:.38,clearcoat:.4}),cream:ae({color:14273449,metalness:.25,roughness:.48}),graphite:ae({color:2369834,metalness:.55,roughness:.55}),castIron:ae({color:3883330,metalness:.7,roughness:.62}),steel:ae({color:10134436,metalness:.92,roughness:.34}),steelDark:ae({color:6121063,metalness:.85,roughness:.45}),chrome:ae({color:14541794,metalness:1,roughness:.1}),rubber:ae({color:1119510,metalness:.02,roughness:.93}),rubberTrim:ae({color:1777697,metalness:.05,roughness:.78}),seat:ae({color:1909283,metalness:.05,roughness:.66}),seatStitch:ae({color:7229236,metalness:.05,roughness:.7}),glass:go({color:11065040,metalness:0,roughness:.06,transparent:!0,opacity:.16,side:Ue,depthWrite:!1}),feather:ae({color:16052453,metalness:0,roughness:.86}),featherShade:ae({color:14276040,metalness:0,roughness:.9}),featherTip:ae({color:12040626,metalness:0,roughness:.92}),beak:ae({color:15243058,metalness:.08,roughness:.48}),pouch:ae({color:14253869,metalness:.02,roughness:.62}),leg:ae({color:14849343,metalness:.02,roughness:.7}),eye:ae({color:16184296,metalness:0,roughness:.25}),pupil:ae({color:1053718,metalness:0,roughness:.2}),wood:ae({color:12160083,metalness:0,roughness:.78}),woodDark:ae({color:8149553,metalness:0,roughness:.82}),crateFrame:ae({color:10187071,metalness:.03,roughness:.75}),crateMetal:ae({color:7172979,metalness:.8,roughness:.48}),headlight:ae({color:16774358,emissive:16767114,emissiveIntensity:1.5,roughness:.2,metalness:.2}),taillight:ae({color:9314070,emissive:10363414,emissiveIntensity:.9,roughness:.35}),beacon:ae({color:16761415,emissive:16754720,emissiveIntensity:2.2,roughness:.25,transparent:!0,opacity:.9}),hazard:ae({map:zg(),roughness:.6,metalness:.1}),rackBlue:ae({color:3364458,metalness:.55,roughness:.5}),rackOrange:ae({color:11102253,metalness:.45,roughness:.55}),deck:ae({color:9141086,metalness:.15,roughness:.8}),safetyYellow:ae({color:14725164,metalness:.15,roughness:.6})};function Yg(r){const t=Le[r],{c:e,g:n}=je(768,512);n.fillStyle="#12191a",n.fillRect(0,0,768,512),n.fillStyle=t.hex,n.fillRect(0,0,768,118),n.strokeStyle="rgba(255,255,255,0.85)",n.lineWidth=10,n.strokeRect(14,14,740,484),n.textAlign="center",n.fillStyle="#ffffff",n.font='800 70px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(t.zh+"交付区",384,86),n.fillStyle="#f5efdf",n.font='800 92px "Helvetica Neue", Arial, sans-serif',n.fillText(t.label,384,250),n.fillStyle=t.hex,n.fillRect(130,292,508,76),n.fillStyle="#101718",n.font='800 52px "PingFang SC", sans-serif',n.fillText("仅限同色货箱",384,348),n.fillStyle="#b9c6c1",n.font='600 30px "Helvetica Neue", Arial, sans-serif',n.fillText("DROP ZONE · KEEP CLEAR",384,430);for(let s=0;s<8;s++)n.fillStyle=s%2===0?t.hex:"#202829",n.fillRect(60+s*82,462,82,30);return Qe(e)}function qg(){const{c:r,g:t}=je(256,256),e=t.createRadialGradient(128,128,4,128,128,124);return e.addColorStop(0,"rgba(0,0,0,0.45)"),e.addColorStop(.55,"rgba(0,0,0,0.18)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.beginPath(),t.arc(128,128,124,0,7),t.fill(),Qe(r)}function dt(r,t,e,n=0,s=0,i=0,a=0,o=0,l=0,h=!0,u=!0){const d=new Nt(t,e);return d.position.set(n,s,i),d.rotation.set(a,o,l),d.castShadow=h,d.receiveShadow=u,r.add(d),d}function rt(r,t,e,n,s,i,a,o,l=0,h=0,u=0,d=!0){return dt(r,new an(t,e,n),o,s,i,a,l,h,u,d,!0)}function Zg(r,t,e,n=.05,s=.02,i=3){const a=Math.min(s,r*.24,t*.24,e*.24),o=Math.max(.002,Math.min(n,r/2-a-.001,t/2-a-.001)),l=new _s,h=r/2-a,u=t/2-a;l.moveTo(-h+o,-u),l.lineTo(h-o,-u),l.quadraticCurveTo(h,-u,h,-u+o),l.lineTo(h,u-o),l.quadraticCurveTo(h,u,h-o,u),l.lineTo(-h+o,u),l.quadraticCurveTo(-h,u,-h,u-o),l.lineTo(-h,-u+o),l.quadraticCurveTo(-h,-u,-h+o,-u);const d=new Yi(l,{depth:Math.max(.001,e-2*a),bevelEnabled:!0,bevelThickness:a,bevelSize:a,bevelSegments:i,curveSegments:i+2,steps:1});return d.center(),d}function Ie(r,t,e,n,s,i,a,o,l=.05,h=.02,u=0,d=0,f=0){return dt(r,Zg(t,e,n,l,h),o,s,i,a,u,d,f,!0,!0)}function rn(r,t,e,n,s,i=12){const a=new P().subVectors(e,t),o=a.length(),l=new Nt(new ee(n,n,o,i),s);return l.position.copy(t).addScaledVector(a,.5),l.quaternion.setFromUnitVectors(new P(0,1,0),a.clone().normalize()),l.castShadow=!0,l.receiveShadow=!0,r.add(l),l}function $g(r,t,e,n,s=24,i=10){const a=new wa(t),o=new Nt(new wr(a,s,e,i,!1),n);return o.castShadow=!0,o.receiveShadow=!0,r.add(o),o}function Ri(r,t,e,n,s,i,a,o,l){const h=Hg(t,e),u=new re({map:h,transparent:!0,roughness:.5,metalness:.1,depthWrite:!1});return dt(r,new ve(n,s),u,i,a,o,0,l,0,!1,!1)}function Wi(r,t=new Set){r.updateMatrixWorld(!0);const e=new Qt().copy(r.matrixWorld).invert(),n=new Qt,s=new Map,i=[],a=new Set;r.traverse(l=>{t.has(l)&&a.add(l)});const o=l=>{let h=l;for(;h;){if(t.has(h))return!0;if(h===r)return!1;h=h.parent}return!1};r.traverse(l=>{const h=l;if(!h.isMesh||Array.isArray(h.material)||h.isInstancedMesh||o(h))return;const u=h.material;if(!u)return;const d=`${u.uuid}|${h.castShadow}|${h.receiveShadow}|${h.renderOrder}`;let f=s.get(d);f||(f={mat:u,cast:h.castShadow,receive:h.receiveShadow,order:h.renderOrder,geos:[]},s.set(d,f));const c=h.geometry.clone();for(const v of Object.keys(c.attributes))["position","normal","uv"].includes(v)||c.deleteAttribute(v);c.attributes.uv||c.setAttribute("uv",new Ye(new Float32Array(c.attributes.position.count*2),2)),c.attributes.normal||c.computeVertexNormals();const p=c.index?c.toNonIndexed():c;n.multiplyMatrices(e,h.matrixWorld),p.applyMatrix4(n),f.geos.push(p),i.push(h)});for(const l of i)l.removeFromParent(),l.geometry.dispose();for(const l of s.values()){if(!l.geos.length)continue;const h=Jc(l.geos,!1);if(!h)continue;const u=new Nt(h,l.mat);u.castShadow=l.cast,u.receiveShadow=l.receive,u.renderOrder=l.order,r.add(u);for(const d of l.geos)d.dispose()}}function Kg(r,t){const e=[],n=t/2;e.push(new at(.52*r,-n*.86)),e.push(new at(.78*r,-n)),e.push(new at(.92*r,-n*.92)),e.push(new at(.99*r,-n*.58)),e.push(new at(r,0)),e.push(new at(.99*r,n*.58)),e.push(new at(.92*r,n*.92)),e.push(new at(.78*r,n)),e.push(new at(.52*r,n*.86));const s=new Ea(e,28);return s.rotateZ(Math.PI/2),s}function ic(r,t){const e=new de,n=new de;e.add(n);const s=new Nt(Kg(r,t),z.rubber);s.castShadow=!0,s.receiveShadow=!0,n.add(s);const i=new an(t*1.005,r*.075,r*.19),a=new Bu(i,z.rubber,20),o=new Re;for(let u=0;u<20;u++){const d=u/20*Math.PI*2;o.position.set(0,Math.cos(d)*r*.985,Math.sin(d)*r*.985),o.rotation.set(d,0,0),o.updateMatrix(),a.setMatrixAt(u,o.matrix)}a.castShadow=!0,n.add(a);const l=new Nt(new ee(r*.56,r*.56,t*.68,22),z.steelDark);l.rotation.z=Math.PI/2,l.castShadow=!0,n.add(l);for(const u of[-1,1]){const d=new Nt(new ee(r*.52,r*.52,.025,22),z.steel);d.rotation.z=Math.PI/2,d.position.x=u*t*.35,d.castShadow=!0,n.add(d);const f=new Nt(new ee(r*.17,r*.2,.05,14),z.chrome);f.rotation.z=Math.PI/2,f.position.x=u*t*.37,f.castShadow=!0,n.add(f);for(let c=0;c<5;c++){const p=c/5*Math.PI*2,v=new Nt(new ee(.014,.014,.03,6),z.steelDark);v.rotation.z=Math.PI/2,v.position.set(u*t*.38,Math.cos(p)*r*.33,Math.sin(p)*r*.33),n.add(v)}}const h=new Nt(new Gn(r*.64,.008,6,32),z.paint);return h.rotation.y=Math.PI/2,h.position.x=t*.355,n.add(h),Wi(n),{steer:e,spin:n,radius:r}}function er(r,t){const e=new _s;e.moveTo(0,0),e.bezierCurveTo(t*.5,r*.1,t*.62,r*.55,0,r),e.bezierCurveTo(-t*.62,r*.55,-t*.5,r*.1,0,0);const n=new Yi(e,{depth:.012,bevelEnabled:!0,bevelSize:.008,bevelThickness:.006,bevelSegments:2,curveSegments:8});return n.center(),n}function Jg(){const r=new de,t=z.feather,e=z.featherShade,n=z.featherTip,s=new de;r.add(s),dt(s,new Ee(.5,28,22),t,0,1.3,-.28).scale.set(.78,.96,.68);for(let _=0;_<3;_++)dt(s,new Ee(.5,22,16),_===1?e:t,0,1.16-_*.075,-.27+_*.015).scale.set(.68-_*.02,.36,.6);dt(s,new ee(.405,.43,.3,26,1,!0),new re({color:14254636,roughness:.66,metalness:.03,side:Ue}),0,1.27,-.27).scale.set(1,1,.82);for(const _ of[1.36,1.2])dt(s,new Gn(.42,.017,6,30),new re({color:14147030,roughness:.35,metalness:.25}),0,_,-.27,Math.PI/2,0,0,!1,!1).scale.set(1,.82,1);dt(s,new _n(.055,16),new re({color:2109491,roughness:.5}),0,1.25,.085,0,0,0,!1,!1).scale.set(1,1.25,1);for(let _=0;_<3;_++)dt(s,er(.5,.2),e,-.13+_*.13,1.16,-.62,Math.PI*.72,0,(_-1)*.16).scale.setScalar(.9);const o=new wa([new P(0,1.56,-.23),new P(.005,1.72,-.18),new P(.005,1.9,-.05),new P(.01,2.02,.15),new P(.005,2.02,.28)]),l=new Nt(new wr(o,32,.095,12,!1),t);l.castShadow=!0,l.receiveShadow=!0,l.scale.set(1,1,1),s.add(l),dt(s,new Ee(.5,16,12),e,0,1.55,-.21).scale.set(.3,.22,.28);const u=new de;u.position.set(0,2.03,.3),s.add(u),dt(u,new Ee(.5,24,18),t,0,0,0).scale.set(.32,.3,.36);const f=new re({color:14197323,roughness:.42,metalness:.05});for(const _ of[-1,1])dt(u,new Ee(.078,14,12),z.featherShade,_*.145,.055,.055).scale.set(.72,1.05,1.1),dt(u,new Ee(.058,16,12),z.eye,_*.155,.06,.075).scale.set(1,1.08,.72),dt(u,new Ee(.035,14,10),f,_*.181,.06,.099).scale.set(1,1,.7),dt(u,new Ee(.021,12,10),z.pupil,_*.192,.061,.112),dt(u,new Ee(.007,8,6),new Xe({color:16777215}),_*.2,.074,.122,0,0,0,!1,!1);for(let _=0;_<3;_++)dt(u,er(.26,.1),_===1?e:t,-.06+_*.06,.03,-.14,-Math.PI*.72,0,(_-1)*.2).scale.set(.8,.9,.7);const c=new de;c.position.set(0,.015,.15),u.add(c);const p=new ee(.012,.062,.7,14,1,!1);p.rotateX(Math.PI/2),dt(c,p,z.beak,0,.012,.36).scale.set(1,.6,1),dt(c,new yr(.02,.075,10),z.beak,0,-.028,.705,Math.PI*.7,0,0),rt(c,.012,.016,.55,0,.045,.3,new re({color:12942890,roughness:.5})),dt(u,new Ee(.012,8,6),z.graphite,.052,0,.245,0,0,0,!1,!1),dt(u,new Ee(.012,8,6),z.graphite,-.052,0,.245,0,0,0,!1,!1);const m=new ee(.008,.042,.58,10);m.rotateX(Math.PI/2),dt(u,m,z.beak,0,-.045,.44).scale.y=.5;const g=dt(u,new Ee(.5,24,18),z.pouch,0,-.19,.29);g.scale.set(.2,.34,.47),g.rotation.x=.22,dt(u,new Ee(.5,20,14),z.pouch,0,-.28,.23).scale.set(.15,.2,.33),dt(u,new Gn(.15,.007,5,20,Math.PI),new re({color:11822116,roughness:.7}),0,-.11,.43,Math.PI/2,0,0,!1,!1);const S=new de;S.position.set(0,.13,-.025),S.rotation.x=-.1,u.add(S),dt(S,new Ee(.25,26,16,0,Math.PI*2,0,Math.PI*.56),z.safetyYellow,0,0,0).scale.set(1.02,.9,1.12),dt(S,new ee(.255,.265,.024,26),z.safetyYellow,0,0,0),dt(S,new Gn(.215,.011,6,26),z.graphite,0,.006,0,Math.PI/2,0,0,!1,!1),rt(S,.035,.02,.34,0,.205,-.02,new re({color:15781746,roughness:.5}),0,0,0,!1),dt(S,new ee(.13,.17,.02,20),z.safetyYellow,0,.002,.215,.08,0,0).scale.set(1.28,1,1),dt(S,new _n(.042,18),z.paintDark,0,.19,.17,-.45,0,0,!1,!1),dt(S,new _n(.028,16),z.safetyYellow,0,.193,.175,-.45,0,0,!1,!1);for(const _ of[-1,1]){const M=new de;s.add(M),dt(M,new Ee(.5,16,12),t,_*.29,1.38,-.22).scale.set(.23,.4,.32),$g(M,[new P(_*.3,1.4,-.22),new P(_*.34,1.3,-.02),new P(_*.26,1.31,.15),new P(_*.18,1.34,.24)],.075,t,18,10);for(let y=0;y<3;y++)dt(M,er(.38,.17),y===2?n:e,_*(.31-y*.025),1.26-y*.02,-.08+y*.03,Math.PI*.5,_*.25,_*(.35+y*.16)).scale.set(1,1,.7);for(let y=0;y<3;y++)dt(M,er(.24,.1),y===1?n:e,_*(.2+y*.012),1.335-y*.004,.27+y*.02,Math.PI*.46,_*.35,_*.5).scale.set(.8,.85,.7)}for(const _ of[-1,1]){rn(s,new P(_*.13,1.02,-.25),new P(_*.15,.66,.16),.038,z.leg,10),rn(s,new P(_*.14,.7,-.1),new P(_*.15,.63,.16),.032,z.leg,8);const M=new de;M.position.set(_*.15,.605,.24),s.add(M);const w=new _s;w.moveTo(0,0),w.quadraticCurveTo(.1,.06,.18,.03),w.quadraticCurveTo(.11,-.02,.15,-.1),w.quadraticCurveTo(.03,-.08,0,0);const y=new Nt(new Yi(w,{depth:.022,bevelEnabled:!1,curveSegments:8}),z.leg);y.rotation.x=-Math.PI/2,y.rotation.z=_>0?0:Math.PI,y.position.z=.03,y.castShadow=!0,y.receiveShadow=!0,M.add(y),dt(M,new an(.14,.018,.16),z.leg,.02,.01,.01,0,0,0,!0,!0)}return Wi(u),Wi(s,new Set([u,l])),r.scale.setScalar(.8),r.position.set(0,.145,.02),{root:r,head:u,neck:l,torso:s}}function jg(){const r=new de;r.name="forklift";const t=z.paint,e=z.paintDark,n=z.cream;Ie(r,1.3,.38,2.15,0,.55,-.02,t,.09,.035),Ie(r,1.14,.5,.55,0,.72,1,t,.07,.03),Ie(r,1.24,.6,.62,0,.82,-.62,t,.08,.03,.05),Ie(r,1.08,.34,.5,0,.98,.82,e,.06,.025,-.13),Ie(r,1.27,.95,.62,0,.8,-1.15,z.castIron,.09,.035);for(let w=-2;w<=2;w++)rt(r,.12,.68,.04,w*.22,.79,-1.47,z.graphite);rt(r,1.05,.12,.1,0,.3,-1.47,z.steelDark),dt(r,new ee(.055,.055,.16,12),z.chrome,0,.43,-1.5,Math.PI/2,0,0);const s=new re({map:z.hazard.map,roughness:.62,metalness:.08});rt(r,1.24,.13,.02,0,.31,-1.472,s,0,0,0,!1),Ri(r,"03","ACADEMY",.3,.15,-.38,.62,-1.492,Math.PI);for(const w of[-1,1]){for(let y=0;y<4;y++)rt(r,.02,.22,.012,w*.5,.78,-1.476,z.steelDark,0,0,0,!1);rt(r,.02,.03,.26,w*.655,.45,-1.24,z.steelDark,0,0,0,!1),dt(r,new ee(.075,.075,.035,14),z.steelDark,w*.62,.62,-.9,0,0,Math.PI/2)}rt(r,.72,.32,.035,0,.98,-1.47,z.graphite);for(let w=0;w<6;w++)rt(r,.62,.022,.012,0,.87+w*.045,-1.492,z.steelDark);Ri(r,"PELICAN","FL-ACADEMY 03",.52,.26,0,.62,-1.49,Math.PI);for(const w of[-1,1]){rt(r,.02,.26,1.2,w*.645,.62,.12,e),rt(r,.02,.02,1.18,w*.655,.73,.1,z.steelDark),rt(r,.3,.06,.5,w*.7,.32,-.24,z.steelDark);for(let y=0;y<4;y++)rt(r,.26,.012,.03,w*.7,.355,-.4+y*.1,z.steel);rn(r,new P(w*.68,.82,-.68),new P(w*.68,1.38,-.72),.022,z.chrome,8),Ri(r,"PELICAN","FORKLIFT ACADEMY",.44,.22,w*.657,.93,-.35,w>0?Math.PI/2:-Math.PI/2)}for(const w of[-1,1]){const y=new re({color:1527625,metalness:.5,roughness:.4,side:Ue}),E=new Nt(new ee(.47,.47,.34,20,1,!0,0,Math.PI),y);E.rotation.z=Math.PI/2,E.rotation.y=0,E.position.set(w*.74,.42,.7),E.castShadow=!0,E.receiveShadow=!0,r.add(E),rt(r,.32,.22,.03,w*.74,.28,.24,z.rubberTrim)}rt(r,1.2,.14,.16,0,.33,1.24,z.steelDark);for(const w of[-1,1]){dt(r,new ee(.115,.13,.12,16),z.graphite,w*.41,.82,1.24,Math.PI/2,0,0),dt(r,new ee(.095,.095,.03,16),z.chrome,w*.41,.82,1.31,Math.PI/2,0,0),dt(r,new _n(.082,16),z.headlight,w*.41,.82,1.328,0,0,0,!1,!1),rt(r,.1,.2,.12,w*.44,1.15,1.22,z.graphite),dt(r,new _n(.04,12),z.beacon,w*.44,1.19,1.286,0,0,0,!1,!1);for(let y=0;y<3;y++)rt(r,.15,.035,.02,w*.16,.92+y*.06,1.283,z.graphite)}for(const w of[-1,1])rt(r,.12,.16,.04,w*.5,1.02,-1.47,z.taillight);rn(r,new P(.48,.55,-1.32),new P(.48,1.5,-1.32),.035,z.graphite,10),dt(r,new ee(.055,.045,.05,10),z.steelDark,.48,1.52,-1.32),rn(r,new P(-.5,1.4,-1.32),new P(-.5,2,-1.38),.006,z.chrome,5);const i=.59;Ie(r,1.08,.07,1.2,0,i,.16,z.steelDark,.02,.01);for(let w=0;w<4;w++)rt(r,.9,.012,.03,0,i+.045,-.05+w*.14,z.steel);const a=new de;r.add(a),Ie(a,.64,.14,.56,0,.96,-.14,z.seat,.05,.02),Ie(a,.64,.08,.54,0,1.055,-.14,z.seat,.04,.015),Ie(a,.64,.7,.14,0,1.28,-.43,z.seat,.06,.025,-.1),Ie(a,.4,.18,.13,0,1.66,-.47,z.seat,.05,.02,-.1);for(const w of[-1,1])Ie(a,.12,.36,.5,w*.38,1.06,-.13,z.seat,.04,.015),rt(a,.42,.01,.06,w*.1,1.065,.06,z.seatStitch),rt(a,.42,.01,.06,w*.1,1.065,-.32,z.seatStitch);for(let w=0;w<3;w++)rt(a,.36,.008,.018,0,1.16+w*.11,-.498,z.seatStitch);rt(r,.22,.1,.3,.48,1.04,-.1,z.graphite);for(const w of[-1,1])rt(r,.16,.025,.24,w*.16,i+.085,.48,z.graphite,-.25,0,0),rt(r,.14,.012,.2,w*.16,i+.1,.46,z.steelDark,-.25,0,0);const o=new P(0,1.03,.5),l=new P(0,1.26,.27);rn(r,o,l,.055,z.graphite,14),rn(r,new P(-.12,1.05,.47),new P(-.12,1.22,.36),.025,z.chrome,8);const h=new de;h.position.set(0,1.33,.22),h.rotation.x=-.9,r.add(h);const u=dt(h,new Gn(.185,.024,10,30),z.graphite,0,0,0);u.castShadow=!0;for(let w=0;w<3;w++){const y=w/3*Math.PI*2+Math.PI/2;rt(h,.03,.02,.34,Math.cos(y)*.085,Math.sin(y)*.085,0,z.steelDark,0,0,-y+Math.PI/2,!1)}dt(h,new ee(.06,.06,.06,16),z.steelDark,0,0,0,Math.PI/2,0,0),dt(h,new ee(.04,.04,.075,12),z.cream,0,0,.01,Math.PI/2,0,0),dt(h,new Ee(.035,12,10),z.beak,.15,-.1,.015);const d=new de;d.position.set(0,1.2,.72),d.rotation.x=-.34,r.add(d),Ie(d,.76,.34,.12,0,0,0,z.graphite,.04,.02);const f=new re({map:Vg(),roughness:.45,metalness:.15});dt(d,new ve(.5,.25),f,0,.03,-.062,0,Math.PI,0,!1,!1);for(const w of[-1,1]){const y=w>0?z.taillight:z.headlight;dt(d,new _n(.018,10),y,w*.28,.1,-.063,0,Math.PI,0,!1,!1)}for(let w=0;w<3;w++){const y=.26+w*.085;rn(r,new P(y,1,.42),new P(y+.02,1.32+w*.03,.34),.012,z.chrome,6),dt(r,new Ee(.032,10,8),w===0?z.beak:z.graphite,y+.02,1.33+w*.03,.34)}for(const w of[-1,1])for(const y of[-1,1])Ie(r,.1,1.3,.1,w*.63,1.78,y*.66,e,.03,.012);Ie(r,1.5,.13,1.7,0,2.43,-.06,t,.12,.03);for(let w=0;w<4;w++)rt(r,1.2,.016,.07,0,2.365,-.5+w*.28,z.steelDark);for(let w=0;w<5;w++)rt(r,1.28,.018,.05,0,2.5,-.72+w*.33,e);rt(r,1.3,.03,.07,0,2.505,.74,z.chrome,0,0,0,!1),Ri(r,"PELICAN","FL-03 · ACADEMY",.32,.16,0,2.547,-.5,Math.PI),Ie(r,1.36,.04,1.5,0,2.345,-.06,n,.08,.015);const c=new Nt(new ee(.07,.085,.14,14),z.beacon);c.position.set(.48,2.56,-.35),c.castShadow=!0,r.add(c),dt(r,new ee(.09,.1,.035,14),z.graphite,.48,2.49,-.35);const p=new gr(16755502,.5,3,2);p.position.set(.48,2.6,-.35),r.add(p);for(const w of[-1,1])rt(r,.18,.12,.13,w*.4,2.33,.71,z.graphite),dt(r,new _n(.06,12),z.headlight,w*.4,2.33,.78,0,0,0,!1,!1);const v=dt(r,new ve(1.14,1.05),z.glass,0,1.8,.705,0,0,0,!1,!1);v.renderOrder=3;for(const w of[-1,1])rn(r,new P(w*.63,2.02,.64),new P(w*.82,2.06,.55),.012,z.graphite,6),Ie(r,.02,.17,.12,w*.83,2.08,.53,z.steelDark,.01,.005),dt(r,new ve(.1,.15),new re({color:10466484,metalness:.9,roughness:.08}),w*.843,2.08,.53,0,w*Math.PI/2,0,!1,!1);Ri(r,"FASTEN","SEAT BELT",.26,.13,.63,1.5,-.55,Math.PI/2);const m=new de;m.position.set(0,0,0),r.add(m);for(const w of[-1,1]){rt(m,.11,2.82,.18,w*.53,1.53,1.06,z.steelDark),rt(m,.035,2.7,.21,w*.46,1.5,1.06,z.steel),rt(m,.09,2.6,.12,w*.36,1.48,1.12,z.steelDark),rt(m,.02,2.55,.03,w*.585,1.5,1.06,z.steel);for(let y=0;y<5;y++)rt(m,.14,.045,.2,w*.53,.35+y*.58,1.06,z.steel)}for(const w of[.2,1.45,2.8])rt(m,1.16,.11,.15,0,w,1.06,z.steelDark);rt(m,.86,.1,.13,0,2.9,1.06,z.steelDark),dt(m,new ee(.06,.06,.9,12),z.steelDark,0,2.95,1.1,0,0,Math.PI/2);for(const w of[-1,1]){dt(m,new ee(.065,.075,1.55,12),z.graphite,w*.23,.92,1.16),dt(m,new ee(.032,.032,1.3,10),z.chrome,w*.23,2.3,1.16),dt(m,new ee(.05,.05,.09,10),z.steelDark,w*.23,1.7,1.16);for(let y=0;y<14;y++)rt(m,.028,.045,.02,w*.3,2.78-y*.18,1.2,z.steelDark,0,0,0,!1);rn(m,new P(w*.06,.36,1.02),new P(w*.5,1.75,1.02),.02,z.rubber,7)}for(const w of[-1,1])rn(r,new P(w*.42,.72,.92),new P(w*.42,1.1,1.16),.045,z.graphite,10),dt(r,new ee(.025,.025,.9,8),z.chrome,w*.42,1.55,1.17,.25,0,0);const g=new de;g.position.set(0,0,0),r.add(g),Ie(g,1.24,.5,.09,0,.37,1.27,z.steelDark,.03,.012),rt(g,1.3,.06,.12,0,.13,1.27,z.steel);for(let w=-2;w<=2;w++)rt(g,.055,.66,.05,w*.27,.92,1.3,z.steelDark);for(const w of[.66,.92,1.18])rt(g,1.22,.05,.05,0,w,1.3,z.steel);for(const w of[-1,1])for(const y of[.18,.56])dt(g,new ee(.055,.055,.08,12),z.chrome,w*.58,y,1.2,0,0,Math.PI/2);const b=new _s;b.moveTo(0,0),b.lineTo(1.03,0),b.lineTo(1.06,.02),b.lineTo(1.06,.055),b.lineTo(1.03,.078),b.lineTo(.25,.078),b.lineTo(.22,.58),b.lineTo(.06,.58),b.lineTo(.05,.078),b.lineTo(0,.078),b.closePath();const S=new Yi(b,{depth:.16,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2,steps:1});S.rotateY(-Math.PI/2),S.translate(.08,.022,1.3);for(const w of[-1,1]){const y=new Nt(S,z.steelDark);y.position.x=w*.32,y.castShadow=!0,y.receiveShadow=!0,g.add(y);for(let E=0;E<2;E++)dt(g,new ee(.025,.025,.02,8),z.chrome,w*.32,.46+E*.09,1.385,Math.PI/2,0,0);rt(g,.165,.014,.3,w*.32,.105,1.5,z.chrome,0,0,0,!1)}rt(g,.86,.08,.1,0,.11,1.34,z.steelDark),Ri(m,"PELICAN","MAX 1800 kg",.34,.17,0,2.55,1.17,0);const x=[];for(const w of[-1,1]){const y=ic(.34,.28);y.steer.position.set(w*.79,.34,.68),r.add(y.steer),x.push({...y,front:!0});const E=ic(.27,.22);E.steer.position.set(w*.55,.27,-.8),r.add(E.steer),x.push({...E,front:!1}),rn(r,new P(w*.46,.3,-.8),new P(w*.66,.3,-.8),.055,z.castIron,10)}dt(r,new ee(.075,.075,1.5,12),z.castIron,0,.34,.68,0,0,Math.PI/2),dt(r,new ee(.06,.06,1.1,12),z.castIron,0,.28,-.8,0,0,Math.PI/2);const T=Jg();r.add(T.root);const _=new Nt(new ve(2.3,3.2),new Xe({map:qg(),transparent:!0,depthWrite:!1,opacity:.55}));_.rotation.x=-Math.PI/2,_.position.set(0,.008,.2),_.renderOrder=1,r.add(_),Wi(g);const M=new Set([g,T.root,c,_,...x.map(w=>w.steer)]);return Wi(r,M),{root:r,lift:g,wheels:x,pelican:T,beacon:c,shadow:_}}function Qg(r){const t=new de;t.name=`crate-${r}`;const e=Wg(r),n=Xg(),s=[e,e,n,n,e,e],i=te.h-te.bodyBottom,a=new Nt(new an(te.w,i,te.d),s);a.position.y=te.halfH-i/2,a.castShadow=!0,a.receiveShadow=!0,t.add(a);const o=.055;for(const l of[-1,1])for(const h of[-1,1])rt(t,o,i+.02,o,l*(te.w/2-o/2),a.position.y,h*(te.d/2-o/2),z.crateFrame);for(const l of[-.36,.46]){for(const h of[-1,1])rt(t,o,.055,te.d,h*(te.w/2-o/2),l,0,z.crateFrame);for(const h of[-1,1])rt(t,te.w,.055,o,0,l,h*(te.d/2-o/2),z.crateFrame)}for(const l of[-1,1])for(const h of[-1,1])for(const u of[-1,1])rt(t,.085,.11,.02,l*(te.w/2-.03),h*.47,u*(te.d/2+.005),z.crateMetal),rt(t,.02,.11,.085,l*(te.w/2+.005),h*.47,u*(te.d/2-.03),z.crateMetal);for(const l of[-1,1])rt(t,.02,.16,.26,l*(te.w/2+.012),.02,.1,z.graphite,0,0,0,!1),rt(t,.018,.045,.2,l*(te.w/2+.027),.1,.1,z.steelDark,0,0,0,!1);for(const l of[0,-.45,.45])rt(t,.12,.12,te.d,l,-.44,0,z.woodDark);rt(t,te.w-.04,.05,te.d-.06,0,-.34,0,z.woodDark);for(const l of[-1,1])rt(t,te.w,.035,.06,0,.49,l*.44,z.crateFrame);for(const l of[-1,1])rt(t,.06,.035,te.d,l*.5,.49,0,z.crateFrame);return Wi(t),t}function kn(r,t,e,n,s,i,a=.012){const o=new Nt(new ve(t,e),i);return o.rotation.x=-Math.PI/2,o.position.set(n,a,s),o.receiveShadow=!0,o.renderOrder=1,r.add(o),o}function xo(r,t=1){return new re({color:r,roughness:.92,metalness:.02,transparent:t<1,opacity:t,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function tv(r){const t=Le[r],e=document.createElement("canvas");e.width=512,e.height=512;const n=e.getContext("2d");n.clearRect(0,0,512,512),n.fillStyle=t.hex,n.globalAlpha=.55,n.fillRect(0,0,512,512),n.globalAlpha=1,n.strokeStyle="#f4eddc",n.lineWidth=12,n.strokeRect(18,18,476,476),n.lineWidth=4,n.strokeRect(44,44,424,424),n.setLineDash([22,14]),n.strokeStyle="rgba(255,255,255,0.55)",n.strokeRect(76,76,360,360),n.setLineDash([]),n.fillStyle="#fffdf6",n.textAlign="center",n.font='800 116px "Helvetica Neue", Arial, sans-serif',n.fillText(t.label,256,236),n.font='800 66px "PingFang SC", "Microsoft YaHei", sans-serif',n.fillText(t.zh+"交付区",256,320),n.font='700 30px "Helvetica Neue", Arial, sans-serif',n.fillStyle="rgba(255,255,255,0.82)",n.fillText("DROP ZONE",256,372),n.strokeStyle="#fffdf6",n.lineWidth=14;for(const[i,a,o,l]of[[30,30,1,1],[482,30,-1,1],[30,482,1,-1],[482,482,-1,-1]])n.beginPath(),n.moveTo(i+o*62,a),n.lineTo(i,a),n.lineTo(i,a+l*62),n.stroke();const s=new _r(e);return s.colorSpace=De,s.anisotropy=8,s}function sc(r,t,e="#e6c05a"){const n=document.createElement("canvas");n.width=1024,n.height=512;const s=n.getContext("2d");s.clearRect(0,0,1024,512),s.fillStyle=e,s.textAlign="center",s.font='800 180px "PingFang SC", "Microsoft YaHei", sans-serif',s.globalAlpha=.85,s.fillText(r,512,260),s.font='700 58px "Helvetica Neue", Arial, sans-serif',s.fillText(t,512,356),s.globalAlpha=1;const i=new _r(n);return i.colorSpace=De,i.anisotropy=8,i}function rc(r,t,e,n,s,i,a,o=[1,2.35,3.7,4.9]){const l=new de;l.position.set(e,0,n),l.rotation.y=a,r.add(l);const h=1.25,u=5.35,d=s*i;for(let f=0;f<=s;f++){const c=-d/2+f*i;for(const p of[-h/2,h/2])rt(l,.11,u,.11,c,u/2,p,z.rackBlue),rt(l,.05,.24,.3,c,.12,p,z.steelDark);for(let p=0;p<6;p++){const v=.45+p*.85,m=-h/2,b=h/2-m,S=Math.sqrt(b*b+.55*.55),x=rt(l,.055,.055,S,c,v,0,z.rackBlue,Math.atan2(.55,b),0,0);x.castShadow=!1,rt(l,.06,.05,h*.92,c,v+.28,0,z.rackBlue)}}for(const f of o){for(const c of[-h/2+.02,h/2-.02])rt(l,d,.15,.08,0,f,c,z.rackOrange),rt(l,d,.03,.1,0,f+.1,c,z.rackOrange);for(let c=0;c<s;c++){const p=-d/2+i/2+c*i;if(rt(l,i-.22,.055,h-.16,p,f-.09,0,z.deck),(c+Math.round(f*3))%3!==1){rt(l,.86,.1,.86,p,f+.12,0,z.woodDark);for(const m of[-.32,0,.32])rt(l,.82,.05,.1,p,f+.2,m,z.wood);const v=1+(c+Math.round(f))%3;for(let m=0;m<v;m++)rt(l,.72,.42,.72,p,f+.43+m*.44,0,m%2?z.deck:z.rackBlue),rt(l,.74,.02,.74,p,f+.64+m*.44,0,z.steelDark)}}}return t.push({cx:e+Math.sin(a)*0,cy:u/2,cz:n,hx:a===0?d/2+.1:h/2+.1,hy:u/2,hz:a===0?h/2+.1:d/2+.1,occlude:!0}),l}function _o(r,t,e,n=5,s=!1){const i=new de;i.position.set(t,0,e),r.add(i);for(let a=0;a<n;a++){const o=.1+a*.18;rt(i,1.1,.05,1,0,o,0,z.wood);for(const l of[-.38,0,.38])rt(i,1.06,.09,.1,0,o-.06,l,z.woodDark);for(const l of[-.46,0,.46])rt(i,.1,.09,.95,l,o-.06,0,z.woodDark)}if(s){const a=new Nt(new an(1.15,1.15,1.05),new Hc({color:13621716,transparent:!0,opacity:.42,roughness:.25,metalness:.05,clearcoat:.6,side:Ue}));a.position.y=.68,a.castShadow=!0,a.receiveShadow=!0,i.add(a),rt(i,.9,.9,.9,0,.68,0,z.deck)}return i}function ev(r,t,e,n){const s=new de;s.position.set(t,0,e),r.add(s);const i=new Nt(new ee(.29,.29,.9,20),new re({color:n,metalness:.55,roughness:.42}));i.position.y=.45,i.castShadow=!0,i.receiveShadow=!0,s.add(i);for(const a of[.18,.45,.72]){const o=new Nt(new Gn(.295,.018,6,24),z.steelDark);o.rotation.x=Math.PI/2,o.position.y=a,s.add(o)}return dt(s,new ee(.3,.3,.03,20),z.steelDark,0,.9,0),s}function yo(r,t,e){const n=new de;n.position.set(t,0,e),r.add(n),rt(n,.42,.04,.42,0,.02,0,new re({color:3093558,roughness:.8}));const s=new yr(.15,.55,14,1,!0),i=new Nt(s,new re({color:14050095,roughness:.7,side:Ue}));i.position.y=.3,i.castShadow=!0,n.add(i);const a=new Nt(new ee(.105,.12,.1,14,1,!0),new re({color:15854556,roughness:.6,side:Ue}));return a.position.y=.33,n.add(a),n}function nv(r){const t=[],e={},n=[],s=new de;r.add(s);const i=new re({map:Ug(),bumpMap:Ng(),bumpScale:.025,color:15921126,roughness:.86,metalness:.03}),a=dt(s,new ve(Pt.maxX-Pt.minX,Pt.maxZ-Pt.minZ),i,0,0,0,-Math.PI/2,0,0,!1,!0);a.name="warehouse-floor";const o=new re({map:Fg(),color:14673118,roughness:.72,metalness:.18}),l=Pt.wallH,h=[[0,l/2,Pt.minZ-.25,30.5,l,.5],[0,l/2,Pt.maxZ+.25,30.5,l,.5],[Pt.minX-.25,l/2,0,.5,l,24.5],[Pt.maxX+.25,l/2,0,.5,l,24.5]];for(const[N,X,tt,K,pt,It]of h){const bt=dt(s,new an(K,pt,It),o,N,X,tt,0,0,0,!1,!0);bt.material=o}for(const N of[-1,1])rt(s,30,1.15,.06,0,.58,N<0?Pt.minZ+.03:Pt.maxZ-.03,z.steelDark,0,0,0,!1),rt(s,30,.09,.07,0,1.2,N<0?Pt.minZ+.04:Pt.maxZ-.04,z.safetyYellow,0,0,0,!1),rt(s,.06,1.15,24,N<0?Pt.minX+.03:Pt.maxX-.03,.58,0,z.steelDark,0,0,0,!1),rt(s,.07,.09,24,N<0?Pt.minX+.04:Pt.maxX-.04,1.2,0,z.safetyYellow,0,0,0,!1);for(const N of[-10.5,-3.5,3.5,10.5])for(const X of[Pt.minZ+.28,Pt.maxZ-.28])rt(s,.42,l,.42,N,l/2,X,z.steelDark,0,0,0,!1),rt(s,.52,.16,.52,N,.08,X,z.steelDark,0,0,0,!1);for(const N of[-7.5,0,7.5])for(const X of[Pt.minX+.28,Pt.maxX-.28])rt(s,.42,l,.42,X,l/2,N,z.steelDark,0,0,0,!1);for(let N=0;N<4;N++){const X=-7.5+N*5;rt(s,.12,1.5,3,Pt.minX+.08,5.9,X,z.graphite,0,0,0,!1);const tt=dt(s,new ve(2.7,1.25),new Xe({color:12575462}),Pt.minX+.15,5.9,X,0,Math.PI/2,0,!1,!1);tt.renderOrder=0;for(let K=-1;K<=1;K++)rt(s,.16,1.4,.06,Pt.minX+.18,5.9,X+K*.9,z.graphite,0,0,0,!1);rt(s,.18,.07,2.9,Pt.minX+.18,5.9,X,z.graphite,0,0,0,!1)}const u=new de;u.position.set(-4.5,0,Pt.maxZ-.06),s.add(u),rt(u,5.4,.35,.35,0,5,-.05,z.steelDark,0,0,0,!1),rt(u,.35,5,.35,-2.7,2.5,-.05,z.steelDark,0,0,0,!1),rt(u,.35,5,.35,2.7,2.5,-.05,z.steelDark,0,0,0,!1);for(let N=0;N<12;N++)rt(u,5.2,.34,.08,0,.28+N*.37,-.08,N%3===0?z.steel:z.graphite,0,0,0,!1);rt(u,4.6,.35,.1,0,4.7,-.1,z.safetyYellow,0,0,0,!1);const d=new re({map:nc({title:"EXIT",zh:"安全出口",sub:"KEEP CLEAR",bg:"#1c5d38",fg:"#f4f0dd",accent:"#9fe6b2"},512,256),roughness:.5});dt(u,new ve(1.3,.65),d,0,5.1,.16,0,0,0,!1,!1);const f=new re({map:kg(),roughness:.6,metalness:.1,emissive:1714726,emissiveIntensity:.2});rt(s,6.8,1.85,.12,5.3,5.55,Pt.maxZ-.15,z.graphite,0,0,0,!1),dt(s,new ve(6.55,1.62),f,5.3,5.55,Pt.maxZ-.205,0,Math.PI,0,!1,!1);const c=[mo(0),mo(1),mo(2)];[[-14.93,3.4,8.4,Math.PI/2],[-14.93,3.4,-2.4,Math.PI/2],[14.93,4.3,-8.8,-Math.PI/2]].forEach(([N,X,tt,K],pt)=>{rt(s,.06,1.66,1.18,N-Math.sin(K)*.03,X,tt,z.graphite,0,0,0,!1);const It=new re({map:c[pt],roughness:.65});dt(s,new ve(1.08,1.52),It,N+Math.sin(K)*.02,X,tt,0,K,0,!1,!1)}),rt(s,.6,.9,.32,14.4,1.45,9.7,new re({color:12269100,metalness:.3,roughness:.5}),0,-Math.PI/2,0,!1),dt(s,new ve(.48,.3),new Xe({color:15327949}),14.22,1.62,9.7,0,-Math.PI/2,0,!1,!1);const v=new de;v.position.set(5,4.35,Pt.minZ+.16),s.add(v),dt(v,new ee(.42,.42,.08,28),z.graphite,0,0,0,Math.PI/2,0,0,!1),dt(v,new _n(.37,28),new re({color:15525074,roughness:.6}),0,0,.05,0,0,0,!1,!1);for(let N=0;N<12;N++){const X=N/12*Math.PI*2;rt(v,.02,N%3===0?.11:.06,.015,Math.sin(X)*.29,Math.cos(X)*.29,.06,z.graphite,0,0,-X,!1)}rt(v,.018,.19,.02,.05,.09,.07,z.graphite,0,0,-.6,!1),rt(v,.014,.26,.02,.03,.11,.07,z.graphite,0,0,.5,!1),rc(s,t,-6.1,-11.2,4,3.7,0),rc(s,t,-14.1,-5.6,2,3.4,Math.PI/2);const m=new re({map:nc({title:"A-01",zh:"原料区",sub:"STORAGE · KEEP CLEAR",bg:"#24333a",fg:"#e7dcc3",accent:"#7fb1c0"},512,320),roughness:.6});dt(s,new ve(1.5,.94),m,-2.2,5.15,-10.53,0,0,0,!1,!1),dt(s,new ve(1.5,.94),m,-13.45,5.15,-9.4,0,Math.PI/2,0,!1,!1);const g={};for(const N of ai){const X=Le[N.color],tt=new de;tt.position.set(N.x,0,N.z),s.add(tt),e[N.color]=tt;const K=new re({map:tv(N.color),transparent:!0,roughness:.86,metalness:.02,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});kn(tt,N.w,N.d,0,0,K,.018);const pt=new re({color:X.hex,roughness:.65,metalness:.1});for(const Wt of[-1,1])rt(tt,N.w+.16,.025,.09,0,.012,Wt*(N.d/2+.06),pt,0,0,0,!1),rt(tt,.09,.025,N.d+.16,Wt*(N.w/2+.06),.012,0,pt,0,0,0,!1);for(const Wt of[-1,1])for(const Q of[-1,1]){const lt=new Nt(new ve(.55,.55),z.hazard);lt.rotation.x=-Math.PI/2,lt.position.set(Wt*(N.w/2+.36),.01,Q*(N.d/2+.36)),tt.add(lt)}const It=new re({map:Yg(N.color),roughness:.45,metalness:.1,emissive:new jt(X.hex),emissiveIntensity:.12});rt(s,.1,1.5,2.2,Pt.maxX-.06,3.1,N.z,z.graphite,0,0,0,!1),dt(s,new ve(2.1,1.4),It,Pt.maxX-.12,3.1,N.z,0,-Math.PI/2,0,!1,!1),rt(s,.1,.1,2,Pt.maxX-.15,3.86,N.z,new Xe({color:X.hex}),0,0,0,!1);const bt=new Nt(new Sr(N.w/2-.16,N.w/2-.06,40),new Xe({color:X.hex,transparent:!0,opacity:.5,side:Ue,depthWrite:!1}));bt.rotation.x=-Math.PI/2,bt.position.y=.03,tt.add(bt),g[N.color]=pt}const b=xo(14462514,.85),S=xo(14472900,.7);for(const N of[7.05,7.55])kn(s,.09,18.5,N,-1.4,b,.014);for(let N=0;N<17;N++)kn(s,.32,.09,7.3,-10+N*1.08,S,.014);for(let N=0;N<3;N++){const X=-11.8+N*2.4;kn(s,2.1,.07,X,.16,b,.014),kn(s,2.1,.07,X,-2.55,b,.014),kn(s,.07,2.78,X-1.05,-1.2,b,.014),kn(s,.07,2.78,X+1.05,-1.2,b,.014)}for(const N of ai)for(let X=0;X<4;X++){const tt=xo(13612368,.55),K=kn(s,.28,1.2,N.x-2.35+X*.38,N.z,tt,.013);K.rotation.z=.5}const x=sc("叉车通道","FORKLIFT LANE","#dcb84e"),T=new Xe({map:x,transparent:!0,depthWrite:!1,opacity:.8}),_=new Nt(new ve(3.6,1.8),T);_.rotation.x=-Math.PI/2,_.rotation.z=Math.PI/2,_.position.set(-4.2,.016,4.9),s.add(_);const M=sc("禁停","KEEP CLEAR","#d9c37a"),w=new Xe({map:M,transparent:!0,depthWrite:!1,opacity:.65}),y=new Nt(new ve(2.2,1.1),w);y.rotation.x=-Math.PI/2,y.position.set(13,.016,-2.2),s.add(y);const E=document.createElement("canvas");E.width=512,E.height=512;const A=E.getContext("2d");A.strokeStyle="rgba(225,190,85,0.9)",A.lineWidth=16,A.lineCap="round",A.strokeRect(150,270,150,110),A.beginPath(),A.arc(190,405,30,0,7),A.stroke(),A.beginPath(),A.arc(275,405,30,0,7),A.stroke(),A.beginPath(),A.moveTo(300,285),A.lineTo(300,130),A.lineTo(360,130),A.stroke(),A.beginPath(),A.moveTo(300,150),A.lineTo(390,150),A.stroke(),A.beginPath(),A.moveTo(340,155),A.lineTo(340,230),A.lineTo(300,230),A.stroke(),A.font='700 38px "Helvetica Neue", Arial, sans-serif',A.fillStyle="rgba(225,190,85,0.85)",A.textAlign="center",A.fillText("FL-03",256,480);const U=new _r(E);U.colorSpace=De;const L=new Nt(new ve(2.4,2.4),new Xe({map:U,transparent:!0,depthWrite:!1,opacity:.8}));L.rotation.x=-Math.PI/2,L.position.set(-9.4,.016,6.3),s.add(L),_o(s,13.4,9.9,5,!0),_o(s,12.3,10.9,3,!1),t.push({cx:13.2,cy:.8,cz:10.2,hx:1.15,hy:1.1,hz:1.15,occlude:!0});const F=[[-13.4,10.3,3107684],[-12.75,10.8,11556143],[-13.95,10.95,3889522]];for(const[N,X,tt]of F)ev(s,N,X,tt);t.push({cx:-13.35,cy:.5,cz:10.7,hx:1.05,hy:.5,hz:.7}),t.push({cx:14.4,cy:.9,cz:9.7,hx:.3,hy:.9,hz:.35}),yo(s,-3.3,-9.6),yo(s,-2.6,-9),yo(s,7.9,-8.4),_o(s,2,-9.7,2,!1),t.push({cx:2,cy:.4,cz:-9.7,hx:.6,hy:.4,hz:.55});const V=new re({color:2765621,roughness:.9,metalness:.15});dt(s,new ve(30.4,24.4),V,0,7.55,0,Math.PI/2,0,0,!1,!1);for(let N=-10;N<=10;N+=4){rt(s,30,.26,.2,0,7.2,N,z.steelDark,0,0,0,!1);for(let X=-12;X<=12;X+=6)rt(s,.12,.12,2.6,X,7.05,N,z.steelDark,.55,0,0,!1)}for(const N of[-9,-3,3,9])for(const X of[-6,3])O(s,N,6.8,X);function O(N,X,tt,K){const pt=new de;pt.position.set(X,tt,K),N.add(pt),Z(pt,1,z.steelDark),rt(pt,.34,.12,2.6,0,-1.02,0,z.graphite,0,0,0,!1),dt(pt,new ve(.26,2.4),new Xe({color:16773839}),0,-1.085,0,Math.PI/2,0,0,!1,!1)}function Z(N,X,tt){const K=new Nt(new ee(.018,.018,X,6),tt);K.position.y=X/2,N.add(K)}const G=new gr(16768942,58,18,2);G.position.set(-6.5,5.6,-2.5),r.add(G);const it=new gr(16766880,48,16,2);it.position.set(7.5,5.4,4),r.add(it);const ot=new yf(14216167,3485738,.78);r.add(ot);const et=new eo(16773853,3.35);et.position.set(-9,13.5,8.5),et.target.position.set(1,0,-1),et.castShadow=!0,et.shadow.mapSize.set(2048,2048),et.shadow.camera.left=-19,et.shadow.camera.right=19,et.shadow.camera.top=17,et.shadow.camera.bottom=-17,et.shadow.camera.near=1,et.shadow.camera.far=42,et.shadow.bias=-4e-4,et.shadow.normalBias=.035,et.shadow.radius=2,r.add(et),r.add(et.target);const St=new eo(11129050,1.05);St.position.set(14,7,-12),r.add(St);const Dt=new eo(16766368,.62);return Dt.position.set(2,5,12),r.add(Dt),r.background=new jt(857109),r.fog=new _a(1055258,.0055),iv(s),{colliders:t,zones:ai,zoneGroups:e,lightTargets:n}}function iv(r){r.updateMatrixWorld(!0);const t=new Map,e=[];r.traverse(n=>{const s=n;if(!s.isMesh||Array.isArray(s.material)||s.isInstancedMesh)return;const i=s.material;if(!i)return;const a=`${i.uuid}|${s.castShadow}|${s.receiveShadow}|${s.renderOrder}`;let o=t.get(a);o||(o={mat:i,cast:s.castShadow,receive:s.receiveShadow,order:s.renderOrder,geos:[]},t.set(a,o));const l=s.geometry.clone();for(const u of Object.keys(l.attributes))["position","normal","uv"].includes(u)||l.deleteAttribute(u);if(!l.attributes.uv){const u=l.attributes.position.count;l.setAttribute("uv",new Ye(new Float32Array(u*2),2))}l.attributes.normal||l.computeVertexNormals();const h=l.index?l.toNonIndexed():l;h.applyMatrix4(s.matrixWorld),o.geos.push(h),e.push(s)});for(const n of e)n.removeFromParent(),n.geometry.dispose();for(const n of t.values()){if(!n.geos.length)continue;const s=Jc(n.geos,!1);if(!s)continue;const i=new Nt(s,n.mat);i.castShadow=n.cast,i.receiveShadow=n.receive,i.renderOrder=n.order,r.add(i);for(const a of n.geos)a.dispose()}}const Vt=r=>document.getElementById(r),nr=r=>{const t=Math.max(0,r),e=Math.floor(t/60),n=t-e*60;return`${String(e).padStart(2,"0")}:${n.toFixed(1).padStart(4,"0")}`};class sv{constructor(){Ft(this,"renderer");Ft(this,"scene",new Lc);Ft(this,"camera",new Ke(48,1,.08,90));Ft(this,"pmrem");Ft(this,"world");Ft(this,"truck");Ft(this,"crates",[]);Ft(this,"A");Ft(this,"physics");Ft(this,"truckBody");Ft(this,"mode","ready");Ft(this,"inspect",null);Ft(this,"camMode","follow");Ft(this,"timeLeft",uo);Ft(this,"elapsed",0);Ft(this,"score",0);Ft(this,"clock",new Ef);Ft(this,"pos",{x:Ce.x,z:Ce.z,yaw:Ce.yaw});Ft(this,"speed",0);Ft(this,"steer",0);Ft(this,"lift",0);Ft(this,"carrying",null);Ft(this,"carrySide",0);Ft(this,"carryForward",1.7);Ft(this,"carryYawOffset",0);Ft(this,"keys",new Set);Ft(this,"staticColliders",[]);Ft(this,"vehicleColliders",[]);Ft(this,"camPos",new P);Ft(this,"camTarget",new P);Ft(this,"camInit",!1);Ft(this,"zoom",7.6);Ft(this,"toastTimer",0);Ft(this,"readyT",0);Ft(this,"lastHud",0);this.setupRenderer(),this.setupScene(),this.setupUI()}setupRenderer(){const t=Vt("app");this.renderer=new lg({antialias:!0,powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ac,this.renderer.toneMapping=cc,this.renderer.toneMappingExposure=1.13,this.renderer.outputColorSpace=De,this.renderer.domElement.id="scene-canvas",t.prepend(this.renderer.domElement),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),window.addEventListener("resize",()=>this.onResize())}setupScene(){this.pmrem=new la(this.renderer);const t=this.pmrem.fromScene(new Rg,.06).texture;this.scene.environment=t,this.scene.environmentIntensity=.5,this.world=nv(this.scene),this.staticColliders=[...this.world.colliders,{cx:(Pt.minX+Pt.maxX)/2,cy:4,cz:Pt.minZ-.6,hx:16,hy:4,hz:.7,occlude:!0},{cx:(Pt.minX+Pt.maxX)/2,cy:4,cz:Pt.maxZ+.6,hx:16,hy:4,hz:.7,occlude:!0},{cx:Pt.minX-.6,cy:4,cz:(Pt.minZ+Pt.maxZ)/2,hx:.7,hy:4,hz:13,occlude:!0},{cx:Pt.maxX+.6,cy:4,cz:(Pt.minZ+Pt.maxZ)/2,hx:.7,hy:4,hz:13,occlude:!0}],this.vehicleColliders=this.staticColliders,this.truck=jg(),this.scene.add(this.truck.root),this.placeTruck(Ce.x,Ce.z,Ce.yaw);for(const e of ec){const n=Qg(e.color);n.position.set(e.x,te.halfH,e.z),this.scene.add(n);const s=new Xe({color:new jt(Le[e.color].hex),transparent:!0,opacity:.75,side:Ue,depthWrite:!1}),i=new Nt(new Sr(.78,.9,40),s);i.rotation.x=-Math.PI/2,i.position.set(e.x,.045,e.z),i.visible=!1,i.renderOrder=2,this.scene.add(i),this.crates.push({color:e.color,group:n,body:null,inWorld:!1,carried:!1,delivered:!1,stable:0,warnAt:0,ring:i,mat:s})}}initPhysics(){const t=window.Ammo;this.A=t;const e=new t.btDefaultCollisionConfiguration,n=new t.btCollisionDispatcher(e),s=new t.btDbvtBroadphase,i=new t.btSequentialImpulseConstraintSolver,a=new t.btDiscreteDynamicsWorld(n,s,i,e);a.setGravity(new t.btVector3(0,-9.82,0)),this.physics=a,this.addStatic(0,-.5,0,18,.5,15),this.addStatic(0,4,Pt.minZ-.55,17,4.5,.6),this.addStatic(0,4,Pt.maxZ+.55,17,4.5,.6),this.addStatic(Pt.minX-.55,4,0,.6,4.5,14),this.addStatic(Pt.maxX+.55,4,0,.6,4.5,14);for(const c of this.world.colliders)this.addStatic(c.cx,c.cy,c.cz,c.hx,c.hy,c.hz);for(const c of this.crates)this.createCrateBody(c);const o=new t.btBoxShape(new t.btVector3(.84,.82,.98));o.setMargin(.02);const l=new t.btTransform;l.setIdentity(),l.setOrigin(new t.btVector3(Ce.x,.82,Ce.z));const h=new t.btDefaultMotionState(l),u=new t.btVector3(0,0,0),d=new t.btRigidBodyConstructionInfo(0,h,o,u),f=new t.btRigidBody(d);f.setCollisionFlags(2),f.setFriction(.8),f.setActivationState(4),this.physics.addRigidBody(f),this.truckBody=f,this.syncTruckBody()}addStatic(t,e,n,s,i,a){const o=this.A,l=new o.btBoxShape(new o.btVector3(s,i,a)),h=new o.btTransform;h.setIdentity(),h.setOrigin(new o.btVector3(t,e,n));const u=new o.btDefaultMotionState(h),d=new o.btVector3(0,0,0),f=new o.btRigidBodyConstructionInfo(0,u,l,d),c=new o.btRigidBody(f);return c.setFriction(.85),this.physics.addRigidBody(c),c}createCrateBody(t){const e=this.A,n=new e.btBoxShape(new e.btVector3(te.w/2,te.halfH,te.d/2));n.setMargin(.012);const s=new e.btTransform;s.setIdentity(),s.setOrigin(new e.btVector3(t.group.position.x,t.group.position.y,t.group.position.z));const i=new e.btDefaultMotionState(s),a=new e.btVector3(0,0,0);n.calculateLocalInertia(42,a);const o=new e.btRigidBodyConstructionInfo(42,i,n,a),l=new e.btRigidBody(o);l.setFriction(.72),l.setRestitution(.02),l.setDamping(.3,.85),l.setAngularFactor(new e.btVector3(0,0,0)),l.setSleepingThresholds(.12,.12),t.body=l,this.physics.addRigidBody(l),t.inWorld=!0}syncTruckBody(){if(!this.truckBody||!this.A)return;const t=this.A,e=new t.btTransform;e.setIdentity(),e.setOrigin(new t.btVector3(this.pos.x,.82,this.pos.z)),e.setRotation(new t.btQuaternion(0,Math.sin(this.pos.yaw/2),0,Math.cos(this.pos.yaw/2))),this.truckBody.setWorldTransform(e),this.truckBody.getMotionState().setWorldTransform(e)}setupUI(){Vt("app").insertAdjacentHTML("beforeend",`
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
    `);const t=Vt("chips");for(const e of ai){const n=document.createElement("span");n.className="chip",n.dataset.color=e.color,n.style.setProperty("--chip",Le[e.color].hex),n.innerHTML=`<i></i>${Le[e.color].zh}`,t.appendChild(n)}Vt("start-btn").addEventListener("click",()=>this.startGame()),Vt("pause-btn").addEventListener("click",()=>this.togglePause()),Vt("resume-btn").addEventListener("click",()=>this.togglePause()),Vt("restart-pause-btn").addEventListener("click",()=>this.restart()),Vt("restart-end-btn").addEventListener("click",()=>this.restart()),Vt("exit-inspect").addEventListener("click",()=>this.setInspect(null));for(const e of Array.from(document.querySelectorAll(".view-btn")))e.addEventListener("click",()=>this.setInspect(e.dataset.view));window.addEventListener("keydown",e=>this.onKeyDown(e)),window.addEventListener("keyup",e=>this.onKeyUp(e)),window.addEventListener("blur",()=>this.keys.clear()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.mode==="playing"&&this.togglePause()}),window.addEventListener("wheel",e=>{this.mode==="playing"&&(this.zoom=nn.clamp(this.zoom+Math.sign(e.deltaY)*.5,5.2,11))},{passive:!0}),Vt("loading").classList.add("hidden")}onKeyDown(t){const e=t.key.toLowerCase();if([" ","arrowup","arrowdown","arrowleft","arrowright"].includes(e)&&t.preventDefault(),t.repeat){["w","s","a","d","q","e"].includes(e)&&this.keys.add(e);return}if(e==="enter"&&this.mode==="ready"){this.startGame();return}if(e==="p"){(this.mode==="playing"||this.mode==="paused")&&this.togglePause();return}if(e==="c"){this.cycleCamera();return}if(e==="r"&&(this.mode==="paused"||this.mode==="won"||this.mode==="lost")){this.restart();return}if(this.mode==="playing"){if(e===" "){t.preventDefault(),this.keys.add(" ");return}["w","s","a","d","q","e"].includes(e)&&this.keys.add(e)}}onKeyUp(t){const e=t.key.toLowerCase();this.keys.delete(e),e===" "&&this.keys.delete(" ")}startGame(){this.hideOverlays(),this.restartState(),this.mode="playing",Vt("hud").classList.remove("hidden"),this.showToast("训练开始 · 120 秒","good"),this.updateHud(!0)}restart(){this.physics&&(this.hideOverlays(),this.restartState(),this.mode="playing",Vt("hud").classList.remove("hidden"),this.showToast("已重置车辆、货箱、计时与分数","good"),this.updateHud(!0))}restartState(){this.pos={x:Ce.x,z:Ce.z,yaw:Ce.yaw},this.speed=0,this.steer=0,this.lift=0,this.carrying=null,this.timeLeft=uo,this.elapsed=0,this.score=0,this.inspect=null,this.camMode="follow",this.camInit=!1,this.zoom=7.6,this.truck.lift.position.y=0,this.placeTruck(Ce.x,Ce.z,Ce.yaw),this.syncTruckBody();for(let t=0;t<this.crates.length;t++){const e=this.crates[t],n=ec[t];e.delivered=!1,e.carried=!1,e.stable=0,e.warnAt=0,e.ring.visible=!1,e.group.visible=!0,e.group.position.set(n.x,te.halfH,n.z),e.group.rotation.set(0,0,0),e.inWorld||(this.physics.addRigidBody(e.body),e.inWorld=!0),this.resetBody(e,n.x,te.halfH,n.z,0)}for(const t of Array.from(document.querySelectorAll(".view-btn")))t.classList.remove("active");Vt("inspect-caption").textContent="",this.keys.clear(),this.updateHud(!0)}resetBody(t,e,n,s,i){const a=this.A,o=new a.btTransform;o.setIdentity(),o.setOrigin(new a.btVector3(e,n,s)),o.setRotation(new a.btQuaternion(0,Math.sin(i/2),0,Math.cos(i/2))),t.body.setWorldTransform(o),t.body.getMotionState().setWorldTransform(o),t.body.setLinearVelocity(new a.btVector3(0,0,0)),t.body.setAngularVelocity(new a.btVector3(0,0,0)),t.body.activate()}hideOverlays(){Vt("start-overlay").classList.add("hidden"),Vt("pause-overlay").classList.add("hidden"),Vt("end-overlay").classList.add("hidden"),Vt("inspect-caption").textContent=""}togglePause(){this.mode==="playing"?(this.mode="paused",this.keys.clear(),this.inspect=null,Vt("hud").classList.add("hidden"),Vt("pause-overlay").classList.remove("hidden"),Vt("pause-timer").textContent=nr(this.timeLeft),Vt("inspect-caption").textContent="物理与计时已冻结 · 选择前 / 侧 / 后 / 斜上方检查模型",this.setInspect(null)):this.mode==="paused"&&(this.mode="playing",this.inspect=null,Vt("pause-overlay").classList.add("hidden"),Vt("hud").classList.remove("hidden"))}setInspect(t){if(this.mode!=="paused")return;this.inspect=t;for(const n of Array.from(document.querySelectorAll(".view-btn")))n.classList.toggle("active",n.dataset.view===t);const e={front:"前视检查",side:"侧视检查",rear:"后视检查",iso:"斜上方检查"};Vt("inspect-caption").textContent=t?`模型检查 · ${e[t]} · 暂停中`:"模型检查已退出 · 保持暂停",Vt("exit-inspect").classList.toggle("active",!t)}cycleCamera(){this.camMode=this.camMode==="follow"?"cockpit":"follow";const t=this.camMode==="follow"?"跟随视角":"驾驶视角";Vt("cam-label").textContent=t,this.showToast(t,"info")}placeTruck(t,e,n){this.pos.x=t,this.pos.z=e,this.pos.yaw=n,this.truck.root.position.set(t,0,e),this.truck.root.rotation.y=n}start(){this.camera.position.set(Ce.x+2,5,Ce.z+8.5),this.camPos.copy(this.camera.position),this.camTarget.set(Ce.x,1.2,Ce.z),this.renderer.setAnimationLoop(()=>this.tick())}tick(){const t=Math.min(this.clock.getDelta(),.05);this.readyT+=t,this.mode==="playing"&&(this.timeLeft=Math.max(0,this.timeLeft-t),this.elapsed+=t,this.fixedStep(t),this.timeLeft<=0&&this.mode==="playing"&&this.endGame(!1)),this.animateVisuals(t),this.updateCamera(t),this.renderer.render(this.scene,this.camera),this.lastHud+=t,this.lastHud>.08&&this.mode!=="paused"&&(this.updateHud(!1),this.lastHud=0),this.toastTimer>0&&(this.toastTimer-=t,this.toastTimer<=0&&Vt("toast").classList.remove("show"))}fixedStep(t){const e=Math.min(3,Math.max(1,Math.ceil(t/.016666666666666666))),n=t/e;for(let s=0;s<e;s++)this.updateVehicle(n),this.physics.stepSimulation(n,2,1/120);this.syncCrates(),this.updateDelivery(t)}updateVehicle(t){const e=this.keys,n=e.has("w")?1:0,s=e.has("s")?1:0,i=e.has("a")?1:0,a=e.has("d")?1:0,o=e.has(" "),l=e.has("q"),h=e.has("e"),u=n-s;let d=0;u>0?d=4.3:u<0&&(d=-2.5),o&&(d=0);const f=u!==0&&!o?4.6:7.8,c=d-this.speed;this.speed+=Math.sign(c)*Math.min(Math.abs(c),f*t),o&&Math.abs(this.speed)<.05&&(this.speed=0),u===0&&!o&&(this.speed*=Math.pow(.12,t));const p=(i-a)*(.62-Math.min(Math.abs(this.speed),4)*.045);this.steer+=(p-this.steer)*Math.min(1,t*7.5),Math.abs(this.speed)>.02&&(this.pos.yaw+=this.speed/Pg*Math.tan(this.steer)*t),this.pos.x+=Math.sin(this.pos.yaw)*this.speed*t,this.pos.z+=Math.cos(this.pos.yaw)*this.speed*t,this.resolveVehicleCollisions(),this.truck.root.position.set(this.pos.x,0,this.pos.z),this.truck.root.rotation.y=this.pos.yaw,this.syncTruckBody();for(const m of this.truck.wheels)m.spin.rotation.x-=this.speed*t/m.radius,m.steer.rotation.y=m.front?0:this.steer;let v=0;if(l?v=1:h&&(v=-1),v!==0&&(this.lift=nn.clamp(this.lift+v*Ig*t,0,fo)),this.truck.lift.position.y=this.lift,this.carrying){const m=this.carrying,g=Math.max(this.lift+.48,.5),b=this.pos.x+Math.cos(this.pos.yaw)*this.carrySide+Math.sin(this.pos.yaw)*this.carryForward,S=this.pos.z-Math.sin(this.pos.yaw)*this.carrySide+Math.cos(this.pos.yaw)*this.carryForward;m.group.position.set(b,g,S),m.group.rotation.set(0,this.pos.yaw+this.carryYawOffset,0),this.lift<=Lg&&this.release()}else{const m=this.pickCandidate();m&&l&&this.attach(m)}}resolveVehicleCollisions(){const t=[{z:-1.05,r:.78},{z:-.1,r:.86},{z:.85,r:.8},{z:1.3,r:.5}];this.carrying&&t.push({z:2,r:.82});let e=!1;for(let n=0;n<2;n++)for(const s of t){const i=this.pos.x+Math.sin(this.pos.yaw)*s.z,a=this.pos.z+Math.cos(this.pos.yaw)*s.z;for(const o of this.vehicleColliders){const l=Math.max(o.cx-o.hx,Math.min(i,o.cx+o.hx)),h=Math.max(o.cz-o.hz,Math.min(a,o.cz+o.hz)),u=i-l,d=a-h,f=u*u+d*d;if(!(f>=s.r*s.r))if(e=!0,f<1e-7){const c=i-(o.cx-o.hx),p=o.cx+o.hx-i,v=a-(o.cz-o.hz),m=o.cz+o.hz-a,g=Math.min(c,p,v,m);g===c?this.pos.x-=g+s.r:g===p?this.pos.x+=g+s.r:g===v?this.pos.z-=g+s.r:this.pos.z+=g+s.r}else{const c=Math.sqrt(f),p=s.r-c;this.pos.x+=u/c*p,this.pos.z+=d/c*p}}}e&&(this.speed*=.72),this.pos.x=nn.clamp(this.pos.x,Pt.minX+1,Pt.maxX-1),this.pos.z=nn.clamp(this.pos.z,Pt.minZ+1,Pt.maxZ-1)}pickCandidate(){const t=this.lift+js;let e=null;for(const n of this.crates){if(n.carried||n.delivered)continue;const s=n.group.position.x-this.pos.x,i=n.group.position.z-this.pos.z,a=Math.cos(this.pos.yaw)*s-Math.sin(this.pos.yaw)*i,o=Math.sin(this.pos.yaw)*s+Math.cos(this.pos.yaw)*i;if(o<1||o>2.9||Math.abs(a)>Qs.lateral)continue;let l=n.group.rotation.y-this.pos.yaw;const h=Math.PI/2;if(l=((l+h/2)%h+h)%h-h/2,Math.abs(l*180/Math.PI)>Qs.angleDeg)continue;const d=n.group.position.y-te.halfH;if(Math.abs(t-d)>Qs.height||2.36-(o-te.d/2)<Qs.insertion)continue;const p=Math.abs(a)+Math.abs(l);(!e||p<e.score)&&(e={c:n,score:p})}return e?e.c:null}attach(t){if(this.carrying)return;const e=t.group.position.x-this.pos.x,n=t.group.position.z-this.pos.z,s=Math.cos(this.pos.yaw)*e-Math.sin(this.pos.yaw)*n,i=Math.sin(this.pos.yaw)*e+Math.cos(this.pos.yaw)*n;this.carrying=t,t.carried=!0,t.stable=0,this.carrySide=nn.clamp(s,-.18,.18),this.carryForward=nn.clamp(i,1.55,1.9);let a=t.group.rotation.y-this.pos.yaw;const o=Math.PI/2;a=((a+o/2)%o+o)%o-o/2,this.carryYawOffset=a,t.inWorld&&(this.physics.removeRigidBody(t.body),t.inWorld=!1),this.showToast(`${Le[t.color].zh}货箱已托起 · 运往同色交付区`,"good")}release(){const t=this.carrying;if(!t)return;this.carrying=null,t.carried=!1;const e=Math.max(t.group.position.y,te.halfH+.005),n=Math.round(t.group.rotation.y/(Math.PI/2))*(Math.PI/2);t.group.rotation.set(0,n,0),t.inWorld||(this.physics.addRigidBody(t.body),t.inWorld=!0),this.resetBody(t,t.group.position.x,e,t.group.position.z,n),this.showToast(`${Le[t.color].zh}货箱已释放`,"info")}syncCrates(){const t=this.A;for(const e of this.crates){if(e.carried||e.delivered||!e.inWorld)continue;const n=e.body.getWorldTransform(),s=n.getOrigin(),i=n.getRotation();let a=s.x(),o=s.y(),l=s.z();if(o<te.halfH){o=te.halfH;const u=new t.btTransform;u.setIdentity(),u.setOrigin(new t.btVector3(a,o,l)),u.setRotation(i),e.body.setWorldTransform(u),e.body.setLinearVelocity(new t.btVector3(0,0,0)),e.body.getMotionState().setWorldTransform(u)}a=nn.clamp(a,Pt.minX+1,Pt.maxX-1),l=nn.clamp(l,Pt.minZ+1,Pt.maxZ-1);const h=Math.atan2(2*(i.w()*i.y()+i.x()*i.z()),1-2*(i.y()*i.y()+i.z()*i.z()));e.group.position.set(a,o,l),e.group.rotation.set(0,h,0),e.ring.position.set(a,.045,l)}}crateSpeed(t){if(!t.inWorld)return 0;const e=t.body.getLinearVelocity();return Math.hypot(e.x(),e.z())}zoneOf(t){const e=te.w/2+.005,n=te.d/2+.005,s=t.group.rotation.y;for(const i of ai){let a=!0;for(const[o,l]of[[-e,-n],[e,-n],[-e,n],[e,n]]){const h=t.group.position.x+o*Math.cos(s)+l*Math.sin(s),u=t.group.position.z-o*Math.sin(s)+l*Math.cos(s);if(Math.abs(h-i.x)>i.w/2||Math.abs(u-i.z)>i.d/2){a=!1;break}}if(a)return i}return null}updateDelivery(t){for(const e of this.crates){if(e.carried||e.delivered)continue;const n=e.group.position.y-te.halfH,s=this.crateSpeed(e),i=this.zoneOf(e),a=n<=tr.maxBottom,o=s<=tr.maxSpeed,l=i&&i.color===e.color;l&&a&&o?(e.stable+=t,e.mat.opacity=.75+Math.min(.25,e.stable/tr.stableSeconds*.25),e.stable>=tr.stableSeconds&&this.deliver(e,i)):(e.stable=0,i&&!l&&a&&o&&this.elapsed-e.warnAt>2.5&&(e.warnAt=this.elapsed,this.showToast(`颜色不匹配：${Le[e.color].zh}货箱应放入${Le[e.color].zh}交付区`,"bad")))}}deliver(t,e){t.delivered=!0,t.stable=0,t.inWorld&&(this.physics.removeRigidBody(t.body),t.inWorld=!1),t.ring.visible=!0,t.mat.opacity=1,t.ring.position.set(t.group.position.x,.045,t.group.position.z),this.score++,this.showToast(`${Le[t.color].zh}货箱交付成功 · ${this.score} / 3`,"good");const n=document.querySelector(`.chip[data-color="${t.color}"]`);n&&n.classList.add("done"),this.updateHud(!0),this.score>=3&&this.endGame(!0)}endGame(t){if(this.mode==="won"||this.mode==="lost")return;this.mode=t?"won":"lost",this.keys.clear(),this.inspect=null,Vt("hud").classList.add("hidden"),Vt("pause-overlay").classList.add("hidden"),Vt("end-overlay").classList.remove("hidden"),Vt("end-kicker").textContent=t?"TRAINING COMPLETE · ALL CARGO DELIVERED":"TIME UP · TRAINING INCOMPLETE",Vt("end-title").textContent=t?"全部交付！":"训练超时",Vt("end-sub").textContent=t?"三只货箱全部进入同色交付区，鹈鹕学员顺利毕业。":`时间用尽，本次仅交付 ${this.score} / 3 只货箱。调整对位与路线再试一次。`,Vt("end-score").textContent=`${this.score} / 3`,Vt("end-time").textContent=nr(this.elapsed),Vt("end-left").textContent=nr(this.timeLeft);const e=Vt("end-stamps");e.innerHTML="";for(const n of ai){const s=this.crates.find(a=>a.color===n.color),i=document.createElement("div");i.className=`stamp ${s!=null&&s.delivered?"ok":"no"}`,i.innerHTML=`<i style="background:${Le[n.color].hex}"></i>${Le[n.color].zh}${s!=null&&s.delivered?"已交付":"未交付"}`,e.appendChild(i)}}animateVisuals(t){const e=this.readyT,n=this.truck.beacon.material;n.emissiveIntensity=1.7+Math.sin(e*5.5)*.9,this.truck.beacon.rotation.y+=t*3.2;const s=this.truck.pelican;s.head.rotation.x=Math.sin(e*1.7)*.025,s.head.rotation.z=Math.sin(e*.9)*.03-this.steer*.07,s.torso.rotation.z=Math.sin(e*1.4)*.012-this.steer*.035,s.torso.rotation.x=Math.sin(e*1.1)*.012+Math.min(.06,Math.abs(this.speed)*.008);for(const i of this.crates)i.ring.visible&&(i.ring.scale.setScalar(1+Math.sin(e*2.4)*.03),i.mat.opacity=.55+Math.sin(e*2.4)*.15)}updateCamera(t){const e=new P(this.pos.x,0,this.pos.z),n=new P,s=new P;if(this.mode==="ready"||this.mode==="won"||this.mode==="lost"){const i=this.readyT*.14+2.15,a=this.mode==="ready"?8.6:9.4;n.set(e.x+Math.cos(i)*a,3.5+Math.sin(this.readyT*.2)*.5,e.z+Math.sin(i)*a),s.set(e.x,1.35,e.z+.2)}else if(this.mode==="paused"&&this.inspect){const i=this.inspect==="iso"?8.2:9.2,a=this.pos.yaw,o=new P(Math.sin(a),0,Math.cos(a)),l=new P(Math.cos(a),0,-Math.sin(a));this.inspect==="front"?n.copy(e).addScaledVector(o,i).add(new P(0,2.35,0)):this.inspect==="rear"?n.copy(e).addScaledVector(o,-i).add(new P(0,2.5,0)):this.inspect==="side"?n.copy(e).addScaledVector(l,i).add(new P(0,2.3,0)):n.copy(e).addScaledVector(o,i*.72).addScaledVector(l,i*.66).add(new P(0,3.8,0)),s.set(e.x,1.2,e.z);const h=new P().subVectors(s,n).setY(0).normalize(),u=new P(-h.z,0,h.x).multiplyScalar(-1.25);n.add(u),s.add(u)}else if(this.camMode==="cockpit"){const i=new P(Math.sin(this.pos.yaw),0,Math.cos(this.pos.yaw)),a=new P(Math.cos(this.pos.yaw),0,-Math.sin(this.pos.yaw));n.copy(e).addScaledVector(i,-.5).addScaledVector(a,.06).add(new P(0,2.16,0)),s.copy(e).addScaledVector(i,4.4).setY(.92),this.camera.position.copy(n),this.camera.lookAt(s),this.camPos.copy(n),this.camTarget.copy(s);return}else{const i=new P(Math.sin(this.pos.yaw),0,Math.cos(this.pos.yaw)),a=new P(Math.cos(this.pos.yaw),0,-Math.sin(this.pos.yaw)),o=this.carrying?.65:0;n.copy(e).addScaledVector(i,-this.zoom).addScaledVector(a,2.55).add(new P(0,5+o,0)),s.copy(e).addScaledVector(i,1.9).add(new P(0,.7+o*.7,0))}if(n.x=nn.clamp(n.x,Pt.minX+.8,Pt.maxX-.8),n.z=nn.clamp(n.z,Pt.minZ+.8,Pt.maxZ-.8),n.y=nn.clamp(n.y,1.35,Pt.wallH-.7),(this.mode==="playing"||this.mode==="ready")&&n.copy(this.avoidCamera(s,n)),!this.camInit)this.camPos.copy(n),this.camTarget.copy(s),this.camInit=!0;else{const i=1-Math.exp(-t*(this.mode==="playing"?5.2:3.4));this.camPos.lerp(n,i),this.camTarget.lerp(s,1-Math.exp(-t*6))}this.camera.position.copy(this.camPos),this.camera.lookAt(this.camTarget)}avoidCamera(t,e){const n=new P().subVectors(e,t),s=n.length();if(s<.001)return e;n.divideScalar(s);let i=1;for(const a of this.staticColliders){if(!a.occlude)continue;const o=this.segmentBox(t,n,s,a);o!==null&&o<i&&(i=o)}return i<1?t.clone().addScaledVector(n,Math.max(.9,i*s-.5)):e}segmentBox(t,e,n,s){const i=new P(s.cx-s.hx,s.cy-s.hy,s.cz-s.hz),a=new P(s.cx+s.hx,s.cy+s.hy,s.cz+s.hz);let o=0,l=n;for(const h of["x","y","z"]){const u=t[h],d=e[h],f=i[h],c=a[h];if(Math.abs(d)<1e-8){if(u<f||u>c)return null}else{let p=(f-u)/d,v=(c-u)/d;if(p>v&&([p,v]=[v,p]),o=Math.max(o,p),l=Math.min(l,v),o>l)return null}}return o>.05?o:null}updateHud(t){Vt("timer").textContent=nr(this.timeLeft);const e=this.timeLeft/uo,n=Vt("timebar-fill");n.style.transform=`scaleX(${Math.max(0,e)})`,n.style.background=e<.25?"linear-gradient(90deg,#c9463c,#e08a45)":e<.5?"linear-gradient(90deg,#d3a33a,#e3c46b)":"linear-gradient(90deg,#2f8f83,#7fcbb8)",Vt("score").textContent=`${this.score} / 3`,Vt("fork-height").textContent=`${(this.lift+js).toFixed(2)} m`,Vt("fork-fill").style.transform=`scaleY(${Math.max(.02,(this.lift+js)/(fo+js))})`;const s=Vt("carry-text"),i=Vt("carry-dot");this.carrying?(s.textContent=`${Le[this.carrying.color].zh}货箱`,i.style.background=Le[this.carrying.color].hex,i.classList.add("loaded")):(s.textContent="空载",i.style.background="#4a5759",i.classList.remove("loaded"));const a=Vt("align-pill");if(this.carrying)a.textContent="按 E 降叉释放 · 需完全进入同色区",a.className="align-pill carry";else if(this.pickCandidate())a.textContent="已对准箱底 · 按 Q 升叉托起",a.className="align-pill ready";else{const l=this.crates.find(h=>!h.delivered&&Math.hypot(h.group.position.x-this.pos.x,h.group.position.z-this.pos.z)<4);a.textContent=l?`对准${Le[l.color].zh}货箱 · 低位插入箱底`:"对准货箱箱底",a.className="align-pill"}for(const o of ai){const l=this.crates.find(u=>u.color===o.color),h=document.querySelector(`.chip[data-color="${o.color}"]`);h&&h.classList.toggle("done",!!(l!=null&&l.delivered))}t&&(Vt("objective-text").textContent=this.score>=3?"全部交付完成":"将三个货箱送入同色交付区",Vt("cam-label").textContent=this.camMode==="follow"?"跟随视角":"驾驶视角")}showToast(t,e="info"){const n=Vt("toast");n.textContent=t,n.className=`toast show ${e}`,this.toastTimer=2.4}onResize(){const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75))}snapshot(){var t,e,n;return{mode:this.mode,timeLeft:+this.timeLeft.toFixed(3),elapsed:+this.elapsed.toFixed(3),score:this.score,lift:+this.lift.toFixed(3),speed:+this.speed.toFixed(3),yaw:+this.pos.yaw.toFixed(3),x:+this.pos.x.toFixed(3),z:+this.pos.z.toFixed(3),carrying:((t=this.carrying)==null?void 0:t.color)??null,canPick:((e=this.pickCandidate())==null?void 0:e.color)??null,camera:this.camMode,inspect:this.inspect,crates:this.crates.map(s=>{var i;return{color:s.color,x:+s.group.position.x.toFixed(3),y:+s.group.position.y.toFixed(3),z:+s.group.position.z.toFixed(3),delivered:s.delivered,carried:s.carried,yaw:+s.group.rotation.y.toFixed(3),stable:+s.stable.toFixed(2),zone:((i=this.zoneOf(s))==null?void 0:i.color)??null}}),render:{geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,calls:this.renderer.info.render.calls,tris:this.renderer.info.render.triangles,programs:((n=this.renderer.info.programs)==null?void 0:n.length)??null}}}debugTeleport(t,e,n){this.mode==="playing"&&(this.placeTruck(t,e,n),this.syncTruckBody(),this.speed=0)}debugSetLift(t){if(this.lift=nn.clamp(t,0,fo),this.truck.lift.position.y=this.lift,this.carrying){const e=this.carrying,n=Math.max(this.lift+.48,.5),s=this.pos.x+Math.cos(this.pos.yaw)*this.carrySide+Math.sin(this.pos.yaw)*this.carryForward,i=this.pos.z-Math.sin(this.pos.yaw)*this.carrySide+Math.cos(this.pos.yaw)*this.carryForward;e.group.position.set(s,n,i)}}debugPlaceCrate(t,e,n,s=te.halfH){const i=this.crates.find(a=>a.color===t);!i||i.carried||i.delivered||(i.inWorld||(this.physics.addRigidBody(i.body),i.inWorld=!0),this.resetBody(i,e,s,n,0),i.group.position.set(e,s,n),i.group.rotation.set(0,0,0))}}const rv=()=>{try{const r=new sv;r.initPhysics(),r.start(),window.__pelican=r}catch(r){console.error(r);const t=document.getElementById("app");t&&t.insertAdjacentHTML("beforeend",`<div class="loading" style="color:#e9b7a4;z-index:99">初始化失败：${String(r)}</div>`)}};xg("./vendor/ammo",rv);
