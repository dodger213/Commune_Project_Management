import React from 'react'
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,

} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";


function Nav() {

  return (
    <div className='w-[450px]' style={{ fontFamily: 'Might' }}>
      <Card className="h-full w-full max-w-[20rem] p-4 bg-[#eee] dark:bg-[rgb(18,18,18)] border-[0px]">
        <List style={{ fontFamily: 'Might' }} className=' dark:text-gray-300'>
          <ListItem className=' mt-[50px] hover:bg-gray-300 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className='ml-[20px]'>All Projects</span>
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
          <ListItem className='hover:bg-gray-300 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className='ml-[20px]'>My Projects</span>
          </ListItem>
          <ListItem className='hover:bg-gray-300 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className='ml-[20px]'> Review Request</span>
          </ListItem>
          <ListItem className='hover:bg-gray-300 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className='ml-[20px]'> Bounty Request</span>
          </ListItem>
          <ListItem className='hover:bg-gray-300 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className='ml-[20px]'>Developers</span>
          </ListItem>
          <ListItem className='hover:bg-gray-300 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <span className='ml-[20px]'>Project Managers</span>
          </ListItem>
        </List>
      </Card>
    </div>
  )
}

export default Nav
