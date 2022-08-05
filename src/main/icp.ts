import { dialog, ipcMain } from 'electron';
import fs from 'fs';
import { CHANNEL_ICP_EXAMPLE, CHANNEL_SAVE_FILE } from './main-channels';
import { mainWindow } from './main';

/**
 * The listener used to register the icp main process.
 * Note that this function can only be called when the app is ready to start and only once.
 * Otherwise, it will cause repeated listening.
 *
 * @export
 */
export function RegistryICPListener() {
  ipcMain.on(CHANNEL_ICP_EXAMPLE, async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply(CHANNEL_ICP_EXAMPLE, msgTemplate('pong'));
  });

  /**
   * Listening the channel of the saving file.
   */
  ipcMain.on(CHANNEL_SAVE_FILE, (_event, code: string) => {
    dialog
      .showSaveDialog(mainWindow!, {
        title: 'Save your file',
        filters: [
          { name: 'TypeScript File', extensions: ['ts'] },
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
}
