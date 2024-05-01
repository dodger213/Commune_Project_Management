import React from 'react'
import { Projects } from '../projects'

export default function AllProjects() {
    return (
        <div className=' flex flex-col gap-[30px] justify-center items-center mt-[50px] mb-[50px]'>
            <div className=' w-full flex justify-end mr-[320px]'>
                <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[12px] px-6 rounded-lg bg-gray-900 dark:bg-[rgb(36,36,36)] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                    data-ripple-light="true"
                    style={{ fontFamily: "Smack" }}
                >
                    New Project</button>
            </div>
            <Projects />
            <Projects />
            <Projects />
            <Projects />
            <Projects />
        </div>
    )
}
