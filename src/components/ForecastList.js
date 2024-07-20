import styles from '../styles/ForecastList.module.css';

export default function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className={styles.list}>
      <h2>5-Day Forecast</h2>
      <div className={styles.forecastGrid}>
        {forecast.map((day, index) => (
          <div key={index} className={styles.item}>
            <p>
              {
                new Date(day.date).toLocaleDateString(
                  'en-US',
                  {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  }
                )
              }
            </p>
            {
              day.icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                  alt={day.condition}
                  className={styles.weatherIcon}
                />
              )
            }
            <p>{day.temperature ? day.temperature.toFixed(1) : 'N/A'}°C</p>
            <p>{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}