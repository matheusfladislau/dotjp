const { Hiragana } = require('./models/Hiragana');
const { Daily } = require('./models/Daily');
const { User } = require('./models/User');
const { DailyUser } = require('./models/DailyUser');

function setupAssociations() {
	Hiragana.hasMany(Daily, { 
        foreignKey: 'id_hiragana' 
    });
	Daily.belongsTo(Hiragana, { 
        foreignKey: 'id_hiragana' 
    });

    User.belongsToMany(Daily, {
        through: DailyUser,
        foreignKey: 'id_user',
        otherKey: 'id_daily'
    });
    Daily.belongsToMany(User, {
        through: DailyUser,
        foreignKey: 'id_daily',
        otherKey: 'id_user'
    });
}

module.exports = { setupAssociations };