import fs from 'fs';
import { BrowserWindow, dialog } from 'electron';
import { menuState } from './menu';
import { CHANNEL_FETCH_CODE_TO_SAVE, CHANNEL_OPEN_FILE, CHANNEL_SET_CODEMAP } from './main-channels';

/**
 * menu-trigger.ts
 * Here is used to define the window menu trigger.
 * Mainly for the processing of click events
 * 
 * Author: Yuteng Zhang   
 */


/**
 * Open file action triggered by menu.
 * @param window Allows the dialog to attach itself to a parent window, making it modal.
 */
export const menuTriggeredOpenFile = (window: BrowserWindow) => {
  dialog
    .showOpenDialog(window, {
      title: 'Open File',
      filters: [
        { name: 'JavaScript File', extensions: ['js'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    })
    .then((data) => {
      fs.readFile(data.filePaths[0], 'utf-8', (_err, data) => {
        window.webContents.send(CHANNEL_OPEN_FILE, data);
      });
    })
    .catch((err) => {
      dialog.showMessageBox(window, {
        title: 'Failed to Open File',
        message: err.message,
      });
    });
};

/**
 * New file action triggered by menu.
 * @param window Allows the dialog to attach itself to a parent window, making it modal.
 */
export const menuTriggeredNewFile = (_window: BrowserWindow) => {};

/**
 * Save file action triggered by menu.
 * @param window Allows the dialog to attach itself to a parent window, making it modal.
 */
export const menuTriggeredSaveFile = (window: BrowserWindow) => {
  window.webContents.send(CHANNEL_FETCH_CODE_TO_SAVE);
};

/**
 * Set codemap action triggered by menu.
 * @param window Allows the dialog to attach itself to a parent window, making it modal.
 */
export const menuTriggeredSetCodemap = (window: BrowserWindow) => {
  menuState.checkedCodeMap = !menuState.checkedCodeMap;
  window.webContents.send(CHANNEL_SET_CODEMAP, menuState.checkedCodeMap);
};

export const menuTriggeredEditorCopy = (_window: BrowserWindow) => {
  console.log('tirgle copy')
};
