/*eslint-env node */

import {app, BrowserWindow, ipcMain, dialog} from 'electron'
import * as path from 'path'

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
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    // #!if ENV === 'development'
    mainWindow.webContents.openDevTools()
    // #!endif
  })

  // #!if ENV === 'development'
  // @ts-ignore
  const url = 'http://localhost:9000'
  // #!else
  // @ts-ignore
  const url = path.join(__dirname, 'index.html')
  // #!endif

  mainWindow.setMenu(null)
  mainWindow.loadURL(url)
})

app.on('ready', () => {
  // #!if ENV === 'development'
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
  } = require('electron-devtools-installer')
  installExtension([REACT_DEVELOPER_TOOLS])
    .then((name: any) => console.log(`Added Extension: ${name}`))
    .catch((err: any) => console.log('An error occurred: ', err))
  // #!endif
})

app.on('window-all-closed', app.quit)

ipcMain.handle('alert', async (event, {title, message}) => {
  dialog.showMessageBox({
    type: 'info',
    title,
    message,
  })
})
