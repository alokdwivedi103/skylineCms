import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Author from '@/models/Author'
import slugify from 'slugify'

export async function GET() {
  try {
    await dbConnect()
    const authors = await Author.find().sort({ createdAt: -1 })
    return NextResponse.json(authors)
  } catch (error) {
    console.error('Error fetching authors:', error)
    return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()
    
    // Generate slug from name
    const slug = slugify(body.name, { 
      lower: true,
      strict: true,
      trim: true
    })
    
    // Create author with slug
    const author = await Author.create({
      ...body,
      slug
    })
    
    return NextResponse.json(author, { status: 201 })
  } catch (error) {
    console.error('Error creating author:', error)
    return NextResponse.json({ error: 'Failed to create author' }, { status: 500 })
  }
} 