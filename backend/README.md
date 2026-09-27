# 🚀 LinkPulse Backend (Simple & Beginner Friendly)

A clean, beginner-friendly URL shortener and click analytics engine built with **Node.js, Express, JavaScript, Sequelize ORM, PostgreSQL, Redis, BullMQ, and Zod**.

---

## 📁 Simple Folder Structure

```
backend/
├── docker-compose.yml          # Starts PostgreSQL & Redis containers
├── Dockerfile                  # Docker image build file for the Node.js backend
├── .dockerignore               # Files ignored by Docker build
├── .env                        # Database, Redis, and Port settings
├── .env.example                # Example configuration template
├── package.json                # Dependencies and start scripts
├── test-api.js                 # Simple automated test script
└── src/
    ├── config/
    │   ├── db.js               # Simple PostgreSQL connection via Sequelize
    │   └── redis.js            # Simple Redis connection (port 6379)
    ├── models/
    │   ├── Link.js             # Link model (url, shortCode, title)
    │   ├── Click.js            # Click model (linkId, browser, os, referrer)
    │   └── index.js            # Relationships (Link has many Clicks)
    ├── schemas/
    │   └── link.schema.js      # Simple Zod schema for input validation
    ├── middlewares/
    │   └── rateLimiter.js      # Simple rate limiter (express-rate-limit)
    ├── queues/
    │   ├── clickQueue.js       # BullMQ queue producer
    │   └── clickWorker.js      # BullMQ background worker (saves clicks to DB)
    ├── controllers/
    │   ├── link.controller.js  # Create, list, analytics, and delete handlers
    │   └── redirect.controller.js # High-speed redirect using Redis Cache
    ├── routes/
    │   ├── link.routes.js      # Routes for /api/links
    │   └── redirect.routes.js  # Route for /:code (302 redirect)
    └── server.js               # Express application entry point
```

---

## 🚀 How to Run

### 1. Start Database & Redis (Docker)
Start the PostgreSQL and Redis containers with a single command:
```bash
docker compose up -d
```

### 2. Install Packages
```bash
npm install
```

### 3. Start the Server
- For development (with auto-reload):
  ```bash
  npm run dev
  ```
- For production:
  ```bash
  npm start
  ```

Server runs on **http://localhost:5000**.

### 4. Run Automated Tests
```bash
node test-api.js
```
