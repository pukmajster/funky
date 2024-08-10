import type { BridgeApi } from './bridge'

export * from './addon'
export * from './addonlist'
export * from './bridge'
export * from './game'
export * from './games'
export * from './manifest'
export * from './user'
export * from './vpk'
export * from './vdf'

declare global {
  interface Window {
    api: BridgeApi
  }
}
