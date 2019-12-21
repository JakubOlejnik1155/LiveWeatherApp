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
        boxes.push(
            <li key={restDaysForecast[index].dt_txt}>
                <p className="forecast-header">{restDaysForecast[index].dt_txt.substring(0, 10)}</p>
                <div className="forecast">
                </div>
            </li>
        )
    }

    return (
        <div id="forecast-container">
            {today > 0 ? (
                <>
                    <p className="forecast-header">Today:</p>
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