import React from 'react';
import '../styles/WeatherForecast.css'

const WeatherForecast = (props) => {
    const calcTime = (offset) => {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd.toLocaleTimeString();
    }
    const currentTime = calcTime(props.timezone / 3600)
    const currentHours = currentTime.substring(0, 2);
    const today = Math.floor((24 - currentHours) / 3)
    return (
        <div id="forecast-container">
            {/* {today > 0 ? <p className="forecast-header">Today:</p> : null} */}
            {today}
        </div>
    );
}

export default WeatherForecast;