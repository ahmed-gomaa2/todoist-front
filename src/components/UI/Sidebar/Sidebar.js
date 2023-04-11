import React, {useEffect, useState} from 'react';
import {Link, NavLink, useParams} from "react-router-dom";
import './Sidebar.css';
import {toggleSidebar, toggleCreateProject} from "../../../store/actions/ui.actions";
import {connect} from "react-redux";
import CreateProject from "../../CreateProject/CreateProject";
import {setCurrentProject} from "../../../store/actions/tasks.actions";
import Project from "./Project/Project";
import {logout} from "../../../store/actions/auth.actions";

const Sidebar = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const params = useParams();

    const linksClickHandler = e => {
        const link = e.target.closest('a');
        if(!link) return;
        // props.toggleSidebar();
    }

    const projectClickHandler = (e, p) => {
        // e.preventDefault();
        // props.setCurrentProject(p.id);
    }

    return (
        <div className={'Sidebar'}>
            <div className="Sidebar__container" onClick={e => linksClickHandler(e)}>
                <div className="Sidebar__header">
                    <Link to={'/dashboard/today'}>T</Link>
                    <div onClick={props.toggleSidebar} className="Sidebar__burger">
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="Sidebar__links">
                    <ul className="Sidebar__links-ul">
                        <li className="Sidebar__link">
                            <NavLink className={navData => navData.isActive ? 'Sidebar__link-active' : null} to={'/dashboard/today'}>
                                <i className="fa-solid fa-calendar-week"></i>
                                <p>Today</p>
                            </NavLink>
                        </li>
                        <li className="Sidebar__link">
                            <NavLink className={navData => navData.isActive ? 'Sidebar__link-active' : null} to={'/dashboard/upcoming'}>
                                <i className="fa-brands fa-weebly"></i>
                                <p>Upcoming</p>
                            </NavLink>
                        </li>
                        {/*<li className="Sidebar__link">*/}
                        {/*    <NavLink className={navData => navData.isActive ? 'Sidebar__link-active' : null} to={'/dashboard/calendar'}>*/}
                        {/*        <i className="fa-regular fa-calendar-days"></i>*/}
                        {/*        <p>Calendar</p>*/}
                        {/*    </NavLink>*/}
                        {/*</li>*/}
                        <li className={`Sidebar__link ${dropdown && 'Sidebar__link-dropdown'}`}>
                            <div className={'Sidebar__projects'}>
                                <div onClick={e => setDropdown(!dropdown)} className={'Sidebar__projects-header'}>
                                    <i className={`fa-solid fa-chevron-right ${dropdown && 'down'}`}></i>
                                    <p>Projects</p>
                                    <i onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        props.toggleCreateProject();
                                    }} className="add fa-solid fa-plus"></i>
                                </div>
                                <CreateProject />

                                <ul className={`Sidebar__projects-ul ${dropdown && 'Sidebar__projects-ul-active'}`}>
                                    {props.projects.map(p => (
                                        <Project p={p} />
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="Sidebar__footer">
                    <div className="Sidebar__footer-links">
                        <ul className="Sidebar__footer-container">
                            <li className="Sidebar__footer-link">
                                <NavLink to={'/dashboard/settings'} className={`Sidebar__footer-link`}>
                                    <i className="fa-solid fa-gear"></i>
                                    <p>Settings</p>
                                </NavLink></li>
                            <li onClick={e => props.logout()} className="Sidebar__footer-link">
                                <div className="Sidebar__footer-link">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <p>Logout</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        toggleCreateProjectModel: state.ui.toggleCreateProjectModel,
        projects: state.tasks.projects
    }
}

export default connect(mapStateToProps, {logout, toggleSidebar, toggleCreateProject, setCurrentProject}) (Sidebar);