
import {Pool} from "pg";
import config from "./config";

// pool connection (node-postgres)
export const pool = new Pool({
  user: config.env.db.user,
  host: config.env.db.host,
  database: config.env.db.name,
  password: config.env.db.password,
  port: Number(config.env.db.port)
})

export const query = async (text:string,params:any[]) => {
  const client = await pool.connect();
  try {
    const res = await client.query(text,params);
    return res
  } catch (error) {
    console.log("database query error : " + error);
    return null
  }finally{
    client.release()
  }
} 