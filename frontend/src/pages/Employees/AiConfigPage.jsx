import { useState } from 'react'
import { Cpu } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'

const defaultToggles = {
  violenceDetection: true,
  productivityLstm: true,
  anomalyIsolation: true,
  behaviorClustering: true,
  llmExecutiveSummary: true,
}

export default function AiConfigPage() {
  const [toggles, setToggles] = useState(defaultToggles)

  return (
    <div className="flex-1 flex flex-col space-y-5 h-full bg-surface-secondary">
      <PageHeader
        title="AI Subsystem Feature Flags"
        description="Real-time control over active ML models and infrastructure."
        status="Configuration"
      />

      <div className="bg-surface-elevated border border-subtle rounded-lg">

      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(toggles).map(([key, value]) => (
            <div key={key} className="bg-surface-hover border border-subtle rounded-lg p-4 flex items-center justify-between">
              <div>
                <h5 className="text-sm font-medium text-primary capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h5>
                <span className="text-xs text-secondary mt-0.5 block">
                  {value ? 'Active & Polling' : 'Suspended'}
                </span>
              </div>
              <button
                onClick={() => setToggles(prev => ({ ...prev, [key]: !value }))}
                className={`w-11 h-5.5 rounded-full transition-colors relative p-0.5 ${value ? 'bg-brand-500' : 'bg-surface-hover border border-subtle'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-5.5' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
