package com.hospital.service;

import java.util.List;
import java.util.Optional;
import com.hospital.model.Appointment;

public interface AppointmentService {
    Appointment saveAppointment(Appointment appointment);
    List<Appointment> getAllAppointments();
    Optional<Appointment> getAppointmentById(Long appointmentId);
    Appointment updateAppointmentById(Long appointmentId, Appointment appointment);
    void deleteAppointmentById(Long appointmentId);
}