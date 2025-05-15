import { StrictMode } from 'react';                  // catch potential problems
import { createRoot } from 'react-dom/client';      // React 18 root API
import { BrowserRouter } from 'react-router-dom';   // routing support
import { ThemeProvider } from './components/shared/ThemeContext'; // theme context

import App from './App';    // main app component
import './index.css';       // global styles

const root = createRoot(document.getElementById('root')!); // attach React to DOM

root.render(
  <StrictMode>
    <BrowserRouter>         {/* enable client-side routing */}
      <ThemeProvider>       {/* wrap app in theme context */}
        <App />             {/* render app */}
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
