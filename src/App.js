import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import exchangerateApi from './utils/api';
import Loader from './components/Loader/Loader';
import Input from './components/Input/Input';
import CurrencySelect from './components/CurrencySelect/CurrencySelect';

function App() {
  // States

  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState([]);
  const [baseAmount, setBaseAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);

  const [date, setDate] = useState('');
  //
  const theme = createTheme({
    palette: {
      primary: {
        main: '#483d8b',
      },
      secondary: {
        main: '#ff5252',
      },
    },
  });
  const getInitialData = async () => {
    setLoading(true);
    try {
      const data = await exchangerateApi.getSupportedCodes();
      setCodes(data.supported_codes);
    } catch (error) {
      console.error('[Error fetching supported codes]:', error);
    } finally {
      setLoading(false);
    }
  };

  const getExchangeRate = async () => {
    if (baseCurrency && targetCurrency) {
      const data = await exchangerateApi.fetchExchangeRate({
        baseCurrency,
        targetCurrency,
      });
      setExchangeRate(data.conversion_rate);
      setTargetAmount((baseAmount * data.conversion_rate).toFixed(2));

      setDate(data.time_last_update_utc);
    }
  };

  // Handlers

  const handleBaseAmountChange = (value) => {
    setBaseAmount(value);
    setTargetAmount((value * exchangeRate).toFixed(2));
  };

  const handleTargetAmountChange = (value) => {
    setTargetAmount(value);
    setBaseAmount((value / exchangeRate).toFixed(2));
  };

  const handleSwapCurrency = () => {
    const newTargetCurrency = baseCurrency;

    setBaseCurrency(targetCurrency);
    setTargetCurrency(newTargetCurrency);

    getExchangeRate();
  };

  // Effects
  useEffect(() => {
    getInitialData();
  }, []);
  useEffect(() => {
    getExchangeRate();
    // eslint-disable-next-line
  }, [baseCurrency, targetCurrency]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <>
          <Helmet>
            <meta
              name="description"
              content="Конвертер валют для получения актуальных курсов валют"
            />
            <meta property="og:title" content="Currency Converter" />
            <meta
              property="og:description"
              content="Конвертер валют для получения актуальных курсов валют"
            />
            <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
            <meta
              property="og:url"
              content="https://mrphysix.github.io/currency-converter/"
            />
            <meta name="twitter:title" content="Currency Converter" />
            <meta
              name="twitter:description"
              content="Конвертер валют для получения актуальных курсов валют"
            />
            <meta name="twitter:image" content="%PUBLIC_URL%/logo192.png" />
          </Helmet>
        </>
        {loading ? (
          <Loader />
        ) : (
          <div className="section">
            <div className="section-part">
              <Input
                value={baseAmount}
                onChange={handleBaseAmountChange}
                placeholder="Enter amount in base currency"
              />
              <CurrencySelect
                value={baseCurrency}
                setCurrency={setBaseCurrency}
                codes={codes}
                label="Base Currency"
              />
            </div>
            <div
              style={{
                width: '150px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <IconButton color="succes" onClick={handleSwapCurrency}>
                <SwapCallsIcon />
              </IconButton>
            </div>
            <div className="section-part">
              <Input
                value={targetAmount}
                onChange={handleTargetAmountChange}
                placeholder="Enter amount in target currency"
              />
              <CurrencySelect
                value={targetCurrency}
                setCurrency={setTargetCurrency}
                codes={codes}
                label="Target Currency"
              />
            </div>
            <p style={{ color: '#483d8b', marginTop: '45px' }}>
              The date for: {date}
            </p>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
export default App;
