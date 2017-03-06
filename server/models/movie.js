'use strict';
module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    poster: {
      type: DataTypes.STRING
    },
    banner: {
      type: DataTypes.STRING
    },
    summary: {
      type: DataTypes.TEXT
    },
    releaseDate: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.FLOAT
    },
    title: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Movie.hasMany(models.Review, {
          foreignKey: 'movieId',
          as: "reviews"
        });
      }
    }
  });
  return Movie;
};