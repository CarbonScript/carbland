import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';
import { menuState } from './menu';

/**
 * Open file action triggered by menu.
 * @param window Allows the dialog to attach itself to a parent window, making it modal.
 */
export const menuTriggeredOpenFile = (window: BrowserWindow) => {
  dialog
    .showOpenDialog(window, {
      title: 'Open File',
      buttonLabel: 'Open',
      filters: [
        { name: 'JavaScript File', extensions: ['js'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    })
    .then((data) => {
      fs.readFile(data.filePaths[0], 'utf-8', (_err, data) => {
        window.webContents.send('open-file', data);
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
  window.webContents.send('fetch-editor');
};

/**
 * Set codemap action triggered by menu.
 * @param window Allows the dialog to attach itself to a parent window, making it modal.
 */
export const menuTriggeredSetCodemap = (window: BrowserWindow) => {
  menuState.checkedCodeMap = menuState.checkedCodeMap;
  console.log(menuState.checkedCodeMap);
  window.webContents.send('set-codemap', menuState.checkedCodeMap);
};

export const menuTriggeredEditorCopy = (_window: BrowserWindow) => {
  console.log('tirgle copy')
};
