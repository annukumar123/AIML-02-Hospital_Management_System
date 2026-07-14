package com.hospital.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hospital.model.Doctor;
import com.hospital.service.DoctorService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctors")
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "https://hospitalmanagementsystem-virid.vercel.app")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping("/save")
    public ResponseEntity<Doctor> saveDoctor(@Valid @RequestBody Doctor doctor) {
        Doctor savedDoctor = doctorService.saveDoctor(doctor);
        return new ResponseEntity<>(savedDoctor, HttpStatus.OK);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return new ResponseEntity<>(doctorService.getAllDoctors(), HttpStatus.OK);
    }

    @GetMapping("/get/{doctorId}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long doctorId) {
        return doctorService.getDoctorById(doctorId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{doctorId}")
    public ResponseEntity<Doctor> updateDoctorById(@PathVariable Long doctorId, @Valid @RequestBody Doctor doctor) {
        try {
            return ResponseEntity.ok(doctorService.updateDoctorById(doctorId, doctor));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{doctorId}")
    public ResponseEntity<String> deleteDoctorById(@PathVariable Long doctorId) {
        try {
            doctorService.deleteDoctorById(doctorId);
            return ResponseEntity.ok("Doctor deleted by id: " + doctorId);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}