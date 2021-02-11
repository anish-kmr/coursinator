import React from 'react'
import Search from 'components/Search';
import './header.css'
 
const Header = () => {
  return (
    <div className="header">
        <div className="search_container">
            <Search/>
        </div> 
        <div className="header_nav">
            <div className="Login"> Login</div>
        </div>
      
    </div>
  )
}
 
export default Header