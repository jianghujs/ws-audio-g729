import Module from './g729.js';

class G729 {
    constructor() {
        Module._Js_Init();
    }

    encode(data) {
        // input
        const inputOffset = Module._malloc(data.length * 2);
        Module.HEAP16.set(data, inputOffset / 2);

        // output
        const outputOffset = Module._malloc(data.length * 2);

        Module._Js_Encoder(inputOffset, outputOffset);
        // Module._free(inputOffset);
        // 160 -> 10
        const output = Module.HEAP16.subarray(outputOffset / 2, outputOffset / 2 + data.length / 16);

        return output;
    }

    decode(data) {
        // input
        const inputOffset = Module._malloc(data.length * 2);
        Module.HEAP16.set(data, inputOffset / 2);
        // output
        const outputOffset = Module._malloc(data.length * 2);
        Module._Js_Decoder(inputOffset, outputOffset);
        // 10 -> 160
        const output = Module.HEAP16.subarray(outputOffset / 2, outputOffset / 2 + data.length * 16);
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

export {G729,onload};