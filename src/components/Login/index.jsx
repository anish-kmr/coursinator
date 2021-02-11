import React,{ useState, useContext } from 'react'
import {useHistory} from 'react-router-dom';

import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import AppContext from 'contexts/AppContext';
import './login.css'
 
const Login = () => {
  const history = useHistory();
  let {loggedIn,setLoggedIn} = useContext(AppContext);
  let [isPasswordVisible,setPasswordVisibility] = useState(false)
  const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);
  const loginUser = ()=>{
    setLoggedIn(!loggedIn);
    history.push('/dashboard')
  }
  return (
    <div className="login_card">
      <h2 className="login_card_heading">Login Now</h2>
      <div className="form">
        
        <div className="form_input">
            <PersonIcon className="input_icon input_icon_left" />
            <input type="email" placeholder="Email"/>
        </div>
        <div className="form_input">
            <VpnKeyIcon className="input_icon input_icon_left"/>
            <input type={isPasswordVisible?"text":"password"} placeholder="Password"/>
            <>
              {
                isPasswordVisible ?
                <VisibilityIcon className="input_icon input_icon_right " onClick={togglePasswordVisibility}/>:
                <VisibilityOffIcon className="input_icon input_icon_right " onClick={togglePasswordVisibility} />
              }
            </>
        </div>
        <Button 
            className="btn"
            variant="contained"
            color="primary"
            onClick={loginUser}
        >
            Log In
        </Button>

      </div>

    </div>
  )
}
 
export default Login