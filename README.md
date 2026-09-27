# LinkPulse

A high-performance URL shortener and real-time click analytics platform. LinkPulse pairs an asynchronous, cached backend engine with a minimalist web dashboard.

---

## Architecture Overview

- **Frontend**: Built with Next.js (App Router) and vanilla CSS featuring a monochrome, high-contrast dashboard for link management and metrics inspection.
- **Backend**: Node.js and Express REST API backed by PostgreSQL (Sequelize ORM) for persistent data storage and Redis for high-speed redirects.
- **Async Analytics Processing**: Click tracking events are offloaded to BullMQ worker queues to keep redirect response times minimal.

---

## Tech Stack

### Backend
- Runtime: Node.js (ES Modules)
- Framework: Express.js
- Database: PostgreSQL with Sequelize ORM
- Caching & Queue: Redis, BullMQ
- Validation: Zod
- Rate Limiting: express-rate-limit
- Containerization: Docker, Docker Compose

### Frontend
- Framework: Next.js (React 19)
- Styling: Pure Vanilla CSS (custom design system)
- State Management: React Hooks

---

## Repository Structure

```text
LinkPulse/
├── backend/
│   ├── docker-compose.yml       # PostgreSQL and Redis services
│   ├── Dockerfile               # Node.js backend container definition
│   ├── package.json
│   ├── test-api.js              # Automated backend test suite
│   └── src/
│       ├── config/              # Database and Redis configurations
│       ├── controllers/         # Link and redirect handlers
│       ├── middlewares/         # Rate limiting and request middleware
│       ├── models/              # Sequelize models (Link, Click)
│       ├── queues/              # BullMQ queue producer and worker
│       ├── routes/              # Express API and redirect routes
│       ├── schemas/             # Zod input validation schemas
│       └── server.js            # Express application entry point
├── frontend/
│   ├── package.json
│   ├── app/                     # Next.js App Router (layout, dashboard, styles)
│   ├── components/              # UI components (Navbar, LinkCard, AnalyticsModal)
│   └── services/                # API service integration
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- Docker and Docker Compose (for PostgreSQL and Redis)

---

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the example environment file and configure variables as needed:
   ```bash
   cp .env.example .env
   ```

3. Start PostgreSQL and Redis containers:
   ```bash
   docker compose up -d
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:5000`.

---

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

   The frontend dashboard will be available at `http://localhost:3000`.

---

## Key Features

- **Fast URL Redirection**: Uses Redis caching to resolve target URLs with minimal latency.
- **Asynchronous Click Analytics**: Click events (browser, OS, referrer, timestamp) are queued via BullMQ and saved in the background.
- **Real-Time Dashboard**: Clean UI to create custom short links, view click counters, copy links, and inspect analytics modals.
- **Input Validation & Security**: Request validation using Zod and endpoint protection with express-rate-limit.
