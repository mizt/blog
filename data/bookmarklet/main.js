!function(){
	var d = document,
		t = d.querySelector("video"),
		w = 656,
		h = 368;
	var r = (w*h)<<2;
	
	if(!!t&&!!querySelector("#ekran")) {
		var c = d.createElement("canvas");
		c.id = "#ekran";
		c.width = w; c.height = h;
		var e = c.getContext("2d");
		d.body.appendChild(c);
		var s = c.style;
		s.zIndex=10000000000;
		s.position="absolute";
		s.top = 0;
		s.width = w+"px";
		s.height = h+"px";
		
		var m = new Uint8Array(Module.HEAPU8.buffer,Module._malloc(r),r);	
		
		(Module.cwrap("setup","void",["number","number"]))(w,h);
		var f=(Module.cwrap("draw","void",["number"]));
		
		setInterval(function(){
			
			t = d.querySelector("video")
			
			if(!!t) {
			
				e.drawImage(t,0,0,w,h);			
			}
			
			var i = e.getImageData(0,0,w,h);
			m.set(new Uint8Array(i.data.buffer));
			f(m.byteOffset);
			i.data.set(m);			
			e.putImageData(i,0,0);
			
			
		},33);
				
	}
}();