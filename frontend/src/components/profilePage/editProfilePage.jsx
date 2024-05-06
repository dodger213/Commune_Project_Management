import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationManager } from "react-notifications";
import { getUser } from '../../redux/actions/usersAction';

import axios from 'axios';

const EditProfilePage = () => {
    const { useState } = React;
    const { user } = useSelector((state) => state.users);
    const [userData, setUserData] = useState({});

    const [avatarFile, setAvatarFile] = useState({ file: null, url: "" });
    const dispatch = useDispatch();
    useEffect(() => {
        setUserData(user);
    }, [user])
    // useEffect(() => {
    //     if (user) {
    //         getUserData();
    //     }
    // }, [user]);
    // const getUserData = async () => {
    //     const { data } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/user/" + user?._id)
    //     setUserData(data.user);
    // }
    const saveProfile = async () => {
        const formData = new FormData();
        let avatar = '';
        if (avatarFile.file) {
            formData.append("file", avatarFile.file);
            try {
                const { data: { fileName } } = await axios.post(process.env.REACT_APP_API_BASE_URL + "/file/", formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                avatar = fileName;
            }
            catch (e) {
                NotificationManager.error('File not uploaded', 'Error')
            }
        }
        try {
            await axios.put(process.env.REACT_APP_API_BASE_URL + "/user/" + user?._id, avatar === "" ? userData : { ...userData, avatar })
            NotificationManager.success('User updated successfully', 'Success')
            // getUserData();
            dispatch(getUser(userData?._id));
        }
        catch (e) {
            NotificationManager.error(e.response.data.msg, 'Error')
        }
    }

    const handleAvatarFile = (e) => {
        if (e.target.files[0]) {
            setAvatarFile({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
        } else {
            setAvatarFile({ file: null, url: "" });
        }
    };

    return (
        <div className="w-full md:h-screen dark:bg-[rgb(18,18,18)]" >
            <div className=' flex w-full justify-center items-center pt-[120px] mb-[60px]'>
                <div className='flex justify-center items-start w-[100%] overflow-y-visible flex-col px-[10px] sm:px-[100px]' style={{ fontFamily: 'Smack' }}>
                    {/* <div className=' flex justify-center items-center  md:justify-start md:items-start text-[rgb(18,18,18)] w-full dark:text-white text-[30px] mt-[30px] lg:mt-[-30px]'>Profile details</div> */}
                    <div className='flex justify-center items-center w-full'>
                        <div className='flex justify-center items-center w-full'>
                            <div className=' mt-[20px] w-full flex justify-center items-center'>
                                <div className='justify-center absolute bg-none flex group items-center h-[10rem] w-[10rem] overflow-y-hidden transition-all cursor-pointer rounded-[50%]'>
                                    <span className='profile_banner_edit_but opacity-[0.0001] w-fit m-auto flex justify-center items-center group-hover:opacity-100 transition-all lg:mt-[-100px] md:mt-[-70px] mt-[-50px] absolute'>
                                        <svg className="h-5 w-5 text-[#ffffff] sm:h-8 sm:w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                    </span>
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={handleAvatarFile} className="opacity-0 w-full h-full cursor-pointer border rounded-[50%]" />
                                </div>
                                <div className='justify-center flex group items-center h-[10rem] w-[10rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer dark:border-[rgb(18,18,18)] border-[#ffffff] border-[5px] rounded-[50%]'>

                                    {avatarFile.file ?
                                        <span className='w-full h-full flex overflow-y-hidden'>
                                            <img className='w-full shadow-lg' src={avatarFile.url} alt="" />
                                        </span>
                                        : <span className='w-full h-full flex overflow-y-hidden'>
                                            <img className='w-full shadow-lg' src={(userData?.avatar === 'default' || !userData?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_URL}/${userData?.avatar}`} alt="" />
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-[50px] w-full md:gap-[100px] gap-[50px] md:flex-row flex-col'>
                        <div className='flex justify-start items-start flex-col'>
                            <div className='flex justify-start w-full items-start flex-col'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Email</label>
                                <input
                                    value={userData?.email}
                                    onChange={({ target: { value: email } }) => {
                                        setUserData({ ...userData, email });
                                    }}
                                    type="text" className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter email" />
                            </div>
                            <div className='flex justify-center items-start w-full flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Discord Name</label>
                                <input
                                    value={userData?.discordName}
                                    onChange={({ target: { value: discordName } }) => {
                                        setUserData({ ...userData, discordName });
                                    }}
                                    type="text" className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter discordname" />
                            </div>
                            <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Wallet Network</label>
                                <input
                                    value={userData?.walletNetwork}
                                    onChange={({ target: { value: walletNetwork } }) => {
                                        setUserData({ ...userData, walletNetwork });
                                    }}
                                    type="text" className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter wallet Network" />
                            </div>
                            <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Tech stack</label>
                                <input
                                    value={userData?.techStack}
                                    onChange={({ target: { value: techStack } }) => {
                                        setUserData({ ...userData, techStack });
                                    }}
                                    type="text" className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Your Tech stack" />
                            </div>
                        </div>
                        <div className='flex justify-start items-start flex-col'>
                            <div className='flex justify-start w-full items-start flex-col'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Age</label>
                                <input
                                    value={userData?.age}
                                    onChange={({ target: { value: age } }) => {
                                        setUserData({ ...userData, age });
                                    }}
                                    type="number" className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter age" />
                            </div>
                            <div className='flex justify-center items-start w-full flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Discord ID</label>
                                <input
                                    value={userData?.discordId}
                                    onChange={({ target: { value: discordId } }) => {
                                        setUserData({ ...userData, discordId });
                                    }}
                                    type="text" className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter discord Id" />
                            </div>
                            <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Wallet Key</label>
                                <input
                                    value={userData?.walletKey}
                                    onChange={({ target: { value: walletKey } }) => {
                                        setUserData({ ...userData, walletKey });
                                    }}
                                    type="text" className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter Wallet address" />
                            </div>
                            <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Git Repo</label>
                                <input
                                    value={userData?.githubLink}
                                    onChange={({ target: { value: githubLink } }) => {
                                        setUserData({ ...userData, githubLink });
                                    }}
                                    type="text" className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Your Git Repo Link" />
                            </div>
                        </div>

                    </div>
                    <div className=' flex justify-center items-center w-full mt-[50px] mb-[40px]'>
                        <div onClick={saveProfile} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                            <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                            <span className="relative">Save</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditProfilePage
