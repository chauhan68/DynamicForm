import React, { useState } from 'react'
import Label from '../Label/Label';

import './checkbox.css';

const Checkbox = (props) => {
    const [value, setValue] = useState(props.value);

    const updateValue = (event) => {
        setValue(event.target.value);
        props.register(props.uid, event.target.value);
    }

    return (
        <div className={`checkbox-wrapper container ${props.errors?.[props.uid]? 'error-state ': '' }`}>
            <input
                type="checkbox"
                id={props.uid} 
                name={props.uid} 
                className="input-component form-field" 
                value={value}
                onChange={updateValue}
            />
            <Label for={props.uid} label={props.label} isRequired={props.isRequired} />
        </div>
    )
};

Checkbox.defaultProps = {
    isRequired: false
}

export default Checkbox;