import React, { useState, useEffect } from 'react'

import {
  Button,
  Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './create_exam.css'


const useStyles = makeStyles({
    button:{
        padding:'1.25rem 4rem',
        marginRight:'1rem',
    }
  })
  
  
  const ExamCreationChoices = ({onAutomaticChoice,onManualChoice}) => {
    const classes = useStyles();
    return (
      <div className="exam_choice_container">
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onAutomaticChoice}
        >
          Auto Generate Questions from Course
        </Button>
        <div className="or_seperator">OR</div>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={onManualChoice}
        >
          Create Questions Manually
        </Button>
      </div>
    )
  }
  
  export default ExamCreationChoices;