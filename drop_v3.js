const synth = new Tone.Synth().toDestination();
let isPlaying = false;
let currentNote = 'E2'; // default note
let currentWaveform = 'sine'; // default waveform

function playNote() {
  synth.oscillator.type = currentWaveform;
  synth.triggerAttack(currentNote);
  isPlaying = true;
  updatePlayButtonLabel();
}

function stopNote() {
  synth.triggerRelease();
  isPlaying = false;
  updatePlayButtonLabel();
}

function togglePlay() {
  if (isPlaying) {
    stopNote();
  } else {
    playNote();
  }
}

function updatePlayButtonLabel() {
  const playButton = document.querySelector('#play-btn');
  playButton.textContent = isPlaying ? 'Off' : 'On';
}

document.querySelector('#note-select').addEventListener('change', () => {
  currentNote = document.querySelector('#note-select').value;
  if (isPlaying) {
    playNote();
  }
});

document.querySelector('#waveform-select').addEventListener('change', () => {
  currentWaveform = document.querySelector('#waveform-select').value;
  if (isPlaying) {
    playNote();
  }
});

document.querySelector('#play-btn').addEventListener('click', togglePlay);
