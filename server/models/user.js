'use strict';
var bcrypt = require('bcrypt-as-promised');
const saltRounds = 10;


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
      },
      generateHash: function(password) {
        return bcrypt.hash(password, saltRounds)
      }
    },
    instanceMethods: {
      checkPassword: function(password, hashedpw) {
        return bcrypt.compare(password, hashedpw);
      }
    }
  });
  User.beforeCreate(function(user, options) {
    console.log("Password hashing");
    return User.generateHash(user.password)
    .then(function(hashedPw) {
      user.password = hashedPw;
    }, function(err) {
      console.log(err)
    });
  });
  return User;
};

