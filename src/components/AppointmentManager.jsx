import React, { useState, useEffect } from 'react';
import { appointmentService } from '../services/api';

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ patientName: '', doctorName: '', appointmentDate: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await appointmentService.getAll();
      setAppointments(response.data);
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appointmentService.save(formData);
      setMessage("Appointment successfully scheduled!");
      setFormData({ patientName: '', doctorName: '', appointmentDate: '' });
      loadAppointments();
      setTimeout(() => setMessage(''), 4000); // Clear message automatically
    } catch (error) {
      setMessage("Booking failed. Please check backend configurations.");
    }
  };

  // Cohesive custom UI style definitions
  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#f8fafc',
    color: '#334155',
    fontFamily: 'inherit'
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      
      {/* COLUMN 1: INTERACTIVE FORM CARD */}
      <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>
          📅 Allocate Slot
        </h3>
        
        {message && (
          <div style={{ padding: '12px', background: '#f5f3ff', color: '#6d28d9', marginBottom: '20px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', border: '1px solid #e9d5ff' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>PATIENT NAME</label>
            <input style={inputStyle} type="text" placeholder="Patient reference name" value={formData.patientName} onChange={(e) => setFormData({...formData, patientName: e.target.value})} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>ASSIGNED PHYSICIAN</label>
            <input style={inputStyle} type="text" placeholder="Dr. Practitioner name" value={formData.doctorName} onChange={(e) => setFormData({...formData, doctorName: e.target.value})} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>DATE & TIME STATUS</label>
            <input style={inputStyle} type="text" placeholder="e.g., 2026-07-25 at 11:30 AM" value={formData.appointmentDate} onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} required />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', marginTop: '10px', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>
            Commit to Calendar
          </button>
        </form>
      </div>

      {/* COLUMN 2: APPOINTMENTS FEED TABLE CARD */}
      <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9', overflowX: 'auto' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>📋 Active Outpatient Consultation Feed</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: '600' }}>
              <th style={{ padding: '12px 10px' }}>Slot Hash</th>
              <th style={{ padding: '12px 10px' }}>Admitted Patient</th>
              <th style={{ padding: '12px 10px' }}>Assigned Practitioner</th>
              <th style={{ padding: '12px 10px', textAlign: 'right' }}>Schedule Window</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '30px 10px', textAlign: 'center', color: '#94a3b8', fontWeight: '500' }}>
                  No active consultation slots mapped to the calendar ledger.
                </td>
              </tr>
            ) : (
              appointments.map(a => (
                <tr key={a.appointmentId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 10px', color: '#64748b', fontWeight: '600' }}>APT-{a.appointmentId}</td>
                  <td style={{ padding: '14px 10px', color: '#0f172a', fontWeight: '600' }}>{a.patientName}</td>
                  <td style={{ padding: '14px 10px', color: '#475569', fontWeight: '500' }}>👨‍⚕️ {a.doctorName}</td>
                  <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                    <span style={{ background: '#faf5ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                      {a.appointmentDate}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AppointmentManager;