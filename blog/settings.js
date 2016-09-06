window.settings = {
	
	target:"_blank",
	
	/*
	iframe:function(data) {		
		return crel("div",{"class":"iframeWrapper","style":"max-width:"+(data[1])+"px"},
			crel("div",{"class":"iframeBefore","style":"padding-top:"+((data[2]/data[1])*100)+"%"}),
			crel("iframe",{"src":data[0],"scrolling":"no","frameborder":0})
		);
	},
	*/
	
	preload:true,

	// new Image().onload 
	onload:function() {
				
		//var shift = (window.devicePixelRatio&&window.devicePixelRatio>1.5)?1:0;
						
		this.style.display = "block";
		this.style.maxWidth = (this.width)+"px";//>>shift)+"px" 
		this.style.width = "100%";        
		this.onload=null;
		
	},

	// new Image().onerror
	onerror:function() {
		this.onerror=null;
	},

	load:function() {
		document.body.style.overflow = "hidden";
	},

	ready:function() {
		
		document.body.style.overflow = "auto";
		document.getElementById("wrapper").style.opacity = 1.0;
		
	}
	
};