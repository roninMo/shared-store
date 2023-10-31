module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
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
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
  });

  return Post;
}