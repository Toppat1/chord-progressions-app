import React from 'react';
import * as Tone from 'tone';
import './App.css';

function App() {
  // Creating a synth instance
  const synth = new Tone.PolySynth().toDestination();

  // Play a note when called
  const playNote = pitch => {
    console.log(`Playing note: ${pitch}`);
    synth.triggerAttackRelease(pitch, '16n');
  };

  // Play a chord
  function playChord(notes) {
    console.log(`Playing chord: ${notes}`);
    synth.triggerAttackRelease(notes, '16n');
  }

  // Array of notes
  const notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'];

  // Array of chords
  const chords = {
    'Major chords': {
      'C': ['C4', 'E4', 'G4'],
      'D': ['D4', 'F#4', 'A4'],
      'E': ['E4', 'G#4', 'B4'],
      'F': ['F4', 'A4', 'C5'],
      'G': ['G4', 'B4', 'D5'],
      'A': ['A4', 'C#5', 'E5'],
      'B': ['B4', 'D#5', 'F#5'],
    },
    'Minor chords': {
      'Cm': ['C4', 'D#4', 'G4'],
      'Dm': ['D4', 'F4', 'A4'],
      'Em': ['E4', 'G4', 'B4'],
      'Fm': ['F4', 'G#4', 'C5'],
      'Gm': ['G4', 'A#4', 'D5'],
      'Am': ['A4', 'C5', 'E5'],
      'Bm': ['B4', 'D5', 'F#5'],
    },
    'Diminished chords': {
      'Cdim': ['C4', 'D#4', 'F#4'],
      'Ddim': ['D4', 'F4', 'G#4'],
      'Edim': ['E4', 'G4', 'A#4'],
    },
    'Augmented chords': {
      'Caug': ['C4', 'E4', 'G#4'],
      'Daug': ['D4', 'F#4', 'A#4'],
      'Eaug': ['E4', 'G#4', 'C5'],
    },
    'Half-diminished chords': {
      'Cm7b5': ['C4', 'D#4', 'F#4', 'A#4'],
      'C#m7b5': ['C#4', 'E4', 'G4', 'B4'],
      'Dm7b5': ['D4', 'F4', 'G#4', 'C5'],
      'D#m7b5': ['D#4', 'F#4', 'A4', 'C#5'],
      'Em7b5': ['E4', 'G4', 'A#4', 'D5'],
      'Fm7b5': ['F4', 'G#4', 'B4', 'D#5'],
      'F#m7b5': ['F#4', 'A4', 'C5', 'E5'],
      'Gm7b5': ['G4', 'A#4', 'C#5', 'F5'],
      'G#m7b5': ['G#4', 'B4', 'D5', 'F#5'],
      'Am7b5': ['A4', 'C5', 'D#5', 'G5'],
      'A#m7b5': ['A#4', 'C#5', 'E5', 'G#5'],
      'Bm7b5': ['B4', 'D5', 'F5', 'A5'],
    },
    'Diminished 7th chords': {
      'Cdim7': ['C4', 'D#4', 'F#4', 'A4'],
      'C#dim7': ['C#4', 'E4', 'G4', 'A#4'],
      'Ddim7': ['D4', 'F4', 'G#4', 'B4'],
      'D#dim7': ['D#4', 'F#4', 'A4', 'C5'],
    },
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
          <li>First item in LIST</li>
          <li>Second item in list</li>
          <li>よろしくね！</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
