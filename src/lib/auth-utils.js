// auth-utils.js - Utility functions for handling authentication tokens
import { API_URL } from "./config"

/**
 * Get the stored access token
 */
export const getAccessToken = () => {
    return localStorage.getItem('access_token')
}

/**
 * Get the stored refresh token
 */
export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token')
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    return !!getAccessToken()
}

/**
 * Clear all authentication data
 */
export const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('user-info')
    // Optionally keep email for convenience
    // localStorage.removeItem('userEmail')
}

/**
 * Refresh the access token using the refresh token
 */
export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken()
    
    if (!refreshToken) {
        throw new Error('No refresh token available')
    }

    try {
        const response = await fetch(`${API_URL}/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: refreshToken
            })
        })

        if (!response.ok) {
            throw new Error('Token refresh failed')
        }

        const result = await response.json()
        
        // Store new access token
        if (result.access_token) {
            localStorage.setItem('access_token', result.access_token)
            return result.access_token
        }
        
        throw new Error('No access token in refresh response')
    } catch (error) {
        console.error('Token refresh error:', error)
        // If refresh fails, user needs to login again
        logout()
        throw error
    }
}

/**
 * Make an authenticated API request
 * Automatically includes the access token and handles token refresh if needed
 */
export const authenticatedFetch = async (url, options = {}) => {
    let accessToken = getAccessToken()
    
    if (!accessToken) {
        throw new Error('Not authenticated')
    }

    // First attempt with current token
    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })

    // If token expired (401), try to refresh
    if (response.status === 401) {
        try {
            console.log('Access token expired, attempting refresh...')
            accessToken = await refreshAccessToken()
            
            // Retry request with new token
            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
        } catch (refreshError) {
            // Refresh failed, redirect to login
            window.location.href = '/login'
            throw refreshError
        }
    }

    return response
}

/**
 * Decode JWT token to get user information
 * Note: This only decodes the token, it doesn't verify the signature
 */
export const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )
        return JSON.parse(jsonPayload)
    } catch (error) {
        console.error('Error decoding token:', error)
        return null
    }
}

/**
 * Get user information from ID token
 */
export const getUserInfo = () => {
    const idToken = localStorage.getItem('id_token')
    if (idToken) {
        return decodeToken(idToken)
    }
    
    // Fallback to stored user info
    const userInfo = localStorage.getItem('user-info')
    if (userInfo) {
        try {
            return JSON.parse(userInfo)
        } catch (e) {
            console.error('Error parsing user info:', e)
        }
    }
    
    return null
}

/**
 * Check if the access token is expired
 * Returns true if token is expired or about to expire (within 5 minutes)
 */
export const isTokenExpired = (token = null) => {
    const accessToken = token || getAccessToken()
    if (!accessToken) return true
    
    const decoded = decodeToken(accessToken)
    if (!decoded || !decoded.exp) return true
    
    // Check if token expires in less than 5 minutes
    const expirationTime = decoded.exp * 1000
    const currentTime = Date.now()
    const fiveMinutes = 5 * 60 * 1000
    
    return (expirationTime - currentTime) < fiveMinutes
}

/**
 * Initialize token refresh interval
 * Automatically refreshes token before it expires
 */
export const initTokenRefresh = () => {
    const checkAndRefresh = async () => {
        if (isTokenExpired()) {
            try {
                await refreshAccessToken()
                console.log('Token refreshed successfully')
            } catch (error) {
                console.error('Auto refresh failed:', error)
            }
        }
    }
    
    // Check every 4 minutes
    const intervalId = setInterval(checkAndRefresh, 4 * 60 * 1000)
    
    // Also check immediately
    checkAndRefresh()
    
    // Return function to clear interval
    return () => clearInterval(intervalId)
}