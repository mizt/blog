!function(){
	var d = document,
		t = d.querySelector("video"),
		w = 656,
		h = 368;
	var r = (w*h)<<2;
	
	if(!!t) {
		var c = d.createElement("canvas");
		c.width = "656"; c.height = "368";
		var e = c.getContext("2d");
		d.body.appendChild(c);
		var s = c.style;
		s.zIndex=242;
		s.position="absolute";
		s.top = 0;
		var m = new Uint8Array(Module.HEAPU8.buffer,Module._malloc(r,r));	
		(Module.cwrap("setup","void",["number"]))(w,h);	
		setInterval(function(){
			e.drawImage(t,0,0);
			var i = e.getImageData(0,0,w,h);
			m.set(new Uint8Array(i.data.buffer));
			(Module.cwrap("draw","void",["number"]))(m.byteOffset);
			e.putImageData(i,0,0);
		},50);
	}
}();