import {
  app,
  BrowserWindow,
  dialog,
  Menu,
  MenuItemConstructorOptions,
  shell,
} from 'electron';
import { menuTriggeredOpenFile, menuTriggeredSaveFile } from './menuTriggers';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

interface MenuState {
  enableSave: boolean;
  checkedCodeMap: boolean;
}

export const menuState: MenuState = {
  checkedCodeMap: true,
  enableSave: true,
};

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu(): Menu {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();
    // @ts-ignore
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment(): void {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate(): MenuItemConstructorOptions[] {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'Electron',
      submenu: [
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:',
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          },
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          },
        },
      ],
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://electronjs.org');
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/electron/electron/tree/main/docs#readme'
            );
          },
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://www.electronjs.org/community');
          },
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/electron/electron/issues');
          },
        },
      ],
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open Project',
            accelerator: 'Ctrl+O',
            click: () => {
              menuTriggeredOpenFile(this.mainWindow);
            },
          },
          {
            label: '&New Project',
            accelerator: 'Ctrl+N',
          },
          {
            type: 'separator',
          },
          {
            label: 'Save Project',
            accelerator: 'Ctrl+S',
            click: () => {
              menuTriggeredSaveFile(this.mainWindow);
            },
          },
          {
            label: 'Save As',
            accelerator: 'Ctrl+Shift+S',
          },
          {
            type: 'separator',
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+Q',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '&Edit',
        submenu: [
          {
            label: '&Undo',
            accelerator: 'Ctrl+O',
          },
          {
            label: '&Redo',
            accelerator: 'Ctrl+O',
          },
          {
            type: 'separator',
          },
          {
            label: '&Copy',
            accelerator: 'Ctrl+C',
          },
          {
            label: '&Cut',
            accelerator: 'Ctrl+T',
          },
          {
            label: '&Paste',
            accelerator: 'Ctrl+V',
          },
          {
            type: 'separator',
          },
          {
            label: '&Find in File',
            accelerator: 'Ctrl+Shift+F',
          },
          {
            label: '&Replace in File',
            accelerator: 'Ctrl+Shift+R',
          },
          {
            type: 'separator',
          },
          {
            label: '&Turn to Comment',
            accelerator: 'Ctrl+/',
          },
        ],
      },
      {
        label: '&Run',
        submenu: [
          {
            label: '&Start',
            accelerator: 'Ctrl+O',
          },
          {
            label: '&Build',
            accelerator: 'Ctrl+W',
          },
        ],
      },
      {
        label: '&View',
        submenu: [
          {
            label: '&Code Map',
            accelerator: 'Ctrl+R',
            type: 'checkbox',
            checked: menuState.checkedCodeMap,
            click: () => {},
          },
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: () => {
              this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
            },
          },
        ],
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Github',
            click() {
              shell.openExternal('https://github.com/carbonscript/');
            },
          },
          {
            label: 'Documentation',
            click() {
              shell.openExternal('https://carbonscript.github.io');
            },
          },
          {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://github.com/carbonscript/');
            },
          },
          {
            label: 'About',
            click() {
              const message = `A cross-platform code editors and integrated development environments for carbon script. Based on some open source projects monaco-editor and vscode. This project is developed by Yuteng Zhang. And it can be used as Coursework

              Carbland Version: 1.0.0
              Complier Version: 0.2.0
              
              `;
              dialog.showMessageBox({
                title: 'About Carbland',
                message: message,
                buttons: ['Close'],
                type: 'info',
              });
            },
          },
        ],
      },
      process.env.NODE_ENV === 'development'
        ? {
            label: '&_Development',
            submenu: [
              {
                label: '&Reload',
                accelerator: 'Ctrl+R',
                click: () => {
                  this.mainWindow.webContents.reload();
                },
              },
              {
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click: () => {
                  this.mainWindow.setFullScreen(
                    !this.mainWindow.isFullScreen()
                  );
                },
              },
              {
                label: 'Toggle &Developer Tools',
                accelerator: 'Alt+Ctrl+I',
                click: () => {
                  this.mainWindow.webContents.toggleDevTools();
                },
              },
            ],
          }
        : undefined!,
    ];

    return templateDefault;
  }
}
