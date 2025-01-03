import * as Tone from 'tone';

// Creating a synth instance
const synth = new Tone.PolySynth().toDestination();

// Play a note when called
export function playNote(pitch) {
  console.log(`Playing note: ${pitch}`);
  synth.triggerAttackRelease(pitch, '16n');
}

// Play a chord
export function playChord(chordNameOrNotes) {
  if (Array.isArray(chordNameOrNotes)) {
    // If an array of notes is passed, play the chord directly
    console.log(`Playing chord: ${chordNameOrNotes}`);
    synth.triggerAttackRelease(chordNameOrNotes, '16n');
  } else {
    // If a chord name is passed, find and play the corresponding chord
    const chordName = chordNameOrNotes;
    for (const category in chords) {
      if (chords[category][chordName]) {
        const notes = chords[category][chordName];
        console.log(`Playing chord: ${chordName} - ${notes}`);
        synth.triggerAttackRelease(notes, '16n');
        return;
      }
    }
    console.log(`Chord ${chordName} not found`);
  }
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
export const notes = [
  'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4',
  'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5',
  'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5'
];

// Array of chords
export const chords = {
  'Major chords': {
    'C': ['C4', 'E4', 'G4'],
    'C#': ['C#4', 'F4', 'G#4'],
    'D': ['D4', 'F#4', 'A4'],
    'D#': ['D#4', 'G4', 'A#4'],
    'E': ['E4', 'G#4', 'B4'],
    'F': ['F4', 'A4', 'C5'],
    'F#': ['F#4', 'A#4', 'C#5'],
    'G': ['G4', 'B4', 'D5'],
    'G#': ['G#4', 'C5', 'D#5'],
    'A': ['A4', 'C#5', 'E5'],
    'A#': ['A#4', 'D5', 'F5'],
    'B': ['B4', 'D#5', 'F#5'],
  },
  'Minor chords': {
    'Cm': ['C4', 'D#4', 'G4'],
    'C#m': ['C#4', 'E4', 'G#4'],
    'Dm': ['D4', 'F4', 'A4'],
    'D#m': ['D#4', 'F#4', 'A#4'],
    'Em': ['E4', 'G4', 'B4'],
    'Fm': ['F4', 'G#4', 'C5'],
    'F#m': ['F#4', 'A4', 'C#5'],
    'Gm': ['G4', 'A#4', 'D5'],
    'G#m': ['G#4', 'B4', 'D#5'],
    'Am': ['A4', 'C5', 'E5'],
    'A#m': ['A#4', 'C#5', 'F5'],
    'Bm': ['B4', 'D5', 'F#5'],
  },
  'Seventh chords': {
    'C7': ['C4', 'E4', 'G4', 'A#4'],
    'C#7': ['C#4', 'F4', 'G#4', 'B4'],
    'D7': ['D4', 'F#4', 'A4', 'C5'],
    'D#7': ['D#4', 'G4', 'A#4', 'C#5'],
    'E7': ['E4', 'G#4', 'B4', 'D5'],
    'F7': ['F4', 'A4', 'C5', 'D#5'],
    'F#7': ['F#4', 'A#4', 'C#5', 'E5'],
    'G7': ['G4', 'B4', 'D5', 'F5'],
    'G#7': ['G#4', 'C5', 'D#5', 'F#5'],
    'A7': ['A4', 'C#5', 'E5', 'G5'],
    'A#7': ['A#4', 'D5', 'F5', 'G#5'],
    'B7': ['B4', 'D#5', 'F#5', 'A5'],
  },
  'Minor seventh chords': {
    'Cm7': ['C4', 'D#4', 'G4', 'A#4'],
    'C#m7': ['C#4', 'E4', 'G#4', 'B4'],
    'Dm7': ['D4', 'F4', 'A4', 'C5'],
    'D#m7': ['D#4', 'F#4', 'A#4', 'C#5'],
    'Em7': ['E4', 'G4', 'B4', 'D5'],
    'Fm7': ['F4', 'G#4', 'C5', 'D#5'],
    'F#m7': ['F#4', 'A4', 'C#5', 'E5'],
    'Gm7': ['G4', 'A#4', 'D5', 'F5'],
    'G#m7': ['G#4', 'B4', 'D#5', 'F#5'],
    'Am7': ['A4', 'C5', 'E5', 'G5'],
    'A#m7': ['A#4', 'C#5', 'F5', 'G#5'],
    'Bm7': ['B4', 'D5', 'F#5', 'A5'],
  },
  'Diminished chords': {
    'Cdim': ['C4', 'D#4', 'F#4'],
    'C#dim': ['C#4', 'E4', 'G4'],
    'Ddim': ['D4', 'F4', 'G#4'],
    'D#dim': ['D#4', 'F#4', 'A4'],
    'Edim': ['E4', 'G4', 'A#4'],
    'Fdim': ['F4', 'G#4', 'B4'],
    'F#dim': ['F#4', 'A4', 'C5'],
    'Gdim': ['G4', 'A#4', 'C#5'],
    'G#dim': ['G#4', 'B4', 'D5'],
    'Adim': ['A4', 'C4', 'D#5'],
    'A#dim': ['A#4', 'C#5', 'E5'],
    'Bdim': ['B4', 'D5', 'F5'],
  },
  'Augmented chords': {
    'Caug': ['C4', 'E4', 'G#4'],
    'C#aug': ['C#4', 'F4', 'A4'],
    'Daug': ['D4', 'F#4', 'A#4'],
    'D#aug': ['D#4', 'G4', 'B4'],
    'Eaug': ['E4', 'G#4', 'C5'],
    'Faug': ['F4', 'A4', 'C#5'],
    'F#aug': ['F#4', 'A#4', 'D5'],
    'Gaug': ['G4', 'B4', 'D#5'],
    'G#aug': ['G#4', 'C5', 'E5'],
    'Aaug': ['A4', 'C#5', 'F5'],
    'A#aug': ['A#4', 'D5', 'F#5'],
    'Baug': ['B4', 'D#5', 'G5'],
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
    'Edim7': ['E4', 'G4', 'A#4', 'C#5'],
    'Fdim7': ['F4', 'G#4', 'B4', 'D5'],
    'F#dim7': ['F#4', 'A4', 'C5', 'D#5'],
    'Gdim7': ['G4', 'A#4', 'C#5', 'E5'],
    'G#dim7': ['G#4', 'B4', 'D5', 'F5'],
    'Adim7': ['A4', 'C4', 'D#5', 'F#5'],
    'A#dim7': ['A#4', 'C#5', 'E5', 'G5'],
    'Bdim7': ['B4', 'D5', 'F5', 'A5'],
  },
  'Suspended 4th chords': {
    'Csus4': ['C4', 'F4', 'G4'],
    'C#sus4': ['C#4', 'F#4', 'G#4'],
    'Dsus4': ['D4', 'G4', 'A4'],
    'D#sus4': ['D#4', 'G#4', 'A#4'],
    'Esus4': ['E4', 'A4', 'B4'],
    'Fsus4': ['F4', 'A#4', 'C5'],
    'F#sus4': ['F#4', 'B4', 'C#5'],
    'Gsus4': ['G4', 'C5', 'D5'],
    'G#sus4': ['G#4', 'C#5', 'D#5'],
    'Asus4': ['A4', 'D5', 'E5'],
    'A#sus4': ['A#4', 'D#5', 'F5'],
    'Bsus4': ['B4', 'E5', 'F#5'],
  },
  'First inversion chords': {
    'C/E': ['E4', 'G4', 'C5'],
    'C#/F': ['F4', 'G#4', 'C#5'],
    'D/F#': ['F#4', 'A4', 'D5'],
    'D#/G': ['G4', 'A#4', 'D#5'],
    'E/G#': ['G#4', 'B4', 'E5'],
    'F/A': ['A4', 'C5', 'F5'],
    'F#/A#': ['A#4', 'C#5', 'F#5'],
    'G/B': ['B4', 'D5', 'G5'],
    'G#/C': ['C5', 'D#5', 'G#5'],
    'A/C#': ['C#5', 'E5', 'A5'],
    'A#/D': ['D5', 'F5', 'A#5'],
    'B/D#': ['D#5', 'F#5', 'B5'],
  },
  'Major seventh chords': {
    'Cmaj7': ['C4', 'E4', 'G4', 'B4'],
    'C#maj7': ['C#4', 'F4', 'G#4', 'C5'],
    'Dmaj7': ['D4', 'F#4', 'A4', 'C#5'],
    'D#maj7': ['D#4', 'G4', 'A#4', 'D5'],
    'Emaj7': ['E4', 'G#4', 'B4', 'D#5'],
    'Fmaj7': ['F4', 'A4', 'C5', 'E5'],
    'F#maj7': ['F#4', 'A#4', 'C#5', 'F5'],
    'Gmaj7': ['G4', 'B4', 'D5', 'F#5'],
    'G#maj7': ['G#4', 'C5', 'D#5', 'G5'],
    'Amaj7': ['A4', 'C#5', 'E5', 'G#5'],
    'A#maj7': ['A#4', 'D5', 'F5', 'A5'],
    'Bmaj7': ['B4', 'D#5', 'F#5', 'A#5'],
  },
  'Other chords': {
    'G/F': ['G4', 'B4', 'D5', 'F4'],
    'Bm/D': ['B4', 'D5', 'F#5', 'D4'],
  },
};
