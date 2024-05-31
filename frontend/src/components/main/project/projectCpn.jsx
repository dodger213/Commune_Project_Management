import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import projectImg from "../../../assets/commune.gif"
import { Zoom } from 'react-reveal';
import { XCircleIcon } from "@heroicons/react/24/solid";
import TextField from '@mui/material/TextField';
import { MenuItem } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Card } from "flowbite-react";
import axios from 'axios';
import UserAvatar from '../components/userAvatar';
import Ticket from '../components/tickets';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Chart } from "react-google-charts";
import ConfettiExplosion from 'react-confetti-explosion';
import Label from '../components/label/label';
import { Link } from 'react-router-dom';

const moment = require('moment');
const bgs = [
    '#ff000020',
    '#5d00ff1e',
    '#00ffd014',
    '#ffd00018',
    '#3cff0018',
]

export const options = {
    title: "Project Status",
    is3D: true,
};
const ticketStatus = ['Created', 'Progressing', 'Reviewing', 'Bounty Request', 'Completed'];

function ProjectCpn() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [liveDemo, setLiveDemo] = useState('')
    const [githubLink, setGithubLink] = useState('')
    const [budget, setBudget] = useState(0);
    const [developer, setDeveloper] = useState('');
    const [status, setStatus] = useState();
    const [tickets, setTickets] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [progressValue, setProgressValue] = useState(0);

    const [project, setProject] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [activeTicket, setActiveTicket] = useState(null);
    const { id } = useParams();

    const { user } = useSelector((state) => state.users)
    const isManager = project.pms?.some((a) => a?._id === user?._id);
    const isAdmin = user?.role.some((a) => a === 'Administrator');

    const [isDeveloper, setIsDeveloper] = useState(false);
    const [showConvetti, setShowConvetti] = useState(false);
    useEffect(() => {
        fetchProjectData();
        fetchTickets();
    }, [id])
    const fetchProjectData = async () => {
        try {
            const { data: { project } } = await axios.get(process.env.REACT_APP_API_BASE_URL + '/aProject/' + id);
            setProject(project[0]);
        } catch (e) {
            NotificationManager.error('Error fetching project Data', 'Error');
        }
    }
    const fetchTickets = async () => {
        try {
            const { data: { tickets } } = await axios.get(process.env.REACT_APP_API_BASE_URL + '/ticket/' + id);
            setTickets(tickets)
            const chartData = [["Status", "percentage"]];
            // let completedCnt = 0;
            ticketStatus.forEach((status) => {
                let cnt = 0;
                tickets.forEach((aTicket) => {
                    if (aTicket.status === status) cnt++;
                })
                chartData.push([status, cnt]);
            });
            let completedCnt = 0;
            tickets.forEach((aTicket) => {
                if (aTicket.status === 'Completed') {
                    completedCnt++;
                }
            })
            setProgressValue(!isNaN(completedCnt / tickets.length * 100) ? completedCnt / tickets.length * 100 : 0);
            setChartData(chartData);
        } catch (e) {
            NotificationManager.error('Error fetching project Data', 'Error');
        }
    }
    const handleCreateTicket = async () => {
        if (title === '') {
            NotificationManager.error('Input ticket title', 'Error')
            return
        }
        if (description === '') {
            NotificationManager.error('Input ticket description', 'Error')
            return
        }
        if (budget === 0 || budget === null) {
            NotificationManager.error('Input budget', 'Error')
            return
        }
        try {
            const data = developer === '' ? {
                title,
                description,
                budget,
                project: project?._id
            } :
                {
                    title,
                    description,
                    budget,
                    developer,
                    project: project?._id
                }
            console.log(data);
            if (!activeTicket) {
                await axios.post(process.env.REACT_APP_API_BASE_URL + "/ticket/new", data)
                NotificationManager.success('Created a ticket successfully', 'Success')
            } else {
                await axios.put(process.env.REACT_APP_API_BASE_URL + "/ticket/" + activeTicket?._id, data)
                NotificationManager.success('Updated a ticket successfully', 'Success')
            }
            fetchTickets();
            setOpenModal(false)
        } catch (e) {
            NotificationManager.error('Error creating a ticket', 'Error')
        }

    }
    const handleDeleteTicket = async (id) => {
        try {
            await axios.delete(process.env.REACT_APP_API_BASE_URL + "/ticket/" + id)
            NotificationManager.success('Deleted a ticket', 'Success')
            fetchTickets();
        } catch (e) {
            NotificationManager.error('Error deleting a ticket', 'Error')
        }
    }
    const handleTicketStatusBack = async (ticket) => {
        const index = ticketStatus.indexOf(ticket.status);
        const status = ticketStatus[index - 1];
        try {
            await axios.put(process.env.REACT_APP_API_BASE_URL + '/ticket/' + ticket?._id, { status, reviewRequire: false })
            fetchTickets();
        } catch (e) {
            NotificationManager.error('Error updating a ticket', 'Error');
        }
    }
    const handleTicketRequireReview = async (ticket) => {
        try {
            await axios.put(process.env.REACT_APP_API_BASE_URL + '/ticket/' + ticket?._id, { reviewRequire: true })
            setShowConvetti(true);
            setTimeout(() => {
                setShowConvetti(false);
            }, 2500);
            fetchTickets();
        } catch (e) {
            NotificationManager.error('Error updating a ticket', 'Error');
        }
    }
    const handleTicketStatusForward = async (ticket) => {
        const index = ticketStatus.indexOf(ticket.status);
        const status = ticketStatus[index + 1];

        if (status === 'Reviewing') {
            if (!(isManager || isAdmin)) {
                NotificationManager.error('Unallowed operation!', "Error");
                return;
            }
        }
        if (status === 'Completed') {
            if (!(isAdmin)) {
                NotificationManager.error('Unallowed operation!', "Error");
                return;
            }
            setShowConvetti(true);
            setTimeout(() => {
                setShowConvetti(false);
            }, 2500);
        }
        if (status === 'Bounty Request') {
            console.log(isManager, isAdmin);
            if (!(isManager || isAdmin)) {
                NotificationManager.error('Unallowed operation!', "Error");
                return;
            }
            setShowConvetti(true);
            setTimeout(() => {
                setShowConvetti(false);
            }, 2500);
        }
        try {
            await axios.put(process.env.REACT_APP_API_BASE_URL + '/ticket/' + ticket?._id, { status, reviewRequire: false })
            fetchTickets();
        } catch (e) {
            NotificationManager.error('Error updating a ticket', 'Error');
        }
    }
    const renderStatusTag = (status, date) => {
        let bg, border;
        switch (status) {
            case 'Completed':
                bg = '#04ff004d';
                border = '#06ff00';
                break;
            case 'In progress':
                bg = '#5d00ff74';
                border = '#5d00ff';
                break;

            default:
                bg = '#0099ff75';
                border = '#0099ff';
                break;
        }
        return (
            <div
                style={{
                    borderColor: border,
                    backgroundColor: bg,
                    color: border
                }}
                className={`flex items-center justify-center border-1 mx-[30px] mb-[5px] rounded-[20px] py-[3px]`}>
                {date &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                }
                <span className='font-bold text-[15px]'>
                    {status}
                </span>
            </div>
        )
    }
    const renderDescription = (description, size) => {
        if (!description?.length > 0) return;
        let result = [];
        for (var i = 0; i < description.length; i += size) {
            result.push(description.slice(i, i + size));
        }
        return (
            result.map((a, idx) => (
                <div key={idx}>{a}</div>
            ))
        )
    }
    const handleStar = async () => {
        try {
            const isAlready = project.stars.includes(user?._id);
            const update = isAlready ? { ...project, stars: project.stars.filter((a) => a !== user?._id) }
                : { ...project, stars: [...project.stars, user?._id] }
            await axios.put(process.env.REACT_APP_API_BASE_URL + '/project/' + project?._id, update)
            fetchProjectData();
        } catch (e) {
            NotificationManager.error('Error updating a ticket', 'Error');
        }

    }
    const handleLike = async () => {
        try {
            const isAlready = project.likes.includes(user?._id);
            const update = isAlready ? { ...project, likes: project.likes.filter((a) => a !== user?._id) }
                : { ...project, likes: [...project.likes, user?._id] }
            await axios.put(process.env.REACT_APP_API_BASE_URL + '/project/' + project?._id, update)
            fetchProjectData();
        } catch (e) {
            NotificationManager.error('Error updating a ticket', 'Error');
        }

    }
    const handleDisLike = async () => {
        try {
            const isAlready = project.disLikes.includes(user?._id);
            const update = isAlready ? { ...project, disLikes: project.disLikes.filter((a) => a !== user?._id) }
                : { ...project, disLikes: [...project.disLikes, user?._id] }
            await axios.put(process.env.REACT_APP_API_BASE_URL + '/project/' + project?._id, update)
            fetchProjectData();
        } catch (e) {
            NotificationManager.error('Error updating a ticket', 'Error');
        }

    }
    return (
        <div className=' w-full flex flex-col gap-[0px] justify-start  mb-[50px] mt-[150px] pr-[20px]'>
            <div className='w-full flex'>
                <Card className="w-[50%] h-[300px] border-[1px] shadow-sm dark:bg-[rgb(36,36,36)] bg-[#fff] border-none" style={{ gap: "0", border: "none" }}>
                    <div className='flex'>
                        <div className='w-[25%] mt-[30px] text-center'>
                            <img className='mb-3 rounded-full w-[150px] h-[150px] mx-auto shadow-lg' src={(project?.avatar === 'default' || !project?.avatar) ? projectImg : `${process.env.REACT_APP_API_BASE_URL}/${project?.avatar}`} alt="" />

                            {renderStatusTag(project.status, false)}
                            {
                                renderStatusTag(moment(project.createdAt).format('YYYY/MM/DD'), true)
                            }

                        </div>
                        <div className="w-[75%] px-3 mt-[-20px]" style={{ fontFamily: 'Smack' }}>
                            <div className="items-center">
                                <div className="mb-1 pt-[30px] overflow-scroll text-xl font-medium text-[rgb(25,118,210)] dark:text-white">
                                    {/* {renderDescription(project.title, 50)} */}
                                    {project.title?.length > 40 ? project.title.slice(0, 39) + '...' : project.title}
                                </div>
                                <div className="text-sm overflow-scroll text-gray-500 dark:text-gray-400 h-[130px] w-[98%] overflow-x-hidden whitespace-pre-line">
                                    {project.description}
                                </div>
                                <div className=" h-[25px] mt-[20px] dark:text-gray-200 flex justify-start items-center gap-[10px]">
                                    <Label color={"warning"}>Site</Label>
                                    <span className="text-[10px] mt-[4px] text-gray-500 dark:text-gray-400">{project.liveDemo?.length > 0 ? <Link target="_blank" className="text-gray-500 dark:text-gray-400" to={project.liveDemo}> {project.liveDemo} </Link> : "..."}</span>
                                </div>
                                <div className=" h-[25px] mt-[5px] dark:text-gray-200 flex justify-start items-center gap-[10px]">
                                    <Label color={"error"}>Repo</Label>
                                    <span className="text-gray-500 dark:text-gray-400 text-[10px] mt-[4px]">{project.githubLink?.length > 0 ? <Link target="_blank" className="text-gray-500 dark:text-gray-400" to={project.githubLink}> {project.githubLink} </Link> : "..."}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </Card>
                <div className='px-[10px] w-[25%]'>
                    <div className="p-[30px] w-[100%] h-[300px] border-[1px] rounded-[5px] shadow-sm dark:bg-[rgb(36,36,36)] bg-[#fff] border-none" style={{ gap: "0", border: "none" }}>
                        <div className='flex w-full border-b-[1px] border-[#8080807d]  pb-[15px]'>
                            <div className='w-[50%] '>
                                <div className='my-[5px] font-bold dark:text-gray-200'>
                                    Developers
                                </div>
                                <div className='flex mx-[20px] '>
                                    {
                                        project.developers?.map((a, idx) => <UserAvatar key={idx} user={a} />)
                                    }
                                </div>
                            </div>
                            <div className='w-[50%]'>
                                <div className='my-[5px] font-bold dark:text-gray-200'>
                                    Project managers
                                </div>
                                <div className='flex mx-[20px] '>
                                    {
                                        project.pms?.map((a, idx) => <UserAvatar key={idx} user={a} />)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='border-b-[1px] border-[#8080807d]  py-[15px]'>
                            <div className='flex'>
                                <div className='w-[50%]'>
                                    <div className='flex py-[3px] hover:cursor-pointer' onClick={handleStar}>
                                        {project.stars?.includes(user?._id) ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 dark:text-gray-200">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                        </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-gray-200">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>

                                        }
                                        <span className='dark:text-gray-200'>{`${project?.stars?.length}  Stars`}</span>
                                    </div>
                                    <div className='flex py-[3px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-gray-200">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>


                                        <span className=' dark:text-gray-200'>7 Comments</span>
                                    </div>
                                </div>
                                <div className='w-[50%]'>
                                    <div className='flex py-[3px] hover:cursor-pointer' onClick={handleLike}>
                                        {!project.likes?.includes(user?._id) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-gray-200">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                        </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 dark:text-gray-200">
                                                <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                            </svg>
                                        }
                                        <span className='dark:text-gray-200'>{`${project?.likes?.length}  Likes`}</span>
                                    </div>
                                    <div className='flex py-[3px] hover:cursor-pointer' onClick={handleDisLike}>
                                        {!project.disLikes?.includes(user?._id) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-gray-200">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                                        </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 dark:text-gray-200">
                                                <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                                            </svg>

                                        }
                                        <span className='dark:text-gray-200'>{`${project?.disLikes?.length}  Likes`}</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div>
                            <div className='my-[5px] font-bold dark:text-gray-200'>
                                Progress
                            </div>
                            <div className='w-full'>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: '100%', mr: 1 }}>
                                        <LinearProgress variant="determinate" value={progressValue} />
                                    </Box>
                                    <Box sx={{ minWidth: 35 }}>
                                        <Typography variant="body2" className=' dark:text-gray-300'>{`${Math.round(
                                            progressValue,
                                        )}%`}</Typography>
                                    </Box>
                                </Box>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="rounded-[5px] w-[25%] h-[300px] border-[1px] shadow-sm dark:bg-[rgb(36,36,36)] bg-[#fff] border-none" style={{ gap: "0", border: "none" }}>
                    <Chart
                        chartType="PieChart"
                        data={chartData}
                        options={options}
                        width={"100%"}
                        height={'100%'}
                        className="dark:bg-[rgb(36,36,36)]"
                    />
                </div>

            </div>
            <div className='flex items-center justify-between my-[30px]'>
                <div className=' dark:text-gray-100 text-gray-500'>
                    {tickets.length === 0 ? 'No tickets' : tickets.length + "  tickets"}
                </div>
                {(isManager || isAdmin) && <button
                    className="flex items-center justify-center select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[12px] px-6 rounded-lg bg-gray-900 dark:bg-[rgb(36,36,36)] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                    data-ripple-light="true"
                    style={{ fontFamily: "Smack" }}
                    onClick={() => {
                        setActiveTicket(null);
                        setTitle('')
                        setDescription('')
                        setBudget(null)
                        setDeveloper('')
                        setOpenModal(true);
                    }
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <span className='ml-[5px]'>New Ticket</span>
                </button>}
            </div>
            {tickets.map((a, idx) => {
                return (
                    <div key={idx} className='relative w-full m-0'>
                        <div className='absolute w-full  flex'>
                            {[1, 2, 3, 4, 5].map((a, idx) => <div key={idx} className='border-1 border-dashed dark:border-gray-300 w-full'

                            >
                                <div className='h-[310px]'></div>
                            </div>)}
                        </div>
                        <Ticket
                            ticket={a}
                            setIsDeveloper={setIsDeveloper}
                            isDeveloper={user?._id === a.developer?._id}
                            isManager={isManager}
                            isAdmin={isAdmin}
                            setActiveTicket={setActiveTicket}
                            setTitle={setTitle}
                            setDescription={setDescription}
                            setBudget={setBudget}
                            setDeveloper={setDeveloper}
                            setOpenModal={setOpenModal}
                            handleDeleteTicket={handleDeleteTicket}
                            ticketStatus={ticketStatus}
                            handleTicketStatusBack={handleTicketStatusBack}
                            handleTicketRequireReview={handleTicketRequireReview}
                            handleTicketStatusForward={handleTicketStatusForward}
                        ></Ticket>
                        <div className='h-[310px]'></div>
                    </div>
                )
            }

            )}
            {openModal ?
                <div className='fixed top-[0px] left-0 w-screen h-screen flex justify-center items-center z-[99]'>
                    <div className=' fixed w-screen h-screen top-0 left-0 bg-[#000] dark:bg-gray-500 opacity-40'>
                    </div>
                    <Zoom duration={500}>
                        <div className='fixed w-[1000px] rounded-[30px] h-auto flex justify-start items-center top-[30px] z-[111] bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>
                            <div className='flex justify-center items-start w-[100%] overflow-y-visible flex-col px-[10px] sm:px-[100px]' style={{ fontFamily: 'Smack' }}>
                                {/* <div className=' flex justify-center items-center  md:justify-start md:items-start text-[rgb(18,18,18)] w-full dark:text-white text-[30px] mt-[30px] lg:mt-[-30px]'>Profile details</div> */}
                                <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={() => { setOpenModal(false) }}>
                                    <XCircleIcon class="h-10 w-10 text-gray-800 dark:text-white" />
                                </div>
                                <div className='justify-center items-center mt-[100px] w-full md:gap-[100px] gap-[50px] lg:flex-row flex-col'>
                                    <div className='w-full items-start flex-col'>
                                        <TextField
                                            disabled={isDeveloper}
                                            defaultValue={activeTicket ? activeTicket.title : title}
                                            onChange={({ target: { value } }) => setTitle(value)}
                                            sx={{
                                                // Root class for the input field
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#5298e9",
                                                    fontFamily: "Arial",
                                                    // Class for the border around the input field
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#5298e9",
                                                        borderWidth: "1px",
                                                    },
                                                },
                                                // Class for the label of the input field
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#5298e9",
                                                    fontWeight: "bold",
                                                },
                                            }}
                                            className='w-full muiInput dark:darkMuiInput' id="outlined-basic" label="Title" variant="outlined" />
                                    </div>
                                    <div className='w-full items-start flex-col mt-[40px]'>
                                        <TextField
                                            disabled={isDeveloper}

                                            defaultValue={activeTicket ? activeTicket.description : description}
                                            onChange={({ target: { value } }) => setDescription(value)}
                                            className='w-full'
                                            id="outlined-multiline-flexible"
                                            label="Description"
                                            multiline
                                            rows={5}
                                            sx={{
                                                // Root class for the input field
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#5298e9",
                                                    fontFamily: "Arial",
                                                    // Class for the border around the input field
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#5298e9",
                                                        borderWidth: "1px",
                                                    },
                                                },
                                                // Class for the label of the input field
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#5298e9",
                                                    fontWeight: "bold",
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className='w-full items-start flex-col mt-[40px]'>
                                        <TextField
                                            disabled={isDeveloper}

                                            defaultValue={activeTicket ? activeTicket.budget : budget}
                                            type="number"
                                            placeholder='$'
                                            sx={{
                                                // Root class for the input field
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#5298e9",
                                                    fontFamily: "Arial",
                                                    // Class for the border around the input field
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#5298e9",
                                                        borderWidth: "1px",
                                                    },
                                                },
                                                // Class for the label of the input field
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#5298e9",
                                                    fontWeight: "bold",
                                                },
                                            }}
                                            onChange={({ target: { value } }) => setBudget(value)}
                                            className='w-full' id="outlined-basic" label="Budget" variant="outlined" />

                                    </div>
                                    {/* {!(isManager || isAdmin) && */}
                                    <>
                                        <div className='w-full items-start flex-col mt-[40px]'>
                                            <TextField
                                                onChange={({ target: { value } }) => setLiveDemo(value)}
                                                defaultValue={liveDemo}
                                                sx={{
                                                    // Root class for the input field
                                                    "& .MuiOutlinedInput-root": {
                                                        color: "#5298e9",
                                                        fontFamily: "Arial",
                                                        // Class for the border around the input field
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#5298e9",
                                                            borderWidth: "1px",
                                                        },
                                                    },
                                                    // Class for the label of the input field
                                                    "& .MuiInputLabel-outlined": {
                                                        color: "#5298e9",
                                                        fontWeight: "bold",
                                                    },
                                                }}
                                                className='w-full' id="outlined-basic" label="Live demo" variant="outlined" />
                                        </div>
                                        <div className='w-full items-start flex-col mt-[40px]'>
                                            <TextField
                                                sx={{
                                                    // Root class for the input field
                                                    "& .MuiOutlinedInput-root": {
                                                        color: "#5298e9",
                                                        fontFamily: "Arial",
                                                        // Class for the border around the input field
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            borderColor: "#5298e9",
                                                            borderWidth: "1px",
                                                        },
                                                    },
                                                    // Class for the label of the input field
                                                    "& .MuiInputLabel-outlined": {
                                                        color: "#5298e9",
                                                        fontWeight: "bold",
                                                    },
                                                }}
                                                onChange={({ target: { value } }) => setGithubLink(value)}
                                                defaultValue={githubLink}
                                                className='w-full' id="outlined-basic" label="Github Link" variant="outlined" />
                                        </div></>
                                    <div className='w-full items-start flex-col mt-[40px]'>

                                        <Box>
                                            <FormControl fullWidth sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#5298e9",
                                                    fontFamily: "Arial",
                                                    // Class for the border around the input field
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#5298e9",
                                                        borderWidth: "1px",
                                                    },
                                                },
                                                // Class for the label of the input field
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#5298e9",
                                                },
                                            }}>
                                                <InputLabel id="demo-simple-select-label"
                                                >Developer</InputLabel>
                                                <Select
                                                    disabled={isDeveloper}

                                                    defaultValue={activeTicket ? activeTicket.developer?._id : developer}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Developer"
                                                    onChange={({ target: { value } }) => setDeveloper(value)}
                                                >
                                                    {project.developers.map((a) =>
                                                        <MenuItem value={a?._id}>{a.discordName}</MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        {status === 'In progress' &&
                                            <FormControlLabel className=" dark:text-white" control={<Checkbox onChange={({ target: { checked } }) => {
                                                // setMarked(checked);
                                            }} />} label="Mark as completed" />
                                        }
                                        {status === 'Completed' &&
                                            <FormControlLabel className=" dark:text-white" control={<Checkbox onChange={({ target: { checked } }) => {
                                                // setIncompleted(checked);
                                            }} />} label="Mark as incompleted" />
                                        }
                                    </div>
                                    <div className=' w-full flex justify-center items-center mt-[50px] mb-[50px]'>
                                        <div onClick={handleCreateTicket} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px] cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                            <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                            <span className="relative">{activeTicket ? 'Update' : 'Create'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div >
                : <></>}
            <div className='fixed t-[100px]' style={{ left: '50vw', top: '50vh' }}>
                {showConvetti && <ConfettiExplosion
                    force={0.8}
                    duration={3000}
                    particleCount={250}
                    width={1600}
                />}
            </div>

        </div>
    )
}

export default ProjectCpn