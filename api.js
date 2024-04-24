import Module from './g729.js';

const PRM_SIZE = 11;
const L_FRAME = 80;
const SERIAL_SIZE = (80 + 2);
const MP1 = 1;



class G729Encoder {
    constructor() {
        this.frame = 0;
        this.vad_enable = 0; // 1: VAD enable, 0: VAD disable
        this.prm = new Int16Array(PRM_SIZE + 1);
        this.serial = new Int16Array(SERIAL_SIZE);
        Module._Js_Init_Pre_Process();
        Module._Js_Init_Coder_ld8a();
        // PRM_SIZE  Size of vector containing analysis parameters
        Module._Js_Set_zero(this.prm, PRM_SIZE + 1);


        /* for G.729B */
        Module._Js_Init_Cod_cng();
    }

    encode(data) {
        //  Pre_Process(new_speech, L_FRAME);
        Module._Js_Pre_Process(data, L_FRAME);
        // Coder_ld8a(prm, frame, vad_enable);
        Module._Js_Coder_ld8a(this.prm, this.frame, this.vad_enable);
        // prm2bits_ld8k( prm, serial);
        Module._Js_prm2bits_ld8k(this.prm, this.serial);
        //     nb_words = serial[1] +  (Word16)2;
        const nb_words = this.serial[1] + 2;
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

export {G729Encoder, G729Decoder,onload};