const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const router = require('./routers');
const auth = require('./bin/auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const app = express();

app.use(bodyParser.json());

auth(passport);
app.use(passport.initialize());

app.use(cookieSession({
  name: 'session',
  keys: ['SECRET KEY'],
  maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());

app.use('/', router);

module.exports = app;
