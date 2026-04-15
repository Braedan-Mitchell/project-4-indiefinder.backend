const API_BASE_URL = '/api'

export const apiRoutes = {
  games: '/games',
  contacts: '/contacts',
  recommendations: '/recommendations',
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`)
  }

  // DELETE returns 204 with no body
  if (response.status === 204) return null

  return response.json()
}

export function createContact(payload) {
  return apiRequest(apiRoutes.contacts, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function createRecommendation(payload) {
  // Translate camelCase from the form to snake_case for the database
  const normalized = {
    recommender_name: payload.recommenderName,
    game_title: payload.gameTitle,
    game_desc: payload.gameDesc,
    found_on: payload.foundOn,
  }
  return apiRequest(apiRoutes.recommendations, {
    method: 'POST',
    body: JSON.stringify(normalized),
  })
}

export function formatRecommendationReviewLog(recommendation) {
  // Handle both snake_case (from API) and camelCase (legacy)
  const name = recommendation.recommender_name || recommendation.recommenderName
  const title = recommendation.game_title || recommendation.gameTitle
  return `${name} recommended ${title}! it is in review`
}
