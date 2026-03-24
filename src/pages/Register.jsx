import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock, Phone, UserCircle, Activity } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "patient", contact: "" });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(formData);
      toast.success("Account created successfully!");
      navigate(`/${user.role}`);
    } catch (err) {
      toast.error(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all";

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0f1e] relative overflow-hidden p-4">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-glass-lg">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back</span>
          </button>

          <div className="flex items-center gap-3 mb-7">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-glow-blue">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Account</span></h2>
              <p className="text-xs text-slate-500">Join the clinic platform</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required className={inputClass} />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className={inputClass} />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required minLength="6" className={inputClass} />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                <input type="text" name="contact" placeholder="+92 300 0000000" value={formData.contact} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-1.5 col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Role</label>
              <div className="relative">
                <UserCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                <select name="role" value={formData.role} onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all cursor-pointer">
                  <option value="patient" className="bg-[#0a0f1e]">Patient</option>
                  <option value="doctor" className="bg-[#0a0f1e]">Doctor</option>
                  <option value="receptionist" className="bg-[#0a0f1e]">Receptionist</option>
                  <option value="admin" className="bg-[#0a0f1e]">Admin</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="col-span-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600/80 hover:bg-blue-500/90 border border-blue-500/30 text-white rounded-xl font-semibold text-sm shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Creating Account..." : "Register Now"}
              </motion.button>
            </div>
          </form>

          <p className="text-center mt-5 text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Login here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
