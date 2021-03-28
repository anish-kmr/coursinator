import React,{ useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import AppContext from 'contexts/AppContext';
import LoggedOutNavigation from 'components/LoggedOutNavigation'
import LoggedInNavigation from 'components/LoggedInNavigation'
import Main from 'components/Main'
import Header from 'components/Header';

import ReactNotification from 'react-notifications-component'
import './app.css';
import 'react-notifications-component/dist/theme.css'
const App = () => {
    let [loggedIn,setLoggedIn] = useState(false);
    let [courseDetails,setCourseDetails] = useState({});
    const [navOpen, setNavOpen] = useState(true)
    let [activeStep, setActiveStep] = useState(0);
    let [ moduleList,setModuleList ] = useState([
      // {
      //   name:"",
      //   description:"",
      //   duration:"",
      //   content:"",//in HTML Format from rte editor
      // }
    ])
    let [course, setCourse] = useState({
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
    let modules = []
     
    useEffect(()=>{
      let user = localStorage.getItem('user')
      if(user) {
        setLoggedIn(true)
        if(history.location.pathname=="/") history.push('/dashboard')
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
            <Header/>
            <div className={`app_container ${loggedIn?'app_container_loggedin':'' } ${!navOpen && 'app_container_full'}`}>
                {
                    loggedIn?
                    <LoggedInNavigation/>:
                    <LoggedOutNavigation/>
                }
                    <Main/>
            </div>
       </AppContext.Provider>
    )
} 

export default App;