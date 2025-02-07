import { useMusicalKeyContext } from './musicalKeyContext';
import React, { useState } from 'react';
import { playNote } from './musicHelpers';

const keys = ['C Major', 'C# Major', 'D Major', 'D# Major', 'E Major', 'F Major', 'F# Major', 'G Major', 'G# Major', 'A Major', 'A# Major', 'B Major'];

const MusicalKeySection = () => {
    const { musicalKey, setMusicalKey } = useMusicalKeyContext();
    const [selectedKey, setSelectedKey] = useState(musicalKey);

    const handleKeyClick = (key) => {
        setSelectedKey(key);
        setMusicalKey(key);
        playNote(key.split(' ')[0]+'4')

    };

    return (
        <div>
            {keys.map((key) => (
                <button
                    key={key}
                    onClick={() => handleKeyClick(key)}
                    style={{
                        backgroundColor: selectedKey === key ? 'lightblue' : 'white',
                    }}
                >
                    {key}
                </button>
            ))}
        </div>
    );
};

export default MusicalKeySection;