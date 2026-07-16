# MedSync - Outpatient Consultation & Management Hub v1.0

MedSync is an enterprise-grade, full-stack hospital workspace application designed to handle patient intake records, medical practitioner registries, and conflict-free outpatient scheduling. Running entirely on a performance-optimized local architecture, the platform handles real-time database transactions with near-zero network latency.

---

## 🚀 Key Features
* **Patient Intake & Records:** Complete CRUD platform to manage admitted patient profiles, contact matrices, and clinical ailments.
* **Clinical Staff Directory:** Expandable workspace mapping practitioner credentials, core specializations, and individual active schedule loads.
* **Dynamic Outpatient Scheduling:** Interactive booking engine utilizing native HTML5 calendar pickers linked to dynamic physician time slots.
* **Double-Booking Validation Guard:** Backend transactional engine that automatically intercepts and blocks concurrent overlapping appointments for the same practitioner on the same day.
* **Fluid Full-Screen UI:** Optimized full-viewport dashboard layout utilizing CSS box resets and CSS Grid sizing for modern desktop environments.

---

## 🛠️ Technology Stack

### Frontend Layer
* **React 18** (Functional Components & Hooks)
* **Vite** (Next-Generation Frontend Tooling)
* **Axios** (Promise-based HTTP client for secure API interactions)
* **HTML5 / Inline CSS Grid & Flexbox** (Modern Fluid Layout UI)

### Backend Layer
* **Spring Boot 3.x / Java 17+**
* **Spring Security** (Filter chain rules with Basic Auth Interceptors)
* **Spring Data JPA** (Object-Relational Mapping & Derived Query Execution)
* **Hibernate 7.x** (Automated Schema Structural DDL Synchronization)
* **Tomcat Embedded Web Servlet Engine** (Port `8080`)

### Database Layer
* **MySQL 8.x Community Server** (Local System Service running on Port `3306`)
* **HikariCP** (High-performance JDBC Connection Pooling)

---

## 📁 System Architecture & Directory Layout

### 💻 Backend Directory Structure (`SpringBootJpa-1`)
```text
src/main/java/com/hospital/
│
├── controller/
│   ├── AppointmentController.java   # Exposes conflict-safe appointment routes
│   ├── AuthController.java          # Handles authentication requests
│   ├── DoctorController.java        # Manages clinical registry endpoints
│   └── PatientController.java       # Coordinates patient CRUD operations
│
├── model/
│   ├── Appointment.java             # Entity with @ManyToOne relationship to Doctor
│   ├── Doctor.java                  # Entity with @ElementCollection availability slots
│   ├── Patient.java                 # Entity tracking patient metrics
│   └── User.java                    # Entity managing application credentials
│
├── repository/
│   ├── AppointmentRepository.java   # Custom derived query lookup methods
│   ├── DoctorRepository.java
│   ├── PatientRepository.java
│   └── UserRepository.java
│
├── security/
│   └── SecurityConfig.java          # Configures CORS beans & CORS origins
│
└── service/
    ├── AppointmentService.java
    └── impl/
        └── AppointmentServiceImpl.java  # Houses the double-booking protection guard

Frontend Directory Structure (medsync-frontend)
============================================
src/
├── components/
│   ├── AppointmentManager.jsx       # Custom booking logic, dropdowns, and calendar input
│   ├── DoctorManager.jsx            # Roster grid with embedded expandable schedule corridor
│   ├── PatientManager.jsx           # Patient database records modifier panel
│   └── Login.jsx                    # Sliding authentication interface template
│
├── services/
│   └── api.js                       # Axios configuration instance matching local endpoints
│
├── App.jsx                          # Main fluid layout container shell with full-width properties
├── index.css                        # Global CSS box-sizing resets
└── main.jsx

## 📥 Installation & Local Setup

Follow these precise steps to clone, configure, and boot the application environment on your local machine.

### 📋 Prerequisites
* **Java Development Kit (JDK) 17 or higher** installed.
* **Node.js** (v18+) and **npm** installed.
* **MySQL Server** installed and running locally on port `3306`.

---

### 🗄️ Step 1: Database Setup
1. Open your local **MySQL Workbench** or command-line client.
2. Execute the following statement to establish the database target (though the Spring Boot connection string configuration is equipped to build this automatically if missing):
   ```sql
   CREATE DATABASE M_HOSPITAL;

⚙️ Step 2: Clone and Configure Backend
Open your terminal and clone the repository:
git clone [https://github.com/annukumar123/AIML-02-Hospital_Management_System.git](https://github.com/annukumar123/AIML-02-Hospital_Management_System.git)
cd SpringBootJpa-1

Open the project in Spring Tool Suite (STS) or Eclipse.

Open src/main/resources/application.properties and verify your local MySQL system password credential maps accurately:

spring.application.name=SpringBootJpa-1
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/M_HOSPITAL?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_LOCAL_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

spring.security.user.name=user
spring.security.user.password=Annu123.

Right-click the root project directory -> Run As -> Spring Boot App.

Ensure the terminal log outputs: Tomcat started on port 8080 (http).

Step 3: Configure and Launch Frontend
Open a new terminal console window and change directories to the frontend workspace folder:

Bash
cd medsync-frontend
Install the necessary system packages and application dependencies:

Bash
npm install
Open src/services/api.js and ensure the target pointer configuration references your local Tomcat instance correctly:

JavaScript
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
});
Launch the local development preview execution environment:

Bash
npm run dev
Click or open the exposed URL inside your browser (typically http://localhost:5173).

