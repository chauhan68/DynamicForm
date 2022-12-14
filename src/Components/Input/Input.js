import React from 'react'
import Label from '../Label/Label';

const Input = (props) => {
    return (
        <div className={`input-wrapper container ${props.errors?.[props.uid]? 'error-state ': '' }`}>
            <Label for={props.uid} label={props.label} isRequired={props.isRequired} />
            <input
                id={props.uid}
                name={props.uid}
                className='input-component form-field'
                defaultValue={props.value}
                placeholder={props.placeholder}
                {...props.register(props.uid, { required: props.isRequired, pattern: props.validationPattern })}
            />
        </div>
    )
}

Input.defaultProps = {
    placeholder: '',
    isRequired: false
}
export default Input