const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelize_test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = {
    sequelize
};
