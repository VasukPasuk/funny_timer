
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {CssBaseline, StyledEngineProvider} from "@mui/material";

createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline/>
    <StyledEngineProvider injectFirst>

      <App />
    </StyledEngineProvider>
  </>
)
