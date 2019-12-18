import React from 'react';

const Error = (props) => {
    return (
        <div className="errrorResponse">
            <p className="errorNumber">Error number: {props.err}</p>
            <p>No city called <strong>{props.city}</strong> in our database</p>
        </div>
    );
}

export default Error;