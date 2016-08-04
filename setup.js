(function(){
	
	var Query = {
		query:undefined,
		q:{},
		get:function(key) {   
			if(this.query==undefined) {
				this.query = window.location.search.substring(1);
				var arr = this.query.split("&");
				for(var i=0;i<arr.length;i++) {
					var pair = arr[i].split("=");
					this.q[pair[0]] = pair[1];
				}
			} 
			return this.q[key];   
		}
	};
	
	var setCompletionHandler = function(el,handler) {
		if("onreadystatechange" in el) {
			el.onreadystatechange = function (e) {
				if(el.readyState==="loaded"||el.readyState==="complete") return handler(e);
			};
		} 
		else el.onload = handler;
	};
	
	var load = function(path,func) {
		
		console.log("load : "+path)
				
		if(path.indexOf(".css")==path.length-4) {
		
			var link = document.createElement("link");
			link.setAttribute("href",path);
			link.setAttribute("rel","stylesheet");
			setCompletionHandler(link,func);
			document.getElementsByTagName("head")[0].appendChild(link);
		}
		else if(path.indexOf(".js")==path.length-3) {
			
			var script = document.createElement('script');
			script.src = (path);
			setCompletionHandler(script,func);
			document.body.appendChild(script);
			
		}
		/*
		else if(path.indexOf(".json")==path.length-5) {			
			var xhr = new XMLHttpRequest();
			xhr.open("GET",path,true);
			xhr.timeout=10000;
			xhr.onreadystatechange = function () {					
				if(xhr.readyState!=4||xhr.status!=200) return;
				func(JSON.parse(xhr.responseText));
			};
			xhr.send();
		}
		*/
		else {
			
		}
	}
	
	var onInitialize = function() {
		if(window.indicator) window.indicator.stop();
		if(window.app.js&&window.app.ready) window.app.ready();
		if(settings&&settings.ready) setTimeout(settings.ready,300);
	}
	
	var onRender = function(html) {
		
		if(settings&&settings.load) settings.load();
		
		var dom = blogger.exec(html);
		crel(document.body,dom);
		if(settings&&settings.preload==true) {
			var tid = setInterval(function(){
				if(blogger.isPreload()) {
					clearInterval(tid);
					onInitialize();
				}
			},50);
		}
		else {
			 onInitialize(); 
		}
	};
	
	load("./libs/com/getskeleton/normalize.css",function() {
		load("./libs/com/getskeleton/skeleton.css",function() {
			load("./libs/blogger.js",function() {	
				
				window.blogger.add("load",load);
				window.blogger.set("./data/"+(Query.get("id")||"index")+"/");				
				window.blogger.load(window.blogger.get()+"app.js",function() {
					
					if(!!window.app.html&&Array.isArray(window.app.html)) {						
						
						var queue = [];
						
						if(window.app.js) queue.push(window.blogger.get()+window.app.js);
						if(window.app.css) queue.push(window.blogger.get()+window.app.css);
					
						var exec = function() {
																					
							if(queue.length) window.blogger.load(queue.pop(),exec);			
							else onRender(window.app.html);	
														
						};
						
						exec();
											
					}
				});				
			});
		});
	});
})();