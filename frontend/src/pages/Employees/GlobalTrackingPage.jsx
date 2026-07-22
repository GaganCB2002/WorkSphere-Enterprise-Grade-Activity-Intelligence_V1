import { LiveTrackingView } from '../../modules/hr/components/LiveTrackingView'
import PageHeader from '../../components/layout/PageHeader'

export default function GlobalTrackingPage() {
  return (
    <div className="flex-1 flex flex-col space-y-5 h-full bg-surface-secondary">
      <PageHeader
        title="Global Tracking"
        description="Live geospatial monitoring of the global workforce."
        status="Active Monitoring"
      />
      <div className="h-[calc(100vh-16rem)] rounded-lg overflow-hidden border border-subtle">
        <LiveTrackingView />
      </div>
    </div>
  )
}
