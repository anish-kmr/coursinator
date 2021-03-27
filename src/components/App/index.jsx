import React,{ useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import AppContext from 'contexts/AppContext';
import LoggedOutNavigation from 'components/LoggedOutNavigation'
import LoggedInNavigation from 'components/LoggedInNavigation'
import Main from 'components/Main'
import ReactNotification from 'react-notifications-component'
import './app.css';
import 'react-notifications-component/dist/theme.css'
const App = () => {

    let [loggedIn,setLoggedIn] = useState(false);
    let [activeStep, setActiveStep] = useState(0);
    let history = useHistory();
    let modules = []
     
    useEffect(()=>{
      let user = localStorage.getItem('user')
      if(user) {
        setLoggedIn(true)
        history.push('/dashboard')
      }
    })

    return (

        <AppContext.Provider value={
            {
                loggedIn,setLoggedIn,modules,activeStep,setActiveStep,
                notificationOptions:{
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 4000,
                    }
                  }
            }
          }>
              
            <div className={`app_container ${loggedIn?'app_container_loggedin':'' }`}>
            <ReactNotification />
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