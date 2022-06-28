const Sequelize = require("sequelize");
const db = require("../db/index");

class Province extends Sequelize.Model {}

Province.init(
  {
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        defaultValue: "PENDING APPROVAL",
      },
  },
  { sequelize: db, modelName: "inactivities" }
);

module.exports = Province;
