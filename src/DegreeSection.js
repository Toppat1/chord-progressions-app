import React, { useState } from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords, getChord, newGetChord, newPlayChord, chordButton } from './musicHelpers.js';

function DegreeSection() {
  // Set a variable initially to 'G major', but can be changed using the setKeyText function
  const [keyText, setKeyText] = useState('G major');

  // KEY SETTING

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(keyText);

  // Handle input change
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  // Handle key press
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setKeyText(inputValue);
      setIsEditing(false);
    }
  };

  // Handle button click
  const handleButtonClick = () => {
    setIsEditing(true);
  };

  // Return a row of buttons with a common chord alteration
  const chordRow = (alteration = '') => {
    // Can refactor
    let chordRowButtons = [];
    const indentRow = alteration.includes('/') ? true : false;

    if (indentRow === true) {
      chordRowButtons.push(<button className='invisible-half-degree-chord-button'></button>);

      for (let i = 1; i < 7; i++) {
        const chordInfo = newGetChord(keyText, i + 1, alteration); // Contains [chordNumeral, chordName]
        chordRowButtons.push(chordButton(chordInfo));
      }
    } else if (alteration === '#ø7') {
      chordRowButtons.push(<button className='invisible-half-degree-chord-button'></button>);

      for (let i = 0; i < 6; i++) {
        const chordInfo = newGetChord(keyText, i + 1, alteration); // Contains [chordNumeral, chordName]
        chordRowButtons.push(chordButton(chordInfo));
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const chordInfo = newGetChord(keyText, i + 1, alteration); // Contains [chordNumeral, chordName]
        chordRowButtons.push(chordButton(chordInfo));
      }
    }

    return <div>{chordRowButtons}</div>;
  };

  // Make each div block an array with a function to append
  return (
    <div className='degree-section'>
      <div className='key-button-container'>
        {isEditing ? (
          <input type='text' value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} onBlur={() => setIsEditing(false)} autoFocus />
        ) : (
          <button id='key-button' onClick={handleButtonClick}>
            {keyText}
          </button>
        )}
      </div>

      {chordRow('2inv')}
      {chordRow('1inv')}
      {chordRow()}

      {chordRow('V/')}
      {chordRow('#ø7')}
      {chordRow('vii°7/')}

      {chordRow('7')}
      {chordRow('sus2')}
      {chordRow('sus4')}
    </div>
  );
}

export default DegreeSection;
