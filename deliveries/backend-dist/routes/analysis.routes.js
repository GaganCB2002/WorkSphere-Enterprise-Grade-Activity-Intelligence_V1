"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("../middleware/auth");
const db_service_1 = require("../services/db.service");
const router = (0, express_1.Router)();
const README_PATH = path_1.default.join(__dirname, '../../web-page/techlead-analysis/README.md');
// Read README.md content
router.get('/readme', auth_1.authenticate, (req, res) => {
    try {
        if (fs_1.default.existsSync(README_PATH)) {
            const content = fs_1.default.readFileSync(README_PATH, 'utf-8');
            res.json({ content });
        }
        else {
            res.status(404).json({ message: 'README.md not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error reading file.' });
    }
});
// Get analysis records
router.get('/records', auth_1.authenticate, (req, res) => {
    const data = db_service_1.db.get().analysis || [];
    res.json(data);
});
// Create/Update analysis and sync README
router.post('/records', auth_1.authenticate, (req, res) => {
    const { title, developer, status, timeSpent, quality } = req.body;
    if (!title || !developer) {
        res.status(400).json({ message: 'Missing required fields.' });
        return;
    }
    const newRecord = {
        id: `anl-${Date.now()}`,
        title,
        developer,
        status,
        timeSpent,
        quality,
        timestamp: new Date().toISOString()
    };
    db_service_1.db.update((current) => {
        if (!current.analysis)
            current.analysis = [];
        current.analysis.unshift(newRecord);
    });
    // Dynamic README update logic
    try {
        let readmeContent = fs_1.default.readFileSync(README_PATH, 'utf-8');
        // Find the Task Performance table section and append
        const tableHeader = '| Task ID | Developer | Status | Time Spent | Quality |';
        const newRow = `| ${newRecord.id} | ${developer} | ${status} | ${timeSpent} | ${quality} |`;
        if (readmeContent.includes(tableHeader)) {
            const lines = readmeContent.split('\n');
            const tableIndex = lines.findIndex(line => line.includes(tableHeader));
            // Add after the header and separator
            lines.splice(tableIndex + 2, 0, newRow);
            readmeContent = lines.join('\n');
        }
        fs_1.default.writeFileSync(README_PATH, readmeContent, 'utf-8');
    }
    catch (error) {
        console.error('Failed to sync README:', error);
    }
    res.json(newRecord);
});
exports.default = router;
