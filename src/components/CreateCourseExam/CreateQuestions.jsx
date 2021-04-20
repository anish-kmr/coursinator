import React, { useState, useEffect } from 'react'

import {EditableQuestion} from 'components/Question';
import ExamCreationChoices from './ExamCreationChoices'
import { v4 as uuid } from 'uuid';

import {
  Button,
  Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './create_exam.css'


const CreateQuestions = ({ questions, setQuestions }) => {
  const updateQuestion = (qid, qs) => {
    setQuestions({ ...questions, [qid]: qs });
  };
  const deleteQuestion = (qid) => {
    let qs = questions;
    delete qs[qid];
    console.log(qs);
    setQuestions({ ...qs });
    console.log("question deleted ", qid);
  };
  const addTemplateQuestion = () => {
    let qs = {
      statement: "",
      type: "MCQ",
      options: ["", "", "", ""],
      answer: "",
    };
    setQuestions({ ...questions, [uuid()]: qs });
  };
  useEffect(() => {
    console.log("Qs updated", questions);
  }, [questions]);
  return (
    <div className="create_qs_container">
      <div className="qs_editing_area">
        <TransitionGroup>
          {Object.keys(questions).map((qid, i) => (
            <CSSTransition key={qid} timeout={300} classNames="move">
              
              <EditableQuestion
                key={qid}
                qid={qid}
                qno={i + 1}
                statement={questions[qid].statement}
                type={questions[qid].type}
                options={questions[qid].options}
                answer={questions[qid].answer}
                editable={true}
                updateQuestion={updateQuestion}
                deleteQuestion={deleteQuestion}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <div className="add_btn">
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={addTemplateQuestion}
        >
          <AddIcon /> Add Question
        </Fab>
      </div>
    </div>
  );
};

export default CreateQuestions;