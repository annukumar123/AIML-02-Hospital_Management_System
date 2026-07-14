package com.hospital.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hospital.model.Patient;
import com.hospital.service.PatientService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping("/save")
    public ResponseEntity<Patient> savePatient(@Valid @RequestBody Patient patient) {
        Patient savedPatient = patientService.savePatient(patient);
        return new ResponseEntity<>(savedPatient, HttpStatus.OK);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> existing = patientService.getAllPatients();
        return new ResponseEntity<>(existing, HttpStatus.OK);
    }

    @GetMapping("/get/{patientId}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long patientId) {
        return patientService.getPatientById(patientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{patientId}")
    public ResponseEntity<Patient> updatePatientById(@PathVariable Long patientId, @Valid @RequestBody Patient patient) {
        try {
            return ResponseEntity.ok(patientService.updatePatientById(patientId, patient));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{patientId}")
    public ResponseEntity<String> deletePatientById(@PathVariable Long patientId) {
        try {
            patientService.deletePatientById(patientId);
            return ResponseEntity.ok("Patient deleted by id: " + patientId);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}