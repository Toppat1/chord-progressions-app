import React from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords } from './musicHelpers.js';

function ButtonGrid() {
  const rows = 10;
  const cols = 14;
  const chordButtons = [
    [null, 'C#m', 'D#m', '', 'F#m', 'G#m', 'A#m'],
    [null, 'C#', 'D#', '', 'F#', 'G#', 'A#'],
    ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    ['Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm'],
    [null, 'C#m7b5', 'D#m7b5', '', 'F#m7b5', 'G#m7b5', ''],
    ['C/E', 'D/F#', 'E/G#', 'F/A', 'G/B', 'A/C#', 'Bm/D'],
    ['', 'Daug', 'D#aug', '', 'G/F', '', ''],
    ['C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7'],
    ['Cm7', 'Dm7', 'Em7', 'Fm7', 'Gm7', 'Am7', 'Bm7'],
    ['Cmaj7', 'Dsus4', 'Esus4', 'Fsus4', 'Gsus4', 'Asus4', 'Bsus4'],
  ];

  const gridItems = [];

  for (let row = 0; row < rows; row++) {
    let rowItems = [];

    for (let col = 0; col < cols; col++) {

      if (chordButtons[row] && chordButtons[row][col] === null) {
        // Indent spaces
        rowItems.push(<button key={`${row}-${col}`} className='indent-button'></button>);

      } else if (chordButtons[row] && chordButtons[row][col] === '') {
        // Empty button spaces
        rowItems.push(<button key={`${row}-${col}`} className='invisible-button'></button>);

      } else if (chordButtons[row] && chordButtons[row][col]) {
        // Chord buttons
        rowItems.push(
          <button key={`${row}-${col}`} className='grid-button' onClick={() => playChord(chordButtons[row][col])}>
            {chordButtons[row][col]}
          </button>
        );
      }
    }

    // Add completed row
    gridItems.push(
      <div key={row} className='button-grid-row'>
        {rowItems}
      </div>
    );
  }

  return <div className='button-grid-container'>{gridItems}</div>;
}

export default ButtonGrid;
