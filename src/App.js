import axios from 'axios';
import { useState, useEffect } from 'react';
import logo from './resource/img/cryptocurrencies.png';
import PriceCard from './components/pricecard';
import './App.css';

const App = () => {
  const [ticker, setTicker] = useState({
    low: 0,
    high: 0,
    last: 0,
  });

  useEffect(() => {
    async function getDogecoinPrice() {
      const { data } = await axios.get(
        'https://nitinr-cors.herokuapp.com/https://api.wazirx.com/api/v2/tickers/dogeusdt'
      );
      setTicker(data.ticker);
    }
    getDogecoinPrice();
    const interval = setInterval(() => getDogecoinPrice(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='App'>
      <img src={logo} width={150} height={150} alt="cryptomoney"></img>
      <h1 className='title'>Criptocurrency Ticket</h1>
      <p className='subtitle'>Criptocurrency price currently 🌐</p>
      <div className="prices-container">
        <PriceCard type="low" price={ticker.low} />
        <PriceCard type="high" price={ticker.high} />
        <PriceCard type="current" price={ticker.last} />
      </div>
    </div>
  );
}

export default App;
