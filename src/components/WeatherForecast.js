import React from 'react';
import '../styles/WeatherForecast.css'

const WeatherForecast = (props) => {
    //calculating local time of the
    //destionation of weather forecast
    const calcTime = (offset) => {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd.toLocaleTimeString();
    }
    const currentTime = calcTime(props.timezone / 3600)
    const currentHours = currentTime.substring(0, 2);
    const today = Math.floor((24 - currentHours) / 3)
    //making arrays from props
    const forecastArray = props.forecast.list;
    const todayForecastArray = forecastArray.slice(0, today)
    const restDaysForecast = forecastArray.slice(today)
    console.log(today)
    console.log(todayForecastArray)
    console.log(restDaysForecast)

    //showing number of forecast boxes properly
    const boxes = []
    for (let index = 8; index < restDaysForecast.length - 1; index += 8) {
        // debugger
        boxes.push(<li key={restDaysForecast[index].dt_txt}><p className="forecast-header">{restDaysForecast[index].dt_txt.substring(0, 10)}</p> <div className="forecast"></div></li>)
    }


    return (
        <div id="forecast-container">
            {today > 0 ? (
                <>
                    <p className="forecast-header">Today:</p>
                    <div className="forecast"></div>
                </>
            ) : null}
            <p className="forecast-header">Tomorrow:</p>
            <div className="forecast"></div>
            <ul>
                {boxes}
            </ul>
        </div>
    );
}

export default WeatherForecast;