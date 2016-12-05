console.log("app.js");

window.app = {
	
	/*
	comb~は、現在の入力サンプルを、以前の入力サンプルおよび/または出力サンプルと、以下の式に従って混合する。
	yn = axn + bxn-(DR/1000) + cyn-(DR/1000) 
	ここで、Rはサンプリングレートであり、Dはミリ秒単位の遅延時間である。

	遅延時間Dと係数a、b、およびcの最大遅延時間と初期値を設定するには、最大5つの数値を使用します。
	信号があるインレットに接続されている場合、そのインレットの引数として与えられた係数は無視されます。
	引数がない場合、最大ディレイタイムはデフォルトで10ミリ秒になり、他のすべての値はデフォルトで0になります。
	*/
	
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},[
			{"class":"container"},
			"#MSPと解析",
			"昨年末だったか、音響処理をサーバーサイドでやりたいとういう話があった。Cとかでその処理を書いてくれれば、適当にPHPから呼び出すよと言われた。仕事内容については詳しく書けないのだけれど、その案件のモックにMSPを使った。音響処理自体は難しくはなく、実装には1日もかからなかった。\n問題はこれをどうやってサーバーで動かすかということだ。\nかつて(http://www.imgsrc.co.jp/,イメージソース)が制作した(http://tokyo.interactive.ad.awards.jp/Results09/info/57.html,Wrap Mixer)においてサーバーサイドでjitterを動かしていたように、MSPを動かすのはどうだろうかと、頭に浮かんだが現実的ではないのでやめた。\n(https://github.com/libpd/libpd,libpd)での実装も考えたが、使用したオブジェクトの幾つかがpdでは存在していなかった上に、必要なオブジェクトの数もしれていたので、MSPのクローンをつくることにした。（音響処理自体の仕組みはすぐに実装できて、だいぶ時間があったので）",
		"まずは(http://www.audacityteam.org/,Audacity)を用意する。（これは他のDAWソフトでも問題ないだろう）",
		"./patch.png",
		"今回は、このようなpatchをサンプルとして使っていくのだが、問題となるのは(https://docs.cycling74.com/max5/refpages/msp-ref/comb~.html,「comb~」)だろう。（他は特に何も考えなくとも実装できるはずだ）\n"+
		"リンクから「comb~」リファレンスを見るとDescriptionに処理に使っている式が書かれており、ArgumentsとMessagesに大体の使い方が載っている。これと実際のパッチを用いてクローンを実装していく。",
		"./audacity.png",
		"図は「cycle~ 1046」「line~」「*~」「comb~ 512 256 0 0.3 0.6」から「sfrecord~ 4」の結線して録音した.aifをAudacityで開いたものである。Audacityでは.aifはマルチトラックを開けるようだ。(.wavはダメだった)",
		"Track1にTrack2を乗算したものがTrack3にあたる。Track1にTrack2はマルチトラックのテストであり、やるべきことはTrack3に「comb~ 512 256 0 0.3 0.6」の処理を通すとTrack4になれば良いということだ。",
		"ということで、ここで必要になってくるのは.aifをパーズしてTrack3のデータを取得し、何らかの処理を加えたものを.aifで書き出す処理である。拙作ではあるが(https://github.com/mizt/AIFF,ごく簡単なコードを用意した)。","「comb~」のリファレンスのDescriptionに",
		["p",{"style":"font-weight:bold;"},"yn = axn + bxn-(DR/1000) + cyn-(DR/1000) "],
		"とあり、実装に落とすと",
		"`int _read = _write-DelayInMS;\nif(_read<0) _read+=MaximumDelayTime;\n\ndouble out = Gain*input+Feedforward*_feedforward[_read]+Feedback*_feefback[_read];\n\n_feedforward[_write] = input;\n_feefback[_write] = out;\n\nreturn out;`",
		"のような感じになる。\n"+
		"上記処理を先ほどのコードに追加してTrack3へと施し.aifとして保存して、Track4と比較してみる。",
		"./comb1.png",
		"./comb2.png",
		"ほぼ一致していることがわかるだろう。",
		"今回はそこまで踏み込まないが「comb~」の第二引数の(signal/float) Delay in ms 等のMessageを連続的に値を変化させる場合には「sig~」に-1.0〜1.0へと正規化された値を渡し「sfrecord~」のトラックを追加して録音する。解析時には正規化するときに割った係数を掛けて値を戻しせば係数の変化にも対応出来る。ランダムなどを使う場合は同じ値が連続する場合もあるので、bangのタイミングを書き込むといいかもしれない（MSPでは値を変化させたときの補間とかに癖があったりするため）",
		"そしてクローンをつくった副産物としては、(https://github.com/kripken/emscripten,Emscripten)を用いることによってWeb Audio APIでpatchと同じ処理をブラウザで動かすことができた。今回のサンプルの(https://mizt.github.io/blog/data/aiff/demo.html,デモ)を一応置いておく。同じような音が鳴っているはずだ。"		
		
					
		]
	],
	
	ready:function() {
		
		console.log("ready app.js");
	
	}
	
};