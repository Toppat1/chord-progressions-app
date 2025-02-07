import { getChordV3 } from './musicHelpers.js';
import { newPlayChord } from './musicHelpers.js';
import { useMusicalKeyContext } from './musicalKeyContext.js';

export default function TextBoxComponent({ text, setText }) {
  // Access musicalKey and setMusicalKey from MusicalKeyContext
  const { musicalKey, setMusicalKey } = useMusicalKeyContext();

  // Function to show what text was in the box when clicked
  function showText() {
    alert(`You typed ${text}`);
  }

  // Function that runs whenever a key is pressed while in the text box
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      alert(`Man pressed Enter still. Anyway you entered ${text}. Chord in scale is ${getChordV3(musicalKey, text)}`);
      newPlayChord(getChordV3(musicalKey, text));
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
