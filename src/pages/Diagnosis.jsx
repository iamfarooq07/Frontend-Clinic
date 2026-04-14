import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, AlertTriangle } from 'lucide-react';

const Diagnosis = () => {
  const { user } = useAuth();
  const [diagnosisLogs, setDiagnosisLogs] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    symptoms: '',
    medicalHistory: '',
  });
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    fetchDiagnosisLogs();
    fetchPatients();
  }, []);

  const fetchDiagnosisLogs = async () => {
    try {
      const { data } = await api.get('/diagnosis');
      setDiagnosisLogs(data.logs);
    } catch (error) {
      console.error('Error fetching diagnosis logs:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const { data } = await api.get('/patients');
      setPatients(data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/diagnosis', formData);
      setAiResult(data);
      setShowModal(false);
      setFormData({ patientId: '', symptoms: '', medicalHistory: '' });
      fetchDiagnosisLogs();
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating diagnosis');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    const colors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444', critical: '#dc2626' };
    return colors[level] || '#64748b';
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #475569',
    borderRadius: '6px',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#94a3b8',
  };

  return (
    <Layout>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#f1f5f9' }}>AI Diagnosis</h2>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', backgroundColor: '#3b82f6',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px', fontWeight: '500',
          }}
        >
          <Plus size={18} />
          New Diagnosis
        </button>
      </div>

      {/* Diagnosis Cards */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {diagnosisLogs.length === 0 && (
          <div style={{
            backgroundColor: '#1e293b', border: '1px solid #334155',
            borderRadius: '8px', padding: '40px', textAlign: 'center', color: '#64748b',
          }}>
            No diagnosis records found. Click "New Diagnosis" to start.
          </div>
        )}
        {diagnosisLogs.map((log) => (
          <div key={log._id} style={{
            backgroundColor: '#1e293b', border: '1px solid #334155',
            borderRadius: '8px', padding: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#f1f5f9', marginBottom: '4px' }}>
                  {log.patientId?.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  {new Date(log.createdAt).toLocaleDateString()} — Dr. {log.doctorId?.name}
                </p>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600',
                backgroundColor: `${getRiskColor(log.riskLevel)}20`,
                color: getRiskColor(log.riskLevel),
              }}>
                <AlertTriangle size={14} />
                {log.riskLevel?.toUpperCase()} RISK
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', marginBottom: '4px' }}>Symptoms</p>
              <p style={{ fontSize: '14px', color: '#e2e8f0' }}>{log.symptoms}</p>
            </div>

            {log.aiResponse && (
              <div style={{ display: 'grid', gap: '12px', borderTop: '1px solid #334155', paddingTop: '12px' }}>
                {log.aiResponse.possibleConditions?.length > 0 && (
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', marginBottom: '6px' }}>Possible Conditions</p>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {log.aiResponse.possibleConditions.map((c, i) => (
                        <li key={i} style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '2px' }}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {log.aiResponse.suggestedTests?.length > 0 && (
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', marginBottom: '6px' }}>Suggested Tests</p>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {log.aiResponse.suggestedTests.map((t, i) => (
                        <li key={i} style={{ fontSize: '14px', color: '#e2e8f0', marginBottom: '2px' }}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {log.aiResponse.recommendations && (
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', marginBottom: '4px' }}>Recommendations</p>
                    <p style={{ fontSize: '14px', color: '#e2e8f0' }}>{log.aiResponse.recommendations}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#1e293b', border: '1px solid #334155',
            padding: '30px', borderRadius: '8px',
            width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto',
          }}>
            <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '600', color: '#f1f5f9' }}>
              AI Symptom Analysis
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Patient *</label>
                <select
                  required
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  style={inputStyle}
                >
                  <option value="">Select Patient</option>
                  {patients.map((p) => (
                    <option key={p._id} value={p._id}>{p.name} — {p.age}y, {p.gender}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Symptoms *</label>
                <textarea
                  required
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  rows="4"
                  placeholder="Describe the symptoms in detail..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Medical History</label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  rows="3"
                  placeholder="Any relevant medical history..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1, padding: '10px', border: 'none', borderRadius: '6px',
                    backgroundColor: loading ? '#475569' : '#3b82f6',
                    color: 'white', cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: '500', fontSize: '14px',
                  }}
                >
                  {loading ? 'Analyzing...' : 'Analyze with AI'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  style={{
                    flex: 1, padding: '10px', border: 'none', borderRadius: '6px',
                    backgroundColor: '#334155', color: '#e2e8f0',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: '500', fontSize: '14px',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Diagnosis;
