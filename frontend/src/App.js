import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import React from "react";
import FrontPage from "./components/frontPage";
import Dashboard from "./components/dashboard";
import BountyRequest from "./components/main/bountyRequest";
import ReviewRequestProjects from "./components/main/reviewRequest";
import MyProjects from "./components/main/myProjects";
import NewIdea from "./components/main/newIdea";
import ProjectCpn from "./components/main/project/projectCpn";
import ProfilePage from "./components/profilePage";
import EditProfilePage from "./components/profilePage/editProfilePage";
import LoginPage from "./components/auth/loginPage";
import SignupPage from "./components/auth/signupPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "@rainbow-me/rainbowkit/styles.css";
import { useDispatch } from "react-redux";
import { tokenLogin } from "./redux/actions/usersAction";
import Devs from "./components/main/devs";
import AllUsers from "./components/main/users";
import Pms from "./components/main/pms";

import Header from "./components/header";
import Nav from "./components/navbar";

import axios from "axios";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

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
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      try {
        dispatch(tokenLogin());
      } catch (e) {
        window.location.href = "/login";
      }
    } else {
      // window.location.href = "/login";
    }
    window.addEventListener("load", handleLoad);
    const rects = document.getElementsByTagName("rect");
    Array.from(rects).forEach((a) => {
      // a.setAttribute('fill', '#ffffff00')
    });
    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      <NotificationContainer />

      <ReactAudioPlayer
        src="/audio/mix.mp3"
        autoPlay
        type="audio/mp3"
        title="audio"
      />

      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode theme={darkTheme()}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route>
                <Route path="/" element={<FrontPage />} />
                <Route path="*" element={<Layout />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;

const Layout = () => {
  const token = localStorage.getItem("token");
  if (token === null || token === "undefined") {
    window.location.href = "/login";
  }

  return (
    <div className="flex w-full dark:bg-[rgb(18,18,18)] bg-[rgb(249,250,251)]">
      <Nav />
      <Routes>
        <Route path="all-projects" element={<Dashboard />} />
        <Route path="bounty-request" element={<BountyRequest />} />
        <Route path="review-request" element={<ReviewRequestProjects />} />
        <Route path="my-projects" element={<MyProjects />} />
        <Route path="project/:id" element={<ProjectCpn />} />
        <Route path="new-ideas" element={<NewIdea />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="all-users" element={<AllUsers />} />
        <Route path="developers" element={<Devs />} />
        <Route path="project-managers" element={<Pms />} />
      </Routes>
    </div>
  );
};
