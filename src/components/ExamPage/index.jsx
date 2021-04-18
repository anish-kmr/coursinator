import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import {UneditableQuestion} from 'components/Question'

import { 
  Button
}from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import VisibilityIcon from '@material-ui/icons/Visibility';
import './exam_page.css'
 

const renderTime = ({remainingTime}) => {
  const integerFormat =  {minimumIntegerDigits: 2, useGrouping:false}
  const formatTime = (seconds) => {
    let hrs = Math.floor(seconds/3600).toLocaleString('en-US',integerFormat);
    let mins = (Math.floor(seconds/60) - (hrs*60)).toLocaleString('en-US',integerFormat);
    let secs = (seconds-(mins*60)-(hrs*3600)).toLocaleString('en-US', integerFormat);
    if (hrs > 0) return `${hrs}:${mins}:${secs}`;
    else if (mins > 0) return `${mins}:${secs}`;
    else return `${secs}`;
  }
  const time_className = () => {
    if(remainingTime>=3600) return "hours_left";
    else if(remainingTime>=60) return "mins_left";
    else return "secs_left";
  }
  return (
    <div className="timer">
      <div className={time_className()}>{formatTime(remainingTime)}</div>
      {
        remainingTime<60 &&
        <div className="seconds">seconds</div>

      }

    </div>
  )
}

const ExamPage = () => {
    const history = useHistory();
    const exam = history.location.state.exam
    let durationInSeconds = 0;
    if(exam.time_allocated.split('-')[1] === "minutes") durationInSeconds = exam.time_allocated.split('-')[0] * 60;
    if(exam.time_allocated.split('-')[1] === "hours") durationInSeconds = exam.time_allocated.split('-')[0] * 60*60;
    const hurryRatio = 300/durationInSeconds;
    
    let [ activeQuestion, setActiveQuestion ] = useState({...exam.questions[0]});
    let [ userAnswers, setUserAnswers ] = useState(new Array(exam.questions.length));
    let [bookmarks, setBookmarks] = useState(new Array(exam.questions.length));
    let [filter,setFilter] = useState('all');

    const getFilteredQuestions = () => {
      let qs = [...exam.questions]
      if(filter === "bookmarked") return qs.filter(q=>bookmarks[q.qno-1]) 
      else if(filter === "done") return qs.filter(q=>userAnswers[q.qno-1]!==undefined && userAnswers[q.qno-1].length>0)
      else if(filter==="remaining") return qs.filter(q=>userAnswers[q.qno-1]===undefined || userAnswers[q.qno-1].length==0)
      return qs
    }
    const handleQuestion = (i) => {
      console.log("question changed ",i,{...exam.questions[i]})
      setActiveQuestion({...exam.questions[i]})
    }
    const nextQuestion = () => {
      let nextQs = exam.questions[activeQuestion.qno]
      setActiveQuestion(nextQs)
    }
    const setUserAnswer = (qno,answer) =>{
      console.log("answers ",userAnswers)
      let answerScript = [...userAnswers]
      answerScript[qno-1] = answer
      setUserAnswers(answerScript)
    }
    const bookmarkQuestion = (qno) =>{
      let updatedBookmarks = [...bookmarks]
      if(updatedBookmarks[qno-1]!== undefined) updatedBookmarks[qno-1]=!updatedBookmarks[qno-1]
      else updatedBookmarks[qno-1]=true
      setBookmarks(updatedBookmarks)
    }
    const getResults = (key, script) => {
      let correct=0, incorrect=0,unmarked=0;
      for(let i=0;i<key.length;i++ ){
        if(script[i].trim()==="") unmarked++;
        else if(script[i].trim()===key[i].trim()) correct++;
        else incorrect++;
      }
      return {correct, incorrect, unmarked}
    }
    const finishTest = async () => {
      console.log("answers correct",exam.questions.map(qs=>qs.answer))
      console.log("answers finihshes",userAnswers)
      let {correct, incorrect, unmarked} = getResults(exam.questions.map(qs=>qs.answer),userAnswers);
      alert(` correct : ${correct}, incorrect : ${incorrect}, unmarked :  ${unmarked}\nscore=${correct*exam.marks_per_ques}`)
      history.block((location, action) => true);
      history.push('/dashboard')
    }
    useEffect(()=>{
      console.log(bookmarks)
    },[bookmarks])
    useEffect(()=>{
        history.block((location, action) => false);
        window.onbeforeunload = () => true ;
        return () => {
            history.block((location, action) => true);
            window.onbeforeunload = null;
        };
    })
  return (
    <div className="exam_container">
      <div className="exam_header">
        <div className="exam_name"> {exam.name} </div>
        <div className="finish_test">
          <Button variant="contained" size="medium" color="secondary" onClick={finishTest}>
            Finish Test
          </Button>
        </div>
      </div>
      <div className="exam_main">
        <div className="exam_sidebar">
          <div className="question_pane">
            <div className="qs_filters_container">
            <div className={`qs_filter ${filter==="all" && 'active_filter'}`} onClick={()=>setFilter('all')} >
                <VisibilityIcon className="all" />
                <div className="filter_text">All</div>
              </div>
              <div className={`qs_filter ${filter==="bookmarked" && 'active_filter'}`}  onClick={()=>setFilter('bookmarked')}>
                <BookmarkIcon className="bookmarked" />
                <div className="filter_text">Bookmarked</div>
              </div>
              <div className={`qs_filter ${filter==="done" && 'active_filter'}`}  onClick={()=>setFilter('done')}>
                <CheckCircleIcon className="done" />
                <div className="filter_text">Done</div>
              </div>
              <div className={`qs_filter ${filter==="remaining" && 'active_filter'}`}  onClick={()=>setFilter('remaining')}>
                <HourglassFullIcon className="remaining" />
                <div className="filter_text">Remaining</div>
              </div>
              
            </div>
            <div className="qs_chips_container">
              {getFilteredQuestions().map((qs, i) => (
                <div key={qs.qid} className={
                  `qs_chip 
                  ${activeQuestion.qno==qs.qno && 'qs_chip_active'} 
                  ${userAnswers[qs.qno-1] && userAnswers[qs.qno-1].length>0 && 'qs_chip_done'} 
                  ${bookmarks[qs.qno-1] && 'qs_chip_bookmarked'} 
                  
                  `} onClick={() => handleQuestion(qs.qno-1)}>
                  {qs.qno}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="question_display">
          <div className="question_no">Question {activeQuestion.qno}</div>
          <div className="question">
            <UneditableQuestion
              question={activeQuestion}
              userAnswer={userAnswers[activeQuestion.qno - 1]}
              setUserAnswer={setUserAnswer}
              isBookmarked={bookmarks[activeQuestion.qno-1]}
              bookmarkQuestion={bookmarkQuestion}
            >
            
              <Button variant="contained" color="secondary" onClick={nextQuestion} disabled={activeQuestion.qno===exam.questions.length}> Next </Button>
            
            </UneditableQuestion>
          </div>

        </div>
      </div>

      <div className="timer_container">
        <CountdownCircleTimer
          isPlaying={true}
          size={120}
          strokeWidth={6}
          colors={[
            ["#1e2761", 0.5],
            ["#7a2048", 0.75],
            ["#ff4f4f", hurryRatio],
          ]}
          duration={durationInSeconds}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}
 
export default ExamPage