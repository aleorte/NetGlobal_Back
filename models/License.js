const Sequelize = require("sequelize");
const db = require("../db/index");

class License extends Sequelize.Model {}

License.init(
  {
    guardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    provinceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

  },
  { sequelize: db, modelName: "licenses" }
);

module.exports = License;
