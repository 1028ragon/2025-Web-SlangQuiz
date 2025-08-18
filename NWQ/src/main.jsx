import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from './contexts/SettingsContext.jsx';
import BgmPlayer from './Screen/Setting/BgmPlayer.jsx';
import kerningCity from '/audio/kerning-city.mp3';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <BgmPlayer src={kerningCity}/>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SettingsProvider>
  </StrictMode>
)
