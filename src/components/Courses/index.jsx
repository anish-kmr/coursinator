import React from 'react'
import { Link } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/styles'


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './courses.css'

const useStyles = makeStyles({
  extendedIcon:{
    margin:'0.3rem',
    fontSize:'2rem'
  }
})
 
const Courses = () => {
  const classes = useStyles();
  return (
    <div className="courses_container">
      <div className="courses_navigation">
        <Link to='/courses/create'>
          <Fab variant="extended" color="primary" aria-label="add">
            <AddIcon className={classes.extendedIcon} /> Create Course
          </Fab>
        </Link>
        
      </div>
    </div>
  )
}
 
export default Courses