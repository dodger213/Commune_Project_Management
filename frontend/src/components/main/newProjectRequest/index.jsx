import React from 'react'
import { NewProjects } from './newprojects'

export default function NewProjectRequest() {
    return (
        <div className=' flex flex-col gap-[30px] justify-center items-center mt-[50px] mb-[50px]'>
            <NewProjects/>
            <NewProjects/>
        </div>
    )
}
