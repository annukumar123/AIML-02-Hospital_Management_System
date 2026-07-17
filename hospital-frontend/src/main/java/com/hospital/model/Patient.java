package com.hospital.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;

    @NotBlank(message = "Patient Name cannot be blank")
    @Size(min = 3, max = 50, message = "Patient Name should contain at least 3 letters")
    private String patientName;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email must be valid")
    private String patientEmail;

    @NotBlank(message = "Ailment details are required")
    private String ailment;

    @Positive(message = "Age must be a positive number")
    private Integer patientAge;

    public Patient() {}

    public Patient(Long patientId, String patientName, String patientEmail, String ailment, Integer patientAge) {
        this.patientId = patientId;
        this.patientName = patientName;
        this.patientEmail = patientEmail;
        this.ailment = ailment;
        this.patientAge = patientAge;
    }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    public String getPatientEmail() { return patientEmail; }
    public void setPatientEmail(String patientEmail) { this.patientEmail = patientEmail; }
    public String getAilment() { return ailment; }
    public void setAilment(String ailment) { this.ailment = ailment; }
    public Integer getPatientAge() { return patientAge; }
    public void setPatientAge(Integer patientAge) { this.patientAge = patientAge; }
}