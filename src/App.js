import React from 'react';
import './App.css';
import ButtonGrid from './ButtonGrid.js';
import { playNote, playChord, playSequence, notes, chords, newPlayChord, newGetChord } from './musicHelpers.js';
import DegreeSection from './DegreeSection.js';

function App() {
  return (
    <div>
      {/* Title Header */}
      <div className='title-header'>
        <h1>Chord Progressions</h1>
      </div>

      {/* Piano Header */}
      <div className='piano-header'>
        <h2>Piano</h2>
      </div>

      {/* Piano Section */}
      <div class='piano-container'>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <button onClick={() => newPlayChord('C')}>C</button>
        <button onClick={() => newPlayChord('D#dim7')}>D#dim7</button>
        <button onClick={() => newPlayChord('C#m7b5')}>C#m7b5</button>
        <button>{newGetChord('G major', 7)}</button>
        <button onClick={() => newPlayChord(newGetChord('G major', 5, 'sus4')[1])}>{newGetChord('G major', 5, 'sus4')}</button>
        <button>{newGetChord('G major', 2, 'V/')}</button>
      </div>

      {/* Degree Header */}
      <div className='degree-header'>
        <h2>Degree</h2>
      </div>

      {/* Degree Section */}
      <div className='degree-chord-container'>
        <DegreeSection />
      </div>

      {/* Chord Header */}
      <div className='chord-header'>
        <h2>Chords</h2>
      </div>

      {/* Chord Grid Section */}
      <div>
        <ButtonGrid />
      </div>

      {/* Main Header */}
      <div className='main-header'>
        <h2>Main</h2>
      </div>

      {/* Yellow Section */}
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
        >
          C#m
        </button>

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
