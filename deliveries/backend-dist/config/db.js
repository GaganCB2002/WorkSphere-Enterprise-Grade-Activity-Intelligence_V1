"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/worksphere', {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`[DATABASE] MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.warn(`[DATABASE] MongoDB connection failed: ${error.message}. Continuing in limited mode.`);
    }
};
exports.default = connectDB;
