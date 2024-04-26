import React from 'react'
import Header from "../header";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUser } from "../../redux/actions/usersAction";

function ProfilePage() {
    const { useState } = React;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, user, isLoadingPost } = useSelector((state) => state.users);

    const [bannerFile, setBannerFile] = useState();
    const [userName, setUserName] = useState('unnamed');
    const [email, setEmail] = useState('fam@gmail.com');
    const [bio, setBio] = useState('Your bio here.');
    const [avatarFile, setAvatarFile] = useState("./images/12.png");
    const [link, setLink] = useState();

    useEffect(() => {
        dispatch(getUser);
        if (user) {
            setAvatarFile(user.user.avatarFile)
            setBannerFile(user.user.bannerFile)
            setUserName(user.user.username)
            setEmail(user.user.email)
            setLink(user.user.link)
            setBio(user.user.bio)
        }
    }, [dispatch, isLoadingPost]);

    const handleBannerFile = (e) => {
        setBannerFile(URL.createObjectURL(e.target.files[0]));
    };
    const handleAvatarFile = (e) => {
        setAvatarFile(URL.createObjectURL(e.target.files[0]));
    };
    const editProfilePageOpen = (e) => {
        navigate("/profile/edit")
    }
    return (
        <div className="w-full h-screen overflow-y-hidden dark:bg-[rgb(18,18,18)]">
            <Header />
            <div className=''>
                <div className=' w-full justify-center group profile_banner items-center h-[10rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer lg:h-[25rem] md:h-[15rem]'>
                    {bannerFile ?
                        <span className='w-full h-full flex bg-contain bg-no-repeat bg-center overflow-y-hidden'>
                            <img className='w-full h-fit' src={bannerFile} alt="" />
                        </span>
                        : <span className='w-full h-full'>
                            {/* <img className=' w-full h-full' src='' alt="" /> */}
                            <div className=' w-full h-full'>
                            </div>
                        </span>
                    }
                    <span className='profile_banner_edit_but opacity-[0.0001] w-full flex justify-center items-center group-hover:opacity-100 transition-all lg:mt-[-100px] md:mt-[-70px] mt-[-50px] absolute'>
                        <svg className="h-5 w-5 text-[#ffffff] md:h-8 md:w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                    </span>
                    <input type="file" onChange={handleBannerFile} className="opacity-0 w-full h-[20rem] absolute cursor-pointer mt-[-20rem]" />
                </div>
                <div className=' absolute z-10 mt-[-70px] lg:mt-[-160px] md:mt-[-110px] ml-[40px] lg:ml-[70px]'>
                    <div className='justify-center flex group items-center h-[6rem] w-[6rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer lg:h-[12rem] lg:w-[12rem] md:h-[9rem] md:w-[9rem] dark:border-[rgb(18,18,18)] border-[#ffffff] border-[5px] rounded-[50%]'>
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
                    <div className='justify-center bg-none flex group items-center mt-[-98px] md:mt-[-145px] lg:mt-[-192px] h-[6rem] w-[6rem] overflow-y-hidden transition-all cursor-pointer lg:h-[12rem] lg:w-[12rem] md:h-[9rem] md:w-[9rem] rounded-[50%]'>
                        <span className='profile_banner_edit_but opacity-[0.0001] w-fit m-auto flex justify-center items-center group-hover:opacity-100 transition-all lg:mt-[-100px] md:mt-[-70px] mt-[-50px] absolute'>
                            <svg className="h-5 w-5 text-[#ffffff] md:h-8 md:w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                        </span>
                        <input type="file" onChange={handleAvatarFile} className="opacity-0 w-full h-full cursor-pointer border rounded-[50%]" />
                    </div>
                </div>
                <div className=' flex flex-wrap'>
                    <div className=' w-[90%] lg:w-[350px] md:w-[40%] flex flex-col justify-center items-center pl-[40px] md:pl-[60px] lg:pl-[90px]'>
                        <div className=' flex justify-start items-start mt-[50px] w-full'>
                            <p className=' text-[rgb(18,18,18)] dark:text-white text-[35px] first-letter:uppercase' style={{ fontFamily: 'Smack' }}>{userName}</p>
                        </div>
                        {/* <div className=' w-full mt-[50px]'>
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
                                                    navigate("/")
                                                    return (
                                                        <div className=" flex gap-[4px] justify-center items-center">

                                                        </div>
                                                    );
                                                }

                                                if (chain.unsupported) {
                                                    return (
                                                        <button onClick={openChainModal} type="button" style={{ boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px' }}>
                                                            Wrong network
                                                        </button>
                                                    );
                                                }
                                                return (
                                                    <div className=" flex flex-col gap-[15px] justify-center items-start">
                                                        <div
                                                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-3 rounded-lg bg-gradient-to-tr from-[#ffffff] dark:from-[rgb(27,27,27)] dark:to-[rgb(27,27,27)] to-[#dedede] text-[rgb(18,18,18)] dark:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-1"
                                                            type="button" style={{ fontFamily: 'Smack' }}>
                                                            <span>

                                                                {chain.hasIcon && (
                                                                    <div
                                                                        style={{
                                                                            background: chain.iconBackground,
                                                                            borderRadius: 999,
                                                                            overflow: 'hidden',
                                                                            marginRight: 4,
                                                                        }}
                                                                    >
                                                                        {chain.iconUrl && (
                                                                            <img
                                                                                alt={chain.name ?? 'Chain icon'}
                                                                                src={chain.iconUrl}
                                                                                className=' w-[25px] h-[25px]'
                                                                            />
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </span>
                                                            <span className=" text-[15px] first-letter:uppercase lowercase text-[rgb(18,18,18)] dark:text-white">
                                                                {chain.name}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[10px] px-3 rounded-lg bg-gradient-to-tr from-[#ffffff] dark:from-[rgb(27,27,27)] dark:to-[rgb(27,27,27)] to-[#dedede] text-[rgb(18,18,18)] dark:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-2"
                                                            type="button" style={{ fontFamily: 'Smack' }}>
                                                            <span className=" text-[15px] uppercase text-[rgb(18,18,18)] dark:text-white">
                                                                {account.displayBalance
                                                                    ? account.displayBalance
                                                                    : ''}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[10px] px-3 rounded-lg bg-gradient-to-tr from-[#ffffff] dark:from-[rgb(27,27,27)] dark:to-[rgb(27,27,27)] to-[#dedede] text-[rgb(18,18,18)] dark:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-2"
                                                            type="button" style={{ fontFamily: 'Smack' }}>
                                                            <span className=" text-[15px] first-letter:uppercase lowercase text-[rgb(18,18,18)] dark:text-white">
                                                                {account.displayName}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    );
                                }}
                            </ConnectButton.Custom>
                        </div> */}
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
                        {/* <button onClick={editProfilePageOpen}
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[14px] px-3 rounded-lg bg-gradient-to-tr from-[#ffffff] dark:from-[rgb(27,27,27)] dark:to-[rgb(27,27,27)] to-[#dedede] text-[rgb(18,18,18)] dark:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-2"
                            type="button" style={{ fontFamily: 'Smack' }}>
                            <span className=" text-[20px] first-letter:uppercase lowercase text-[rgb(18,18,18)] dark:text-white">
                                Edit Profile
                            </span>
                        </button> */}
                        <a onClick={editProfilePageOpen} style={{ fontFamily: 'Might', width: '100%', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[0.5rem] cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-md bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4] "></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-md from-[#256fc4] to-[#256fc4] "></span>
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4] "></span>
                            <span className="relative">Edit Profile</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage