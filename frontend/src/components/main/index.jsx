import React from 'react'
import AllProjects from './allProjects'
import MyProjects from './myProject'
import ReviewRequest from './reviewRequest'
import NewProjectRequest from './newProjectRequest'
import Pms from './pms'
import Devs from './devs'
import { Alerts } from '../notification'

function Main() {
  return (
    <div className='w-full'>
      <Devs />
      {/* <Pms /> */}
      {/* <MyProjects /> */}
      {/* <AllProjects /> */}
      {/* <NewProjectRequest /> */}
    </div>
  )
}

export default Main
