"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
class PrismaService {
    constructor() {
        this.client = new client_1.PrismaClient();
    }
    get() {
        return this.client;
    }
    async disconnect() {
        await this.client.$disconnect();
    }
}
exports.prisma = new PrismaService().get();
exports.default = exports.prisma;
