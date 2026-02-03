# ⚙️ Setup Guide

Follow these steps to get **Shipyard** up and running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Bun](https://bun.sh) (v1.0.0 or higher)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- A [Neon](https://neon.tech/) PostgreSQL database or any PostgreSQL instance.

## 🛠️ Local Installation

### 1. Clone the Project
```bash
git clone https://github.com/walonCode/shipyard.git
cd shipyard
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
LOG_LEVEL=info
SECRET=your_jwt_secret
```

### 4. Database Migrations
Use Drizzle Kit to push your schema to the database:
```bash
bunx drizzle-kit push
```
Alternatively, to generate and run migrations:
```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

### 5. Start Development Server
```bash
bun run dev
```
The server should be running at `http://localhost:3000`.

---

## 🐳 Docker Setup

### Using Docker Compose
If you want to run the application in a container:

1.  **Build and Start**:
    ```bash
    docker-compose up --build
    ```

2.  **Verify**:
    The API will be available at `http://localhost:3000`.

### Manual Docker Build
```bash
docker build -t shipyard .
docker run -p 3000:3000 --env-file .env shipyard
```

---

## 🧪 Running Tests
```bash
bun test
```

## 🧹 Linting and Formatting
Check for linting errors and format the code:
```bash
bun run format
```

---

## 📡 API Endpoints (Quick Reference)

- **Health Check**: `GET /api/v1/healthz`
- **Base API**: `GET /api/v1`
- **Authentication (`/api/v1/auth`)**:
    - `POST /signup` - Register a new user
    - `POST /login` - Login and receive JWT cookie
    - `GET /logout` - Clear session cookie
- **User Management (`/api/v1/user`)** *(Auth Required)*:
    - `GET /` - Get current user profile
    - `PATCH /` - Update user information
    - `DELETE /` - Delete user account
