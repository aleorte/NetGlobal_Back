const Admin = require("./Admin")
const Assignment = require("./Assingment")
const Branch = require("./Branch")
const Company = require("./Company")
const Guard = require("./Guard")
const Inactive = require ("./Inactive")
const Province = require ("./Province")


Company.hasMany(Branch,{as:"company"});
Branch.belongsTo(Company, {as:"company"});
Assignment.belongsTo(Branch, {as:"branch"})
Branch.hasMany(Assignment,{as:"branch"})
Assignment.belongsTo(Admin, {as:"admin"})
Admin.hasMany(Assignment,{as:"admin"})
Assignment.belongsTo(Guard, {as:"guard"})
Guard.hasMany(Assignment,{as:"guard"})
Inactive.belongsToMany(Guard, {through:"guard_inactive"})
Guard.belongsToMany(Inactive,{through:"guard_inactive"})
Province.belongsToMany(Guard, {through:"guard_licenses"})
Guard.belongsToMany(Province,{through:"guard_licenses"})





module.exports = {Admin,Assignment,Branch,Company,Guard,Inactive,Province}