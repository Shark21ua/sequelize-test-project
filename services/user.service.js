const { isNumber } = require('lodash/fp');
const { User } = require('../database/sequelize.config');
const schema = require('../utils/joi/user.schema');
const { validate } = require('../utils/validation.utils');
const { toPaginatedResponse, getQueryParams } = require('../utils/common.utils');

const findAllUsers = async (query) => {
  const { limit, offset, order } = getQueryParams(query);

  const users = await User.findAll({ offset, limit, order });
  const count = await User.count();

  return toPaginatedResponse(limit, offset, count, users);
};

const findOneUser = (id) => {
  if (!isNumber(id)) throw new Error('Wrong id type');

  return User.findOne({ where: { id } });
};

const createUser = (payload) => {
  validate(schema.create, payload);

  return User.create(payload);
};

const updateUser = async (id, payload) => {
  validate(schema.update, payload);

  const user = await User.findOne({ where: { id } });
  return user.update(payload);
};

const removeOneUser = (id) => {
  if (!isNumber(id)) throw new Error('Wrong id type');

  return User.destroy({ where: { id } });
};

module.exports = {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  removeOneUser
};
