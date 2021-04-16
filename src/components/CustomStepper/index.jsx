import React from 'react';
import { useHistory } from 'react-router-dom';
import {useContext} from 'react';
import {
    Step,
    StepLabel,
    Stepper,
    StepConnector,
    Button
} from '@material-ui/core';
import AppContext from 'contexts/AppContext';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './custom_stepper.css'


const useStepIconStyles = makeStyles(theme=>{
return {
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor:theme.palette.primary.main,
        width:50,
        height:50,
        transform:"translateY(-5px)",
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundColor:theme.palette.secondary.main,
    },
}
});

const CustomConnector = withStyles(theme=>{
return {
    alternativeLabel: {
        top: 18,
    },
    active: {
        '& $line': {
            backgroundColor:theme.palette.secondary.main,
        },
    },
    completed: {
        '& $line': {
            backgroundColor:theme.palette.secondary.main
        },  
    },
    line: {
        height: 4,
        border: 0,
        backgroundColor: '#ccc',
        borderRadius: 1,
    },
}
})(StepConnector);

const useStyles = makeStyles({
    button:{
        padding:'2rem 4rem',
        marginRight:'1rem'
    }
})
  


 
const CustomStepper = ({steps,stepContent,stepIcons,progressDisabled}) => {
    const classes = useStyles();
    const history = useHistory();
    const { activeStep,setActiveStep,setCourse,defaultCourse } = useContext(AppContext);

    const CustomStepIcon = ({icon, completed, active})=>{
        const iconClasses = useStepIconStyles();        
        return (
          <div className={`${iconClasses.root} ${active?iconClasses.active:""} ${completed?iconClasses.completed:""} `}>
            {stepIcons[icon-1]}
          </div>
        )
    }
    

    const handleNext = () => {
        if(activeStep===2) {
            setCourse(defaultCourse)
            setActiveStep(0)
            
            history.push('/dashboard')
        }
        setActiveStep((prevActiveStep) => prevActiveStep<3?prevActiveStep + 1:prevActiveStep);
    }
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep>0?prevActiveStep - 1:prevActiveStep);
    const handleCancel = ()=> {
        history.push('/courses')
    }

    return (
        <div className="stepper_container">             
            <Stepper alternativeLabel activeStep={activeStep} connector={<CustomConnector />} >
            {steps.map((label) => (
            <Step key={label}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                    <h2>{label}</h2>
                </StepLabel>
            </Step>
            ))}
            </Stepper>
            <div className="stepper_content">
                {stepContent[activeStep]}
            </div>

            <div className="stepper_controls_container">
                <div className="cancel">
                    <Button className={classes.button} variant="contained" color="secondary" onClick={handleCancel} >
                        Cancel
                    </Button>
                </div>
                <div className="stepper_controls">
                    <Button className={classes.button} disabled={activeStep === 0} variant="outlined" onClick={handleBack} >
                        Back
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={progressDisabled}
                    >
                    {activeStep >= steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>

        </div>
    )
}
 
export default CustomStepper