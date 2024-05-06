import React, { useState } from 'react'
import { Fade } from 'react-reveal';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/actions/usersAction";
import { NotificationManager } from "react-notifications";



function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');
    const [discordName, setDiscordName] = useState('');
    const [agree, setAgree] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const OpenLoginPage = () => {
        navigate('/login')
    }


    const handleSignUp = () => {
        if (email === '') {
            NotificationManager.error('Input email address', 'Error')
            return;
        }
        if (discordName === '') {
            NotificationManager.error('Input your discord name', 'Error')
            return;
        }
        if (password === '') {
            NotificationManager.error('Input password', 'Error')
            return;
        }
        if (passwordConfirm !== password) {
            NotificationManager.error('Password does not match', 'Error')
            return;
        }
        if (!agree) {
            NotificationManager.error('Pleaseaccept the terms and conditions', 'Error')
            return;
        }
        dispatch(createUser({ email, password, discordName }));
    }

    return (
        <div className="w-full h-full">
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
                                                    Create an account
                                                </h1>
                                                <div className="space-y-4 md:space-y-6">
                                                    <div>
                                                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                                        <input
                                                            onChange={(({ target }) => {
                                                                setEmail(target.value)
                                                            })}
                                                            type="email" name="email" id="email" className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-[#256fc4] focus:border-[#256fc4] block w-full p-2.5 dark:bg-[rgb(33,33,33)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#4f4f4f] dark:border-[#303030]" placeholder="name@company.com" required="" />
                                                    </div>
                                                    <div>
                                                        <label for="discordName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your discord name</label>
                                                        <input
                                                            onChange={(({ target }) => {
                                                                setDiscordName(target.value)
                                                            })}
                                                            type="text" name="discordName" id="email" className="bg-gray-50 border-[1px] border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-[#256fc4] focus:border-[#256fc4] block w-full p-2.5 dark:bg-[rgb(33,33,33)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#4f4f4f] dark:border-[#303030]" required="" />
                                                    </div>
                                                    <div>
                                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                        <input
                                                            onChange={(({ target }) => {
                                                                setPassword(target.value)
                                                            })}
                                                            type="password" name="password" id="password" className="bg-gray-50 border-[1px] outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#256fc4] focus:border-[#256fc4] block w-full p-2.5 dark:bg-[rgb(33,33,33)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#4f4f4f] dark:border-[#303030]" required="" />
                                                    </div>
                                                    <div>
                                                        <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                                        <input
                                                            onChange={(({ target }) => {
                                                                setpasswordConfirm(target.value)
                                                            })}
                                                            type="password" name="confirm-password" id="confirm-password" className="bg-gray-50 border-[1px] outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#256fc4] focus:border-[#256fc4] block w-full p-2.5 dark:bg-[rgb(33,33,33)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#4f4f4f] dark:border-[#303030]" required="" />
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex items-center h-5">
                                                            <input onChange={(e) => {
                                                                setAgree(e.target.checked)
                                                            }} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border-[1px] outline-none border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#256fc4] dark:bg-[rgb(33,33,33)] dark:border-gray-600 dark:focus:ring-[#256fc4] dark:ring-offset-gray-800" required="" />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <span className="font-medium text-[#256fc4] cursor-pointer hover:underline dark:text-[#256fc4]">Terms and Conditions</span></label>
                                                        </div>
                                                    </div>
                                                    <button onClick={handleSignUp} className="w-full text-white bg-[#256fc4] hover:bg-[#4788d2] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                        Already have an account? <span onClick={OpenLoginPage} className="font-medium cursor-pointer text-[#256fc4] hover:underline dark:text-[#256fc4]">Login here</span>
                                                    </p>
                                                </div>
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

export default SignupPage
