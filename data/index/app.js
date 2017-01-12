console.log("app.js");
console.log("app.js");

window.app = {
	
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},
		["div",
			["p",{"id":"text","style":"color:rgba(64,64,64,0.6);position:absolute;z-index:242;top:-0.5em;left:0.5em;font-size:50px;line-height:2em;letter-spacing:0.5em;pointer-events:none;"},"miztパイセン、昨日のVJだったけどバックグラウンドで走る謎のOSハックアプリだけ送ってきて本人現場に来ないし、グーグルチャットで話は出来るけど誰もどこにいて何してるか知らないので、既に肉体から解放されて電脳空間にいるのでは、という気がしてきた。— 神田竜 (@Kezzardrix) "],
			["iframe",{src:"http://player.vimeo.com/video/159803169",width:960,height:540}]
		],
	],
	
	ready:function() {
		
		document.getElementsByTagName("html")[0].style.height = "100%";
		document.body.style.height = "100%";
		document.body.style.backgroundColor = "#000";
		
		window.app.overflow = "hidden";
		
		var w = window.innerWidth;
		var h = window.innerHeight;
		
		var t = document.getElementById("text");
		
		var s = (Math.sqrt(((w*h)/(420))>>0)>>0);
		t.style.fontSize = s+"px"; 

		window.addEventListener("resize",function (e) {
			
			var w = window.innerWidth;
			var h = window.innerHeight;
			
			var s = (Math.sqrt(((w*h)/(420))>>0)>>0);
			t.style.fontSize = s+"px"; 
			
		});
		
	
	}
	
};