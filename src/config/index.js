const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin; // Automatically detects current URL
  }

  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Fallback for SSR
};

export const config = {
  baseUrl: getBaseUrl(),
};

export default config;
