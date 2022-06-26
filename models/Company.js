const Sequelize = require("sequelize");
const db = require("../db/index");

class Company extends Sequelize.Model {}

Company.init(
  {
    cuit: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    legalName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    legalAdress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contractStartDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    contractEndDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "companies" }
);

module.exports = Company;
