import assert from 'node:assert/strict'
import test from 'node:test'
import { createApp } from '../src/app.js'

function createServerUrl(port: number) {
  return `http://127.0.0.1:${port}`
}

test('GET /api/health returns ok when database is available', async () => {
  const app = createApp({ checkDatabaseConnection: async () => true })
  const server = app.listen(0)

  try {
    const address = server.address()
    if (!address || typeof address === 'string') {
      throw new Error('Could not determine test server port')
    }

    const response = await fetch(`${createServerUrl(address.port)}/api/health`)
    const payload = (await response.json()) as {
      status: string
      databaseConnected: boolean
    }

    assert.equal(response.status, 200)
    assert.equal(payload.status, 'ok')
    assert.equal(payload.databaseConnected, true)
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }
})

test('GET / returns API status message', async () => {
  const app = createApp({ checkDatabaseConnection: async () => true })
  const server = app.listen(0)

  try {
    const address = server.address()
    if (!address || typeof address === 'string') {
      throw new Error('Could not determine test server port')
    }

    const response = await fetch(`${createServerUrl(address.port)}/`)
    const payload = (await response.json()) as { message: string }

    assert.equal(response.status, 200)
    assert.equal(payload.message, 'House cleaning booking API is running.')
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }
})