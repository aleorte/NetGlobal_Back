const Admin = require("./Admin")
const Assignment = require("./Assingment")
const Branch = require("./Branch")
const Company = require("./Company")
const Guard = require("./Guard")
const Inactive = require ("./Inactive")
const Province = require ("./Province")
const License = require ("./License")


Branch.belongsTo(Company, {as:"company"});
Branch.belongsTo(Province, {as:"province"});
Assignment.belongsTo(Branch, {as:"branch"})
Assignment.belongsTo(Admin, {as:"admin"})
Assignment.belongsTo(Guard, {as:"guard"})
Inactive.belongsTo(Guard, {as:"guard"})
Guard.belongsTo(Province, {as:"province"})





module.exports = {Admin,Assignment,Branch,Company,Guard,Inactive,Province,License}