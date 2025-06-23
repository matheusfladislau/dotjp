const { sequelizeInstance } = require('../index');
const { Sequelize } = require('sequelize');

const Daily = sequelizeInstance.define('Daily', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    id_hiragana: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'Daily',
    timestamps: false
});

module.exports = { Daily }