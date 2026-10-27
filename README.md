# Akola Police — Run for Unity 03 KM Marathon
## Official Admin Dashboard & Google Sheets Analytics Portal

An enterprise-grade, secure, modern administrative dashboard for the **Akola Police — Run for Unity 03 KM Marathon Certificate Generator**.

Built with **React 18**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, and **Recharts**, connecting directly to the **Google Sheet** used by the marathon certificate website.

---

## 🌟 Key Features

### 1. Police Portal UI & Executive Design
- **Theme**: Dark Navy sidebar (`#0a1128`) with cyan highlights (`#06b6d4`) and clean white main workspace.
- **Branding**: Official Akola District Police insignia and Run for Unity 03 KM marathon branding.
- **Responsiveness**: Fully responsive layout optimized for desktop command centers, laptops, tablets, and mobile devices.
- **Timezone**: All dates, audit logs, and clocks strictly formatted in **Asia/Kolkata (IST)**.

### 2. Administrative Authentication & PII Protection
- **Session Security**: Uses temporary, encrypted `sessionStorage` with automatic 2-hour timeout. Personal data is never stored in persistent local storage.
- **Zero Public Exposure**: The Google Sheet remains private. The Google Apps Script endpoint never returns participant names or phone numbers to unauthenticated visitors.
- **Mobile Number Masking**: Contact numbers are masked by default (`98XXXXXX21`). Complete numbers can only be unmasked by an authenticated administrator following a security confirmation.
- **Formula Injection Defense (CWE-1236)**: CSV exports automatically sanitize cells starting with `=`, `+`, `-`, `@`, `\t`, or `\r` to prevent Excel macro exploits.

### 3. Real-Time Google Sheets Integration
- Connects to the **SAME** Google Sheet as the Certificate Generator:
  - **Sheet URL**: [Akola Police Marathon Google Sheet](https://docs.google.com/spreadsheets/d/1qWkdkR533IRVz4Ov760NEOWPNJjrElnTS4op-TyB9to/edit)
  - **Sheet Tab**: `Certificate Downloads`
  - **Columns**: `Timestamp`, `Certificate ID`, `Full Name`, `Mobile Number`, `Download Status`
- **Concurrency Protection**: Google Apps Script `LockService` prevents race conditions during high-volume event bursts.
- **Dynamic Sync**: Supports manual on-demand refresh and configurable automatic background polling (30s, 60s, 5m).

### 4. Interactive Modules
- **Overview Dashboard**:
  1. *Total Certificate Download Events*
  2. *Unique Participants*
  3. *Today's Download Events*
  4. *Total Registered Entrants*
  - Daily download velocity chart, peak hour activity breakdown, and live recent activity table.
- **Participants Management**: Searchable participant directory with pagination, sorting by name/date/download count, date range filters, and phone masking.
- **Certificate Downloads**: Detailed event audit log distinguishing *Download Requested*, *Download Initiated*, *Download Request Failed*, and *Status Unknown*.
- **Analytics & Reports**: Visual comparison charts, 24-hour heatmaps, status distribution, and repeat download audits.
- **Export Data Center**: Download filtered CSVs for Participants or Download Events with Excel-compatible UTF-8 BOM encoding.
- **Settings & Integration**: View connection status, test ping, copy the Apps Script backend code, and adjust refresh intervals.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Running Locally
```bash
# Navigate to the dashboard directory
cd dashbord

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173/`.

### Default Admin Credentials
- **Username / Email**: `admin@akolapolice.gov.in` (or any authorized admin identifier)
- **Passkey / Token**: `AKOLA_POLICE_2026_ADMIN` (configured in `Code.gs`)

---

## 🛠️ Google Apps Script Backend Deployment

The backend script is located in `google-apps-script/Code.gs`. It allows the Admin Dashboard to read rows securely while continuing to accept certificate download events from the public certificate generator.

### Step-by-Step Deployment:
1. Open your Google Sheet:
   [Run for Unity Google Sheet](https://docs.google.com/spreadsheets/d/1qWkdkR533IRVz4Ov760NEOWPNJjrElnTS4op-TyB9to/edit)
2. In the top menu, go to **Extensions** → **Apps Script**.
3. Replace the code in `Code.gs` with the script from `dashbord/google-apps-script/Code.gs`.
4. Click **Deploy** → **Manage deployments**.
5. Click the **Edit** (pencil icon) next to your existing Web App deployment.
6. Set Version to **New version** and click **Deploy**.
7. Keep your existing Web App URL:
   ```
   https://script.google.com/macros/s/AKfycbw8GkU_Wlm_IZsrEyu53UTaUGDCoG3aDQ84OO2ajBCEb81JpOewS0-1-JoPtUkBW6Xq/exec
   ```
8. The Admin Dashboard will immediately stream live records with zero configuration changes!

---

## 🏗️ Project Architecture

```
dashbord/
├── google-apps-script/
│   └── Code.gs                  # Backend Apps Script with authenticated endpoints
├── public/
│   └── assets/                  # Official Akola Police branding logos and images
├── src/
│   ├── components/
│   │   ├── views/
│   │   │   ├── OverviewView.tsx               # 4 Metric cards, charts, recent log
│   │   │   ├── ParticipantsView.tsx           # Search, phone masking, date filters
│   │   │   ├── CertificateDownloadsView.tsx   # Individual event log & statuses
│   │   │   ├── AnalyticsView.tsx              # Velocity, peak hours, repeat downloads
│   │   │   ├── ExportDataView.tsx             # Sanitized CSV generator
│   │   │   └── SettingsView.tsx               # Webhook config, sync, Code.gs viewer
│   │   ├── Header.tsx           # Top navigation bar, IST clock, sync indicator
│   │   ├── LoginPage.tsx        # Police login portal with show/hide password
│   │   ├── Sidebar.tsx          # Dark navy sidebar with cyan highlights
│   │   └── StatCard.tsx         # Enterprise metric card
│   ├── services/
│   │   ├── authService.ts       # Session handling and credential verification
│   │   ├── googleSheetsService.ts # Authenticated Apps Script communication
│   │   ├── analyticsService.ts  # Metric calculations and trend aggregations
│   │   └── exportService.ts     # Formula injection prevention & CSV export
│   ├── utils/
│   │   └── privacy.ts           # Mobile masking, CSV sanitization, IST date parsers
│   ├── types/
│   │   └── index.ts             # Strong TypeScript schemas and interfaces
│   ├── App.tsx                  # Main layout and tab routing
│   ├── index.css                # Official design tokens & Tailwind utilities
│   └── main.tsx                 # React application entry point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🔒 Security & Privacy Guarantees

1. **Spreadsheet Confidentiality**: The Google Sheet remains 100% private.
2. **Client-Side Data Hygiene**: No participant data is cached in `localStorage`. Closing the browser tab clears all session data.
3. **No Unauthenticated Leaks**: Directly querying the Google Apps Script Web App URL returns only `{ "status": "online" }` with zero participant details.
4. **Download Status Truthfulness**: The interface clearly distinguishes *Download Requested* from confirmed file writes, maintaining honest administrative auditing.
