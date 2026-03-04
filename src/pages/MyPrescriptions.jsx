import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { FileText, Download, Calendar, User, Pill } from 'lucide-react';

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const { data } = await api.get('/prescriptions');
      setPrescriptions(data.prescriptions || []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-400">Loading prescriptions...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-slate-50">My Prescriptions</h2>
          <div className="text-sm text-slate-400">
            Total: {prescriptions.length} prescription{prescriptions.length !== 1 ? 's' : ''}
          </div>
        </div>

        {prescriptions.length > 0 ? (
          <div className="grid gap-4">
            {prescriptions.map((presc) => (
              <div
                key={presc._id}
                className="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-green-500 transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <FileText className="text-green-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-50 mb-1">
                        {presc.diagnosis}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>Dr. {presc.doctorId?.name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(presc.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {presc.pdfUrl && (
                    <a
                      href={presc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download size={16} />
                      Download PDF
                    </a>
                  )}
                </div>

                {/* Medicines */}
                <div className="bg-dark-bg p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Pill className="text-blue-400" size={18} />
                    <h4 className="font-medium text-slate-200">Prescribed Medicines</h4>
                  </div>
                  <div className="space-y-3">
                    {presc.medicines.map((med, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-dark-card rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-semibold text-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-200 mb-1">{med.name}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-slate-400">Dosage: </span>
                              <span className="text-slate-300">{med.dosage}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Frequency: </span>
                              <span className="text-slate-300">{med.frequency}</span>
                            </div>
                            {med.duration && (
                              <div className="col-span-2">
                                <span className="text-slate-400">Duration: </span>
                                <span className="text-slate-300">{med.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                {presc.instructions && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Important Instructions</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{presc.instructions}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-dark-card rounded-lg p-12 text-center border border-dark-border">
            <FileText size={64} className="mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No prescriptions yet
            </h3>
            <p className="text-slate-400">
              Your prescriptions will appear here after doctor consultations
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyPrescriptions;
