import React, { useState } from 'react';
import { Modal } from 'antd';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import polkadotIcon from '../../assets/polkadot-new-dot-logo.svg';
import Image from "next/image";

function PolkadotWalletButton() {
    const [extensionAvailable, setExtensionAvailable] = useState(true);
    const [isAddress, setIsAddress] = useState(false);
    const [address, setAddress] = useState('');
    
    const connectWallet = async () => {
        if (typeof window !== 'undefined') {
            setExtensionAvailable(true);

            try {
                const extensions = await web3Enable('Commune AI');
                if (extensions.length === 0) {
                    console.log('You have to install Polkadot wallet extension');
                    setExtensionAvailable(false);
                    return;
                }
                setExtensionAvailable(true);
                const accounts = await web3Accounts();
                const provider = new WsProvider('wss://rpc.polkadot.io');
                const polkadotAPI = await ApiPromise.create({ provider });
                const address = accounts[0].address;
                await polkadotAPI.query.system.account(address);
                setIsAddress(true);
                setAddress(address);
            } catch (error) {
                console.error('Error', error);
            }
        } else {
            console.error('Cannot connect wallet');
        }
    };

    return (
        <>
            <div className='bg-gray-200 dark:bg-neutral-800 rounded-lg hover:shadow-2xl text-center hover:bg-blue-600 dark:hover:bg-blue-600 duration-200 
                text-white font-sans font-semibold px-2 py-2 w-[70px] flex justify-center items-center cursor-pointer' onClick={() => connectWallet()}>
                <Image className='transition-all w-[30px] cursor-pointer' src={polkadotIcon} alt="My Site Logo" />
            </div>
            {isAddress && (
                <Modal
                    open={isAddress}
                    closeIcon={null}
                    onCancel={() =>setIsAddress(false)}
                    width={'500px'}
                    footer={null}
                >
                    <div className="p-8 flex justify-center items-center flex-col gap-4 rounded-3xl bg-[#fff] dark:bg-[rgb(27,27,27)]">
                        <p className="mt-[0px] dark:text-white">Connected Successfully.<br/>address: {address}</p>
                    </div>
                </Modal>
            )}
            {extensionAvailable === false && (
                <Modal
                    open={!extensionAvailable}
                    closeIcon={null}
                    onCancel={() => setExtensionAvailable(true)}
                    width={'300px'}
                    footer={null}
                >
                    <div className="p-8 flex justify-center items-center flex-col gap-4 rounded-3xl bg-[#fff] dark:bg-[rgb(27,27,27)]">
                        <p className="mt-[20px] dark:text-white">You have to install the Polkadot{'.js'} extension to continue.</p>
                        <a
                            href="https://polkadot.js.org/extension/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md flex justify-center items-center px-4 py-2 bg-blue-500 text-white hover:text-white hover:bg-blue-400 transition-all duration-300"
                        >
                            Get Polkadot{'.js'} Extension
                        </a>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default PolkadotWalletButton;
