const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { User, Sequelize } = require('../database/sequelize.config');


const BCRYPT_SALT_ROUNDS = 12;
const Op = Sequelize.Op;


passport.use('register', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
    session: false,
  },
  async (req, username, password, done) => {
    try {
      const user = await User.findOne({ where: { [Op.or]: [{ username }, { email: req.body.email }] } });

      if (user != null) return done(null, false, { message: 'username or email already taken', });

      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

      const newUser = await User.create({
        username,
        password: hashedPassword,
        email: req.body.email,
      });

      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  },
  ),
);

passport.use('login', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (user === null) return done(null, false, { message: 'bad username' });

      const same = await bcrypt.compare(password, user.password);

      if (same !== true) return done(null, false, { message: 'passwords do not match' });

      return done(null, user);

    } catch (err) {
      done(err);
    }
  },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use('jwt',
  new JWTstrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ where: { id: jwt_payload.id } });

      return user
        ? done(null, user)
        : done(null, false);
    } catch (err) {
      done(err);
    }
  }),
);
