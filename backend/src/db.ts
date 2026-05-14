import { Pool } from 'pg'
import { env } from './config/env.js'

export const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  max: 10,
})

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const client = await pool.connect()
    client.release()
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}
