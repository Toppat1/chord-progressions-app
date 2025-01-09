import React, { useState } from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords, getChord, newGetChord, newPlayChord } from './musicHelpers.js';

function ProgressionSection() {
  // Set an array initially to 'G major', but can be changed using the setKeyText function
  const [chordOrder, setChordOrder] = useState([]);

  return <div>h</div>;
}

export default ProgressionSection;
