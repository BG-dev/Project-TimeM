const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate({ List, User, BoardUser }) {
      Board.hasMany(List, { foreignKey: "board_id" });
      Board.belongsToMany(User, {
        through: BoardUser,
        foreignKey: "board_id",
        otherKey: "user_id",
      });
    }
  }
  Board.init(
    {
      board_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "boards",
      timestamps: true,
    }
  );
  return Board;
};
