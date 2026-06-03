import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import prisma from '../services/prisma.service'
import { z } from 'zod'

const router = Router()

let settingsStore = {
  telemetryExempt: true,
  screenSamplingRateSec: 0,
  securityLoggingLevel: 'High Audit',
  anomalyDetectionSensitivity: 85,
  apiTokenRemainingDays: 245
}

let reportsStore = [
  { id: 'rep-1', title: 'Q2 P&L Financial Statement', category: 'Executive', type: 'PDF/Excel', date: '2026-05-30' },
  { id: 'rep-2', title: 'EBITDA Annual Ledgers', category: 'Board', type: 'Excel/CSV', date: '2026-05-29' }
]

let orgStore = {
  subsidiaries: [
    { name: 'WorkSphere Corp (Parent)', location: 'Global Operations', headcount: 12450, focus: 'Holding & Strategy' },
    { name: 'WorkSphere Labs LLC', location: 'Shenzhen', headcount: 4820, focus: 'APAC Supply Chain & Hardware' },
    { name: 'WorkSphere EMEA Ltd', location: 'London', headcount: 3120, focus: 'Europe Operations & Logistics' },
    { name: 'WorkSphere India Pvt Ltd', location: 'Bengaluru', headcount: 4510, focus: 'Core Engineering & Support' }
  ],
  businessUnits: [
    { name: 'Core SaaS Products', lead: 'Michael Chang', teams: ['UI Platform', 'Data Engineering', 'Infrastructure'], status: 'Optimal' },
    { name: 'Enterprise Services', lead: 'Sarah Jenkins', teams: ['Solutions Architecture', 'Global Delivery', 'Premium Support'], status: 'Stable' },
    { name: 'AI & Telemetry Systems', lead: 'David Vance', teams: ['Model Operations', 'Data Forensics', 'Anomalies Engine'], status: 'Optimal' }
  ]
}

// All CEO routes require authentication
router.use(authenticate)

// Helper: check if user is CEO or Admin
const checkExecutiveAccess = (req: any, res: any, next: any) => {
  const role = req.auth?.role?.toUpperCase()
  if (role === 'CEO' || role === 'ADMIN' || role === 'SUPERADMIN') {
    next()
  } else {
    res.status(403).json({ message: 'Access Denied: Executive credentials required.' })
  }
}

router.use(checkExecutiveAccess)

