'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('sellers', 
       { id: {
          type: Sequelize.INTEGER ,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        location: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        category: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        items: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
       });
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('sellers');
    
  }
};
