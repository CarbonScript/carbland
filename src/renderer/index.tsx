import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import '@arco-design/web-react/dist/css/arco.css';
import 'tailwindcss/tailwind.css';
import { RendererChannels } from './renderer-channels';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once(RendererChannels.ICP_EXAMPLE, (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.send(RendererChannels.ICP_EXAMPLE, ['ping']);
