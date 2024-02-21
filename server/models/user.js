'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Attendees, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Comments, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Meetups, {
        foreignKey: "organizer_id",
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    location: DataTypes.STRING,
    role: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    image_id: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};