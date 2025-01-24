import { Client } from "pg";

const pgClient2 = new Client("postgresql://neondb_owner:npg_QIXDdbp2vNO7@ep-white-butterfly-a769wqz2-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require");
const pgClient = new Client({
    user: "neondb_owner",
    password: "npg_QIXDdbp2vNO7",
    port: 5432,
    host: "ep-white-butterfly-a769wqz2-pooler.ap-southeast-2.aws.neon.tech",
    database: "neondb"
})

async function main() {
    await pgClient.connect();
    const response = await pgClient.query("SELECT * FROM users;")
    console.log(response);
}

main();