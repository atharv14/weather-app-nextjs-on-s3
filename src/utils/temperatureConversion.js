export function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

export function formatTemperature(celsius, unit = 'C') {
    if (typeof celsius !== 'number') {
        return 'N/A';
    }
    
    if (unit === 'F') {
        return `${celsiusToFahrenheit(celsius).toFixed(1)}°F`;
    }
    return `${celsius.toFixed(1)}°C`;
}