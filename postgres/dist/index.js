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
const CLIENT_CONFIG = {
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "password",
};
function createUsersDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client(CLIENT_CONFIG);
        try {
            yield client.connect();
            yield client.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );`);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            yield client.end();
        }
    });
}
function insertIntoUsers(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client(CLIENT_CONFIG);
        const values = [username, email, password];
        const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        try {
            yield client.connect();
            const result = yield client.query(query, values);
            console.log(`User inserted, new row count: ${result.rowCount}`);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function fetchUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client(CLIENT_CONFIG);
        const values = [email];
        const query = `
    SELECT id, username, email, created_at FROM users
    WHERE email = $1
    `;
        try {
            yield client.connect();
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log(result.rows.at(0));
            }
            else {
                console.log("User doesn't exists");
            }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function dropUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client(CLIENT_CONFIG);
        try {
            yield client.connect();
            yield client.query("DROP TABLE users");
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dropUsers();
        yield createUsersDatabase();
        yield insertIntoUsers("Abhishek Dallas", "abhishekdallasalpy@gmail.com", "hashedpassword");
        yield fetchUser("abhishekdallasalpy@gmail.com");
    });
}
main();
