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
  Squares2X2Icon,
  SquaresPlusIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  CodeBracketIcon,
  RocketLaunchIcon    
} from "@heroicons/react/24/solid";

function Nav() {

  return (
    <div className='w-[450px]' style={{ fontFamily: 'Might' }}>
      <Card className="h-full w-full max-w-[20rem] p-4 bg-[rgb(249,250,251)] dark:bg-[rgb(18,18,18)] border-[0px]">
        <List style={{ fontFamily: 'Might' }} className=' dark:text-gray-300'>
          <ListItem className=' mt-[50px] hover:bg-blue-100 bg-blue-100 dark:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <Squares2X2Icon className="h-6 w-6 text-[rgb(25,118,210)]" />
            </ListItemPrefix>
            <span className='ml-[20px] text-[rgb(25,118,210)]'>All Projects</span>
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full text-[rgb(25,118,210)]" />
            </ListItemSuffix>
          </ListItem>
          <ListItem className='hover:bg-gray-200 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <SquaresPlusIcon className="h-6 w-6 text-gray-400" />
            </ListItemPrefix>
            <span className='ml-[20px] text-[rgb(134,146,157)] dark:text-gray-300'>My Projects</span>
            <ListItemSuffix>
              <Chip value="4" size="sm" variant="ghost" color="blue-gray" className="rounded-full text-[rgb(134,146,157)]" />
            </ListItemSuffix>
          </ListItem>
          <ListItem className='hover:bg-gray-200 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <CheckBadgeIcon className="h-6 w-6 text-gray-400" />
            </ListItemPrefix>
            <span className='ml-[20px] text-[rgb(134,146,157)] dark:text-gray-300'> Review Request</span>
          </ListItem>
          <ListItem className='hover:bg-gray-200 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <CurrencyDollarIcon className="h-6 w-6 text-gray-400" />
            </ListItemPrefix>
            <span className='ml-[20px] text-[rgb(134,146,157)] dark:text-gray-300'> Bounty Request</span>
          </ListItem>
          <ListItem className='hover:bg-gray-200 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <CodeBracketIcon  className="h-6 w-6 text-gray-400" />
            </ListItemPrefix>
            <span className='ml-[20px] text-[rgb(134,146,157)] dark:text-gray-300'>Developers</span>
          </ListItem>
          <ListItem className='hover:bg-gray-200 dark:hover:bg-[rgb(36,36,36)]'>
            <ListItemPrefix>
              <RocketLaunchIcon className="h-6 w-6 text-gray-400" />
            </ListItemPrefix>
            <span className='ml-[20px] text-[rgb(134,146,157)] dark:text-gray-300'>Project Managers</span>
          </ListItem>
        </List>
      </Card>
    </div>
  )
}

export default Nav
