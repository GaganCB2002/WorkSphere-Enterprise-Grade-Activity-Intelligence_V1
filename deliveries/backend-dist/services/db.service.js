"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const store_1 = require("../data/store");
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/worksphere';
const DB_PATH = path_1.default.join(__dirname, '../../data/db.json');
// Models are now defined in src/models
class DBService {
    constructor() {
        this.useMongo = false;
        this.localData = this.loadLocal();
        this.connect();
    }
    async connect() {
        try {
            await mongoose_1.default.connect(MONGO_URI);
            this.useMongo = true;
            console.log('Premium Database (MongoDB) Connected Successfully.');
        }
        catch (err) {
            console.warn('MongoDB connection failed, falling back to Local high-performance JSON store.', err);
            this.useMongo = false;
        }
    }
    loadLocal() {
        if (fs_1.default.existsSync(DB_PATH)) {
            try {
                const raw = fs_1.default.readFileSync(DB_PATH, 'utf-8');
                return JSON.parse(raw);
            }
            catch (err) {
                return store_1.store;
            }
        }
        return store_1.store;
    }
    persistLocal(data) {
        try {
            fs_1.default.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (err) {
            console.error('Failed to persist local DB', err);
        }
    }
    get() {
        return this.localData;
    }
    async update(updater) {
        updater(this.localData);
        this.persistLocal(this.localData);
        // In a real scenario, we would also update MongoDB here
    }
    save() {
        this.persistLocal(this.localData);
    }
}
exports.db = new DBService();
