class PolySynth {
    constructor(context, maxVoices = 4) {
      this.context = context;
      this.maxVoices = maxVoices;
      this.activeVoices = [];
    }
  
    noteOn(frequency) {
      if (this.activeVoices.length < this.maxVoices) {
        let voice = new Sound(this.context);
        voice.play(frequency, 1);
        this.activeVoices.push(voice);
      }
    }
  
    noteOff() {
      if (this.activeVoices.length > 0) {
        let voice = this.activeVoices.shift();
        voice.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
        voice.oscillator.stop(this.context.currentTime + 0.5);
      }
    }
  }
  