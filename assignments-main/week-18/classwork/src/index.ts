import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();


async function createUser() {
    await client.user.create({
        data: {
            username: "Nilesh",
            password: "09",
            age: 24,
            city: "Mumbai"
        }
    })
}

createUser();
