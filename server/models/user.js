'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["","",""]
    },
    biography: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Review, {
          foreignKey: 'userId',
          as: 'reviews',
        });
      }
    }
  });
  return User;
};