# 🚀 Expense Tracker AI - Enterprise Full-Stack Application

![Java 17](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-JWT-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite / JPA](https://img.shields.io/badge/SQLite-JPA_Hibernate-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A production-grade, full-stack financial intelligence application built with **Java 17 / Spring Boot 3.2** as the single source of truth REST API backend, paired with a modern **React 18 + TypeScript + Vite + Tailwind CSS** frontend.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React 18 + TypeScript                    │
│                 Tailwind Glassmorphic UI                    │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / REST (JWT Auth)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Java 17 / Spring Boot 3.2                 │
│  ┌──────────────────┬──────────────────┬─────────────────┐  │
│  │ Spring Security  │ REST Controllers │ Service Layer   │  │
│  │ BCrypt / JWT Auth│ JWT Validation   │ Analytics & AI  │  │
│  └──────────────────┴──────────────────┴─────────────────┘  │
└──────────────┬──────────────────────────────┬───────────────┘
               │ JPA / Hibernate              │ RestClient / Http
               ▼                              ▼
┌──────────────────────────────┐┌─────────────────────────────┐
│   SQLite / PostgreSQL DB     ││   Google Gemini 1.5 API    │
│  (Users, Expenses, Budgets)  ││ (AI Financial Intelligence) │
└──────────────────────────────┘└─────────────────────────────┘
```

---

## ✨ Key Features

- **🛡️ Spring Security & JWT Authentication**: Complete stateless user registration, login, refresh token generation, BCrypt password hashing, and user profile management.
- **💼 Spring Boot Single Source of Truth**: End-to-end REST API driving all financial transaction CRUD operations, budget progress calculation, and analytics aggregation.
- **🤖 Server-Side Gemini AI Proxy**: Secure proxying of Google Gemini 1.5 Pro/Flash API calls from Java backend with automated audit logging to `ai_history`.
- **🇮🇳 Indian Rupee (₹ INR) Formatting**: Natively formatted currency numbers and statistics across KPI cards, Recharts, CSV exports, and printable PDF statements.
- **📊 Real-time Analytics Engine**: Dynamic Recharts Area, Donut, Bar, and Line charts calculating category velocity, savings rate, and monthly balance.
- **🐳 Docker & Docker Compose Support**: Production-ready multi-stage Dockerfiles for both backend and frontend, orchestrated with `docker-compose`.

---

## 🔌 REST API Endpoints

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register a new user account | ❌ No |
| `POST` | `/api/v1/auth/login` | Authenticate & return JWT tokens | ❌ No |
| `POST` | `/api/v1/auth/refresh` | Refresh access token using refresh token | ❌ No |
| `GET` | `/api/v1/auth/me` | Get current authenticated user details | 🔒 Yes |
| `POST` | `/api/v1/auth/logout` | Revoke session refresh tokens | 🔒 Yes |

### 👤 User Management (`/api/v1/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/users/profile` | Get user profile information | 🔒 Yes |
| `PUT` | `/api/v1/users/profile` | Update profile (name, currency, avatar) | 🔒 Yes |
| `GET` | `/api/v1/users/settings` | Get user application settings | 🔒 Yes |
| `PUT` | `/api/v1/users/settings` | Update settings (theme, alerts) | 🔒 Yes |
| `POST` | `/api/v1/users/password` | Change user account password | 🔒 Yes |

### 💵 Financial Operations (`/api/v1/...`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET/POST` | `/api/v1/income` | List or create income transactions | 🔒 Yes |
| `PUT/DELETE` | `/api/v1/income/{id}` | Update or delete income record | 🔒 Yes |
| `GET/POST` | `/api/v1/expenses` | List or create expense transactions | 🔒 Yes |
| `PUT/DELETE` | `/api/v1/expenses/{id}` | Update or delete expense record | 🔒 Yes |
| `GET/POST` | `/api/v1/budgets` | List or update category budgets | 🔒 Yes |
| `GET` | `/api/v1/categories` | Get category taxonomy | 🔒 Yes |
| `GET` | `/api/v1/analytics/dashboard` | Fetch aggregated dashboard metrics | 🔒 Yes |
| `GET` | `/api/v1/analytics/category-breakdown` | Fetch spending category percentages | 🔒 Yes |
| `POST` | `/api/v1/ai/analyze` | Request Gemini AI financial audit | 🔒 Yes |
| `GET` | `/api/v1/ai/history` | Fetch previous AI prompt history | 🔒 Yes |

---

## 🚀 Getting Started

### Option 1: Run with Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/RishanthDeveloper/expense-tracker.git
cd expense-tracker

# Build and start services
docker-compose up --build
```
- **Frontend App**: Open [http://localhost](http://localhost)
- **Backend API**: Accessible at [http://localhost:8080](http://localhost:8080)
- **Swagger Documentation**: Open [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

### Option 2: Run Locally (Maven + Vite)

#### Backend Setup:
```bash
cd backend
mvn clean spring-boot:run
```

#### Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```

---

## 📜 License

MIT © [RishanthDeveloper](https://github.com/RishanthDeveloper)
