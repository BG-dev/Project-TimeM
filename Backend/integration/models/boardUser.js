const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BoardUser extends Model {
    static associate({}) {}
  }
  BoardUser.init(
    {
      boardUserId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "boards_users",
      timestamps: true,
      underscored: true,
    }
  );
  return BoardUser;
};
