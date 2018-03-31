const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  var Types = Sequelize.DataTypes;
  var User = sequelize.models['user'];
  //assert(User);

  // Also has parent, author
  const Pack = sequelize.define('pack', {
    name: Types.STRING,
    modified: Types.DATE
  });

  // Also has user, pack
  const PackState = sequelize.define('packState', {
    modified: Types.DATE,
    status: Types.STRING
  });

  Pack.belongsTo(User, {as: 'user', foreignKey: 'authorId', constraint: false});
  Pack.belongsTo(Pack, {as: 'parent', constraint: false});

  PackState.belongsTo(User, {as: 'userRef', constraint: false});
  PackState.belongsTo(Pack, {as: 'pack', constraint: false});
  User.hasMany(PackState, {as: 'packState', constraint: false});
  User.hasMany(Pack, {as: 'packAuthored', constraint: false});

  User.sync()
    .then(Pack.sync())
    .then(PackState.sync())

}

