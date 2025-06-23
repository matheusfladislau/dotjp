const { sequelizeInstance } = require('../index');
const { Sequelize } = require('sequelize');

const User = sequelizeInstance.define('User', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: 'User',
    timestamps: false
});

module.exports = { User };