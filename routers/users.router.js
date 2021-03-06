const { getIdFromRequest } = require('../utils/common.utils');
const { findAllUsers, findOneUser, createUser, removeOneUser, updateUser } = require('../services/user.service');

const findAll = async (req, res) => {
  try {
    const users = await findAllUsers(req.query);
    res.json(users).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const findOne = async (req, res) => {
  const id = getIdFromRequest(req);

  try {
    const user = await findOneUser(id);
    res.json(user).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const create = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.json(user).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const update = async (req, res) => {
  const id = getIdFromRequest(req);

  try {
    const user = await updateUser(id, req.body);
    res.json(user).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const remove = async (req, res) => {
  const id = getIdFromRequest(req);

  try {
    const user = await removeOneUser(id);
    res.json(user).status(200);
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
