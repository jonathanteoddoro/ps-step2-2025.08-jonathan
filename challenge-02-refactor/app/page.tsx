'use client'


import { useState } from 'react'
import { useDocuments } from '../hooks/useDocuments'
import { filterDocuments, sortDocuments } from '../hooks/useFilterAndSort'
import { formatDate, getAllTags, getCategoryColor } from '../utils/documentUtils'
import DocumentCard from '../components/DocumentCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import TagSelector from '../components/TagSelector'
import SortSelector from '../components/SortSelector'


export default function KnowledgeBase() {
	const { documents, loading } = useDocuments()
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [sortBy, setSortBy] = useState<string>('title')

	const handleTagToggle = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag))
		} else {
			setSelectedTags([...selectedTags, tag])
		}
	}

	const filtered = filterDocuments(documents, searchTerm, selectedCategory, selectedTags)
	const sorted = sortDocuments(filtered, sortBy)

	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
				<div>Carregando base de conhecimento...</div>
			</div>
		)
	}

		return (
			<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
				<h1 style={{ marginBottom: '30px', color: '#333' }}>📚 Base de Conhecimento Hakutaku</h1>
				<div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
					<SearchBar value={searchTerm} onChange={setSearchTerm} />
					<CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
					<SortSelector value={sortBy} onChange={setSortBy} />
				</div>
				<div style={{ marginBottom: '20px' }}>
					<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Tags:</label>
					<TagSelector tags={getAllTags(documents)} selectedTags={selectedTags} onToggle={handleTagToggle} />
				</div>
				<div style={{ marginBottom: '20px' }}>
					<strong>{sorted.length}</strong> documento(s) encontrado(s)
				</div>
				<div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
					{sorted.map((doc) => (
						<DocumentCard key={doc.id} doc={doc} getCategoryColor={getCategoryColor} formatDate={formatDate} />
					))}
				</div>
				{sorted.length === 0 && (
					<div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
						<h3>Nenhum documento encontrado</h3>
						<p>Tente ajustar os filtros de busca</p>
					</div>
				)}
			</div>
		)
}
