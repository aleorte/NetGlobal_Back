const Sequelize = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcrypt");

class Admin extends Sequelize.Model {
  encryptPassword(password, salt) {
    return bcrypt.hash(password, salt);
  }
}
Admin.init(
  {
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
  { sequelize: db, modelName: "admins" }
);

Admin.beforeCreate(async (admin) => {
  if (!admin.password) return;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await admin.encryptPassword(admin.password, salt);
    admin.password = passwordHash;
  } catch (e) {
    throw new Error("ERROR PASSWORD");
  }
});

module.exports = Admin;
