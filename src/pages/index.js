import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import WeatherCard from '../components/WeatherCard';
import ForecastList from '../components/ForecastList';
import SearchBar from '../components/SearchBar';
import UserPreferences from '../components/UserPreferences';
import styles from '../styles/Home.module.css';
import { fetchWeather, fetchForecast } from '../utils/api';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const handleSearch = useCallback(async (city) => {
    if (token) {
      try {
        const weatherData = await fetchWeather(city, token);
        setWeather(weatherData);
        const forecastData = await fetchForecast(city, token);
        setForecast(forecastData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  }, [token]);

  const handlePreferencesChange = useCallback((newPreferences) => {
    setPreferences(newPreferences);
    if (newPreferences.default_city) {
      handleSearch(newPreferences.default_city);
    }
  }, [handleSearch]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken(null);
    setWeather(null);
    setForecast([]);
    setPreferences(null);
  };

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Weather App</h1>
        
        {!isLoggedIn ? (
          <>
            <p>Please sign in to use the Weather App</p>
            <button className={styles.signInButton} onClick={handleSignIn}>Sign in</button>
          </>
        ) : (
          <>
            <button className={styles.signOutButton} onClick={handleSignOut}>Sign out</button>
            <UserPreferences token={token} onPreferencesChange={handlePreferencesChange} />
            <SearchBar onSearch={handleSearch} />
            {weather && <WeatherCard weather={weather} />}
            <ForecastList forecast={forecast} />
          </>
        )}
      </main>
    </div>
  );
}