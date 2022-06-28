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
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: true,
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
    recoveryKey: {
      type: Sequelize.INTEGER,
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
  },
  { sequelize: db, modelName: "guards" }
);

Guard.beforeCreate(async (guard) => {
    if (!guard.password) return;
    try {             //         For Password:
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await guard.encryptPassword(guard.password, salt);
      guard.password = passwordHash;
    } catch (e) {
      throw new Error("ERROR PASSWORD");
    }
  
  try {               //         For recoveryKey:
    if (!guard.recoveryKey) return;
    const salt = await bcrypt.genSalt(10);
    const recoveryKeyHash = await guard.encryptPassword(guard.recoveryKey, salt);
    guard.recoveryKey = recoveryKeyHash;
  } catch (e) {
    throw new Error("ERROR ACCESS TOKEN");
  }
});
  
Guard.beforeUpdate(async (guard) => {
  try {               //          For Password:
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await guard.encryptPassword(guard.password, salt);
    guard.password = passwordHash;
  } catch (e) {
    throw new Error("ERROR PASSWORD");
  }

  try {               //          For recoveryKey:
    const salt = await bcrypt.genSalt(10);
    const recoveryKeyHash = await guard.encryptPassword(guard.recoveryKey, salt);
    guard.recoveryKey = recoveryKeyHash;
  } catch (e) {
    throw new Error("ERROR PASSWORD");
  }
});

module.exports = Guard;
