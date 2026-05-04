import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { checkDatabaseConnection } from './db.js'
import { bookingsRouter } from './routes/bookings.js'
import { createHealthRouter } from './routes/health.js'
import { servicesRouter } from './routes/services.js'

type AppDependencies = {
  checkDatabaseConnection?: () => Promise<boolean>
}

export function createApp(dependencies: AppDependencies = {}) {
  const app = express()
  const checkConnection = dependencies.checkDatabaseConnection ?? checkDatabaseConnection

  app.use(cors({ origin: env.corsOrigin }))
  app.use(express.json())

  app.get('/', (_request, response) => {
    response.json({ message: 'House cleaning booking API is running.' })
  })

  app.use('/api/health', createHealthRouter(checkConnection))
  app.use('/api/services', servicesRouter)
  app.use('/api/bookings', bookingsRouter)

  app.use((error: unknown, _request: express.Request, response: express.Response) => {
    console.error('Unhandled API error:', error)
    response.status(500).json({ message: 'Internal server error.' })
  })

  return app
}
