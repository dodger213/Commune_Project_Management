import React from 'react'
import Label from '../label'
import UserAvatar from '../userAvatar'
import { Dropdown } from "flowbite-react";
import Tooltip from '@mui/material/Tooltip';
const moment = require('moment');

// 
const bgs = [
    '#ff0000a1',
    '#5d00ffa1',
    '#00ffd0a1',
    '#ffd000a1',
    '#3cff00a1',
]
function Ticket({
    ticket,
    isDeveloper,
    setIsDeveloper,
    isManager,
    isAdmin,
    setActiveTicket,
    setTitle,
    setDescription,
    setBudget,
    setDeveloper,
    setOpenModal,
    handleDeleteTicket,
    ticketStatus,
    handleTicketStatusBack,
    handleTicketRequireReview,
    handleTicketStatusForward,
    view
}) {
    return (
        <div
            className={`${view ? 'invisible' : 'absolute'} w-[20%] duration-500 h-[310px] flex items-center p-[10px] `}
            style={{
                left: `${ticketStatus.indexOf(ticket.status) * 20}%`,
                zIndex: 10,
            }}
        >
            <div className={`w-[100%] bg-[#fff] dark:bg-[rgb(36,36,36)] dark:border-[0px] border-[1px] border-gray-200 rounded-lg ticket shadow-md`}

            >
                {/* <span className=' bg-red-600 text-white text-[17px] p-1 top-2 rounded-[5px]'>$1000</span> */}
                <div className=' flex absolute w-full justify-between items-center'>
                    {/* <Label color="error" className="">{ticket.status}</Label> */}
                </div>
                <div className='text-base flex items-center justify-between text-slate-700 p-[10px] px-[20px] item-content before:bg-red-500 border-b-[1px] border-[#8080807d] '>
                    <div className='flex items-center w-full justify-start'>
                        <UserAvatar user={ticket.developer} />
                        <div className='ml-[5px] dark:text-gray-200'>
                            {ticket.title}
                        </div>
                    </div>
                    <div className='dropdown'>
                        <Dropdown inline label="" className=" pl-0 dark:text-gray-200" style={{ paddingLeft: "0" }}>
                            <>
                                <Dropdown.Item onClick={() => {
                                    setActiveTicket(ticket);
                                    setTitle(ticket.title);
                                    setDescription(ticket.description);
                                    setBudget(ticket.budget);
                                    setDeveloper(ticket.developer);
                                    setIsDeveloper(isDeveloper);
                                    setOpenModal(true);
                                }}>
                                    <div
                                        className="block py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Edit
                                    </div>
                                </Dropdown.Item>
                                {(isManager || isAdmin) && <Dropdown.Item onClick={() => {
                                    handleDeleteTicket(ticket?._id);
                                }}>
                                    <div
                                        className="block py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Delete
                                    </div>
                                </Dropdown.Item>}
                            </>
                        </Dropdown>
                    </div>
                </div>
                <div
                    className='text-base text-slate-700 p-4 item-content before:bg-red-500 h-[100px] overflow-y-scroll dark:text-gray-200'>
                    {ticket.description}
                </div>
                <div className='p-[10px] flex  items-center '>
                    <Label color="error" className="">${ticket.budget}</Label>
                    <div
                        className='mx-[10px] text-[white] p-[5px] px-[10px] shadow-md'
                        style={{
                            transitionDuration: '1000ms',
                            borderRadius: '20px',
                            backgroundColor: `${bgs[ticketStatus.indexOf(ticket.status)]}`,
                        }}
                    >
                        {ticket.status}
                    </div>
                    {ticket.status === 'Progressing' &&
                        (!ticket.reviewRequire ?
                            isDeveloper && <Tooltip title="Require Review">
                                <div
                                    onClick={() =>
                                        handleTicketRequireReview(ticket)
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                    </svg>
                                </div>
                            </Tooltip> :
                            <Tooltip title="Review request sent">
                                <div
                                    style={{
                                        color: 'green'
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                            </Tooltip>

                        )
                    }

                </div>

                <div className="flex justify-between items-center border-t border-slate-200 p-3 gap-[15px]">

                    <div className='flex gap-[10px]'>
                        <button className="flex items-center gap-x-2 text-slate-700 p-[7px] rounded-[20px] px-[10px] bg-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                            <span className='font-semibold text-xs'>{moment(ticket.updatedAt).format('YYYY/MM/DD')}</span>
                        </button>
                        <div className='flex items-center gap-4 '>
                            <button className='relative p-2 bg-slate-100 text-slate-700 rounded-full flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                </svg>
                                <span className='absolute -top-2 -right-2 w-5 h-5 text-xs font-bold flex items-center justify-center bg-teal-500 text-white rounded-full'>3</span>
                            </button>
                            <button className='relative rounded-full flex justify-center items-center'>
                                {/* <UserAvatar avatar={devAvatarFile} /> */}
                                {/* <UserAvatar avatar={devAvatarFile} /> */}
                            </button>
                        </div>
                    </div>


                    {(isAdmin || isManager || isDeveloper) && <div className='flex'>
                        <div
                            className={ticketStatus.indexOf(ticket.status) > 0 ? '' : 'invisible'}
                            onClick={() => handleTicketStatusBack(ticket)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-gray-200">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div
                            className={ticketStatus.indexOf(ticket.status) < ticketStatus.length - 1 ? '' : 'invisible'}

                            onClick={() => handleTicketStatusForward(ticket)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-gray-200">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </div>}

                </div>
            </div>
        </div>

    )
}

export default Ticket