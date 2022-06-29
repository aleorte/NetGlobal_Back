const Sequelize = require("sequelize");
const db = require("../db/index");

class Company extends Sequelize.Model {}

Company.init(
  {
    cuit: {
      type: Sequelize.BIGINT,
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
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    contractEndDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    logo: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
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
  { sequelize: db, modelName: "companies" }
);

module.exports = Company;
