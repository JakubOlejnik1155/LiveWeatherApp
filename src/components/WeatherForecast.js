import React from 'react';
import '../styles/WeatherForecast.css'

const WeatherForecast = (props) => {
    //calculating local time of the
    //destionation of weather forecast
    const calcTime = (offset) => {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd;
    }
    const calcTime2 = (offset, d) => {
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd;
    }
    const t = calcTime(props.timezone / 3600);
    console.log("t=" + t.getHours())
    // console.log(t.toLocaleDateString())
    // const currentTime = t.toLocaleTimeString();
    //compas direction
    const degToCompass = (num) => {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
    //all forecast array
    const forecastArray = props.forecast.list;
    // console.log(forecastArray)
    const todayForecastArray = []
    forecastArray.forEach(element => {
        // console.log(calcTime2(props.timezone / 3600, new Date(element.dt * 1000)))
        // console.log(calcTime2(props.timezone / 3600, calcTime(element.dt * 1000)).toTimeString())
        if (t.toLocaleDateString() === calcTime2(props.timezone / 3600, new Date(element.dt * 1000)).toLocaleDateString()) {
            todayForecastArray.push(element)
        }
    });
    //making arrays from props
    const restDaysForecast = forecastArray.slice(todayForecastArray.length)

    //showing number of forecast boxes properly
    const boxes = []
    for (let index = 8; index < restDaysForecast.length - 1; index += 8) {
        boxes.push(
            <li key={restDaysForecast[index].dt_txt}>
                <p className="forecast-header">{restDaysForecast[index].dt_txt.substring(0, 10)}</p>
                <div className="forecast"></div>
            </li>
        )
    }
    //todays Tables
    const todayHours = [], todayContitions = [], todayPressure = [], todayTemperature = [], todayRain = [], todayWindSpeed = [], todayWindDir = []
    const hours = [0, 3, 6, 9, 12, 15, 18, 21];
    const timeArray = hours.filter(h => h >= t.getHours())
    for (let index = 0; index < todayForecastArray.length; index++) {
        todayHours.push(
            <td key={todayForecastArray[index].dt_txt}>{timeArray[index]}</td>
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
    return (
        <div id="forecast-container">
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
            <p className="forecast-header">Tomorrow:</p>
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
            </div>
            <ul>
                {boxes}
            </ul>
        </div>
    );
}

export default WeatherForecast;