const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'frontend', 'src', 'modules', 'finance', 'pages');

const pages = [
  'Dashboard',
  'accounts/ChartOfAccounts', 'accounts/AccountGroups', 'accounts/Ledgers', 'accounts/JournalEntries', 'accounts/TrialBalance',
  'budgeting/BudgetPlanning', 'budgeting/DepartmentBudgets', 'budgeting/Forecasts', 'budgeting/VarianceAnalysis',
  'revenue/SalesRevenue', 'revenue/CustomerInvoices', 'revenue/CreditNotes', 'revenue/RevenueRecognition',
  'expenses/ExpenseClaims', 'expenses/ExpenseCategories', 'expenses/VendorBills', 'expenses/PurchaseOrders', 'expenses/Reimbursements',
  'payroll/SalaryProcessing', 'payroll/PayrollCostAnalysis', 'payroll/TaxDeductions', 'payroll/BonusManagement',
  'banking/BankAccounts', 'banking/BankReconciliation', 'banking/CashManagement', 'banking/PaymentProcessing',
  'procurement/Vendors', 'procurement/ProcurementPurchaseOrders', 'procurement/GoodsReceipts', 'procurement/VendorPayments',
  'assets/FixedAssets', 'assets/AssetDepreciation', 'assets/AssetRegister',
  'taxation/GST', 'taxation/TDS', 'taxation/VAT', 'taxation/TaxReports', 'taxation/TaxFiling',
  'reports/ProfitAndLoss', 'reports/BalanceSheet', 'reports/CashFlow', 'reports/GeneralLedger', 'reports/ReportsTrialBalance', 'reports/CostCenterReports', 'reports/BudgetReports',
  'analytics/RevenueAnalytics', 'analytics/ExpenseAnalytics', 'analytics/Profitability', 'analytics/DepartmentAnalysis', 'analytics/FinancialKPIs',
  'approvals/PendingApprovals', 'approvals/Approved', 'approvals/Rejected',
  'compliance/AuditReports', 'compliance/FinancialCompliance', 'compliance/InternalControls',
  'settings/FiscalYear', 'settings/Currency', 'settings/ExchangeRates', 'settings/AccountingRules', 'settings/InvoiceTemplates'
];

for (const p of pages) {
  const fullPath = path.join(pagesDir, `${p}.tsx`);
  const componentName = p.split('/').pop();
  const dirName = path.dirname(fullPath);
  
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  const content = `import React from 'react';

export default function ${componentName}() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">${componentName.replace(/([A-Z])/g, ' $1').trim()}</h1>
      {/* TODO: Implement ${componentName} functionality */}
    </div>
  );
}
`;
  
  fs.writeFileSync(fullPath, content);
}

console.log('Finance pages scaffolded successfully.');
