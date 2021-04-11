import React from 'react'
import HandleIllegalRoutes from 'services/HandleIllegalRoutes';

// import './dashboard.css'
 
const Dashboard = () => {
  HandleIllegalRoutes()
  return (
    <div>
      Dashboard
    </div>
  )
}
 
export default Dashboard