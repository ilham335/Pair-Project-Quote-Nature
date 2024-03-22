'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {

    static async getQuoteByName(filter) {
      try {
        let seq = {
          include: { model: sequelize.models.Author },
        }
        if (filter) {
          seq.where = { quote: { [Op.iLike]: `%${filter}%` } }
        }

        seq.order = [['quote', 'DESC']]

        const Quote = await this.findAll(seq);

        console.log(Quote)
        return Quote;
      } catch (error) {
        throw error
      }
    }

    static associate(models) {
      Quote.belongsTo(models.Author, { foreignKey: 'AuthorId' });
      // Quote.belongsToMany('Languages', { through: models.languageQuote })
    }
  }
  Quote.init(
    {
      quote: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Quote is required',
          },
          notEmpty: {
            msg: 'Quote cannot be empty',
          },
        },
      },
      AuthorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Quote',
    }
  );
  return Quote;
};
