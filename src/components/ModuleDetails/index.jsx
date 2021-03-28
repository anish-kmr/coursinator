import React from 'react'

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import './module_details.css'
 
const ModuleDetails = (props) => {
    console.log('props',props)
    let module = props.module || props.history.location.state.module;
    if(module.duration) {
        module.durationTime = module.duration.split('-')[0]; 
        module.durationUnit = module.duration.split('-')[1]; 
    }
    // document.getElementById("module_content") .innerHTML = module.content;
    return (
        <div className="module_details_container" >
            <div className="module_name">{module.name}</div>
            <div className="duration"> 
                <QueryBuilderIcon/>
                {`${module.durationTime} ${module.durationUnit}`} 
            </div>
            <div className="module_content" dangerouslySetInnerHTML={{__html:module.content}}  />
                
        </div>
    )
}
 
export default ModuleDetails