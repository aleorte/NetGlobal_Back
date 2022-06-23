const Sequelize = require("sequelize");
const db = require("../db/index");

class Province extends Sequelize.Model {}

Province.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "provinces" }
);

module.exports = Province;
