import React from 'react';
import '../styles/Error.css'
import Shocked from '../images/shocked.png'
const WeatherForecastError = (props) => {
    return (
        <div className="errorResponse">
            <img src={Shocked} alt="emoji" />
            <p className="errorNumber">Error number: <span className='erNumber'> {props.error}</span></p>
            <p>Can not load Weather Forecast for <span className='badcity'>{props.city}</span> in our database</p>
        </div>
    );
}

export default WeatherForecastError;