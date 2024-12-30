import React from 'react';
import './App.css';
import ButtonGrid from './ButtonGrid.js';
import { playNote, playChord, playSequence, notes, chords } from './musicHelpers.js';

function App() {
  return (
    <div>
      {/* Header Section */}
      <div className='header'>
        <h1>Chord Progressions</h1>
        <ButtonGrid />
      </div>

      {/* Content Section */}
      <div className='content'>
        <p>This is a description</p>
        <h2>Is this larger than h1?</h2>
        <h3>The larger the hX number, the smaller it gets, like headings in Google Docs.</h3>
        <button
          onClick={() => {
            playSequence(['D4', 'F#4', 'A4', 'D5']);
          }}
        >
          Skibidi button
        </button>
        <button
          onClick={() => {
            playChord('C#m');
          }}
        >C#m</button>

        {/* Generate buttons for each note */}
        <div className='note-buttons'>
          {notes.map(note => (
            <button onClick={() => playNote(note)}> {note} </button>
          ))}
        </div>

        {/* Generate buttons for each category's chords */}
        <div className='chord-buttons'>
          {Object.keys(chords).map(category => (
            <div key={category}>
              <h3>{category}</h3>
              <div className='chord-category-buttons'>
                {Object.keys(chords[category]).map(chord => (
                  <button key={chord} onClick={() => playChord(chords[category][chord])}>
                    {' '}
                    {chord}{' '}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Unordered list */}
        <ul>
          <li>First item in list</li>
          <li>Second item in list</li>
          <li>よろしくね！</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
