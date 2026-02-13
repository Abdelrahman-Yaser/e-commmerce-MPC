# 🛍️ Full-Stack Product Store

A full-stack e-commerce application built with **React + TypeScript** (frontend) and **Node.js + Express + TypeScript + Prisma ORM** (backend).

---
Delivery Links:

🌐 Frontend (Live):       https://e-commerce-mbc.netlify.app/
🔧 Backend (Live):        https://e-commmerce-mbc-git-main-abdelrahman-yasers-projects.vercel.app/
📁 GitHub Repository:     https://github.com/Abdelrahman-Yaser/e-commmerce-MPC
📄 Swagger API Docs:      https://e-commmerce-mbc.vercel.app/api-docs
📬 Postman Collection:    https://web.postman.co/workspace/My-Workspace~0f55ad1a-c840-463d-834e-ca7f28294f50/collection/37190746-5d01389c-ba05-4494-a444-06cea163a325?action=share&source=copy-link&creator=37190746
---
## Tech Stack

### Backend
- **Node.js** + **Express** – RESTful API server
- **TypeScript** – Type safety throughout
- **Prisma ORM** – Database access layer
- **SQLite** – Lightweight database (swap to PostgreSQL easily)
- **Zod** – Request validation

### Frontend
- **React 18** + **TypeScript** – UI framework
- **Vite** – Fast build tooling
- **Context API + useReducer** – Cart state management
- No external UI library — all styles are hand-crafted

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

---

## Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with sample products
npx ts-node prisma/seed.ts

# Start dev server
npm run dev
```

Server runs at: **http://localhost:3001**

---

## Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at: **http://localhost:5173**

> Make sure the backend is running before starting the frontend.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Return all products |
| `GET` | `/api/products/:id` | Return a single product by ID |
| `GET` | `/api/products?category=Apparel` | Filter products by category |
| `POST` | `/api/products` | Create a new product *(bonus)* |

### Sample cURL Requests

```bash
# Get all products
curl http://localhost:3001/api/products

# Get product by ID
curl http://localhost:3001/api/products/1

# Filter by category
curl "http://localhost:3001/api/products?category=Apparel"

# Create a product (POST - bonus)
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Canvas Tote Bag",
    "description": "Sturdy cotton canvas tote bag.",
    "price": 24.99,
    "category": "Accessories",
    "imageUrl": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500",
    "stock": 40,
    "variants": ["Natural", "Black", "Navy"]
  }'
```

### Sample API Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Classic White T-Shirt",
      "description": "Premium cotton crew-neck tee.",
      "price": 29.99,
      "category": "Apparel",
      "imageUrl": "https://...",
      "stock": 50,
      "variants": ["XS", "S", "M", "L", "XL"],
      "createdAt": "2024-02-01T...",
      "updatedAt": "2024-02-01T..."
    }
  ]
}
```

---

## Features

### Backend
- ✅ RESTful API with Express
- ✅ Full TypeScript support
- ✅ Prisma ORM with SQLite (PostgreSQL-ready)
- ✅ Request validation with Zod
- ✅ Category filtering via query param
- ✅ Proper error handling and HTTP status codes
- ✅ CORS configured for frontend dev server
- ✅ Database seeding with sample data

### Frontend
- ✅ Responsive Product Card UI
- ✅ Product image, name, price, category
- ✅ Variant dropdown selector
- ✅ "Add to Cart" button (disabled / "Out of Stock" when unavailable)
- ✅ Cart sidebar with quantity management
- ✅ Category filter bar (fetches from `/api/products?category=`)
- ✅ Loading skeleton states
- ✅ Error handling with retry
- ✅ Cart state with React Context + useReducer (Bonus)
- ✅ Clean editorial design (Playfair Display + DM Sans)

---

## Layout & Design Approach

The UI uses an **editorial/luxury retail aesthetic** inspired by high-end fashion stores:

- **Typography**: Playfair Display (serif) for headings/prices + DM Sans (sans-serif) for body text
- **Color palette**: Warm creams, sand, and tan tones with terracotta accent — avoids generic blue/purple tech gradients
- **Responsiveness**: CSS Grid with `auto-fill` + `minmax()` for fluid product grid, mobile-first breakpoints at 640px
- **Microinteractions**: Hover lift on cards, image zoom on hover, button color transitions, "Added!" feedback state

---

## Switching to PostgreSQL

In `backend/.env`, change:
```
DATABASE_URL="postgresql://user:password@localhost:5432/product_db"
```

In `backend/prisma/schema.prisma`, change:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then run `npx prisma migrate dev`.
