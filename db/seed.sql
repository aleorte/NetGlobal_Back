 TRUNCATE TABLE index_tables; 
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

INSERT INTO admins (cuil, name, "lastName", email,password,"superAdmin", image) VALUES (1,'Kobe','Bryant','nba@admin.com','$2b$10$zF21WMEseWVWg7s5dIIZhOHsEaK6a81JopzJ.URjAlD1Wm9SYPhSO',true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaLMskWLOR8ab_Iu1WpWbLU2_ByqbEWbnQQ&usqp=CAU');
INSERT INTO admins (cuil, name, "lastName",email,password, image) VALUES (2,'Polly', 'Grey','polly@admin.com','$2b$10$8YbIW/tqp8SOjKq28uRh3.9IO3KBE/IlAAI1oTAwZdaZY2mhUXtCS', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPyfsmGacVFw6JLFhwtcxYO-2qHF269JNLmpFFsK1w63kEBE1xKBORXkG3xA2Oa-zGyU&usqp=CAU');


INSERT INTO companies ("coordinateLatitude", "coordinateLength",street, number, location, cuit, "legalName", "contractStartDate","contractEndDate",logo) VALUES ( 22.5 , 11.34 ,'Peatonal San Martin',1500,'Mar del Plata',12131311, 'Havanna','2022-01-01','2022-12-01' ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1kLfvpglz9ro0HJsI4VoNw3CEGVlrZnXJw&usqp=CAU');
INSERT INTO companies ("coordinateLatitude", "coordinateLength", street, number, location,cuit, "legalName", "contractStartDate","contractEndDate",logo) VALUES (20.5, 30.4,'Av de los Trabajadores',1500,'Mar del Plata', 12131011,'Moscuzza','2022-01-01','2022-12-01','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5SX2cr-TiW1nODI8mV-_1XMDa5ApmnUNVw&usqp=CAU');
INSERT INTO companies ("coordinateLatitude", "coordinateLength", street, number, location,cuit, "legalName", "contractStartDate","contractEndDate",logo) VALUES (22.8 , 15.34,'Constitucion',1500,'Mar del Plata',121310011,'Lucianos','2022-01-01','2022-12-01','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMliX-s96Pnop4CDgkDHjxlxjJx24aUK_6A&usqp=CAU');


INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal','calle',111,'Mar del PLata ',55.25 , 22.17,1,1);
INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal 2 ','calle',222,'Mar del Plata',55.20 , 22.18,2,1);
INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal de la empresa 2','calle',111,'chubut',55.25 , 22.17,1,2);
INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal 2 de la empresa 2 ','calle',222,'chubut',55.20 , 22.18,2,2);

INSERT INTO index_tables (tablename,indexname) VALUES ('admins','admins_email_key');
INSERT INTO index_tables (tablename,indexname) VALUES ('admins','admins_pkey');
INSERT INTO index_tables (tablename,indexname) VALUES ('assignments','assignments_pkey');
INSERT INTO index_tables (tablename,indexname) VALUES ('branches','branches_name_key');
INSERT INTO index_tables (tablename,indexname) VALUES ('branches','branches_pkey');
INSERT INTO index_tables (tablename,indexname) VALUES ('companies','companies_cuit_key');
INSERT INTO index_tables (tablename,indexname) VALUES ('companies','companies_pkey');
INSERT INTO index_tables (tablename,indexname) VALUES ('guards','guards_cuil_key');
INSERT INTO index_tables (tablename,indexname) VALUES ('guards','guards_email_key');
INSERT INTO index_tables (tablename,indexname) VALUES ('guards','guards_pkey');
INSERT INTO index_tables (tablename,indexname) VALUES ('guards_inactivities','guards_inactivities_pkey');
INSERT INTO index_tables (tablename,indexname) VALUES ('guards_licenses','guards_licenses_pkey');
INSERT INTO index_tables (tablename,indexname) VALUES ('inactivities','inactivities_pkey');
INSERT INTO index_tables (tablename,indexname) VALUES ('provinces','provinces_pkey');







