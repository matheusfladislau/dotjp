const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false,
});

async function testConnection() {
	await sequelize.authenticate();
}

module.exports = { sequelize, testConnection };