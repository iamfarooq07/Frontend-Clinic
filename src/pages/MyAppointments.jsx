import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Plus } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const statusStyle = {
  pending:   { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20' },
  confirmed: { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/20' },
  completed: { bg: 'bg-emerald-500/10',text: 'text-emerald-400',border: 'border-emerald-500/20' },
  cancelled: { bg: 'bg-red-500/10',    text: 'text-red-400',    border: 'border-red-500/20' },
};

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ doctorId: '', date: '', time: '', reason: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchAppointments(); fetchDoctors(); }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments');
      setAppointments(data.appointments || []);
    } catch { toast.error('Failed to load appointments'); }
    finally { setLoading(false); }
  };

  const fetchDoctors = async () => {
    try {
      const { data } = await api.get('/appointments/doctors');
      setDoctors(Array.isArray(data) ? data : data.doctors || []);
    } catch { console.error('Error fetching doctors'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/appointments', formData);
      setShowModal(false);
      setFormData({ doctorId: '', date: '', time: '', reason: '' });
      fetchAppointments();
      toast.success('Appointment booked! Pending confirmation.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error booking appointment');
    } finally { setSubmitting(false); }
  };

  const today = new Date().toISOString().split('T')[0];
  const filtered = appointments.filter(apt => {
    const d = new Date(apt.date);
    if (filter === 'upcoming') return d >= new Date() && apt.status !== 'cancelled';
    if (filter === 'past') return d < new Date() || apt.status === 'completed';
    return true;
  });

  const filterBtns = ['all', 'upcoming', 'past'];

  if (loading) return (
    <Layout>
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <h2 className="text-xl font-bold text-slate-100">My Appointments</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
              {filterBtns.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all
                    ${filter === f ? 'bg-blue-600/80 text-white shadow-glow-blue' : 'text-slate-400 hover:text-slate-200'}`}>
                  {f}
                </button>
              ))}
            </div>
            <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
              Book Appointment
            </Button>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex items-center gap-2">
          <Calendar size={16} className="text-blue-400 flex-shrink-0" />
          <p className="text-xs text-blue-300">Book online — select a doctor, date, and time. Pending until confirmed by clinic.</p>
        </div>

        {/* Appointments list */}
        {filtered.length > 0 ? (
          <div className="grid gap-3">
            {filtered.map((apt, i) => {
              const s = statusStyle[apt.status] || statusStyle.pending;
              return (
                <motion.div key={apt._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5
                             hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 shadow-glass-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <User size={18} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-200">Dr. {apt.doctorId?.name || 'N/A'}</p>
                        <p className="text-xs text-slate-500">{apt.doctorId?.specialization || 'General Physician'}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />{apt.time}
                    </span>
                  </div>
                  {apt.reason && (
                    <p className="mt-2 text-xs text-slate-500 bg-white/[0.03] border border-white/8 rounded-lg px-3 py-2">
                      {apt.reason}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
            <Calendar size={48} className="mx-auto mb-3 text-slate-600" />
            <p className="text-slate-400 font-medium mb-1">No {filter !== 'all' ? filter : ''} appointments</p>
            <p className="text-sm text-slate-600 mb-4">Book your first appointment to get started</p>
            <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>Book Appointment</Button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Book Appointment" size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Doctor <span className="text-red-400 normal-case">*</span>
            </label>
            <select
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              required
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all cursor-pointer"
            >
              <option value="" className="bg-[#0d1424]">Choose a doctor...</option>
              {doctors.map(d => (
                <option key={d._id} value={d._id} className="bg-[#0d1424]">Dr. {d.name}</option>
              ))}
            </select>
          </div>

          <Input label="Preferred Date" type="date" value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })} required min={today} />

          <Input label="Preferred Time" type="time" value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Reason for Visit <span className="text-red-400 normal-case">*</span>
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required rows="3"
              placeholder="Describe your symptoms..."
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={submitting} className="flex-1">
              {submitting ? 'Booking...' : 'Book Appointment'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)} disabled={submitting} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default MyAppointments;
