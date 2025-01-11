import React, { useState } from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords, getChord, newGetChord, newPlayChord, chordButton } from './musicHelpers.js';

function ProgressionSection() {
  // Set an array initially to 'G major', but can be changed using the setKeyText function
  const [chordOrder, setChordOrder] = useState([
    ['V', 'D'],
    ['I', 'G'],
  ]);
  let chordButtons = [];

  for (let i = 0; i < chordOrder.length; i++) {
    chordButtons.push(chordButton(chordOrder[i]));
  }

  return <div>{chordButtons}</div>;
}

export default ProgressionSection;
