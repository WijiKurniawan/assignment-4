import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyTable = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://api.currencyfreaks.com/latest?apikey=YOUR_API_KEY&symbols=CAD,IDR,JPY,CHF,EUR,GBP');
        setRates(response.data.rates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  const calculateWeBuy = (rate) => {
    return (parseFloat(rate) * 1.05).toFixed(4);
  };

  const calculateWeSell = (rate) => {
    return (parseFloat(rate) * 0.95).toFixed(4);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>We Buy</th>
          <th>Exchange Rate</th>
          <th>We Sell</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(rates).map((currency) => (
          <tr key={currency}>
            <td>{currency}</td>
            <td>{calculateWeBuy(rates[currency])}</td>
            <td>{rates[currency]}</td>
            <td>{calculateWeSell(rates[currency])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;