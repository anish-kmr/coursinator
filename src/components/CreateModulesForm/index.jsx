import React from 'react';
import {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import AppContext from 'contexts/AppContext'; 
import '../Courses/courses.css'
import Popup from './popup';
import ListModule from './listModule';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/styles'
import AddIcon from '@material-ui/icons/Add';
import NewFile from './newFile';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  extendedIcon:{
    margin:'0.3rem',
    fontSize:'2rem'
  }
})

const CreateModulesForm = () => {
  const classes = useStyles();
  const { modules } = useContext(AppContext);
  const [list,setList] = useState([]);
  let history = useHistory();
  
  return (
    <>
    
    <div className="courses_container">
      <div className="courses_navigation">
        
      <Link to='/modules/create'>
          <Fab variant="extended" color="primary" aria-label="add">
            <AddIcon className={classes.extendedIcon} /> Create Module
          </Fab>
      </Link>
    
     
    
        
       
    </div><br/>
    <div className="courses_navigation">
    
    <br></br>
    <h2 align = 'center' style={{ fontSize: 20 }}>List of Modules</h2> 
    {modules.map((obj) => <ListModule obj = {obj}/>)}

    </div>
    </div>
    </>
  )
}
 
export default CreateModulesForm