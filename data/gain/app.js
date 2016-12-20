console.log("app.js");

(function() {
	
	var base = "./data/"+(window.location.search).replace("?id=","")+"/";
	//console.log("base",base);

	window.app = {
		js:"../../blog/settings.js",
		css:"../../blog/settings.css",
		html:[
			{"id":"wrapper"},[
				{"class":"container"},
				"#242.gain varianta 1 / 242.gain2 varianta 3",
				"242.gainは画像のゲインをあげるエフェクトである。\n"+
				"ゲインをあげるというのは、ここではピクセルのRGBの値に指定の数値を加算するものである。赤色のピクセル値をr、ゲインの値をnとすると以下のようになる。",
				"`r=r+n;`",
				"242.gainは242.gain2を含めると8つのモードがありvariantaで指定できる。\n"+
				"通常のモードでは加算後のrが0〜255の範囲に固定されることになる。",
				"`r=r+n;\nif(r>255) r=255;\nelse if(r<0) r=0;`",
				"少なくともゲイン値を-255にすれば真っ黒、255にすると真っ白となる。",
				"##242.gain varianta 1",
				"./gain.png",
				"図を参照するとゲイン値が-249であり、本来ならば出力画像は黒くなっているはずだが、ここでは黄色になっている。通常のモード（varianta 0）ではピクセル値は、0〜255の範囲に固定していたが、varianta 1ではオーバーフローを許容している。\n"+
				"これをHTML5のCanvasに実装していく場合には問題がある。nato.0+55のピクセルの並びはARGBでありHTML5のCanvasはABGRである。まずABGRを個々の成分へと分解してゲイン値を加算して、ARGBにする。そして再度ARGBをABGRに戻す必要がある。\n"+
				"HTML5のCanvasでのデモではスライダーを用意した。-1024〜1024の範囲でゲイン値を変えることができる。",
				"(./data/gain/gain1.html,####HTML5のCanvasによるデモ)",
				"##242.gain2 varianta 3",
				"./gain2.png",
				"図はゲイン値が255の場合である。varianta 3は242.gain varianta 1のようにオーバーフローを許容する。ゲインは行ごとに処理される。ゲイン値がnの場合には-n〜nの範囲をランダムで、行に対するゲイン値が決定する。",
				"(./data/gain/gain2.html,####HTML5のCanvasによるデモ)",
				"242.gain varianta 1 / 242.gain2 varianta 3ともにオーバーフローを許容するエフェクトである。\nGLSLで以下のように記述しても真っ白となる。",
				"`gl_color = vec4(1.2,1.0,1.0,1.0);`",
				"シェーダだと桁あふれを実装するのは骨が折れる。"
			]
		],
		ready:function() {
			//console.log("ready app.js");
		}		
	};

})();