import pool from '../db/pool.js'

export async function getAllGames() {
  const result = await pool.query('SELECT * FROM games ORDER BY id ASC')
  return result.rows
}

export async function getGameById(id) {
  const result = await pool.query('SELECT * FROM games WHERE id = $1', [id])
  return result.rows[0] || null
}

export async function createGame(data) {
  const { image, title, price, genre, date, console: consoleList, rating } = data
  const result = await pool.query(
    `INSERT INTO games (image, title, price, genre, date, console, rating)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [image, title, price, genre, date, consoleList, rating]
  )
  return result.rows[0]
}

export async function updateGame(id, data) {
  const { image, title, price, genre, date, console: consoleList, rating } = data
  const result = await pool.query(
    `UPDATE games
     SET image=$1, title=$2, price=$3, genre=$4, date=$5, console=$6, rating=$7
     WHERE id=$8
     RETURNING *`,
    [image, title, price, genre, date, consoleList, rating, id]
  )
  return result.rows[0] || null
}

export async function deleteGame(id) {
  const result = await pool.query(
    'DELETE FROM games WHERE id = $1 RETURNING id',
    [id]
  )
  return result.rows[0] || null
}
