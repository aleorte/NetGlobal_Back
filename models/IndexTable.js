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
     }
    },
    { sequelize: db, modelName: "index_table" }
  );
  
 
  module.exports = IndexTable;