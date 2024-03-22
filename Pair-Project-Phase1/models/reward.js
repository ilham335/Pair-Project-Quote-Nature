'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reward extends Model {

    static associate(models) {
      Reward.belongsToMany(models.Author, { through: models.AuthorRewards });
    }

  }
  Reward.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Reward is required',
          },
          notEmpty: {
            msg: 'Reward cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Reward',
    }
  );
  return Reward;
};

