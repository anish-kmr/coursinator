import React,{ useState, useContext} from 'react'
import {useHistory} from 'react-router-dom';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    Select,
    MenuItem,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
    TextField
} from '@material-ui/core';



import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import { store } from 'react-notifications-component';
import AppContext from 'contexts/AppContext';


import endpoints from 'endpoints.json'
import axios from 'axios';

import './signin.css'

const useStyle = makeStyles({
    dialogContent:{padding:"3rem"},
    formControl: {marginBottom: '1.2rem'},
    formHelper:{fontSize:"1.2rem"},
    formSelect:{fontSize:'1.6rem'},
    formInput:{
        padding:"2rem",
        fontSize:'1.6rem',
    },
})

const Signin = ({open,setOpen}) => {
    const theme = useTheme();
    const history = useHistory();
    const classes = useStyle();
    const { loggedIn, setLoggedIn, notificationOptions } = useContext(AppContext);
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [form,setFormValues]=useState({
        fullname:'',
        email:'',
        role:'student',
        password:'',
        showPassword:false,
    })

    const  validateEmail = mail => !( mail==="" || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    const  validatePassword = pwd => ( pwd.length>0 && pwd.length<6)

    const validateForm = ()=>{
        let title='', message=''
        if(form.fullname.length==0 || form.email.length==0 || form.password.length==0){
            title = "All Fields are Mandatory"
            message = "Please Fill all the fields to Sign Up"
        }
        else if(form.fullname.length<3) {
            title = "Name not valid"
            message = "Name Must be at least 3 characters"
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
    const handleFormChange = (prop) => (event) => {
        setFormValues({ ...form, [prop]: event.target.value });
    };
    const handleClose = () =>setOpen(false);
    const createAccount = ()=>{
        if(!validateForm()) return false

        console.log('form ',form)
        let payload = {
            name:form.fullname,
            email:form.email,
            password:form.password,
            role:form.role
        }
        return axios.post(endpoints.signin,payload)
            .then(res=>{
                console.log(res)
                if(res.data.created){
                    let user = res.data.user
                    localStorage.setItem("user",JSON.stringify(user))
                    setLoggedIn(!loggedIn);
                    history.push('/dashboard')
                    
                }
                else {
                    store.addNotification({
                        ...notificationOptions,
                        title:"Sign Up Failed!!! ",
                        message:res.data.error,
                        type:'danger'
                    })
                }
            })
            .catch(err=>{
                console.log('err signing in',err)
                store.addNotification({
                    ...notificationOptions,
                    title:"Oops! Something went wrong. ",
                    message:"Unexpected Error! Please Try Again Later",
                    type:'danger'
                })
            })
        
    }
    return (
        <>
           
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            
            >
                <DialogTitle id="responsive-dialog-title"  >
                    <p  className="signin_heading">
                        Sign Up
                    </p>
                </DialogTitle>
                <DialogContent >
                <DialogContentText>
                    By Signing up, you will be able to enroll in courses, learn from them and take exams as a Student and create courses, exams and analyze as an Admin. 
                </DialogContentText>
                <form className={classes.dialogContent}>
                    <FormControl className={classes.formControl}  fullWidth variant="outlined">
                        <label htmlFor="fullname" className="input_label" >Full Name</label>
                        <TextField
                            variant="outlined"
                            id="fullname"
                            InputProps={{
                                classes: {
                                  input: classes.formInput,
                                },
                            }}
                            value={form.fullname}
                            onChange={handleFormChange('fullname')}
                            />
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth variant="outlined">
                        <label htmlFor="role" className="input_label" >Select a Role</label>
                        <Select
                            id="role"
                            className={classes.formSelect}
                            value={form.role}
                            onChange={handleFormChange('role')}
                            >
                            <MenuItem className={classes.formInput} value="admin">Admin</MenuItem>
                            <MenuItem className={classes.formInput} value="student">Student</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth variant="outlined">
                        <label htmlFor="email" className="input_label" >Email</label>
                        <TextField
                            variant="outlined"
                            id="email"
                            InputProps={{
                                classes: {
                                  input: classes.formInput,
                                },
                            }}
                            FormHelperTextProps	={{
                                classes:{error:classes.formHelper}
                            }}
                            helperText={validateEmail(form.email)?"Email Address not valid":""}
                            error={validateEmail(form.email)}
                            value={form.email}
                            onChange={handleFormChange('email')}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth variant="outlined">
                        <label htmlFor="password" className="input_label" >Password</label>
                        <TextField
                            variant="outlined"
                            id="password"
                            InputProps={{
                                classes: {
                                  input: classes.formInput,
                                },
                                endAdornment:
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>setFormValues({ ...form, showPassword: !form.showPassword })}
                                        onMouseDown={ev=>ev.preventDefault()}
                                        edge="end"
                                      >
                                        {form.showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                    </InputAdornment>
                                
                            }}
                            FormHelperTextProps	={{
                                classes:{error:classes.formHelper}
                            }}
                            helperText={validatePassword(form.password)?"Password must be at least 6 characters":""}
                            error={validatePassword(form.password)}
                            value={form.password}
                            type={form.showPassword ? 'text' : 'password'}
                            onChange={handleFormChange('password')}
                            
                        />
                    </FormControl>
                </form>
                </DialogContent>
                <DialogActions style={{padding:'2rem 4rem'}}  >
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={createAccount}>
                        Create Account
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
 
export default Signin