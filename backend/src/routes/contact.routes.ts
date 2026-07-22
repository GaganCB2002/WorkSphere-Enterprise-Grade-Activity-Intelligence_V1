import { Router } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message';
import { db } from '../services/db.service';

const router = Router();
const isConnected = () => mongoose.connection.readyState === 1;

// Send a message
router.post('/send', async (req, res) => {
  try {
    const { username, email, subject, message } = req.body;
    if (!isConnected()) {
      await db.update((data) => {
        data.contactMessages = data.contactMessages || [];
        data.contactMessages.push({
          id: `msg-${Date.now()}`,
          username,
          email,
          subject,
          message,
          status: 'new',
          createdAt: new Date().toISOString()
        });
      });
      return res.status(201).json({ success: true, message: 'Message sent successfully (Local Mode)' });
    }
    const newMessage = new Message({
      username,
      email,
      subject,
      message
    });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

// Get all messages (for admin)
router.get('/all', async (req, res) => {
  try {
    if (!isConnected()) {
      const messages = (db.get().contactMessages || []).slice().sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json(messages);
    }
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// Update message status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!isConnected()) {
      await db.update((data) => {
        data.contactMessages = data.contactMessages || [];
        const msg = data.contactMessages.find((m: any) => m.id === req.params.id);
        if (msg) {
          msg.status = status;
        }
      });
      return res.json({ success: true, message: 'Status updated (Local Mode)' });
    }
    await Message.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

export default router;
