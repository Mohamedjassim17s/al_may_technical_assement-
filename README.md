# Almahy Legal & Corporate Management Portal

A production-grade Admin Dashboard & Legal Case Management Portal built with Next.js, React, TypeScript, and a simulated REST API backend.

## 🚀 Technical Architecture

### Tech Stack
- **Framework**: Next.js 14/15 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS with custom dark mode design
- **Components**: Custom reusable accessible UI primitives (`components/ui`)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Validation**: Zod & React Hook Form concepts (managed via custom multi-step state)
- **Testing**: Vitest

### Rendering Strategy
This application leverages Next.js App Router for optimal performance:
1. **Server-Side Rendered (SSR) / React Server Components (RSC)**: Used for layout shells, static page wrappers, and initial metadata provision.
2. **Client Components (`'use client'`)**: Used extensively for interactive modules such as the dynamic Dashboard Charts (`Recharts`), Management Table with URL-synced multi-filtering (`useSearchParams`), multi-step wizard forms, and context providers (`AuthContext`, `ToastContext`).
3. **API Routes**: Leverages Next.js Route Handlers (`app/api/...`) to simulate a full REST backend that supports pagination, sorting, search, bulk actions, and latency injection.

### Application Modules
1. **Dashboard**: High-level KPI cards and Revenue/Practice Area charts that adjust based on date filters.
2. **Client & Case Management**: The core module featuring a data table with server-side pagination, search, URL-synced filtering (by Practice Area and Status), and Bulk Actions.
3. **Detail View (`/management/[id]`)**: Deep dive into a specific Legal Case. Includes an Activity Timeline (for auditing changes), inline-editable fields, and associated Related Records.
4. **New Case Wizard**: A 4-step multi-stage form with conditional logic (e.g. changing fields based on 'Civil' vs 'Corporate' practice areas), strict Zod validation, and `localStorage` Draft Autosaving.

### State Management
1. **Global State**: Managed via React Context (`AuthContext` for user roles, `ToastContext` for global notifications with undo capability).
2. **URL State (URL Synchronization)**: The Management Portal extensively uses the URL as the source of truth for filters, pagination, and sorting (e.g. `?page=2&practiceArea=Civil&sortBy=hourlyRate`). This ensures views are shareable and persist across refreshes.
3. **Local State**: Component-level state for the Multi-Step form wizard, with `localStorage` persistence.
4. **Optimistic Updates**: Action handlers in the UI (like inline editing or quick status changes) update the local UI state immediately while the API request processes in the background.

### API Handling & Data Flow
The application mimics a robust enterprise REST API.
- **`MockDatabase` Singleton**: Resides in `lib/db.ts` to manage in-memory Cases, Activity logs, and simulated transactions.
- **Latency Simulation**: API routes inject artificial delays (`NEXT_PUBLIC_API_SIMULATE_DELAY`) to realistically test asynchronous loading states and skeleton loaders.

### Security Approach
- **Role-Based Access Control (RBAC)**: Implemented `RoleGuard` component. 
  - *Admins* have full CRUD and Bulk Delete capabilities.
  - *Managers* can edit cases and update statuses.
  - *Viewers* are restricted to read-only access.
- **API-Level Validation**: Next.js API routes check the `x-user-role` header to reject unauthorized actions (returning 403 Forbidden).

## 🛠 Setup & Installation

### Environment Configuration

The application requires specific environment variables to function correctly. Create a `.env.local` file in the root directory (or use your hosting provider's environment settings) and configure the following variables:

```env
# Application Environment (development, production, or test)
NODE_ENV=development

# The name of the application displayed in various parts of the UI
NEXT_PUBLIC_APP_NAME="Apex Enterprise Management Portal"

# The base URL for the application (e.g., http://localhost:3000 for local dev)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Simulated network delay (in milliseconds) for API requests to test loading states
NEXT_PUBLIC_API_SIMULATE_DELAY=200

# Secret key used for mock authentication and session management
NEXT_PUBLIC_AUTH_SECRET="dev-secret-key-12345"
```

### Installation
Install dependencies using npm:
```bash
npm install
```

### Running the Application

**Live Demo:**
You can view the live application running here: [https://al-may-technical-assement.vercel.app/](https://al-may-technical-assement.vercel.app/)

**Local Development:**
Start the development server locally:
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests
Run the Vitest test suite:
```bash
npm run test
```
