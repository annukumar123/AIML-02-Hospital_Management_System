package com.hospital.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.hospital.model.Patient;
import com.hospital.repository.PatientRepository;
import com.hospital.service.PatientService;

@Service
public class PatientServiceImpl implements PatientService {
    
    private final PatientRepository patientRepository;

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Optional<Patient> getPatientById(Long patientId) {
        return patientRepository.findById(patientId);
    }

    @Override
    public Patient updatePatientById(Long patientId, Patient patient) {
        return patientRepository.findById(patientId)
                .map(existing -> {
                    existing.setPatientName(patient.getPatientName());
                    existing.setPatientEmail(patient.getPatientEmail());
                    existing.setAilment(patient.getAilment());
                    existing.setPatientAge(patient.getPatientAge());
                    return patientRepository.save(existing);
                }).orElseThrow(() -> new RuntimeException("No Patient available with ID: " + patientId));
    }

    @Override
    public void deletePatientById(Long patientId) {
        if (!patientRepository.existsById(patientId)) {
            throw new RuntimeException("Patient not found with ID: " + patientId);
        }
        patientRepository.deleteById(patientId);
    }
}