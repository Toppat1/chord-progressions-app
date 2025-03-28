import React, { useState } from 'react';
import './App.css';
import ButtonGrid from './ButtonGrid.js';
import { playNote, playChord, playSequence, notes, chords } from './musicHelpers.js';
import DegreeSection from './DegreeSection.js';
import ProgressionSection from './ProgressionSection.js';
import { ChordOrderProvider } from './chordOrderContext.js';
import * as Tone from 'tone';
import { MusicalKeyProvider } from './musicalKeyContext.js';
import MusicalKeySection from './musicalKeySection.js';
import { NewDegreeSection } from './newDegreeSection.js';

function App() {
  // State variable for starting Tone.js
  const [isToneStarted, setIsToneStarted] = useState(false);

  // Function to start the Tone.js context
  const startTone = async () => {
    await Tone.start();
    setIsToneStarted(true);
  };

  return (
    <ChordOrderProvider>
      <MusicalKeyProvider>
        <div className='App'>
          {!isToneStarted ? (
            <button onClick={startTone}>Start Audio</button>
          ) : (
            <>
              {/* Title Header */}
              <div className='title-header'>
                <h1>Chord Progressions</h1>
              </div>

              {/* Key Header */}
              <div className='key-header'>
                <h2>Key</h2>
              </div>

              {/* Key Section */}
              <div>
                <MusicalKeySection />
              </div>

              {/* Progression Header */}
              <div className='progression-header'>
                <h2>Progression</h2>
              </div>

              {/* Progression Section */}
              <div>
                <ProgressionSection />
              </div>

              {/*
                Piano Header
                <div className='piano-header'>
                  <h2>Piano</h2>
                </div>

                Piano Section
                <div className='piano-container'>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                </div>
              */}

              {/* New Degree Header */}
              <div className='degree-header'>
                <h2>New Degree Section</h2>
              </div>

              {/* New Degree Section */}
              <div className='degree-chord-container'>
                <NewDegreeSection />
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
            </>
          )}
        </div>
      </MusicalKeyProvider>
    </ChordOrderProvider>
  );
}

export default App;
