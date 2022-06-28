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

 INSERT INTO guards (name, "lastName", cuil, email, password, street, number,location,"coordinateLatitude","coordinateLength") VALUES ('Paula','Quiriti',27373892942,'pauquiriti@hotmail.com','12345', 'Valencia',5888,'Mar del Plata', 41.40 , 21.17);
 INSERT INTO guards (name, "lastName", cuil, email, password, street, number,location,"coordinateLatitude","coordinateLength") VALUES ('Paul','Jones',2037300942,'paul@hotmail.com','99', 'Tierra del Fuego',1999,'Chubut ', 45.25 , 2.17);
 INSERT INTO guards (name, "lastName", cuil, email, password, street, number,location,"coordinateLatitude","coordinateLength") VALUES ('Alejandro','Quiriti',23407943309,'alequiriti@hotmail.com','1', 'Valencia',5888,'Mar del Plata', 41.40 , 21.17);
 INSERT INTO guards (name, "lastName", cuil, email, password, street, number,location,"coordinateLatitude","coordinateLength") VALUES ('Michael','Jones',2031300942,'micky@hotmail.com','999', 'Tierra del Fuego',1999,'Chubut ', 45.25 , 2.17);
  INSERT INTO guards (name, "lastName", cuil, email, password, street, number,location,"coordinateLatitude","coordinateLength") VALUES ('Gabriela','Quiriti',27388286348,'gabyquiriti@hotmail.com','123456', 'Valencia',5888,'Mar del Plata', 41.40 , 21.17);
 INSERT INTO guards (name, "lastName", cuil, email, password, street, number,location,"coordinateLatitude","coordinateLength") VALUES ('Ben','Jones',2036300942,'ben@hotmail.com','9', 'Tierra del Fuego',1999,'Chubut ', 45.25 , 2.17);

INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate") VALUES (12131311, "la empresa","domicilio 123","2022-01-01","2022-12-01");
INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate") VALUES (12131011, "la empresa 2","domicilio 1234","2022-01-01","2022-12-01");
INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate") VALUES (12131511, "la empresa 3","domicilio 1235","2022-01-01","2022-05-01");

INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal','calle',111,'Mar del PLata ',55.25 , 22.17,1,1);
INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal 2 ','calle',222,'Mar del Plata',55.20 , 22.18,1,1);
INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal de la empresa 2','calle',111,'chubut',55.25 , 22.17,1,2);
INSERT INTO branches (name, street,number,location,"coordinateLatitude","coordinateLength","companyId","provinceId") VALUES ('la sucursal 2 de la empresa 2 ','calle',222,'chubut',55.20 , 22.18,1,2);
 
//Tabla indice 

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
INSERT INTO index_table (tablename,indexname) VALUES ('guards_provinces','guards_provinces_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('inactivities','inactivities_pkey');
INSERT INTO index_table (tablename,indexname) VALUES ('provinces','provinces_pkey');


//QUERY para saber que indeces tenemos en NETGLOBAL
 SELECT  
      tablename,  
      indexname  
  FROM  
      pg_indexes  
  WHERE  
      schemaname = 'public'  
  ORDER BY  
      tablename,  
      indexname; 





