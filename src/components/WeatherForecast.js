import React from 'react';
import '../styles/WeatherForecast.css'

const WeatherForecast = (props) => {
    return (
        <div id="forecast-container">
            <h2 style={{ lineHeight: "400px", color: "whitesmoke" }}>
                Forecast for {props.city}
            </h2>
        </div>
    );
}

export default WeatherForecast;