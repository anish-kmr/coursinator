import React,{ useState, useContext } from 'react'

import { 
    Button ,
    Avatar,
    Tabs,
    Tab,
    TabPanel
}from '@material-ui/core';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

import AppContext from 'contexts/AppContext';
import './course_details.css'
import static_pic from 'assets/images/course_thumb.png'

const CourseDetails = (props) => {
    let course = props.location.state.course
    let [ activeTab,setActiveTab ] = useState(0);
    const handleTabChange = (event, tabValue) => setActiveTab(tabValue);
    return (
        <div className="course_details_container" >
            <div className="course_banner">
                <div className="course_info">
                    <div className="course_title">{course.name}</div>
                    <div className="course_author">
                        <Avatar 
                            style={{
                                width:'3rem',
                                height:'3rem',
                                fontSize:'1.4rem',
                                backgroundColor:'purple',
                            }}
                        >
                            A
                        </Avatar>
                        Andrew Ng
                    </div>
                    <div className="duration">
                        <AccessTimeIcon style={{color:"#d3d3d3",fontSize:"3rem"}} color="primary" /> {course.duration}
                    </div>
                    <div className="enroll">
                        <Button variant="contained" size="medium" color="primary"  >
                            Enroll Now !
                        </Button>
                    </div>
                </div>
                <div className="course_thumbnail">
                    <img src={course.thumbnail || static_pic} alt={course.name} />
                </div>
            </div>
            <div className="tabs_container">
                <Tabs value={activeTab} onChange={handleTabChange} className="tab_header">
                    <Tab label="About"  />
                    <Tab label="Modules"  />
                    <Tab label="Exams"  />
                </Tabs>
                <div className="tab_content">
                    {activeTab === 0 && (
                        <div className="about">
                            <div className="tab_heading"> About This Course </div>
                            <div className="course_description">
                                {course.description}
                            </div>
                        </div>
                    )}
                    {activeTab === 1 && (
                        <div className="modules_list">
                            <div className="tab_heading">Modules (Topics Covered in this Cousrse)</div>
                        </div>
                        //Loop through modules and render ModuleListItem Component for each module
                        )}
                    {activeTab === 2 && (
                        <div className="course_exam">
                            <div className="tab_heading">Course Exam </div>
                        </div>
                        //Loop through modules and render ModuleListItem Component for each module
                        
                    )}
                </div>
            </div>
            
        </div>
    )
}
 
export default CourseDetails