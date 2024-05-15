import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { NotificationManager } from "react-notifications";
import UserAvatar from '../components/userAvatar';
import { Link } from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Label from '../components/label';
import Iconify from '../components/iconify';
import { Zoom } from 'react-reveal';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function UserTableRow({
  fetchUserData,
  _id,
  discordName,
  age,
  role,
  email,
  avatar,
  techStack,
  githubLink,
  selected,
  discordId,
  walletKey,
  walletNetwork
}) {


  const [avatarFile, setAvatarFile] = useState("./images/12.png");
  const [updateRole, setUpdateRole] = useState(role);
  const { user } = useSelector((state) => state.users);


  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [openModal, setOpenModal] = useState(false);
  const [copyed, setCopyed] = useState(false);

  const handleDetail = () => {
    setOpenModal(true)
    setOpen(null);
  };

  const handleCancel = () => {
    setCopyed(false);
    setOpenModal(false);
  };
  const handleSaveUser = async () => {
    try {
      await axios.put(process.env.REACT_APP_API_BASE_URL + "/user/" + _id, { role: updateRole, email, _id });
      NotificationManager.success('User updated successfully', 'Success')
      fetchUserData();
    } catch (e) {
      NotificationManager.error('Error updating a user', 'Error')
    }
  }
  const handleDeleteUser = async () => {
    try {
      await axios.delete(process.env.REACT_APP_API_BASE_URL + "/user/" + _id);
      NotificationManager.success('User deleted successfully', 'Success')
      fetchUserData();
      setOpen(null)
    } catch (e) {
      NotificationManager.error('User updated successfully', 'Error')
    }
  }
  const handleRoleChange = (val) => {
    const already = updateRole.some((aRole => aRole === val))
    if (already) {
      const temp = updateRole.filter((aRole => aRole !== val));
      setUpdateRole(temp);
      return;
    } else {
      setUpdateRole([...updateRole, val]);
    }
  }
  const copyToClipboard = (text) => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // Make sure the textarea is not visible
    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;

    // Append the textarea to the DOM
    document.body.appendChild(textarea);

    // Select the textarea's content
    textarea.select();

    // Copy the selected content to the clipboard
    document.execCommand('copy');

    // Remove the textarea from the DOM
    document.body.removeChild(textarea);
  };

  const renderWalletKey = (key) => {
    return (
      <div className='flex items-center'>
        <span>{key.slice(0, 4) + '...' + key.slice(key.length - 5, key.length - 1)}</span>
        {!copyed ?
          <svg onClick={() => {
            copyToClipboard(key);
            setCopyed(true)
          }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-[10px] cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-[10px]">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>

        }

      </div>
    )
  }

  return (
    <>
      <TableRow hover tabIndex={-1} project="checkbox" selected={selected} >
        <TableCell padding="checkbox">
        </TableCell>

        <TableCell component="th" scope="row" padding="none" className=' dark:text-gray-200' style={{ fontFamily: 'Smack' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <img className='w-[50px] rounded-[50%]' alt={discordName} src={`${process.env.REACT_APP_API_BASE_URL}/${avatar}`} /> */}
            <img onClick={handleDetail} className='w-[50px] h-[50px] rounded-[50%] cursor-pointer' src={(avatar === 'default' || !avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${avatar}`} alt="" />
            {/* <UserAvatar user={user}/> */}
            <Typography variant="subtitle2" noWrap style={{ fontFamily: 'Smack' }}>
              {discordName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell className=' dark:text-gray-200' style={{ fontFamily: 'Smack' }}>{email}</TableCell>

        <TableCell className=' dark:text-gray-200' style={{ fontFamily: 'Smack' }}>{age}</TableCell>

        <TableCell align="center" className=' dark:text-gray-200' style={{ fontFamily: 'Smack' }}>{techStack}</TableCell>

        <TableCell>
          {role.map((aRole, idx) =>
            <div className='m-[3px]'>
              <Label key={idx} color={aRole === 'Developer' ? 'success' : 'error'}>{aRole}</Label>
            </div>
          )}
        </TableCell>
        <TableCell className=' dark:text-gray-200'>
          <Link to={githubLink} target='_blank' className='dark:text-gray-200'>{githubLink}</Link>
          {console.log(githubLink)}
        </TableCell>

        {user?.role.some((aRole) => aRole === 'Administrator') && < TableCell align="right">
          <IconButton onClick={handleOpenMenu} className=' dark:text-gray-200'>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>}
      </TableRow >

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleDetail}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Detail
        </MenuItem>

        <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {openModal ?
        <div className='fixed top-[0px] left-0 w-screen h-screen flex justify-center items-center z-[99]'>
          <div className=' fixed w-screen h-screen top-0 left-0 bg-[#000] dark:bg-gray-500 opacity-40'>
          </div>
          <Zoom duration={500}>
            <div className='w-[600px] h-[800px] flex justify-start rounded-[30px] items-center top-[100px] z-50 bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>
              <div className=' w-full'>
                <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[100]' onClick={handleCancel}>
                  <XCircleIcon class="h-10 w-10 text-gray-800 dark:text-white" />
                </div>
                <div className=' z-10 ml-auto mt-[50px]'>
                  <div className='justify-center m-auto flex group items-center h-[6rem] w-[6rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] lg:h-[12rem] lg:w-[12rem] md:h-[9rem] md:w-[9rem] dark:border-[rgb(33,33,33)] border-[#ffffff] border-[5px] rounded-[50%]'>
                    {/* {avatarFile ?
                      <span className='w-full h-full flex bg-contain bg-no-repeat bg-center overflow-y-hidden'>
                        <img className='w-full h-fit' src={avatar} alt="" />
                      </span>
                      : <span className='w-full h-full'>
                        <div className=' w-full h-full'>
                        </div>
                      </span>
                    } */}
                    <img className='w-full rounded-[50%]' src={(avatar === 'default' || !avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${avatar}`} alt="" />
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center" style={{ fontFamily: 'Smack' }}>
                  <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none p-3">
                    <div className="grid md:grid-cols-2 gap-2 px-2 w-full mt-[50px]">
                      <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Email</p>
                        <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                          {email}
                        </p>
                      </div>

                      <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Age</p>
                        <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                          {age ?? "..."}
                        </p>
                      </div>

                      <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Discord Name</p>
                        <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                          {discordName ?? "..."}
                        </p>
                      </div>

                      <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Discord ID</p>
                        <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                          {discordId ?? "..."}
                        </p>
                      </div>

                      <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-400 " style={{ marginBottom: "10px" }}>Wallet Network</p>
                        <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                          {walletNetwork ?? "..."}
                        </p>
                      </div>

                      <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Wallet Key</p>
                        <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                          {walletKey ? renderWalletKey(walletKey) : '...'}
                        </p>
                      </div>

                      <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-400 " style={{ marginBottom: "10px" }}>Tech Stack</p>
                        <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                          {techStack ?? "..."}
                        </p>
                      </div>

                      <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Github repo link</p>
                        <p className="text-[10px] font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                          <Link target='_blank' className='text-navy-700 dark:text-gray-200' to={githubLink}> {githubLink} </Link>
                        </p>
                      </div>

                    </div>
                    <div className='flex pt-[10px]'>
                      <FormControlLabel control={<Checkbox defaultChecked={role.some((aRole => aRole === 'Developer'))} onChange={(e) => handleRoleChange('Developer')} />} label="Developer" />
                      <FormControlLabel control={<Checkbox defaultChecked={role.some((aRole => aRole === 'Project Manager'))} onChange={(e) => handleRoleChange('Project Manager')} />} label="Project Manager" />
                      <FormControlLabel control={<Checkbox defaultChecked={role.some((aRole => aRole === 'Administrator'))} onChange={(e) => handleRoleChange('Administrator')} />} label="Administrator" />
                    </div>
                    <div className=' flex justify-center items-center w-full mt-[50px] mb-[40px]'>
                      <div onClick={handleSaveUser} style={{ fontFamily: 'Might', width: '200px', fontSize: '18px', transition: '0.1s' }} className="relative rounded-[15px]  cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center content-center focus:outline-none">
                        <span className="absolute top-0 left-0 w-full h-full rounded-[15px] opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4]"  ></span>
                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4]"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4]"></span>
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4]"></span>
                        <span className="relative">Save</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </div>
        : <></>
      }

    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  tech: PropTypes.any,
  name: PropTypes.any,
  selected: PropTypes.any,
  role: PropTypes.string,
};
