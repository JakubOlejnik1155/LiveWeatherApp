import React from 'react';
import '../styles/Error.css'
import Shocked from '../images/shocked.png'
const Error = (props) => {
    return (
        <div className="errorResponse">
            <img src={Shocked} alt="emoji" />
            <p className="errorNumber">Error number: <span className='erNumber'> {props.err}</span></p>
            <p>No city called <span className='badcity'>{props.city}</span> in our database</p>
        </div>
    );
}

export default Error;