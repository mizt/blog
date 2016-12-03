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
				"#old school sinewave",
				"とりあえず正弦波を鳴らすにはこんな感じだろうか",
				"`phase+=frequency/SAMPLE_RATE;\ndouble out = sin((phase+shift)*TWO_PI);`",
				["audio",{"src":base+"a1.wav","controls":{}}],
				description,
				"表題のold school sinewaveとはMSPの(https://docs.cycling74.com/max5/refpages/msp-ref/cycle~.html,cycle~)のことだ。\ncycle~はsin関数による波形生成ではなくて、事前に512サンプルの正弦波のテーブルの補完によって正弦波を生成している。(補完のために513のテーブルのようだ)",
				"テーブル作成をして",
				"`for(int k=0; k<512; k++) table[k] = sin(k*TWO_PI/512.);\ntable[513] = sin(0);`",
				"補間して読み出す",
				"`double f = (phase+shift)*512;\nf=(f<0)?f+512:(f>512)?f-512:f;\nint r1 = f;\nint r2 = r1+1;\n// liner interp\ndouble t1 = table[r1];\ndouble t2 = table[r2];\ndouble out = t1+(f-r1)*(t2-t1);`",
				"おそらくこんな感じだろう。",
				["audio",{"src":base+"a2.wav","controls":{}}],
				description,
				"サンプリングテーブルの使用のように、正弦波の近似には幾つかの方法がある。他に有名なものとして(https://en.wikipedia.org/wiki/Taylor_series,テイラー級数)による近似がある。",
				["p",{"style":"font-weight:bold;"},"f-f^3/3!+f^5/5!-f^7/7!+f^9/9!+..f^n/n!"],
				"とあらわせられる。次数によって有効範囲が変わる。\n-PI〜PIの有効範囲で言えば9次でよいだろう。(たぶん)\n他者の実装を見ると、有効範囲の問題か、8次の余弦のテイラー級数をつかっているが、フェーズをずらせばよいと思っているが、何か理由があるのだろうか。実装は以下のようになる。",
				"`double f = (phase+shift)*TWO_PI;\nif(f<=0) f+=TWO_PI;\nelse if(f>=PI) f-=TWO_PI;\ndouble ff = f*f;\ndouble out =f*(1.-0.00000275573*ff*(60480.-ff*(3024.-ff*(72.-ff))));`",
				["audio",{"src":base+"a3.wav","controls":{}}],
				description,
				"何々のアプリの音は綺麗だとか、汚いだとか言われる。実際に波形レベルで生成によって差異がある場合はそうだろう。（それ以外の問題もあるだろうが）\nsin関数が正である場合には「テーブルによる補間」や「テイラー級数による近似」には歪みがあるだろう。近似している理由はsin関数よりも動作が速い（期待がある）からである。なので最近のアプリケーションやライブラリでは使われていないかもしれない。しかし採用されていたケースもあり、歪みも質感として選択できると良いのではないだろうか、と思う。"

			]
		],
		ready:function() {
			//console.log("ready app.js");
		}		
	};

})();