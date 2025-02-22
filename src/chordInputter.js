import { getChordV3 } from './musicHelpers.js';
import { newPlayChord } from './musicHelpers.js';
import { useMusicalKeyContext } from './musicalKeyContext.js';
import { useChordOrderContext } from './chordOrderContext.js';

export default function TextBoxComponent({ text, setText }) {
  // Access contexts
  const { musicalKey } = useMusicalKeyContext();
  const { chordOrder, setChordOrder } = useChordOrderContext();

  const numbers = ['1', '2', '3', '4', '5', '6', '7'];
  const chordMap = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'viidim'];

  function handleKeyDown(e) {
    let newChord;
    
    // Case 1: If text is empty and a number key (1-7) is pressed
    if (text === '' && numbers.includes(e.key)) {
      newChord = chordMap[numbers.indexOf(e.key)];
    }
    // Case 2: If Enter is pressed and there is text in the input
    else if (e.key === 'Enter' && text !== '') {
      // If the first character is a digit 1-7, convert it
      if (numbers.includes(text[0])) {
        newChord = chordMap[numbers.indexOf(text[0])];
      } else {
        // Otherwise, use the text as-is (e.g., "V7" stays "V7")
        newChord = text;
      }
    } else {
      return; // No valid key press detected; do nothing
    }

    console.log(`${newChord}, ${getChordV3(musicalKey, newChord)}`);
    newPlayChord(getChordV3(musicalKey, newChord));
    setChordOrder([...chordOrder, newChord]);

    // Clear the input field immediately after processing
    setTimeout(() => setText(''), 0);
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
