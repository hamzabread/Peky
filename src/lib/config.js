let API_URL;

if (process.env.NODE_ENV === "development") {
  // Local development API (if you want to hit Flask locally)
  API_URL = "http://localhost:5000";
} else {
  // Use the deployed backend in production/preview
  API_URL = process.env.NEXT_PUBLIC_API_URL;
}

export { API_URL };
