const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const setQuery = async (query: string, values?: number|string|boolean[]) => {
  try {
    const pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: Number(process.env.PGPORT),
    });

    const res = await pool.query(query, values);
    return res;
  } catch {
    console.log("error!");
  }
};

module.exports = {setQuery};
