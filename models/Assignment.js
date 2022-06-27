const Sequelize = require("sequelize");
const db = require("../db/index");

class Assignment extends Sequelize.Model {}

Assignment.init(
  {
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    month: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    realStartTime: {
      type: Sequelize.DATE,
      default: null,
    },
    realEndTime: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    workedHours:{
      type: Sequelize.DECIMAL,
    },
    state:{
      type: Sequelize.STRING,
      defaultValue:"PENDING",
    }
  },
  { sequelize: db, modelName: "assignments" }
);



module.exports = Assignment;
