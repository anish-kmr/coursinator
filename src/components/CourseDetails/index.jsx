import React,{ useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { 
    Button ,
    Avatar,
    Tabs,
    Tab,
}from '@material-ui/core';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';

import ModuleItem from 'components/ModuleItem';
import AppContext from 'contexts/AppContext';


import './course_details.css'
import static_pic from 'assets/images/course_thumb.png'

const CourseDetails = (props) => {
  let { examMode, setExamMode } = useContext(AppContext); 
  let history = useHistory();
    let course = props.location.state.course
    let [ activeTab,setActiveTab ] = useState(0);
    const handleTabChange = (event, tabValue) => setActiveTab(tabValue);
    const startExam = () => {
      setExamMode(true);
      history.push({
        pathname:'/exam',
        state:{exam:{num_qs:20,marks_per_qs:2,time:"60 min"}}
      })
    }
    return (
      <div className="course_details_container">
        <div className="course_banner">
          <div className="course_info">
            <div className="course_title">{course.name}</div>
            <div className="course_author">
              <Avatar
                style={{
                  width: "3rem",
                  height: "3rem",
                  fontSize: "1.4rem",
                  backgroundColor: "purple",
                }}
              >
                A
              </Avatar>
              Andrew Ng
            </div>
            <div className="duration">
              <AccessTimeIcon
                style={{ color: "#d3d3d3", fontSize: "3rem" }}
                color="primary"
              />{" "}
              {course.duration}
            </div>
            <div className="enroll">
              <Button variant="contained" size="medium" color="primary">
                Enroll Now !
              </Button>
            </div>
          </div>
          <div className="course_thumbnail">
            <img src={course.thumbnail || static_pic} alt={course.name} />
          </div>
        </div>
        <div className="tabs_container">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className="tab_header"
          >
            <Tab label="About" />
            <Tab label="Modules" />
            <Tab label="Exams" />
          </Tabs>
          <div className="tab_content">
            {activeTab === 0 && (
              <div className="about">
                <h2 className="tab_heading"> About This Course </h2>
                <div className="course_description">{course.description}</div>
              </div>
            )}
            {activeTab === 1 && (
              <>
                <div className="modules_list">
                  <h2 className="tab_heading">
                    Modules (Topics Covered in this Cousrse)
                  </h2>
                </div>

                {course.moduleSnapshot.length > 0
                  ? course.moduleSnapshot.map((module) => (
                      <ModuleItem
                        key={module.module_id}
                        courseId={course.id}
                        module={module}
                      />
                    ))
                  : "No Modules"}
              </>
            )}
            {activeTab === 2 && (
              <>
                <div className="course_exam">
                  <h2 className="tab_heading">Course Exam </h2>
                  <div className="exam_details">
                    <div className="detail">
                      <AccessTimeIcon
                        style={{ fontSize: "3rem" }}
                        color="primary"
                      />
                      <span className="detail_text">60 minutes</span>
                    </div>
                    <div className="detail">
                      <AssignmentIcon
                        style={{ fontSize: "3rem" }}
                        color="primary"
                      />
                      <span className="detail_text">20 Questions</span>
                    </div>
                    <div className="detail">
                      <EqualizerIcon
                        style={{ fontSize: "3rem" }}
                        color="primary"
                      />
                      <span className="detail_text">40 Marks</span>
                    </div>
                    <div className="detail">
                      <CheckBoxIcon
                        style={{ fontSize: "3rem" }}
                        color="primary"
                      />
                      <span className="detail_text">15 marks to pass</span>
                    </div>
                  </div>
                  <div className="exam_instructions">
                    <h4>General Instructions:</h4>
                    <ol>
                      <li>
                        Go Through the content provided in the course modules
                        because all the questions are framed from content
                        provided in modules.
                      </li>
                      <li>
                        Once you log in and start the assessment, the
                        application will go into full screen mode and you should
                        not access any other application.
                      </li>
                      <li>
                        The timer at the top of the screen will display the time
                        left for the completion of the assessment. The exam will
                        be auto closed when the time is up.
                      </li>

                      <li>
                        Please DO NOT click on ‘Finish Test’ unless you want to
                        complete the assessment and submit for evaluation. You
                        will not be allowed to login again after finishing the
                        test.
                      </li>
                    </ol>
                    <h4> Exam Related Instructions: </h4>
                    <ol>
                      <li>
                        This assessment has ONLY Objective(MCQ) questions and
                        Fill In The Blanks.
                      </li>
                      <li>
                        The duration of the assessment is <b>60 minutes.</b>
                      </li>
                      <li>
                        There will be total <b>20 questions</b> and 1 section.
                      </li>
                      <li>
                        Each Question carries <b>2 marks</b>. There is NO
                        Negative Marking.
                      </li>
                      <li>
                        Passing Marks for this exam is <b>15 Marks</b>. Students getting less score will not be considered to complete the course. However they have as many tries as they want.
                      </li>
                      <li>
                        In Fill Ups type question, make sure to correctly spell
                        your answer and be precise.
                      </li>
                    </ol>
                  </div>
                  <div className="start_test">
                    <Button variant="contained" size="medium" color="secondary" onClick={startExam} >
                      Start Test
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
}
 
export default CourseDetails