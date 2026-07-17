package com.hospital.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.hospital.model.Doctor;
import com.hospital.repository.DoctorRepository;
import com.hospital.service.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Optional<Doctor> getDoctorById(Long doctorId) {
        return doctorRepository.findById(doctorId);
    }

    @Override
    public Doctor updateDoctorById(Long doctorId, Doctor doctor) {
        return doctorRepository.findById(doctorId)
                .map(existing -> {
                    existing.setDoctorName(doctor.getDoctorName());
                    existing.setSpecialization(doctor.getSpecialization());
                    return doctorRepository.save(existing);
                }).orElseThrow(() -> new RuntimeException("No Doctor available with ID: " + doctorId));
    }

    @Override
    public void deleteDoctorById(Long doctorId) {
        if (!doctorRepository.existsById(doctorId)) {
            throw new RuntimeException("Doctor not found with ID: " + doctorId);
        }
        doctorRepository.deleteById(doctorId);
    }
}