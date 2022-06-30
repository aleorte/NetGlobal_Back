# netglobal_back

PORT:3001
QUERY para saber que indeces tenemos en NETGLOBAL: 
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

//PASSWORD DEL SUPERADMIN es Kobe (primera en mayusc.)
//PASSWORD DE POLLY ADMIN es "peaky blinders"