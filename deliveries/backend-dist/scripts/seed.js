"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const seed_1 = require("../data/seed");
const User_1 = __importDefault(require("../models/User"));
const Employee_1 = __importDefault(require("../models/Employee"));
const Payroll_1 = __importDefault(require("../models/Payroll"));
const Performance_1 = __importDefault(require("../models/Performance"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedDatabase = async () => {
    try {
        const userCount = await User_1.default.countDocuments();
        if (userCount > 0) {
            console.log('[SEED] Database already has data. Skipping seed.');
            return;
        }
        console.log('[SEED] Seeding initial data...');
        // Seed Users
        const hashedUsers = seed_1.seedData.users.map(u => ({
            ...u,
            passwordHash: bcryptjs_1.default.hashSync(u.passwordSeed || 'Password@123', 10)
        }));
        await User_1.default.insertMany(hashedUsers);
        console.log(`[SEED] Inserted ${hashedUsers.length} users.`);
        // Seed Employees
        await Employee_1.default.insertMany(seed_1.seedData.employees);
        console.log(`[SEED] Inserted ${seed_1.seedData.employees.length} employees.`);
        // Seed Payroll
        await Payroll_1.default.insertMany(seed_1.seedData.payroll);
        console.log(`[SEED] Inserted ${seed_1.seedData.payroll.length} payroll records.`);
        // Seed Performance
        const performanceWithCycle = seed_1.seedData.performance.map(p => ({
            ...p,
            reviewCycle: 'Q1 2026'
        }));
        await Performance_1.default.insertMany(performanceWithCycle);
        console.log(`[SEED] Inserted ${seed_1.seedData.performance.length} performance records.`);
        console.log('[SEED] Seeding completed successfully.');
    }
    catch (error) {
        console.error('[SEED] Error during seeding:', error);
    }
};
exports.seedDatabase = seedDatabase;
