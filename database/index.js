const recursiveReadSync = require('recursive-readdir-sync');
const { filter, includes } = require('lodash/fp');

module.exports = filter(file => includes('.model.js', file), recursiveReadSync(__dirname));
