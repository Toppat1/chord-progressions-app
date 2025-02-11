import { getChordV3 } from './musicHelpers.js';
import { newPlayChord } from './musicHelpers.js';
import { useMusicalKeyContext } from './musicalKeyContext.js';
import { useChordOrderContext } from './chordOrderContext.js';

export default function TextBoxComponent({ text, setText }) {
  // Access musicalKey and setMusicalKey from MusicalKeyContext
  const { musicalKey } = useMusicalKeyContext();
  const { chordOrder, setChordOrder } = useChordOrderContext();

  // Function that runs whenever a key is pressed while in the text box
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const newChord = text === '' ? 'I' : text;

      // Play the chord sound
      newPlayChord(getChordV3(musicalKey, newChord));

      // Update chordOrder properly by creating a new array
      setChordOrder([...chordOrder, newChord]);

      // Clear the input field
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
        onKeyDown={handleKeyDown} // Detect Enter key
      ></input>
    </div>
  );
}
