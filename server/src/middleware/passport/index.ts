import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_URL } from 'config'

/**
 * Configure Passport to use Google OAuth 2.0.
 * - clientID/secret from env
 * - callbackURL: where Google redirects after login
 * - on success, returns Google profile object
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: SERVER_URL + '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // profile contains Google user info (id, emails, displayName, photos)
      return done(null, profile)
    }
  )
)

export default passport
