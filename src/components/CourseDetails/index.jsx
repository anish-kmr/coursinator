import React,{ useState, useContext } from 'react'

import { 
    Button ,
    Avatar,
    Tabs,
    Tab,
}from '@material-ui/core';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

import ModuleItem from 'components/ModuleItem';
import AppContext from 'contexts/AppContext';
import './course_details.css'
import static_pic from 'assets/images/course_thumb.png'

const CourseDetails = (props) => {
    let course = props.location.state.course
    let [ activeTab,setActiveTab ] = useState(0);
    console.log('course',course)
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
                            <h2 className="tab_heading"> About This Course </h2>
                            <div className="course_description">
                                {course.description}
                            </div>
                        </div>
                    )}
                    {activeTab === 1 && (
                        <>
                            <div className="modules_list">
                                <h2 className="tab_heading">Modules (Topics Covered in this Cousrse)</h2>
                            </div>
                            
                            {
                                course.moduleSnapshot.length>0 ?
                                course.moduleSnapshot.map(module=><ModuleItem key={module.module_id} courseId={course.id} module={module} />):
                                "No Modules"
                            }
                        </>
                    )}
                    {activeTab === 2 && (
                        <>
                            <div className="course_exam">
                                <h2 className="tab_heading">Course Exam </h2>
                            </div>
                            
                                                    
                        </>
                    )}
                </div>
            </div>
            
        </div>
    )
}
 
export default CourseDetails