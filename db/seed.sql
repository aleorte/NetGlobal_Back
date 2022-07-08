 TRUNCATE TABLE index_tables; 
 TRUNCATE admins RESTART IDENTITY CASCADE;
 TRUNCATE companies RESTART IDENTITY CASCADE;
 TRUNCATE branches RESTART IDENTITY CASCADE;
 TRUNCATE provinces RESTART IDENTITY CASCADE;
 TRUNCATE guards RESTART IDENTITY CASCADE;
  TRUNCATE assignments RESTART IDENTITY CASCADE;

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

INSERT INTO admins (number,street,location, "coordinateLatitude", "coordinateLength",cuil, name, "lastName", email,password,"superAdmin", image) VALUES (4400, 'Gascón','Mar del Plata', -37.99692 , -57.570185, 1,'Kobe','Bryant','nba@admin.com','$2b$10$zF21WMEseWVWg7s5dIIZhOHsEaK6a81JopzJ.URjAlD1Wm9SYPhSO',true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaLMskWLOR8ab_Iu1WpWbLU2_ByqbEWbnQQ&usqp=CAU');
INSERT INTO admins (number,street,location,"coordinateLatitude", "coordinateLength",cuil, name, "lastName",email,password, image) VALUES (2400,'Chaco','Mar del Plata', -37.99598  ,-57.56958 ,2,'Polly', 'Grey','polly@admin.com','$2b$10$8YbIW/tqp8SOjKq28uRh3.9IO3KBE/IlAAI1oTAwZdaZY2mhUXtCS', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPyfsmGacVFw6JLFhwtcxYO-2qHF269JNLmpFFsK1w63kEBE1xKBORXkG3xA2Oa-zGyU&usqp=CAU');


INSERT INTO companies ("provinceId","coordinateLatitude", "coordinateLength",street, number, location, cuit, "legalName", "contractStartDate","contractEndDate",logo) VALUES ( 1,-37.99692 , -57.570185,'Gascón',4400,'Mar del Plata',12131311, 'Havanna','2022-01-01','2022-12-01' ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1kLfvpglz9ro0HJsI4VoNw3CEGVlrZnXJw&usqp=CAU');
INSERT INTO companies ("provinceId","coordinateLatitude", "coordinateLength", street, number, location,cuit, "legalName", "contractStartDate","contractEndDate",logo) VALUES (1,-37.96201 , -57.56317 ,'Valencia',5888,'Mar del Plata', 12131011,'Moscuzza','2022-01-01','2022-12-01','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5SX2cr-TiW1nODI8mV-_1XMDa5ApmnUNVw&usqp=CAU');
INSERT INTO companies ("provinceId","coordinateLatitude", "coordinateLength", street, number, location,cuit, "legalName", "contractStartDate","contractEndDate",logo) VALUES (1,-37.99598  ,-57.56958 ,'Chaco',2400,'Mar del Plata',121310011,'Lucianos','2022-01-01','2022-12-01','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMliX-s96Pnop4CDgkDHjxlxjJx24aUK_6A&usqp=CAU');

INSERT INTO branches (cuit,name, street, number, location,"coordinateLatitude", "coordinateLength","companyId","provinceId") VALUES (1212323011, 'sucursal Havanna 1','calle' ,2333,'Mar del Plata',-37.99598  ,-57.56958,1,1);



INSERT INTO assignments ("workedHours",date, month,  "startTime",  "endTime", notes,"branchId", "adminId", "guardId") VALUES (8.35,'2022-07-21',07, '2022-07-21T18:27:50.000Z','2022-07-22T18:27:50.000Z', 'Abrir ventanas', 1, 1, 1);
INSERT INTO assignments ("workedHours",date, month,  "startTime",  "endTime", notes,"branchId", "adminId", "guardId") VALUES (8.35,'2022-07-15',07, '2022-07-15T18:27:50.000Z','2022-07-16T16:27:50.000Z', 'Abrir ventanas', 1, 1, 1);
INSERT INTO assignments ("workedHours",date, month,  "startTime",  "endTime", notes,"branchId", "adminId", "guardId") VALUES (7.52,'2022-07-10',07, '2022-07-10T18:27:50.000Z','2022-07-11T18:27:50.000Z', 'Abrir ventanas', 1, 1, 2);


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







