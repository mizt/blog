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
		
		//console.log("setCompletionHandler")
		
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
	
	var load = function(path,func) {
						
		if(path.indexOf(".css")==path.length-4) {
		
			var link = document.createElement("link");
			link.setAttribute("href",path);
			link.setAttribute("rel","stylesheet");
			
			//console.log(path)
			
			setCompletionHandler(link,func);
			document.getElementsByTagName("head")[0].appendChild(link);
			
		}
		else if(path.indexOf(".js")==path.length-3) {
			
			loadJS(path,func)

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
		load("./libs/blogger.js",function() {	
				
			var option = (location.href.indexOf("file://")==0)?"":"?t="+Date.now(); 
			var external = Query.get("external");
			
			window.blogger.add("load",load);
			window.blogger.set((external)?("https://"+external+"/external/?id="+(Query.get("id")||"index")):("./data/"+(Query.get("id")||"index")+"/"));
				
			loadJS(window.blogger.get()+((external)?"":"app.js"),function() {
										
				if(!!window.app.html&&Array.isArray(window.app.html)) {
					
					var queue = [];
					var base = window.blogger.get();
											
					if(base.indexOf("://")!==-1) {
						if(window.app.js) queue.push(window.app.js);
						if(window.app.css) queue.push(window.app.css);
					}	
					else {
						if(window.app.js) queue.push(base+window.app.js);
						if(window.app.css) queue.push(base+window.app.css);
					}									
					
					var exec = function() {
						if(queue.length) window.blogger.load(queue.pop(),exec);			
						else onRender(window.app.html);	
					};
					
					exec();							
				
				}
			});			
		});
	});
})();