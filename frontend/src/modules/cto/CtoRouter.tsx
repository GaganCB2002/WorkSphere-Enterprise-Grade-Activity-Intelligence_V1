import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EnterpriseShell from '../../components/layout/EnterpriseShell/EnterpriseShell';

const ExecutiveOverview = React.lazy(() => import('./pages/ExecutiveOverview'));

const EngineeringOverview = React.lazy(() => import('./pages/EngineeringOverview'));
const TeamPerformance = React.lazy(() => import('./pages/TeamPerformance'));
const EngineeringAnalytics = React.lazy(() => import('./pages/EngineeringAnalytics'));
const SprintDashboard = React.lazy(() => import('./pages/SprintDashboard'));
const CodeQuality = React.lazy(() => import('./pages/CodeQuality'));
const CodeCoverage = React.lazy(() => import('./pages/CodeCoverage'));
const TechnicalDebt = React.lazy(() => import('./pages/TechnicalDebt'));

const Releases = React.lazy(() => import('./pages/Releases'));
const CicdPipelines = React.lazy(() => import('./pages/CicdPipelines'));
const Deployments = React.lazy(() => import('./pages/Deployments'));
const BuildStatus = React.lazy(() => import('./pages/BuildStatus'));
const Rollbacks = React.lazy(() => import('./pages/Rollbacks'));
const ReleaseCalendar = React.lazy(() => import('./pages/ReleaseCalendar'));

const ActiveProjects = React.lazy(() => import('./pages/ActiveProjects'));
const ProjectPortfolio = React.lazy(() => import('./pages/ProjectPortfolio'));
const SprintBoard = React.lazy(() => import('./pages/SprintBoard'));
const Roadmap = React.lazy(() => import('./pages/Roadmap'));
const Milestones = React.lazy(() => import('./pages/Milestones'));
const ResourceAllocation = React.lazy(() => import('./pages/ResourceAllocation'));

const SystemArchitecture = React.lazy(() => import('./pages/SystemArchitecture'));
const Microservices = React.lazy(() => import('./pages/Microservices'));
const ApiGateway = React.lazy(() => import('./pages/ApiGateway'));
const ServiceDependencies = React.lazy(() => import('./pages/ServiceDependencies'));
const DatabaseArchitecture = React.lazy(() => import('./pages/DatabaseArchitecture'));

const Servers = React.lazy(() => import('./pages/Servers'));
const Kubernetes = React.lazy(() => import('./pages/Kubernetes'));
const Docker = React.lazy(() => import('./pages/Docker'));
const VirtualMachines = React.lazy(() => import('./pages/VirtualMachines'));
const Storage = React.lazy(() => import('./pages/Storage'));
const Network = React.lazy(() => import('./pages/Network'));

const Aws = React.lazy(() => import('./pages/Aws'));
const Azure = React.lazy(() => import('./pages/Azure'));
const GoogleCloud = React.lazy(() => import('./pages/GoogleCloud'));
const CloudCost = React.lazy(() => import('./pages/CloudCost'));
const AutoScaling = React.lazy(() => import('./pages/AutoScaling'));
const BackupRecovery = React.lazy(() => import('./pages/BackupRecovery'));

const SystemHealth = React.lazy(() => import('./pages/SystemHealth'));
const ApplicationHealth = React.lazy(() => import('./pages/ApplicationHealth'));
const Uptime = React.lazy(() => import('./pages/Uptime'));
const Performance = React.lazy(() => import('./pages/Performance'));
const ErrorLogs = React.lazy(() => import('./pages/ErrorLogs'));
const AlertCenter = React.lazy(() => import('./pages/AlertCenter'));

const SecurityDashboard = React.lazy(() => import('./pages/SecurityDashboard'));
const Vulnerabilities = React.lazy(() => import('./pages/Vulnerabilities'));
const ThreatIntelligence = React.lazy(() => import('./pages/ThreatIntelligence'));
const Siem = React.lazy(() => import('./pages/Siem'));
const AuditLogs = React.lazy(() => import('./pages/AuditLogs'));
const ZeroTrust = React.lazy(() => import('./pages/ZeroTrust'));

const DevopsCicd = React.lazy(() => import('./pages/DevopsCicd'));
const IaC = React.lazy(() => import('./pages/IaC'));
const Automation = React.lazy(() => import('./pages/Automation'));
const Containers = React.lazy(() => import('./pages/Containers'));
const SecretsManagement = React.lazy(() => import('./pages/SecretsManagement'));

