import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock, Phone, UserCircle } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    contact: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await register(formData);
      navigate(`/${user.role}`);
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#020617] relative overflow-hidden p-6">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900/50 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-800 relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Create <span className="text-blue-500">Account</span>
          </h2>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 mb-6 bg-red-500/10 text-red-400 rounded-xl text-sm border border-red-500/20"
          >
            {error}
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Full Name */}
          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
              Contact No.
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <input
                type="text"
                name="contact"
                placeholder="+92 300 0000000"
                value={formData.contact}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2 col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
              Assign Role
            </label>
            <div className="relative">
              <UserCircle
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/40 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm cursor-pointer"
              >
                <option value="patient" className="bg-slate-900">
                  Patient
                </option>
                <option value="doctor" className="bg-slate-900">
                  Doctor
                </option>
                <option value="receptionist" className="bg-slate-900">
                  Receptionist
                </option>
                <option value="admin" className="bg-slate-900">
                  Admin
                </option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2 italic">
                  Creating Account...
                </span>
              ) : (
                "Register Now"
              )}
            </motion.button>
          </div>
        </form>

        <p className="text-center mt-6 text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-semibold no-underline transition-colors"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
