"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pgClient = new pg_1.Client("postgresql://neondb_owner:npg_IgksXPbn8G6v@ep-shrill-salad-a5vzujv0-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pgClient.connect();
            const response = yield pgClient.query("UPDATE users SET username='Nilesh' WHERE id=2");
            console.log(response.rows); // `.rows` contains the result
        }
        catch (error) {
            console.error("Error executing query:", error);
        }
        finally {
            yield pgClient.end(); // Always close the connection after usage
        }
    });
}
main();
