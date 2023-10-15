const vpk2 = require('vpk2')
import { ExportVpkOptions } from 'shared'

export async function extractVpk({ vpkPath, extractPath }: ExportVpkOptions) {
  try {
    const targetVpk = new vpk2(vpkPath)
    targetVpk.load()
    await targetVpk.extract(extractPath)
  } catch (err) {
    console.error(err)
    throw new Error("Couldn't extract vpk")
  }
}
