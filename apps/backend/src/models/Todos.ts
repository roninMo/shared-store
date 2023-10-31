module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: { nonEmpty: true }
    },
  });

  return Todo;
}