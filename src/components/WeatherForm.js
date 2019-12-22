import React from 'react';
import '../styles/WeatherForm.css'
import Hello from '../images/hello.png'
const WeatherForm = (props) => {
    return (
        <div className="top" >
            <a href="LiveWeatherApp/"> <img id="hello" src={Hello} alt="hello" width="100" /></a>
            <span id="welcome">check live weather and forecast for next few days</span>
            <form onSubmit={props.subimt} className="weatherForm">
                <input type="text" name="city" id="city" onChange={props.change} value={props.val} placeholder="enter city..." />
                <button type="submit"> Search for weather</button>
            </form >
        </div >
    );
}

export default WeatherForm;