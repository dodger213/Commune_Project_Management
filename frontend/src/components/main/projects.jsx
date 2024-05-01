import { Card, Dropdown } from "flowbite-react";
import projectImg from "../../assets/commune.gif"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, createUser } from "../../redux/actions/usersAction";
import closeIcon from "../../assets/211652_close_icon.svg"
import { Flip } from 'react-reveal';

export function Projects() {

    const dispatch = useDispatch();
    const { isLoading, user, isLoadingPost } = useSelector((state) => state.users);

    const [pm, setPm] = useState('Potter');
    const [dev, setDev] = useState('potter');
    const [title, setTitle] = useState('Com Tensor');
    const [description, setDescription] = useState('Commune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor <br> projectCommune bittenor projectCommune bittenor projectCommune bittenor project');
    const [avatarFile, setAvatarFile] = useState("./images/commune.gif");
    const [status, setStatus] = useState("Created");
    const [site, setSite] = useState("commune.org");
    const [gitRepo, setGitRepo] = useState("github.com/potter1990po");

    useEffect(() => {
        dispatch(getUser);
        if (user) {
            setAvatarFile(user.user.avatarFile)
            setTitle(user.user.discordName)
            setDev(user.user.dev)
            setDescription(user.user.description)
            setStatus(user.user.status)
            setSite(user.user.site)
            setGitRepo(user.user.gitRepo)
            setPm(user.user.pm)
        }
    }, [dispatch, isLoadingPost, user]);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDescriptionModal, setOpenDescriptionModal] = useState(false);

    const handleDetail = () => setOpenDetailModal(true);
    const handleEdit = () => setOpenEditModal(true);
    const handleDescription = () => setOpenDescriptionModal(true);

    const handleDetailCancel = () => {
        setOpenDetailModal(false);
    };

    const handleEditCancel = () => {
        setOpenEditModal(false);
    };

    const handleDescriptionCancel = () => {
        setOpenDescriptionModal(false);
    };

    const saveProject = () => {
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
        dispatch(createUser(data));
    }

    const handleAvatarFile = (e) => {
        setAvatarFile(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="w-full flex justify-center items-center" style={{ fontFamily: 'Smack' }}>
            <Card className=" project_dropdown w-[80%] border-[1px] shadow-sm dark:bg-[rgb(36,36,36)] bg-[#fff] border-none" style={{ fontFamily: 'Smack', gap: "0", border: "none" }}>
                <div className="flex justify-end pt-1 pl-0 dropdown" style={{ paddingLeft: "0" }}>
                    <Dropdown inline label="" className=" pl-0" style={{ paddingLeft: "0" }}>
                        <Dropdown.Item onClick={handleDetail}>
                            <div
                                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                More Detail
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleEdit}>
                            <div
                                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Edit
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div
                                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Change Dev
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div
                                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Apply
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Delete
                            </div>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <div className="flex items-center justify-between px-3 gap-[20px] mt-[-20px]">
                    <div className=" flex items-center justify-center gap-[40px]">
                        <img
                            alt=""
                            height="96"
                            src={projectImg}
                            width="96"
                            className="mb-3 rounded-full shadow-lg"
                        />
                        <div>
                            <h5 className="mb-1 text-xl font-medium text-[rgb(25,118,210)] dark:text-white">ComTensor</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Commune Bittensor project</span>
                        </div>
                    </div>
                    <div className=" flex gap-[20px]">
                        <div className=" flex gap-[20px] justify-center items-center">
                            <span className=" w-[10px] h-[10px] rounded-[50%] bg-red-600"></span>
                            <span className=" text-red-600">
                                Created
                            </span>
                        </div>
                        <div className=" flex gap-[20px] justify-center items-center">
                            <span className=" w-[10px] h-[10px] rounded-[50%] bg-blue-600"></span>
                            <span className=" text-blue-600">
                                In Progress
                            </span>
                        </div>
                        <div className=" flex gap-[20px] justify-center items-center">
                            <span className=" w-[10px] h-[10px] rounded-[50%] bg-green-600"></span>
                            <span className=" text-green-600">
                                Done
                            </span>
                        </div>
                    </div>
                    <div className=" text-blue-500 text-[20px] ml-[50px]">
                        <span className=" text-red-600">Potter</span> is handling
                    </div>
                </div>
            </Card>
            {openDetailModal ?
                <Flip right>
                    <div className='fixed w-[600px] h-auto flex justify-start items-center top-[100px] z-50 bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>
                        <div className=' w-full h-full'>
                            <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={handleDetailCancel}>
                                <img src={closeIcon} className=' w-[30px]' alt="" />
                            </div>
                            <div className=' z-10 ml-auto mt-[30px]'>
                                <div className='justify-center m-auto flex group items-center h-[6rem] w-[6rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] lg:h-[7rem] lg:w-[7rem] md:h-[7rem] md:w-[7rem] dark:border-[rgb(33,33,33)] border-[#ffffff] border-[5px] rounded-[50%]'>
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
                            <div className="w-full justify-center items-center text-center mt-[30px] text-[20px] text-[rgb(25,118,210)] dark:text-gray-300">
                                {title}
                            </div>
                            <div className=" flex gap-[10px] justify-center items-center mt-[10px]">
                                <span className=" w-[10px] h-[10px] rounded-[50%] bg-red-600"></span>
                                <span className=" text-red-600">
                                    {status}
                                </span>
                            </div>
                            <div className="w-full justify-center items-center text-center mt-[20px] ">
                                {/* {description} */}
                                <div className=' w-full flex justify-center mr-[320px]'>
                                    <button
                                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[12px] px-6 rounded-lg bg-gray-900 dark:bg-[rgb(18,18,18)] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                        type="button"
                                        data-ripple-light="true"
                                        style={{ fontFamily: "Smack" }}
                                        onClick={handleDescription}
                                    >
                                        Description</button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center mb-[50px]" style={{ fontFamily: 'Smack' }}>
                                <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none p-3">
                                    <div className="grid md:grid-cols-2 gap-2 px-2 w-full mt-[50px]">
                                        <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                            <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Developers</p>
                                            <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                {dev}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                            <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Project Manager</p>
                                            <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                {pm}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 " style={{ marginBottom: "10px" }}>Website Link</p>
                                            <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                {site}
                                            </p>
                                        </div>

                                        <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                            <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Github repo link</p>
                                            <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                {gitRepo}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Flip>
                : <></>}
            {openEditModal ?
                <Flip right>
                    <div className='fixed w-[1000px] h-auto flex justify-start items-center top-[100px] z-50 bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>

                        <div className='flex justify-center items-start w-[100%] overflow-y-visible flex-col px-[10px] sm:px-[100px]' style={{ fontFamily: 'Smack' }}>
                            {/* <div className=' flex justify-center items-center  md:justify-start md:items-start text-[rgb(18,18,18)] w-full dark:text-white text-[30px] mt-[30px] lg:mt-[-30px]'>Profile details</div> */}
                            <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={handleEditCancel}>
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
                                        <select type="select" value={status} onChange={(e) => setStatus(e.target.value)} className="py-2 px-3 block w-[350px] border-[1px] font-thin border-solid outline-none border-gray-300 rounded-lg text-[17px] focus:border-gray-500 dark:focus:border-[#4f4f4f] disabled:opacity-50 disabled:pointer-events-none bg-none dark:bg-[rgb(18,18,18)] dark:border-[#303030] dark:text-gray-200 dark:placeholder:text-[#a7a7a7]" placeholder="Enter Status" >
                                            <option value="Create" className=" text-red-600">Create</option>
                                            <option value="In Progress" className=" text-blue-600">In Progress</option>
                                            <option value="Done" className=" text-green-600">Done</option>
                                        </select>
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
                                <div onClick={saveProject} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                                    <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                                    <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                                    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                                    <span className="relative">Save</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Flip>
                : <></>}
            {openDescriptionModal ?
                <Flip right>
                    <div className='fixed w-[1000px] h-auto flex justify-start items-center top-[100px] z-50 bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>
                        <div className='flex justify-center items-start w-[100%] p-[50px] overflow-y-visible flex-col px-[10px] sm:px-[100px]' style={{ fontFamily: 'Smack' }}>
                            {/* <div className=' flex justify-center items-center  md:justify-start md:items-start text-[rgb(18,18,18)] w-full dark:text-white text-[30px] mt-[30px] lg:mt-[-30px]'>Profile details</div> */}
                            <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={handleDescriptionCancel}>
                                <img src={closeIcon} className=' w-[30px]' alt="" />
                            </div>
                            <div className="text-[17px] text-gray-600 dark:text-gray-300 ">
                                {description}
                            </div>
                        </div>
                    </div>
                </Flip>
                : <></>}
        </div>

    );
}
