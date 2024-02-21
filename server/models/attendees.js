'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendees.belongsTo(models.Meetups, {
        foreignKey: "meetup_id",
      });
      Attendees.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Attendees.init({
    user_id: DataTypes.INTEGER,
    meetup_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attendees',
  });
  return Attendees;
};