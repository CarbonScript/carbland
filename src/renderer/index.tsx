import App from './App';
import { CHANNEL_ICP_EXAMPLE } from 'main/main-channels';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import '@arco-design/web-react/dist/css/arco.css';
import 'tailwindcss/tailwind.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once(CHANNEL_ICP_EXAMPLE, (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.send(CHANNEL_ICP_EXAMPLE, ['ping']);
