import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react";

import { BrowserRouter } from 'react-router-dom';

import "./assets/styles/index.css";
import "./assets/styles/App.css"; // Assuming you have global CSS here

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Analytics />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
