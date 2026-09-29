# 🪐 MiniVerse — Full-Stack E-Commerce Platform

A modern, high-performance, and type-safe e-commerce web application built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.

Designed with a clean component-driven architecture, end-to-end type safety, robust session-based authentication, and seamless state management.

---

## ✨ Features

- **⚡ Modern App Router Architecture:** Leverages Server & Client Components for optimal performance and SEO.
- **🔐 Robust Authentication (NextAuth.js v5):**
  - Google OAuth integration.
  - Database-backed session persistence via `@auth/prisma-adapter`.
  - Automatic session expiration and lifecycle handling (30-day default).
- **🛒 Dynamic State Management:** Global cart and client state powered by **Zustand** (lightweight, zero prop-drilling).
- **🗄️ Relational Database & ORM:**
  - Structured schema with **PostgreSQL** & **Prisma ORM**.
  - Relational modeling for Products, Categories, Product Variants, Features, Specs, and User Reviews.
- **🎨 Modern UI & Animations:**
  - Styled with **Tailwind CSS** & **shadcn/ui** primitives.
  - Smooth interactive elements and micro-interactions powered by **Framer Motion** and **Lucide Icons**.
- **🛡️ 100% Type-Safe:** Fully typed TypeScript implementation without loose `any` types.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19 / Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) & [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [NextAuth.js v5 (Auth.js)](https://authjs.dev/) with Prisma Adapter
- **Global State:** [Zustand](https://github.com/pmndrs/zustand)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🏗️ Architecture & Database Highlights

The project utilizes a co-location design pattern to keep component-specific logic modular while abstracting cross-cutting domain concerns (database operations, authentication, and global state).

### Data Models Overview:
- `User` & `Account` & `Session`: Secure session & OAuth credential tracking.
- `Category` & `Product`: Flexible catalog with nested relations (`ProductImage`, `ProductFeature`, `ProductSpec`, `ProductVariant`).
- `Review`: Verified user feedback per product with database-level cascading integrity.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rainboow96/miniverse.git
cd miniverse
