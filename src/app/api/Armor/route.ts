import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const armors = await prisma.armor.findMany();
  return NextResponse.json(armors);
}
