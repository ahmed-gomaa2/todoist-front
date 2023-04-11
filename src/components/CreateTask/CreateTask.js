import React, {useState} from 'react';
import './CreateTask.css';
import moment from "moment";
import {connect} from "react-redux";
import {toggleCreateTask} from "../../store/actions/ui.actions";
import {createNewTask} from "../../store/actions/tasks.actions";
import {useParams} from "react-router-dom";
import inputChangeHandlerHelper from '../../utls/input.change.handler';
import SpinnerSmall from "../UI/SpinnerSmall/SpinnerSmall";

const CreateTask = props => {
    // const [form, setForm] = useState({
    //     title: {
    //         validation: {
    //             required: true
    //         },
    //         value: '',
    //         valid: false,
    //         touched: false
    //     },
    //     desc: {
    //         validation: {
    //             required: true,
    //         },
    //         value: '',
    //         valid: false,
    //         touched: false
    //     }
    // });
    // const [formIsValid, setFormIsValid] = useState(false);

    const params = useParams();

    const getDayDate = () => {
        const day = new Date(props.date);
        const dayInWeekNumber = new Date(props.date).getDay();
        const weekDays = new Array(7);
        weekDays[0] = 'Sunday';
        weekDays[1] = 'Monday';
        weekDays[2] = 'Tuesday';
        weekDays[3] = 'Wednesday';
        weekDays[4] = 'Thursday';
        weekDays[5] = 'Friday';
        weekDays[6] = 'Saturday';

        const dayInWeekName = weekDays[dayInWeekNumber];

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthName = monthNames[day.getMonth()]
        return {
            dayName: dayInWeekName,
            monthName: monthName.substring(0, 3),
            dayInWeekNumber: day.getDate()
        };
    }

    // const formChangeHandler = e => {
    //     // const input = e.target.closest('.CreateTask__form-input');
    //     // console.log(e.target)
    //     // if(!input) return;
    //     // const formDataCopy = {...formData};
    //     // formDataCopy[input.name] = e.target.value;
    //     //
    //     // setFormData(formDataCopy);
    //     console.log(inputChangeHandlerHelper);
    //     const {formIsValid, updatedFormData} = inputChangeHandlerHelper(e, props.form, 'CreateTask__form-input');
    //     props.setForm(updatedFormData);
    //     props.setFormIsValid(formIsValid);
    // }

    // const formSubmitHandler = e => {
    //     e.preventDefault();
    //     const data = {
    //         title: props.form.title.value,
    //         text: props.form.desc.value,
    //         day: getDayDate().dayName,
    //         project: !!params.id,
    //         project_id: params.id ? +params.id : null,
    //         category: props.category
    //     }
    //
    //     props.createNewTask(data);
    //
    //     props.setForm({
    //         title: '',
    //         desc: ''
    //     });
    //
    //     props.toggleCreateTask(props.category);
    // }


    return (
        <div className={'CreateTask'}>
            <div className="CreateTask__container">
                <div className="CreateTask__header">
                    <div className="CreateTask__date">
                        <p>{getDayDate().monthName} {getDayDate().dayInWeekNumber} {getDayDate().dayName}</p>
                    </div>
                </div>
                <form onSubmit={async e => {
                    await props.formSubmitHandler(e, getDayDate)
                }} onChange={e => props.formChangeHandler(e)} className="CreateTask__form">
                    <div className="CreateTask__form-item">
                        <input data-key={'title'} value={props.form.title.value} name={'title'} placeholder={'Title'} type="text" className="CreateTask__form-input"/>
                    </div>

                    <div className="CreateTask__form-item">
                        <textarea data-key={'desc'} value={props.form.desc.value} name={'desc'} placeholder={'Description'} className="CreateTask__form-input"/>
                    </div>

                    <div className="CreateTask__form-buttons">
                        <div></div>
                        <div>
                            <button type={'reset'} onClick={e => {
                                e.preventDefault();
                                props.closeForm();
                            }} className="CreateTask__form-cancel">cancel</button>
                            <button disabled={!props.formIsValid} type={'submit'} className="CreateTask__form-submit">submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

const mapStateToProps = state => {
    return {
        currentPage: state.tasks.currentPage,
        currentProject: state.tasks.currentProject
    }
}

export default connect(mapStateToProps, {createNewTask}) (CreateTask);