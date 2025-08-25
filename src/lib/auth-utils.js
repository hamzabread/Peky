import { API_URL } from "./config"

/**
 * Read access token from localStorage
 */
export const getAccessToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("access_token")
}

/**
 * Read refresh token from localStorage
 */
export const getRefreshToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("refresh_token")
}

/**
 * Clear all tokens
 */
export const logout = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem("access_token")
  localStorage.removeItem("id_token")
  localStorage.removeItem("refresh_token")
}

/**
 * Refresh the access token using the refresh token
 */
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error("No refresh token available")
  }

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Token refresh failed")
    }

    // ✅ store new tokens
    if (result.tokens?.access_token) {
      localStorage.setItem("access_token", result.tokens.access_token)
    }
    if (result.tokens?.id_token) {
      localStorage.setItem("id_token", result.tokens.id_token)
    }

    return result.tokens.access_token
  } catch (error) {
    console.error("Token refresh error:", error)
    throw error
  }
}

/**
 * Authenticated fetch wrapper
 */
export const authenticatedFetch = async (url, options = {}) => {
  let accessToken = getAccessToken()
  if (!accessToken) throw new Error("Not authenticated")

  const buildOptions = (token) => ({
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      ...(options.body && !(options.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
    },
    body:
      options.body && !(options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : options.body,
  })

  let response = await fetch(url, buildOptions(accessToken))

  if (response.status === 401) {
    try {
      console.log("Access token expired, refreshing…")
      accessToken = await refreshAccessToken()
      response = await fetch(url, buildOptions(accessToken))
    } catch (err) {
      console.error("Refresh failed:", err)
      throw err
    }
  }

  return response
}
