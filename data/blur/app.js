console.log("app.js");

window.app = {
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},[
			{"class":"container"},
			"#fast triangle blur",
			"任意のサイズの矩形内のピクセルの平均値を求めれば画像は暈ける。例えば場合3*3の矩形の場合は9点のピクセルを1/9倍にして足せば良い。",
			"./fig0.jpg",
			"この場合にはn^2回のピクセル取得が必要となるのだが",
			"`import numpy\nprint(numpy.array([1/3,1/3,1/3])*numpy.array([[1/3],[1/3],[1/3]]));`",
			"のように分離可能であるために実際にが2n回で済む。",
			"`[[ 0.11111111  0.11111111  0.11111111]\n[ 0.11111111  0.11111111  0.11111111]\n[ 0.11111111  0.11111111  0.11111111]]`",
			"横向きに3点のピクセルの平均を求めた後に、同様に縦向きの処理を行えば良い。\n"+
			"ただこの場合には、フィルタの径が多きくなることによってnのオーダーが増えていく。\n"+
			"例えば半径が12の場合はこのような感じになる。",
			"`(p[n-12]+p[n-11]+p[n-10]...+p[n]+...+p[n+10]+p[n+11]+p[n+12])/35`",
			"次のピクセルを処理する場合は実際にはp[n-12]を減算して、p[n+13]を加算するだけでよい。",
			"./fig1.jpg",
			"このうような処理を繰り返しているだけであり、両端のピクセルのみ意識すればいい。\n"+
			"行の最初には径の幅の積分は必要だが、その後の処理は減算と加算のみの二回の処理にだけで済む。径が増えても処理は処理はあまり変わらない。",
			"(./data/blur/processimage.html,####HTML5のCanvasによるデモ)",
			"このフィルタはbox blurと呼ばれているものだが、残念ならが美しい暈けではない。美しいブラーとして(https://ja.wikipedia.org/wiki/%E3%82%AC%E3%82%A6%E3%82%B7%E3%82%A2%E3%83%B3%E3%81%BC%E3%81%8B%E3%81%97,ガウシアンブラー)というものがある。(https://ja.wikipedia.org/wiki/%E3%82%AC%E3%82%A6%E3%82%B9%E9%96%A2%E6%95%B0,ガウス関数)によって中央のピクセルからの距離によって重みが乗算されて積分される。\n"+
			"box blurと同様に分離可能であるために縦、横の2passの処理にはなるのだが、重みが乗算されているため両端の二回の処理のみというわけにはいかない。\nbox blurを繰り返すことによって美しい暈けに近づけることも可能だが処理は増加する。\n"+
			"中央のピクセルからの距離によって重みを変えるものに(https://github.com/evanw/glfx.js/blob/master/src/filters/blur/triangleblur.js,triangle Blur)がある。距離によりリニアな変化だが重みの変わるブラーである。\n"+
			"triangle Blurの処理を図式して処理を見てみると",
			"./fig2.jpg",
			"このうような処理を繰り返している。\n"+"右左に分けて、斜線部は減算、+の箇所は加算を行えば良い。その左右の増減する箇所自体は、先ほどのbox blurと同様に両端のピクセルのみ演算となる。",
			"(./data/blur/processimage2.html,####HTML5のCanvasによるデモ)",
			"先ほどのbox blurと比べると美しくなっているだろう。",
			"それでよくよく調べてみると(http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html,stackBlur)というものがあるようだ。\n"+"ざっとコードを眺めてみるとアプローチが似ているようだけれど、今回のfast triangle blur方がテンポラリの配列(stack)とかないし、シンプルのような気がしている。\n"+"速度はどちらの方が速いのかだろうか。"

		]
	],
	
	ready:function() {
		
		//console.log("ready app.js");
	
	}
	
};