import Module from './g729.js';

class G729Encoder {
    constructor() {
        this.frame = 0;
        const PRM_SIZE = 11;
        this.L_FRAME = 80;
        this.SERIAL_SIZE = (80+2);
        this.vad_enable = 0; // 1: VAD enable, 0: VAD disable
        this.prm = new Int16Array(PRM_SIZE + 1);
        this.serial = new Int16Array(this.SERIAL_SIZE);
        Module._Js_Init_Pre_Process();
        Module._Init_Coder_ld8a();
        // PRM_SIZE  Size of vector containing analysis parameters
        Module._Set_zero(this.prm, PRM_SIZE + 1);


        /* for G.729B */
        Module._Init_Cod_cng();
    }

    encode(data) {
        //  Pre_Process(new_speech, L_FRAME);
        Module._Pre_Process(data, this.L_FRAME);
        // Coder_ld8a(prm, frame, vad_enable);
        Module._Coder_ld8a(this.prm, this.frame, this.vad_enable);
        // prm2bits_ld8k( prm, serial);
        Module._prm2bits_ld8k(this.prm, this.serial);
        //     nb_words = serial[1] +  (Word16)2;
        const nb_words = this.serial[1] + 2;
    }

    destroy() {
    }
}

class G729Decoder {
    constructor() {
    }

    decode(data) {

    }

    destroy() {

    }
}