(function() {
	
	var base = "./data/"+(window.location.search).replace("?id=","")+"/";

	window.app = {
		js:"../../blog/settings.js",
		css:"../../blog/settings.css",
		html:[
			{"id":"wrapper"},[
				{"class":"container"},
				"#SinOsc",
				"SuperColliderでサイン波をならすことができる(http://doc.sccode.org/Classes/SinOsc.html,SinOsc)は8192サンプルのウェーブテーブルを線形補間して読み出し波形を生成します。",
				"(https://github.com/supercollider/supercollider/blob/f806ace7bd8565dd174e7d47a1b32aaa4175a46e/server/plugins/OscUGens.cpp,supercollider/server/plugins/OscUGens.cpp)\nに実装されています。\n"+
				"phaseの値を加算していき、それをテーブルのインデックス値としてサイン波の値を読み取るのですが(https://github.com/supercollider/supercollider/blob/f806ace7bd8565dd174e7d47a1b32aaa4175a46e/server/plugins/OscUGens.cpp#L1208,phaseの増加量)はフェーズシフトを行わない場合には以下のようになります。",
				"`int32 phaseinc = (int32)(unit->m_cpstoinc * freqin);`",
				"ここでのfreqinはSinOsc.arで指定したfreqの値（例えば440）になり、\nunit->m_cpstoincはサンプリングレートが48000の場合は",
				"`8192 * (1./48000.) * 65536;`",
				"で計算された結果の約11184.8106667となります。",
				"phaseincはdoubleからint32にダウンキャストされておりint32の値がとる範囲は-2147483648~2147483647なので（clangでコンパイルした場合には）freqinの値が約192000以上だとphaseincの値が2147483647を超え、常に-2147483648となります。",
				"FM合成でphaseincが2147483647を超える以下のコードをSuperColliderで実行すると",
				"`(\nSynthDef(\\fm,{\n\tvar carrier = 168.0;\n\tvar freq = carrier*325.0;\n\tvar mod = EnvGen.kr(\n\t\tEnv([1,0.24,0.68,0],[0.204,(0.555-0.204),(1-0.555)]),\n\t\tlevelScale:12.0,\n\t\ttimeScale:0.5,\n\t\tdoneAction:Done.none\n\t);\n\tvar amp = EnvGen.kr(\n\t\tEnv([1,0.2,0],[0.212,(1-0.212)]),\n\t\ttimeScale:0.5,\n\t\tdoneAction:Done.freeSelf\n\t);\n\tvar out = SinOsc.ar(carrier+(SinOsc.ar(freq)*freq*mod))*amp;\n\tOut.ar(0,[out,out]);\n}).add;\n)\n\nSynth(\\fm)`",
				["img",{"style":"width:100%;height:142px;","src":base+"fm1.png"}],
				["audio",{"style":"-webkit-tap-highlight-color:transparent;outline:0;margin-bottom:20px;","src":base+"fm1.wav","controls":{}}],
				"合成された波形の最初の部分がFM合成では生成されないような波形になっています。",
				"ちなみにphaseincが2147483647を超えた場合は2147483648で剰余演算し、再度0から数え直すと処理にすると次のようになります。",				
				["img",{"style":"width:100%;height:142px;","src":base+"fm2.png"}],
				["audio",{"style":"-webkit-tap-highlight-color:transparent;outline:0;margin-bottom:20px;","src":base+"fm2.wav","controls":{}}],
				"ということで、他の言語などでSuperColliderのSinOscと互換のサイン波を実装場合は",
				"`fabsf(value)<2147483648.0f?(int)(value):-2147483648;`",
				"の処理を明示的にしなければ再現されない場合があります。（(https://github.com/mizt/simplefm/tree/sc,EmscriptenでSuperColliderのソースコードの一部をJavaScriptへと変換した場合)に実際におこりました）",
			]
		],
		ready:function() {
			//console.log("ready app.js");
		}		
	};

})();