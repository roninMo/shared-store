module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    postId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    validate: { nonEmpty: true }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
  });

  return Comment;
}