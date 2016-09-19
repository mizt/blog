console.log("app.js");

window.app = {
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},[
			{"class":"container"},
			"#DCT",
			"(https://www.amazon.co.jp/dp/4797306327/sr=1-4/qid=1474028495/,JPEG―概念からC++による実装まで (SOFTBANK BOOKS))"+
			"の第5章にある「コーディング上のよくある誤りやデータのエラーによる復号結果の例」の失敗しているコードと、その実装によって誘発された図版が、思いがけない面白さがあった。\n"+
			"これは、エンコーダ・デコーダの実装におけるJPEGファイルの壊し方にほかならない。\n"+
			"図版自体は言ってしまえばバイナリエディタでJPEGを壊す例のアレと大差ないのだけれど、その結果が実装の誤りによって表示されているということが非常に興味深った。\n"+"そしてこの本は1998/8年に刊行されている。\n"+"書籍の内容の詳細は、買って読んでいただくとして、この書籍には載っていなかったことを書いていく。",
			"##Quantization Tables",
			"JPEGのクオリティ設定について、この書籍でのQuantization Tablesは固定となっている。",
			"`static const int kYQuantumT[] = { // 輝度用\n\t16, 11, 10, 16, 24, 40, 51, 61,\n\t12, 12, 14, 19, 26, 58, 60, 55,\n\t14, 13, 16, 24, 40, 57, 69, 56,\n\t14, 17, 22, 29, 51, 87, 80, 62,\n\t18, 22, 37, 56, 68,109,103, 77,\n\t24, 35, 55, 64, 81,104,113, 92,\n\t49, 64, 78, 87,103,121,120,101,\n\t72, 92, 95, 98,112,100,103, 99\n};`",
			"この値はよくJPEGのqualityが50%の時によく使われおり、それ以外の値の場合は上記Quantization Tablesの値にscaleFactorを乗算する実装が一般的のようだ。",		
			"`// quality = 1..100\n\nif(quality<50) scaleFactor = 5000./quality;\nelse scaleFactor = 200.-quality*2.;`",
			"(http://www.impulseadventure.com/photo/jpeg-quantization.html,JPEG Compression Quality from Quantization Tables)には、デジタルカメラやアプリケーションのQuantization Tablesがまとめられており、IrfanViewではこの計算におけるQuantization Tablesを採用してる事がわかる。",
			"##Block Size",
			"JPEGでは8x8のブロックに分割しDCT・IDCTを行うのだが、"+
			"以下は16、32、64、128の矩形でDCT・IDCTを行った結果となる。圧縮率を高めにしてあるので、矩形ごとに処理を施しているがわかる。",
			//"##N=8 Q=32",
			//"n8q32.png",
			"##N=16 Q=16",
			"n16q16.png",
			"##N=32 q=8",
			"n32q8.png",
			"##n=64 q=4",
			"n64q4.png",
			"##N=128 q=2",
			"n128q2.png",
			"##高速化",
			"掲載されているコードは、2次元のDCTでO(n2)の処理となる。",
			"`for(int v=0; v<N; v++) {\n\tdouble cv = v?1.0:sqrt(2.);\n\tfor(int u=0; u<N; u++) {\n\t\tdouble cu = u?1.0:sqrt(2.);\n\t\tdouble sum = 0;\n\t\tfor(int y=0; y<N; y++) {\n\t\t\tfor(int x=0; x<N; x++) sum+=src[y*N+x]*cos[u*N+x]*cos[v*N+y];\n\t\t}\n\t\tdst[v*N+u] = (1./4.)*(cu*cv*sum);\n\t}\n}`",
			"2次元のDCTは1次元へと分解することができるのでO(2n)となり、高速化をすることが可能。",
			"`for(int v=0; v<N; v++) {\n\tdouble　cv = v?1.0:sqrt(2.);\n\tfor(int x=0; x<N; x++) {\n\t\tdouble sum = 0;\n\t\tfor(int y=0; y<N; y++) sum+=src[y*N+x]*cos[v*N+y];\n\t\tbuffer[x*N+v] = sqrt(1./4.)*cv*sum;\n\t}\n}\n\nfor(int u=0; u<N; u++) {\n\tdouble cu = u?1.0:sqrt(2.);\n\tfor(int v=0; v<N; v++) {\n\t\tdouble sum = 0;\n\t\tfor(int x=0; x<N; x++) sum+=buffer[x*N+v]*cos[u*N+x];\n\t\tdst[v*N+u] = sqrt(1./4.)*cu*sum;\n\t}\n}`",
			"##Glitch",
			"バイナリデータを意図的に破壊したときの表示については、愚直に実装しても色気がない。エラー対策等を追加する必要があr、これは実装によって処理が異なっている。",
			"##確認に使ったJPEG（生データ）",
			"src.jpg",
			"##Safari",
			"safari.png",
			"##Chrome",
			"chrome.png",
			"##Firefox",
			"firefox.png",
			"##今回の実装",
			"dst.png",
			"今回の実装は結果としてSafariの表示に近くなった。エラー処理によって細部が違っているので趣深い。Chrome、FireFox はおそらく輝度のデータが壊れた後も、色差のデータがある場合は、そこで終了せずに、引き続き処理を進めているのはないか。",
			"##N=32 q=8",
			"n32.png",
			"##N=128 q=4",
			"n128.png",
			"解像度が高くない場合はChrome、FireFoxのような色差を考慮するほうが、欠損している右下のグレーの箇所の画面における比率を考えると良い気がしている。"
		]
	],
	
	ready:function() {
		
		//console.log("ready app.js");
	
	}
	
};