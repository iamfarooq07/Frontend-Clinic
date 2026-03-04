import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, FileText, DollarSign } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

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

  if (loading) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#f1f5f9' }}>
        Admin Dashboard
      </h2>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard
          icon={<Users size={24} />}
          title="Total Patients"
          value={analytics?.overview?.totalPatients || 0}
          color="#3b82f6"
        />
        <StatCard
          icon={<Users size={24} />}
          title="Total Doctors"
          value={analytics?.overview?.totalDoctors || 0}
          color="#10b981"
        />
        <StatCard
          icon={<Calendar size={24} />}
          title="Monthly Appointments"
          value={analytics?.overview?.monthlyAppointments || 0}
          color="#f59e0b"
        />
        <StatCard
          icon={<DollarSign size={24} />}
          title="Revenue (Simulated)"
          value={`$${analytics?.overview?.simulatedRevenue || 0}`}
          color="#8b5cf6"
        />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {/* Appointment Status */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '18px', color: '#f1f5f9' }}>Appointments by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics?.appointmentsByStatus || []}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {(analytics?.appointmentsByStatus || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }} />
              <Legend wrapperStyle={{ color: '#e2e8f0' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Common Diagnoses */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '18px', color: '#f1f5f9' }}>Common Diagnoses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={(analytics?.commonDiagnoses || []).slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="_id" angle={-45} textAnchor="end" height={100} stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }} />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
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

export default AdminDashboard;
