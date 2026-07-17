package com.hospital.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.hospital.model.Appointment;
import com.hospital.repository.AppointmentRepository;
import com.hospital.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Optional<Appointment> getAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId);
    }

    @Override
    public Appointment updateAppointmentById(Long appointmentId, Appointment appointment) {
        return appointmentRepository.findById(appointmentId)
                .map(existing -> {
                    existing.setPatientName(appointment.getPatientName());
                    existing.setDoctorName(appointment.getDoctorName());
                    existing.setAppointmentDate(appointment.getAppointmentDate());
                    return appointmentRepository.save(existing);
                }).orElseThrow(() -> new RuntimeException("No Appointment available with ID: " + appointmentId));
    }

    @Override
    public void deleteAppointmentById(Long appointmentId) {
        if (!appointmentRepository.existsById(appointmentId)) {
            throw new RuntimeException("Appointment not found with ID: " + appointmentId);
        }
        appointmentRepository.deleteById(appointmentId);
    }
}