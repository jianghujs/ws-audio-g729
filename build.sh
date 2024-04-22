emcc g729.c -O2 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -Ilib -Llib -laec --pre-js preapi.js --post-js postapi.js -s EXPORTED_FUNCTIONS='["_free","_malloc"]' $@ -o g729.js
