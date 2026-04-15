import * as recommendationsService from '../services/recommendations.service.js'

export async function getAllRecommendations(req, res) {
  try {
    const recommendations = await recommendationsService.getAllRecommendations()
    res.json(recommendations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getRecommendationById(req, res) {
  try {
    const recommendation = await recommendationsService.getRecommendationById(req.params.id)
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found' })
    res.json(recommendation)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createRecommendation(req, res) {
  try {
    const newRecommendation = await recommendationsService.createRecommendation(req.body)
    res.status(201).json(newRecommendation)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updateRecommendation(req, res) {
  try {
    const updated = await recommendationsService.updateRecommendation(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Recommendation not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function deleteRecommendation(req, res) {
  try {
    const deleted = await recommendationsService.deleteRecommendation(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Recommendation not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
