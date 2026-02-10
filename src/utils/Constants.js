// Backend base URL for API requests
// Uses VITE_API_URL from .env file
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';