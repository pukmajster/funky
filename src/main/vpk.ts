import { VPK } from 'vpk'
import { ExportVpkOptions } from 'shared'

export async function extractVpk({ vpkPath, extractPath }: ExportVpkOptions) {
  try {
    console.log(`Extracting ${vpkPath} to ${extractPath}`)

    const targetVpk = new VPK(vpkPath)
    targetVpk.load()
    await targetVpk.extract(extractPath)
  } catch (err) {
    console.error(err)
    throw new Error("Couldn't extract vpk")
  }
}
