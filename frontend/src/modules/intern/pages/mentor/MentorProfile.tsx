import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, Briefcase, Building2, Calendar, MessageSquare, Video,
  MapPin, Star, Award, Clock, ChevronRight, ExternalLink
} from 'lucide-react';
import InternPageShell from '../../InternPageShell';

const MentorProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'sessions'>('profile');

  const mentor = {
    name: 'Dr. Sarah Mitchell',
    designation: 'Senior Engineering Manager',
    department: 'Engineering & Technology',
    email: 'sarah.mitchell@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Dr. Sarah Mitchell is a seasoned engineering leader with over 15 years of experience in software development and team mentoring. She specializes in distributed systems, microservices architecture, and fostering engineering excellence. Sarah is passionate about nurturing young talent and has mentored over 50 interns through successful career launches.',
    expertise: ['System Architecture', 'Microservices', 'Cloud Computing', 'Python', 'Go', 'Mentoring', 'Agile Practices', 'Code Review'],
    avatar: null,
  };

  const upcomingSessions = [
    { date: '2026-07-25', time: '10:00 AM', duration: '45 min', topic: 'Weekly 1-on-1', type: 'Video Call' },
    { date: '2026-08-01', time: '10:00 AM', duration: '45 min', topic: 'Code Review Session', type: 'In-Person' },
    { date: '2026-08-08', time: '11:00 AM', duration: '30 min', topic: 'Career Guidance', type: 'Video Call' },
  ];

  return (
    <InternPageShell title="My Mentor" description="Your assigned mentor details">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-slate-500 dark:text-slate-400" />
                </div>
              </div>
            </div>
            <div className="pt-14 pb-6 px-6 text-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{mentor.name}</h2>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">{mentor.designation}</p>
              <p className="text-xs text-slate-500 mt-1">{mentor.department}</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-slate-400">
                <MapPin className="w-3 h-3" />
                <span>{mentor.location}</span>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-slate-900 dark:text-white">4.9</span>
                  <span>(24 reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Award className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">Senior</span>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href={`mailto:${mentor.email}`} className="text-blue-600 dark:text-blue-400 hover:underline truncate">{mentor.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300">{mentor.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300">{mentor.department}</span>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex gap-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Schedule
              </button>
              <button className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
            </div>
          </motion.div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-3">About</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{mentor.bio}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Expertise Areas</h3>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-500/20">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Upcoming Sessions</h3>
              <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {upcomingSessions.map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{session.topic}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{session.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{session.time}</span>
                        <span>{session.duration}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                    Join <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </InternPageShell>
  );
};

export default MentorProfile;
