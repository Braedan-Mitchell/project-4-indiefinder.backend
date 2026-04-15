import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import gamesRouter from './src/routes/games.routes.js'
import pool from './src/db/pool.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check — a quick way to verify the server is running
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'IndieFinder API is running' })
})

// Routes
app.use('/games', gamesRouter)

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  try {
    await pool.query('SELECT 1')
    console.log('Database connected successfully')
  } catch (err) {
    console.error('Database connection failed:', err.message)
  }
})
