import { ElectronAPI } from '@electron-toolkit/preload'
import type { BridgeApi } from '../../shared'

declare global {
  interface Window {
    electron: ElectronAPI
    api: BridgeApi
  }
}
