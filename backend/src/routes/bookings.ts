import { Router } from 'express'
import { pool } from '../db.js'

export const bookingsRouter = Router()

bookingsRouter.get('/', async (_request, response, next) => {
  try {
    const result = await pool.query(
      `SELECT
        b.id,
        b.service_address,
        b.preferred_date,
        b.preferred_time,
        b.number_of_rooms,
        b.notes,
        b.status,
        b.total_price,
        b.created_at,
        c.full_name,
        c.phone,
        c.email,
        s.package_name
      FROM bookings b
      INNER JOIN customers c ON c.id = b.customer_id
      INNER JOIN service_packages s ON s.id = b.service_package_id
      ORDER BY b.created_at DESC`,
    )

    response.json({ data: result.rows })
  } catch (error) {
    next(error)
  }
})

bookingsRouter.post('/', async (request, response, next) => {
  const {
    fullName,
    phone,
    email,
    servicePackageId,
    serviceAddress,
    preferredDate,
    preferredTime,
    numberOfRooms,
    notes,
  } = request.body as {
    fullName?: string
    phone?: string
    email?: string
    servicePackageId?: number
    serviceAddress?: string
    preferredDate?: string
    preferredTime?: string
    numberOfRooms?: number
    notes?: string
  }

  if (!fullName || !phone || !servicePackageId || !serviceAddress || !preferredDate || !preferredTime) {
    response.status(400).json({ message: 'Missing required booking fields.' })
    return
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    await client.query(
      `INSERT INTO customers (full_name, phone, email)
       VALUES ($1, $2, $3)
       ON CONFLICT (phone) DO UPDATE SET
         full_name = $1,
         email = $3,
         updated_at = CURRENT_TIMESTAMP`,
      [fullName, phone, email ?? null],
    )

    const customerResult = await client.query(
      'SELECT id FROM customers WHERE phone = $1 LIMIT 1',
      [phone],
    )

    const customerId = customerResult.rows[0]?.id
    if (!customerId) {
      throw new Error('Unable to resolve customer after insert.')
    }

    const serviceResult = await client.query(
      'SELECT base_price FROM service_packages WHERE id = $1 AND is_active = 1 LIMIT 1',
      [servicePackageId],
    )

    if (serviceResult.rows.length === 0) {
      response.status(400).json({ message: 'Service package not found.' })
      await client.query('ROLLBACK')
      return
    }

    const totalPrice = Number(serviceResult.rows[0].base_price)

    const bookingResult = await client.query(
      `INSERT INTO bookings (
        customer_id,
        service_package_id,
        service_address,
        preferred_date,
        preferred_time,
        number_of_rooms,
        notes,
        status,
        total_price
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', $8)
      RETURNING *`,
      [
        customerId,
        servicePackageId,
        serviceAddress,
        preferredDate,
        preferredTime,
        numberOfRooms ?? 1,
        notes ?? null,
        totalPrice,
      ],
    )

    await client.query('COMMIT')

    response.status(201).json({
      message: 'Booking created successfully.',
      data: bookingResult.rows[0],
    })
  } catch (error) {
    await client.query('ROLLBACK')
    next(error)
  } finally {
    client.release()
  }
})
