const { pipe, get, toNumber, defaultTo, getOr } = require('lodash/fp');

const getIdFromRequest = (req) => pipe(
  get('params.id'),
  toNumber,
  defaultTo(undefined)
)(req);

const getInt = (path, item) => pipe(
  get(path),
  toNumber,
  defaultTo(undefined)
)(item);

const getLinks = (number, size, totalCount) => {
  return (totalCount > 1)
    ? {
      self: `?page[number]=${number}&page[size]=${size}`,

      first: `?page[number]=1&page[size]=${size}`,

      prev: number > 1
        ? `?page[number]=${number - 1}&page[size]=${size}`
        : undefined,

      next: number < totalCount
        ? `?page[number]=${number + 1}&page[size]=${size}`
        : undefined,

      last: `?page[number]=${totalCount}&page[size]=${size}`
    }
    : undefined;
};

const toPaginatedResponse = (number, size, totalCount, data) => ({
  links: getLinks(number, size, totalCount),
  totalCount,
  data,
});

const getQueryParams = (query) => {
  const limit = getInt('size', query);
  const offset = getInt('number', query);
  const orderBy = getOr('id', 'orderBy', query);
  const orderType = getOr('ASC', 'orderType', query);

  return { limit, offset, order: [[orderBy, orderType]] };
};


module.exports = {
  toPaginatedResponse,
  getIdFromRequest,
  getQueryParams,
  getInt
};
