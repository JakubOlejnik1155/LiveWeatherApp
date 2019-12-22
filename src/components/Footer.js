import React from 'react';
import '../styles/Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div id="footer">
            <p> &copy; : Jakub Olejnik 2019</p>
            <Link to="/about">about</Link>
        </div>
    );
}

export default Footer;