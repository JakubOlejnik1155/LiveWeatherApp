import React from 'react';
import '../styles/WeatherForm.css'

const WeatherForm = (props) => {
    return (
        <form onSubmit={props.subimt} className="weatherForm">
            <input type="text" name="city" id="city" onChange={props.change} value={props.val} placeholder="enter city..." />
            <button type="submit"> Search for weather</button>
        </form >
    );
}

export default WeatherForm;