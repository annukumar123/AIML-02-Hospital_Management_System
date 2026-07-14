import React, { useState, useEffect } from 'react';
import { patientService } from '../services/api';

const PatientManager = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    ailment: '',
    patientAge: ''
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await patientService.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error("Error loading patients:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await patientService.update(editId, formData);
        setMessage("Patient records updated successfully!");
      } else {
        await patientService.save(formData);
        setMessage("Patient registered successfully!");
      }
      setFormData({ patientName: '', patientEmail: '', ailment: '', patientAge: '' });
      setEditId(null);
      loadPatients();
      setTimeout(() => setMessage(''), 4000); // Clear message automatically
    } catch (error) {
      setMessage("Operation failed. Check details or console log.");
      console.error(error);
    }
  };

  const handleEdit = (patient) => {
    setEditId(patient.patientId);
    setFormData({
      patientName: patient.patientName,
      patientEmail: patient.patientEmail,
      ailment: patient.ailment,
      patientAge: patient.patientAge
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient record?")) {
      try {
        await patientService.delete(id);
        setMessage("Patient deleted successfully.");
        loadPatients();
        setTimeout(() => setMessage(''), 4000);
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

const exportToCSV = () => {
  if (patients.length === 0) return alert("No records available to export!");
  
  const headers = ["Patient ID,Name,Email,Ailment,Age\n"];
  const rows = patients.map(p => `${p.patientId},${p.patientName},${p.patientEmail},${p.ailment},${p.patientAge}\n`);
  
  const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', `Patient_Report_${new Date().toISOString().split('T')[0]}.csv`);
  a.click();
};

  // Reusable component style tokens
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

  const totalPatients = patients.length;
  const averageAge = totalPatients > 0 
    ? Math.round(patients.reduce((sum, p) => sum + Number(p.patientAge), 0) / totalPatients) 
    : 0;

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
     <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
  <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderLeft: '5px solid #2563eb' }}>
    <small style={{ color: '#64748b', fontWeight: '600', fontSize: '11px' }}>TOTAL REGISTERED CASELOAD</small>
    <h2 style={{ margin: '5px 0 0 0', color: '#1e293b' }}>{totalPatients} Patients</h2>
  </div>
  <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderLeft: '5px solid #10b981' }}>
    <small style={{ color: '#64748b', fontWeight: '600', fontSize: '11px' }}>AVERAGE PATIENT AGE</small>
    <h2 style={{ margin: '5px 0 0 0', color: '#1e293b' }}>{averageAge} Years</h2>
  </div>
</div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      
      {/* COLUMN 1: INTERACTIVE FORM CARD */}
      <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {editId ? '✏️ Edit Profile' : '➕ Register Patient'}
        </h3>
        
        {message && (
          <div style={{ padding: '12px', background: '#f0fdf4', color: '#16a34a', marginBottom: '20px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', border: '1px solid #dcfce7' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>PATIENT NAME</label>
            <input style={inputStyle} type="text" name="patientName" placeholder="Enter full name" value={formData.patientName} onChange={handleChange} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>EMAIL ADDRESS</label>
            <input style={inputStyle} type="email" name="patientEmail" placeholder="name@example.com" value={formData.patientEmail} onChange={handleChange} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>DIAGNOSIS / AILMENT</label>
            <input style={inputStyle} type="text" name="ailment" placeholder="Primary complaint" value={formData.ailment} onChange={handleChange} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>AGE</label>
            <input style={inputStyle} type="number" name="patientAge" placeholder="Years" value={formData.patientAge} onChange={handleChange} required />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', background: editId ? '#d97706' : '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', marginTop: '10px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>
            {editId ? 'Save Changes' : 'Log Patient Data'}
          </button>
          
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setFormData({ patientName: '', patientEmail: '', ailment: '', patientAge: '' }); }} style={{ width: '100%', padding: '10px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '500', fontSize: '13px', cursor: 'pointer' }}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* COLUMN 2: DATA TABLE VIEW CARD */}
      <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9', overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>📋 Active Admittance Records</h3>
          <button 
            onClick={exportToCSV} 
            style={{ 
              backgroundColor: '#f1f5f9', 
              color: '#475569', 
              border: '1px solid #cbd5e1', 
              padding: '8px 14px', 
              borderRadius: '8px', 
              fontSize: '13px', 
              fontWeight: '600', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.2s'
            }}
          >
            📥 Download Report
          </button>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: '600' }}>
              <th style={{ padding: '12px 10px' }}>ID</th>
              <th style={{ padding: '12px 10px' }}>Patient</th>
              <th style={{ padding: '12px 10px' }}>Email</th>
              <th style={{ padding: '12px 10px' }}>Ailment</th>
              <th style={{ padding: '12px 10px' }}>Age</th>
              <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '30px 10px', textAlign: 'center', color: '#94a3b8', fontWeight: '500' }}>
                  No active tracked records found in local instance.
                </td>
              </tr>
            ) : (
              patients.map(p => (
                <tr key={p.patientId} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '14px 10px', color: '#64748b', fontWeight: '600' }}>#{p.patientId}</td>
                  <td style={{ padding: '14px 10px', color: '#0f172a', fontWeight: '500' }}>{p.patientName}</td>
                  <td style={{ padding: '14px 10px', color: '#475569' }}>{p.patientEmail}</td>
                  <td style={{ padding: '14px 10px' }}>
                    <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                      {p.ailment}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px', color: '#334155' }}>{p.patientAge} yrs</td>
                  <td style={{ padding: '14px 10px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleEdit(p)} style={{ background: '#fef3c7', color: '#d97706', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.patientId)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
     </div>
    </div>
  );
};

export default PatientManager;