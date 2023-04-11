import React, {useState} from 'react';
import './EditProject.css';
import {useNavigate} from "react-router-dom";
import inputChangeHandlerHelper from "../../utls/input.change.handler";
import {editProject} from "../../store/actions/tasks.actions";
import {connect} from "react-redux";

const EditProject = props => {
    const [form, setForm] = useState({
        name: {
            validation: {
                required: true,
                maxLength: 15
            },
            value: props.project.name,
            valid: false,
            touched: false
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const navigate = useNavigate();

    const nameChangeHandler = e => {
        const {formIsValid, updatedFormData} = inputChangeHandlerHelper(e, form, 'EditProject__form-input');
        setForm(updatedFormData);
        setFormIsValid(formIsValid);
    }

    const formSubmitHandler = e => {
        e.preventDefault();
        const projectData = {
            id: props.project.id,
            name: form.name.value
        }

        props.editProject(projectData);
        props.setEditing(false);
        props.setDropdown(false);
    }

    return (
        <div onClick={e => {
            e.preventDefault();
            e.stopPropagation();
        }} className={`EditProject ${props.editing ? 'EditProject__open' : null}`}>
            <div onClick={e => props.setEditing(false)} className={`EditProject__overlay ${props.editing ? 'EditProject__open' : null}`}></div>
            <div className="EditProject__container">
                <div className="EditProject__header">
                    <p>Add Project</p>
                </div>
                <form onChange={e => nameChangeHandler(e)} onSubmit={e => formSubmitHandler(e)} className="EditProject__form">
                    <div className="EditProject__form-item">
                        <label htmlFor="" className="EditProject__form-label">Name</label>
                        <input data-key={'name'} type="text" value={form.name.value} placeholder={'Project Name'} className="EditProject__form-input"/>
                    </div>
                    <div className="EditProject__form-buttons">
                        <div></div>
                        <div>
                            <button type={'reset'} onClick={e => {
                                e.preventDefault();
                                props.setEditing(false);
                            }} className="EditProject__cancel">cancel</button>
                            <button onClick={e => {
                                // e.preventDefault();
                                e.stopPropagation();
                            }} disabled={!formIsValid} type={"submit"} className="EditProject__submit">create</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default connect(null, {editProject}) (EditProject);