import React, { useState, useEffect } from 'react'
import { UserView } from '../user/view'
import axios from 'axios';

function AllUsers() {
    const [data, setData] = useState([]);

    const fetchUserData = async () => {
        const { data: { users } } = await axios.get(process.env.REACT_APP_API_BASE_URL + "/user")
        setData(users);
    }
    useEffect(() => {
        fetchUserData();
    }, [])
    return (
        <div className=' w-full h-full flex flex-col gap-[30px] justify-center items-center mt-[50px] mb-[50px] bg-[rgb(249,250,251)] dark:bg-[rgb(18,18,18)]'>
            <UserView userData={data} />
        </div>
    )
}

export default AllUsers