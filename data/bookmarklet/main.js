!function(){
	var d = document,
		t = d.querySelector("video"),
		w = 656,
		h = 368;
	var r = (w*h)<<2;
	
	if(!!t) {
		var c = d.createElement("canvas");
		c.width = w; c.height = h;
		var e = c.getContext("2d");
		d.body.appendChild(c);
		var s = c.style;
		s.zIndex=10000000000;
		s.position="absolute";
		s.top = 0;
		s.width = w;
		s.height = h;
		var m = new Uint8Array(Module.HEAPU8.buffer,Module._malloc(r,r));	
		(Module.cwrap("setup","void",["number"]))(w,h);	
		setInterval(function(){
			var r = t.getBoundingClientRect();
			e.drawImage(t,0,0,r.width,r.height,0,0,w,h);
			var i = e.getImageData(0,0,w,h);
			m.set(new Uint8Array(i.data.buffer));
			(Module.cwrap("draw","void",["number"]))(m.byteOffset);
			e.putImageData(i,0,0);
		},50);
	}
}();