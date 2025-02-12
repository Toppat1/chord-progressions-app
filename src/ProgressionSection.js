import React, { useState } from 'react';
import './App.css';
import { NewChordButton, newPlayChord, playChordSequence } from './musicHelpers.js';
import TextBoxComponent from './chordInputter';
import { useMusicalKeyContext } from './musicalKeyContext.js';
import { useChordOrderContext } from './chordOrderContext.js';
import * as Tone from 'tone';

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
      <button onClick={() => playChordSequence(chordOrder, musicalKey, 0.5)}>Play</button>
      <button onClick={() => setChordOrder(chordOrder.length <= 1 ? [] : chordOrder.slice(0,-1))}>Delete</button>
      <button onClick={() => setChordOrder([])}>Clear</button>
      {chordButtonList}
      <TextBoxComponent text={chordInput} setText={setChordInput} />
      <h1>Current Chord: {chordInput}</h1> {/* Shows the updated text */}
    </div>
  );
}
