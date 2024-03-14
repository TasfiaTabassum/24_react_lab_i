import React, { useState } from 'react';
import './AddTextBox.css';

const AddTextBox = () => {
  const [textboxes, setTextboxes] = useState(['']);
  const [errors, setErrors] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddTextBox = () => {
    setTextboxes([...textboxes, '']);
    setErrors([...errors, '']);
  };

  const handleDeleteTextBox = (index) => {
    const updatedTextboxes = textboxes.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setTextboxes(updatedTextboxes);
    setErrors(updatedErrors);
    calculateTotal(updatedTextboxes);
  };

  const handleChange = (index, event) => {
    const value = event.target.value;
    const updatedTextboxes = [...textboxes];
    const updatedErrors = [...errors];

    if (!isNaN(value)) {
      updatedTextboxes[index] = value;
      updatedErrors[index] = '';
    } else {
      updatedErrors[index] = 'ERROR!!! Please enter a numerical value';
    }

    setTextboxes(updatedTextboxes);
    setErrors(updatedErrors);
    calculateTotal(updatedTextboxes);
  };

  const calculateTotal = (updatedTextboxes) => {
    const newTotal = updatedTextboxes.reduce((acc, curr) => {
      const value = parseFloat(curr);
      return isNaN(value) ? acc : acc + value;
    }, 0);
    setTotal(newTotal);
  };

  return (
    <div className="add-textbox-container">
      {textboxes.map((textbox, index) => (
        <div key={index} className="textbox-wrapper">
          <input
            type="text"
            value={textbox}
            onChange={(event) => handleChange(index, event)}
          />
          <button onClick={() => handleDeleteTextBox(index)}>Delete</button>
          {errors[index] && (
            <div className="error-message">{errors[index]}</div>
          )}
        </div>
      ))}
      <button onClick={handleAddTextBox}>Add Textbox</button>
      <div>Total: {total}</div>
    </div>
  );
};

export default AddTextBox;
