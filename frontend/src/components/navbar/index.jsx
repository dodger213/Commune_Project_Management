import React, { useEffect, useState } from 'react'
import {
  List,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import {
  Squares2X2Icon,
  UserPlusIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  DocumentPlusIcon
} from "@heroicons/react/24/solid";

import MenuItem from './menuItem';

function Nav() {
  const [activeKey, setActiveKey] = useState('');
  const { user } = useSelector((state) => state.users);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPm, setIsPm] = useState(false);
  const [isDev, setIsDev] = useState(false);
  useEffect(() => {
    const isAdmin = user?.role.some((a) => a === 'Administrator');
    const isPm = user?.role.some((a) => a === 'Project Manager');
    const isDev = user?.role.some((a) => a === 'Developer');
    setIsAdmin(isAdmin)
    setIsPm(isPm);
    setIsDev(isDev);
  }, [user])
  return (
    <div className='w-[450px] pt-[100px] bg-[rgb(249,250,251)] dark:bg-[rgb(18,18,18)] min-h-[100vh]' style={{ fontFamily: 'Might' }}>
      <div className="fixed h-full w-full  shadow-sm	 max-w-[20rem] p-4 bg-[rgb(249,250,251)] dark:bg-[rgb(18,18,18)] border-[0px]">
        <List style={{ fontFamily: 'Might' }} className=' dark:text-gray-300'>
          <MenuItem active={activeKey} setActiveKey={setActiveKey} title={'All Projects'} Icon={
            <Squares2X2Icon className="h-6 w-6" />
          } />
          {!isAdmin && <MenuItem active={activeKey} setActiveKey={setActiveKey} title={'My Projects'} Icon={
            <BriefcaseIcon className="h-6 w-6" />
          } />}
          {isPm && <MenuItem active={activeKey} setActiveKey={setActiveKey} title={'Review Request'} Icon={
            <CheckBadgeIcon className="h-6 w-6" />
          }
          />}
          {isAdmin && <MenuItem active={activeKey} setActiveKey={setActiveKey} title={'Bounty Request'} Icon={
            <CurrencyDollarIcon className="h-6 w-6" />
          } />}
          <MenuItem active={activeKey} setActiveKey={setActiveKey} title={'New Ideas'} Icon={
            <DocumentPlusIcon className="h-6 w-6" />
          } />
          <MenuItem active={activeKey} setActiveKey={setActiveKey} title={'Developers'} Icon={
            <CodeBracketIcon className="h-6 w-6" />
          } />
          <MenuItem active={activeKey} setActiveKey={setActiveKey} title={'Project Managers'} Icon={
            <RocketLaunchIcon className="h-6 w-6" />
          } />
          <MenuItem active={activeKey} setActiveKey={setActiveKey} title={'All Users'} Icon={
            <UserPlusIcon className="h-6 w-6" />
          } />
        </List>
      </div>
    </div>
  )
}

export default Nav
