import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Virtuoso } from 'react-virtuoso'

import EmptyForm from '../EmptyForm/EmptyForm';
import FormFields from '../FormFields/FormFields';

import './form.css';

// Virtuoso's resize observer can get this error,
// which is caught by DnD and aborts dragging.
window.addEventListener('error', (e) => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || e.message === 'ResizeObserver loop limit exceeded') {
        e.stopImmediatePropagation()
    }
})

let current = {};

const Form = (props) => {
    const [formData, updateFormData] = useState(props.form);
    const [errorData, updateErrorData] = useState({});

    useEffect(() => {
        const updateObject = (formDataArray, currentObject) => {
            formDataArray.forEach((element) => {
                const { data_type, value, uid, _metadata = {} } = element;
                if (data_type === 'group') {
                    currentObject[uid] = currentObject[uid] || {};
                    currentObject[uid].data_type = 'group';
                    updateObject(value, currentObject[uid]);
                } else {
                    currentObject[uid] = currentObject[uid] || {};
                    currentObject[uid].value = value;
                    currentObject[uid].required = Boolean(_metadata.required);
                    currentObject[uid].pattern = new RegExp(_metadata.pattern ?? '.*');
                }
            })
        }

        updateObject(formData, current);
    }, [formData]);

    const register = (id, value) => {   
        const keys = id.split('.');
        const updatedObject = structuredClone(current);
        let referenceObject = updatedObject;
        let errorObject = structuredClone(errorData);
        let errorReferenceObject = errorObject;

        let lastKey = ''

        keys.forEach((key, index) => {
            referenceObject[key] = referenceObject[key] || {};
            lastKey = key;
            if (index !== keys.length - 1) {
                errorReferenceObject = errorReferenceObject[key]
                referenceObject = referenceObject[key]
            }

        })
        referenceObject[lastKey].value = value;
        if (referenceObject[lastKey].error) {
            const isValid = referenceObject[lastKey].pattern.test(value);
            const hasMinLength = referenceObject[lastKey].required ? value.length > 0 : true; 
            referenceObject[lastKey].error = !isValid && hasMinLength;
            errorReferenceObject[lastKey] = referenceObject[lastKey].error;
        }
        current = updatedObject;
        return Boolean(referenceObject[lastKey].error);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const submittedObject = {};
        const errorObject = {};
        let hasError = false;
        const validateObject = (objectToValidate, finalObject, errorObject) => {
            Object.entries(objectToValidate).forEach(([key, objectValue]) => {
                if (key === 'data_type') {
                    return
                }
                if (objectValue.data_type === 'group') {
                    finalObject[key] = finalObject[key] || {};
                    errorObject[key] = errorObject[key] || {};
                    validateObject(objectValue, finalObject[key], errorObject[key]);
                } else {
                    const isValid = objectValue.pattern.test(objectValue.value);
                    const hasMinLength = objectValue.required ? objectValue.value.length > 0 : true; 
                    objectValue.error = !isValid || !hasMinLength;
                    finalObject[key] = objectValue.value;
                    errorObject[key] = objectValue.error;
                    hasError = hasError || objectValue.error;
                }
            })
        };

        validateObject(current, submittedObject, errorObject);
        if (hasError) {
            alert('This forms has errors');
        } else {
            console.log('Data entered is:', submittedObject);
        }
        console.log('Error Object', errorObject);
        updateErrorData(errorObject);
    }

    const updateOrder = (startIndex, endIndex) => {
        const clonedData = [...formData];
        const [removed] = clonedData.splice(startIndex, 1);
        clonedData.splice(endIndex, 0, removed);

        return clonedData;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const newOrderedFormData = updateOrder(
            result.source.index,
            result.destination.index
        );

        updateFormData(newOrderedFormData);
    };

    const renderForm = (index) => {
        const { uid } = formData[index];
        return (
            <Draggable key={`${uid}-${index}`} draggableId={`${uid}-${index}`} index={index} isDragDisabled={formData.length === 1}>
                {(provided) => {
                    return (
                        <div className="field-container" key={`${uid}-${index}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                        >
                            {formData.length > 1 && (
                                <span
                                    className="reorder-icon"
                                >
                                    &#9776;
                                </span>
                            )}
                            <FormFields currentElement={formData[index]} register={register} errors={errorData} />
                        </div>
                    )
                }
                }
            </Draggable>
        )
    }

    const HeightPreservingItem = ({ children, ...props }) => {
        if (props.item.data_type === 'group') {
            return (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )
        }
        const knownSize = props['data-known-size']
        return (
            <div
                {...props}
                className="height-preserving-container"
                style={{ '--child-height': `${knownSize}px`, }}
            >
                {children}
            </div>
        )
    }
    const renderComponents = () => {
        if (!Array.isArray(formData) || formData.length === 0) {
            return <EmptyForm />;
        }

        return (
            <form onSubmit={onSubmit}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId="droppable"
                        mode="virtual"
                        renderClone={(provided, _snapshot, rubric) => (
                            <div
                                className="drop-shadow"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <div className="field-container" key={`${rubric.source.index}`}>
                                    {formData.length > 1 && (
                                        <span
                                            className="reorder-icon"
                                        >
                                            &#9776;
                                        </span>
                                    )}
                                    <FormFields currentElement={formData[rubric.source.index]} register={register} errors={errorData} />
                                </div>
                            </div>
                        )}
                    >
                        {(provided) => (
                            <Virtuoso
                                components={{
                                    Item: HeightPreservingItem,
                                }}
                                className="droppable-container"
                                scrollerRef={provided.innerRef}
                                data={formData}
                                totalCount={formData.length}
                                itemContent={renderForm}
                                {...provided.droppableProps}
                            />
                        )}
                    </Droppable>
                </DragDropContext>
                <button type='submit' onSubmit={onSubmit}>Submit</button>
            </form >
        );
    };

    return (
        <div className="main-wrapper">
            {renderComponents()}
        </div>
    );
};

export default Form;
