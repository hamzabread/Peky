// src/lib/auth-utils.js
import { API_URL } from "./config";

export const fetchWithToken = async (url, options = {}, retried = false) => {
  let token = localStorage.getItem("access_token");
  options.headers = options.headers || {};
  options.headers["Authorization"] = `Bearer ${token}`;

  let res = await fetch(url, options);

  if (res.status === 401 && !retried) {
    // Attempt token refresh
    const refreshToken = localStorage.getItem("refresh_token");
    const username = localStorage.getItem("username");

    if (!refreshToken || !username) {    
      return;
    }

    try {
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken, username }),
      });

      const refreshData = await refreshRes.json();

      if (refreshRes.ok && refreshData.success && refreshData.access_token) {
        localStorage.setItem("access_token", refreshData.access_token);
        options.headers["Authorization"] = `Bearer ${refreshData.access_token}`;
        // Retry original request **once**
        const retryRes = await fetch(url, options);

        if (retryRes.status === 401) {
          // Stop here—token still invalid, redirect once
          window.location.href = "/login";
          return;
        }

        return retryRes;
      } else {
        // Refresh failed
        window.location.href = "/login";
        return;
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
      window.location.href = "/login";
      return;
    }
  }

  return res;
};
