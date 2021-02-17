import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Header from 'components/Header';
import Courses from 'components/Courses';
import CreateCourse from 'components/CreateCourse';
import Dashboard from 'components/Dashboard';

import './main.css'
 
const Main = () => {
  return (
    <div className="main_container"> 
      <Header/>
      <div className="main_content" >
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/courses' component={Courses} />
          <Route exact path='/courses/create' component={CreateCourse} />
        </Switch>
      </div>
    </div>
  )
}
 
export default Main