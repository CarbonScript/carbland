import { dialog, ipcMain } from 'electron';
import fs from 'fs';
import { MainChannels } from './channels-main';
import { mainWindow } from './main';

/**
 * The listener used to register the icp main process.
 * Note that this function can only be called when the app is ready to start and only once.
 * Otherwise, it will cause repeated listening.
 *
 * @export
 */
export function RegistryICPListener() {

  /** 
   * Listen to the channel for work test.
   */  
  ipcMain.on(MainChannels.ICP_EXAMPLE, async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply(MainChannels.ICP_EXAMPLE, msgTemplate('pong'));
  });

  /**
   * Listen to the channel of the saving file.
   */
  ipcMain.on(MainChannels.SAVE_FILE, (_event, code: string) => {
    dialog
      .showSaveDialog(mainWindow!, {
        title: 'Save your file',
        filters: [
          { name: 'plain-text', extensions: ['txt'] },
          { name: 'All Files', extensions: ['*'] },
        ],
      })
      .then((result) => {
        if (!result.canceled) {
          fs.writeFileSync(result.filePath!, code);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  /**
   * Listen to the command to write the file,
   * and after getting the command,
   * write the file to the specified path
   */
  ipcMain.on(
    MainChannels.WRITE_IN_FILE,
    (_event, code: string, path: string) => {
      fs.writeFileSync(path, code);
    }
  );
}
