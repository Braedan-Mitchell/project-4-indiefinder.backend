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

  return response.json()
}
