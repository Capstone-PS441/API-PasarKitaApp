'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('transactions', 
       { Id_member: {
          type: Sequelize.INTEGER ,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        Tanggal: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        Item_description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        year: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        month: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        day: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        day_of_week: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('now'),
        },
       });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('users'); 
  }
};
