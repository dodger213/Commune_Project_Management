import React from 'react'
import { Fade } from 'react-reveal';
import { useNavigate } from "react-router-dom";
import Header from "../header";

function LoginPage() {

    const navigate = useNavigate();
    const OpenSignupPage = () => {
        navigate('/signup')
    }

    return (
        <div className="w-full h-full">
            <Header />
            <div id="home" className="w-full z-[2] dark:bg-[rgb(18,18,18)] transition-all h-screen">
                <div className="flex justify-center items-center h-full">
                    <div className="w-full mx-auto main-visual flex flex-wrap items-center justify-center h-full">
                        <div className="w-full flex flex-row items-center justify-between main-visual">
                            <div className="w-[100%] md:max-w-[50%] mt-[-100px]" style={{ fontFamily: 'Smack' }} >
                                <section className="bg-[#fff] dark:bg-[rgb(18,18,18)]">
                                    <div className="flex flex-col mt-[100px] items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                        <div className="w-full bg-[#fff] md:ml-[150px] ml-[0px] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-[rgb(33,33,33)]">
                                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                                    Sign in to your account
                                                </h1>
                                                <form className="space-y-4 md:space-y-6" action="#">
                                                    <div>
                                                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                                        <input type="email" name="email" id="email" className="bg-gray-50 border-[1px] border-[rgb(209,213,219)] outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-[rgb(33,33,33)] dark:placeholder-gray-400 dark:text-[#fff] focus:ring-blue-500 focus:border-blue-500 dark:focus:border-[#4f4f4f] dark:border-[#303030] emailInput" placeholder="name@comdev.com" required="" />
                                                    </div>
                                                    <div>
                                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 outline-none border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-[rgb(33,33,33)] dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 dark:focus:border-[#4f4f4f] dark:border-[#303030]" required="" />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-start">
                                                            <div className="flex items-center h-5">
                                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#256fc4] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[#256fc4] dark:ring-offset-gray-800" required="" />
                                                            </div>
                                                            <div className="ml-3 text-sm">
                                                                <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                                            </div>
                                                        </div>
                                                        <span className="text-sm cursor-pointer font-medium text-[#256fc4] hover:underline dark:text-[#256fc4]">Forgot password?</span>
                                                    </div>
                                                    <button type="submit" className="w-full text-white bg-[#256fc4] hover:bg-[#4788d2] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                                    {/* <div style={{ fontFamily: 'Might', width: '100%', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                                        <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                                        <span className="relative">Sign In</span>
                                                    </div> */}

                                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                        Don’t have an account yet? <span onClick={OpenSignupPage} className="font-medium cursor-pointer text-[#256fc4] hover:underline dark:text-[#256fc4]">Sign up</span>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </section>
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
        </div>
    )
}

export default LoginPage
