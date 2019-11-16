import * as dotenv from 'dotenv';
const envConfig = dotenv.config()
if (envConfig.error) {
  console.log('envConfig.error ', envConfig.error);
}

export const dbSetting = {
  host: envConfig.parsed.HOST,
  port: envConfig.parsed.PORT,
  database: envConfig.parsed.DB_NAME,
  user: envConfig.parsed.USER,
  password: envConfig.parsed.PASSWORD,
  keepAlive: envConfig.parsed.KEEP_ALIVE
};
import { Pool } from "pg";
const pool = new Pool(this.dbSetting);

export const dbPool = {
  query: text => pool.query(text),
  pool: pool
};

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", err => {
  console.error('Unexpected error on idle client "DATABASE" class: ', err);
  process.exit(-1);
});


