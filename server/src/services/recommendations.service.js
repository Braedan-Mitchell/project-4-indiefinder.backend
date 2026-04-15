import pool from '../db/pool.js'

export async function getAllRecommendations() {
  const result = await pool.query('SELECT * FROM recommendations ORDER BY id ASC')
  return result.rows
}

export async function getRecommendationById(id) {
  const result = await pool.query('SELECT * FROM recommendations WHERE id = $1', [id])
  return result.rows[0] || null
}

export async function createRecommendation(data) {
  const { recommender_name, game_title, game_desc, found_on } = data
  const result = await pool.query(
    `INSERT INTO recommendations (recommender_name, game_title, game_desc, found_on)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [recommender_name, game_title, game_desc, found_on]
  )
  return result.rows[0]
}

export async function updateRecommendation(id, data) {
  const { recommender_name, game_title, game_desc, found_on } = data
  const result = await pool.query(
    `UPDATE recommendations
     SET recommender_name=$1, game_title=$2, game_desc=$3, found_on=$4
     WHERE id=$5
     RETURNING *`,
    [recommender_name, game_title, game_desc, found_on, id]
  )
  return result.rows[0] || null
}

export async function deleteRecommendation(id) {
  const result = await pool.query(
    'DELETE FROM recommendations WHERE id = $1 RETURNING id',
    [id]
  )
  return result.rows[0] || null
}
