import React, {useState} from 'react';
import Label from '../Label/Label';

import './dropdown.css';

const Dropdown = (props) => {

    const [value, setValue] = useState(props.value);

    const updateValue = (event) => {
        setValue(event.target.value);
        props.register(props.uid, event.target.value)
    }

    return (
        <div className='dropdown-wrapper container'>
            <Label 
                for={props.uid}
                label={props.label}
                isRequired={props.isRequired}
            />
            <select className="dropdown-select form-field" value={value} name={props.uid} id={props.uid} >
                {
                    props.value?.map((currentValue) => {
                        return (
                            <option key={currentValue} value={currentValue} onClick={updateValue}>{currentValue}</option>
                        )
                    })
                }
            </select>
        </div>
    )

};

export default Dropdown;