import React, { useState, useEffect } from 'react'
import {
    TextField,
    Button,
    RadioGroup,
    Radio,
    FormControlLabel
} from '@material-ui/core';

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import DeleteIcon from '@material-ui/icons/Delete';

import './question.css'
 
const EditableQuestion = ({qid,qno,statement,type,options,answer,editable,updateQuestion,deleteQuestion}) => {
    let placeholder = {
        statement:"Write Your Question Here (use _______ for blanks)....... ",
        options:['Option 1', 'Option 2','Option 3','Option 4'],
        answer:'Correct Answer (Must be one of the options, if MCQ)'
    }
    let [updatedQs, setUpdatedQs] = useState({qno,statement,type,options,answer})
    
    const handleChange = (prop) => (event) => {
        setUpdatedQs({ ...updatedQs, [prop]: event.target.value });
    };
    const handleType = (event,newType) => {
        setUpdatedQs({...updatedQs,type:newType})
    }
    const handleOption = (index,newOption) => {
        let updatedOptions = [...updatedQs.options];
        updatedOptions[index]=newOption;
        setUpdatedQs({...updatedQs,options:updatedOptions})
    }

    useEffect(()=>{
      console.log("Qs rerendered",qid)
      setUpdatedQs({qno,statement,type,options,answer})
    },[qid])

    useEffect(()=>{
        if(updateQuestion) updateQuestion(qid,updatedQs)
    },[updatedQs])

    return (
      <div className="question_container ">
        <div className="qs_statement">
          <div className="qs_no">{qno}.</div>
          <div className="statement">
            <TextField
              fullWidth
              value={updatedQs.statement}
              onChange={handleChange("statement")}
              InputProps={{
                placeholder:placeholder.statement,
                disabled: !editable,
                style: {
                  fontSize: "2rem",
                  padding: ".25rem 0rem",
                },
              }}
            />
          </div>
          {
            editable &&
            <>
              <div className="qs_type">
                <ToggleButtonGroup
                  value={updatedQs.type}
                  exclusive
                  onChange={handleType}
                  aria-label="TYPE"
                  style={{
                      disabled:{
                      backgroundColor: 'red' 
                      }
                    }}
                >
                  <ToggleButton value="MCQ" aria-label="left aligned">
                    MCQ
                  </ToggleButton>
                  <ToggleButton value="FILLUPS" aria-label="centered">
                    FillUps
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="delete_qs" onClick={()=>deleteQuestion(qid)}>
                  <DeleteIcon style={{fontSize:'3.5rem',color:'#da4545'}} />
              </div>
           </>
         }
        </div>
        {type === "MCQ" && (
          <div className="qs_options">
            {options.map((option,i) => (
              <div className="options">
                  
                  <TextField
                    value={updatedQs.options[i]}
                    onChange={ev=>handleOption(i,ev.target.value)}
                    InputProps={{
                        placeholder:placeholder.options[i],
                        disabled: !editable,
                        style: {
                        fontSize: "1.8rem",
                        padding: ".25rem 0rem",
                        },
                    }}
                    />
              </div>
            ))}
          </div>
        )}
        {
          editable &&
          <div className="correct_answer">
            <div className="label"> Correct Answer : </div> 
            <TextField
              value={updatedQs.answer}
              onChange={handleChange('answer')}
              InputProps={{
                placeholder:placeholder.answer,
                disabled: !editable,
                style: {
                  color:'#05980b',    
                  fontWeight:'800',
                  fontSize: "1.7rem",
                  padding: ".25rem 1rem",
                  width:'45rem'
                },
              }}
            />
          </div>
        }
      </div>
    );
}
 
export default EditableQuestion