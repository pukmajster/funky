import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron'
import * as path from 'path'
import { join } from 'path'
import {
  AppMeta,
  CreateVpkOptions,
  ExportVpkOptions,
  RequestGameManifestParams,
  UninstallAddonsParams,
  User,
  WriteAddonlistParams,
  ReadAddonlistParams
} from 'shared'
import icon from '../../resources/icon.png?asset'
import { writeAddonList, readAddonList } from './addonlist'
import { requestGameManifest } from './manifest'
import {
  openDirectory,
  openFileInFileManager,
  openWorkingDirectory,
  readUserFile,
  writeUserFile
} from './user'
import { createVpk, extractVpk, uninstallAddons } from './vpk'
import { requestGameManifestExperimental } from './manifest2'

const appMeta: AppMeta = {
  version: app.getVersion()
}

ipcMain.handle('requestGameManifest', async (_e, params: RequestGameManifestParams) =>
  requestGameManifest(params)
)

ipcMain.handle('requestGameManifestExperimental', async (_e, params: RequestGameManifestParams) =>
  requestGameManifestExperimental(params)
)

ipcMain.handle('addonlist:write', async (_e, params: WriteAddonlistParams) => {
  return writeAddonList(params)
})
ipcMain.handle('addonlist:read', async (_e, params: ReadAddonlistParams) => {
  return await readAddonList(params)
})

ipcMain.handle('profile:write', async (_e, profileData: User) => writeUserFile(profileData))
ipcMain.handle('profile:read', async () => readUserFile())

ipcMain.handle('external:openLinkInBrowser', async (__e, url: string) => shell.openExternal(url))
ipcMain.handle('openDirectory', (_e, directory: string) => openDirectory(directory))
ipcMain.handle('openFileInFileManager', (_e, path: string) => openFileInFileManager(path))
ipcMain.handle('profile:openWorkingDirectory', async (_e) => openWorkingDirectory())

ipcMain.handle('getPath', () => app.getPath('appData'))
ipcMain.handle('getPathJoin', (_e, file: string) => path.join(app.getPath('appData'), file))

ipcMain.handle('vpk:extractVpk', (_e, options: ExportVpkOptions) => extractVpk(options))
ipcMain.handle('vpk:uninstall', (_e, options: UninstallAddonsParams) => uninstallAddons(options))
ipcMain.handle('vpk:pack', (_e, options: CreateVpkOptions) => createVpk(options))

ipcMain.handle('app:meta', (_e) => appMeta)

let firstPassFinished = false
let mainWindow: BrowserWindow | null = null
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 670,
    minWidth: 1024,
    minHeight: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false, // keep     two    !
      contextIsolation: true, //    these   true
      allowRunningInsecureContent: false,
      webSecurity: app.isPackaged
    }
  })

  mainWindow.on('ready-to-show', () => {
    !!mainWindow && mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (!firstPassFinished) {
    // Handle for directory dialog
    ipcMain.handle('dialog:openDirectory', async () => {
      if (!mainWindow) return

      const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
      })
      if (canceled) {
        return
      } else {
        return filePaths[0]
      }
    })

    firstPassFinished = true
  }

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  //buildManifestForGame()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Focus on the main instance if possible
app.on('second-instance', () => {
  if (mainWindow) {
    // Focus on the main window if the user tried to open another
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
