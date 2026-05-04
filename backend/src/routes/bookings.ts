import { Router } from 'express'
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { pool } from '../db.js'

export const bookingsRouter = Router()

bookingsRouter.get('/', async (_request, response, next) => {
  try {
    const [rows] = await pool.query(
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

    response.json({ data: rows })
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

  const connection = await pool.getConnection()

  try {
    await connection.beginTransaction()

    await connection.query(
      `INSERT INTO customers (full_name, phone, email)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE
         full_name = VALUES(full_name),
         email = VALUES(email),
         updated_at = CURRENT_TIMESTAMP`,
      [fullName, phone, email ?? null],
    )

    const [customerRows] = await connection.query<RowDataPacket[]>(
      'SELECT id FROM customers WHERE phone = ? LIMIT 1',
      [phone],
    )

    const customerId = (customerRows[0] as RowDataPacket & { id?: number } | undefined)?.id
    if (!customerId) {
      throw new Error('Unable to resolve customer after insert.')
    }

    const [serviceRows] = await connection.query<RowDataPacket[]>(
      'SELECT base_price FROM service_packages WHERE id = ? AND is_active = 1 LIMIT 1',
      [servicePackageId],
    )

    if (serviceRows.length === 0) {
      response.status(400).json({ message: 'Service package not found.' })
      await connection.rollback()
      return
    }

    const totalPrice = Number((serviceRows[0] as RowDataPacket & { base_price?: string }).base_price)

    const [bookingResult] = await connection.query<ResultSetHeader>(
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`
      ,
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

    await connection.commit()

    response.status(201).json({
      message: 'Booking created successfully.',
      data: bookingResult,
    })
  } catch (error) {
    await connection.rollback()
    next(error)
  } finally {
    connection.release()
  }
})
