import React from 'react'
import Members from '../members'
import { UserView } from '../user/view'

function Devs() {
    return (
        <div className=' flex flex-col gap-[30px] justify-center items-center mt-[50px] mb-[50px]'>
            <UserView />
        </div>
    )
}

export default Devs