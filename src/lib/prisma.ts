import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaInstance(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is missing");
  }

  // Parse connection string: mysql://user:pass@host:port/database
  const regex = /^mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/;
  const match = url.match(regex);
  if (!match) {
    throw new Error("Invalid MySQL connection URL format in DATABASE_URL");
  }

  const [, user, password, host, port, database] = match;

  const adapter = new PrismaMariaDb({
    host,
    port: parseInt(port),
    user,
    password,
    database,
    connectionLimit: 10,
  });

  return new PrismaClient({
    adapter,
    log: ["query"],
  });
}

export const prisma = globalForPrisma.prisma ?? getPrismaInstance();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
