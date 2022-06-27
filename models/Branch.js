const Sequelize = require("sequelize");
const db = require("../db/index");

class Branch extends Sequelize.Model {}

Branch.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    coordinateLatitude: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    coordinateLength: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
  },
  { sequelize: db, modelName: "branches" }
);

module.exports = Branch;
