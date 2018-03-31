const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  var Types = Sequelize.DataTypes;

  // Pack data will be added in pack.js
  const User = sequelize.define('user', {
    email: Types.STRING,
    username: Types.STRING,
    password: Types.STRING,

    lastActive: Types.DATE
  });

  //User.sync();



}
