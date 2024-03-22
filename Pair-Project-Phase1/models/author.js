'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    get title() {
      let title = this.experience > 20 ? "Senior" : "Junior";
      return `${title} - ${this.authorName}`;
    }

    static associate(models) {
      Author.hasOne(models.User, { foreignKey: 'AuthorId' });
      Author.hasMany(models.Quote, { foreignKey: 'AuthorId' });
      Author.belongsToMany(models.Reward, { through: models.AuthorRewards });
    }
  }
  Author.init(
    {
      authorName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Author name is required',
          },
          notEmpty: {
            msg: 'Author name cannot be empty',
          },
        },
      },
      codeUniq: DataTypes.STRING,
      experience: {
        type: DataTypes.INTEGER,
        validate: {
          max: {
            args: 99,
            msg: 'Experience cannot exceed 99',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Author',
    }
  );
  return Author;
};
