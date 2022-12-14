import React from "react";

import Checkbox from "../Checkbox/Checkbox";
import Dropdown from "../Dropdown/Dropdown";
import Group from "../Group/Group";
import Input from "../Input/Input";

const FormFields = (props) => {
    const renderData = (currentElement) => {
        const { data_type, label, value, uid, _metadata = {} } = currentElement;
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
                    errors={props.errors}
                />)
        } else if (data_type === 'dropdown') {
            return (
                <Dropdown
                    value={value}
                    uid={uid}
                    label={label}
                    isRequired={_metadata.required}
                    register={props.register}
                    errors={props.errors}
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
                errors={props.errors}
                validationPattern={_metadata.regex}
            />
        );
    }

    return (
        renderData(props.currentElement)
    )
};

export default FormFields;