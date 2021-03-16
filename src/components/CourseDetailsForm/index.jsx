import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  Fab,
  Box
} from '@material-ui/core';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import './course_detail_form.css'

const useStyle = makeStyles({
  formControl: {
      marginBottom: '1.4rem'
  },
  formInput:{
      fontSize:'1.4rem',
  }
})

const CourseDetailsForm = ({props}) => {
  const classes = useStyle();
  const [ state,setState ] = useState({
    imagePreview:'',
    imageRaw:'',
    name:'',
    intro:'',
    durationTime:'',
    durationUnit:'weeks'
 
  })

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleImageUpload = (e)=>{
    if (e.target.files.length) {
      setState({
        ...state,
        imagePreview: URL.createObjectURL(e.target.files[0]),
        imageRaw: e.target.files[0]
        
      });
    }
  }

  return (
    <div className="course_detail_form_container">
      <div >
        <FormControl className={classes.formControl} fullWidth variant="outlined">
          <label htmlFor="course_name" className="input_label" >Course Name</label>
          <OutlinedInput
            id="course_name"
            value={state.name}
            onChange={handleChange('name')}
            className={classes.formInput}
          />
        </FormControl>
        <FormControl className={classes.formControl} fullWidth variant="outlined">
          <label htmlFor="course_intro" className="input_label" >Course Introduction</label>
          <OutlinedInput
            id="course_intro"
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
              value={state.durationTime}
              onChange={handleChange('durationTime')}
              className={classes.formInput}
            />
            <Select
              id="duration"
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
      
      <div>
        <FormControl className={classes.formControl} fullWidth variant="outlined">
          <label htmlFor="course_info" className="input_label" >Course Thumbnail</label>
          <Box component="label" className="thumbnail_container">
            {
              state.imagePreview && (
                <img src={state.imagePreview} alt="Thumbnail" className="thumbnail_preview" />
              )

            }

            <div className="add_thumbnail_icon">
              <Fab component="label" color="secondary" size="medium" >
                <AddPhotoAlternateIcon/>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload} 
                  hidden
                />
              </Fab>
              <div className="upload_text"> Upload Image File </div>
            </div>
          </Box>
        </FormControl>
        
      </div>
    </div>
  )
}
 
export default CourseDetailsForm