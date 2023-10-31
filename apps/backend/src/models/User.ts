module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    address: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return User;
}

