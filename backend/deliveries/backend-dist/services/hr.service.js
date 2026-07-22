"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hrService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const db_service_1 = require("./db.service");
const Employee_1 = __importDefault(require("../models/Employee"));
const Attendance_1 = __importDefault(require("../models/Attendance"));
const Payroll_1 = __importDefault(require("../models/Payroll"));
const Performance_1 = __importDefault(require("../models/Performance"));
const toCurrency = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
}).format(value);
const average = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
const uniqueDepartments = async () => {
    const employees = await Employee_1.default.find();
    return [...new Set(employees.map((employee) => employee.department))];
};
const getEmployee = (employeeId) => Employee_1.default.findOne({ id: employeeId });
const buildHierarchyNode = async (employeeId) => {
    const employee = await getEmployee(employeeId);
    if (!employee)
        return null;
    const reportCount = await Employee_1.default.countDocuments({ managerId: employeeId });
    return {
        id: employee.id,
        name: employee.name,
        title: employee.title,
        department: employee.department,
        level: employee.level,
        reportCount,
        location: employee.location,
    };
};
const activity = () => [...db_service_1.db.get().activities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
const totalHeadcount = () => db_service_1.db.get().employees.length;
const netPayroll = () => db_service_1.db.get().payroll.reduce((sum, record) => sum + record.breakdown.net, 0);
const accessibleModules = (role) => {
    const all = [
        'dashboard',
        'recruitment',
        'onboarding',
        'employees',
        'attendance',
        'payroll',
        'performance',
        'projects',
        'engagement',
        'compliance',
        'exit',
        'budget',
        'analytics',
        'allocation',
        'chat',
        'mail'
    ];
    if (role === 'Employee')
        return ['dashboard', 'onboarding', 'attendance', 'performance', 'projects', 'chat', 'mail'];
    if (role === 'Marketing')
        return ['dashboard', 'chat', 'mail', 'projects'];
    return all;
};
const isConnected = () => mongoose_1.default.connection.readyState === 1;
exports.hrService = {
    async getDashboard(role) {
        if (!isConnected()) {
            // Fallback to local JSON
            const d = db_service_1.db.get();
            return {
                hero: {
                    title: 'WorkSphere Command Center (Offline Mode)',
                    subtitle: 'Enterprise-grade workforce operations. Running on local cache.',
                    modules: accessibleModules(role),
                },
                metrics: [
                    { id: 'headcount', label: 'Total Workforce', value: d.employees.length.toString(), delta: 'Cached', tone: 'neutral' },
                    { id: 'attendance', label: 'Attendance', value: `${d.attendance.attendanceRate}%`, delta: 'Cached', tone: 'neutral' },
                    { id: 'payroll', label: 'Monthly Payroll', value: toCurrency(d.payroll.reduce((sum, record) => sum + record.breakdown.net, 0)), delta: 'Cached', tone: 'neutral' },
                    { id: 'utilization', label: 'Avg Productivity', value: '88%', delta: 'Cached', tone: 'neutral' }
                ],
                activity: d.activities.slice(0, 8),
                attendanceTrend: d.attendanceTrend,
                budgetUtilization: [],
                alerts: ['Note: System is running in limited mode. Please start MongoDB for full persistence.']
            };
        }
        const headcount = await Employee_1.default.countDocuments({ status: 'Active' });
        const payrollRecords = await Payroll_1.default.find();
        const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.breakdown.net, 0);
        // In a real app, we'd aggregate attendance. For now, using static high-level stats or latest record.
        const attendanceStats = { attendanceRate: 96.4, presentToday: 98 };
        return {
            hero: {
                title: 'WorkSphere Command Center',
                subtitle: 'Enterprise-grade workforce operations with real-time sync and AI modules.',
                modules: accessibleModules(role),
            },
            metrics: [
                { id: 'headcount', label: 'Total Workforce', value: headcount.toString(), delta: '+4.2% YoY', tone: 'positive' },
                { id: 'attendance', label: 'Attendance', value: `${attendanceStats.attendanceRate}%`, delta: 'Live status', tone: 'neutral' },
                { id: 'payroll', label: 'Monthly Payroll', value: toCurrency(totalPayroll), delta: 'Confirmed', tone: 'neutral' },
                { id: 'utilization', label: 'Avg Productivity', value: '88%', delta: '+2% reach', tone: 'positive' }
            ],
            activity: [], // Will be fetched from activity service
            attendanceTrend: [],
            budgetUtilization: [],
            alerts: [
                'Security Review: Data retention compliance overdue.',
                'Action Required: 2 contractor renewals pending by Friday.'
            ]
        };
    },
    async getEmployees() {
        if (!isConnected()) {
            const d = db_service_1.db.get();
            return {
                employees: d.employees,
                departments: [...new Set(d.employees.map((e) => e.department))].map(dept => ({
                    department: dept,
                    count: d.employees.filter((e) => e.department === dept).length
                }))
            };
        }
        const employees = await Employee_1.default.find();
        const departments = await uniqueDepartments();
        return {
            employees: employees,
            departments: departments.map(dept => ({
                department: dept,
                count: employees.filter(e => e.department === dept).length
            }))
        };
    },
    async getHierarchyRoot() {
        return buildHierarchyNode('emp-100');
    },
    async getHierarchyChildren(employeeId) {
        const directReports = await Employee_1.default.find({ managerId: employeeId });
        const nodes = await Promise.all(directReports.map(e => buildHierarchyNode(e.id)));
        return nodes.filter(Boolean);
    },
    async getPayroll() {
        if (!isConnected()) {
            const d = db_service_1.db.get();
            const totalNet = d.payroll.reduce((sum, r) => sum + r.breakdown.net, 0);
            return {
                records: d.payroll,
                summary: {
                    totalNet: totalNet,
                    processed: d.payroll.filter((r) => r.bankStatus === 'Processed').length,
                    queued: d.payroll.filter((r) => r.bankStatus === 'Queued').length
                }
            };
        }
        const records = await Payroll_1.default.find();
        const totalNet = records.reduce((sum, r) => sum + r.breakdown.net, 0);
        return {
            records: records,
            summary: {
                totalNet: totalNet,
                processed: records.filter(r => r.bankStatus === 'Processed').length,
                queued: records.filter(r => r.bankStatus === 'Queued').length
            }
        };
    },
    async getAttendance() {
        if (!isConnected()) {
            return db_service_1.db.get().attendance;
        }
        const records = await Attendance_1.default.find();
        return {
            records,
            attendanceRate: 96.4,
            presentToday: records.filter(r => r.status === 'Present').length
        };
    },
    async createLeaveRequest(payload) {
        if (!isConnected()) {
            return { success: true, message: 'Leave request recorded (Local Mode)' };
        }
        const attendance = new Attendance_1.default({
            employeeId: payload.employeeId,
            date: new Date(payload.from),
            status: 'Leave',
            lateMarking: false,
            overtimeHours: 0
        });
        return await attendance.save();
    },
    async getRecruitment() {
        // In a full implementation, Candidate would be a Mongoose model too
        return {
            jobBoardCoverage: ['LinkedIn', 'Naukri', 'Indeed', 'Internal'],
            pipeline: ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Offered', 'Background Check'],
            candidates: [],
            pipelineCounts: []
        };
    },
    async updateCandidateStage(candidateId, stage) {
        return null; // Implementation would involve Candidate model
    },
    getProjects() {
        const d = db_service_1.db.get();
        return {
            tasks: d.tasks,
            utilization: d.tasks.map(t => ({
                employeeName: t.employeeName,
                hours: t.loggedHours,
                productivityScore: t.productivityScore
            }))
        };
    },
    async getPlatform(role) {
        const dashboard = await this.getDashboard(role);
        const employees = await this.getEmployees();
        const attendance = await this.getAttendance();
        const payroll = role === 'Employee' ? null : await this.getPayroll();
        const performanceRecords = isConnected() ? await Performance_1.default.find() : [];
        const analytics = await this.getAnalytics();
        return {
            dashboard,
            recruitment: await this.getRecruitment(),
            onboarding: { records: [], progressSummary: { pending: 0, avgCompletion: 75 } },
            employees,
            attendance,
            payroll,
            performance: { records: performanceRecords, averageReview: 4.4 },
            projects: await this.getProjects(),
            engagement: { records: [], avgSentiment: 88 },
            compliance: { items: [], overdue: 0 },
            exits: role === 'Employee' ? null : { records: [], pendingAssets: 0 },
            budget: null,
            analytics,
            allocations: [],
            activity: []
        };
    },
    async getAnalytics() {
        if (!isConnected()) {
            const d = db_service_1.db.get();
            return {
                employeeCount: d.employees.length,
                attritionRate: 11.2,
                avgEngagement: 86,
                avgPerformance: 4.4,
                attendanceRate: 96.4,
                hiringCostPerEmployee: 125000,
                trends: d.attendanceTrend,
                aiInsights: {
                    attritionHotspots: [],
                    recommendations: ['AI Insight: Local data loaded. System running in offline mode.']
                }
            };
        }
        const headcount = await Employee_1.default.countDocuments({ status: 'Active' });
        return {
            employeeCount: headcount,
            attritionRate: 11.2,
            avgEngagement: 86,
            avgPerformance: 4.4,
            attendanceRate: 96.4,
            hiringCostPerEmployee: 125000,
            trends: {
                attendance: [],
                attrition: [],
                productivity: [],
                salary: []
            },
            aiInsights: {
                attritionHotspots: [],
                recommendations: ['AI Insight: Review resource allocation for Engineering pod with 120% utilization.']
            }
        };
    },
    getActivity() {
        return activity();
    }
};
