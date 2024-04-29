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

        // 循环取160个样本
        // for (let i = 0; i < pcmArray.length; i += 160) {
        //     encodePcm(pcmArray.slice(i, i + 160));
        // }
        encodePcm(pcmArray.slice(0, 160));

    };
    xhr.send();
}


function encodePcm(pcmArray) {
    window.libg729.onload(() => {
        var g729 = new window.libg729.G729();
        // var g729Decoder = new window.libg729.G729Decoder();
        console.log('需要编码的：pcmArray', pcmArray);
        const start = new Date().getTime();
        const encodePcm = g729.encode(pcmArray);
        const end = new Date().getTime();
        console.log(`时间损耗：start: ${start}, end: ${end}, time: ${end - start}`);
        console.log('编码后的：encodePcm', encodePcm);
        // const decodePcm = g729.decode(encodePcm);
        // console.log('解码后的：decodePcm', decodePcm);
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

loadPcm();

