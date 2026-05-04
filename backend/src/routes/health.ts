import { Router } from 'express'
import { checkDatabaseConnection } from '../db.js'

export function createHealthRouter(
  checkConnection: () => Promise<boolean>,
) {
  const router = Router()

  router.get('/', async (_request, response) => {
    const databaseConnected = await checkConnection()

    response.status(databaseConnected ? 200 : 503).json({
      status: databaseConnected ? 'ok' : 'degraded',
      databaseConnected,
      timestamp: new Date().toISOString(),
    })
  })

  return router
})

export const healthRouter = createHealthRouter(checkDatabaseConnection)
