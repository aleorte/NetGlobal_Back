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