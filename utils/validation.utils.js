const { get } = require('lodash/fp');

const getMessage = get('error.details[0].message');

const validate = (schema, data) => {
  const result = schema.validate(data, { abortEarly: true });

  if (!result.error) return data;

  throw new Error(getMessage(result));
};

module.exports = {
  validate
};
