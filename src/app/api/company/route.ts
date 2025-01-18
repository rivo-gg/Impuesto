import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Assuming we're always working with the first company for simplicity
    const company = await prisma.company.findFirst()
    return NextResponse.json(company)
  } catch (error) {
    console.error('Error fetching company:', error)
    return NextResponse.json({ error: 'Failed to fetch company' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { name } = await request.json()
    // Assuming we're always updating the first company for simplicity
    const company = await prisma.company.update({
      where: { id: (await prisma.company.findFirst())?.id },
      data: { name },
    })
    return NextResponse.json(company)
  } catch (error) {
    console.error('Error updating company:', error)
    return NextResponse.json({ error: 'Failed to update company' }, { status: 500 })
  }
}

