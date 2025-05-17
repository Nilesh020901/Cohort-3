const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
});

async function main() {
    try {
        await pool.connect()
        console.log("Connected to DB");
    } catch (error) {
        console.error("Connection DB error", error);
    }
}

main();

module.exports = pool;