"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payrollService = void 0;
const activity_service_1 = require("./activity.service");
const server_1 = require("../server");
const Payroll_1 = __importDefault(require("../models/Payroll"));
exports.payrollService = {
    calculateNet(breakdown) {
        const gross = breakdown.basic + breakdown.hra + breakdown.specialAllowance + breakdown.bonus;
        // Standard Indian Payroll rules (simplified)
        const pf = Math.min(breakdown.basic * 0.12, 1800);
        const esi = gross < 21000 ? gross * 0.0075 : 0;
        // Simple Tax Slab (simplified)
        const annualGross = gross * 12;
        let annualTax = 0;
        if (annualGross > 1500000)
            annualTax = (annualGross - 1500000) * 0.3 + 187500;
        else if (annualGross > 1200000)
            annualTax = (annualGross - 1200000) * 0.2 + 127500;
        else if (annualGross > 900000)
            annualTax = (annualGross - 900000) * 0.15 + 82500;
        else if (annualGross > 600000)
            annualTax = (annualGross - 600000) * 0.1 + 52500;
        const tds = Math.round(annualTax / 12);
        const net = gross - pf - esi - tds + (breakdown.reimbursements || 0);
        return {
            ...breakdown,
            pf,
            esi,
            tds,
            net
        };
    },
    async updateSalary(employeeId, updates) {
        const record = await Payroll_1.default.findOne({ employeeId });
        if (!record)
            return null;
        const newBreakdown = this.calculateNet({
            ...record.breakdown,
            ...updates
        });
        record.breakdown = newBreakdown;
        await record.save();
        activity_service_1.activityService.log({
            title: 'Payroll Updated',
            detail: `Salary structure updated for ${record.employeeName}`,
            category: 'Payroll',
            actor: 'HR Admin'
        });
        server_1.io.emit('payroll_updated', record);
        return record;
    },
    async processBatch(month) {
        await Payroll_1.default.updateMany({ month }, { bankStatus: 'Processed' });
        activity_service_1.activityService.log({
            title: 'Payroll Processed',
            detail: `Monthly payroll batch for ${month} has been synced with the bank.`,
            category: 'Payroll',
            actor: 'System'
        });
        server_1.io.emit('payroll_batch_processed', month);
    }
};
