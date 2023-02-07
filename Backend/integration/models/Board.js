const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate({ List, User, BoardUser }) {
      Board.hasMany(List, { foreignKey: "boardId" });
      Board.belongsToMany(User, {
        through: BoardUser,
        foreignKey: "boardId",
        otherKey: "userId",
      });
    }
  }
  Board.init(
    {
      boardId: {
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
      underscored: true,
    }
  );
  return Board;
};
