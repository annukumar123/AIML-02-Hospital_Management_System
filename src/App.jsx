import React, { useState } from 'react';
import PatientManager from './components/PatientManager';
import DoctorManager from './components/DoctorManager';
import AppointmentManager from './components/AppointmentManager';
import Login from './components/Login'; // Importing our sliding layout component

function App() {
  // Check if session token persists or default to unauthenticated landing entry
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [activeTab, setActiveTab] = useState('patients');

  // Callback function to let Login.jsx signal a successful sign-in state change
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Callback function to sign out and clear session state context
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsLoggedIn(false);
  };

  // GROUND FLOOR GUARD ROUTE: Render the beautiful sliding login page if not logged in
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // CORE DASHBOARD WORKSPACE (Rendered only after authentication succeeds)
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: '"Segoe UI", Roboto, sans-serif', margin: 0 }}>
      
      {/* SIDEBAR NAVIGATION */}
      <div style={{ width: '280px', backgroundColor: '#1e293b', padding: '30px 20px', display: 'flex', flexDirection: 'column', color: '#f8fafc', boxShadow: '4px 0 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingLeft: '10px' }}>
          <span style={{ fontSize: '28px' }}>🩺</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', letterSpacing: '0.5px', color: '#fff' }}>MedSync</h2>
            <small style={{ color: '#94a3b8', fontSize: '11px', uppercase: 'true' }}>Control Hub v1.0</small>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('patients')} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
              backgroundColor: activeTab === 'patients' ? '#2563eb' : 'transparent',
              color: activeTab === 'patients' ? '#fff' : '#cbd5e1',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
              textAlign: 'left', transition: 'all 0.2s ease'
            }}
          >
            <span>🏥</span> Patients Dashboard
          </button>

          <button 
            onClick={() => setActiveTab('doctors')} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
              backgroundColor: activeTab === 'doctors' ? '#16a34a' : 'transparent',
              color: activeTab === 'doctors' ? '#fff' : '#cbd5e1',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
              textAlign: 'left', transition: 'all 0.2s ease'
            }}
          >
            <span>🥼</span> Doctors Registry
          </button>

          <button 
            onClick={() => setActiveTab('appointments')} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
              backgroundColor: activeTab === 'appointments' ? '#4f46e5' : 'transparent',
              color: activeTab === 'appointments' ? '#fff' : '#cbd5e1',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
              textAlign: 'left', transition: 'all 0.2s ease'
            }}
          >
            <span>📅</span> Appointments
          </button>

          {/* DYNAMIC SIGN OUT LINK */}
          <button 
            onClick={handleLogout} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px',
              backgroundColor: 'transparent',
              color: '#ef4444',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
              textAlign: 'left', transition: 'all 0.2s ease', marginTop: '20px'
            }}
          >
            <span>🚪</span> Sign Out
          </button>
        </nav>

        <div style={{ marginTop: 'auto', padding: '15px', backgroundColor: '#334155', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
          <span style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: '500' }}>Server Connected</span>
        </div>
      </div>

      {/* MAIN CONTENT REGION */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '26px', color: '#0f172a', fontWeight: '700' }}>
              {activeTab === 'patients' && 'Patient Intake & Records'}
              {activeTab === 'doctors' && 'Clinical Staff Directory'}
              {activeTab === 'appointments' && 'Outpatient Scheduling'}
            </h1>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Manage workspace operations and real-time database transactions.</p>
          </div>
          <div style={{ padding: '8px 16px', backgroundColor: '#fff', borderRadius: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            📅 {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </header>

        {/* WORKSPACE APP VIEWS */}
        <main>
          {activeTab === 'patients' && <PatientManager />}
          {activeTab === 'doctors' && <DoctorManager />}
          {activeTab === 'appointments' && <AppointmentManager />}
        </main>
      </div>
    </div>
  );
}

export default App;