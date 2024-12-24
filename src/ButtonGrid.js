import React from 'react';
import './App.css';

function ButtonGrid() {
  const rows = 3;
  const cols = 3;

  const gridItems = [];

  for (let i = 0; i < rows; i++) {
    const rowButtons = [];
    for (let j = 0; j < cols; j++) {
      rowButtons.push(
        <button key={`%{i}-{j}`} className='grid-button' onClick={() => alert(`Button at row ${i} and column ${j} was clicked!`)}>
          Gyatt button
        </button>
      );
    }

    gridItems.push(
      <div key={i} className='grid-row'>
        {rowButtons}
      </div>
    );
  }

  return <div className='button-grid'>{gridItems}</div>;
}

export default ButtonGrid;
