!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("path"),require("fs")):"function"==typeof define&&define.amd?define(["exports","path","fs"],e):e((n="undefined"!=typeof globalThis?globalThis:n||self).api={},n.path,n.fs)}(this,(function(n,e,t){"use strict";function r(n){return n&&"object"==typeof n&&"default"in n?n:{default:n}}var o=r(e),i=r(t);var a=function(n,e){return n(e={exports:{}},e.exports),e.exports}((function(n){var e,t=void 0!==t?t:{},r=(t={onRuntimeInitialized:function(){t.onload&&t.onload(),t.loaded=!0},locateFile:function(n){return"g729.wasm"==n&&"undefined"!=typeof G729_WASM_URL?G729_WASM_URL:n}},{});for(e in t)t.hasOwnProperty(e)&&(r[e]=t[e]);var a,s,u=function(n,e){throw e},c=!1,l=!1;c="object"==typeof window,l="function"==typeof importScripts,a="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,s=!c&&!a&&!l;var f,p,_,d,m="";a?(m=l?o.default.dirname(m)+"/":__dirname+"/",f=function(n,e){return _||(_=i.default),d||(d=o.default),n=d.normalize(n),_.readFileSync(n,e?null:"utf8")},p=function(n){var e=f(n,!0);return e.buffer||(e=new Uint8Array(e)),J(e.buffer),e},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),n.exports=t,process.on("uncaughtException",(function(n){if(!(n instanceof V))throw n})),process.on("unhandledRejection",U),u=function(n){process.exit(n)},t.inspect=function(){return"[Emscripten Module object]"}):s?("undefined"!=typeof read&&(f=function(n){return read(n)}),p=function(n){var e;return"function"==typeof readbuffer?new Uint8Array(readbuffer(n)):(J("object"==typeof(e=read(n,"binary"))),e)},"undefined"!=typeof scriptArgs&&scriptArgs,"function"==typeof quit&&(u=function(n){quit(n)}),"undefined"!=typeof print&&("undefined"==typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!=typeof printErr?printErr:print)):(c||l)&&(l?m=self.location.href:document.currentScript&&(m=document.currentScript.src),m=0!==m.indexOf("blob:")?m.substr(0,m.lastIndexOf("/")+1):"",f=function(n){var e=new XMLHttpRequest;return e.open("GET",n,!1),e.send(null),e.responseText},l&&(p=function(n){var e=new XMLHttpRequest;return e.open("GET",n,!1),e.responseType="arraybuffer",e.send(null),new Uint8Array(e.response)}));var y,h,g,v=t.print||console.log.bind(console),b=t.printErr||console.warn.bind(console);for(e in r)r.hasOwnProperty(e)&&(t[e]=r[e]);r=null,t.arguments&&t.arguments,t.thisProgram&&t.thisProgram,t.quit&&(u=t.quit),t.wasmBinary&&(y=t.wasmBinary),t.noExitRuntime&&(h=t.noExitRuntime),"object"!=typeof WebAssembly&&U("no native wasm support detected");var w=new WebAssembly.Table({initial:6,maximum:6,element:"anyfunc"}),A=!1;function J(n,e){n||U("Assertion failed: "+e)}var I="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function R(n,e,t){for(var r=e+t,o=e;n[o]&&!(o>=r);)++o;if(o-e>16&&n.subarray&&I)return I.decode(n.subarray(e,o));for(var i="";e<o;){var a=n[e++];if(128&a){var s=63&n[e++];if(192!=(224&a)){var u=63&n[e++];if((a=224==(240&a)?(15&a)<<12|s<<6|u:(7&a)<<18|s<<12|u<<6|63&n[e++])<65536)i+=String.fromCharCode(a);else{var c=a-65536;i+=String.fromCharCode(55296|c>>10,56320|1023&c)}}else i+=String.fromCharCode((31&a)<<6|s)}else i+=String.fromCharCode(a)}return i}"undefined"!=typeof TextDecoder&&new TextDecoder("utf-16le");var E,P,C;function x(n){E=n,t.HEAP8=new Int8Array(n),t.HEAP16=new Int16Array(n),t.HEAP32=C=new Int32Array(n),t.HEAPU8=P=new Uint8Array(n),t.HEAPU16=new Uint16Array(n),t.HEAPU32=new Uint32Array(n),t.HEAPF32=new Float32Array(n),t.HEAPF64=new Float64Array(n)}var S=t.INITIAL_MEMORY||16777216;function M(n){for(;n.length>0;){var e=n.shift();if("function"!=typeof e){var r=e.func;"number"==typeof r?void 0===e.arg?t.dynCall_v(r):t.dynCall_vi(r,e.arg):r(void 0===e.arg?null:e.arg)}else e(t)}}(g=t.wasmMemory?t.wasmMemory:new WebAssembly.Memory({initial:S/65536,maximum:32768}))&&(E=g.buffer),S=E.byteLength,x(E),C[3556]=5257264;var W=[],j=[],k=[],D=[];var T=0,H=null;function U(n){throw t.onAbort&&t.onAbort(n),b(n+=""),A=!0,n="abort("+n+"). Build with -s ASSERTIONS=1 for more info.",new WebAssembly.RuntimeError(n)}function q(n,e){return String.prototype.startsWith?n.startsWith(e):0===n.indexOf(e)}t.preloadedImages={},t.preloadedAudios={};var z="data:application/octet-stream;base64,";function F(n){return q(n,z)}var O="file://";function L(n){return q(n,O)}var G="g729.wasm";function B(){try{if(y)return new Uint8Array(y);if(p)return p(G);throw"both async and sync fetching of the wasm failed"}catch(n){U(n)}}function N(n){try{return g.grow(n-E.byteLength+65535>>>16),x(g.buffer),1}catch(n){}}F(G)||(G=function(n){return t.locateFile?t.locateFile(n,m):m+n}(G)),j.push({func:function(){Q()}});var X={mappings:{},buffers:[null,[],[]],printChar:function(n,e){var t=X.buffers[n];0===e||10===e?((1===n?v:b)(R(t,0)),t.length=0):t.push(e)},varargs:void 0,get:function(){return X.varargs+=4,C[X.varargs-4>>2]},getStr:function(n){var e=function(n,e){return n?R(P,n,e):""}(n);return e},get64:function(n,e){return n}};var Y={emscripten_get_sbrk_ptr:function(){return 14224},emscripten_memcpy_big:function(n,e,t){P.copyWithin(n,e,e+t)},emscripten_resize_heap:function(n){n>>>=0;var e=P.length,t=2147483648;if(n>t)return!1;for(var r,o,i=1;i<=4;i*=2){var a=e*(1+.2/i);if(a=Math.min(a,n+100663296),N(Math.min(t,((r=Math.max(16777216,n,a))%(o=65536)>0&&(r+=o-r%o),r))))return!0}return!1},exit:function(n){!function(n,e){if(e&&h&&0===n)return;h||(A=!0,t.onExit&&t.onExit(n));u(n,new V(n))}(n)},fd_write:function(n,e,t,r){for(var o=0,i=0;i<t;i++){for(var a=C[e+8*i>>2],s=C[e+(8*i+4)>>2],u=0;u<s;u++)X.printChar(n,P[a+u]);o+=s}return C[r>>2]=o,0},memory:g,setTempRet0:function(n){},table:w};!function(){var n={env:Y,wasi_snapshot_preview1:Y};function e(n,e){var r=n.exports;t.asm=r,function(n){if(T--,t.monitorRunDependencies&&t.monitorRunDependencies(T),0==T&&H){var e=H;H=null,e()}}()}function r(n){e(n.instance)}function o(e){return(y||!c&&!l||"function"!=typeof fetch||L(G)?new Promise((function(n,e){n(B())})):fetch(G,{credentials:"same-origin"}).then((function(n){if(!n.ok)throw"failed to load wasm binary file at '"+G+"'";return n.arrayBuffer()})).catch((function(){return B()}))).then((function(e){return WebAssembly.instantiate(e,n)})).then(e,(function(n){b("failed to asynchronously prepare wasm: "+n),U(n)}))}if(T++,t.monitorRunDependencies&&t.monitorRunDependencies(T),t.instantiateWasm)try{return t.instantiateWasm(n,e)}catch(n){return b("Module.instantiateWasm callback failed with error: "+n),!1}(function(){if(y||"function"!=typeof WebAssembly.instantiateStreaming||F(G)||L(G)||"function"!=typeof fetch)return o(r);fetch(G,{credentials:"same-origin"}).then((function(e){return WebAssembly.instantiateStreaming(e,n).then(r,(function(n){return b("wasm streaming compile failed: "+n),b("falling back to ArrayBuffer instantiation"),o(r)}))}))})()}();var K,Q=t.___wasm_call_ctors=function(){return(Q=t.___wasm_call_ctors=t.asm.__wasm_call_ctors).apply(null,arguments)};function V(n){this.name="ExitStatus",this.message="Program terminated with exit("+n+")",this.status=n}function Z(n){function e(){K||(K=!0,t.calledRun=!0,A||(M(j),M(k),t.onRuntimeInitialized&&t.onRuntimeInitialized(),function(){if(t.postRun)for("function"==typeof t.postRun&&(t.postRun=[t.postRun]);t.postRun.length;)n=t.postRun.shift(),D.unshift(n);var n;M(D)}()))}T>0||(!function(){if(t.preRun)for("function"==typeof t.preRun&&(t.preRun=[t.preRun]);t.preRun.length;)n=t.preRun.shift(),W.unshift(n);var n;M(W)}(),T>0||(t.setStatus?(t.setStatus("Running..."),setTimeout((function(){setTimeout((function(){t.setStatus("")}),1),e()}),1)):e()))}if(t._Js_Init_Pre_Process=function(){return(t._Js_Init_Pre_Process=t.asm.Js_Init_Pre_Process).apply(null,arguments)},t._Js_Init_Coder_ld8a=function(){return(t._Js_Init_Coder_ld8a=t.asm.Js_Init_Coder_ld8a).apply(null,arguments)},t._Js_Set_zero=function(){return(t._Js_Set_zero=t.asm.Js_Set_zero).apply(null,arguments)},t._Js_Init_Cod_cng=function(){return(t._Js_Init_Cod_cng=t.asm.Js_Init_Cod_cng).apply(null,arguments)},t._Js_Pre_Process=function(){return(t._Js_Pre_Process=t.asm.Js_Pre_Process).apply(null,arguments)},t._Js_Coder_ld8a=function(){return(t._Js_Coder_ld8a=t.asm.Js_Coder_ld8a).apply(null,arguments)},t._Js_prm2bits_ld8k=function(){return(t._Js_prm2bits_ld8k=t.asm.Js_prm2bits_ld8k).apply(null,arguments)},t._Js_Init=function(){return(t._Js_Init=t.asm.Js_Init).apply(null,arguments)},t._Js_Encoder=function(){return(t._Js_Encoder=t.asm.Js_Encoder).apply(null,arguments)},t._Js_Init_Dcoder=function(){return(t._Js_Init_Dcoder=t.asm.Js_Init_Dcoder).apply(null,arguments)},t._Js_Decoder=function(){return(t._Js_Decoder=t.asm.Js_Decoder).apply(null,arguments)},t.___errno_location=function(){return(t.___errno_location=t.asm.__errno_location).apply(null,arguments)},t.stackSave=function(){return(t.stackSave=t.asm.stackSave).apply(null,arguments)},t.stackRestore=function(){return(t.stackRestore=t.asm.stackRestore).apply(null,arguments)},t.stackAlloc=function(){return(t.stackAlloc=t.asm.stackAlloc).apply(null,arguments)},t._malloc=function(){return(t._malloc=t.asm.malloc).apply(null,arguments)},t._free=function(){return(t._free=t.asm.free).apply(null,arguments)},t.__growWasmMemory=function(){return(t.__growWasmMemory=t.asm.__growWasmMemory).apply(null,arguments)},t.dynCall_iiii=function(){return(t.dynCall_iiii=t.asm.dynCall_iiii).apply(null,arguments)},t.dynCall_ii=function(){return(t.dynCall_ii=t.asm.dynCall_ii).apply(null,arguments)},t.dynCall_jiji=function(){return(t.dynCall_jiji=t.asm.dynCall_jiji).apply(null,arguments)},H=function n(){K||Z(),K||(H=n)},t.run=Z,t.preInit)for("function"==typeof t.preInit&&(t.preInit=[t.preInit]);t.preInit.length>0;)t.preInit.pop()();h=!0,Z(),n.exports=t}));class s{constructor(){a._Js_Init(),a._Js_Init_Dcoder()}encode(n){const e=a._malloc(n.length);a.HEAP8.set(n,e);const t=a._malloc(n.length);a._Js_Encoder(e,t);return a.HEAP8.subarray(t,t+10)}decode(n){const e=a._malloc(n.length);a.HEAP8.set(n,e);const t=a._malloc(160);a._Js_Decoder(e,t);return a.HEAP8.subarray(t,t+160)}destroy(){}}function u(n){n=n||function(){},a.loaded?n():a.onload=n}window.libg729={G729:s,onload:u},n.G729=s,n.onload=u,Object.defineProperty(n,"__esModule",{value:!0})}));
