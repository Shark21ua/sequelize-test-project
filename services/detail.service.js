const { isNumber } = require('lodash/fp');
const { Detail } = require('../database/sequelize.config');
const schema = require('../utils/joi/detail.schema');
const { validate } = require('../utils/validation.utils');
const { toPaginatedResponse, getQueryParams } = require('../utils/common.utils');

const findAllDetails = async (query) => {
  const { limit, offset, order } = getQueryParams(query);

  const detail = await Detail.findAll({ limit, offset, order });
  const count = await Detail.count();

  return toPaginatedResponse(limit, offset, count, detail);
};

const findOneDetail = (id) => {
  if (!isNumber(id)) throw new Error('Wrong id type');

  return Detail.findOne({ where: { id } });
};

const createDetail = (payload) => {
  validate(schema.create, payload);

  return Detail.create(payload);
};

const updateDetail = async (id, payload) => {
  validate(schema.update, payload);

  const detail = await Detail.findOne({ where: { id } });
  return detail.update(payload);
};

const removeOneDetail = (id) => {
  if (!isNumber(id)) throw new Error('Wrong id type');

  return Detail.destroy({ where: { id } });
};

module.exports = {
  findAllDetails,
  findOneDetail,
  createDetail,
  updateDetail,
  removeOneDetail
};
