import * as gamesService from '../services/games.service.js'

export async function getAllGames(req, res) {
  try {
    const games = await gamesService.getAllGames()
    res.json(games)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getGameById(req, res) {
  try {
    const game = await gamesService.getGameById(req.params.id)
    if (!game) return res.status(404).json({ error: 'Game not found' })
    res.json(game)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createGame(req, res) {
  try {
    const newGame = await gamesService.createGame(req.body)
    res.status(201).json(newGame)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updateGame(req, res) {
  try {
    const updated = await gamesService.updateGame(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Game not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function deleteGame(req, res) {
  try {
    const deleted = await gamesService.deleteGame(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Game not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
