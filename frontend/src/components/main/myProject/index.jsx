import React from 'react'
import { MyProjects } from './myProject'

export default function reviewRequest() {
    return (
        <div className=' flex flex-col gap-[30px] justify-center items-center mt-[50px] mb-[50px]'>
            <MyProjects/>
            <MyProjects/>
        </div>
    )
}
