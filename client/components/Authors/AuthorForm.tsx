import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Input from '@/components/custom/Input'
import { Label } from '@/components/ui/label'

interface Author {
  _id?: string
  name: string
  bio: string
  image: string
}

interface AuthorFormProps {
  author?: Author
  onSubmit: (formData: Author) => void
  onCancel: () => void
}

export default function AuthorForm({ author, onSubmit, onCancel }: AuthorFormProps) {
  const [formData, setFormData] = useState<Author>({
    name: author?.name || '',
    bio: author?.bio || '',
    image: author?.image || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {author ? 'Edit Author' : 'Add Author'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {author ? 'Update' : 'Add'} Author
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 