import React, { useState, useEffect } from 'react'
import {
  Button,
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  Fab,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './create_exam.css'

const useStyle = makeStyles({
  formControl: {
      marginBottom: '1.4rem',
      display:"flex",
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"center",
      gap:'1rem',
      textAlign:'center'
  },
  formInput:{
      maxWidth:"10rem",
      fontSize:'1.4rem',
  }
})

const ExamDetails = ({total_qs,details,setDetails,saveExam}) =>{
  const classes = useStyle();

  const handleChange = (prop)=>(event)=>{
    setDetails({...details, [prop]:event.target.value})
  }
  return (
    <>
    <div className="exam_details_container">
      <div className="detail_section" >
        <FormControl className={classes.formControl} fullWidth variant="outlined">
          <label htmlFor="num_qs" className="input_label" >Number of Questions</label>
          <OutlinedInput
            id="num_qs"
            value={total_qs}
            disabled
            className={classes.formInput}
          />
        </FormControl>
        <FormControl className={classes.formControl} fullWidth variant="outlined">
          <label htmlFor="num_qs" className="input_label" >Marks per Questions</label>
          <OutlinedInput
            id="marks_qs"
            value={details.marks_per_ques}
            className={classes.formInput}
            onChange={handleChange('marks_per_ques')}
            type="number"
          />
        </FormControl>
        <div className="time_allotted">
          <label className="input_label" >Time Allotted: </label>
          <div className="time_allotted_group">
            <FormControl className={classes.formControl} fullWidth variant="outlined">
              <OutlinedInput
                type="number"
                value={details.time_allotted_value}
                onChange={handleChange('time_allotted_value')}
                className={classes.formInput}
                style={{padding:'0.25rem'}}
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth variant="outlined">
              <Select
                id="time_allotted_unit"
                value={details.time_allotted_unit}
                className={classes.formInput}
                style={{paddingRight:'1.4rem'}}
                onChange={handleChange('time_allotted_unit')}
                >
                  <MenuItem className={classes.formInput} value="minutes">Minutes</MenuItem>
                  <MenuItem className={classes.formInput} value="hours">Hours</MenuItem>
              </Select>
            </FormControl>
         </div>
        </div>
      </div>


      <div className="detail_section">
        
        <FormControl className={classes.formControl} fullWidth variant="outlined">
          <label htmlFor="num_qs" className="input_label" >Total Marks :</label>
          <OutlinedInput
            id="num_qs"
            value={details.marks_per_ques*total_qs}
            disabled
            className={classes.formInput}
          />
        </FormControl>
        <FormControl className={classes.formControl} fullWidth variant="outlined">
          <label htmlFor="passing_marks" className="input_label" >Passing Marks :</label>
          <OutlinedInput
            id="passing_marks"
            value={details.passing_marks}
            onChange={handleChange('passing_marks')}
            type="number"
            inputProps={{ max:details.marks_per_ques*total_qs }}
            className={classes.formInput}
          />
        </FormControl>
      </div>
    </div>
    <div className="create_button" >
      <Button variant="contained" color="primary"  onClick={saveExam}> Create Exam </Button>
    </div>
    </>
  )
} 

export default ExamDetails;