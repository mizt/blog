console.log("app.js");

window.app = {
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},[
			{"class":"container"},
			"#PixelSort",
			"ピクセル・ソートは(http://kimasendorf.com/,キム・アセンドルフ)（アーゼンドルフという日本語表記もある）による手法であり、ソースコードも公開されている。",
			"(https://github.com/kimasendorf/ASDFPixelSort,ASDFPixelSort)",
			"初出は2010年であり、Proce55ingのコードで書かれいる。このコードは様々な言語へとポーティングされており(https://github.com/search?utf8=✓&q=Pixel+Sort,GitHubで検索)すればいくつか見つかる。",
			"というわけでピクセル・ソートについては殊更、語るべきことはないのだけれど、"+
			"(http://pixelsorter.info/,AE Pixel Sorter)というAdobe After Effects のプラグインの販売先を見つけた。（最初のリリースは2015年8月とある）\nこのプラグイン自体、私は実際に使ってはおらず、チュートリアルの動画を見ただけだが、アセンドルフによるピクセル・ソートと類似している。\nその実装が同じものかどうかわからないし、プラグイン固有の便利な機能があるかもしれないが、アセンドルフへの言及も特になく？　安価であると言えども有償であるために、フリーで使用できる「AEPixelSort」をつくることにした。",
			"というわけで(https://github.com/kimasendorf/ASDFPixelSort,ASDFPixelSort)を参考にCでコードを書いた。",
			"`int whiteValue = -13000000;`",
			"もとのソースコードでは(https://github.com/kimasendorf/ASDFPixelSort/blob/master/ASDFPixelSort.pde#L27,上記の値)で(https://github.com/kimasendorf/ASDFPixelSort/blob/master/ASDFPixelSort.pde#L249,ソートするピクセルの範囲)の決定をしているのだけれど、今回はこの閾値を縦と横で別々にを設定できるように変更した。\n"+
			"とりあえず(https://github.com/kripken/emscripten,Emscripten)でJavascriptにして動作のテストをする。",
			"./fig1.png",
			"(./data/pixselsort/index.html,####HTML5のCanvasによるデモ)",
			"だいたい合っているのではないだろうか。",
			"これをAEのプラグイン化していく。(http://www.adobe.com/devnet/aftereffects/sdk/cc2015.html,After Effects CC 2015 Plug-in SDK)をダウンロードしてきてEffectフォルダ内にある適当なサンプルをベースに（今回はGamma_Tableを使用）して、Render関数に先ほどのピクセル・ソートの処理を追加すればよい。",
			"注意点としてはGamma_Tableは出力がクリッピングされるようになっているので、ソート処理のために画面外も考慮する必要がありout_flagsを変更した。",
			"`out_data->out_flags = PF_OutFlag_I_EXPAND_BUFFER|PF_OutFlag_I_HAVE_EXTERNAL_DEPENDENCIES`",
			"またピクセル・ソート時に必要なテンポラリなバッファは本来ならサンプルのように、SequenceSetup関数等で確保する方が望ましいかもしれないが、今回のコードではシングルトンパターンを使って保持している。（Render関数内で毎回生成するよりはマシだろう）",
			"後は、必要なUIを追加してビルドすれば完成となる。これもサンプルをベースに修正すればよのだが、"+
			"こちらについては(http://ae-users.com/jp/resources/2010/06/%E3%82%A2%E3%83%8B%E3%83%A1%E5%88%B6%E4%BD%9C%E8%80%85%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AEaftereffects%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E4%BD%9C%E6%88%90%E5%85%A5%E9%96%80%E7%AC%AC-7/,「2010-06-13 アニメ制作者のためのAfterEffectsプラグイン作成入門(第６回)　Effectプラグインの構造・ユーザーインターフェース」)が詳しい。",
			"./fig2.png",
			"(https://github.com/mizt/AEPixelSort,AEPixelSort)としてGitHubにソースコードとビルドしたプラグイン（現状はmacOSのみ）を置いておいた。"
		]
	],
	
	ready:function() {
		
		//console.log("ready app.js");
	
	}
	
};