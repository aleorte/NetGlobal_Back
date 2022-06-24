const Sequelize = require("sequelize");
const db = require("../db/index");

class Province extends Sequelize.Model {}

Province.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
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
  { sequelize: db, modelName: "provinces" }
);

module.exports = Province;
