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
      // define association here
    }
  }
  Meetups.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    category_id: DataTypes.STRING,
    image_url: DataTypes.STRING,
    image_id: DataTypes.STRING,
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    capacity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    organizer_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Meetups',
  });
  return Meetups;
};