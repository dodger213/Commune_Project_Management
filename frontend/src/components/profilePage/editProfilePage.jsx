import React from 'react'
import Header from '../header'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUser } from "../../redux/actions/usersAction";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from 'react-router-dom';
const EditProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { useState } = React;
    const { isLoading, user, isLoadingPost } = useSelector((state) => state.users);
    const [avatarFile, setAvatarFile] = useState("");
    const [bannerFile, setBannerFile] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [link, setLink] = useState("");
    const [pubkey, setPubkey] = useState("");

    useEffect(() => {
        dispatch(getUser);
        if (user) {
            setAvatarFile(user.user.avatarFile)
            setBannerFile(user.user.bannerFile)
            setUsername(user.user.username)
            setEmail(user.user.email)
            setLink(user.user.link)
            setBio(user.user.bio)
        }
    }, [dispatch, isLoadingPost]);

    const saveProfile = () => {
        if (avatarFile || bannerFile || username || bio || email || link) {
            const data = {
                username: username,
                bio: bio,
                email: email,
                link: link,
                pubkey: pubkey,
                avatarFile: avatarFile,
                bannerFile: bannerFile,
            }
            dispatch(createUser(data));
        }
    }

    const handleAvatarFile = (e) => {
        setAvatarFile(URL.createObjectURL(e.target.files[0]));
    };

    const handleBannerFile = (e) => {
        setBannerFile(URL.createObjectURL(e.target.files[0]));
    };


    return (
        <div className="w-full overflow-y-hidden dark:bg-[rgb(18,18,18)]" >
            <Header />
            <div className=' flex w-full justify-center items-center mt-[80px] dark:border-t border-solid dark:border-[#303030]'>
                <div className=' justify-center items-center w-[20%] border-r dark:border-[#303030] border-solid border-gray-300 hidden lg:flex'>
                    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-none dark:bg-[rgb(18,18,18)] bg-[#ffffff]">
                        <div className="mb-2 p-2">
                            <Typography variant="h5" color="blue-gray" style={{ fontFamily: 'Smack' }} className='dark:text-[#c0c0c0]'>
                                Settings
                            </Typography>
                        </div>
                        <List style={{ fontFamily: 'Smack' }} className=' dark:text-white text-[21px]'>
                            <ListItem>
                                <ListItemPrefix className=' pr-4'>
                                    {/* <PresentationChartBarIcon className="h-5 w-5" /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </ListItemPrefix>
                                Profile
                            </ListItem>
                        </List>
                    </Card>
                </div>
                <div className='flex justify-start items-start w-[100%] overflow-y-visible flex-col px-[10px] sm:px-[100px] lg:w-[80%]' style={{ fontFamily: 'Smack' }}>
                    <div className=' flex justify-center items-center  md:justify-start md:items-start text-[rgb(18,18,18)] w-full dark:text-white text-[30px] mt-[30px] lg:mt-[-30px]'>Profile details</div>
                    <div className='flex justify-center items-center  md:justify-start md:items-start mt-[50px] w-full md:gap-[100px] gap-[50px] md:flex-row flex-col'>
                        <div className='flex justify-start items-start flex-col'>
                            <div className='flex justify-start w-full items-start flex-col'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter username" />
                            </div>
                            <div className='flex justify-center items-start w-full flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Bio</label>
                                <textarea type="text" value={bio} onChange={(e) => setBio(e.target.value)} className="py-2 px-3 w-[350px] h-[100px] block border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Tell the world your story!" />
                            </div>
                            <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Email Address</label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter email" />
                            </div>
                            <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Links</label>
                                <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Your website.io" />
                            </div>
                            <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Wallet Address</label>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">
                                    <ConnectButton.Custom>
                                        {({
                                            account,
                                            chain,
                                            openAccountModal,
                                            openChainModal,
                                            openConnectModal,
                                            authenticationStatus,
                                            mounted,
                                        }) => {
                                            // Note: If your app doesn't use authentication, you
                                            // can remove all 'authenticationStatus' checks
                                            const ready = mounted && authenticationStatus !== 'loading';
                                            const connected =
                                                ready &&
                                                account &&
                                                chain &&
                                                (!authenticationStatus ||
                                                    authenticationStatus === 'authenticated');

                                            return (
                                                <div
                                                    {...(!ready && {
                                                        'aria-hidden': true,
                                                        'style': {
                                                            opacity: 0,
                                                            pointerEvents: 'none',
                                                            userSelect: 'none',
                                                        },
                                                    })}
                                                >
                                                    {(() => {
                                                        if (!connected) {
                                                            navigate('/');
                                                            return (
                                                                <div className=" flex gap-[4px] justify-center items-center">
                                                                    unconnected
                                                                </div>
                                                            );
                                                        }

                                                        if (chain.unsupported) {
                                                            return (
                                                                <button onClick={openChainModal} style={{ boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px' }}>
                                                                    Wrong network
                                                                </button>
                                                            );
                                                        }
                                                        if (connected) {
                                                            setPubkey(account.displayName);
                                                        }
                                                        return (
                                                            <div className=" flex justify-start items-center">
                                                                {account.displayName}
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            );
                                        }}
                                    </ConnectButton.Custom>
                                </label>
                            </div>
                        </div>
                        <div className='flex justify-center items-center flex-col'>
                            <div className='flex justify-center items-center flex-col w-full'>
                                <div className='flex justify-start items-start w-full dark:text-white text-[rgb(18,18,18)] text-[17px]'>Profile Image</div>
                                <div className=' mt-[20px] w-full'>
                                    <div className='justify-center flex group items-center h-[10rem] w-[10rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer dark:border-[rgb(18,18,18)] border-[#ffffff] border-[5px] rounded-[50%]'>
                                        {avatarFile ?
                                            <span className='w-full h-full flex overflow-y-hidden'>
                                                <img className='w-full' src={avatarFile} alt="" />
                                                {/* <img className='w-full' src='./images/12.png' alt="" /> */}
                                            </span>
                                            : <span className='w-full h-full'>
                                                {/* <img className=' w-full h-full' src='' alt="" /> */}
                                                <div className=' w-full h-full'>
                                                </div>
                                            </span>
                                        }
                                    </div>
                                    <div className='justify-center bg-none flex group items-center mt-[-158px] h-[10rem] w-[10rem] overflow-y-hidden transition-all cursor-pointer rounded-[50%]'>
                                        <span className='profile_banner_edit_but opacity-[0.0001] w-fit m-auto flex justify-center items-center group-hover:opacity-100 transition-all lg:mt-[-100px] md:mt-[-70px] mt-[-50px] absolute'>
                                            <svg className="h-5 w-5 text-[#ffffff] sm:h-8 sm:w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                        </span>
                                        <input type="file" onChange={handleAvatarFile} className="opacity-0 w-full h-full cursor-pointer border rounded-[50%]" />
                                    </div>
                                </div>
                            </div>
                            <div className=' mt-[30px] w-full mb-[30px]'>
                                <div className='flex justify-start items-start w-full dark:text-white text-[rgb(18,18,18)] text-[17px]'>Profile Banner</div>
                                <div className=' mt-[20px] w-full'>
                                    <div className='justify-center flex group items-center h-[8rem] w-[10rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer dark:border-[rgb(18,18,18)] border-[#ffffff] border-[5px] rounded-[20px]'>
                                        {bannerFile ?
                                            <span className='w-full h-full flex bg-contain bg-no-repeat bg-center overflow-y-hidden'>
                                                <img className='w-full' src={bannerFile} alt="" />
                                            </span>
                                            : <span className='w-full h-full'>
                                                {/* <img className=' w-full h-full' src='' alt="" /> */}
                                                <div className=' w-full h-full'>
                                                </div>
                                            </span>
                                        }
                                    </div>
                                    <div className='justify-center bg-none flex group items-center mt-[-130px] h-[8rem] w-[10rem] overflow-y-hidden transition-all cursor-pointer rounded-[20px]'>
                                        <span className='profile_banner_edit_but opacity-[0.0001] w-fit m-auto flex justify-center items-center group-hover:opacity-100 transition-all lg:mt-[-100px] md:mt-[-70px] mt-[-50px] absolute'>
                                            <svg className="h-5 w-5 text-[#ffffff] sm:h-8 sm:w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                        </span>
                                        <input type="file" onChange={handleBannerFile} className="opacity-0 w-full h-full cursor-pointer border rounded-[20px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' flex justify-center items-center  md:justify-start md:items-start w-full mt-[30px] mb-[40px]'>
                        <div onClick={saveProfile} style={{ fontFamily: 'Might', width: '100px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
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
