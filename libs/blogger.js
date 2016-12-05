(function() {

	var tags = {"!--":true,"!DOCTYPE":true,"a":true,"abbr":true,"acronym":true,"address":true,"applet":true,"area":true,"article":true,"aside":true,"audio":true,"b":true,"base":true,"basefont":true,"bdi":true,"bdo":true,"big":true,"blockquote":true,"body":true,"br":true,"button":true,"canvas":true,"caption":true,"center":true,"cite":true,"code":true,"col":true,"colgroup":true,"datalist":true,"dd":true,"del":true,"details":true,"dfn":true,"dialog":true,"dir":true,"div":true,"dl":true,"dt":true,"em":true,"embed":true,"fieldset":true,"figcaption":true,"figure":true,"font":true,"footer":true,"form":true,"frame":true,"frameset":true,"h1":true,"h2":true,"h3":true,"h4":true,"h5":true,"h6":true,"head":true,"header":true,"hr":true,"html":true,"i":true,"iframe":true,"img":true,"input":true,"ins":true,"kbd":true,"keygen":true,"label":true,"legend":true,"li":true,"link":true,"main":true,"map":true,"mark":true,"menu":true,"menuitem":true,"meta":true,"meter":true,"nav":true,"noframes":true,"noscript":true,"object":true,"ol":true,"optgroup":true,"option":true,"output":true,"p":true,"param":true,"pre":true,"progress":true,"q":true,"rp":true,"rt":true,"ruby":true,"s":true,"samp":true,"script":true,"section":true,"select":true,"small":true,"source":true,"span":true,"strike":true,"strong":true,"style":true,"sub":true,"summary":true,"sup":true,"table":true,"tbody":true,"td":true,"textarea":true,"tfoot":true,"th":true,"thead":true,"time":true,"title":true,"tr":true,"track":true,"tt":true,"u":true,"ul":true,"var":true,"video":true,"wbr":true};
		
	// https://github.com/KoryNunn/crel    
	!function(e,n){"object"==typeof exports?module.exports=n():"function"==typeof define&&define.amd?define(n):e.crel=n()}(this,function(){function e(){var o,a=arguments,p=a[0],m=a[1],x=2,v=a.length,b=e[f];if(p=e[c](p)?p:d.createElement(p),1===v)return p;if((!l(m,t)||e[u](m)||s(m))&&(--x,m=null),v-x===1&&l(a[x],"string")&&void 0!==p[r])p[r]=a[x];else for(;v>x;++x)if(o=a[x],null!=o)if(s(o))for(var g=0;g<o.length;++g)y(p,o[g]);else y(p,o);for(var h in m)if(b[h]){var N=b[h];typeof N===n?N(p,m[h]):p[i](N,m[h])}else p[i](h,m[h]);return p}var n="function",t="object",o="nodeType",r="textContent",i="setAttribute",f="attrMap",u="isNode",c="isElement",d=typeof document===t?document:{},l=function(e,n){return typeof e===n},a=typeof Node===n?function(e){return e instanceof Node}:function(e){return e&&l(e,t)&&o in e&&l(e.ownerDocument,t)},p=function(n){return e[u](n)&&1===n[o]},s=function(e){return e instanceof Array},y=function(n,t){e[u](t)||(t=d.createTextNode(t)),n.appendChild(t)};return e[f]={},e[c]=p,e[u]=a,"undefined"!=typeof Proxy&&(e.proxy=new Proxy(e,{get:function(n,t){return!(t in e)&&(e[t]=e.bind(null,t)),e[t]}})),e});
		
	if(!Array.isArray) Array.isArray = function (vArg) { return Object.prototype.toString.call(vArg)==="[object Array]";};  
	Object.isObject = function(vArg) { return (Object.prototype.toString.call(vArg)==="[object Object]"); };
	
	window.blogger = window.blogger || new (function() {
		
		return new ((function() {
			
			var A_PARSE = (/\(http(.*?):(.*?),|\(.{0,2}\/(.*?),/g);
			var A_MARKER = ["(",")"];
			var SPAN_PARSE = (/\[#(.*?),|\[.(.*?),|\[div,.(.*?),|\[div,.(#*?),/g);
			var SPAN_MARKER = ["[","]"];
			var ASCII = (/[\x20-\x7E〜]+|、|。|「|」|）|（|・/g);

			var _instance=function(){};
			
			var _stack = [];

			var _total = 0;
			var _loaded = 0;
			//var _load = function() { _total++; };
			
			var _base = "";
			var _tag  = "";
			
			var _target = "_blank";
			
			var _iframe = function(data) {
				return crel("div",{"class":"iframeWrapper","style":"max-width:"+(data[1])+"px"},
					crel("div",{"class":"iframeBefore","style":"padding-top:"+((data[2]/data[1])*100)+"%"}),
					crel("iframe",{"src":data[0],"scrolling":"no","frameborder":0})
				);
			};
			
			var _onload = function() {
				_onload=null;
			};
			var _onerror = function() {
				_onerror=null;
			};
			
			
			var _getAttributes = function(types) {
				
				var classNmae = "";
				 	var id = "";
					
				 	for(var k=0; k<types.length; k++) {
						
						if(types[k][0]==".") {
							
							if(classNmae.length==0) {
								classNmae = types[k].substring(1,types[k].length);									
							} 
							else {
								classNmae += " "+types[k].substring(1,types[k].length);
							}
																
						}
						else if(types[k][0]=="#") {
							
							if(id.length==0) {
								
								id = types[k].substring(1,types[k].length);

							} 
						}							
					}
					
					var type = {};
					if(classNmae.length>0) type["class"] = classNmae;
					if(id.length>0) type["id"] = id;
					
					return type;
			};
			
			var _reset = function() {
				
				_total  = 0;
				_loaded = 0;
				_tag = "";
				
			};
			
			var _setTagName = function(result,tag) {
								
				if(_tag!=tag) {
					
					switch(_tag) {
						
						case "td":
							
							var table = crel("table");
							for(var k=0; k<_stack.length; k++) {
								 var tr = crel("tr");
								 _stack[k].unshift("tr");              
								 crel(table,crel.apply({},_stack[k]));
							}
													
							result.push(table);
							
						break;
						
						case "li":
						
							var ul = crel("ul");
							for(var k=0; k<_stack.length; k++) {
								_stack[k].unshift("li");  
								crel(ul,crel.apply({},_stack[k]));
							}
								
							result.push(ul);
						
						break;
						
						case "blockquote":
						
							var blockquote = crel("blockquote");
							for(var k=0; k<_stack.length; k++) {
								
								//_stack[k].unshift("p");  
								//crel(blockquote,crel.apply({},_stack[k]));
								
								crel(blockquote,_stack[k]);
								
								if(k!=_stack.length-1) crel(blockquote,crel("span",{class:"br"}));
								
								
							}
								
							result.push(blockquote);
							
						break;
							
					}
					
					// reset
					_stack = [];
				}
				_tag = tag;        
			};
			
			var _parseLine = function(text) {
				
				var data = []; 
				
				if(text=="\n") {
					data.push(crel("span",{class:"br"}));
				}
				else {
					var t = text.split("\n");
					if(t.length!==0) {   
						for(var k=0; k<t.length; k++) {
							data.push(t[k]);
							if(k+1<t.length) data.push(crel("span",{class:"br"}));                
						}
					}
				}
															
				return data;
			};
			
			var _setParagraph = function(result,text) {
				
				var data = _parseText(text);
					
				_setTagName(result,"p");   
				
				
				data = _addClass(data);
				
				
				data.unshift("p");		
										
				result.push(crel.apply({},data));
					
			};
			
			var _splitText = function(text) {
				
				
				var matches = [];

				var match;
				while((match = ASCII.exec(text))!=null) {		
					matches.push({
						index:match.index,length:match[0].length,match:match[0]
					});		
				};

				var result  = [];
				
				
				if(matches.length>=1) {

					var head = 0

					for(var k=0; k<matches.length; k++) {
						
					
						var begin  = matches[k].index;
						var length = matches[k].length;
							
						if(head!=begin) result.push(text.substr(head,(begin-head)));
								
						result.push(text.substr(begin,length));
							
						// last
						if(k==matches.length-1&&text.length>begin+length) {
								
							result.push(text.substr(begin+length,text.length-(begin+length)));
						}
							
						head = begin+length;

					}
				}
				
				return (result.length)?result:[text];
			
			};
			
			
			var _parseTag = function(text,regex,option) {
							 
				var result  = [];
				var matches = [];
				
				var match;
				while((match = regex.exec(text))!=null) {		
					matches.push({
						index:match.index,match:match[0]
					});		
				};
											
				var range = [];
				if(matches.length>=1) {
					
					var index = 0;
					for(var n=0; n<matches.length; n++) {
						
						if(index>matches[n].index) continue;
						index=matches[n].index;

						var p = 0;
						for(var k=(index+matches[n].match.length); k<text.length; k++) {
																	
						if(text[k]==option[1]) {			
									
							if(p==0) {
								range.push([index,k]);
								index = k;				
								break;
							}
							else p--;
								 
						 }
						 else if(text[k]==option[0]) p++;
								
						}
					}
				}
										
				if(range.length>0) {
						
					// 検索結果より前を考慮
					if(option[0]=="("&&matches[0].index!==0) {
								
							
													
						//result = result.concat
						Array.prototype.push.apply(
							result,
							_parseTag(
								text.substring(0,matches[0].index),
								SPAN_PARSE,
								SPAN_MARKER
							)
						);						
					}
					else if(option[0]=="["&&range[0][0]!==0) {
						
						Array.prototype.push.apply(
							result,
							_parseLine(
								text.substring(0,range[0][0])
							)
						);
													
				 	}
				 
				
					for(var n=0; n<range.length; n++) {

						var tmp = text.substring(range[n][0]+1,range[n][1]);
					 	var comma = tmp.indexOf(",");
										
					 	if(comma+1!==tmp.length) { // テキストが存在していない場合は無視
								
					 		if(option[0]=="(") { // <a>
									
						 		var prepare = _parseTag(
									tmp.substring(comma+1,tmp.length),
								 	SPAN_PARSE,
								 	SPAN_MARKER
								);
								
								var data = [];
								
								for(var k=0; k<prepare.length; k++) {
									
									if(typeof(prepare[k])==="string") {
									
										var arr = _splitText(prepare[k]);
																						
										for(var l=0; l<arr.length; l++) {																	
											_span(data,arr[l]);
										}
									
									}
									else {
										data.push(prepare[k]);
									}
									
								}
								
									
							 	data.unshift("a",{href:tmp.substring(0,comma),target:_target});
							
								//console.log(analyze)
							
							 	result.push(crel.apply({},data));
									
							 }
							 else if(option[0]=="[") {
							 						
							

								
								if(tmp.indexOf("div,")==0) {
									
									
									
									var attributes = tmp.substring(comma+1,range[n][1]);
									
									if(attributes.length>1) {
										
										var types = attributes.split(" ");
										
										result.push(crel("div",_getAttributes(types)));
											
									}
									else {
									
										tmp = text.substring(range[n][0],range[n][1]+1);
										var data = _parseLine(tmp);
																						
										if(data.length==0) {    
											result.push(crel("span",tmp));                    
										}
										else {
											data.unshift("span");
											result.push(crel.apply({},data));
										}
										
									}
								}
								else {
														
									var types = tmp.substring(0,comma).split(" ");
									var type = _getAttributes(types);

									if(tmp[0]=="#"||tmp[0]==".") {
																													
										var data = _parseLine(tmp.substring(comma+1,tmp.length));
																						
										if(data.length==0) {    
											result.push(crel("span",type,tmp.substring(comma+1,tmp.length)));                    
										}
										else {
											data.unshift("span",type);
											result.push(crel.apply({},data));
										}
																				
									 }
									 else { // span じゃなかった場合			
											
										tmp = text.substring(range[n][0],range[n][1]+1);
										var data = _parseLine(tmp);
																						
										if(data.length==0) {    
											result.push(crel("span",tmp));                    
										}
										else {
											data.unshift("span");
											result.push(crel.apply({},data));
										}
									}                    
								}
							}
																
							// 次のタグまでにテキストがある場合                
							if(range[n][1]+1!==text.length&&(n==range.length-1||range[n][1]+1!==range[n+1][0])) {

								var string = text.substring(range[n][1]+1,(n==range.length-1)?text.length:range[n+1][0]);			                	

								if(option[0]=="(") {				
								
									result.push(_parseTag(
										string,
										SPAN_PARSE,
										SPAN_MARKER
									));
											 
								}
								else if(option[0]=="[") {
								
									Array.prototype.push.apply(
										result,
										_parseLine(string)
									);

							 	}
							 }

							//

						 }           
					 }
				 }
				 else { // range.length==0
					
					if(option[0]=="(") {
										
						return _parseTag(
							text,
							SPAN_PARSE,
							SPAN_MARKER
						);
						
					}
					else {
						
						var data = _parseLine(text);
						
						return data;          
														
					}
				} 
				
				//console.log(result);
				
				return result;
			};
			
			var _parseText = function(text) {
																					
				return _parseTag(
					text,
					A_PARSE,
					A_MARKER
				);
				
			};
			
			var _span = function(tmp,str) {
				
				if(str=="、"||str=="。") {
					tmp.push(crel("span",{style:"margin:0;padding:0"},""));
					tmp.push(crel("span",{class:"punctuation"},str));
				}
				else if(str=="」"||str=="）") {
					tmp.push(crel("span",{style:"margin:0;padding:0"},""));
					tmp.push(crel("span",{class:"punctuation_right"},str));
				}
				else if(str=="「"||str=="（") {
					tmp.push(crel("span",{style:"margin:0;padding:0"},""));
					tmp.push(crel("span",{class:"punctuation_left"},str));
				}
				else if(str=="・") {
					tmp.push(crel("span",{style:"margin:0;padding:0"},""));
					tmp.push(crel("span",{class:"punctuation_center"},str));
				}
				else {
					tmp.push(crel("span",{style:"margin:0;padding:0"},""));
					tmp.push(crel("span",str));
				}
			
			}; 
			
			var _addClass = function(data) {
				
				for(var k=0; k<data.length; k++) {
					
					var tmp = [];
					
					if(typeof(data[k])==="string") {
						
						var arr = _splitText(data[k]);
																		
						for(var n=0; n<arr.length; n++) {
													
							_span(tmp,arr[n]);
							
						}
						
						data[k] = tmp;
					}
					else if(Array.isArray(data[k])) {
												
						for(var n=0; n<data[k].length; n++) {
							
							if(typeof(data[k][n])==="string") { 
								
								var arr = _splitText(data[k][n]);
																
								for(var m=0; m<arr.length; m++) {
									
									_span(tmp,arr[m]);
								
								}
								
							}
							else {
								
								tmp.push(data[k][n]);
							}
							
						}
						
						data[k] = tmp;
						
					}
					
					//console.log(data[k]);
					
				}
				
				return data;
			} 
			
			var _parse = function(arr) {
					
				result = [];
		 
				for(var k=0; k<arr.length; k++) {
																				
					var text = arr[k];
					
					//console.log(text);
					
					var first = text[0];							
					var last = text[text.length-1];
					
					if(first=="#") {
												 
						var h = 0;
						for(var j=0; j<text.length-1; j++) {
							if(text[j]!="#") break;
							h++;
						}              
																
						_setTagName(result,"h"+h);
													
						var data = _parseText(text.substring(h,text.length));
						
						data = _addClass(data);
						
						
						data.unshift("h"+((h>=6)?6:h));
													
						result.push(crel.apply({},data))
						
					}
					else if(first=="*") {
						
						_setTagName(result,"li");
						_stack.push(_parseText(text.substring(1,text.length)));
						
					}
					else if(first==">") {
						
						_setTagName(result,"blockquote");
						_stack.push(_parseText(text.substring(1,text.length)));
						
					}
					else if(text.length>=4&&text[text.length-4]==".") {                      
						var extension = text.substring(text.length-3,text.length);
						
						if(extension=="png"||extension=="jpg"||extension=="gif"||extension=="svg") {
						
							_setTagName(result,"img");
							
							var src = text;
							
							//
							if(src.indexOf("http")!==0) {
								
								if(src.length>=1&&src[0]=="/") src = _base+text.substr(1,text.length);
								else if(src.length>=2&&src[0]=="."&&src[1]=="/") src = _base+text.substr(2,text.length);
								else src = _base+text;
								
							}
							else {
								src = text;
							}
							
							_total++;
													
							result.push(crel("img",{
								src:src,
								onload :"window.blogger.loadImage(); window.blogger.onload.call(this)",
								onerror:"window.blogger.loadImage(); window.blogger.onerror.call(this)",
							})); 
						
						}
											
						else {
							
							_setParagraph(result,text);
							
						}
					}
					else if(first=="`"&&last=="`") {
					
						_setTagName(result,"pre");
						result.push(crel("pre",text.substring(1,text.length-1)));
					
					}
					else if(first=="{"&&last=="}") { // iframe
													
						var data = (text.substring(1,text.length-1)).split(",");
						
						if(data.length==3) {
							
							_setTagName(result,"iframe");
							result.push(_iframe(data));
							
						}	
						else {
							
							_setParagraph(result,text);
															
						}			
					}
					else if(first=="|"&&last=="|") {

						_setTagName(result,"td"); 
												
						var els = [];
						var tds = (text.substring(1,text.length-1)).split("|");
																 
						for(var n=0; n<tds.length; n++) {
							
							var data = _parseText(tds[n]);
							data.unshift("td");
							els.push(crel.apply({},data));
							
						}
						
						_stack.push(els);
						
					}        
					else {
											
						_setParagraph(result,text);
												
					}
				}
				
				_setTagName(result,""); // end

				return result;
				
			};
		
			
			var _public = _instance.prototype;
			
			_public.isPreload = function() {
				return (_loaded==_total)?true:false;
			}
			
			_public.set = function(path) { _base = path; }
			_public.get = function() { return _base; }
			
			_public.add = function(key,value) { _public[key] = value; }
			
			_public.loadImage = function() {  _loaded++; }
			
			_public.onload = function()  { _onload.call(this); }
			_public.onerror = function() { _onerror.call(this); }
			
			_public.exec = function(arr) {
								
				if(window.settings) {
					
					if(window.settings.target) _target = window.settings.target;
					if(window.settings.iframe) _iframe = window.settings.iframe;
					if(window.settings.onload) _onload = window.settings.onload;
					if(window.settings.onerror)  _onerror  = window.settings.onerror;
					
				}
									
				var result = [];
				var stack = [];
				
				var isStack = false;
								
				 // [] == div
				if(tags[arr[0]]===undefined) result.unshift("div");
				
				for(var k=0; k<arr.length; k++) {    
									
					if(Array.isArray(arr[k])) {
					
						isStack = false;
						result.push(_public.exec(arr[k]));      
					
					}
					else if(k==0&&tags[arr[k]]) {
						
						isStack = false;
						//result.push(arr[k]);
						result.push(crel.apply({},arr));
						break;

					}
					else if(Object.isObject(arr[k])) {
						
						isStack = false;
						result.push(arr[k]);

					}
					else {
											
						if(isStack==false) {
															
							stack.push([]);
							isStack = true;
							result.push(undefined);    
							
						}
													
						stack[stack.length-1].push(arr[k]);
						
					}      
				}
				
				if(stack.length) {
					
					var num = stack.length;          
					var cnt = result.length;
					
					while(num) {
						
						cnt--;
												
						if(result[cnt]==undefined) {
						 
							num--;
														
							var tmp = [];
							
							for(var k=0; k<stack[num].length; k++) tmp.push(stack[num][k]);
							result.splice.apply(result,[cnt,0].concat(_parse(tmp)));              
							stack[num] = null;
														
						}
					}   
				}
				
				stack = null;
				return crel.apply({},result);
				
			}
						
			// constructor
			var initalize = function(args) { 
				
				return _instance;
			}
						
			return initalize.bind(_public)();
			
		})());
		
	})();

})();