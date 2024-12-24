import React from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords } from './musicHelpers.js';

function ButtonGrid() {
  const rows = 4;
  const cols = 4;

  const gridItems = [];

  for (let i = 0; i < rows; i++) {
    const rowButtons = [];
    for (let j = 0; j < cols; j++) {
      rowButtons.push(
        <button key={`%{i}-{j}`} className='grid-button' onClick={() => alert(`Button at row ${i} and column ${j} was clicked!`)}>
          {i}.{j}
        </button>
      );
    }

    gridItems.push(
      <div key={i} className='grid-row'>
        {rowButtons}
      </div>
    );
  }

  return <div className='button-grid-container'>{gridItems}</div>;
}

export default ButtonGrid;
