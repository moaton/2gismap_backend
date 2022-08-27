const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.legalEntities = require('./legalEntities.model.js')(sequelize, Sequelize)
db.uninhabitedPremise = require('./uninhabitedPremise.model.js')(sequelize, Sequelize)
db.uninhabitedPremiseTwo = require('./uninhabitedPremiseTwo.model.js')(sequelize, Sequelize)
db.cashRegisterMachine = require('./cashRegisterMachine.model.js')(sequelize, Sequelize)
db.users = require('./users.model.js')(sequelize, Sequelize)
db.tickets = require('./tickets.model.js')(sequelize, Sequelize)

module.exports = db;
