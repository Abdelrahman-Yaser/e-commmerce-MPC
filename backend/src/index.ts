import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────
// Routes
// ─────────────────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: '🛍️ Product API is running!',
    version: '1.0.0',
    endpoints: {
      'GET /api/products': 'Return all products',
      'GET /api/products/:id': 'Return a single product by ID',
      'GET /api/products?category=Apparel': 'Filter products by category',
      'POST /api/products': 'Create a new product (BONUS)',
    },
  });
});

app.use('/api/products', productRoutes);

// ─────────────────────────────────────────
// 404 Handler
// ─────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// ─────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ─────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 API available at http://localhost:${PORT}/api/products`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

export default app;
