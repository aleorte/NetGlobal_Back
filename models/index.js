const Admin = require("./Admin");
const Assignment = require("./Assignment");
const Branch = require("./Branch");
const Company = require("./Company");
const Guard = require("./Guard");
const Inactive = require("./Inactive");
const Province = require("./Province");

Company.hasMany(Branch, { as: 'branches', foreignKey: "companyId" });
Branch.belongsTo(Company, { as: 'company' });
Province.hasMany(Branch, { as: 'branches', foreignKey: "companyId" });
Branch.belongsTo(Province, { as: 'province' });

Branch.hasMany(Assignment, { as: "assignments", foreignKey: "branchId" });
Assignment.belongsTo(Branch, { as: "branch" });

Admin.hasMany(Assignment, { as: "assignments", foreignKey: "adminId" });
Assignment.belongsTo(Admin, { as: "admin" });

Guard.hasMany(Assignment, { as: "assignments", foreignKey: "guardId" });
Assignment.belongsTo(Guard, { as: "guard" });

Guard.belongsToMany(Inactive, { through: "guards_inactivities" });
Inactive.belongsToMany(Guard, { through: "guards_inactivities" });

Province.belongsToMany(Guard, { through: "guards_provinces" });
Guard.belongsToMany(Province, { through: "guards_provinces" });

module.exports = {
  Admin,
  Assignment,
  Branch,
  Company,
  Guard,
  Inactive,
  Province,
};
