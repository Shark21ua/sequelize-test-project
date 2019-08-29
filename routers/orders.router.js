const { getIdFromRequest } = require('../utils/common.utils');
const { createOrder, findAllOrders, findOneOrder, removeOneOrder, updateOrder } = require('../services/order.service');

const findAll = async (req, res) => {
  try {
    const orders = await findAllOrders(req.query);
    res.json(orders).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const findOne = async (req, res) => {
  const id = getIdFromRequest(req);

  try {
    const order = await findOneOrder(id);
    res.json(order).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const create = async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.json(order).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const update = async (req, res) => {
  const id = getIdFromRequest(req);

  try {
    const order = await updateOrder(id, req.body);
    res.json(order).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const remove = async (req, res) => {
  const id = getIdFromRequest(req);

  try {
    const order = await removeOneOrder(id);
    res.json(order).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  findAll,
  create,
  update,
  findOne,
  remove
};
