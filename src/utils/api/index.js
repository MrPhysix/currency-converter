const config = {
  baseUrl: 'https://v6.exchangerate-api.com/v6',
  apiKey: process.env.REACT_APP_API_KEY,
};

class Api {
  constructor({ baseUrl, apiKey }) {
    this._url = baseUrl;
    this._key = apiKey;
  }
  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`[Error]: ${res.status}`));
  };

  async getSupportedCodes() {
    const res = await fetch(`${this._url}/${this._key}/codes`);
    const data = await this._checkResult(res);
    return data;
  }

  async fetchExchangeRate({ baseCurrency, targetCurrency }) {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${exchangerateApi._key}/pair/${baseCurrency}/${targetCurrency}`,
    );
    const data = await this._checkResult(res);
    return data;
  }
}

const exchangerateApi = new Api(config);
export default exchangerateApi;
