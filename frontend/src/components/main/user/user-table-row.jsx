import { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/actions/usersAction';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import closeIcon from "../../../assets/211652_close_icon.svg"
import Label from '../components/label';
import Iconify from '../components/iconify';
import { Zoom } from 'react-reveal';
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  email,
  project,
  tech,
  role,
  handleClick,
}) {

  const dispatch = useDispatch();
  const { isLoading, user, isLoadingPost } = useSelector((state) => state.users);

  const [age, setAge] = useState('30');
  const [emal, setEmail] = useState('comdev@gmail.com');
  const [discordName, setDiscordName] = useState('potter');
  const [discordId, setDiscordId] = useState('potter2321po.');
  const [avatarFile, setAvatarFile] = useState("./images/12.png");
  const [walletNet, setWalletNet] = useState("ETH");
  const [walletKey, setWalletKey] = useState("0x....");
  const [techStack, setTechStack] = useState("Web3 & AI");
  const [gitRepo, setGitRepo] = useState("github.com/potter1990po");

  useEffect(() => {
    dispatch(getUser);
    if (user) {
      setAvatarFile(user.user.avatarFile)
      setDiscordName(user.user.discordName)
      setEmail(user.user.email)
      setDiscordId(user.user.discordId)
      setWalletNet(user.user.walletNet)
      setWalletKey(user.user.walletKey)
      setTechStack(user.user.techStack)
      setGitRepo(user.user.gitRepo)
      setAge(user.user.age)
    }
  }, [dispatch, isLoadingPost, user]);

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleDetail = () => setOpenModal(true);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} project="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{project}</TableCell>

        <TableCell align="center">{tech}</TableCell>

        <TableCell>
          <Label color={(role === 'Project Manager' && 'error') || 'success'}>{role}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {openModal ?
        <Zoom>
          <div className='fixed w-[600px] h-[800px] flex justify-start items-center top-[100px] z-50 bg-[#eee] dark:bg-[rgb(36,36,36)] shadow-md'>
            <div className=' w-full'>
              <div className=' fixed top-[30px] right-[30px] cursor-pointer z-[99]' onClick={handleCancel}>
                <img src={closeIcon} className=' w-[30px]' alt="" />
              </div>
              <div className=' z-10 ml-auto'>
                <div className='justify-center m-auto flex group items-center h-[6rem] w-[6rem] overflow-y-hidden bg-[#e1e1e1] hover:bg-[#cbcbcb] transition-all dark:bg-[rgb(30,30,30)] dark:hover:bg-[rgb(33,33,33)] lg:h-[12rem] lg:w-[12rem] md:h-[9rem] md:w-[9rem] dark:border-[rgb(33,33,33)] border-[#ffffff] border-[5px] rounded-[50%]'>
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

              <div className="flex flex-col justify-center items-center" style={{ fontFamily: 'Smack' }}>
                <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:!shadow-none p-3">
                  <div className="grid md:grid-cols-2 gap-2 px-2 w-full mt-[50px]">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                      <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Email</p>
                      <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                        {emal}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                      <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Age</p>
                      <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                        {age}
                      </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                      <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Discord Name</p>
                      <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                        {discordName}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                      <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Discord ID</p>
                      <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                        {discordId}
                      </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                      <p className="text-sm text-gray-600 dark:text-gray-400 " style={{ marginBottom: "10px" }}>Wallet Network</p>
                      <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                        {walletNet}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                      <p className="text-sm text-gray-600 dark:text-gray-400" style={{ marginBottom: "10px" }}>Wallet Key</p>
                      <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                        {walletKey}
                      </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-[#fff] bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-[rgb(33,33,33)] dark:shadow-none">
                      <p className="text-sm text-gray-600 dark:text-gray-400 " style={{ marginBottom: "10px" }}>Tech Stack</p>
                      <p className="text-base font-medium text-navy-700 dark:text-gray-200" style={{ marginBottom: "0" }}>
                        {techStack}
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
        : <></>}

    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  tech: PropTypes.any,
  name: PropTypes.any,
  project: PropTypes.any,
  selected: PropTypes.any,
  role: PropTypes.string,
};
