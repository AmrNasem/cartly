# 🛒 Cartly

A modern full-stack e-commerce platform built with **Next.js 16**, **TypeScript**, **MongoDB**, and **Better Auth**.

Cartly provides a complete online shopping experience for customers while offering administrators a powerful dashboard to manage products, categories, coupons, and orders. The project focuses on building a scalable, secure, and production-ready architecture using modern web development practices.

---

## 🚀 Live Demo

> **https://cartly-eg.vercel.app**

---

## ✨ Key Features

- 🔐 Email/Password and Google Authentication
- 🛍️ Product catalog with categories and search
- 🛒 Persistent shopping cart
- 💳 Secure Stripe Checkout integration
- 🎟️ Coupon and discount system
- 📦 Order management and order history
- ⭐ Product reviews and ratings
<!-- - 👤 User profile management
- 🛠️ Admin dashboard -->
- 📱 Fully responsive design

---

# 📋 Features

## Customer

- Register and login with Better Auth
- Google OAuth authentication
- Browse products by category
- Search products
- Product details page
- Add/remove products from cart
- Update cart quantities
- Apply coupon codes
- Secure Stripe Checkout
- View order history
<!-- - Manage profile information -->
- Submit product reviews and ratings

---

## Admin

- Create, update, publish, and delete products
- Manage product inventory
- Create and manage coupons
- Role-based access control

---

# 🛠 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js Server Actions
- Next.js APIs
- Better Auth

## Database

- MongoDB
- Mongoose

## State Management

- Zustand

## Payments

- Stripe Checkout
- Stripe Webhooks

## Deployment

- Vercel

---

# 🏗 Engineering Highlights

Cartly was built with a strong focus on scalability, maintainability, and production-ready practices.

### Modern Next.js Architecture

- App Router
- React Server Components
- Client Components where appropriate
- Server Actions for server-side mutations

### Authentication & Authorization

- Better Auth integration
- Email & Password authentication
- Google OAuth
- Session-based authentication
- Role-based authorization (User, Admin, Super Admin)

### Checkout & Payments

- Secure Stripe Checkout integration
- Webhook-based payment verification
- Reliable order creation after successful payment
- Coupon support during checkout

### Development Experience

- Fully typed codebase with TypeScript
- Modular and reusable component architecture
- Database seed scripts with realistic demo data
- CI workflow for automated quality checks

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/AmrNasem/cartly.git
```

Navigate to the project

```bash
cd cartly
```

Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file and provide the following variables.

| Variable                             | Description                       |
| ------------------------------------ | --------------------------------- |
| `MONGODB_URI`                        | MongoDB connection string         |
| `DB_NAME`                            | MongoDB database name             |
| `NEXT_PUBLIC_APP_URL`                | Project URL                       |
| `CLOUDINARY_URL`                     | Cloudinary url for product images |
| `BETTER_AUTH_SECRET`                 | Better Auth secret                |
| `BETTER_AUTH_URL`                    | Better Auth application URL       |
| `GOOGLE_CLIENT_ID`                   | Google OAuth Client ID            |
| `GOOGLE_CLIENT_SECRET`               | Google OAuth Client Secret        |
| `STRIPE_SECRET_KEY`                  | Stripe Secret Key                 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Publishable Key            |
| `STRIPE_WEBHOOK_SECRET`              | Stripe Webhook Secret             |

---

# ▶️ Running the Project

Start the development server

```bash
npm run dev
```

Seed the database

```bash
npm run seed
```

Run ESLint

```bash
npm run lint
```

Build for production

```bash
npm run build
```

---

# 🌱 Database Seeding

The project includes a complete database seed system for development.

Running

```bash
npm run seed
```

will populate the database with:

- Sample users
- Categories
- Products
- Coupons

This makes it easy to start developing without manually creating data.

---

# 🔒 Security

Cartly follows several security best practices:

- Secure authentication with Better Auth
- Session-based authentication
- Role-based authorization
- Protected server-side operations
- Secure Stripe webhook verification
- Sensitive configuration stored in environment variables

---

# 🚧 Future Improvements

- Advanced filtering and sorting
- Product recommendations
- Email notifications
- Inventory analytics dashboard
- Multi-language support
- Sales reports
- Product image gallery improvements

---

# 📚 Lessons Learned

Building Cartly provided valuable experience in designing and implementing a production-style full-stack application.

Some of the key areas explored throughout the project include:

- Building scalable applications with the Next.js App Router
- Designing secure authentication and authorization flows
- Integrating third-party payment systems
- Working with Server Actions and React Server Components
- Managing application state effectively
- Designing a maintainable and modular codebase
- Creating realistic database seed scripts
- Setting up CI workflows for automated quality assurance

---

# 📄 License

This project is licensed under the MIT License.
