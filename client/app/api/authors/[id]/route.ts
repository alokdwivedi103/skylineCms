import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Author from '@/models/Author'
import slugify from 'slugify'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const author = await Author.findById(params.id)
    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }
    return NextResponse.json(author)
  } catch (error) {
    console.error('Error fetching author:', error)
    return NextResponse.json({ error: 'Failed to fetch author' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const body = await request.json()
    
    // Generate new slug if name is being updated
    const updateData = {
      ...body,
      updatedAt: new Date()
    }
    
    if (body.name) {
      updateData.slug = slugify(body.name, {
        lower: true,
        strict: true,
        trim: true
      })
    }
    
    const author = await Author.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    )
    
    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }
    return NextResponse.json(author)
  } catch (error) {
    console.error('Error updating author:', error)
    return NextResponse.json({ error: 'Failed to update author' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const author = await Author.findByIdAndDelete(params.id)
    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Author deleted successfully' })
  } catch (error) {
    console.error('Error deleting author:', error)
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 })
  }
} 