import {
	DATABASE_NAME as database,
	DATABASE_HOST as host,
	DATABASE_PASSWORD as password,
	DATABASE_USER as user
  } from 'config'                   // load DB credentials from config
  import { createPool } from 'mysql2'
  
  const charset = 'utf8'            // use UTF-8 encoding for connections
  
  // build pool config object
  const config = { host, user, password, database, charset }
  
  const pool = createPool(config).promise()  // create a promise-based MySQL pool
  
  export default pool            // export pool for querying elsewhere
  