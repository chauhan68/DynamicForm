import React, { useState } from 'react'
import Label from '../Label/Label';

const Input = (props) => {
    const [value, setValue] = useState(props.value);

    const onBlurCallback = () => {
        props.register(props.uid, value);
    }

    const updateValue = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className={`input-wrapper container ${props.errors? 'error-state ': '' }`}>
            <Label for={props.uid} label={props.label} isRequired={props.isRequired} />
            <input
                id={props.uid}
                name={props.uid}
                className='input-component form-field'
                value={value}
                onChange={updateValue}
                placeholder={props.placeholder}
                onBlur={onBlurCallback}
            />
        </div>
    )
}

Input.defaultProps = {
    placeholder: '',
    isRequired: false
}
export default Input