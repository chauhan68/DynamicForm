import React from "react";

import Checkbox from "../Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import Group from "../Group/Group";
import Input from "../Input/Input";

const FormFields = (props) => {
    const renderData = (currentElement) => {
        const { data_type, label, value, uid, _metadata = {} } = currentElement;

        const hasError = (id) => {   
            const keys = id.split('.');
            const updatedObject = structuredClone(props.errors);
            let referenceObject = updatedObject || {};
    
            let lastKey = ''
            keys.forEach((key, index) => {
                lastKey = key;
                if (index !== keys.length - 1) {
                    referenceObject[key] = referenceObject[key] ?? {};
                    referenceObject = referenceObject[key]
                } 
            })
            return Boolean(referenceObject[lastKey]);
        }

        if (_metadata.hide) {
            return null
        } else if (data_type === 'group') {
            return (
                <Group
                    key={uid}
                    id={uid}
                    data={value}
                    register={props.register}
                    errors={props.errors}
                />)
        } else if (data_type === 'boolean') {
            return (
                <Checkbox
                    value={value}
                    uid={uid}
                    label={label}
                    isRequired={_metadata.required}
                    register={props.register}
                    errors={hasError(uid)}
                />)
        } else if (data_type === 'dropdown') {
            return (
                <Dropdown
                    value={value}
                    uid={uid}
                    label={label}
                    isRequired={_metadata.required}
                    register={props.register}
                    errors={hasError(uid)}
                />)
        }
        return (
            <Input
                key={uid}
                type={data_type}
                label={label}
                value={value}
                uid={uid}
                isRequired={_metadata.required}
                register={props.register}
                errors={hasError(uid)}
                validationPattern={_metadata.regex}
            />
        );
    }

    return (
        renderData(props.currentElement)
    )
};

export default FormFields;