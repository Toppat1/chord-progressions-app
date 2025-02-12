import React, { useState } from 'react';
import './App.css';
import { NewChordButton, newPlayChord, playChordSequence } from './musicHelpers.js';
import TextBoxComponent from './chordInputter';
import { useMusicalKeyContext } from './musicalKeyContext.js';
import { useChordOrderContext } from './chordOrderContext.js';
import * as Tone from 'tone';

export default function ProgressionSection() {
  const { musicalKey } = useMusicalKeyContext();
  const { chordOrder } = useChordOrderContext();
  const [chordInput, setChordInput] = useState('V');

  let chordButtonList = [];
  chordOrder.forEach(chordNumeral => {
    chordButtonList.push(<NewChordButton fullNumeral={chordNumeral} />);
  });

  return (
    <div>
      <button onClick={() => playChordSequence(chordOrder, musicalKey)}>Play</button>
      <button onClick={() => newPlayChord('Am',Tone.now()+1)}>TEST</button>
      {chordButtonList}
      <TextBoxComponent text={chordInput} setText={setChordInput} />
      <h1>Current Chord: {chordInput}</h1> {/* Shows the updated text */}
    </div>
  );
}
