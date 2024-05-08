import Module from './g729.js';


// 80个采样点 160字节 10ms数据
// class G729 {
//     constructor() {
//         Module._Js_Init();
//         Module._Js_Init_Dcoder();
//     }
//
//     encode(data) {
//         // input
//         const inputOffset = Module._malloc(data.length);// length * 2 = byteLength
//         Module.HEAP8.set(data, inputOffset);
//
//         // output
//         const outputOffset = Module._malloc(data.length);
//
//         Module._Js_Encoder(inputOffset, outputOffset);
//         // Module._free(inputOffset);
//         // 160 -> 10
//         const output = Module.HEAP8.subarray(outputOffset, outputOffset + 10);
//
//         return output;
//     }
//
//     decode(data) {
//         // input
//         const inputOffset = Module._malloc(data.length);
//         Module.HEAP8.set(data, inputOffset);
//         // output
//         const outputOffset = Module._malloc(160);
//         Module._Js_Decoder(inputOffset, outputOffset);
//         // 10 -> 160
//         const output = Module.HEAP8.subarray(outputOffset, outputOffset + 160);
//         return output;
//     }
//
//     destroy() {
//
//     }
// }


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
     * @param floatArray
     * @returns {Int16Array}
     */
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
     * @param data float32Array
     * @returns result Int8Array
     */
    encode_float(data) {
        const intArray = this.float2Int(data);
        return this.encode_int16(intArray);
    }

    /**
     *
     * @param data int16Array
     * @returns result Int8Array
     */
    encode_int16(data) {
        // Int16Array -> int8
        const int8Data = new Int8Array(data.buffer);
        return this.encode(int8Data);
    }

    /**
     *
     * @param data
     * @returns {Int8Array} 只能是160个样本
     * @private
     */
    _encode(data) {
        // input
        const inputOffset = Module._malloc(data.length); //
        Module.HEAP8.set(data, inputOffset);

        // output
        const outputOffset = Module._malloc(data.length);

        Module._Js_Encoder(inputOffset, outputOffset);
        // Module._free(inputOffset);
        // 160 -> 10
        const output = Module.HEAP8.subarray(outputOffset, outputOffset + 10);
        const outputData = new Int8Array(output.length);
        outputData.set(output);
        return outputData;
    }

    destroy() {
        this.lastBuffer = null;
    }
}


class G729Decoder {
    constructor() {
        Module._Js_Init_Dcoder();
        this.lastBuffer = null;
        this.outputBufferSize = 160;
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
        const outputData = new Int8Array(output.length);
        outputData.set(output);
        return outputData;
    }

    /**
     *
     * @param intArray int16Array
     * @returns {Float32Array}
     */
    int2Float(intArray) {
        const floatArray = new Float32Array(intArray.length);
        for (let i = 0; i < intArray.length; i++) {
            const sample = intArray[i];
            if (sample < 0) {
                floatArray[i] = sample / 32768;
            } else {
                floatArray[i] = sample / 32767;
            }
            if (floatArray[i] < -1 || floatArray[i] > 1) {
                console.log("audio overflow");
            }
        }
        return floatArray;
    }

    /**
     *
     * @param data Int8Array
     * @returns {Int16Array}
     */
    decode_int16(data) {
        const int8Data = new Int8Array(data);
        const output = this.decode(data);
        // console.log('output', output);
        // int8 -> Int16Array 知道 byteOffset
        return new Int16Array(output.buffer);
    }

    /**
     *
     * @param data Int8Array
     * @returns {Float32Array}
     */
    decode_float(data) {
        // int8 -> int16
        const intArray = this.decode_int16(data);
        // int16 -> float32
        const float32 = this.int2Float(intArray);
        return float32;
    }

    destroy() {

    }
}


window.libg729 = {
    // G729,
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