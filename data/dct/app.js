console.log("app.js");

window.app = {
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},[
			{"class":"container"},
			"#DCT",
			"(https://www.amazon.co.jp/dp/4797306327/sr=1-4/qid=1474028495/,JPEG―概念からC++による実装まで (SOFTBANK BOOKS))"+
			"を必要にかられて購入した。\n目当ての箇所ではなかったのだが、第5章の「コーディング上のよくある誤りやデータのエラーによる複合結果の例」として、誤ったコードとそれによって誘発された図版が思いがけない面白さがあった。\n"+
			"これは、エンコーダ・デコーダの実装におけるJPEGファイルの壊し方にほかならない。\n"+
			"図版自体は言ってしまえばバイナリエディタでJPEGと壊す例のアレと大差ないのだけれど、その結果が実装による誤りによって表示されているということが非常に興味深った。\n"+"そしてこの本は1998/8年に刊行されている。\n"+"書籍の内容の詳細は、買って読んでいただくとして、この書籍には載っていないことを書いていく。",
			"##Quantization Tables",
			"JPEGのクオリティ設定は、アプリによってまちまちだが、変更できるようになっている事が多い。\nしかし、この書籍でのQuantization Tablesは固定となっている。",
			"`static const int kYQuantumT[] = { // 輝度用\n\t16, 11, 10, 16, 24, 40, 51, 61,\n\t12, 12, 14, 19, 26, 58, 60, 55,\n\t14, 13, 16, 24, 40, 57, 69, 56,\n\t14, 17, 22, 29, 51, 87, 80, 62,\n\t18, 22, 37, 56, 68,109,103, 77,\n\t24, 35, 55, 64, 81,104,113, 92,\n\t49, 64, 78, 87,103,121,120,101,\n\t72, 92, 95, 98,112,100,103, 99\n};`",
			"この値はよくJPEGのqualityが50%の時によく使われている。\n50%でない場合はQuantization Tablesの値にscaleFactorを乗算する実装が一般的のようだ。",		
			"`// quality = 1..100\n\nif(quality<50) scaleFactor = 5000./quality;\nelse scaleFactor = 200.-quality*2.;`",
			"(http://www.impulseadventure.com/photo/jpeg-quantization.html,JPEG Compression Quality from Quantization Tables)には、デジタルカメラやアプリケーションのQuantization Tablesがまとめられており、IrfanViewではこの計算におけるQuantization Tablesを採用してる事がわかる。",
			"##Block Size",
			"JPEGは8x8のブロックに分割しDCTを行う。\n"+
			"それゆえに圧縮率を高めていくと8x8のブロックが見えてくる。以下の参考画像は高圧縮なので矩形が確認できるだろう。JPEGで採用されている8x8ではないブロックサイズに変更して16、32、64、128の矩形でのDCT・IDCTを行った。\n"+
			"所感としてはブロックサイズを大きくするつれてqualityを低くすると味わい深いような気がしている。以下がその結果の図版となる。",
			"##N=8 Q=32",
			"n8q32.png",
			"##N=16 Q=16",
			"n16q16.png",
			"##n=32 q=8",
			"n32q8.png",
			"##n=64 q=4",
			"n64q4.png",
			"##n=128 q=2",
			"n128q2.png"
		]
	],
	
	ready:function() {
		
		//console.log("ready app.js");
	
	}
	
};