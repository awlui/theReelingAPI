'use strict';
module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    reviewParagraph: {
      type: DataTypes.TEXT
    },
    summary: {
      type: DataTypes.TEXT
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["","",""]
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Review.belongsTo(models.Movie, {
          foreignKey: 'movieId',
          onDelete: "CASCADE"
        });
        Review.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Review;
};