import React from "react";

function App() {
  return (
    <div>
      {/* Header Section */}
      <div style={{ textAlign: "center", backgroundColor: "lightblue" }}>
      <h1>Chord Progression App</h1>
      </div>

      {/* Content Section */}
      <p>This is a description</p>
      <h2>Is this larger than h1?</h2>
      <h3>The larger the hX number, the smaller it gets, like headings in Google Docs.</h3>
      <button onClick={() => alert("You clicked the button lmao")}>Skibidi button</button>

      <ul>
        <li>First item in list</li>
        <li>Second item in list</li>
        <li>よろしくね！</li>
      </ul>

    </div>
  );
}

export default App;
