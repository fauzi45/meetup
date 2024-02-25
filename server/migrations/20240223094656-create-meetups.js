"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Meetups",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
        category_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Categories",
            key: "id",
          },
        },
        image: {
          type: Sequelize.JSON,
        },
        full_address: {
          type: Sequelize.STRING,
        },
        lat: {
          type: Sequelize.STRING,
        },
        long: {
          type: Sequelize.STRING,
        },
        start_date: {
          type: Sequelize.DATEONLY,
        },
        finish_date: {
          type: Sequelize.DATEONLY,
        },
        start_time: {
          type: Sequelize.TIME,
        },
        finish_time: {
          type: Sequelize.TIME,
        },
        capacity: {
          type: Sequelize.INTEGER,
        },
        status: {
          type: Sequelize.STRING,
        },
        organizer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        paranoid: true, // Enable soft deletion
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Meetups");
  },
};
