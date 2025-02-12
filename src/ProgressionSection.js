import React, { useState } from 'react';
import './App.css';
import { NewChordButton, newPlayChord, playChordSequence } from './musicHelpers.js';
import TextBoxComponent from './chordInputter';
import { useMusicalKeyContext } from './musicalKeyContext.js';
import { useChordOrderContext } from './chordOrderContext.js';

export default function ProgressionSection() {
  const { musicalKey } = useMusicalKeyContext();
  const { chordOrder, setChordOrder } = useChordOrderContext();
  const [chordInput, setChordInput] = useState('V');

  let chordButtonList = [];
  chordOrder.forEach(chordNumeral => {
    chordButtonList.push(<NewChordButton fullNumeral={chordNumeral} />);
  });

  return (
    <div>
      <div>
        <button onMouseDown={() => playChordSequence(chordOrder, musicalKey, 166, 2)}>▶</button>
        <button onMouseDown={() => setChordOrder(chordOrder.length <= 1 ? [] : chordOrder.slice(0, -1))}>Delete</button>
        <button onMouseDown={() => setChordOrder([])}>Clear</button>
      </div>
      {chordButtonList}
      <TextBoxComponent text={chordInput} setText={setChordInput} />
      <h1>Current Chord: {chordInput}</h1> {/* Shows the updated text */}
    </div>
  );
}
