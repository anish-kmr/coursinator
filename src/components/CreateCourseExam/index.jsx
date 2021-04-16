import React, { useState, useEffect, useContext } from 'react'

import ExamCreationChoices from './ExamCreationChoices'
import CreateQuestions from './CreateQuestions'
import ExamDetails from './ExamDetails'

import {
  Button,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { SemipolarLoading } from 'react-loadingg';
import { store } from 'react-notifications-component';


import AppContext from 'contexts/AppContext'
import endpoints from 'endpoints.json'
import axios from 'axios'
import './create_exam.css'


const CreateCourseExam = ({setProgressDisabled}) => {
  const { course, setCourse, notificationOptions,setLoading } = useContext(AppContext);

  const generatedQs = {
    "uniqueid1":{
      statement:"Auto Generated Question 1 ",
      type:"MCQ",
      options:['option1', 'option2', 'option3', 'option4'],
      answer:'option1',
    },
    "uniqueid2":{
      qno:2,
      statement:"Auto Generated Question 2 ",
      type:"MCQ",
      options:['option1', 'option2', 'option3', 'option4'],
      answer:'option1',
    },
  }
  let [ questions,setQuestions ]=useState({...generatedQs});
  let [details,setDetails] = useState({
    marks_per_ques:2,
    time_allotted_value:1,
    time_allotted_unit:'hours',
    passing_marks:0,

  })
  
  const saveExam = () =>{
    let questionsList = []
    for(let qsid in questions){
      questionsList.push(questions[qsid])
    }
    
    let payload = {
      exam:{
        course_id:course.id,
        num_questions:questionsList.length,
        marks_per_ques:details.marks_per_ques,
        passing_marks:details.passing_marks,
        time_allocated:details.time_allotted_value+'-'+details.time_allotted_unit,
        questions:questionsList
      }
    }
    console.log("payload ",payload)
    setLoading(true)
    axios.post(endpoints.createExam,payload)
    .then(res=>{
      if(res.data.created){
        setCourse({...course,exam:res.data.exam})
        store.addNotification({...notificationOptions,
          title:"Course Exam Created Successfully",
          message:"Course Exam was created. You can now click on finish.",
          type:"success"
        })
      }
      else{
        console.log("error creating ",res.data.error)

        store.addNotification({...notificationOptions,
          title:"Failed To Create Course Exam",
          message:res.data.error,
          type:"danger"
        })
      }
      setLoading(false)
    })
    .catch(err=>{
      let msg="There Was a problem saving exam. Please check the form and internet connection"
      if (err.response) {
        console.log(err.response.data.error)
        msg = err.response.data.error
      }
      store.addNotification({...notificationOptions,
        title:"Failed To Course Exam",
        message:msg,
        type:"danger"
      })
      setLoading(false)
    })
  }

  useEffect(()=>{
    console.log('course',course,course.exam)
    setProgressDisabled(course.exam===undefined)
  },[course])

  const renderPhase = phase => {
    switch(phase){
      case 0:
        return <ExamCreationChoices onAutomaticChoice={onAutomaticChoice} onManualChoice={onManualChoice}/>;
      case 1:
        return <CreateQuestions  questions={questions} setQuestions={setQuestions} />;
      case 2:
        return <ExamDetails total_qs={Object.keys(questions).length} details={details} setDetails={setDetails} saveExam={saveExam} />;
    }
  }
  
  const onAutomaticChoice = ()=>{
    setCreationMode('auto');
  }
  const onManualChoice = ()=>{
    setCreationMode('manual');
  }
  let [ creationMode, setCreationMode ] = useState("");
  let [ phase, setPhase ] = useState(2);
  return (
    <div className="create_exam_container">

      <div className="exam_nav">
        <Button variant="outlined" color="secondary" onClick={()=>setPhase(phase-1)} disabled={phase===0}>
          <ArrowBackIosIcon /> 
          <span>Back</span>
        </Button>
        <Button variant="outlined" color="secondary" onClick={()=>setPhase(phase+1)} disabled={phase===2}>
          <span>Next</span>  <ArrowForwardIosIcon />
        </Button>
      </div>
      {renderPhase(phase)}

      
      
    </div>
  );
}
 
export default CreateCourseExam