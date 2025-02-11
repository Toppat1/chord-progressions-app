import React, { useState } from 'react';
import './App.css';
import { NewChordButton } from './musicHelpers.js';
import TextBoxComponent from './chordInputter';
import { useMusicalKeyContext } from './musicalKeyContext.js';
import { useChordOrderContext } from './chordOrderContext.js';

export default function ProgressionSection() {
  const { chordOrder } = useChordOrderContext();
  const [chordInput, setChordInput] = useState('V');

  let chordButtonList = [];
  chordOrder.forEach(chordNumeral => {
    chordButtonList.push(<NewChordButton fullNumeral={chordNumeral} />);
  });

  return (
    <div>
      {chordButtonList}
      <TextBoxComponent text={chordInput} setText={setChordInput} />
      <h1>Current Chord: {chordInput}</h1> {/* Shows the updated text */}
    </div>
  );
}
