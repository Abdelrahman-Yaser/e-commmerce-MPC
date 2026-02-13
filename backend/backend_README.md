
backend# 🛒 Product API — Backend

A RESTful Product API built with **Node.js + Express + TypeScript + Prisma ORM**, connected to a **PostgreSQL** (Supabase) database.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Language | TypeScript |
| ORM | Prisma |
| Database | PostgreSQL (Supabase) |
| Validation | Zod |

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Fill in your DATABASE_URL in .env

# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to database
npx prisma db push

# 5. Seed sample data
npx ts-node prisma/seed.ts

# 6. Start dev server
npm run dev
```

Server runs at: **http://localhost:3001**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/:id` | Get single product by ID |
| `GET` | `/api/products?category=Apparel` | Filter products by category |
| `POST` | `/api/products` | Create a new product *(bonus)* |

---

## Sample curl Requests

### 1. Get all products
```bash
curl http://localhost:3001/api/products
```

**Response:**
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
      "createdAt": "2024-02-01T00:00:00.000Z",
      "updatedAt": "2024-02-01T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get product by ID
```bash
curl http://localhost:3001/api/products/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Classic White T-Shirt",
    "price": 29.99,
    "category": "Apparel",
    "stock": 50,
    "variants": ["XS", "S", "M", "L", "XL"]
  }
}
```

---

### 3. Filter by category
```bash
curl "http://localhost:3001/api/products?category=Apparel"
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "category": "Apparel",
    "count": 3
  }
}
```

---

### 4. Create a new product (Bonus)
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Canvas Tote Bag",
    "description": "Sturdy cotton canvas tote.",
    "price": 24.99,
    "category": "Accessories",
    "imageUrl": "https://images.unsplash.com/photo-1566150905458?w=500",
    "stock": 40,
    "variants": ["Natural", "Black", "Navy"]
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 9,
    "name": "Canvas Tote Bag",
    "price": 24.99,
    "category": "Accessories",
    "stock": 40,
    "variants": ["Natural", "Black", "Navy"]
  }
}
```

---

### 5. Validation error example
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{ "name": "", "price": -5 }'
```

**Response:**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    { "field": "name", "message": "Product name is required" },
    { "field": "price", "message": "Price must be positive" },
    { "field": "category", "message": "Category is required" }
  ]
}
```

---

## Environment Variables

```env
PORT=3001
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

---

## Error Responses

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad request (invalid ID format) |
| `404` | Product not found |
| `422` | Validation failed |
| `500` | Internal server error |
