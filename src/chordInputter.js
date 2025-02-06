import { useState } from 'react';

export default function TextBoxComponent() {
  const [text, setText] = useState('');

  // function to show what text was in the box when clicked
  function showText() {
    alert(`You typed ${text}`);
  }

  // Function that runs whenever a key is pressed while in the text box
  function handleKeyDown(e){
    if (e.key === 'Enter') {
        alert(`Man pressed Enter still. Anyway you entered ${text}`)
        setText('')
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
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
}
