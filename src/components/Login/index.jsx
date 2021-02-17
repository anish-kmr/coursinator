import React,{ useState, useContext } from 'react'
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Button,
  Card,
  CardActions,
  CardContent
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import AppContext from 'contexts/AppContext';
import Signin from 'components/Signin';
import './login.css'
 
const useStyles = makeStyles({
  root:{
    padding:'1rem 0.5rem ',
  },
  card_controls:{
    display:'block'
  }
})



const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  
  let {loggedIn,setLoggedIn} = useContext(AppContext);
  let [isPasswordVisible,setPasswordVisibility] = useState(false)
  let [open,setOpen] = useState(false)
  const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);
  const loginUser = ()=>{
    setLoggedIn(!loggedIn);
    history.push('/dashboard')
  }
  const openSignUp  = ()=> setOpen(true)

  return (
    <Card className={`${classes.root} login_card`}>
      <h2 className="login_card_heading">Login Now</h2>
      <CardContent>
        <div className="form_input">
            <EmailIcon className="input_icon input_icon_left" />
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

      </CardContent>
      <CardActions className={classes.card_controls} >
              <Button 
                  className="btn"
                  variant="contained"
                  color="primary"
                  onClick={loginUser}
              >
                  Log In
              </Button>
              <div className="signup_link"  onClick={openSignUp}> Don't have an account? Create Now! </div>
              <Signin open={open} setOpen={setOpen} />

      </CardActions>
      {/* <div className="form"> */}
        
      {/* </div> */}

    </Card>
  )
}
 
export default Login