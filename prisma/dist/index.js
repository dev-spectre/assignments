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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(firstName, lastName, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password,
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                },
            });
            console.log("User created");
            console.log(result);
        }
        catch (err) {
            console.error(err);
        }
    });
}
function updateUser(id, newParams) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.user.update({
                data: newParams,
                where: { id },
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    id: true,
                },
            });
            console.log(result);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield insertUser("Carlos", "Sainz", "carlos.sainz@gmail.com", "hashedpass");
        yield updateUser(4, { email: "smmoooothoperaaator@gmail.com" });
    });
}
main();
