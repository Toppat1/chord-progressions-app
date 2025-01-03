import React, { useState } from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords } from './musicHelpers.js';

function DegreeSection() {
  const diatonicChords = {
    'major': [
      ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
      [2, 2, 1, 2, 2, 2, 1],
    ],
    'minor': [
      ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
      [2, 1, 2, 2, 1, 2, 2],
    ],
  };

  const degreeChords = [
    ['C', 'Cm', 'Cdim'],
    ['C#', 'C#m', 'C#dim'],
    ['D', 'Dm', 'Ddim'],
    ['D#', 'D#m', 'D#dim'],
    ['E', 'Em', 'Edim'],
    ['F', 'Fm', 'Fdim'],
    ['F#', 'F#m', 'F#dim'],
    ['G', 'Gm', 'Gdim'],
    ['G#', 'G#m', 'G#dim'],
    ['A', 'Am', 'Adim'],
    ['A#', 'A#m', 'A#dim'],
    ['B', 'Bm', 'Bdim'],
  ];

  // From the key text and chord degree, return the chord and its degree
  const getChord = (keyText, degreeDigit) => {
    // Find the key and whether it is major/minor
    const key = keyText.split(' ')[0];
    const tonality = keyText.split(' ')[1].toLowerCase();

    // Find the index of the I chord
    const Iindex = degreeChords.findIndex(chordGroup => chordGroup[0].includes(key));

    // Find the index of the degree based on its number degree
    const degreeIndex = degreeDigit - 1;
    const degreeNumber = diatonicChords[tonality][0][degreeIndex];

    // The wanted chord's position is the I index + its degree index

    let degreeChordJumps = 0;
    for (let i = 0; i < degreeIndex; i++) {
      degreeChordJumps += diatonicChords[tonality][1][i];
    }

    const chordIndex = (Iindex + degreeChordJumps) % degreeChords.length;

    // Decide which type of chord to return, e.g. ii = minor, IV = major
    let chordType;

    if (degreeNumber.includes('°')) {
      chordType = 2;
    } else if (degreeNumber === degreeNumber.toUpperCase()) {
      chordType = 0;
    } else if (degreeNumber === degreeNumber.toLowerCase()) {
      chordType = 1;
    }

    // Return the degree and chord on two separate lines
    console.log({
      'KeyText': keyText,
      'DegreeDigit': degreeDigit,
      'DegreeNumber': degreeNumber,
      'Key': key,
      'Tonality': tonality,
      'Iindex': Iindex,
      'DegreeIndex': degreeIndex,
      'ChordIndex': chordIndex,
      'chordType': chordType,
      'Chord returned': degreeChords[chordIndex][chordType],
    });
    return [degreeNumber, degreeChords[chordIndex][chordType]];
  };

  // Take in a degree and chord, and return them one on top of the other to be displayed on the degree button
  const formatDegreeButton = ([degreeDigit, chord]) => {
    return (
      <>
        <b>{degreeDigit}</b>
        <br />
        {chord}
      </>
    );
  };

  // Set a variable initially to 'G major', but can be changed using the setKeyText function
  const [keyText, setKeyText] = useState('G major');

  // Must accommodate getChord function for minor too, cant use I, ii etc
  return (
    <div className='degree-container'>
      <button id='key-button'>{keyText}</button>

      <button id='degree1' onClick={() => playChord(getChord(keyText, 1)[1])}>
        {formatDegreeButton(getChord(keyText, 1))}
      </button>
      <button id='degree2' onClick={() => playChord(getChord(keyText, 2)[1])}>
        {formatDegreeButton(getChord(keyText, 2))}
      </button>
      <button id='degree3' onClick={() => playChord(getChord(keyText, 3)[1])}>
        {formatDegreeButton(getChord(keyText, 3))}
      </button>
      <button id='degree4' onClick={() => playChord(getChord(keyText, 4)[1])}>
        {formatDegreeButton(getChord(keyText, 4))}
      </button>
      <button id='degree5' onClick={() => playChord(getChord(keyText, 5)[1])}>
        {formatDegreeButton(getChord(keyText, 5))}
      </button>
      <button id='degree6' onClick={() => playChord(getChord(keyText, 6)[1])}>
        {formatDegreeButton(getChord(keyText, 6))}
      </button>

      {/* Requires diminished chord integration, ternary won't work. Also needs support for sharps*/}

      <button id='degree7' onClick={() => playChord(getChord(keyText, 7)[1])}>
        {formatDegreeButton(getChord(keyText, 7))}
      </button>
    </div>
  );
}

export default DegreeSection;
