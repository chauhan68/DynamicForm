import React from 'react'
import Label from '../Label/Label';

import './checkbox.css';

const Checkbox = (props) => {
    return (
        <div className={`checkbox-wrapper container ${props.errors?.[props.uid]? 'error-state ': '' }`}>
            <input
                type="checkbox"
                id={props.uid} 
                name={props.uid} 
                className="input-component form-field" 
                value={props.value}
                {...props.register?.(props.uid)}
            />
            <Label for={props.uid} label={props.label} isRequired={props.isRequired} />
        </div>
    )
};

Checkbox.defaultProps = {
    isRequired: false
}

export default Checkbox;