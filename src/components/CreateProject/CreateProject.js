import React, {useState} from 'react';
import './CreateProject.css';
import {connect} from "react-redux";
import {toggleCreateProject} from "../../store/actions/ui.actions";
import {createProject} from "../../store/actions/tasks.actions";
import {useNavigate} from "react-router-dom";
import inputChangeHandlerHelper from "../../utls/input.change.handler";
import EditProject from "../EditProject/EditProject";

const CreateProject = props => {
    const [form, setForm] = useState({
        name: {
            validation: {
                required: true,
                maxLength: 15
            },
            value: '',
            valid: false,
            touched: false
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const navigate = useNavigate();

    const nameChangeHandler = e => {
        const {formIsValid, updatedFormData} = inputChangeHandlerHelper(e, form, 'CreateProject__form-input');
        setForm(updatedFormData);
        setFormIsValid(formIsValid);
    }

    const formSubmitHandler = e => {
        e.preventDefault();
        const projectData = {
            name: form.name.value
        }

        props.createProject(projectData, navigate);

        setForm({
            name: {
                validation: {
                    required: true,
                    maxLength: 15
                },
                value: '',
                valid: false,
                touched: false
            }
        });

        setFormIsValid(false);

        props.toggleCreateProject();
    }
    return (
        <div className={`CreateProject ${props.toggleCreateProjectModel && 'CreateProject__active'}`}>
            <div onClick={props.toggleCreateProject} className="CreateProject__overlay"></div>
            <div className="CreateProject__container">
                <div className="CreateProject__header">
                    <p>Add Project</p>
                </div>
                <form onChange={e => nameChangeHandler(e)} onSubmit={e => formSubmitHandler(e)} className="CreateProject__form">
                    <div className="CreateProject__form-item">
                        <label htmlFor="" className="CreateProject__form-label">Name</label>
                        <input data-key={'name'} type="text" value={form.name.value} placeholder={'Project Name'} className="CreateProject__form-input"/>
                    </div>
                    <div className="CreateProject__form-buttons">
                        <div></div>
                        <div>
                            <button type={'reset'} onClick={e => {
                                e.preventDefault();
                                props.toggleCreateProject();
                            }} className="CreateProject__cancel">cancel</button>
                            <button disabled={!formIsValid} type={"submit"} className="CreateProject__submit">create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        toggleCreateProjectModel: state.ui.toggleCreateProjectModel
    }
}

export default connect(mapStateToProps, {toggleCreateProject, createProject}) (CreateProject);