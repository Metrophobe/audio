export class Audio {


    constructor() {
        this.initialized = false;
        //We use the browser to get User Media (we filter by Audio...) 
        //since it is a promise we chain with then statement to ensure the MediaStream is ready for consumption
        navigator.mediaDevices.getUserMedia({ audio: true }).then(
            (mediaStream) => {
                this.audioContext = new AudioContext(); //Create audio Context 
                this.streamSource = this.audioContext.createMediaStreamSource(mediaStream);//We use the audio context to create a stream source based on the stream 
                this.analyzer = this.audioContext.createAnalyser();
                this.analyzer.fftSize = 512; // we subdivide the fftSize into (2^9) 
                this.dataArray = new Uint8Array(this.analyzer.frequencyBinCount); // basically the fftSize/2 so 256! from which we create an 8 bit unsigned integer array of 256 elements ... these will be our bars 
                this.streamSource.connect(this.analyzer); //we wire up the streamsource from the mic to the analyser!

            }).catch((err) => {
                alert(err);
            }).finally(() => this.initialized = true);
    }

    getSamples() {
        this.analyzer.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e / 128 - 1);
        return normSamples;
    }

    getVolume() {
            let sum = 0;
            this.getSamples().forEach(e => sum += e * e);
            return Math.sqrt(sum / this.dataArray.length) * 2000;
    }

}