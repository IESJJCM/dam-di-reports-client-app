import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ReportsProvider } from './context/reports.context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReportsProvider>
      <App />
    </ReportsProvider>
  </StrictMode>,
);
