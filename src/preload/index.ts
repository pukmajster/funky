import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer, shell } from 'electron'
import {
  BridgeApi,
  RequestGameManifestParams,
  User,
  WriteAddonlistParams,
  ReadAddonlistParams,
  ExportVpkOptions,
  UninstallAddonsParams,
  CreateVpkOptions
} from 'shared'

// Custom APIs for renderer
const api: BridgeApi = {
  requestGameManifest: (params: RequestGameManifestParams) =>
    ipcRenderer.invoke('requestGameManifest', params),
  writeAddonList: (params: WriteAddonlistParams) => ipcRenderer.invoke('addonlist:write', params),
  readAddonList: (params: ReadAddonlistParams) => ipcRenderer.invoke('addonlist:read', params),
  openLinkInBrowser: (url: string) => openLinkInBrowser(url),
  writeUserFile: (profileData: User) => ipcRenderer.invoke('profile:write', profileData),
  readUserFile: () => ipcRenderer.invoke('profile:read'),
  openDirectoryFinder: () => ipcRenderer.invoke('openDirectory'),
  openWorkingDirectory: () => ipcRenderer.invoke('profile:openWorkingDirectory'),
  openFileInFileManager: (path: string) => ipcRenderer.invoke('openFileInFileManager', path),
  openDirectory: (directory: string) => ipcRenderer.invoke('openDirectory', directory),
  getPath: () => ipcRenderer.invoke('getPath'),
  getPathJoin: (file: string) => ipcRenderer.invoke('getPathJoin', file),
  extractVpk: (params: ExportVpkOptions) => ipcRenderer.invoke('vpk:extractVpk', params),
  uninstallAddons: (params: UninstallAddonsParams) => ipcRenderer.invoke('vpk:uninstall', params),
  createVpk: (params: CreateVpkOptions) => ipcRenderer.invoke('vpk:pack', params),
  appMeta: () => ipcRenderer.invoke('app:meta')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

function openLinkInBrowser(url: string): void {
  console.log(' ------------ ' + url + ' ------------------')
  shell.openExternal(url)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
try {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
