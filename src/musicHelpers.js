import * as Tone from 'tone';
import { useMusicalKeyContext } from './musicalKeyContext.js';

// When the app is first loaded, the Tone.js context is off
let isToneStarted = false;

// Function to start the Tone.js context
export const startTone = async () => {
  if (!isToneStarted) {
    await Tone.start();
    isToneStarted = true;
  }
};

// Creating a synth instance
const synth = new Tone.PolySynth().toDestination();
const synth1 = new Tone.PolySynth(Tone.Synth).toDestination();

// Play a note when called
export function playNote(pitch, duration = '16n') {
  console.log(`Playing note: ${pitch}`);
  synth.triggerAttackRelease(pitch, duration);
}

// Play a chord
export function playChord(chordNameOrNotes, duration = '16n') {
  if (Array.isArray(chordNameOrNotes)) {
    // If an array of notes is passed, play the chord directly
    console.log(`Playing chord: ${chordNameOrNotes}`);
    synth.triggerAttackRelease(chordNameOrNotes, duration);
  } else {
    // If a chord name is passed, find and play the corresponding chord
    const chordName = chordNameOrNotes;
    for (const category in chords) {
      if (chords[category][chordName]) {
        const notes = chords[category][chordName];
        console.log(`Playing chord: ${chordName} - ${notes}`);
        synth.triggerAttackRelease(notes, duration);
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

// Array of all chromatic notes
const chromaticNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const chordFormulae = { 'Major': [0, 4, 7], 'Minor': [0, 3, 7], 'Diminished': [0, 3, 6], 'Augmented': [0, 4, 8] };

export const newPlayChord = (chordName, time = Tone.now()) => {
  console.log(`Playing chord ${chordName}`);
  // E.g. 'C' --> Major with C as the root note --> 'C': ['C4', 'E4', 'G4'] --> Play C Major

  // Find chord root
  const root = chordName[1] === '#' ? chordName.slice(0, 2) : chordName.slice(0, 1);

  // Find chord type/alterations
  let type = chordName.slice(root.length);

  // Make an array of which note indexes to play based one of the 4 primary chord types
  let indexesToPlay;

  // Primary chord type checking
  if (type[0] === 'm' && type.slice(0, 3) !== 'maj') {
    indexesToPlay = [...chordFormulae['Minor']]; // [...] creates a copy of the array to avoid major chords remembering sus chords
    type = type.substring(1);
  } else if (type.slice(0, 3) === 'dim') {
    indexesToPlay = [...chordFormulae['Diminished']];
    type = type.includes('dim7') ? type : type.substring(3); // If the chord is Xdim7, leave the dim7 in to identify fully diminished 7th later
  } else if (type.slice(0, 3) === 'aug') {
    indexesToPlay = [...chordFormulae['Augmented']];
    type = type.substring(3);
  } else {
    indexesToPlay = [...chordFormulae['Major']];
  }

  // Additional chord alterations, maybe change to explicit index groups directly?
  let bassNote; // If a slash chord
  while (type !== '') {
    if (type.slice(0, 4) === 'sus4') {
      indexesToPlay[1] = 5;
      type = type.substring(4);
    } else if (type.slice(0, 4) === 'sus2') {
      indexesToPlay[1] = 2;
      type = type.substring(4);
    } else if (type.slice(0, 3) === '7b5') {
      // Half-diminished seventh
      indexesToPlay = [0, 3, 6, 10];
      type = type.substring(3);
    } else if (type.slice(0, 2) === 'ø7') {
      // Half-diminished seventh in slashed circle form
      indexesToPlay = [0, 3, 6, 10];
      type = type.substring(2);
    } else if (type.slice(0, 4) === 'dim7') {
      // Fully-diminished seventh
      indexesToPlay.push(9);
      type = type.substring(4);
    } else if (type.slice(0, 4) === 'maj7') {
      // Major seventh with maj7 notation
      indexesToPlay.push(11);
      type = type.substring(4);
    } else if (type.slice(0, 2) === 'M7') {
      // Major seventh
      indexesToPlay.push(11);
      type = type.substring(2);
    } else if (type.slice(0, 1) === '7') {
      // Dominant seventh
      indexesToPlay.push(10);
      type = type.substring(1);
    } else if (type.slice(0, 1) === '/') {
      bassNote = type.substring(1);
      type = '';
    }
  } // TO DO: FIRST/SECOND INVERSIONS AND UNRELATED NEW ROOT CHORDS, e.g. Am/G or Am7/G

  // Make an array for letter notes to play
  let notesToPlay = [];

  // Find index of root note in chromaticNotes e.g. C in Csus4 is chromatic index 0
  const rootNoteIndex = chromaticNotes.indexOf(root);

  // Shift the note indexes by the root note chromatic index
  indexesToPlay.forEach(noteIndex => {
    notesToPlay.push(chromaticNotes[(noteIndex + rootNoteIndex) % 12]);
  });

  console.log(`Root is ${root}, bassNote is ${bassNote}, notesToPlay are ${notesToPlay}`);

  // If the chord is in 1st or 2nd inversion
  if (notesToPlay[1] === bassNote) {
    console.log(`Note in first inverison is ${notesToPlay} with bassnote ${bassNote}`);
    // Make second note the first note, add the rest of the notes, then add the first note to the end
    notesToPlay = [notesToPlay[1], ...notesToPlay.slice(2), notesToPlay[0]];
  } else if (notesToPlay[2] === bassNote) {
    console.log(`Note in second inverison is ${notesToPlay} with bassnote ${bassNote}`);
    // Make second note the first note, add the rest of the notes, then add the first note to the end
    notesToPlay = [notesToPlay[2], ...notesToPlay.slice(3), notesToPlay[0], notesToPlay[1]];
  }

  // Algorithm to logically add on the octave number of each note
  notesToPlay = notesToPlay.map(note => {
    if (chromaticNotes.indexOf(note) < chromaticNotes.indexOf(notesToPlay[0])) {
      return note + '5';
    } else {
      return note + '4';
    }
  });

  // Play the chord notes in the array
  synth1.triggerAttackRelease(notesToPlay, '16n', time);
};

const diatonicChords = {
  'major': [
    ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'], // Diatonic chords
    [2, 2, 1, 2, 2, 2, 1], // Scale semitone differences
  ],
  'minor': [
    ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
    [2, 1, 2, 2, 1, 2, 2],
  ],
};

// Maybe use chords object in future?
const degreeChords = [
  ['C', 'Cm', 'Cdim', 'Cdim7', 'Cm7b5', 'Csus2', 'Csus4', 'Caug', 'C/E', 'C/G', 'C7', 'Cm7', 'Cmaj7'],
  ['C#', 'C#m', 'C#dim', 'C#dim7', 'C#m7b5', 'C#sus2', 'C#sus4', 'C#aug', 'C#/F', 'C#/G#', 'C#7', 'C#m7', 'C#maj7'],
  ['D', 'Dm', 'Ddim', 'Ddim7', 'Dm7b5', 'Dsus2', 'Dsus4', 'Daug', 'D/F#', 'D/A', 'D7', 'Dm7', 'Dmaj7'],
  ['D#', 'D#m', 'D#dim', 'D#dim7', 'D#m7b5', 'D#sus2', 'D#sus4', 'D#aug', 'D#/G', 'D#/A#', 'D#7', 'D#m7', 'D#maj7'],
  ['E', 'Em', 'Edim', 'Edim7', 'Em7b5', 'Esus2', 'Esus4', 'Eaug', 'E/G#', 'E/B', 'E7', 'Em7', 'Emaj7'],
  ['F', 'Fm', 'Fdim', 'Fdim7', 'Fm7b5', 'Fsus2', 'Fsus4', 'Faug', 'F/A', 'F/C', 'F7', 'Fm7', 'Fmaj7'],
  ['F#', 'F#m', 'F#dim', 'F#dim7', 'F#m7b5', 'F#sus2', 'F#sus4', 'F#aug', 'F#/A#', 'F#/C#', 'F#7', 'F#m7', 'F#maj7'],
  ['G', 'Gm', 'Gdim', 'Gdim7', 'Gm7b5', 'Gsus2', 'Gsus4', 'Gaug', 'G/B', 'G/D', 'G7', 'Gm7', 'Gmaj7'],
  ['G#', 'G#m', 'G#dim', 'G#dim7', 'G#m7b5', 'G#sus2', 'G#sus4', 'G#aug', 'G#/C', 'G#/D#', 'G#7', 'G#m7', 'G#maj7'],
  ['A', 'Am', 'Adim', 'Adim7', 'Am7b5', 'Asus2', 'Asus4', 'Aaug', 'A/C#', 'A/E', 'A7', 'Am7', 'Amaj7'],
  ['A#', 'A#m', 'A#dim', 'A#dim7', 'A#m7b5', 'A#sus2', 'A#sus4', 'A#aug', 'A#/D', 'A#/F', 'A#7', 'A#m7', 'A#maj7'],
  ['B', 'Bm', 'Bdim', 'Bdim7', 'Bm7b5', 'Bsus2', 'Bsus4', 'Baug', 'B/D#', 'B/F#', 'B7', 'Bm7', 'Bmaj7'],
];

// From the key text and chord degree, return the chord and its degree
export const getChord = (keyText, degreeDigit, alteration = '') => {
  // Find the key and whether it is major/minor
  const key = keyText.split(' ')[0];
  const tonality = keyText.split(' ')[1].toLowerCase();

  // Find the index of the I chord
  const Iindex = degreeChords.findIndex(chordGroup => chordGroup[0].includes(key));

  // Find the index of the degree based on its number degree
  const degreeIndex = degreeDigit - 1;
  let degreeNumber = diatonicChords[tonality][0][degreeIndex];

  // The wanted chord's position is the I index + its degree index

  let degreeChordJumps = 0;
  for (let i = 0; i < degreeIndex; i++) {
    degreeChordJumps += diatonicChords[tonality][1][i];
  }

  // If a sharp is present, raise the tone
  degreeChordJumps += alteration.includes('#') ? 1 : 0;
  degreeChordJumps += alteration.includes('7°7/') ? -1 : 0;

  const chordIndex = (Iindex + degreeChordJumps) % degreeChords.length;

  // Decide which type of chord to return, e.g. ii = minor, IV = major
  let chordType;

  // prettier-ignore
  switch (alteration) {
      // INCORRECT FOR MINOR CHORDS
      case '1inv':
        chordType = 8;
        degreeNumber = <span>{degreeNumber}<sup>6</sup></span>;
        break;

      case '2inv':
        chordType = 9;
        degreeNumber = <span>{degreeNumber}<sup>6</sup><sub>4</sub></span>;
        break;

      case '7°7/':
        chordType = 3;
        degreeNumber = <span>vii°<sup>7</sup>/{degreeNumber}</span>;
        break;

      case '#mø7':
        chordType = 4;
        degreeNumber = <span>#{degreeNumber.toLowerCase()}<sup>ø7</sup></span>;
        break;

      // case '7':
      //   switch (tonality){
      //     case 'major':
      //        if (degreeNumber.includes('°')) {
      //         chordType = 4;
      //         degreeNumber = <span>{degreeNumber}<sup>7</sup></span>;
      //       }
      //       else if (['I','IV'].includes(degreeNumber)){
      //         chordType = 12;
      //         degreeNumber = <span>{degreeNumber}M<sup>7</sup></span>;
      //       } else if (degreeNumber === degreeNumber.toLowerCase()) {
      //         chordType = 11;
      //         degreeNumber = <span>{degreeNumber}<sup>7</sup></span>;
      //       }}

        
      default:
        if (degreeNumber.includes('°')) {
          chordType = 2;
        } else if (degreeNumber === degreeNumber.toUpperCase()) {
          chordType = 0;
        } else if (degreeNumber === degreeNumber.toLowerCase()) {
          chordType = 1;
        }
        break;
    }

  return [degreeNumber, degreeChords[chordIndex][chordType]];
};

const scales = {
  'major': [
    ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'], // Diatonic chords
    [0, 2, 4, 5, 7, 9, 11], // Indices of notes in scale
    ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'ø7'],
  ],
  // Natural minor
  'minor': [
    ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
    [0, 2, 3, 5, 7, 8, 10],
    ['m7', 'ø7', 'maj7', 'm7', 'm7', 'maj7', '7'],
  ],
  // Harmonic minor
  'harmonic minor': [
    ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°'],
    [0, 2, 3, 5, 7, 8, 11],
    ['mmaj7', 'ø7', 'maj7+', 'm7', '7', 'maj7', 'dim7'],
  ],
  // Melodic minor
  'melodic minor': [
    ['i', 'ii', 'III+', 'IV', 'V', 'vi°', 'vii°'],
    [0, 2, 3, 5, 7, 9, 11],
    ['mmaj7', 'm7', 'maj7+', 'maj7', '7', 'ø7', 'dim7'],
  ],
};

export function newGetChord(key, degreeDigit, alteration = '') {
  //console.log(`In key ${key}, searching for chord in degree ${degreeDigit} with alteration ${alteration}`)
  key = key.toLowerCase();
  const keyParts = key.split(' ');

  const keyRoot = keyParts[0].toUpperCase(); // E.g. G in G Major
  const keyTonality = keyParts.slice(1).join(' '); // Major or natural/harmonic/melodic minor

  // Chord's index position in scale
  const chordPos = degreeDigit - 1;

  // From degreeDigit (e.g. 3), find the roman numeral (e.g. iii)
  const degree = scales[keyTonality][0][chordPos];

  // Find index of I chord's root note in chromaticNotes e.g. C is chromatic index 0
  const rootNoteIndex = chromaticNotes.indexOf(keyRoot);

  // Find root note of wanted chord
  const chordRoot = chromaticNotes[(rootNoteIndex + scales[keyTonality][1][chordPos]) % 12];

  // Find index of target chord's root note in chromaticNotes
  const chordRootIndex = chromaticNotes.indexOf(chordRoot);

  //console.log(`Okay, that chord start with ${chordRoot}. The degree is ${degree}`)

  // Find chord tonality
  let chordTonality;
  if (degree.includes('°')) {
    chordTonality = 'dim';
  } else if (degree.includes('+')) {
    chordTonality = 'aug';
  } else if (degree === degree.toLowerCase()) {
    chordTonality = 'm';
  } else if (degree === degree.toUpperCase()) {
    chordTonality = '';
  }

  console.log(`The wanted chord's tonality is ${chordTonality}`);

  // Handle alterations and set final chord roman numeral and name
  let chordNumeral;
  let chordName;
  if (alteration === 'V/') {
    chordNumeral = alteration + degree;
    chordName = newGetChord(chordTonality === 'm' ? `${chordRoot} harmonic minor` : `${chordRoot} major`, 5)[1];
  } else if (alteration === 'V7/') {
    chordNumeral = alteration + degree;
    chordName = newGetChord(chordTonality === 'm' ? `${chordRoot} harmonic minor` : `${chordRoot} major`, 5, '7')[1];
  } else if (alteration === '7') {
    //console.log(`Finding ${degree+alteration}'s Numeral. The chordPos is ${chordPos}. Key tonality of this target chord is ${keyTonality}`)
    chordNumeral = degree + (scales[keyTonality][2][chordPos] === 'm7' ? '7' : scales[keyTonality][2][chordPos]);
    //console.log(`The wanted chord's numeral is ${chordNumeral}`)
    chordName = chordRoot + scales[keyTonality][2][chordPos];
  } else if (alteration === 'vii°7/') {
    chordNumeral = alteration + degree;
    chordName = chromaticNotes.at(chordRootIndex - 1) + 'dim7';
  } else if (alteration === '#ø7') {
    chordNumeral = '#' + degree.toLowerCase() + 'ø7';
    chordName = chromaticNotes.at((chordRootIndex + 1) % 12) + 'm7b5';
  } else if (alteration === '1inv') {
    chordNumeral = degree + '6';
    let secondNoteChromaticIndex;

    switch (chordTonality) {
      case 'm':
        secondNoteChromaticIndex = chordFormulae['Minor'][1];
        chordName = chordRoot + 'm/' + chromaticNotes[(chordRootIndex + secondNoteChromaticIndex) % 12];
        break;
      case '':
        secondNoteChromaticIndex = chordFormulae['Major'][1];
        chordName = chordRoot + '/' + chromaticNotes[(chordRootIndex + secondNoteChromaticIndex) % 12];
        break;
      case 'dim':
        secondNoteChromaticIndex = chordFormulae['Diminished'][1];
        chordName = chordRoot + 'dim/' + chromaticNotes[(chordRootIndex + secondNoteChromaticIndex) % 12];
        break;
    }
  } else if (alteration === '2inv') {
    chordNumeral = degree + '64';
    let thirdNoteChromaticIndex;

    switch (chordTonality) {
      case 'm':
        thirdNoteChromaticIndex = chordFormulae['Minor'][2];
        chordName = chordRoot + 'm/' + chromaticNotes[(chordRootIndex + thirdNoteChromaticIndex) % 12];
        break;
      case '':
        thirdNoteChromaticIndex = chordFormulae['Major'][2];
        chordName = chordRoot + '/' + chromaticNotes[(chordRootIndex + thirdNoteChromaticIndex) % 12];
        break;
      case 'dim':
        thirdNoteChromaticIndex = chordFormulae['Diminished'][2];
        chordName = chordRoot + 'dim/' + chromaticNotes[(chordRootIndex + thirdNoteChromaticIndex) % 12];
        break;
    }
  } else if (alteration === 'dim') {
    chordNumeral = degree + (degree.includes('°') ? '' : '°');
    chordName = chordRoot + 'dim';
  } else {
    chordNumeral = degree + alteration;
    chordName = chordRoot + chordTonality + alteration;
  }

  console.log([key, degreeDigit, alteration, chordNumeral, chordName]);
  return [chordNumeral, chordName];
}

// Array of notes
export const notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5'];

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
    'Bdim7': ['B4', 'D5', 'F5', 'G#5'],
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
  'Second inversion chords': {
    'C/G': ['G4', 'C5', 'E5'],
    'C#/G#': ['G#4', 'C#5', 'F5'],
    'D/A': ['A4', 'D5', 'F#5'],
    'D#/A#': ['A#4', 'D#5', 'G5'],
    'E/B': ['B4', 'E5', 'G#5'],
    'F/C': ['C5', 'F5', 'A5'],
    'F#/C#': ['C#5', 'F#5', 'A#5'],
    'G/D': ['D5', 'G5', 'B5'],
    'G#/D#': ['D#5', 'G#5', 'C6'],
    'A/E': ['E5', 'A5', 'C#6'],
    'A#/F': ['F5', 'A#5', 'D6'],
    'B/F#': ['F#5', 'B5', 'D#6'],
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

// Take in a degree and chord, and return them one on top of the other to be displayed on the degree button
const formatDegreeButton = ([degreeDigit, chord]) => {
  return (
    <>
      <div className='roman-numeral'>{degreeDigit}</div>
      <div className='chord-name'>{chord}</div>
    </>
  );
};

// Create Degree button
export const ChordButton = ([chordNumeral, chordName]) => {
  // const { chordOrder, setChordOrder } = useChordContext();

  // Handler for when the chord button is right-clicked
  const handleRightClick = event => {
    event.preventDefault(); // Disables right-click context menu
    //setChordOrder([...chordOrder, [chordNumeral, chordName]]);
    //console.log(`Right clicked button was ${chordNumeral} ${chordName}, chord order is ${chordOrder}`);
  };

  return (
    <button className='degree-chord-button' onMouseDown={() => newPlayChord(chordName)} onContextMenu={handleRightClick}>
      {formatDegreeButton([chordNumeral, chordName])}
    </button>
  );
};

// Play chords in the chord order context
export function playProgression(chordsList) {
  // Access chordOrder and setChordOrder from ChordContext

  Tone.Transport.stop();
  Tone.Transport.cancel();
  const now = Tone.now();
  const part = new Tone.Part(
    (time, chord) => {
      synth1.triggerAttackRelease(chord, '16n', time);
    },
    chordsList.map((chord, index) => [index * 0.075, chord])
  ).start(0);

  Tone.Transport.start(now);
}

// From key and numeral (eventually number), return the chord made
export function getChordV3(key, fullNumeral) {
  try {
    // Split musical key into usable parts
    let keyLetter = key.toLowerCase().split(' ')[0].toUpperCase(); // E.g. G in G Major
    const keyTonality = key.toLowerCase().split(' ').slice(1).join(' '); // E.g. Major or natural/harmonic/melodic minor

    // Musical constants
    const chromaticNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const numerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];
    const scales = {
      'major': [0, 2, 4, 5, 7, 9, 11], // Indices of root notes in scale
      'minor': [0, 2, 3, 5, 7, 8, 10],
    };

    // Separate full numeral into numeral and extension

    // ALGORITHM TO ISOLATE PRIME CHORD
    let primeNumeral = '';

    // Detect flat b or sharp #
    let alteration = '';
    if (fullNumeral[0] == 'b') {
      fullNumeral = fullNumeral.slice(1);
      alteration = 'b';
    } else if (fullNumeral[0] == '#') {
      fullNumeral = fullNumeral.slice(1);
      alteration = '#';
    }

    let extension = '';
    if (['vii', 'iii'].includes(fullNumeral.slice(0, 3).toLowerCase())) {
      primeNumeral = fullNumeral.slice(0, 3);
      extension = fullNumeral.slice(3);
    } else if (['vi', 'ii', 'iv'].includes(fullNumeral.slice(0, 2).toLowerCase())) {
      primeNumeral = fullNumeral.slice(0, 2);
      extension = fullNumeral.slice(2);
    } else if (['v', 'i'].includes(fullNumeral.slice(0, 1).toLowerCase())) {
      primeNumeral = fullNumeral.slice(0, 1);
      extension = fullNumeral.slice(1);
    }

    // Turn vidim to VIdim
    primeNumeral = extension === 'dim' ? primeNumeral.toUpperCase() : primeNumeral;

    // Error handling for if the prime numeral is invalid
    const numeralIndex = numerals.indexOf(primeNumeral.toLowerCase());
    if (numeralIndex === -1) throw new Error(`Invalid numeral: ${primeNumeral}`);

    // Find tonic I chord root index
    let tonicRootIndex = chromaticNotes.indexOf(keyLetter);

    // Handle b and # alteration
    if (alteration == 'b') {
      tonicRootIndex = (tonicRootIndex - 1 + 12) % 12;
    } else if (alteration == '#') {
      tonicRootIndex = (tonicRootIndex + 1) % 12;
    }

    // Error handling for invalid tonic root index
    if (tonicRootIndex === -1) throw new Error(`Invalid key letter: ${keyLetter}`);

    // Find which chord correlates with the numeral
    const chordRootLetter = chromaticNotes[(tonicRootIndex + scales[keyTonality][numerals.indexOf(primeNumeral.toLowerCase())]) % 12];

    // Find chord tonality, major/minor, and append to chord
    const chordTonality = primeNumeral === primeNumeral.toUpperCase() ? 'major' : 'minor';
    const chordName = chordRootLetter + (chordTonality === 'major' ? '' : 'm') + extension;

    // HANDLE SHARP PRECEEDING NUMERAL

    return chordName;
  } catch (error) {
    console.error('Error in getChordV3:', error.message);
    return 'C';
  }
}

// Create new Chord button
export const NewChordButton = ({ fullNumeral }) => {
  // Access musicalKey and setMusicalKey from MusicalKeyContext
  const { musicalKey } = useMusicalKeyContext();

  // Get chord from numeral + musical key
  const chordName = getChordV3(musicalKey, String(fullNumeral));

  // Handle left click
  const leftClickHandler = () => {
    newPlayChord(chordName);
  };

  return (
    <button className='degree-chord-button' onMouseDown={leftClickHandler}>
      {formatDegreeButton([fullNumeral, chordName])}
    </button>
  );
};

// Play chord sequence
export const playChordSequence = (chordList, musicalKey, bpm = 120, duration = 4) => {
  const startTime = Tone.now(); // Capture the start time once

  chordList.forEach((chord, index) => {
    const chordToPlay = getChordV3(musicalKey, chord);
    newPlayChord(chordToPlay, startTime + index * (60 / bpm) * duration);
  });
};
