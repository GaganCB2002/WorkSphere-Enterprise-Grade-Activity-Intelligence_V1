import React from 'react';
import { Mail, Phone, Calendar, Shield, ExternalLink } from 'lucide-react';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Avatar } from '../components/ui/Avatar';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { SkillRadar } from '../components/profile/SkillRadar';
import { WorkHistory } from '../components/profile/WorkHistory';
import * as mock from '../data/mockData';

export function ProfilePage() {
  const emp = mock.currentEmployee;

  return (
    <EmployeePageLayout
      title="My Profile"
      description="View your personal information, skills, and work history"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'My Profile' }]}
    >
      <ProfileHeader emp={emp} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <GlassPanel animate>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">About</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{emp.bio}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {[
                { label: 'Email', value: emp.email, icon: Mail },
                { label: 'Phone', value: emp.phone, icon: Phone },
                { label: 'Joined', value: new Date(emp.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), icon: Calendar },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400"><item.icon className="w-4 h-4" /></div>
                  <div><p className="text-[10px] text-slate-400 font-medium">{item.label}</p><p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item.value}</p></div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <SkillRadar skills={emp.skills} />
          <WorkHistory workHistory={emp.workHistory} />
        </div>

        <div className="space-y-6">
          <GlassPanel animate>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Reporting Structure</h3>
            {[
              { label: 'Manager', person: emp.reportingManager },
              { label: 'Tech Lead', person: emp.techLead },
              { label: 'HR Partner', person: emp.hrAssigned },
            ].map(({ label, person }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors mb-1">
                <Avatar name={person.name} size="sm" status="online" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{person.name}</p>
                  <p className="text-[10px] text-slate-400">{label} • {person.designation}</p>
                </div>
              </div>
            ))}
          </GlassPanel>

          <GlassPanel animate>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Certifications</h3>
            <div className="space-y-2">
              {emp.certifications.map(cert => (
                <div key={cert.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{cert.name}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 ml-6">{cert.issuer} • {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                  {cert.credentialUrl && <a href={cert.credentialUrl} className="ml-6 mt-1 text-[10px] text-blue-500 hover:underline inline-flex items-center gap-1">View Credential <ExternalLink className="w-3 h-3" /></a>}
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel animate>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Achievements</h3>
            <div className="space-y-2">
              {emp.achievements.map(ach => (
                <div key={ach.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/[0.04]">
                  <span className="text-xl flex-shrink-0 mt-0.5">{ach.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{ach.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{ach.description}</p>
                    <p className="text-[9px] text-slate-400 mt-1">{new Date(ach.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </EmployeePageLayout>
  );
}

export default ProfilePage;
