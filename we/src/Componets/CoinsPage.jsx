import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CoinsPage({ email }) {
  const apiKey = '4E0XRYMY669M6MAT';
  const [symbol, setSymbol] = useState('AAPL');
  const [stock, setStock] = useState([]);
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [symbol]); // Trigger useEffect when symbol changes

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
      );
      const timeSeriesData = response.data['Time Series (Daily)'];
      if (!timeSeriesData) {
        // If data is not available, set default values
        setStock([
          { Date: 'No data available' },
          { Date: 'No data available' },
          { Date: 'No data available' },
          { Date: 'No data available' },
          { Date: 'No data available' },
          { Date: 'No data available' },
          { Date: 'No data available' },
          { Date: 'No data available' },
          { Date: 'No data available' },
          { Date: 'No data available' }
        ]);
      } else {
        // Extract stock data into an array of objects
        const stockData = Object.entries(timeSeriesData).map(([date, values]) => ({
          Date: date,
          open: values['1. open'],
          high: values['2. high'],
          low: values['3. low'],
          close: values['4. close'],
          volume: values['5. volume']
        }));
        setStock(stockData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrev = () => {
    if (page === 1) {
      return;
    } else {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (stock.length / 10 < page) {
      return;
    } else {
      setPage(page + 1);
    }
  };

  const handleAddWatchlist = async () => {
    try {
      const res = await axios.post('http://localhost:5000/addwatchlist', { email, stock });
      console.log(res.data); // Assuming you want to log the response data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='StockDiv'>
      <header className='inputsearch'>
        <input type='text' placeholder='Enter Symbol' onChange={(e) => setSymbol(e.target.value)} />
        <i className='fa-solid fa-magnifying-glass' onClick={handleSearch}></i>
      </header>
      <h1>{`${symbol} Stock Market Values`}</h1>
      <div className='stock'>
        {stock &&
          stock.slice(page * 10 - 10, page * 10).map((item, i) => (
            <div className='displayit'>
              <span key={i}>{item.Date}</span>
              <span>High: {item.High}</span>
              <span>Low: {item.Low}</span>
            </div>
          ))}
      </div>
      <div className='buttons'>
        <button className='secondbutton' onClick={handlePrev}>
          Prev
        </button>
        <button className='secondbutton' onClick={handleNext}>
          Next
        </button>
      </div>
      <button className='primarybutton' onClick={handleAddWatchlist}>
        Add To WatchList
      </button>
    </div>
  );
}

export default CoinsPage;
