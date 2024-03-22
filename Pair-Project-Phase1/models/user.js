'use strict';
const { Model, ValidationError } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Author, { foreignKey: 'AuthorId' });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email already exists'
        },
        validate: {
          notNull: {
            msg: 'UserName is required',
          },
          notEmpty: {
            msg: 'UserName cannot be empty',
          },
          isEmail: {
            msg: 'Invalid email format.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is required',
          },
          notEmpty: {
            msg: 'Password cannot be empty',
          },
          len: {
            args: [8, undefined],
            msg: 'Password must be at least 8 characters long.'
          }
        }
      },
      role: DataTypes.STRING,
      AuthorId: DataTypes.INTEGER
    },
    {
      hooks: {
        beforeCreate(user, options) {
          const salt = bcrypt.genSaltSync(5);
          const hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
        }
      },
      sequelize,
      modelName: 'User'
    }
  );

  return User;
};
