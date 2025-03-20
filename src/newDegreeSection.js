import './App.css';
import { useMusicalKeyContext } from './musicalKeyContext.js';
import { newGetChord, ChordButton, NewChordButton } from './musicHelpers.js';

export function NewDegreeSection() {
    // Access musicalKey and setMusicalKey from MusicalKeyContext
    const { musicalKey, setMusicalKey } = useMusicalKeyContext();

    return(<NewChordButton fullNumeral={'V'} />)
}