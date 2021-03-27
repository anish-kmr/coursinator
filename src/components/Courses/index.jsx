import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/styles'
import RichTextEditor from 'react-rte';

import CourseCard from 'components/CourseCard';

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
    let course= {
      name:"Machine Learning",
      description:"Learn about the basics of Machine Learning in a fun way with most renowned professor Andrew Ng",
      thumbnail:pic,
      duration:"4 Weeks",
    }
    let allcourses=[]
    for(let i=0;i<5;i++) allcourses.push(course)
    setCourseList(allcourses)
    // axios.get(endpoints.getAllCourses)
    // .then(res=>{
    //   console.log("courses",res);
    //   allcourses = [...res.data];
    // })
    // .catch(err=>{
    //   console.log("error courses get ",err)
    // })
  },[])
  return (
    <div className="courses_container">
      
      <div className="courses_navigation">
        <h2 className="course_heading" >Courses</h2>
        {
          // user.role=='admin' &&
          <Link to='/courses/create' className="create_btn">
            <Fab variant="extended" size="medium"  color="primary" aria-label="add">
              <AddIcon className={classes.extendedIcon} /> Create Course 
            </Fab>
          </Link>
        }  
      </div>
      <div className="course_list">
        {
          courseList.length>0 &&
          courseList.map(course=>
            <CourseCard
              name={course.name}
              description={course.description}
              thumbnail={course.thumbnail}
              duration={course.duration}
            />
          )
        }
        
      </div>
    </div>
  )
}
 
export default Courses