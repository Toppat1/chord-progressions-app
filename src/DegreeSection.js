import React, { useState } from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords, getChord, newGetChord, newPlayChord } from './musicHelpers.js';

function DegreeSection() {
  // Take in a degree and chord, and return them one on top of the other to be displayed on the degree button
  const formatDegreeButton = ([degreeDigit, chord]) => {
    return (
      <>
        <div className='roman-numeral'>{degreeDigit}</div>
        <div className='chord-name'>{chord}</div>
      </>
    );
  };

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

  // [1,2,2,2,0,0,2,1]
  const chordRow = (alteration, invisPattern) => {
    let chordRowButtons = [];

    for (let i = 0; i < (invisPattern ? invisPattern.length : 7); i++) {
      const chordInfo = getChord(keyText, i + 1, alteration); // Contains [chordRoman, chordName]
      const chordName = chordInfo[1];

      let itemToPush;

      if (!invisPattern || invisPattern[i] === undefined) {
        itemToPush = (
          <button className='degree-chord-button' onClick={() => playChord(chordName)}>
            {formatDegreeButton(chordInfo)}
          </button>
        );
      } else {
        switch (invisPattern[i]) {
          case 0:
            itemToPush = (
              <button className='degree-chord-button' onClick={() => playChord(chordName)}>
                {formatDegreeButton(chordInfo)}
              </button>
            );
            break;

          case 1:
            itemToPush = <button id='invisible-half' className='invisible-half-degree-chord-button'></button>;
            break;

          case 2:
            itemToPush = <button id='invisible-full' className='invisible-full-degree-chord-button'></button>;
            break;
        }
      }
      chordRowButtons.push(itemToPush);
    }
    return <div>{chordRowButtons}</div>;
  };

  const newChordRow = (alteration = '', invisPattern) => {
    let chordRowButtons = [];
    const indentRow = alteration.includes('/') ? true : false;

    if (indentRow === true) {
      chordRowButtons.push(<button className='invisible-half-degree-chord-button'></button>);

      for (let i = 1; i < 7; i++) {
        const chordInfo = newGetChord(keyText, i + 1, alteration); // Contains [chordNumeral, chordName]
        const chordName = chordInfo[1];
        chordRowButtons.push(
          <button className='degree-chord-button' onClick={() => newPlayChord(chordName)}>
            {formatDegreeButton(chordInfo)}
          </button>
        );
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const chordInfo = newGetChord(keyText, i + 1, alteration); // Contains [chordNumeral, chordName]
        const chordName = chordInfo[1];

        chordRowButtons.push(
          <button className='degree-chord-button' onClick={() => newPlayChord(chordName)}>
            {formatDegreeButton(chordInfo)}
          </button>
        );
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
      {newChordRow()}
      
      {newChordRow('V/')}
      {newChordRow('vii°7/')}

      <div>
        <button id='invisible-half' className='invisible-half-degree-chord-button'></button>
        <button id='invisible-full' className='invisible-full-degree-chord-button'></button>
        <button id='invisible-full' className='invisible-full-degree-chord-button'></button>
        <button id='invisible-full' className='invisible-full-degree-chord-button'></button>
        <button id='degree#m4ø7' className='degree-chord-button' onClick={() => playChord(getChord(keyText, 4, '#mø7')[1])}>
          {formatDegreeButton(getChord(keyText, 4, '#mø7'))}
        </button>
        <button id='degree7°7/3' className='degree-chord-button' onClick={() => playChord(getChord(keyText, 6, '7°7/')[1])}>
          {formatDegreeButton(getChord(keyText, 6, '7°7/'))}
        </button>
        <button id='invisible-full' className='invisible-full-degree-chord-button'></button>
        <button id='invisible-half' className='invisible-half-degree-chord-button'></button>
      </div>
      {newChordRow('7')}
      {newChordRow('sus2')}
      {newChordRow('sus4')}
    </div>
  );
}

export default DegreeSection;
