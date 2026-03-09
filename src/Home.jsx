import React from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Stethoscope,
  Calendar,
  ClipboardList,
  ShieldCheck,
  Users,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* --- GLOW OVERLAY --- */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      {/* --- HEADER --- */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md bg-[#020617]/80 sticky top-0 z-50 border-b border-slate-800/50">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl group-hover:rotate-[10deg] transition-all duration-300 shadow-lg shadow-blue-500/20">
            <Activity className="text-white" size={22} />
          </div>

          <span className="text-2xl font-black tracking-tighter text-white">
            Opti<span className="text-blue-500"> Clinic </span>
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            to={"/login"}
            className="text-sm font-semibold text-slate-300 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95"
          >
            Register
          </Link>
        </div>
      </nav>
      {/* --- HERO SECTION --- */}
      <header className="relative px-6 pt-24 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest"
        >
          <Activity size={14} /> Next Gen Clinic Management
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Clinic <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            Managment System
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The all-in-one operating system for modern clinics. Automate
          scheduling, manage patient insights, and scale your practice with
          precision.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        ></motion.div>

        {/* Floating Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 w-full border-t border-slate-800/50 pt-12">
          <StatBox number="10k+" label="Patients Managed" />
          <StatBox number="500+" label="Clinics Online" />
          <StatBox number="99.9%" label="Uptime Record" />
          <StatBox number="24/7" label="Global Support" />
        </div>
      </header>
      {/* --- FEATURES SECTION --- */}
      <section
        id="features"
        className="py-32 bg-[#03081c] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-white mb-4">
                Unmatched Power. <br />
                Ultimate Control.
              </h2>
              <p className="text-slate-400">
                Everything you need to eliminate paperwork and focus on patient
                care.
              </p>
            </div>
            <button className="text-blue-400 font-bold flex items-center gap-2 hover:underline">
              See all features <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Existing Features */}
            <FeatureCard
              icon={<Calendar className="text-blue-400" />}
              title="Smart Scheduling"
              desc="AI-powered booking system that eliminates double-booking and reduces no-shows."
            />
            <FeatureCard
              icon={<ClipboardList className="text-emerald-400" />}
              title="Secure EMR"
              desc="Encrypted digital health records accessible from any device, anywhere in the world."
            />
            <FeatureCard
              icon={<Users className="text-purple-400" />}
              title="Patient Portal"
              desc="Allow patients to view history, pay bills, and message doctors securely."
            />

            {/* --- NEW FEATURES ADDED BELOW --- */}

            <FeatureCard
              icon={<Activity className="text-rose-400" />}
              title="Telemedicine Ready"
              desc="Integrated high-definition video calls for remote consultations with built-in note taking."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-amber-400" />}
              title="Automated Billing"
              desc="Generate instant invoices, track insurance claims, and process payments automatically."
            />
            <FeatureCard
              icon={<ArrowUpRight className="text-cyan-400" />}
              title="Advanced Analytics"
              desc="Visualize clinic growth, patient demographics, and revenue trends with real-time dashboards."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Calendar className="text-blue-400" />}
              title="Smart Scheduling"
              desc="AI-powered booking system that eliminates double-booking and reduces no-shows."
            />
            <FeatureCard
              icon={<ClipboardList className="text-emerald-400" />}
              title="Secure EMR"
              desc="Encrypted digital health records accessible from any device, anywhere in the world."
            />
            <FeatureCard
              icon={<Users className="text-purple-400" />}
              title="Patient Portal"
              desc="Allow patients to view history, pay bills, and message doctors securely."
            />
          </div>
        </div>
      </section>
      {/*  */}
      {/* --- PRICING --- */}
      <section className="py-32 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-400">
              Choose the plan that fits your practice scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PriceCard
              tier="Basic"
              price="$49"
              features={["Up to 2 Doctors", "1,000 Patients", "Basic EMR"]}
            />
            <PriceCard
              tier="Professional"
              price="$129"
              highlight={true}
              features={[
                "Unlimited Doctors",
                "5,000 Patients",
                "Telemedicine",
                "AI Analytics",
              ]}
            />
            <PriceCard
              tier="Enterprise"
              price="Custom"
              features={[
                "Multi-location Support",
                "Unlimited Patients",
                "Dedicated Support",
                "Custom API",
              ]}
            />
          </div>
        </div>
      </section>

      {/*  */}

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800 bg-[#020617] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="md:col-span-1 space-y-4">
            {/* Logo Section - Left Aligned for Footer */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl group-hover:rotate-[10deg] transition-all duration-300 shadow-lg shadow-blue-500/20">
                <Activity className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Opti<span className="text-blue-500">Clinic</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-500 leading-relaxed text-sm md:text-base">
              Redefining healthcare management with intelligence and speed.
              Built for the future of medicine.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Product
            </h4>
            <div className="flex flex-col gap-4 text-slate-500">
              <a href="#" className="hover:text-blue-400 transition">
                Dashboard
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Telemedicine
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Security
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Company
            </h4>
            <div className="flex flex-col gap-4 text-slate-500">
              <a href="#" className="hover:text-blue-400 transition">
                About Us
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Privacy
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Terms
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Newsletter
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -10, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
    className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-sm transition-all shadow-xl"
  >
    <div className="w-14 h-14 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-8 border border-slate-700">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

const StatBox = ({ number, label }) => (
  <div className="text-center md:text-left">
    <h3 className="text-3xl font-black text-white mb-1">{number}</h3>
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
      {label}
    </p>
  </div>
);
// --- YE WALA CODE FILE KE END MEIN PASTE KAREIN ---

const PriceCard = ({ tier, price, features, highlight = false }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-10 rounded-3xl border transition-all duration-300 ${
      highlight
        ? "border-blue-500 bg-blue-500/10 shadow-[0_0_40px_rgba(37,99,235,0.15)]"
        : "border-slate-800 bg-slate-900/40"
    }`}
  >
    <h4 className="text-slate-400 font-bold mb-2 uppercase text-xs tracking-[0.2em]">
      {tier}
    </h4>
    <div className="text-4xl font-black text-white mb-8">
      {price}
      <span className="text-sm text-slate-500 font-normal ml-1">/month</span>
    </div>
    <ul className="space-y-4 mb-10">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
          <ShieldCheck size={16} className="text-blue-500 shrink-0" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
    <button
      className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${
        highlight
          ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20"
          : "bg-slate-800 text-white hover:bg-slate-700"
      }`}
    >
      Choose {tier}
    </button>
  </motion.div>
);

export default Home;
