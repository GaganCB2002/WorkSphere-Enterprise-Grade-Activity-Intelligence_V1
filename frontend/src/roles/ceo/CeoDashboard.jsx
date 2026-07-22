import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import KpiCard from '../../components/common/Card/KpiCard'
import DataTable from '../../components/common/DataTable/DataTable'

const navSections = [
  {
    label: 'Executive', items: [
      { id: 'overview', label: 'Executive Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { id: 'bi', label: 'Business Intelligence', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { id: 'strategy', label: 'Strategic Planning', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    ]
  },
  {
    label: 'Financial', items: [
      { id: 'financial', label: 'Financial Overview', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'revenue', label: 'Revenue Analytics', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
      { id: 'pnl', label: 'Profit & Loss', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
      { id: 'cashflow', label: 'Cash Flow', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    ]
  },
  {
    label: 'Revenue', items: [
      { id: 'sales', label: 'Sales Performance', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { id: 'customers', label: 'Customer Success', icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' },
      { id: 'marketing', label: 'Marketing Analytics', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    ]
  },
  {
    label: 'Operations', items: [
      { id: 'hr', label: 'Human Resources', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
      { id: 'operations', label: 'Operations', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
      { id: 'projects', label: 'Projects & Portfolio', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    ]
  },
  {
    label: 'Technology', items: [
      { id: 'tech', label: 'Technology Overview', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
      { id: 'security', label: 'Cyber Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
      { id: 'risk', label: 'Risk Management', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
      { id: 'compliance', label: 'Compliance & Governance', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    ]
  },
  {
    label: 'Governance', items: [
      { id: 'investors', label: 'Investors & Board', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
      { id: 'approvals', label: 'Approvals Center', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'docs', label: 'Company Documents', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
      { id: 'reports', label: 'Reports & Analytics', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    ]
  },
  {
    label: 'Tools', items: [
      { id: 'ai', label: 'AI Executive Assistant', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
      { id: 'calendar', label: 'Meetings & Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
      { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    ]
  },
]

const overviewKpis = [
  { title: 'Company Revenue', value: '$24.8M', subtitle: 'Q2 2026', trend: '+12.3% vs target', trendType: 'up', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Total Headcount', value: '1,248', subtitle: 'Across 12 departments', trend: '+28 this quarter', trendType: 'up', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { title: 'Active Projects', value: '47', subtitle: '12 critical path', trend: '92% on schedule', trendType: 'up', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
  { title: 'Employee Satisfaction', value: '87.4%', subtitle: 'eNPS Score', trend: '+5.2% YoY', trendType: 'up', icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' },
]

const financialKpis = [
  { title: 'Gross Revenue', value: '$24.8M', subtitle: 'Q2 2026', trend: '+12.3% QoQ', trendType: 'up', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Net Income', value: '$6.4M', subtitle: 'After tax', trend: '25.8% margin', trendType: 'up', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Operating Expenses', value: '$14.2M', subtitle: 'Q2 2026', trend: 'Within budget', trendType: 'neutral', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { title: 'EBITDA', value: '$8.9M', subtitle: 'Q2 2026', trend: '+15.2% YoY', trendType: 'up', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
]

const salesKpis = [
  { title: 'Pipeline Value', value: '$18.4M', subtitle: 'Weighted pipeline', trend: '+$2.1M this month', trendType: 'up', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Win Rate', value: '42.3%', subtitle: 'Closed-won ratio', trend: '+3.8% vs Q1', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Active Deals', value: '64', subtitle: 'In negotiation', trend: '12 closing this week', trendType: 'up', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'Monthly Target', value: '87%', subtitle: '$4.8M of $5.5M', trend: 'On track to hit', trendType: 'up', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
]

const hrKpis = [
  { title: 'Total Headcount', value: '1,248', subtitle: 'Active employees', trend: '+28 this quarter', trendType: 'up', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { title: 'Attrition Rate', value: '8.2%', subtitle: 'Annualized', trend: '-1.5% improvement', trendType: 'up', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { title: 'Open Positions', value: '18', subtitle: 'Active requisitions', trend: '124 applicants', trendType: 'up', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  { title: 'Avg Tenure', value: '3.2yrs', subtitle: 'Company average', trend: 'Healthy retention', trendType: 'up', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const techKpis = [
  { title: 'System Uptime', value: '99.97%', subtitle: 'Last 30 days', trend: '1 incident', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Deployments', value: '847', subtitle: 'This quarter', trend: '+23% vs last', trendType: 'up', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { title: 'Security Incidents', value: '3', subtitle: 'This quarter', trend: '-40% reduction', trendType: 'up', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { title: 'Tech Debt Ratio', value: '18.3%', subtitle: 'Codebase quality', trend: '-2.1% improved', trendType: 'up', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
]

const projects = [
  { id: '1', name: 'Platform Migration', lead: 'Michael Chang', dept: 'Engineering', status: 'On Track', progress: '72%', deadline: 'Q3 2026' },
  { id: '2', name: 'AI Copilot Launch', lead: 'Elena Rostova', dept: 'QA', status: 'At Risk', progress: '45%', deadline: 'Q3 2026' },
  { id: '3', name: 'Market Expansion', lead: 'Alex Patel', dept: 'Sales', status: 'On Track', progress: '60%', deadline: 'Q4 2026' },
  { id: '4', name: 'Compliance Upgrade', lead: 'Sarah Jenkins', dept: 'Security', status: 'Completed', progress: '100%', deadline: 'Q2 2026' },
  { id: '5', name: 'Data Lake Buildout', lead: 'David Ross', dept: 'DevOps', status: 'On Track', progress: '35%', deadline: 'Q1 2027' },
]

const pendingApprovals = [
  { item: 'Budget Increase - Marketing', submittedBy: 'Sarah Chen', dept: 'Marketing', amount: '$120K', daysPending: '3' },
  { item: 'New Hire - Sr. Developer', submittedBy: 'Michael Chang', dept: 'Engineering', amount: '—', daysPending: '5' },
  { item: 'Vendor Contract - AWS', submittedBy: 'David Ross', dept: 'DevOps', amount: '$240K/yr', daysPending: '2' },
  { item: 'Travel Policy Exception', submittedBy: 'Ananya Gupta', dept: 'Design', amount: '$8K', daysPending: '7' },
]

const securityKpis = [
  { title: 'Threats Blocked', value: '2,847', subtitle: 'This month', trend: '+12.4% detection', trendType: 'up', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { title: 'Compliance Score', value: '94.2%', subtitle: 'SOC 2 readiness', trend: '+2.1% this quarter', trendType: 'up', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { title: 'Risk Score', value: '2.4/10', subtitle: 'Enterprise risk rating', trend: 'Low risk', trendType: 'up', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
  { title: 'Audit Findings', value: '4', subtitle: 'Open items', trend: '2 critical', trendType: 'down', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
]

const marketingKpis = [
  { title: 'Campaign ROI', value: '324%', subtitle: 'Average ROI', trend: '+18% vs last quarter', trendType: 'up', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { title: 'Lead Generation', value: '2,847', subtitle: 'This month', trend: '+12.4% MoM', trendType: 'up', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  { title: 'Conversion Rate', value: '8.4%', subtitle: 'Lead to opportunity', trend: '+1.2% improvement', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Website Traffic', value: '184K', subtitle: 'Unique visitors', trend: '+22% MoM', trendType: 'up', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
]

const customerKpis = [
  { title: 'NPS Score', value: '72', subtitle: 'Net Promoter Score', trend: '+5 pts this year', trendType: 'up', icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' },
  { title: 'Active Clients', value: '342', subtitle: 'Paying accounts', trend: '+18 this quarter', trendType: 'up', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'CSAT Score', value: '94.2%', subtitle: 'Customer satisfaction', trend: 'Industry leading', trendType: 'up', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Churn Rate', value: '2.1%', subtitle: 'Monthly churn', trend: '-0.4% improvement', trendType: 'up', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
]

const allNavItems = navSections.flatMap(s => s.items)

export default function CeoDashboard() {
  const user = useSelector(state => state.auth.user)
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewKpis.map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <KpiCard {...kpi} />
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-surface-elevated border border-subtle rounded-lg p-4">
                <h2 className="text-base font-semibold text-primary mb-3">Strategic Initiatives</h2>
                <DataTable
                  columns={[
                    { key: 'name', label: 'Project', minWidth: 160 }, { key: 'lead', label: 'Lead', minWidth: 140 },
                    { key: 'dept', label: 'Department', minWidth: 120 }, { key: 'status', label: 'Status', width: 100 },
                    { key: 'progress', label: 'Progress', width: 90 }, { key: 'deadline', label: 'Deadline', width: 100 },
                  ]}
                  data={projects} pageSize={10}
                />
              </div>
              <div className="bg-surface-elevated border border-subtle rounded-lg p-4 space-y-3">
                <h2 className="text-base font-semibold text-primary">Quick Actions</h2>
                {[
                  { title: 'Review Q2 Budget', desc: 'Department-wise expenditure analysis' },
                  { title: 'Approve Hires', desc: '3 pending offer letters' },
                  { title: 'Board Report', desc: 'Generate quarterly board deck' },
                ].map((a, i) => (
                  <button key={i} className="w-full text-left p-3 rounded-lg border border-subtle hover:border-brand-400 transition-colors bg-surface">
                    <div className="text-sm font-semibold text-primary">{a.title}</div>
                    <div className="text-xs text-secondary mt-0.5">{a.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'financial':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {financialKpis.map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <KpiCard {...kpi} />
                </motion.div>
              ))}
            </div>
            <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
              <h2 className="text-base font-semibold text-primary mb-3">Revenue vs Expenses Trend</h2>
              <div className="h-64 flex items-center justify-center text-secondary text-sm border border-dashed border-subtle rounded-lg">
                [Revenue/Expense Chart — Integration Pending]
              </div>
            </div>
          </div>
        )

      case 'revenue':
      case 'pnl':
      case 'cashflow':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {financialKpis.slice(0, 4).map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <KpiCard {...kpi} />
                </motion.div>
              ))}
            </div>
            <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
              <h2 className="text-base font-semibold text-primary mb-3">{allNavItems.find(n => n.id === activeTab)?.label || 'Financial Data'}</h2>
              <div className="h-64 flex items-center justify-center text-secondary text-sm border border-dashed border-subtle rounded-lg">
                [Detailed report — Integration Pending]
              </div>
            </div>
          </div>
        )

      case 'sales':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {salesKpis.map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <KpiCard {...kpi} />
                </motion.div>
              ))}
            </div>
            <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
              <h2 className="text-base font-semibold text-primary mb-3">Sales Pipeline</h2>
              <div className="h-64 flex items-center justify-center text-secondary text-sm border border-dashed border-subtle rounded-lg">
                [Pipeline chart — Integration Pending]
              </div>
            </div>
          </div>
        )

      case 'customers':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {customerKpis.map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <KpiCard {...kpi} />
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'marketing':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketingKpis.map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <KpiCard {...kpi} />
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'hr':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hrKpis.map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <KpiCard {...kpi} />
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
              <h2 className="text-base font-semibold text-primary mb-3">Projects & Portfolio</h2>
              <DataTable
                columns={[
                  { key: 'name', label: 'Project', minWidth: 160 }, { key: 'lead', label: 'Lead', minWidth: 140 },
                  { key: 'dept', label: 'Department', minWidth: 120 }, { key: 'status', label: 'Status', width: 100 },
                  { key: 'progress', label: 'Progress', width: 90 }, { key: 'deadline', label: 'Deadline', width: 100 },
                ]}
                data={projects} pageSize={10}
              />
            </div>
          </div>
        )

      case 'security':
      case 'risk':
      case 'compliance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityKpis.map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <KpiCard {...kpi} />
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'approvals':
        return (
          <div className="space-y-6">
            <div className="bg-surface-elevated border border-subtle rounded-lg p-4">
              <h2 className="text-base font-semibold text-primary mb-3">Pending Approvals</h2>
              <DataTable
                columns={[
                  { key: 'item', label: 'Item', minWidth: 200 }, { key: 'submittedBy', label: 'Submitted By', minWidth: 140 },
                  { key: 'dept', label: 'Department', width: 120 }, { key: 'amount', label: 'Amount', width: 110 },
                  { key: 'daysPending', label: 'Days', width: 80 },
                ]}
                data={pendingApprovals} pageSize={10}
              />
            </div>
          </div>
        )

      case 'tech':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {techKpis.map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <KpiCard {...kpi} />
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'operations':
      case 'bi':
      case 'strategy':
      case 'investors':
      case 'docs':
      case 'reports':
      case 'ai':
      case 'calendar':
      case 'notifications':
      case 'settings':
      default:
        return (
          <div className="flex items-center justify-center h-64 text-secondary text-sm border border-dashed border-subtle rounded-lg">
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">{allNavItems.find(n => n.id === activeTab)?.label || activeTab}</div>
              <div className="mt-1">Module content — Integration Pending</div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex gap-6">
      <aside className={`shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-12'}`}>
        <div className={`bg-surface-elevated border border-subtle rounded-lg overflow-hidden ${sidebarOpen ? '' : 'p-1'}`}>
          {sidebarOpen && (
            <div className="p-3 border-b border-subtle flex items-center justify-between">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">CEO Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-secondary hover:text-primary transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="w-full p-2 text-secondary hover:text-primary transition-colors">
              <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          )}
          {sidebarOpen && (
            <nav className="overflow-y-auto max-h-[calc(100vh-16rem)] p-1 space-y-4">
              {navSections.map(section => (
                <div key={section.label}>
                  <div className="px-2 py-1 text-[10px] font-semibold text-secondary uppercase tracking-widest">{section.label}</div>
                  {section.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-xs transition-all ${
                        activeTab === item.id
                          ? 'bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 font-medium'
                          : 'text-secondary hover:text-primary hover:bg-surface'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          )}
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-primary">{allNavItems.find(n => n.id === activeTab)?.label || 'Executive Overview'}</h1>
          <p className="text-sm text-secondary mt-0.5">
            {user?.name ? `Welcome back, ${user.name.split(' ')[0]} \u00B7 ` : ''}
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
