import React,{useContext} from 'react'
import {useHistory} from 'react-router-dom';

import AppContext from 'contexts/AppContext';
import Search from 'components/Search';
import './header.css'
 
const Header = () => {
  let { loggedIn, setLoggedIn } = useContext(AppContext);
  const history = useHistory();

  const logout = ()=>{
    localStorage.removeItem('user')
    setLoggedIn(false)
    history.push('/')
  }

  return (
    <div className="header">
        <div className="search_container">
            <Search/>
        </div> 
        <div className="header_nav">
            <div className="logout" onClick={logout}>
              {
                loggedIn ?
                'Log Out':
                'Login'
              }
            </div>
        </div>
      
    </div>
  )
}
 
export default Header