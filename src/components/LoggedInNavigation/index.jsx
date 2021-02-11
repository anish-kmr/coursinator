import React from 'react'
import { NavLink } from 'react-router-dom'; 


import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import SubjectIcon from '@material-ui/icons/Subject';
import TimerIcon from '@material-ui/icons/Timer';
import './loggedin_navigation.css'
 
const LoggedInNavigation = () => {
  return (
    <div className="l_nav_container" >
        <div className="l_logo_container">
            <img src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-vertical.svg"/>
        </div>
        
        <div className="l_nav_list">

            <NavLink exact to='/dashboard' activeClassName="l_nav_item_selected" className="l_nav_item" >
                <DashboardIcon className="l_icon" />
                <div className="l_nav_text">Dashboard</div>
            </NavLink>

            <NavLink exact to="/courses" activeClassName="l_nav_item_selected" className="l_nav_item" >
              <LocalLibraryIcon className="l_icon" />
              <div className="l_nav_text">Courses</div>
            </NavLink>

            <NavLink exact to="/topics" activeClassName="l_nav_item_selected" className="l_nav_item" >
              <SubjectIcon className="l_icon" />
              <div className="l_nav_text">Topics</div>
            </NavLink>

            <NavLink exact to="/exams" activeClassName="l_nav_item_selected" className="l_nav_item" >
              <TimerIcon className="l_icon" />
              <div className="l_nav_text">Exams</div>
            </NavLink>

        </div>

    </div>
  )
}
 
export default LoggedInNavigation