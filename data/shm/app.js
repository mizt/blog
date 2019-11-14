//console.log("app.js");

(function() {
	
	var base = "./data/"+(window.location.search).replace("?id=","")+"/";

	window.app = {
		js:"../../blog/settings.js",
		css:"../../blog/settings.css",
		html:[
			{"id":"wrapper"},[
				{"class":"container"},
				"#shm",
				"アプリケーションのSandboxを有効にしている場合には動作しません。",
				"ソースコードが肥大化してきて拡張するのが億劫。ビルド時間の遅さも耐えられない。ということで、入力と表示を別アプリに切りわけるということを考えた。共有メモリへいろいろなアプリから書き込んでそれを表示させることにした。（入力／表示が非同期になので、排他制御を入れないと画面が少しチラチラするという欠点があるけれど）",
				["video",{"src":base+"video.mp4","controls":"","loop":""}],
				"共有メモリの最大値を調べる。",
				"`$ sysctl kern.sysv.shmmax`",
				"デフォルトの値は、4194304(4MB)となっている。\n例えば1Gに増やす場合にはこうする。",
				"`$ sysctl -w kern.sysv.shmmax=1073741824\n$ sysctl -w kern.sysv.shmall=1073741824`",
				"むやみに共有メモリの最大値を変更するのもあれなので、とりあえずデフォルトの4MBを使っていく。フォーマットがRGBの720pのバッファを確保すると1280*720*3 = 2764800byteなので4MBの範囲に収まる。",				
				"共有メモリを作成するにはshmget関数を使う。",
				"`//#include <sys/ipc.h>\n//#include <sys/shm.h>\nint shmid = shmget(IPC_PRIVATE,1280*720*3,IPC_CREAT|0666);`",
				"IPC_CREATは新規作成。アクセス権を全ユーザーに対して読み書き可能にするので0666で離接(OR)をとる。\n戻り値が-1の場合はエラー。成功した場合はshmidを返す。ここでは例として131072とする。",
				"`/usr/bin/ipcs -m -b`",
				"ipcsをたたくと共有メモリ確保されていることがわかる。(-bがないとSEGSZの列が表示されない。linuxだと必要ないのか、オプション渡さなくてもbytesの列が表示されていた)",
				"`IPC status from <running system> as of Sat Aug 19 11:53:13 JST 2017\nT     ID     KEY        MODE       OWNER    GROUP  SEGSZ\nShared Memory:\nm 131072 0x00000000 --rw-rw-rw-     mizt    staff 2764800`",
				"SEGSZの列に表示されている2764800と確保したbyte数が一致ししている。",
				"確保したメモリはターミナル上で解放できる。",
				"`/usr/bin/ipcrm -m 131072`",
				"コード上で行うにはshmctl関数を使う。",
				"`shmctl(131072,IPC_RMID,NULL);`",
				"解放した直後に再び確保すると、失敗するケースがあるので、1秒くらいsleepさせた方がいい。",
				"確保した共有メモリにアクセスするにはshmat関数を使う。",
				"`unsigned char *ptr = (unsigned char *)shmat(131072,NULL,0);`",
				"shmidを渡すと共有メモリのポインタが得られるので、後は「書き込み／読み込み」を行えばよい。",
				"共有メモリの問題ではないけれど、共有メモリを使うということは複数のアプリを立ち上がっているはずで、メインのアプリ以外はバックグラウンドに回る。バックグラウンドにあるAppはデフォルトだとAppNapsが有効になり、タイマーの精度が落ち正常のフレームレートが出ない。ターミナルでAppNapsを無効にする以下のコマンドを打っておくことをおすすめする。",
				"`defaults write NSGlobalDomain NSAppSleepDisabled -bool YES`",
				"ちなみに(https://github.com/supercollider/supercollider/blob/2744239f2252eebb2d952b7aa56134d53ce243ea/common/SC_Apple.mm,SC_Apple.mm)にあるコードでAppNapsを無効にできるという情報もあったが上手く行かなかった。残念。",
			]
		],
		ready:function() {
			//console.log("ready app.js");
		}		
	};

})();