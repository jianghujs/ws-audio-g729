function loadPcm() {
    var xhr = new XMLHttpRequest();
    // 8k 16bit 1 channel
    xhr.open('GET', 'demo.pcm', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        var pcm = xhr.response;
        // console.log(pcm);
        var pcmArray = new Int16Array(pcm);
        console.log(pcmArray);
        encodePcm(pcmArray);

    };
    xhr.send();
}

function encodePcm(pcmArray) {

}

function decodePcm() {

}

loadPcm();