const Sequelize = require("sequelize");
const db = require("../db/index");

class Province extends Sequelize.Model {}

Province.init(
  {
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
  },
  { sequelize: db, modelName: "inactivities" }
);

module.exports = Province;
