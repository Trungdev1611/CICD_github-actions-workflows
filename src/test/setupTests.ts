import "@testing-library/jest-dom";

// Set default environment variables for tests if not already set
if (!process.env.VITE_API_URL) {
  process.env.VITE_API_URL = 'https://jsonplaceholder.typicode.com';
}

