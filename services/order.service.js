const { isNumber } = require('lodash/fp');
const { Order, Detail } = require('../database/sequelize.config');
const schema = require('../utils/joi/order.schema');
const { validate } = require('../utils/validation.utils');
const { toPaginatedResponse, getQueryParams } = require('../utils/common.utils');

const findAllOrders = async (query) => {
  const { limit, offset, order } = getQueryParams(query);

  const orderEntity = await Order.findAll({ limit, offset, order });
  const count = await Order.count();

  return toPaginatedResponse(limit, offset, count, orderEntity);
};

const findOneOrder = (id) => {
  if (!isNumber(id)) throw new Error('Wrong id type');

  return Order.findOne({ where: { id } });
};

const createOrder = async (payload) => {

  validate(schema.create, payload);

  const { details, UserId } = payload;

  const order = await Order.create({ UserId, status: 'pending' });
  const detailList = await Detail.findAll({ where: { id: details } });

  await order.setDetails(detailList);

  return order;
};

const updateOrder = async (id, payload) => {

  validate(schema.update, payload);

  if (payload.status === 'completed') Object.assign({}, payload, { completedAt: Date.now() });

  const order = await Order.findOne({ where: { id } });
  return order.update(payload);
};

const removeOneOrder = (id) => {
  if (!isNumber(id)) throw new Error('Wrong id type');

  return Order.destroy({ where: { id } });
};

module.exports = {
  createOrder,
  updateOrder,
  findAllOrders,
  findOneOrder,
  removeOneOrder
};
