import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  const fetchPatientData = async () => {
    try {
      const [patientRes, historyRes] = await Promise.all([
        api.get(`/patients/${id}`),
        api.get(`/patients/${id}/history`),
      ]);
      setPatient(patientRes.data);
      setHistory(historyRes.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><div>Loading...</div></Layout>;
  if (!patient) return <Layout><div>Patient not found</div></Layout>;

  return (
    <Layout>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Patient Details
      </h2>

      {/* Patient Info */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Personal Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <InfoItem label="Name" value={patient.name} />
          <InfoItem label="Age" value={patient.age} />
          <InfoItem label="Gender" value={patient.gender} />
          <InfoItem label="Contact" value={patient.contact} />
          <InfoItem label="Email" value={patient.email || 'N/A'} />
          <InfoItem label="Blood Group" value={patient.bloodGroup || 'N/A'} />
        </div>
      </div>

      {/* Medical History */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Appointments</h3>
        {history?.appointments?.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Doctor</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.appointments.map((apt) => (
                <tr key={apt._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px' }}>{new Date(apt.date).toLocaleDateString()}</td>
                  <td style={{ padding: '10px' }}>{apt.doctorId?.name}</td>
                  <td style={{ padding: '10px' }}>{apt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#64748b' }}>No appointments found</p>
        )}
      </div>

      {/* Prescriptions */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Prescriptions</h3>
        {history?.prescriptions?.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {history.prescriptions.map((presc) => (
              <div key={presc._id} style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                <p style={{ fontWeight: '600', marginBottom: '5px' }}>{presc.diagnosis}</p>
                <p style={{ fontSize: '14px', color: '#64748b' }}>
                  Dr. {presc.doctorId?.name} - {new Date(presc.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#64748b' }}>No prescriptions found</p>
        )}
      </div>
    </Layout>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{label}</p>
    <p style={{ fontSize: '14px', fontWeight: '500' }}>{value}</p>
  </div>
);

export default PatientDetails;
