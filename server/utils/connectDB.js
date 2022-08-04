const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async (query, values) => {
  try {
    const pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: Number(process.env.PGPORT),
    });

    await pool.connect();
    const res = await pool.query(query, values);
    // await pool.end();
    return res;
  } catch {
    console.log("error!");
  }
};

module.exports = connectDB;
