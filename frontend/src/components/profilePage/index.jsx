import React from 'react'
import Header from "../header";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUser } from "../../redux/actions/usersAction";

function ProfilePage() {
    const { useState } = React;
    const dispatch = useDispatch();
    const { isLoading, user, isLoadingPost } = useSelector((state) => state.users);

    const [age, setAge] = useState('30');
    const [email, setEmail] = useState('comdev@gmail.com');
    const [discordName, setDiscordName] = useState('potter');
    const [discordId, setDiscordId] = useState('potter2321po.');
    const [avatarFile, setAvatarFile] = useState("./images/12.png");
    const [walletNet, setWalletNet] = useState("ETH");
    const [walletKey, setWalletKey] = useState("0x....");
    const [techStack, setTechStack] = useState("Web3 & AI");
    const [gitRepo, setGitRepo] = useState("github.com/potter1990po");

    useEffect(() => {
        dispatch(getUser);
        if (user) {
            setAvatarFile(user.user.avatarFile)
            setDiscordName(user.user.discordName)
            setEmail(user.user.email)
            setDiscordId(user.user.discordId)
            setWalletNet(user.user.walletNet)
            setWalletKey(user.user.walletKey)
            setTechStack(user.user.techStack)
            setGitRepo(user.user.gitRepo)
            setAge(user.user.age)
        }
    }, [dispatch, isLoadingPost,user]);

    return (
        <div className="w-full overflow-y-hidden md:h-screen dark:bg-[rgb(18,18,18)] bg-[#eee]">
            <Header />
            <div className=' mt-[120px] w-full'>
                <div className=' z-10 ml-auto'>
                    <div className='justify-center m-auto flex group items-center h-[6rem] w-[6rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] lg:h-[12rem] lg:w-[12rem] md:h-[9rem] md:w-[9rem] dark:border-[rgb(33,33,33)] border-[#ffffff] border-[5px] rounded-[50%]'>
                        {avatarFile ?
                            <span className='w-full h-full flex bg-contain bg-no-repeat bg-center overflow-y-hidden'>
                                <img className='w-full h-fit' src={avatarFile} alt="" />
                            </span>
                            : <span className='w-full h-full'>
                                {/* <img className=' w-full h-full' src='' alt="" /> */}
                                <div className=' w-full h-full'>
                                </div>
                            </span>
                        }
                    </div>
                </div>
                {/* <div className=' flex flex-wrap'>
                    <div className=' w-[90%] lg:w-[350px] md:w-[40%] flex flex-col justify-center items-center pl-[40px] md:pl-[60px] lg:pl-[90px]'>
                        <div className=' flex justify-start items-start mt-[50px] w-full'>
                            <p className=' text-[rgb(18,18,18)] dark:text-white text-[35px] first-letter:uppercase' style={{ fontFamily: 'Smack' }}>{userName}</p>
                        </div>
                        
                    </div>
                    <div className=' w-[90%] md:w-[50%] max-xl:[35%] mt-[60px] max flex gap-[20px] justify-start items-start md:gap-[50px] pl-[40px] md:pl-[30px] lg:pl-[50px]'>
                        <div className='hidden justify-start flex-col items-start gap-[50px] md:flex'>
                            <p className=' text-[rgb(18,18,18)] dark:text-white text-[25px] first-letter:uppercase' style={{ fontFamily: 'Smack' }}>Email</p>
                            <p className=' text-[rgb(18,18,18)] dark:text-white text-[25px] first-letter:uppercase' style={{ fontFamily: 'Smack' }}>Bio</p>
                        </div>
                        <div className='flex justify-start items-start flex-col gap-[50px] mt-[5px] xl:w-[70%] w-full'>
                            <p className=' text-[rgb(18,18,18)] dark:text-white text-[20px] first-letter:uppercase' style={{ fontFamily: 'Smack' }}>{email}</p>
                            <p className=' text-[rgb(18,18,18)] dark:text-white text-[20px] first-letter:uppercase' style={{ fontFamily: 'Smack' }}>{bio}</p>
                        </div>
                    </div>
                    <div className=' flex justify-end items-end  pl-[40px] md:pl-[60px] lg:pl-[90px] mt-[30px]'>
                        <span onClick={editProfilePageOpen} style={{ fontFamily: 'Might', width: '100%', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[0.5rem] cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-md bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4] "></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-md from-[#256fc4] to-[#256fc4] "></span>
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4] "></span>
                            <span className="relative">Edit Profile</span>
                        </span>
                    </div>
                </div> */}
                <div className="flex flex-col justify-center items-center" style={{ fontFamily: 'Smack' }}>
                    <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none p-3">
                        <div className="grid md:grid-cols-2 gap-4 px-2 w-full mt-[50px]">
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{marginBottom:"10px"}}>Email</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{marginBottom:"0"}}>
                                    {email}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{marginBottom:"10px"}}>Age</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{marginBottom:"0"}}>
                                    {age}
                                </p>
                            </div>

                            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{marginBottom:"10px"}}>Discord Name</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{marginBottom:"0"}}>
                                    {discordName}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{marginBottom:"10px"}}>Discord ID</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{marginBottom:"0"}}>
                                    {discordId}
                                </p>
                            </div>

                            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400 " style={{marginBottom:"10px"}}>Wallet Network</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{marginBottom:"0"}}>
                                    {walletNet}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{marginBottom:"10px"}}>Wallet Key</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{marginBottom:"0"}}>
                                    {walletKey}
                                </p>
                            </div>

                            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400 " style={{marginBottom:"10px"}}>Tech Stack</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{marginBottom:"0"}}>
                                    {techStack}
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{marginBottom:"10px"}}>Github repo link</p>
                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{marginBottom:"0"}}>
                                    {gitRepo}
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