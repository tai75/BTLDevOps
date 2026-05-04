import { Router } from 'express'
import { pool } from '../db.js'

export const servicesRouter = Router()

servicesRouter.get('/', async (_request, response, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, package_name, description, duration_minutes, base_price, is_active FROM service_packages WHERE is_active = 1 ORDER BY id ASC',
    )

    response.json({ data: rows })
  } catch (error) {
    next(error)
  }
})
