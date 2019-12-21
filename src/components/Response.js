import React, { useState } from 'react';
import '../styles/Response.css'
import WeatherForecast from './WeatherForecast';
import WeatherForecastError from './WeatherForecastError.js'
import Sunrise from '../images/sunrise.png'
import Sunset from '../images/sunset.png'
import Cloud from '../images/cloud.png'
import Direction from '../images/direction.png'
import Humidity from '../images/humidity.png'
import Pressure from '../images/pressure.png'
import Temperature from '../images/temperature.png'
import Wind from '../images/wind.png'
import Rain from '../images/rain.png'
const Response = (props) => {
    const isoCountries = {
        'AF': 'Afghanistan',
        'AX': 'Aland Islands',
        'AL': 'Albania',
        'DZ': 'Algeria',
        'AS': 'American Samoa',
        'AD': 'Andorra',
        'AO': 'Angola',
        'AI': 'Anguilla',
        'AQ': 'Antarctica',
        'AG': 'Antigua And Barbuda',
        'AR': 'Argentina',
        'AM': 'Armenia',
        'AW': 'Aruba',
        'AU': 'Australia',
        'AT': 'Austria',
        'AZ': 'Azerbaijan',
        'BS': 'Bahamas',
        'BH': 'Bahrain',
        'BD': 'Bangladesh',
        'BB': 'Barbados',
        'BY': 'Belarus',
        'BE': 'Belgium',
        'BZ': 'Belize',
        'BJ': 'Benin',
        'BM': 'Bermuda',
        'BT': 'Bhutan',
        'BO': 'Bolivia',
        'BA': 'Bosnia And Herzegovina',
        'BW': 'Botswana',
        'BV': 'Bouvet Island',
        'BR': 'Brazil',
        'IO': 'British Indian Ocean Territory',
        'BN': 'Brunei Darussalam',
        'BG': 'Bulgaria',
        'BF': 'Burkina Faso',
        'BI': 'Burundi',
        'KH': 'Cambodia',
        'CM': 'Cameroon',
        'CA': 'Canada',
        'CV': 'Cape Verde',
        'KY': 'Cayman Islands',
        'CF': 'Central African Republic',
        'TD': 'Chad',
        'CL': 'Chile',
        'CN': 'China',
        'CX': 'Christmas Island',
        'CC': 'Cocos (Keeling) Islands',
        'CO': 'Colombia',
        'KM': 'Comoros',
        'CG': 'Congo',
        'CD': 'Congo, Democratic Republic',
        'CK': 'Cook Islands',
        'CR': 'Costa Rica',
        'CI': 'Cote D\'Ivoire',
        'HR': 'Croatia',
        'CU': 'Cuba',
        'CY': 'Cyprus',
        'CZ': 'Czech Republic',
        'DK': 'Denmark',
        'DJ': 'Djibouti',
        'DM': 'Dominica',
        'DO': 'Dominican Republic',
        'EC': 'Ecuador',
        'EG': 'Egypt',
        'SV': 'El Salvador',
        'GQ': 'Equatorial Guinea',
        'ER': 'Eritrea',
        'EE': 'Estonia',
        'ET': 'Ethiopia',
        'FK': 'Falkland Islands (Malvinas)',
        'FO': 'Faroe Islands',
        'FJ': 'Fiji',
        'FI': 'Finland',
        'FR': 'France',
        'GF': 'French Guiana',
        'PF': 'French Polynesia',
        'TF': 'French Southern Territories',
        'GA': 'Gabon',
        'GM': 'Gambia',
        'GE': 'Georgia',
        'DE': 'Germany',
        'GH': 'Ghana',
        'GI': 'Gibraltar',
        'GR': 'Greece',
        'GL': 'Greenland',
        'GD': 'Grenada',
        'GP': 'Guadeloupe',
        'GU': 'Guam',
        'GT': 'Guatemala',
        'GG': 'Guernsey',
        'GN': 'Guinea',
        'GW': 'Guinea-Bissau',
        'GY': 'Guyana',
        'HT': 'Haiti',
        'HM': 'Heard Island & Mcdonald Islands',
        'VA': 'Holy See (Vatican City State)',
        'HN': 'Honduras',
        'HK': 'Hong Kong',
        'HU': 'Hungary',
        'IS': 'Iceland',
        'IN': 'India',
        'ID': 'Indonesia',
        'IR': 'Iran, Islamic Republic Of',
        'IQ': 'Iraq',
        'IE': 'Ireland',
        'IM': 'Isle Of Man',
        'IL': 'Israel',
        'IT': 'Italy',
        'JM': 'Jamaica',
        'JP': 'Japan',
        'JE': 'Jersey',
        'JO': 'Jordan',
        'KZ': 'Kazakhstan',
        'KE': 'Kenya',
        'KI': 'Kiribati',
        'KR': 'Korea',
        'KW': 'Kuwait',
        'KG': 'Kyrgyzstan',
        'LA': 'Lao People\'s Democratic Republic',
        'LV': 'Latvia',
        'LB': 'Lebanon',
        'LS': 'Lesotho',
        'LR': 'Liberia',
        'LY': 'Libyan Arab Jamahiriya',
        'LI': 'Liechtenstein',
        'LT': 'Lithuania',
        'LU': 'Luxembourg',
        'MO': 'Macao',
        'MK': 'Macedonia',
        'MG': 'Madagascar',
        'MW': 'Malawi',
        'MY': 'Malaysia',
        'MV': 'Maldives',
        'ML': 'Mali',
        'MT': 'Malta',
        'MH': 'Marshall Islands',
        'MQ': 'Martinique',
        'MR': 'Mauritania',
        'MU': 'Mauritius',
        'YT': 'Mayotte',
        'MX': 'Mexico',
        'FM': 'Micronesia, Federated States Of',
        'MD': 'Moldova',
        'MC': 'Monaco',
        'MN': 'Mongolia',
        'ME': 'Montenegro',
        'MS': 'Montserrat',
        'MA': 'Morocco',
        'MZ': 'Mozambique',
        'MM': 'Myanmar',
        'NA': 'Namibia',
        'NR': 'Nauru',
        'NP': 'Nepal',
        'NL': 'Netherlands',
        'AN': 'Netherlands Antilles',
        'NC': 'New Caledonia',
        'NZ': 'New Zealand',
        'NI': 'Nicaragua',
        'NE': 'Niger',
        'NG': 'Nigeria',
        'NU': 'Niue',
        'NF': 'Norfolk Island',
        'MP': 'Northern Mariana Islands',
        'NO': 'Norway',
        'OM': 'Oman',
        'PK': 'Pakistan',
        'PW': 'Palau',
        'PS': 'Palestinian Territory, Occupied',
        'PA': 'Panama',
        'PG': 'Papua New Guinea',
        'PY': 'Paraguay',
        'PE': 'Peru',
        'PH': 'Philippines',
        'PN': 'Pitcairn',
        'PL': 'Poland',
        'PT': 'Portugal',
        'PR': 'Puerto Rico',
        'QA': 'Qatar',
        'RE': 'Reunion',
        'RO': 'Romania',
        'RU': 'Russian Federation',
        'RW': 'Rwanda',
        'BL': 'Saint Barthelemy',
        'SH': 'Saint Helena',
        'KN': 'Saint Kitts And Nevis',
        'LC': 'Saint Lucia',
        'MF': 'Saint Martin',
        'PM': 'Saint Pierre And Miquelon',
        'VC': 'Saint Vincent And Grenadines',
        'WS': 'Samoa',
        'SM': 'San Marino',
        'ST': 'Sao Tome And Principe',
        'SA': 'Saudi Arabia',
        'SN': 'Senegal',
        'RS': 'Serbia',
        'SC': 'Seychelles',
        'SL': 'Sierra Leone',
        'SG': 'Singapore',
        'SK': 'Slovakia',
        'SI': 'Slovenia',
        'SB': 'Solomon Islands',
        'SO': 'Somalia',
        'ZA': 'South Africa',
        'GS': 'South Georgia And Sandwich Isl.',
        'ES': 'Spain',
        'LK': 'Sri Lanka',
        'SD': 'Sudan',
        'SR': 'Suriname',
        'SJ': 'Svalbard And Jan Mayen',
        'SZ': 'Swaziland',
        'SE': 'Sweden',
        'CH': 'Switzerland',
        'SY': 'Syrian Arab Republic',
        'TW': 'Taiwan',
        'TJ': 'Tajikistan',
        'TZ': 'Tanzania',
        'TH': 'Thailand',
        'TL': 'Timor-Leste',
        'TG': 'Togo',
        'TK': 'Tokelau',
        'TO': 'Tonga',
        'TT': 'Trinidad And Tobago',
        'TN': 'Tunisia',
        'TR': 'Turkey',
        'TM': 'Turkmenistan',
        'TC': 'Turks And Caicos Islands',
        'TV': 'Tuvalu',
        'UG': 'Uganda',
        'UA': 'Ukraine',
        'AE': 'United Arab Emirates',
        'GB': 'United Kingdom',
        'US': 'United States',
        'UM': 'United States Outlying Islands',
        'UY': 'Uruguay',
        'UZ': 'Uzbekistan',
        'VU': 'Vanuatu',
        'VE': 'Venezuela',
        'VN': 'Viet Nam',
        'VG': 'Virgin Islands, British',
        'VI': 'Virgin Islands, U.S.',
        'WF': 'Wallis And Futuna',
        'EH': 'Western Sahara',
        'YE': 'Yemen',
        'ZM': 'Zambia',
        'ZW': 'Zimbabwe'
    };
    const [forecast, setForecast] = useState({});//hooks
    const [error, setError] = useState(null)
    const [errorNumber, setErrorNumber] = useState(0)
    const getCountryName = (countryCode) => {
        if (isoCountries.hasOwnProperty(countryCode)) {
            return isoCountries[countryCode];
        } else {
            return countryCode;
        }
    }
    const degToCompass = (num) => {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
    //viariables
    const ForecastRequest = () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.weather.name}&appid=9b2e69fdc3396e7b6cd92b0d5a636435&units=metric`)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                setError(true)
                setErrorNumber(response.status)
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                setForecast(data);
                setError(false);
            })
            .catch(error => {
                console.log(error)
            })
    }
    const calcTime = (offset, d) => {
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd.toLocaleTimeString();
    }
    const Country = getCountryName(props.weather.sys.country)
    const windCompas = degToCompass(props.weather.wind.deg)
    const sunriseTime = calcTime((props.weather.timezone / 3600), new Date(props.weather.sys.sunrise * 1000))
    const sunsetTime = calcTime((props.weather.timezone / 3600), new Date(props.weather.sys.sunset * 1000))
    let rain = 0.0;
    if (props.weather.rain) {
        rain = props.weather.rain["1h"];
    }
    else if (props.weather.snow) {
        rain = "#" + props.weather.snow["3h"]
    }
    return (
        <div className="liveWeatherResponse">
            <p id="head">Live weather for <span className="head">{props.weather.name + " "}</span><em>({Country}) {props.time}</em></p>
            <div id="live-conditions">
                <p><img src={Sunrise} alt="sunrise" /><span className="head">Sunrise: </span>{sunriseTime}</p>
                <p><img src={Sunset} alt="sunset" /><span className="head">Sunset: </span>{sunsetTime}</p>
                <p><img src={Temperature} alt="temperature" /><span className="head">Temperature: </span>{props.weather.main.temp + "°C"} <em>(perceived temperature: {props.weather.main.feels_like + "°C"})</em> </p>
                <p><img src={Humidity} alt="humidity" /><span className="head">Humidity: </span>{props.weather.main.humidity + "%"}</p>
                <p><img src={Pressure} alt="pressure" /><span className="head">Pressure: </span>{props.weather.main.pressure + " hPa"}</p>
                <p><img src={Cloud} alt="cloud" /><span className="head">Clouds: </span>{props.weather.clouds.all + "%"}</p>
                <p><img src={Rain} alt="rain" /><span className="head">Rain / #snow in last hour: </span>{rain + " mm"}</p>
                <p><img src={Wind} alt="wind" /><span className="head">Wind speed: </span> {props.weather.wind.speed + " m/s"}</p>
                <p><img src={Direction} alt="wind-direction" /><span className="head">Wind direction: </span>{props.weather.wind.deg ? props.weather.wind.deg + "°" : " - "} <em>({props.weather.wind.deg ? windCompas : " - "})</em></p>
            </div>
            {!props.isForecastNeeded ? <button id="forecast-button" onClick={() => {
                props.handleForecastChange();
                ForecastRequest();
            }}>Check forecast for {props.weather.name}</button> : <button id="hide-forecast-button" onClick={() => props.handleForecastChange()}>X</button>}
            {props.isForecastNeeded && error === true ? <WeatherForecastError city={props.weather.name} error={errorNumber} /> : null}
            {props.isForecastNeeded && error === false ? <WeatherForecast city={props.weather.name} forecast={forecast} timezone={props.weather.timezone} /> : null}
        </div>
    );
}

export default Response;