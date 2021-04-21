import React,{useState, useEffect} from 'react'
import HandleIllegalRoutes from 'services/HandleIllegalRoutes';

import CourseCard from 'components/CourseCard';

import { SemipolarLoading } from 'react-loadingg';

import endpoints from 'endpoints.json'
import axios from 'axios'
// import './dashboard.css'
 
const Dashboard = () => {
  HandleIllegalRoutes()
  const user = JSON.parse(localStorage.getItem('user'));
  let [ courseList,setCourseList ]=useState([])

  const fetchCreatedCourses = async () =>{
    try{
      let authorId = user.id
      let res = await axios.get(endpoints.getCreatedCourses+"?authorId="+authorId)
      if(res.data.success) return res.data.createdCourses
      else return []
    }
    catch(err){
      return []
    }
  }  
  const fetchEnrolledCourses = async () =>{
    try{
      let enrolledIds = user.enrolled.join(',')
      let res = await axios.get(endpoints.getEnrolledCourses+"?courses="+enrolledIds)
      if(res.data.success) return res.data.enrolledCourses
      else return []
    }
    catch(err){
      return []
    }
  }  
  useEffect(()=>{
    const fetchCourse = async () =>{
      let courses=[]
      if(user && user.role && user.role==="admin") courses = await fetchCreatedCourses();
      else  courses = await fetchEnrolledCourses();
      setCourseList(courses)
    }
    fetchCourse()
    
    
  },[])
  return (
    <div className="courses_container">
      
      <div className="courses_navigation">
        <h2 className="course_heading" >
          {user && user.role === "admin"?"Created Courses":"Enrolled Courses"}
        </h2>
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
              examSnapshot={course.examSnapshot}
            />
          )
        }
        
      </div>
    </div>
  )
}
 
export default Dashboard