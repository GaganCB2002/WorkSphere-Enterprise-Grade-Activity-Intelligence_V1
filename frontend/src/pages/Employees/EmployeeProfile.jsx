import { useState, useMemo } from 'react'
import Tabs from '../../components/common/Tabs/Tabs'
import DataTable, { StatusBadge } from '../../components/common/DataTable/DataTable'
import KpiCard from '../../components/common/Card/KpiCard'
import Badge from '../../components/common/Badge/Badge'

const employee = {
  id: 'emp-108',
  name: 'Kabir Rao',
  email: 'kabir.rao@worksphere.com',
  title: 'Senior Software Engineer',
  department: 'Engineering',
  level: 'Senior',
  location: 'Bengaluru, India',
  employmentType: 'Full-time',
  joinDate: '2022-06-15',
  manager: 'Ananya Das',
  compensation: 1850000,
  engagementScore: 87,
  performanceRating: 4.1,
  attritionRisk: 12,
  status: 'Active',
  phone: '+91 98765 43210',
  emergencyContact: { name: 'Neha Rao', relationship: 'Spouse', phone: '+91 98765 43211' },
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
}

const attendanceData = [
  { month: 'Jan', present: 21, absent: 1, late: 0, wfh: 3 },
  { month: 'Feb', present: 19, absent: 2, late: 1, wfh: 4 },
  { month: 'Mar', present: 22, absent: 0, late: 0, wfh: 2 },
]

const payrollHistory = [
  { period: 'Mar 2026', gross: 154167, deductions: 41667, net: 112500, status: 'Processed' },
  { period: 'Feb 2026', gross: 154167, deductions: 41667, net: 112500, status: 'Processed' },
  { period: 'Jan 2026', gross: 154167, deductions: 41667, net: 112500, status: 'Processed' },
]

const projects = [
  { project: 'Payroll Automation', role: 'Backend Lead', status: 'In Progress', hours: 21, productivity: 87 },
  { project: 'HR Dashboard', role: 'Contributor', status: 'Done', hours: 15, productivity: 92 },
]

const assetAllocations = [
  { name: 'MacBook Pro M3', type: 'Hardware', allocated: '05 Jan 2026', status: 'Active' },
  { name: 'Corporation ID Card', type: 'Identification', allocated: '05 Jan 2026', status: 'Active' },
]

export default function EmployeeProfile() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = useMemo(() => [
    {
      key: 'overview',
      label: 'Overview',
      content: <OverviewTab employee={employee} />,
    },
    {
      key: 'attendance',
      label: 'Attendance',
      content: <AttendanceTab data={attendanceData} />,
    },
    {
      key: 'payroll',
      label: 'Payroll',
      badge: '3',
      content: <PayrollTab data={payrollHistory} />,
    },
    {
      key: 'projects',
      label: 'Projects',
      content: <ProjectsTab data={projects} />,
    },
    {
      key: 'assets',
      label: 'Assets',
      content: <AssetsTab data={assetAllocations} />,
    },
    {
      key: 'performance',
      label: 'Performance',
      content: <PerformanceTab employee={employee} />,
    },
  ], [])

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Profile Header */}
      <div className="bg-surface-elevated border border-subtle rounded-lg p-5">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-lg bg-[var(--color-brand-600)] flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-primary">{employee.name}</h1>
                <p className="text-sm text-secondary mt-0.5">{employee.title} · {employee.department}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="success" dot>{employee.status}</Badge>
                  <Badge variant="brand">{employee.level}</Badge>
                  <Badge>{employee.employmentType}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm font-medium rounded bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] transition-colors">
                  Edit Profile
                </button>
                <button className="px-3 py-1.5 text-sm font-medium rounded bg-surface-hover text-primary border border-subtle hover:bg-surface-active transition-colors">
                  Message
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-subtle">
              <Detail label="Email" value={employee.email} />
              <Detail label="Phone" value={employee.phone} />
              <Detail label="Location" value={employee.location} />
              <Detail label="Manager" value={employee.manager} />
              <Detail label="Joined" value={new Date(employee.joinDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} />
              <Detail label="Compensation" value={`₹${(employee.compensation / 100000).toFixed(1)}L`} />
              <Detail label="Engagement Score" value={`${employee.engagementScore}/100`} />
              <Detail label="Attrition Risk" value={`${employee.attritionRisk}%`} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface-elevated border border-subtle rounded-lg p-5">
        <Tabs tabs={tabs} defaultTab="overview" onChange={setActiveTab} />
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <div className="text-xs text-secondary uppercase tracking-wider">{label}</div>
      <div className="text-sm font-medium text-primary mt-0.5">{value}</div>
    </div>
  )
}

