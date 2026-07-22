"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seed_1 = require("./seed");
const toUsers = () => seed_1.seedData.users.map(({ passwordSeed, ...user }) => ({
    ...user,
    passwordHash: bcryptjs_1.default.hashSync(passwordSeed, 10),
}));
const clone = (value) => structuredClone(value);
exports.store = {
    ...clone(seed_1.seedData),
    users: toUsers(),
};
