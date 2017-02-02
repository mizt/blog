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
				"#windows",
				"Alienware 13 R3 を買った。","案件等でデバイスのドライバがないだとか、そういった例外的な場合を除いてOS 8.6から基本的にずっとMacを使っていた。最初に就職した会社がMacではなくて、耐えられずにすぐに自前のマシンを持って行っていたほどだ。",
				"Windowsの耐え難さというのは勿論あるのだけれど、最近では以前よりもだいぶマシになっているような印象がある。\n一方、Touch Barの搭載。GPUがNVIDIAではない。swiftよりもC#の方が愛せそうだしね。\nAppleへの失望から見切り、Microsoft Researchの期待を含め乗り換えることにした。","iOSもAndroid 5.0（マテリアルデザイン）以降をNexusで使う分には、ぐっと良いと思っている。(ベンダーごとのカスタマイズの問題は依然としてあるし、開発する場合にUI設計がXMLで言語がJavaであるということだ。最適解ではないが、これもUnityやXamarinに頼ってC#で行えばなんとかなるだろう)",
				"ということでWindowを使うことにする。",
				"##必要そうなソフトウエアのインストール",
				"(https://www.visualstudio.com/ja/vs/visual-studio-2017-rc/,visual Studio Community 2017)\nいろいろインストールオプションがあったけれど、後からなんとかなると思ってC#とC++にチェックした。NDKとかのオプションもあるのかと思ったけれどいったん無視。",
				"(https://notepad-plus-plus.org/,notepad++)\n必要に迫られて開発していた時に使っていたメインエディタ。Macの時は(https://coderunnerapp.com/,CodeRunner)を使っていたので類似ソフトがあるといいけれど、調べるのも面倒くさいのでいったんこれで。",
				"Chainer\n(http://qiita.com/akrian/items/953082aa8f00479dbb01,Windows環境でChainerのGPUを使えるようにするまで)\nvc2017を入れてしまったので、(http://qiita.com/samacoba/items/7fa5883d7d715aeabd53,chainerインストールメモ(windows10 python3.5 cuda8.0))を試す。",
				"(http://www.syntevo.com/smartgit/,SmartGit)\nGitクライアント、Macの時は(https://www.git-tower.com/,Tower)を使っていた。",
				"(https://cyberduck.io/index.ja.html,Cyberduck)\nApp Storeから課金してかったけれど今回はいいか。",
				"Emscripten",
				"(http://qiita.com/takao_mofumofu/items/c331d0e4345eb0f353ae,Windows上でのEmscriptenのセットアップ)",
				"いったんこんな感じで。Max/MSPとかUnityとかAdobeは必要に迫られたらインストールすことにしよう。",
				"##設定周り",
				"(http://www.lifehacker.jp/2015/08/150811windows10_startmenu.html,Windows 10の「スタートメニュー」をカスタマイズする方法)"+"\n「ゲームとエンターテイメント」は必要ないので、完全に削除しました。余計なことしないで欲しい。"
			]
		],
		ready:function() {
			//console.log("ready app.js");
		}		
	};

})();