import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { Calendar, Clock, User, Plus } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import Button from '../components/ui/Button';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  });
  const [submitting, setSubmitting] = useState(false);

  console.log(doctors)
  console.log(setDoctors)
  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments');
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDoctors = async () => {
    try {
      const { data } = await api.get('/appointments/doctors');
      setDoctors(Array.isArray(data) ? data : data.doctors || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post('/appointments', formData);

      setShowModal(false);
      setFormData({
        doctorId: '',
        date: '',
        time: '',
        reason: '',
      });
      fetchAppointments();
      alert('Appointment booked successfully! Your appointment is pending confirmation.');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert(error.response?.data?.message || 'Error booking appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      completed: 'bg-green-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const filteredAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const today = new Date();

    if (filter === 'upcoming') {
      return aptDate >= today && apt.status !== 'cancelled';
    } else if (filter === 'past') {
      return aptDate < today || apt.status === 'completed';
    }
    return true;
  });

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-400">Loading appointments...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-slate-50">My Appointments</h2>

          <div className="flex gap-3">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-dark-card text-slate-300 hover:bg-dark-border'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'bg-dark-card text-slate-300 hover:bg-dark-border'
                  }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'past'
                  ? 'bg-blue-600 text-white'
                  : 'bg-dark-card text-slate-300 hover:bg-dark-border'
                  }`}
              >
                Past
              </button>
            </div>

            {/* Book Appointment Button */}
            <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
              Book Appointment
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-sm text-blue-300">
            📅 Book your appointment online! Select a doctor, date, and time.
            Your appointment will be pending until confirmed by the clinic.
          </p>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="grid gap-4">
            {filteredAppointments.map((apt) => (
              <div
                key={apt._id}
                className="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-blue-500 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                      <User className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-50">
                        Dr. {apt.doctorId?.name || 'N/A'}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {apt.doctorId?.specialization || 'General Physician'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar size={18} className="text-slate-400" />
                    <span className="text-sm">{new Date(apt.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock size={18} className="text-slate-400" />
                    <span className="text-sm">{apt.time}</span>
                  </div>
                </div>

                {apt.reason && (
                  <div className="bg-dark-bg p-3 rounded-lg">
                    <p className="text-sm text-slate-400 mb-1">Reason for visit:</p>
                    <p className="text-slate-200">{apt.reason}</p>
                  </div>
                )}

                {apt.notes && (
                  <div className="bg-dark-bg p-3 rounded-lg mt-3">
                    <p className="text-sm text-slate-400 mb-1">Notes:</p>
                    <p className="text-slate-200">{apt.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-dark-card rounded-lg p-12 text-center border border-dark-border">
            <Calendar size={64} className="mx-auto mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No {filter !== 'all' ? filter : ''} appointments found
            </h3>
            <p className="text-slate-400 mb-4">
              {filter === 'upcoming'
                ? 'You have no upcoming appointments scheduled'
                : filter === 'past'
                  ? 'You have no past appointments'
                  : 'Book your first appointment to get started'}
            </p>
            <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
              Book Your First Appointment
            </Button>
          </div>
        )}
      </div>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Book Appointment"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-300">
              ✨ Select your preferred doctor, date, and time. Your appointment will be confirmed by the clinic shortly.
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-200">
              Select Doctor <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-slate-600 rounded-lg text-slate-200 
                 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 cursor-pointer hover:border-slate-500 transition-all"
              >
                <option value="" className="bg-dark-card">Choose a doctor...</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id} className="bg-dark-card py-2">
                    Dr. {doctor.name}
                  </option>
                ))}
              </select>
              {/* Custom Arrow Icon (optional) */}
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <Input
            label="Preferred Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            min={today}
          />

          <Input
            label="Preferred Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />

          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm text-slate-200">
              Reason for Visit <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
              rows="3"
              placeholder="Describe your symptoms or reason for visit..."
              className="w-full px-3 py-2 border border-slate-600 rounded-lg text-sm bg-dark-bg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" variant="primary" disabled={submitting} className="flex-1">
              {submitting ? 'Booking...' : 'Book Appointment'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
              disabled={submitting}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default MyAppointments;
