const { getIdFromRequest } = require('../utils/common.utils');
const { findAllDetails, findOneDetail, createDetail, removeOneDetail, updateDetail } = require('../services/detail.service');

const findAll = async (req, res) => {
  try {
    const details = await findAllDetails(req.query);
    res.json(details).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const findOne = async (req, res) => {
  const id = getIdFromRequest(req);

  try {
    const detail = await findOneDetail(id);
    res.json(detail).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const create = async (req, res) => {
  try {
    const detail = await createDetail(req.body);
    res.json(detail).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const update = async (req, res) => {
  const id = getIdFromRequest(req);

  try {
    const detail = await updateDetail(id, req.body);
    res.json(detail).status(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const remove = async (req, res) => {
  const id = getIdFromRequest(req);

  try {
    const detail = await removeOneDetail(id);
    res.json(detail).status(200);
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
