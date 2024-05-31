import React from "react";
import Switcher from "./switcher";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import metaIcon from '../assets/metamask-icon.svg'
import polIcon from '../assets/polkadot-new-dot-logo.svg'
import logo from '../assets/comai-logo.png'
import PolkadotWalletButton from "./main/components/polkadot-wallet-button";
import { logOut } from "../redux/actions/usersAction";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged, user } = useSelector((state) => state.users);
  React.useEffect(() => {
    const smoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", smoothScroll);
    });
    if (!isLogged) {
      // navigate('/');
    }
    return () => {
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", smoothScroll);
      });
    };
  }, [isLogged]);

  const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const openProfilePage = () => {
    navigate("/profile");
  };
  const openEditProfilePage = () => {
    navigate("/profile/edit");
  };
  const handleLogOut = () => {
    localStorage.removeItem('token')
    dispatch(logOut());
    navigate('/bounties');
  }
  return (
    <div className=" fixed w-full z-[99] bg-[#ffffff] dark:bg-[rgb(18,18,18)] transition-all py-1 sm:py-2 md:py-3 flex items-center justify-between shadow-md dark:bg-[#000000]">
      <div className="flex items-center justify-between w-full max-w-[1750px] px-4 mx-auto sm:px-6 md:px-8">
        <div className="flex justify-center items-center gap-2">
          <span onClick={() => {
            navigate(isLogged ? '/bounties' : '/bounties')
          }}>
            <img
              src={logo}
              alt="Logo"
              className="cursor-pointer sm:h-[70px] h-[50px]"
            />
          </span>
          <span onClick={() => {
            navigate(isLogged ? '/bounties' : '/bounties')
          }} className=' no-underline dark:text-white transition-all'><p className=' cursor-pointer text-[24px] font-bold mt-[7px]'>Commune Management v2.0</p></span>
        </div>
        <nav className="flex-wrap gap-3 items-center hidden space-x-4 pc-menu md:flex">
          <div className=''>
            <Switcher size='30' />
          </div>
          {/* <div className=" flex gap-[4px] justify-center items-center">
            <svg className="h-8 w-8 text-[#256fc4] dark:text-[white]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M20 12h-13l3 -3m0 6l-3 -3" /></svg>
            <button className='dark:text-white text-[#256fc4] text-[18px] sm:text-base md:text-[18px] transition-all evermore hover:opacity-[0.7] no-underline rounded-full dark:hover:text-white hover:text-blue-800' style={{ fontFamily: 'Smack' }}>
              SignIn
            </button>
          </div> */}
          <div className=" flex gap-[7px] justify-center items-center">

            {/* {
                              user && user.user.avatarFile ? 
                              <img className="w-8 h-8" src={user.user.avatarFile} alt="" />
                              : <img className="w-8 h-8 rounded-[50%]" src="./images/12.png" alt="" />
                            } */}
            {/* <button onClick={openProfilePage} className='dark:text-white text-[#256fc4] text-[18px] sm:text-base md:text-[18px] transition-all evermore hover:opacity-[0.7] no-underline rounded-full dark:hover:text-white hover:text-blue-800' style={{ fontFamily: 'Smack' }}>
              Profile
            </button> */}
            {isLogged && <Menu as="div" className="relative inline-block text-left z-[99]">
              <div className="mt-[5px]">
                <Menu.Button className="inline-flex w-full justify-center rounded-[50px] text-sm font-semibold text-gray-900 dark:text-[white] shadow-sm ring-1 ring-inset ring-gray-300">
                  <div
                    id="mobile-menu-button"
                    className="p-1 dark:text-white focus:outline-none"
                  >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-12 w-12 text-[#256fc4] dark:text-[white]">
                      <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clipRule="evenodd" />
                    </svg> */}
                    <img className='header-user' src={(user.avatar === 'default' || !user.avatar) ? '/images/12.png' : `${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`} alt="" />

                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-50 mt-4 right-0 w-[185px] origin-top-right divide-y divide-gray-100 dark:divide-[rgb(18,18,18)] rounded-md bg-[#ffffff] dark:bg-[rgb(27,27,27)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-[25px] flex flex-col justify-start items-start gap-[20px]">
                    <Menu.Item>
                      <div className=' flex justify-center items-center gap-[15px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-[#fff]">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        <span onClick={openProfilePage} className=" text-[#256fc4] cursor-pointer dark:text-white" style={{ fontFamily: 'Smack' }}>
                          My Profile
                        </span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        className="flex items-center justify-center gap-[15px]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-[#fff]">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <span onClick={openEditProfilePage} className=" text-[#256fc4] dark:text-white cursor-pointer" style={{ fontFamily: 'Smack' }}>
                          Edit Profile
                        </span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        className="flex items-center justify-center gap-[15px]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-[#fff]">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span onClick={handleLogOut} className=" text-[#256fc4] dark:text-white cursor-pointer" style={{ fontFamily: 'Smack' }}>
                          Log Out
                        </span>
                      </div>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>}
            {!isLogged && <Menu as="div" className="relative inline-block text-left z-[99]">
              <div className="mt-[5px]">
                <Menu.Button className="inline-flex w-full justify-center rounded-[50px] text-sm font-semibold text-gray-900 dark:text-[white] shadow-sm ring-1 ring-inset ring-gray-300">
                  <div
                    id="mobile-menu-button"
                    className="p-1 dark:text-white focus:outline-none"
                  >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-12 w-12 text-[#256fc4] dark:text-[white]">
                      <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clipRule="evenodd" />
                    </svg> */}
                    <img className='header-user' src={'/images/12.png'} alt="" />

                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-50 mt-4 right-0 w-[185px] origin-top-right divide-y divide-gray-100 dark:divide-[rgb(18,18,18)] rounded-md bg-[#ffffff] dark:bg-[rgb(27,27,27)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-[25px] flex flex-col justify-start items-start gap-[20px]">
                    <Menu.Item>
                      <div className=' flex justify-center items-center gap-[15px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-[#fff]">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        <span onClick={() => navigate('/login')} className=" text-[#256fc4] cursor-pointer dark:text-white" style={{ fontFamily: 'Smack' }}>
                          Sign In
                        </span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        className="flex items-center justify-center gap-[15px]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-[#fff]">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                        <span onClick={() => navigate('/signup')} className=" text-[#256fc4] dark:text-white cursor-pointer" style={{ fontFamily: 'Smack' }}>
                          Sign Up
                        </span>
                      </div>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>}
          </div>
          <div
            style={{ display: "flex" }}
            className="flex items-center justify-center ml-[1px] gap-[25px]"
          >
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <div className="flex gap-[10px] justify-center items-center">
                            <img onClick={openConnectModal} className="w-[30px] cursor-pointer hover:w-[40px] transition-all" src={metaIcon} alt="" />
                            {/* <span onClick={openConnectModal} className='dark:text-white cursor-pointer text-[#5298e9] text-[18px] sm:text-base md:text-[18px] transition-all evermore hover:opacity-[0.7] no-underline rounded-full dark:hover:text-white hover:text-blue-800' style={{ fontFamily: 'Smack' }}>
                              Connect
                            </span> */}
                          </div>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} style={{ boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px' }}>
                            Wrong network
                          </button>
                        );
                      }
                      return (
                        <div className=" flex gap-[15px] justify-center items-center">
                          {/* <svg class="h-8 w-8 text-[#256fc4] dark:text-[white]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                          <button onClick={() => handleBuyButton(account.address, selectedCurrency)} type="button" className='dark:text-white text-[#256fc4] text-[18px] sm:text-base md:text-[18px] transition-all evermore hover:opacity-[0.7] no-underline rounded-full dark:hover:text-white hover:text-blue-800' style={{ fontFamily: 'Smack' }}>
                            SignOut
                          </button> */}
                          {/* <div className=" flex gap-[7px] justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-7 w-7 text-[#256fc4] dark:text-[white]">
                              <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clipRule="evenodd" />
                            </svg>
                            {
                              user && user.user.avatarFile ? 
                              <img className="w-8 h-8" src={user.user.avatarFile} alt="" />
                              : <img className="w-8 h-8 rounded-[50%]" src="./images/12.png" alt="" />
                            }
                          </div> */}
                          <div
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-3 rounded-lg bg-gradient-to-tr from-[#ffffff] dark:from-[rgb(27,27,27)] dark:to-[rgb(27,27,27)] cursor-pointer to-[#dedede] text-[rgb(18,18,18)] dark:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-1"
                            onClick={openChainModal} style={{ fontFamily: 'Smack' }}>
                            <span>

                              {chain.hasIcon && (
                                <div
                                  style={{
                                    background: chain.iconBackground,
                                    borderRadius: 999,
                                    overflow: 'hidden',
                                    marginRight: 4,
                                  }}
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      className=' w-[25px] h-[25px]'
                                    />
                                  )}
                                </div>
                              )}
                            </span>
                            <span className=" text-[15px] first-letter:uppercase lowercase text-[rgb(18,18,18)] dark:text-white">
                              {chain.name}
                            </span>
                            <svg className="h-5 w-5 text-[rgb(18,18,18)] dark:text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="6 9 12 15 18 9" /></svg>
                          </div>
                          <div
                            className="align-middle select-none cursor-pointer font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[10px] px-3 rounded-lg bg-gradient-to-tr from-[#ffffff] dark:from-[rgb(27,27,27)] dark:to-[rgb(27,27,27)] to-[#dedede] text-[rgb(18,18,18)] dark:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-2"
                            onClick={openAccountModal} style={{ fontFamily: 'Smack' }}>
                            <span className=" text-[15px] uppercase text-[rgb(18,18,18)] dark:text-white">
                              {account.displayBalance
                                ? account.displayBalance
                                : ''}
                            </span>
                            <span className=" text-[15px] first-letter:uppercase lowercase text-[rgb(18,18,18)] dark:text-white">
                              {account.displayName}
                            </span>
                            <svg className="h-5 w-5 text-[rgb(18,18,18)] dark:text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="6 9 12 15 18 9" /></svg>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
            <div>
              <PolkadotWalletButton />
            </div>
          </div>
        </nav>

        <div className="md:hidden sp-menu">
          {/* <Dropdown className={{antdModel}} menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <button
                  id="mobile-menu-button"
                  className="p-2 text-[rgb(18,18,18)] dark:text-white focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </Space>
            </a>
          </Dropdown> */}
          <Menu as="div" className="relative inline-block text-left z-[99]">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#f0f0f0] dark:bg-[rgb(27,27,27)] px-3 py-2 text-sm font-semibold text-gray-900 dark:text-[white] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <div
                  id="mobile-menu-button"
                  className="p-2 text-[rgb(18,18,18)] dark:text-white focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-50 mt-4 right-0 w-[250px] origin-top-right divide-y divide-gray-100 dark:divide-[rgb(18,18,18)] rounded-md bg-[#ffffff] dark:bg-[rgb(27,27,27)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-[40px] flex flex-col justify-start items-start gap-[20px]">

                  <Menu.Item>
                    <div className=' flex gap-[21px] justify-center items-center'>
                      <Switcher size='25' />
                      <span className=" text-[#256fc4] dark:text-white" style={{ fontFamily: 'Smack' }}>
                        Night Mode
                      </span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      style={{ display: "flex", gap: 12 }}
                      className="flex flex-col items-center justify-center ml-[1px]"
                    >
                      <ConnectButton.Custom>
                        {({
                          account,
                          chain,
                          openAccountModal,
                          openChainModal,
                          openConnectModal,
                          authenticationStatus,
                          mounted,
                        }) => {
                          // Note: If your app doesn't use authentication, you
                          // can remove all 'authenticationStatus' checks
                          const ready = mounted && authenticationStatus !== 'loading';
                          const connected =
                            ready &&
                            account &&
                            chain &&
                            (!authenticationStatus ||
                              authenticationStatus === 'authenticated');

                          return (
                            <div
                              {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                  opacity: 0,
                                  pointerEvents: 'none',
                                  userSelect: 'none',
                                },
                              })}
                            >
                              {(() => {
                                if (!connected) {
                                  return (
                                    <div className=" flex gap-[14px] justify-center items-center">
                                      <svg className="h-8 w-8 text-[#256fc4] dark:text-[white]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M20 12h-13l3 -3m0 6l-3 -3" /></svg>
                                      <button onClick={openConnectModal} type="button" className='dark:text-white text-[#256fc4] text-[18px] sm:text-base md:text-[18px] transition-all evermore hover:opacity-[0.7] no-underline rounded-full dark:hover:text-white hover:text-blue-800' style={{ fontFamily: 'Smack' }}>
                                        Connect
                                      </button>
                                    </div>
                                  );
                                }

                                if (chain.unsupported) {
                                  return (
                                    <button onClick={openChainModal} type="button" style={{ boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px' }}>
                                      Wrong network
                                    </button>
                                  );
                                }

                                return (
                                  <div className=" flex flex-col gap-[14px] justify-center items-start">
                                    {/* <svg class="h-8 w-8 text-[#256fc4] dark:text-[white]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                                    <button onClick={() => handleBuyButton(account.address, selectedCurrency)} type="button" className='dark:text-white text-[#256fc4] text-[18px] sm:text-base md:text-[18px] transition-all evermore hover:opacity-[0.7] no-underline rounded-full dark:hover:text-white hover:text-blue-800' style={{ fontFamily: 'Smack' }}>
                                      SignOut
                                    </button> */}
                                    <div
                                      className="align-middle select-none cursor-pointer font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-3 rounded-lg bg-gradient-to-tr from-[#ffffff] dark:from-[rgb(18,18,18)] dark:to-[rgb(18,18,18)] to-[#dedede] text-[rgb(18,18,18)] dark:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-1"
                                      onClick={openChainModal} style={{ fontFamily: 'Smack' }}>
                                      <span>

                                        {chain.hasIcon && (
                                          <div
                                            style={{
                                              background: chain.iconBackground,
                                              borderRadius: 999,
                                              overflow: 'hidden',
                                              marginRight: 4,
                                            }}
                                          >
                                            {chain.iconUrl && (
                                              <img
                                                alt={chain.name ?? 'Chain icon'}
                                                src={chain.iconUrl}
                                                className=' w-[25px] h-[25px]'
                                              />
                                            )}
                                          </div>
                                        )}
                                      </span>
                                      <span className=" text-[15px] first-letter:uppercase lowercase text-[rgb(18,18,18)] dark:text-white">
                                        {chain.name}
                                      </span>
                                      <svg className="h-5 w-5 text-[rgb(18,18,18)] dark:text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="6 9 12 15 18 9" /></svg>
                                    </div>
                                    <div
                                      className="align-middle select-none cursor-pointer font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[10px] px-3 rounded-lg bg-gradient-to-tr from-[#ffffff] dark:from-[rgb(18,18,18)] dark:to-[rgb(18,18,18)] to-[#dedede] text-[rgb(18,18,18)] dark:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-2"
                                      onClick={openAccountModal} style={{ fontFamily: 'Smack' }}>
                                      <span className=" text-[15px] uppercase text-[rgb(18,18,18)] dark:text-white">
                                        {account.displayBalance
                                          ? account.displayBalance
                                          : ''}
                                      </span>
                                      <span className=" text-[15px] first-letter:uppercase lowercase text-[rgb(18,18,18)] dark:text-white">
                                        {account.displayName}
                                      </span>
                                      <svg className="h-5 w-5 text-[rgb(18,18,18)] dark:text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="6 9 12 15 18 9" /></svg>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          );
                        }}
                      </ConnectButton.Custom>
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

    </div>
  );
};

export default Header;
