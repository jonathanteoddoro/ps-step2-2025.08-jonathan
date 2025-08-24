import { Document } from './useDocuments'

export function filterDocuments(
  docs: Document[],
  searchTerm: string,
  selectedCategory: string,
  selectedTags: string[],
) {
  let filtered = docs

  if (searchTerm.trim() !== '') {
    const lowerTerm = searchTerm.toLowerCase()
    filtered = filtered.filter(
      (doc) =>
        doc.title.toLowerCase().includes(lowerTerm) ||
        doc.content.toLowerCase().includes(lowerTerm) ||
        doc.author.toLowerCase().includes(lowerTerm) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(lowerTerm)),
    )
  }

  if (selectedCategory !== 'all') {
    filtered = filtered.filter((doc) => doc.category === selectedCategory)
  }

  if (selectedTags.length > 0) {
    filtered = filtered.filter((doc) => selectedTags.some((tag) => doc.tags.includes(tag)))
  }

  return filtered
}

export function sortDocuments(docs: Document[], sortBy: string) {
  const sorted = [...docs]
  if (sortBy === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortBy === 'date') {
    sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (sortBy === 'author') {
    sorted.sort((a, b) => a.author.localeCompare(b.author))
  }
  return sorted
}
