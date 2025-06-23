const { Sequelize } = require('../index');

const User = Sequelize.define('User', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;