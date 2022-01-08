console.log("app.js");

window.app = {
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},[
			{"class":"container"},
			"#rdm03.js",
			">グリッチとは、意図されておらず予測されていなかった状態が再生装置によって再生されることである。",
			">- (https://ucnv.org/turpentine/turpentine.pdf, turpentine)",
			"rdm03は正しくデータモッシュをする。",
			"rdm03.jpg",
			[
				"a",{"id":"link","href":"https://mizt.github.io/rdm03/","target":"_blank","style":"display:inline-block; margin-bottom:28px; font-size:18px;padding:0 4px 6px;border: none;background-size: 100% 3px;background-repeat: no-repeat;background-position: bottom left;"},"rdm03"
			],
			"旧バージョンの(https://vimeo.com/106132608,rdm)/rdm02は(https://github.com/xiph/theora,libtheora)に依存した実装である。\nフレーム内でエンコードして、デコードを行う。デコード結果がキーフレームであった場合には、複合を行わない。（ここではlibtheoraによるエンコード／デコードの処理は忠実に実行されている）",

			"rdm03の目的は「圧縮」ではない。正しくデータモッシュをすることである。",
			"圧縮目的としてではなく、データモッシュのためにフルスクラッチで設計した。実装の一部はtheoraのソースコードやそれにまつわるドキュメントの多くを参照している。圧縮ではないためlibtheoraで行われているDCTとVLCの部分は省き(https://en.wikipedia.org/wiki/Motion_compensation,フレーム間予測)の部分のみの実装となっている。",
			["h4","DCTについては",["a",{"href":"https://mizt.github.io/blog/?id=dct","target":"_blank"},"こちら"],"にも書いたのだが、DCTとVLCにの詳細は",["a",{"href":"https://www.amazon.co.jp/dp/4797306327/sr=1-4/qid=1474028495/","target":"_blank"},"JPEG―概念からC++による実装まで (SOFTBANK BOOKS)"],"を参照されたい"],
			"###技術情報について",
			
			"以下に書く情報はtheoraの実装や、ネット上に転がる幾つかのフレーム間予測の資料を斜め読みした情報をもとに、独自実装した結果によって構成されている。（故に、幾つか誤った情報が含まれているかもしれない）",
			"###テスト素材について",
			"テスト動画には(https://vimeo.com/160485702,「クジ」／時里充)を使用した。順にキーフレーム、一つ前のフレーム、現在のフレームである。",
			"01.jpg",
			"02.jpg",
			"03.jpg",
			"この入力画像を(https://en.wikipedia.org/wiki/YUV,YUV色空間)に変換し処理をしている。今回はフルレンジ(0〜255)のYUVを使用し色差成分を間引かずYUV444のフォーマットを採用している。（これは失敗に終わったのだが、シェーダで動作させることを考慮に入れていたためだ）\nキーフレームの挿入は30フレーム毎としている。",
			"###画像を更新するかどうかを決定する",
			"8x8のブロックで画像を更新するかどうかを決定する。これはDCTを行う場合の矩形サイズとなる。(http://hirntier.blogspot.jp/2010/01/video-quality-characterization.html,量子化することによって失われるデータを考慮して閾値を決定している)。現在のフレームと、（復元された）一つ前のフレームのブロックで(https://en.wikipedia.org/wiki/Sum_of_absolute_differences,SAD（絶対誤差の総和）)をとりその値が閾値を上回っている場合のみ、フレーム間予測の処理に進む。(画像の白い部分がそれにあたる)\n処理はY（輝度）をベースに行っている。",
			"displayfragments.jpg",
			"###符号化モード",
			"theoraには幾つかの(https://github.com/xiph/theora/blob/fbb275803696085225c310773474ef4dcf8a4528/lib/state.h#L186,符号（複合）化モード)がある。これはマクロブロック（DCTのブロックを縦横2つづつの16x16の矩形）が、どのモードによって符号化されるのかを示すためのものである。リアルタイム処理を考えrdm03ではtheoraよりモードが少なくなっている。\n以下がrdm03で採用したtheoraによって定義されている符号化モードである（各モードに対するカラーについてはデバッグ用として割り当ててある）。",
			"mode.png",
			"mode.jpg",
			"モードについて簡単に補足するとINTRAが現在のフレーム、INTERが一つ前のフレーム、GOLDENがキーフレームとなっている。MVが付く場合（NOMVでない場合）は符号化モードを決定する際に、ブロックマッチングを行い算出されたモーションベクトルの値によって複合時に動き補償を行う。\nモード算出には先述のSADや(https://en.wikipedia.org/wiki/Variance,分散)などを用い閾値を超えているかを判別して振り分けている。（(https://github.com/xiph/theora/blob/master/lib/encode.c#L26,閾値はtheoraの値を参照した)）\n動きベクトルの算出時のブロックマッチングのアルゴリズムは、今回のデモではtheoraが採用しているステップサーチとした。（(https://www.marumo.ne.jp/db2005_1.htm,動き検索あれこれ [2] - ステップサーチ)）\n動きベクトルの算出のアルゴリズムを変更することで、データモッシングによる表情が変わることとなる。（現状、ダイアモンドサーチも実装済み）\n探索範囲は(http://home.catv.ne.jp/dd/pub/book/mpeg.html#5.4,ハーフペル)としている。これによりデータモッシュ時に滲みが発生する。",
			"###動きベクトルと動き補償",
			"符号化モードのときに検出された動きベクトルとなる。",
			"vec.jpg",
			"INTER・GOLDENのモードを考慮し、動きベクトルにより動き補償した復元結果となる。",
			"compensated.jpg",
			"(./data/rdm03/mc/index.html,動き補償のサンプル)",
			"###残余画像",
			"残余画像は入力画像と、動き補償した復元結果との画像の差分である。",
			"residual.jpg",
			"動き補償した復元結果に、残余画像を加算すると現在のフレームが複合されることとなる。",
			"03.jpg",
			"###rdm03について",
			"一般的にデータモッシュさせるには動画からキーフレームを削除して複合させる。キーフレームが欠損したまま複合するので正しい動画が表示されず壊れる。\nrdm03ではリアルタイムであることを考慮してキーフレームの更新タイミングで、一つ前のフレームを挿入している。それにより前述した欠損がなくなり滑らかなフレームの動きになっている。\nまた今回のデモでは復元するのに用いる一つ前の画像は、前フレームでディスプレイに表示されているものを採用している。（実際に符号化に使うものは正常な一つ前のフレーム）\nOC_MODE_GOLDEN_NOMV（動きベクトルが無いキーフレーム）を参照する場合にも処理を無視するなどの処理を加えている。\nrdm03は圧縮されたファイル／再生装置ではないので、動きベクトルの探索の種類、複合する方法の変更などを外部パラメータからフレームごとにリアルタイムに変更する等も可能となる。",
			"###参考文献",
			"(https://www.theora.org/,https://www.theora.org/)\n"+
			"(https://people.xiph.org/~tterribe/pubs/lca2008/anatomy.pdf,Anatomy of a Video Codec)\n"+
			"(http://home.catv.ne.jp/dd/pub/book/mpeg.html,MPEG Video 技術)\n"+
			"(https://www.marumo.ne.jp/db2005_1.htm,動き検索あれこれ)\n"+
			"(https://www.amazon.co.jp/%E6%9C%80%E6%96%B0MPEG%E6%95%99%E7%A7%91%E6%9B%B8-%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E5%9B%B3%E8%A7%A3%E5%BC%8F-%E3%83%9E%E3%83%AB%E3%83%81%E3%83%A1%E3%83%87%E3%82%A3%E3%82%A2%E9%80%9A%E4%BF%A1%E7%A0%94%E7%A9%B6%E4%BC%9A/dp/4756102476/ref=sr_1_3?s=books&ie=UTF8&qid=1466478443&sr=1-3&keywords=mpeg,MPEG教科書(ポイント図解式))"
		]
	],
	
	ready:function() {
		
		var link = document.getElementById("link");
		
		// hover
		link.style.backgroundImage = "linear-gradient(90deg,#00F,#00F)";
		link.addEventListener("mouseover",function(){
			link.style.backgroundImage = "linear-gradient(90deg,#4e24b1,#4e24b1)";
		});
		link.addEventListener("mouseout",function(){
			link.style.backgroundImage = "linear-gradient(90deg,#00F,#00F)";
		})
		
		var mediaQuery = window.matchMedia("(min-width:550px)");
		
		var mediaQueryCallback = function(e) {
			if(e.matches) {
			} 
			else {
			}
		};
		
		// イベントリスナを設定して matches state の変化を検知。
		mediaQuery.addListener(mediaQueryCallback);
		// 初期化。
		mediaQueryCallback(mediaQuery);
		
	}
	
};