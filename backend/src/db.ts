import mysql from 'mysql2/promise'
import { env } from './config/env.js'

export const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
})

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection()
    connection.release()
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}