const AiModels = React.lazy(() => import('./pages/AiModels'));
const LlmConfiguration = React.lazy(() => import('./pages/LlmConfiguration'));
const AiAnalytics = React.lazy(() => import('./pages/AiAnalytics'));
const PromptManagement = React.lazy(() => import('./pages/PromptManagement'));
const GpuUsage = React.lazy(() => import('./pages/GpuUsage'));
const AiCost = React.lazy(() => import('./pages/AiCost'));

const Databases = React.lazy(() => import('./pages/Databases'));
const DataWarehouse = React.lazy(() => import('./pages/DataWarehouse'));
const EtlJobs = React.lazy(() => import('./pages/EtlJobs'));
const BackupStatus = React.lazy(() => import('./pages/BackupStatus'));
const DataQuality = React.lazy(() => import('./pages/DataQuality'));

const CloudBilling = React.lazy(() => import('./pages/CloudBilling'));
const SoftwareLicenses = React.lazy(() => import('./pages/SoftwareLicenses'));
const InfrastructureCost = React.lazy(() => import('./pages/InfrastructureCost'));
const VendorContracts = React.lazy(() => import('./pages/VendorContracts'));

const Rd = React.lazy(() => import('./pages/Rd'));
const ProofOfConcepts = React.lazy(() => import('./pages/ProofOfConcepts'));
const TechnologyRoadmap = React.lazy(() => import('./pages/TechnologyRoadmap'));
const EmergingTechnologies = React.lazy(() => import('./pages/EmergingTechnologies'));

const Vendors = React.lazy(() => import('./pages/Vendors'));
const Contracts = React.lazy(() => import('./pages/Contracts'));
const Renewals = React.lazy(() => import('./pages/Renewals'));
const Sla = React.lazy(() => import('./pages/Sla'));

const ExecutiveReports = React.lazy(() => import('./pages/ExecutiveReports'));
const EngineeringReports = React.lazy(() => import('./pages/EngineeringReports'));
const InfrastructureReports = React.lazy(() => import('./pages/InfrastructureReports'));
const CostReports = React.lazy(() => import('./pages/CostReports'));
const SecurityReports = React.lazy(() => import('./pages/SecurityReports'));

const InfrastructureRequests = React.lazy(() => import('./pages/InfrastructureRequests'));
const ProductionDeployments = React.lazy(() => import('./pages/ProductionDeployments'));
const SoftwarePurchases = React.lazy(() => import('./pages/SoftwarePurchases'));
const CloudBudgetRequests = React.lazy(() => import('./pages/CloudBudgetRequests'));

const EngineeringMeetings = React.lazy(() => import('./pages/EngineeringMeetings'));
const ArchitectureReviews = React.lazy(() => import('./pages/ArchitectureReviews'));
const SprintPlanning = React.lazy(() => import('./pages/SprintPlanning'));
const ExecutiveMeetings = React.lazy(() => import('./pages/ExecutiveMeetings'));