// 1. Executive Dashboard KPIs
router.get('/kpis', async (req, res) => {
  try {
    const kpis = {
      totalRevenue: {
        title: 'TOTAL REVENUE',
        value: '$24.8B',
        trend: '+12.4%',
        trendType: 'up',
        prevMonth: '$22.1B',
        prevYear: '$19.8B',
        forecast: '$25.6B',
        aiRec: 'Global revenue is trending 4.2% above forecasts, driven by strong APAC performance.'
      },
      netProfit: {
        title: 'NET PROFIT',
        value: '$4.2B',
        trend: '+8.1%',
        trendType: 'up',
        prevMonth: '$3.8B',
        prevYear: '$3.2B',
        forecast: '$4.5B',
        aiRec: 'Supply chain disruptions in EU manufacturing are posing a moderate risk to Q4 margins.'
      },
      grossMargin: {
        title: 'GROSS MARGIN %',
        value: '68.4%',
        trend: '-1.2%',
        trendType: 'down',
        prevMonth: '69.6%',
        prevYear: '70.2%',
        forecast: '68.0%',
        aiRec: 'AI recommends reallocating logistics budget to expedited air freight for critical components.'
      },
      opex: {
        title: 'OPEX',
        value: '$1.1B',
        trend: '-3.4%',
        trendType: 'up',
        prevMonth: '$1.2B',
        prevYear: '$1.4B',
        forecast: '$1.0B',
        aiRec: 'Maintain operating costs below $1.2B to optimize EBITDA margin.'
      },
      marketCap: {
        title: 'MARKET CAP',
        value: '$142B',
        trend: '+15.2%',
        trendType: 'up',
        prevMonth: '$135B',
        prevYear: '$120B',
        forecast: '$150B',
        aiRec: 'Excellent liquid reserves and valuation multipliers.'
      },
      globalHeadcount: {
        title: 'GLOBAL HEADCOUNT',
        value: '12,450', // Matching Image 6
        trend: '+2.1%',
        trendType: 'up',
        prevMonth: '12,190',
        prevYear: '11,500',
        forecast: '12,800',
        aiRec: 'Hiring pipeline indicates tech lead onboarding is tracking on schedule.'
      },
      csatScore: {
        title: 'CSAT SCORE',
        value: '94.2',
        trend: '+0.8',
        trendType: 'up',
        prevMonth: '93.4',
        prevYear: '91.2',
        forecast: '95.0',
        aiRec: 'Slight customer satisfaction uptick due to automated IT helpdesk SLA resolutions.'
      },
      riskIndex: {
        title: 'RISK INDEX',
        value: 'Low',
        trend: 'Stable',
        trendType: 'flat',
        prevMonth: 'Low',
        prevYear: 'Medium',
        forecast: 'Low',
        aiRec: 'Stable across all business regions. Monitor EU supply chain triggers.'
      }
    }

    res.json(kpis)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 2. Company Overview Page
router.get('/company-overview', async (req, res) => {
  try {
    const okrs = await prisma.strategicOKR.findMany()
    
    res.json({
      healthScore: 92,
      subsidiaries: [
        { name: 'WorkSphere Labs', location: 'Shenzhen', activeUnits: 4, initiatives: 'APAC supply chain components' },
        { name: 'Executive Suite', location: 'Global Operations', activeUnits: 5, initiatives: 'Multinational Command Control' },
        { name: 'WorkSphere EMEA Ltd', location: 'London', activeUnits: 3, initiatives: 'EU manufacturing & freight routing' }
      ],
      marketExpansion: {
        APAC: 'At Risk (-2.1% growth, regulatory checks pending)',
        NorthAmerica: 'On Target (+4.2% growth, closing Fortune-500 accounts)',
        EMEA: 'Stable (-0.8% growth, supply chain audit pending)'
      },
      strategicInitiatives: okrs.map(o => ({
        initiative: o.objective,
        progress: o.progress,
        owner: o.owner,
        riskLevel: o.progress < 30 ? 'High' : o.progress < 80 ? 'Medium' : 'Low'
      })),
      charts: {
        growth: [
          { year: '2022', ARR: 54.2, Valuation: 450 },
          { year: '2023', ARR: 82.5, Valuation: 720 },
          { year: '2024', ARR: 110.8, Valuation: 950 },
          { year: '2025', ARR: 135.5, Valuation: 1250 },
          { year: '2026', ARR: 148.5, Valuation: 1450 }
        ],
        buPerformance: [
          { region: 'Americas', revenue: 428.5, margin: 32.4, growth: '+4.2%', status: 'On Target' },
          { region: 'EMEA', revenue: 312.0, margin: 28.1, growth: '-0.8%', status: 'Stable' },
          { region: 'APAC', revenue: 185.2, margin: 22.5, growth: '-2.1%', status: 'At Risk' }
        ]
      }
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 3. Revenue & Finance
router.get('/finance', async (req, res) => {
  try {
    const revenues = await prisma.revenueStream.findMany({ orderBy: { createdAt: 'asc' } })
    res.json({
      revenueTrends: revenues.map(r => ({
        month: r.month,
        revenue: r.revenue / 1000000,
        target: r.target / 1000000,
        expenses: r.expenses / 1000000,
        netProfit: r.netProfit / 1000000
      })),
      ebitdaAnalytics: revenues.map(r => ({
        month: r.month,
        EBITDA: r.EBITDA / 1000000,
        margin: r.operatingMargin
      })),
      balanceSheet: {
        totalAssets: 154000000,
        cashReserves: 46000000,
        investments: 28000000,
        liabilities: 22000000,
        equity: 132000000
      },
      quarterlyGrowth: [
        { quarter: 'Q3 \'23', growth: 12.4 },
        { quarter: 'Q4 \'23', growth: 8.1 },
        { quarter: 'Q1 \'24', growth: -2.3 },
        { quarter: 'Q2 \'24', growth: -0.0 },
        { quarter: 'Q3 \'24', growth: 12.4 }
      ]
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 4. Sales Analytics
router.get('/sales', async (req, res) => {
  try {
    res.json({
      totalSales: 24800000,
      pipelineValue: 14200000,
      conversionRate: 72.0,
      salesTeamPerformance: [
        { name: 'Simran Gill', revenue: 14.2 },
        { name: 'Neha Arora', revenue: 10.6 }
      ],
      regionalSales: [
        { region: 'Americas', sales: 428.5 },
        { region: 'EMEA', sales: 312.0 },
        { region: 'APAC', sales: 185.2 }
      ],
      enterpriseClients: [
        { client: 'OmniCorp International', value: 2400000, stage: 'Won', probability: 92, closeDate: '2024-09-15' },
        { client: 'Vanguard Systems', value: 1800000, stage: 'Proposal', probability: 78, closeDate: '2024-10-10' },
        { client: 'Nexus Global', value: 1500000, stage: 'Qualified', probability: 45, closeDate: '2024-11-05' }
      ]
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 5. Operations Center
router.get('/operations', async (req, res) => {
  try {
    const risks = await prisma.riskAssess.findMany()
    res.json({
      operationalKPIs: {
        uptime: 99.98,
        deliveryDelayRate: 14.0,
        resourceUtilization: 88.0,
        operationalCost: 1100000,
        efficiencyScore: 94.0,
        incidentsToday: 1
      },
      bottlenecks: [
        { projectName: 'EMEA Distribution Center', bottleneck: 'logistical bottleneck forming within 48 hours', impact: 'freight surge combined with maintenance' }
      ],
      departmentalEfficiency: [
        { department: 'Core Engineering', score: 98.2, throughput: '1,240 units/hr', status: 'Optimal' },
        { department: 'Customer Operations', score: 92.5, throughput: '850 tkts/hr', status: 'Stable' },
        { department: 'Global Logistics', score: 81.4, throughput: '420 shipments/hr', status: 'Degraded' },
        { department: 'Data Processing', score: 99.1, throughput: '5.2 TB/s', status: 'Optimal' }
      ],
      activeRisks: risks.map(r => ({
        category: r.riskCategory,
        description: r.riskDescription,
        severity: r.severity
      }))
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 6. Employee Analytics
router.get('/employees', async (req, res) => {
  try {
    res.json({
      employeeCount: 42450, // Image 7
      attritionRate: 4.2, // Image 7
      engagementScore: 88.0, // Image 7
      productivityScore: 94.5, // Image 7
      departmentDistribution: [
        { name: 'Engineering & Product', value: 18240, percentage: 43 },
        { name: 'Sales & Marketing', value: 11460, percentage: 27 },
        { name: 'Operations & Support', value: 8490, percentage: 20 },
        { name: 'G&A / Administration', value: 4260, percentage: 10 }
      ],
      satisfactionTrend: [
        { label: 'Q1 \'24', satisfaction: 4.1 },
        { label: 'Q2 \'24', satisfaction: 4.3 },
        { label: 'Q3 \'24', satisfaction: 4.6 }
      ]
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 7. HR & Workforce
router.get('/workforce', async (req, res) => {
  try {
    res.json({
      hiringStatus: {
        openPositions: 452, // Image 6
        hiredThisMonth: 84,
        avgTimeToHire: '42d' // Image 6
      },
      voluntaryAttrition: '8.4%', // Image 6
      offerAcceptance: '91%', // Image 6
      topPerformers: [
        { name: 'E. Director', department: 'Executive', rating: 4.9, title: 'Managing Director' },
        { name: 'Sarah Tech', department: 'Engineering', rating: 4.8, title: 'Platform Director' }
      ],
      highRiskAttrition: [
        { name: 'Cloud Infrastructure Division', department: 'Engineering', risk: 24, title: 'Engineering (Cloud Infrastructure)' }
      ],
      leadershipPipeline: {
        vpReadyNow: 12, // Image 6
        directorReady: 48 // Image 6
      },
      hiringPipeline: [
        { stage: 'Sourcing', count: 1204, progress: 45 },
        { stage: 'Interviewing', count: 340, progress: 60 },
        { stage: 'Offer Pending', count: 45, progress: 50 }
      ]
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 8. Projects & Delivery
router.get('/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany()
    res.json(projects.map(p => ({
      id: p.id,
      name: p.name,
      manager: p.manager,
      budget: p.budget,
      spent: p.spent,
      status: p.status,
      startDate: p.startDate,
      endDate: p.endDate,
      risks: p.risks,
      milestones: p.milestones.split(','),
      teamAllocation: p.teamAllocation,
      satisfaction: p.satisfaction
    })))
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 9. Customer Success
router.get('/customers', async (req, res) => {
  try {
    res.json({
      NPS: 94,
      retentionRate: 98.5,
      churnRate: 1.2,
      enterpriseAccounts: [
        { client: 'Chevron USA', NPS: 82, retention: 98.5, risk: 1.2, openTickets: 3 },
        { client: 'Siemens AG', NPS: 78, retention: 97.0, risk: 2.5, openTickets: 8 }
      ],
      escalations: [
        { client: 'Airtel India', escalations: 3, openTickets: 14 }
      ],
      renewalPipeline: 48000000
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 10. Marketing Intelligence
router.get('/marketing', async (req, res) => {
  try {
    res.json({
      metrics: {
        totalSpent: 12000,
        totalLeads: 1800,
        CAC: 66.6,
        ROI: 2.4
      },
      campaigns: [
        { name: 'Google Ads', budget: 150000, spent: 120000, leadsGenerated: 1800, CAC: 66.6, ROI: 2.4, channel: 'PPC', clickRate: 3.8, conversionRate: 12.5 }
      ],
      websiteAnalytics: {
        monthlyVisitors: 45000,
        bounceRate: 38.5,
        conversionRate: 3.2
      },
      socialGrowth: {
        LinkedIn: '+18% MoM',
        Twitter: '+5% MoM',
        YouTube: '+12% MoM'
      }
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 11. Product Analytics
router.get('/product', async (req, res) => {
  try {
    const products = await prisma.productUsage.findMany()
    res.json({
      featureAdoption: products.map(p => ({
        feature: p.featureName,
        adoptionRate: p.adoptionRate,
        activeUsers: p.activeUsers
      })),
      roadmap: products.map(p => ({
        feature: p.featureName,
        version: p.releaseVersion,
        status: p.roadmapStatus,
        feedback: p.userFeedbackRating
      }))
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 12. Technology & Engineering
router.get('/technology', async (req, res) => {
  try {
    res.json({
      systemUptime: [
        { date: '2026-05-25', uptime: 99.98 },
        { date: '2026-05-26', uptime: 99.95 },
        { date: '2026-05-27', uptime: 99.99 },
        { date: '2026-05-28', uptime: 99.90 },
        { date: '2026-05-29', uptime: 99.97 },
        { date: '2026-05-30', uptime: 99.99 }
      ],
      deploymentSuccess: 98.6,
      incidents: [
        { id: 'inc-1', service: 'Auth Endpoint API', severity: 'P1', duration: '14 min', status: 'Resolved' }
      ],
      engineeringVelocity: {
        sprintBurndownRate: '94.2%',
        bugTrend: [
          { date: '2026-05-28', bugCount: 140 },
          { date: '2026-05-29', bugCount: 131 },
          { date: '2026-05-30', bugCount: 126 }
        ],
        readinessScore: 98.0
      }
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 13. Risk & Compliance
router.get('/risk', async (req, res) => {
  try {
    const risks = await prisma.riskAssess.findMany()
    res.json({
      high: risks.filter(r => r.severity === 'High'),
      medium: risks.filter(r => r.severity === 'Medium'),
      low: risks.filter(r => r.severity === 'Low'),
      complianceScore: 96.5,
      auditReports: [
        { title: 'SOC2 Type II Re-certification', date: '2026-05-15', status: 'Cleared', compliance: '100%' }
      ]
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 14. Investor Relations
router.get('/investor', async (req, res) => {
  try {
    const reports = await prisma.investorReport.findFirst()
    res.json(reports || {
      title: 'Board Summary Q3 2024',
      boardUpdate: 'Approved expansion plan.',
      fundingHistory: 'Series B closed - $18M',
      valuation: 142000000000,
      shareholderCount: 42
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 15. Strategic Planning
router.get('/strategic', async (req, res) => {
  try {
    const okrs = await prisma.strategicOKR.findMany()
    res.json(okrs)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 16. AI Executive Assistant
router.post('/ai-assistant', async (req, res) => {
  try {
    const parsed = z.object({ query: z.string() }).safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ message: 'Missing query parameter.' })
    
    const query = parsed.data.query.toLowerCase()
    const widgets = await prisma.aIWidgetData.findFirst()
    
    let responseText = "As your Executive AI, I've checked our live SQLite database. "
    
    if (query.includes('project') || query.includes('titan') || query.includes('delivery')) {
      responseText += "Overall portfolio health is strong with 92% on-time delivery. However, Project Titan (APAC) shows early warning signs of resource bottlenecking in Q3. Reallocating 3 senior engineers from Aurora could mitigate the 14-day delay."
    } else if (query.includes('attrition') || query.includes('attrit') || query.includes('talent')) {
      responseText += "We have a High-Risk Attrition alert in our Engineering (Cloud Infrastructure) division for Q3 (24% probability). Recommended action: initiate targeted off-cycle retention bonuses ($1.2M cost, $4.5M replacement cost avoided)."
    } else if (query.includes('bottleneck') || query.includes('operations')) {
      responseText += "AI predicts a high probability (87%) of a logistical bottleneck forming in the EMEA Distribution Center in 48 hours. AI recommends rerouting 15% of non-critical shipments."
    } else {
      responseText += "Global Headcount is 12,450, with voluntary attrition at 8.4%. Uptime remains solid at 99.98%."
    }
    
    res.json({
      responseText,
      widgets: widgets || {
        todaySummary: 'Telemetry shows optimal status.',
        weeklyReport: 'Weekly sprint targets completed.',
        revenueForecast: 'Q3 target on track.',
        growthOpportunities: 'EMEA sales expansions.',
        strategicRisks: 'GDPR audit checks.'
      }
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 17. Reports Center Metadata
router.get('/reports', async (req, res) => {
  res.json(reportsStore)
})

router.post('/reports', async (req, res) => {
  try {
    const parsed = z.object({
      title: z.string(),
      category: z.string(),
      type: z.string()
    }).parse(req.body)

    const newReport = {
      id: `rep-${reportsStore.length + 1}`,
      title: parsed.title,
      category: parsed.category,
      type: parsed.type,
      date: new Date().toISOString().split('T')[0]
    }
    reportsStore.unshift(newReport)
    res.json(newReport)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// 18. Notifications Center
router.get('/notifications', async (req, res) => {
  try {
    const list = await prisma.systemNotification.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(list)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// 19. Organization Structure switcher
router.get('/org-structure', async (req, res) => {
  res.json(orgStore)
})

router.post('/org-structure', async (req, res) => {
  try {
    const parsed = z.object({
      type: z.enum(['subsidiary', 'bu']),
      name: z.string(),
      locationOrLead: z.string(),
      headcountOrTeams: z.string(),
      focusOrStatus: z.string()
    }).parse(req.body)

    if (parsed.type === 'subsidiary') {
      orgStore.subsidiaries.push({
        name: parsed.name,
        location: parsed.locationOrLead,
        headcount: Number(parsed.headcountOrTeams) || 0,
        focus: parsed.focusOrStatus
      })
    } else {
      orgStore.businessUnits.push({
        name: parsed.name,
        lead: parsed.locationOrLead,
        teams: parsed.headcountOrTeams.split(',').map(t => t.trim()).filter(Boolean),
        status: parsed.focusOrStatus
      })
    }
    res.json(orgStore)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// 20. Settings Configurations
router.get('/settings', async (req, res) => {
  res.json(settingsStore)
})

router.post('/settings', async (req, res) => {
  try {
    const parsed = z.object({
      telemetryExempt: z.boolean(),
      screenSamplingRateSec: z.number(),
      securityLoggingLevel: z.string(),
      anomalyDetectionSensitivity: z.number()
    }).parse(req.body)

    settingsStore = {
      ...settingsStore,
      ...parsed
    }
    res.json(settingsStore)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// 21. Create Strategic OKRs
router.post('/strategic', async (req, res) => {
  try {
    const parsed = z.object({
      objective: z.string(),
      keyResult: z.string(),
      targetValue: z.number(),
      currentValue: z.number(),
      owner: z.string(),
      quarter: z.string(),
      year: z.number(),
      risks: z.string()
    }).parse(req.body)

    const okr = await prisma.strategicOKR.create({
      data: {
        ...parsed,
        progress: Math.round((parsed.currentValue / parsed.targetValue) * 100)
      }
    })
    res.json(okr)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// 22. Create Risk Assessment
router.post('/risk', async (req, res) => {
  try {
    const parsed = z.object({
      riskCategory: z.string(),
      riskDescription: z.string(),
      severity: z.string(),
      mitigationPlan: z.string(),
      status: z.string(),
      department: z.string()
    }).parse(req.body)

    const risk = await prisma.riskAssess.create({
      data: parsed
    })
    res.json(risk)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

export default router
