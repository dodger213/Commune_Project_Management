import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import React from "react";
import FrontPage from "./components/frontPage";
import Dashboard from "./components/dashboard";
import ProfilePage from "./components/profilePage";
import EditProfilePage from "./components/profilePage/editProfilePage"
import "bootstrap/dist/css/bootstrap.min.css";
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
  coinbaseWallet,
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
import ReactAudioPlayer from "react-audio-player";
import { ALCHEMY_API_KEY, PROJECT_ID } from "./utils/env";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, sepolia, goerli],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY }), publicProvider()]
);

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
      ...(projectId ? [coinbaseWallet({ projectId, chains })] : []),
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

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <ReactAudioPlayer
        src="/audio/mix.mp3"
        autoPlay
        type="audio/mp3"
        title="audio"
      />

      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode theme={darkTheme()}>
          <BrowserRouter>
            <Routes>
              <Route>
                <Route path="/" element={<FrontPage />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="profile/edit" element={<EditProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
