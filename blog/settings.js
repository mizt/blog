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
		
		// Chrome has a bug in  text-align:Justify
		var ua = navigator.userAgent;
		if(ua.indexOf("AppleWebKit")>=0&&ua.indexOf("Edge")==-1) {
					
			var checkOverJustify = function() {

				var w = document.querySelector(".container").offsetWidth;
				var s = document.querySelectorAll("span")

				var isOver = false;
				for(var n=0; n<s.length; n++) if(s[n].offsetWidth>w+4) { isOver = true; }

				if(isOver) {
					
					console.log("resize");
					
					if(w==960) {
						document.querySelector(".container").style.maxWidth = (960-2)+"%";
					}
					else {
						document.querySelector(".container").style.width = "84%";
					}
				}
			}

			var tid=0;
			 
			window.addEventListener('resize',function (event) {
				if (!tid) {
					clearTimeout(tid);
					tid=0;
				}
				
				tid = setTimeout(function () {		
					var container = document.querySelector(".container");
					container.style.maxWidth = 960;
					container.style.width = "85%";
					setTimeout(function() {
						checkOverJustify();
					},33);
				},33);
			});

			setTimeout(function() {
				checkOverJustify();
			},33);
		}
	}	
};