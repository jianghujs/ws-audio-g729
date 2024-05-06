function loadPcm() {
    var xhr = new XMLHttpRequest();
    // 8k 16bit 1 channel
    xhr.open('GET', 'sample.pcm', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        var pcm = xhr.response;
        // console.log(pcm);
        // var pcmArray = new Int8Array(pcm);
        var pcmArray = new Int16Array(pcm);
        // console.log(pcmArray);
        // 取80个样本
        // pcmArray = pcmArray.slice(0, 80);
        window.libg729.onload(() => {
            g729Encoder = new window.libg729.G729Encoder();
            g729Decoder = new window.libg729.G729Decoder();
            // 循环取 160个样本
            encodePcm(pcmArray);
            var allPcm = new Float32Array(0);
            if (tempPcmList.length > 0) {
                while (tempPcmList.length > 0) {
                    var tempPcm = tempPcmList.shift();
                    var len = allPcm.length + tempPcm.length;
                    var newPcm = new Float32Array(len);
                    newPcm.set(allPcm, 0);
                    newPcm.set(tempPcm, allPcm.length);
                    allPcm = newPcm;
                }
                // download(allPcm);
            }
        })
    };
    xhr.send();
}

var g729Encoder = null;
var g729Decoder = null;
var tempPcmList = [];

function encodePcm(pcmArray) {
    _encodePcm(pcmArray)
}

function _encodePcm(pcmArray) {
    console.log('pcmArray', pcmArray);
    const tempEncodePcm = g729Encoder.encode_int16(pcmArray);
    console.log('tempEncodePcm', tempEncodePcm);
    tempEncodePcm.forEach((encodePcm) => {
        const decodePcm = g729Decoder.decode_float(encodePcm);
        console.log('decodePcm', decodePcm);
        // 保存起来
        tempPcmList.push(decodePcm);
    })
}

function decodePcm() {
    window.libg729.onload(() => {
        var g729Decoder = new window.libg729.G729Decoder();
        // var g729Decoder = new window.libg729.G729Decoder();
        console.log('pcmArray', pcmArray);
        const encodePcm = g729Encoder.encode(pcmArray);
        console.log('encodePcm', encodePcm);
    })
}


function download(allPcm) {
    const blob = new Blob([allPcm]);
    try {
        const oa = document.createElement('a');
        oa.href = window.URL.createObjectURL(blob);
        oa.download = Date.now() + '.pcm';
        oa.click();
        window.URL.revokeObjectURL(oa.href);
    } catch (e) {
        console.error('downloadG711File', e);
    }
}

loadPcm();

