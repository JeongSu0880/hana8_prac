// lib/db.ts
import { PrismaClient } from '@/lib/generated/prisma/client';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default prisma;
