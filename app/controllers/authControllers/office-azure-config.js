const passport = require('passport')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;


passport.use(new OIDCStrategy({
    identityMetadata: 'https://login.microsoftonline.com/<tenant-id>/v2.0/.well-known/openid-configuration',
    clientID: 'your-client-id',
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: 'https://your-app.com/auth/callback',
    allowHttpForRedirectUrl: true, // Set to false in production
    clientSecret: 'your-client-secret',
    validateIssuer: true,
    passReqToCallback: false,
    scope: ['openid', 'profile', 'email'] // Add the scopes that you need
  },
  function(iss, sub, profile, accessToken, refreshToken, done) {
    // Here you can process the user information returned by AzureAD
    return done(null, profile);
  }));