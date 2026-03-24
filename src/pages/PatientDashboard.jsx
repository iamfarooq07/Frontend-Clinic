import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Calendar, FileText, Activity, Clock, User, Sparkles } from 'lucide-react';
import { StatCard } from '../components/ui/Card';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPatientData(); }, []);

  const fetchPatientData = async () => {
    try {
      const [apptRes, prescRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/prescriptions'),
      ]);
      setAppointments(apptRes.data.appointments || []);
      setPrescriptions(prescRes.data.prescriptions || []);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = { pending: '#f59e0b', confirmed: '#3b82f6', completed: '#10b981', cancelled: '#ef4444' };
  const upcomingAppointments = appointments.filter(a => new Date(a.date) >= new Date() && a.status !== 'cancelled').slice(0, 5);
  const recentPrescriptions = prescriptions.slice(0, 5);

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
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-cyan-600/20
                     backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 shadow-glass"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-glow-blue text-lg font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Welcome back, {user.name}!</h2>
              <p className="text-sm text-blue-300/80">Here's your health dashboard overview</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={<Calendar size={22} />} title="Upcoming Appointments" value={upcomingAppointments.length} color="#3b82f6" delay={0} />
          <StatCard icon={<FileText size={22} />} title="Total Prescriptions" value={prescriptions.length} color="#10b981" delay={0.1} />
          <StatCard icon={<Activity size={22} />} title="Total Appointments" value={appointments.length} color="#f59e0b" delay={0.2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-glass">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-400" size={18} />
              <h3 className="font-semibold text-slate-200">Upcoming Appointments</h3>
            </div>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div key={apt._id} className="bg-white/[0.03] border border-white/8 rounded-xl p-3 hover:border-blue-500/30 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <User size={14} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200">Dr. {apt.doctorId?.name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{apt.doctorId?.specialization || 'General Physician'}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                        style={{ backgroundColor: `${statusColors[apt.status]}30`, color: statusColors[apt.status], border: `1px solid ${statusColors[apt.status]}40` }}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={12} />{new Date(apt.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{apt.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Calendar size={36} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No upcoming appointments</p>
              </div>
            )}
          </motion.div>

          {/* Recent Prescriptions */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-glass">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-emerald-400" size={18} />
              <h3 className="font-semibold text-slate-200">Recent Prescriptions</h3>
            </div>
            {recentPrescriptions.length > 0 ? (
              <div className="space-y-3">
                {recentPrescriptions.map((presc) => (
                  <div key={presc._id} className="bg-white/[0.03] border border-white/8 rounded-xl p-3 hover:border-emerald-500/30 transition-all">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-slate-200">{presc.diagnosis}</p>
                      <span className="text-xs text-slate-500">{new Date(presc.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Dr. {presc.doctorId?.name || 'N/A'}</p>
                    <div className="space-y-1">
                      {presc.medicines.slice(0, 2).map((med, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                          {med.name} - {med.dosage}
                        </div>
                      ))}
                      {presc.medicines.length > 2 && <p className="text-xs text-slate-600 ml-3">+{presc.medicines.length - 2} more</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <FileText size={36} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No prescriptions yet</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Health Tips */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-glass">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-purple-400" size={18} />
            <h3 className="font-semibold text-slate-200">Health Tips</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: "💊", text: "Take medications on time as prescribed" },
              { icon: "🏃", text: "30 minutes of exercise daily keeps you healthy" },
              { icon: "🥗", text: "Balanced diet with fruits and vegetables" },
              { icon: "💧", text: "Drink at least 8 glasses of water daily" },
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.03] border border-white/8 rounded-xl">
                <span className="text-xl">{tip.icon}</span>
                <p className="text-xs text-slate-400 leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
