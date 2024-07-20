import { useState, useEffect } from 'react';
import styles from '../styles/UserPreferences.module.css';

export default function UserPreferences({ token, onPreferencesChange }) {
    const [defaultCity, setDefaultCity] = useState('');
    const [temperatureUnit, setTemperatureUnit] = useState('C');

    useEffect(() => {
        if (token) {
            fetchPreferences();
        }
    }, [token]);

    const fetchPreferences = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/preferences/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setDefaultCity(data.default_city || '');
                setTemperatureUnit(data.temperature_unit || 'C');
                onPreferencesChange(data);
            }
        } catch (error) {
            console.error('Error fetching preferences:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/preferences/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ default_city: defaultCity, temperature_unit: temperatureUnit })
            });
            if (res.ok) {
                const data = await res.json();
                onPreferencesChange(data);
                alert('Preferences saved successfully!');
            } else {
                throw new Error('Failed to save preferences');
            }
        } catch (error) {
            console.error('Error saving preferences:', error);
            alert('Failed to save preferences. Please try again.');
        }
    };

    return (
        <div className={styles.preferences}>
            <h2>User Preferences</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="defaultCity">Default City:</label>
                    <input
                        type="text"
                        id="defaultCity"
                        value={defaultCity}
                        onChange={(e) => setDefaultCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="temperatureUnit">Temperature Unit:</label>
                    <select
                        id="temperatureUnit"
                        value={temperatureUnit}
                        onChange={(e) => setTemperatureUnit(e.target.value)}
                    >
                        <option value="C">Celsius</option>
                        <option value="F">Fahrenheit</option>
                    </select>
                </div>
                <button type="submit">Save Preferences</button>
            </form>
        </div>
    );
}