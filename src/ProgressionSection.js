import React, { useState } from 'react';
import './App.css';
import { NewChordButton } from './musicHelpers.js';
import TextBoxComponent from './chordInputter';

export default function ProgressionSection() {
  const [chordInput, setChordInput] = useState('V');
  return (
    <div>
      <NewChordButton fullNumeral='Vsus4' />
      <TextBoxComponent text={chordInput} setText={setChordInput} />
      <h1>Current Chord: {chordInput}</h1> {/* Shows the updated text */}
    </div>
  );
}
