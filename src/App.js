import React from "react";

function App() {
  return (
    <div>
      {/* Header Section */}
      <div style = {{ textAlign: "center" }}>
      <h1>Welcome to My Website</h1>
      </div>

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
