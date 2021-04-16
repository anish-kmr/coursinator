import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/styles'


import CourseCard from 'components/CourseCard';

import { SemipolarLoading } from 'react-loadingg';

import {
  Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import endpoints from 'endpoints.json';
import axios from 'axios';
import pic from 'assets/images/ml.png'
import './courses.css'

const useStyles = makeStyles({
  extendedIcon:{
    margin:'0.3rem',
    fontSize:'2rem'
  }
})
 
const Courses = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();
  let [ courseList,setCourseList ]=useState([])


  useEffect(()=>{
    axios.get(endpoints.getAllCourses)
    .then(res=>{
        console.log("courses",res);
        let allcourses=[]
        allcourses = [...res.data];
        setCourseList(allcourses)
    })
    .catch(err=>{
      console.log("error courses get ",err)
    })
  },[])
  return (
    <div className="courses_container">
      
      <div className="courses_navigation">
        <h2 className="course_heading" >Courses</h2>
        {
          // user && user.role=='admin' &&
          <Link to='/courses/create' className="create_btn">
            <Fab variant="extended" size="medium"  color="primary" aria-label="add">
              <AddIcon className={classes.extendedIcon} /> Create Course 
            </Fab>
          </Link>
        }  
      </div>
      <div className="course_list">
        
        {courseList.length==0 && <SemipolarLoading size="large" color="#1e2761"/>}

        {
          courseList.length>0 &&
          courseList.map(course=>
            <CourseCard
              id={course.id}
              name={course.name}
              description={course.description}
              thumbnail={course.thumbnail}
              duration={course.duration}
              author={course.author}
              moduleSnapshot={course.moduleSnapshot}
            />
          )
        }
        
      </div>
    </div>
  )
}
 
export default Courses