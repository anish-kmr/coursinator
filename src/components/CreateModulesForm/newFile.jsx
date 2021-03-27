import React from 'react';
import RichTextEditor from 'react-rte';
import {useState, useContext} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import {Button} from '@material-ui/core';
import CreateModulesForm from './index';
import {
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from 'contexts/AppContext';

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
    
  },
  button:{
      padding:'1.5rem 2.5rem',
      marginRight:'1rem'
  }
})


const NewFile = (props) => {
    
    const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue())
    let history = useHistory();
    let location = useLocation();
    const [showPreview, setShowPreview] = useState(0)
    let { modules,activeStep,setActiveStep } = useContext(AppContext);
    const [ state,setState ] = useState({
      name:'',
      intro:'',
      durationTime:'',
      durationUnit:'weeks',
    })
    const classes = useStyles();
    const handleChange = (prop) => (event) => {
      setState({ ...state, [prop]: event.target.value });
    };

    const handleBack = () => {
      setActiveStep(1);
      history.goBack();
    }

    const handleAdd = () => {
      const obj = {
          'name' : state.name,
          'intro' : state.intro,
          'durationTime' : state.durationTime,
          'durationUnit' : state.durationUnit,
      }
      
      modules.push(obj)
      setActiveStep(1);
      history.goBack();
    }

    const editorHandler = (v) => {
      setEditorValue(v)
    }
    
    const editHandler = () => {
      setShowPreview(0);
      document.getElementById('preview').innerHTML = ' '
    }

    const previewHandler = () => {
      setShowPreview(1)
     
      document.getElementById('preview').innerHTML = editorValue.toString('html')
    }

    return (
        <>
        
       
      <div className="stepper_controls_container">
      <div className="stepper_controls">
          <Button className={classes.button} onClick = {editHandler} variant="contained" color="secondary">
          Edit
          </Button>
      </div>
      </div>
     
      
      <div id = 'preview'>
           
      </div> 
        
      {!showPreview && 
      <>
       

                <div className="course_detail_form_container">
                <div>
                <FormControl className={classes.formControl}  fullWidth  variant="outlined">
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

            </div>

            <div className="stepper_controls_container">
            <div></div>
            <div className="stepper_controls">
            <Button className={classes.button} onClick = {previewHandler} variant="contained" color="secondary">
            Preview
            </Button>
             </div>
             </div>

       <RichTextEditor value = {editorValue} onChange = {v=>editorHandler(v)} />
        
       <div className="stepper_controls_container">
                <div className="cancel">
                <Button className={classes.button} variant="contained" color="secondary" onClick={handleAdd} >
                                Add
                </Button>
                </div>

                <div className="stepper_controls">
                    <Button className={classes.button} variant="outlined" onClick={handleBack}>
                        Back
                    </Button>
                </div>
       </div> 

                     
       </>
       }

       
        
        
       
        
                                                             
        </>
      );
    
}

export default NewFile