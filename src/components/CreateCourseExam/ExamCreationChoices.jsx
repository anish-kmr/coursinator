import React, { useState, useEffect } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './create_exam.css'


const useStyles = makeStyles({
    button:{
        padding:'1.25rem 4rem',
        marginRight:'1rem',
    }
  })
  
  
  const ExamCreationChoices = ({numQs,setNumQs, onAutomaticChoice,onManualChoice}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    return (
      <>
        <div className="exam_choice_container">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
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
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <h2>
            Number Of Questions to generate
          </h2>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           <h2 style={{fontSize:'1.4rem',fontWeight:'normal'}}>
              Please specify the number of questions to autogenerate. You can edit the generated question once they are generated.It may take some time...  
          </h2> 
            
          </DialogContentText>
          <TextField
            autoFocus
            outlined
            margin="dense"
            label="Number Of Questions To generate"
            type="number"
            value={numQs}
            onChange={(e)=>{setNumQs(e.target.value)}}
            fullWidth
            InputLabelProps={{
              style:{
                fontSize:"1.4rem"
              }
            }}
            InputProps={{
              style:{
                padding:"0.5rem 1rem ",
                fontSize:"1.6rem",
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" variant="contained"  onClick={()=>{onAutomaticChoice();handleClose()}} color="primary">
            Generate
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
  }
  
  export default ExamCreationChoices;