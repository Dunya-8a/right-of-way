(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ll="168",vs={ROTATE:0,DOLLY:1,PAN:2},ps={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ad=0,kl=1,wd=2,vh=1,Rd=2,Fn=3,ui=0,We=1,Bn=2,ri=0,xs=1,lo=2,Hl=3,Gl=4,Cd=5,Pi=100,Pd=101,Ld=102,Dd=103,Id=104,Ud=200,Nd=201,Od=202,Fd=203,Ma=204,Sa=205,Bd=206,zd=207,kd=208,Hd=209,Gd=210,Vd=211,Wd=212,Xd=213,qd=214,Yd=0,$d=1,jd=2,co=3,Kd=4,Zd=5,Jd=6,Qd=7,cl=0,tu=1,eu=2,oi=0,nu=1,iu=2,su=3,ru=4,ou=5,au=6,lu=7,xh=300,ws=301,Rs=302,ya=303,Ea=304,bo=306,ba=1e3,Ui=1001,Ta=1002,ln=1003,cu=1004,xr=1005,gn=1006,Fo=1007,Ni=1008,qn=1009,Mh=1010,Sh=1011,nr=1012,hl=1013,ki=1014,zn=1015,hr=1016,dl=1017,ul=1018,Cs=1020,yh=35902,Eh=1021,bh=1022,_n=1023,Th=1024,Ah=1025,Ms=1026,Ps=1027,wh=1028,fl=1029,Rh=1030,pl=1031,ml=1033,Qr=33776,to=33777,eo=33778,no=33779,Aa=35840,wa=35841,Ra=35842,Ca=35843,Pa=36196,La=37492,Da=37496,Ia=37808,Ua=37809,Na=37810,Oa=37811,Fa=37812,Ba=37813,za=37814,ka=37815,Ha=37816,Ga=37817,Va=37818,Wa=37819,Xa=37820,qa=37821,io=36492,Ya=36494,$a=36495,Ch=36283,ja=36284,Ka=36285,Za=36286,hu=3200,du=3201,Ph=0,uu=1,si="",Ge="srgb",xi="srgb-linear",gl="display-p3",To="display-p3-linear",ho="linear",ue="srgb",uo="rec709",fo="p3",$i=7680,Vl=519,fu=512,pu=513,mu=514,Lh=515,gu=516,_u=517,vu=518,xu=519,Wl=35044,Xl="300 es",kn=2e3,po=2001;class Xi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ql=1234567;const qs=Math.PI/180,ir=180/Math.PI;function Is(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function Be(n,t,e){return Math.max(t,Math.min(e,n))}function _l(n,t){return(n%t+t)%t}function Mu(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Su(n,t,e){return n!==t?(e-n)/(t-n):0}function Ys(n,t,e){return(1-e)*n+e*t}function yu(n,t,e,i){return Ys(n,t,1-Math.exp(-e*i))}function Eu(n,t=1){return t-Math.abs(_l(n,t*2)-t)}function bu(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Tu(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Au(n,t){return n+Math.floor(Math.random()*(t-n+1))}function wu(n,t){return n+Math.random()*(t-n)}function Ru(n){return n*(.5-Math.random())}function Cu(n){n!==void 0&&(ql=n);let t=ql+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Pu(n){return n*qs}function Lu(n){return n*ir}function Du(n){return(n&n-1)===0&&n!==0}function Iu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Uu(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Nu(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),h=o((t+i)/2),d=r((t-i)/2),u=o((t-i)/2),m=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*h,l*d,l*u,a*c);break;case"YZY":n.set(l*u,a*h,l*d,a*c);break;case"ZXZ":n.set(l*d,l*u,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*m,a*c);break;case"YXY":n.set(l*m,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*m,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function fs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ke(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ja={DEG2RAD:qs,RAD2DEG:ir,generateUUID:Is,clamp:Be,euclideanModulo:_l,mapLinear:Mu,inverseLerp:Su,lerp:Ys,damp:yu,pingpong:Eu,smoothstep:bu,smootherstep:Tu,randInt:Au,randFloat:wu,randFloatSpread:Ru,seededRandom:Cu,degToRad:Pu,radToDeg:Lu,isPowerOfTwo:Du,ceilPowerOfTwo:Iu,floorPowerOfTwo:Uu,setQuaternionFromProperEuler:Nu,normalize:ke,denormalize:fs};class zt{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Be(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(t,e,i,s,r,o,a,l,c){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],m=i[5],g=i[8],_=s[0],p=s[3],f=s[6],A=s[1],b=s[4],T=s[7],D=s[2],y=s[5],R=s[8];return r[0]=o*_+a*A+l*D,r[3]=o*p+a*b+l*y,r[6]=o*f+a*T+l*R,r[1]=c*_+h*A+d*D,r[4]=c*p+h*b+d*y,r[7]=c*f+h*T+d*R,r[2]=u*_+m*A+g*D,r[5]=u*p+m*b+g*y,r[8]=u*f+m*T+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,m=c*r-o*l,g=e*d+i*u+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(s*c-h*i)*_,t[2]=(a*i-s*o)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=m*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Bo.makeScale(t,e)),this}rotate(t){return this.premultiply(Bo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bo=new Xt;function Dh(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function sr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ou(){const n=sr("canvas");return n.style.display="block",n}const Yl={};function $s(n){n in Yl||(Yl[n]=!0,console.warn(n))}function Fu(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const $l=new Xt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),jl=new Xt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Fs={[xi]:{transfer:ho,primaries:uo,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Ge]:{transfer:ue,primaries:uo,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[To]:{transfer:ho,primaries:fo,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(jl),fromReference:n=>n.applyMatrix3($l)},[gl]:{transfer:ue,primaries:fo,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(jl),fromReference:n=>n.applyMatrix3($l).convertLinearToSRGB()}},Bu=new Set([xi,To]),ee={enabled:!0,_workingColorSpace:xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Bu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=Fs[t].toReference,s=Fs[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Fs[n].primaries},getTransfer:function(n){return n===si?ho:Fs[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(Fs[t].luminanceCoefficients)}};function Ss(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ji;class zu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ji===void 0&&(ji=sr("canvas")),ji.width=t.width,ji.height=t.height;const i=ji.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=ji}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=sr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ss(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ss(e[i]/255)*255):e[i]=Ss(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ku=0;class Ih{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ku++}),this.uuid=Is(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ko(s[o].image)):r.push(ko(s[o]))}else r=ko(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function ko(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hu=0;class ze extends Xi{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,i=Ui,s=Ui,r=gn,o=Ni,a=_n,l=qn,c=ze.DEFAULT_ANISOTROPY,h=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=Is(),this.name="",this.source=new Ih(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ba:t.x=t.x-Math.floor(t.x);break;case Ui:t.x=t.x<0?0:1;break;case Ta:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ba:t.y=t.y-Math.floor(t.y);break;case Ui:t.y=t.y<0?0:1;break;case Ta:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=xh;ze.DEFAULT_ANISOTROPY=1;class Ae{constructor(t=0,e=0,i=0,s=1){Ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],m=l[5],g=l[9],_=l[2],p=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,T=(m+1)/2,D=(f+1)/2,y=(h+u)/4,R=(d+_)/4,L=(g+p)/4;return b>T&&b>D?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=y/i,r=R/i):T>D?T<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),i=y/s,r=L/s):D<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),i=R/r,s=L/r),this.set(i,s,r,e),this}let A=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(A)<.001&&(A=1),this.x=(p-g)/A,this.y=(d-_)/A,this.z=(u-h)/A,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gu extends Xi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ae(0,0,t,e),this.scissorTest=!1,this.viewport=new Ae(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new ze(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ih(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hi extends Gu{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Uh extends ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vu extends ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fi{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3];const u=r[o+0],m=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==m||h!==g){let p=1-a;const f=l*u+c*m+h*g+d*_,A=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const D=Math.sqrt(b),y=Math.atan2(D,f*A);p=Math.sin(p*y)/D,a=Math.sin(a*y)/D}const T=a*A;if(l=l*p+u*T,c=c*p+m*T,h=h*p+g*T,d=d*p+_*T,p===1-a){const D=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=D,c*=D,h*=D,d*=D}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[o],u=r[o+1],m=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*m-c*u,t[e+1]=l*g+h*u+c*d-a*m,t[e+2]=c*g+h*m+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),d=a(r/2),u=l(i/2),m=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"YXZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"ZXY":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"ZYX":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"YZX":this._x=u*h*d+c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d-u*m*g;break;case"XZY":this._x=u*h*d-c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d+u*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+a+d;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(o-s)*m}else if(i>a&&i>d){const m=2*Math.sqrt(1+i-a-d);this._w=(h-l)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+c)/m}else if(a>d){const m=2*Math.sqrt(1+a-i-d);this._w=(r-c)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-i-a);this._w=(o-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Be(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*i+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,i=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),d=2*(r*i-o*e);return this.x=e+l*c+o*d-a*h,this.y=i+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ho.copy(this).projectOnVector(t),this.sub(Ho)}reflect(t){return this.sub(Ho.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Be(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ho=new U,Kl=new fi;class dr{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,un):un.fromBufferAttribute(r,o),un.applyMatrix4(t.matrixWorld),this.expandByPoint(un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Mr.copy(i.boundingBox)),Mr.applyMatrix4(t.matrixWorld),this.union(Mr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,un),un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bs),Sr.subVectors(this.max,Bs),Ki.subVectors(t.a,Bs),Zi.subVectors(t.b,Bs),Ji.subVectors(t.c,Bs),Kn.subVectors(Zi,Ki),Zn.subVectors(Ji,Zi),yi.subVectors(Ki,Ji);let e=[0,-Kn.z,Kn.y,0,-Zn.z,Zn.y,0,-yi.z,yi.y,Kn.z,0,-Kn.x,Zn.z,0,-Zn.x,yi.z,0,-yi.x,-Kn.y,Kn.x,0,-Zn.y,Zn.x,0,-yi.y,yi.x,0];return!Go(e,Ki,Zi,Ji,Sr)||(e=[1,0,0,0,1,0,0,0,1],!Go(e,Ki,Zi,Ji,Sr))?!1:(yr.crossVectors(Kn,Zn),e=[yr.x,yr.y,yr.z],Go(e,Ki,Zi,Ji,Sr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Dn=[new U,new U,new U,new U,new U,new U,new U,new U],un=new U,Mr=new dr,Ki=new U,Zi=new U,Ji=new U,Kn=new U,Zn=new U,yi=new U,Bs=new U,Sr=new U,yr=new U,Ei=new U;function Go(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ei.fromArray(n,r);const a=s.x*Math.abs(Ei.x)+s.y*Math.abs(Ei.y)+s.z*Math.abs(Ei.z),l=t.dot(Ei),c=e.dot(Ei),h=i.dot(Ei);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Wu=new dr,zs=new U,Vo=new U;class ur{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Wu.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zs.subVectors(t,this.center);const e=zs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(zs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zs.copy(t.center).add(Vo)),this.expandByPoint(zs.copy(t.center).sub(Vo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new U,Wo=new U,Er=new U,Jn=new U,Xo=new U,br=new U,qo=new U;class fr{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Wo.copy(t).add(e).multiplyScalar(.5),Er.copy(e).sub(t).normalize(),Jn.copy(this.origin).sub(Wo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Er),a=Jn.dot(this.direction),l=-Jn.dot(Er),c=Jn.lengthSq(),h=Math.abs(1-o*o);let d,u,m,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,m=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),m=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),m=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),m=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),m=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Wo).addScaledVector(Er,u),m}intersectSphere(t,e){In.subVectors(t.center,this.origin);const i=In.dot(this.direction),s=In.dot(In)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,i,s,r){Xo.subVectors(e,t),br.subVectors(i,t),qo.crossVectors(Xo,br);let o=this.direction.dot(qo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Jn.subVectors(this.origin,t);const l=a*this.direction.dot(br.crossVectors(Jn,br));if(l<0)return null;const c=a*this.direction.dot(Xo.cross(Jn));if(c<0||l+c>o)return null;const h=-a*Jn.dot(qo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,i,s,r,o,a,l,c,h,d,u,m,g,_,p){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,d,u,m,g,_,p)}set(t,e,i,s,r,o,a,l,c,h,d,u,m,g,_,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=m,f[7]=g,f[11]=_,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Qi.setFromMatrixColumn(t,0).length(),r=1/Qi.setFromMatrixColumn(t,1).length(),o=1/Qi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,m=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+m*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,m=l*d,g=c*h,_=c*d;e[0]=u+_*a,e[4]=g*a-m,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=m*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,m=l*d,g=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,m=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=g*c-m,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=m*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,m=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+m,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=m*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=o*l,m=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xu,t,qu)}lookAt(t,e,i){const s=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),Qn.crossVectors(i,Ke),Qn.lengthSq()===0&&(Math.abs(i.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),Qn.crossVectors(i,Ke)),Qn.normalize(),Tr.crossVectors(Ke,Qn),s[0]=Qn.x,s[4]=Tr.x,s[8]=Ke.x,s[1]=Qn.y,s[5]=Tr.y,s[9]=Ke.y,s[2]=Qn.z,s[6]=Tr.z,s[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],m=i[13],g=i[2],_=i[6],p=i[10],f=i[14],A=i[3],b=i[7],T=i[11],D=i[15],y=s[0],R=s[4],L=s[8],S=s[12],M=s[1],P=s[5],F=s[9],B=s[13],W=s[2],Y=s[6],G=s[10],J=s[14],V=s[3],it=s[7],ct=s[11],ht=s[15];return r[0]=o*y+a*M+l*W+c*V,r[4]=o*R+a*P+l*Y+c*it,r[8]=o*L+a*F+l*G+c*ct,r[12]=o*S+a*B+l*J+c*ht,r[1]=h*y+d*M+u*W+m*V,r[5]=h*R+d*P+u*Y+m*it,r[9]=h*L+d*F+u*G+m*ct,r[13]=h*S+d*B+u*J+m*ht,r[2]=g*y+_*M+p*W+f*V,r[6]=g*R+_*P+p*Y+f*it,r[10]=g*L+_*F+p*G+f*ct,r[14]=g*S+_*B+p*J+f*ht,r[3]=A*y+b*M+T*W+D*V,r[7]=A*R+b*P+T*Y+D*it,r[11]=A*L+b*F+T*G+D*ct,r[15]=A*S+b*B+T*J+D*ht,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],m=t[14],g=t[3],_=t[7],p=t[11],f=t[15];return g*(+r*l*d-s*c*d-r*a*u+i*c*u+s*a*m-i*l*m)+_*(+e*l*m-e*c*u+r*o*u-s*o*m+s*c*h-r*l*h)+p*(+e*c*d-e*a*m-r*o*d+i*o*m+r*a*h-i*c*h)+f*(-s*a*h-e*l*d+e*a*u+s*o*d-i*o*u+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],m=t[11],g=t[12],_=t[13],p=t[14],f=t[15],A=d*p*c-_*u*c+_*l*m-a*p*m-d*l*f+a*u*f,b=g*u*c-h*p*c-g*l*m+o*p*m+h*l*f-o*u*f,T=h*_*c-g*d*c+g*a*m-o*_*m-h*a*f+o*d*f,D=g*d*l-h*_*l-g*a*u+o*_*u+h*a*p-o*d*p,y=e*A+i*b+s*T+r*D;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/y;return t[0]=A*R,t[1]=(_*u*r-d*p*r-_*s*m+i*p*m+d*s*f-i*u*f)*R,t[2]=(a*p*r-_*l*r+_*s*c-i*p*c-a*s*f+i*l*f)*R,t[3]=(d*l*r-a*u*r-d*s*c+i*u*c+a*s*m-i*l*m)*R,t[4]=b*R,t[5]=(h*p*r-g*u*r+g*s*m-e*p*m-h*s*f+e*u*f)*R,t[6]=(g*l*r-o*p*r-g*s*c+e*p*c+o*s*f-e*l*f)*R,t[7]=(o*u*r-h*l*r+h*s*c-e*u*c-o*s*m+e*l*m)*R,t[8]=T*R,t[9]=(g*d*r-h*_*r-g*i*m+e*_*m+h*i*f-e*d*f)*R,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*f+e*a*f)*R,t[11]=(h*a*r-o*d*r-h*i*c+e*d*c+o*i*m-e*a*m)*R,t[12]=D*R,t[13]=(h*_*s-g*d*s+g*i*u-e*_*u-h*i*p+e*d*p)*R,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*p-e*a*p)*R,t[15]=(o*d*s-h*a*s+h*i*l-e*d*l-o*i*u+e*a*u)*R,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,m=r*h,g=r*d,_=o*h,p=o*d,f=a*d,A=l*c,b=l*h,T=l*d,D=i.x,y=i.y,R=i.z;return s[0]=(1-(_+f))*D,s[1]=(m+T)*D,s[2]=(g-b)*D,s[3]=0,s[4]=(m-T)*y,s[5]=(1-(u+f))*y,s[6]=(p+A)*y,s[7]=0,s[8]=(g+b)*R,s[9]=(p-A)*R,s[10]=(1-(u+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Qi.set(s[0],s[1],s[2]).length();const o=Qi.set(s[4],s[5],s[6]).length(),a=Qi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],fn.copy(this);const c=1/r,h=1/o,d=1/a;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=d,fn.elements[9]*=d,fn.elements[10]*=d,e.setFromRotationMatrix(fn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=kn){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),d=(e+t)/(e-t),u=(i+s)/(i-s);let m,g;if(a===kn)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===po)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=kn){const l=this.elements,c=1/(e-t),h=1/(i-s),d=1/(o-r),u=(e+t)*c,m=(i+s)*h;let g,_;if(a===kn)g=(o+r)*d,_=-2*d;else if(a===po)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Qi=new U,fn=new ce,Xu=new U(0,0,0),qu=new U(1,1,1),Qn=new U,Tr=new U,Ke=new U,Zl=new ce,Jl=new fi;class Cn{constructor(t=0,e=0,i=0,s=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Be(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Be(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Zl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jl.setFromEuler(this),this.setFromQuaternion(Jl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class vl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yu=0;const Ql=new U,ts=new fi,Un=new ce,Ar=new U,ks=new U,$u=new U,ju=new fi,tc=new U(1,0,0),ec=new U(0,1,0),nc=new U(0,0,1),ic={type:"added"},Ku={type:"removed"},es={type:"childadded",child:null},Yo={type:"childremoved",child:null};class Ee extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ee.DEFAULT_UP.clone();const t=new U,e=new Cn,i=new fi,s=new U(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new Xt}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=Ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ts.setFromAxisAngle(t,e),this.quaternion.multiply(ts),this}rotateOnWorldAxis(t,e){return ts.setFromAxisAngle(t,e),this.quaternion.premultiply(ts),this}rotateX(t){return this.rotateOnAxis(tc,t)}rotateY(t){return this.rotateOnAxis(ec,t)}rotateZ(t){return this.rotateOnAxis(nc,t)}translateOnAxis(t,e){return Ql.copy(t).applyQuaternion(this.quaternion),this.position.add(Ql.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tc,t)}translateY(t){return this.translateOnAxis(ec,t)}translateZ(t){return this.translateOnAxis(nc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ar.copy(t):Ar.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(ks,Ar,this.up):Un.lookAt(Ar,ks,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),ts.setFromRotationMatrix(Un),this.quaternion.premultiply(ts.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ic),es.child=t,this.dispatchEvent(es),es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ku),Yo.child=t,this.dispatchEvent(Yo),Yo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ic),es.child=t,this.dispatchEvent(es),es.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,t,$u),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,ju,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ee.DEFAULT_UP=new U(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pn=new U,Nn=new U,$o=new U,On=new U,ns=new U,is=new U,sc=new U,jo=new U,Ko=new U,Zo=new U;class bn{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),pn.subVectors(t,e),s.cross(pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){pn.subVectors(s,e),Nn.subVectors(i,e),$o.subVectors(t,e);const o=pn.dot(pn),a=pn.dot(Nn),l=pn.dot($o),c=Nn.dot(Nn),h=Nn.dot($o),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,m=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-m-g,g,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,On)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,On.x),l.addScaledVector(o,On.y),l.addScaledVector(a,On.z),l)}static isFrontFacing(t,e,i,s){return pn.subVectors(i,e),Nn.subVectors(t,e),pn.cross(Nn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),pn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return bn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return bn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return bn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ns.subVectors(s,i),is.subVectors(r,i),jo.subVectors(t,i);const l=ns.dot(jo),c=is.dot(jo);if(l<=0&&c<=0)return e.copy(i);Ko.subVectors(t,s);const h=ns.dot(Ko),d=is.dot(Ko);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(ns,o);Zo.subVectors(t,r);const m=ns.dot(Zo),g=is.dot(Zo);if(g>=0&&m<=g)return e.copy(r);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(is,a);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return sc.subVectors(r,s),a=(d-h)/(d-h+(m-g)),e.copy(s).addScaledVector(sc,a);const f=1/(p+_+u);return o=_*f,a=u*f,e.copy(i).addScaledVector(ns,o).addScaledVector(is,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},wr={h:0,s:0,l:0};function Jo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Yt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=i,ee.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ee.workingColorSpace){if(t=_l(t,1),e=Be(e,0,1),i=Be(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Jo(o,r,t+1/3),this.g=Jo(o,r,t),this.b=Jo(o,r,t-1/3)}return ee.toWorkingColorSpace(this,s),this}setStyle(t,e=Ge){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ge){const i=Nh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}copyLinearToSRGB(t){return this.r=zo(t.r),this.g=zo(t.g),this.b=zo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ge){return ee.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Be(Fe.r*255,0,255))*65536+Math.round(Be(Fe.g*255,0,255))*256+Math.round(Be(Fe.b*255,0,255))}getHexString(t=Ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Fe.copy(this),e);const i=Fe.r,s=Fe.g,r=Fe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Ge){ee.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,s=Fe.b;return t!==Ge?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(wr);const i=Ys(ti.h,wr.h,e),s=Ys(ti.s,wr.s,e),r=Ys(ti.l,wr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new Yt;Yt.NAMES=Nh;let Zu=0;class qi extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=Is(),this.name="",this.type="Material",this.blending=xs,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ma,this.blendDst=Sa,this.blendEquation=Pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=co,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==xs&&(i.blending=this.blending),this.side!==ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ma&&(i.blendSrc=this.blendSrc),this.blendDst!==Sa&&(i.blendDst=this.blendDst),this.blendEquation!==Pi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==co&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Yi extends qi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new U,Rr=new zt;class vn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Wl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return $s("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Rr.fromBufferAttribute(this,e),Rr.applyMatrix3(t),this.setXY(e,Rr.x,Rr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=fs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ke(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fs(e,this.array)),e}setX(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fs(e,this.array)),e}setY(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fs(e,this.array)),e}setW(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),i=ke(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),i=ke(i,this.array),s=ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),i=ke(i,this.array),s=ke(s,this.array),r=ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Wl&&(t.usage=this.usage),t}}class Oh extends vn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Fh extends vn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ue extends vn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Ju=0;const rn=new ce,Qo=new Ee,ss=new U,Ze=new dr,Hs=new dr,Le=new U;class Ce extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=Is(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dh(t)?Fh:Oh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Xt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return rn.makeRotationFromQuaternion(t),this.applyMatrix4(rn),this}rotateX(t){return rn.makeRotationX(t),this.applyMatrix4(rn),this}rotateY(t){return rn.makeRotationY(t),this.applyMatrix4(rn),this}rotateZ(t){return rn.makeRotationZ(t),this.applyMatrix4(rn),this}translate(t,e,i){return rn.makeTranslation(t,e,i),this.applyMatrix4(rn),this}scale(t,e,i){return rn.makeScale(t,e,i),this.applyMatrix4(rn),this}lookAt(t){return Qo.lookAt(t),Qo.updateMatrix(),this.applyMatrix4(Qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ue(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ur);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Hs.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(Ze.min,Hs.min),Ze.expandByPoint(Le),Le.addVectors(Ze.max,Hs.max),Ze.expandByPoint(Le)):(Ze.expandByPoint(Hs.min),Ze.expandByPoint(Hs.max))}Ze.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Le.fromBufferAttribute(a,c),l&&(ss.fromBufferAttribute(t,c),Le.add(ss)),s=Math.max(s,i.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new U,l[L]=new U;const c=new U,h=new U,d=new U,u=new zt,m=new zt,g=new zt,_=new U,p=new U;function f(L,S,M){c.fromBufferAttribute(i,L),h.fromBufferAttribute(i,S),d.fromBufferAttribute(i,M),u.fromBufferAttribute(r,L),m.fromBufferAttribute(r,S),g.fromBufferAttribute(r,M),h.sub(c),d.sub(c),m.sub(u),g.sub(u);const P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(P),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(P),a[L].add(_),a[S].add(_),a[M].add(_),l[L].add(p),l[S].add(p),l[M].add(p))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let L=0,S=A.length;L<S;++L){const M=A[L],P=M.start,F=M.count;for(let B=P,W=P+F;B<W;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const b=new U,T=new U,D=new U,y=new U;function R(L){D.fromBufferAttribute(s,L),y.copy(D);const S=a[L];b.copy(S),b.sub(D.multiplyScalar(D.dot(S))).normalize(),T.crossVectors(y,S);const P=T.dot(l[L])<0?-1:1;o.setXYZW(L,b.x,b.y,b.z,P)}for(let L=0,S=A.length;L<S;++L){const M=A[L],P=M.start,F=M.count;for(let B=P,W=P+F;B<W;B+=3)R(t.getX(B+0)),R(t.getX(B+1)),R(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new vn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const s=new U,r=new U,o=new U,a=new U,l=new U,c=new U,h=new U,d=new U;if(t)for(let u=0,m=t.count;u<m;u+=3){const g=t.getX(u+0),_=t.getX(u+1),p=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,m=e.count;u<m;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[m++]}return new vn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ce,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],m=t(u,i);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,m=d.length;u<m;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rc=new ce,bi=new fr,Cr=new ur,oc=new U,rs=new U,os=new U,as=new U,ta=new U,Pr=new U,Lr=new zt,Dr=new zt,Ir=new zt,ac=new U,lc=new U,cc=new U,Ur=new U,Nr=new U;class Ie extends Ee{constructor(t=new Ce,e=new Yi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Pr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(ta.fromBufferAttribute(d,t),o?Pr.addScaledVector(ta,h):Pr.addScaledVector(ta.sub(e),h))}e.add(Pr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Cr.copy(i.boundingSphere),Cr.applyMatrix4(r),bi.copy(t.ray).recast(t.near),!(Cr.containsPoint(bi.origin)===!1&&(bi.intersectSphere(Cr,oc)===null||bi.origin.distanceToSquared(oc)>(t.far-t.near)**2))&&(rc.copy(r).invert(),bi.copy(t.ray).applyMatrix4(rc),!(i.boundingBox!==null&&bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,bi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const p=u[g],f=o[p.materialIndex],A=Math.max(p.start,m.start),b=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let T=A,D=b;T<D;T+=3){const y=a.getX(T),R=a.getX(T+1),L=a.getX(T+2);s=Or(this,f,t,i,c,h,d,y,R,L),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const A=a.getX(p),b=a.getX(p+1),T=a.getX(p+2);s=Or(this,o,t,i,c,h,d,A,b,T),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const p=u[g],f=o[p.materialIndex],A=Math.max(p.start,m.start),b=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let T=A,D=b;T<D;T+=3){const y=T,R=T+1,L=T+2;s=Or(this,f,t,i,c,h,d,y,R,L),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const A=p,b=p+1,T=p+2;s=Or(this,o,t,i,c,h,d,A,b,T),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function Qu(n,t,e,i,s,r,o,a){let l;if(t.side===We?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===ui,a),l===null)return null;Nr.copy(a),Nr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Nr);return c<e.near||c>e.far?null:{distance:c,point:Nr.clone(),object:n}}function Or(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,rs),n.getVertexPosition(l,os),n.getVertexPosition(c,as);const h=Qu(n,t,e,i,rs,os,as,Ur);if(h){s&&(Lr.fromBufferAttribute(s,a),Dr.fromBufferAttribute(s,l),Ir.fromBufferAttribute(s,c),h.uv=bn.getInterpolation(Ur,rs,os,as,Lr,Dr,Ir,new zt)),r&&(Lr.fromBufferAttribute(r,a),Dr.fromBufferAttribute(r,l),Ir.fromBufferAttribute(r,c),h.uv1=bn.getInterpolation(Ur,rs,os,as,Lr,Dr,Ir,new zt)),o&&(ac.fromBufferAttribute(o,a),lc.fromBufferAttribute(o,l),cc.fromBufferAttribute(o,c),h.normal=bn.getInterpolation(Ur,rs,os,as,ac,lc,cc,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new U,materialIndex:0};bn.getNormal(rs,os,as,d.normal),h.face=d}return h}class pr extends Ce{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,m=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ue(c,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(d,2));function g(_,p,f,A,b,T,D,y,R,L,S){const M=T/R,P=D/L,F=T/2,B=D/2,W=y/2,Y=R+1,G=L+1;let J=0,V=0;const it=new U;for(let ct=0;ct<G;ct++){const ht=ct*P-B;for(let Mt=0;Mt<Y;Mt++){const Ut=Mt*M-F;it[_]=Ut*A,it[p]=ht*b,it[f]=W,c.push(it.x,it.y,it.z),it[_]=0,it[p]=0,it[f]=y>0?1:-1,h.push(it.x,it.y,it.z),d.push(Mt/R),d.push(1-ct/L),J+=1}}for(let ct=0;ct<L;ct++)for(let ht=0;ht<R;ht++){const Mt=u+ht+Y*ct,Ut=u+ht+Y*(ct+1),X=u+(ht+1)+Y*(ct+1),q=u+(ht+1)+Y*ct;l.push(Mt,Ut,q),l.push(Ut,X,q),V+=6}a.addGroup(m,V,S),m+=V,u+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ls(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function He(n){const t={};for(let e=0;e<n.length;e++){const i=Ls(n[e]);for(const s in i)t[s]=i[s]}return t}function tf(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Bh(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const ef={clone:Ls,merge:He};var nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends qi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nf,this.fragmentShader=sf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ls(t.uniforms),this.uniformsGroups=tf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class zh extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=kn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ei=new U,hc=new zt,dc=new zt;class an extends zh{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ir*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(qs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ei.x,ei.y).multiplyScalar(-t/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ei.x,ei.y).multiplyScalar(-t/ei.z)}getViewSize(t,e){return this.getViewBounds(t,hc,dc),e.subVectors(dc,hc)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(qs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ls=-90,cs=1;class rf extends Ee{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new an(ls,cs,t,e);s.layers=this.layers,this.add(s);const r=new an(ls,cs,t,e);r.layers=this.layers,this.add(r);const o=new an(ls,cs,t,e);o.layers=this.layers,this.add(o);const a=new an(ls,cs,t,e);a.layers=this.layers,this.add(a);const l=new an(ls,cs,t,e);l.layers=this.layers,this.add(l);const c=new an(ls,cs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===kn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===po)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(d,u,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class kh extends ze{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ws,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class of extends Hi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new kh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new pr(5,5,5),r=new pi({name:"CubemapFromEquirect",uniforms:Ls(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:We,blending:ri});r.uniforms.tEquirect.value=e;const o=new Ie(s,r),a=e.minFilter;return e.minFilter===Ni&&(e.minFilter=gn),new rf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const ea=new U,af=new U,lf=new Xt;class ni{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ea.subVectors(i,e).cross(af.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ea),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||lf.getNormalMatrix(t),s=this.coplanarPoint(ea).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new ur,Fr=new U;class xl{constructor(t=new ni,e=new ni,i=new ni,s=new ni,r=new ni,o=new ni){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=kn){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],m=s[8],g=s[9],_=s[10],p=s[11],f=s[12],A=s[13],b=s[14],T=s[15];if(i[0].setComponents(l-r,u-c,p-m,T-f).normalize(),i[1].setComponents(l+r,u+c,p+m,T+f).normalize(),i[2].setComponents(l+o,u+h,p+g,T+A).normalize(),i[3].setComponents(l-o,u-h,p-g,T-A).normalize(),i[4].setComponents(l-a,u-d,p-_,T-b).normalize(),e===kn)i[5].setComponents(l+a,u+d,p+_,T+b).normalize();else if(e===po)i[5].setComponents(a,d,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(t){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Fr.x=s.normal.x>0?t.max.x:t.min.x,Fr.y=s.normal.y>0?t.max.y:t.min.y,Fr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Hh(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function cf(n){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),a.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const h=l.array,d=l._updateRange,u=l.updateRanges;if(n.bindBuffer(c,a),d.count===-1&&u.length===0&&n.bufferSubData(c,0,h),u.length!==0){for(let m=0,g=u.length;m<g;m++){const _=u[m];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}d.count!==-1&&(n.bufferSubData(c,d.offset*h.BYTES_PER_ELEMENT,h,d.offset,d.count),d.count=-1),l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Ao extends Ce{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,m=[],g=[],_=[],p=[];for(let f=0;f<h;f++){const A=f*u-o;for(let b=0;b<c;b++){const T=b*d-r;g.push(T,-A,0),_.push(0,0,1),p.push(b/a),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let A=0;A<a;A++){const b=A+c*f,T=A+c*(f+1),D=A+1+c*(f+1),y=A+1+c*f;m.push(b,T,y),m.push(T,D,y)}this.setIndex(m),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ao(t.width,t.height,t.widthSegments,t.heightSegments)}}var hf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,df=`#ifdef USE_ALPHAHASH
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
#endif`,uf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ff=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gf=`#ifdef USE_AOMAP
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
#endif`,_f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vf=`#ifdef USE_BATCHING
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
#endif`,xf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ef=`#ifdef USE_IRIDESCENCE
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
#endif`,bf=`#ifdef USE_BUMPMAP
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
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
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
#endif`,If=`#define PI 3.141592653589793
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
} // validated`,Uf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Nf=`vec3 transformedNormal = objectNormal;
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
#endif`,Of=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ff=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gf=`#ifdef USE_ENVMAP
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
#endif`,Vf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Xf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qf=`#ifdef USE_ENVMAP
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
#endif`,Yf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$f=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zf=`#ifdef USE_GRADIENTMAP
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
}`,Jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ep=`uniform bool receiveShadow;
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
#endif`,np=`#ifdef USE_ENVMAP
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
#endif`,ip=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,op=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ap=`PhysicalMaterial material;
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
#endif`,lp=`struct PhysicalMaterial {
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
}`,cp=`
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
#endif`,hp=`#if defined( RE_IndirectDiffuse )
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
#endif`,dp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,up=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_p=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xp=`#if defined( USE_POINTS_UV )
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
#endif`,Mp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ep=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tp=`#ifdef USE_MORPHTARGETS
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
#endif`,Ap=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dp=`#ifdef USE_NORMALMAP
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
#endif`,Ip=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Up=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Np=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Op=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Bp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$p=`float getShadowMask() {
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
}`,jp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kp=`#ifdef USE_SKINNING
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
#endif`,Zp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jp=`#ifdef USE_SKINNING
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
#endif`,Qp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,em=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,im=`#ifdef USE_TRANSMISSION
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
#endif`,sm=`#ifdef USE_TRANSMISSION
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hm=`uniform sampler2D t2D;
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
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,um=`#ifdef ENVMAP_TYPE_CUBE
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
}`,fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`#include <common>
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
}`,gm=`#if DEPTH_PACKING == 3200
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
}`,_m=`#define DISTANCE
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
}`,vm=`#define DISTANCE
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
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`uniform float scale;
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
}`,ym=`uniform vec3 diffuse;
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
}`,Em=`#include <common>
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
}`,bm=`uniform vec3 diffuse;
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
}`,Tm=`#define LAMBERT
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
}`,Am=`#define LAMBERT
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
}`,wm=`#define MATCAP
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
}`,Rm=`#define MATCAP
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
}`,Cm=`#define NORMAL
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
}`,Pm=`#define NORMAL
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
}`,Lm=`#define PHONG
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
}`,Dm=`#define PHONG
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
}`,Im=`#define STANDARD
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
}`,Um=`#define STANDARD
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
}`,Nm=`#define TOON
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
}`,Om=`#define TOON
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
}`,Fm=`uniform float size;
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
}`,Bm=`uniform vec3 diffuse;
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
}`,zm=`#include <common>
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
}`,km=`uniform vec3 color;
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
}`,Hm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,Gm=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:hf,alphahash_pars_fragment:df,alphamap_fragment:uf,alphamap_pars_fragment:ff,alphatest_fragment:pf,alphatest_pars_fragment:mf,aomap_fragment:gf,aomap_pars_fragment:_f,batching_pars_vertex:vf,batching_vertex:xf,begin_vertex:Mf,beginnormal_vertex:Sf,bsdfs:yf,iridescence_fragment:Ef,bumpmap_pars_fragment:bf,clipping_planes_fragment:Tf,clipping_planes_pars_fragment:Af,clipping_planes_pars_vertex:wf,clipping_planes_vertex:Rf,color_fragment:Cf,color_pars_fragment:Pf,color_pars_vertex:Lf,color_vertex:Df,common:If,cube_uv_reflection_fragment:Uf,defaultnormal_vertex:Nf,displacementmap_pars_vertex:Of,displacementmap_vertex:Ff,emissivemap_fragment:Bf,emissivemap_pars_fragment:zf,colorspace_fragment:kf,colorspace_pars_fragment:Hf,envmap_fragment:Gf,envmap_common_pars_fragment:Vf,envmap_pars_fragment:Wf,envmap_pars_vertex:Xf,envmap_physical_pars_fragment:np,envmap_vertex:qf,fog_vertex:Yf,fog_pars_vertex:$f,fog_fragment:jf,fog_pars_fragment:Kf,gradientmap_pars_fragment:Zf,lightmap_pars_fragment:Jf,lights_lambert_fragment:Qf,lights_lambert_pars_fragment:tp,lights_pars_begin:ep,lights_toon_fragment:ip,lights_toon_pars_fragment:sp,lights_phong_fragment:rp,lights_phong_pars_fragment:op,lights_physical_fragment:ap,lights_physical_pars_fragment:lp,lights_fragment_begin:cp,lights_fragment_maps:hp,lights_fragment_end:dp,logdepthbuf_fragment:up,logdepthbuf_pars_fragment:fp,logdepthbuf_pars_vertex:pp,logdepthbuf_vertex:mp,map_fragment:gp,map_pars_fragment:_p,map_particle_fragment:vp,map_particle_pars_fragment:xp,metalnessmap_fragment:Mp,metalnessmap_pars_fragment:Sp,morphinstance_vertex:yp,morphcolor_vertex:Ep,morphnormal_vertex:bp,morphtarget_pars_vertex:Tp,morphtarget_vertex:Ap,normal_fragment_begin:wp,normal_fragment_maps:Rp,normal_pars_fragment:Cp,normal_pars_vertex:Pp,normal_vertex:Lp,normalmap_pars_fragment:Dp,clearcoat_normal_fragment_begin:Ip,clearcoat_normal_fragment_maps:Up,clearcoat_pars_fragment:Np,iridescence_pars_fragment:Op,opaque_fragment:Fp,packing:Bp,premultiplied_alpha_fragment:zp,project_vertex:kp,dithering_fragment:Hp,dithering_pars_fragment:Gp,roughnessmap_fragment:Vp,roughnessmap_pars_fragment:Wp,shadowmap_pars_fragment:Xp,shadowmap_pars_vertex:qp,shadowmap_vertex:Yp,shadowmask_pars_fragment:$p,skinbase_vertex:jp,skinning_pars_vertex:Kp,skinning_vertex:Zp,skinnormal_vertex:Jp,specularmap_fragment:Qp,specularmap_pars_fragment:tm,tonemapping_fragment:em,tonemapping_pars_fragment:nm,transmission_fragment:im,transmission_pars_fragment:sm,uv_pars_fragment:rm,uv_pars_vertex:om,uv_vertex:am,worldpos_vertex:lm,background_vert:cm,background_frag:hm,backgroundCube_vert:dm,backgroundCube_frag:um,cube_vert:fm,cube_frag:pm,depth_vert:mm,depth_frag:gm,distanceRGBA_vert:_m,distanceRGBA_frag:vm,equirect_vert:xm,equirect_frag:Mm,linedashed_vert:Sm,linedashed_frag:ym,meshbasic_vert:Em,meshbasic_frag:bm,meshlambert_vert:Tm,meshlambert_frag:Am,meshmatcap_vert:wm,meshmatcap_frag:Rm,meshnormal_vert:Cm,meshnormal_frag:Pm,meshphong_vert:Lm,meshphong_frag:Dm,meshphysical_vert:Im,meshphysical_frag:Um,meshtoon_vert:Nm,meshtoon_frag:Om,points_vert:Fm,points_frag:Bm,shadow_vert:zm,shadow_frag:km,sprite_vert:Hm,sprite_frag:Gm},gt={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},En={basic:{uniforms:He([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:He([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:He([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:He([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:He([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:He([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:He([gt.points,gt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:He([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:He([gt.common,gt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:He([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:He([gt.sprite,gt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:He([gt.common,gt.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:He([gt.lights,gt.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};En.physical={uniforms:He([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const Br={r:0,b:0,g:0},Ai=new Cn,Vm=new ce;function Wm(n,t,e,i,s,r,o){const a=new Yt(0);let l=r===!0?0:1,c,h,d=null,u=0,m=null;function g(A){let b=A.isScene===!0?A.background:null;return b&&b.isTexture&&(b=(A.backgroundBlurriness>0?e:t).get(b)),b}function _(A){let b=!1;const T=g(A);T===null?f(a,l):T&&T.isColor&&(f(T,1),b=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(A,b){const T=g(b);T&&(T.isCubeTexture||T.mapping===bo)?(h===void 0&&(h=new Ie(new pr(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:Ls(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,y,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ai.copy(b.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(Ai)),h.material.toneMapped=ee.getTransfer(T.colorSpace)!==ue,(d!==T||u!==T.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,d=T,u=T.version,m=n.toneMapping),h.layers.enableAll(),A.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Ie(new Ao(2,2),new pi({name:"BackgroundMaterial",uniforms:Ls(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=ee.getTransfer(T.colorSpace)!==ue,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||u!==T.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=T,u=T.version,m=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null))}function f(A,b){A.getRGB(Br,Bh(n)),i.buffers.color.setClear(Br.r,Br.g,Br.b,b,o)}return{getClearColor:function(){return a},setClearColor:function(A,b=1){a.set(A),l=b,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(A){l=A,f(a,l)},render:_,addToRenderList:p}}function Xm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,o=!1;function a(M,P,F,B,W){let Y=!1;const G=d(B,F,P);r!==G&&(r=G,c(r.object)),Y=m(M,B,F,W),Y&&g(M,B,F,W),W!==null&&t.update(W,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,T(M,P,F,B),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function d(M,P,F){const B=F.wireframe===!0;let W=i[M.id];W===void 0&&(W={},i[M.id]=W);let Y=W[P.id];Y===void 0&&(Y={},W[P.id]=Y);let G=Y[B];return G===void 0&&(G=u(l()),Y[B]=G),G}function u(M){const P=[],F=[],B=[];for(let W=0;W<e;W++)P[W]=0,F[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:B,object:M,attributes:{},index:null}}function m(M,P,F,B){const W=r.attributes,Y=P.attributes;let G=0;const J=F.getAttributes();for(const V in J)if(J[V].location>=0){const ct=W[V];let ht=Y[V];if(ht===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor)),ct===void 0||ct.attribute!==ht||ht&&ct.data!==ht.data)return!0;G++}return r.attributesNum!==G||r.index!==B}function g(M,P,F,B){const W={},Y=P.attributes;let G=0;const J=F.getAttributes();for(const V in J)if(J[V].location>=0){let ct=Y[V];ct===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor));const ht={};ht.attribute=ct,ct&&ct.data&&(ht.data=ct.data),W[V]=ht,G++}r.attributes=W,r.attributesNum=G,r.index=B}function _(){const M=r.newAttributes;for(let P=0,F=M.length;P<F;P++)M[P]=0}function p(M){f(M,0)}function f(M,P){const F=r.newAttributes,B=r.enabledAttributes,W=r.attributeDivisors;F[M]=1,B[M]===0&&(n.enableVertexAttribArray(M),B[M]=1),W[M]!==P&&(n.vertexAttribDivisor(M,P),W[M]=P)}function A(){const M=r.newAttributes,P=r.enabledAttributes;for(let F=0,B=P.length;F<B;F++)P[F]!==M[F]&&(n.disableVertexAttribArray(F),P[F]=0)}function b(M,P,F,B,W,Y,G){G===!0?n.vertexAttribIPointer(M,P,F,W,Y):n.vertexAttribPointer(M,P,F,B,W,Y)}function T(M,P,F,B){_();const W=B.attributes,Y=F.getAttributes(),G=P.defaultAttributeValues;for(const J in Y){const V=Y[J];if(V.location>=0){let it=W[J];if(it===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(it=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(it=M.instanceColor)),it!==void 0){const ct=it.normalized,ht=it.itemSize,Mt=t.get(it);if(Mt===void 0)continue;const Ut=Mt.buffer,X=Mt.type,q=Mt.bytesPerElement,tt=X===n.INT||X===n.UNSIGNED_INT||it.gpuType===hl;if(it.isInterleavedBufferAttribute){const ot=it.data,_t=ot.stride,Rt=it.offset;if(ot.isInstancedInterleavedBuffer){for(let St=0;St<V.locationSize;St++)f(V.location+St,ot.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let St=0;St<V.locationSize;St++)p(V.location+St);n.bindBuffer(n.ARRAY_BUFFER,Ut);for(let St=0;St<V.locationSize;St++)b(V.location+St,ht/V.locationSize,X,ct,_t*q,(Rt+ht/V.locationSize*St)*q,tt)}else{if(it.isInstancedBufferAttribute){for(let ot=0;ot<V.locationSize;ot++)f(V.location+ot,it.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let ot=0;ot<V.locationSize;ot++)p(V.location+ot);n.bindBuffer(n.ARRAY_BUFFER,Ut);for(let ot=0;ot<V.locationSize;ot++)b(V.location+ot,ht/V.locationSize,X,ct,ht*q,ht/V.locationSize*ot*q,tt)}}else if(G!==void 0){const ct=G[J];if(ct!==void 0)switch(ct.length){case 2:n.vertexAttrib2fv(V.location,ct);break;case 3:n.vertexAttrib3fv(V.location,ct);break;case 4:n.vertexAttrib4fv(V.location,ct);break;default:n.vertexAttrib1fv(V.location,ct)}}}}A()}function D(){L();for(const M in i){const P=i[M];for(const F in P){const B=P[F];for(const W in B)h(B[W].object),delete B[W];delete P[F]}delete i[M]}}function y(M){if(i[M.id]===void 0)return;const P=i[M.id];for(const F in P){const B=P[F];for(const W in B)h(B[W].object),delete B[W];delete P[F]}delete i[M.id]}function R(M){for(const P in i){const F=i[P];if(F[M.id]===void 0)continue;const B=F[M.id];for(const W in B)h(B[W].object),delete B[W];delete F[M.id]}}function L(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:S,dispose:D,releaseStatesOfGeometry:y,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:p,disableUnusedAttributes:A}}function qm(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),e.update(h,i,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];e.update(m,i,1)}function l(c,h,d,u){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_];for(let _=0;_<u.length;_++)e.update(g,i,u[_])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Ym(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const y=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(y){return!(y!==_n&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){const R=y===hr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(y!==qn&&i.convert(y)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&y!==zn&&!R)}function l(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),f=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,D=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,maxTextures:u,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:f,maxVaryings:A,maxFragmentUniforms:b,vertexTextures:T,maxSamples:D}}function $m(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new ni,a=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||i!==0||s;return s=u,i=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,f=n.get(d);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const A=r?0:i,b=A*4;let T=f.clippingState||null;l.value=T,T=h(g,u,b,m);for(let D=0;D!==b;++D)T[D]=e[D];f.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const f=m+_*4,A=u.matrixWorldInverse;a.getNormalMatrix(A),(p===null||p.length<f)&&(p=new Float32Array(f));for(let b=0,T=m;b!==_;++b,T+=4)o.copy(d[b]).applyMatrix4(A,a),o.normal.toArray(p,T),p[T+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function jm(n){let t=new WeakMap;function e(o,a){return a===ya?o.mapping=ws:a===Ea&&(o.mapping=Rs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===ya||a===Ea)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new of(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Gh extends zh{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ms=4,uc=[.125,.215,.35,.446,.526,.582],Li=20,na=new Gh,fc=new Yt;let ia=null,sa=0,ra=0,oa=!1;const Ri=(1+Math.sqrt(5))/2,hs=1/Ri,pc=[new U(-Ri,hs,0),new U(Ri,hs,0),new U(-hs,0,Ri),new U(hs,0,Ri),new U(0,Ri,-hs),new U(0,Ri,hs),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class mc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ia=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_c(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ia,sa,ra),this._renderer.xr.enabled=oa,t.scissorTest=!1,zr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ws||t.mapping===Rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ia=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),oa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:hr,format:_n,colorSpace:xi,depthBuffer:!1},s=gc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gc(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Km(r)),this._blurMaterial=Zm(r,t,e)}return s}_compileMaterial(t){const e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,na)}_sceneToCubeUV(t,e,i,s){const a=new an(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(fc),h.toneMapping=oi,h.autoClear=!1;const m=new Yi({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),g=new Ie(new pr,m);let _=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,_=!0):(m.color.copy(fc),_=!0);for(let f=0;f<6;f++){const A=f%3;A===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):A===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const b=this._cubeSize;zr(s,A*b,f>2?b:0,b,b),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ws||t.mapping===Rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=vc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_c());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ie(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;zr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,na)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=pc[(s-r-1)%pc.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Ie(this._lodPlanes[s],c),u=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Li-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Li;p>Li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Li}`);const f=[];let A=0;for(let R=0;R<Li;++R){const L=R/_,S=Math.exp(-L*L/2);f.push(S),R===0?A+=S:R<p&&(A+=2*S)}for(let R=0;R<f.length;R++)f[R]=f[R]/A;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-i;const T=this._sizeLods[s],D=3*T*(s>b-ms?s-b+ms:0),y=4*(this._cubeSize-T);zr(e,D,y,3*T,2*T),l.setRenderTarget(e),l.render(d,na)}}function Km(n){const t=[],e=[],i=[];let s=n;const r=n-ms+1+uc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-ms?l=uc[o-n+ms-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,p=2,f=1,A=new Float32Array(_*g*m),b=new Float32Array(p*g*m),T=new Float32Array(f*g*m);for(let y=0;y<m;y++){const R=y%3*2/3-1,L=y>2?0:-1,S=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];A.set(S,_*g*y),b.set(u,p*g*y);const M=[y,y,y,y,y,y];T.set(M,f*g*y)}const D=new Ce;D.setAttribute("position",new vn(A,_)),D.setAttribute("uv",new vn(b,p)),D.setAttribute("faceIndex",new vn(T,f)),t.push(D),s>ms&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function gc(n,t,e){const i=new Hi(n,t,e);return i.texture.mapping=bo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function zr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Zm(n,t,e){const i=new Float32Array(Li),s=new U(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:Li,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ml(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function _c(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ml(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function vc(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Ml(){return`

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
	`}function Jm(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===ya||l===Ea,h=l===ws||l===Rs;if(c||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new mc(n)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const m=a.image;return c&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new mc(n)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Qm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&$s("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function tg(n,t,e,i){const s={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let p=0,f=_.length;p<f;p++)t.remove(_[p])}u.removeEventListener("dispose",o),delete s[u.id];const m=r.get(u);m&&(t.remove(m),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],n.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const _=m[g];for(let p=0,f=_.length;p<f;p++)t.update(_[p],n.ARRAY_BUFFER)}}function c(d){const u=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const A=m.array;_=m.version;for(let b=0,T=A.length;b<T;b+=3){const D=A[b+0],y=A[b+1],R=A[b+2];u.push(D,y,y,R,R,D)}}else if(g!==void 0){const A=g.array;_=g.version;for(let b=0,T=A.length/3-1;b<T;b+=3){const D=b+0,y=b+1,R=b+2;u.push(D,y,y,R,R,D)}}else return;const p=new(Dh(u)?Fh:Oh)(u,1);p.version=_;const f=r.get(d);f&&t.remove(f),r.set(d,p)}function h(d){const u=r.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function eg(n,t,e){let i;function s(u){i=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,m){n.drawElements(i,m,r,u*o),e.update(m,i,1)}function c(u,m,g){g!==0&&(n.drawElementsInstanced(i,m,r,u*o,g),e.update(m,i,g))}function h(u,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,u,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];e.update(p,i,1)}function d(u,m,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<u.length;f++)c(u[f]/o,m[f],_[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,r,u,0,_,0,g);let f=0;for(let A=0;A<g;A++)f+=m[A];for(let A=0;A<_.length;A++)e.update(f,i,_[A])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function ng(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function ig(n,t,e){const i=new WeakMap,s=new Ae;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(a);if(u===void 0||u.count!==d){let M=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var m=M;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let T=0;g===!0&&(T=1),_===!0&&(T=2),p===!0&&(T=3);let D=a.attributes.position.count*T,y=1;D>t.maxTextureSize&&(y=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const R=new Float32Array(D*y*4*d),L=new Uh(R,D,y,d);L.type=zn,L.needsUpdate=!0;const S=T*4;for(let P=0;P<d;P++){const F=f[P],B=A[P],W=b[P],Y=D*y*4*P;for(let G=0;G<F.count;G++){const J=G*S;g===!0&&(s.fromBufferAttribute(F,G),R[Y+J+0]=s.x,R[Y+J+1]=s.y,R[Y+J+2]=s.z,R[Y+J+3]=0),_===!0&&(s.fromBufferAttribute(B,G),R[Y+J+4]=s.x,R[Y+J+5]=s.y,R[Y+J+6]=s.z,R[Y+J+7]=0),p===!0&&(s.fromBufferAttribute(W,G),R[Y+J+8]=s.x,R[Y+J+9]=s.y,R[Y+J+10]=s.z,R[Y+J+11]=W.itemSize===4?s.w:1)}}u={count:d,texture:L,size:new zt(D,y)},i.set(a,u),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function sg(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Vh extends ze{constructor(t,e,i,s,r,o,a,l,c,h=Ms){if(h!==Ms&&h!==Ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ms&&(i=ki),i===void 0&&h===Ps&&(i=Cs),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ln,this.minFilter=l!==void 0?l:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Wh=new ze,xc=new Vh(1,1),Xh=new Uh,qh=new Vu,Yh=new kh,Mc=[],Sc=[],yc=new Float32Array(16),Ec=new Float32Array(9),bc=new Float32Array(4);function Us(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Mc[s];if(r===void 0&&(r=new Float32Array(s),Mc[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function we(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Re(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function wo(n,t){let e=Sc[t];e===void 0&&(e=new Int32Array(t),Sc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function rg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function og(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2fv(this.addr,t),Re(e,t)}}function ag(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;n.uniform3fv(this.addr,t),Re(e,t)}}function lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4fv(this.addr,t),Re(e,t)}}function cg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(we(e,i))return;bc.set(i),n.uniformMatrix2fv(this.addr,!1,bc),Re(e,i)}}function hg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(we(e,i))return;Ec.set(i),n.uniformMatrix3fv(this.addr,!1,Ec),Re(e,i)}}function dg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(we(e,i))return;yc.set(i),n.uniformMatrix4fv(this.addr,!1,yc),Re(e,i)}}function ug(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function fg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2iv(this.addr,t),Re(e,t)}}function pg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3iv(this.addr,t),Re(e,t)}}function mg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4iv(this.addr,t),Re(e,t)}}function gg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function _g(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2uiv(this.addr,t),Re(e,t)}}function vg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3uiv(this.addr,t),Re(e,t)}}function xg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4uiv(this.addr,t),Re(e,t)}}function Mg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(xc.compareFunction=Lh,r=xc):r=Wh,e.setTexture2D(t||r,s)}function Sg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||qh,s)}function yg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Yh,s)}function Eg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Xh,s)}function bg(n){switch(n){case 5126:return rg;case 35664:return og;case 35665:return ag;case 35666:return lg;case 35674:return cg;case 35675:return hg;case 35676:return dg;case 5124:case 35670:return ug;case 35667:case 35671:return fg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return _g;case 36295:return vg;case 36296:return xg;case 35678:case 36198:case 36298:case 36306:case 35682:return Mg;case 35679:case 36299:case 36307:return Sg;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return Eg}}function Tg(n,t){n.uniform1fv(this.addr,t)}function Ag(n,t){const e=Us(t,this.size,2);n.uniform2fv(this.addr,e)}function wg(n,t){const e=Us(t,this.size,3);n.uniform3fv(this.addr,e)}function Rg(n,t){const e=Us(t,this.size,4);n.uniform4fv(this.addr,e)}function Cg(n,t){const e=Us(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Pg(n,t){const e=Us(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Lg(n,t){const e=Us(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Dg(n,t){n.uniform1iv(this.addr,t)}function Ig(n,t){n.uniform2iv(this.addr,t)}function Ug(n,t){n.uniform3iv(this.addr,t)}function Ng(n,t){n.uniform4iv(this.addr,t)}function Og(n,t){n.uniform1uiv(this.addr,t)}function Fg(n,t){n.uniform2uiv(this.addr,t)}function Bg(n,t){n.uniform3uiv(this.addr,t)}function zg(n,t){n.uniform4uiv(this.addr,t)}function kg(n,t,e){const i=this.cache,s=t.length,r=wo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Wh,r[o])}function Hg(n,t,e){const i=this.cache,s=t.length,r=wo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||qh,r[o])}function Gg(n,t,e){const i=this.cache,s=t.length,r=wo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Yh,r[o])}function Vg(n,t,e){const i=this.cache,s=t.length,r=wo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Xh,r[o])}function Wg(n){switch(n){case 5126:return Tg;case 35664:return Ag;case 35665:return wg;case 35666:return Rg;case 35674:return Cg;case 35675:return Pg;case 35676:return Lg;case 5124:case 35670:return Dg;case 35667:case 35671:return Ig;case 35668:case 35672:return Ug;case 35669:case 35673:return Ng;case 5125:return Og;case 36294:return Fg;case 36295:return Bg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return kg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Vg}}class Xg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=bg(e.type)}}class qg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Wg(e.type)}}class Yg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const aa=/(\w+)(\])?(\[|\.)?/g;function Tc(n,t){n.seq.push(t),n.map[t.id]=t}function $g(n,t,e){const i=n.name,s=i.length;for(aa.lastIndex=0;;){const r=aa.exec(i),o=aa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Tc(e,c===void 0?new Xg(a,n,t):new qg(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new Yg(a),Tc(e,d)),e=d}}}class so{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);$g(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Ac(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const jg=37297;let Kg=0;function Zg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function Jg(n){const t=ee.getPrimaries(ee.workingColorSpace),e=ee.getPrimaries(n);let i;switch(t===e?i="":t===fo&&e===uo?i="LinearDisplayP3ToLinearSRGB":t===uo&&e===fo&&(i="LinearSRGBToLinearDisplayP3"),n){case xi:case To:return[i,"LinearTransferOETF"];case Ge:case gl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function wc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Zg(n.getShaderSource(t),o)}else return s}function Qg(n,t){const e=Jg(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function t_(n,t){let e;switch(t){case nu:e="Linear";break;case iu:e="Reinhard";break;case su:e="Cineon";break;case ru:e="ACESFilmic";break;case au:e="AgX";break;case lu:e="Neutral";break;case ou:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const kr=new U;function e_(){ee.getLuminanceCoefficients(kr);const n=kr.x.toFixed(4),t=kr.y.toFixed(4),e=kr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vs).join(`
`)}function i_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function s_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Vs(n){return n!==""}function Rc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Cc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const r_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(n){return n.replace(r_,a_)}const o_=new Map;function a_(n,t){let e=Wt[t];if(e===void 0){const i=o_.get(t);if(i!==void 0)e=Wt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Qa(e)}const l_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pc(n){return n.replace(l_,c_)}function c_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function h_(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===vh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Rd?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Fn&&(t="SHADOWMAP_TYPE_VSM"),t}function d_(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ws:case Rs:t="ENVMAP_TYPE_CUBE";break;case bo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function u_(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Rs:t="ENVMAP_MODE_REFRACTION";break}return t}function f_(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case cl:t="ENVMAP_BLENDING_MULTIPLY";break;case tu:t="ENVMAP_BLENDING_MIX";break;case eu:t="ENVMAP_BLENDING_ADD";break}return t}function p_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function m_(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=h_(e),c=d_(e),h=u_(e),d=f_(e),u=p_(e),m=n_(e),g=i_(r),_=s.createProgram();let p,f,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vs).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vs).join(`
`),f.length>0&&(f+=`
`)):(p=[Lc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vs).join(`
`),f=[Lc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==oi?"#define TONE_MAPPING":"",e.toneMapping!==oi?Wt.tonemapping_pars_fragment:"",e.toneMapping!==oi?t_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Qg("linearToOutputTexel",e.outputColorSpace),e_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Vs).join(`
`)),o=Qa(o),o=Rc(o,e),o=Cc(o,e),a=Qa(a),a=Rc(a,e),a=Cc(a,e),o=Pc(o),a=Pc(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===Xl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Xl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=A+p+o,T=A+f+a,D=Ac(s,s.VERTEX_SHADER,b),y=Ac(s,s.FRAGMENT_SHADER,T);s.attachShader(_,D),s.attachShader(_,y),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(P){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(_).trim(),B=s.getShaderInfoLog(D).trim(),W=s.getShaderInfoLog(y).trim();let Y=!0,G=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,D,y);else{const J=wc(s,D,"vertex"),V=wc(s,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+J+`
`+V)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(B===""||W==="")&&(G=!1);G&&(P.diagnostics={runnable:Y,programLog:F,vertexShader:{log:B,prefix:p},fragmentShader:{log:W,prefix:f}})}s.deleteShader(D),s.deleteShader(y),L=new so(s,_),S=s_(s,_)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,jg)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Kg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=y,this}let g_=0;class __{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new v_(t),e.set(t,i)),i}}class v_{constructor(t){this.id=g_++,this.code=t,this.usedTimes=0}}function x_(n,t,e,i,s,r,o){const a=new vl,l=new __,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,M,P,F,B){const W=F.fog,Y=B.geometry,G=S.isMeshStandardMaterial?F.environment:null,J=(S.isMeshStandardMaterial?e:t).get(S.envMap||G),V=J&&J.mapping===bo?J.image.height:null,it=g[S.type];S.precision!==null&&(m=s.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const ct=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ht=ct!==void 0?ct.length:0;let Mt=0;Y.morphAttributes.position!==void 0&&(Mt=1),Y.morphAttributes.normal!==void 0&&(Mt=2),Y.morphAttributes.color!==void 0&&(Mt=3);let Ut,X,q,tt;if(it){const kt=En[it];Ut=kt.vertexShader,X=kt.fragmentShader}else Ut=S.vertexShader,X=S.fragmentShader,l.update(S),q=l.getVertexShaderID(S),tt=l.getFragmentShaderID(S);const ot=n.getRenderTarget(),_t=B.isInstancedMesh===!0,Rt=B.isBatchedMesh===!0,St=!!S.map,Vt=!!S.matcap,C=!!J,Gt=!!S.aoMap,bt=!!S.lightMap,Ct=!!S.bumpMap,pt=!!S.normalMap,It=!!S.displacementMap,ft=!!S.emissiveMap,mt=!!S.metalnessMap,w=!!S.roughnessMap,x=S.anisotropy>0,z=S.clearcoat>0,$=S.dispersion>0,j=S.iridescence>0,K=S.sheen>0,xt=S.transmission>0,st=x&&!!S.anisotropyMap,lt=z&&!!S.clearcoatMap,At=z&&!!S.clearcoatNormalMap,et=z&&!!S.clearcoatRoughnessMap,ut=j&&!!S.iridescenceMap,v=j&&!!S.iridescenceThicknessMap,Tt=K&&!!S.sheenColorMap,dt=K&&!!S.sheenRoughnessMap,Dt=!!S.specularMap,Nt=!!S.specularColorMap,qt=!!S.specularIntensityMap,I=xt&&!!S.transmissionMap,nt=xt&&!!S.thicknessMap,Q=!!S.gradientMap,Z=!!S.alphaMap,at=S.alphaTest>0,Pt=!!S.alphaHash,Ft=!!S.extensions;let $t=oi;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&($t=n.toneMapping);const ie={shaderID:it,shaderType:S.type,shaderName:S.name,vertexShader:Ut,fragmentShader:X,defines:S.defines,customVertexShaderID:q,customFragmentShaderID:tt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Rt,batchingColor:Rt&&B._colorsTexture!==null,instancing:_t,instancingColor:_t&&B.instanceColor!==null,instancingMorph:_t&&B.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ot===null?n.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:xi,alphaToCoverage:!!S.alphaToCoverage,map:St,matcap:Vt,envMap:C,envMapMode:C&&J.mapping,envMapCubeUVHeight:V,aoMap:Gt,lightMap:bt,bumpMap:Ct,normalMap:pt,displacementMap:u&&It,emissiveMap:ft,normalMapObjectSpace:pt&&S.normalMapType===uu,normalMapTangentSpace:pt&&S.normalMapType===Ph,metalnessMap:mt,roughnessMap:w,anisotropy:x,anisotropyMap:st,clearcoat:z,clearcoatMap:lt,clearcoatNormalMap:At,clearcoatRoughnessMap:et,dispersion:$,iridescence:j,iridescenceMap:ut,iridescenceThicknessMap:v,sheen:K,sheenColorMap:Tt,sheenRoughnessMap:dt,specularMap:Dt,specularColorMap:Nt,specularIntensityMap:qt,transmission:xt,transmissionMap:I,thicknessMap:nt,gradientMap:Q,opaque:S.transparent===!1&&S.blending===xs&&S.alphaToCoverage===!1,alphaMap:Z,alphaTest:at,alphaHash:Pt,combine:S.combine,mapUv:St&&_(S.map.channel),aoMapUv:Gt&&_(S.aoMap.channel),lightMapUv:bt&&_(S.lightMap.channel),bumpMapUv:Ct&&_(S.bumpMap.channel),normalMapUv:pt&&_(S.normalMap.channel),displacementMapUv:It&&_(S.displacementMap.channel),emissiveMapUv:ft&&_(S.emissiveMap.channel),metalnessMapUv:mt&&_(S.metalnessMap.channel),roughnessMapUv:w&&_(S.roughnessMap.channel),anisotropyMapUv:st&&_(S.anisotropyMap.channel),clearcoatMapUv:lt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:At&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:v&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Tt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:dt&&_(S.sheenRoughnessMap.channel),specularMapUv:Dt&&_(S.specularMap.channel),specularColorMapUv:Nt&&_(S.specularColorMap.channel),specularIntensityMapUv:qt&&_(S.specularIntensityMap.channel),transmissionMapUv:I&&_(S.transmissionMap.channel),thicknessMapUv:nt&&_(S.thicknessMap.channel),alphaMapUv:Z&&_(S.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(pt||x),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Y.attributes.uv&&(St||Z),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:B.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:Mt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:$t,decodeVideoTexture:St&&S.map.isVideoTexture===!0&&ee.getTransfer(S.map.colorSpace)===ue,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Bn,flipSided:S.side===We,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ft&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&S.extensions.multiDraw===!0||Rt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ie.vertexUv1s=c.has(1),ie.vertexUv2s=c.has(2),ie.vertexUv3s=c.has(3),c.clear(),ie}function f(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(A(M,S),b(M,S),M.push(n.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function A(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function b(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.doubleSided&&a.enable(10),M.flipSided&&a.enable(11),M.useDepthPacking&&a.enable(12),M.dithering&&a.enable(13),M.transmission&&a.enable(14),M.sheen&&a.enable(15),M.opaque&&a.enable(16),M.pointsUvs&&a.enable(17),M.decodeVideoTexture&&a.enable(18),M.alphaToCoverage&&a.enable(19),S.push(a.mask)}function T(S){const M=g[S.type];let P;if(M){const F=En[M];P=ef.clone(F.uniforms)}else P=S.uniforms;return P}function D(S,M){let P;for(let F=0,B=h.length;F<B;F++){const W=h[F];if(W.cacheKey===M){P=W,++P.usedTimes;break}}return P===void 0&&(P=new m_(n,M,S,r),h.push(P)),P}function y(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function R(S){l.remove(S)}function L(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:T,acquireProgram:D,releaseProgram:y,releaseShaderCache:R,programs:h,dispose:L}}function M_(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function S_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Dc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Ic(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d,u,m,g,_,p){let f=n[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},n[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=m,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=p),t++,f}function a(d,u,m,g,_,p){const f=o(d,u,m,g,_,p);m.transmission>0?i.push(f):m.transparent===!0?s.push(f):e.push(f)}function l(d,u,m,g,_,p){const f=o(d,u,m,g,_,p);m.transmission>0?i.unshift(f):m.transparent===!0?s.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||S_),i.length>1&&i.sort(u||Dc),s.length>1&&s.sort(u||Dc)}function h(){for(let d=t,u=n.length;d<u;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function y_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Ic,n.set(i,[o])):s>=r.length?(o=new Ic,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function E_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Yt};break;case"SpotLight":e={position:new U,direction:new U,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function b_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let T_=0;function A_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function w_(n){const t=new E_,e=b_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new U);const s=new U,r=new ce,o=new ce;function a(c){let h=0,d=0,u=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,g=0,_=0,p=0,f=0,A=0,b=0,T=0,D=0,y=0,R=0;c.sort(A_);for(let S=0,M=c.length;S<M;S++){const P=c[S],F=P.color,B=P.intensity,W=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=F.r*B,d+=F.g*B,u+=F.b*B;else if(P.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(P.sh.coefficients[G],B);R++}else if(P.isDirectionalLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const J=P.shadow,V=e.get(P);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,i.directionalShadow[m]=V,i.directionalShadowMap[m]=Y,i.directionalShadowMatrix[m]=P.shadow.matrix,A++}i.directional[m]=G,m++}else if(P.isSpotLight){const G=t.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(F).multiplyScalar(B),G.distance=W,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,i.spot[_]=G;const J=P.shadow;if(P.map&&(i.spotLightMap[D]=P.map,D++,J.updateMatrices(P),P.castShadow&&y++),i.spotLightMatrix[_]=J.matrix,P.castShadow){const V=e.get(P);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,i.spotShadow[_]=V,i.spotShadowMap[_]=Y,T++}_++}else if(P.isRectAreaLight){const G=t.get(P);G.color.copy(F).multiplyScalar(B),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),i.rectArea[p]=G,p++}else if(P.isPointLight){const G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){const J=P.shadow,V=e.get(P);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=Y,i.pointShadowMatrix[g]=P.shadow.matrix,b++}i.point[g]=G,g++}else if(P.isHemisphereLight){const G=t.get(P);G.skyColor.copy(P.color).multiplyScalar(B),G.groundColor.copy(P.groundColor).multiplyScalar(B),i.hemi[f]=G,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=gt.LTC_FLOAT_1,i.rectAreaLTC2=gt.LTC_FLOAT_2):(i.rectAreaLTC1=gt.LTC_HALF_1,i.rectAreaLTC2=gt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const L=i.hash;(L.directionalLength!==m||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==p||L.hemiLength!==f||L.numDirectionalShadows!==A||L.numPointShadows!==b||L.numSpotShadows!==T||L.numSpotMaps!==D||L.numLightProbes!==R)&&(i.directional.length=m,i.spot.length=_,i.rectArea.length=p,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=T+D-y,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=R,L.directionalLength=m,L.pointLength=g,L.spotLength=_,L.rectAreaLength=p,L.hemiLength=f,L.numDirectionalShadows=A,L.numPointShadows=b,L.numSpotShadows=T,L.numSpotMaps=D,L.numLightProbes=R,i.version=T_++)}function l(c,h){let d=0,u=0,m=0,g=0,_=0;const p=h.matrixWorldInverse;for(let f=0,A=c.length;f<A;f++){const b=c[f];if(b.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),d++}else if(b.isSpotLight){const T=i.spot[m];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),m++}else if(b.isRectAreaLight){const T=i.rectArea[g];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(p),o.identity(),r.copy(b.matrixWorld),r.premultiply(p),o.extractRotation(r),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const T=i.point[u];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(p),u++}else if(b.isHemisphereLight){const T=i.hemi[_];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:i}}function Uc(n){const t=new w_(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function R_(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Uc(n),t.set(s,[a])):r>=o.length?(a=new Uc(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class C_ extends qi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class P_ extends qi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const L_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D_=`uniform sampler2D shadow_pass;
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
}`;function I_(n,t,e){let i=new xl;const s=new zt,r=new zt,o=new Ae,a=new C_({depthPacking:du}),l=new P_,c={},h=e.maxTextureSize,d={[ui]:We,[We]:ui,[Bn]:Bn},u=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:L_,fragmentShader:D_}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new Ce;g.setAttribute("position",new vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ie(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vh;let f=this.type;this.render=function(y,R,L){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||y.length===0)return;const S=n.getRenderTarget(),M=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),F=n.state;F.setBlending(ri),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const B=f!==Fn&&this.type===Fn,W=f===Fn&&this.type!==Fn;for(let Y=0,G=y.length;Y<G;Y++){const J=y[Y],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const it=V.getFrameExtents();if(s.multiply(it),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,V.mapSize.y=r.y)),V.map===null||B===!0||W===!0){const ht=this.type!==Fn?{minFilter:ln,magFilter:ln}:{};V.map!==null&&V.map.dispose(),V.map=new Hi(s.x,s.y,ht),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const ct=V.getViewportCount();for(let ht=0;ht<ct;ht++){const Mt=V.getViewport(ht);o.set(r.x*Mt.x,r.y*Mt.y,r.x*Mt.z,r.y*Mt.w),F.viewport(o),V.updateMatrices(J,ht),i=V.getFrustum(),T(R,L,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Fn&&A(V,L),V.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(S,M,P)};function A(y,R){const L=t.update(_);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,m.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Hi(s.x,s.y)),u.uniforms.shadow_pass.value=y.map.texture,u.uniforms.resolution.value=y.mapSize,u.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(R,null,L,u,_,null),m.uniforms.shadow_pass.value=y.mapPass.texture,m.uniforms.resolution.value=y.mapSize,m.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(R,null,L,m,_,null)}function b(y,R,L,S){let M=null;const P=L.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(P!==void 0)M=P;else if(M=L.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const F=M.uuid,B=R.uuid;let W=c[F];W===void 0&&(W={},c[F]=W);let Y=W[B];Y===void 0&&(Y=M.clone(),W[B]=Y,R.addEventListener("dispose",D)),M=Y}if(M.visible=R.visible,M.wireframe=R.wireframe,S===Fn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:d[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const F=n.properties.get(M);F.light=L}return M}function T(y,R,L,S,M){if(y.visible===!1)return;if(y.layers.test(R.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&M===Fn)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,y.matrixWorld);const B=t.update(y),W=y.material;if(Array.isArray(W)){const Y=B.groups;for(let G=0,J=Y.length;G<J;G++){const V=Y[G],it=W[V.materialIndex];if(it&&it.visible){const ct=b(y,it,S,M);y.onBeforeShadow(n,y,R,L,B,ct,V),n.renderBufferDirect(L,null,B,ct,y,V),y.onAfterShadow(n,y,R,L,B,ct,V)}}}else if(W.visible){const Y=b(y,W,S,M);y.onBeforeShadow(n,y,R,L,B,Y,null),n.renderBufferDirect(L,null,B,Y,y,null),y.onAfterShadow(n,y,R,L,B,Y,null)}}const F=y.children;for(let B=0,W=F.length;B<W;B++)T(F[B],R,L,S,M)}function D(y){y.target.removeEventListener("dispose",D);for(const L in c){const S=c[L],M=y.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}function U_(n){function t(){let I=!1;const nt=new Ae;let Q=null;const Z=new Ae(0,0,0,0);return{setMask:function(at){Q!==at&&!I&&(n.colorMask(at,at,at,at),Q=at)},setLocked:function(at){I=at},setClear:function(at,Pt,Ft,$t,ie){ie===!0&&(at*=$t,Pt*=$t,Ft*=$t),nt.set(at,Pt,Ft,$t),Z.equals(nt)===!1&&(n.clearColor(at,Pt,Ft,$t),Z.copy(nt))},reset:function(){I=!1,Q=null,Z.set(-1,0,0,0)}}}function e(){let I=!1,nt=null,Q=null,Z=null;return{setTest:function(at){at?tt(n.DEPTH_TEST):ot(n.DEPTH_TEST)},setMask:function(at){nt!==at&&!I&&(n.depthMask(at),nt=at)},setFunc:function(at){if(Q!==at){switch(at){case Yd:n.depthFunc(n.NEVER);break;case $d:n.depthFunc(n.ALWAYS);break;case jd:n.depthFunc(n.LESS);break;case co:n.depthFunc(n.LEQUAL);break;case Kd:n.depthFunc(n.EQUAL);break;case Zd:n.depthFunc(n.GEQUAL);break;case Jd:n.depthFunc(n.GREATER);break;case Qd:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Q=at}},setLocked:function(at){I=at},setClear:function(at){Z!==at&&(n.clearDepth(at),Z=at)},reset:function(){I=!1,nt=null,Q=null,Z=null}}}function i(){let I=!1,nt=null,Q=null,Z=null,at=null,Pt=null,Ft=null,$t=null,ie=null;return{setTest:function(kt){I||(kt?tt(n.STENCIL_TEST):ot(n.STENCIL_TEST))},setMask:function(kt){nt!==kt&&!I&&(n.stencilMask(kt),nt=kt)},setFunc:function(kt,fe,oe){(Q!==kt||Z!==fe||at!==oe)&&(n.stencilFunc(kt,fe,oe),Q=kt,Z=fe,at=oe)},setOp:function(kt,fe,oe){(Pt!==kt||Ft!==fe||$t!==oe)&&(n.stencilOp(kt,fe,oe),Pt=kt,Ft=fe,$t=oe)},setLocked:function(kt){I=kt},setClear:function(kt){ie!==kt&&(n.clearStencil(kt),ie=kt)},reset:function(){I=!1,nt=null,Q=null,Z=null,at=null,Pt=null,Ft=null,$t=null,ie=null}}}const s=new t,r=new e,o=new i,a=new WeakMap,l=new WeakMap;let c={},h={},d=new WeakMap,u=[],m=null,g=!1,_=null,p=null,f=null,A=null,b=null,T=null,D=null,y=new Yt(0,0,0),R=0,L=!1,S=null,M=null,P=null,F=null,B=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,G=0;const J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(J)[1]),Y=G>=1):J.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),Y=G>=2);let V=null,it={};const ct=n.getParameter(n.SCISSOR_BOX),ht=n.getParameter(n.VIEWPORT),Mt=new Ae().fromArray(ct),Ut=new Ae().fromArray(ht);function X(I,nt,Q,Z){const at=new Uint8Array(4),Pt=n.createTexture();n.bindTexture(I,Pt),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ft=0;Ft<Q;Ft++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(nt,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,at):n.texImage2D(nt+Ft,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,at);return Pt}const q={};q[n.TEXTURE_2D]=X(n.TEXTURE_2D,n.TEXTURE_2D,1),q[n.TEXTURE_CUBE_MAP]=X(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[n.TEXTURE_2D_ARRAY]=X(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),q[n.TEXTURE_3D]=X(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),tt(n.DEPTH_TEST),r.setFunc(co),Ct(!1),pt(kl),tt(n.CULL_FACE),Gt(ri);function tt(I){c[I]!==!0&&(n.enable(I),c[I]=!0)}function ot(I){c[I]!==!1&&(n.disable(I),c[I]=!1)}function _t(I,nt){return h[I]!==nt?(n.bindFramebuffer(I,nt),h[I]=nt,I===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=nt),I===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=nt),!0):!1}function Rt(I,nt){let Q=u,Z=!1;if(I){Q=d.get(nt),Q===void 0&&(Q=[],d.set(nt,Q));const at=I.textures;if(Q.length!==at.length||Q[0]!==n.COLOR_ATTACHMENT0){for(let Pt=0,Ft=at.length;Pt<Ft;Pt++)Q[Pt]=n.COLOR_ATTACHMENT0+Pt;Q.length=at.length,Z=!0}}else Q[0]!==n.BACK&&(Q[0]=n.BACK,Z=!0);Z&&n.drawBuffers(Q)}function St(I){return m!==I?(n.useProgram(I),m=I,!0):!1}const Vt={[Pi]:n.FUNC_ADD,[Pd]:n.FUNC_SUBTRACT,[Ld]:n.FUNC_REVERSE_SUBTRACT};Vt[Dd]=n.MIN,Vt[Id]=n.MAX;const C={[Ud]:n.ZERO,[Nd]:n.ONE,[Od]:n.SRC_COLOR,[Ma]:n.SRC_ALPHA,[Gd]:n.SRC_ALPHA_SATURATE,[kd]:n.DST_COLOR,[Bd]:n.DST_ALPHA,[Fd]:n.ONE_MINUS_SRC_COLOR,[Sa]:n.ONE_MINUS_SRC_ALPHA,[Hd]:n.ONE_MINUS_DST_COLOR,[zd]:n.ONE_MINUS_DST_ALPHA,[Vd]:n.CONSTANT_COLOR,[Wd]:n.ONE_MINUS_CONSTANT_COLOR,[Xd]:n.CONSTANT_ALPHA,[qd]:n.ONE_MINUS_CONSTANT_ALPHA};function Gt(I,nt,Q,Z,at,Pt,Ft,$t,ie,kt){if(I===ri){g===!0&&(ot(n.BLEND),g=!1);return}if(g===!1&&(tt(n.BLEND),g=!0),I!==Cd){if(I!==_||kt!==L){if((p!==Pi||b!==Pi)&&(n.blendEquation(n.FUNC_ADD),p=Pi,b=Pi),kt)switch(I){case xs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lo:n.blendFunc(n.ONE,n.ONE);break;case Hl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case xs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case lo:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Hl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}f=null,A=null,T=null,D=null,y.set(0,0,0),R=0,_=I,L=kt}return}at=at||nt,Pt=Pt||Q,Ft=Ft||Z,(nt!==p||at!==b)&&(n.blendEquationSeparate(Vt[nt],Vt[at]),p=nt,b=at),(Q!==f||Z!==A||Pt!==T||Ft!==D)&&(n.blendFuncSeparate(C[Q],C[Z],C[Pt],C[Ft]),f=Q,A=Z,T=Pt,D=Ft),($t.equals(y)===!1||ie!==R)&&(n.blendColor($t.r,$t.g,$t.b,ie),y.copy($t),R=ie),_=I,L=!1}function bt(I,nt){I.side===Bn?ot(n.CULL_FACE):tt(n.CULL_FACE);let Q=I.side===We;nt&&(Q=!Q),Ct(Q),I.blending===xs&&I.transparent===!1?Gt(ri):Gt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),r.setFunc(I.depthFunc),r.setTest(I.depthTest),r.setMask(I.depthWrite),s.setMask(I.colorWrite);const Z=I.stencilWrite;o.setTest(Z),Z&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ft(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?tt(n.SAMPLE_ALPHA_TO_COVERAGE):ot(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(I){S!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),S=I)}function pt(I){I!==Ad?(tt(n.CULL_FACE),I!==M&&(I===kl?n.cullFace(n.BACK):I===wd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ot(n.CULL_FACE),M=I}function It(I){I!==P&&(Y&&n.lineWidth(I),P=I)}function ft(I,nt,Q){I?(tt(n.POLYGON_OFFSET_FILL),(F!==nt||B!==Q)&&(n.polygonOffset(nt,Q),F=nt,B=Q)):ot(n.POLYGON_OFFSET_FILL)}function mt(I){I?tt(n.SCISSOR_TEST):ot(n.SCISSOR_TEST)}function w(I){I===void 0&&(I=n.TEXTURE0+W-1),V!==I&&(n.activeTexture(I),V=I)}function x(I,nt,Q){Q===void 0&&(V===null?Q=n.TEXTURE0+W-1:Q=V);let Z=it[Q];Z===void 0&&(Z={type:void 0,texture:void 0},it[Q]=Z),(Z.type!==I||Z.texture!==nt)&&(V!==Q&&(n.activeTexture(Q),V=Q),n.bindTexture(I,nt||q[I]),Z.type=I,Z.texture=nt)}function z(){const I=it[V];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function $(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xt(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function st(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function lt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function At(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function et(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ut(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function v(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Tt(I){Mt.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Mt.copy(I))}function dt(I){Ut.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Ut.copy(I))}function Dt(I,nt){let Q=l.get(nt);Q===void 0&&(Q=new WeakMap,l.set(nt,Q));let Z=Q.get(I);Z===void 0&&(Z=n.getUniformBlockIndex(nt,I.name),Q.set(I,Z))}function Nt(I,nt){const Z=l.get(nt).get(I);a.get(nt)!==Z&&(n.uniformBlockBinding(nt,Z,I.__bindingPointIndex),a.set(nt,Z))}function qt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},V=null,it={},h={},d=new WeakMap,u=[],m=null,g=!1,_=null,p=null,f=null,A=null,b=null,T=null,D=null,y=new Yt(0,0,0),R=0,L=!1,S=null,M=null,P=null,F=null,B=null,Mt.set(0,0,n.canvas.width,n.canvas.height),Ut.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:tt,disable:ot,bindFramebuffer:_t,drawBuffers:Rt,useProgram:St,setBlending:Gt,setMaterial:bt,setFlipSided:Ct,setCullFace:pt,setLineWidth:It,setPolygonOffset:ft,setScissorTest:mt,activeTexture:w,bindTexture:x,unbindTexture:z,compressedTexImage2D:$,compressedTexImage3D:j,texImage2D:ut,texImage3D:v,updateUBOMapping:Dt,uniformBlockBinding:Nt,texStorage2D:At,texStorage3D:et,texSubImage2D:K,texSubImage3D:xt,compressedTexSubImage2D:st,compressedTexSubImage3D:lt,scissor:Tt,viewport:dt,reset:qt}}function Nc(n,t,e,i){const s=N_(i);switch(e){case Eh:return n*t;case Th:return n*t;case Ah:return n*t*2;case wh:return n*t/s.components*s.byteLength;case fl:return n*t/s.components*s.byteLength;case Rh:return n*t*2/s.components*s.byteLength;case pl:return n*t*2/s.components*s.byteLength;case bh:return n*t*3/s.components*s.byteLength;case _n:return n*t*4/s.components*s.byteLength;case ml:return n*t*4/s.components*s.byteLength;case Qr:case to:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case eo:case no:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case wa:case Ca:return Math.max(n,16)*Math.max(t,8)/4;case Aa:case Ra:return Math.max(n,8)*Math.max(t,8)/2;case Pa:case La:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Da:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ia:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Na:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case za:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case ka:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ha:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Va:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Wa:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Xa:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case qa:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case io:case Ya:case $a:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Ch:case ja:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ka:case Za:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function N_(n){switch(n){case qn:case Mh:return{byteLength:1,components:1};case nr:case Sh:case hr:return{byteLength:2,components:1};case dl:case ul:return{byteLength:2,components:4};case ki:case hl:case zn:return{byteLength:4,components:1};case yh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function O_(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new zt,h=new WeakMap;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return m?new OffscreenCanvas(w,x):sr("canvas")}function _(w,x,z){let $=1;const j=mt(w);if((j.width>z||j.height>z)&&($=z/Math.max(j.width,j.height)),$<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const K=Math.floor($*j.width),xt=Math.floor($*j.height);d===void 0&&(d=g(K,xt));const st=x?g(K,xt):d;return st.width=K,st.height=xt,st.getContext("2d").drawImage(w,0,0,K,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+K+"x"+xt+")."),st}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),w;return w}function p(w){return w.generateMipmaps&&w.minFilter!==ln&&w.minFilter!==gn}function f(w){n.generateMipmap(w)}function A(w,x,z,$,j=!1){if(w!==null){if(n[w]!==void 0)return n[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let K=x;if(x===n.RED&&(z===n.FLOAT&&(K=n.R32F),z===n.HALF_FLOAT&&(K=n.R16F),z===n.UNSIGNED_BYTE&&(K=n.R8)),x===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.R8UI),z===n.UNSIGNED_SHORT&&(K=n.R16UI),z===n.UNSIGNED_INT&&(K=n.R32UI),z===n.BYTE&&(K=n.R8I),z===n.SHORT&&(K=n.R16I),z===n.INT&&(K=n.R32I)),x===n.RG&&(z===n.FLOAT&&(K=n.RG32F),z===n.HALF_FLOAT&&(K=n.RG16F),z===n.UNSIGNED_BYTE&&(K=n.RG8)),x===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RG8UI),z===n.UNSIGNED_SHORT&&(K=n.RG16UI),z===n.UNSIGNED_INT&&(K=n.RG32UI),z===n.BYTE&&(K=n.RG8I),z===n.SHORT&&(K=n.RG16I),z===n.INT&&(K=n.RG32I)),x===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),x===n.RGBA){const xt=j?ho:ee.getTransfer($);z===n.FLOAT&&(K=n.RGBA32F),z===n.HALF_FLOAT&&(K=n.RGBA16F),z===n.UNSIGNED_BYTE&&(K=xt===ue?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function b(w,x){let z;return w?x===null||x===ki||x===Cs?z=n.DEPTH24_STENCIL8:x===zn?z=n.DEPTH32F_STENCIL8:x===nr&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ki||x===Cs?z=n.DEPTH_COMPONENT24:x===zn?z=n.DEPTH_COMPONENT32F:x===nr&&(z=n.DEPTH_COMPONENT16),z}function T(w,x){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==ln&&w.minFilter!==gn?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function D(w){const x=w.target;x.removeEventListener("dispose",D),R(x),x.isVideoTexture&&h.delete(x)}function y(w){const x=w.target;x.removeEventListener("dispose",y),S(x)}function R(w){const x=i.get(w);if(x.__webglInit===void 0)return;const z=w.source,$=u.get(z);if($){const j=$[x.__cacheKey];j.usedTimes--,j.usedTimes===0&&L(w),Object.keys($).length===0&&u.delete(z)}i.remove(w)}function L(w){const x=i.get(w);n.deleteTexture(x.__webglTexture);const z=w.source,$=u.get(z);delete $[x.__cacheKey],o.memory.textures--}function S(w){const x=i.get(w);if(w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(x.__webglFramebuffer[$]))for(let j=0;j<x.__webglFramebuffer[$].length;j++)n.deleteFramebuffer(x.__webglFramebuffer[$][j]);else n.deleteFramebuffer(x.__webglFramebuffer[$]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[$])}else{if(Array.isArray(x.__webglFramebuffer))for(let $=0;$<x.__webglFramebuffer.length;$++)n.deleteFramebuffer(x.__webglFramebuffer[$]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let $=0;$<x.__webglColorRenderbuffer.length;$++)x.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=w.textures;for(let $=0,j=z.length;$<j;$++){const K=i.get(z[$]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),o.memory.textures--),i.remove(z[$])}i.remove(w)}let M=0;function P(){M=0}function F(){const w=M;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),M+=1,w}function B(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function W(w,x){const z=i.get(w);if(w.isVideoTexture&&It(w),w.isRenderTargetTexture===!1&&w.version>0&&z.__version!==w.version){const $=w.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ut(z,w,x);return}}e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+x)}function Y(w,x){const z=i.get(w);if(w.version>0&&z.__version!==w.version){Ut(z,w,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+x)}function G(w,x){const z=i.get(w);if(w.version>0&&z.__version!==w.version){Ut(z,w,x);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+x)}function J(w,x){const z=i.get(w);if(w.version>0&&z.__version!==w.version){X(z,w,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+x)}const V={[ba]:n.REPEAT,[Ui]:n.CLAMP_TO_EDGE,[Ta]:n.MIRRORED_REPEAT},it={[ln]:n.NEAREST,[cu]:n.NEAREST_MIPMAP_NEAREST,[xr]:n.NEAREST_MIPMAP_LINEAR,[gn]:n.LINEAR,[Fo]:n.LINEAR_MIPMAP_NEAREST,[Ni]:n.LINEAR_MIPMAP_LINEAR},ct={[fu]:n.NEVER,[xu]:n.ALWAYS,[pu]:n.LESS,[Lh]:n.LEQUAL,[mu]:n.EQUAL,[vu]:n.GEQUAL,[gu]:n.GREATER,[_u]:n.NOTEQUAL};function ht(w,x){if(x.type===zn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===gn||x.magFilter===Fo||x.magFilter===xr||x.magFilter===Ni||x.minFilter===gn||x.minFilter===Fo||x.minFilter===xr||x.minFilter===Ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,V[x.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,V[x.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,V[x.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,it[x.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,it[x.minFilter]),x.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,ct[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===ln||x.minFilter!==xr&&x.minFilter!==Ni||x.type===zn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(w,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Mt(w,x){let z=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",D));const $=x.source;let j=u.get($);j===void 0&&(j={},u.set($,j));const K=B(x);if(K!==w.__cacheKey){j[K]===void 0&&(j[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),j[K].usedTimes++;const xt=j[w.__cacheKey];xt!==void 0&&(j[w.__cacheKey].usedTimes--,xt.usedTimes===0&&L(x)),w.__cacheKey=K,w.__webglTexture=j[K].texture}return z}function Ut(w,x,z){let $=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=n.TEXTURE_3D);const j=Mt(w,x),K=x.source;e.bindTexture($,w.__webglTexture,n.TEXTURE0+z);const xt=i.get(K);if(K.version!==xt.__version||j===!0){e.activeTexture(n.TEXTURE0+z);const st=ee.getPrimaries(ee.workingColorSpace),lt=x.colorSpace===si?null:ee.getPrimaries(x.colorSpace),At=x.colorSpace===si||st===lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let et=_(x.image,!1,s.maxTextureSize);et=ft(x,et);const ut=r.convert(x.format,x.colorSpace),v=r.convert(x.type);let Tt=A(x.internalFormat,ut,v,x.colorSpace,x.isVideoTexture);ht($,x);let dt;const Dt=x.mipmaps,Nt=x.isVideoTexture!==!0,qt=xt.__version===void 0||j===!0,I=K.dataReady,nt=T(x,et);if(x.isDepthTexture)Tt=b(x.format===Ps,x.type),qt&&(Nt?e.texStorage2D(n.TEXTURE_2D,1,Tt,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,Tt,et.width,et.height,0,ut,v,null));else if(x.isDataTexture)if(Dt.length>0){Nt&&qt&&e.texStorage2D(n.TEXTURE_2D,nt,Tt,Dt[0].width,Dt[0].height);for(let Q=0,Z=Dt.length;Q<Z;Q++)dt=Dt[Q],Nt?I&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,dt.width,dt.height,ut,v,dt.data):e.texImage2D(n.TEXTURE_2D,Q,Tt,dt.width,dt.height,0,ut,v,dt.data);x.generateMipmaps=!1}else Nt?(qt&&e.texStorage2D(n.TEXTURE_2D,nt,Tt,et.width,et.height),I&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,et.width,et.height,ut,v,et.data)):e.texImage2D(n.TEXTURE_2D,0,Tt,et.width,et.height,0,ut,v,et.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Nt&&qt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Tt,Dt[0].width,Dt[0].height,et.depth);for(let Q=0,Z=Dt.length;Q<Z;Q++)if(dt=Dt[Q],x.format!==_n)if(ut!==null)if(Nt){if(I)if(x.layerUpdates.size>0){const at=Nc(dt.width,dt.height,x.format,x.type);for(const Pt of x.layerUpdates){const Ft=dt.data.subarray(Pt*at/dt.data.BYTES_PER_ELEMENT,(Pt+1)*at/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,Pt,dt.width,dt.height,1,ut,Ft,0,0)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,dt.width,dt.height,et.depth,ut,dt.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,Tt,dt.width,dt.height,et.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Nt?I&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,dt.width,dt.height,et.depth,ut,v,dt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Q,Tt,dt.width,dt.height,et.depth,0,ut,v,dt.data)}else{Nt&&qt&&e.texStorage2D(n.TEXTURE_2D,nt,Tt,Dt[0].width,Dt[0].height);for(let Q=0,Z=Dt.length;Q<Z;Q++)dt=Dt[Q],x.format!==_n?ut!==null?Nt?I&&e.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,dt.width,dt.height,ut,dt.data):e.compressedTexImage2D(n.TEXTURE_2D,Q,Tt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Nt?I&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,dt.width,dt.height,ut,v,dt.data):e.texImage2D(n.TEXTURE_2D,Q,Tt,dt.width,dt.height,0,ut,v,dt.data)}else if(x.isDataArrayTexture)if(Nt){if(qt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,Tt,et.width,et.height,et.depth),I)if(x.layerUpdates.size>0){const Q=Nc(et.width,et.height,x.format,x.type);for(const Z of x.layerUpdates){const at=et.data.subarray(Z*Q/et.data.BYTES_PER_ELEMENT,(Z+1)*Q/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,et.width,et.height,1,ut,v,at)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ut,v,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Tt,et.width,et.height,et.depth,0,ut,v,et.data);else if(x.isData3DTexture)Nt?(qt&&e.texStorage3D(n.TEXTURE_3D,nt,Tt,et.width,et.height,et.depth),I&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ut,v,et.data)):e.texImage3D(n.TEXTURE_3D,0,Tt,et.width,et.height,et.depth,0,ut,v,et.data);else if(x.isFramebufferTexture){if(qt)if(Nt)e.texStorage2D(n.TEXTURE_2D,nt,Tt,et.width,et.height);else{let Q=et.width,Z=et.height;for(let at=0;at<nt;at++)e.texImage2D(n.TEXTURE_2D,at,Tt,Q,Z,0,ut,v,null),Q>>=1,Z>>=1}}else if(Dt.length>0){if(Nt&&qt){const Q=mt(Dt[0]);e.texStorage2D(n.TEXTURE_2D,nt,Tt,Q.width,Q.height)}for(let Q=0,Z=Dt.length;Q<Z;Q++)dt=Dt[Q],Nt?I&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,ut,v,dt):e.texImage2D(n.TEXTURE_2D,Q,Tt,ut,v,dt);x.generateMipmaps=!1}else if(Nt){if(qt){const Q=mt(et);e.texStorage2D(n.TEXTURE_2D,nt,Tt,Q.width,Q.height)}I&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut,v,et)}else e.texImage2D(n.TEXTURE_2D,0,Tt,ut,v,et);p(x)&&f($),xt.__version=K.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function X(w,x,z){if(x.image.length!==6)return;const $=Mt(w,x),j=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+z);const K=i.get(j);if(j.version!==K.__version||$===!0){e.activeTexture(n.TEXTURE0+z);const xt=ee.getPrimaries(ee.workingColorSpace),st=x.colorSpace===si?null:ee.getPrimaries(x.colorSpace),lt=x.colorSpace===si||xt===st?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,lt);const At=x.isCompressedTexture||x.image[0].isCompressedTexture,et=x.image[0]&&x.image[0].isDataTexture,ut=[];for(let Z=0;Z<6;Z++)!At&&!et?ut[Z]=_(x.image[Z],!0,s.maxCubemapSize):ut[Z]=et?x.image[Z].image:x.image[Z],ut[Z]=ft(x,ut[Z]);const v=ut[0],Tt=r.convert(x.format,x.colorSpace),dt=r.convert(x.type),Dt=A(x.internalFormat,Tt,dt,x.colorSpace),Nt=x.isVideoTexture!==!0,qt=K.__version===void 0||$===!0,I=j.dataReady;let nt=T(x,v);ht(n.TEXTURE_CUBE_MAP,x);let Q;if(At){Nt&&qt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,nt,Dt,v.width,v.height);for(let Z=0;Z<6;Z++){Q=ut[Z].mipmaps;for(let at=0;at<Q.length;at++){const Pt=Q[at];x.format!==_n?Tt!==null?Nt?I&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,0,0,Pt.width,Pt.height,Tt,Pt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,Dt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,0,0,Pt.width,Pt.height,Tt,dt,Pt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,Dt,Pt.width,Pt.height,0,Tt,dt,Pt.data)}}}else{if(Q=x.mipmaps,Nt&&qt){Q.length>0&&nt++;const Z=mt(ut[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,nt,Dt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(et){Nt?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ut[Z].width,ut[Z].height,Tt,dt,ut[Z].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Dt,ut[Z].width,ut[Z].height,0,Tt,dt,ut[Z].data);for(let at=0;at<Q.length;at++){const Ft=Q[at].image[Z].image;Nt?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,0,0,Ft.width,Ft.height,Tt,dt,Ft.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,Dt,Ft.width,Ft.height,0,Tt,dt,Ft.data)}}else{Nt?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Tt,dt,ut[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Dt,Tt,dt,ut[Z]);for(let at=0;at<Q.length;at++){const Pt=Q[at];Nt?I&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,0,0,Tt,dt,Pt.image[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,Dt,Tt,dt,Pt.image[Z])}}}p(x)&&f(n.TEXTURE_CUBE_MAP),K.__version=j.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function q(w,x,z,$,j,K){const xt=r.convert(z.format,z.colorSpace),st=r.convert(z.type),lt=A(z.internalFormat,xt,st,z.colorSpace);if(!i.get(x).__hasExternalTextures){const et=Math.max(1,x.width>>K),ut=Math.max(1,x.height>>K);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?e.texImage3D(j,K,lt,et,ut,x.depth,0,xt,st,null):e.texImage2D(j,K,lt,et,ut,0,xt,st,null)}e.bindFramebuffer(n.FRAMEBUFFER,w),pt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,j,i.get(z).__webglTexture,0,Ct(x)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,j,i.get(z).__webglTexture,K),e.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(w,x,z){if(n.bindRenderbuffer(n.RENDERBUFFER,w),x.depthBuffer){const $=x.depthTexture,j=$&&$.isDepthTexture?$.type:null,K=b(x.stencilBuffer,j),xt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=Ct(x);pt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,st,K,x.width,x.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,st,K,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,K,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xt,n.RENDERBUFFER,w)}else{const $=x.textures;for(let j=0;j<$.length;j++){const K=$[j],xt=r.convert(K.format,K.colorSpace),st=r.convert(K.type),lt=A(K.internalFormat,xt,st,K.colorSpace),At=Ct(x);z&&pt(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,At,lt,x.width,x.height):pt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,At,lt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,lt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ot(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W(x.depthTexture,0);const $=i.get(x.depthTexture).__webglTexture,j=Ct(x);if(x.depthTexture.format===Ms)pt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0);else if(x.depthTexture.format===Ps)pt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function _t(w){const x=i.get(w),z=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const $=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),$){const j=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,$.removeEventListener("dispose",j)};$.addEventListener("dispose",j),x.__depthDisposeCallback=j}x.__boundDepthTexture=$}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");ot(x.__webglFramebuffer,w)}else if(z){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]===void 0)x.__webglDepthbuffer[$]=n.createRenderbuffer(),tt(x.__webglDepthbuffer[$],w,!1);else{const j=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,K)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),tt(x.__webglDepthbuffer,w,!1);else{const $=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,j)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Rt(w,x,z){const $=i.get(w);x!==void 0&&q($.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&_t(w)}function St(w){const x=w.texture,z=i.get(w),$=i.get(x);w.addEventListener("dispose",y);const j=w.textures,K=w.isWebGLCubeRenderTarget===!0,xt=j.length>1;if(xt||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=x.version,o.memory.textures++),K){z.__webglFramebuffer=[];for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[st]=[];for(let lt=0;lt<x.mipmaps.length;lt++)z.__webglFramebuffer[st][lt]=n.createFramebuffer()}else z.__webglFramebuffer[st]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let st=0;st<x.mipmaps.length;st++)z.__webglFramebuffer[st]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(xt)for(let st=0,lt=j.length;st<lt;st++){const At=i.get(j[st]);At.__webglTexture===void 0&&(At.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&pt(w)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let st=0;st<j.length;st++){const lt=j[st];z.__webglColorRenderbuffer[st]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[st]);const At=r.convert(lt.format,lt.colorSpace),et=r.convert(lt.type),ut=A(lt.internalFormat,At,et,lt.colorSpace,w.isXRRenderTarget===!0),v=Ct(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,v,ut,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+st,n.RENDERBUFFER,z.__webglColorRenderbuffer[st])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),tt(z.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),ht(n.TEXTURE_CUBE_MAP,x);for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0)for(let lt=0;lt<x.mipmaps.length;lt++)q(z.__webglFramebuffer[st][lt],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+st,lt);else q(z.__webglFramebuffer[st],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);p(x)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let st=0,lt=j.length;st<lt;st++){const At=j[st],et=i.get(At);e.bindTexture(n.TEXTURE_2D,et.__webglTexture),ht(n.TEXTURE_2D,At),q(z.__webglFramebuffer,w,At,n.COLOR_ATTACHMENT0+st,n.TEXTURE_2D,0),p(At)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let st=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(st=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(st,$.__webglTexture),ht(st,x),x.mipmaps&&x.mipmaps.length>0)for(let lt=0;lt<x.mipmaps.length;lt++)q(z.__webglFramebuffer[lt],w,x,n.COLOR_ATTACHMENT0,st,lt);else q(z.__webglFramebuffer,w,x,n.COLOR_ATTACHMENT0,st,0);p(x)&&f(st),e.unbindTexture()}w.depthBuffer&&_t(w)}function Vt(w){const x=w.textures;for(let z=0,$=x.length;z<$;z++){const j=x[z];if(p(j)){const K=w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,xt=i.get(j).__webglTexture;e.bindTexture(K,xt),f(K),e.unbindTexture()}}}const C=[],Gt=[];function bt(w){if(w.samples>0){if(pt(w)===!1){const x=w.textures,z=w.width,$=w.height;let j=n.COLOR_BUFFER_BIT;const K=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xt=i.get(w),st=x.length>1;if(st)for(let lt=0;lt<x.length;lt++)e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let lt=0;lt<x.length;lt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),st){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xt.__webglColorRenderbuffer[lt]);const At=i.get(x[lt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,At,0)}n.blitFramebuffer(0,0,z,$,0,0,z,$,j,n.NEAREST),l===!0&&(C.length=0,Gt.length=0,C.push(n.COLOR_ATTACHMENT0+lt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(C.push(K),Gt.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Gt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,C))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),st)for(let lt=0;lt<x.length;lt++){e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,xt.__webglColorRenderbuffer[lt]);const At=i.get(x[lt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.TEXTURE_2D,At,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const x=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Ct(w){return Math.min(s.maxSamples,w.samples)}function pt(w){const x=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function It(w){const x=o.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function ft(w,x){const z=w.colorSpace,$=w.format,j=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||z!==xi&&z!==si&&(ee.getTransfer(z)===ue?($!==_n||j!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function mt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=P,this.setTexture2D=W,this.setTexture2DArray=Y,this.setTexture3D=G,this.setTextureCube=J,this.rebindTextures=Rt,this.setupRenderTarget=St,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=bt,this.setupDepthRenderbuffer=_t,this.setupFrameBufferTexture=q,this.useMultisampledRTT=pt}function F_(n,t){function e(i,s=si){let r;const o=ee.getTransfer(s);if(i===qn)return n.UNSIGNED_BYTE;if(i===dl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ul)return n.UNSIGNED_SHORT_5_5_5_1;if(i===yh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Mh)return n.BYTE;if(i===Sh)return n.SHORT;if(i===nr)return n.UNSIGNED_SHORT;if(i===hl)return n.INT;if(i===ki)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===hr)return n.HALF_FLOAT;if(i===Eh)return n.ALPHA;if(i===bh)return n.RGB;if(i===_n)return n.RGBA;if(i===Th)return n.LUMINANCE;if(i===Ah)return n.LUMINANCE_ALPHA;if(i===Ms)return n.DEPTH_COMPONENT;if(i===Ps)return n.DEPTH_STENCIL;if(i===wh)return n.RED;if(i===fl)return n.RED_INTEGER;if(i===Rh)return n.RG;if(i===pl)return n.RG_INTEGER;if(i===ml)return n.RGBA_INTEGER;if(i===Qr||i===to||i===eo||i===no)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Qr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===to)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Qr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===to)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===eo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===no)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Aa||i===wa||i===Ra||i===Ca)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Aa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===wa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ra)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ca)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Pa||i===La||i===Da)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Pa||i===La)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Da)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ia||i===Ua||i===Na||i===Oa||i===Fa||i===Ba||i===za||i===ka||i===Ha||i===Ga||i===Va||i===Wa||i===Xa||i===qa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ia)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ua)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Na)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ba)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===za)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ka)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ha)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ga)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Va)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===qa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===io||i===Ya||i===$a)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===io)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ya)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===$a)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ch||i===ja||i===Ka||i===Za)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===io)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ja)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ka)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Cs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class B_ extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Hr extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const z_={type:"move"};class la{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,i),f=this._getHandJoint(c,_);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&u>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(z_)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Hr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const k_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,H_=`
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

}`;class G_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new ze,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new pi({vertexShader:k_,fragmentShader:H_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ie(new Ao(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class V_ extends Xi{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,m=null,g=null;const _=new G_,p=e.getContextAttributes();let f=null,A=null;const b=[],T=[],D=new zt;let y=null;const R=new an;R.layers.enable(1),R.viewport=new Ae;const L=new an;L.layers.enable(2),L.viewport=new Ae;const S=[R,L],M=new B_;M.layers.enable(1),M.layers.enable(2);let P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let q=b[X];return q===void 0&&(q=new la,b[X]=q),q.getTargetRaySpace()},this.getControllerGrip=function(X){let q=b[X];return q===void 0&&(q=new la,b[X]=q),q.getGripSpace()},this.getHand=function(X){let q=b[X];return q===void 0&&(q=new la,b[X]=q),q.getHandSpace()};function B(X){const q=T.indexOf(X.inputSource);if(q===-1)return;const tt=b[q];tt!==void 0&&(tt.update(X.inputSource,X.frame,c||o),tt.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Y);for(let X=0;X<b.length;X++){const q=T[X];q!==null&&(T[X]=null,b[X].disconnect(q))}P=null,F=null,_.reset(),t.setRenderTarget(f),m=null,u=null,d=null,s=null,A=null,Ut.stop(),i.isPresenting=!1,t.setPixelRatio(y),t.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(D),s.renderState.layers===void 0){const q={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,q),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),A=new Hi(m.framebufferWidth,m.framebufferHeight,{format:_n,type:qn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let q=null,tt=null,ot=null;p.depth&&(ot=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,q=p.stencil?Ps:Ms,tt=p.stencil?Cs:ki);const _t={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(_t),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),A=new Hi(u.textureWidth,u.textureHeight,{format:_n,type:qn,depthTexture:new Vh(u.textureWidth,u.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ut.setContext(s),Ut.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(X){for(let q=0;q<X.removed.length;q++){const tt=X.removed[q],ot=T.indexOf(tt);ot>=0&&(T[ot]=null,b[ot].disconnect(tt))}for(let q=0;q<X.added.length;q++){const tt=X.added[q];let ot=T.indexOf(tt);if(ot===-1){for(let Rt=0;Rt<b.length;Rt++)if(Rt>=T.length){T.push(tt),ot=Rt;break}else if(T[Rt]===null){T[Rt]=tt,ot=Rt;break}if(ot===-1)break}const _t=b[ot];_t&&_t.connect(tt)}}const G=new U,J=new U;function V(X,q,tt){G.setFromMatrixPosition(q.matrixWorld),J.setFromMatrixPosition(tt.matrixWorld);const ot=G.distanceTo(J),_t=q.projectionMatrix.elements,Rt=tt.projectionMatrix.elements,St=_t[14]/(_t[10]-1),Vt=_t[14]/(_t[10]+1),C=(_t[9]+1)/_t[5],Gt=(_t[9]-1)/_t[5],bt=(_t[8]-1)/_t[0],Ct=(Rt[8]+1)/Rt[0],pt=St*bt,It=St*Ct,ft=ot/(-bt+Ct),mt=ft*-bt;if(q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(mt),X.translateZ(ft),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),_t[10]===-1)X.projectionMatrix.copy(q.projectionMatrix),X.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const w=St+ft,x=Vt+ft,z=pt-mt,$=It+(ot-mt),j=C*Vt/x*w,K=Gt*Vt/x*w;X.projectionMatrix.makePerspective(z,$,j,K,w,x),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function it(X,q){q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let q=X.near,tt=X.far;_.texture!==null&&(_.depthNear>0&&(q=_.depthNear),_.depthFar>0&&(tt=_.depthFar)),M.near=L.near=R.near=q,M.far=L.far=R.far=tt,(P!==M.near||F!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,F=M.far);const ot=X.parent,_t=M.cameras;it(M,ot);for(let Rt=0;Rt<_t.length;Rt++)it(_t[Rt],ot);_t.length===2?V(M,R,L):M.projectionMatrix.copy(R.projectionMatrix),ct(X,M,ot)};function ct(X,q,tt){tt===null?X.matrix.copy(q.matrixWorld):(X.matrix.copy(tt.matrixWorld),X.matrix.invert(),X.matrix.multiply(q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(q.projectionMatrix),X.projectionMatrixInverse.copy(q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=ir*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let ht=null;function Mt(X,q){if(h=q.getViewerPose(c||o),g=q,h!==null){const tt=h.views;m!==null&&(t.setRenderTargetFramebuffer(A,m.framebuffer),t.setRenderTarget(A));let ot=!1;tt.length!==M.cameras.length&&(M.cameras.length=0,ot=!0);for(let Rt=0;Rt<tt.length;Rt++){const St=tt[Rt];let Vt=null;if(m!==null)Vt=m.getViewport(St);else{const Gt=d.getViewSubImage(u,St);Vt=Gt.viewport,Rt===0&&(t.setRenderTargetTextures(A,Gt.colorTexture,u.ignoreDepthValues?void 0:Gt.depthStencilTexture),t.setRenderTarget(A))}let C=S[Rt];C===void 0&&(C=new an,C.layers.enable(Rt),C.viewport=new Ae,S[Rt]=C),C.matrix.fromArray(St.transform.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale),C.projectionMatrix.fromArray(St.projectionMatrix),C.projectionMatrixInverse.copy(C.projectionMatrix).invert(),C.viewport.set(Vt.x,Vt.y,Vt.width,Vt.height),Rt===0&&(M.matrix.copy(C.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ot===!0&&M.cameras.push(C)}const _t=s.enabledFeatures;if(_t&&_t.includes("depth-sensing")){const Rt=d.getDepthInformation(tt[0]);Rt&&Rt.isValid&&Rt.texture&&_.init(t,Rt,s.renderState)}}for(let tt=0;tt<b.length;tt++){const ot=T[tt],_t=b[tt];ot!==null&&_t!==void 0&&_t.update(ot,q,c||o)}ht&&ht(X,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),g=null}const Ut=new Hh;Ut.setAnimationLoop(Mt),this.setAnimationLoop=function(X){ht=X},this.dispose=function(){}}}const wi=new Cn,W_=new ce;function X_(n,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Bh(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,A,b,T){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(p,f):f.isMeshToonMaterial?(r(p,f),d(p,f)):f.isMeshPhongMaterial?(r(p,f),h(p,f)):f.isMeshStandardMaterial?(r(p,f),u(p,f),f.isMeshPhysicalMaterial&&m(p,f,T)):f.isMeshMatcapMaterial?(r(p,f),g(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),_(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?l(p,f,A,b):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===We&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===We&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const A=t.get(f),b=A.envMap,T=A.envMapRotation;b&&(p.envMap.value=b,wi.copy(T),wi.x*=-1,wi.y*=-1,wi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),p.envMapRotation.value.setFromMatrix4(W_.makeRotationFromEuler(wi)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,A,b){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*A,p.scale.value=b*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,A){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===We&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=A.texture,p.transmissionSamplerSize.value.set(A.width,A.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function _(p,f){const A=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(A.matrixWorld),p.nearDistance.value=A.shadow.camera.near,p.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function q_(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,b){const T=b.program;i.uniformBlockBinding(A,T)}function c(A,b){let T=s[A.id];T===void 0&&(g(A),T=h(A),s[A.id]=T,A.addEventListener("dispose",p));const D=b.program;i.updateUBOMapping(A,D);const y=t.render.frame;r[A.id]!==y&&(u(A),r[A.id]=y)}function h(A){const b=d();A.__bindingPointIndex=b;const T=n.createBuffer(),D=A.__size,y=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,D,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,T),T}function d(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(A){const b=s[A.id],T=A.uniforms,D=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let y=0,R=T.length;y<R;y++){const L=Array.isArray(T[y])?T[y]:[T[y]];for(let S=0,M=L.length;S<M;S++){const P=L[S];if(m(P,y,S,D)===!0){const F=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let W=0;for(let Y=0;Y<B.length;Y++){const G=B[Y],J=_(G);typeof G=="number"||typeof G=="boolean"?(P.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,F+W,P.__data)):G.isMatrix3?(P.__data[0]=G.elements[0],P.__data[1]=G.elements[1],P.__data[2]=G.elements[2],P.__data[3]=0,P.__data[4]=G.elements[3],P.__data[5]=G.elements[4],P.__data[6]=G.elements[5],P.__data[7]=0,P.__data[8]=G.elements[6],P.__data[9]=G.elements[7],P.__data[10]=G.elements[8],P.__data[11]=0):(G.toArray(P.__data,W),W+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(A,b,T,D){const y=A.value,R=b+"_"+T;if(D[R]===void 0)return typeof y=="number"||typeof y=="boolean"?D[R]=y:D[R]=y.clone(),!0;{const L=D[R];if(typeof y=="number"||typeof y=="boolean"){if(L!==y)return D[R]=y,!0}else if(L.equals(y)===!1)return L.copy(y),!0}return!1}function g(A){const b=A.uniforms;let T=0;const D=16;for(let R=0,L=b.length;R<L;R++){const S=Array.isArray(b[R])?b[R]:[b[R]];for(let M=0,P=S.length;M<P;M++){const F=S[M],B=Array.isArray(F.value)?F.value:[F.value];for(let W=0,Y=B.length;W<Y;W++){const G=B[W],J=_(G),V=T%D,it=V%J.boundary,ct=V+it;T+=it,ct!==0&&D-ct<J.storage&&(T+=D-ct),F.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=T,T+=J.storage}}}const y=T%D;return y>0&&(T+=D-y),A.__size=T,A.__cache={},this}function _(A){const b={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(b.boundary=4,b.storage=4):A.isVector2?(b.boundary=8,b.storage=8):A.isVector3||A.isColor?(b.boundary=16,b.storage=12):A.isVector4?(b.boundary=16,b.storage=16):A.isMatrix3?(b.boundary=48,b.storage=48):A.isMatrix4?(b.boundary=64,b.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),b}function p(A){const b=A.target;b.removeEventListener("dispose",p);const T=o.indexOf(b.__bindingPointIndex);o.splice(T,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(const A in s)n.deleteBuffer(s[A]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class Y_{constructor(t={}){const{canvas:e=Ou(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=i.getContextAttributes().alpha}else u=o;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const f=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ge,this.toneMapping=oi,this.toneMappingExposure=1;const b=this;let T=!1,D=0,y=0,R=null,L=-1,S=null;const M=new Ae,P=new Ae;let F=null;const B=new Yt(0);let W=0,Y=e.width,G=e.height,J=1,V=null,it=null;const ct=new Ae(0,0,Y,G),ht=new Ae(0,0,Y,G);let Mt=!1;const Ut=new xl;let X=!1,q=!1;const tt=new ce,ot=new U,_t=new Ae,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let St=!1;function Vt(){return R===null?J:1}let C=i;function Gt(E,O){return e.getContext(E,O)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ll}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",Z,!1),e.addEventListener("webglcontextcreationerror",at,!1),C===null){const O="webgl2";if(C=Gt(O,E),C===null)throw Gt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let bt,Ct,pt,It,ft,mt,w,x,z,$,j,K,xt,st,lt,At,et,ut,v,Tt,dt,Dt,Nt,qt;function I(){bt=new Qm(C),bt.init(),Dt=new F_(C,bt),Ct=new Ym(C,bt,t,Dt),pt=new U_(C),It=new ng(C),ft=new M_,mt=new O_(C,bt,pt,ft,Ct,Dt,It),w=new jm(b),x=new Jm(b),z=new cf(C),Nt=new Xm(C,z),$=new tg(C,z,It,Nt),j=new sg(C,$,z,It),v=new ig(C,Ct,mt),At=new $m(ft),K=new x_(b,w,x,bt,Ct,Nt,At),xt=new X_(b,ft),st=new y_,lt=new R_(bt),ut=new Wm(b,w,x,pt,j,u,l),et=new I_(b,j,Ct),qt=new q_(C,It,Ct,pt),Tt=new qm(C,bt,It),dt=new eg(C,bt,It),It.programs=K.programs,b.capabilities=Ct,b.extensions=bt,b.properties=ft,b.renderLists=st,b.shadowMap=et,b.state=pt,b.info=It}I();const nt=new V_(b,C);this.xr=nt,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const E=bt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=bt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(E){E!==void 0&&(J=E,this.setSize(Y,G,!1))},this.getSize=function(E){return E.set(Y,G)},this.setSize=function(E,O,k=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=E,G=O,e.width=Math.floor(E*J),e.height=Math.floor(O*J),k===!0&&(e.style.width=E+"px",e.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(Y*J,G*J).floor()},this.setDrawingBufferSize=function(E,O,k){Y=E,G=O,J=k,e.width=Math.floor(E*k),e.height=Math.floor(O*k),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(M)},this.getViewport=function(E){return E.copy(ct)},this.setViewport=function(E,O,k,H){E.isVector4?ct.set(E.x,E.y,E.z,E.w):ct.set(E,O,k,H),pt.viewport(M.copy(ct).multiplyScalar(J).round())},this.getScissor=function(E){return E.copy(ht)},this.setScissor=function(E,O,k,H){E.isVector4?ht.set(E.x,E.y,E.z,E.w):ht.set(E,O,k,H),pt.scissor(P.copy(ht).multiplyScalar(J).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(E){pt.setScissorTest(Mt=E)},this.setOpaqueSort=function(E){V=E},this.setTransparentSort=function(E){it=E},this.getClearColor=function(E){return E.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor.apply(ut,arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha.apply(ut,arguments)},this.clear=function(E=!0,O=!0,k=!0){let H=0;if(E){let N=!1;if(R!==null){const rt=R.texture.format;N=rt===ml||rt===pl||rt===fl}if(N){const rt=R.texture.type,vt=rt===qn||rt===ki||rt===nr||rt===Cs||rt===dl||rt===ul,yt=ut.getClearColor(),Et=ut.getClearAlpha(),Bt=yt.r,Ot=yt.g,wt=yt.b;vt?(m[0]=Bt,m[1]=Ot,m[2]=wt,m[3]=Et,C.clearBufferuiv(C.COLOR,0,m)):(g[0]=Bt,g[1]=Ot,g[2]=wt,g[3]=Et,C.clearBufferiv(C.COLOR,0,g))}else H|=C.COLOR_BUFFER_BIT}O&&(H|=C.DEPTH_BUFFER_BIT),k&&(H|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",Z,!1),e.removeEventListener("webglcontextcreationerror",at,!1),st.dispose(),lt.dispose(),ft.dispose(),w.dispose(),x.dispose(),j.dispose(),Nt.dispose(),qt.dispose(),K.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",oe),nt.removeEventListener("sessionend",Ht),ae.stop()};function Q(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Z(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const E=It.autoReset,O=et.enabled,k=et.autoUpdate,H=et.needsUpdate,N=et.type;I(),It.autoReset=E,et.enabled=O,et.autoUpdate=k,et.needsUpdate=H,et.type=N}function at(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Pt(E){const O=E.target;O.removeEventListener("dispose",Pt),Ft(O)}function Ft(E){$t(E),ft.remove(E)}function $t(E){const O=ft.get(E).programs;O!==void 0&&(O.forEach(function(k){K.releaseProgram(k)}),E.isShaderMaterial&&K.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,k,H,N,rt){O===null&&(O=Rt);const vt=N.isMesh&&N.matrixWorld.determinant()<0,yt=je(E,O,k,H,N);pt.setMaterial(H,vt);let Et=k.index,Bt=1;if(H.wireframe===!0){if(Et=$.getWireframeAttribute(k),Et===void 0)return;Bt=2}const Ot=k.drawRange,wt=k.attributes.position;let Kt=Ot.start*Bt,le=(Ot.start+Ot.count)*Bt;rt!==null&&(Kt=Math.max(Kt,rt.start*Bt),le=Math.min(le,(rt.start+rt.count)*Bt)),Et!==null?(Kt=Math.max(Kt,0),le=Math.min(le,Et.count)):wt!=null&&(Kt=Math.max(Kt,0),le=Math.min(le,wt.count));const te=le-Kt;if(te<0||te===1/0)return;Nt.setup(N,H,yt,k,Et);let xe,Zt=Tt;if(Et!==null&&(xe=z.get(Et),Zt=dt,Zt.setIndex(xe)),N.isMesh)H.wireframe===!0?(pt.setLineWidth(H.wireframeLinewidth*Vt()),Zt.setMode(C.LINES)):Zt.setMode(C.TRIANGLES);else if(N.isLine){let Lt=H.linewidth;Lt===void 0&&(Lt=1),pt.setLineWidth(Lt*Vt()),N.isLineSegments?Zt.setMode(C.LINES):N.isLineLoop?Zt.setMode(C.LINE_LOOP):Zt.setMode(C.LINE_STRIP)}else N.isPoints?Zt.setMode(C.POINTS):N.isSprite&&Zt.setMode(C.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Zt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(bt.get("WEBGL_multi_draw"))Zt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Lt=N._multiDrawStarts,Me=N._multiDrawCounts,Jt=N._multiDrawCount,Pe=Et?z.get(Et).bytesPerElement:1,Sn=ft.get(H).currentProgram.getUniforms();for(let De=0;De<Jt;De++)Sn.setValue(C,"_gl_DrawID",De),Zt.render(Lt[De]/Pe,Me[De])}else if(N.isInstancedMesh)Zt.renderInstances(Kt,te,N.count);else if(k.isInstancedBufferGeometry){const Lt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Me=Math.min(k.instanceCount,Lt);Zt.renderInstances(Kt,te,Me)}else Zt.render(Kt,te)};function ie(E,O,k){E.transparent===!0&&E.side===Bn&&E.forceSinglePass===!1?(E.side=We,E.needsUpdate=!0,Mn(E,O,k),E.side=ui,E.needsUpdate=!0,Mn(E,O,k),E.side=Bn):Mn(E,O,k)}this.compile=function(E,O,k=null){k===null&&(k=E),p=lt.get(k),p.init(O),A.push(p),k.traverseVisible(function(N){N.isLight&&N.layers.test(O.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),E!==k&&E.traverseVisible(function(N){N.isLight&&N.layers.test(O.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const H=new Set;return E.traverse(function(N){const rt=N.material;if(rt)if(Array.isArray(rt))for(let vt=0;vt<rt.length;vt++){const yt=rt[vt];ie(yt,k,N),H.add(yt)}else ie(rt,k,N),H.add(rt)}),A.pop(),p=null,H},this.compileAsync=function(E,O,k=null){const H=this.compile(E,O,k);return new Promise(N=>{function rt(){if(H.forEach(function(vt){ft.get(vt).currentProgram.isReady()&&H.delete(vt)}),H.size===0){N(E);return}setTimeout(rt,10)}bt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let kt=null;function fe(E){kt&&kt(E)}function oe(){ae.stop()}function Ht(){ae.start()}const ae=new Hh;ae.setAnimationLoop(fe),typeof self<"u"&&ae.setContext(self),this.setAnimationLoop=function(E){kt=E,nt.setAnimationLoop(E),E===null?ae.stop():ae.start()},nt.addEventListener("sessionstart",oe),nt.addEventListener("sessionend",Ht),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(O),O=nt.getCamera()),E.isScene===!0&&E.onBeforeRender(b,E,O,R),p=lt.get(E,A.length),p.init(O),A.push(p),tt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ut.setFromProjectionMatrix(tt),q=this.localClippingEnabled,X=At.init(this.clippingPlanes,q),_=st.get(E,f.length),_.init(),f.push(_),nt.enabled===!0&&nt.isPresenting===!0){const rt=b.xr.getDepthSensingMesh();rt!==null&&Se(rt,O,-1/0,b.sortObjects)}Se(E,O,0,b.sortObjects),_.finish(),b.sortObjects===!0&&_.sort(V,it),St=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,St&&ut.addToRenderList(_,E),this.info.render.frame++,X===!0&&At.beginShadows();const k=p.state.shadowsArray;et.render(k,E,O),X===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=_.opaque,N=_.transmissive;if(p.setupLights(),O.isArrayCamera){const rt=O.cameras;if(N.length>0)for(let vt=0,yt=rt.length;vt<yt;vt++){const Et=rt[vt];Qt(H,N,E,Et)}St&&ut.render(E);for(let vt=0,yt=rt.length;vt<yt;vt++){const Et=rt[vt];nn(_,E,Et,Et.viewport)}}else N.length>0&&Qt(H,N,E,O),St&&ut.render(E),nn(_,E,O);R!==null&&(mt.updateMultisampleRenderTarget(R),mt.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(b,E,O),Nt.resetDefaultState(),L=-1,S=null,A.pop(),A.length>0?(p=A[A.length-1],X===!0&&At.setGlobalState(b.clippingPlanes,p.state.camera)):p=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function Se(E,O,k,H){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)k=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Ut.intersectsSprite(E)){H&&_t.setFromMatrixPosition(E.matrixWorld).applyMatrix4(tt);const vt=j.update(E),yt=E.material;yt.visible&&_.push(E,vt,yt,k,_t.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Ut.intersectsObject(E))){const vt=j.update(E),yt=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),_t.copy(E.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),_t.copy(vt.boundingSphere.center)),_t.applyMatrix4(E.matrixWorld).applyMatrix4(tt)),Array.isArray(yt)){const Et=vt.groups;for(let Bt=0,Ot=Et.length;Bt<Ot;Bt++){const wt=Et[Bt],Kt=yt[wt.materialIndex];Kt&&Kt.visible&&_.push(E,vt,Kt,k,_t.z,wt)}}else yt.visible&&_.push(E,vt,yt,k,_t.z,null)}}const rt=E.children;for(let vt=0,yt=rt.length;vt<yt;vt++)Se(rt[vt],O,k,H)}function nn(E,O,k,H){const N=E.opaque,rt=E.transmissive,vt=E.transparent;p.setupLightsView(k),X===!0&&At.setGlobalState(b.clippingPlanes,k),H&&pt.viewport(M.copy(H)),N.length>0&&xn(N,O,k),rt.length>0&&xn(rt,O,k),vt.length>0&&xn(vt,O,k),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function Qt(E,O,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new Hi(1,1,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float")?hr:qn,minFilter:Ni,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const rt=p.state.transmissionRenderTarget[H.id],vt=H.viewport||M;rt.setSize(vt.z,vt.w);const yt=b.getRenderTarget();b.setRenderTarget(rt),b.getClearColor(B),W=b.getClearAlpha(),W<1&&b.setClearColor(16777215,.5),b.clear(),St&&ut.render(k);const Et=b.toneMapping;b.toneMapping=oi;const Bt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),X===!0&&At.setGlobalState(b.clippingPlanes,H),xn(E,k,H),mt.updateMultisampleRenderTarget(rt),mt.updateRenderTargetMipmap(rt),bt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let wt=0,Kt=O.length;wt<Kt;wt++){const le=O[wt],te=le.object,xe=le.geometry,Zt=le.material,Lt=le.group;if(Zt.side===Bn&&te.layers.test(H.layers)){const Me=Zt.side;Zt.side=We,Zt.needsUpdate=!0,Pn(te,k,H,xe,Zt,Lt),Zt.side=Me,Zt.needsUpdate=!0,Ot=!0}}Ot===!0&&(mt.updateMultisampleRenderTarget(rt),mt.updateRenderTargetMipmap(rt))}b.setRenderTarget(yt),b.setClearColor(B,W),Bt!==void 0&&(H.viewport=Bt),b.toneMapping=Et}function xn(E,O,k){const H=O.isScene===!0?O.overrideMaterial:null;for(let N=0,rt=E.length;N<rt;N++){const vt=E[N],yt=vt.object,Et=vt.geometry,Bt=H===null?vt.material:H,Ot=vt.group;yt.layers.test(k.layers)&&Pn(yt,O,k,Et,Bt,Ot)}}function Pn(E,O,k,H,N,rt){E.onBeforeRender(b,O,k,H,N,rt),E.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(b,O,k,H,E,rt),N.transparent===!0&&N.side===Bn&&N.forceSinglePass===!1?(N.side=We,N.needsUpdate=!0,b.renderBufferDirect(k,O,H,N,E,rt),N.side=ui,N.needsUpdate=!0,b.renderBufferDirect(k,O,H,N,E,rt),N.side=Bn):b.renderBufferDirect(k,O,H,N,E,rt),E.onAfterRender(b,O,k,H,N,rt)}function Mn(E,O,k){O.isScene!==!0&&(O=Rt);const H=ft.get(E),N=p.state.lights,rt=p.state.shadowsArray,vt=N.state.version,yt=K.getParameters(E,N.state,rt,O,k),Et=K.getProgramCacheKey(yt);let Bt=H.programs;H.environment=E.isMeshStandardMaterial?O.environment:null,H.fog=O.fog,H.envMap=(E.isMeshStandardMaterial?x:w).get(E.envMap||H.environment),H.envMapRotation=H.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Bt===void 0&&(E.addEventListener("dispose",Pt),Bt=new Map,H.programs=Bt);let Ot=Bt.get(Et);if(Ot!==void 0){if(H.currentProgram===Ot&&H.lightsStateVersion===vt)return sn(E,yt),Ot}else yt.uniforms=K.getUniforms(E),E.onBeforeCompile(yt,b),Ot=K.acquireProgram(yt,Et),Bt.set(Et,Ot),H.uniforms=yt.uniforms;const wt=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(wt.clippingPlanes=At.uniform),sn(E,yt),H.needsLights=Xe(E),H.lightsStateVersion=vt,H.needsLights&&(wt.ambientLightColor.value=N.state.ambient,wt.lightProbe.value=N.state.probe,wt.directionalLights.value=N.state.directional,wt.directionalLightShadows.value=N.state.directionalShadow,wt.spotLights.value=N.state.spot,wt.spotLightShadows.value=N.state.spotShadow,wt.rectAreaLights.value=N.state.rectArea,wt.ltc_1.value=N.state.rectAreaLTC1,wt.ltc_2.value=N.state.rectAreaLTC2,wt.pointLights.value=N.state.point,wt.pointLightShadows.value=N.state.pointShadow,wt.hemisphereLights.value=N.state.hemi,wt.directionalShadowMap.value=N.state.directionalShadowMap,wt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,wt.spotShadowMap.value=N.state.spotShadowMap,wt.spotLightMatrix.value=N.state.spotLightMatrix,wt.spotLightMap.value=N.state.spotLightMap,wt.pointShadowMap.value=N.state.pointShadowMap,wt.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=Ot,H.uniformsList=null,Ot}function jn(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=so.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function sn(E,O){const k=ft.get(E);k.outputColorSpace=O.outputColorSpace,k.batching=O.batching,k.batchingColor=O.batchingColor,k.instancing=O.instancing,k.instancingColor=O.instancingColor,k.instancingMorph=O.instancingMorph,k.skinning=O.skinning,k.morphTargets=O.morphTargets,k.morphNormals=O.morphNormals,k.morphColors=O.morphColors,k.morphTargetsCount=O.morphTargetsCount,k.numClippingPlanes=O.numClippingPlanes,k.numIntersection=O.numClipIntersection,k.vertexAlphas=O.vertexAlphas,k.vertexTangents=O.vertexTangents,k.toneMapping=O.toneMapping}function je(E,O,k,H,N){O.isScene!==!0&&(O=Rt),mt.resetTextureUnits();const rt=O.fog,vt=H.isMeshStandardMaterial?O.environment:null,yt=R===null?b.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:xi,Et=(H.isMeshStandardMaterial?x:w).get(H.envMap||vt),Bt=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ot=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),wt=!!k.morphAttributes.position,Kt=!!k.morphAttributes.normal,le=!!k.morphAttributes.color;let te=oi;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(te=b.toneMapping);const xe=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Zt=xe!==void 0?xe.length:0,Lt=ft.get(H),Me=p.state.lights;if(X===!0&&(q===!0||E!==S)){const Ne=E===S&&H.id===L;At.setState(H,E,Ne)}let Jt=!1;H.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Me.state.version||Lt.outputColorSpace!==yt||N.isBatchedMesh&&Lt.batching===!1||!N.isBatchedMesh&&Lt.batching===!0||N.isBatchedMesh&&Lt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Lt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Lt.instancing===!1||!N.isInstancedMesh&&Lt.instancing===!0||N.isSkinnedMesh&&Lt.skinning===!1||!N.isSkinnedMesh&&Lt.skinning===!0||N.isInstancedMesh&&Lt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Lt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Lt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Lt.instancingMorph===!1&&N.morphTexture!==null||Lt.envMap!==Et||H.fog===!0&&Lt.fog!==rt||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==At.numPlanes||Lt.numIntersection!==At.numIntersection)||Lt.vertexAlphas!==Bt||Lt.vertexTangents!==Ot||Lt.morphTargets!==wt||Lt.morphNormals!==Kt||Lt.morphColors!==le||Lt.toneMapping!==te||Lt.morphTargetsCount!==Zt)&&(Jt=!0):(Jt=!0,Lt.__version=H.version);let Pe=Lt.currentProgram;Jt===!0&&(Pe=Mn(H,O,N));let Sn=!1,De=!1,Ln=!1;const he=Pe.getUniforms(),qe=Lt.uniforms;if(pt.useProgram(Pe.program)&&(Sn=!0,De=!0,Ln=!0),H.id!==L&&(L=H.id,De=!0),Sn||S!==E){he.setValue(C,"projectionMatrix",E.projectionMatrix),he.setValue(C,"viewMatrix",E.matrixWorldInverse);const Ne=he.map.cameraPosition;Ne!==void 0&&Ne.setValue(C,ot.setFromMatrixPosition(E.matrixWorld)),Ct.logarithmicDepthBuffer&&he.setValue(C,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&he.setValue(C,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,De=!0,Ln=!0)}if(N.isSkinnedMesh){he.setOptional(C,N,"bindMatrix"),he.setOptional(C,N,"bindMatrixInverse");const Ne=N.skeleton;Ne&&(Ne.boneTexture===null&&Ne.computeBoneTexture(),he.setValue(C,"boneTexture",Ne.boneTexture,mt))}N.isBatchedMesh&&(he.setOptional(C,N,"batchingTexture"),he.setValue(C,"batchingTexture",N._matricesTexture,mt),he.setOptional(C,N,"batchingIdTexture"),he.setValue(C,"batchingIdTexture",N._indirectTexture,mt),he.setOptional(C,N,"batchingColorTexture"),N._colorsTexture!==null&&he.setValue(C,"batchingColorTexture",N._colorsTexture,mt));const Si=k.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&v.update(N,k,Pe),(De||Lt.receiveShadow!==N.receiveShadow)&&(Lt.receiveShadow=N.receiveShadow,he.setValue(C,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(qe.envMap.value=Et,qe.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&O.environment!==null&&(qe.envMapIntensity.value=O.environmentIntensity),De&&(he.setValue(C,"toneMappingExposure",b.toneMappingExposure),Lt.needsLights&&ve(qe,Ln),rt&&H.fog===!0&&xt.refreshFogUniforms(qe,rt),xt.refreshMaterialUniforms(qe,H,J,G,p.state.transmissionRenderTarget[E.id]),so.upload(C,jn(Lt),qe,mt)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(so.upload(C,jn(Lt),qe,mt),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&he.setValue(C,"center",N.center),he.setValue(C,"modelViewMatrix",N.modelViewMatrix),he.setValue(C,"normalMatrix",N.normalMatrix),he.setValue(C,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Ne=H.uniformsGroups;for(let Os=0,Oo=Ne.length;Os<Oo;Os++){const vr=Ne[Os];qt.update(vr,Pe),qt.bind(vr,Pe)}}return Pe}function ve(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function Xe(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,O,k){ft.get(E.texture).__webglTexture=O,ft.get(E.depthTexture).__webglTexture=k;const H=ft.get(E);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=k===void 0,H.__autoAllocateDepthBuffer||bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){const k=ft.get(E);k.__webglFramebuffer=O,k.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,k=0){R=E,D=O,y=k;let H=!0,N=null,rt=!1,vt=!1;if(E){const Et=ft.get(E);if(Et.__useDefaultFramebuffer!==void 0)pt.bindFramebuffer(C.FRAMEBUFFER,null),H=!1;else if(Et.__webglFramebuffer===void 0)mt.setupRenderTarget(E);else if(Et.__hasExternalTextures)mt.rebindTextures(E,ft.get(E.texture).__webglTexture,ft.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const wt=E.depthTexture;if(Et.__boundDepthTexture!==wt){if(wt!==null&&ft.has(wt)&&(E.width!==wt.image.width||E.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");mt.setupDepthRenderbuffer(E)}}const Bt=E.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(vt=!0);const Ot=ft.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ot[O])?N=Ot[O][k]:N=Ot[O],rt=!0):E.samples>0&&mt.useMultisampledRTT(E)===!1?N=ft.get(E).__webglMultisampledFramebuffer:Array.isArray(Ot)?N=Ot[k]:N=Ot,M.copy(E.viewport),P.copy(E.scissor),F=E.scissorTest}else M.copy(ct).multiplyScalar(J).floor(),P.copy(ht).multiplyScalar(J).floor(),F=Mt;if(pt.bindFramebuffer(C.FRAMEBUFFER,N)&&H&&pt.drawBuffers(E,N),pt.viewport(M),pt.scissor(P),pt.setScissorTest(F),rt){const Et=ft.get(E.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+O,Et.__webglTexture,k)}else if(vt){const Et=ft.get(E.texture),Bt=O||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Et.__webglTexture,k||0,Bt)}L=-1},this.readRenderTargetPixels=function(E,O,k,H,N,rt,vt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=ft.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt){pt.bindFramebuffer(C.FRAMEBUFFER,yt);try{const Et=E.texture,Bt=Et.format,Ot=Et.type;if(!Ct.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-H&&k>=0&&k<=E.height-N&&C.readPixels(O,k,H,N,Dt.convert(Bt),Dt.convert(Ot),rt)}finally{const Et=R!==null?ft.get(R).__webglFramebuffer:null;pt.bindFramebuffer(C.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(E,O,k,H,N,rt,vt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=ft.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt){pt.bindFramebuffer(C.FRAMEBUFFER,yt);try{const Et=E.texture,Bt=Et.format,Ot=Et.type;if(!Ct.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-H&&k>=0&&k<=E.height-N){const wt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,wt),C.bufferData(C.PIXEL_PACK_BUFFER,rt.byteLength,C.STREAM_READ),C.readPixels(O,k,H,N,Dt.convert(Bt),Dt.convert(Ot),0),C.flush();const Kt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);await Fu(C,Kt,4);try{C.bindBuffer(C.PIXEL_PACK_BUFFER,wt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,rt)}finally{C.deleteBuffer(wt),C.deleteSync(Kt)}return rt}}finally{const Et=R!==null?ft.get(R).__webglFramebuffer:null;pt.bindFramebuffer(C.FRAMEBUFFER,Et)}}},this.copyFramebufferToTexture=function(E,O=null,k=0){E.isTexture!==!0&&($s("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);const H=Math.pow(2,-k),N=Math.floor(E.image.width*H),rt=Math.floor(E.image.height*H),vt=O!==null?O.x:0,yt=O!==null?O.y:0;mt.setTexture2D(E,0),C.copyTexSubImage2D(C.TEXTURE_2D,k,0,0,vt,yt,N,rt),pt.unbindTexture()},this.copyTextureToTexture=function(E,O,k=null,H=null,N=0){E.isTexture!==!0&&($s("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,E=arguments[1],O=arguments[2],N=arguments[3]||0,k=null);let rt,vt,yt,Et,Bt,Ot;k!==null?(rt=k.max.x-k.min.x,vt=k.max.y-k.min.y,yt=k.min.x,Et=k.min.y):(rt=E.image.width,vt=E.image.height,yt=0,Et=0),H!==null?(Bt=H.x,Ot=H.y):(Bt=0,Ot=0);const wt=Dt.convert(O.format),Kt=Dt.convert(O.type);mt.setTexture2D(O,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,O.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,O.unpackAlignment);const le=C.getParameter(C.UNPACK_ROW_LENGTH),te=C.getParameter(C.UNPACK_IMAGE_HEIGHT),xe=C.getParameter(C.UNPACK_SKIP_PIXELS),Zt=C.getParameter(C.UNPACK_SKIP_ROWS),Lt=C.getParameter(C.UNPACK_SKIP_IMAGES),Me=E.isCompressedTexture?E.mipmaps[N]:E.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,Me.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Me.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,yt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Et),E.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,N,Bt,Ot,rt,vt,wt,Kt,Me.data):E.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,N,Bt,Ot,Me.width,Me.height,wt,Me.data):C.texSubImage2D(C.TEXTURE_2D,N,Bt,Ot,rt,vt,wt,Kt,Me),C.pixelStorei(C.UNPACK_ROW_LENGTH,le),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,te),C.pixelStorei(C.UNPACK_SKIP_PIXELS,xe),C.pixelStorei(C.UNPACK_SKIP_ROWS,Zt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Lt),N===0&&O.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),pt.unbindTexture()},this.copyTextureToTexture3D=function(E,O,k=null,H=null,N=0){E.isTexture!==!0&&($s("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,H=arguments[1]||null,E=arguments[2],O=arguments[3],N=arguments[4]||0);let rt,vt,yt,Et,Bt,Ot,wt,Kt,le;const te=E.isCompressedTexture?E.mipmaps[N]:E.image;k!==null?(rt=k.max.x-k.min.x,vt=k.max.y-k.min.y,yt=k.max.z-k.min.z,Et=k.min.x,Bt=k.min.y,Ot=k.min.z):(rt=te.width,vt=te.height,yt=te.depth,Et=0,Bt=0,Ot=0),H!==null?(wt=H.x,Kt=H.y,le=H.z):(wt=0,Kt=0,le=0);const xe=Dt.convert(O.format),Zt=Dt.convert(O.type);let Lt;if(O.isData3DTexture)mt.setTexture3D(O,0),Lt=C.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)mt.setTexture2DArray(O,0),Lt=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,O.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,O.unpackAlignment);const Me=C.getParameter(C.UNPACK_ROW_LENGTH),Jt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Pe=C.getParameter(C.UNPACK_SKIP_PIXELS),Sn=C.getParameter(C.UNPACK_SKIP_ROWS),De=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,te.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,te.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Et),C.pixelStorei(C.UNPACK_SKIP_ROWS,Bt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ot),E.isDataTexture||E.isData3DTexture?C.texSubImage3D(Lt,N,wt,Kt,le,rt,vt,yt,xe,Zt,te.data):O.isCompressedArrayTexture?C.compressedTexSubImage3D(Lt,N,wt,Kt,le,rt,vt,yt,xe,te.data):C.texSubImage3D(Lt,N,wt,Kt,le,rt,vt,yt,xe,Zt,te),C.pixelStorei(C.UNPACK_ROW_LENGTH,Me),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Jt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Pe),C.pixelStorei(C.UNPACK_SKIP_ROWS,Sn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,De),N===0&&O.generateMipmaps&&C.generateMipmap(Lt),pt.unbindTexture()},this.initRenderTarget=function(E){ft.get(E).__webglFramebuffer===void 0&&mt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?mt.setTextureCube(E,0):E.isData3DTexture?mt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?mt.setTexture2DArray(E,0):mt.setTexture2D(E,0),pt.unbindTexture()},this.resetState=function(){D=0,y=0,R=null,pt.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===gl?"display-p3":"srgb",e.unpackColorSpace=ee.workingColorSpace===To?"display-p3":"srgb"}}class $_ extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Mi extends qi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const mo=new U,go=new U,Oc=new ce,Gs=new fr,Gr=new ur,ca=new U,Fc=new U;class Ns extends Ee{constructor(t=new Ce,e=new Mi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)mo.fromBufferAttribute(e,s-1),go.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=mo.distanceTo(go);t.setAttribute("lineDistance",new Ue(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Gr.copy(i.boundingSphere),Gr.applyMatrix4(s),Gr.radius+=r,t.ray.intersectsSphere(Gr)===!1)return;Oc.copy(s).invert(),Gs.copy(t.ray).applyMatrix4(Oc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const m=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=c){const f=h.getX(_),A=h.getX(_+1),b=Vr(this,t,Gs,l,f,A);b&&e.push(b)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(m),f=Vr(this,t,Gs,l,_,p);f&&e.push(f)}}else{const m=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=c){const f=Vr(this,t,Gs,l,_,_+1);f&&e.push(f)}if(this.isLineLoop){const _=Vr(this,t,Gs,l,g-1,m);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Vr(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(mo.fromBufferAttribute(o,s),go.fromBufferAttribute(o,r),e.distanceSqToSegment(mo,go,ca,Fc)>i)return;ca.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ca);if(!(l<t.near||l>t.far))return{distance:l,point:Fc.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,object:n}}class Sl extends qi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Bc=new ce,tl=new fr,Wr=new ur,Xr=new U;class $h extends Ee{constructor(t=new Ce,e=new Sl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wr.copy(i.boundingSphere),Wr.applyMatrix4(s),Wr.radius+=r,t.ray.intersectsSphere(Wr)===!1)return;Bc.copy(s).invert(),tl.copy(t.ray).applyMatrix4(Bc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let g=u,_=m;g<_;g++){const p=c.getX(g);Xr.fromBufferAttribute(d,p),zc(Xr,p,l,s,t,e,this)}}else{const u=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let g=u,_=m;g<_;g++)Xr.fromBufferAttribute(d,g),zc(Xr,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function zc(n,t,e,i,s,r,o){const a=tl.distanceSqToPoint(n);if(a<e){const l=new U;tl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}class Ro extends ze{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class yl extends Ce{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],m=[];let g=0;const _=[],p=i/2;let f=0;A(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Ue(d,3)),this.setAttribute("normal",new Ue(u,3)),this.setAttribute("uv",new Ue(m,2));function A(){const T=new U,D=new U;let y=0;const R=(e-t)/i;for(let L=0;L<=r;L++){const S=[],M=L/r,P=M*(e-t)+t;for(let F=0;F<=s;F++){const B=F/s,W=B*l+a,Y=Math.sin(W),G=Math.cos(W);D.x=P*Y,D.y=-M*i+p,D.z=P*G,d.push(D.x,D.y,D.z),T.set(Y,R,G).normalize(),u.push(T.x,T.y,T.z),m.push(B,1-M),S.push(g++)}_.push(S)}for(let L=0;L<s;L++)for(let S=0;S<r;S++){const M=_[S][L],P=_[S+1][L],F=_[S+1][L+1],B=_[S][L+1];h.push(M,P,B),h.push(P,F,B),y+=6}c.addGroup(f,y,0),f+=y}function b(T){const D=g,y=new zt,R=new U;let L=0;const S=T===!0?t:e,M=T===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,p*M,0),u.push(0,M,0),m.push(.5,.5),g++;const P=g;for(let F=0;F<=s;F++){const W=F/s*l+a,Y=Math.cos(W),G=Math.sin(W);R.x=S*G,R.y=p*M,R.z=S*Y,d.push(R.x,R.y,R.z),u.push(0,M,0),y.x=Y*.5+.5,y.y=G*.5*M+.5,m.push(y.x,y.y),g++}for(let F=0;F<s;F++){const B=D+F,W=P+F;T===!0?h.push(W,W+1,B):h.push(W+1,W,B),L+=3}c.addGroup(f,L,T===!0?1:2),f+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yl(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Yn extends Ce{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new U,u=new U,m=[],g=[],_=[],p=[];for(let f=0;f<=i;f++){const A=[],b=f/i;let T=0;f===0&&o===0?T=.5/e:f===i&&l===Math.PI&&(T=-.5/e);for(let D=0;D<=e;D++){const y=D/e;d.x=-t*Math.cos(s+y*r)*Math.sin(o+b*a),d.y=t*Math.cos(o+b*a),d.z=t*Math.sin(s+y*r)*Math.sin(o+b*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),p.push(y+T,1-b),A.push(c++)}h.push(A)}for(let f=0;f<i;f++)for(let A=0;A<e;A++){const b=h[f][A+1],T=h[f][A],D=h[f+1][A],y=h[f+1][A+1];(f!==0||o>0)&&m.push(b,T,y),(f!==i-1||l<Math.PI)&&m.push(T,D,y)}this.setIndex(m),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class El extends qi{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Yt(16777215),this.specular=new Yt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ph,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class j_ extends Mi{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}const kc={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(this.files[n]=t)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class K_{constructor(t,e,i){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const m=c[d],g=c[d+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}}const Z_=new K_;class bl{constructor(t){this.manager=t!==void 0?t:Z_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}bl.DEFAULT_MATERIAL_NAME="__DEFAULT";class J_ extends bl{constructor(t){super(t)}load(t,e,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=kc.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=sr("img");function l(){h(),kc.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),s&&s(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class Q_ extends bl{constructor(t){super(t)}load(t,e,i,s){const r=new ze,o=new J_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},i,s),r}}class jh extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const ha=new ce,Hc=new U,Gc=new U;class t0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xl,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new Ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Hc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hc),Gc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gc),e.updateMatrixWorld(),ha.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ha),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ha)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class e0 extends t0{constructor(){super(new Gh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Kh extends jh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new e0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class n0 extends jh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Vc=new ce;class i0{constructor(t,e,i=0,s=1/0){this.ray=new fr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new vl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Vc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vc),this}intersectObject(t,e=!0,i=[]){return el(t,this,i,e),i.sort(Wc),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)el(t[s],this,i,e);return i.sort(Wc),i}}function Wc(n,t){return n.distance-t.distance}function el(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)el(r[o],t,e,!0)}}class Xc{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Be(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const qc=new U;let qr,da;class Zh extends Ee{constructor(t=new U(0,0,1),e=new U(0,0,0),i=1,s=16776960,r=i*.2,o=r*.2){super(),this.type="ArrowHelper",qr===void 0&&(qr=new Ce,qr.setAttribute("position",new Ue([0,0,0,0,1,0],3)),da=new yl(0,.5,1,5,1),da.translate(0,-.5,0)),this.position.copy(e),this.line=new Ns(qr,new Mi({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ie(da,new Yi({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(i,r,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{qc.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(qc,e)}}setLength(t,e=t*.2,i=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(i,e,i),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class s0 extends Xi{constructor(t,e){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ll}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ll);const Yc={type:"change"},Tl={type:"start"},Jh={type:"end"},Yr=new fr,$c=new ni,r0=Math.cos(70*Ja.DEG2RAD),be=new U,Ye=2*Math.PI,se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ua=1e-6;class o0 extends s0{constructor(t,e=null){super(t,e),this.state=se.NONE,this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:vs.ROTATE,MIDDLE:vs.DOLLY,RIGHT:vs.PAN},this.touches={ONE:ps.ROTATE,TWO:ps.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new fi,this._lastTargetPosition=new U,this._quat=new fi().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xc,this._sphericalDelta=new Xc,this._scale=1,this._panOffset=new U,this._rotateStart=new zt,this._rotateEnd=new zt,this._rotateDelta=new zt,this._panStart=new zt,this._panEnd=new zt,this._panDelta=new zt,this._dollyStart=new zt,this._dollyEnd=new zt,this._dollyDelta=new zt,this._dollyDirection=new U,this._mouse=new zt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=l0.bind(this),this._onPointerDown=a0.bind(this),this._onPointerUp=c0.bind(this),this._onContextMenu=g0.bind(this),this._onMouseWheel=u0.bind(this),this._onKeyDown=f0.bind(this),this._onTouchStart=p0.bind(this),this._onTouchMove=m0.bind(this),this._onMouseDown=h0.bind(this),this._onMouseMove=d0.bind(this),this._interceptControlDown=_0.bind(this),this._interceptControlUp=v0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Yc),this.update(),this.state=se.NONE}update(t=null){const e=this.object.position;be.copy(e).sub(this.target),be.applyQuaternion(this._quat),this._spherical.setFromVector3(be),this.autoRotate&&this.state===se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ye:i>Math.PI&&(i-=Ye),s<-Math.PI?s+=Ye:s>Math.PI&&(s-=Ye),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(be.setFromSpherical(this._spherical),be.applyQuaternion(this._quatInverse),e.copy(this.target).add(be),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=be.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new U(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new U(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=be.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Yr.origin.copy(this.object.position),Yr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Yr.direction))<r0?this.object.lookAt(this.target):($c.setFromNormalAndCoplanarPoint(this.object.up,this.target),Yr.intersectPlane($c,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ua||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ua||this._lastTargetPosition.distanceToSquared(this.target)>ua?(this.dispatchEvent(Yc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ye/60*this.autoRotateSpeed*t:Ye/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){be.setFromMatrixColumn(e,0),be.multiplyScalar(-t),this._panOffset.add(be)}_panUp(t,e){this.screenSpacePanning===!0?be.setFromMatrixColumn(e,1):(be.setFromMatrixColumn(e,0),be.crossVectors(this.object.up,be)),be.multiplyScalar(t),this._panOffset.add(be)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;be.copy(s).sub(this.target);let r=be.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ye*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ye*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ye*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ye*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ye*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ye*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ye*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ye*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new zt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function a0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function l0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function c0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Jh),this.state=se.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function h0(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case vs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=se.DOLLY;break;case vs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=se.ROTATE}break;case vs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=se.PAN}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Tl)}function d0(n){switch(this.state){case se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function u0(n){this.enabled===!1||this.enableZoom===!1||this.state!==se.NONE||(n.preventDefault(),this.dispatchEvent(Tl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Jh))}function f0(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function p0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ps.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=se.TOUCH_ROTATE;break;case ps.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=se.TOUCH_PAN;break;default:this.state=se.NONE}break;case 2:switch(this.touches.TWO){case ps.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=se.TOUCH_DOLLY_PAN;break;case ps.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=se.TOUCH_DOLLY_ROTATE;break;default:this.state=se.NONE}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Tl)}function m0(n){switch(this._trackPointer(n),this.state){case se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=se.NONE}}function g0(n){this.enabled!==!1&&n.preventDefault()}function _0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function v0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Gi extends Ee{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new zt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const ds=new U,jc=new ce,Kc=new ce,Zc=new U,Jc=new U;class x0{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),jc.copy(_.matrixWorldInverse),Kc.multiplyMatrices(_.projectionMatrix,jc),h(g,g,_),m(g)},this.setSize=function(g,_){i=g,s=_,r=i/2,o=s/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,p=g.children.length;_<p;_++)c(g.children[_])}function h(g,_,p){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){ds.setFromMatrixPosition(g.matrixWorld),ds.applyMatrix4(Kc);const f=ds.z>=-1&&ds.z<=1&&g.layers.test(p.layers)===!0,A=g.element;A.style.display=f===!0?"":"none",f===!0&&(g.onBeforeRender(e,_,p),A.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(ds.x*r+r)+"px,"+(-ds.y*o+o)+"px)",A.parentNode!==l&&l.appendChild(A),g.onAfterRender(e,_,p));const b={distanceToCameraSquared:d(p,g)};a.objects.set(g,b)}for(let f=0,A=g.children.length;f<A;f++)h(g.children[f],_,p)}function d(g,_){return Zc.setFromMatrixPosition(g.matrixWorld),Jc.setFromMatrixPosition(_.matrixWorld),Zc.distanceToSquared(Jc)}function u(g){const _=[];return g.traverseVisible(function(p){p.isCSS2DObject&&_.push(p)}),_}function m(g){const _=u(g).sort(function(f,A){if(f.renderOrder!==A.renderOrder)return A.renderOrder-f.renderOrder;const b=a.objects.get(f).distanceToCameraSquared,T=a.objects.get(A).distanceToCameraSquared;return b-T}),p=_.length;for(let f=0,A=_.length;f<A;f++)_[f].element.style.zIndex=p-f}}}const $n=Math.PI,_e=$n*2,Ws=$n/180,M0=1440,S0=398600.8,Je=6378.135,Hn=60/Math.sqrt(Je*Je*Je/S0),fa=Je*Hn/60,y0=1/Hn,Oi=.001082616,E0=-253881e-11,b0=-165597e-11,Fi=E0/Oi,rr=2/3,pa=1440/(2*$n);function T0(n,t){const e=[31,n%4===0?29:28,31,30,31,30,31,31,30,31,30,31],i=Math.floor(t);let s=1,r=0;for(;i>r+e[s-1]&&s<12;)r+=e[s-1],s+=1;const o=s,a=i-r;let l=(t-i)*24;const c=Math.floor(l);l=(l-c)*60;const h=Math.floor(l),d=(l-h)*60;return{mon:o,day:a,hr:c,minute:h,sec:d}}function Qc(n,t,e,i,s,r,o=0){return 367*n-Math.floor(7*(n+Math.floor((t+9)/12))*.25)+Math.floor(275*t/9)+e+17210135e-1+((o/6e4+r/60+s)/60+i)/24}function Al(n,t,e,i,s,r,o=0){if(n instanceof Date){const a=n;return Qc(a.getUTCFullYear(),a.getUTCMonth()+1,a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds())}return Qc(n,t,e,i,s,r,o)}function Qh(n,t){const{e3:e,ee2:i,peo:s,pgho:r,pho:o,pinco:a,plo:l,se2:c,se3:h,sgh2:d,sgh3:u,sgh4:m,sh2:g,sh3:_,si2:p,si3:f,sl2:A,sl3:b,sl4:T,t:D,xgh2:y,xgh3:R,xgh4:L,xh2:S,xh3:M,xi2:P,xi3:F,xl2:B,xl3:W,xl4:Y,zmol:G,zmos:J}=n,{init:V,opsmode:it}=t;let{ep:ct,inclp:ht,nodep:Mt,argpp:Ut,mp:X}=t,q,tt,ot,_t,Rt,St,Vt,C,Gt,bt,Ct,pt,It,ft,mt,w,x,z,$,j,K;const xt=119459e-10,st=.01675,lt=.00015835218,At=.0549;K=J+xt*D,V==="y"&&(K=J),j=K+2*st*Math.sin(K),x=Math.sin(j),bt=.5*x*x-.25,Ct=-.5*x*Math.cos(j);const et=c*bt+h*Ct,ut=p*bt+f*Ct,v=A*bt+b*Ct+T*x,Tt=d*bt+u*Ct+m*x,dt=g*bt+_*Ct;K=G+lt*D,V==="y"&&(K=G),j=K+2*At*Math.sin(K),x=Math.sin(j),bt=.5*x*x-.25,Ct=-.5*x*Math.cos(j);const Dt=i*bt+e*Ct,Nt=P*bt+F*Ct,qt=B*bt+W*Ct+Y*x,I=y*bt+R*Ct+L*x,nt=S*bt+M*Ct;return pt=et+Dt,mt=ut+Nt,w=v+qt,It=Tt+I,ft=dt+nt,V==="n"&&(pt-=s,mt-=a,w-=l,It-=r,ft-=o,ht+=mt,ct+=pt,_t=Math.sin(ht),ot=Math.cos(ht),ht>=.2?(ft/=_t,It-=ot*ft,Ut+=It,Mt+=ft,X+=w):(St=Math.sin(Mt),Rt=Math.cos(Mt),q=_t*St,tt=_t*Rt,Vt=ft*Rt+mt*ot*St,C=-ft*St+mt*ot*Rt,q+=Vt,tt+=C,Mt%=_e,Mt<0&&it==="a"&&(Mt+=_e),z=X+Ut+ot*Mt,Gt=w+It-mt*Mt*_t,z+=Gt,$=Mt,Mt=Math.atan2(q,tt),Mt<0&&it==="a"&&(Mt+=_e),Math.abs($-Mt)>$n&&(Mt<$?Mt+=_e:Mt-=_e),X+=w,Ut=z-X-ot*Mt)),{ep:ct,inclp:ht,nodep:Mt,argpp:Ut,mp:X}}function A0(n){const{epoch:t,ep:e,argpp:i,tc:s,inclp:r,nodep:o,np:a}=n;let l,c,h,d,u,m,g,_,p,f,A,b,T,D,y,R,L,S,M,P,F,B,W,Y,G,J,V,it,ct,ht,Mt,Ut,X,q,tt,ot,_t,Rt,St,Vt,C,Gt,bt,Ct,pt,It,ft,mt,w,x,z,$,j,K,xt,st,lt,At,et,ut,v,Tt,dt;const Dt=.01675,Nt=.0549,qt=29864797e-13,I=47968065e-14,nt=.39785416,Q=.91744867,Z=.1945905,at=-.98088458,Pt=a,Ft=e,$t=Math.sin(o),ie=Math.cos(o),kt=Math.sin(i),fe=Math.cos(i),oe=Math.sin(r),Ht=Math.cos(r),ae=Ft*Ft,Se=1-ae,nn=Math.sqrt(Se),Qt=0,xn=0,Pn=0,Mn=0,jn=0,sn=t+18261.5+s/1440,je=(4.523602-.00092422029*sn)%_e,ve=Math.sin(je),Xe=Math.cos(je),E=.91375164-.03568096*Xe,O=Math.sqrt(1-E*E),k=.089683511*ve/O,H=Math.sqrt(1-k*k),N=5.8351514+.001944368*sn;let rt=.39785416*ve/O;const vt=H*Xe+.91744867*k*ve;rt=Math.atan2(rt,vt),rt+=N-je;const yt=Math.cos(rt),Et=Math.sin(rt);P=Z,F=at,Y=Q,G=nt,B=ie,W=$t,A=qt;const Bt=1/Pt;let Ot=0;for(;Ot<2;)Ot+=1,l=P*B+F*Y*W,h=-F*B+P*Y*W,g=-P*W+F*Y*B,_=F*G,p=F*W+P*Y*B,f=P*G,c=Ht*g+oe*_,d=Ht*p+oe*f,u=-oe*g+Ht*_,m=-oe*p+Ht*f,b=l*fe+c*kt,T=h*fe+d*kt,D=-l*kt+c*fe,y=-h*kt+d*fe,R=u*kt,L=m*kt,S=u*fe,M=m*fe,v=12*b*b-3*D*D,Tt=24*b*T-6*D*y,dt=12*T*T-3*y*y,$=3*(l*l+c*c)+v*ae,j=6*(l*h+c*d)+Tt*ae,K=3*(h*h+d*d)+dt*ae,xt=-6*l*u+ae*(-24*b*S-6*D*R),st=-6*(l*m+h*u)+ae*(-24*(T*S+b*M)+-6*(D*L+y*R)),lt=-6*h*m+ae*(-24*T*M-6*y*L),At=6*c*u+ae*(24*b*R-6*D*S),et=6*(d*u+c*m)+ae*(24*(T*R+b*L)-6*(y*S+D*M)),ut=6*d*m+ae*(24*T*L-6*y*M),$=$+$+Se*v,j=j+j+Se*Tt,K=K+K+Se*dt,ft=A*Bt,It=-.5*ft/nn,mt=ft*nn,pt=-15*Ft*mt,w=b*D+T*y,x=T*D+b*y,z=T*y-b*D,Ot===1&&(J=pt,V=It,it=ft,ct=mt,ht=w,Mt=x,Ut=z,X=$,q=j,tt=K,ot=xt,_t=st,Rt=lt,St=At,Vt=et,C=ut,Gt=v,bt=Tt,Ct=dt,P=yt,F=Et,Y=E,G=O,B=H*ie+k*$t,W=$t*H-ie*k,A=I);const wt=(4.7199672+(.2299715*sn-N))%_e,Kt=(6.2565837+.017201977*sn)%_e,le=2*J*Mt,te=2*J*Ut,xe=2*V*_t,Zt=2*V*(Rt-ot),Lt=-2*it*q,Me=-2*it*(tt-X),Jt=-2*it*(-21-9*ae)*Dt,Pe=2*ct*bt,Sn=2*ct*(Ct-Gt),De=-18*ct*Dt,Ln=-2*V*Vt,he=-2*V*(C-St),qe=2*pt*x,Si=2*pt*z,Ne=2*It*st,Os=2*It*(lt-xt),Oo=-2*ft*j,vr=-2*ft*(K-$),Md=-2*ft*(-21-9*ae)*Nt,Sd=2*mt*Tt,yd=2*mt*(dt-v),Ed=-18*mt*Nt,bd=-2*It*et,Td=-2*It*(ut-At);return{snodm:$t,cnodm:ie,sinim:oe,cosim:Ht,sinomm:kt,cosomm:fe,day:sn,e3:Si,ee2:qe,em:Ft,emsq:ae,gam:N,peo:Qt,pgho:Mn,pho:jn,pinco:xn,plo:Pn,rtemsq:nn,se2:le,se3:te,sgh2:Pe,sgh3:Sn,sgh4:De,sh2:Ln,sh3:he,si2:xe,si3:Zt,sl2:Lt,sl3:Me,sl4:Jt,s1:pt,s2:It,s3:ft,s4:mt,s5:w,s6:x,s7:z,ss1:J,ss2:V,ss3:it,ss4:ct,ss5:ht,ss6:Mt,ss7:Ut,sz1:X,sz2:q,sz3:tt,sz11:ot,sz12:_t,sz13:Rt,sz21:St,sz22:Vt,sz23:C,sz31:Gt,sz32:bt,sz33:Ct,xgh2:Sd,xgh3:yd,xgh4:Ed,xh2:bd,xh3:Td,xi2:Ne,xi3:Os,xl2:Oo,xl3:vr,xl4:Md,nm:Pt,z1:$,z2:j,z3:K,z11:xt,z12:st,z13:lt,z21:At,z22:et,z23:ut,z31:v,z32:Tt,z33:dt,zmol:wt,zmos:Kt}}function w0(n){const{cosim:t,argpo:e,s1:i,s2:s,s3:r,s4:o,s5:a,sinim:l,ss1:c,ss2:h,ss3:d,ss4:u,ss5:m,sz1:g,sz3:_,sz11:p,sz13:f,sz21:A,sz23:b,sz31:T,sz33:D,t:y,tc:R,gsto:L,mo:S,mdot:M,no:P,nodeo:F,nodedot:B,xpidot:W,z1:Y,z3:G,z11:J,z13:V,z21:it,z23:ct,z31:ht,z33:Mt,ecco:Ut,eccsq:X}=n;let{emsq:q,em:tt,argpm:ot,inclm:_t,mm:Rt,nm:St,nodem:Vt,irez:C,atime:Gt,d2201:bt,d2211:Ct,d3210:pt,d3222:It,d4410:ft,d4422:mt,d5220:w,d5232:x,d5421:z,d5433:$,dedt:j,didt:K,dmdt:xt,dnodt:st,domdt:lt,del1:At,del2:et,del3:ut,xfact:v,xlamo:Tt,xli:dt,xni:Dt}=n,Nt,qt,I,nt,Q,Z,at,Pt,Ft,$t,ie,kt,fe,oe,Ht,ae,Se,nn,Qt,xn,Pn,Mn,jn,sn,je,ve,Xe,E,O,k,H,N;const rt=17891679e-13,vt=21460748e-13,yt=22123015e-14,Et=17891679e-13,Bt=73636953e-16,Ot=21765803e-16,wt=.0043752690880113,Kt=37393792e-14,le=11428639e-14,te=.00015835218,xe=119459e-10;C=0,St<.0052359877&&St>.0034906585&&(C=1),St>=.00826&&St<=.00924&&tt>=.5&&(C=2);const Zt=c*xe*m,Lt=h*xe*(p+f),Me=-xe*d*(g+_-14-6*q),Jt=u*xe*(T+D-6);let Pe=-xe*h*(A+b);(_t<.052359877||_t>$n-.052359877)&&(Pe=0),l!==0&&(Pe/=l);const Sn=Jt-t*Pe;j=Zt+i*te*a,K=Lt+s*te*(J+V),xt=Me-te*r*(Y+G-14-6*q);const De=o*te*(ht+Mt-6);let Ln=-te*s*(it+ct);(_t<.052359877||_t>$n-.052359877)&&(Ln=0),lt=Sn+De,st=Pe,l!==0&&(lt-=t/l*Ln,st+=Ln/l);const he=0,qe=(L+R*wt)%_e;if(tt+=j*y,_t+=K*y,ot+=lt*y,Vt+=st*y,Rt+=xt*y,C!==0){if(k=(St/Hn)**rr,C===2){H=t*t;const Si=tt;tt=Ut;const Ne=q;q=X,N=tt*q,oe=-.306-(tt-.64)*.44,tt<=.65?(Ht=3.616-13.247*tt+16.29*q,Se=-19.302+117.39*tt-228.419*q+156.591*N,nn=-18.9068+109.7927*tt-214.6334*q+146.5816*N,Qt=-41.122+242.694*tt-471.094*q+313.953*N,xn=-146.407+841.88*tt-1629.014*q+1083.435*N,Pn=-532.114+3017.977*tt-5740.032*q+3708.276*N):(Ht=-72.099+331.819*tt-508.738*q+266.724*N,Se=-346.844+1582.851*tt-2415.925*q+1246.113*N,nn=-342.585+1554.908*tt-2366.899*q+1215.972*N,Qt=-1052.797+4758.686*tt-7193.992*q+3651.957*N,xn=-3581.69+16178.11*tt-24462.77*q+12422.52*N,tt>.715?Pn=-5149.66+29936.92*tt-54087.36*q+31324.56*N:Pn=1464.74-4664.75*tt+3763.64*q),tt<.7?(sn=-919.2277+4988.61*tt-9064.77*q+5542.21*N,Mn=-822.71072+4568.6173*tt-8491.4146*q+5337.524*N,jn=-853.666+4690.25*tt-8624.77*q+5341.4*N):(sn=-37995.78+161616.52*tt-229838.2*q+109377.94*N,Mn=-51752.104+218913.95*tt-309468.16*q+146349.42*N,jn=-40023.88+170470.89*tt-242699.48*q+115605.82*N),je=l*l,Nt=.75*(1+2*t+H),qt=1.5*je,nt=1.875*l*(1-2*t-3*H),Q=-1.875*l*(1+2*t-3*H),at=35*je*Nt,Pt=39.375*je*je,Ft=9.84375*l*(je*(1-2*t-5*H)+.33333333*(-2+4*t+6*H)),$t=l*(4.92187512*je*(-2-4*t+10*H)+6.56250012*(1+2*t-3*H)),ie=29.53125*l*(2-8*t+H*(-12+8*t+10*H)),kt=29.53125*l*(-2-8*t+H*(12+8*t-10*H)),E=St*St,O=k*k,Xe=3*E*O,ve=Xe*Et,bt=ve*Nt*oe,Ct=ve*qt*Ht,Xe*=k,ve=Xe*Kt,pt=ve*nt*Se,It=ve*Q*nn,Xe*=k,ve=2*Xe*Bt,ft=ve*at*Qt,mt=ve*Pt*xn,Xe*=k,ve=Xe*le,w=ve*Ft*Pn,x=ve*$t*jn,ve=2*Xe*Ot,z=ve*ie*Mn,$=ve*kt*sn,Tt=(S+F+F-(qe+qe))%_e,v=M+xt+2*(B+st-wt)-P,tt=Si,q=Ne}C===1&&(fe=1+q*(-2.5+.8125*q),Se=1+2*q,ae=1+q*(-6+6.60937*q),Nt=.75*(1+t)*(1+t),I=.9375*l*l*(1+3*t)-.75*(1+t),Z=1+t,Z*=1.875*Z*Z,At=3*St*St*k*k,et=2*At*Nt*fe*rt,ut=3*At*Z*ae*yt*k,At=At*I*Se*vt*k,Tt=(S+F+e-qe)%_e,v=M+W+xt+lt+st-(P+wt)),dt=Tt,Dt=P,Gt=0,St=P+he}return{em:tt,argpm:ot,inclm:_t,mm:Rt,nm:St,nodem:Vt,irez:C,atime:Gt,d2201:bt,d2211:Ct,d3210:pt,d3222:It,d4410:ft,d4422:mt,d5220:w,d5232:x,d5421:z,d5433:$,dedt:j,didt:K,dmdt:xt,dndt:he,dnodt:st,domdt:lt,del1:At,del2:et,del3:ut,xfact:v,xlamo:Tt,xli:dt,xni:Dt}}function th(n){const t=(n-2451545)/36525;let e=-62e-7*t*t*t+.093104*t*t+(876600*3600+8640184812866e-6)*t+67310.54841;return e=e*Ws/240%_e,e<0&&(e+=_e),e}function R0(n,t,e,i,s,r,o){return n instanceof Date?th(Al(n)):th(n)}function C0(n){const{ecco:t,epoch:e,inclo:i,opsmode:s}=n;let{no:r}=n;const o=t*t,a=1-o,l=Math.sqrt(a),c=Math.cos(i),h=c*c,d=(Hn/r)**rr,u=.75*Oi*(3*h-1)/(l*a);let m=u/(d*d);const g=d*(1-m*m-m*(1/3+134*m*m/81));m=u/(g*g),r/=1+m;const _=(Hn/r)**rr,p=Math.sin(i),f=_*a,A=1-5*h,b=-A-h-h,T=1/_,D=f*f,y=_*(1-t),R="n";let L;if(s==="a"){const S=e-7305,M=Math.floor(S+1e-8),P=S-M,F=.017202791694070362,B=1.7321343856509375,W=5075514194322695e-30,Y=F+_e;L=(B+F*M+Y*P+S*S*W)%_e,L<0&&(L+=_e)}else L=R0(e+24332815e-1);return{no:r,method:R,ainv:T,ao:_,con41:b,con42:A,cosio:c,cosio2:h,eccsq:o,omeosq:a,posq:D,rp:y,rteosq:l,sinio:p,gsto:L}}function P0(n){const{irez:t,d2201:e,d2211:i,d3210:s,d3222:r,d4410:o,d4422:a,d5220:l,d5232:c,d5421:h,d5433:d,dedt:u,del1:m,del2:g,del3:_,didt:p,dmdt:f,dnodt:A,domdt:b,argpo:T,argpdot:D,t:y,tc:R,gsto:L,xfact:S,xlamo:M,no:P}=n;let{atime:F,em:B,argpm:W,inclm:Y,xli:G,mm:J,xni:V,nodem:it,nm:ct}=n;const ht=.13130908,Mt=2.8843198,Ut=.37448087,X=5.7686396,q=.95240898,tt=1.8014998,ot=1.050833,_t=4.4108898,Rt=.0043752690880113,St=720,Vt=-720,C=259200;let Gt,bt,Ct,pt,It,ft,mt,w,x=0,z=0;const $=(L+R*Rt)%_e;if(B+=u*y,Y+=p*y,W+=b*y,it+=A*y,J+=f*y,t!==0){(F===0||y*F<=0||Math.abs(y)<Math.abs(F))&&(F=0,V=P,G=M),y>0?Gt=St:Gt=Vt;let j=381;for(;j===381;)t!==2?(mt=m*Math.sin(G-ht)+g*Math.sin(2*(G-Mt))+_*Math.sin(3*(G-Ut)),It=V+S,ft=m*Math.cos(G-ht)+2*g*Math.cos(2*(G-Mt))+3*_*Math.cos(3*(G-Ut)),ft*=It):(w=T+D*F,Ct=w+w,bt=G+G,mt=e*Math.sin(Ct+G-X)+i*Math.sin(G-X)+s*Math.sin(w+G-q)+r*Math.sin(-w+G-q)+o*Math.sin(Ct+bt-tt)+a*Math.sin(bt-tt)+l*Math.sin(w+G-ot)+c*Math.sin(-w+G-ot)+h*Math.sin(w+bt-_t)+d*Math.sin(-w+bt-_t),It=V+S,ft=e*Math.cos(Ct+G-X)+i*Math.cos(G-X)+s*Math.cos(w+G-q)+r*Math.cos(-w+G-q)+l*Math.cos(w+G-ot)+c*Math.cos(-w+G-ot)+2*(o*Math.cos(Ct+bt-tt)+a*Math.cos(bt-tt)+h*Math.cos(w+bt-_t)+d*Math.cos(-w+bt-_t)),ft*=It),Math.abs(y-F)>=St?j=381:(z=y-F,j=0),j===381&&(G+=It*Gt+mt*C,V+=mt*Gt+ft*C,F+=Gt);ct=V+mt*z+ft*z*z*.5,pt=G+It*z+mt*z*z*.5,t!==1?(J=pt-2*it+2*$,x=ct-P):(J=pt-it-W+$,x=ct-P),ct=P+x}return{atime:F,em:B,argpm:W,inclm:Y,xli:G,mm:J,xni:V,nodem:it,dndt:x,nm:ct}}var ii;(function(n){n[n.None=0]="None",n[n.MeanEccentricityOutOfRange=1]="MeanEccentricityOutOfRange",n[n.MeanMotionBelowZero=2]="MeanMotionBelowZero",n[n.PerturbedEccentricityOutOfRange=3]="PerturbedEccentricityOutOfRange",n[n.SemiLatusRectumBelowZero=4]="SemiLatusRectumBelowZero",n[n.Decayed=6]="Decayed"})(ii||(ii={}));function td(n,t){let e,i,s,r,o,a,l,c,h,d,u,m,g,_,p,f,A,b,T,D,y,R,L,S,M,P,F;n.t=t,n.error=ii.None;const W=n.mo+n.mdot*n.t,Y=n.argpo+n.argpdot*n.t,G=n.nodeo+n.nodedot*n.t;h=Y,y=W;const J=n.t*n.t;if(L=G+n.nodecf*J,A=1-n.cc1*n.t,b=n.bstar*n.cc4*n.t,T=n.t2cof*J,n.isimp!==1){l=n.omgcof*n.t;const Ft=1+n.eta*Math.cos(W);a=n.xmcof*(Ft*Ft*Ft-n.delmo),f=l+a,y=W+f,h=Y-f,m=J*n.t,g=m*n.t,A=A-n.d2*J-n.d3*m-n.d4*g,b+=n.bstar*n.cc5*(Math.sin(y)-n.sinmao),T=T+n.t3cof*m+g*(n.t4cof+n.t*n.t5cof)}R=n.no;let V=n.ecco;if(D=n.inclo,n.method==="d"){_=n.t;const Ft={irez:n.irez,d2201:n.d2201,d2211:n.d2211,d3210:n.d3210,d3222:n.d3222,d4410:n.d4410,d4422:n.d4422,d5220:n.d5220,d5232:n.d5232,d5421:n.d5421,d5433:n.d5433,dedt:n.dedt,del1:n.del1,del2:n.del2,del3:n.del3,didt:n.didt,dmdt:n.dmdt,dnodt:n.dnodt,domdt:n.domdt,argpo:n.argpo,argpdot:n.argpdot,t:n.t,tc:_,gsto:n.gsto,xfact:n.xfact,xlamo:n.xlamo,no:n.no,atime:n.atime,em:V,argpm:h,inclm:D,xli:n.xli,mm:y,xni:n.xni,nodem:L,nm:R};({em:V,argpm:h,inclm:D,mm:y,nodem:L,nm:R}=P0(Ft))}if(R<=0)return n.error=ii.MeanMotionBelowZero,null;const it=(Hn/R)**rr*A*A;if(R=Hn/it**1.5,V-=b,V>=1||V<-.001)return n.error=ii.MeanEccentricityOutOfRange,null;V<1e-6&&(V=1e-6),y+=n.no*T,M=y+h+L,L%=_e,h%=_e,M%=_e,y=(M-h-L)%_e;const ct={am:it,em:V,im:D,Om:L,om:h,mm:y,nm:R},ht=Math.sin(D),Mt=Math.cos(D);let Ut=V;if(S=D,d=h,F=L,P=y,r=ht,s=Mt,n.method==="d"){const Ft={inclo:n.inclo,init:"n",ep:Ut,inclp:S,nodep:F,argpp:d,mp:P,opsmode:n.operationmode},$t=Qh(n,Ft);if({ep:Ut,nodep:F,argpp:d,mp:P}=$t,S=$t.inclp,S<0&&(S=-S,F+=$n,d-=$n),Ut<0||Ut>1)return n.error=ii.PerturbedEccentricityOutOfRange,null}n.method==="d"&&(r=Math.sin(S),s=Math.cos(S),n.aycof=-.5*Fi*r,Math.abs(s+1)>15e-13?n.xlcof=-.25*Fi*r*(3+5*s)/(1+s):n.xlcof=-.25*Fi*r*(3+5*s)/15e-13);const X=Ut*Math.cos(d);f=1/(it*(1-Ut*Ut));const q=Ut*Math.sin(d)+f*n.aycof,ot=(P+d+F+f*n.xlcof*X-F)%_e;c=ot,p=9999.9;let _t=1;for(;Math.abs(p)>=1e-12&&_t<=10;)i=Math.sin(c),e=Math.cos(c),p=1-e*X-i*q,p=(ot-q*e+X*i-c)/p,Math.abs(p)>=.95&&(p>0?p=.95:p=-.95),c+=p,_t+=1;const Rt=X*e+q*i,St=X*i-q*e,Vt=X*X+q*q,C=it*(1-Vt);if(C<0)return n.error=ii.SemiLatusRectumBelowZero,null;const Gt=it*(1-Rt),bt=Math.sqrt(it)*St/Gt,Ct=Math.sqrt(C)/Gt,pt=Math.sqrt(1-Vt);f=St/(1+pt);const It=it/Gt*(i-q-X*f),ft=it/Gt*(e-X+q*f);u=Math.atan2(It,ft);const mt=(ft+ft)*It,w=1-2*It*It;f=1/C;const x=.5*Oi*f,z=x*f;n.method==="d"&&(o=s*s,n.con41=3*o-1,n.x1mth2=1-o,n.x7thm1=7*o-1);const $=Gt*(1-1.5*z*pt*n.con41)+.5*x*n.x1mth2*w;if($<1)return n.error=ii.Decayed,null;u-=.25*z*n.x7thm1*mt;const j=F+1.5*z*s*mt,K=S+1.5*z*s*r*w,xt=bt-R*x*n.x1mth2*mt/Hn,st=Ct+R*x*(n.x1mth2*w+1.5*n.con41)/Hn,lt=Math.sin(u),At=Math.cos(u),et=Math.sin(j),ut=Math.cos(j),v=Math.sin(K),Tt=Math.cos(K),dt=-et*Tt,Dt=ut*Tt,Nt=dt*lt+ut*At,qt=Dt*lt+et*At,I=v*lt,nt=dt*At-ut*lt,Q=Dt*At-et*lt,Z=v*At,at={x:$*Nt*Je,y:$*qt*Je,z:$*I*Je},Pt={x:(xt*Nt+st*nt)*fa,y:(xt*qt+st*Q)*fa,z:(xt*I+st*Z)*fa};return{position:at,velocity:Pt,meanElements:ct}}function L0(n,t){const{opsmode:e,epoch:i,xbstar:s,xecco:r,xargpo:o,xinclo:a,xmo:l,xno:c,xnodeo:h}=t;let d,u,m,g,_,p,f,A,b,T,D,y,R,L,S,M,P,F,B,W,Y,G,J,V,it,ct,ht,Mt,Ut,X,q,tt,ot,_t,Rt,St,Vt,C,Gt,bt,Ct,pt,It,ft,mt,w,x,z,$,j,K,xt,st,lt,At,et;const ut=15e-13,v=n;v.isimp=0,v.method="n",v.aycof=0,v.con41=0,v.cc1=0,v.cc4=0,v.cc5=0,v.d2=0,v.d3=0,v.d4=0,v.delmo=0,v.eta=0,v.argpdot=0,v.omgcof=0,v.sinmao=0,v.t=0,v.t2cof=0,v.t3cof=0,v.t4cof=0,v.t5cof=0,v.x1mth2=0,v.x7thm1=0,v.mdot=0,v.nodedot=0,v.xlcof=0,v.xmcof=0,v.nodecf=0,v.irez=0,v.d2201=0,v.d2211=0,v.d3210=0,v.d3222=0,v.d4410=0,v.d4422=0,v.d5220=0,v.d5232=0,v.d5421=0,v.d5433=0,v.dedt=0,v.del1=0,v.del2=0,v.del3=0,v.didt=0,v.dmdt=0,v.dnodt=0,v.domdt=0,v.e3=0,v.ee2=0,v.peo=0,v.pgho=0,v.pho=0,v.pinco=0,v.plo=0,v.se2=0,v.se3=0,v.sgh2=0,v.sgh3=0,v.sgh4=0,v.sh2=0,v.sh3=0,v.si2=0,v.si3=0,v.sl2=0,v.sl3=0,v.sl4=0,v.gsto=0,v.xfact=0,v.xgh2=0,v.xgh3=0,v.xgh4=0,v.xh2=0,v.xh3=0,v.xi2=0,v.xi3=0,v.xl2=0,v.xl3=0,v.xl4=0,v.xlamo=0,v.zmol=0,v.zmos=0,v.atime=0,v.xli=0,v.xni=0,v.bstar=s,v.ecco=r,v.argpo=o,v.inclo=a,v.mo=l,v.no=c,v.nodeo=h,v.operationmode=e;const Tt=78/Je+1,dt=42/Je,Dt=dt*dt*dt*dt;v.init="y",v.t=0;const Nt={ecco:v.ecco,epoch:i,inclo:v.inclo,no:v.no,method:v.method,opsmode:v.operationmode},qt=C0(Nt),{ao:I,con42:nt,cosio:Q,cosio2:Z,eccsq:at,omeosq:Pt,posq:Ft,rp:$t,rteosq:ie,sinio:kt}=qt;if(v.no=qt.no,v.con41=qt.con41,v.gsto=qt.gsto,v.a=(v.no*y0)**(-2/3),v.alta=v.a*(1+v.ecco)-1,v.altp=v.a*(1-v.ecco)-1,v.error=0,Pt>=0||v.no>=0){if(v.isimp=0,$t<220/Je+1&&(v.isimp=1),ht=Tt,Y=Dt,F=($t-1)*Je,F<156){ht=F-78,F<98&&(ht=20);const oe=(120-ht)/Je;Y=oe*oe*oe*oe,ht=ht/Je+1}B=1/Ft,w=1/(I-ht),v.eta=I*v.ecco*w,y=v.eta*v.eta,D=v.ecco*v.eta,W=Math.abs(1-y),p=Y*w**4,f=p/W**3.5,g=f*v.no*(I*(1+1.5*y+D*(4+y))+.375*Oi*w/W*v.con41*(8+3*y*(8+y))),v.cc1=v.bstar*g,_=0,v.ecco>1e-4&&(_=-2*p*w*Fi*v.no*kt/v.ecco),v.x1mth2=1-Z,v.cc4=2*v.no*f*I*Pt*(v.eta*(2+.5*y)+v.ecco*(.5+2*y)-Oi*w/(I*W)*(-3*v.con41*(1-2*D+y*(1.5-.5*D))+.75*v.x1mth2*(2*y-D*(1+y))*Math.cos(2*v.argpo))),v.cc5=2*f*I*Pt*(1+2.75*(y+D)+D*y),A=Z*Z,It=1.5*Oi*B*v.no,ft=.5*It*Oi*B,mt=-.46875*b0*B*B*v.no,v.mdot=v.no+.5*It*ie*v.con41+.0625*ft*ie*(13-78*Z+137*A),v.argpdot=-.5*It*nt+.0625*ft*(7-114*Z+395*A)+mt*(3-36*Z+49*A),z=-It*Q,v.nodedot=z+(.5*ft*(4-19*Z)+2*mt*(3-7*Z))*Q,x=v.argpdot+v.nodedot,v.omgcof=v.bstar*_*Math.cos(v.argpo),v.xmcof=0,v.ecco>1e-4&&(v.xmcof=-rr*p*v.bstar/D),v.nodecf=3.5*Pt*z*v.cc1,v.t2cof=1.5*v.cc1,Math.abs(Q+1)>15e-13?v.xlcof=-.25*Fi*kt*(3+5*Q)/(1+Q):v.xlcof=-.25*Fi*kt*(3+5*Q)/ut,v.aycof=-.5*Fi*kt;const fe=1+v.eta*Math.cos(v.mo);if(v.delmo=fe*fe*fe,v.sinmao=Math.sin(v.mo),v.x7thm1=7*Z-1,2*$n/v.no>=225){v.method="d",v.isimp=1,Ct=0,S=v.inclo;const oe={epoch:i,ep:v.ecco,argpp:v.argpo,tc:Ct,inclp:v.inclo,nodep:v.nodeo,np:v.no,e3:v.e3,ee2:v.ee2,peo:v.peo,pgho:v.pgho,pho:v.pho,pinco:v.pinco,plo:v.plo,se2:v.se2,se3:v.se3,sgh2:v.sgh2,sgh3:v.sgh3,sgh4:v.sgh4,sh2:v.sh2,sh3:v.sh3,si2:v.si2,si3:v.si3,sl2:v.sl2,sl3:v.sl3,sl4:v.sl4,xgh2:v.xgh2,xgh3:v.xgh3,xgh4:v.xgh4,xh2:v.xh2,xh3:v.xh3,xi2:v.xi2,xi3:v.xi3,xl2:v.xl2,xl3:v.xl3,xl4:v.xl4,zmol:v.zmol,zmos:v.zmos},Ht=A0(oe);v.e3=Ht.e3,v.ee2=Ht.ee2,v.peo=Ht.peo,v.pgho=Ht.pgho,v.pho=Ht.pho,v.pinco=Ht.pinco,v.plo=Ht.plo,v.se2=Ht.se2,v.se3=Ht.se3,v.sgh2=Ht.sgh2,v.sgh3=Ht.sgh3,v.sgh4=Ht.sgh4,v.sh2=Ht.sh2,v.sh3=Ht.sh3,v.si2=Ht.si2,v.si3=Ht.si3,v.sl2=Ht.sl2,v.sl3=Ht.sl3,v.sl4=Ht.sl4,{sinim:u,cosim:d,em:b,emsq:T,s1:G,s2:J,s3:V,s4:it,s5:ct,ss1:Mt,ss2:Ut,ss3:X,ss4:q,ss5:tt,sz1:ot,sz3:_t,sz11:Rt,sz13:St,sz21:Vt,sz23:C,sz31:Gt,sz33:bt}=Ht,v.xgh2=Ht.xgh2,v.xgh3=Ht.xgh3,v.xgh4=Ht.xgh4,v.xh2=Ht.xh2,v.xh3=Ht.xh3,v.xi2=Ht.xi2,v.xi3=Ht.xi3,v.xl2=Ht.xl2,v.xl3=Ht.xl3,v.xl4=Ht.xl4,v.zmol=Ht.zmol,v.zmos=Ht.zmos,{nm:P,z1:$,z3:j,z11:K,z13:xt,z21:st,z23:lt,z31:At,z33:et}=Ht;const ae={init:v.init,ep:v.ecco,inclp:v.inclo,nodep:v.nodeo,argpp:v.argpo,mp:v.mo,opsmode:v.operationmode},Se=Qh(v,ae);v.ecco=Se.ep,v.inclo=Se.inclp,v.nodeo=Se.nodep,v.argpo=Se.argpp,v.mo=Se.mp,R=0,L=0,M=0;const nn={cosim:d,emsq:T,argpo:v.argpo,s1:G,s2:J,s3:V,s4:it,s5:ct,sinim:u,ss1:Mt,ss2:Ut,ss3:X,ss4:q,ss5:tt,sz1:ot,sz3:_t,sz11:Rt,sz13:St,sz21:Vt,sz23:C,sz31:Gt,sz33:bt,t:v.t,tc:Ct,gsto:v.gsto,mo:v.mo,mdot:v.mdot,no:v.no,nodeo:v.nodeo,nodedot:v.nodedot,xpidot:x,z1:$,z3:j,z11:K,z13:xt,z21:st,z23:lt,z31:At,z33:et,ecco:v.ecco,eccsq:at,em:b,argpm:R,inclm:S,mm:M,nm:P,nodem:L,irez:v.irez,atime:v.atime,d2201:v.d2201,d2211:v.d2211,d3210:v.d3210,d3222:v.d3222,d4410:v.d4410,d4422:v.d4422,d5220:v.d5220,d5232:v.d5232,d5421:v.d5421,d5433:v.d5433,dedt:v.dedt,didt:v.didt,dmdt:v.dmdt,dnodt:v.dnodt,domdt:v.domdt,del1:v.del1,del2:v.del2,del3:v.del3,xfact:v.xfact,xlamo:v.xlamo,xli:v.xli,xni:v.xni},Qt=w0(nn);v.irez=Qt.irez,v.atime=Qt.atime,v.d2201=Qt.d2201,v.d2211=Qt.d2211,v.d3210=Qt.d3210,v.d3222=Qt.d3222,v.d4410=Qt.d4410,v.d4422=Qt.d4422,v.d5220=Qt.d5220,v.d5232=Qt.d5232,v.d5421=Qt.d5421,v.d5433=Qt.d5433,v.dedt=Qt.dedt,v.didt=Qt.didt,v.dmdt=Qt.dmdt,v.dnodt=Qt.dnodt,v.domdt=Qt.domdt,v.del1=Qt.del1,v.del2=Qt.del2,v.del3=Qt.del3,v.xfact=Qt.xfact,v.xlamo=Qt.xlamo,v.xli=Qt.xli,v.xni=Qt.xni}v.isimp!==1&&(m=v.cc1*v.cc1,v.d2=4*I*w*m,pt=v.d2*w*v.cc1/3,v.d3=(17*I+ht)*pt,v.d4=.5*pt*I*w*(221*I+31*ht)*v.cc1,v.t3cof=v.d2+2*m,v.t4cof=.25*(3*v.d3+v.cc1*(12*v.d2+10*m)),v.t5cof=.2*(3*v.d4+12*v.cc1*v.d3+6*v.d2*v.d2+15*m*(2*v.d2+m)))}td(v,0),v.init="n"}function D0(n,t="i"){const i=n.NORAD_CAT_ID.toString(),s=new Date(n.EPOCH.endsWith("Z")?n.EPOCH:`${n.EPOCH}Z`),r=s.getUTCFullYear(),o=Number(r.toString().slice(-2)),a=(s.valueOf()-new Date(Date.UTC(r,0,1,0,0,0)).valueOf())/(86400*1e3)+1;let l=Number(n.MEAN_MOTION_DOT),c=Number(n.MEAN_MOTION_DDOT);l/=pa*1440,c/=pa*1440*1440;const h=Number(n.BSTAR),d=Number(n.INCLINATION)*Ws,u=Number(n.RA_OF_ASC_NODE)*Ws,m=Number(n.ECCENTRICITY),g=Number(n.ARG_OF_PERICENTER)*Ws,_=Number(n.MEAN_ANOMALY)*Ws,p=Number(n.MEAN_MOTION)/pa,f=T0(r,a),{mon:A,day:b,hr:T,minute:D,sec:y}=f,R=Al(r,A,b,T,D,y),L={error:0,satnum:i,epochyr:o,epochdays:a,ndot:l,nddot:c,bstar:h,inclo:d,nodeo:u,ecco:m,argpo:g,mo:_,no:p,jdsatepoch:R};return L0(L,{opsmode:t,satn:L.satnum,epoch:L.jdsatepoch-24332815e-1,xbstar:L.bstar,xecco:L.ecco,xargpo:L.argpo,xinclo:L.inclo,xmo:L.mo,xno:L.no,xnodeo:L.nodeo}),L}function I0(n,...t){const i=(Al(...t)-n.jdsatepoch)*M0;return td(n,i)}const ma=1/6878,U0="https://celestrak.org/NORAD/elements/gp.php",N0=2*60*60*1e3;function ed(n){return`celestrak_${n}`}function O0(n){try{const t=localStorage.getItem(ed(n));if(!t)return null;const{ts:e,data:i}=JSON.parse(t);return Date.now()-e>N0?null:i}catch{return null}}function F0(n,t){try{localStorage.setItem(ed(n),JSON.stringify({ts:Date.now(),data:t}))}catch{}}function B0(){const t=document.createElement("canvas");t.width=t.height=32;const e=t.getContext("2d"),i=e.createRadialGradient(32/2,32/2,0,32/2,32/2,32/2);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.35,"rgba(255,255,255,0.8)"),i.addColorStop(.7,"rgba(255,255,255,0.2)"),i.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=i,e.fillRect(0,0,32,32);const s=new Ro(t);return s.colorSpace=Ge,s}const z0=[{id:"stations",label:"STATIONS",color:16777215,labeled:!0,dotSize:.022,maxCount:30},{id:"starlink",label:"STARLINK",color:5609983,labeled:!1,dotSize:.03,maxCount:500},{id:"active",label:"ALL ACTIVE",color:7838122,labeled:!1,dotSize:.022,maxCount:800}],k0=B0();class H0{scene;groups=new Map;tick=0;pickLabel=null;constructor(t){this.scene=t}async loadGroup(t){const e=z0.find(c=>c.id===t);if(!e)throw new Error(`Unknown group: ${t}`);if(this.groups.has(t))return this.groups.get(t).sats.length;let i=O0(t);if(!i){const c=await fetch(`${U0}?GROUP=${t}&FORMAT=json`);if(c.status===403)throw new Error(`CelesTrak ${t}: rate-limited (try again in 2h)`);if(!c.ok)throw new Error(`CelesTrak ${t}: HTTP ${c.status}`);i=await c.json(),F0(t,i)}const s=[];for(const c of i.slice(0,e.maxCount))try{const h=D0(c);h&&s.push({name:String(c.OBJECT_NAME).trim(),satrec:h,pos:new U})}catch{}let r=null,o=null;const a=[];if(e.labeled){const c=new Yi({color:e.color}),h=new Yn(.013,10,6);for(const d of s){const u=new Ie(h,c);u.visible=!1;const m=document.createElement("div");m.className="live-label",m.textContent=d.name;const g=new Gi(m);g.position.set(0,.028,0),u.add(g),a.push({mesh:u,label:g}),this.scene.add(u)}}else{const c=new Float32Array(s.length*3);o=new vn(c,3);const h=new Ce;h.setAttribute("position",o);const d=new Sl({map:k0,color:e.color,size:e.dotSize,sizeAttenuation:!0,transparent:!0,opacity:.85,blending:lo,depthWrite:!1,alphaTest:.01});r=new $h(h,d),r.visible=!1,this.scene.add(r)}const l={cfg:e,sats:s,points:r,posAttr:o,meshes:a,visible:!1,loaded:!0,updating:!1};return this.groups.set(t,l),this.propagateGroup(l,new Date),e.labeled&&this.stackClusteredLabels(l),s.length}stackClusteredLabels(t){const{sats:e,meshes:i}=t,s=.08,r=.032,o=new Set;for(let a=0;a<e.length;a++){if(o.has(a))continue;const l=[a];o.add(a);for(let c=a+1;c<e.length;c++)!o.has(c)&&e[a].pos.distanceTo(e[c].pos)<s&&(l.push(c),o.add(c));l.sort((c,h)=>e[c].name.localeCompare(e[h].name)),l.forEach((c,h)=>{const d=i[c];d?.label&&d.label.position.set(0,.028+h*r,0)})}}propagateGroup(t,e){if(t.updating)return;t.updating=!0;const{sats:i,posAttr:s,meshes:r,cfg:o}=t;for(let a=0;a<i.length;a++){const l=i[a],c=I0(l.satrec,e);if(c&&c.position){const{x:h,y:d,z:u}=c.position;isFinite(h)&&isFinite(d)&&isFinite(u)&&l.pos.set(h*ma,d*ma,u*ma)}s&&s.setXYZ(a,l.pos.x,l.pos.y,l.pos.z),o.labeled&&r[a]&&r[a].mesh.position.copy(l.pos)}s&&(s.needsUpdate=!0,t.points?.geometry.computeBoundingSphere()),t.updating=!1}tick60(t){++this.tick%60===0&&this.groups.forEach(e=>{e.visible&&e.loaded&&this.propagateGroup(e,t)})}setVisible(t,e){const i=this.groups.get(t);if(i){i.visible=e,i.points&&(i.points.visible=e);for(const{mesh:s}of i.meshes)s.visible=e;e&&this.propagateGroup(i,new Date)}}handleClick(t,e){this.clearPickLabel();let i=!1;return this.groups.forEach(s=>{if(i||!s.visible||!s.points||s.cfg.labeled)return;t.params.Points={threshold:e*.012};const r=t.intersectObject(s.points);if(!r.length||r[0].index==null)return;const o=s.sats[r[0].index];if(!o)return;const a=document.createElement("div");a.className="live-label-picked",a.textContent=o.name;const l=new Gi(a);l.position.copy(o.pos).addScaledVector(o.pos.clone().normalize(),.04),this.scene.add(l),this.pickLabel=l,i=!0}),i}clearPickLabel(){this.pickLabel&&(this.scene.remove(this.pickLabel),this.pickLabel=null)}isVisible(t){return this.groups.get(t)?.visible??!1}count(t){return this.groups.get(t)?.sats.length??0}isLoaded(t){return this.groups.get(t)?.loaded??!1}}const G0=398600.4418,V0=1e-10,W0=100,_o=.001,or=(n,t)=>[n[0]+t[0],n[1]+t[1],n[2]+t[2]],ys=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],Bi=(n,t)=>[n[0]*t,n[1]*t,n[2]*t],js=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],vo=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],hn=n=>Math.hypot(n[0],n[1],n[2]),Es=n=>Bi(n,1/hn(n)),on={add:or,sub:ys,scale:Bi,dot:js,cross:vo,norm:hn,unit:Es};function eh(n){return n>_o?(1-Math.cos(Math.sqrt(n)))/n:n<-_o?(Math.cosh(Math.sqrt(-n))-1)/-n:.5-n/24+n*n/720-n*n*n/40320}function nh(n){if(n>_o){const t=Math.sqrt(n);return(t-Math.sin(t))/(t*t*t)}if(n<-_o){const t=Math.sqrt(-n);return(Math.sinh(t)-t)/(t*t*t)}return 1/6-n/120+n*n/5040-n*n*n/362880}function ih(n,t,e=G0){const{r:i,v:s}=n;if(t===0)return{r:[...i],v:[...s]};const r=Math.sqrt(e),o=hn(i),a=hn(s),l=js(i,s)/o,c=2/o-a*a/e;let h=r*Math.abs(c)*t;for(let y=0;y<W0;y++){const R=c*h*h,L=eh(R),S=nh(R),M=h*h,P=M*h,F=o*l/r*M*L+(1-c*o)*P*S+o*h-r*t,B=o*l/r*h*(1-c*M*S)+(1-c*o)*M*L+o,W=F/B;if(h-=W,Math.abs(W)<V0)break}const d=c*h*h,u=eh(d),m=nh(d),g=h*h,_=g*h,p=1-g/o*u,f=t-_/r*m,A=or(Bi(i,p),Bi(s,f)),b=hn(A),T=r/(b*o)*(c*_*m-h),D=1-g/b*u;return{r:A,v:or(Bi(i,T),Bi(s,D))}}function nl(n){const t=Es(n.r),e=Es(vo(n.r,n.v)),i=vo(e,t);return{R:t,T:i,N:e}}class xo{anchors;constructor(t,e=[]){this.anchors=[{t:0,s:t}];for(const i of[...e].sort((s,r)=>s.t-r.t)){const s=this.anchors[this.anchors.length-1],r=ih(s.s,i.t-s.t);this.anchors.push({t:i.t,s:{r:r.r,v:or(r.v,i.dv)}})}}stateAt(t){let e=this.anchors[0];for(const i of this.anchors)if(i.t<=t+1e-9)e=i;else break;return ih(e.s,t-e.t)}}const $r=(Math.sqrt(5)-1)/2;function X0(n,t,e){let i=t,s=e,r=s-$r*(s-i),o=i+$r*(s-i),a=n(r),l=n(o);for(let h=0;h<200&&s-i>=.001;h++)a<l?(s=o,o=r,l=a,r=s-$r*(s-i),a=n(r)):(i=r,r=o,a=l,o=i+$r*(s-i),l=n(o));const c=.5*(i+s);return[c,n(c)]}function Ks(n,t,e,i,s=5){const r=d=>hn(ys(n.stateAt(d).r,t.stateAt(d).r)),o=[];for(let d=e;d<i;d+=s)o.push(d);o.push(i);const a=o.map(r);let l={tca:e,miss:1/0,relSpeed:0};for(let d=0;d<a.length;d++){const u=d===0||a[d]<=a[d-1],m=d===a.length-1||a[d]<=a[d+1];if(!u||!m)continue;const g=o[Math.max(0,d-1)],_=o[Math.min(a.length-1,d+1)],[p,f]=_>g?X0(r,g,_):[o[d],a[d]];f<l.miss&&(l={tca:p,miss:f,relSpeed:0})}const c=n.stateAt(l.tca),h=t.stateAt(l.tca);return l.relSpeed=hn(ys(c.v,h.v)),l}function sh(n,t,e){const i=n.stateAt(e),s=t.stateAt(e),r=ys(i.r,s.r),o=ys(i.v,s.v),a=Es(o);let l=Es(or(i.r,s.r));l=ys(l,Bi(a,js(l,a))),hn(l)<1e-9&&(l=nl(i).N),l=Es(l);const c=vo(a,l);return[js(r,c),js(r,l)]}const rh=.2,oh=2e4,q0=[1,10,100,1e3,1e4];function Y0(n){return n>=1e3?`${(n/1e3).toFixed(n>=1e4?0:1)}k`:n>=10?n.toFixed(0):n.toFixed(n>=1?1:2)}class $0{constructor(t){this.canvas=t,this.ctx=t.getContext("2d"),new ResizeObserver(()=>{this.dirty=!0}).observe(t)}ctx;series=[];t0=0;t1=1;cursor=0;threshold=5;dirty=!0;set(t,e,i,s){this.series=t,this.t0=e,this.t1=Math.max(i,e+1),this.threshold=s,this.dirty=!0}setCursor(t){Math.abs(t-this.cursor)<1e-6||(this.cursor=t,this.dirty=!0)}render(){if(!this.dirty)return;this.dirty=!1;const{canvas:t,ctx:e}=this,i=Math.min(devicePixelRatio,2),s=t.clientWidth,r=t.clientHeight;if(!s||!r)return;t.width!==Math.round(s*i)&&(t.width=Math.round(s*i)),t.height!==Math.round(r*i)&&(t.height=Math.round(r*i)),e.setTransform(i,0,0,i,0,0),e.clearRect(0,0,s,r);const o=38,a=10,l=8,c=18,h=s-o-a,d=r-l-c,u=y=>o+(y-this.t0)/(this.t1-this.t0)*h,m=Math.log10(rh),g=Math.log10(oh),_=y=>{const R=Math.log10(Math.min(oh,Math.max(rh,y)));return l+(1-(R-m)/(g-m))*d};e.font="10px ui-monospace, SF Mono, Menlo, monospace";const p=_(this.threshold),f=e.createLinearGradient(0,p,0,l+d);f.addColorStop(0,"rgba(255,48,64,0.28)"),f.addColorStop(1,"rgba(255,48,64,0.08)"),e.fillStyle=f,e.fillRect(o,p,h,l+d-p),e.strokeStyle="rgba(255,80,90,0.75)",e.setLineDash([4,3]),e.beginPath(),e.moveTo(o,p),e.lineTo(o+h,p),e.stroke(),e.setLineDash([]),e.fillStyle="rgba(255,120,128,0.9)",e.textAlign="left",e.fillText(`DANGER < ${this.threshold} km`,o+4,l+d-4),e.textAlign="right";for(const y of q0){const R=_(y);e.strokeStyle="rgba(0,212,255,0.08)",e.beginPath(),e.moveTo(o,R),e.lineTo(o+h,R),e.stroke(),e.fillStyle="rgba(160,210,235,0.5)",e.fillText(`${Y0(y)}`,o-5,R+3)}e.save(),e.translate(9,l+d/2),e.rotate(-Math.PI/2),e.textAlign="center",e.fillStyle="rgba(160,210,235,0.4)",e.fillText("km apart",0,0),e.restore(),e.textAlign="center",e.fillStyle="rgba(160,210,235,0.45)";const A=this.t1-this.t0,b=A>1800?10:A>900?5:2;for(let y=Math.ceil(this.t0/60/b)*b;y*60<=this.t1;y+=b)e.fillText(`${y}m`,u(y*60),r-4);const T=[];for(const y of this.series){if(y.revealFrom!==void 0&&this.cursor<y.revealFrom)continue;const R=y.revealToCursor?y.points.filter(L=>L[0]<=this.cursor):y.points;if(!(R.length<2)&&(e.strokeStyle=y.color,e.lineWidth=y.width??1.8,e.setLineDash(y.dashed?[5,4]:[]),e.beginPath(),R.forEach(([L,S],M)=>M?e.lineTo(u(L),_(S)):e.moveTo(u(L),_(S))),e.stroke(),e.setLineDash([]),e.lineWidth=1,y.minLabel)){let L=y.points[0];for(const S of y.points)S[1]<L[1]&&(L=S);if(!y.minLabelAfterCursor||this.cursor>=L[0]){const S=u(L[0]),M=_(L[1]);e.fillStyle=y.color,e.beginPath(),e.arc(S,M,3,0,Math.PI*2),e.fill(),T.push({x:S,y:M,text:y.minLabel,color:y.color})}}}e.font="bold 10.5px ui-monospace, SF Mono, Menlo, monospace";const D=[];T.sort((y,R)=>R.y-y.y);for(const y of T){const R=e.measureText(y.text).width,L=y.x>o+h*.55,S=L?y.x-8-R:y.x+8;let M=Math.min(y.y-8,l+d-6);const P=F=>D.some(B=>S<B.x1&&S+R>B.x0&&F-10<B.y1&&F+3>B.y0);for(;P(M)&&M>l+12;)M-=13;D.push({x0:S,x1:S+R,y0:M-10,y1:M+3}),e.strokeStyle=y.color,e.globalAlpha=.5,e.beginPath(),e.moveTo(y.x,y.y),e.lineTo(L?S+R:S,M-3),e.stroke(),e.globalAlpha=1,e.fillStyle="rgba(5,5,16,0.85)",e.fillRect(S-2,M-10,R+4,13),e.fillStyle=y.color,e.textAlign="left",e.fillText(y.text,S,M)}if(e.font="10px ui-monospace, SF Mono, Menlo, monospace",this.cursor>=this.t0&&this.cursor<=this.t1){const y=u(this.cursor);e.strokeStyle="rgba(255,255,255,0.45)",e.beginPath(),e.moveTo(y,l),e.lineTo(y,l+d),e.stroke()}}}function Zs(n,t,e,i=[],s=1){const r=[];for(let o=t;o<e;o+=s)r.push(o);r.push(e);for(const o of i)o>t&&o<e&&r.push(o);return r.sort((o,a)=>o-a),r.map(o=>[o,n(o)])}const j0=1e-9,de=n=>document.getElementById(n);function jr(n){const t=Math.floor(Math.abs(n)/60),e=Math.floor(Math.abs(n)%60);return`${t}:${String(e).padStart(2,"0")}`}class K0{constructor(t){this.host=t;for(const e of[this.el.when,this.el.at,this.el.rad,this.el.crs])e.addEventListener("input",()=>this.schedule());de("sb-close").addEventListener("click",()=>this.host.onExit()),de("sb-reset").addEventListener("click",()=>{this.setSliders(0,0,0),this.schedule()}),de("sb-agents").addEventListener("click",()=>this.loadAgentsBurn()),de("sb-fly").addEventListener("click",()=>this.host.onFly()),de("sb-share").addEventListener("click",()=>this.share()),new ResizeObserver(()=>this.drawBullseye()).observe(this.el.bull)}tl=null;scenarioKey="";info={};epoch=new Map;baseline=new Map;pairIds=["",""];original;threshold=5;window=3600;mover="";last=null;pending=!1;agentsDvMs=0;agentsBurns=0;agentsFirstBurnT=0;el={panel:de("sandbox-panel"),brief:de("sb-brief"),movers:de("sb-movers"),when:de("sb-when"),whenVal:de("sb-when-val"),at:de("sb-at"),rad:de("sb-rad"),crs:de("sb-crs"),atVal:de("sb-at-val"),radVal:de("sb-rad-val"),crsVal:de("sb-crs-val"),dvTotal:de("sb-dv-total"),fuelBar:de("sb-fuel-bar"),fuelText:de("sb-fuel-text"),bull:de("sb-bullseye"),verdict:de("sb-verdict"),verdictSub:de("sb-verdict-sub"),score:de("sb-score"),tip:de("sb-tip")};get active(){return document.body.classList.contains("sandbox")}get result(){return this.last}open(t,e,i){const s=t.events.find(d=>d.type==="conjunction_detected"),r=t.frames[0];if(!s||!r||r.objects.some(d=>!d.v))return!1;this.tl=t,this.scenarioKey=e,this.threshold=t.meta.conjunction_threshold_km??5,this.window=t.meta.screen_window_s??3600,this.info=t.meta.object_info??{},this.epoch.clear(),this.baseline.clear();for(const d of r.objects){const u={r:d.r,v:d.v};this.epoch.set(d.id,u),this.baseline.set(d.id,new xo(u))}this.pairIds=[s.data.a_id,s.data.b_id];const[o,a]=this.pairIds;this.original=Ks(this.baseline.get(o),this.baseline.get(a),0,this.window);const l=t.events.filter(d=>d.type==="maneuver_committed");this.agentsBurns=l.length,this.agentsFirstBurnT=l[0]?.data.t_burn??0,this.agentsDvMs=l.reduce((d,u)=>d+u.data.est_dv_cost*1e3,0),this.el.brief.innerHTML="";const c=document.createElement("p");c.innerHTML=`<b>${o}</b> and <b>${a}</b> will pass <span class="sb-red">${this.original.miss.toFixed(2)} km</span> apart in ${jr(this.original.tca)} — closing at ${this.original.relSpeed.toFixed(1)} km/s. Design the dodge. The physics referee decides if it counts.`,this.el.brief.appendChild(c),this.el.when.min="0",this.el.when.max=String(Math.max(10,Math.floor(this.original.tca-10))),this.el.when.step="5",this.buildMoverButtons();const h=this.pairIds.find(d=>(this.info[d]?.fuel_budget_dv??0)>.001)??o;return this.selectMover(h),this.el.when.value=String(Math.max(0,Math.round((this.original.tca-180)/5)*5)),this.setSliders(0,0,0),i&&this.applyPreset(i),document.body.classList.add("sandbox"),this.compute(),this.updateScoreLine(),!0}close(){document.body.classList.remove("sandbox")}buildMoverButtons(){this.el.movers.innerHTML="";for(const t of this.pairIds){const e=this.info[t],i=(e?.fuel_budget_dv??0)*1e3,s=document.createElement("button");s.className="sb-mover",s.dataset.id=t;const r=i<1;s.innerHTML=`<span class="sb-mover-name">${t}</span><span class="sb-mover-meta">priority ${e?.priority??"?"} · ${r?'<span class="sb-red">tank empty</span>':`${i.toFixed(0)} m/s fuel`}</span>`,s.addEventListener("click",()=>{this.selectMover(t),this.schedule()}),this.el.movers.appendChild(s)}}selectMover(t){this.mover=t,this.el.movers.querySelectorAll(".sb-mover").forEach(e=>e.classList.toggle("on",e.dataset.id===t))}setSliders(t,e,i){this.el.at.value=String(t),this.el.rad.value=String(e),this.el.crs.value=String(i)}loadAgentsBurn(){if(!this.tl)return;const t=this.tl.events.find(c=>c.type==="maneuver_committed"&&this.pairIds.includes(c.data.obj_id));if(!t)return;const e=t.data.obj_id,i=t.data.t_burn,s=t.data.dv_vector,{R:r,T:o,N:a}=nl(this.baseline.get(e).stateAt(i));this.selectMover(e),this.el.when.value=String(Math.round(i/5)*5);const l=c=>Math.round(c*1e3*10)/10;this.setSliders(l(on.dot(s,o)),l(on.dot(s,r)),l(on.dot(s,a))),this.schedule()}applyPreset(t){const[e,i,s,r,o]=t.split(",");this.pairIds.includes(e)&&(this.selectMover(e),this.el.when.value=String(Number(i)||0),this.setSliders(Number(s)||0,Number(r)||0,Number(o)||0))}presetString(){return[this.mover,this.el.when.value,this.el.at.value,this.el.rad.value,this.el.crs.value].join(",")}async share(){const t=new URL(location.href);t.searchParams.set("timeline",this.scenarioKey),t.searchParams.set("try",this.presetString()),t.searchParams.delete("autoplay");const e=de("sb-share");try{await navigator.clipboard.writeText(t.toString()),e.textContent="✓ LINK COPIED"}catch{history.replaceState(null,"",t),e.textContent="✓ LINK IN ADDRESS BAR"}setTimeout(()=>{e.textContent="⧉ SHARE"},1800)}schedule(){this.pending||(this.pending=!0,requestAnimationFrame(()=>{this.pending=!1,this.compute()}))}compute(){if(!this.tl)return;const t=Number(this.el.when.value),e=Number(this.el.at.value),i=Number(this.el.rad.value),s=Number(this.el.crs.value),r=this.original.tca-t;this.el.whenVal.textContent=`${jr(r)} before closest approach`;const o=y=>y>0?"+":y<0?"−":"";this.el.atVal.textContent=`${o(e)}${Math.abs(e).toFixed(1)}`,this.el.radVal.textContent=`${o(i)}${Math.abs(i).toFixed(1)}`,this.el.crsVal.textContent=`${o(s)}${Math.abs(s).toFixed(1)}`;const a=this.mover,l=this.pairIds[0]===a?this.pairIds[1]:this.pairIds[0],{R:c,T:h,N:d}=nl(this.baseline.get(a).stateAt(t)),u=on.scale(on.add(on.add(on.scale(h,e),on.scale(c,i)),on.scale(d,s)),1/1e3),m=hn(u)*1e3,g=(this.info[a]?.fuel_budget_dv??1/0)*1e3,_={t,dv:u},p=new Map(this.baseline),f=new xo(this.epoch.get(a),m>0?[_]:[]);p.set(a,f);let A,b=this.original,T;if(m===0)A="none";else if(m/1e3>g/1e3+j0)A="fuel";else{b=Ks(f,p.get(l),t,this.window);for(const[y,R]of p){if(y===a||y===l)continue;const L=Ks(f,R,t,this.window);L.miss<=this.threshold&&(!T||L.miss<T.ap.miss)&&(T={id:y,ap:L})}A=b.miss<=this.threshold?"collide":T?"new":"clear"}this.el.dvTotal.textContent=`${m.toFixed(1)} m/s`;const D=Number.isFinite(g)&&g>0?Math.min(1,m/g):m>0?1:0;this.el.fuelBar.style.width=`${(D*100).toFixed(1)}%`,this.el.fuelBar.classList.toggle("over",A==="fuel"),this.el.fuelText.textContent=Number.isFinite(g)?`of ${g.toFixed(g<1?1:0)} m/s in the tank`:"",this.last={mover:a,partner:l,burn:_,dvMs:m,verdict:A,trajs:p,baseline:this.baseline,original:this.original,pair:b,newRisk:T},this.renderVerdict(),this.drawBullseye(),this.host.onResult(this.last)}renderVerdict(){const t=this.last,e=this.el.verdict,i=this.el.verdictSub;e.className=`sb-verdict v-${t.verdict}`;const s=this.threshold;switch(t.verdict){case"none":e.textContent="NO BURN — STILL ON COLLISION COURSE",i.textContent=`Predicted miss ${t.original.miss.toFixed(2)} km. Push a slider.`;break;case"fuel":{const r=(this.info[t.mover]?.fuel_budget_dv??0)*1e3;e.textContent="✗ REJECTED — NOT ENOUGH FUEL",i.textContent=r<1?`${t.mover} has an empty tank (${r.toFixed(1)} m/s). It physically cannot dodge — someone else has to.`:`This burn needs ${t.dvMs.toFixed(1)} m/s; ${t.mover} only carries ${r.toFixed(0)} m/s.`;break}case"collide":e.textContent="✗ STILL TOO CLOSE",i.textContent=`Now ${t.pair.miss.toFixed(2)} km apart (was ${t.original.miss.toFixed(2)}). The referee needs more than ${s} km.`;break;case"new":e.textContent=`✗ NEW NEAR-MISS WITH ${t.newRisk.id}`,i.textContent=`You cleared ${t.partner} (${t.pair.miss.toFixed(1)} km), but your new orbit passes ${t.newRisk.ap.miss.toFixed(2)} km from ${t.newRisk.id} at T+${jr(t.newRisk.ap.tca)}. A fix that creates a new problem isn't a fix.`;break;case"clear":e.textContent="⚖ CLEARS — REFEREE APPROVES",i.textContent=`${t.pair.miss.toFixed(2)} km miss (was ${t.original.miss.toFixed(2)}), nothing else within ${s} km for the next ${Math.round(this.window/60)} minutes.`;break}this.el.tip.textContent=this.tipFor(t),t.verdict==="clear"&&this.recordBest(t.dvMs),this.updateScoreLine()}tipFor(t){const e=t.original.tca-t.burn.t;return t.verdict==="fuel"?"Tip: switch who burns — or shrink the push.":t.verdict==="collide"&&e<400?"Tip: burn earlier — drag WHEN to the left. A push has more time to grow into distance before you meet, so early burns are far cheaper.":t.verdict==="collide"?"Tip: “climb / dip” moves WHERE you cross; “speed up / slow down” moves WHEN you arrive. Both work — differently.":t.verdict==="new"?"Tip: try a different direction — the sky past the dodge is not empty.":t.verdict==="clear"&&this.agentsDvMs&&t.dvMs<this.agentsDvMs?`You beat the agents. They burned ${jr(t.original.tca-this.agentsFirstBurnT)} before closest approach — late burns are expensive. Fuel is mission lifetime, so this is real money.`:t.verdict==="clear"?"Approved. Can you clear it with less fuel?":"Pick who burns, when, and which way — the verdict updates live."}bestKey(){return`row-best-${this.scenarioKey}`}recordBest(t){try{const e=Number(localStorage.getItem(this.bestKey())??1/0);t<e&&localStorage.setItem(this.bestKey(),t.toFixed(2))}catch{}}updateScoreLine(){let t=1/0;try{t=Number(localStorage.getItem(this.bestKey())??1/0)}catch{}const e=this.agentsDvMs?`Agents: <b>${this.agentsDvMs.toFixed(1)} m/s</b> in ${this.agentsBurns} burn${this.agentsBurns===1?"":"s"}`:"",i=this.last,s=i&&i.verdict==="clear"?`You: <b class="sb-green">${i.dvMs.toFixed(1)} m/s</b>`:"",r=i&&i.verdict==="clear"&&this.agentsDvMs?(()=>{const a=Math.round((1-i.dvMs/this.agentsDvMs)*100);return a>0?` <span class="sb-green">(${a}% less)</span>`:a<0?` <span class="sb-dim">(${-a}% more)</span>`:""})():"",o=Number.isFinite(t)?`<span class="sb-dim">your best ${t.toFixed(1)} m/s</span>`:"";this.el.score.innerHTML=[e,s+r,o].filter(Boolean).join(" · ")}drawBullseye(){const t=this.el.bull,e=this.last,i=t.getContext("2d");if(!i||!e)return;const s=Math.min(devicePixelRatio,2),r=t.clientWidth,o=t.clientHeight;if(!r||!o)return;t.width=Math.round(r*s),t.height=Math.round(o*s),i.setTransform(s,0,0,s,0,0),i.clearRect(0,0,r,o);const[a,l]=this.pairIds,c=sh(e.baseline.get(a),e.baseline.get(l),e.original.tca),h=e.verdict==="none"||e.verdict==="fuel"?c:sh(e.trajs.get(a),e.trajs.get(l),e.pair.tca),d=this.threshold,u=r/2,m=o/2,g=Math.min(r,o)/2-14,_=Math.max(d*2,1.25*Math.max(Math.hypot(...c),Math.min(Math.hypot(...h),d*4))),p=g/_;i.font="9.5px ui-monospace, SF Mono, Menlo, monospace",i.textAlign="left";const f=_>30?10:_>12?5:2.5;for(let R=f;R<=_+1e-6;R+=f)i.strokeStyle="rgba(0,212,255,0.13)",i.beginPath(),i.arc(u,m,R*p,0,Math.PI*2),i.stroke();const A=i.createRadialGradient(u,m,0,u,m,d*p);A.addColorStop(0,"rgba(255,48,64,0.45)"),A.addColorStop(1,"rgba(255,48,64,0.12)"),i.fillStyle=A,i.beginPath(),i.arc(u,m,d*p,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(255,90,100,0.8)",i.setLineDash([3,3]),i.beginPath(),i.arc(u,m,d*p,0,Math.PI*2),i.stroke(),i.setLineDash([]),i.fillStyle="rgba(255,140,148,0.9)",i.fillText(`${d} km`,u+d*p*.72+3,m+d*p*.72+9),i.strokeStyle="rgba(0,212,255,0.18)",i.beginPath(),i.moveTo(u-g,m),i.lineTo(u+g,m),i.moveTo(u,m-g),i.lineTo(u,m+g),i.stroke(),i.fillStyle="rgba(160,210,235,0.45)",i.textAlign="center",i.fillText("↑ away from Earth",u,10),i.fillText(`${l} sits at the center`,u,o-3);const b=([R,L])=>{const S=Math.hypot(R,L),M=S*p>g?g/(S*p):1;return[u+R*p*M,m-L*p*M]},T=b(c),D=b(h),y=Math.hypot(D[0]-T[0],D[1]-T[1])>1;if(y&&(i.strokeStyle="rgba(255,200,120,0.55)",i.setLineDash([2,3]),i.beginPath(),i.moveTo(T[0],T[1]),i.lineTo(D[0],D[1]),i.stroke(),i.setLineDash([])),i.strokeStyle="#ff5a64",i.lineWidth=2,i.beginPath(),i.moveTo(T[0]-4,T[1]-4),i.lineTo(T[0]+4,T[1]+4),i.moveTo(T[0]+4,T[1]-4),i.lineTo(T[0]-4,T[1]+4),i.stroke(),i.lineWidth=1,y){const L=e.verdict==="clear"?"#3ddc97":e.verdict==="new"?"#ffb03a":"#ff5a64";i.fillStyle=L,i.shadowColor=L,i.shadowBlur=10,i.beginPath(),i.arc(D[0],D[1],5,0,Math.PI*2),i.fill(),i.shadowBlur=0,i.textAlign=D[0]>u?"right":"left",i.fillText(`${a} ${e.pair.miss.toFixed(1)} km`,D[0]+(D[0]>u?-9:9),D[1]-7)}else i.fillStyle="#ff7a82",i.textAlign=T[0]>u?"right":"left",i.fillText(`${a} ${e.original.miss.toFixed(2)} km`,T[0]+(T[0]>u?-9:9),T[1]-7)}}const Z0=6371,J0=6878,Vn=1/J0,wl=Z0*Vn,Ve={BG:328976,NORMAL:54527,DANGER:16719904,SAFE:65416,PROPOSAL:16755200,DEBRIS:8947848,TRAIL:13141,RING:10314},nd=40;function Q0(){const e=document.createElement("canvas");e.width=512,e.height=256;const i=e.getContext("2d"),s=i.createLinearGradient(0,0,0,256);s.addColorStop(0,"#0b2240"),s.addColorStop(.5,"#0d2d55"),s.addColorStop(1,"#0b2240"),i.fillStyle=s,i.fillRect(0,0,512,256);function r(a,l,c,h){i.beginPath(),i.ellipse(a*512,l*256,c*512,h*256,0,0,Math.PI*2),i.fill()}i.fillStyle="#1e4020",r(.14,.28,.1,.22),r(.18,.6,.07,.2),r(.47,.2,.05,.14),r(.48,.52,.07,.24),r(.5,.3,.04,.1),r(.63,.44,.03,.1),r(.69,.22,.2,.26),r(.82,.63,.06,.09),i.fillStyle="#c8daea",r(.28,.12,.04,.08),i.fillStyle="#d8e8f8",i.fillRect(0,0,512,.08*256),i.fillRect(0,.88*256,512,.12*256);const o=new Ro(e);return o.colorSpace=Ge,o}function tv(n){const t=new Q_;t.load("/earth.jpg",e=>{e.colorSpace=Ge,n.map=e,n.needsUpdate=!0,il("")},void 0,()=>{}),t.load("/earth_specular.jpg",e=>{n.specularMap=e,n.needsUpdate=!0})}const ev="https://gibs.earthdata.nasa.gov/wmts/epsg4326/best",nv="250m",iv=2,ah=5,lh=3,us=512,sv="VIIRS_NOAA20_CorrectedReflectance_TrueColor";async function rv(n){const t=new Date;t.setDate(t.getDate()-1);const e=t.toISOString().slice(0,10);il(`LIVE  ${e}…`);const i=ah*us,s=lh*us,r=document.createElement("canvas");r.width=i,r.height=s;const o=r.getContext("2d");o.fillStyle="#0d2545",o.fillRect(0,0,i,s),await new Promise(c=>{const h=new Image;h.onload=()=>{o.drawImage(h,0,0,i,s),c()},h.onerror=()=>c(),h.src="/earth.jpg"});const a=new Ro(r);a.colorSpace=Ge,n.map=a,n.specularMap=null,n.needsUpdate=!0,o.globalCompositeOperation="lighten";const l=[];for(let c=0;c<lh;c++)for(let h=0;h<ah;h++){const d=`${ev}/${sv}/default/${e}/${nv}/${iv}/${c}/${h}.jpeg`;l.push(fetch(d).then(u=>{if(!u.ok)throw new Error(u.status.toString());return u.blob()}).then(u=>new Promise(m=>{const g=new Image;g.onload=()=>{o.filter="brightness(3) contrast(2)",o.drawImage(g,h*us,c*us,us,us),o.filter="none",a.needsUpdate=!0,m()},g.onerror=()=>m(),g.src=URL.createObjectURL(u)})).catch(()=>{}))}await Promise.all(l),o.globalCompositeOperation="source-over",a.needsUpdate=!0,il(`LIVE  ${e}  ✓`)}function il(n){const t=document.getElementById("earth-status");t&&(t.textContent=n)}const ov=document.getElementById("canvas"),av=document.getElementById("label-root"),Rl=document.getElementById("play-btn"),ai=document.getElementById("scrubber"),lv=document.getElementById("time-display"),sl=document.getElementById("speed-select"),ro=document.getElementById("phase-badge"),oo=document.getElementById("phase-text"),li=document.getElementById("event-log"),cv=document.getElementById("subtitle"),ch=document.getElementById("event-marks"),Wn=new Y_({canvas:ov,antialias:!0});Wn.setPixelRatio(Math.min(devicePixelRatio,2));Wn.setSize(innerWidth,innerHeight);Wn.setClearColor(Ve.BG);const mr=new x0;mr.setSize(innerWidth,innerHeight);mr.domElement.style.cssText="position:absolute;top:0;left:0;pointer-events:none;";av.appendChild(mr.domElement);const ne=new $_,Qe=new an(55,innerWidth/innerHeight,.005,200);Qe.position.set(0,.7,3.2);const mi=new o0(Qe,Wn.domElement);mi.enableDamping=!0;mi.dampingFactor=.06;mi.minDistance=.05;mi.maxDistance=20;ne.add(new n0(3359846,.7));const id=new Kh(16774638,1.3);id.position.set(8,5,6);ne.add(id);const sd=new Kh(17578,.35);sd.position.set(-5,-2,-4);ne.add(sd);{const n=[];for(let e=0;e<3e3;e++){const i=70+Math.random()*60,s=Math.random()*Math.PI*2,r=Math.acos(2*Math.random()-1);n.push(i*Math.sin(r)*Math.cos(s),i*Math.sin(r)*Math.sin(s),i*Math.cos(r))}const t=new Ce;t.setAttribute("position",new Ue(n,3)),ne.add(new $h(t,new Sl({color:16777215,size:.05,sizeAttenuation:!1})))}const Cl=new El({map:Q0(),specular:new Yt(2245734),shininess:20,emissive:new Yt(331034),emissiveIntensity:.2}),rd=new Ie(new Yn(wl,64,32),Cl);tv(Cl);ne.add(rd);const hv=(()=>{const e=document.createElement("canvas");e.width=512,e.height=256;const i=e.getContext("2d");i.fillStyle="#000000",i.fillRect(0,0,512,256),i.fillStyle="#ffffaa",[[.1,.25],[.13,.27],[.15,.3],[.23,.24],[.47,.19],[.49,.2],[.5,.22],[.48,.23],[.61,.27],[.65,.25],[.7,.28],[.72,.3],[.63,.32],[.74,.38],[.9,.3]].forEach(([o,a])=>{i.beginPath(),i.arc(o*512,a*256,2,0,Math.PI*2),i.fill()});const r=new Ro(e);return r.colorSpace=Ge,r})();ne.add(new Ie(new Yn(wl*1.001,64,32),new Yi({map:hv,transparent:!0,opacity:.22,blending:lo})));ne.add(new Ie(new Yn(wl*1.06,48,24),new El({color:866926,transparent:!0,opacity:.1,side:We})));function dv(n,t){let e=null,i=null;for(let u=0;u<t.length-1;u++){const m=t[u].objects.find(f=>f.id===n),g=t[u+1].objects.find(f=>f.id===n);if(!m||!g)continue;const _=new U(...m.r),p=new U(...g.r);if(!(_.lengthSq()<100||p.lengthSq()<100)&&new U().crossVectors(_,p).lengthSq()>1e3){e=_.multiplyScalar(Vn),i=p.multiplyScalar(Vn);break}}if(!e||!i)return null;const s=new U().crossVectors(e,i).normalize(),r=e.length(),o=160,a=[];for(let u=0;u<=o;u++){const m=u/o*Math.PI*2;a.push(new U(r*Math.cos(m),r*Math.sin(m),0))}const l=new Ce().setFromPoints(a),c=new Mi({color:Ve.RING,transparent:!0,opacity:.4}),h=new Ns(l,c),d=new U(0,0,1);return Math.abs(s.dot(d))<.9999&&h.setRotationFromQuaternion(new fi().setFromUnitVectors(d,s)),h}const me=new Map;function Mo(n){return n.toLowerCase().includes("debris")}function uv(n,t){const e=Mo(n)?Ve.DEBRIS:Ve.NORMAL,i=Mo(n)?.009:.015,s=new Ie(new Yn(i,16,10),new El({color:e,emissive:e,emissiveIntensity:.6})),r=new Ie(new Yn(i*2.8,10,6),new Yi({color:e,transparent:!0,opacity:.14}));s.add(r);const o=document.createElement("div");o.className="sat-label",o.textContent=n;const a=new Gi(o);a.position.set(0,i*3.8,0),s.add(a);const l=new Ue(new Float32Array(nd*3),3),c=new Ce;c.setAttribute("position",l),c.setDrawRange(0,0);const h=new Ns(c,new Mi({color:Ve.TRAIL,transparent:!0,opacity:.5})),d=dv(n,t);return ne.add(s),ne.add(h),d&&ne.add(d),{mesh:s,glow:r,trailLine:h,trailBuf:l,trailPts:[],nameLabel:a,orbitRing:d}}function fv(){me.forEach(n=>{ne.remove(n.mesh),ne.remove(n.trailLine),n.orbitRing&&ne.remove(n.orbitRing)}),me.clear()}function pv(n,t){fv(),n.forEach(e=>me.set(e,uv(e,t)))}let Te=[],tn=!1;const wn=new Map,Vi=new Map;function Tn(n,t){return[n,t].sort().join(":")}function mv(n,t){const e=Tn(n,t);if(wn.has(e))return;const i=new Ce().setFromPoints([new U,new U]);wn.set(e,new Ns(i,new Mi({color:Ve.DANGER}))),ne.add(wn.get(e))}function od(n){const t=wn.get(n);t&&(ne.remove(t),t.geometry.dispose(),wn.delete(n));const e=Vi.get(n);e&&(ne.remove(e),Vi.delete(n))}function Co(){[...wn.keys()].forEach(n=>od(n))}function gv(n,t){const e=Tn(n,t),i=wn.get(e);i&&i.material.color.setHex(16755200);const s=Vi.get(e);if(s){const r=s.element;r.className="conj-label clearing",r.textContent="✓ dodge in progress"}}function _v(){wn.forEach((n,t)=>{const[e,i]=t.split(":"),s=me.get(e),r=me.get(i);if(!s||!r)return;const o=n.geometry.attributes.position;o.setXYZ(0,s.mesh.position.x,s.mesh.position.y,s.mesh.position.z),o.setXYZ(1,r.mesh.position.x,r.mesh.position.y,r.mesh.position.z),o.needsUpdate=!0,n.geometry.computeBoundingSphere()})}function vv(){Te.forEach(n=>{const t=Tn(n.aId,n.bId),e=me.get(n.aId),i=me.get(n.bId);if(!e||!i)return;const s=new U().addVectors(e.mesh.position,i.mesh.position).multiplyScalar(.5);let r=Vi.get(t);if(!r){const a=document.createElement("div");a.className="conj-label",a.textContent=`${n.miss.toFixed(1)} km`,r=new Gi(a),ne.add(r),Vi.set(t,r)}const o=r.element;o.classList.contains("clearing")||(o.textContent=`${n.miss.toFixed(1)} km`),r.position.copy(s)})}let cn=null,en=null,So=null,yo=null,ad=0;function xv(n,t){Ds();const e=new Ce().setFromPoints([new U,new U]);cn=new Ns(e,new Mi({color:Ve.PROPOSAL,transparent:!0,opacity:.75})),ne.add(cn),en=new Ie(new Yn(.018,8,6),new Yi({color:Ve.PROPOSAL})),ne.add(en),So=n,yo=t,ad=performance.now()}function Ds(){cn&&(ne.remove(cn),cn=null),en&&(ne.remove(en),en=null),So=yo=null}function Mv(n){if(!cn||!en||!So||!yo)return;const t=me.get(So),e=me.get(yo);if(!t||!e)return;const i=t.mesh.position,s=e.mesh.position,r=cn.geometry.attributes.position;r.setXYZ(0,i.x,i.y,i.z),r.setXYZ(1,s.x,s.y,s.z),r.needsUpdate=!0,cn.geometry.computeBoundingSphere();const o=(n-ad)/2200%1,a=o<.5?o*2:(1-o)*2;en.position.lerpVectors(i,s,a)}const gi=new Map;function Sv(n,t,e){const s=`▲ ${(Math.hypot(...t)*1e3).toFixed(1)} m/s`;if(!pe)return s;let r=pe.frames[0];for(const u of pe.frames)Math.abs(u.t-e)<Math.abs(r.t-e)&&(r=u);const o=r.objects.find(u=>u.id===n);if(!o||!o.v)return s;const a=new U(...o.r).normalize(),l=new U(...o.v).normalize(),c=a.clone().cross(l).normalize(),h=new U(...t),d=[[h.dot(a),h.dot(a)>0?"pushes outward — climbs over the threat":"pushes inward — dips under the threat"],[h.dot(l),h.dot(l)>0?"speeds up — raises its orbit":"slows down — lowers its orbit"],[h.dot(c),"thrusts sideways — shifts its orbital plane"]];return d.sort((u,m)=>Math.abs(m[0])-Math.abs(u[0])),`${s} · ${d[0][1]}`}function yv(n,t,e){ld(n);const i=new U(...t);if(i.lengthSq()<1e-12)return;i.normalize();const s=new Zh(i,new U,.16,Ve.PROPOSAL,.03,.014);if(e){const o=document.createElement("div");o.className="burn-label",o.textContent=e;const a=new Gi(o);a.position.copy(i.clone().multiplyScalar(.19)),s.add(a)}const r=me.get(n);r&&(s.position.copy(r.mesh.position),ne.add(s),gi.set(n,s))}function ld(n){const t=gi.get(n);t&&(t.traverse(e=>{const i=e;i.isCSS2DObject&&i.element&&i.element.remove()}),ne.remove(t),gi.delete(n))}function Po(){gi.forEach((n,t)=>ld(t))}const ar=new Map;function Ev(){me.forEach((n,t)=>{if(Mo(t)||ar.has(t))return;const e=document.createElement("div");e.className="resolved-label",e.textContent="✓";const i=new Gi(e);i.position.set(0,.035,0),n.mesh.add(i),ar.set(t,i)})}function Pl(){ar.forEach((n,t)=>{me.get(t)?.mesh.remove(n)}),ar.clear()}function bv(n,t,e){if(!n.length)return null;if(e<=n[0].t){const d=n[0].objects.find(u=>u.id===t);return d?new U(...d.r).multiplyScalar(Vn):null}const i=n[n.length-1];if(e>=i.t){const d=i.objects.find(u=>u.id===t);return d?new U(...d.r).multiplyScalar(Vn):null}let s=0,r=n.length-1;for(;s<r-1;){const d=s+r>>1;n[d].t<=e?s=d:r=d}const o=n[s],a=n[r],l=(e-o.t)/(a.t-o.t),c=n[s].objects.find(d=>d.id===t),h=n[r].objects.find(d=>d.id===t);return!c||!h?null:new U(...c.r).lerp(new U(...h.r),l).multiplyScalar(Vn)}let ci=new Map,Lo=null;function Tv(n){const t=new Map,e=n.frames[0];if(!e||e.objects.some(s=>!s.v))return t;const i=new Map;for(const s of n.events){if(s.type!=="maneuver_committed")continue;const r=s.data.obj_id;i.set(r,[...i.get(r)??[],{t:s.data.t_burn,dv:s.data.dv_vector}])}for(const s of e.objects)t.set(s.id,new xo({r:s.r,v:s.v},i.get(s.id)??[]));for(const s of n.frames.filter((r,o)=>o%5===0))for(const r of s.objects){const o=t.get(r.id);if(!o||hn(on.sub(o.stateAt(s.t).r,r.r))>.05)return new Map}return t}function cd(n,t){const e=(Lo??ci).get(n);return e?new U(...e.stateAt(t).r).multiplyScalar(Vn):pe?bv(pe.frames,n,Math.min(Math.max(t,re),$e)):null}const Eo=new $0(document.getElementById("approach-canvas")),hd=document.getElementById("approach-title"),hh=document.getElementById("approach-readout"),dd=document.getElementById("approach-legend"),dh=["#58c7ff","#c792ea","#ffb03a"];let Js=null;function Qs(n,t){return e=>hn(on.sub(n.stateAt(e).r,t.stateAt(e).r))}function ud(n){return n.map(t=>`<span><i style="border-top:2px ${t.dashed?"dashed":"solid"} ${t.color}"></i>${t.label}</span>`).join("")}function fd(n){const t=document.getElementById("approach-panel");if(!ci.size){t.hidden=!0;return}t.hidden=!1;const e=n.meta.conjunction_threshold_km??5,i=n.meta.screen_window_s??3600,s=n.frames[0],r=[],o=[],a=new Set;n.events.forEach((c,h)=>{if(c.type!=="conjunction_detected"&&c.type!=="new_conjunction")return;const d=c.data.a_id,u=c.data.b_id;if(a.has(Tn(d,u)))return;a.add(Tn(d,u));const m=new Map;for(const y of n.events.slice(0,h)){if(y.type!=="maneuver_committed")continue;const R=y.data.obj_id;m.set(R,[...m.get(R)??[],{t:y.data.t_burn,dv:y.data.dv_vector}])}const g=y=>{const R=s.objects.find(L=>L.id===y);return new xo({r:R.r,v:R.v},m.get(y)??[])},_=g(d),p=g(u),f=Ks(_,p,c.t,i),A=ci.get(d),b=ci.get(u),T=Ks(A,b,Math.max(c.t,re),$e),D=dh[r.length/2%dh.length];r.push({key:`${d}:${u}:pred`,color:"rgba(255,90,100,0.9)",dashed:!0,points:Zs(Qs(_,p),c.t,$e,[f.tca]),revealFrom:c.t,minLabel:`${f.miss.toFixed(2)} km forecast`}),r.push({key:`${d}:${u}:act`,color:D,points:Zs(Qs(A,b),re,$e,[T.tca]),revealToCursor:!0,width:2.2,minLabel:T.miss>e?`${T.miss.toFixed(1)} km actual ✓`:`${T.miss.toFixed(2)} km actual`,minLabelAfterCursor:!0}),o.push({color:D,label:`${d} ↔ ${u}`})}),o.push({color:"rgba(255,90,100,0.9)",dashed:!0,label:"forecast if nobody moves"}),Eo.set(r,re,$e,e),dd.innerHTML=ud(o),hd.textContent="HOW CLOSE DO THEY GET?";const l=n.events.find(c=>c.type==="conjunction_detected");Js=l?[l.data.a_id,l.data.b_id]:null}function Av(n){if(!Js){hh.textContent="";return}const t=Lo??ci,e=t.get(Js[0]),i=t.get(Js[1]);if(!e||!i)return;const s=hn(on.sub(e.stateAt(n).r,i.stateAt(n).r));hh.textContent=`now ${s>=100?Math.round(s).toLocaleString():s.toFixed(2)} km apart`}function Ll(n,t,e){lr=0;for(const i of n)i.t<=t||i.t>e||Do(i)}function Do(n){{const t=n.data;switch(n.type){case"conjunction_detected":case"new_conjunction":{const e=t.a_id,i=t.b_id,s=t.miss_distance_km;Te=[...Te.filter(o=>Tn(o.aId,o.bId)!==Tn(e,i)),{aId:e,bId:i,miss:s}],mv(e,i),Xn=[e,i],_i=!1,tr.clear();const r=n.type==="new_conjunction"?"⚖ RE-SCREEN ✗  NEW COLLISION RISK":"COLLISION RISK";if(Ii(n.t,`${r}  ${e} / ${i}  —  will pass ${s.toFixed(1)} km apart`,"danger"),n.type==="new_conjunction")yn("THE DODGE CREATED A NEW NEAR-MISS",`${e} / ${i} — ${s.toFixed(1)} km. Back to the negotiating table.`,"#ff4d5e");else{const o=t.tca,a=o?` in ${Math.round((o-n.t)/60)} minutes`:"";yn("COLLISION COURSE",`${e} and ${i} will pass ${s.toFixed(1)} km apart${a}`,"#ff4d5e")}break}case"comms":{if(Fv(t),bs)break;const e=String(t.from_id??"?").toUpperCase(),i=t.rationale??"";t.audit_failed?yn("⚖ THE REFEREE CAUGHT A LIE",ga(i),"#ff6b6b"):t.cannot_maneuver?yn(`${e}: “I CANNOT MOVE”`,ga(i),"#ff6b6b"):t.concede_row&&yn(`${e} CONCEDES RIGHT-OF-WAY`,ga(i),"#ffb03a");break}case"proposal":{const e=t.proposer_id;if(!e){const o=t.note??"negotiation update";Ii(n.t,`NOTE  ${o}`,"proposal");break}const i=t.recipient_id,s=Te.find(o=>o.aId===e||o.bId===e),r=i??(s?s.aId===e?s.bId:s.aId:"");r&&xv(e,r);break}case"maneuver_committed":{const e=t.obj_id;Ds(),yv(e,t.dv_vector,Sv(e,t.dv_vector,t.t_burn??n.t)),Te.filter(s=>s.aId===e||s.bId===e).forEach(s=>gv(s.aId,s.bId));const i=t.est_dv_cost*1e3;Ii(n.t,`⚖ ✓ BURN  ${e}  —  ${i.toFixed(1)} m/s of fuel`,"maneuver"),yn(`BURN — ${e.toUpperCase()}`,`${i.toFixed(1)} m/s of fuel — the physics referee verified it clears`,"#ffa060");break}case"safe_pass":{const e=t.a_id,i=t.b_id;Te=Te.filter(s=>Tn(s.aId,s.bId)!==Tn(e,i)),od(Tn(e,i)),Ii(n.t,`SAFE PASS  ${e} / ${i}  —  closest approach over, no collision`,"safe"),yn("SAFE PASS ✓",`${e} and ${i} clear each other — the dodge worked`,"#3ddc97");break}case"resolved":{tn=!0,Te=[],Xn=null,_i=!0,Co(),Ds(),Po(),Ev();const e=t.total_dv_km_s*1e3;Ii(n.t,`ALL CLEAR  —  total Δv ${e.toFixed(1)} m/s`,"safe"),yn("ALL CLEAR",`negotiated peer-to-peer, physics-verified — ${e.toFixed(1)} m/s of fuel total`,"#3ddc97"),pe&&setTimeout(()=>Hv(pe),1400);break}}}}let Di=!0,hi=!1,di=[],ao=0;function wv(n){let t;if(n.type==="comms"){const e=(n.data.rationale??"").length;t=Math.min(1200+e*8,2800)}else n.type==="referee-verify"?t=1400:n.type==="conjunction_detected"||n.type==="new_conjunction"?t=2e3:n.type==="safe_pass"?t=2200:t=1100;return t*Math.min(1.5,Math.max(.5,30/zi))}function Rv(n){const t=[];for(const e of n){if(e.type==="proposal"){Do(e);continue}e.type==="maneuver_committed"&&t.push({type:"referee-verify",t:e.t,data:e.data}),t.push(e)}return t}function Cv(n){const t=String(n.data.obj_id??"?");Ii(n.t,`⚖ REFEREE  VERIFYING ${t}'s burn — propagate → screen → fuel check…`,"referee"),yn("PHYSICS REFEREE — VERIFYING",`does ${t}'s burn actually clear? propagation, conjunction screening, fuel budget`,"#9fd8ff")}function Pv(n){if(n<ao)return;const t=di.shift();if(t){lr=0,t.type==="referee-verify"?Cv(t):Do(t);const e=t.type==="comms"&&bs?350:wv(t);ao=n+e}!di.length&&n>=ao-1&&(hi=!1)}function Dl(){if(!(!hi&&!di.length)){Wi=!0;for(const n of di)n.type!=="referee-verify"&&Do(n);Wi=!1,di=[],hi=!1}}const uh=new U(0,.7,3.2),Lv=new U(0,0,0);let Xn=null,_i=!1,gr=!1;mi.addEventListener("start",()=>{gr=!0,Xn=null,_i=!1});function Dv(){if(!gr)if(Xn){const n=me.get(Xn[0])?.mesh.position,t=me.get(Xn[1])?.mesh.position;if(!n||!t)return;const e=n.clone().add(t).multiplyScalar(.5),i=e.clone().normalize();let s=new U(0,1,0).cross(i);s.lengthSq()<1e-6&&(s=new U(1,0,0)),s.normalize();const r=e.clone().add(i.multiplyScalar(.5)).add(s.multiplyScalar(.24));Qe.position.lerp(r,.016),mi.target.lerp(e,.035)}else _i&&(Qe.position.lerp(uh,.025),mi.target.lerp(Lv,.025),Qe.position.distanceTo(uh)<.03&&(_i=!1))}function Il(n,t){Te=[],tn=!1,Co(),Ds(),Po(),Pl(),li.innerHTML="",Rn.classList.remove("visible"),pd(),Uo(),di=[],hi=!1,Wi=!0,Ll(n,re-.001,t),Wi=!1}function Iv(n){return Mo(n)?Ve.DEBRIS:tn?Ve.SAFE:Te.some(t=>t.aId===n||t.bId===n)?Ve.DANGER:Ve.NORMAL}function Uv(n,t){n.trailPts.push(t.clone()),n.trailPts.length>nd&&n.trailPts.shift();const e=n.trailPts.length;for(let i=0;i<e;i++){const s=n.trailPts[i];n.trailBuf.setXYZ(i,s.x,s.y,s.z)}n.trailBuf.needsUpdate=!0,n.trailLine.geometry.setDrawRange(0,e>1?e:0),n.trailLine.geometry.computeBoundingSphere()}function Io(){tn?(ro.className="",oo.textContent="ALL CLEAR — RESOLVED"):Te.length>0?(ro.className="danger",oo.textContent=Te.length>1?`${Te.length} ACTIVE COLLISION RISKS`:`COLLISION RISK — ${Te[0].aId} / ${Te[0].bId}`):(ro.className="",oo.textContent="ALL CLEAR")}function Ii(n,t,e){const i=document.createElement("div");i.className=`log-entry ${e}`,i.textContent=`T+${String(Math.round(n)).padStart(5)}s  ${t}`,li.appendChild(i),li.scrollTop=li.scrollHeight}const fh=["#58c7ff","#ffb03a","#c792ea","#3ddc97","#ff8fa3","#9fb4c7"],Kr=new Map;function Nv(n){return n==="REFEREE"?"#cfeaff":(Kr.has(n)||Kr.set(n,fh[Kr.size%fh.length]),Kr.get(n))}const Zr=new Map,tr=new Map;let Ci=null,bs=!1,lr=0;function Ov(n){if(n.audit_failed)return{label:"⚖ AUDIT — CLAIM REJECTED",cls:"k-cannot"};if(n.cannot_maneuver)return{label:"CANNOT MANEUVER",cls:"k-cannot"};if(n.assert_row)return{label:"ASSERTS RIGHT-OF-WAY",cls:"k-assert"};if(n.concede_row)return{label:"CONCEDES — TAKES THE BURN",cls:"k-concede"};if(n.kind==="propose"){const t=n.est_dv_cost;return{label:`PROPOSES BURN${t?`  ${(t*1e3).toFixed(1)} m/s`:""}`,cls:"k-propose"}}return n.kind==="accept"?{label:"ACCEPTS",cls:"k-accept"}:n.directive?{label:"DIRECTIVE",cls:"k-directive"}:{label:String(n.kind??"MSG").toUpperCase(),cls:"k-directive"}}function Fv(n){const t=String(n.from_id??"?"),e=String(n.to_id??"?"),{label:i,cls:s}=Ov(n),r=n.rationale??"",o=`${t}|${i}`,a=tr.get(o);if(a){a.rounds+=1;let m=a.el.querySelector(".comms-rounds");m||(m=document.createElement("div"),m.className="comms-rounds",a.el.appendChild(m)),m.textContent=`RESTATED — ${a.rounds} ROUNDS`,bs=!0;return}if(Ci&&Ci.from===t&&r&&Ci.rationale===r){const m=Ci.el.querySelector(".comms-route");if(m&&!m.textContent.includes(i)){const g=document.createElement("span");g.className=`comms-kind ${s}`,g.textContent=i,m.appendChild(g)}tr.set(o,{el:Ci.el,rounds:1}),bs=!0;return}bs=!1,Zr.has(t)||Zr.set(t,Zr.size%2?"right":"left");const l=document.createElement("div");l.className=`comms-bubble ${Zr.get(t)}`,l.style.setProperty("--sat-color",Nv(t)),l.style.animationDelay=`${Math.min(lr*.14,.7)}s`,lr+=1;const c=document.createElement("div");c.className="comms-route";const h=document.createElement("span");h.className="comms-from",h.textContent=t.toUpperCase();const d=document.createElement("span");d.className="comms-to",d.textContent=`→ ${e.toUpperCase()}`;const u=document.createElement("span");if(u.className=`comms-kind ${s}`,u.textContent=i,c.append(h,d,u),l.appendChild(c),r){const m=document.createElement("div");m.className="comms-text",m.textContent=r,l.appendChild(m)}li.appendChild(l),li.scrollTop=li.scrollHeight,tr.set(o,{el:l,rounds:1}),Ci={from:t,rationale:r,el:l}}function pd(){tr.clear(),Ci=null,bs=!1,lr=0}const gs=document.getElementById("caption"),Bv=document.getElementById("caption-headline"),zv=document.getElementById("caption-sub"),Ul=[];let Ts=null,As=!1,rl=!1,Wi=!1,ol="";function yn(n,t,e,i=!1){Wi||n!==ol&&(ol=n,Ul.push({head:n,sub:t,color:e,sticky:i}),Nl())}function Nl(){if(As)return;const n=Ul.shift();n&&(As=!0,rl=!!n.sticky,gs.style.setProperty("--cap-color",n.color),gs.style.setProperty("--cap-glow",`${n.color}66`),Bv.textContent=n.head,zv.textContent=n.sub,gs.classList.add("visible"),n.sticky||(Ts=setTimeout(()=>{gs.classList.remove("visible"),Ts=setTimeout(()=>{As=!1,Nl()},450)},3400)))}function md(){!As||!rl||(rl=!1,gs.classList.remove("visible"),Ts=setTimeout(()=>{As=!1,Nl()},450))}function Uo(){Ul.length=0,Ts&&clearTimeout(Ts),Ts=null,As=!1,ol="",gs.classList.remove("visible")}function ga(n,t=130){const e=n.indexOf(". "),i=e>20&&e<t?n.slice(0,e+1):n.slice(0,t);return i.length<n.length&&!i.endsWith(".")?`${i.trimEnd()}…`:i}const ph={conjunction_detected:"danger",new_conjunction:"danger",proposal:"proposal",maneuver_committed:"maneuver",safe_pass:"safe",resolved:"safe"};function kv(n,t,e){ch.innerHTML="";const i=e-t;i<=0||n.forEach(s=>{if(!(s.type in ph))return;const r=(s.t-t)/i,o=document.createElement("div");o.className=`ev-mark ${ph[s.type]}`,o.style.left=`calc(7px + ${(r*100).toFixed(3)}% - ${(r*14).toFixed(3)}px)`,o.title=`T+${s.t}s: ${s.type}`,ch.appendChild(o)})}let pe=null,re=0,$e=1,jt=0,ge=!1,zi=30,Jr=0;function Ol(n){if(n.events.some(r=>r.type==="resolved")&&!n.events.some(r=>r.type==="safe_pass")){const r=n.events.filter(o=>(o.type==="conjunction_detected"||o.type==="new_conjunction")&&typeof o.data.tca=="number").map(o=>({t:o.data.tca+1,type:"safe_pass",data:{a_id:o.data.a_id,b_id:o.data.b_id}}));n.events=[...n.events,...r].sort((o,a)=>o.t-a.t)}vi.active&&vd(!1),pe=n,re=n.frames[0]?.t??0,$e=n.frames.at(-1)?.t??1,ci=Tv(n),fd(n),document.getElementById("try-btn").toggleAttribute("disabled",!ci.size),jt=re,ge=!1,tn=!1,Te=[];const t=n.meta.objects,e=Array.isArray(t)?t:[...new Set(n.frames.flatMap(r=>r.objects.map(o=>o.id)))];pv(e,n.frames),Co(),Ds(),Po(),Pl(),Rn.classList.remove("visible"),li.innerHTML="",ai.value="0",dn(),Fl(),Io(),kv(n.events,re,$e),pd(),Uo(),di=[],hi=!1,Xn=null,_i=!1,gr=!1,Ii(re,`Loaded — ${e.length} objects, ${n.events.length} events`,"info"),jt=re-.001;const i=n.events.find(r=>r.type==="conjunction_detected");if(i){const r=i.data;yn("TWO SATELLITES, ONE COLLISION COURSE",`${r.a_id} / ${r.b_id} — press ▶ to watch them negotiate their way out`,"#58c7ff",!0)}const s=document.getElementById("sim-toggle");if(s){const r=s.querySelector(".btn-count");r&&(r.textContent=`(${e.length})`),s.classList.toggle("active",_s)}}let mh=performance.now();function gd(){requestAnimationFrame(gd);const n=performance.now(),t=Math.min(n-mh,100);if(mh=n,pe){if(ge&&vi.active)jt=Math.min(mn,jt+t/1e3*zi),jt>=mn&&(ge=!1,dn()),ai.value=String(Math.round((jt-re)/(mn-re)*1e3));else if(ge)if(hi)Pv(n);else{const s=jt;let r=t/1e3*zi;if(Di){const o=pe.events.find(a=>a.t>jt+1e-6)?.t??$e;(o-jt)/zi>4.5&&(r=t/1e3*((o-jt)/4))}if(jt=Math.min($e,jt+r),Di){const o=pe.events.find(a=>a.t>s&&a.t<=jt);o&&(jt=o.t,di=Rv(pe.events.filter(a=>a.t>s&&Math.abs(a.t-o.t)<.5)),hi=!0,ao=n)}else Ll(pe.events,s,jt);jt>=$e&&!hi&&(ge=!1,dn()),ai.value=String(Math.round((jt-re)/($e-re)*1e3))}Jr++,me.forEach((s,r)=>{const o=cd(r,jt);o&&(s.mesh.position.copy(o),s.mesh.scale.setScalar(Ja.clamp(Qe.position.distanceTo(o)/2.6,.12,1.2)),Jr%3===0&&Uv(s,o),gi.get(r)?.position.copy(o))}),_v(),Jr%8===0&&vv(),Mv(n);const e=s=>s.scale.setScalar(Ja.clamp(Qe.position.distanceTo(s.position)/2.6,.15,1.2));gi.forEach(e),en&&e(en),Gn&&e(Gn);const i=.45+.55*Math.sin(n*.007);me.forEach((s,r)=>{const o=Iv(r),a=s.mesh.material,l=s.glow.material;a.color.setHex(o),a.emissive.setHex(o);const c=!tn&&Te.some(d=>d.aId===r||d.bId===r);if(a.emissiveIntensity=c?.35+i*.65:.55,l.color.setHex(o),l.opacity=c?.08+i*.28:.12,s.trailLine.material.color.setHex(c?4456448:tn?17442:Ve.TRAIL),s.orbitRing){const d=s.orbitRing.material;d.color.setHex(c?4460800:tn?17442:Ve.RING),d.opacity=c?.55+i*.2:.38}}),Jr%5===0&&(vi.active||Io(),Av(jt)),Eo.setCursor(jt),Eo.render(),Fl()}rd.rotation.y+=8e-5,An.tick60(new Date),Dv(),mi.update(),Wn.render(ne,Qe),mr.render(ne,Qe)}const Rn=document.getElementById("outcome-card");function Hv(n){const t=n.meta,e=n.events,i=t.converged??!0,s=((t.total_dv_km_s??0)*1e3).toFixed(1),r=String(t.rounds_total??0),o=String(t.topology??"").toUpperCase(),a=String(t.scenario??""),l=e.filter(u=>u.type==="conjunction_detected"||u.type==="new_conjunction").length,c=e.filter(u=>u.type==="maneuver_committed").length,h=e.find(u=>u.type==="resolved"),d=h?String(Math.round(h.t)):"—";document.getElementById("outcome-headline").textContent=i?"RESOLVED":"UNRESOLVED",document.getElementById("outcome-scenario").textContent=a.toUpperCase(),document.getElementById("stat-dv").textContent=s,document.getElementById("stat-conjunctions").textContent=String(l),document.getElementById("stat-maneuvers").textContent=String(c),document.getElementById("stat-rounds").textContent=r,document.getElementById("stat-time").textContent=d,document.getElementById("stat-topology").textContent=o,Rn.classList.toggle("failed",!i),Rn.classList.add("visible")}document.getElementById("outcome-dismiss")?.addEventListener("click",()=>{Rn.classList.remove("visible")});Rn.addEventListener("click",n=>{n.target===Rn&&Rn.classList.remove("visible")});function dn(){Rl.textContent=ge?"⏸":"▶"}function Fl(){const n=Math.max(jt,re),t=Math.floor(n/60),e=Math.floor(n%60);lv.textContent=`T+${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}`}Rl.addEventListener("click",()=>{if(pe){if(vi.active){!ge&&jt>=mn-1e-6&&(jt=re),ge=!ge,dn();return}!ge&&jt>=$e&&(jt=re-.001,Il(pe.events,jt),ai.value="0"),ge=!ge,ge&&md(),dn()}});ai.addEventListener("input",()=>{if(!pe)return;if(vi.active){jt=re+parseFloat(ai.value)/1e3*(mn-re),me.forEach(i=>{i.trailPts=[],i.trailLine.geometry.setDrawRange(0,0)});return}const n=parseFloat(ai.value)/1e3,t=re+n*($e-re),e=ge;ge=!1,Dl(),t<jt?Il(pe.events,t):(Wi=!0,Ll(pe.events,jt,t),Wi=!1,Uo()),jt=t,me.forEach((i,s)=>{const r=cd(s,jt);r&&(i.mesh.position.copy(r),i.trailPts=[],i.trailLine.geometry.setDrawRange(0,0))}),Io(),Fl(),e&&(ge=!0,dn())});sl.addEventListener("change",()=>{zi=parseFloat(sl.value)});{const n=document.getElementById("info-card"),t=()=>n.classList.add("visible"),e=()=>{n.classList.remove("visible");try{localStorage.setItem("row-intro-seen","1")}catch{}};document.getElementById("info-btn")?.addEventListener("click",t),document.getElementById("info-dismiss")?.addEventListener("click",e),document.getElementById("info-close")?.addEventListener("click",e),n.addEventListener("click",i=>{i.target===n&&e()}),window.addEventListener("keydown",i=>{i.key==="Escape"&&n.classList.contains("visible")&&e()}),document.getElementById("launcher-howto")?.addEventListener("click",t)}const _a=document.getElementById("story-btn");_a?.addEventListener("click",()=>{Di=!Di,Di||Dl(),_a.classList.toggle("on",Di),_a.textContent=Di?"✦ STORY ON":"✦ STORY OFF"});document.getElementById("live-btn")?.addEventListener("click",async n=>{const t=n.currentTarget;t.disabled=!0,t.style.opacity="0.45";try{await rv(Cl),t.textContent="🌍 HD EARTH ✓"}catch(e){console.warn(e),t.disabled=!1,t.style.opacity=""}});{const n=document.getElementById("run-btn"),t="http://localhost:8000";fetch(`${t}/openapi.json`,{method:"GET"}).then(e=>{e.ok&&n&&(n.hidden=!1)}).catch(()=>{}),n?.addEventListener("click",async()=>{if(!(!n||n.disabled)){n.disabled=!0,n.textContent="⟳ RUNNING…";try{const e=await fetch(`${t}/run?topology=hierarchical`,{method:"POST"});if(!e.ok)throw new Error(`API ${e.status}: ${await e.text()}`);const i=await e.json();No="custom",Ol(i),ge=!0,dn()}catch(e){console.error("Run failed:",e),alert(`Simulation failed: ${e}`)}finally{n.disabled=!1,n.textContent="▶ RUN"}}})}{const n=new i0,t=new zt;let e=0,i=0;Wn.domElement.addEventListener("mousedown",s=>{e=s.clientX,i=s.clientY}),Wn.domElement.addEventListener("click",s=>{if(Math.hypot(s.clientX-e,s.clientY-i)>5)return;const r=Wn.domElement.getBoundingClientRect();t.set((s.clientX-r.left)/r.width*2-1,(s.clientY-r.top)/r.height*-2+1),n.setFromCamera(t,Qe),An.handleClick(n,Qe.position.length())||An.clearPickLabel()})}window.addEventListener("resize",()=>{Qe.aspect=innerWidth/innerHeight,Qe.updateProjectionMatrix(),Wn.setSize(innerWidth,innerHeight),mr.setSize(innerWidth,innerHeight)});window.addEventListener("dragover",n=>n.preventDefault());window.addEventListener("drop",n=>{n.preventDefault();const t=n.dataTransfer?.files[0];if(!t)return;const e=new FileReader;e.onload=i=>{try{No="custom",Ol(JSON.parse(i.target.result))}catch{alert("Invalid Timeline JSON — check the console.")}},e.readAsText(t)});let _s=!0;function Gv(n){_s=n,me.forEach(t=>{t.mesh.visible=n,t.trailLine.visible=n,t.orbitRing&&(t.orbitRing.visible=n)}),n?(wn.forEach(t=>{t.visible=!0}),Vi.forEach(t=>{t.visible=!0}),gi.forEach(t=>{t.visible=!0}),cn&&(cn.visible=!0),en&&(en.visible=!0)):(wn.forEach(t=>{t.visible=!1}),Vi.forEach(t=>{t.visible=!1}),gi.forEach(t=>{t.visible=!1}),cn&&(cn.visible=!1),en&&(en.visible=!1),ar.forEach((t,e)=>{me.get(e)?.mesh&&(me.get(e).mesh.visible=!1)}))}document.getElementById("sim-toggle")?.addEventListener("click",function(){_s=!_s,Gv(_s),this.classList.toggle("active",_s);const n=me.size,t=this.querySelector(".btn-count");t&&(t.textContent=`(${n})`)});const An=new H0(ne);function Vv(n){const t=n.dataset.group,e=An.isVisible(t),i=An.count(t);n.classList.toggle("active",e);const s=n.querySelector(".btn-count");s&&(s.textContent=i>0?`(${i})`:"")}document.querySelectorAll(".sat-group-btn").forEach(n=>{n.addEventListener("click",async()=>{const t=n.dataset.group;if(An.isLoaded(t))An.setVisible(t,!An.isVisible(t));else{n.classList.add("loading"),n.querySelector(".btn-count").textContent="…";try{await An.loadGroup(t),An.setVisible(t,!0)}catch(e){const i=String(e).includes("rate-limit")?"2h":"ERR";console.warn("CelesTrak fetch failed:",e),n.querySelector(".btn-count").textContent=i}finally{n.classList.remove("loading")}}Vv(n)})});let mn=1,er=[],Gn=null,No="aeolus";function va(n,t,e,i,s={}){const r=[];for(let h=0;h<=160;h++){const d=t+(e-t)*h/160;r.push(new U(...n.stateAt(d).r).multiplyScalar(Vn))}const a=new Ce().setFromPoints(r),l=s.dashed?new j_({color:i,dashSize:.012,gapSize:.01,transparent:!0,opacity:s.opacity??.8}):new Mi({color:i,transparent:!0,opacity:s.opacity??.95}),c=new Ns(a,l);return s.dashed&&c.computeLineDistances(),ne.add(c),c}function _d(){er.forEach(n=>{ne.remove(n),n.geometry.dispose()}),er=[],Gn&&(Gn.traverse(n=>{const t=n;t.isCSS2DObject&&t.element&&t.element.remove()}),ne.remove(Gn),Gn=null)}const gh={clear:"#3ddc97",new:"#ffb03a",collide:"#ff5a64",fuel:"#ff5a64",none:"#ff5a64"};function Wv(n){Lo=n.trajs;const t=pe?.meta.conjunction_threshold_km??5,e=n.verdict!=="none"&&n.verdict!=="fuel";mn=Math.max($e,n.newRisk?n.newRisk.ap.tca+60:0),_d();const i=Math.min(mn,Math.max(n.original.tca,n.pair.tca)+120),s=n.burn.t;if(er.push(va(n.baseline.get(n.mover),s,i,16731486,{dashed:!0,opacity:.75})),er.push(va(n.baseline.get(n.partner),s,i,5818367,{opacity:.45})),e){const h=new Yt(gh[n.verdict]).getHex();er.push(va(n.trajs.get(n.mover),s,i,h));const d=new U(...n.baseline.get(n.mover).stateAt(n.burn.t).r).multiplyScalar(Vn),u=new U(...n.burn.dv).normalize();Gn=new Zh(u,d,.14,16755200,.03,.014);const m=document.createElement("div");m.className="burn-label",m.textContent=`▲ ${n.dvMs.toFixed(1)} m/s — your burn`;const g=new Gi(m);g.position.copy(u.clone().multiplyScalar(.17)),Gn.add(g),ne.add(Gn)}tn=n.verdict==="clear",Te=tn?[]:[{aId:n.mover,bId:n.partner,miss:n.pair.miss}],ro.className=tn?"":"danger",oo.textContent=tn?"YOUR MOVE — REFEREE APPROVES":"YOUR MOVE — NOT CLEAR YET";const r=[],[o,a]=[n.mover,n.partner],l=Qs(n.baseline.get(o),n.baseline.get(a));r.push({key:"base",color:"rgba(255,90,100,0.9)",dashed:!0,points:Zs(l,re,mn,[n.original.tca]),minLabel:`${n.original.miss.toFixed(2)} km if nobody moves`});const c=[{color:"rgba(255,90,100,0.9)",dashed:!0,label:"nobody moves"}];if(e){const h=gh[n.verdict==="new"?"clear":n.verdict];if(r.push({key:"you",color:h,width:2.2,points:Zs(Qs(n.trajs.get(o),n.trajs.get(a)),re,mn,[n.pair.tca]),minLabel:`${n.pair.miss.toFixed(2)} km with your burn`}),c.push({color:h,dashed:!1,label:`${o} ↔ ${a}, your burn`}),n.newRisk){const d=n.newRisk;r.push({key:"new",color:"#ffb03a",width:2,points:Zs(Qs(n.trajs.get(o),n.trajs.get(d.id)),re,mn,[d.ap.tca]),minLabel:`${d.ap.miss.toFixed(2)} km — new near-miss`}),c.push({color:"#ffb03a",dashed:!1,label:`${o} ↔ ${d.id}`})}}Eo.set(r,re,mn,t),dd.innerHTML=ud(c),hd.textContent="YOUR BURN vs. NOBODY MOVING",Js=[o,a]}const vi=new K0({onResult:Wv,onFly:()=>{jt=re,ge=!0,gr=!1,me.forEach(n=>{n.trailPts=[],n.trailLine.geometry.setDrawRange(0,0)}),dn()},onExit:()=>vd(!0)});function Bl(n){if(!pe||!ci.size||(ge=!1,dn(),Dl(),Uo(),Co(),Ds(),Po(),Pl(),Rn.classList.remove("visible"),_r(),!vi.open(pe,No,n)))return;const t=vi.result;jt=Math.max(re,t.original.tca-90),Xn=[t.mover,t.partner],_i=!1,gr=!1,me.forEach(e=>{e.trailPts=[],e.trailLine.geometry.setDrawRange(0,0)}),zi>30&&(zi=30,sl.value="30")}function vd(n){vi.close(),Lo=null,_d(),tn=!1,Te=[],ge=!1,dn(),n&&pe&&(fd(pe),jt=re-.001,Il(pe.events,jt),ai.value="0",Xn=null,_i=!0,Io())}document.getElementById("try-btn")?.addEventListener("click",()=>Bl());document.getElementById("outcome-try")?.addEventListener("click",()=>Bl());const Xv=[{key:"aeolus",kicker:"REAL INCIDENT · SEPT 2019",color:"#ffcc66",title:"The email dodge",body:"ESA’s €480M Aeolus and Starlink-44 on a sub-kilometre course. In 2019 the operators coordinated by email, and one side never answered. Here, the agents run the negotiation."},{key:"liar",kicker:"ADVERSARIAL",color:"#ff6b6b",title:"The lying satellite",body:"A low-priority agent with a full tank claims it can’t move, so the other side eats the cost. Its partner falls for it. The referee checks the tank and doesn’t."},{key:"forced-trade",kicker:"CHAIN REACTION",color:"#c792ea",title:"The forced trade",body:"The satellite that should yield is out of fuel, so the high-priority one has to move. Its dodge sets up a second near-miss, and they go back to the table."},{key:"live",kicker:"REAL CONJUNCTION · JUL 2026",color:"#3ddc97",title:"Starlink vs. a dead nanosat",body:"A real predicted close approach from CelesTrak SOCRATES: STARLINK-3068 and VELOX-I, a defunct Singaporean cubesat that cannot move."}],cr=document.getElementById("launcher"),_h=document.getElementById("mission-grid"),xa=new Map;function xd(n){if(!xa.has(n)){const t=n==="local"?"./timeline.json":`./runs/${n}.json`;xa.set(n,fetch(t).then(e=>{if(!e.ok)throw new Error(`${t}: ${e.status}`);return e.json()}))}return xa.get(n).then(t=>structuredClone(t))}function qv(n){const t=n.events.find(s=>s.type==="conjunction_detected")?.data,e=(n.meta.total_dv_km_s??0)*1e3,i=[];return t&&i.push(`<b>${t.miss_distance_km.toFixed(2)} km</b> predicted miss`),t&&i.push(`<b>${t.rel_speed.toFixed(1)} km/s</b> closing`),i.push(`agents spent <b>${e.toFixed(1)} m/s</b>`),i.join(" · ")}function Yv(){_h.innerHTML="";for(const n of Xv){const t=document.createElement("div");t.className="mission",t.style.setProperty("--m-color",n.color);let e="";try{const i=localStorage.getItem(`row-best-${n.key}`);i&&(e=`<div class="mission-best">⚖ your best dodge: ${Number(i).toFixed(1)} m/s</div>`)}catch{}t.innerHTML=`
      <div class="mission-kicker">${n.kicker}</div>
      <div class="mission-title">${n.title}</div>
      <div class="mission-body">${n.body}</div>
      <div class="mission-stats">…</div>
      ${e}
      <div class="mission-actions">
        <button class="m-watch">▶ WATCH THE AGENTS</button>
        <button class="m-try">⚖ YOUR MOVE</button>
      </div>`,xd(n.key).then(i=>{t.querySelector(".mission-stats").innerHTML=qv(i)}).catch(()=>{t.querySelector(".mission-stats").textContent=""}),t.querySelector(".m-watch").addEventListener("click",()=>al(n.key,"watch")),t.querySelector(".m-try").addEventListener("click",()=>al(n.key,"try")),_h.appendChild(t)}}function zl(){ge=!1,dn(),Yv(),cr.classList.add("visible")}function _r(){cr.classList.remove("visible")}async function al(n,t,e){_r();try{const i=await xd(n);No=n,Ol(i);const s=new URL(location.href);s.searchParams.set("timeline",n),e||s.searchParams.delete("try"),history.replaceState(null,"",s),t==="watch"?(ge=!0,md(),dn()):t==="try"&&Bl(e)}catch(i){cv.textContent="Could not load that run — drop a timeline JSON to begin",console.warn(i)}}document.getElementById("missions-btn")?.addEventListener("click",zl);document.getElementById("launcher-close")?.addEventListener("click",_r);document.getElementById("outcome-missions")?.addEventListener("click",()=>{Rn.classList.remove("visible"),zl()});cr.addEventListener("click",n=>{n.target===cr&&_r()});window.addEventListener("keydown",n=>{const t=n.target.tagName;t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||(n.key===" "?(n.preventDefault(),Rl.click()):n.key==="Escape"&&cr.classList.contains("visible")&&_r())});const Xs=new URLSearchParams(location.search);Xs.has("clean")&&document.body.classList.add("clean");{const n={"":"aeolus"},t=Xs.get("timeline"),e=t?n[t]??t:"aeolus",i=Xs.get("try"),s=i!==null?"try":Xs.has("autoplay")?"watch":"idle";al(e,s,i).then(()=>{!t&&s==="idle"&&!Xs.has("clean")&&zl()})}gd();
