  import config from "./config";
  import postgres from 'postgres';

  // single connection untuk edge connection (postgres.js)
  export const edgeSql = postgres({
    host: config.env.db.host,
    port: Number(config.env.db.port),
    database: config.env.db.name,
    username: config.env.db.user,
    password: config.env.db.password,
    ssl: false // ubah ke require saat menggunakan db cloud. 
  })