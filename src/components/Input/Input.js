/* eslint-disable react/prop-types */
import React from 'react';
import { TextField } from '@mui/material';

export default function Input({ value, placeholder, onChange }) {
  const handleInputChange = (evt) => {
    const inputValue = evt.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };
  return (
    <div style={{ color: '#483d8b' }}>
      <TextField
        variant="outlined"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        sx={{
          input: {
            color: '#483d8b',
            fontWeight: 'bold',
          },
        }}
      />
    </div>
  );
}
