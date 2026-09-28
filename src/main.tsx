import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { SettingsProvider } from './context/SettingsContext.tsx';
import { WeatherLocationProvider } from './context/WeatherLocationContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <WeatherLocationProvider>
        <App />
      </WeatherLocationProvider>
    </SettingsProvider>
  </StrictMode>,
);
