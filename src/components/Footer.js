import React from 'react';
import '../styles/Footer.css'
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return (
        <div id="footer">
            <p> &copy; : Jakub Olejnik 2019</p>
            <Link to="/about" onClick={props.ForecastDoNotNeeded}>about</Link>
        </div>
    );
}

export default Footer;