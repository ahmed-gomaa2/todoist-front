import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {deleteTask, editTask, changeCategory} from "../../../../../store/actions/tasks.actions";
import CreateTask from "../../../../CreateTask/CreateTask";
import inputChangeHandlerHelper from "../../../../../utls/input.change.handler";
import {useParams} from "react-router-dom";
import './Task.css';

const Task = props => {
    const [dropdown, setDropdown] = useState(false);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        title: {
            validation: {
                required: true
            },
            value: props.t.title,
            valid: false,
            touched: false
        },
        desc: {
            validation: {
                required: true,
            },
            value: props.t.text,
            valid: false,
            touched: false
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const params = useParams();

    const dropdownRef = useRef();

    useEffect(() => {
        if(dropdownRef.current){
            const elRect = dropdownRef.current.getBoundingClientRect();
            console.log(window.innerHeight - elRect.bottom);
            const fromBottom = window.innerHeight - elRect.bottom;
            if(fromBottom < 0) {
                dropdownRef.current.style.transform = `translateY(-${Math.abs(fromBottom)}px)`
            }else {
                dropdownRef.current.style.transform = 'none';
            }
        }
    }, [dropdown]);

    const closeForm = () => {
        setEditing(false);
    }

    const formChangeHandler = e => {
        console.log(inputChangeHandlerHelper);
        const {formIsValid, updatedFormData} = inputChangeHandlerHelper(e, form, 'CreateTask__form-input');
        setForm(updatedFormData);
        setFormIsValid(true);
    }

    const formSubmitHandler = (e, getDayDate) => {
        e.preventDefault();
        const data = {
            id: props.t.id,
            title: form.title.value,
            text: form.desc.value,
            day: getDayDate().dayName,
            project: !!params.id,
            project_id: params.id ? +params.id : null,
            category: props.category
        }

        props.editTask(data);

        setEditing(false);
    }

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = (e, position) => {
        e.target.style.opacity ='1';
        dragItem.current = e.target;
        dragItem.current.classList.add('Task__dragged');
        e.dataTransfer.effectAllowed = "copy";

    }

    const onDragEnd = e => {
        dragItem.current.classList.remove('Task__dragged');
        if(props.t.category === props.changedCategory && props.changedCategory) return;
        props.changeCategory(props.t, props.changedCategory);
    }

    return (
        <div
            draggable
            onDragStart={e => dragStart(e, props.t)}
            onTouchStart={e => dragStart(e, props.t)}
            onTouchEnd={e => onDragEnd(e)}
            onDragEnd={e => onDragEnd(e)}
            key={props.t.id}
            className={`Task ${props.t.category === 'completed' ? 'Task__completed' : null} ${props.t.category === 'inProgress' ? 'Task__inProgress' : null}`}>
            {editing ? (
                <CreateTask formIsValid={formIsValid} formSubmitHandler={formSubmitHandler} formChangeHandler={formChangeHandler} setFormIsValid={setFormIsValid} setForm={setForm} form={form} closeForm={closeForm} category={props.t.category} date={new Date()} />
            ) : (
                <>
                    <div className="Task__header">
                        <p>{props.t.title}</p>
                        <div className="Task__dots-container">
                            <div onClick={e => setDropdown(!dropdown)} className="Task__dots">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div onClick={e => setDropdown(false)} className={`Task__dropdown-overlay ${dropdown ? 'Task__dropdown-open' : null}`}></div>
                            <div ref={dropdownRef} className={`Task__dropdown ${dropdown ? 'Task__dropdown-open' : null}`}>
                                <div className="Task__dropdown-links">
                                    <ul className="Task__dropdown-items">
                                        <li
                                            onClick={e => {
                                                setDropdown(false);
                                                setEditing(true);
                                            }}
                                            className="Task__dropdown-item Task__dropdown-edit"
                                        >
                                            <i className="fa-solid fa-pen"></i>
                                            <p>edit</p>
                                        </li>
                                        <li
                                            onClick={e => {
                                                setDropdown(false)
                                                props.deleteTask(props.t.id)
                                            }}
                                            className="Task__dropdown-item Task__dropdown-delete">
                                            <i className="fa-regular fa-trash-can"></i>
                                            <p>Delete task</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Task__body">{props.t.text}</div>
                </>
            )}
        </div>
    );
};

export default connect(null, {deleteTask, editTask, changeCategory}) (Task);