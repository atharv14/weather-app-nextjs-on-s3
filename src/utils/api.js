const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWeather(city, token) {
  try {
    console.log(`Fetching weather for city: ${city}`);
    const res = await fetch(`${API_URL}/api/search-weather/?city=${encodeURIComponent(city)}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(`Weather fetch response status: ${res.status}`);
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch weather: ${errorText}`);
      throw new Error(`Failed to fetch weather: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(`Weather data received:`, data);
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

export async function fetchForecast(city, token) {
  try {
    console.log(`Fetching forecast for city: ${city}`);
    const res = await fetch(`${API_URL}/api/forecast/?city=${encodeURIComponent(city)}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(`Forecast fetch response status: ${res.status}`);
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch forecast: ${errorText}`);
      throw new Error(`Failed to fetch forecast: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(`Forecast data received:`, data);
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return [];
  }
}
