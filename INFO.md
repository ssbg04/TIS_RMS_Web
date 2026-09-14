Here is the current high-level summary of **`ssbg04/TIS_RMS`**, based on the repository and the project context.

[Open TIS_RMS on GitHub](https://github.com/ssbg04/TIS_RMS?utm_source=chatgpt.com)

## TIS_RMS

**TIS_RMS — Records Management System** is a client-server school records management system designed to centralize student records, documents, OCR processing, reporting, and archival.

The repository currently consists primarily of:

```text
TIS_RMS/
├── backend/
├── frontend/
├── .github/
│   └── workflows/
├── installers / build-related files
└── README.md
```

The README describes it as a comprehensive client-server system for document handling, student-record management, and automated data extraction.

---

# 1. Overall Architecture

```text
                    TIS_RMS
                       │
          ┌────────────┴────────────┐
          │                         │
       FRONTEND                  BACKEND
       Flutter                   Node.js
       Desktop                   Express
          │                         │
          │ HTTP/API                │
          └──────────────┬──────────┘
                         │
                    SQLite DB
                  better-sqlite3
                         │
              ┌──────────┴──────────┐
              │                     │
           Documents              OCR
              │                     │
       File Management       Tesseract OCR
                              Ghostscript
```

The frontend is a Flutter application while the backend is a Node.js/Express REST API. The backend uses local SQLite persistence and handles authentication, uploads, and OCR processing.

---

# 2. Frontend

### Technology

The client is built with:

* **Flutter**
* Dart
* Riverpod
* Dio
* Syncfusion PDF Viewer
* SQLite/API communication
* Firebase integration
* PDF generation
* Excel processing
* document scanning
* notifications

The repository currently targets a Flutter SDK compatible with Dart `^3.11.5`.

### Major packages

The current `pubspec.yaml` includes:

```text
flutter_riverpod
dio
flutter_secure_storage
google_fonts
excel
path_provider
file_picker
permission_handler
socket_io_client
image_picker
shared_preferences
fl_chart
url_launcher
syncfusion_flutter_pdfviewer
flutter_holo_date_picker
calendar_date_picker2
lottie
window_manager
flutter_speed_dial
google_mlkit_document_scanner
data_table_2
wolt_modal_sheet
printing
pdf
intl
sheetifye
flutter_local_notifications
workmanager
flutter_foreground_task
firebase_core
firebase_messaging
vibration
desktop_drop
audioplayers
```

---

# 3. Frontend Modules

The project is designed around several major functional areas.

### Dashboard

Provides an overview of:

* system activity
* recent activity
* users
* records
* system information

### Student Management

Handles student profiles and related records.

The broader system design covers:

* JHS students
* SHS students
* student information
* sections
* teachers
* academic records

### Document Management

The application supports:

* uploading documents
* viewing documents
* organizing records
* document archival
* PDF viewing
* document processing

The README explicitly identifies document upload, preview, and management as a core frontend module.

### OCR

The application can process scanned documents and extract information automatically.

### Reports

The system supports educational report generation and Excel templates, including **School Form 10**.

The repository also contains:

```text
School-Form-10-JHS.xlsx
SSHS-SF-10-v2026_corrected.xlsx
```

as application assets.

---

# 4. Backend

The backend is a **Node.js + Express REST API**.

Current backend package:

```text
Node.js
Express 5.2.1
better-sqlite3
bcrypt
jsonwebtoken
multer
ExcelJS
Firebase Admin
Nodemailer
CORS
Morgan
dotenv
```

### Backend responsibilities

```text
API
├── Authentication
├── Users
├── Students
├── Teachers
├── Sections
├── Documents
├── File uploads
├── OCR
├── Excel processing
├── Reports
├── Notifications
└── Database operations
```

---

# 5. Database

The backend uses:

**SQLite + `better-sqlite3`**

rather than PostgreSQL or Redis.

The database is local and portable, which fits the project's original goal of having a school-oriented system that can operate without depending on an external database server.

The README identifies `tis_rms.db` as the local database.

---

# 6. Authentication

Authentication is handled by:

```text
bcrypt
+
jsonwebtoken
```

The backend's package configuration confirms both dependencies.

Conceptually:

```text
Login
  ↓
Validate credentials
  ↓
bcrypt password verification
  ↓
JWT
  ↓
Authenticated API requests
```

The system has multiple user roles, including the administrative/teacher-oriented access model used throughout the application.

---

# 7. OCR Pipeline

One of the more technically interesting parts of TIS_RMS is its document-processing pipeline.

The system is designed to process:

```text
PDF / Image
     ↓
Document processing
     ↓
Tesseract OCR
     ↓
Extracted text
     ↓
Parser / normalization
     ↓
Structured student information
     ↓
Database
```

The backend includes OCR processing capabilities and locally bundled OCR tooling.

The README specifically identifies:

* Tesseract
* Ghostscript
* PDF processing
* automated data extraction

as part of the backend.

---

# 8. Document Processing

The system isn't simply an OCR application.

It combines:

```text
Document Storage
        +
PDF Processing
        +
OCR
        +
Data Extraction
        +
Student Records
```

This allows documents to become actual structured records instead of simply being stored as files.

---

# 9. Excel / School Forms

Excel processing is another major component.

The backend currently uses:

```text
ExcelJS
```

and the frontend includes Excel-related packages and school-form templates.

The intended workflow is roughly:

```text
Student Data
     ↓
School Form Template
     ↓
Populate / process
     ↓
Excel output
```

This is particularly relevant to the system's educational-record use case.

---

# 10. File Uploads

The backend uses:

```text
Multer
```

for incoming file handling.

That supports the document-management/OCR workflow.

---

# 11. Windows Deployment

TIS_RMS is designed particularly strongly around **Windows desktop deployment**.

The frontend can be run with:

```bash
flutter run -d windows
```

and built with:

```bash
flutter build windows
```

according to the repository README.

The project also contains an **Inno Setup installer** workflow.

So the intended user experience is:

```text
Download installer
       ↓
Install TIS_RMS
       ↓
Run desktop application
       ↓
Connect to TIS_RMS backend
```

---

# 12. Backend as Windows Service

The backend package contains service-management commands:

```bash
npm run service:install
npm run service:uninstall

npm run service:start
npm run service:stop
npm run service:restart
npm run service:status
```

It uses **NSSM** to manage the Node.js backend as a Windows service.

That is useful for the intended school/local-server deployment because the backend doesn't need to be manually started from a terminal every time.

---

# 13. Offline / Local Architecture

A major characteristic of TIS_RMS is that it is designed around a **local server + local database** architecture.

Instead of:

```text
Flutter
   ↓
Internet
   ↓
Cloud API
   ↓
Cloud Database
```

the system can operate more like:

```text
School LAN
     │
     ├── Windows Client
     │
     └── TIS_RMS Server
              │
              ├── Express
              ├── SQLite
              ├── OCR
              └── Documents
```

That makes the system suitable for environments where internet availability should not be a dependency for core record operations.

---

# 14. Mobile / Android

The Flutter project also contains Android-oriented functionality.

Current dependencies include:

```text
firebase_messaging
google_mlkit_document_scanner
flutter_foreground_task
workmanager
permission_handler
vibration
```

and Android-specific application configuration.

Your release workflow now builds a **universal Android APK** alongside the Windows installer.

---

# 15. Release System

The repository has GitHub Actions for releasing the application.

The release workflow builds:

```text
Windows
    ↓
Flutter Windows
    ↓
Inno Setup
    ↓
TIS_RMS_Client_Setup.exe

Android
    ↓
Flutter APK
    ↓
TIS_RMS_Android_Universal.apk
```

Then those artifacts are uploaded to a GitHub Release.

The workflow supports:

```text
git tag v1.0.0
        ↓
GitHub Actions
        ↓
Build
        ↓
GitHub Release
```

and manual workflow dispatch with a release tag.

---

# 16. Current Version

The frontend currently declares:

```text
version: 1.0.0+1
```

Therefore your release workflow can derive:

```text
v1.0.0
```

from the Flutter version when a manual release doesn't specify a tag.

---

# 17. Application Identity

The Flutter configuration currently identifies the application as:

```text
Display name:
TIS RMS

Publisher:
BSIT3DSB

Identity:
plsp.bsit3dsb.tisrms
```

---

# 18. Frontend State / Networking

The frontend architecture uses:

```text
Riverpod
```

for state management and:

```text
Dio
```

for API communication.

So the conceptual client architecture is:

```text
UI
 ↓
Riverpod
 ↓
Services / Controllers
 ↓
Dio
 ↓
Express REST API
```

The README confirms Riverpod and Dio as key frontend technologies.

---

# 19. Notifications

The project has both local and Firebase-related notification infrastructure:

```text
flutter_local_notifications
firebase_messaging
firebase_core
```

This gives the project the ability to support both local notifications and push-notification infrastructure.

---

# 20. PDF / Printing

The frontend contains:

```text
syncfusion_flutter_pdfviewer
printing
pdf
```

which supports:

* PDF viewing
* PDF generation
* printing
* document workflows

---

# 21. Current Technology Stack

### Frontend

| Component        | Technology            |
| ---------------- | --------------------- |
| UI               | Flutter               |
| Language         | Dart                  |
| State            | Riverpod              |
| HTTP             | Dio                   |
| PDF              | Syncfusion PDF Viewer |
| PDF generation   | `pdf`                 |
| Printing         | `printing`            |
| Excel            | `excel`               |
| Document scanner | Google ML Kit         |
| Notifications    | Firebase + local      |
| Charts           | fl_chart              |
| Desktop          | Flutter Windows       |

### Backend

| Component      | Technology     |
| -------------- | -------------- |
| Runtime        | Node.js        |
| API            | Express.js     |
| Database       | SQLite         |
| SQLite driver  | better-sqlite3 |
| Authentication | JWT + bcrypt   |
| Uploads        | Multer         |
| Excel          | ExcelJS        |
| OCR            | Tesseract      |
| PDF processing | Ghostscript    |
| Email          | Nodemailer     |
| Logging        | Morgan         |
| Configuration  | dotenv         |

The backend dependencies currently confirm the Node/Express/SQLite/authentication/upload/Excel stack.

---

# 22. Development Setup

### Backend

```bash
cd backend
npm install
npm start
```

Development:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
flutter pub get
flutter run -d windows
```

Production:

```bash
flutter build windows
```

---

# 23. Recommended Deployment Architecture

For the project as it currently exists, I'd describe the production architecture as:

```text
                         Internet
                            │
                   ┌────────┴────────┐
                   │                 │
              GitHub Releases     Website
                   │             Astro/Cloudflare
                   │
          ┌────────┴─────────┐
          │                  │
       Windows             Android
        Client              Client
          │
          │ LAN / HTTPS
          ▼
    ┌─────────────────┐
    │  TIS_RMS Server │
    │                 │
    │ Node + Express  │
    │ SQLite          │
    │ OCR             │
    │ Documents       │
    └─────────────────┘
```

For your particular application, **GitHub Actions is the distribution/CI layer**, not the backend runtime.

---

# 24. What makes TIS_RMS different from a basic CRUD project

The repository has moved beyond a simple student CRUD application.

Its more substantial components are:

**1. Document management**

Records aren't just database rows; the system manages associated files.

**2. OCR**

Scanned records can be converted into machine-readable information.

**3. Structured extraction**

OCR output can be transformed into student information.

**4. School-form generation**

The system works with actual educational Excel templates.

**5. Local deployment**

The backend/database/OCR can operate on a local server.

**6. Windows service**

The backend can run as a Windows service through NSSM.

**7. Desktop distribution**

The Flutter application can be packaged into a proper Windows installer.

**8. Android distribution**

The same application can be packaged as an Android APK.

**9. Automated releases**

GitHub Actions builds and publishes the application artifacts.

---

## One-sentence description

> **TIS_RMS is a Flutter-based school Records Management System backed by a Node.js/Express local server, SQLite database, document-management and OCR pipeline, designed to centralize student records, automate document extraction, generate educational reports, and provide deployable Windows and Android clients.**

That is a much more accurate description of the repository than simply calling it a "student information system."
