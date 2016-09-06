console.log("app.js");

window.app = {
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},[
			{"class":"container"},
			"#libjpeg-turbo vs libjpeg",
			"随分前のことですがlibjpeg-turboを使ったらかなり早かったので、JavaScriptに落とした場合のベンチマークをとってみることに。",
			"libjpegは(http://www.ijg.org/files/jpegsr9b.zip,jpegsr9b.zip)を、\n"+
			"libjpeg-turboは(https://github.com/libjpeg-turbo/libjpeg-turbo,github.com/libjpeg-turbo/libjpeg-turbo)を使用しています。",
			"テストは、おなじみ？ のWebカムの画像を、メモリ上でエンコードして、バイナリを破壊したのち、再度デコードするやつ。\nようはこんな感じ。",
			"./fig.jpg",
			"libjpeg-turboとlibjpegはインターフェースが同じなので、今回のコードは全く同じものになっています。\n"+
			"libjpeg-turboは以下のコンパイルオプションをつけてビルドしました。",
			"`--without-simd`",
			"実際のデモ。",
			"###WebRTCを使っているのと、処理が重たい為PCのChromeでのご覧を。",
			"(https://mizt.github.io/studies/jpeg/libjpeg/,libjpeg)\n"+
			"(https://mizt.github.io/studies/jpeg/libjpegturbo/,libjpeg-turbo)",
			"左上にある数字がフレーム間の処理速度で、私のマシンではlibjpegが40〜50に対して、libjpeg-turboは30〜40になっていて、10msくらい早くなっている。\n"+
			"というわけでlibjpeg-turboはJavaScriptでもターボだった。"
		]
	],
	
	ready:function() {
		
		//console.log("ready app.js");
	
	}
	
};