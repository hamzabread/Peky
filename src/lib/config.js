let API_URL;

if (process.env.NODE_ENV === "development") {
  API_URL = 'http://127.0.0.1:5000';
} else {
  API_URL = process.env.NEXT_PUBLIC_API_URL;
}

export { API_URL };
