const config = require('./config.json');
const Sequelize = require('sequelize');

sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass,{
    host     : config.db.hostname,
    dialect : config.db.dialect,
})

module.exports = sequelize;