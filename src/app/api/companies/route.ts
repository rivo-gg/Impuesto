import { NextResponse } from 'next/server'

const companies = [
  { id: '1', name: 'Company A' },
  { id: '2', name: 'Company B' },
]

export async function GET() {
  return NextResponse.json(companies)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newCompany = { id: (companies.length + 1).toString(), ...body }
  companies.push(newCompany)
  return NextResponse.json(newCompany)
}

