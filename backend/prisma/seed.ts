import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const categories = ["APPAREL", "ELECTRONICS", "SHOES"];

const randomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

async function main() {
  const products: Prisma.ProductCreateInput[] = [];

  for (let i = 1; i <= 100; i++) {
    products.push({
      name: `Product ${i}`,
      description: `This is the description for product ${i}`,
      price: new Prisma.Decimal((Math.random() * 500 + 10).toFixed(2)),
      category: randomItem(categories) as any,
      imageUrl: `https://picsum.photos/seed/${i}/400/400`,
      stock: Math.floor(Math.random() * 50),
      variants: ["S", "M", "L", "XL"].slice(
        0,
        Math.floor(Math.random() * 4) + 1
      ),
    });
  }

  await prisma.product.createMany({
    data: products,
  });

  console.log("✅ 100 products created successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
