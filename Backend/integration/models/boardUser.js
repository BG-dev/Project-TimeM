const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BoardUser extends Model {
    static associate({}) {}
  }
  BoardUser.init(
    {
      board_user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      board_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "boards_users",
      timestamps: true,
    }
  );
  return BoardUser;
};
