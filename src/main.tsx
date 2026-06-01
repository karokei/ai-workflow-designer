import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MikaDialogProvider } from '@/hooks/useMikaDialog'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MikaDialogProvider>
      <App />
    </MikaDialogProvider>
  </StrictMode>,
)
