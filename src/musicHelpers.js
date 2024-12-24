import * as Tone from 'tone';

// Creating a synth instance
const synth = new Tone.PolySynth().toDestination();

// Play a note when called
export function playNote(pitch) {
  console.log(`Playing note: ${pitch}`);
  synth.triggerAttackRelease(pitch, '16n');
}

// Play a chord
export function playChord(notes) {
  console.log(`Playing chord: ${notes}`);
  synth.triggerAttackRelease(notes, '16n');
}

// Play a sequence of notes without repeating
export function playSequence(notes) {
  Tone.Transport.stop();
  Tone.Transport.cancel();
  const now = Tone.now();
  const part = new Tone.Part(
    (time, note) => {
      synth.triggerAttackRelease(note, '16n', time);
    },
    notes.map((note, index) => [index * 0.075, note])
  ).start(0);

  Tone.Transport.start(now);
}

// Array of notes
export const notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'];

// Array of chords
export const chords = {
  'Major chords': {
    'C': ['C4', 'E4', 'G4'],
    'D': ['D4', 'F#4', 'A4'],
    'E': ['E4', 'G#4', 'B4'],
    'F': ['F4', 'A4', 'C5'],
    'G': ['G4', 'B4', 'D5'],
    'A': ['A4', 'C#5', 'E5'],
    'B': ['B4', 'D#5', 'F#5'],
  },
  'Minor chords': {
    'Cm': ['C4', 'D#4', 'G4'],
    'Dm': ['D4', 'F4', 'A4'],
    'Em': ['E4', 'G4', 'B4'],
    'Fm': ['F4', 'G#4', 'C5'],
    'Gm': ['G4', 'A#4', 'D5'],
    'Am': ['A4', 'C5', 'E5'],
    'Bm': ['B4', 'D5', 'F#5'],
  },
  'Seventh chords': {
    'C7': ['C4', 'E4', 'G4', 'A#4'],
    'D7': ['D4', 'F#4', 'A4', 'C5'],
    'E7': ['E4', 'G#4', 'B4', 'D5'],
    'F7': ['F4', 'A4', 'C5', 'D#5'],
    'G7': ['G4', 'B4', 'D5', 'F5'],
    'A7': ['A4', 'C#5', 'E5', 'G5'],
    'B7': ['B4', 'D#5', 'F#5', 'A5'],
  },
  'Diminished chords': {
    'Cdim': ['C4', 'D#4', 'F#4'],
    'Ddim': ['D4', 'F4', 'G#4'],
    'Edim': ['E4', 'G4', 'A#4'],
  },
  'Augmented chords': {
    'Caug': ['C4', 'E4', 'G#4'],
    'Daug': ['D4', 'F#4', 'A#4'],
    'Eaug': ['E4', 'G#4', 'C5'],
  },
  'Half-diminished chords': {
    'Cm7b5': ['C4', 'D#4', 'F#4', 'A#4'],
    'C#m7b5': ['C#4', 'E4', 'G4', 'B4'],
    'Dm7b5': ['D4', 'F4', 'G#4', 'C5'],
    'D#m7b5': ['D#4', 'F#4', 'A4', 'C#5'],
    'Em7b5': ['E4', 'G4', 'A#4', 'D5'],
    'Fm7b5': ['F4', 'G#4', 'B4', 'D#5'],
    'F#m7b5': ['F#4', 'A4', 'C5', 'E5'],
    'Gm7b5': ['G4', 'A#4', 'C#5', 'F5'],
    'G#m7b5': ['G#4', 'B4', 'D5', 'F#5'],
    'Am7b5': ['A4', 'C5', 'D#5', 'G5'],
    'A#m7b5': ['A#4', 'C#5', 'E5', 'G#5'],
    'Bm7b5': ['B4', 'D5', 'F5', 'A5'],
  },
  'Diminished 7th chords': {
    'Cdim7': ['C4', 'D#4', 'F#4', 'A4'],
    'C#dim7': ['C#4', 'E4', 'G4', 'A#4'],
    'Ddim7': ['D4', 'F4', 'G#4', 'B4'],
    'D#dim7': ['D#4', 'F#4', 'A4', 'C5'],
  },
};
