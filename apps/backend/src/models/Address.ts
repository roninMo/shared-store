module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    suite: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { nonEmpty: true }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { nonEmpty: false }
    },
    geo_lat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geo_lng: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Address;
}