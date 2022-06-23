const Sequelize = require("sequelize");
const db = require("../db/index");

class Assignment extends Sequelize.Model {}

Assignment.init(
  {
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    realStartTime: {
      type: Sequelize.TIME,
      default: null,
    },
    realEndTime: {
      type: Sequelize.TIME,
      default: null,
    },
  },
  { sequelize: db, modelName: "assingments" }
);

module.exports = Assignment;
