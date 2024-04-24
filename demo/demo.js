
function loadPcm() {
    var xhr = new XMLHttpRequest();
    // 8k 16bit 1 channel
    xhr.open('GET', 'sample.pcm', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        var pcm = xhr.response;
        // console.log(pcm);
        var pcmArray = new Int16Array(pcm);
        console.log(pcmArray);
        // 取160个样本
        // pcmArray = pcmArray.slice(0, 160);
        encodePcm(pcmArray.slice(0, 160));

    };
    xhr.send();
}



function encodePcm(pcmArray) {
    window.libg729.onload(()=>{
        var g729Encoder = new window.libg729.G729Encoder();
        // var g729Decoder = new window.libg729.G729Decoder();
        console.log('pcmArray', pcmArray);
        const encodePcm =  g729Encoder.encode(pcmArray);
        console.log('encodePcm', encodePcm);
    })
}

function decodePcm() {
    window.libg729.onload(()=>{
        var g729Decoder = new window.libg729.G729Decoder();
        // var g729Decoder = new window.libg729.G729Decoder();
        console.log('pcmArray', pcmArray);
        const encodePcm =  g729Encoder.encode(pcmArray);
        console.log('encodePcm', encodePcm);
    })
}

loadPcm();

