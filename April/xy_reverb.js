const instrument = document.getElementById('instrument');
const checkboxes = document.querySelectorAll('input[type=checkbox]');

const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
        type: 'custom',
        count: 0,
        spread: 0,
        fatness: 0,
        detune: 0
    }
}).toDestination();

instrument.addEventListener('mousedown', (event) => {
    handleMouseEvent(event);
    instrument.addEventListener('mousemove', handleMouseEvent);
});

document.addEventListener('mouseup', () => {
    synth.releaseAll();
    currentNote = null; // Reset current note
    instrument.removeEventListener('mousemove', handleMouseEvent);
});


let currentNote = null;

function handleMouseEvent(event) {
    const rect = instrument.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const pitch = Tone.Frequency((y / rect.height) * 127, 'midi');
    const reverbAmount = (x / rect.width);

    updateSynth(reverbAmount);

    if (currentNote !== pitch) {
        if (currentNote !== null) {
            synth.setNote(currentNote, pitch); // Change the pitch of the playing note
        } else {
            synth.triggerAttack(pitch); // Start a new note if none is currently playing
        }
        currentNote = pitch;
    }
}


function updateSynth(reverbAmount) {
    const waveformTypes = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            waveformTypes.push(checkbox.id);
        }
    });

    synth.set({
        oscillator: {
            type: waveformTypes.join('|')
        }
    });

    synth.disconnect();
    const reverb = new Tone.Reverb({
        decay: reverbAmount,
        preDelay: 0.01,
        wet: reverbAmount
    }).toDestination();
    synth.connect(reverb);
}


