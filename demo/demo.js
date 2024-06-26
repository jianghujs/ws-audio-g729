function loadPcm() {
    var xhr = new XMLHttpRequest();
    // 8k 16bit 1 channel
    xhr.open('GET', 'sample.pcm', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        var pcm = xhr.response;
        // console.log(pcm);
        var pcmArray = new Int8Array(pcm);
        // console.log(pcmArray);
        // 取160个样本
        // pcmArray = pcmArray.slice(0, 160);
        window.libg729.onload(() => {
            g729 = new window.libg729.G729();

            // 循环取160个样本
            for (let i = 0; i < pcmArray.length; i += 160) {
                encodePcm(pcmArray.slice(i, i + 160));
            }
            // encodePcm(pcmArray.slice(0, 160));
            var allPcm = new Int8Array(0);
            if (tempPcmList.length > 0) {
                while (tempPcmList.length > 0) {
                    var tempPcm = tempPcmList.shift();
                    var len = allPcm.length + tempPcm.length;
                    var newPcm = new Int8Array(len);
                    newPcm.set(allPcm, 0);
                    newPcm.set(tempPcm, allPcm.length);
                    allPcm = newPcm;
                }
                download(allPcm);
            }
        })
    };
    xhr.send();
}

var g729 = null;
var tempPcmList = [];

function encodePcm(pcmArray) {
    _encodePcm(pcmArray)
}

function _encodePcm(pcmArray) {
    console.log('需要编码的：pcmArray', pcmArray);
    const start = new Date().getTime();
    const encodePcm = g729.encode(pcmArray);
    const end = new Date().getTime();
    console.log(`时间损耗：start: ${start}, end: ${end}, time: ${end - start}`);
    console.log('编码后的：encodePcm', encodePcm);
    const decodePcm = g729.decode(encodePcm);
    console.log('解码后的：decodePcm', decodePcm);
    // 保存起来
    tempPcmList.push(decodePcm);
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

