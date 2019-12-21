import React from 'react';
import Table from './Table'
import '../styles/WeatherForecast.css'

const WeatherForecast = (props) => {
    //wind direction from degrees to compass
    const degToCompass = (num) => {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
    //calculating local time of the
    //destionation of weather forecast using offset
    const calcTime = (offset) => {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd;
    }
    //calculating time using offset and our time
    const calcTime2 = (offset, d) => {
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd;
    }
    //atrual local time where we looking for forecast
    const actualLocaleTime = calcTime(props.timezone / 3600);
    console.log(actualLocaleTime.getHours())
    console.log(new Date().getUTCHours())
    //all forecast array
    const forecastArray = props.forecast.list; //all days forecast
    const forecastArray_1 = JSON.parse(JSON.stringify(forecastArray));//all days forecast copy to change
    //changing miliseconds in utc to destination local time
    for (let i = 0; i < forecastArray_1.length; i++) {
        const localeTimeOfNextForecast = new Date(forecastArray_1[i].dt * 1000)
        forecastArray_1[i].dt = calcTime2(props.timezone / 3600, localeTimeOfNextForecast).toLocaleTimeString().substring(0, 2)
        const time = calcTime2(props.timezone / 3600, localeTimeOfNextForecast);
        const formatted_date = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours()
        forecastArray_1[i].dt_txt = formatted_date;
    }
    //making todays array forecast
    const todayForecastArray = []
    for (let i = 0; i < forecastArray_1.length; i++) {
        const element = forecastArray_1[i];
        if (element.dt > actualLocaleTime.getHours()) {
            todayForecastArray.push(element)
        }
        else {
            break;
        }
    }
    //deleting todays forecasts from main array
    for (let i = 0; i < todayForecastArray.length; i++) {
        forecastArray_1.shift()
    }

    console.log(forecastArray_1)
    console.log(todayForecastArray)

    const boxes = []
    for (let index = 8; index < forecastArray_1.length; index += 8) {
        boxes.push(
            <li key={forecastArray_1[index].dt_txt}>
                <p className="forecast-header">{forecastArray_1[index].dt_txt.substring(0, 10)}</p>
                <div className="forecast">
                    {forecasts}
                </div>
            </li>
        )
    }
    //making forecasts arrays in one array called days
    const days = []
    let tmp = []
    for (let i = 0; i < boxes.length + 1; i++) {
        tmp = []
        for (let j = 0; j < 8; j++) {
            if (forecastArray_1[j]) {
                tmp.push(forecastArray_1[j])
            }
        }
        days.push(tmp)
        for (let j = 0; j < 8; j++) {
            if (forecastArray_1.length > 0) {
                forecastArray_1.shift()
            }
        }
    }
    console.log("days:")
    console.log(days)

    // //todays Tables
    const todayHours = [], todayContitions = [], todayPressure = [], todayTemperature = [], todayRain = [], todayWindSpeed = [], todayWindDir = []
    for (let index = 0; index < todayForecastArray.length; index++) {
        todayHours.push(
            <td key={todayForecastArray[index].dt_txt}>{todayForecastArray[index].dt}</td>
        )
        todayContitions.push(
            <td key={todayForecastArray[index].dt_txt}>
                <img src={`http://openweathermap.org/img/wn/${todayForecastArray[index].weather[0].icon}@2x.png`} alt="" />
            </td>
        )
        todayPressure.push(
            <td key={todayForecastArray[index].dt_txt}> {todayForecastArray[index].main.pressure + " hPa"}</td>
        )
        todayTemperature.push(
            <td key={todayForecastArray[index].dt_txt}> {todayForecastArray[index].main.temp + "°C"} </td>
        )
        if (todayForecastArray[index].rain) {
            todayRain.push(
                <td key={todayForecastArray[index].dt_txt}> {todayForecastArray[index].rain["3h"] + " mm"} </td>
            )
        } else if (todayForecastArray[index].snow) {
            todayRain.push(
                <td key={todayForecastArray[index].dt_txt}> {todayForecastArray[index].snow["3h"] + "# mm"} </td>
            )
        } else {
            todayRain.push(
                <td key={todayForecastArray[index].dt_txt}> {"0 mm"} </td>
            )
        }
        if (todayForecastArray[index].wind.speed) {
            todayWindSpeed.push(
                <td key={todayForecastArray[index].dt_txt}> {todayForecastArray[index].wind.speed + " m/s"} </td>
            )
        }
        if (todayForecastArray[index].wind.deg) {
            const cc = degToCompass(todayForecastArray[index].wind.deg)
            todayWindDir.push(
                <td key={todayForecastArray[index].dt_txt}> {cc} </td>
            )
        } else {
            todayWindDir.push(
                <td key={todayForecastArray[index].dt_txt}> {" - "} </td>
            )
        }
    }

    const forecasts = days.map(day => <Table forecast={day} />)
    /////////RETURN/////////////////
    return (
        <div id="forecast-container">
            prognoza
             {todayForecastArray.length > 0 ? (
                <>
                    <p className="forecast-header">Today:</p>
                    <div className="forecast">
                        <table>
                            <thead>
                                <tr>
                                    <th className="table-italic" scope="row">hours</th>
                                    {todayHours}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="table-italic" scope="row">conditions</th>
                                    {todayContitions}
                                </tr>
                                <tr>
                                    <th className="table-italic" scope="row">pressure</th>
                                    {todayPressure}
                                </tr>
                                <tr>
                                    <th className="table-italic" scope="row">temperature</th>
                                    {todayTemperature}
                                </tr>
                                <tr>
                                    <th className="table-italic" scope="row">rain /#snow</th>
                                    {todayRain}
                                </tr>
                                <tr>
                                    <th className="table-italic" scope="row">Wind</th>
                                    {todayWindSpeed}
                                </tr>
                                <tr>
                                    <th className="table-italic" scope="row">wind dir.</th>
                                    {todayWindDir}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ) : null}

            {/* <p className="forecast-header">Tomorrow:</p>
            <div className="forecast">
                <table>
                    <thead>
                        <tr>
                            <th className="table-italic" scope="row">hours</th>
                            <th scope="col">00</th>
                            <th scope="col">03</th>
                            <th scope="col">06</th>
                            <th scope="col">09</th>
                            <th scope="col">12</th>
                            <th scope="col">15</th>
                            <th scope="col">18</th>
                            <th scope="col">21</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="table-italic" scope="row">conditions</th>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <th className="table-italic" scope="row">pressure</th>
                            <td>992 hPa</td>
                            <td>992 hPa</td>
                            <td>992 hPa</td>
                            <td>992 hPa</td>
                            <td>992 hPa</td>
                            <td>992 hPa</td>
                            <td>992 hPa</td>
                            <td>992 hPa</td>
                        </tr>
                        <tr>
                            <th className="table-italic" scope="row">rain</th>
                            <td>5.7°C</td>
                            <td>5.7°C</td>
                            <td>5.7°C</td>
                            <td>5.7°C</td>
                            <td>5.7°C</td>
                            <td>5.7°C</td>
                            <td>5.7°C</td>
                            <td>5.7°C</td>
                        </tr>
                        <tr>
                            <th className="table-italic" scope="row">temperature</th>
                            <td>0 mm</td>
                            <td>0 mm</td>
                            <td>0 mm</td>
                            <td>0 mm</td>
                            <td>0 mm</td>
                            <td>0 mm</td>
                            <td>0 mm</td>
                            <td>0 mm</td>
                        </tr>
                        <tr>
                            <th className="table-italic" scope="row">Wind</th>
                            <td>3.1 m/s</td>
                            <td>3.1 m/s</td>
                            <td>3.1 m/s</td>
                            <td>3.1 m/s</td>
                            <td>3.1 m/s</td>
                            <td>3.1 m/s</td>
                            <td>3.1 m/s</td>
                            <td>3.1 m/s</td>
                        </tr>
                        <tr>
                            <th className="table-italic" scope="row">wind dir.</th>
                            <td>SE</td>
                            <td>SE</td>
                            <td>SE</td>
                            <td>SE</td>
                            <td>SE</td>
                            <td>SE</td>
                            <td>SE</td>
                            <td>SE</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
            <ul>

                {boxes}
            </ul>
        </div>
    );
}

export default WeatherForecast;