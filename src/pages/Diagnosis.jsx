import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, AlertTriangle, Crown } from 'lucide-react';

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
    
    if (user.subscriptionPlan !== 'pro') {
      alert('AI Diagnosis requires a Pro subscription. Please upgrade your plan.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/diagnosis', formData);
      setAiResult(data);
      setShowModal(false);
      setFormData({ patientId: '', symptoms: '', medicalHistory: '' });
      fetchDiagnosisLogs();
    } catch (error) {
      if (error.response?.data?.upgrade) {
        alert('This feature requires a Pro subscription');
      } else {
        alert(error.response?.data?.message || 'Error creating diagnosis');
      }
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#dc2626',
    };
    return colors[level] || '#64748b';
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '5px' }}>AI Diagnosis</h2>
          {user.subscriptionPlan !== 'pro' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '14px' }}>
              <Crown size={16} />
              <span>Pro Plan Required</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={user.subscriptionPlan !== 'pro'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: user.subscriptionPlan === 'pro' ? '#3b82f6' : '#94a3b8',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: user.subscriptionPlan === 'pro' ? 'pointer' : 'not-allowed',
          }}
        >
          <Plus size={18} />
          New Diagnosis
        </button>
      </div>

      {user.subscriptionPlan !== 'pro' && (
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fbbf24',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          <p style={{ fontSize: '14px', color: '#92400e' }}>
            Upgrade to Pro Plan to unlock AI-powered diagnosis features including symptom analysis, risk assessment, and treatment recommendations.
          </p>
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {diagnosisLogs.map((log) => (
          <div
            key={log._id}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{log.patientId?.name}</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>
                  {new Date(log.createdAt).toLocaleDateString()} - Dr. {log.doctorId?.name}
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: `${getRiskColor(log.riskLevel)}20`,
                color: getRiskColor(log.riskLevel),
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
              }}>
                <AlertTriangle size={16} />
                {log.riskLevel.toUpperCase()} RISK
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>Symptoms:</p>
              <p style={{ fontSize: '14px', color: '#334155' }}>{log.symptoms}</p>
            </div>

            {log.aiResponse && (
              <>
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>Possible Conditions:</p>
                  <ul style={{ marginLeft: '20px', fontSize: '14px', color: '#334155' }}>
                    {log.aiResponse.possibleConditions?.map((condition, idx) => (
                      <li key={idx}>{condition}</li>
                    ))}
                  </ul>
                </div>

                {log.aiResponse.suggestedTests && log.aiResponse.suggestedTests.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>Suggested Tests:</p>
                    <ul style={{ marginLeft: '20px', fontSize: '14px', color: '#334155' }}>
                      {log.aiResponse.suggestedTests.map((test, idx) => (
                        <li key={idx}>{test}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {log.aiResponse.recommendations && (
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>Recommendations:</p>
                    <p style={{ fontSize: '14px', color: '#334155' }}>{log.aiResponse.recommendations}</p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '600px',
          }}>
            <h3 style={{ marginBottom: '20px' }}>AI Symptom Analysis</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Patient *</label>
                <select
                  required
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                >
                  <option value="">Select Patient</option>
                  {patients.map((p) => (
                    <option key={p._id} value={p._id}>{p.name} - {p.age}y, {p.gender}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Symptoms *</label>
                <textarea
                  required
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  rows="4"
                  placeholder="Describe the symptoms in detail..."
                  style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Medical History</label>
                <textarea
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  rows="3"
                  placeholder="Any relevant medical history..."
                  style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: loading ? '#94a3b8' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Analyzing...' : 'Analyze with AI'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#e2e8f0',
                    color: '#334155',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
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
