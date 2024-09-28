import React from 'react';

export default function Input({ value, placeholder, onChange }) {
  const handleInputChange = (evt) => {
    const inputValue = evt.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
}
