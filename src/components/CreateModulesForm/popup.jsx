import React from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import '../Courses/courses.css'
import  ModuleDetails from './listModule';
import { makeStyles } from '@material-ui/styles';
import {
    FormControl,
    OutlinedInput,
    Select,
    MenuItem,
  } from '@material-ui/core';

const useStyles = makeStyles({
    formControl: {
        marginBottom: '1.4rem'
    },
    formInput:{
        fontSize:'1.4rem',
    },
    extendedIcon:{
      margin:'1.2rem',
      fontSize:'2rem',
    },
    fabControl : {
      top:'10px',
      left:'800px',
     
      fontSize:'2rem',
      
    }
  })

const Popup = ({setList, list}) =>{
    const [open, setOpen] = useState(false);
    const [ state,setState ] = useState({
        name:'',
        intro:'',
        durationTime:'',
        durationUnit:'weeks',
        content : '',
      })
    
      const handleChange = (prop) => (event) => {
        setState({ ...state, [prop]: event.target.value });
      };
      
      const handleAdd = () => {
        const obj = {
            'name' : state.name,
            'intro' : state.intro,
            'durationTime' : state.durationTime,
            'durationUnit' : state.durationUnit,
            'content' : state.content
        }
        let newList = [...list,obj]
        setList(newList)
        setOpen(false)
      }

    

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const classes = useStyles();

  return (
    <div>
       
       <Fab onClick={handleClickOpen} className={classes.fabControl} variant="extended" color="primary" aria-label="add">
            <AddIcon className={classes.fabControl} onClick={handleClickOpen}/> Create Module
      </Fab> 


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
                <div className="course_detail_form_container">
                <div >
                <FormControl className={classes.formControl} fullWidth variant="outlined">
                <label htmlFor="course_name" className="input_label" >Module Name</label>
                <OutlinedInput
                    id="course_name"
                    name = 'name'
                    value={state.name}
                    onChange={handleChange('name')}
                    className={classes.formInput}
                />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth variant="outlined">
                <label htmlFor="course_intro" className="input_label" >Module Description</label>
                <OutlinedInput
                    id="course_intro"
                    name = 'intro'
                    value={state.intro}
                    onChange={handleChange('intro')}
                    multiline
                    rows={5}
                    className={classes.formInput}
                />
                </FormControl>

                <FormControl className={classes.formControl} fullWidth variant="outlined">
                <label htmlFor="course_duration" className="input_label" >Duration</label>
                <div className="input_group">
                    <OutlinedInput
                    id="course_duration"
                    name = 'durationTime'
                    value={state.durationTime}
                    onChange={handleChange('durationTime')}
                    className={classes.formInput}
                    />
                    <Select
                    id="duration"
                    name = 'durationUnit'
                    value={state.durationUnit}
                    onChange={handleChange('durationUnit')}
                    className={classes.formInput}
                    style={{paddingRight:'1.4rem'}}
                    >
                        <MenuItem className={classes.formInput} value="days">Days</MenuItem>
                        <MenuItem className={classes.formInput} value="weeks">Weeks</MenuItem>
                        <MenuItem className={classes.formInput} value="months">Months</MenuItem>
                    </Select>

                </div>
                </FormControl>
            

            </div>
            
            <FormControl className={classes.formControl} fullWidth variant="outlined">
                <label htmlFor="course_content" className="input_label" >Module Content</label>
                <OutlinedInput
                    id="course_content"
                    name = 'content'
                    value={state.content}
                    onChange={handleChange('content')}
                    multiline
                    rows={10}
                    className={classes.formInput}
                />
                </FormControl>

           
            <div className="stepper_controls_container">
                <div className="cancel">
                <Button className={classes.button} variant="contained" color="secondary" onClick={handleAdd} >
                                Add
                </Button>
                </div>
                <div className="stepper_controls">
                            <Button className={classes.button} variant="contained" onClick={handleClose} >
                                Cancel
                            </Button>
                </div>
                </div>
            </div>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
export default Popup;