import { useState, useEffect } from 'react'

export interface Document {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  author: string
}

const mockDocs: Document[] = [
  {
    id: '1',
    title: 'API Documentation',
    content: 'Complete API reference for Hakutaku platform',
    category: 'api',
    tags: ['api', 'reference', 'backend'],
    createdAt: '2024-01-15',
    author: 'João Silva',
  },
  {
    id: '2',
    title: 'User Guide',
    content: 'How to use Hakutaku knowledge management system',
    category: 'docs',
    tags: ['guide', 'tutorial', 'frontend'],
    createdAt: '2024-01-20',
    author: 'Maria Santos',
  },
  {
    id: '3',
    title: 'Architecture Overview',
    content: 'System architecture and design patterns',
    category: 'wiki',
    tags: ['architecture', 'design', 'system'],
    createdAt: '2024-01-10',
    author: 'Pedro Costa',
  },
]

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setDocuments(mockDocs)
      setLoading(false)
    }, 500)
  }, [])

  return { documents, loading }
}
