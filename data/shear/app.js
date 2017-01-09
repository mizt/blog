console.log("app.js");

(function() {
	
	var base = "./data/"+(window.location.search).replace("?id=","")+"/";
	//console.log("base",base);

	var description = ["h4",{"style":"padding-bottom:8px;"},"1.234kHz sinewave 2sec 44.1Khz 16bit .wav mono"];

	window.app = {
		js:"../../blog/settings.js",
		css:"../../blog/settings.css",
		html:[
			{"id":"wrapper"},[
				{"class":"container"},
				"#242.shear",
				"242.shearは画像を変形するエフェクトである。",
				"fig01.jpg",
				"効果はと言えば、斜体処理なのだが、よく見ると画素の抜けが発生している。",
				"これは(https://www.amazon.co.jp/Mac%E7%89%88C%E8%A8%80%E8%AA%9E%E3%81%A7%E5%AD%A6%E3%81%B6%E5%AE%9F%E8%B7%B5%E7%94%BB%E5%83%8F%E5%87%A6%E7%90%86-%E4%BA%95%E4%B8%8A-%E8%AA%A0%E5%96%9C/dp/4274945227,「Mac版C言語で学ぶ実践画像処理」)の第8章2(p.171)にある「変形の考え方」の図8.3「2倍拡大（誤った考え方）」であり「入力画像を基準にして出力画像のどこに対応するかを考える」である。",
				"(./data/shear/shear.html,####HTML5のCanvasによるデモ)",
				"(https://mizt.github.io/blog/?id=gain,242.gain)での色値のオーバーフローの例も含めて、画像処理の初学者が陥るであろう誤った実装が、わざと採用されている。"
			]
		],
		ready:function() {
			//console.log("ready app.js");
		}		
	};

})();