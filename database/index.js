const { Sequelize } = require('sequelize');

const sequelizeInstance = new Sequelize({
	dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false,
});

async function testConnection() {
	await sequelizeInstance.authenticate();
}

module.exports = { sequelizeInstance, testConnection };