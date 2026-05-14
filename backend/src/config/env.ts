import dotenv from 'dotenv'

dotenv.config()

function readString(...values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    if (value && value.trim()) {
      return value.trim()
    }
  }

  return undefined
}

function readNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function readCorsOrigin(): string {
  return readString(process.env.CORS_ORIGIN, process.env.CORS_ORIGINS) ?? 'http://localhost:5173'
}

export const env = {
  port: readNumber(readString(process.env.PORT, process.env.API_PORT), 4000),
  corsOrigin: readCorsOrigin(),
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: readNumber(process.env.DB_PORT, 5432),
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'house_cleaning_booking',
  },
}
