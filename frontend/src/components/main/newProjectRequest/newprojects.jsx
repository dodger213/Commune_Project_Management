import { Card, Dropdown } from "flowbite-react";
import projectImg from "../../../assets/commune.gif"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, createUser } from "../../../redux/actions/usersAction";
import { Zoom } from 'react-reveal';
import { XCircleIcon } from "@heroicons/react/24/solid";

export function NewProjects() {

    const dispatch = useDispatch();
    const { isLoading, user, isLoadingPost } = useSelector((state) => state.users);

    const [date, setDate] = useState('2024.5.1');
    const [dev, setDev] = useState('potter');
    const [title, setTitle] = useState('Com Tensor');
    const [description, setDescription] = useState('Commune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor projectCommune bittenor <br> projectCommune bittenor projectCommune bittenor projectCommune bittenor project');
    const [avatarFile, setAvatarFile] = useState("./images/commune.gif");
    const [status, setStatus] = useState("Suggested");
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
            setDate(user.user.pm)
        }
    }, [dispatch, isLoadingPost, user]);
    const [openDetailModal, setOpenDetailModal] = useState(false);

    const handleDetail = () => setOpenDetailModal(true);

    const handleDetailCancel = () => {
        setOpenDetailModal(false);
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
                        <Dropdown.Item>
                            <div
                                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Approve
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <div
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Reject
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
                    <div className=" text-blue-500 text-[20px] ml-[50px]">
                        <span className=" text-red-600">Potter</span> is Suggesting
                    </div>
                </div>
            </Card>
            {openDetailModal ?
                <div className='fixed top-[0px] left-0 w-screen h-screen flex justify-center items-center z-[99]'>
                    <div className=' fixed w-screen h-screen top-0 left-0 bg-[#000] dark:bg-gray-500 opacity-40'>
                    </div>
                    <Zoom duration={500}>
                        <div className='fixed w-[600px] rounded-[30px] h-auto flex justify-start items-center top-[100px] z-50 bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>
                            <div className=' w-full h-full'>
                                <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={handleDetailCancel}>
                                    <XCircleIcon class="h-10 w-10 text-gray-800 dark:text-white" />
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
                                <div className="w-full px-[20px] justify-center items-center text-center mt-[20px] ">
                                    <div className=" w-full h-[200px] text-[14px] overflow-y-scroll dark:text-gray-300">
                                        {description}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center mb-[50px]" style={{ fontFamily: 'Smack' }}>
                                    <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none p-3">
                                        <div className="grid md:grid-cols-2 gap-2 px-2 w-full mt-[50px]">
                                            <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Developer</p>
                                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {dev}
                                                </p>
                                            </div>

                                            <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                                                <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Suggested Date</p>
                                                <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                                                    {date}
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
                    </Zoom>
                </div>
                : <></>}
        </div>

    );
}
