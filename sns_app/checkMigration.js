import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // データベース内のテーブル一覧を取得
    const tables = await prisma.$queryRaw`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `;
    console.log(tables);
  } catch (error) {
    console.error('Error fetching table list:', error);
  } finally {
    // Prisma Clientを終了
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
