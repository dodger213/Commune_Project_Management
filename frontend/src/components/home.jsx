import React from 'react'
import { Fade } from 'react-reveal';
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate(`all-bounties`);
    }
    return (

        <div id="home" className="w-full z-[2] dark:bg-[rgb(18,18,18)] transition-all h-screen">
            <div className="flex justify-center items-center h-full">
                <div className="w-full mx-auto main-visual flex flex-wrap items-center justify-center h-full">
                    <div className="w-full flex flex-row items-center justify-between main-visual">
                        <div className="w-[50%] md:max-w-[50%] mt-[-100px]">
                            <Fade right cascade>
                                <div className="pt-[0px] w-full flex justify-center items-center flex-col gap-2">
                                    <h1 className=" text-[3rem] pb-3 dark:text-white text-center">
                                        Commune <span className="text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500">Management</span>
                                    </h1>
                                    <p className="hero__subtitle text-2xl text-center dark:text-white">
                                        For <span className="text-[#ffb4ed] dark:text-[#FFD6F5]">Developers</span> <span className="text-[#6db1ff] dark:text-[#6db1ff]">Project Managers</span> <span className="text-[#FF8F8F]  dark:text-[#FF8F8F]">and</span> <span className="text-[#ffef40] dark:text-[#FFF7A1]">Fam</span>.
                                    </p>
                                    <button onClick={handleStart} className="relative inline-flex items-center px-12 py-3 mt-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 dark:text-white border-indigo-600 hover:text-white dark:border-white rounded-full dark:hover:text-[rgb(18,18,18)] group hover:bg-gray-50 dark:bg-[rgb(18,18,18)]">
                                        <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 dark:bg-white opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                        <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                        <span className="relative">Get Started</span>
                                    </button>
                                </div>
                            </Fade>
                        </div>
                        <div className='hidden md:flex md:flex-col items-center justify-end w-[50%] '>
                            <Fade right cascade>
                                <img src="./images/commune.gif" className="mt-[0px] max-w-[720px] max-h-[680px] w-[50%]" alt="" />
                            </Fade>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )

}

export default HomePage;
