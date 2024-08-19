import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {CssBaseline, StyledEngineProvider} from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline/>
    <StyledEngineProvider injectFirst>
      <App />
      <ToastContainer/>
    </StyledEngineProvider>
  </>
)
