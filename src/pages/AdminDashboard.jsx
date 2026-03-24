import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { StatCard } from '../components/ui/Card';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: 'rgba(13,20,36,0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#e2e8f0',
    fontSize: '12px',
  }
};

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAnalytics(); }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/analytics/admin');
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
          className="text-xl font-bold text-slate-100">Admin Dashboard</motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Users size={22} />} title="Total Patients" value={analytics?.overview?.totalPatients || 0} color="#3b82f6" delay={0} />
          <StatCard icon={<Users size={22} />} title="Total Doctors" value={analytics?.overview?.totalDoctors || 0} color="#10b981" delay={0.1} />
          <StatCard icon={<Calendar size={22} />} title="Monthly Appointments" value={analytics?.overview?.monthlyAppointments || 0} color="#f59e0b" delay={0.2} />
          <StatCard icon={<DollarSign size={22} />} title="Revenue" value={`$${analytics?.overview?.simulatedRevenue || 0}`} color="#8b5cf6" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-glass">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-blue-400" />
              <h3 className="font-semibold text-slate-200">Appointments by Status</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={analytics?.appointmentsByStatus || []} dataKey="count" nameKey="_id"
                  cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3}>
                  {(analytics?.appointmentsByStatus || []).map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-glass">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-emerald-400" />
              <h3 className="font-semibold text-slate-200">Common Diagnoses</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={(analytics?.commonDiagnoses || []).slice(0, 5)} margin={{ bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="_id" angle={-30} textAnchor="end" height={60} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
