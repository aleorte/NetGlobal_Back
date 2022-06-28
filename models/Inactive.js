const Sequelize = require("sequelize");
const db = require("../db/index");

class Inactive extends Sequelize.Model {}

Inactive.init(
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

module.exports = Inactive;
