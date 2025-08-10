let API_URL;

if (process.env.NODE_ENV === "development") {
  API_URL = "http://localhost:5000";
} else {
  API_URL = process.env.NEXT_PUBLIC_API_URL;
}

export { API_URL };
