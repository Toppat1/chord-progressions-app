import React, { useState } from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords } from './musicHelpers.js';

function DegreeSection() {
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
    const Iindex = degreeChords.findIndex(chordGroup => chordGroup[0] === key);

    // Find the index of the degree based on key tonality
    let degreeIndex;
    if (tonality === 'major') {
      degreeIndex = major.indexOf(degree);
    } else {
      degreeIndex = minor.indexOf(degree);
    }

    // The wanted chord's position is the I index + its degree index
    const chordIndex = (Iindex + degreeIndex) % degreeChords.length;

    // Decide whether to look at the first or second item in the degreeChords arrays, e.g. ii = minor, IV = major
    const tonalityMapping = degree === degree.toUpperCase() ? 0 : 1;

    // Return the degree and chord on two separate lines
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

  const [keyText, setKeyText] = useState('G major');

  return (
    <div className='degree-container'>
      <button id='key-button'>{keyText}</button>

      <button id='degree1' onClick={() => playChord(getChord(keyText, 'I')[1])}>
        {formatDegreeButton(getChord(keyText, 'I'))}
      </button>
      <button id='degree2' onClick={() => playChord(getChord(keyText, 'ii')[1])}>
        {formatDegreeButton(getChord(keyText, 'ii'))}
      </button>
      <button id='degree3' onClick={() => playChord(getChord(keyText, 'iii')[1])}>
        {formatDegreeButton(getChord(keyText, 'iii'))}
      </button>
      <button id='degree4' onClick={() => playChord(getChord(keyText, 'IV')[1])}>
        {formatDegreeButton(getChord(keyText, 'IV'))}
      </button>
      <button id='degree5' onClick={() => playChord(getChord(keyText, 'V')[1])}>
        {formatDegreeButton(getChord(keyText, 'V'))}
      </button>
      <button id='degree6' onClick={() => playChord(getChord(keyText, 'vi')[1])}>
        {formatDegreeButton(getChord(keyText, 'vi'))}
      </button>
    </div>
  );
}

export default DegreeSection;
