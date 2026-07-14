package com.hospital.service;

import java.util.List;
import java.util.Optional;
import com.hospital.model.Doctor;

public interface DoctorService {
    Doctor saveDoctor(Doctor doctor);
    List<Doctor> getAllDoctors();
    Optional<Doctor> getDoctorById(Long doctorId);
    Doctor updateDoctorById(Long doctorId, Doctor doctor);
    void deleteDoctorById(Long doctorId);
}