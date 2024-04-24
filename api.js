import Module from './g729.js';


class G729Encoder {
    constructor(sampling_rate, channels, frame_duration) {
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

    destroy() {
    }
}

class G729Decoder {
    constructor() {
        this.bad_lsf = 0;
        this.frame = 0;
        this.vad = 0;
        this.prm = new Int16Array(PRM_SIZE + 1);
        this.synth = new Int16Array(L_FRAME);
        this.Az_dec = new Int16Array(MP1 * 2);
        this.T2 = 0;
        this.Vad = 0;
        Module._Js_Init_Decod_ld8a();
        Module._Js_Init_Post_Filter();
        Module._Js_Init_Post_Process();
        /* for G.729b */
        Module._Js_Init_Dec_cng();
    }

    decode(data) {

        // Decod_ld8a(prm, synth, Az_dec, T2, &Vad);
        Module._Js_Decod_ld8a(this.prm, this.synth, this.Az_dec, this.T2, this.Vad);
        // Post_Filter(synth, Az_dec, T2, Vad);        /* Post-filter */
        Module._Js_Post_Filter(this.synth, this.Az_dec, this.T2, this.Vad);
        // Post_Process(synth, L_FRAME);
        Module._Js_Post_Process(this.synth, L_FRAME);
    }

    destroy() {

    }
}

window.libg729 = {
    G729Encoder,
    G729Decoder,
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

export {G729Encoder, G729Decoder, onload};