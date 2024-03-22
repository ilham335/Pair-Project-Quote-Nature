'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      authorName: {
        type: Sequelize.STRING
      },
      codeUniq: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.sequelize.query('ALTER SEQUENCE "Authors_id_seq" RESTART WITH 1;');

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Authors');
  }
};