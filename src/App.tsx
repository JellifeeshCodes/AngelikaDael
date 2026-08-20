import React from 'react';
import { AGENTS, ClippyProvider } from "@react95/clippy";
import { Amovie2, Inetcpl1313, Joy102, Wordpad, Mail } from "@react95/icons";

import Login from "./components/Login";
import WindowBar from "./components/WindowBar";
import DesktopIcon from "./components/DesktopIcon";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Game from "./components/Game";
import ArtGallery from "./components/ArtGallery";
import { useAuth } from "./store/auth";

// Import local assets so Vite processes the correct paths for GitHub Pages
import winLogo from './assets/logo.png'; 
import artIcon from './assets/art.png'; // Make sure art.png is inside your src/assets folder

function App() {
  const authenticated = useAuth((state) => state.authenticated);

  return (
    <div 
      style={{ 
        width: "100vw", 
        height: "100vh", 
        backgroundColor: "#098684", 
        position: "relative", 
        overflow: "hidden" 
      }}
    >
      {/* Centered Windows 95 Background Logo */}
      <img 
        src={winLogo} 
        alt="Windows 95 Logo" 
        width={400} 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -70%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />

      {!authenticated ? (
        <Login />
      ) : (
        <ClippyProvider agentName={AGENTS.MERLIN}>
          <div 
            style={{ 
              padding: "20px", 
              display: "flex", 
              flexDirection: "column", 
              gap: "20px", 
              zIndex: 1, 
              position: "relative" 
            }}
          >
            <DesktopIcon icon={<Amovie2 variant="32x32_4" />} name="Video">
              <iframe 
                width="420" 
                height="315" 
                src="https://www.youtube.com/embed/v4yk_eXNbjo" 
                allowFullScreen 
                title="Video Player" 
              />
            </DesktopIcon>

            <DesktopIcon icon={<Inetcpl1313 variant="32x32_4" />} name="Browser">
              <iframe 
                width={800} 
                height={500} 
                src="https://duckduckgo.com" 
                title="Browser" 
              />
            </DesktopIcon>

            <DesktopIcon width={650} icon={<Wordpad variant="32x32_4" />} name="Resume">
              <Resume />
            </DesktopIcon>

<DesktopIcon 
  width={650} 
  icon={
    <img 
      src={`${import.meta.env.BASE_URL}art.png`} 
      alt="Art Gallery" 
      style={{ width: '32px', height: '32px', display: 'block' }} 
    />
  } 
  name="Art Gallery"
>
  <ArtGallery />
</DesktopIcon>

            <DesktopIcon width={400} height={400} icon={<Joy102 variant="32x32_4" />} name="Game">
              <Game />
            </DesktopIcon>

            <DesktopIcon width={400} icon={<Mail variant="32x32_4" />} name="Contact">
              <Contact />
            </DesktopIcon>
          </div>
          <WindowBar />
        </ClippyProvider>
      )}
    </div>
  );
}

export default App;
