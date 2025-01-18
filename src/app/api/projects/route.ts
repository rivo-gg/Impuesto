import { NextResponse } from 'next/server'

const projects = [
  { id: '1', name: 'Project A', companyId: '1' },
  { id: '2', name: 'Project B', companyId: '1' },
  { id: '3', name: 'Project C', companyId: '2' },
]

export async function GET() {
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newProject = { id: (projects.length + 1).toString(), ...body }
  projects.push(newProject)
  return NextResponse.json(newProject)
}

