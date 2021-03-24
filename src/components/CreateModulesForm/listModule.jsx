import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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

export default function ListModule({obj}) {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      
      <ListItem>
        <ListItemText primary={obj.name} classes={{primary:classes.listItemName}}/>
      </ListItem>
     
      <ListItem>
        <QueryBuilderIcon style={{ fontSize: 25 }}/>
        <ListItemText primary={obj.durationTime + " " + obj.durationUnit + " to complete"} classes={{primary:classes.listItemTime}}/>
      </ListItem>
     
      <ListItem>
        <ListItemText primary={obj.intro} classes={{primary:classes.listItemText}}/>
      </ListItem>
      
    

      <br></br>
      <Divider />
      <br></br>
    </List>
  );
}
