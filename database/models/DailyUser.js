const { sequelizeInstance } = require('../index');
const { Sequelize } = require('sequelize');

const DailyUser = sequelizeInstance.define('DailyUser', {
    id_daily: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    word: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    tableName: 'DailyUser',
    timestamps: false
});

module.exports = { DailyUser }