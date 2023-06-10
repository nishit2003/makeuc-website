import { PrismaClient } from "@prisma/client";

import { getSchoolData } from "./school";


export const prisma = new PrismaClient({
  datasources: {
    postgresql: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      url: process.env.POSTGRES_PRISMA_URL!,
    },
  },
});

export type PrismaInstance = typeof prisma;

async function seedData() {
  if (await prisma.school.count() === 0) {
    await prisma.school.createMany({ data: await getSchoolData() });
  }
}

seedData();
