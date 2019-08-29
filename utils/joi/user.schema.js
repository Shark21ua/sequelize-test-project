const Joi = require('joi');

const userCreateJoiSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().required()
}).required();

const userUpdateJoiSchema = Joi.object().keys({
  username: Joi.string(),
  email: Joi.string()
}).required();

module.exports = {
  create: userCreateJoiSchema,
  update: userUpdateJoiSchema
};
