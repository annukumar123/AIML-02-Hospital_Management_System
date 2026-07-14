package com.hospital.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hospital.model.Appointment;
import com.hospital.service.AppointmentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/save")
    public ResponseEntity<Appointment> saveAppointment(@Valid @RequestBody Appointment appointment) {
        Appointment saved = appointmentService.saveAppointment(appointment);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return new ResponseEntity<>(appointmentService.getAllAppointments(), HttpStatus.OK);
    }

    @GetMapping("/get/{appointmentId}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long appointmentId) {
        return appointmentService.getAppointmentById(appointmentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{appointmentId}")
    public ResponseEntity<Appointment> updateAppointmentById(@PathVariable Long appointmentId, @Valid @RequestBody Appointment appointment) {
        try {
            return ResponseEntity.ok(appointmentService.updateAppointmentById(appointmentId, appointment));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{appointmentId}")
    public ResponseEntity<String> deleteAppointmentById(@PathVariable Long appointmentId) {
        try {
            appointmentService.deleteAppointmentById(appointmentId);
            return ResponseEntity.ok("Appointment deleted by id: " + appointmentId);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}