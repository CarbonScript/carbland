import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';

export const menuTriggedOpenFile = (window: BrowserWindow) => {
  dialog
    .showOpenDialog(window, {
      title: 'Save',
      buttonLabel: 'Open',
      filters: [
        { name: 'JavaScript File', extensions: ['js'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    })
    .then((data) => {
      console.log(data.filePaths[0]);
      fs.readFile(data.filePaths[0], 'utf-8', (_err, data) => {
        window.webContents.send('open-file', data);
      });
    });
};

export const menuTriggedNewFile = (_window: BrowserWindow) => {};

export const menuTriggedSaveFile = (window: BrowserWindow) => {
    window.webContents.send('fetch-editor');
};
