const router = require('express').Router();
const details = require('./details.router');
const users = require('./users.router');
const orders = require('./orders.router');
const auth = require('./auth.router');

router.get('/auth/google', auth.authByGoogle);
router.get('/auth/google/redirect', auth.googleFailRedirect, auth.googleSuccessRedirect);

router.get('/users', users.findAll);
router.get('/users/:id', users.findOne);
router.post('/users', users.create);
router.patch('/users/:id', users.update);
router.delete('/users/:id', users.remove);

router.get('/details', details.findAll);
router.get('/details/:id', details.findOne);
router.post('/details', details.create);
router.patch('/details/:id', details.update);
router.delete('/details/:id', details.remove);

router.get('/orders', orders.findAll);
router.get('/orders/:id', orders.findOne);
router.post('/orders', orders.create);
router.patch('/orders/:id', orders.update);
router.delete('/orders/:id', orders.remove);

module.exports = router;
