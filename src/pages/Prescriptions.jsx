import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Plus, Download, FileText, User, Trash2, Calendar } from "lucide-react";

const Prescriptions = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    diagnosis: "",
    medicines: [{ name: "", dosage: "", frequency: "" }],
    instructions: "",
  });

  useEffect(() => {
    fetchPrescriptions();
    if (user.role === "doctor") {
      fetchPatients();
    }
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const { data } = await api.get("/prescriptions");
      setPrescriptions(data.prescriptions);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const { data } = await api.get("/patients");
      setPatients(data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/prescriptions", formData);
      setShowModal(false);
      setFormData({
        patientId: "",
        diagnosis: "",
        medicines: [{ name: "", dosage: "", frequency: "" }],
        instructions: "",
      });
      fetchPrescriptions();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating prescription");
    }
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [
        ...formData.medicines,
        { name: "", dosage: "", frequency: "" },
      ],
    });
  };

  const removeMedicine = (index) => {
    const newMedicines = formData.medicines.filter((_, i) => i !== index);
    setFormData({ ...formData, medicines: newMedicines });
  };

  const updateMedicine = (index, field, value) => {
    const newMedicines = [...formData.medicines];
    newMedicines[index][field] = value;
    setFormData({ ...formData, medicines: newMedicines });
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
            <FileText className="text-blue-500" /> Prescriptions
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            View and manage medical prescriptions.
          </p>
        </div>
        {user.role === "doctor" && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Plus size={18} />
            New Prescription
          </button>
        )}
      </div>

      {/* Prescriptions List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {prescriptions.map((presc) => (
          <div
            key={presc._id}
            className="bg-slate-800/50 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:border-blue-500/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">
                    {presc.patientId?.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <Calendar size={12} />
                    {new Date(presc.createdAt).toLocaleDateString()}
                    <span className="text-slate-600">|</span>
                    <span>Dr. {presc.doctorId?.name}</span>
                  </div>
                </div>
              </div>
              {presc.pdfUrl && (
                <a
                  href={presc.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-all border border-white/5"
                >
                  <Download size={18} />
                </a>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5">
                <p className="text-[10px] uppercase tracking-widest font-bold text-blue-400 mb-1">
                  Diagnosis
                </p>
                <p className="text-sm text-slate-200">{presc.diagnosis}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2 px-1">
                  Medicines
                </p>
                <div className="grid gap-2">
                  {presc.medicines.map((med, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white/5 p-3 rounded-xl text-sm border border-transparent hover:border-white/10 transition-all"
                    >
                      <span className="font-semibold text-slate-200">
                        {med.name}
                      </span>
                      <div className="flex gap-3 text-xs">
                        <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                          {med.dosage}
                        </span>
                        <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                          {med.frequency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Prescription Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-800 border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl my-auto animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-white">
                Create New Prescription
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white transition-all"
              >
                <Plus size={24} className="rotate-45" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 px-1">
                    Select Patient *
                  </label>
                  <select
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.patientId}
                    onChange={(e) =>
                      setFormData({ ...formData, patientId: e.target.value })
                    }
                  >
                    <option value="">Choose a patient</option>
                    {patients.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 px-1">
                    Diagnosis *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Viral Fever"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.diagnosis}
                    onChange={(e) =>
                      setFormData({ ...formData, diagnosis: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Medicines List
                  </label>
                  <button
                    type="button"
                    onClick={addMedicine}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    <Plus size={14} /> Add Row
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.medicines.map((med, idx) => (
                    <div key={idx} className="flex gap-3 group">
                      <input
                        type="text"
                        placeholder="Medicine"
                        className="flex-[2] bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={med.name}
                        onChange={(e) =>
                          updateMedicine(idx, "name", e.target.value)
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Dosage"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={med.dosage}
                        onChange={(e) =>
                          updateMedicine(idx, "dosage", e.target.value)
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Freq"
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        value={med.frequency}
                        onChange={(e) =>
                          updateMedicine(idx, "frequency", e.target.value)
                        }
                        required
                      />
                      {formData.medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicine(idx)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 px-1">
                  Additional Instructions
                </label>
                <textarea
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({ ...formData, instructions: e.target.value })
                  }
                  placeholder="Any special notes for the patient..."
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                  Create & Print
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3.5 rounded-xl transition-all"
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

export default Prescriptions;
