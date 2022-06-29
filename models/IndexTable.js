const Sequelize = require("sequelize");
const db = require("../db/index");

class IndexTable extends Sequelize.Model {
  }
  IndexTable.init(
    {
     tablename:{
       type:Sequelize.STRING
     },
     indexname:{
      type:Sequelize.STRING
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
    }
    },
    { sequelize: db, modelName: "index_table" }
  );
  
 
  module.exports = IndexTable;