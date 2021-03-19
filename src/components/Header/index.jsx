import React,{useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom';

import {
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core';


import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AppContext from 'contexts/AppContext';
import Search from 'components/Search';
import './header.css'
 

const ProfileAvatar = ({name,color,items}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar 
        style={{
          fontSize:'2rem',
          backgroundColor:color,
        }} 
        aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
      >
        {name && name.charAt(0).toUpperCase()}
      </Avatar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       { items.map(item => 
          <MenuItem 
            onClick={item.clickHandler} 
          >
            <div className="menu_item" >
              <span className="menu_item_icon"> {item.icon} </span>
              <span className="menu_item_text"> {item.text} </span>
            </div>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

const Header = () => {
  let { loggedIn, setLoggedIn } = useContext(AppContext);
  const history = useHistory();
  let [user,setUser] = useState({})

  const logout = ()=>{
    localStorage.removeItem('user')
    setLoggedIn(false)
    history.push('/')
  }

  useEffect(()=>{
    console.log("loggedin changed",loggedIn)
     if(loggedIn) {
       let u=JSON.parse(localStorage.getItem('user'))
       console.log("usesr ",u)
      setUser(u)
     }
  },[loggedIn])

  return (
    <div className="header">
        <div className="search_container">
            <Search/>
        </div> 
        <div className="header_nav">
            <div className="logout" >
              {
                loggedIn ?
                <ProfileAvatar 
                  name={user.name}
                  color={user.color}
                  items={[
                    {
                      text:"Profile",
                      icon:<PersonIcon fontSize="large" color="primary" />,
                      clickHandler:()=>{},
                    },
                    {
                      text:"Settings",
                      icon:<SettingsIcon fontSize="large" color="primary" />,
                      clickHandler:()=>{},
                    },
                    {
                      text:"Logout",
                      icon:<ExitToAppIcon fontSize="large" color="primary" />,
                      clickHandler:logout,
                    },                    
                  ]}  
                />:
                'Login'
              }
            </div>
        </div>
      
    </div>
  )
}
 
export default Header