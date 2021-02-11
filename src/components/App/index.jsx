import React,{ useState } from 'react';


import AppContext from 'contexts/AppContext';
import LoggedOutNavigation from 'components/LoggedOutNavigation'
import LoggedInNavigation from 'components/LoggedInNavigation'
import Main from 'components/Main'
import './app.css';

const App = () => {
    let [loggedIn,setLoggedIn] = useState(false);
    
    return (

        <AppContext.Provider value={
            {
                loggedIn,setLoggedIn
            }
          }>

            <div className={`app_container ${loggedIn?'app_container_loggedin':'' }`}>
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