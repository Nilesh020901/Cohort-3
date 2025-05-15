const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
.then(() => console.log("Connected to DB"))
.catch((error) => console.error("Connection DB error", error));

module.exports = pool;