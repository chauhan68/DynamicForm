import React, { useState } from 'react'
import Label from '../Label/Label';

const Input = (props) => {
    const [value, setValue] = useState(props.value);
    const [hasError, updateError] = useState(props.errors);

    const updateValue = (event) => {
        setValue(event.target.value);
        const errorPersists = props.register(props.uid, event.target.value);
        if (hasError) {
            updateError(errorPersists);
        }
    }

    return (
        <div className={`input-wrapper container ${hasError? 'error-state ': '' }`}>
            <Label for={props.uid} label={props.label} isRequired={props.isRequired} />
            <input
                id={props.uid}
                name={props.uid}
                className='input-component form-field'
                value={value}
                onChange={updateValue}
                placeholder={props.placeholder}
            />
        </div>
    )
}

Input.defaultProps = {
    placeholder: '',
    isRequired: false
}
export default Input