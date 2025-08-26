import { API_URL } from "./config";

/**
 * Read access token from localStorage
 */
export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

/**
 * Read refresh token from localStorage
 */
export const getRefreshToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
};

/**
 * Clear all tokens
 */
export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("refresh_token");
};

/**
 * Refresh the access token using the refresh token
 */
/**
/**
 * Refresh the access token using the refresh token
 */
const refreshAccessToken = async () => {
  console.log("Refreshing token with:", {
    refreshToken: localStorage.getItem("refresh_token"),
    username: localStorage.getItem("username"),
  });

  const refreshToken = localStorage.getItem("refresh_token");
  const username = localStorage.getItem("username");

  if (!refreshToken || !username) {
    throw new Error("Missing refresh token or username");
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refresh_token: refreshToken,
      username: username, // ✅ send username for SECRET_HASH
    }),
  });

  const result = await response.json();
  console.log("Refresh response:", result);

if (response.ok && result.tokens?.access_token) {
  localStorage.setItem("access_token", result.tokens.access_token);

  if (result.tokens?.id_token) {
    localStorage.setItem("id_token", result.tokens.id_token);
  }

  console.log(
    "New access token saved:",
    localStorage.getItem("access_token").slice(0, 20) + "..."
  );
  return result.tokens.access_token; // still return for retry
}

  throw new Error(result.error || "Token refresh failed");
};


export const getUsername = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("username");
};

/**
 * Authenticated fetch wrapper
 */
export const authenticatedFetch = async (url, options = {}) => {
  let accessToken = getAccessToken();
  if (!accessToken) throw new Error("Not authenticated");

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
  });

  let response = await fetch(url, buildOptions(accessToken));

  if (response.status === 401) {
    try {
      console.log("Access token expired, refreshing…");
      accessToken = await refreshAccessToken();
      response = await fetch(url, buildOptions(accessToken));
    } catch (err) {
      console.error("Refresh failed:", err);
      throw err;
    }
  }

  return response;
};
