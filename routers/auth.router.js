const passport = require('passport');

const authByGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleFailRedirect = passport.authenticate('google', { failureRedirect: '/' });

const googleSuccessRedirect = (req, res) => {
  const { token } = req.user;
  req.session.token = token;
  res.json({ token });
};

module.exports = {
  authByGoogle,
  googleFailRedirect,
  googleSuccessRedirect
};
