import React, {useEffect} from 'react';
import './Dashboard.css';
import {Link, NavLink, Outlet, useNavigate, useParams} from "react-router-dom";
import Sidebar from "../../../components/UI/Sidebar/Sidebar";
import Toolbar from "../../../components/UI/Toolbar/Toolbar";
import {connect} from "react-redux";
import {toggleSidebar} from "../../../store/actions/ui.actions";
import {getAllTasks} from "../../../store/actions/tasks.actions";
import Spinner from "../../../components/UI/Spinner/Spinner";

const Dashboard = props => {
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const windowWidth = window.innerWidth;
        if(windowWidth <= 500) {
            props.toggleSidebar();
        }
    }, []);

    // useEffect(() => {
    //     if(!params.id) {
    //         props.getAllTasks();
    //     }else {
    //
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     console.log('hello', params.id, props.projects);
    //     if(params.id && props.projects.length > 0 && props.projects.filter(p => p.id == params.id).length > 0) {
    //         props.setCurrentProject(params.id);
    //         console.log('hee');
    //         console.log(params.id);
    //     }
    // }, []);
    return (
        <div className={'Dashboard'}>
            <div className={`Dashboard__container ${props.toggleSide ? 'Dashboard__sidebar-toggle' : null}`}>
                <Sidebar />
                <div className="Dashboard__body">
                    <div className={`Dashboard__body-container`}>
                        <Toolbar />
                        {props.gettingTasks ? (
                            <Spinner />
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        toggleSide: state.ui.toggleSidebar,
        projects: state.tasks.projects,
        gettingTasks: state.tasks.gettingTasks
    }
}

export default connect(mapStateToProps, {toggleSidebar, getAllTasks}) (Dashboard);