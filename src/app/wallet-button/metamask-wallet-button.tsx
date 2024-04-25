import React from 'react'
import metaIcon from '../../assets/metamask-icon.svg'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from "next/image";

function MetamaskWalletButton() {
    return (
        <div className=''>
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
                            style={{ width: '100%' }}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        // <button onClick={openConnectModal} style={{ fontFamily: 'Might', fontSize: '20px', marginBottom: '1rem', transition: '0.1s'}} className="flex p-2 bg-[#256fc4] text-white items-center justify-center focus:outline-none dark:bg-[rgb(18,18,18)] rounded-[0.5rem] w-full hover:bg-[#6db1ff]">
                                        //     Connect Wallet
                                        // </button>
                                        // <a onClick={openConnectModal} style={{ fontFamily: 'Might', fontSize: '20px', marginBottom: '1rem', transition: '0.1s'}} class="relative flex items-center justify-center no-underline px-5 py-2.5 overflow-hidden group bg-[#256fc4] dark:bg-[rgb(18,18,18)] hover:bg-gradient-to-r rounded-[0.5rem] w-full hover:from-[rgb(104,127,255)] dark:hover:from-[rgb(30,31,34)] dark:hover:to-[rgb(30,31,34)] hover:to-[rgb(71,98,248)] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[rgb(71,98,248)] dark:hover:ring-[rgb(30,31,34)] transition-all ease-out duration-300">
                                        //     <span class="absolute z-0 right-0 w-8 h-32 dark:hidden -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                        //     <span class="relative">Button Text</span>
                                        // </a>
                                        <div className='bg-gray-200 dark:bg-neutral-800 rounded-lg hover:shadow-2xl text-center hover:bg-blue-600 dark:hover:bg-blue-600 duration-200 
                                                     text-white font-sans font-semibold px-2 py-2 w-[70px] flex justify-center items-center cursor-pointer' onClick={openConnectModal}>
                                            <Image className='transition-all w-[30px] cursor-pointer' src={metaIcon} alt="" />
                                        </div>
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        // <button onClick={openChainModal} type="button">
                                        //     Wrong network
                                        // </button>
                                        <a onClick={openChainModal} style={{ fontFamily: 'Might', fontSize: '20px', marginBottom: '1rem', transition: '0.1s' }} className="relative rounded-[0.5rem] w-full cursor-pointer group font-medium no-underline flex p-2 text-white items-center justify-center focus:outline-none">
                                            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-[#256fc4] to-[#256fc4] dark:from-[rgb(18,18,18)] dark:to-[rgb(18,18,18)]"  ></span>
                                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#256fc4] to-[#256fc4] dark:from-[rgb(18,18,18)] dark:to-[rgb(18,18,18)]"></span>
                                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#256fc4] to-[#256fc4] dark:from-[rgb(18,18,18)] dark:to-[rgb(18,18,18)]"></span>
                                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#256fc4] from-[#256fc4] dark:from-[rgb(18,18,18)] dark:to-[rgb(18,18,18)]"></span>
                                            <span className="relative">Wrong network</span>
                                        </a>
                                    );
                                }

                                return (
                                    <div style={{ display: 'flex', gap: 12 }} className='flex flex-col items-center justify-center'>
                                        <button
                                            onClick={openChainModal}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                            type="button"
                                            className=' dark:text-white'
                                        >
                                            {chain.hasIcon && (
                                                <div
                                                    style={{
                                                        background: chain.iconBackground,
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: 999,
                                                        overflow: 'hidden',
                                                        marginRight: 4,
                                                    }}
                                                >
                                                    {chain.iconUrl && (
                                                        <Image
                                                            alt={chain.name ?? 'Chain icon'}
                                                            src={chain.iconUrl}
                                                            width={12}
                                                            height={12}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {chain.name}
                                        </button>

                                        <button onClick={openAccountModal} className=' dark:text-white' type="button">
                                            {account.displayName}
                                            {account.displayBalance
                                                ? ` (${account.displayBalance})`
                                                : ''}
                                        </button>

                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    )
}

export default MetamaskWalletButton