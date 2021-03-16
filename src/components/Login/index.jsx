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

import { store } from 'react-notifications-component';

import AppContext from 'contexts/AppContext';
import Signin from 'components/Signin';
import './login.css'
import axios from 'axios';
 
import endpoints from 'endpoints.json'

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
  
  let {loggedIn,setLoggedIn, notificationOptions} = useContext(AppContext);
  let [isPasswordVisible,setPasswordVisibility] = useState(false)
  let [form, setFormValues] = useState({
    email:'',
    password:'',
  })
  let [open,setOpen] = useState(false)
  const togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible);
  const  validateEmail = mail => !( mail==="" || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  const  validatePassword = pwd => ( pwd.length>0 && pwd.length<6)
  const validateForm = ()=>{
    let title='', message=''
    if(form.password.length==0 || form.email.length==0){
      title = "Fields Blank!"
      message = "Please Fill all the fields to Login"
    }
    else if(validateEmail(form.email)) {
        title = "Email not valid"
        message = "Specified Email Format is incorrect"
    }
    else if(validatePassword(form.password)){
        title = "Password not valid"
        message = "Password Must be at least 6 characters"
    }
    else return true
    store.addNotification({...notificationOptions,title,message,type:"danger"})
    return false
  }
  const loginUser = ()=>{
    console.log("form",form)
    if(!validateForm()) return false
    return axios.post(endpoints.login,form)
          .then(res=>{
            console.log("res ",res)
            if(!res.data.signedIn){
              store.addNotification({
                ...notificationOptions,
                title: "Login Failed!!!",
                message: res.data.err,
                type: "danger",
                
              });
            }
            else{
              let user = {...res.data.user}
              localStorage.setItem('user',JSON.stringify(user))
              setLoggedIn(!loggedIn);
              history.push('/dashboard')
            }
          })
          .catch(err=>{
            console.log("login err",err)
          })
  }
  const openSignUp  = ()=> setOpen(true)

  const handleFormChange = (prop) => (event) => {
    setFormValues({ ...form, [prop]: event.target.value });
  };

  return (
    <Card className={`${classes.root} login_card`}>
      <h2 className="login_card_heading">Login Now</h2>
      <CardContent>
        <div className="form_input">
            <EmailIcon className="input_icon input_icon_left" />
            <input 
              type="email" 
              value={form.email} 
              onChange={handleFormChange("email")}
              placeholder="Email"
            />
        </div>
        <div className="form_input">
            <VpnKeyIcon className="input_icon input_icon_left"/>
            <input 
              type={isPasswordVisible?"text":"password"} 
              value={form.password}
              onChange={handleFormChange("password")}
              placeholder="Password"
            />
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