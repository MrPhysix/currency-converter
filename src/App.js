import React, { useState, useEffect } from 'react';
import './App.css';
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

  //

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

  // Effects

  useEffect(() => {
    getInitialData();
    getExchangeRate();
    // eslint-disable-next-line
  }, [baseCurrency, targetCurrency]);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <form className="form">
          <CurrencySelect
            value={baseCurrency}
            setCurrency={setBaseCurrency}
            codes={codes}
            label="Base Currency"
          />

          <Input
            value={baseAmount}
            onChange={handleBaseAmountChange}
            placeholder="Enter amount in base currency"
          />

          <CurrencySelect
            value={targetCurrency}
            setCurrency={setTargetCurrency}
            codes={codes}
            label="Target Currency"
          />

          <Input
            value={targetAmount}
            onChange={handleTargetAmountChange}
            placeholder="Enter amount in target currency"
          />
        </form>
      )}
    </div>
  );
}
export default App;
