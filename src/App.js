import React from 'react';
import * as Tone from 'tone';
import './App.css';

function App() {
  // Creating a synth instance
  const synth = new Tone.PolySynth().toDestination();

  // Play a note when called
  const playNote = pitch => {
    console.log(`Playing note: ${pitch}`)
    synth.triggerAttackRelease(pitch, '16n');
  };

  // Play a chord
  function playChord(notes) {
    console.log(`Playing chord: ${notes}`);
    synth.triggerAttackRelease(notes, '16n');
  }

  // Array of notes
  const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

  // Array of chords
  const chords = {
    'C': ['C4', 'E4', 'G4'],
    'D': ['D4', 'F#4', 'A4'],
    'E': ['E4', 'G#4', 'B4']
  };

  return (
    <div>
      {/* Header Section */}
      <div className='header'>
        <h1>Chord Progressions</h1>
      </div>

      {/* Content Section */}
      <div className='content'>
        <p>This is a description</p>
        <h2>Is this larger than h1?</h2>
        <h3>The larger the hX number, the smaller it gets, like headings in Google Docs.</h3>
        <button onClick={() => alert('You clicked the button lmao')}>Skibidi button</button>

        {/* Generate buttons for each note */}
        {notes.map(note => (
          <button onClick={() => playNote(note)}> {note} </button>
        ))}

        <button onClick={() => playChord(chords['C'])}>C Major</button>

        {/* Generate buttons for each chord */}
        {Object.keys(chords).map(chord => (
          <button onClick={() => playChord(chords[chord])}> {chord} </button>
        ))}

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
