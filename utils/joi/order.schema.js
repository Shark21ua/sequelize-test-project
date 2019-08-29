const Joi = require('joi');

const orderCreateJoiSchema = Joi.object().keys({
  UserId: Joi.number().required(),
  details: Joi.array().items(
    Joi.number()
  ).min(1).required()
}).required();

const orderUpdateJoiSchema = Joi.object().keys({
  status: Joi.string().valid(['completed', 'declined']),
}).required();

module.exports = {
  create: orderCreateJoiSchema,
  update: orderUpdateJoiSchema
};
