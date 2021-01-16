/*eslint-env node */

import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';

app.on('ready', async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '/preload.js'),
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // #!if ENV === 'development'
    mainWindow.webContents.openDevTools();
    // #!endif
  });

  // #!if ENV === 'development'
  // @ts-expect-error  Re-defining variable because one of them will removed on compile.
  const url = 'http://localhost:9000';
  // #!else
  // @ts-expect-error  Re-defining variable because one of them will removed on compile.
  const url = path.join(__dirname, 'index.html');
  // #!endif

  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
});

// #!if ENV === 'development'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
app.on('ready', () => {
  installExtension([REACT_DEVELOPER_TOOLS])
    .then((name: any) => console.log(`Added Extension: ${name}`))
    .catch((err: any) => console.log('An error occurred: ', err));
});
// #!endif

app.on('window-all-closed', app.quit);

ipcMain.handle('alert', async (event, { title, message }) => {
  dialog.showMessageBox({
    type: 'info',
    title,
    message,
  });
});
