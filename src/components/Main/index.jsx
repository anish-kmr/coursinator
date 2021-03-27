import React from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Header from 'components/Header';
import Courses from 'components/Courses';
import CreateCourse from 'components/CreateCourse';
import CourseDetails from 'components/CourseDetails';
import Dashboard from 'components/Dashboard';
import ProfilePage from 'components/ProfilePage';
import NewFile from 'components/CreateModulesForm/newFile';

import './main.css'
 
const Main = () => {
  let history = useHistory();
  console.log("history",history)
  return (
    <>
    <div className="main_container"> 
      {/* <Header/> */}
      <div className="main_content" >
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/profile' component={ProfilePage} />
          <Route exact path='/courses' component={Courses} />
          <Route exact path='/courses/create' component={CreateCourse} />
          <Route exact path='/courses/details' component={CourseDetails}/>
          <Route exact path='/modules/create' component={NewFile} />
        </Switch>
      </div>
    </div>
    </>
  )
}
 
export default Main