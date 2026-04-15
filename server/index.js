import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import gamesRouter from './src/routes/games.routes.js'
import recommendationsRouter from './src/routes/recommendations.routes.js'
import contactsRouter from './src/routes/contacts.routes.js'
import pool from './src/db/pool.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173'
app.use(cors({ origin: allowedOrigin }))
app.use(express.json())

// Health check — a quick way to verify the server is running
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'IndieFinder API is running' })
})

// Routes
app.use('/games', gamesRouter)
app.use('/recommendations', recommendationsRouter)
app.use('/contacts', contactsRouter)

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  try {
    await pool.query('SELECT 1')
    console.log('Database connected successfully')
  } catch (err) {
    console.error('Database connection failed:', err.message)
  }
})
