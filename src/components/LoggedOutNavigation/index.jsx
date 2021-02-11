import React from 'react';
import { NavLink } from 'react-router-dom'; 

import Login from 'components/Login'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SubjectIcon from '@material-ui/icons/Subject';
import './loggedout_navigation.css';
import TimerIcon from '@material-ui/icons/Timer';

const LoggedOutNavigation = () => {
    return (
        <div className="nav_container" >
            <div className="l_block">
                <div className="logo_container">
                    <img src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-vertical.svg"/>
                </div>
                
                <Login/>
            </div>
            
            <div className="nav_list">

                <NavLink to="/courses" activeClassName="nav_item_selected" className="nav_item" >
                    <LocalLibraryIcon className="icon" />
                    <div className="nav_text">Courses</div>
                </NavLink>

                <NavLink to="/topics" activeClassName="nav_item_selected" className="nav_item" >
                    <SubjectIcon className="icon" />
                    <div className="nav_text">Topics</div>
                </NavLink>

                <NavLink to="/exams" activeClassName="nav_item_selected" className="nav_item" >
                    <TimerIcon className="icon" />
                    <div className="nav_text">Exams</div>
                </NavLink>

            </div>

        </div>
    )
}

export default LoggedOutNavigation;