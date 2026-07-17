package com.hospital.service;

import java.util.List;
import java.util.Optional;
import com.hospital.model.Patient;

public interface PatientService {
    Patient savePatient(Patient patient);
    List<Patient> getAllPatients();
    Optional<Patient> getPatientById(Long patientId);
    Patient updatePatientById(Long patientId, Patient patient);
    void deletePatientById(Long patientId);
}