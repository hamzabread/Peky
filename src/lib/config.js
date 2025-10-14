let API_URL;

if (process.env.NODE_ENV === "development") {
  API_URL = 'https://web-production-b093f.up.railway.app';
} else {
  API_URL = process.env.NEXT_PUBLIC_API_URL;
}

export { API_URL };
