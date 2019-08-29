const GoogleStrategy = require('passport-google-oauth')
  .OAuth2Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID: '1078218979329-6cff0tqrdihthi42t1k0bu3q0fdlt2r8.apps.googleusercontent.com',
    clientSecret: 'hm92yf5vvN_abqXmgjW2J1sj',
    callbackURL: '/auth/google/redirect'
  }, (token, refreshToken, profile, done) => {

    return done(null, {
      profile: profile,
      token: token
    });
  }));
};
