import React from 'react';
// eslint-disable-next-line
export default function CurrencySelect({ value, setCurrency, codes, label }) {
  const handleSelectChange = (evt) => {
    setCurrency(evt.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={handleSelectChange}>
        {
          // eslint-disable-next-line
          codes.map(([code, name]) => (
            <option key={code} value={code}>
              {name} ({code})
            </option>
          ))
        }
      </select>
    </div>
  );
}
