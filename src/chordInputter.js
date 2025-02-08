import { getChordV3 } from './musicHelpers.js';
import { newPlayChord } from './musicHelpers.js';
import { useMusicalKeyContext } from './musicalKeyContext.js';
import { useChordContext } from './chordOrderContext';
import { ChordButton } from './musicHelpers.js';

export default function TextBoxComponent({ text, setText }) {
  // Access musicalKey and setMusicalKey from MusicalKeyContext
  const { musicalKey, setMusicalKey } = useMusicalKeyContext();

  // Access chordOrder and setChordOrder from ChordContext
  const { chordOrder, setChordOrder } = useChordContext();

  // Function that runs whenever a key is pressed while in the text box
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      //alert(`Man pressed Enter still. Anyway you entered ${text}. Chord in scale is ${getChordV3(musicalKey, text)}`);
      newPlayChord(getChordV3(musicalKey, text === '' ? 'I' : text));
      //chordOrder.push(ChordButton(text, getChordV3(musicalKey, text)));
      setText('');
    }
  }

  // Return the text box component
  return (
    <div>
      <input
        type='text'
        value={text}
        onChange={e => setText(e.target.value)} // Listen for typing (the onChange event).
        // onClick={showText}
        onKeyDown={handleKeyDown} // Detect Enter key
      ></input>
    </div>
  );
}
