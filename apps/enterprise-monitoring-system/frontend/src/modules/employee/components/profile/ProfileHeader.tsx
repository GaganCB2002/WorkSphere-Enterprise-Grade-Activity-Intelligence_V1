import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Briefcase, MapPin, Edit3 } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { StatusBadge } from '../ui/StatusBadge';
import type { EmployeeProfile } from '../../types';

interface ProfileHeaderProps {
  emp: EmployeeProfile;
}

export function ProfileHeader({ emp }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8 border border-white/[0.06]"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <Avatar name={emp.name} size="xl" status="online" />
          <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-lg">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-white">{emp.name}</h1>
            <StatusBadge label="Active" variant="active" pulse />
          </div>
          <p className="text-sm text-slate-400 mt-1">{emp.designation}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> {emp.department}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> {emp.team}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {emp.location}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Employee ID</p>
            <p className="text-sm font-bold text-white font-mono">{emp.employeeId}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileHeader;
