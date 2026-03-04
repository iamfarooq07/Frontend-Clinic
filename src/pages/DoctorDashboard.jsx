import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { Calendar, FileText, Users, TrendingUp } from 'lucide-react';

const DoctorDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

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

  if (loading) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#f1f5f9' }}>
        Doctor Dashboard
      </h2>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard
          icon={<Calendar size={24} />}
          title="Today's Appointments"
          value={analytics?.overview?.todayAppointments || 0}
          color="#3b82f6"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          title="Monthly Appointments"
          value={analytics?.overview?.monthlyAppointments || 0}
          color="#10b981"
        />
        <StatCard
          icon={<FileText size={24} />}
          title="Monthly Prescriptions"
          value={analytics?.overview?.monthlyPrescriptions || 0}
          color="#f59e0b"
        />
        <StatCard
          icon={<Users size={24} />}
          title="Total Patients"
          value={analytics?.overview?.totalPatients || 0}
          color="#8b5cf6"
        />
      </div>

      {/* Recent Appointments */}
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', color: '#f1f5f9' }}>Recent Appointments</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Patient</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Time</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(analytics?.recentAppointments || []).map((apt) => (
                <tr key={apt._id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{apt.patientId?.name}</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{new Date(apt.date).toLocaleDateString()}</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{apt.time}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      backgroundColor: getStatusColor(apt.status),
                      color: 'white',
                    }}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div style={{
    backgroundColor: '#1e293b',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    border: '1px solid #334155',
  }}>
    <div style={{ color, backgroundColor: `${color}30`, padding: '12px', borderRadius: '8px' }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '5px' }}>{title}</p>
      <p style={{ fontSize: '24px', fontWeight: '600', color: '#f1f5f9' }}>{value}</p>
    </div>
  </div>
);

const getStatusColor = (status) => {
  const colors = {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    completed: '#10b981',
    cancelled: '#ef4444',
  };
  return colors[status] || '#64748b';
};

export default DoctorDashboard;
