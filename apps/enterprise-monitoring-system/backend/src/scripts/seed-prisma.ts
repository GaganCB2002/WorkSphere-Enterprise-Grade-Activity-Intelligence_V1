import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('[SEEDER] Starting Prisma database seeding with comprehensive Executive Suite target numbers...')

  // Clear existing data
  await prisma.user.deleteMany()
  await prisma.employee.deleteMany()
  await prisma.revenueStream.deleteMany()
  await prisma.salesPipeline.deleteMany()
  await prisma.operationalMetric.deleteMany()
  await prisma.project.deleteMany()
  await prisma.customerSuccess.deleteMany()
  await prisma.marketingCampaign.deleteMany()
  await prisma.productUsage.deleteMany()
  await prisma.riskAssess.deleteMany()
  await prisma.strategicOKR.deleteMany()
  await prisma.investorReport.deleteMany()
  await prisma.systemNotification.deleteMany()
  await prisma.aIWidgetData.deleteMany()

  console.log('[SEEDER] Tables cleared successfully.')

  const passwordHash = bcrypt.hashSync('Password@123', 10)

  // 1. Seed Users
  await prisma.user.createMany({
    data: [
      {
        id: 'u-1',
        name: 'Executive Director',
        email: 'ceo@aurahr.com',
        role: 'CEO',
        employeeId: 'emp-100',
        passwordHash,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        department: 'Executive'
      },
      {
        id: 'u-2',
        name: 'Nisha Kapoor',
        email: 'hr@aurahr.com',
        role: 'HR',
        employeeId: 'emp-101',
        passwordHash,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        department: 'People Ops'
      }
    ]
  })
  console.log('[SEEDER] Users seeded.')

  // 2. Seed Employees
  // Total Headcount: 42,450. We seed core mock nodes.
  await prisma.employee.createMany({
    data: [
      {
        id: 'emp-100',
        name: 'E. Director',
        email: 'ceo@aurahr.com',
        title: 'Managing Director',
        department: 'Executive',
        level: 'CEO',
        location: 'Global Operations',
        employmentType: 'Full-time',
        joinDate: '2020-01-08',
        compensation: 12000000,
        engagementScore: 92,
        performanceRating: 4.9,
        attritionRisk: 3,
        status: 'Active',
        skills: 'Global Operations,Financials,Strategy'
      },
      {
        id: 'emp-101',
        name: 'Sarah Tech',
        email: 'techlead@company.com',
        title: 'Platform Director',
        department: 'Engineering',
        level: 'Lead',
        location: 'Americas',
        employmentType: 'Full-time',
        joinDate: '2021-03-12',
        managerId: 'emp-100',
        compensation: 3400000,
        engagementScore: 88,
        performanceRating: 4.8,
        attritionRisk: 8,
        status: 'Active',
        skills: 'System Design,Cloud Architecture'
      }
    ]
  })
  console.log('[SEEDER] Employees seeded.')

  // 3. Seed Revenue Streams
  await prisma.revenueStream.createMany({
    data: [
      { month: 'Q3 \'23', revenue: 38200000, target: 36000000, forecast: 40000000, EBITDA: 12800000, operatingMargin: 33.1, cashFlow: 8200000, netProfit: 3800000, expenses: 34400000, investments: 5000000, liabilities: 18500000, quarter: 'Q3' },
      { month: 'Q4 \'23', revenue: 39500000, target: 38000000, forecast: 41000000, EBITDA: 13100000, operatingMargin: 33.1, cashFlow: 8400000, netProfit: 3900000, expenses: 35600000, investments: 5000000, liabilities: 18500000, quarter: 'Q4' },
      { month: 'Q1 \'24', revenue: 41000000, target: 40000000, forecast: 42000000, EBITDA: 13500000, operatingMargin: 33.1, cashFlow: 8600000, netProfit: 4000000, expenses: 37000000, investments: 6000000, liabilities: 18500000, quarter: 'Q1' },
      { month: 'Q2 \'24', revenue: 42100000, target: 41000000, forecast: 43000000, EBITDA: 13900000, operatingMargin: 33.1, cashFlow: 8800000, netProfit: 4100000, expenses: 38000000, investments: 6000000, liabilities: 18500000, quarter: 'Q2' },
      { month: 'Q3 \'24', revenue: 42800000, target: 42000000, forecast: 44000000, EBITDA: 14200000, operatingMargin: 33.1, cashFlow: 8900000, netProfit: 4200000, expenses: 38600000, investments: 7000000, liabilities: 18500000, quarter: 'Q3' }
    ]
  })
  console.log('[SEEDER] Revenue streams seeded.')

  // 4. Seed Sales Pipelines
  await prisma.salesPipeline.createMany({
    data: [
      { stage: 'Won', clientName: 'OmniCorp International', dealValue: 2400000, conversionProbability: 92, region: 'Americas', salesRep: 'Simran Gill', expectedCloseDate: '2024-09-15' },
      { stage: 'Proposal', clientName: 'Vanguard Systems', dealValue: 1800000, conversionProbability: 78, region: 'EMEA', salesRep: 'Neha Arora', expectedCloseDate: '2024-10-10' },
      { stage: 'Qualified', clientName: 'Nexus Global', dealValue: 1500000, conversionProbability: 45, region: 'APAC', salesRep: 'Simran Gill', expectedCloseDate: '2024-11-05' },
      { stage: 'Won', clientName: 'Acme Corp Enterprise', dealValue: 1200000, conversionProbability: 88, region: 'Americas', salesRep: 'Simran Gill', expectedCloseDate: '2024-09-01' },
      { stage: 'Proposal', clientName: 'Global Tech Solutions', dealValue: 850000, conversionProbability: 62, region: 'APAC', salesRep: 'Neha Arora', expectedCloseDate: '2024-09-20' }
    ]
  })
  console.log('[SEEDER] Sales pipelines seeded.')

  // 5. Seed Operational Metrics
  await prisma.operationalMetric.createMany({
    data: [
      { date: '2026-05-30', uptime: 99.98, deliveryDelayRate: 14.0, resourceUtilization: 88.0, operationalCost: 1100000000, efficiencyScore: 94.0, incidentCount: 1, bugTrend: 126 }
    ]
  })
  console.log('[SEEDER] Operational metrics seeded.')

  // 6. Seed Projects
  // Projects: Titan, Nexus, Aurora, Helios
  await prisma.project.createMany({
    data: [
      { id: 'proj-titan', name: 'Project Titan (APAC)', manager: 'Infrastructure Expansion', budget: 10000000, spent: 8200000, status: 'Delayed', startDate: '2024-01-10', endDate: 'Q4 \'24', risks: 'High', milestones: 'Infrastructure Expansion', teamAllocation: 8, satisfaction: 4.5 },
      { id: 'proj-nexus', name: 'Project Nexus', manager: 'Core System Upgrade', budget: 4500000, spent: 2100000, status: 'On Track', startDate: '2024-06-15', endDate: 'Q2 \'25', risks: 'Low', milestones: 'Core System Upgrade', teamAllocation: 6, satisfaction: 4.6 },
      { id: 'proj-aurora', name: 'Project Aurora', manager: 'Security Audit Phase 2', budget: 1200000, spent: 1100000, status: 'Completed', startDate: '2023-11-01', endDate: 'Q1 \'24', risks: '-', milestones: 'Security Audit Phase 2', teamAllocation: 4, satisfaction: 4.8 },
      { id: 'proj-helios', name: 'Project Helios', manager: 'EU Market Entry', budget: 15000000, spent: 5400000, status: 'On Track', startDate: '2024-02-15', endDate: 'Q1 \'26', risks: 'Med', milestones: 'EU Market Entry', teamAllocation: 10, satisfaction: 4.7 }
    ]
  })
  console.log('[SEEDER] Projects seeded.')

  // 7. Seed Customer Success
  await prisma.customerSuccess.createMany({
    data: [
      { clientName: 'Americas BU', NPS: 94, retentionRate: 98.5, churnRisk: 1.2, supportTicketsOpen: 2, supportTicketsResolved: 48, renewalPipelineValue: 428500000, escalationsCount: 0 },
      { clientName: 'EMEA BU', NPS: 88, retentionRate: 97.0, churnRisk: 2.5, supportTicketsOpen: 5, supportTicketsResolved: 82, renewalPipelineValue: 312000000, escalationsCount: 0 },
      { clientName: 'APAC BU', NPS: 65, retentionRate: 92.1, churnRisk: 8.4, supportTicketsOpen: 14, supportTicketsResolved: 95, renewalPipelineValue: 185200000, escalationsCount: 1 }
    ]
  })
  console.log('[SEEDER] Customer success records seeded.')

  // 8. Seed Strategic OKRs (Initiatives)
  await prisma.strategicOKR.createMany({
    data: [
      { objective: 'Digital Transformation', keyResult: 'Phase 3: Cloud Migration', targetValue: 100, currentValue: 78, progress: 78, owner: 'CTO Michael Chang', quarter: 'Q3', year: 2026, risks: 'Legacy DB lockup' },
      { objective: 'Market Expansion (LATAM)', keyResult: 'Regulatory Approvals Pending', targetValue: 100, currentValue: 42, progress: 42, owner: 'VP Sales Simran Gill', quarter: 'Q3', year: 2026, risks: 'Currency hedging delay' },
      { objective: 'Cost Optimization Q3', keyResult: 'Vendor Renegotiations', targetValue: 100, currentValue: 24, progress: 24, owner: 'CFO Rohan Sen', quarter: 'Q3', year: 2026, risks: 'Contract exit penalties' }
    ]
  })
  console.log('[SEEDER] Strategic OKRs seeded.')

  // 9. Seed Investor Reports
  await prisma.investorReport.createMany({
    data: [
      {
        title: 'Board Summary Q3 2024',
        boardUpdate: 'Overall portfolio health remains strong with a 92% on-time delivery rate. However, Project \'Titan\' (APAC region) is showing early warning signs of resource bottlenecking in Q3. Reallocating 3 senior engineers from the completed \'Aurora\' initiative could mitigate a projected 14-day delay and protect a $2.4M milestone payment.',
        fundingHistory: 'Series B closed - $18M',
        valuation: 142000000000,
        shareholderCount: 42
      }
    ]
  })
  console.log('[SEEDER] Investor reports seeded.')

  // 10. Seed System Notifications
  await prisma.systemNotification.createMany({
    data: [
      { title: 'EU Supply Chain Disruption', detail: 'Impact: High | Probability: 75% | AI Mitigating', time: '5m ago', type: 'warning', read: false },
      { title: 'Competitor Tech Launch', detail: 'Impact: Medium | Probability: 90% | Monitoring', time: '1h ago', type: 'info', read: false },
      { title: 'Regulatory Shift (APAC)', detail: 'Impact: Medium | Probability: 40%', time: '4h ago', type: 'info', read: true }
    ]
  })
  console.log('[SEEDER] System notifications seeded.')

  // 11. Seed AI Widget Data
  await prisma.aIWidgetData.createMany({
    data: [
      {
        todaySummary: 'Global revenue is trending 4.2% above forecasts, driven by strong APAC performance. However, supply chain disruptions in EU manufacturing are posing a moderate risk to Q4 margins. AI recommends reallocating logistics budget to expedited air freight for critical components.',
        weeklyReport: 'Supply Chain Latency detected in APAC Region. Predictive models indicate a 14% increase in delivery times for Q3 components out of Shenzhen due to localized port congestion. Rerouting 30% of freight through secondary hubs is recommended to maintain baseline efficiency.',
        revenueForecast: 'Q3 Revenue is projected to hit $24.8B, with gross margin stable at 68.4%.',
        growthOpportunities: 'SaaS revenue streams have outperformed Q3 projections by 4.2%. Reallocating 15% of Q4 marketing budget to Enterprise Services could yield an estimated $2.4M EBITDA lift based on current conversion velocity.',
        strategicRisks: 'EU Supply Chain Disruption represents a high-probability event (75%). AI mitigation protocols have been engaged.'
      }
    ]
  })
  console.log('[SEEDER] AI widgets seeded.')

  // 12. Seed Risk Assessment (Active Risk Monitor)
  await prisma.riskAssess.createMany({
    data: [
      { riskCategory: 'Supply Chain Disruption', riskDescription: 'Port closure in Shanghai impacting Q3 hardware delivery timelines.', severity: 'High', mitigationPlan: 'Reroute freight via Shenzhen secondary hubs', status: 'Triggered', department: 'Logistics' },
      { riskCategory: 'Server Load Spike', riskDescription: 'US-East region operating at 92% capacity sustained for 4 hours.', severity: 'Medium', mitigationPlan: 'Enable auto-scaling and caching parameters', status: 'Monitor', department: 'Engineering' },
      { riskCategory: 'Vendor API Deprecation', riskDescription: 'Payment gateway API v2 end-of-life in 45 days. Migration needed.', severity: 'Low', mitigationPlan: 'Draft migration endpoints task force', status: 'Monitor', department: 'Engineering' }
    ]
  })
  console.log('[SEEDER] Risk assessments seeded.')

  // 13. Seed Product Usages
  await prisma.productUsage.createMany({
    data: [
      { featureName: 'AI Activity Logs', adoptionRate: 88.4, activeUsers: 4820, userFeedbackRating: 4.6, releaseVersion: 'v2.4.0', roadmapStatus: 'Production' }
    ]
  })
  console.log('[SEEDER] Product usages seeded.')

  // 14. Seed Marketing Campaigns
  await prisma.marketingCampaign.createMany({
    data: [
      { name: 'Google Ads', budget: 150000, spent: 120000, leadsGenerated: 1800, CAC: 66.6, ROI: 2.4, channel: 'PPC', clickRate: 3.8, conversionRate: 12.5 }
    ]
  })
  console.log('[SEEDER] Marketing campaigns seeded.')

  console.log('[SEEDER] Prisma database seeding complete.')
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error('[SEEDER] Error seeding database:', e)
  prisma.$disconnect()
  process.exit(1)
})
