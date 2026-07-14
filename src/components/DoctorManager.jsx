import React, { useState, useEffect } from 'react';
import { doctorService } from '../services/api';

const DoctorManager = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ doctorName: '', specialization: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await doctorService.getAll();
      setDoctors(response.data);
    } catch (error) {
      console.error("Error loading doctors:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await doctorService.update(editId, formData);
        setMessage("Doctor profile updated successfully!");
      } else {
        await doctorService.save(formData);
        setMessage("Doctor registered successfully!");
      }
      setFormData({ doctorName: '', specialization: '' });
      setEditId(null);
      loadDoctors();
      setTimeout(() => setMessage(''), 4000); // Clear message automatically
    } catch (error) {
      setMessage("Operation failed.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor profile?")) {
      try {
        await doctorService.delete(id);
        setMessage("Doctor profile deleted.");
        loadDoctors();
        setTimeout(() => setMessage(''), 4000);
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  // Cohesive layout design styles 
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
          {editId ? '✏️ Edit Staff Details' : '➕ Add Practitioner'}
        </h3>
        
        {message && (
          <div style={{ padding: '12px', background: '#f0fdf4', color: '#16a34a', marginBottom: '20px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', border: '1px solid #dcfce7' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>PHYSICIAN NAME</label>
            <input style={inputStyle} type="text" name="doctorName" placeholder="Dr. Enter Full Name" value={formData.doctorName} onChange={handleChange} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>CORE SPECIALIZATION</label>
            <input style={inputStyle} type="text" name="specialization" placeholder="e.g., Cardiology, Pediatrics" value={formData.specialization} onChange={handleChange} required />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', background: editId ? '#d97706' : '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', marginTop: '10px', boxShadow: '0 4px 6px -1px rgba(22, 163, 74, 0.2)' }}>
            {editId ? 'Save Changes' : 'Provision Doctor Profile'}
          </button>
          
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setFormData({ doctorName: '', specialization: '' }); }} style={{ width: '100%', padding: '10px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '500', fontSize: '13px', cursor: 'pointer' }}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* COLUMN 2: ROSTER VIEW TABLE CARD */}
      <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9', overflowX: 'auto' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>📋 Credentialed Medical Staff</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontWeight: '600' }}>
              <th style={{ padding: '12px 10px' }}>Staff ID</th>
              <th style={{ padding: '12px 10px' }}>Doctor Name</th>
              <th style={{ padding: '12px 10px' }}>Department</th>
              <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '30px 10px', textAlign: 'center', color: '#94a3b8', fontWeight: '500' }}>
                  No active practitioner profiles located in the directory.
                </td>
              </tr>
            ) : (
              doctors.map(d => (
                <tr key={d.doctorId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 10px', color: '#64748b', fontWeight: '600' }}>MD#{d.doctorId}</td>
                  <td style={{ padding: '14px 10px', color: '#0f172a', fontWeight: '500' }}>{d.doctorName}</td>
                  <td style={{ padding: '14px 10px' }}>
                    <span style={{ background: '#f0fdf4', color: '#166534', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                      {d.specialization}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => { setEditId(d.doctorId); setFormData({ doctorName: d.doctorName, specialization: d.specialization }); }} style={{ background: '#fef3c7', color: '#d97706', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(d.doctorId)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
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
  );
};

export default DoctorManager;