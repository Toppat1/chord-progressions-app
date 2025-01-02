import React, { useState } from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords } from './musicHelpers.js';

function DegreeSection() {
  const diatonicChords = { 'major': ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'], 'minor': ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'] };

  const major = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
  const minor = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];
  const degreeChords = [
    ['C', 'Cm'],
    ['D', 'Dm'],
    ['E', 'Em'],
    ['F', 'Fm'],
    ['G', 'Gm'],
    ['A', 'Am'],
    ['B', 'Bm'],
  ];

  const getChord = (keyText, degree) => {
    // Find the key and whether it is major/minor
    const key = keyText[0];
    const tonality = keyText.split(' ')[1].toLowerCase();

    // Find the index of the I chord
    const Iindex = degreeChords.findIndex(chordGroup => chordGroup[0].includes(key));

    // Find the index of the degree based on its number degree
    let degreeIndex = degree - 1;

    // The wanted chord's position is the I index + its degree index
    const chordIndex = (Iindex + degreeIndex) % degreeChords.length;

    // Decide whether to look at the first or second item in the degreeChords arrays, e.g. ii = minor, IV = major
    const tonalityMapping = 0;

    // Return the degree and chord on two separate lines
    console.log({
      'KeyText': keyText,
      'Degree': degree,
      'Key': key,
      'Tonality': tonality,
      'Iindex': Iindex,
      'DegreeIndex': degreeIndex,
      'ChordIndex': chordIndex,
      'TonalityMapping': tonalityMapping,
    });
    return [degree, degreeChords[chordIndex][tonalityMapping]];
  };

  // Take in a degree and chord, and return them one on top of the other to be displayed on the degree button
  const formatDegreeButton = ([degree, chord]) => {
    return (
      <>
        <b>{degree}</b>
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

      <button id='degree1' onClick={() => playChord(getChord(keyText, 'I')[1])}>
        {formatDegreeButton(getChord(keyText, 1))}
      </button>
      <button id='degree2' onClick={() => playChord(getChord(keyText, 'ii')[1])}>
        {formatDegreeButton(getChord(keyText, 2))}
      </button>
      <button id='degree3' onClick={() => playChord(getChord(keyText, 'iii')[1])}>
        {formatDegreeButton(getChord(keyText, 3))}
      </button>
      <button id='degree4' onClick={() => playChord(getChord(keyText, 'IV')[1])}>
        {formatDegreeButton(getChord(keyText, 4))}
      </button>
      <button id='degree5' onClick={() => playChord(getChord(keyText, 'V')[1])}>
        {formatDegreeButton(getChord(keyText, 5))}
      </button>
      <button id='degree6' onClick={() => playChord('Em')}>
        {formatDegreeButton(getChord(keyText, 6))}
      </button>

      {/* Requires diminished chord integration, ternary won't work. Also needs support for sharps
      <button id='degree7' onClick={() => playChord(getChord(keyText, 'vii°')[1])}>
        {formatDegreeButton(getChord(keyText, 'vii°'))}
      </button> 
      */}
    </div>
  );
}

export default DegreeSection;
