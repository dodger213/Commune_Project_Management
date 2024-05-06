import React, { useEffect, useState } from 'react'
import AllProjects from '../allProjects';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { useSelector } from 'react-redux';

function MyProjects() {
    const [projects, setProjects] = useState([]);
    const { user } = useSelector((state) => state.users);
    useEffect(() => {
        if (user) {
            fetchProjects();
        }
    }, [user])
    const fetchProjects = async () => {
        try {
            const { data: { projects } } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/project/user/" + user._id)
            setProjects(projects);
        } catch (e) {
            NotificationManager.error('Error fetching Projects', 'Error')
        }
    }
    return (
        <div className="w-full h-full dark:bg-[rgb(18,18,18)] bg-[rgb(249,250,251)] transition-all flex flex-col">
            <div className=' w-full flex mt-[80px] h-full'>
                <AllProjects data={projects} fetchProjects={fetchProjects} viewMode />
            </div>
        </div>
    )
}

export default MyProjects
