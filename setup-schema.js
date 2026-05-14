#!/usr/bin/env node

import fs from 'fs'
import { Pool } from 'pg'

const connectionString = process.argv[2]
const schemaFile = process.argv[3] || './postgres-schema.sql'

if (!connectionString) {
  console.error('❌ Lỗi: Cần cung cấp DATABASE_URL')
  console.error('Cách sử dụng: node setup-schema.js <DATABASE_URL> [schema-file]')
  process.exit(1)
}

if (!fs.existsSync(schemaFile)) {
  console.error(`❌ Lỗi: File ${schemaFile} không tìm thấy`)
  process.exit(1)
}

console.log('🚀 Bắt đầu chạy schema...')
console.log(`📁 Schema file: ${schemaFile}`)
console.log(`🔌 Database: ${connectionString.replace(/:[^@]*@/, ':***@')}`)
console.log('')

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

async function runSchema() {
  const client = await pool.connect()
  try {
    const schema = fs.readFileSync(schemaFile, 'utf-8')
    
    console.log('⏳ Đang chạy schema...')
    await client.query(schema)
    
    console.log('✅ Schema chạy thành công!')
    console.log('')
    
    // Verify tables
    console.log('📋 Kiểm tra tables:')
    const result = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `)
    
    result.rows.forEach(row => {
      console.log(`  ✓ ${row.tablename}`)
    })
    
  } catch (error) {
    console.error('❌ Lỗi khi chạy schema:')
    console.error(error.message)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

runSchema()
