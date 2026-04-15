import pool from '../db/pool.js'

export async function getAllContacts() {
  const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC')
  return result.rows
}

export async function getContactById(id) {
  const result = await pool.query('SELECT * FROM contacts WHERE id = $1', [id])
  return result.rows[0] || null
}

export async function createContact(data) {
  const { name, email, title, message } = data
  const result = await pool.query(
    `INSERT INTO contacts (name, email, title, message)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, title, message]
  )
  return result.rows[0]
}

export async function deleteContact(id) {
  const result = await pool.query(
    'DELETE FROM contacts WHERE id = $1 RETURNING id',
    [id]
  )
  return result.rows[0] || null
}
