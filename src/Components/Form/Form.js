import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";

import EmptyForm from '../EmptyForm/EmptyForm';
import FormFields from '../FormFields/FormFields';

import './form.css';

const Form = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData, updateFormData] = useState(props.form);

    const onSubmit = (data) => {
        console.log('Data entered is', data);
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

    const renderForm = (currentElement, index) => {
        const { uid } = currentElement;

        return (
            <Draggable key={uid} draggableId={uid} index={index} isDragDisabled={formData.length === 1}>
                {(provided) => (
                    <div key={uid} className="field-container">
                        {formData.length > 1 && (
                            <span
                                className="reorder-icon"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                &#9776;
                            </span>
                        )}
                        <FormFields currentElement={currentElement} register={register} errors={errors} />
                    </div>
                )}
            </Draggable>
        )
    }

    const renderComponents = () => {
        if (!Array.isArray(formData) || formData.length === 0) {
            return <EmptyForm />;
        }
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId="droppable"
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {formData.map(renderForm)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <button type='submit'>Submit</button>
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
