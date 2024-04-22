var Module = {}

Module["onRuntimeInitialized"] = function(){
  if(Module.onload)
    Module.onload();
  Module.loaded = true;
}

Module["locateFile"] = function(url){
  if(url == "g729.wasm" && typeof G729_WASM_URL != "undefined")
    return G729_WASM_URL;
  else
    return url;
}
