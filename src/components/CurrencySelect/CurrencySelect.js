import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import styles from './currency-select.module.css';

// eslint-disable-next-line
export default function CurrencySelect({ value, setCurrency, codes, label }) {
  const handleSelectChange = (evt) => {
    setCurrency(evt.target.value);
  };

  const renderValue = (selected) => {
    return <span>{selected}</span>;
  };

  return (
    <FormControl>
      <InputLabel id="input-label">{label}</InputLabel>
      <Select
        style={{ width: '150px', color: '#483d8b' }}
        labelId="input-label"
        label={label}
        value={value}
        onChange={handleSelectChange}
        renderValue={renderValue}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          PaperProps: {
            style: {
              maxHeight: 150,
              backgroundColor: '#C0C0C0',
            },
            sx: {
              '::-webkit-scrollbar': {
                width: '10px',
                backgroundColor: '#483d8b',
              },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: '#483d8b',
                borderRadius: '1px',
                margin: '2px',
              },
              '::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#483d8b',
              },
              '::-webkit-scrollbar-track': {
                backgroundColor: '#A9A9A9',
              },
            },
          },
        }}
      >
        {
          // eslint-disable-next-line
          codes.map(([code, name]) => (
            <MenuItem key={code} value={code} className={styles.option}>
              <p className={styles.option}>
                {name}&nbsp;<span className={styles.abbreviation}>{code}</span>
              </p>
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}
