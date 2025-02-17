const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

export const APP_CONFIG = {
  API_DOMAIN,
  API_URL: `${API_DOMAIN}/api`,
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
};
