import React from 'react'
import { Projects } from '../projects'
import { useEffect, useState } from 'react';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Zoom } from 'react-reveal';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import loading from "../../../assets/loading.gif"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function AllProjects({ data, fetchProjects, viewMode, isDashboard }) {
    const { user, isLogged } = useSelector((state) => state.users);
    const [projects, setProjects] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [pms, setPms] = useState([]);
    const [selectedDevelopers, setSelectedDevelopers] = useState([]);
    const [selectedPms, setSelectedPms] = useState([]);
    const [title, setTitle] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [liveDemo, setLiveDemo] = useState('');
    const [description, setDescription] = useState('');
    const [avatarFile, setAvatarFile] = useState({ file: null, url: "" });
    const [openNewModal, setOpenNewModal] = useState(false);
    const defaultAvatar = "./images/commune.gif";
    const [keyword, setKeyword] = useState('');
    const [visibleProjects, setVisibleProjects] = useState([])
    const [isloading1, setIsLoading1] = useState(true);
    const [isloading2, setIsLoading2] = useState(true);
    const [activeStatus, setActiveStatus] = useState(0);
    const projectStatus = ['All', 'Idea', 'Rejected', 'To do', 'In progress', 'Review Request', 'Payment Request', 'Completed']
    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const { data: { users } } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/users/devs")
                setDevelopers(users);
                setIsLoading1(false)
            } catch (e) {
                NotificationManager.error('Error fetching Developers', 'Error')

            }
        }
        const fetchPms = async () => {
            try {
                const { data: { users } } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/users/pms")
                setPms(users);
                setIsLoading2(false)
            } catch (e) {
                NotificationManager.error('Error fetching Pms', 'Error')
            }
        }

        fetchDevelopers();
        fetchPms();
    }, [])
    useEffect(() => {
        setProjects(data);
        setVisibleProjects(data);
    }, [data])


    const handleNew = () => setOpenNewModal(true);

    const handleNewCancel = () => {
        setOpenNewModal(false);
    };

    const [openNewIdeaModal, setOpenNewIdeaModal] = useState(false);
    const handleNewIdea = () => setOpenNewIdeaModal(true);

    const handleNewIdeaCancel = () => {
        setOpenNewIdeaModal(false);
    };

    const handleAvatarFile = (e) => {
        if (e.target.files[0]) {
            setAvatarFile({ file: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
        } else {
            setAvatarFile({ file: null, url: "" });
        }
    };

    const createProject = async (idea) => {
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
        const isPm = user?.role.some((a) => a === 'Project Manager');
        const ideaDeveloper = isPm ? [] : [user._id];
        const ideaPm = isPm ? [user._id] : [];
        const project = {
            title, description, githubLink, liveDemo,
            status: idea ? 'Idea' : 'To do',
            developers: idea ? ideaDeveloper : selectedDevs,
            pms: idea ? ideaPm : selectedManagers
        };

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
            await axios.post(process.env.REACT_APP_API_BASE_URL + "/project/new", avatar === "" ? project : { ...project, avatar })
            NotificationManager.success(idea ? 'New Idea suggested' : 'New project created', 'Success')
            fetchProjects();
            setOpenNewModal(false);
        } catch (e) {
            NotificationManager.error(idea ? 'Error suggesting new idea' : 'Error creating a project', 'Error')
        }
        setOpenNewIdeaModal(false);
    }
    const handleSearch = async (k, status) => {
        let classifiedProjects = projects;
        if (projectStatus[status] !== 'Review Request' && projectStatus[status] !== 'Payment Request') {
            if (status !== 0) {
                classifiedProjects = projects.filter((a) => a.status === projectStatus[status])
            }
            classifiedProjects = (classifiedProjects.filter((a) => a.title.toUpperCase().indexOf(k.toUpperCase()) !== -1 || a.description.toUpperCase().indexOf(k.toUpperCase()) !== -1))

        } else {
            const { data: { tickets } } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/ticket");
            if (projectStatus[status] === 'Review Request') {
                classifiedProjects = (classifiedProjects.filter((a) => {
                    return tickets.some((b) => b.project == a._id && b.reviewRequire === true)
                }))
            }
            else {
                classifiedProjects = (classifiedProjects.filter((a) => {
                    return tickets.some((b) => b.project == a._id && b.status === 'Bounty Request')
                }))
            }
        }
        setVisibleProjects(classifiedProjects.filter((a) => a.title.toUpperCase().indexOf(k.toUpperCase()) !== -1 || a.description.toUpperCase().indexOf(k.toUpperCase()) !== -1))
    }

    const handleBack = () => {
        setKeyword('')
        handleSearch("", activeStatus);
    }

    return (
        <div className='w-full flex flex-col gap-[30px] justify-start mt-[50px] mb-[50px]'>
            <div className='flex justify-center'>
                {/* <input className='search-input' onChange={({ target: { value } }) => setKeyword(value)} placeholder='Input project title, descriptin' />
                <button className='search-button' onClick={handleSearch}>Search</button> */}
                <div className=' dark:bg-[rgb(27,27,27)] items-center justify-between w-[80%] flex rounded-full shadow-lg p-2 mb-3 sticky' style={{ marginTop: '5px' }}>
                    <div>
                        <div onClick={handleBack} className='p-2 mr-1 rounded-full hover:bg-white dark:hover:bg-[rgb(75,85,99)] cursor-pointer'>

                            <svg className='h-5 w-5 text-gray-500 dark:text-white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                                <path fillRule='evenodd' d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z' clipRule='evenodd' />
                            </svg>

                        </div>
                    </div>

                    <input value={keyword} onChange={({ target: { value } }) => setKeyword(value)} className='font-bold rounded-full w-full py-[0.65rem] pl-4 text-gray-700 dark:text-white bg-gray-200 dark:bg-[rgb(50,50,50)] leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs' type='text' placeholder='Input bounty title, description' />

                    <div className='bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full' onClick={() => handleSearch(keyword, activeStatus)}>

                        <svg className='w-5 h-5 text-white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' />
                        </svg>

                    </div>

                </div>


            </div>
            <div className='flex justify-center'>
                <ButtonGroup size="medium" aria-label="Small button group">
                    {projectStatus.map((a, idx) => (
                        <Button style={{ fontFamily: 'Smack' }} className=' dark:text-white border-2' variant={idx === activeStatus ? 'contained' : 'outlined'} key={idx}
                            onClick={() => {
                                handleSearch(keyword, idx)
                                setKeyword('')
                                setActiveStatus(idx)
                            }}
                        >{a}</Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className='px-[100px] w-full flex justify-between mr-[320px]'>
                <div className={`text-[20px] text-[#909090] ${visibleProjects.length > 0 ? '' : 'invisible'}`}>
                    {`${visibleProjects.length} project${visibleProjects.length === 1 ? '' : 's'} `}
                </div>
                {(!user?.role.some((aRole) => aRole === 'Administrator') && !viewMode) && isLogged && <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[12px] px-6 rounded-lg bg-gray-900 dark:bg-[rgb(36,36,36)] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                    data-ripple-light="true"
                    style={{ fontFamily: "Smack" }}
                    onClick={handleNewIdea}
                >
                    New Bounty</button>
                }
                {user?.role.some((aRole) => aRole === 'Administrator') && isDashboard && isLogged && <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[12px] px-6 rounded-lg bg-gray-900 dark:bg-[rgb(36,36,36)] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                    data-ripple-light="true"
                    style={{ fontFamily: "Smack" }}
                    onClick={handleNew}
                >
                    New Bounty</button>
                }
            </div>

            <div className=' flex flex-wrap justify-center gap-[10px]'>
                {isloading1 && isloading2 ? <div className=" flex flex-col gap-[30px] justify-center items-center">
                    <span className=" dark:text-white text-2xl">Loading Bounties</span>
                    <img className="w-[80px] mt-[-20px]" src={loading} alt="" />
                </div> :
                    visibleProjects.length === 0 ? <div className='w-full flex items-center justify-center text-center text-[20px] text-[#909090]'>
                        <svg style={{ marginTop: '3px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <div className='ml-[10px]'> No Bounties</div>
                    </div> :
                        visibleProjects?.map((aProject) => (
                            <Projects {...aProject} fetchProjects={fetchProjects} />
                        ))}
            </div>
            {openNewModal ?
                <div className='fixed top-[0px] left-0 w-screen h-screen flex justify-center items-center z-[99]'>
                    <div className=' fixed w-screen h-screen top-0 left-0 bg-[#000] dark:bg-gray-500 opacity-40'>
                    </div>
                    <Zoom duration={500}>
                        <div className='fixed w-[1000px] rounded-[30px] h-auto flex justify-start items-center top-[0px] z-[111] bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>

                            <div className='flex justify-center items-start w-[100%] overflow-y-visible flex-col px-[10px] sm:px-[100px]' style={{ fontFamily: 'Smack' }}>
                                {/* <div className=' flex justify-center items-center  md:justify-start md:items-start text-[rgb(18,18,18)] w-full dark:text-white text-[30px] mt-[30px] lg:mt-[-30px]'>Profile details</div> */}
                                <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={handleNewCancel}>
                                    <XCircleIcon class="h-10 w-10 text-gray-800 dark:text-white" />
                                </div>
                                <div className='flex justify-center items-center w-full'>
                                    <div className='flex justify-center items-center w-full'>
                                        <div className=' mt-[20px] w-full flex justify-center items-center'>
                                            <div className='justify-center flex group items-center h-[8rem] w-[8rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer dark:border-[rgb(18,18,18)] border-[#ffffff] border-[5px] rounded-[50%]'>
                                                {avatarFile.file ?
                                                    <span className='w-full h-full flex overflow-y-hidden'>
                                                        <img className='w-full' src={avatarFile.url} alt="" />
                                                    </span>

                                                    : <span className='w-full h-full flex overflow-y-hidden'>
                                                        <img className='w-full shadow-lg' src={defaultAvatar} alt="" />
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
                                            onChange={({ target: { value } }) => setTitle(value)}
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
                                            onChange={({ target: { value } }) => setDescription(value)}

                                            className='w-full'
                                            id="outlined-multiline-flexible"
                                            label="Description"
                                            multiline
                                            rows={5}
                                        />
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
                                            className='w-full' id="outlined-basic" label="Live Demo" variant="outlined" />
                                    </div>
                                    <div className='w-full items-start flex-col mt-[40px]'>
                                        <Autocomplete
                                            onChange={(e, values) => {
                                                setSelectedDevelopers(values);
                                            }}
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
                                                        variant="outlined"
                                                        label="Developers"
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
                                    </div>
                                    <div className='w-full items-start flex-col mt-[40px]'>
                                        <Autocomplete
                                            onChange={(e, values) => {
                                                setSelectedPms(values);
                                            }}
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
                                                        variant="outlined"
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
                                    </div>

                                </div>

                                <div className=' flex justify-center items-center w-full mt-[50px] mb-[40px]'>
                                    <div onClick={() => createProject(false)} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                        <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                        <span className="relative">Create</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div>
                : <></>}
            {openNewIdeaModal ?
                <div className='fixed top-[0px] left-0 w-screen h-screen flex justify-center items-center z-[99]'>
                    <div className=' fixed w-screen h-screen top-0 left-0 bg-[#000] dark:bg-gray-500 opacity-40'>
                    </div>
                    <Zoom duration={500}>
                        <div className='fixed w-[1000px] rounded-[30px] h-auto flex justify-start items-center top-[70px] z-[111] bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>

                            <div className='flex justify-center items-start w-[100%] overflow-y-visible flex-col px-[10px] sm:px-[100px]' style={{ fontFamily: 'Smack' }}>
                                {/* <div className=' flex justify-center items-center  md:justify-start md:items-start text-[rgb(18,18,18)] w-full dark:text-white text-[30px] mt-[30px] lg:mt-[-30px]'>Profile details</div> */}
                                <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={handleNewIdeaCancel}>
                                    <XCircleIcon class="h-10 w-10 text-gray-800 dark:text-white" />
                                </div>
                                <div className='flex justify-center items-center w-full'>
                                    <div className='flex justify-center items-center w-full'>
                                        <div className=' mt-[20px] w-full flex justify-center items-center'>
                                            <div className='justify-center flex group items-center h-[10rem] w-[10rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] cursor-pointer dark:border-[rgb(18,18,18)] border-[#ffffff] border-[5px] rounded-[50%]'>
                                                {avatarFile.file ?
                                                    <span className='w-full h-full flex overflow-y-hidden'>
                                                        <img className='w-full' src={avatarFile.url} alt="" />
                                                    </span>

                                                    : <span className='w-full h-full flex overflow-y-hidden'>
                                                        <img className='w-full shadow-lg' src={defaultAvatar} alt="" />
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
                                            onChange={({ target: { value } }) => setTitle(value)}
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
                                            // defaultValue={project.githubLink}

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
                                            // defaultValue={project.liveDemo}

                                            className='w-full' id="outlined-basic" label="Live Demo" variant="outlined" />
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
                                            onChange={({ target: { value } }) => setDescription(value)}

                                            className='w-full'
                                            id="outlined-multiline-flexible"
                                            label="Description"
                                            multiline
                                            rows={5}
                                        />
                                    </div>

                                </div>

                                <div className=' flex justify-center items-center w-full mt-[50px] mb-[40px]'>
                                    <div onClick={() => createProject(true)} style={{ fontFamily: 'Might', width: '300px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                        <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                        <span className="relative">Propose New Bounty</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div>
                : <></>}
        </div >
    )
}
