import React from 'react'
import Header from '../header';
import Nav from '../navbar';
import Main from '../main';

function Dashboard() {
    return (
        <div className="w-full h-full dark:bg-[rgb(18,18,18)] bg-[rgb(249,250,251)] transition-all flex flex-col">
            <Header />
            <div className=' w-full flex mt-[80px] h-full'>
                <Nav />
                <Main />
            </div>
        </div>
    )
}

export default Dashboard
