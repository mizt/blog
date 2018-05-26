console.log("app.js");
(function() {
	var base = "./data/"+(window.location.search).replace("?id=","")+"/";	
	window.app = {
		

		js:"../../blog/settings.js",
		css:"../../blog/settings.css",
		html:[
			{"id":"wrapper"},[
				{"class":"container"},
				"#WKWebViewによるデスクトップへの攻撃",
			"WKWebViewのバグ？",
			["video",{"src":base+"video.mp4","controls":"","loop":""}],
			"*NSWindowをdeferの値をNOで作成し、背景色を透明に設定",
			"*ウィンドウにdrawsBackgroundをNOに設定したWKWebViewを配置",
			"*setIntervalでbodyのbackgroundのスタイルの値をtransparentとrgba(255,255,255,0.0)を交互に変更",
			"setIntervalのインターバルの値を変更すると面白い。\n「shift+⌘+3」のスクリーンショットには映らない。",	
			"以下、ソースコードとビルド方法。",	
			"###Untitled.mm",	
			"`#import <Cocoa/Cocoa.h>\n#import <Webkit/Webkit.h>\n\nstatic void onResize(CGDirectDisplayID displayID, CGDisplayChangeSummaryFlags flags, void *userInfo) {\n\tif(CGMainDisplayID()==displayID) {\n\t\tif(userInfo&&flags&kCGDisplayDesktopShapeChangedFlag) {\n\t\t\t[((__bridge NSWindow *)userInfo) setFrame:[[[NSScreen screens] objectAtIndex:0] frame] display:NO];\n\t\t}\n\t}\n}\n\nint main(int argc, const char * argv[]) {\n\t@autoreleasepool {\n\t\tNSApplication *app = [NSApplication sharedApplication];\n\t\tNSRect rect = [[[NSScreen screens] objectAtIndex:0] frame];\n\t\tNSWindow *win = [[NSWindow alloc] initWithContentRect:rect styleMask:0 backing:NSBackingStoreBuffered defer:NO];\n\t\t[win setBackgroundColor:[NSColor clearColor]];\n\t\t[win setIgnoresMouseEvents:YES];\n\t\tWKWebView *web = [[WKWebView alloc] initWithFrame:rect];\n\t\t[web setValue:@(NO) forKey:@\"drawsBackground\"];\n\t\t[web loadHTMLString:@\"<!DOCTYPE html><head><meta><title></title><style>* {margin:0;padding:0;} body {width:100%;height:100vh;background:'transparent';}</style></head><body><script>var b=0; setInterval(function() {document.body.style.background = (b=!b)?'rgba(255,255,255,0.0)':'transparent';},16);</script></body></html>\" baseURL:nil];\n\t\t[web setAutoresizingMask:(NSViewWidthSizable|NSViewHeightSizable)];\n\t\t[[win contentView] addSubview:web];\n\t\t[win makeKeyAndOrderFront:nil];\n\t\tCGDisplayRegisterReconfigurationCallback(onResize,(__bridge void *)win);\n\t\t[app run];\n\t}\n\treturn 0;\n}`",
			"###Build & Run",
				"`xcrun clang++ -ObjC++ -lc++ ./Untitled.mm -fobjc-arc -framework Cocoa -framework Webkit -o ./Untitled;open ./Untitled`"		
			]
		],
		
		ready:function() {
			//console.log("ready app.js");
		}		
	};

})();