const NotificationsPage = React.lazy(() => import('./pages/NotificationsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));

const FallbackLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-[3px] border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="text-[11px] font-bold text-slate-500 tracking-widest uppercase">Loading...</span>
    </div>
  </div>
);

const CtoRouter: React.FC = () => {
  return (
    <EnterpriseShell>
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="executive-overview" replace />} />
          <Route path="executive-overview" element={<ExecutiveOverview />} />

          {/* Engineering */}
          <Route path="engineering" element={<EngineeringOverview />} />
          <Route path="team-performance" element={<TeamPerformance />} />
          <Route path="engineering-analytics" element={<EngineeringAnalytics />} />
          <Route path="sprint-dashboard" element={<SprintDashboard />} />
          <Route path="code-quality" element={<CodeQuality />} />
          <Route path="code-coverage" element={<CodeCoverage />} />
          <Route path="technical-debt" element={<TechnicalDebt />} />

          {/* Software Delivery */}
          <Route path="releases" element={<Releases />} />
          <Route path="cicd-pipelines" element={<CicdPipelines />} />
          <Route path="deployments" element={<Deployments />} />
          <Route path="build-status" element={<BuildStatus />} />
          <Route path="rollbacks" element={<Rollbacks />} />
          <Route path="release-calendar" element={<ReleaseCalendar />} />

          {/* Projects */}
          <Route path="active-projects" element={<ActiveProjects />} />
          <Route path="project-portfolio" element={<ProjectPortfolio />} />
          <Route path="sprint-board" element={<SprintBoard />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="milestones" element={<Milestones />} />
          <Route path="resource-allocation" element={<ResourceAllocation />} />

          {/* Architecture */}
          <Route path="system-architecture" element={<SystemArchitecture />} />
          <Route path="microservices" element={<Microservices />} />
          <Route path="api-gateway" element={<ApiGateway />} />
          <Route path="service-dependencies" element={<ServiceDependencies />} />
          <Route path="database-architecture" element={<DatabaseArchitecture />} />

          {/* Infrastructure */}
          <Route path="servers" element={<Servers />} />
          <Route path="kubernetes" element={<Kubernetes />} />
          <Route path="docker" element={<Docker />} />
          <Route path="virtual-machines" element={<VirtualMachines />} />
          <Route path="storage" element={<Storage />} />
          <Route path="network" element={<Network />} />

          {/* Cloud Operations */}
          <Route path="cloud/aws" element={<Aws />} />
          <Route path="cloud/azure" element={<Azure />} />
          <Route path="cloud/gcp" element={<GoogleCloud />} />
          <Route path="cloud-cost" element={<CloudCost />} />
          <Route path="auto-scaling" element={<AutoScaling />} />
          <Route path="backup-recovery" element={<BackupRecovery />} />

          {/* Monitoring */}
          <Route path="system-health" element={<SystemHealth />} />
          <Route path="application-health" element={<ApplicationHealth />} />
          <Route path="uptime" element={<Uptime />} />
          <Route path="performance" element={<Performance />} />
          <Route path="error-logs" element={<ErrorLogs />} />
          <Route path="alert-center" element={<AlertCenter />} />

          {/* Cyber Security */}
          <Route path="security-dashboard" element={<SecurityDashboard />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
          <Route path="threat-intelligence" element={<ThreatIntelligence />} />
          <Route path="siem" element={<Siem />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="zero-trust" element={<ZeroTrust />} />

          {/* DevOps */}
          <Route path="devops/cicd" element={<DevopsCicd />} />
          <Route path="infrastructure-as-code" element={<IaC />} />
          <Route path="automation" element={<Automation />} />
          <Route path="containers" element={<Containers />} />
          <Route path="secrets-management" element={<SecretsManagement />} />

          {/* AI Platform */}
          <Route path="ai-models" element={<AiModels />} />
          <Route path="llm-configuration" element={<LlmConfiguration />} />
          <Route path="ai-analytics" element={<AiAnalytics />} />
          <Route path="prompt-management" element={<PromptManagement />} />
          <Route path="gpu-usage" element={<GpuUsage />} />
          <Route path="ai-cost" element={<AiCost />} />

          {/* Data Platform */}
          <Route path="databases" element={<Databases />} />
          <Route path="data-warehouse" element={<DataWarehouse />} />
          <Route path="etl-jobs" element={<EtlJobs />} />
          <Route path="backup-status" element={<BackupStatus />} />
          <Route path="data-quality" element={<DataQuality />} />

          {/* Technology Finance */}
          <Route path="cloud-billing" element={<CloudBilling />} />
          <Route path="software-licenses" element={<SoftwareLicenses />} />
          <Route path="infrastructure-cost" element={<InfrastructureCost />} />
          <Route path="vendor-contracts" element={<VendorContracts />} />

          {/* Innovation */}
          <Route path="rd" element={<Rd />} />
          <Route path="proof-of-concepts" element={<ProofOfConcepts />} />
          <Route path="technology-roadmap" element={<TechnologyRoadmap />} />
          <Route path="emerging-technologies" element={<EmergingTechnologies />} />

          {/* Vendor Management */}
          <Route path="vendors" element={<Vendors />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="renewals" element={<Renewals />} />
          <Route path="sla" element={<Sla />} />

          {/* Reports */}
          <Route path="executive-reports" element={<ExecutiveReports />} />
          <Route path="engineering-reports" element={<EngineeringReports />} />
          <Route path="infrastructure-reports" element={<InfrastructureReports />} />
          <Route path="cost-reports" element={<CostReports />} />
          <Route path="security-reports" element={<SecurityReports />} />

          {/* Approvals */}
          <Route path="infrastructure-requests" element={<InfrastructureRequests />} />
          <Route path="production-deployments" element={<ProductionDeployments />} />
          <Route path="software-purchases" element={<SoftwarePurchases />} />
          <Route path="cloud-budget-requests" element={<CloudBudgetRequests />} />

          {/* Meetings */}
          <Route path="engineering-meetings" element={<EngineeringMeetings />} />
          <Route path="architecture-reviews" element={<ArchitectureReviews />} />
          <Route path="sprint-planning" element={<SprintPlanning />} />
          <Route path="executive-meetings" element={<ExecutiveMeetings />} />

          {/* Notifications & Settings */}
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />

          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">404 - Not Found</h2>
              <p className="text-sm text-slate-500">The requested CTO module does not exist.</p>
            </div>
          } />
        </Routes>
      </Suspense>
    </EnterpriseShell>
  );
};

export default CtoRouter;
