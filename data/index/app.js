console.log("app.js");
console.log("app.js");

window.app = {
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},
		[
			"miztパイセン、昨日のVJだったけどバックグラウンドで走る謎のOSハックアプリだけ送ってきて本人現場に来ないし、グーグルチャットで話は出来るけど誰もどこにいて何してるか知らないので、既に肉体から解放されて電脳空間にいるのでは、という気がしてきた。— 神田竜 (@Kezzardrix) ",
			["iframe",{src:"https://player.vimeo.com/video/159803169",width:960,height:540,frameBorder:"no"}]
		],
	],
	
	ready:function() {
		
		document.getElementsByTagName("html")[0].style.height = "100%";
		document.body.style.height = "100%";
		document.body.style.backgroundColor = "#000";
		
		window.app.overflow = "hidden";
				
		var wrapper = document.getElementById("wrapper");
		var t =document.querySelector("p");
		
		var css = {
			color:"rgba(64,64,64,0.5)",
			position:"absolute",
			zIndex:242,
			top:"-0.5em",
			left:"0.5em",
			lineHeight:"2em",
			letterSpacing:"0.5em",
			pointerEvents:"none"
		}

		for(key in css) {
			t.style[key] = css[key];
		}		
		
		var span = t.querySelectorAll("span");		
		for(var k=0; k<span.length; k++) {
			span[k].style.letterSpacing = "0.5em";
		}
		
		var onResize = function() {
			var w = window.innerWidth;
			var h = window.innerHeight;
			
			var s = (Math.sqrt(((w*h)/(420))>>0)>>0);
			t.style.fontSize = s+"px"; 
		};
		
		window.addEventListener("resize",onResize);
		onResize();
		
	}
	
};