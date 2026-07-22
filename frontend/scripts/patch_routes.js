const fs = require('fs');
const path = require('path');

const appRoutesPath = path.join(__dirname, '..', 'frontend', 'src', 'routes', 'AppRoutes.jsx');
let content = fs.readFileSync(appRoutesPath, 'utf8');

const pages = [
  { path: 'dashboard', component: 'Dashboard' },
  { path: 'accounts/chart', component: 'ChartOfAccounts' },
  { path: 'accounts/groups', component: 'AccountGroups' },
  { path: 'accounts/ledgers', component: 'Ledgers' },
  { path: 'accounts/journals', component: 'JournalEntries' },
  { path: 'accounts/trial-balance', component: 'TrialBalance' },
  { path: 'budgeting/planning', component: 'BudgetPlanning' },
  { path: 'budgeting/departments', component: 'DepartmentBudgets' },
  { path: 'budgeting/forecasts', component: 'Forecasts' },
  { path: 'budgeting/variance', component: 'VarianceAnalysis' },
  { path: 'revenue/sales', component: 'SalesRevenue' },
  { path: 'revenue/invoices', component: 'CustomerInvoices' },
  { path: 'revenue/credit-notes', component: 'CreditNotes' },
  { path: 'revenue/recognition', component: 'RevenueRecognition' },
  { path: 'expenses/claims', component: 'ExpenseClaims' },
  { path: 'expenses/categories', component: 'ExpenseCategories' },
  { path: 'expenses/vendor-bills', component: 'VendorBills' },
  { path: 'expenses/purchase-orders', component: 'PurchaseOrders' },
  { path: 'expenses/reimbursements', component: 'Reimbursements' },
  { path: 'payroll/salary', component: 'SalaryProcessing' },
  { path: 'payroll/cost-analysis', component: 'PayrollCostAnalysis' },
  { path: 'payroll/tax', component: 'TaxDeductions' },
  { path: 'payroll/bonus', component: 'BonusManagement' },
  { path: 'banking/accounts', component: 'BankAccounts' },
  { path: 'banking/reconciliation', component: 'BankReconciliation' },
  { path: 'banking/cash', component: 'CashManagement' },
  { path: 'banking/payments', component: 'PaymentProcessing' },
  { path: 'procurement/vendors', component: 'Vendors' },
  { path: 'procurement/orders', component: 'ProcurementPurchaseOrders' },
  { path: 'procurement/receipts', component: 'GoodsReceipts' },
  { path: 'procurement/payments', component: 'VendorPayments' },
  { path: 'assets/fixed', component: 'FixedAssets' },
  { path: 'assets/depreciation', component: 'AssetDepreciation' },
  { path: 'assets/register', component: 'AssetRegister' },
  { path: 'taxation/gst', component: 'GST' },
  { path: 'taxation/tds', component: 'TDS' },
  { path: 'taxation/vat', component: 'VAT' },
  { path: 'taxation/reports', component: 'TaxReports' },
  { path: 'taxation/filing', component: 'TaxFiling' },
  { path: 'reports/pnl', component: 'ProfitAndLoss' },
  { path: 'reports/balance-sheet', component: 'BalanceSheet' },
  { path: 'reports/cash-flow', component: 'CashFlow' },
  { path: 'reports/ledger', component: 'GeneralLedger' },
  { path: 'reports/trial-balance', component: 'ReportsTrialBalance' },
  { path: 'reports/cost-centers', component: 'CostCenterReports' },
  { path: 'reports/budgets', component: 'BudgetReports' },
  { path: 'analytics/revenue', component: 'RevenueAnalytics' },
  { path: 'analytics/expense', component: 'ExpenseAnalytics' },
  { path: 'analytics/profitability', component: 'Profitability' },
  { path: 'analytics/department', component: 'DepartmentAnalysis' },
  { path: 'analytics/kpis', component: 'FinancialKPIs' },
  { path: 'approvals/pending', component: 'PendingApprovals' },
  { path: 'approvals/approved', component: 'Approved' },
  { path: 'approvals/rejected', component: 'Rejected' },
  { path: 'compliance/audit', component: 'AuditReports' },
  { path: 'compliance/financial', component: 'FinancialCompliance' },
  { path: 'compliance/controls', component: 'InternalControls' },
  { path: 'settings/fiscal', component: 'FiscalYear' },
  { path: 'settings/currency', component: 'Currency' },
  { path: 'settings/exchange', component: 'ExchangeRates' },
  { path: 'settings/accounting-rules', component: 'AccountingRules' },
  { path: 'settings/invoice-templates', component: 'InvoiceTemplates' }
];

let imports = '';
for (const p of pages) {
  let relativePath = p.path === 'dashboard' ? 'Dashboard' : p.path;
  const parts = relativePath.split('/');
  if (parts.length > 1) {
    relativePath = `${parts[0]}/${p.component}`;
  }
  imports += `const ${p.component} = React.lazy(() => import('../modules/finance/pages/${relativePath}').then(m => ({ default: m.default })));\n`;
}

// Add the import Navigate from react-router-dom
content = content.replace("import { Routes, Route, useLocation, Outlet } from 'react-router-dom';", "import { Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';");

// Insert the lazy imports right before const DashboardRouter
content = content.replace('const DashboardRouter = () => {', imports + '\nconst DashboardRouter = () => {');

// In DashboardRouter, change the FINANCE_MANAGER route
content = content.replace(
  "case 'FINANCE_MANAGER': return <FinanceManagerDashboard />;",
  "case 'FINANCE_MANAGER': return <Navigate to=\"/finance/dashboard\" replace />;"
);

// Generate the Routes block
let routesBlock = `<Route path="/finance" element={<ProtectedRoute><EnterpriseShell><Suspense fallback={<PageLoading />}><PageTransition><Outlet /></PageTransition></Suspense></EnterpriseShell></ProtectedRoute>}>\n`;
for (const p of pages) {
  routesBlock += `  <Route path="${p.path}" element={<${p.component} />} />\n`;
}
routesBlock += `</Route>\n`;

// Insert routesBlock right before {/* Full Screen Command Center */}
content = content.replace('{/* Full Screen Command Center */}', routesBlock + '\n        {/* Full Screen Command Center */}');

fs.writeFileSync(appRoutesPath, content);
console.log('AppRoutes.jsx patched successfully.');
