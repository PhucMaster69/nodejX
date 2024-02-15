'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DevicesModbusTCP', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      deviceIPAdd: {
        type: Sequelize.STRING
      },
      devicePort: {
        type: Sequelize.STRING
      },
      deviceId: {
        type: Sequelize.STRING
      },
      scanrate: {
        type: Sequelize.INTEGER
      },
      connectTimeout: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      tags: {
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DevicesModbusTCP');
  }
};