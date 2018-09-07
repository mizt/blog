console.log("app.js");

window.app = {
	
	js:"../../blog/settings.js",
	css:"../../blog/settings.css",
	html:[
		{"id":"wrapper"},[
			{"class":"container"},
			"#「AA展」も「コ本や」も観に行ってはいないけれども",
			"####※観に行ってはいないので誤った情報の可能性があります。",
			[{"id":"rt"}],
			"####※以下の内容につきましてご指摘をいただきました",
			[{"id":"tweet"}],
			"「(http://www.2121designsight.jp/program/audio_architecture/exhibits.html,AA展)」に展示されているらしいucnvの《Another Analog》はこんな感じらしい。\n"+
			"この動画の最後にある青い橋がでてくるシーンの上部の映像（データモッシュ前）に痙攣をしているような箇所が見られる。"+"\n"+
			"下部の映像（データモッシュ後）では、その痙攣による差分フレームが復号化され、ピクセルが溶け出しているような映像となっている。",
			"fig1.png",
			"####(https://pic.twitter.com/skMSpE5J67,pic.twitter.com/skMSpE5J67)から引用（トリミング）",
			
			"これは結構、意外だった。",
			"下部の映像（データモッシュ後）は、例えば(https://vimeo.com/256056324,Turpentine (2017))などにも見られるのだが、上部の映像（データモッシュ前）がこうなっているとは予想していなかった。",

			"fig2.png",
			"####(https://vimeo.com/256056324,Turpentine (2017))から引用",
			
			"てっきり任意の差分フレームのパッケトをプログラムによって、くり返し復号化を続けた結果だと思っていたのだけれど、痙攣ような映像（編集）によってもたらされていたのが意外だった。",
			[{"id":"content","style":"margin-bottom: 16px;"}],
			"####(https://vimeo.com/93992919,https://vimeo.com/93992919)を使用",
		
		
			"このように作家の意図とは関係なく、上部の映像（データモッシュ前）が入力映像、下部の映像（データモッシュ後）が出力映像として、私には正誤として捉えてしまいそうなので「(http://www.2121designsight.jp/program/audio_architecture/exhibits.html,AA展)」も「(http://honkbooks.com/post/177260545591/ucnv%E5%80%8B%E5%B1%95-%E4%BA%8C%E5%80%8B%E3%81%AE%E8%80%85%E3%81%8C-same-space-%E3%83%B2occupy-%E3%82%B9%E3%83%AB,コ本や)」も観に行ってはいない。",
			
			"そういえばTokisato Miztsuruがキーフレームが記録されないカメラ（簡易な説明であり正確はない）で日々を撮影（(https://vimeo.com/236194238,参考映像)）していた時に",
			"fig3.jpg",
			"####(https://twitter.com/gnck/status/958333418244157444,https://twitter.com/gnck/status/958333418244157444)から引用",
			
			"時里充からメッセージが届き、その内容が興味深いので引用する。",
			"fig4.png",
			"このメッセージに中に「データモッシュを考えながら撮影できる人としての技術」という言葉があり（これは正確な本人の発言ではなく意訳だと思われますが）、これは「データモッシュ前」に既に「データモッシュ後」が内在しているということで、「(http://www.2121designsight.jp/program/audio_architecture/exhibits.html,AA展)」での上部の映像（データモッシュ前）にあたるものが提示されておらずとも、当然いままでの映像にも存在していて、映像の編集（および素材撮影）が私が想像しているよりもかなり緻密に、データモッシュの為に計画されていたのではないかと思った。",
			
			"余談になりますがTokisato Miztsuruのカメラについてはデータモッシュが撮影と同時に起こることによって、撮影している内容・動きによってデータモッシュ自体が決定づけられわけで、キーフレームを後から抜くポストプロセス処理ではない、身体的な即時的なデータモッシュを意識していました。"
			
			
		]
	],
	
	ready:function() {
		
		!function(e,n){"object"==typeof exports?module.exports=n():"function"==typeof define&&define.amd?define(n):e.crel=n()}(this,function(){function e(){var o,a=arguments,p=a[0],m=a[1],x=2,v=a.length,b=e[f];if(p=e[c](p)?p:d.createElement(p),1===v)return p;if((!l(m,t)||e[u](m)||s(m))&&(--x,m=null),v-x===1&&l(a[x],"string")&&void 0!==p[r])p[r]=a[x];else for(;v>x;++x)if(o=a[x],null!=o)if(s(o))for(var g=0;g<o.length;++g)y(p,o[g]);else y(p,o);for(var h in m)if(b[h]){var N=b[h];typeof N===n?N(p,m[h]):p[i](N,m[h])}else p[i](h,m[h]);return p}var n="function",t="object",o="nodeType",r="textContent",i="setAttribute",f="attrMap",u="isNode",c="isElement",d=typeof document===t?document:{},l=function(e,n){return typeof e===n},a=typeof Node===n?function(e){return e instanceof Node}:function(e){return e&&l(e,t)&&o in e&&l(e.ownerDocument,t)},p=function(n){return e[u](n)&&1===n[o]},s=function(e){return e instanceof Array},y=function(n,t){e[u](t)||(t=d.createTextNode(t)),n.appendChild(t)};return e[f]={},e[c]=p,e[u]=a,"undefined"!=typeof Proxy&&(e.proxy=new Proxy(e,{get:function(n,t){return!(t in e)&&(e[t]=e.bind(null,t)),e[t]}})),e});
			
			
		
		var setCompletionHandler = function(el,handler) {
			if("onreadystatechange" in el) {					
				el.onreadystatechange = function (e) {
					if(el.readyState==="loaded"||el.readyState==="complete") return handler(e);
				};
			} 
			else el.onload = handler;
		};
			
		var loadJS = function(path,func) {
			var script = document.createElement('script');
			script.src = path;
			setCompletionHandler(script,func);
			document.body.appendChild(script);
		}		
		/*
		loadJS("https://platform.twitter.com/widgets.js",function() {
			
			console.log("tweet");
		*/
		
			var rt = document.getElementById("rt");
			
			// <p lang="ja" dir="ltr">ひとつ言っておくならば、上部の映像をソースとして下部の映像を生成しているわけではありません <a href="https://t.co/0G1Hn8yiaC">https://t.co/0G1Hn8yiaC</a></p>&mdash; ucnv (@ucnv) <a href="https://twitter.com/ucnv/status/1038092699759341569?ref_src=twsrc%5Etfw">2018年9月7日</a>
			
			
			crel(rt,
				crel("blockquote",{"class":"twitter-tweet","data-lang":"ja","style":"margin-bottom:35px;"},	
					crel("p",{"lang":"ja","dir":"ltr","style":"font-size:12px;color:#777;"},			
						crel("span","ひとつ言っておくならば",crel("span",{class:"punctuation"},"、"),"上部の映像をソースとして下部の映像を生成しているわけではありません"),
						crel("br"),
						crel("span",{class:"en"},"— ucnv "),
						crel("br"),
						crel("a",{"href":"https://twitter.com/ucnv/status/1038092699759341569"},
							crel("span",{class:"en"},"8:52 - 2018"),
							crel("span","年"),
							crel("span",{class:"en"},"9"),
							crel("span","月"),
							crel("span",{class:"en"},"7"),
							crel("span","日")
						)
					)
				)
			);

		
			var tweet = document.getElementById("tweet");
			
			// class:"en"
			// class:"punctuation"
			
			crel(tweet,
				
				crel("blockquote",{"class":"twitter-tweet","data-lang":"ja"},
					crel("video",{"src":"./data/rdm05/e94WiG2gLfgsTDR-.mp4",style:"margin-bottom:0.5em 0;padding:0;vertical-align:bottom;max-width:180px","controls":true,"webkit-playsinline":true,"playsinline":true,"muted":true,"loop":true}),
					crel("p",{"lang":"ja","dir":"ltr","style":"font-size:12px;color:#777;"},
						crel("span",{class:"en"},"ucnv"),
						crel("sapn","さんの映像で動いてるのはほぼカメラだけで"),
						crel("span",{class:"punctuation"},"、"),
						crel("span","時々カメラがリズムに合わせて飛ぶんだけどそれがグリッチになった時にリズムに合わせてストロークが走ってるように勝手に見えたりする"),
						crel("span",{class:"punctuation"},"、"),
						crel("span","勝手に同期を見出してしまう感じよかった"),
						crel("br"),
						crel("a",{"href":"https://t.co/skMSpE5J67"},
							crel("span",{class:"en"},"pic.twitter.com/skMSpE5J67")
						),
						crel("br"),
						crel("span",{class:"en"},"— Matsuura Tomoya "),
						crel("span","松浦知也"),
						crel("br"),
						crel("span",{class:"en"},"("),
						crel("a",{"href":"https://twitter.com/tomoya_nonymous"},
							crel("span",{class:"en"},"@tomoya_nonymous")
						),
						crel("span",{class:"en"},")"),
						crel("br"),
						crel("a",{"href":"https://twitter.com/tomoya_nonymous/status/1013649088414302208"},
							crel("span",{class:"en"},"22:02 - 2018"),
							crel("span","年"),
							crel("span",{class:"en"},"7"),
							crel("span","月"),
							crel("span",{class:"en"},"1"),
							crel("span","日")
						)
					)
				));
			
		//});
		
		
		var content = document.getElementById("content");
		
		var style = "margin:0;padding:0;max-width:640px;width:100%;vertical-align:bottom;display:block;";
		
		var wrapper = crel("div",{style:style+"overflow:hidden"});
		var video = crel("video",{style:style+"position:absolute;z-index:0;",src:"./data/rdm05/laser_height_test.mp4","webkit-playsinline":true,playsinline:true,autoplay:true,muted:true,loop:true});
		var canvas = crel("canvas",{style:style+"position:absolute;z-index:5;background:#FFF;",width:"640px",height:"352px,display:block;"});
		var rdm = crel("canvas",{style:style+"background:#FFF;",width:"320px",height:"176px,display:block;"});
		
		var div = crel("div",{style:style+"position:relative;"});	
		canvas.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
				
		crel(content,
			crel("h3",{style:"margin:20px 0 15px 0;"},"任意の差分フレームのパケットをくり返し復号化しつづける参考例"),
			crel("h4",{style:"font-style:italic;margin:5px 0;"},crel("span",{class:"punctuation_left"},"（"),"上部の映像を押している間は映像が止まり",crel("span",{class:"punctuation"},"、"),"その箇所をくり返し復号化し続けます）"),
			crel(wrapper,
				crel(div,video,canvas),
				rdm
			)
		);
		
		var cctx = canvas.getContext("2d");
		var rctx = rdm.getContext("2d");
		
		els = document.querySelectorAll("h4");
		
		for(var k=0; k<els.length; k++) els[k].style.marginTop = "-15px";

		var isPause = false;
		var isRDM = false;
		 
		var ptr;
		var buf;
		var draw;
			
		loadJS("./data/rdm05/libs.js",function() {
			var checker = setInterval(function() {					
				if(window["Module"]) {
					clearInterval(checker);
						var size = (320*176)<<2;
						ptr = Module._malloc(size);
						buf = new Uint8Array(Module.HEAPU8.buffer,ptr,size);
						draw =Module.cwrap('draw','number',['number','number']);
						Module.cwrap('setup','void',['number'])();
							
						isRDM = true;
						
						canvas.style.cursor = "pointer";
						
						var on  = function(e) { 
							if(isPause==false) {
								e.preventDefault();
								isPause = true; 
								video.pause(); 
							}
						};
						
						
						var off = function(e) { 
							if(isPause==true) {
								e.preventDefault(); 
								isPause = false; 
								video.play();  
							}
						};

						div.addEventListener("mousedown",on,false);
						div.addEventListener("touchstart",on,false);
						
						window.addEventListener("mouseup",off,false);			
						document.addEventListener("touchend",off,false);
						document.addEventListener("touchcancel",off,false);
					}
				});
		});
		
		var process = function() {
					
			var w = +wrapper.getBoundingClientRect().width;
			var h = (w/320)*(176*2);
			
			div.style.height = (h>>1)+"px";
			wrapper.style.height = (h>>0)+"px";
			
			if(isRDM) {
				
				cctx.drawImage(video,0,0,640,352);
				rctx.drawImage(video,0,0,320,176);
				
				var input = rctx.getImageData(0,0,320,176);
				buf.set(new Uint8Array(input.data.buffer));
				var ret = draw(buf.byteOffset,isPause?1:0);

				if(ret==1) {
					input.data.set(buf);
					rctx.putImageData(input,0,0);
				}	
			}
		};


		setInterval(process,40);
		process();
		
		
	}
	
};