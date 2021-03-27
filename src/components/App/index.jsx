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
    const [navOpen, setNavOpen] = useState(false)

    const history = useHistory();

    let [activeStep, setActiveStep] = useState(0);
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
                modules,activeStep,setActiveStep,
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
              
            <Header/>
            <div className={`app_container ${loggedIn?'app_container_loggedin':'' } ${!navOpen && 'app_container_full'}`}>
                {
                    loggedIn?
                    <LoggedInNavigation/>:
                    <LoggedOutNavigation/>
                }
            <ReactNotification />
                    <Main/>
            </div>
       </AppContext.Provider>
    )
} 

export default App;