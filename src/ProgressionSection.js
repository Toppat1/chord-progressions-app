import React, { useState } from 'react';
import './App.css';
import { ChordButton } from './musicHelpers.js';
import { useChordContext } from './chordOrderContext';
import TextBoxComponent from './chordInputter';

function ProgressionSection() {
  // Access chordOrder and setChordOrder from ChordContext
  const { chordOrder, setChordOrder } = useChordContext();

  let chordButtons = [];

  for (let i = 0; i < chordOrder.length; i++) {
    chordButtons.push(ChordButton(chordOrder[i]));
  }

  return (
    <div>
      <button>{chordOrder}</button>
      <TextBoxComponent />
      <div>{chordButtons}</div>
    </div>
  );
}

export default ProgressionSection;
