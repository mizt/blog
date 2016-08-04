(function() {

	window.indicator = window.indicator || {}

	// interface
	var settings = {
		color:"#000",
		width:3,
		radius:80
	} 

	Object.keys(settings).forEach(function (key) {
		
		if(window.indicator[key]) {
			settings[key] = window.indicator[key]
			delete window.indicator[key];
		}
		
	});
	
	window.indicator.instance = window.indicator.instance || new (function() {
		
		return new ((function() {

			var _instance=function(){};

			// private:
			
			var _color  = "#000";
			var _width  = 3;
			var _radius = 80;
			
			var _indicatorContainer = undefined;
			var _indicator = undefined;
			
			var _style = undefined;
			var _isPlay = false;
			
			var _timerID = 0;
			
			var _setStyle = function(style) {
				if(style) {
					if(style&&style["radius"]&&style["weight"]&&style["color"]) {
						_style = style;  
						if(_indicator) _exec();
					}
				}
			};
			
			var _exec = function() {
				if(this.style) {
					_indicator.style.border = _style["weight"]+"px solid "+_style["color"];
					_indicator.style.width = _indicator.style.height = _style["radius"]+"px";
					_indicator.style.top = _indicator.style.left = "-"+((_style["weight"]+_style["radius"])>>1)+"px";
				}
				else {
					_indicator.style.border = _width+"px solid "+_color;
					_indicator.style.width = _indicator.style.height = _radius+"px";          
					_indicator.style.left = "-"+((_radius+_width)>>1)+"px"; 
					_indicator.style.top  = "-"+((_radius+_width)>>1)+"px";
				}
				_indicator.style.borderRightColor = "transparent"; 
			};
			
			// public:

			var _public = _instance.prototype;

			_public.start = function() {	
					
				if(_timerID) {
					clearInterval(_timerID);
					_timerID = 0;
					if(document.getElementById('indicatorContainer')) {
						document.body.removeChild(_indicatorContainer);
					}
				}
				
				if(window.addEventListener&&document.getElementById("indicatorContainer")==undefined) {
					
					_indicatorContainer = document.createElement("div");
					_indicatorContainer.id = "indicatorContainer";
					
					_indicator = document.createElement("div");
					_indicator.id = "indicator";
					
					_indicatorContainer.appendChild(_indicator);               
					document.body.appendChild(_indicatorContainer);
					
					_exec();
					
					_isPlay = true;
				}
			}
			
			_public.stop = function() {	
			
				if(_indicator) {
					_indicatorContainer.style.opacity = 0.0;
					_timerID = setTimeout(function() {
						if(document.getElementById("indicatorContainer")) {
							document.body.removeChild(_indicatorContainer);
						}			
						_timerID = 0;
					},300);
				}
				
				_isPlay = false;
				
			}
			
			// constructor
			var initalize = function(args) { 
				
				if(args) {
					if(args.color!==undefined) _color = args.color;
					if(args.width!==undefined) _width = args.width;
					if(args.radius!==undefined) _radius = args.radius;
				}
				
				this.start();
				return _instance;
			}
				
			return initalize.bind(_public)(arguments[0]);
			
		})(arguments[0]));
		
	})(settings);
	
	window.indicator.stop = window.indicator.instance.stop;

})();