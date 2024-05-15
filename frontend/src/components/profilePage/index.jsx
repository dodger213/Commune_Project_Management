import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Label from '../main/components/label/label';
import axios from 'axios';
import { Link } from 'react-router-dom'

function ProfilePage() {
    const { useState } = React;
    const { user } = useSelector((state) => state.users);

    const [userData, setUserData] = useState({});
    useEffect(() => {
        const getUserData = async () => {
            const { data } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/user/" + user?._id)
            setUserData(data.user)
        }
        if (user) {
            getUserData();
        }
    }, [user]);

    return (
        <div className="w-full md:h-screen dark:bg-[rgb(18,18,18)] bg-[rgb(249,250,251)]">
            <div className='pt-[120px] w-full'>
                <div className=' z-10 ml-auto'>
                    <div className='justify-center m-auto flex group items-center h-[6rem] w-[6rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] lg:h-[12rem] lg:w-[12rem] md:h-[9rem] md:w-[9rem] dark:border-[rgb(33,33,33)] border-[#ffffff] border-[5px] rounded-[50%]'>
                        <span className='w-full h-full flex overflow-y-hidden'>
                            <img className='w-full shadow-lg' src={(user?.avatar === 'default' || !user?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${user?.avatar}`} alt="" />
                        </span>
                    </div>

                </div>
                <div className='flex justify-center gap-[10px]'>
                    {userData?.role?.map((a, idx) => (
                        <Label key={idx} color="error" className=" -ml-[15px] mt-[35px]">{a}</Label>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center" style={{ fontFamily: 'Smack' }}>
                    <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none p-3">
                        <div className="grid md:grid-cols-2 gap-4 px-2 w-full mt-[50px]">
                            <div className="flex flex-col items-start justify-center rounded-2xl shadow-sm bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Email</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                    {userData?.email}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center shadow-sm rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Age</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                    {userData?.age}
                                </p>
                            </div>

                            <div className="flex flex-col items-start justify-center shadow-sm rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Discord Name</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                    {userData?.discordName}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl shadow-sm bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Discord ID</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                    {userData?.discordId}
                                </p>
                            </div>

                            <div className="flex flex-col items-start justify-center shadow-sm rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400 " style={{ marginBottom: "10px" }}>Wallet Network</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                    {userData?.walletNetwork}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl shadow-sm bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Wallet Key</p>
                                <p className="text-[11px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                    {userData?.walletKey}
                                </p>
                            </div>

                            <div className="flex flex-col items-start justify-center shadow-sm rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400 " style={{ marginBottom: "10px" }}>Tech Stack</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                    {userData?.techStack}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl shadow-sm bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Github repo link</p>
                                <p className="text-[10px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                   <Link target='_blank' className='text-navy-700 dark:text-gray-200' to={userData?.githubLink}> {userData?.githubLink} </Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage