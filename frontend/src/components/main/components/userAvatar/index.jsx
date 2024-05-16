import React from 'react'
import { useState } from 'react'
import Label from '../label/label';
import { Zoom } from 'react-reveal';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom'

function UserAvatar({ user }) {

    const [isDetail, setIsDetail] = useState(false);
    const [copyed, setCopyed] = useState(false);
    const showDetail = () => {
        setIsDetail(true);
    }
    const hiddenDetail = () => {
        setIsDetail(false);
    }

    const [openModal, setOpenModal] = useState(false);

    const handleModel = () => {
        setOpenModal(true)
    };

    const handleCancel = () => {
        setCopyed(false);
        setOpenModal(false);
    };
    const  copyToClipboard = (text) => {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = text;
    
        // Make sure the textarea is not visible
        textarea.style.position = 'fixed';
        textarea.style.opacity = 0;
    
        // Append the textarea to the DOM
        document.body.appendChild(textarea);
    
        // Select the textarea's content
        textarea.select();
    
        // Copy the selected content to the clipboard
        document.execCommand('copy');
    
        // Remove the textarea from the DOM
        document.body.removeChild(textarea);
      };
    const renderWalletKey = (key) =>{
        return (
            <div className='flex items-center'>
                <span>{key.slice(0,4) + '...' + key.slice(key.length - 5, key.length - 1)}</span>
                {!copyed?
                <svg onClick={() => {
                    copyToClipboard(key);
                    setCopyed(true)
                }}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-[10px] cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-[10px]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              
                }

            </div>
        )
    }
    if (!user) return null
    return (
        <>
            <div >
                <img onMouseEnter={showDetail} onMouseLeave={hiddenDetail} onClick={handleModel} className="rounded-[50%] cursor-pointer w-[40px] h-[40px] -ml-[15px]" style={{ maxWidth: " max-content" }} src={(user?.avatar === 'default' || !user?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${user?.avatar}`} alt="" />
            </div>
            <div className='relative z-[100]'>
                {isDetail ?
                    <div className="flex flex-col justify-center items-center z-[1000] w-[350px] absolute">
                        <div className="relative flex flex-col items-center p-[15px] rounded-[10px] dark:bg-[rgb(30,30,30)] bg-[#dedede] w-full mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none">
                            <div className=' w-full flex gap-[30px] justify-start items-center mt-[10px]'>
                                <img className="rounded-[50%] w-[70px] h-[70px] ml-[15px]" style={{ maxWidth: " max-content" }} src={(user?.avatar === 'default' || !user?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${user?.avatar}`} alt="" />
                                {user?.role.map((a, idx) => (
                                    <Label key={idx} color="error" className=" -ml-[15px] mt-[35px]">{a}</Label>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-1 w-full mt-[20px] p-[10px] rounded-[10px] dark:bg-[rgb(18,18,18)] bg-[#fff]">


                                <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400" style={{ marginBottom: "10px" }}>Discord Name</p>
                                    <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.discordName}
                                    </p>
                                </div>

                                <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400" style={{ marginBottom: "10px" }}>Discord ID</p>
                                    <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.discordId ?? '...'}
                                    </p>
                                </div>

                                {/* <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400 " style={{ marginBottom: "10px" }}>Wallet Network</p>
                                    <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.walletNetwork ?? '...'}
                                    </p>
                                </div> */}


                                <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400 " style={{ marginBottom: "10px" }}>Tech Stack</p>
                                    <p className="text-[11px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.techStack ?? '...'}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400" style={{ marginBottom: "10px" }}>Age</p>
                                    <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.age ?? '...'}
                                    </p>
                                </div>
                                <div className="flex flex-col w-full justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400" style={{ marginBottom: "10px" }}>Wallet Key</p>
                                    <p className="text-[11px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.walletKey ?? '...'}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400" style={{ marginBottom: "10px" }}>Github repo link</p>
                                    <p className="text-[11px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.githubLink ?? '...'}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div> : <></>}
            </div>
            {openModal ?
                <div className='fixed top-[0px] left-0 w-screen h-screen flex justify-center items-center z-[9999]'>
                    <div className='fixed w-screen h-screen top-0 left-0 bg-[#000] dark:bg-gray-500 opacity-40'>
                    </div>
                    <Zoom duration={500}>
                        <div className='w-[600px] h-[800px] flex justify-start rounded-[30px] items-center top-[100px] z-[500] bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>
                            <div className=' w-full'>
                                <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[100]' onClick={handleCancel}>
                                    <XCircleIcon class="h-10 w-10 text-gray-800 dark:text-white" />
                                </div>
                                <div className=' z-10 ml-auto mt-[50px]'>
                                    <div className='justify-center m-auto flex group items-center h-[6rem] w-[6rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] lg:h-[12rem] lg:w-[12rem] md:h-[9rem] md:w-[9rem] dark:border-[rgb(33,33,33)] border-[#ffffff] border-[5px] rounded-[50%]'>
                                        {/* {user.avatar ?
                                            <span className='w-full h-full flex bg-contain bg-no-repeat bg-center overflow-y-hidden'>
                                                <img className='w-full h-fit' src={(user?.avatar === 'default' || !user?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${user?.avatar}`} alt="" />
                                            </span>
                                            : <span className='w-full h-full'>
                                                <div className=' w-full h-full'>
                                                </div>
                                            </span>
                                        } */}
                                        <img className='w-full h-fit' src={(user?.avatar === 'default' || !user?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${user?.avatar}`} alt="" />
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center" style={{ fontFamily: 'Smack' }}>
                                    <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none p-3">
                                        <div className="grid md:grid-cols-2 gap-2 px-2 w-full mt-[50px]">
                                            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Email</p>
                                                <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {user.email ?? "..."}
                                                </p>
                                            </div>

                                            <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Age</p>
                                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {user.age ?? '...'}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Discord Name</p>
                                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {user.discordName}
                                                </p>
                                            </div>

                                            <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Discord ID</p>
                                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {user.discordId ?? '...'}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 " style={{ marginBottom: "10px" }}>Wallet Network</p>
                                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {user.walletNetwork ?? '...'}
                                                </p>
                                            </div>

                                            <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Wallet Key</p>
                                                <h1 className="text-[15px] whitespace-pre font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {user.walletKey ? renderWalletKey(user.walletKey): '...'}
                                                </h1>
                                            </div>

                                            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 " style={{ marginBottom: "10px" }}>Tech Stack</p>
                                                <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {user.techStack ?? '...'}
                                                </p>
                                            </div>

                                            <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Github repo link</p>
                                                <p className="text-[10px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {<Link target='_blank' className='text-navy-700 dark:text-gray-200' to={user.githubLink}> {user.githubLink} </Link> ?? '...'}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div>
                : <></>
            }
        </>
    )
}

export default UserAvatar

