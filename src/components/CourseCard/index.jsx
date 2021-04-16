import React,{ useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar
} from '@material-ui/core';

import AppContext from 'contexts/AppContext'
import static_thumb from 'assets/images/course_thumb.png';
import './course_card.css'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';


const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  cardContent:{
    position:'relative',
    padding:"0.75rem 1.5rem"
  },
  cardActions:{
    paddingTop:"1.5rem",
    paddingBottom:"1.5rem"
  },
  duration:{
    display:'flex',
    alignItems:'center',
    justifyContent:'start',
    paddingTop:'1rem',
    fontSize:'1.4rem'
  }
});

const CourseCard = ({id,name, description, duration, thumbnail,author, moduleSnapshot}) => {
  const classes = useStyles();
  const history = useHistory();
  const { setCourseDetails } = useContext(AppContext);
  const exploreCourse = () =>{
    setCourseDetails({
      name,description, duration, thumbnail
    });
    history.push({pathname:'/courses/details',state:{course:{id,name,description, duration, thumbnail, moduleSnapshot}}});
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Thumbnail"
          height="140"
          image={thumbnail || static_thumb }
          title="Thumbnail"
        />
        <CardContent className={classes.cardContent}>
          <div className="author_icon">
          {
            author && author.profile_picture?
            <img className="profile_picture"  src={author.profile_picture} />:
            <Avatar 
              style={{
                width:'4.5rem',
                height:'4.5rem',
                fontSize:'2rem',
                backgroundColor:author?.color||'purple',
              }}
            >
              {(author?.name && author.name.charAt(0).toUpperCase()) || 'A'}
            </Avatar>
          }
          </div>
          <Typography gutterBottom variant="h4" component="h2">
            {name}
          </Typography>
          <Typography variant="body1" className="short_desc" gutterBottom color="textSecondary" component="h4">
            {description}
          </Typography>
          <Typography className={classes.duration} variant="h6" color="textPrimary" component="h6">
            <QueryBuilderIcon color="primary" size="large" style={{fontSize:"2rem", marginRight:'0.5rem'}}/> 
            {duration}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions} >
        <Button variant="outlined"  size="medium" color="secondary" onClick={exploreCourse} >  
          Explore
        </Button>
        <Button variant="contained" size="medium" color="primary">
          Enroll
        </Button>
      </CardActions>
    </Card>
  )
}
 
export default CourseCard