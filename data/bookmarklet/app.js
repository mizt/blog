console.log("app.js");

window.app = {
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},[
			{"class":"container"},
			"#bookmarklet",
			"fig01.png",
			"ここにきてbookmarkletの再評価が自分のなかで起きた。\n"+
			"ブラウザのセキュリティ向上により、ネットワークリソースへのアクセスが容易でなくなって久しい。\n"+
			"ローカルへのアクセス、クロスドメインの問題。"+
			"ちょっとしたテストをしたいだけなのにアセットの準備に時間がかかる。\n"+
			"例えば顔認識のテストをしたいときにYouTubeの動画を使いたいと思ってもすぐには使えない。"+
			"動画をDLするなどの必要がある。そして動画のDL自体も面倒くさいケースが多い。",
			"ブラウザコンソールを使う手もあるだろうが、JITコンパイルが効かなかったり、コードの入力の面倒くさ、動画サイトではエラーを含めるログが大量に出ているケースもあったりと、マシではあるが良くはない。",
			"そこでbookmarkletの再評価である",
			"(https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E3%83%AC%E3%83%83%E3%83%88,bookmarklet)自体の詳細はリンク先を読んもらうとして、一言で言うと、ブラウザのお気に入りなどに設置されたJavaScript（ブックマークレット）現在のページに対して実行できるというものである。",
			[
				"a",{"id":"link","href":"javascript:!function(){var d=document; if(d.querySelector('#ekran')) { var t=Date.now();var u='//mizt.github.io/blog/data/bookmarklet/';var a=function(a,b){var c=d.createElement('script');b&&('onreadystatechange'in c?el.onreadystatechange=function(a){if('loaded'===c.readyState||'complete'===c.readyState)return b(a)}:c.onload=b),c.src=a,d.body.appendChild(c)};a(u+'lib.js?t='+t,function(){a(u+'main.js?t='+t)});}}();","target":"_blank","style":"display:inline-block; margin-bottom:24px; font-size:18px; font-weight:bold; padding:0 4px 8px;border: none;background-size: 100% 2px;background-repeat: no-repeat;background-position: bottom left;"},"(*∂ｖ∂)"
			],
			"試しに上記リンクを「ブックマーク バー」にドラッグしてYouTubeなどのビデオタグがあるサイトで、クリックしてもらいたい。"
			
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
	
	}
	
};