import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { WhatsAppProvider } from './context/WhatsAppContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <WhatsAppProvider>
        <App />
      </WhatsAppProvider>
    </HelmetProvider>
  </StrictMode>,
);