function OverviewTab({ employee }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">Skills & Expertise</h3>
        <div className="flex flex-wrap gap-1.5">
          {employee.skills.map(s => <Badge key={s} variant="brand">{s}</Badge>)}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">Performance Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <KpiCard.SMALL title="Rating" value={employee.performanceRating} />
          <KpiCard.SMALL title="Engagement" value={`${employee.engagementScore}%`} />
          <KpiCard.SMALL title="Productivity" value="89%" trend="+2%" trendType="up" />
          <KpiCard.SMALL title="Attendance" value="96.4%" trend="+0.8%" trendType="up" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">Emergency Contact</h3>
        <div className="text-sm text-secondary">
          {employee.emergencyContact.name} ({employee.emergencyContact.relationship}) · {employee.emergencyContact.phone}
        </div>
      </div>
    </div>
  )
}

function AttendanceTab({ data }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard.SMALL title="Present" value="62" trend="This quarter" trendType="up" />
        <KpiCard.SMALL title="Absent" value="3" trend="2% absence rate" trendType="down" />
        <KpiCard.SMALL title="WFH" value="9" trend="Approved" trendType="up" />
        <KpiCard.SMALL title="Late" value="1" trend="On time 98%" trendType="up" />
      </div>
      <DataTable
        columns={[
          { key: 'month', label: 'Month' },
          { key: 'present', label: 'Present', align: 'center' },
          { key: 'absent', label: 'Absent', align: 'center' },
          { key: 'late', label: 'Late', align: 'center' },
          { key: 'wfh', label: 'Work From Home', align: 'center' },
        ]}
        data={data}
        pageSize={10}
      />
    </div>
  )
}

function PayrollTab({ data }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard.SMALL title="Monthly CTC" value="₹18.5L" />
        <KpiCard.SMALL title="Gross Pay" value="₹1,54,167" />
        <KpiCard.SMALL title="Deductions" value="₹41,667" />
        <KpiCard.SMALL title="Net Pay" value="₹1,12,500" />
      </div>
      <DataTable
        columns={[
          { key: 'period', label: 'Period' },
          { key: 'gross', label: 'Gross', render: v => `₹${v.toLocaleString()}` },
          { key: 'deductions', label: 'Deductions', render: v => `₹${v.toLocaleString()}` },
          { key: 'net', label: 'Net Pay', render: v => <span className="font-medium">₹{v.toLocaleString()}</span> },
          { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
        ]}
        data={data}
        pageSize={10}
      />
    </div>
  )
}

function ProjectsTab({ data }) {
  return (
    <DataTable
      columns={[
        { key: 'project', label: 'Project' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
        { key: 'hours', label: 'Hours', align: 'center' },
        { key: 'productivity', label: 'Productivity', align: 'center', render: v => <span className="font-medium text-[var(--color-success-600)]">{v}%</span> },
      ]}
      data={data}
      pageSize={10}
    />
  )
}

function AssetsTab({ data }) {
  return (
    <DataTable
      columns={[
        { key: 'name', label: 'Asset' },
        { key: 'type', label: 'Type' },
        { key: 'allocated', label: 'Allocated On' },
        { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
      ]}
      data={data}
      pageSize={10}
    />
  )
}

function PerformanceTab({ employee }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiCard.SMALL title="Goal Completion" value="82%" />
        <KpiCard.SMALL title="KPI Score" value={employee.performanceRating} />
        <KpiCard.SMALL title="360 Feedback" value="4.2" />
        <KpiCard.SMALL title="Promotion Readiness" value="Medium" trendType="up" />
      </div>
      <div className="text-sm space-y-3">
        <div>
          <h4 className="font-medium text-primary mb-1">Strengths</h4>
          <p className="text-secondary">Platform reliability, Code reviews, Mentorship</p>
        </div>
        <div>
          <h4 className="font-medium text-primary mb-1">Coach Notes</h4>
          <p className="text-secondary">High delivery ownership, but risk score suggests workload balancing is needed.</p>
        </div>
      </div>
    </div>
  )
}
