 TRUNCATE TABLE index_table; 
 TRUNCATE admins RESTART IDENTITY CASCADE;
 TRUNCATE companies RESTART IDENTITY CASCADE;
 TRUNCATE branches RESTART IDENTITY CASCADE;
 TRUNCATE provinces RESTART IDENTITY CASCADE;
 TRUNCATE guards RESTART IDENTITY CASCADE;
 
 INSERT INTO provinces (name) VALUES ('Buenos Aires');
 INSERT INTO provinces (name) VALUES ('Chaco');
 INSERT INTO provinces (name) VALUES ('Cordoba');
 INSERT INTO provinces (name) VALUES ('La Pampa');
 INSERT INTO provinces (name) VALUES ('Chubut');
 INSERT INTO provinces (name) VALUES ('Jujuy');
 INSERT INTO provinces (name) VALUES ('Salta');
 INSERT INTO provinces (name) VALUES ('Tucuman');
 INSERT INTO provinces (name) VALUES ('Formosa');
 INSERT INTO provinces (name) VALUES ('Catamarca');
 INSERT INTO provinces (name) VALUES ('Santiago del Estero');
 INSERT INTO provinces (name) VALUES ('Corrientes');
 INSERT INTO provinces (name) VALUES ('Mendoza');
 INSERT INTO provinces (name) VALUES ('Entre Rios');
 INSERT INTO provinces (name) VALUES ('Santa Fe');
 INSERT INTO provinces (name) VALUES ('Misiones');
 INSERT INTO provinces (name) VALUES ('Rio Negro');
 INSERT INTO provinces (name) VALUES ('San Juan');
 INSERT INTO provinces (name) VALUES ('San Luis');
 INSERT INTO provinces (name) VALUES ('Santa Cruz');
 INSERT INTO provinces (name) VALUES ('Neuquen');
 INSERT INTO provinces (name) VALUES ('Tierra del Fuego');
 INSERT INTO provinces (name) VALUES ('La Rioja');

 INSERT INTO admins (email,password,"superAdmin") VALUES ('admin@admin.com','1234',true);
 INSERT INTO admins (email,password) VALUES ('admin2@admin.com','12345');

INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate") VALUES (12131311, 'la empresa','domicilio 123','2022-01-01','2022-12-01');
INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate") VALUES (12131011,'la empresa 2','domicilio 1234','2022-01-01','2022-12-01');
INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate") VALUES (121310011, 'la empresa 2','domicilio 1234','2022-01-01','2022-12-01');
INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate") VALUES (12131511, 'la empresa 3','domicilio 1235','2022-01-01','2022-05-01');

INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal','calle',111,'Mar del PLata ',55.25 , 22.17,1,1);
INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal 2 ','calle',222,'Mar del Plata',55.20 , 22.18,2,1);
INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal de la empresa 2','calle',111,'chubut',55.25 , 22.17,1,2);
INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal 2 de la empresa 2 ','calle',222,'chubut',55.20 , 22.18,2,2);

INSERT INTO index_table (tablename,indexname) VALUES ('admins','admins_email_key');
INSERT INTO index_table (tablename,indexname) VALUES ('admins','admins_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('assignments','assignments_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('branches','branches_name_key');
INSERT INTO index_table (tablename,indexname) VALUES ('branches','branches_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('companies','companies_cuit_key');
INSERT INTO index_table (tablename,indexname) VALUES ('companies','companies_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('guards','guards_cuil_key');
INSERT INTO index_table (tablename,indexname) VALUES ('guards','guards_email_key');
INSERT INTO index_table (tablename,indexname) VALUES ('guards','guards_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('guards_inactivities','guards_inactivities_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('guards_licenses','guards_licenses_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('inactivities','inactivities_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('provinces','provinces_pkey');







