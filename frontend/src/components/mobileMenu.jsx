import React from 'react'
import CurrencyItem from './CurrencyItem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Switcher from "./switcher";

function MobileMenu() {
    const [selectedCurrency, setSelectedCurrency] = React.useState(null);

    const handleBuyButton = () => {
        setSelectedCurrency();
    };
    return (
        <div id="mobile-menu" className=' w-[150px] h-[150px] mt-[-90px] bg-[#ffffff] dark:bg-[rgb(27,27,27)] transition-all px-[10px] buy-usdt flex flex-col items-center justify-center gap-[1.5rem] border-gray-500 rounded-[1rem] shadow-2xl' style={{ boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 8px 0px' }}>
            <div className=''>
                <Switcher size='25' />
            </div>
            <div
                style={{ display: "flex", gap: 12 }}
                className="flex flex-col items-center justify-center"
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
                                            <button onClick={openConnectModal} type="button" className='dark:text-white text-[#256fc4] text-[18px] sm:text-base md:text-[18px] transition-all evermore hover:opacity-[0.7] no-underline rounded-full hover:text-white' style={{ fontFamily: 'Smack' }}>
                                                Singin
                                            </button>
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
                                        <div style={{ display: 'flex', gap: 12 }} className='flex items-center flex-col justify-center'>

                                            <button onClick={() => handleBuyButton(account.address, selectedCurrency)} type="button" className='dark:text-white text-[#256fc4] text-[18px] sm:text-base md:text-[18px] transition-all evermore hover:opacity-[0.7] no-underline rounded-full hover:text-white' style={{ fontFamily: 'Smack' }}>
                                                Buy Now
                                            </button>

                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            </div>

        </div>
    )
}

export default MobileMenu