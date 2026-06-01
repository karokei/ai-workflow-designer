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

// ─── Register PWA Service Worker ───
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('[PWA] Service Worker registered:', reg.scope);
      })
      .catch((err) => {
        console.warn('[PWA] Service Worker registration failed:', err);
      });
  });
}
