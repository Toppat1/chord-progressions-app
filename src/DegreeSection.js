import React, { useState } from 'react';
import './App.css';
import { playNote, playChord, playSequence, notes, chords } from './musicHelpers.js';

function DegreeSection() {
  const diatonicChords = {
    'major': [
      ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
      [2, 2, 1, 2, 2, 2, 1],
    ],
    'minor': [
      ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
      [2, 1, 2, 2, 1, 2, 2],
    ],
  };

  // Maybe use chords object in future?
  const degreeChords = [
    ['C', 'Cm', 'Cdim', 'Cdim7', 'Cm7b5', 'Csus2', 'Csus4', 'Caug', 'C/E', 'C/G', 'C7', 'Cm7', 'Cmaj7'],
    ['C#', 'C#m', 'C#dim', 'C#dim7', 'C#m7b5', 'C#sus2', 'C#sus4', 'C#aug', 'C#/F', 'C#/G#', 'C#7', 'C#m7', 'C#maj7'],
    ['D', 'Dm', 'Ddim', 'Ddim7', 'Dm7b5', 'Dsus2', 'Dsus4', 'Daug', 'D/F#', 'D/A', 'D7', 'Dm7', 'Dmaj7'],
    ['D#', 'D#m', 'D#dim', 'D#dim7', 'D#m7b5', 'D#sus2', 'D#sus4', 'D#aug', 'D#/G', 'D#/A#', 'D#7', 'D#m7', 'D#maj7'],
    ['E', 'Em', 'Edim', 'Edim7', 'Em7b5', 'Esus2', 'Esus4', 'Eaug', 'E/G#', 'E/B', 'E7', 'Em7', 'Emaj7'],
    ['F', 'Fm', 'Fdim', 'Fdim7', 'Fm7b5', 'Fsus2', 'Fsus4', 'Faug', 'F/A', 'F/C', 'F7', 'Fm7', 'Fmaj7'],
    ['F#', 'F#m', 'F#dim', 'F#dim7', 'F#m7b5', 'F#sus2', 'F#sus4', 'F#aug', 'F#/A#', 'F#/C#', 'F#7', 'F#m7', 'F#maj7'],
    ['G', 'Gm', 'Gdim', 'Gdim7', 'Gm7b5', 'Gsus2', 'Gsus4', 'Gaug', 'G/B', 'G/D', 'G7', 'Gm7', 'Gmaj7'],
    ['G#', 'G#m', 'G#dim', 'G#dim7', 'G#m7b5', 'G#sus2', 'G#sus4', 'G#aug', 'G#/C', 'G#/D#', 'G#7', 'G#m7', 'G#maj7'],
    ['A', 'Am', 'Adim', 'Adim7', 'Am7b5', 'Asus2', 'Asus4', 'Aaug', 'A/C#', 'A/E', 'A7', 'Am7', 'Amaj7'],
    ['A#', 'A#m', 'A#dim', 'A#dim7', 'A#m7b5', 'A#sus2', 'A#sus4', 'A#aug', 'A#/D', 'A#/F', 'A#7', 'A#m7', 'A#maj7'],
    ['B', 'Bm', 'Bdim', 'Bdim7', 'Bm7b5', 'Bsus2', 'Bsus4', 'Baug', 'B/D#', 'B/F#', 'B7', 'Bm7', 'Bmaj7'],
  ];

  // From the key text and chord degree, return the chord and its degree
  const getChord = (keyText, degreeDigit, alteration = '') => {
    // Find the key and whether it is major/minor
    const key = keyText.split(' ')[0];
    const tonality = keyText.split(' ')[1].toLowerCase();

    // Find the index of the I chord
    const Iindex = degreeChords.findIndex(chordGroup => chordGroup[0].includes(key));

    // Find the index of the degree based on its number degree
    const degreeIndex = degreeDigit - 1;
    let degreeNumber = diatonicChords[tonality][0][degreeIndex];

    // The wanted chord's position is the I index + its degree index

    let degreeChordJumps = 0;
    for (let i = 0; i < degreeIndex; i++) {
      degreeChordJumps += diatonicChords[tonality][1][i];
    }

    // If a sharp is present, raise the tone
    degreeChordJumps += alteration.includes('#') ? 1 : 0;
    degreeChordJumps += alteration.includes('7°7/') ? -1 : 0;

    const chordIndex = (Iindex + degreeChordJumps) % degreeChords.length;

    // Decide which type of chord to return, e.g. ii = minor, IV = major
    let chordType;

    // prettier-ignore
    switch (alteration) {
      // INCORRECT FOR MINOR CHORDS
      case '1inv':
        chordType = 8;
        degreeNumber = <span>{degreeNumber}<sup>6</sup></span>;
        break;

      case '2inv':
        chordType = 9;
        degreeNumber = <span>{degreeNumber}<sup>6</sup><sub>4</sub></span>;
        break;

      case '7°7/':
        chordType = 3;
        degreeNumber = <span>vii°<sup>7</sup>/{degreeNumber}</span>;
        break;

      case '#mø7':
        chordType = 4;
        degreeNumber = <span>#{degreeNumber.toLowerCase()}<sup>ø7</sup></span>;
        break;

      // case '7':
      //   switch (tonality){
      //     case 'major':
      //        if (degreeNumber.includes('°')) {
      //         chordType = 4;
      //         degreeNumber = <span>{degreeNumber}<sup>7</sup></span>;
      //       }
      //       else if (['I','IV'].includes(degreeNumber)){
      //         chordType = 12;
      //         degreeNumber = <span>{degreeNumber}M<sup>7</sup></span>;
      //       } else if (degreeNumber === degreeNumber.toLowerCase()) {
      //         chordType = 11;
      //         degreeNumber = <span>{degreeNumber}<sup>7</sup></span>;
      //       }}

        
      default:
        if (degreeNumber.includes('°')) {
          chordType = 2;
        } else if (degreeNumber === degreeNumber.toUpperCase()) {
          chordType = 0;
        } else if (degreeNumber === degreeNumber.toLowerCase()) {
          chordType = 1;
        }
        break;
    }

    // Return the degree and chord on two separate lines
    console.log({
      'KeyText': keyText,
      'DegreeDigit': degreeDigit,
      'DegreeNumber': degreeNumber,
      'Key': key,
      'Tonality': tonality,
      'Iindex': Iindex,
      'DegreeIndex': degreeIndex,
      'ChordIndex': chordIndex,
      'chordType': chordType,
      'Chord returned': degreeChords[chordIndex][chordType],
    });
    return [degreeNumber, degreeChords[chordIndex][chordType]];
  };

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
      <div>
        <button id='degree1-7' className='degree-chord-button' onClick={() => playChord(getChord(keyText, 1, '7')[1])}>
          {formatDegreeButton(getChord(keyText, 1, '7'))}
        </button>
        <button id='degree2-7' className='degree-chord-button' onClick={() => playChord(getChord(keyText, 2, '7')[1])}>
          {formatDegreeButton(getChord(keyText, 2, '7'))}
        </button>
        <button id='degree3-7' className='degree-chord-button' onClick={() => playChord(getChord(keyText, 3, '7')[1])}>
          {formatDegreeButton(getChord(keyText, 3, '7'))}
        </button>
        <button id='degree4-7' className='degree-chord-button' onClick={() => playChord(getChord(keyText, 4, '7')[1])}>
          {formatDegreeButton(getChord(keyText, 4, '7'))}
        </button>
        <button id='degree5-7' className='degree-chord-button' onClick={() => playChord(getChord(keyText, 5, '7')[1])}>
          {formatDegreeButton(getChord(keyText, 5, '7'))}
        </button>
        <button id='degree6-7' className='degree-chord-button' onClick={() => playChord(getChord(keyText, 6, '7')[1])}>
          {formatDegreeButton(getChord(keyText, 6, '7'))}
        </button>
        <button id='degree7-7' className='degree-chord-button' onClick={() => playChord(getChord(keyText, 7, '7')[1])}>
          {formatDegreeButton(getChord(keyText, 7, '7'))}
        </button>
      </div>
    </div>
  );
}

export default DegreeSection;
