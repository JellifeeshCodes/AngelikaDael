import React from 'react';
import { AGENTS, ClippyProvider } from "@react95/clippy";
import { Amovie2, Inetcpl1313, Joy102, Wordpad, Mail } from "@react95/icons";

import Login from "./components/Login";
import WindowBar from "./components/WindowBar";
import DesktopIcon from "./components/DesktopIcon";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Game from "./components/Game";
import { useAuth } from "./store/auth";

// Correct relative import for Vite
import winLogo from './assets/logo.png'; 

function App() {
  const authenticated = useAuth((state) => state.authinicated);

  // Background styling for the Windows 95 desktop
  const desktopStyle: React.CSSProperties = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#098684",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={desktopStyle}>
      {/* Background Logo - Centered and behind everything */}
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
          opacity: 0.8,
          pointerEvents: "none" // Prevents interfering with clicks
        }}
      />

      {/* Conditionally render Login or Desktop */}
      {!authenticated ? (
        <Login />
      ) : (
        <ClippyProvider agentName={AGENTS.MERLIN}>
          {/* Main Desktop Area */}
          <div 
            style={{ 
              flex: 1, 
              padding: "20px", 
              display: "flex", 
              flexDirection: "column", 
              gap: "20px",
              zIndex: 1,
              position: "relative"
            }}
          >
            <DesktopIcon 
              icon={<Amovie2 variant="32x32_4" />} 
              name="Video"
            >
              <iframe
                width="420"
                height="315"
                src="https://www.youtube.com/embed/v4yk_eXNbjo"
                allowFullScreen
                title="Video Player"
              />
            </DesktopIcon>

            <DesktopIcon icon={<Inetcpl1313 variant="32x32_4"/>} name="Browser">
              <iframe 
                width={800} 
                height={500} 
                src="https://swisscows.com" 
                title="Browser"
              />
            </DesktopIcon>

            <DesktopIcon width={650} icon={<Wordpad variant="32x32_4"/>} name="Resume">
              <Resume/>
            </DesktopIcon>

            <DesktopIcon width={400} height={400} icon={<Joy102 variant="32x32_4"/>} name="Game">
              <Game/>
            </DesktopIcon>

            <DesktopIcon width={400} icon={<Mail variant="32x32_4"/>} name="Contact">
              <Contact/>
            </DesktopIcon>
          </div>
          
          {/* Windows Taskbar */}
          <WindowBar />
        </ClippyProvider>
      )}
    </div>
  );
}

export default App;
