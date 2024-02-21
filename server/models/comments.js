'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Meetups, {
        foreignKey: "meetup_id",
      });
      Comments.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Comments.init({
    user_id: DataTypes.INTEGER,
    meetup_id: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};