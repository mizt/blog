!function(){!function(a,b){"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.crel=b()}(this,function(){function a(){var d,l=arguments,m=l[0],p=l[1],q=2,r=l.length,s=a[g];if(m=a[i](m)?m:j.createElement(m),1===r)return m;if((!k(p,c)||a[h](p)||n(p))&&(--q,p=null),r-q===1&&k(l[q],"string")&&void 0!==m[e])m[e]=l[q];else for(;r>q;++q)if(d=l[q],null!=d)if(n(d))for(var t=0;t<d.length;++t)o(m,d[t]);else o(m,d);for(var u in p)if(s[u]){var v=s[u];typeof v===b?v(m,p[u]):m[f](v,p[u])}else m[f](u,p[u]);return m}var b="function",c="object",d="nodeType",e="textContent",f="setAttribute",g="attrMap",h="isNode",i="isElement",j=typeof document===c?document:{},k=function(a,b){return typeof a===b},l=typeof Node===b?function(a){return a instanceof Node}:function(a){return a&&k(a,c)&&d in a&&k(a.ownerDocument,c)},m=function(b){return a[h](b)&&1===b[d]},n=function(a){return a instanceof Array},o=function(b,c){a[h](c)||(c=j.createTextNode(c)),b.appendChild(c)};return a[g]={},a[i]=m,a[h]=l,"undefined"!=typeof Proxy&&(a.proxy=new Proxy(a,{get:function(b,c){return!(c in a)&&(a[c]=a.bind(null,c)),a[c]}})),a});var a,b,c,d=crel("div",{id:"wrapper"}),e=crel("canvas",{id:"stage",width:"512",height:"512"}),f=crel("div",{id:"control"}),g=crel("canvas",{width:512,height:512});crel(document.body,crel(d,e,f)),window.receiveJavaScript=function(a,b){console.log("window.receiveJavaScript",a,b)};var h=new Image;h.src="./image.jpg",h.onload=function(){g.getContext("2d").drawImage(h,0,0),setTimeout(function(){window.indicator.stop(),d.style.opacity=1,a=new Uint8Array(Module.HEAPU8.buffer,Module._malloc(h.width*h.height<<2),h.width*h.height<<2),a.set(new Uint8Array(g.getContext("2d").getImageData(0,0,h.width,h.height).data.buffer)),b=new Uint8Array(Module.HEAPU8.buffer,Module._malloc(h.width*h.height<<2),h.width*h.height<<2),c=Module._malloc(1024),Module.writeStringToMemory(JSON.stringify({blur:0}),c),Module.cwrap("setup","void",["number"])(c),Module.cwrap("data","void",["number"])(a.byteOffset),Module.cwrap("processimage","void",["number"])(b.byteOffset);var f=e.getContext("2d").getImageData(0,0,h.width,h.height);f.data.set(b),e.getContext("2d").putImageData(f,0,0)},50)};window.gui=window.gui||{callback:void 0},window.gui.isTouch="ontouchstart"in window;var j=function(a){a.preventDefault(),window.gui.callback=void 0},k=function(a){a.preventDefault(),window.gui.callback&&(window.gui.isTouch&&(a=a.touches[0]),window.gui.callback(window.gui.clientX+(a.screenX-window.gui.screenX)))};window.gui.isTouch?(window.addEventListener("touchend",j,!1),window.addEventListener("touchcancel",j,!1),window.addEventListener("touchmove",k,!1)):(window.addEventListener("mouseup",j,!1),window.addEventListener("mousemove",k,!1));var l=0,m=function(a){l&&(clearTimeout(l),l=0),l=setTimeout(function(){window.innerWidth<512?(e.style.height=e.style.width=document.documentElement.offsetWidth+"px",n.resize(document.documentElement.offsetWidth),f.style.marginLeft=e.style.marginLeft=0):(e.style.height=e.style.width="512px",n.resize(512),f.style.marginLeft=e.style.marginLeft=(document.documentElement.offsetWidth-512>>1)+"px");var a=e.offsetHeight+80;if(window.innerHeight-32-32>a+32){d.style.marginTop=(window.innerHeight-32-a>>1)+"px",document.body.style.overflowY="hidden";var b=document.getElementById("slider");b.style.marginTop="32px"}else if(window.innerHeight-32>a){console.log("2"),d.style.marginTop=0,document.body.style.overflowY="auto";var b=document.getElementById("slider");b.style.marginTop=(window.innerHeight-a>>1)+"px"}else{d.style.marginTop=0,document.body.style.overflowY="auto";var b=document.getElementById("slider");b.style.marginTop="32px"}l=0},50)},n=function(){var a=document.documentElement.offsetWidth-20-64,d=document.createElement("div");d.id="slider",d.className="ui",d.style.width=a+20+"px";var i=crel("div",{style:"position:absolute; top:36px; width:"+(a+20)+"px; height:8px; background-color:#999;border-radius:4px; z-index:0"}),j=crel("div",{style:"position:absolute; top:36px; left:10px; width:"+(a+10)+"px; height:8px; background-color:#DDD;border-radius:4px; z-index:1"}),k=crel("div",{style:"position:absolute; left:10px; width:10px; height:80px; background-color:#5EE;border-radius:2px;z-index:2;"});i.style.pointerEvents="none",j.style.pointerEvents="none",k.style.pointerEvents="none";var l=0,m=100,n=0;return d.addEventListener(window.gui.isTouch?"touchstart":"mousedown",function(d){d.preventDefault(),window.gui.isTouch&&(d=d.touches[0]),window.gui.callback=function(d){d-=this.getBoundingClientRect().left,d<10&&(d=10),d>a+10&&(d=a+10),n=(d-10)/a,Module.writeStringToMemory("blur",c),Module.cwrap("set","void",["number"])(c,l+n*(m-l)),Module.cwrap("processimage","void",["number"])(b.byteOffset);var f=e.getContext("2d").getImageData(0,0,h.width,h.height);f.data.set(b),e.getContext("2d").putImageData(f,0,0),j.style.left=d+"px",j.style.width=a+20-d+"px",k.style.left=d-5+"px"}.bind(this),window.gui.clientX=d.clientX,window.gui.screenX=d.screenX,window.gui.callback(window.gui.clientX)},!1),f.appendChild(d),d.appendChild(i),d.appendChild(j),d.appendChild(k),{resize:function(b){b>512&&(b=512),a=b-20-64,i.style.width=a+20+"px",j.style.left=10+a*n+"px",j.style.width=a-a*n+10+"px",k.style.left=5+a*n+"px"}}}();window.addEventListener("resize",m),m()}();