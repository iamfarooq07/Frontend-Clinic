import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Eye } from 'lucide-react';

const Patients = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    contact: '',
    email: '',
    bloodGroup: '',
    medicalHistory: '',
  });

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const fetchPatients = async () => {
    try {
      const { data } = await api.get(`/patients?search=${search}`);
      setPatients(data.patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/patients', formData);
      setShowModal(false);
      setFormData({
        name: '',
        age: '',
        gender: 'male',
        contact: '',
        email: '',
        bloodGroup: '',
        medicalHistory: '',
      });
      fetchPatients();
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating patient');
    }
  };

  const canAddPatient = ['admin', 'doctor', 'receptionist'].includes(user.role);

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#f1f5f9' }}>Patients</h2>
        {canAddPatient && (
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            <Plus size={18} />
            Add Patient
          </button>
        )}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 10px 10px 40px',
            border: '1px solid #475569',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: '#1e293b',
            color: '#e2e8f0',
          }}
        />
      </div>

      {/* Patients Table */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', overflow: 'hidden', border: '1px solid #334155' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#0f172a' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#94a3b8' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#94a3b8' }}>Age</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#94a3b8' }}>Gender</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#94a3b8' }}>Contact</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#94a3b8' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} style={{ borderTop: '1px solid #334155' }}>
                <td style={{ padding: '12px', color: '#e2e8f0' }}>{patient.name}</td>
                <td style={{ padding: '12px', color: '#e2e8f0' }}>{patient.age}</td>
                <td style={{ padding: '12px', color: '#e2e8f0' }}>{patient.gender}</td>
                <td style={{ padding: '12px', color: '#e2e8f0' }}>{patient.contact}</td>
                <td style={{ padding: '12px' }}>
                  <Link
                    to={`/patients/${patient._id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 12px',
                      backgroundColor: '#334155',
                      color: '#e2e8f0',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontSize: '13px',
                    }}
                  >
                    <Eye size={14} />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Patient Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '30px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            border: '1px solid #334155',
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px', color: '#f1f5f9' }}>Add New Patient</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500', color: '#e2e8f0' }}>Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #475569', borderRadius: '4px', backgroundColor: '#0f172a', color: '#e2e8f0' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500', color: '#e2e8f0' }}>Age *</label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #475569', borderRadius: '4px', backgroundColor: '#0f172a', color: '#e2e8f0' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500', color: '#e2e8f0' }}>Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    style={{ width: '100%', padding: '8px', border: '1px solid #475569', borderRadius: '4px', backgroundColor: '#0f172a', color: '#e2e8f0' }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500', color: '#e2e8f0' }}>Contact *</label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #475569', borderRadius: '4px', backgroundColor: '#0f172a', color: '#e2e8f0' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500', color: '#e2e8f0' }}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid #475569', borderRadius: '4px', backgroundColor: '#0f172a', color: '#e2e8f0' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  Add Patient
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#334155',
                    color: '#e2e8f0',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
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

export default Patients;
