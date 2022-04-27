'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {  
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      role: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      }, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
