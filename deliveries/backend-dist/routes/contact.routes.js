"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Message_1 = __importDefault(require("../models/Message"));
const router = (0, express_1.Router)();
// Send a message
router.post('/send', async (req, res) => {
    try {
        const { username, email, subject, message } = req.body;
        const newMessage = new Message_1.default({
            username,
            email,
            subject,
            message
        });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message sent successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});
// Get all messages (for admin)
router.get('/all', async (req, res) => {
    try {
        const messages = await Message_1.default.find().sort({ createdAt: -1 });
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch messages' });
    }
});
// Update message status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await Message_1.default.findByIdAndUpdate(req.params.id, { status });
        res.json({ success: true, message: 'Status updated' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update status' });
    }
});
exports.default = router;
