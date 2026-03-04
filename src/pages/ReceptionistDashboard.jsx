import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { Calendar, Users, Clock } from 'lucide-react';

const ReceptionistDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get('/analytics/receptionist');
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
        Receptionist Dashboard
      </h2>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard
          icon={<Calendar size={24} />}
          title="Today's Appointments"
          value={analytics?.overview?.todayAppointmentsCount || 0}
          color="#3b82f6"
        />
        <StatCard
          icon={<Clock size={24} />}
          title="Pending Appointments"
          value={analytics?.overview?.pendingAppointments || 0}
          color="#f59e0b"
        />
        <StatCard
          icon={<Users size={24} />}
          title="Total Patients"
          value={analytics?.overview?.totalPatients || 0}
          color="#10b981"
        />
      </div>

      {/* Today's Appointments */}
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', marginBottom: '20px', border: '1px solid #334155' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', color: '#f1f5f9' }}>Today's Appointments</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Time</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Patient</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Doctor</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Contact</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {(analytics?.todayAppointments || []).map((apt) => (
                <tr key={apt._id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{apt.time}</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{apt.patientId?.name}</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{apt.doctorId?.name}</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{apt.patientId?.contact}</td>
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

      {/* Recent Patients */}
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px', color: '#f1f5f9' }}>Recent Patients</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Age</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Gender</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Contact</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#94a3b8' }}>Registered</th>
              </tr>
            </thead>
            <tbody>
              {(analytics?.recentPatients || []).map((patient) => (
                <tr key={patient._id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{patient.name}</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{patient.age}</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{patient.gender}</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{patient.contact}</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{new Date(patient.createdAt).toLocaleDateString()}</td>
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

export default ReceptionistDashboard;
