import { getChordV3 } from './musicHelpers.js';
import { newPlayChord } from './musicHelpers.js';
import { useMusicalKeyContext } from './musicalKeyContext.js';
import { useChordOrderContext } from './chordOrderContext.js';

export default function TextBoxComponent({ text, setText }) {
  // Access contexts
  const { musicalKey } = useMusicalKeyContext();
  const { chordOrder, setChordOrder } = useChordOrderContext();

  const numbers = ['1', '2', '3', '4', '5', '6'];
  const chordMap = ['I', 'ii', 'iii', 'IV', 'V', 'vi'];

  function handleKeyDown(e) {
    if (e.key === 'Enter' || numbers.includes(e.key)) {
      let newChord = text; // Default to whatever is in the text input

    if (numbers.includes(e.key)) {
      newChord = chordMap[numbers.indexOf(e.key)]; // Get chord directly from `e.key`
    } else if (e.key === 'Enter' && text !== '') {
      newChord = text; // If Enter is pressed, use the input text as the chord
    } else {
      return; // If it's not a valid key, exit early
    }

    console.log(`${newChord}, ${getChordV3(musicalKey, newChord)}`)

      // Play the chord sound
      newPlayChord(getChordV3(musicalKey, newChord));

      // Update chordOrder properly by creating a new array
      setChordOrder([...chordOrder, newChord]);

      // Clear the input field
      setTimeout(() => setText(''), 0);
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
