const Sequelize = require('sequelize')
const sequelize = new Sequelize('movie-controll', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
