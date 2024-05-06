import Module from './g729.js';


class G729Encoder {
    constructor() {
        Module._Js_Init();
        this.encodeBufferSize = 80;
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
            const newBuffer = new Int16Array(len);
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

    float2Int(floatArray) {
        const intArray = new Int16Array(floatArray.length);
        for (let i = 0; i < floatArray.length; i++) {
            let s = floatArray[i];
            if (s < 0) {
                s = s * 32768;
            } else {
                s = s * 32767;
            }
            intArray[i] = Math.floor(s);
        }
        return intArray;
    }


    /**
     *
     * @param data Float32Array
     */
    encode_float(data) {
        // float32 -> int8
        // const int8Data = new Int8Array(data.byteLength);
        // for (let i = 0; i < data.length; i++) {
        //     int8Data[i] = data[i] * 127;
        // }
        const int16Data = this.float2Int(data);

        return this.encode(int16Data);
    }


    encode_final(data) {
        return this.encode_float(data)
    }

    /**
     *
     * @param data
     * @returns {Int16Array} 只能是80个样本
     * @private
     */
    _encode(data) {
        // input
        const inputOffset = Module._malloc(data.length);
        Module.HEAP16.set(data, inputOffset);

        // output
        const outputOffset = Module._malloc(10);

        Module._Js_Encoder(inputOffset, outputOffset);
        // Module._free(inputOffset);
        // 80 -> 10
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

    /**
     *
     * @param data {Int8Array}
     * @returns {Int16Array}
     */
    decode(data) {
        // input 10
        const inputOffset = Module._malloc(data.length);
        Module.HEAP8.set(data, inputOffset);
        // output 160位
        const outputOffset = Module._malloc(160);
        Module._Js_Decoder(inputOffset, outputOffset);
        // 10 -> 80
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

export {onload, G729Encoder, G729Decoder};