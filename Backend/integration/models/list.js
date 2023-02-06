const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate({ Task, Board }) {
      List.hasMany(Task, { foreignKey: "list_id" });
      List.belongsTo(Board, { foreignKey: "board_id" });
    }
  }
  List.init(
    {
      list_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
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
      tableName: "lists",
      timestamps: true,
    }
  );
  return List;
};
