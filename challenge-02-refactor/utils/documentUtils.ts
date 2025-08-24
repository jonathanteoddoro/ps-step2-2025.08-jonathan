import { Document } from '../hooks/useDocuments'

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function getAllTags(docs: Document[]) {
  const allTags = docs.flatMap((doc) => doc.tags)
  return [...new Set(allTags)]
}

export function getCategoryColor(category: string) {
  if (category === 'docs') return '#4CAF50'
  if (category === 'wiki') return '#2196F3'
  if (category === 'api') return '#FF9800'
  return '#666'
}
