import React, { useState, useEffect } from 'react';
import { appointmentService, doctorService } from '../services/api'; // Integrated Doctor fetch helper

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // Array to store doctors fetched from database
  const [selectedDoctorSlots, setSelectedDoctorSlots] = useState([]); // Holds active slot options
  
  // Track today's ISO date string format to prevent booking historic back-dated records
  const todayString = new Date().toISOString().split('T')[0];

  // Form data payload now explicitly tracks both calendar day date picker and slot window strings
  const [formData, setFormData] = useState({ 
    patientName: '', 
    doctor: null, // Holds the full selected Doctor object structure
    appointmentDay: todayString, // Defaults dynamically to today's date placeholder metrics
    appointmentDate: '' // Stores the selected time slot description string
  });
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadAppointments();
    loadDoctors(); // Fetch available medical practitioners on component layout assembly
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await appointmentService.getAll();
      setAppointments(response.data);
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
  };

  const loadDoctors = async () => {
    try {
      const response = await doctorService.getAll();
      setDoctors(response.data);
    } catch (error) {
      console.error("Error loading clinical staff data profiles:", error);
    }
  };

  // Triggers whenever a user chooses a doctor from the drop-down menu selector
  const handleDoctorChange = (e) => {
    const selectedId = e.target.value; // Get raw value from selector
    
    if (!selectedId) {
      setSelectedDoctorSlots([]);
      setFormData({ ...formData, doctor: null, appointmentDate: '' });
      return;
    }

    // Weak comparison (==) handles both string and integer matching flawlessly
    const chosenDoctor = doctors.find(doc => doc.doctorId == selectedId);

    console.log("Selected Doctor Object Found:", chosenDoctor); // Check your browser console log!

    if (chosenDoctor) {
      // Ensure we fall back to an empty array if slots are null
      setSelectedDoctorSlots(chosenDoctor.availableSlots || []); 
      setFormData({
        ...formData,
        doctor: chosenDoctor,
        appointmentDate: '' // Clear out previous slot selection
      });
    } else {
      setSelectedDoctorSlots([]);
      setFormData({ ...formData, doctor: null, appointmentDate: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.doctor || !formData.appointmentDate || !formData.appointmentDay) {
      setMessage("Validation Error: Please pick a practitioner, an allocation day, and an available slot.");
      return;
    }

    // Create a clean payload object that maps precisely to updated Spring Boot structural entity columns
    const payload = {
      patientName: formData.patientName,
      appointmentDay: formData.appointmentDay, // Maps the calendar day picker selection field
      appointmentDate: formData.appointmentDate, // Maps the time string chunk
      doctor: {
        doctorId: formData.doctor.doctorId // Sends only the ID wrapper index value for proper key resolution
      }
    };

    console.log("Submitting Payload Details:", payload); // Verify output data structure

    try {
      await appointmentService.save(payload); // Post the cleaned object payload
      setMessage("Appointment successfully scheduled!");
      setFormData({ patientName: '', doctor: null, appointmentDay: todayString, appointmentDate: '' });
      setSelectedDoctorSlots([]);
      loadAppointments();
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      console.error("Axios Submission Error Details:", error.response?.data);
      const errorMsg = error.response?.data || "Booking failed due to internal error maps.";
      setMessage(errorMsg);
    }
  };

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
      
      {/* COLUMN 1: INTERACTIVE RELATIONAL APPOINTMENT SCHEDULER */}
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
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>REQUIRED PHYSICIAN</label>
            <select 
              style={inputStyle} 
              value={formData.doctor?.doctorId || ''} 
              onChange={handleDoctorChange} 
              required
            >
              <option value="">-- Choose Available Doctor --</option>
              {doctors.map(doc => (
                <option key={doc.doctorId} value={doc.doctorId}>
                  {doc.doctorName} ({doc.specialization})
                </option>
              ))}
            </select>
          </div>

          {/* 🗓️ INTERACTIVE CALENDAR DATE SELECTOR POPUP CONTEXT */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>TARGET ALLOCATION DATE</label>
            <input 
              style={inputStyle} 
              type="date" 
              min={todayString} // Prevents pickers from assigning historical retrospective date entries
              value={formData.appointmentDay} 
              onChange={(e) => setFormData({...formData, appointmentDay: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>AVAILABLE SCHEDULE WINDOWS</label>
            <select 
              style={inputStyle} 
              value={formData.appointmentDate} 
              onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} 
              disabled={selectedDoctorSlots.length === 0}
              required
            >
              <option value="">
                {!formData.doctor ? '-- Select a Physician First --' : '-- Choose Open Slot Window --'}
              </option>
              {selectedDoctorSlots.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', marginTop: '10px', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>
            Commit to Calendar
          </button>
        </form>
      </div>

      {/* COLUMN 2: ACTIVE APPOINTMENTS LEDGER GRID VANS */}
      <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9', overflowX: 'auto' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>📋 Active Outpatient Consultation Feed</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: '600' }}>
              <th style={{ padding: '12px 10px' }}>Slot Hash</th>
              <th style={{ padding: '12px 10px' }}>Admitted Patient</th>
              <th style={{ padding: '12px 10px' }}>Required Physician</th>
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
                  <td style={{ padding: '14px 10px', color: '#475569', fontWeight: '500' }}>
                    👨‍⚕️ {a.doctor ? a.doctor.doctorName : 'Unassigned'}
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                    <span style={{ background: '#faf5ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                      {/* Displays the date and specific hour value side by side cleanly */}
                      {a.appointmentDay} @ {a.appointmentDate}
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