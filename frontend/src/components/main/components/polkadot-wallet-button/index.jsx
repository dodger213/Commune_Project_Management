import React, { useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";
import polkadotImg from "../../../../assets/polkadot-new-dot-logo.svg";
import { Zoom } from "react-reveal";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { NotificationManager } from "react-notifications";

function PolkadotWalletButton() {
  const [extensionAvailable, setExtensionAvailable] = useState();
  const [isWalletModal, setIsWalletModal] = useState(false);
  const [account, setAccount] = useState([]);
  const [address, setAddress] = useState();
  const [name, setName] = useState();

  const connectWallet = async () => {
    setIsWalletModal(true);
    if (typeof window !== "undefined") {
      setExtensionAvailable(true);

      try {
        const extensions = await web3Enable("Commune AI");
        if (extensions.length === 0) {
          console.log("Install Polkadot wallet extension");
          setExtensionAvailable(false);
          return;
        }
        setExtensionAvailable(true);
        const accounts = await web3Accounts();
        const provider = new WsProvider("wss://rpc.polkadot.io");
        const polkadotAPI = await ApiPromise.create({ provider })
        const address = accounts[0].address;
        await polkadotAPI.query.system.account(address);
        setAccount(accounts);
      } catch (error) {
        NotificationManager.error('Error', 'Error')
      }
    } else {
      NotificationManager.error('Cannot connect wallet', 'Error')
    }
  };

  const handleModalCancel = () => {
    setIsWalletModal(false);
  }

  const handleAccount = (a) => {
    setAddress(a.address);
    setName(a.meta.name);
  }

  return (
    <div>
      {extensionAvailable === false && isWalletModal === true && (
        <Zoom duration={500}>
          <div className=" w-full fixed top-[100px] left-[50%]">
            <div className="p-8 flex justify-center items-center flex-col gap-4 rounded-2xl bg-[#eee] dark:bg-[rgb(27,27,27)] w-[300px]">
              <div
                className=" top-[10px] ml-auto cursor-pointer z-[99]"
                onClick={handleModalCancel}
              >
                <XCircleIcon class="h-7 w-7 text-gray-800 dark:text-white" />
              </div>
              <p className="mt-[-20px] dark:text-white">
                Please install the Polkadot.js extension to continue.
              </p>
              <a
                href="https://polkadot.js.org/extension/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md flex justify-center items-center px-4 py-2 bg-red-500 text-white hover:text-white hover:bg-red-400 transition-all duration-300 no-underline"
              >
                Get Polkadot.js Extension
              </a>
            </div>
          </div>
        </Zoom>
      )}
      {account && isWalletModal === true && (
        <Zoom duration={500}>
          <div className=" w-full fixed top-[100px] left-[38%]">
            <div className="p-8 flex justify-center items-center flex-col gap-4 rounded-2xl bg-[#eee] dark:bg-[rgb(27,27,27)] w-[700px]">
              <div
                className=" top-[10px] ml-auto cursor-pointer z-[99]"
                onClick={handleModalCancel}
              >
                <XCircleIcon class="h-7 w-7 text-gray-800 dark:text-white" />
              </div>
              <p className="mt-[-50px] dark:text-green-400 text-[20px]">
                Successfully connected!
              </p>
              <div className=" flex flex-col justify-center items-center gap-4 px-6 mb-3 mt-4">
                {account.map((a) => {
                  return (
                    <div className=" flex justify-center items-center gap-4 dark:bg-[rgb(42,42,42)] bg-[#fff] p-3 rounded-md w-full cursor-pointer" onClick={() => handleAccount(a)}>
                      <p className="text-red-500">
                        {a.meta.name}
                      </p>
                      <p className="dark:text-white">
                        {a.address}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Zoom>
      )}
      <div className=" flex justify-center items-center gap-2">
        <img
          onClick={() => connectWallet()}
          className="hover:w-[40px] transition-all w-[30px] cursor-pointer"
          src={polkadotImg}
          alt=""
        />
        {address && name &&
          <div
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-[10px] px-3 rounded-lg bg-gradient-to-tr from-[#ffffff] dark:from-[rgb(27,27,27)] dark:to-[rgb(27,27,27)] to-[#dedede] text-[rgb(18,18,18)] dark:text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-2"
            style={{ fontFamily: 'Smack' }}>
            <span className=" text-[15px] uppercase text-[rgb(18,18,18)] dark:text-red-500">
              {name
                ? name
                : ''}
            </span>
            <span className=" text-[15px] first-letter:uppercase lowercase text-[rgb(18,18,18)] dark:text-white">
              {address.slice(0,4) + '...' + address.slice(address.length - 5, address.length - 1)}
            </span>
          </div>
        }
      </div>
    </div>
  );
}

export default PolkadotWalletButton;
