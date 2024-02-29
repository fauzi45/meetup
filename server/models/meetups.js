'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meetups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meetups.belongsTo(models.Category, {
        foreignKey: "category_id",
      });
      Meetups.belongsTo(models.User, {
        foreignKey: "organizer_id",
      });
      Meetups.hasMany(models.Attendees, {
        foreignKey: "meetup_id",
      });
      Meetups.hasMany(models.Comments, {
        foreignKey: "meetup_id",
      });
    }
  }
  Meetups.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    image: DataTypes.JSON,
    full_address: DataTypes.STRING,
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
    place: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    finish_date: DataTypes.DATEONLY,
    start_time: DataTypes.TIME,
    finish_time: DataTypes.TIME,
    capacity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    organizer_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Meetups',
    paranoid: true
  });
  return Meetups;
};