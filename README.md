/*
#############################################################
#                     COMPANY MANAGEMENT API               #
#############################################################

A minimal backend API for managing users, properties, services,
and bookings. Built with NestJS, Prisma, and SQLite.

It includes authentication with JWT, guards for protected routes,
and full CRUD operations for users, properties, services, and
service bookings.

#############################################################
# FEATURES
#############################################################

- Users
  - Create, update, delete, and retrieve users.
  - JWT-based authentication (login/logout).
  - Protected routes using JwtAuthGuard.

- Properties & Addresses
  - Manage properties for users.
  - Each property can have an optional address.

- Services
  - Properties can offer multiple services.
  - CRUD operations for services.

- Bookings
  - Users can book services.
  - Track status (pending | confirmed | canceled).

- Authentication
  - Login endpoint issues JWT tokens.
  - Protect endpoints using JwtAuthGuard.

#############################################################
# TECH STACK
#############################################################

- NestJS - backend framework
- Prisma - ORM for database access
- SQLite - lightweight relational database
- JWT - authentication and authorization
- Swagger - auto-generated API documentation

#############################################################
# GETTING STARTED
#############################################################

1. Clone the repo
   git clone <repo-url>
   cd company-management-api

2. Install dependencies
   npm install

3. Initialize Prisma & SQLite
   npx prisma generate
   npx prisma migrate dev --name init

4. Set environment variables
   Create a .env file:
   
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-key"

5. Run the API
   npm run start:dev

6. Open Swagger Docs
   Visit http://localhost:3000/api to see and test all routes.

#############################################################
# API OVERVIEW
#############################################################

- /auth/login      - login and get JWT token
- /users           - manage users
- /properties      - manage properties and addresses
- /services        - manage services for properties
- /bookings        - create and manage bookings for services

> All protected routes require an Authorization: Bearer <token> header.

