import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Calendar, FileText, Users, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/ui/Card';

const statusStyle = {
  pending:   { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20' },
  confirmed: { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/20' },
  completed: { bg: 'bg-emerald-500/10',text: 'text-emerald-400',border: 'border-emerald-500/20' },
  cancelled: { bg: 'bg-red-500/10',    text: 'text-red-400',    border: 'border-red-500/20' },
};

const DoctorDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAnalytics(); }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/analytics/doctor');
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Layout>
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xl font-bold text-slate-100">Doctor Dashboard</motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Calendar size={22} />} title="Today's Appointments" value={analytics?.overview?.todayAppointments || 0} color="#3b82f6" delay={0} />
          <StatCard icon={<TrendingUp size={22} />} title="Monthly Appointments" value={analytics?.overview?.monthlyAppointments || 0} color="#10b981" delay={0.1} />
          <StatCard icon={<FileText size={22} />} title="Monthly Prescriptions" value={analytics?.overview?.monthlyPrescriptions || 0} color="#f59e0b" delay={0.2} />
          <StatCard icon={<Users size={22} />} title="Total Patients" value={analytics?.overview?.totalPatients || 0} color="#8b5cf6" delay={0.3} />
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-glass">
          <h3 className="font-semibold text-slate-200 mb-4">Recent Appointments</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Patient', 'Date', 'Time', 'Status'].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(analytics?.recentAppointments || []).map((apt) => {
                  const s = statusStyle[apt.status] || statusStyle.pending;
                  return (
                    <tr key={apt._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-3 py-3 text-slate-300">{apt.patientId?.name}</td>
                      <td className="px-3 py-3 text-slate-400">{new Date(apt.date).toLocaleDateString()}</td>
                      <td className="px-3 py-3 text-slate-400">{apt.time}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {(!analytics?.recentAppointments?.length) && (
              <p className="text-center text-slate-500 text-sm py-6">No recent appointments</p>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
