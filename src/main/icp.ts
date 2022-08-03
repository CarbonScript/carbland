import { ipcMain } from 'electron';
import { CodeEditorState } from 'renderer/slice/CodeEditorSlice';

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('give-editor', (_event, args: CodeEditorState) => {
  console.log('rec:', args);
});
