import React,{ useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import AppContext from 'contexts/AppContext';
import LoggedOutNavigation from 'components/LoggedOutNavigation'
import LoggedInNavigation from 'components/LoggedInNavigation'
import Main from 'components/Main'
import Header from 'components/Header';
import ExamPage from 'components/ExamPage'
import ReactNotification from 'react-notifications-component'
import './app.css';
import 'react-notifications-component/dist/theme.css'
const App = () => {
    const [loggedIn,setLoggedIn] = useState(false);
    const [courseDetails,setCourseDetails] = useState({});
    const [navOpen, setNavOpen] = useState(true)
    const [activeStep, setActiveStep] = useState(2);
    const [examMode,setExamMode] = useState(true);
    const [ moduleList,setModuleList ] = useState([
      // {
      //   name:"",
      //   description:"",
      //   duration:"",
      //   content:"",//in HTML Format from rte editor
      // }
    ])
    const [course, setCourse] = useState({
      name:"",
      description:"",
      durationTime:"",
      durationUnit:"",
      thumbnail:"",
      author:{ //take only these values from saved localstorage user 
        name:"",
        profile_pic:"",
        color:"", 
      }
    })
    let history = useHistory();     
    useEffect(()=>{
      console.log("hist", history)
      let user = localStorage.getItem('user')
      if(user) {
        setLoggedIn(true)
        if(history.location.pathname=="/" || (history.location.pathname==="/exam"&&!examMode)) history.push('/dashboard')
      }
      else{
        history.push('/')
      }


    })

    return (

        <AppContext.Provider value={
            {
                loggedIn,setLoggedIn,
                courseDetails,setCourseDetails,
                navOpen, setNavOpen,
                moduleList,setModuleList ,
                course, setCourse,
                activeStep,setActiveStep,
                examMode, setExamMode,
                notificationOptions:{
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 4000,
                    }
                  },
            }
          }>
              
            <ReactNotification />
            <Switch>
              {
                examMode &&
                <Route exact path="/exam" component={ExamPage} />  
              }
              <Route>
                <>
                  <Header/>
                  <div className={`app_container ${loggedIn?'app_container_loggedin':'' } ${!navOpen && 'app_container_full'}`}>
                      {
                          loggedIn?
                          <LoggedInNavigation/>:
                          <LoggedOutNavigation/>
                      }
                          <Main container={loggedIn?'l_main_content':'o_main_content'}/>
                  </div>
                </>

              </Route>
            </Switch>
          
       </AppContext.Provider>
    )
} 

export default App;