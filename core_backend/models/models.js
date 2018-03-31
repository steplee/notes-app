const Sequelize = require('sequelize');
const sequelize = new Sequelize('notes_0', 'admin_0', '123', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false
});


// Setup various models
require('./user')(sequelize);
require('./pack')(sequelize);
// ...

var User = sequelize.models['user'];
var Pack = sequelize.models['pack'];

module.exports = sequelize;


/*
User
  .sync({force: true})
  .then(() => User.create({
    email: 'abc@abc.ninja',
    username: 'first_user',
    password: '123123',
    deckStates: [],
    decksCreated: []
  }))
  .catch(err => {
    console.log("Unable to do operations: ", err);
  });
*/
