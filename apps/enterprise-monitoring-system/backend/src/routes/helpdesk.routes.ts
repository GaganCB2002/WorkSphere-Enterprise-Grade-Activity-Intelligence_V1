import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

let tickets = [
  {
    id: 'tkt-101',
    _id: 'tkt-101',
    title: 'VPN Connection drops during daily standup',
    category: 'Network',
    priority: 'High',
    severity: 'High',
    status: 'Open',
    createdBy: { name: 'David Miller', email: 'david.m@worksphere.com' },
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'tkt-102',
    _id: 'tkt-102',
    title: 'Requesting IntelliJ IDEA Ultimate license renewal',
    category: 'Software',
    priority: 'Medium',
    severity: 'Medium',
    status: 'In_Progress',
    createdBy: { name: 'Sarah Jenkins', email: 'sarah.j@worksphere.com' },
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'tkt-103',
    _id: 'tkt-103',
    title: 'MacBook Pro M3 battery replacement required',
    category: 'Hardware',
    priority: 'Critical',
    severity: 'Critical',
    status: 'Resolved',
    createdBy: { name: 'Alex Rivera', email: 'alex.r@worksphere.com' },
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

router.get('/tickets', authenticate, (req, res) => {
  res.json({ tickets });
});

router.post('/tickets', authenticate, (req, res) => {
  const { title, category, priority } = req.body;
  const newTicket = {
    id: `tkt-${Date.now()}`,
    _id: `tkt-${Date.now()}`,
    title: title || 'New Helpdesk Ticket',
    category: category || 'General',
    priority: priority || 'Medium',
    severity: priority || 'Medium',
    status: 'Open',
    createdBy: { name: req.auth?.email?.split('@')[0] || 'Employee', email: req.auth?.email || 'employee@worksphere.com' },
    createdAt: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
  tickets.unshift(newTicket);
  res.status(201).json({ success: true, ticket: newTicket });
});

export default router;
