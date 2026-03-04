# 🏥 AI Clinic Management System 

**AI Clinic Management System** is a modern, data-driven solution designed to bridge the gap between healthcare providers and patients. This system digitizes clinical operations by replacing traditional paperwork with intelligent automation and a sleek, premium dark-themed user interface.



---

## 🌟 Key Features

### 🔐 Secure Authentication
- **Role-Based Access Control (RBAC):** Customized dashboards and permissions for Admins, Doctors, Receptionists, and Patients.
- **State Persistence:** Secure session management using React Context API.

### 🎨 Premium UI/UX
- **Modern Dark Aesthetic:** A high-end dark mode interface tailored for professional medical environments.
- **Micro-Animations:** Fluid transitions, staggered list reveals, and interactive hover effects powered by **Framer Motion**.
- **Responsive Architecture:** Fully optimized for high-performance viewing across mobile, tablet, and desktop devices.

### ⚙️ Operational Excellence
- **Smart Scheduling:** An intuitive appointment system to prevent double-booking and optimize doctor availability.
- **Electronic Health Records (EHR):** Secure digital storage for patient history, prescriptions, and diagnostic reports.
- **Automated Workflow:** Seamless onboarding through streamlined registration and login flows.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React.js (Vite)** | Core Frontend Framework for high-performance rendering |
| **Tailwind CSS** | Utility-first CSS for professional dark-theming |
| **Framer Motion** | Physics-based animations and UI motion |
| **Lucide React** | Minimalist and consistent SVG iconography |
| **React Router v6** | Declarative client-side routing |
| **Context API** | Global state management for Authentication |

---

## 📂 Project Structure

```text
src/
 ├── context/       # AuthContext for session & permission management
 ├── components/    # Reusable UI elements (Navigation, Footer, Cards)
 ├── pages/         # Page components (Home, Login, Register, Dashboards)
 ├── assets/        # Static assets (Images, Logos, Brand styles)
 └── App.jsx        # Root component and Route configurations
