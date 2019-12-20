import React from 'react';
import '../styles/WeatherForecast.css'

const WeatherForecast = (props) => {
    const currenTime = new Date().toLocaleTimeString().substring(0, 2);
    const today = Math.floor((24 - currenTime) / 3);
    return (
        <div id="forecast-container">
            {today > 0 ? <p className="forecast-header">Today:</p> : null}
            {today}
        </div>
    );
}

export default WeatherForecast;