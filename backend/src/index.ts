import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────
// 1. Middleware
// ─────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────
// 2. Swagger Documentation (إعدادات سوجر)
// ─────────────────────────────────────────
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'E-commerce Product API',
    version: '1.0.0',
    description: 'API documentation for the Product Card assignment',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: 'Local server'
    },
    {
      url: 'https://e-commmerce-mbc.vercel.app',
      description: 'Production server'
    }
  ],
paths: {
    // 1. المسار الأساسي لجلب كل المنتجات
    '/api/products': {
      get: {
        summary: 'Get all products',
        description: 'Returns a list of all products in the database.',
        responses: {
          '200': {
            description: 'A list of products',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } }
          }
        }
      }
    },
    // 2. مسار الفلترة (الذي طلبته لوحده)
    '/api/products?category={category}': {
      get: {
        summary: 'Filter products by category',
        description: 'Returns products that belong to a specific category (e.g., Apparel).',
        parameters: [
          {
            name: 'category',
            in: 'query',
            required: true, // هنا خليناه إجباري لأنه مسار مخصص للفلترة
            description: 'The category name to filter by',
            schema: { type: 'string', example: 'Apparel' }
          }
        ],
        responses: {
          '200': {
            description: 'Filtered list of products',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } }
          }
        }
      }
    },
    // 3. مسار جلب منتج واحد
    '/api/products/{id}': {
      get: {
        summary: 'Get single product by ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          '200': {
            description: 'Product found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
          },
          '404': { description: 'Product not found' }
        }
      }
    },
    // 4. مسار إضافة منتج (Bonus)
    '/api/products ': { // مسافة بسيطة عشان Swagger يقبله كـ key مختلف لو حبيت
      post: {
        summary: 'Create a new product (Bonus)',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } }
        },
        responses: { '201': { description: 'Created' } }
      }
    }
  },
  components: {
    schemas: {
      Product: {
        type: 'object',
        required: ['name', 'price', 'category', 'image'],
        properties: {
          id: { type: 'string', description: 'Auto-generated ID' },
          name: { type: 'string', example: 'Modern Sneakers' },
          price: { type: 'number', example: 59.99 },
          description: { type: 'string', example: 'Comfortable running shoes.' },
          image: { type: 'string', example: 'https://example.com/image.jpg' },
          category: { type: 'string', example: 'Apparel' },
          stock: { type: 'number', example: 10 },
          variantOptions: {
            type: 'array',
            items: { type: 'string' },
            example: ['Small', 'Medium', 'Large']
          }
        }
      }
    }
  }
};

// تشغيل سوجر قبل الـ Routes والـ 404 Handler
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ─────────────────────────────────────────
// 3. Routes
// ─────────────────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: '🛍️ Product API is running!',
    version: '1.0.0',
    endpoints: {
      'GET /api-docs': 'Swagger API Documentation',
      'GET /api/products': 'Return all products',
      'GET /api/products/:id': 'Return a single product by ID',
    },
  });
});

app.use('/api/products', productRoutes);

// ─────────────────────────────────────────
// 4. 404 Handler (المسارات غير الموجودة)
// ─────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// ─────────────────────────────────────────
// 5. Global Error Handler
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
// 6. Start Server
// ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📑 Swagger Docs: http://localhost:${PORT}/api-docs`);
  console.log(`📦 API available at http://localhost:${PORT}/api/products`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

export default app;