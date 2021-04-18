import React, { useState, useEffect } from 'react'
import {
    Button,
    RadioGroup,
    Radio,
    FormControlLabel,
    TextField
} from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import './question.css'
 
const UneditableQuestion = ({question,userAnswer,setUserAnswer,isBookmarked,bookmarkQuestion,children}) => {
    let {qid,qno,statement,type,options,answer} = question
    let [ selectedOption,setSelectedOption ] = useState(userAnswer || "");
    const handleOption = ev => {
        setSelectedOption(ev.target.value)
    } 

    useEffect(()=>{
       setUserAnswer(qno,selectedOption) 
    },[selectedOption])
    useEffect(()=>{
        console.log("question changed answer chosen ",userAnswer )
        setSelectedOption(userAnswer || "")
    },[qid])
    return (
      <div className="question_container ">
        <div className="qs_statement u_statement">
          <div className="qs_no">{qno}.</div>
          <div className="statement">{statement}</div>
          <Button variant="outlined" color="secondary" onClick={()=>bookmarkQuestion(qno)}>
              <BookmarkIcon style={{fontSize:'3rem'}} color="secondary" />
              {isBookmarked?"Remove Bookmark":"Review Later"}
          </Button>
        </div>
        {
            type === "MCQ" && (
                <div className="qs_options u_options">
                    <RadioGroup
                    name={qid}
                    value={selectedOption}
                    onChange={handleOption}
                    >
                    {options.map((option, i) => (
                        <FormControlLabel
                        key={`${qid}-${i}`}
                        value={option}
                        control={<Radio />}
                        label={<div className="options">{option}</div>}
                        />
                    ))}
                    </RadioGroup>
                </div>
            )
        }
        {
            type=="FILLUPS" && (
                <div className="fill_answer">
                    <TextField
                        value={selectedOption}
                        onChange={handleOption}
                        InputProps={{
                            placeholder:"Write Your Answer Here...",
                            style: {   
                                marginLeft:'4rem',
                                fontSize: "1.8rem",
                                padding: ".25rem 1rem",
                                width:'45rem'
                            },
                        }}
                    />
                </div>
            )
        }

        <div className="qs_controls">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setSelectedOption("")}
          >
            Clear
          </Button>
           {children}
        </div>
      </div>
    );
}
 
export default UneditableQuestion