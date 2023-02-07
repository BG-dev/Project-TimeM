const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate({ Task, Board }) {
      List.hasMany(Task, { foreignKey: "listId" });
      List.belongsTo(Board, { foreignKey: "boardId" });
    }
  }
  List.init(
    {
      listId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
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
      tableName: "lists",
      timestamps: true,
      underscored: true,
    }
  );
  return List;
};
