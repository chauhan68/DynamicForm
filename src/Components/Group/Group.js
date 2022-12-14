import React, { useState } from "react";
import FormFields from "../FormFields/FormFields";

import './group.css';

const Group = (props) => {
    const [isOpened, toggleOpen] = useState(false)

    const toggleButton = () => {
        toggleOpen((lastOpenedState) => !lastOpenedState);
    }

    const renderData = (currentElement) => {
        const clonedData = JSON.parse(JSON.stringify(currentElement));
        clonedData.uid = `${props.id}-${currentElement.uid}`
        return (<FormFields key={clonedData.uid} currentElement={clonedData} register={props.register}/>)
    }

    return (
        <div className="group-container container">
            <div className={`group-accordian ${isOpened ? 'opened' : 'closed'}`}>
                <span>Group</span>
                <button className="accordian-button" type="button" onClick={toggleButton}>
                    {isOpened ? <React.Fragment>&#x25B2;</React.Fragment> : <React.Fragment>&#x25BC;</React.Fragment>}
                </button>
            </div>
            <div className={`group-fields-subcontainer ${isOpened ? 'show' : 'hide'}`}>
                {props.data.map(renderData)}
            </div>
        </div>
    )
};

export default Group;