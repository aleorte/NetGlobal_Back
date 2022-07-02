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
    name:{
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName:{
      type: Sequelize.STRING,
      allowNull: false,
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
    },
    superAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    recoveryKey: {
      type: Sequelize.STRING,
      defaultValue: null,
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
    image: { 
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      },
    } 
  },
  { sequelize: db, modelName: "admins" }
);

Admin.beforeCreate(async (admin) => {
  if (!admin.password) return;
  try {             //         For Password:
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await admin.encryptPassword(admin.password, salt);
    admin.password = passwordHash;
  } catch (e) {
    throw new Error("ERROR PASSWORD");
  }

  try {             //         For recoveryKey:
    if (!admin.recoveryKey) return;
    const salt = await bcrypt.genSalt(10);
    const recoveryKeyHash = await admin.encryptPassword(admin.recoveryKey, salt);
    admin.recoveryKey = recoveryKeyHash;
  } catch (e) {
    throw new Error("ERROR ACCESS TOKEN");
  }
});

Admin.beforeUpdate(async (admin) => {
try {               //          For Password:
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await admin.encryptPassword(admin.password, salt);
  admin.password = passwordHash;
} catch (e) {
  throw new Error("ERROR PASSWORD");
}

try {               //          For recoveryKey:
  const salt = await bcrypt.genSalt(10);
  const recoveryKeyHash = await admin.encryptPassword(admin.recoveryKey, salt);
  admin.recoveryKey = recoveryKeyHash;
} catch (e) {
  throw new Error("ERROR PASSWORD");
}
});

module.exports = Admin;
