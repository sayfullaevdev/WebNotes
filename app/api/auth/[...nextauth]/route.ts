export const runtime = "nodejs";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const handler = NextAuth({
  ...authOptions,
  adapter: PrismaAdapter(prisma),
});

export { handler as GET, handler as POST };
