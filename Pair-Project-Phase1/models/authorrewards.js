'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthorRewards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuthorRewards.init({
    AuthorId: DataTypes.INTEGER,
    RewardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AuthorRewards',
  });
  return AuthorRewards;
};