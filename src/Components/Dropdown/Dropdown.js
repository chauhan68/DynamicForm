import React from 'react';
import Label from '../Label/Label';

import './dropdown.css';

const Dropdown = (props) => {

    return (
        <div className='dropdown-wrapper container'>
            <Label 
                for={props.uid}
                label={props.label}
                isRequired={props.isRequired}
            />
            <select className="dropdown-select form-field" name={props.uid} id={props.uid} {...props.register(props.uid)}>
                {
                    props.value?.map((currentValue) => {
                        return (
                            <option key={currentValue} value={currentValue}>{currentValue}</option>
                        )
                    })
                }
            </select>
        </div>
    )

};

export default Dropdown;