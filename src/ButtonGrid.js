import React from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords } from './musicHelpers.js';

function ButtonGrid() {
  const rows = 10;
  const cols = 14;
  const rowsIndented = [0, 1, 4];
  const chordButtons = [
    [null, 'C#m', 'D#m', null, 'F#m', 'G#m', 'A#m'],
    [null, 'C#', 'D#', null, 'F#', 'G#', 'A#'],
    ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    ['Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm'],
    ['C#m7b5', 'D#m7b5', null, 'F#m7b5', 'G#m7b5'],
    ['C/E', 'D/F#', 'E/G#', 'F/A', 'G/B', 'A/C#', 'Bm/D'],
    ['DAug', 'D#Aug', 'G/F'],
    ['C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7'],
    ['Cm7', 'Dm7', 'Em7', 'Fm7', 'Gm7', 'Am7', 'Bm7'],
    ['Cmaj7', 'Dsus4', 'Gsus4', 'Asus4'],
  ];

  const gridItems = []; // Initialise an empty array to store the buttons

  /*
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {

      if ((rowsIndented.includes(row) && col == 0) || chordButtons[row][col] === null) {
        gridItems.push(<div key={`${row}-${col}`} className='empty-space'></div>); // Insert an empty div
      } else if (!(row === 2 && col >= 7)) {
        gridItems.push(
          <button key={`${row}-${col}`} className='grid-button' onClick={() => alert(`Row ${row} Column ${col}`)}>
            {row}.{col}.{chordButtons[row][col]}
          </button>
        );
      }
    }
  }
  */

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isSpecialButton = [2, 3, 1, 0].includes(row) && col < 7;
      const className = isSpecialButton ? 'grid-button span-two' : 'grid-button';

      if (rowsIndented.includes(row) && col <= 1) {
        gridItems.push(<div key={`${row}-${col}`} className='empty-indent-space'></div>);
      } else if (chordButtons[row][col] === null) {
        gridItems.push(<div key={`${row}-${col}`} className='empty-button-space'></div>);
      } else if (!(col >= 7)) {
        gridItems.push(
          <button key={`${row}-${col}`} className={className} onClick={() => alert(`Row ${row} Column ${col}`)}>
            {chordButtons[row][col]}
          </button>
        );
      }
    }
  }

  return <div className='button-grid-container'>{gridItems}</div>;
}

export default ButtonGrid;
