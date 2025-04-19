'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import AuthorList from '@/components/Authors/AuthorList'
import AuthorForm from '@/components/Authors/AuthorForm'
import { fetchAuthors } from '@/services/fetchAuthors'
export default function AuthorsPage() {
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null)
  const { isAdmin } = useAuth()

  const getAuthors = async () => {
    try {
      const data = await fetchAuthors()
      setAuthors(data as any)
    } catch (error) {
      console.error('Error fetching authors:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAuthors()
  }, [])

  const handleEdit = (author: any) => {
    setSelectedAuthor(author)
    setShowForm(true)
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      const url = selectedAuthor 
        ? `/api/authors/${selectedAuthor._id}`
        : '/api/authors'
      const method = selectedAuthor ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save author')
      }

      setShowForm(false)
      setSelectedAuthor(null)
      getAuthors()
    } catch (error) {
      console.error('Error saving author:', error)
    }
  }

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`/api/authors/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete author')
      }

      getAuthors()
    } catch (error) {
      console.error('Error deleting author:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Authors</h1>
        {isAdmin && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Author
          </Button>
        )}
      </div>

      {showForm && (
        <AuthorForm
          author={selectedAuthor}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false)
            setSelectedAuthor(null)
          }}
        />
      )}

      <AuthorList
        authors={authors}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isAdmin={isAdmin}
      />
    </div>
  )
} 