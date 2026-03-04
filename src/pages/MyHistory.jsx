import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Activity, Calendar, FileText, AlertCircle } from 'lucide-react';

const MyHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState({
    appointments: [],
    prescriptions: [],
    diagnosisLogs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const [appointmentsRes, prescriptionsRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/prescriptions'),
      ]);

      setHistory({
        appointments: appointmentsRes.data.appointments || [],
        prescriptions: prescriptionsRes.data.prescriptions || [],
        diagnosisLogs: [],
      });
    } catch (error) {
      console.error('Error fetching medical history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Combine and sort all events by date
  const timeline = [
    ...history.appointments.map(apt => ({
      type: 'appointment',
      date: new Date(apt.date),
      data: apt,
    })),
    ...history.prescriptions.map(presc => ({
      type: 'prescription',
      date: new Date(presc.createdAt),
      data: presc,
    })),
  ].sort((a, b) => b.date - a.date);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-400">Loading medical history...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-50 mb-2">Medical History</h2>
          <p className="text-slate-400">Complete timeline of your medical records</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            icon={<Calendar className="text-blue-500" size={24} />}
            title="Total Appointments"
            value={history.appointments.length}
            color="blue"
          />
          <SummaryCard
            icon={<FileText className="text-green-500" size={24} />}
            title="Total Prescriptions"
            value={history.prescriptions.length}
            color="green"
          />
          <SummaryCard
            icon={<Activity className="text-purple-500" size={24} />}
            title="Completed Visits"
            value={history.appointments.filter(a => a.status === 'completed').length}
            color="purple"
          />
        </div>

        {/* Timeline */}
        <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
          <h3 className="text-xl font-semibold text-slate-50 mb-6">Medical Timeline</h3>
          
          {timeline.length > 0 ? (
            <div className="space-y-4">
              {timeline.map((event, idx) => (
                <div key={idx} className="relative pl-8 pb-8 border-l-2 border-dark-border last:pb-0">
                  {/* Timeline dot */}
                  <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
                    event.type === 'appointment' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  
                  {/* Event card */}
                  <div className="bg-dark-bg p-4 rounded-lg border border-dark-border hover:border-opacity-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {event.type === 'appointment' ? (
                          <Calendar className="text-blue-500" size={18} />
                        ) : (
                          <FileText className="text-green-500" size={18} />
                        )}
                        <span className="font-medium text-slate-200">
                          {event.type === 'appointment' ? 'Appointment' : 'Prescription'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {event.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    {event.type === 'appointment' ? (
                      <div>
                        <p className="text-slate-300 mb-1">
                          Dr. {event.data.doctorId?.name || 'N/A'}
                        </p>
                        <p className="text-sm text-slate-400">
                          Status: <span className="capitalize">{event.data.status}</span>
                        </p>
                        {event.data.reason && (
                          <p className="text-sm text-slate-400 mt-2">
                            Reason: {event.data.reason}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text-slate-300 mb-1 font-medium">
                          {event.data.diagnosis}
                        </p>
                        <p className="text-sm text-slate-400 mb-2">
                          Dr. {event.data.doctorId?.name || 'N/A'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.data.medicines.slice(0, 3).map((med, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded"
                            >
                              {med.name}
                            </span>
                          ))}
                          {event.data.medicines.length > 3 && (
                            <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">
                              +{event.data.medicines.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity size={64} className="mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No medical history yet
              </h3>
              <p className="text-slate-400">
                Your medical records will appear here as you visit doctors
              </p>
            </div>
          )}
        </div>

        {/* Health Alert */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-400 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-blue-400 mb-1">Important Note</h4>
              <p className="text-sm text-slate-300">
                This is your complete medical history. Keep track of your appointments and prescriptions. 
                Always consult with your doctor before making any changes to your treatment plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const SummaryCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500/20',
    green: 'bg-green-500/20',
    purple: 'bg-purple-500/20',
  };

  return (
    <div className="bg-dark-card p-5 rounded-lg border border-dark-border">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-slate-50">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default MyHistory;
