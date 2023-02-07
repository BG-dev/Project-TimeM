const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ List }) {
      Task.belongsTo(List, { foreignKey: "listId" });
    }
  }
  Task.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tasks",
      timestamps: true,
      underscored: true,
    }
  );
  return Task;
};
