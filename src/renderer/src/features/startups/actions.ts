import { db, type CreateStartupPayload } from '../../db/db'

export function createStartup({ enabledModIds, playlistId }: CreateStartupPayload) {
  // Create a new startup entry in the database
  db.startups.add({ enabledModIds, playlistId, date: new Date() })
}
