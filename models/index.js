const Admin = require("./Admin")
const Assignment = require("./Assingment")
const Branch = require("./Branch")
const Company = require("./Company")
const Guard = require("./Guard")
const Inactive = require ("./Inactive")
const Province = require ("./Province")

Branch.belongsTo(Company, {as:"company"});
Branch.belongsTo(Province, {as:"province"});
Assignment.belongsTo(Branch, {as:"branch"})
Assignment.belongsTo(Admin, {as:"admin"})
Assignment.belongsTo(Guard, {as:"guard"})
Inactive.belongsTo(Guard, {as:"guard"})
Guard.belongsTo(Province, {as:"province"})
Province.belongsTo(Guard,{as:"guard"})
Province.belongsTo(Branch,{as:"branch"})




module.exports = {Admin,Assignment,Branch,Company,Guard,Inactive,Province}