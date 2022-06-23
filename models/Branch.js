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
  },
  { sequelize: db, modelName: "branches" }
);

module.exports = Branch;
