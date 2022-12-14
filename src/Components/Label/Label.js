import React from 'react';
import './label.css';

const Label = (props) => {
    return (
        <label className="label" htmlFor={props.for}>
            {props.label}
            {
                props.isRequired &&
                <span>(required)</span>
            }
        </label>
    )
};

export default Label;