import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Stethoscope,
  Calendar,
  ClipboardList,
  ShieldCheck,
  Users,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Star,
  ChevronDown,
  Clock,
  Video,
  CreditCard,
  Building2,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* --- GLOW OVERLAY --- */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full z-0" />

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
      <header className="relative px-6 pt-20 pb-28 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest"
        >
          <Activity size={14} /> Next Gen Clinic Management
        </motion.div>

        <motion.h1
          className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-tight"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Smart Clinic <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            Management System
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The all-in-one operating system for modern clinics. Automate
          scheduling, manage EMR records, streamline billing, and scale your
          healthcare operations seamlessly.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/register"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            Start Free Trial <ChevronRight size={18} />
          </Link>
          <a
            href="#demo"
            className="px-8 py-4 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            Watch Demo
          </a>
        </motion.div>

        {/* Floating Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 w-full border-t border-slate-800/50 pt-12">
          <StatBox number="10k+" label="Patients Managed" />
          <StatBox number="500+" label="Clinics Online" />
          <StatBox number="99.9%" label="Uptime Record" />
          <StatBox number="24/7" label="Global Support" />
        </div>
      </header>

      {/* --- DASHBOARD PREVIEW SECTION --- */}
      <section id="demo" className="py-12 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-4 md:p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            </div>
            <span className="text-xs font-mono text-slate-500">
              opticlinic.app/dashboard
            </span>
            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Live System
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-400">
                  Today's Appointments
                </span>
                <Calendar className="text-blue-400" size={18} />
              </div>
              <p className="text-3xl font-bold text-white">00</p>
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 size={12} /> 00 Completed
              </p>
            </div>
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-400">
                  Total Consultations
                </span>
                <Stethoscope className="text-emerald-400" size={18} />
              </div>
              <p className="text-3xl font-bold text-white">00</p>
              <p className="text-xs text-blue-400 mt-2 flex items-center gap-1">
                <ArrowUpRight size={12} /> 0% this month
              </p>
            </div>
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-400">
                  Revenue (Monthly)
                </span>
                <CreditCard className="text-purple-400" size={18} />
              </div>
              <p className="text-3xl font-bold text-white">00</p>
              <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 size={12} /> 0% Invoices Paid
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section
        id="features"
        className="py-32 bg-[#03081c] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-white mb-4">
                Unmatched Power. <br />
                Ultimate Control.
              </h2>
              <p className="text-slate-400">
                Everything you need to eliminate paperwork and focus on
                delivering high-quality patient care.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Calendar className="text-blue-400" />}
              title="Smart Scheduling"
              desc="AI-powered booking system that eliminates double-booking, manages slots, and reduces no-shows."
            />
            <FeatureCard
              icon={<ClipboardList className="text-emerald-400" />}
              title="Secure EMR"
              desc="Encrypted digital health records accessible securely from any device, anywhere in the world."
            />
            <FeatureCard
              icon={<Users className="text-purple-400" />}
              title="Patient Portal"
              desc="Allow patients to view consultation history, access prescriptions, pay bills, and message doctors."
            />
            <FeatureCard
              icon={<Video className="text-rose-400" />}
              title="Telemedicine Ready"
              desc="Integrated video consultations with HD calling, audio recording, and instant prescription generation."
            />
            <FeatureCard
              icon={<CreditCard className="text-amber-400" />}
              title="Automated Billing"
              desc="Generate fast invoices, process digital payments, track insurance claims, and view ledger stats."
            />
            <FeatureCard
              icon={<ArrowUpRight className="text-cyan-400" />}
              title="Advanced Analytics"
              desc="Visualize clinic expansion, patient traffic trends, and daily revenue with live analytics."
            />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-32 bg-[#020617] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-slate-400">
              Transform your medical practice workflows in less than 10 minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <WorkflowStep
              step="01"
              title="Create Clinic Account"
              desc="Register your practice, set up doctor profiles, clinic timing slots, and fee structures."
            />
            <WorkflowStep
              step="02"
              title="Onboard Patients & Staff"
              desc="Import existing patient data securely or enable self-registration through patient portal."
            />
            <WorkflowStep
              step="03"
              title="Automate Practice Flow"
              desc="Manage appointments, issue electronic health records, and process instant digital bills."
            />
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-32 bg-[#03081c]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-400">
              Choose the plan that fits your practice scale with zero hidden
              fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PriceCard
              tier="Basic"
              price="$49"
              features={[
                "Up to 2 Doctors",
                "1,000 Patient Records",
                "Basic EMR & Prescriptions",
                "Email Support",
              ]}
            />
            <PriceCard
              tier="Professional"
              price="$129"
              highlight={true}
              features={[
                "Unlimited Doctors",
                "10,000 Patient Records",
                "Full Telemedicine Suite",
                "AI Analytics & Reports",
                "Priority Support 24/7",
              ]}
            />
            <PriceCard
              tier="Enterprise"
              price="Custom"
              features={[
                "Multi-location Support",
                "Unlimited Patient Records",
                "Dedicated Account Manager",
                "Custom API Integration",
                "On-Premise Backup",
              ]}
            />
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-32 bg-[#020617] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Leading Practitioners
            </h2>
            <p className="text-slate-400">
              See what doctors and clinic managers say about OptiClinic.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="OptiClinic cut down our administrative workload by half. Scheduling appointments and writing prescriptions has never been this fast."
              author="Dr. Sarah Jenkins"
              role="Medical Director, CarePlus Clinic"
            />
            <TestimonialCard
              quote="The telemedicine feature and automatic billing system streamlined our entire practice. Our patient retention rate grew significantly."
              author="Dr. Aris Thorne"
              role="Founder, Apex Healthcare"
            />
            <TestimonialCard
              quote="Transitioning to this system was incredibly smooth. Customer support is always available whenever we need assistance."
              author="Elena Rostova"
              role="Operations Manager, HealthFirst Network"
            />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-32 bg-[#03081c]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400">
              Have questions? Find quick answers below.
            </p>
          </div>

          <div className="space-y-4">
            <FaqItem
              question="Is OptiClinic HIPAA and GDPR compliant?"
              answer="Yes, OptiClinic utilizes end-to-end encryption for health records and adheres strictly to HIPAA, GDPR, and global data privacy standards."
              isOpen={openFaq === 0}
              onClick={() => toggleFaq(0)}
            />
            <FaqItem
              question="Can I import data from my previous clinic software?"
              answer="Absolutely. Our support team assists with seamless data migration from existing legacy CSV or database backups without downtime."
              isOpen={openFaq === 1}
              onClick={() => toggleFaq(1)}
            />
            <FaqItem
              question="Is there a free trial available?"
              answer="Yes, we offer a 14-day full-featured free trial with no credit card required so you can evaluate all features risk-free."
              isOpen={openFaq === 2}
              onClick={() => toggleFaq(2)}
            />
            <FaqItem
              question="Can multiple staff members access the dashboard concurrently?"
              answer="Yes, OptiClinic supports role-based access control (RBAC) allowing doctors, receptionists, and accountants customized access."
              isOpen={openFaq === 3}
              onClick={() => toggleFaq(3)}
            />
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION (CTA) SECTION --- */}
      <section className="py-24 bg-[#020617] px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ready to Upgrade Your Clinic Operations?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join 500+ modern clinics delivering better medical care with
              OptiClinic today.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:bg-slate-100 transition-all active:scale-95"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800 bg-[#020617] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl group-hover:rotate-[10deg] transition-all duration-300 shadow-lg shadow-blue-500/20">
                <Activity className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Opti<span className="text-blue-500">Clinic</span>
              </span>
            </div>

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
              <a href="#demo" className="hover:text-blue-400 transition">
                Dashboard
              </a>
              <a href="#features" className="hover:text-blue-400 transition">
                Telemedicine
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Security & Compliance
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
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Terms of Service
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
                placeholder="Email address"
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 w-full text-slate-200 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500 text-white">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-8 border-t border-slate-800/40 mt-12">
          <p className="text-xs tracking-wider uppercase text-slate-500 font-medium flex items-center gap-1.5">
            Developed <span className="text-rose-500 text-sm">♥</span> by{" "}
            <Link
              to="https://github.com/iamfarooq07"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-300 hover:text-blue-400 transition cursor-pointer"
            >
              Muhammad Farooq
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -8, backgroundColor: "rgba(30, 41, 59, 0.5)" }}
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

const WorkflowStep = ({ step, title, desc }) => (
  <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 relative">
    <span className="text-4xl font-black text-blue-500/20 mb-4 block font-mono">
      {step}
    </span>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard = ({ quote, author, role }) => (
  <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
    <div className="flex gap-1 text-amber-400 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} fill="currentColor" />
      ))}
    </div>
    <p className="text-slate-300 text-sm leading-relaxed mb-6">"{quote}"</p>
    <div>
      <h4 className="text-white font-bold text-sm">{author}</h4>
      <p className="text-xs text-slate-500">{role}</p>
    </div>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-slate-800 rounded-2xl bg-slate-900/40 overflow-hidden transition">
    <button
      onClick={onClick}
      className="w-full p-6 text-left font-bold text-white flex justify-between items-center gap-4 hover:text-blue-400 transition"
    >
      <span>{question}</span>
      <ChevronDown
        size={18}
        className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-400" : "text-slate-500"}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 pb-6 text-slate-400 text-sm leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Home;
