import styles from '../styles/WeatherCard.module.css';

export default function WeatherCard({ weather }) {
  console.log('Weather data in WeatherCard:', weather);

  if (!weather) {
    console.log('No weather data available');
    return null;
  }

  const formatTemperature = (temp) => {
    return typeof temp === 'number' ? temp.toFixed(1) : 'N/A';
  };

  return (
    <div className={styles.card}>
      <h2>{weather.city || 'Unknown City'}</h2>
      {weather.icon && (
        <img 
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
          alt={weather.condition || 'Weather icon'} 
          className={styles.weatherIcon}
        />
      )}
      <p className={styles.temperature}>
        {formatTemperature(weather.temperature)}°C
      </p>
      <p>{weather.description || weather.condition || 'No description available'}</p>
      {weather.humidity !== undefined && <p>Humidity: {weather.humidity}%</p>}
      {weather.wind_speed !== undefined && <p>Wind Speed: {weather.wind_speed} m/s</p>}
    </div>
  );
}