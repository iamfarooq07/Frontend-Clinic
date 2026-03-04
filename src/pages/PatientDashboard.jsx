import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Calendar, FileText, Activity, Clock, User } from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      // Fetch appointments
      const appointmentsRes = await api.get('/appointments');
      setAppointments(appointmentsRes.data.appointments || []);

      // Fetch prescriptions
      const prescriptionsRes = await api.get('/prescriptions');
      setPrescriptions(prescriptionsRes.data.prescriptions || []);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      confirmed: '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#64748b';
  };

  const upcomingAppointments = appointments.filter(
    apt => new Date(apt.date) >= new Date() && apt.status !== 'cancelled'
  ).slice(0, 5);

  const recentPrescriptions = prescriptions.slice(0, 5);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-400">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-blue-100">
            Here's your health dashboard overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            icon={<Calendar size={24} />}
            title="Upcoming Appointments"
            value={upcomingAppointments.length}
            color="#3b82f6"
          />
          <StatCard
            icon={<FileText size={24} />}
            title="Total Prescriptions"
            value={prescriptions.length}
            color="#10b981"
          />
          <StatCard
            icon={<Activity size={24} />}
            title="Total Appointments"
            value={appointments.length}
            color="#f59e0b"
          />
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div className="flex items-center gap-3 mb-5">
            <Calendar className="text-blue-500" size={24} />
            <h3 className="text-xl font-semibold text-slate-50">
              Upcoming Appointments
            </h3>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt._id}
                  className="bg-dark-bg p-4 rounded-lg border border-dark-border hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <User className="text-blue-500" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">
                          Dr. {apt.doctorId?.name || 'N/A'}
                        </p>
                        <p className="text-sm text-slate-400">
                          {apt.doctorId?.specialization || 'General Physician'}
                        </p>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getStatusColor(apt.status) }}
                    >
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mt-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{new Date(apt.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{apt.time}</span>
                    </div>
                  </div>
                  {apt.reason && (
                    <p className="text-sm text-slate-400 mt-2">
                      Reason: {apt.reason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Calendar size={48} className="mx-auto mb-3 opacity-50" />
              <p>No upcoming appointments</p>
              <p className="text-sm mt-1">Contact reception to book an appointment</p>
            </div>
          )}
        </div>

        {/* Recent Prescriptions */}
        <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div className="flex items-center gap-3 mb-5">
            <FileText className="text-green-500" size={24} />
            <h3 className="text-xl font-semibold text-slate-50">
              Recent Prescriptions
            </h3>
          </div>

          {recentPrescriptions.length > 0 ? (
            <div className="space-y-3">
              {recentPrescriptions.map((presc) => (
                <div
                  key={presc._id}
                  className="bg-dark-bg p-4 rounded-lg border border-dark-border hover:border-green-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-slate-200 mb-1">
                        {presc.diagnosis}
                      </p>
                      <p className="text-sm text-slate-400">
                        Dr. {presc.doctorId?.name || 'N/A'}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(presc.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-slate-400 mb-2">Medicines:</p>
                    <div className="space-y-1">
                      {presc.medicines.slice(0, 3).map((med, idx) => (
                        <div key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {med.name} - {med.dosage}
                        </div>
                      ))}
                      {presc.medicines.length > 3 && (
                        <p className="text-xs text-slate-500 ml-3.5">
                          +{presc.medicines.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                  {presc.pdfUrl && (
                    <a
                      href={presc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-sm text-blue-400 hover:text-blue-300"
                    >
                      <FileText size={16} />
                      Download PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <FileText size={48} className="mx-auto mb-3 opacity-50" />
              <p>No prescriptions yet</p>
              <p className="text-sm mt-1">Your prescriptions will appear here</p>
            </div>
          )}
        </div>

        {/* Health Tips */}
        <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-purple-500" size={24} />
            <h3 className="text-xl font-semibold text-slate-50">
              Health Tips
            </h3>
          </div>
          <div className="space-y-3">
            <HealthTip
              icon="💊"
              text="Take your medications on time as prescribed by your doctor"
            />
            <HealthTip
              icon="🏃"
              text="Stay active with at least 30 minutes of exercise daily"
            />
            <HealthTip
              icon="🥗"
              text="Maintain a balanced diet with plenty of fruits and vegetables"
            />
            <HealthTip
              icon="💧"
              text="Drink at least 8 glasses of water every day"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-dark-card p-5 rounded-lg border border-dark-border hover:border-opacity-50 transition-all">
    <div className="flex items-center gap-4">
      <div
        className="p-3 rounded-lg"
        style={{
          color: color,
          backgroundColor: `${color}30`,
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-semibold text-slate-50">{value}</p>
      </div>
    </div>
  </div>
);

const HealthTip = ({ icon, text }) => (
  <div className="flex items-start gap-3 p-3 bg-dark-bg rounded-lg">
    <span className="text-2xl">{icon}</span>
    <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
  </div>
);

export default PatientDashboard;
