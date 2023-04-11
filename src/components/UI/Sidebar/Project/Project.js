import React, {useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import './Project.css';
import {connect} from "react-redux";
import {deleteProject} from "../../../../store/actions/tasks.actions";
import EditProject from "../../../EditProject/EditProject";

const Project = props => {
    const [dropdown, setDropdown] = useState(false);
    const [editing, setEditing] = useState(false)

    const dropdownRef = useRef();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const refRect = dropdownRef.current.getBoundingClientRect();
        const fromBottom = window.innerHeight - refRect.bottom;

        if(fromBottom < 0 ) {
            dropdownRef.current.style.transform = `translateY(${fromBottom}px`;
        }else {
            dropdownRef.current.style.transform = 'none';
        }
    }, [dropdown]);

    return (
        <li key={props.p.id} className="Sidebar__project">
            <span></span>
            <NavLink className={navData => navData.isActive ? 'Sidebar__link-active' : null} to={`/dashboard/projects/${props.p.id}`}>
                {props.p.name}
                <div className={`Sidebar__project-dots--container ${dropdown ? 'Sidebar__project-dropdown--active' : null}`}>
                    <div onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDropdown(true);
                    }} className="Sidebar__project-dots">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div onMouseEnter={e => e.stopPropagation()} onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDropdown(false)
                    }} className={`Sidebar__project-overlay ${dropdown ? 'Sidebar__project-dropdown--active' : null}`}></div>
                    <div ref={dropdownRef} className={`Sidebar__project-dropdown ${dropdown ? 'Sidebar__project-dropdown--active' : null}`}>
                        <div className="Sidebar__project-dropdown--container">
                            <div onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setEditing(true);
                                // setDropdown(false);
                            }} className="Sidebar__project-dropdown--item Sidebar__project-dropdown--edit">
                                <i className="fa-solid fa-pen"></i>
                                <p>Edit</p>
                            </div>
                            <div onClick={e => {
                                // e.stopPropagation();
                                const isProject = !params.id;
                                setDropdown(false);
                                props.deleteProject(props.p.id, navigate, isProject)
                            }} className="Sidebar__project-dropdown--item Sidebar__project-dropdown-delete">
                                <i className="fa-solid fa-trash"></i>
                                <p>Delete</p>
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
            <EditProject setDropdown={setDropdown} project={props.p} editing={editing} setEditing={setEditing} />
        </li>
    );
};

export default connect(null, {deleteProject}) (Project);