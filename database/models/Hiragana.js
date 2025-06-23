const { Sequelize } = require('../index');

const Hiragana = Sequelize.define('Hiragana', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    kana: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    romaji: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Hiragana;