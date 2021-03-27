import React,{ useState } from 'react'

import DetailsIcon from '@material-ui/icons/Details';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';


import CustomStepper from 'components/CustomStepper';
import CourseDetailsForm from 'components/CourseDetailsForm';
import CreateModulesForm from 'components/CreateModulesForm';
import CreateCourseExam from 'components/CreateCourseExam';

import './create_course.css'

const CreateCourse = () => {
  let [moduleList,setModuleList] = useState([
      {
        name:"",
        description:"",
        duration:"",
        content:""
      }
  ])
  const steps = ["Course Details", "Modules", "Exams"]
  const stepContent = [<CourseDetailsForm/>,<CreateModulesForm moduleList = {moduleList} setModuleList = {setModuleList}/>,<CreateCourseExam/>]
  const stepIcons = [<DetailsIcon />,<ViewModuleIcon />,<QueryBuilderIcon />]
  

  return (
    <div style={{height:'calc(100vh - 8rem)'}}> 
        <h2 className="create_heading">Create course</h2>
        <CustomStepper steps={steps} stepContent={stepContent} stepIcons={stepIcons} />
    </div>
  )
}
 
export default CreateCourse