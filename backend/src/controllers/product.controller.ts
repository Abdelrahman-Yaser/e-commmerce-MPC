import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { CreateProductSchema } from '../validators/product.validator';

// Helper لتحويل بيانات الـ DB لشكل مناسب للـ JSON
function parseProduct(product: any) {
  return {
    ...product,
    // تحويل Decimal لـ Number لأن JSON لا يدعم Decimal بشكل مباشر
    price: product.price ? Number(product.price) : 0,
    // بما إن الحقل في Prisma نوعه Json، بيرجع كـ Object جاهز
    variants: product.variants || [],
  };
}

export async function getAllProducts(req: Request, res: Response): Promise<void> {
  try {
    const { category } = req.query;

    // دمجنا الـ Filtering مع الـ Get All عشان الكود يبقى أذكى
    const whereClause = category 
      ? { category: (category as string).toUpperCase() as any } 
      : {};

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products.map(parseProduct),
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function getProductById(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, error: 'Invalid ID' });
      return;
    }

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }

    res.status(200).json({ success: true, data: parseProduct(product) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const validation = CreateProductSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(422).json({
        success: false,
        errors: validation.error.format()
      });
      return;
    }

    const product = await prisma.product.create({
      data: {
        ...validation.data,
        // Prisma بتتعامل مع الـ JSON كـ Object، مفيش JSON.stringify()
        variants: validation.data.variants || [],
        category: (validation.data.category as any),
      },
    });

    res.status(201).json({
      success: true,
      data: parseProduct(product),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
}