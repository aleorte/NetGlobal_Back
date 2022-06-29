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

 INSERT INTO admins (email,password,"superAdmin", image) VALUES ('admin@admin.com','1234',true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmAZyAY5an-SsWZ3Fmn8Its60O6crAe8_h-w&usqp=CAU');
 INSERT INTO admins (email,password, image) VALUES ('admin2@admin.com','12345', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsTVw6wiRk0YkLWlfHe8WJnTJiI5qsQZeNEA&usqp=CAU');

INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate",logo) VALUES (12131311, 'Havanna','domicilio 123','2022-01-01','2022-12-01' ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1kLfvpglz9ro0HJsI4VoNw3CEGVlrZnXJw&usqp=CAU');
INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate",logo) VALUES (12131011,'Moscuzza','domicilio 1234','2022-01-01','2022-12-01','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5SX2cr-TiW1nODI8mV-_1XMDa5ApmnUNVw&usqp=CAU');
INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate",logo) VALUES (121310011, 'Lucianos','domicilio 1234','2022-01-01','2022-12-01','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMliX-s96Pnop4CDgkDHjxlxjJx24aUK_6A&usqp=CAU');
INSERT INTO companies (cuit, "legalName", "legalAdress", "contractStartDate","contractEndDate",logo) VALUES (12131511, 'Open Sports','domicilio 1235','2022-01-01','2022-05-01','data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQSEhUUEhITFREWFxkWEhUSGBsdERUaGBEWGBUVFRoYHSggGBolGxcXITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGzImICY3LS0tNS0rLS81LS0uLy0tNzAtNS0uLS0tLS8tLS0tLS0tLS0tLS0tLS0tLy0tLS0tLf/AABEIAJYAyAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQcDBAYCAf/EAEgQAAEDAgIDCwcJBgYDAAAAAAEAAgMEERIhBQYxFhdTVGFxkZKT0uIHEyIyQVFyFDSBobGys8HRMzVCQ1JzI4KDosLhFWJj/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAECAwQFBgf/xAA6EQABAgMDCQUGBgMBAAAAAAABAAIDBBEFITESFUFRUpGh0dITFjJhcRRTgaKxwSJCgpLh8AZywiP/2gAMAwEAAhEDEQA/ALxRERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERUpu/ruGHUZ3E3f13DDqM7i0M4w9R4c16PuxN7Td7ulXWipPd/XcMOozuL7u/r+GHUZ3EzjD1HhzTuxN7Td7ulXWipVuvekOFF+SNncXx+vekBtlA542dxT7ezZO7+U7sTe0ze7pV1oqT3f1/DDqM7i+7v67hh1GdxRnGFqPDmndib2m73dKutFSm7+u4YdRncTd/XcMOozuJnGHqPDmndib2m73dKutFSm7+u4YdRncTd/XcMOozuJnGHqPDmndib2m73dKutFSm7+u4YdRncTd/XcMOozuJnGHqPDmndib2m73dKutFSm7+u4YdRncTd/XcMOozuJnGHqPDmndib2m73dKutFSm7+u4YdRncTd/XcMOozuJnGHqPDmndib2m73dKutFSm7+u4YdRncTd/XcMOozuJnGHqPDmndib2m73dKutFSm7+u4YdRncTd/XcMOozuJnGHqPDmndib2m73dKutFSm7+u4YdRncTd/XcMOozuJnGHqPDmndib2m73dKutFSm7+u4YdRncXxM4w9R4c07sTe03e7pXLoiLjL3KKW1f0T8oktchjRd5G3mHKVEqZ1d0qKd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t1uqAcQ8yHZ+k2GMOF9pDg24KjG6SeInxX9B7g5wsM3N2G6sHerbxo9l403qxxo9l41YwZs4ji1Vbalkt8Lho/I7Rh+XRoVaYjyqcGttQQMXmnWAaC+KNzrAWAJc25XX71beNHsvGm9W3jR7LxqBAmhgOI5q0S1rLi0y3g01tcf+VxE2sU7pmTl485GAIyAA1obfCA0C1syvFHpyaIyYXAiS/nA4BzHXNyS05X5V3W9W3jR7LxpvVt40ey8adjNauI5qudLJpk5Qph4HYA12dBvGo34qu6StdFI2RhDXtddptkDzL5NVOc8yE+mTjJ/9r3v0qxd6scaPZeNN6scaPZeNVMtMHFvEc1kzzZtcrtBXDwuw1YLkd11RfF/gYtt/Mx3v774b35VBzTFzi5xu5xJcTtJJuSrK3qxxo9l403qxxo9l41LpeZd4hxHNVh2tZcPwPA9GO6VWSKzd6scaPZeNFj9jj7PEc1lz7Z/vPld0qx0RF3185REREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREX//2Q==');

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







