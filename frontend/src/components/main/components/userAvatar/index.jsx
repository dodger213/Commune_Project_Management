import React from 'react'
import { useState } from 'react'
import Label from '../label/label';

function UserAvatar({ user }) {

    const [isDetail, setIsDetail] = useState(false);
    const showDetail = () => {
        setIsDetail(true);
    }
    const hiddenDetail = () => {
        setIsDetail(false);
    }
    return (
        <>
            <div >
                <img onMouseEnter={showDetail} onMouseLeave={hiddenDetail} className="rounded-[50%] w-[40px] h-[40px] -ml-[15px]" style={{ maxWidth: " max-content" }} src={(user?.avatar === 'default' || !user?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${user?.avatar}`} alt="" />
            </div>
            <div className='relative'>
                {isDetail ?
                    <div className="flex  flex-col justify-center items-center z-[200] w-[350px] absolute">
                        <div className="relative flex flex-col items-center p-[15px] rounded-[10px] dark:bg-[rgb(30,30,30)] bg-[#dedede] w-full mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none">
                            <div className=' w-full flex gap-[30px] justify-start items-center mt-[10px]'>
                                <img className="rounded-[50%] w-[70px] h-[70px] ml-[15px]" style={{ maxWidth: " max-content" }} src={(user?.avatar === 'default' || !user?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${user?.avatar}`} alt="" />
                                {user?.role.map((a, idx) => (
                                    <Label key={idx} color="error" className=" -ml-[15px] mt-[35px]">{a}</Label>
                                ))}
                            </div>
                            <div className="grid md:grid-cols-2 gap-1 w-full mt-[20px] p-[10px] rounded-[10px] dark:bg-[rgb(18,18,18)] bg-[#fff]">


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

                                <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400 " style={{ marginBottom: "10px" }}>Wallet Network</p>
                                    <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.walletNetwork ?? '...'}
                                    </p>
                                </div>

                                <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400" style={{ marginBottom: "10px" }}>Wallet Key</p>
                                    <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.walletKey ?? '...'}
                                    </p>
                                </div>

                                <div className="flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400 " style={{ marginBottom: "10px" }}>Tech Stack</p>
                                    <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.techStack ?? '...'}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400" style={{ marginBottom: "10px" }}>Age</p>
                                    <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.age ?? '...'}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-1 shadow-3xl shadow-shadow-500 dark:shadow-none">
                                    <p className="text-sm text-gray-400" style={{ marginBottom: "10px" }}>Github repo link</p>
                                    <p className="text-[13px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                        {user.githubLink ?? '...'}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div> : <></>}
            </div>

        </>
    )
}

export default UserAvatar

