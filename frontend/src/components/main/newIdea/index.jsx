import React, { useEffect, useState } from 'react'
import AllProjects from '../allProjects';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

function NewIdea() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, [])
    const fetchProjects = async () => {
        try {
            const { data: { projects } } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/projects/idea")
            setProjects(projects);
        } catch (e) {
            NotificationManager.error('Error fetching Pms', 'Error')
        }
    }
    return (
        <div className="w-full h-full dark:bg-[rgb(18,18,18)] bg-[rgb(249,250,251)] transition-all flex flex-col">
            <div className=' w-full flex mt-[80px] h-full'>
                <AllProjects data={projects} fetchProjects={fetchProjects} />
            </div>
        </div>
    )
}

export default NewIdea
