import React,{useState} from 'react'
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
    IconButton
} from '@material-ui/core';



import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import './signin.css'

const useStyle = makeStyles({
    dialogContent:{
        padding:"3rem",
    },
    formControl: {
        marginBottom: '1.4rem'
    },
    formInput:{
        fontSize:'1.4rem',
    }
})

const Signin = ({open,setOpen}) => {
    const theme = useTheme();
    const classes = useStyle();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [form,setFormValues]=useState({
        fullname:'',
        email:'',
        role:'student',
        password:'',
        showPassword:false,
    })
    const handleFormChange = (prop) => (event) => {
        setFormValues({ ...form, [prop]: event.target.value });
    };
    const handleClose = () =>setOpen(false);
    const createAccount = ()=>{
        console.log('form ',form)
    }
    return (
        <>
           
            <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            
            >
                <DialogTitle id="responsive-dialog-title" >
                    <h2  className="signin_heading">
                        Sign Up
                    </h2>
                </DialogTitle>
                <DialogContent >
                <DialogContentText>
                    By Signing up, you will be able to enroll in courses, learn from them and take exams as a Student and create courses, exams and analyze as an Admin. 
                </DialogContentText>
                <form className={classes.dialogContent}>
                    <FormControl className={classes.formControl}  fullWidth variant="outlined">
                        <label htmlFor="fullname" className="input_label" >Full Name</label>
                        <OutlinedInput
                            id="fullname"
                            className={classes.formInput}
                            value={form.fullname}
                            onChange={handleFormChange('fullname')}
                            />
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth variant="outlined">
                        <label htmlFor="role" className="input_label" >Select a Role</label>
                        <Select
                            id="role"
                            className={classes.formInput}
                            value={form.role}
                            onChange={handleFormChange('role')}
                            >
                            <MenuItem className={classes.formInput} value="admin">Admin</MenuItem>
                            <MenuItem className={classes.formInput} value="student">Student</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth variant="outlined">
                        <label htmlFor="email" className="input_label" >Email</label>
                        <OutlinedInput
                            id="email"
                            className={classes.formInput}
                            value={form.email}
                            onChange={handleFormChange('email')}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth variant="outlined">
                        <label htmlFor="password" className="input_label" >Password</label>
                        <OutlinedInput
                            id="password"
                            className={classes.formInput}
                            value={form.password}
                            type={form.showPassword ? 'text' : 'password'}
                            onChange={handleFormChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    className={classes.icon}
                                    aria-label="toggle password visibility"
                                    onClick={()=>setFormValues({ ...form, showPassword: !form.showPassword })}
                                    onMouseDown={ev=>ev.preventDefault()}
                                    edge="end"
                                  >
                                    {form.showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                            }
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