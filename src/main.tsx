import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import init from './init.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);
const app = await init();
root.render(
  <StrictMode>
    {app}
  </StrictMode>,
);


