const Joi = require('joi');

const detailCreateJoiSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required()
}).required();

const detailUpdateJoiSchema = Joi.object().keys({
  price: Joi.number()
}).required();

module.exports = {
  create: detailCreateJoiSchema,
  update: detailUpdateJoiSchema
};
