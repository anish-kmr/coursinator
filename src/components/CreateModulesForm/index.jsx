import React, { useEffect, useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import AppContext from 'contexts/AppContext'; 
import ModuleItem from 'components/ModuleItem';


import Fab from '@material-ui/core/Fab';

import { makeStyles } from '@material-ui/styles'
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import InfoIcon from '@material-ui/icons/Info';
import { store } from 'react-notifications-component';
import { SemipolarLoading } from 'react-loadingg';


import endpoints from 'endpoints.json';
import axios from 'axios';
import '../Courses/courses.css'


import './create_modules_form.css'

const useStyles = makeStyles({
  extendedIcon:{
    margin:'0.3rem',
    fontSize:'2rem'
  }
})

const CreateModulesForm = ({moduleList,setModuleList, setProgressDisabled}) => {
  const { course, setCourse, notificationOptions,setLoading } = useContext(AppContext);
  const save_course = ()=>{
    let form = new FormData();
    let c = {...course, moduleList};
    let payload = JSON.stringify(c);
    form.append('course',payload)
    form.append('image',c.image)

    setLoading(true)
    axios.post(endpoints.createCourse, form)
    .then(res=>{
      console.log("create course res",res)
      if(res.data.created){
        let created_course = res.data.course
        setCourse({...course,id:created_course.courseID})
        store.addNotification({...notificationOptions,
          title:"Course Saved !",
          message:"Course Saved successfully!. You can now auto generate questions in Create Exam Section.",
          type:"success"
        })
      }
      else{
        store.addNotification({...notificationOptions,
          title:"Failed To Save Course",
          message:"Make Sure you have added at least 1 module and filled all nececssary details.",
          type:"danger"
        })
      }
      setLoading(false)
    })
    .catch(err=>{
      console.log('create err',err.response)
      store.addNotification({...notificationOptions,
        title:"Network Error!",
        message:"There were some problems in your network or the server is not responding. Please Try Later",
        type:"danger"
      })
      setLoading(false)
    })
  }

  useEffect(()=>{
    setProgressDisabled(course.id===undefined)
  },[course])
  const classes = useStyles();    
  return (
    <>
    
    <div className="modules_container">
      
      <div className="modules_navigation">
      
       
        <Link to='/courses/module/create'>
            <Fab variant="extended" color="primary" aria-label="add">
              <AddIcon className={classes.extendedIcon} /> Create Module
            </Fab>
        </Link>
      
      {
        moduleList.length>0 && 
        <div className="save_btn" >
            <div style={{textAlign:'center'}}>
              <Fab variant="extended" color="secondary" aria-label="add" onClick={save_course} >
                <SaveIcon className={classes.extendedIcon} /> Save Course
              </Fab>
            </div>
            <div className="save_info" >
              <InfoIcon color="primary"/> 
              <span> If you want to auto generate exam questions, You must save the Course before moving onto next step</span>
            </div>
        </div>
        
      }
    </div>
    <div className="modules_list">
      <h2 className="tab_heading" >Modules</h2> 
      { 
        moduleList.length>0?
        moduleList.map((module) => <ModuleItem module = {module}/>):
        <div className="create_info" > <InfoIcon/>  Please Add Modules by clicking on Create Module Button </div>
      }
    </div>
  </div>
    </>
  )
}
 
export default CreateModulesForm