# 🏗️ Shipyard

Shipyard is a high-performance, production-ready backend boilerplate designed for modern developer workflows. Built with **Bun**, **Express 5**, and **Drizzle ORM**, it provides a solid foundation for building scalable and type-safe APIs with PostgreSQL.

## 🚀 Features

- **Runtime**: Powered by [Bun](https://bun.sh) for ultra-fast execution.
- **Framework**: [Express 5](https://expressjs.com/) for a familiar yet modern routing experience.
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) with [Neon](https://neon.tech/) PostgreSQL support.
- **Security**: 
    - [Helmet](https://helmetjs.github.io/) for HTTP header security.
    - [CORS](https://github.com/expressjs/cors) configured for secure cross-origin requests.
    - Row-Level Security (RLS) support in database models.
- **Validation**: [Zod](https://zod.dev/) for robust schema validation.
- **Logging**: [Winston](https://github.com/winstonjs/winston) and [Morgan](https://github.com/expressjs/morgan) for professional-grade logging.
- **Dockerized**: Multi-stage Docker build for optimized production deployments.
- **Linting & Formatting**: [Biome](https://biomejs.dev/) for lightning-fast code quality checks.

## 🛠️ Tech Stack

- **Core**: Bun, TypeScript, Express 5
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **Validation**: Zod
- **Authentication**: JWT & Cookie-parser
- **Security**: Helmet, CORS
- **Logging**: Winston, Morgan
- **DevOps**: Docker, Docker Compose

## 📂 Project Structure

```text
shipyard/
├── src/
│   ├── config/      # Configuration (Database, Logger, etc.)
│   ├── controller/  # Request handlers
│   ├── dto/         # Data Transfer Objects
│   ├── middleware/  # Custom Express middlewares
│   ├── models/      # Drizzle database schemas
│   ├── routes/      # API route definitions
│   ├── services/    # Business logic layer
│   ├── types/       # TypeScript type definitions
│   ├── utils/       # Utility functions
│   ├── validators/  # Zod validation schemas
│   ├── app.ts       # App initialization & middleware
│   ├── server.ts    # Main entry point & route registration
│   └── index.ts     # Exporting the app
├── test/            # Test files
├── Dockerfile       # Production build definition
├── docker-compose.yml # Container orchestration
└── package.json     # Project dependencies & scripts
```

## 🚥 Quick Start

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/walonCode/shipyard.git
    cd shipyard
    ```

2.  **Install dependencies**:
    ```bash
    bun install
    ```

3.  **Setup Environment**:
    Create a `.env` file based on `.env.example` (or use the provided `.env`).

4.  **Run in development**:
    ```bash
    bun run dev
    ```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Mohamed Lamin Walon-Jalloh (walonCode)**
- [GitHub](https://github.com/walonCode)
