'use client';

import Image from "next/image";
import DarkModeButton from './ThemeSwitcher'
import PolkadotWalletButton from "./wallet-button/polkadot-wallet-button";
import MetamaskWalletButton from './wallet-button/metamask-wallet-button'
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  okxWallet,
  ledgerWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ALCHEMY_API_KEY, PROJECT_ID } from "../utils/env";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, sepolia, goerli],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY }), publicProvider()]
);
console.log(PROJECT_ID);

const projectId = PROJECT_ID;

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ projectId, chains }), // Metamask
      ...(projectId ? [walletConnectWallet({ projectId, chains })] : []),
      ...(projectId ? [trustWallet({ projectId, chains })] : []),
      // walletConnectWallet({ projectId, chains }),
      // trustWallet({ projectId, chains }),
      // Add more recommended wallets as needed
    ],
  },
  {
    groupName: "Other",
    wallets: [
      ...(projectId ? [rainbowWallet({ projectId, chains })] : []),
      ...(projectId ? [okxWallet({ projectId, chains })] : []),
      ...(projectId ? [ledgerWallet({ projectId, chains })] : []),

      // rainbowWallet({ projectId, chains }),
      // coinbaseWallet({ projectId, chains }),
      // okxWallet({ projectId, chains }),
      // ledgerWallet({ projectId, chains }),
      // Add other wallets to the "Other" group
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function ImportModelPage() {
  return (
    <div className="w-full flex justify-center items-center">
      {/* <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode theme={darkTheme()}> */}
          <div className="w-full flex items-center justify-around font-mono text-sm">
            <div className="flex gap-3 justify-center items-center">
              <Image
                src="/commune.gif"
                alt="commune Logo"
                width={100}
                height={100}
                priority
              />
              <p className="fixed left-0 top-0 text-black dark:text-white flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:p-4 text-[35px]">
                Commune-Management
              </p>
            </div>

            <div className="flex items-center justify-center">
              {/* <div className="flex justify-center items-center gap-[20px] mr-[20px]">
                <div>
                  <PolkadotWalletButton />
                </div>
                <div>
                  <MetamaskWalletButton />
                </div>
              </div> */}
              <div className="flex justify-center items-center">
                <DarkModeButton />
              </div>
            </div>
          </div>
        {/* </RainbowKitProvider> */}
      {/* </WagmiConfig > */}
    </div>
  );
}
