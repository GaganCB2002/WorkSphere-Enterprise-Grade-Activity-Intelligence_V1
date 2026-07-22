import { ActivityReportsView } from '../../modules/super_admin/ActivityReportsView'
import PageHeader from '../../components/layout/PageHeader'

export default function ActivityReportsPage() {
  return (
    <div className="flex-1 flex flex-col space-y-5 h-full bg-surface-secondary">
      <PageHeader
        title="Activity Reports"
        description="Silent module navigation and dwell-time tracker across all enterprise roles."
        status="Reporting"
      />
      <div className="h-[calc(100vh-16rem)] rounded-lg overflow-hidden border border-subtle bg-surface-elevated">
        <ActivityReportsView />
      </div>
    </div>
  )
}
