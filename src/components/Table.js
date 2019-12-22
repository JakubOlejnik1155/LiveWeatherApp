import React from 'react';

const Table = (props) => {
    const degToCompass = (num) => {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
    console.log(props.forecast)

    const todayHours = [], todayContitions = [], todayPressure = [], todayTemperature = [], todayRain = [], todayWindSpeed = [], todayWindDir = []
    for (let index = 0; index < props.forecast.length; index++) {
        todayHours.push(
            <td key={props.forecast[index].dt_txt}>{props.forecast[index].dt}</td>
        )
        todayContitions.push(
            <td key={props.forecast[index].dt_txt}>
                <img src={`http://openweathermap.org/img/wn/${props.forecast[index].weather[0].icon}@2x.png`} alt="" />
            </td>
        )
        todayPressure.push(
            <td key={props.forecast[index].dt_txt}> {props.forecast[index].main.pressure + " hPa"}</td>
        )
        todayTemperature.push(
            <td key={props.forecast[index].dt_txt}> {props.forecast[index].main.temp + "°C"} </td>
        )
        if (props.forecast[index].rain) {
            todayRain.push(
                <td key={props.forecast[index].dt_txt}> {props.forecast[index].rain["3h"] + " mm"} </td>
            )
        } else if (props.forecast[index].snow) {
            todayRain.push(
                <td key={props.forecast[index].dt_txt}> {props.forecast[index].snow["3h"] + "# mm"} </td>
            )
        } else {
            todayRain.push(
                <td key={props.forecast[index].dt_txt}> {"0 mm"} </td>
            )
        }
        if (props.forecast[index].wind.speed) {
            todayWindSpeed.push(
                <td key={props.forecast[index].dt_txt}> {props.forecast[index].wind.speed + " m/s"} </td>
            )
        }
        if (props.forecast[index].wind.deg) {
            const cc = degToCompass(props.forecast[index].wind.deg)
            todayWindDir.push(
                <td key={props.forecast[index].dt_txt}> {cc} </td>
            )
        } else {
            todayWindDir.push(
                <td key={props.forecast[index].dt_txt}> {" - "} </td>
            )
        }
    }





    return (
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
    );
}

export default Table;