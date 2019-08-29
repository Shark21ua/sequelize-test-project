const { map, pipe, fromPairs, values } = require('lodash/fp');
const Sequelize = require('sequelize');
const filePaths = require('./index');

// connection to database
const sequelize = new Sequelize('sequelize_test', 'root', '1', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false
  }
});

// create models mapping
const models = pipe(
  map(file => sequelize.import(file)),
  map(model => [model.name, model]),
  fromPairs,
)(filePaths);

// create association
pipe(
  values,
  map(model => model.associate(models))
)(models);

// create collection if not exist
sequelize.sync();

module.exports = { Sequelize, sequelize, ...models };
