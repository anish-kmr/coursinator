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
import Hamburger from 'hamburger-react'

import AppContext from 'contexts/AppContext';
import Search from 'components/Search';
import './header.css'
 

const ProfileAvatar = ({name,profile_picture,color,items}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClickCallback = fun=>{
    fun();
    handleClose();
  }

  return (
    <div className="profile_icon">
      {
        profile_picture?
        <img className="profile_picture"  src={profile_picture} onClick={handleClick} />:
        <Avatar 
          style={{
            fontSize:'2rem',
            backgroundColor:color,
          }} 
          aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
        >
          {name && name.charAt(0).toUpperCase()}
        </Avatar>
      }

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
            onClick={()=>{onClickCallback(item.clickHandler)}} 
          >
            <div className="menu_item" >
              <span className="menu_item_icon"> {item.icon} </span>
              <span className="menu_item_text"> {item.text} </span>
            </div>
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}

const Header = () => {
  let { loggedIn, setLoggedIn, navOpen, setNavOpen } = useContext(AppContext);
  const history = useHistory();
  let [user,setUser] = useState({});



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
      <div className="ham">
      {
        loggedIn && 
          <Hamburger toggled={navOpen} className="ham_icon" toggle={setNavOpen} color={navOpen?"white":"#2e2e2e"} />
          
        }
        </div>
        <div className="nav_container">

        
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
                    profile_picture={user.profile_picture}
                    items={[
                      {
                        text:"Profile",
                        icon:<PersonIcon fontSize="large" color="primary" />,
                        clickHandler:()=>{history.push('/profile')},
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
      
    </div>
  )
}
 
export default Header