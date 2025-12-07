/**
 * Safely get environment variable from Vite
 * Works in both development/production and test environments
 */
export const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // Try to get from import.meta.env (Vite environment)
  try {
    if (import.meta && import.meta.env) {
      const value = import.meta.env[key];
      if (value) return value;
    }
  } catch (error) {
    // import.meta is not available (e.g., in Jest)
    // Fall through to process.env
  }
  
  // Fallback for test environment (process.env)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  
  return defaultValue;
};

/**
 * Get API URL from environment variable
 */
export const getApiUrl = (): string => {
  return getEnvVar('VITE_API_URL', 'https://jsonplaceholder.typicode.com');
};

