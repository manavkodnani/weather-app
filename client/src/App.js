import { useState } from 'react';
import './App.scss';

const App = () => {
  const [address, setAddress] = useState('');
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearchWeather = () => {
    setLoading(true);
    setIsError(false);
    fetch(`/weather?address=${address}`)
      .then((res) => res.json())
      .then((data) => {
        if (!(data?.error)) {
          setWeatherData(data);
        } else {
          throw new Error(data?.error);
        }
        setLoading(false);
      })
      .catch((error) => {
        setWeatherData(error?.message);
        setIsError(true);
        setLoading(false);
      });
  }

  const isBlankString = (str) => {
    return (!str || /^\s*$/.test(str));
}

  return (
    <div className='app'>
      <div className='heading'>WEATHER TODAY</div>
      {loading ? <img src="/weather-loader.gif" alt="Loading" className="loader" /> :
        <>
          <div className='search-container'>
            <input type="search" aria-label="address-input" placeholder="Enter Place" value={address} autoFocus onChange={(e) => setAddress(e.target.value)} />
            <button onClick={handleSearchWeather} aria-label="search-btn" disabled={isBlankString(address)}><img src="/search.png" alt="Search"></img></button>
          </div>
          {isError ? <div className="weather-body" aria-label="error-weather">{weatherData}</div> :
            <div className="weather-body" aria-label="weather-forecast">
              <div>{weatherData?.location}</div>
              <div className="forecast">{weatherData?.forecast}</div>
            </div>}
        </>}
    </div>
  );
}

export default App;
