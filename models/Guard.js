const Sequelize = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcrypt");

class Guard extends Sequelize.Model {
    encryptPassword(password, salt) {
        return bcrypt.hash(password, salt);
      }
}

Guard.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cuil: {
      type: Sequelize.STRING,
      allowNull: false,
      unique:true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coordinateLatitude: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      coordinateLength: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
  },
  { sequelize: db, modelName: "guards" }
);

Guard.beforeCreate(async (guard) => {
    if (!guard.password) return;
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await guard.encryptPassword(guard.password, salt);
      guard.password = passwordHash;
    } catch (e) {
      throw new Error("ERROR PASSWORD");
    }
  });

  
module.exports = Guard;
