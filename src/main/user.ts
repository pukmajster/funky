import { app, shell } from 'electron'
import * as fs from 'fs'
import { User } from 'shared'
const path = require('path')

const PROFILE_PATH = path.join(app.getPath('userData'), 'user.json')

export async function readUserFile(): Promise<User | undefined> {
  try {
    const data = JSON.parse(await fs.promises.readFile(PROFILE_PATH, 'utf8'))
    console.log('successfully read profile')
    return data as User
  } catch (err) {
    throw new Error('ERROR READING PROFILE')
    return undefined
  }
}

export async function writeUserFile(data: User): Promise<void> {
  try {
    const stringified = JSON.stringify(data, null, 4)
    console.log('writing profile')

    await fs.promises.writeFile(PROFILE_PATH, stringified)
  } catch (err) {
    console.log('ERROR WRITING PROFILE', err)
  }
}

export async function openWorkingDirectory(): Promise<void> {
  try {
    await shell.openPath(app.getPath('userData'))
  } catch (err) {
    console.log('ERROR OPENING WORKING DIRECTORY', err)
  }
}

export async function openDirectory(directory: string): Promise<void> {
  try {
    await shell.openPath(directory)
  } catch (err) {
    console.log('ERROR OPENING DIRECTORY', err)
  }
}
