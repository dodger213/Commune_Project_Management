import React from 'react'
import AllProjects from './allProjects'
import MyProjects from './myProject'
import ReviewRequest from './reviewRequest'
import NewProjectRequest from './newProjectRequest'
import Pms from './pms'
import Devs from './devs'
import { Alerts } from '../notification'
import { Flip } from "react-reveal";

function Main() {
  return (
    <div className='w-full'>
      <Flip right>
        <div className='fixed mt-[30px] right-[50px]'>
          <Alerts />
        </div>
      </Flip>
      <Devs />
      <Pms/>
      <MyProjects/>
      <AllProjects />
      <NewProjectRequest/>
    </div>
  )
}

export default Main
