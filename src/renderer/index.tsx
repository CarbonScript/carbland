import { createRoot } from 'react-dom/client';
import App from './App';
import "@arco-design/web-react/dist/css/arco.css";
import {store} from './store';
import { Provider } from 'react-redux';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Provider store={store}><App /></Provider>);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
