import Module from './g729.js';


// 80个采样点 160字节 10ms数据
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


class G729Encoder {
    constructor() {
        Module._Js_Init();
        this.encodeBufferSize = 160;
        this.lastBuffer = null;
    }

    /**
     * 编码
     * @param data Int8Array
     * @returns {*[]}
     */
    encode(data) {
        if (this.lastBuffer && this.lastBuffer.length > 0) {
            const len = this.lastBuffer.length + data.length;
            const newBuffer = new Int8Array(len);
            newBuffer.set(this.lastBuffer, 0);
            newBuffer.set(data, this.lastBuffer.length);
            this.lastBuffer = newBuffer;
        } else {
            this.lastBuffer = data;
        }

        if (this.lastBuffer.length < this.encodeBufferSize) {
            return [];
        }

        const result = [];
        while (this.lastBuffer.length >= this.encodeBufferSize) {
            const encodeData = this._encode(this.lastBuffer.slice(0, this.encodeBufferSize));
            result.push(encodeData);
            this.lastBuffer = this.lastBuffer.slice(this.encodeBufferSize);
        }
        return result;
    }

    /**
     *
     * @param data Float32Array
     */
    encode_float(data) {
        // float32 -> int8
        const int8Data = new Int8Array(data.byteLength);
        for (let i = 0; i < data.length; i++) {
            int8Data[i] = data[i] * 127;
        }
        return this.encode(int8Data);
    }


    encode_final(data) {
        return this.encode_float(data)
    }

    /**
     *
     * @param data
     * @returns {Int8Array} 只能是160个样本
     * @private
     */
    _encode(data) {
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

    destroy() {
        this.lastBuffer = null;
    }
}


class G729Decoder {
    constructor() {
        Module._Js_Init_Dcoder();
    }

    // 10 -> 160
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

    /**
     *
     * @param data arraybuffer
     * @returns {Int8Array}
     */
    decode_float(data) {
        // arraybuffer -> Int8Array
        data = new Int8Array(data);
        // 变成 arraybuffer
        return this.decode(data);
    }

    destroy() {

    }
}


window.libg729 = {
    G729,
    onload,
    G729Encoder,
    G729Decoder
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

export {G729, onload, G729Encoder, G729Decoder};