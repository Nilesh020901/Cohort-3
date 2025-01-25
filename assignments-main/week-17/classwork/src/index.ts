import { Client } from "pg";

const pgClient = new Client("postgresql://neondb_owner:npg_IgksXPbn8G6v@ep-shrill-salad-a5vzujv0-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require")

async function main() {
    try {
        await pgClient.connect();
        const response = await pgClient.query("UPDATE users SET username='Nilesh' WHERE id=2");
        console.log(response.rows); // `.rows` contains the result
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
        await pgClient.end(); // Always close the connection after usage
    }
}

main();
