const db = require('../database/db');

const Movie = db.sequelize.define('movies', {
  tipo: {
    type: db.Sequelize.INTEGER
  },
  nome: {
    type: db.Sequelize.TEXT,
    required: true
  },
  total_ep:{
    type: db.Sequelize.INTEGER,
    allowNull: true,
  },
  atual_ep:{
    type: db.Sequelize.INTEGER,
    allowNull: true,
  },
  last_view:{
    type: db.Sequelize.DATE,
    defaultValue: new Date()
  }
});

//Movie.sync({force: true})

module.exports = Movie