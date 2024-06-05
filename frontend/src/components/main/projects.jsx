import { Card, Dropdown } from "flowbite-react";
import projectImg from "../../assets/commune.gif"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Zoom } from 'react-reveal';
import { XCircleIcon } from "@heroicons/react/24/solid";
import TextField from '@mui/material/TextField';
import { Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";
import Label from './components/label';
import UserAvatar from "./components/userAvatar";
import { Link } from 'react-router-dom'

export function Projects(project) {
    const { user } = useSelector((state) => state.users);
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [githubLink, setGithubLink] = useState(project.githubLink);
    const [liveDemo, setLiveDemo] = useState(project.liveDemo);
    const [avatarFile, setAvatarFile] = useState({ file: null, url: "" });

    const [status, setStatus] = useState(project.status);
    const [selectedDevelopers, setSelectedDevelopers] = useState(project.developers);
    const [selectedPms, setSelectedPms] = useState(project.pms);
    const [developers, setDevelopers] = useState([]);
    const [pms, setPms] = useState([]);
    const [marked, setMarked] = useState(false);
    const [incompleted, setIncompleted] = useState(false);

    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setTitle(project.title)
        setDescription(project.description)
        setStatus(project.status);
    }, [project])


    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const { data: { users } } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/users/devs")
                setDevelopers(users);
            } catch (e) {

            }
        }
        const fetchPms = async () => {
            try {
                const { data: { users } } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/users/pms")
                setPms(users);
            } catch (e) {
            }
        }
        fetchDevelopers();
        fetchPms();
    }, [])

    const handleDetail = () => {
        setOpenDetailModal(true);
    };
    const handleEdit = () => setOpenEditModal(true);
    const handleDelete = async () => {
        try {
            await axios.delete(process.env.REACT_APP_API_BASE_URL + "/project/" + project?._id)
            NotificationManager.success('Deleted a project', 'Success')
            project.fetchProjects();
        } catch (e) {
            NotificationManager.error('Error deleting a project', 'Error')
        }
    }

    const handleDetailCancel = () => {
        setOpenDetailModal(false);
    };

    const handleEditCancel = () => {
        setOpenEditModal(false);
    };


    const handleAvatarFile = (e) => {
        if (e.target.files[0]) {
            setAvatarFile({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
        } else {
            setAvatarFile({ file: null, url: "" });
        }
    };
    const determineEditable = () => {
        if (user?.role.some((a) => a === 'Administrator')) {
            return true;
        }
        let editable = false;
        const userId = user?._id
        project.developers.forEach((a) => {
            if (a._id === userId) {
                editable = true;
            }
        })
        project.pms.forEach((a) => {
            if (a._id === userId) {
                editable = true;
            }
        })
        return editable
    }
    const handleUpdateProject = async () => {
        if (title === '') {
            NotificationManager.error('Input project title', 'Error')
            return;
        }
        if (description === '') {
            NotificationManager.error('Input project description', 'Error')
            return;
        }
        const selectedDevs = [];
        selectedDevelopers.forEach((a) => {
            selectedDevs.push(a?._id);
        })
        const selectedManagers = [];
        selectedPms.forEach((a) => {
            selectedManagers.push(a?._id);
        })
        let projectData = { title, description, githubLink, liveDemo, developers: selectedDevs, pms: selectedManagers };
        if (marked) {
            projectData = { ...projectData, status: 'Completed' }
        }
        if (incompleted) {
            projectData = { ...projectData, status: 'In progress' }
        }

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
            await axios.put(process.env.REACT_APP_API_BASE_URL + "/project/" + project?._id, avatar === "" ? projectData : { ...projectData, avatar })
            NotificationManager.success('Project updated', 'Success')
            project.fetchProjects();
            setMarked(false);
            setIncompleted(false);
        } catch (e) {
            NotificationManager.error('Error updating a project', 'Error')
        }
    }
    const handleUpdateProjectStatus = async (status) => {
        try {
            await axios.put(process.env.REACT_APP_API_BASE_URL + "/project/" + project?._id, { status })
            NotificationManager.success('Project updated', 'Success')
            project.fetchProjects();
            setOpenEditModal(false)
        } catch (e) {
            NotificationManager.error('Error updating a project', 'Error')
        }
    }
    const renderDescription = (description, size) => {
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
    const handleLike = async () => {
        const token = localStorage.getItem("token");
        if (token === null || token === "undefined") {
            NotificationManager.error('You have to login', 'Error');
        } else {
            try {
                const isAlready = project.likes.includes(user?._id);
                const update = isAlready ? { ...project, likes: project.likes.filter((a) => a !== user?._id) }
                    : { ...project, likes: [...project.likes, user?._id] }
                await axios.put(process.env.REACT_APP_API_BASE_URL + '/project/' + project?._id, update)
                project.fetchProjects();
            } catch (e) {
                NotificationManager.error('Error updating a ticket', 'Error');
            }
        }
    }
    const handleDisLike = async () => {
        const token = localStorage.getItem("token");
        if (token === null || token === "undefined") {
            NotificationManager.error('You have to login', 'Error');
        } else {
            try {
                const isAlready = project.disLikes.includes(user?._id);
                const update = isAlready ? { ...project, disLikes: project.disLikes.filter((a) => a !== user?._id) }
                    : { ...project, disLikes: [...project.disLikes, user?._id] }
                console.log(update);
                await axios.put(process.env.REACT_APP_API_BASE_URL + '/project/' + project?._id, update)
                project.fetchProjects();
            } catch (e) {
                NotificationManager.error('Error updating a ticket', 'Error');
            }
        }

    }
    return (
        <div className="w-[460px] flex-col flex justify-start items-center mt-[20px]">
            <Card className="rounded-[10px] project_dropdown h-[440px] w-[90%] border-[1px] shadow-sm dark:bg-[rgb(36,36,36)] bg-[#fff] border-none" style={{ gap: "0", border: "none", padding: '0px', borderRadius: '10px' }}>
                <div
                    className="flex justify-between px-[10px] w-[413px] -ml-[24px] -mt-[23px] rounded-t-[10px] h-[100px] dark:bg-[rgb(50,50,50)] bg-[#e1e1e1] flex justify-center items-center">
                    <div className="flex flex-row items-center">

                        <span className='relative rounded-full w-[80px]'>
                            <img onClick={handleDetail} className='w-[80px] h-[80px] m-[5px] rounded-full cursor-pointer' src={(project?.avatar === 'default' || !project?.avatar) ? projectImg : `${process.env.REACT_APP_API_BASE_URL}/${project?.avatar}`} alt="" />
                        </span>

                        <h5
                            onClick={() => {
                                console.log('clicked', project.status);
                                if (project.status !== 'Idea' && project.status !== 'To do') {
                                    navigate('/project/' + project?._id)
                                }
                            }}
                            className="ml-[10px] hover:cursor-pointer mb-1 text-xl font-medium text-[rgb(25,118,210)] dark:text-white whitespace-pre">
                            {project.title.length > 25 ? project.title.slice(0, 24) + '...' : project.title}
                        </h5>
                    </div>

                    <div className="flex fixed justify-end pt-1 pl-0 dropdown" style={{ fontFamily: 'Smack', paddingLeft: "0" }}>
                        <Dropdown inline label="" className=" pl-0" style={{ paddingLeft: "0" }}>
                            <Dropdown.Item onClick={handleDetail}>
                                <div
                                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    More Detail
                                </div>
                            </Dropdown.Item>
                            {project.status === 'In progress' && <Dropdown.Item onClick={() => {
                                navigate('/project/' + project?._id)
                            }}>
                                <div
                                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    View Progress
                                </div>
                            </Dropdown.Item>}
                            {determineEditable() &&
                                <>
                                    <Dropdown.Item onClick={handleEdit}>
                                        <div
                                            className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Edit
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleDelete}>
                                        <div
                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Delete
                                        </div>
                                    </Dropdown.Item>
                                </>
                            }
                        </Dropdown>
                    </div>
                </div>

                <div className="h-full flex flex-col justify-start w-full" style={{ fontFamily: 'Smack' }}>
                    <div className=" mt-[-10px] flex justify-between items-center">
                        <div>
                            <Label color={project.status === 'Idea'
                                ? 'primary'
                                :
                                project.status === 'To do'
                                    ? 'error'
                                    : project.status === 'In progress'
                                        ? 'warning'
                                        : 'success'}>{project.status}
                            </Label>
                        </div>
                        <div className='flex gap-[10px]'>
                            <div className='flex py-[3px] hover:cursor-pointer' onClick={handleLike}>
                                {!project.likes?.includes(user?._id) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-gray-200">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 dark:text-gray-200">
                                        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                    </svg>
                                }
                                <span className='dark:text-gray-200'>{`${project?.likes?.length}`}</span>
                            </div>
                            <div className='flex py-[3px] hover:cursor-pointer' onClick={handleDisLike}>
                                {!project.disLikes?.includes(user?._id) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-gray-200">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                                </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 dark:text-gray-200">
                                        <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                                    </svg>

                                }
                                <span className='dark:text-gray-200'>{`${project?.disLikes?.length}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="dark:bg-[rgb(30,30,30)] p-[10px] bg-[#f6f6f6] w-[108%] ml-[-14px] rounded-[10px] mt-[10px]">
                        <div className=" flex flex-col h-[100px] w-full mb-[5px] mt-[10px] overflow-y-scroll overflow-x-hidden ">
                            <div className="text-sm w-[98%] text-gray-500 dark:text-gray-400 whitespace-pre-line">
                                {project.description}
                            </div>
                        </div>
                    </div>
                    <div className=" h-[25px] mt-[10px] dark:text-gray-200 flex justify-start items-center gap-[10px]">
                        <Label color={"warning"}>Site</Label>
                        <span className="text-[10px] mt-[4px] text-gray-500 dark:text-gray-400">{project.liveDemo?.length > 0 ? <Link target="_blank" className="text-gray-500 dark:text-gray-400" to={project.liveDemo}> {project.liveDemo} </Link> : "..."}</span>
                    </div>
                    <div className=" h-[25px] mt-[5px] dark:text-gray-200 flex justify-start items-center gap-[10px]">
                        <Label color={"error"}>Repo</Label>
                        <span className="text-gray-500 dark:text-gray-400 text-[10px] mt-[4px]">{project.githubLink?.length > 0 ? <Link target="_blank" className="text-gray-500 dark:text-gray-400" to={project.githubLink}> {project.githubLink} </Link> : "..."}</span>
                    </div>
                    <div className="pb-[5px] mt-[5px] px-[0px] w-full flex items-center justify-start">
                        <div className="  w-full flex justify-start items-start gap-[50px] ml-[0px]">
                            <div className='flex w-full'>
                                <div className='w-[50%] '>
                                    <div className='my-[5px] font-bold dark:text-gray-200'>
                                        Developers
                                    </div>
                                    <div className='flex mx-[20px] text-gray-500 dark:text-gray-400'>
                                        {project.developers?.length > 0 ?
                                            project.developers?.map((a) => <UserAvatar user={a} />)
                                            : "..."
                                        }
                                    </div>
                                </div>
                                <div className='w-[50%]'>
                                    <div className='my-[5px] font-bold dark:text-gray-200'>
                                        Project managers
                                    </div>
                                    <div className='flex mx-[20px] text-gray-500 dark:text-gray-400'>
                                        {project.pms?.length > 0 ?
                                            project.pms?.map((a) => <UserAvatar user={a} />)
                                            : "..."
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Card>
            {openDetailModal ?
                <div className='fixed top-[0px] left-0 w-screen h-screen flex justify-center items-center z-[99]'>
                    <div className=' fixed w-screen h-screen top-0 left-0 bg-[#000] dark:bg-gray-500 opacity-40'>
                    </div>
                    <Zoom duration={500}>
                        <div className='fixed w-[600px] rounded-[10px] h-auto flex justify-start items-center top-[100px] z-50 bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>
                            <div className=' w-full h-full'>
                                <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={handleDetailCancel}>
                                    <XCircleIcon class="h-10 w-10 text-gray-800 dark:text-white" />
                                </div>
                                <div className=' z-10 ml-auto mt-[30px]'>
                                    <div className='justify-center m-auto flex group items-center h-[6rem] w-[6rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] lg:h-[7rem] lg:w-[7rem] md:h-[7rem] md:w-[7rem] dark:border-[rgb(33,33,33)] border-[#ffffff] border-[5px] rounded-[50%]'>
                                        {avatarFile.url ?
                                            <span className='w-full h-full flex bg-contain bg-no-repeat bg-center overflow-y-hidden'>
                                                <img className='w-full h-fit' src={avatarFile.url} alt="" />
                                            </span>
                                            :
                                            <span className='w-full h-full flex bg-contain bg-no-repeat bg-center overflow-y-hidden'>
                                                <img className=' w-full h-full' src={(project?.avatar === 'default' || !project?.avatar) ? projectImg : `${process.env.REACT_APP_API_BASE_URL}/${project?.avatar}`} alt="" />
                                            </span>
                                        }
                                    </div>
                                </div>
                                <div className="w-full whitespace-pre justify-center items-center text-center mt-[30px] text-[20px] text-[rgb(25,118,210)] dark:text-gray-300">
                                    {title}
                                </div>
                                <div className=" flex gap-[10px] justify-center items-center mt-[10px]">
                                    {/* <span className=" w-[10px] h-[10px] rounded-[50%] bg-red-600"></span> */}
                                    <span className=" text-red-600">
                                        <Label color={status === 'Idea'
                                            ? 'primary'
                                            :
                                            project.status === 'To do'
                                                ? 'error'
                                                : project.status === 'In progress'
                                                    ? 'warning'
                                                    : 'success'}>{status}
                                        </Label>
                                        {/* {status} */}
                                    </span>
                                </div>
                                <div className="w-full px-[40px] justify-center items-center text-center mt-[20px]">
                                    <div className=" w-full h-[200px] text-[14px] text-left overflow-y-scroll dark:text-gray-300 whitespace-pre-line">
                                        {/* {renderDescription(description, 70)} */}
                                        {description}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center mb-[50px]" style={{ fontFamily: 'Smack' }}>
                                    <div className="relative flex flex-col items-center rounded-[10px] w-[700px] max-w-[95%] mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none p-3">
                                        <div className="grid md:grid-cols-2 gap-2 px-2 w-full mt-[50px]">
                                            <div className="flex flex-col  rounded-[10px] bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Developers</p>
                                                <div className="text-base flex justify-start items-center font-medium text-navy-700 pl-[30px] mt-[20px] dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {
                                                        project.developers.map((a) =>
                                                            // <UserAvatar user={a} />
                                                            <img className="rounded-[50%] w-[40px] h-[40px] -ml-[15px]" style={{ maxWidth: " max-content" }} src={(a?.avatar === 'default' || !a?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${a?.avatar}`} alt="" />
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            <div className="flex flex-col  rounded-[10px] bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Project Manager</p>
                                                <div className="text-base flex justify-start items-center font-medium text-navy-700 pl-[30px] mt-[20px] dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {
                                                        project.pms.map((a) =>
                                                            //  <UserAvatar user={a} />
                                                            <img className="rounded-[50%] w-[40px] h-[40px] -ml-[15px]" style={{ maxWidth: " max-content" }} src={(a?.avatar === 'default' || !a?.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${a?.avatar}`} alt="" />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div>
                : <></>}
            {openEditModal ?
                <div className='fixed top-[0px] left-0 w-screen h-screen flex justify-center items-center z-[99]'>
                    <div className=' fixed w-screen h-screen top-0 left-0 bg-[#000] dark:bg-gray-500 opacity-40'>
                    </div>
                    <Zoom duration={500}>
                        <div className='fixed w-[1000px] rounded-[10px] h-auto flex justify-start items-center top-[0px] z-[111] bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>

                            <div className='flex justify-center items-start w-[100%] overflow-y-visible flex-col px-[10px] sm:px-[100px]' style={{ fontFamily: 'Smack' }}>
                                {/* <div className=' flex justify-center items-center  md:justify-start md:items-start text-[rgb(18,18,18)] w-full dark:text-white text-[30px] mt-[30px] lg:mt-[-30px]'>Profile details</div> */}
                                <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={() => { handleEditCancel() }}>
                                    <XCircleIcon class="h-10 w-10 text-gray-800 dark:text-white" />
                                </div>
                                <div className='flex justify-center items-center w-full'>
                                    <div className='flex justify-center items-center w-full'>
                                        <div className=' mt-[20px] w-full flex justify-center items-center'>
                                            <div className='justify-center flex group items-center h-[8rem] w-[8rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer dark:border-[rgb(18,18,18)] border-[#ffffff] border-[5px] rounded-[50%]'>
                                                {avatarFile.url ?
                                                    <span className='w-full h-full flex overflow-y-hidden'>
                                                        <img className='w-full h-fit' src={avatarFile.url} alt="" />
                                                    </span>
                                                    :
                                                    <span className='w-full h-full flex overflow-y-hidden'>
                                                        <img className=' w-full h-full' src={(project?.avatar === 'default' || !project?.avatar) ? projectImg : `${process.env.REACT_APP_API_BASE_URL}/${project?.avatar}`} alt="" />
                                                    </span>
                                                }
                                            </div>
                                            <div className='justify-center absolute bg-none flex group items-center h-[10rem] w-[10rem] overflow-y-hidden transition-all cursor-pointer rounded-[50%]'>
                                                <span className='profile_banner_edit_but opacity-[0.0001] w-fit m-auto flex justify-center items-center group-hover:opacity-100 transition-all lg:mt-[-100px] md:mt-[-70px] mt-[-50px] absolute'>
                                                    <svg className="h-5 w-5 text-[#ffffff] sm:h-8 sm:w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                                </span>
                                                <input type="file" onChange={handleAvatarFile} className="opacity-0 w-full h-full cursor-pointer border rounded-[50%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='justify-center items-center mt-[50px] w-full md:gap-[100px] gap-[50px] lg:flex-row flex-col'>
                                    <div className='w-full items-start flex-col'>
                                        <TextField
                                            onChange={({ target: { value } }) => setTitle(value)}
                                            defaultValue={project.title}
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
                                            className='w-full' id="outlined-basic" label="Title" variant="outlined" />
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
                                            defaultValue={project.githubLink}

                                            className='w-full' id="outlined-basic" label="Github LInk" variant="outlined" />
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
                                            onChange={({ target: { value } }) => setLiveDemo(value)}
                                            defaultValue={project.liveDemo}

                                            className='w-full' id="outlined-basic" label="Live Demo" variant="outlined" />
                                    </div>
                                    <div className='w-full items-start flex-col mt-[40px]'>
                                        <TextField
                                            onChange={({ target: { value } }) => setDescription(value)}
                                            defaultValue={project.description}
                                            className='w-full'
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
                                            id="outlined-multiline-flexible"
                                            label="Description"
                                            multiline
                                            rows={5}
                                        />
                                    </div>
                                    {user?.role.some((a) => a === 'Administrator') && [<div className='w-full items-start flex-col mt-[40px]'>
                                        <Autocomplete
                                            onChange={(e, values) => {
                                                setSelectedDevelopers(values);
                                            }}
                                            defaultValue={selectedDevelopers}
                                            className='w-full'
                                            multiple
                                            options={developers}
                                            getOptionLabel={(option) => {
                                                return option.discordName
                                            }}
                                            disableCloseOnSelect
                                            renderInput={(params) => {
                                                return (
                                                    <TextField

                                                        {...params}
                                                        variant="outlined"
                                                        label="Developers"
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
                                                        placeholder="Select Developers"
                                                    />
                                                )
                                            }}
                                            renderOption={(props, option, { selected }) => {
                                                return (
                                                    <MenuItem
                                                        {...props}
                                                        key={option?._id}
                                                        value={option?._id}
                                                        sx={{ justifyContent: "space-between" }}
                                                    >
                                                        {option.discordName}
                                                        {selected ? <CheckIcon color="info" /> : null}
                                                    </MenuItem>
                                                )
                                            }}
                                        />
                                    </div>,
                                    <div className='w-full items-start flex-col mt-[40px]'>
                                        <Autocomplete
                                            onChange={(e, values) => {
                                                setSelectedPms(values);
                                            }}
                                            defaultValue={selectedPms}

                                            className='w-full'
                                            multiple
                                            options={pms}
                                            getOptionLabel={(option) => {
                                                return option.discordName
                                            }}
                                            disableCloseOnSelect
                                            renderInput={(params) => {
                                                return (
                                                    <TextField

                                                        {...params}
                                                        variant="outlined"
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
                                                        label="Project Managers"
                                                        placeholder="Select Project Managers"
                                                    />
                                                )
                                            }}
                                            renderOption={(props, option, { selected }) => {
                                                return (
                                                    <MenuItem
                                                        {...props}
                                                        key={option?._id}
                                                        value={option?._id}
                                                        sx={{ justifyContent: "space-between" }}
                                                    >
                                                        {option.discordName}
                                                        {selected ? <CheckIcon color="info" /> : null}
                                                    </MenuItem>
                                                )
                                            }}
                                        />
                                        {status === 'In progress' &&
                                            <FormControlLabel className=" dark:text-white" control={<Checkbox onChange={({ target: { checked } }) => {
                                                setMarked(checked);
                                            }} />} label="Mark as completed" />
                                        }
                                        {status === 'Completed' &&
                                            <FormControlLabel className=" dark:text-white" control={<Checkbox onChange={({ target: { checked } }) => {
                                                setIncompleted(checked);
                                            }} />} label="Mark as incompleted" />
                                        }
                                    </div>]}

                                </div>

                                <div className=' flex gap-[10px] justify-center items-center w-full mt-[10px] mb-[40px]'>
                                    {!(user?.role.some((a) => a === 'Administrator') && (status === 'Idea' || status === 'Rejected')) && <div onClick={handleUpdateProject} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                        <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                        <span className="relative">Update</span>
                                    </div>}
                                    {status === 'To do' && user?.role.some((a) => a === 'Administrator') && < div onClick={() => handleUpdateProjectStatus('In progress')} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                        <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                        <span className="relative">Start Project</span>
                                    </div>}
                                    {(status === 'Idea' || status === 'Rejected') && user?.role.some((a) => a === 'Administrator') && < div onClick={() => handleUpdateProjectStatus('To do')} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                        <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                        <span className="relative">Accept New Idea</span>
                                    </div>}
                                    {status === 'Idea' && user?.role.some((a) => a === 'Administrator') && < div onClick={() => handleUpdateProjectStatus('Rejected')} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                        <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                        <span className="relative">Reject Idea</span>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div >
                : <></>
            }
        </div >

    );
}
