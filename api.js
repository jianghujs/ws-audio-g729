import Module from './g729.js';

class G729 {
    constructor() {
        Module._Js_Init();
        Module._Js_Init_Dcoder();
    }

    encode(data) {
        // input
        const inputOffset = Module._malloc(data.length);// length * 2 = byteLength
        Module.HEAP8.set(data, inputOffset);

        // output
        const outputOffset = Module._malloc(data.length);

        Module._Js_Encoder(inputOffset, outputOffset);
        // Module._free(inputOffset);
        // 160 -> 10
        const output = Module.HEAP8.subarray(outputOffset, outputOffset + 10);

        return output;
    }

    decode(data) {
        // input
        const inputOffset = Module._malloc(data.length);
        Module.HEAP8.set(data, inputOffset);
        // output
        const outputOffset = Module._malloc(160);
        Module._Js_Decoder(inputOffset, outputOffset);
        // 10 -> 160
        const output = Module.HEAP8.subarray(outputOffset, outputOffset + 160);
        return output;
    }

    destroy() {

    }
}

window.libg729 = {
    G729,
    onload
};

function onload(cb) {
    cb = cb || function () {
    };
    if (Module.loaded) {
        cb();
    } else {
        Module.onload = cb;
    }
}

export {G729, onload};