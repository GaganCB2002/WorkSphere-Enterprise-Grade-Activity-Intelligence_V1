"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const auth_service_1 = require("../services/auth.service");
const hr_service_1 = require("../services/hr.service");
const allocation_service_1 = require("../services/allocation.service");
const chat_service_1 = require("../services/chat.service");
const payroll_service_1 = require("../services/payroll.service");
const ai_service_1 = require("../services/ai.service");
const mail_service_1 = require("../services/mail.service");
const db_service_1 = require("../services/db.service");
const router = (0, express_1.Router)();
router.get('/events', (req, res) => {
    const token = typeof req.query.token === 'string' ? req.query.token : null;
    if (!token) {
        res.status(401).json({ message: 'Authentication required.' });
        return;
    }
    try {
        auth_service_1.authService.verify(token);
    }
    catch {
        res.status(401).json({ message: 'Invalid or expired token.' });
        return;
    }
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });
    const emit = () => {
        const list = hr_service_1.hrService.getActivity();
        const item = list[Math.floor(Math.random() * list.length)];
        res.write(`data: ${JSON.stringify(item)}\n\n`);
    };
    emit();
    const interval = setInterval(emit, 12000);
    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
});
// Health & Public Stats
router.get('/stats', (req, res) => {
    const store = db_service_1.db.get();
    res.json({
        totalEmployees: store.employees.length,
        activeRecruitments: store.candidates.filter(c => c.stage !== 'Selected' && c.stage !== 'Rejected').length,
        onboardingCount: store.onboarding.filter(o => o.status !== 'Completed').length
    });
});
router.use(auth_1.authenticate);
// Platform & Dashboard
router.get('/platform', async (req, res) => {
    try {
        const data = await hr_service_1.hrService.getPlatform(req.auth.role);
        res.json(data);
    }
    catch (err) {
        console.error('[PLATFORM ERROR]:', err);
        res.status(500).json({ message: err.message, stack: err.stack });
    }
});
router.get('/dashboard', async (req, res) => {
    try {
        const data = await hr_service_1.hrService.getDashboard(req.auth.role);
        res.json(data);
    }
    catch (err) {
        console.error('[DASHBOARD ERROR]:', err);
        res.status(500).json({ message: err.message, stack: err.stack });
    }
});
router.get('/activity', async (req, res) => {
    try {
        const data = await hr_service_1.hrService.getActivity();
        res.json(data);
    }
    catch (err) {
        console.error('[ACTIVITY ERROR]:', err);
        res.status(500).json({ message: err.message, stack: err.stack });
    }
});
router.patch('/me', async (req, res) => {
    const parsed = zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
    }).safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid profile data' });
        return;
    }
    try {
        const result = await auth_service_1.authService.updateUser(req.auth.sub, parsed.data);
        result ? res.json(result) : res.status(404).json({ message: 'User not found' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Recruitment
router.get('/recruitment', (0, auth_1.authorize)('CEO', 'HR', 'Manager', 'Lead'), async (req, res) => {
    try {
        const data = await hr_service_1.hrService.getRecruitment();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.patch('/recruitment/candidates/:candidateId', (0, auth_1.authorize)('CEO', 'HR', 'Manager'), async (req, res) => {
    const parsed = zod_1.z.object({ stage: zod_1.z.string() }).safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid stage.' });
        return;
    }
    try {
        const result = await hr_service_1.hrService.updateCandidateStage(String(req.params.candidateId), parsed.data.stage);
        result ? res.json(result) : res.status(404).json({ message: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// People & Hierarchy
router.get('/employees', (0, auth_1.authorize)('CEO', 'HR', 'Manager', 'Lead'), async (req, res) => {
    try {
        const data = await hr_service_1.hrService.getEmployees();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/hierarchy/root', async (req, res) => {
    try {
        const data = await hr_service_1.hrService.getHierarchyRoot();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/hierarchy/:employeeId/children', async (req, res) => {
    try {
        const data = await hr_service_1.hrService.getHierarchyChildren(req.params.employeeId);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Attendance & Leaves
router.get('/attendance', (0, auth_1.authorize)('CEO', 'HR', 'Manager', 'Lead'), async (req, res) => {
    try {
        const data = await hr_service_1.hrService.getAttendance();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/attendance/leave-requests', async (req, res) => {
    const parsed = zod_1.z.object({
        employeeId: zod_1.z.string(),
        employeeName: zod_1.z.string(),
        type: zod_1.z.enum(['Annual Leave', 'Sick Leave', 'WFH', 'Comp Off']),
        from: zod_1.z.string(),
        to: zod_1.z.string(),
        reason: zod_1.z.string().min(3)
    }).safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: 'Invalid payload' });
    try {
        const result = await hr_service_1.hrService.createLeaveRequest(parsed.data);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/ai/leave-suggestion', (req, res) => {
    const { employeeId, from, to } = req.query;
    res.json({ suggestion: ai_service_1.aiService.suggestLeaveApproval({ employeeId, from, to }) });
});
// Resource Allocation
router.get('/allocation', (0, auth_1.authorize)('CEO', 'HR', 'Manager', 'Lead'), (req, res) => res.json(allocation_service_1.allocationService.getAll()));
router.post('/allocation', (0, auth_1.authorize)('CEO', 'HR', 'Manager'), (req, res) => {
    const parsed = zod_1.z.object({
        employeeId: zod_1.z.string(),
        employeeName: zod_1.z.string(),
        projectId: zod_1.z.string(),
        projectName: zod_1.z.string(),
        hoursPerWeek: zod_1.z.number(),
        role: zod_1.z.string(),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string()
    }).safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid allocation data' });
        return;
    }
    res.status(201).json(allocation_service_1.allocationService.create(parsed.data));
});
// Asset Management
router.get('/assets', (0, auth_1.authorize)('CEO', 'HR', 'Manager', 'Lead'), (req, res) => res.json(allocation_service_1.allocationService.getAssets()));
router.get('/assets/allocations', (0, auth_1.authorize)('CEO', 'HR', 'Manager', 'Lead'), (req, res) => res.json(allocation_service_1.allocationService.getAssetAllocations()));
router.post('/assets', (0, auth_1.authorize)('CEO', 'HR'), (req, res) => {
    const parsed = zod_1.z.object({
        name: zod_1.z.string(),
        type: zod_1.z.enum(['Hardware', 'Identification', 'Peripheral', 'Other']),
        status: zod_1.z.enum(['Available', 'Allocated', 'Maintenance']),
        condition: zod_1.z.enum(['New', 'Good', 'Fair', 'Poor'])
    }).safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid asset data' });
        return;
    }
    res.status(201).json(allocation_service_1.allocationService.addAsset(parsed.data));
});
router.post('/assets/allocate', (0, auth_1.authorize)('CEO', 'HR'), (req, res) => {
    const parsed = zod_1.z.object({
        assetId: zod_1.z.string(),
        assetName: zod_1.z.string(),
        employeeId: zod_1.z.string(),
        employeeName: zod_1.z.string(),
        expectedDuration: zod_1.z.string().optional()
    }).safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid allocation payload' });
        return;
    }
    res.status(201).json(allocation_service_1.allocationService.allocateAsset(parsed.data));
});
router.post('/assets/revoke/:id', (0, auth_1.authorize)('CEO', 'HR'), (req, res) => {
    allocation_service_1.allocationService.revokeAsset(String(req.params.id));
    res.status(204).end();
});
// Chat
router.get('/chat/messages', (req, res) => {
    const { otherId, groupId } = req.query;
    res.json(chat_service_1.chatService.getMessages(req.auth.sub, otherId, groupId));
});
router.post('/chat/messages', (req, res) => {
    const parsed = zod_1.z.object({
        receiverId: zod_1.z.string().optional(),
        groupId: zod_1.z.string().optional(),
        content: zod_1.z.string(),
        type: zod_1.z.enum(['text', 'image', 'file']),
        fileUrl: zod_1.z.string().optional()
    }).safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid message' });
        return;
    }
    res.status(201).json(chat_service_1.chatService.sendMessage({ ...parsed.data, senderId: req.auth.sub, senderName: req.auth.email }));
});
// Email
router.get('/mail/inbox', (req, res) => res.json(mail_service_1.mailService.getInbox(req.auth.sub)));
router.post('/mail/send', (req, res) => {
    const parsed = zod_1.z.object({
        receiverId: zod_1.z.string(),
        subject: zod_1.z.string(),
        body: zod_1.z.string()
    }).safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: 'Invalid email payload' });
        return;
    }
    res.status(201).json(mail_service_1.mailService.sendMail({
        ...parsed.data,
        senderId: req.auth.sub,
        senderName: req.auth.email
    }));
});
// Payroll
router.get('/payroll', (0, auth_1.authorize)('CEO', 'HR', 'Manager'), async (_req, res) => {
    try {
        const data = await hr_service_1.hrService.getPayroll();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.patch('/payroll/:employeeId', (0, auth_1.authorize)('CEO', 'HR'), async (req, res) => {
    try {
        const result = await payroll_service_1.payrollService.updateSalary(String(req.params.employeeId), req.body);
        result ? res.json(result) : res.status(404).json({ message: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/payroll/process', (0, auth_1.authorize)('CEO', 'HR'), async (req, res) => {
    try {
        await payroll_service_1.payrollService.processBatch(req.body.month);
        res.status(204).end();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Generic Modules
router.get('/performance', (0, auth_1.authorize)('CEO', 'HR', 'Manager', 'Lead'), async (_req, res) => {
    try {
        const Performance = (await Promise.resolve().then(() => __importStar(require('../models/Performance')))).default;
        const data = await Performance.find();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/projects', (0, auth_1.authorize)('CEO', 'HR', 'Manager', 'Lead'), async (_req, res) => {
    try {
        const data = await hr_service_1.hrService.getProjects();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/analytics', (0, auth_1.authorize)('CEO', 'HR', 'Manager', 'Lead'), async (_req, res) => {
    try {
        const data = await hr_service_1.hrService.getAnalytics();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.default = router;
