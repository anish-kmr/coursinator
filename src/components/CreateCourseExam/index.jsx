import React, { useState, useEffect } from 'react'

import {EditableQuestion} from 'components/Question';
import { v4 as uuid } from 'uuid';

import {
  Button,
  Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

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

const CreateQuestionsPane = ({generatedQs})=>{
  const classes = useStyles();
  let [ questions,setQuestions ]=useState({...generatedQs});
  const updateQuestion = (qid, qs) => {
    setQuestions({...questions,[qid]:qs}) 
  }
  const deleteQuestion = qid => {
    let qs = questions;
    delete qs[qid];
    console.log(qs)
    setQuestions({...qs})
    console.log("question deleted ",qid)
  }
  const addTemplateQuestion = () => {
    let qs = {
      statement:"",
      type:"MCQ",
      options:['','','',''],
      answer:'',
    }
    setQuestions({...questions,[uuid()]:qs})
  }
  useEffect(()=>{
    console.log("Qs updated",questions)
  },[questions])
  return (
    <div className="create_qs_container">
      
      <div className="qs_editing_area">
      <TransitionGroup>
        {
          Object.keys(questions).map((qid,i)=>
          <CSSTransition key={qid} timeout={300} classNames="move">
            <EditableQuestion 
              key={qid}
              qid={qid}
              qno={i+1}
              statement={questions[qid].statement}
              type={questions[qid].type}
              options={questions[qid].options}
              answer={questions[qid].answer}
              editable={true}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
              />
            </CSSTransition>
          )
        }
        </TransitionGroup>
      </div>
      <div className="add_btn">
        <Fab variant="extended" color="primary" aria-label="add" onClick={addTemplateQuestion}>
          <AddIcon className={classes.extendedIcon} /> Add Question
        </Fab>
      </div>
    </div>
  )
}

const CreateCourseExam = () => {
  let [generatedQs,setGeneratedQs] = useState({
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
  });
  const onAutomaticChoice = ()=>{
    setCreationMode('auto');
  }
  const onManualChoice = ()=>{
    setCreationMode('manual');
  }
  let [ creationMode, setCreationMode ] = useState("");
  return (
    <div className="create_exam_container">
      {
        creationMode ==="" ?
        <ExamCreationChoices onAutomaticChoice={onAutomaticChoice} onManualChoice={onManualChoice}/>:
        <CreateQuestionsPane  generatedQs={generatedQs} />

      }

      
      
    </div>
  );
}
 
export default CreateCourseExam