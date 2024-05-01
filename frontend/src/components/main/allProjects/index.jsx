import React from 'react'
import { Projects } from '../projects'
import { useEffect, useState } from 'react';
import closeIcon from "../../../assets/211652_close_icon.svg"
import { Flip } from 'react-reveal';

export default function AllProjects() {

    const [pm, setPm] = useState('Potter');
    const [dev, setDev] = useState('potter');
    const [title, setTitle] = useState('Com Tensor');
    const [description, setDescription] = useState('Commune bittenor project');
    const [avatarFile, setAvatarFile] = useState("./images/commune.gif");
    const [status, setStatus] = useState("Created");
    const [site, setSite] = useState("commune.org");
    const [gitRepo, setGitRepo] = useState("github.com/potter1990po");

    const [openNewModal, setOpenNewModal] = useState(false);
    const handleNew = () => setOpenNewModal(true);

    const handleNewCancel = () => {
        setOpenNewModal(false);
    };

    const handleAvatarFile = (e) => {
        setAvatarFile(URL.createObjectURL(e.target.files[0]));
    };

    const createProject = () => {
        const data = {
            dev: dev,
            pm: pm,
            title: title,
            description: description,
            site: site,
            avatarFile: avatarFile,
            status: status,
            gitRepo: gitRepo,
        }
        // dispatch(createUser(data));
    }

    return (
        <div className=' flex flex-col gap-[30px] justify-center items-center mt-[50px] mb-[50px]'>
            <div className=' w-full flex justify-end mr-[320px]'>
                <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[12px] px-6 rounded-lg bg-gray-900 dark:bg-[rgb(36,36,36)] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                    data-ripple-light="true"
                    style={{ fontFamily: "Smack" }}
                    onClick={handleNew}
                >
                    New Project</button>
            </div>
            <Projects />
            <Projects />
            <Projects />
            <Projects />
            <Projects />
            {openNewModal ?
                <Flip right>
                    <div className='fixed w-[1000px] h-auto flex justify-start items-center top-[100px] z-50 bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>

                        <div className='flex justify-center items-start w-[100%] overflow-y-visible flex-col px-[10px] sm:px-[100px]' style={{ fontFamily: 'Smack' }}>
                            {/* <div className=' flex justify-center items-center  md:justify-start md:items-start text-[rgb(18,18,18)] w-full dark:text-white text-[30px] mt-[30px] lg:mt-[-30px]'>Profile details</div> */}
                            <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={handleNewCancel}>
                                <img src={closeIcon} className=' w-[30px]' alt="" />
                            </div>
                            <div className='flex justify-center items-center w-full'>
                                <div className='flex justify-center items-center w-full'>
                                    <div className=' mt-[20px] w-full flex justify-center items-center'>
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
                                        <div className='justify-center absolute bg-none flex group items-center h-[10rem] w-[10rem] overflow-y-hidden transition-all cursor-pointer rounded-[50%]'>
                                            <span className='profile_banner_edit_but opacity-[0.0001] w-fit m-auto flex justify-center items-center group-hover:opacity-100 transition-all lg:mt-[-100px] md:mt-[-70px] mt-[-50px] absolute'>
                                                <svg className="h-5 w-5 text-[#ffffff] sm:h-8 sm:w-8" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                            </span>
                                            <input type="file" onChange={handleAvatarFile} className="opacity-0 w-full h-full cursor-pointer border rounded-[50%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center items-center mt-[50px] w-full md:gap-[100px] gap-[50px] lg:flex-row flex-col'>
                                <div className='flex justify-start items-start flex-col'>
                                    <div className='flex justify-start w-full items-start flex-col'>
                                        <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Title</label>
                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter Title" />
                                    </div>
                                    <div className='flex justify-center items-start w-full flex-col mt-[40px]'>
                                        <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Developer</label>
                                        <input type="text" value={dev} onChange={(e) => setDev(e.target.value)} className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Developer..." />
                                    </div>
                                    <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                        <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Website Link</label>
                                        <input type="text" value={site} onChange={(e) => setSite(e.target.value)} className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Website Link..." />
                                    </div>
                                </div>
                                <div className='flex justify-start items-start flex-col'>
                                    <div className='flex justify-start w-full items-start flex-col'>
                                        <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Status</label>
                                        <input type="text" value={status} disabled className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter Status" >
                                        </input>
                                    </div>
                                    <div className='flex justify-center items-start w-full flex-col mt-[40px]'>
                                        <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Project Manager</label>
                                        <input type="text" value={pm} onChange={(e) => setPm(e.target.value)} className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter Project Manager" />
                                    </div>
                                    <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                        <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Git Repo</label>
                                        <input type="text" value={gitRepo} onChange={(e) => setGitRepo(e.target.value)} className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Your Git Repo Link" />
                                    </div>
                                </div>

                            </div>
                            <div className='flex justify-start w-full items-start flex-col mt-[40px]'>
                                <label className="block w-full text-[17px] font-medium mb-2 dark:text-white text-start">Description</label>
                                <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="py-2 px-3 block w-[800px] h-[100px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Description..." />
                            </div>
                            <div className=' flex justify-center items-center w-full mt-[50px] mb-[40px]'>
                                <div onClick={createProject} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                    <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                    <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                    <span className="relative">Create</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Flip>
                : <></>}
        </div>
    )
}
