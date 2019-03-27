const Sequelize = require('sequelize');
const { sequelize } = require('../services/sequelize.service');

module.exports = sequelize.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    job: {
        type: Sequelize.STRING
    }
});