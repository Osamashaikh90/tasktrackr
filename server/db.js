require("dotenv").config();
const pg = require("pg");

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});
pool.connect((err) => {
  if (err) throw err;
  console.log("connected successfully to PostgreSQL Database");
});
module.exports = pool;
