import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

import endpoints from 'endpoints.json';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor:'#efefef',
    },
  },
  listItemName:{
    fontSize:'2.0em',
  },
  listItemTime:{
    fontSize:'1.2em',
  },
  listItemText:{
    fontSize:'1.5em',
  }
}));

const ModuleItem = ({module,courseId}) => {
  const classes = useStyles();
  let user = JSON.parse(localStorage.getItem('user'))
  let history = useHistory();
  module = {...module,durationTime:module.duration.split('-')[0],durationUnit: module.duration.split('-')[1]}
  const showModuleDetails = ()=>{
    if(  !user ||  history.location.pathname == '/courses/create') return
    console.log(endpoints.getModuleDetails+`${courseId}/${module.module_id}`)
    axios.get(endpoints.getModuleDetails+`${courseId}/${module.module_id}`)
    .then(res=>{
      console.log("module details ",res.data)
      history.push({
        pathname:'/courses/module/details',
        state:{module:res.data}
      })
    })
    .catch(err=>{
      console.log("error fetching module details ",err)
    })
  }
  

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders" onClick={showModuleDetails} >
      
      <ListItem>
        <ListItemText primary={module.name} classes={{primary:classes.listItemName}}/>
      </ListItem>
     
      <ListItem>
        <QueryBuilderIcon style={{ fontSize: 25 }}/>
        <ListItemText primary={module.durationTime + " " + module.durationUnit} classes={{primary:classes.listItemTime}}/>
      </ListItem>
     
      <ListItem>
        <ListItemText primary={module.description} classes={{primary:classes.listItemText}}/>
      </ListItem>
      
      
      <br></br>
      <Divider />
      <br></br>
    </List>
  );
}

export default ModuleItem;