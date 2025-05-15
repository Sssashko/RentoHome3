// Base URL for your backend API, injected at build time via Vite environment variables.
// e.g. VITE_SERVER_URL="https://api.yoursite.com"
const SERVER_URL = import.meta.env.VITE_SERVER_URL

// OAuth redirect URL (or endpoint) for Google sign-in, also injected via .env
// e.g. VITE_GOOGLE_AUTH="https://accounts.google.com/o/oauth2/v2/auth?…"
const GOOGLE_AUTH = import.meta.env.VITE_GOOGLE_AUTH

// Export these constants so the rest of your app can reference them without hard-coding.
export { GOOGLE_AUTH, SERVER_URL }
